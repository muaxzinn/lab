/**
 * Master Benchmark Runner
 * Executes all empirical benchmark suites:
 * 1. Numerical Physics Integrators (Euler vs Semi-Implicit vs Verlet vs RK4 + Matter.js)
 * 2. Thai Multibyte UTF-8 Safe Truncation (Byte-level vs Grapheme-level under 100,000 iterations)
 * 3. Dynamic Math Formula Parsing & Evaluation (KaTeX rendering vs Math.js compilation vs Native JS)
 */

import { runAllPhysicsBenchmarks } from './physics-integrators.ts';
import { runAllThaiTruncationBenchmarks } from './thai-truncation.ts';
import { runAllMathBenchmarks } from './math-eval.ts';

export function runMasterBenchmarks() {
  console.log('='.repeat(80));
  console.log('INTERACTIVE LEARNING PLATFORM — EMPIRICAL BENCHMARK SUITE');
  console.log(`Node Runtime: ${process.version} | Platform: ${process.platform} ${process.arch}`);
  console.log(`Execution Timestamp: ${new Date().toISOString()}`);
  console.log('='.repeat(80));

  // 1. Physics Integrators Benchmark
  console.log('\n[1/3] EXECUTING NUMERICAL PHYSICS INTEGRATORS BENCHMARK (10,000 steps)...');
  const physicsResults = runAllPhysicsBenchmarks(10000, 0.01);

  console.log('\n--- 2-Body Orbital Gravitational Mechanics (t = 100, 10,000 steps, dt = 0.01) ---');
  console.table(
    physicsResults.integrators.map((i) => ({
      Integrator: i.name,
      'Time (ms)': i.durationMs.toFixed(2),
      'Steps/sec': i.opsPerSec.toLocaleString(),
      'Max Energy Err': i.maxEnergyError.toExponential(4),
      'Final Energy Err': i.finalEnergyError.toExponential(4),
      'Max Orbit Drift': i.maxOrbitalDrift.toExponential(4),
      'Final Orbit Drift': i.finalOrbitalDrift.toExponential(4),
      Symplectic: i.isSymplectic ? 'YES' : 'NO',
    }))
  );

  console.log('\n--- Rigid-Body Physics Engine Benchmark (Matter.js) ---');
  console.log(`Engine: ${physicsResults.rigidBodyEngine.engineName}`);
  console.log(`Interacting Bodies: ${physicsResults.rigidBodyEngine.bodyCount}`);
  console.log(`Steps Simulated: ${physicsResults.rigidBodyEngine.steps}`);
  console.log(`Total Duration: ${physicsResults.rigidBodyEngine.durationMs.toFixed(2)} ms`);
  console.log(`Throughput: ${physicsResults.rigidBodyEngine.stepsPerSecond.toLocaleString()} steps/sec`);
  console.log(`Active Collision Pairs: ${physicsResults.rigidBodyEngine.activePairsBeforeClear}`);
  console.log(`Bodies After Clear: ${physicsResults.rigidBodyEngine.bodiesRemainingAfterClear}`);
  console.log(`Cleanup Status: ${physicsResults.rigidBodyEngine.cleanedUp ? 'PASS (0 bodies leaked)' : 'FAIL'}`);
  console.log(`Memory Delta: ${physicsResults.rigidBodyEngine.memoryUsageMb.toFixed(3)} MB`);

  // 2. Thai UTF-8 Truncation Benchmark
  console.log('\n[2/3] EXECUTING THAI MULTIBYTE TRUNCATION BENCHMARK (100,000 iterations)...');
  const thaiResults = runAllThaiTruncationBenchmarks(100000);

  console.log('\n--- Thai Byte-Safe Truncation (Zero-Copy Buffer Scanning) ---');
  console.table(
    thaiResults.byteResults.map((r) => ({
      Payload: r.testCase,
      'Iterations': r.iterations.toLocaleString(),
      'Duration (ms)': r.durationMs.toFixed(2),
      'Ops/ms': r.opsPerMs.toLocaleString(),
      'Ops/sec': r.opsPerSec.toLocaleString(),
      'Result Bytes': r.sampleOutputByteLength,
    }))
  );

  console.log('\n--- Thai Grapheme-Safe Truncation (Intl.Segmenter) ---');
  console.table(
    thaiResults.graphemeResults.map((r) => ({
      Payload: r.testCase,
      'Iterations': r.iterations.toLocaleString(),
      'Duration (ms)': r.durationMs.toFixed(2),
      'Ops/ms': r.opsPerMs.toLocaleString(),
      'Ops/sec': r.opsPerSec.toLocaleString(),
      'Result Bytes': r.sampleOutputByteLength,
    }))
  );

  // 3. Dynamic Math Formula & KaTeX Benchmark
  console.log('\n[3/3] EXECUTING DYNAMIC MATH FORMULA & KATEX BENCHMARK...');
  const mathResults = runAllMathBenchmarks();

  console.log('\n--- KaTeX LaTeX Rendering Throughput (2,000 renders/formula, trust: false) ---');
  console.table(
    mathResults.katexResults.map((k) => ({
      Formula: k.formulaName,
      'Duration (ms)': k.durationMs.toFixed(2),
      'Renders/sec': k.rendersPerSec.toLocaleString(),
      'Avg Render (ms)': k.avgRenderMs.toFixed(4),
      'HTML Output Size': `${k.htmlLength} bytes`,
      'XSS Sanitized': k.sanitized ? 'YES' : 'NO',
    }))
  );

  console.log('\n--- Math Expression Evaluation Throughput (50,000 points, Sandboxed Map Scope) ---');
  console.table(
    mathResults.mathEvalResults.map((m) => ({
      Expression: m.expressionName,
      Mode: m.mode,
      Iterations: m.iterations.toLocaleString(),
      'Duration (ms)': m.durationMs.toFixed(2),
      'Ops/sec': m.opsPerSec.toLocaleString(),
      Speedup: `${m.speedupVsUncompiled.toFixed(1)}x`,
      'Sample Val': m.sampleValue.toFixed(6),
    }))
  );

  console.log('\n' + '='.repeat(80));
  console.log('BENCHMARK COMPLETE — ALL EMPIRICAL DATA CAPTURED SUCCESSFULLY');
  console.log('='.repeat(80));

  return {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: `${process.platform} ${process.arch}`,
    physics: physicsResults,
    thai: thaiResults,
    math: mathResults,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runMasterBenchmarks();
}
