/**
 * Automated Verification Tests for Benchmark Suites
 * Validates numerical stability, physical invariants, and algorithmic accuracy.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  runExplicitEuler,
  runSemiImplicitEuler,
  runVelocityVerlet,
  runRK4,
  runMatterJsBenchmark,
} from './physics-integrators.ts';
import {
  benchmarkByteTruncation,
  benchmarkGraphemeTruncation,
} from './thai-truncation.ts';
import {
  benchmarkKatexRendering,
  benchmarkMathEvaluation,
} from './math-eval.ts';

describe('Benchmark Suite Verification', () => {
  describe('Physics Integrators Empirical Validation', () => {
    const initialState = { x: 1.0, y: 0.0, vx: 0.0, vy: 1.0 };
    const steps = 1000;
    const dt = 0.01;

    it('proves Explicit Euler diverges and has higher energy error than Symplectic integrators', () => {
      const euler = runExplicitEuler(initialState, steps, dt);
      const semiImplicit = runSemiImplicitEuler(initialState, steps, dt);
      const verlet = runVelocityVerlet(initialState, steps, dt);

      // Explicit Euler must suffer noticeable energy growth
      assert.ok(euler.maxEnergyError > 0.01, 'Explicit Euler should drift significantly');
      // Semi-implicit Euler is symplectic; energy stays bounded
      assert.ok(semiImplicit.maxEnergyError < 0.005, 'Semi-implicit Euler energy drift should be bounded');
      // Velocity Verlet should have very low energy drift
      assert.ok(verlet.maxEnergyError < 1e-4, 'Velocity Verlet energy drift should be minimal');
      assert.ok(verlet.maxEnergyError < euler.maxEnergyError, 'Verlet must be vastly more stable than Euler');
    });

    it('proves Velocity Verlet and RK4 maintain sub-micron orbital precision', () => {
      const verlet = runVelocityVerlet(initialState, steps, dt);
      const rk4 = runRK4(initialState, steps, dt);

      assert.ok(verlet.maxOrbitalDrift < 1e-3, 'Verlet max orbital drift must be < 1e-3');
      assert.ok(verlet.finalOrbitalDrift < 1e-3, 'Verlet final orbital drift must be < 1e-3');
      assert.ok(rk4.maxOrbitalDrift < 1e-5, 'RK4 max orbital drift must be < 1e-5');
      assert.ok(rk4.finalOrbitalDrift < 1e-5, 'RK4 final orbital drift must be < 1e-5');
    });

    it('executes Matter.js collision physics without throwing or memory explosion', () => {
      const matterResult = runMatterJsBenchmark(20, 100);
      assert.strictEqual(matterResult.bodyCount, 20);
      assert.strictEqual(matterResult.steps, 100);
      assert.strictEqual(matterResult.cleanedUp, true, 'World.clear and Engine.clear must remove all bodies');
      assert.strictEqual(matterResult.bodiesRemainingAfterClear, 0, 'No bodies should remain in world');
      assert.ok(matterResult.stepsPerSecond > 1000, 'Matter.js should execute > 1000 steps/sec for 20 bodies');
    });
  });

  describe('Thai Truncation Benchmark Validation', () => {
    it('executes byte-safe truncation benchmarks across all payloads with high throughput', () => {
      const results = benchmarkByteTruncation(1000);
      assert.strictEqual(results.length, 4);
      for (const res of results) {
        assert.ok(res.opsPerSec > 100000, `${res.testCase} should exceed 100,000 ops/sec`);
        assert.ok(res.sampleOutputByteLength <= 65, 'Output byte length should be within bounds');
      }
    });

    it('executes grapheme-safe truncation benchmarks across all payloads', () => {
      const results = benchmarkGraphemeTruncation(1000);
      assert.strictEqual(results.length, 4);
      for (const res of results) {
        assert.ok(res.opsPerSec > 10000, `${res.testCase} should exceed 10,000 ops/sec`);
      }
    });
  });

  describe('Dynamic Math Formula Benchmark Validation', () => {
    it('renders LaTeX formulas securely into valid KaTeX HTML spans and sanitizes XSS', () => {
      const results = benchmarkKatexRendering(100);
      assert.strictEqual(results.length, 6); // 5 equations + 1 XSS vector
      for (const res of results) {
        assert.ok(res.rendersPerSec > 1000, `${res.formulaName} should exceed 1,000 renders/sec`);
        assert.ok(res.htmlLength > 50, 'Rendered HTML should be non-trivial');
        assert.strictEqual(res.sanitized, true, `${res.formulaName} must be sanitized`);
      }
    });

    it('validates Math.js compilation speedup over uncompiled evaluation across multiple expressions', () => {
      const results = benchmarkMathEvaluation(2000);
      assert.strictEqual(results.length, 6); // 2 expressions * 3 modes

      const oscillatorResults = results.filter((r) => r.expressionName === 'Damped Harmonic Oscillator');
      const uncompiled = oscillatorResults.find((r) => r.mode === 'uncompiled-eval')!;
      const precompiled = oscillatorResults.find((r) => r.mode === 'precompiled-eval')!;
      const nativeJs = oscillatorResults.find((r) => r.mode === 'native-js')!;

      assert.ok(precompiled.opsPerSec > uncompiled.opsPerSec, 'Precompiled evaluate must be faster than uncompiled');
      assert.ok(nativeJs.opsPerSec > precompiled.opsPerSec, 'Native JS function must be faster than AST evaluation');
      assert.ok(Math.abs(precompiled.sampleValue - nativeJs.sampleValue) < 1e-4, 'Evaluated sample values must match');
    });
  });
});
