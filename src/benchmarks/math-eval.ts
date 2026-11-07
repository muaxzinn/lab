/**
 * Dynamic Math Formula Parsing & Evaluation Throughput Benchmark
 * Measures KaTeX LaTeX rendering throughput and Math.js expression compilation / evaluation
 * compared to native JavaScript math routines.
 */

import katex from 'katex';
import { compile, evaluate } from 'mathjs';

export interface KatexBenchmarkResult {
  formulaName: string;
  latex: string;
  iterations: number;
  durationMs: number;
  rendersPerSec: number;
  avgRenderMs: number;
  htmlLength: number;
}

export interface MathEvalBenchmarkResult {
  expression: string;
  iterations: number;
  mode: 'uncompiled-eval' | 'precompiled-eval' | 'native-js';
  durationMs: number;
  opsPerSec: number;
  speedupVsUncompiled: number;
  sampleValue: number;
}

export const LATEX_FORMULAS = [
  {
    name: 'Quadratic Formula',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
  },
  {
    name: 'Einstein Field Equations',
    latex: 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}',
  },
  {
    name: 'Time-Dependent Schrödinger Equation',
    latex: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r}, t) = \\hat{H}\\Psi(\\mathbf{r}, t)',
  },
  {
    name: 'Maxwell Gauss Law in Differential Form',
    latex: '\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}',
  },
  {
    name: 'Euler Identity',
    latex: 'e^{i\\pi} + 1 = 0',
  },
];

export const MATH_EXPRESSIONS = [
  {
    name: 'Damped Harmonic Oscillator',
    expr: 'sin(x) * exp(-0.1 * x) + sqrt(x^2 + 1)',
    nativeFn: (x: number) => Math.sin(x) * Math.exp(-0.1 * x) + Math.sqrt(x * x + 1),
  },
  {
    name: 'Polynomial Kinetic Potential',
    expr: '0.5 * 9.8 * x^2 - 3.2 * x + 1.5',
    nativeFn: (x: number) => 0.5 * 9.8 * x * x - 3.2 * x + 1.5,
  },
];

/**
 * Benchmark KaTeX LaTeX rendering throughput
 */
export function benchmarkKatexRendering(iterations = 2000): KatexBenchmarkResult[] {
  const results: KatexBenchmarkResult[] = [];

  for (const item of LATEX_FORMULAS) {
    // Warmup
    for (let i = 0; i < 50; i++) {
      katex.renderToString(item.latex, {
        displayMode: true,
        throwOnError: false,
        trust: false, // Security sanitization enforced
      });
    }

    const start = performance.now();
    let lastHtml = '';
    for (let i = 0; i < iterations; i++) {
      lastHtml = katex.renderToString(item.latex, {
        displayMode: true,
        throwOnError: false,
        trust: false,
      });
    }
    const durationMs = performance.now() - start;

    results.push({
      formulaName: item.name,
      latex: item.latex,
      iterations,
      durationMs,
      rendersPerSec: Math.round((iterations / durationMs) * 1000),
      avgRenderMs: durationMs / iterations,
      htmlLength: lastHtml.length,
    });
  }

  return results;
}

/**
 * Benchmark Math.js parsing, compilation, and evaluation
 */
export function benchmarkMathEvaluation(points = 50000): MathEvalBenchmarkResult[] {
  const results: MathEvalBenchmarkResult[] = [];
  const testTarget = MATH_EXPRESSIONS[0]; // Damped Harmonic Oscillator

  // 1. Uncompiled math.evaluate on every point (AST parsed and evaluated repeatedly)
  // For uncompiled, running 50,000 would take several seconds; run 2,000 and extrapolate or run directly
  const uncompiledIterations = Math.min(points, 2000);
  const startUncompiled = performance.now();
  let uncompiledSample = 0;
  for (let i = 0; i < uncompiledIterations; i++) {
    const x = (i / uncompiledIterations) * 10;
    uncompiledSample = evaluate(testTarget.expr, { x });
  }
  const uncompiledDurationMs = performance.now() - startUncompiled;
  const uncompiledOpsPerSec = Math.round((uncompiledIterations / uncompiledDurationMs) * 1000);

  results.push({
    expression: testTarget.expr,
    iterations: uncompiledIterations,
    mode: 'uncompiled-eval',
    durationMs: uncompiledDurationMs,
    opsPerSec: uncompiledOpsPerSec,
    speedupVsUncompiled: 1.0,
    sampleValue: uncompiledSample,
  });

  // 2. Pre-compiled Math.js code.evaluate (AST parsed once, compiled into bytecode/JS execution tree)
  const compileStart = performance.now();
  const compiledCode = compile(testTarget.expr);
  const compileDurationMs = performance.now() - compileStart;

  const startPrecompiled = performance.now();
  let precompiledSample = 0;
  for (let i = 0; i < points; i++) {
    const x = (i / points) * 10;
    precompiledSample = compiledCode.evaluate({ x });
  }
  const precompiledDurationMs = performance.now() - startPrecompiled;
  const precompiledOpsPerSec = Math.round((points / precompiledDurationMs) * 1000);

  results.push({
    expression: `${testTarget.expr} [Compile: ${compileDurationMs.toFixed(3)}ms]`,
    iterations: points,
    mode: 'precompiled-eval',
    durationMs: precompiledDurationMs,
    opsPerSec: precompiledOpsPerSec,
    speedupVsUncompiled: precompiledOpsPerSec / uncompiledOpsPerSec,
    sampleValue: precompiledSample,
  });

  // 3. Native JavaScript function execution
  const startNative = performance.now();
  let nativeSample = 0;
  for (let i = 0; i < points; i++) {
    const x = (i / points) * 10;
    nativeSample = testTarget.nativeFn(x);
  }
  const nativeDurationMs = performance.now() - startNative;
  const nativeOpsPerSec = Math.round((points / nativeDurationMs) * 1000);

  results.push({
    expression: testTarget.expr,
    iterations: points,
    mode: 'native-js',
    durationMs: nativeDurationMs,
    opsPerSec: nativeOpsPerSec,
    speedupVsUncompiled: nativeOpsPerSec / uncompiledOpsPerSec,
    sampleValue: nativeSample,
  });

  return results;
}

/**
 * Execute full math benchmark suite
 */
export function runAllMathBenchmarks() {
  const katexResults = benchmarkKatexRendering(2000);
  const mathEvalResults = benchmarkMathEvaluation(50000);

  return {
    katexResults,
    mathEvalResults,
  };
}
