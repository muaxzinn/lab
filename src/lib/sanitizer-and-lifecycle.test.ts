/**
 * Unit Tests for Sanitization, WebGL Lifecycle, and Worker Protocols
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  renderSanitizedLatex,
  safeEvaluateMath,
  safeCompileMath,
  createSandboxedScope,
  validateExpressionSecurity,
} from './math-sanitizer.ts';

import {
  disposeThreeScene,
  attachWebGLContextGuards,
  getOptimalPixelRatio,
  type WebGLDisposalTarget,
  type WebGLObject3DLike,
} from './webgl-lifecycle.ts';

import {
  createSimulationFrame,
  getTransferables,
  type SimulationCommand,
  type SimulationEvent,
} from './worker-protocol.ts';

describe('Math Sanitization & Security Boundary', () => {
  it('renders valid LaTeX formulas safely into HTML', () => {
    const html = renderSanitizedLatex('E = mc^2', { displayMode: true });
    assert.ok(html.includes('katex'), 'Output must contain KaTeX class');
    assert.ok(html.includes('katex-mathml'), 'Output must contain MathML');
  });

  it('neutralizes malicious XSS payloads with trust: false', () => {
    // KaTeX should not render an active anchor tag with javascript: link
    const xss = renderSanitizedLatex('\\href{javascript:alert(1)}{ClickMe}');
    assert.ok(!xss.includes('<a href="javascript:alert'), 'Must NOT contain executable javascript href');

    // Raw script tags are not rendered as active elements
    const script = renderSanitizedLatex('<script>alert(1)</script>');
    assert.ok(!script.includes('<script>'), 'Must not render unescaped script tags');
  });

  it('safely evaluates math expressions using Map scopes', () => {
    const scope = createSandboxedScope({ x: 3, y: 4 });
    const result = safeEvaluateMath('sqrt(x^2 + y^2)', scope);
    assert.strictEqual(result, 5);
  });

  it('safely evaluates pre-compiled math expressions', () => {
    const compiled = safeCompileMath('2 * x + 1');
    assert.strictEqual(compiled.evaluate({ x: 10 }), 21);
    assert.strictEqual(compiled.evaluate(createSandboxedScope({ x: 20 })), 41);
  });

  it('rejects forbidden prototype-pollution identifiers in expressions', () => {
    assert.throws(
      () => validateExpressionSecurity('constructor.prototype'),
      /Security Violation/
    );
    assert.throws(
      () => safeEvaluateMath('__proto__'),
      /Security Violation/
    );
    assert.throws(
      () => safeCompileMath('Function("return process")()'),
      /Security Violation/
    );
  });
});

describe('WebGL Memory Lifecycle & Context Guards', () => {
  it('recursively disposes meshes, lines, points, materials, and textures without leaking', () => {
    let geometryDisposed = false;
    let materialDisposed = false;
    let textureDisposed = false;
    let sceneCleared = false;
    let rendererDisposed = false;
    let contextLost = false;

    const mockTexture = {
      dispose: () => {
        textureDisposed = true;
      },
    };

    const mockMaterial = {
      map: mockTexture,
      dispose: () => {
        materialDisposed = true;
      },
    };

    const mockMesh: WebGLObject3DLike = {
      geometry: {
        dispose: () => {
          geometryDisposed = true;
        },
      },
      material: mockMaterial,
    };

    const mockScene: WebGLObject3DLike = {
      traverse: (cb) => {
        cb(mockMesh);
      },
      clear: () => {
        sceneCleared = true;
      },
    };

    const mockRenderer = {
      dispose: () => {
        rendererDisposed = true;
      },
      forceContextLoss: () => {
        contextLost = true;
      },
    };

    const target: WebGLDisposalTarget = {
      scene: mockScene,
      renderer: mockRenderer,
      animationFrameId: 12345,
    };

    disposeThreeScene(target);

    assert.strictEqual(geometryDisposed, true, 'Geometry must be disposed');
    assert.strictEqual(materialDisposed, true, 'Material must be disposed');
    assert.strictEqual(textureDisposed, true, 'Texture must be disposed');
    assert.strictEqual(sceneCleared, true, 'Scene hierarchy must be cleared');
    assert.strictEqual(rendererDisposed, true, 'Renderer must be disposed');
    assert.strictEqual(contextLost, true, 'Context loss must be forced to release VRAM');
  });

  it('attaches WebGL context loss guards and prevents default failure', () => {
    let lostTriggered = false;
    let restoredTriggered = false;
    let preventDefaultCalled = false;

    const listeners: Record<string, EventListener> = {};
    const mockCanvas = {
      addEventListener: (type: string, listener: EventListener) => {
        listeners[type] = listener;
      },
      removeEventListener: (type: string) => {
        delete listeners[type];
      },
    } as unknown as HTMLCanvasElement;

    const cleanup = attachWebGLContextGuards(
      mockCanvas,
      () => {
        restoredTriggered = true;
      },
      () => {
        lostTriggered = true;
      }
    );

    // Simulate context lost
    const fakeLostEvent = {
      preventDefault: () => {
        preventDefaultCalled = true;
      },
    } as unknown as Event;

    listeners['webglcontextlost'](fakeLostEvent);
    assert.strictEqual(lostTriggered, true, 'Lost callback should be triggered');
    assert.strictEqual(preventDefaultCalled, true, 'preventDefault must be called');

    // Simulate context restored
    listeners['webglcontextrestored'](new Event('webglcontextrestored'));
    assert.strictEqual(restoredTriggered, true, 'Restore callback should be triggered');

    // Verify cleanup
    cleanup();
    assert.strictEqual(listeners['webglcontextlost'], undefined);
    assert.strictEqual(listeners['webglcontextrestored'], undefined);
  });

  it('clamps pixel ratio to maximum threshold', () => {
    // In Node runtime, window is undefined, defaults to 1.0
    const ratio = getOptimalPixelRatio(2.0);
    assert.strictEqual(ratio, 1.0);
  });
});

describe('Web Worker Transferable Protocols', () => {
  it('creates zero-copy simulation frame and extracts transferables', () => {
    const positions = new Float64Array([1.0, 2.0, 3.0, 4.0]);
    const energies = new Float64Array([0.5, -1.0, -0.5]);

    const frame = createSimulationFrame(100, 1.0, positions, energies);
    assert.strictEqual(frame.stepCount, 100);
    assert.strictEqual(frame.timeElapsed, 1.0);
    assert.strictEqual(frame.positionsBuffer.byteLength, 32); // 4 * 8 bytes
    assert.strictEqual(frame.energiesBuffer.byteLength, 24);  // 3 * 8 bytes

    const transferables = getTransferables(frame);
    assert.strictEqual(transferables.length, 2);
    assert.strictEqual(transferables[0], frame.positionsBuffer);
    assert.strictEqual(transferables[1], frame.energiesBuffer);

    // Verify typed worker protocol message structures
    const initCmd: SimulationCommand = {
      type: 'INIT_ORBIT',
      payload: { m1: 1000, m2: 1, G: 1, dt: 0.02 },
    };
    assert.strictEqual(initCmd.type, 'INIT_ORBIT');

    const frameEvent: SimulationEvent = {
      type: 'FRAME_READY',
      payload: frame,
    };
    assert.strictEqual(frameEvent.type, 'FRAME_READY');
  });
});
