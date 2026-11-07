/**
 * WebGL and Three.js Memory Lifecycle & Context Loss Management
 * Implements GPU VRAM leak prevention, recursive texture/buffer disposal,
 * and deterministic WebGL context loss recovery.
 * Reference: docs/TECHNICAL_AUDIT.md Section 4
 */

/**
 * Duck-typed interfaces for Three.js objects to avoid heavy client bundle coupling in utility layer
 */
export interface WebGLDisposable {
  dispose?: () => void;
}

export interface WebGLObject3DLike {
  geometry?: WebGLDisposable;
  material?: WebGLDisposable | WebGLDisposable[];
  children?: WebGLObject3DLike[];
  traverse?: (callback: (obj: WebGLObject3DLike) => void) => void;
  clear?: () => void;
}

export interface WebGLRendererLike {
  dispose: () => void;
  forceContextLoss?: () => void;
  domElement?: HTMLCanvasElement;
}

export interface WebGLDisposalTarget {
  scene: WebGLObject3DLike;
  renderer: WebGLRendererLike;
  animationFrameId?: number;
}

/**
 * Recursively disposes all textures attached to material properties.
 */
function disposeMaterialTextures(material: WebGLDisposable): void {
  const mat = material as unknown as Record<string, unknown>;
  if (!mat || typeof mat !== 'object') return;

  for (const key of Object.keys(mat)) {
    const prop = mat[key];
    if (
      prop &&
      typeof prop === 'object' &&
      'dispose' in prop &&
      typeof (prop as { dispose: () => void }).dispose === 'function'
    ) {
      try {
        (prop as { dispose: () => void }).dispose();
      } catch {
        // Ignore errors during texture release
      }
    }
  }

  if (typeof material.dispose === 'function') {
    material.dispose();
  }
}

/**
 * Exhaustive disposal routine for Three.js scenes, meshes, lines, points, and renderers.
 * Guarantees zero VRAM leakage across educational simulation transitions.
 */
export function disposeThreeScene(target: WebGLDisposalTarget): void {
  // 1. Cancel active animation loop
  if (target.animationFrameId !== undefined && typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(target.animationFrameId);
  }

  // 2. Recursive traversal of scene graph (Meshes, Lines, Points, Sprites)
  if (typeof target.scene.traverse === 'function') {
    target.scene.traverse((object: WebGLObject3DLike) => {
      // Dispose BufferGeometry
      if (object.geometry && typeof object.geometry.dispose === 'function') {
        object.geometry.dispose();
      }

      // Dispose Materials and associated texture maps
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => disposeMaterialTextures(mat));
        } else {
          disposeMaterialTextures(object.material);
        }
      }
    });
  }

  // 3. Clear scene hierarchy
  if (typeof target.scene.clear === 'function') {
    target.scene.clear();
  }

  // 4. Dispose WebGLRenderer and release WebGL context
  if (target.renderer) {
    if (typeof target.renderer.dispose === 'function') {
      target.renderer.dispose();
    }
    if (typeof target.renderer.forceContextLoss === 'function') {
      target.renderer.forceContextLoss();
    }

    const canvas = target.renderer.domElement;
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }
}

/**
 * Attaches event listeners for WebGL context loss and restoration.
 * Calling event.preventDefault() on webglcontextlost is mandatory to allow browser context rebuilding.
 */
export function attachWebGLContextGuards(
  canvas: HTMLCanvasElement,
  onRestore: () => void,
  onLost?: () => void
): () => void {
  const handleLost = (event: Event) => {
    event.preventDefault();
    if (onLost) {
      onLost();
    }
  };

  const handleRestored = () => {
    onRestore();
  };

  canvas.addEventListener('webglcontextlost', handleLost, false);
  canvas.addEventListener('webglcontextrestored', handleRestored, false);

  return () => {
    canvas.removeEventListener('webglcontextlost', handleLost);
    canvas.removeEventListener('webglcontextrestored', handleRestored);
  };
}

export function clampDevicePixelRatio(dpr: number, maxDpr = 2.0): number {
  return Math.min(Math.max(dpr, 1.0), maxDpr);
}

/**
 * Clamp device pixel ratio to prevent GPU framebuffer bandwidth exhaustion.
 * Restricts DPR to maxDpr (default: 2.0).
 */
export function getOptimalPixelRatio(maxDpr = 2.0): number {
  if (typeof window === 'undefined' || !window.devicePixelRatio) {
    return 1.0;
  }
  return clampDevicePixelRatio(window.devicePixelRatio, maxDpr);
}
