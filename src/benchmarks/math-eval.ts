/**
 * Dynamic Math Formula Parsing & Evaluation Throughput Benchmark
 * Measures KaTeX LaTeX rendering throughput and Math.js expression compilation / evaluation
 * compared to native JavaScript math routines.
 * Enforces sanitization and AST sandboxing.
 */

import {
  renderSanitizedLatex,
  safeEvaluateMath,
  safeCompileMath,
  createSandboxedScope,
} from '../lib/math-sanitizer.ts';

export interface KatexBenchmarkResult {
  formulaName: string;
  latex: string;
  iterations: number;
  durationMs: number;
  rendersPerSec: number;
  avgRenderMs: number;
  htmlLength: number;
  sanitized: boolean;
}

export interface MathEvalBenchmarkResult {
  expressionName: string;
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
  {
    name: 'Malicious XSS Vector (Neutralized)',
    latex: '\\href{javascript:alert(1)}{Harmful Link}',
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
 * Benchmark KaTeX LaTeX rendering throughput with enforced sanitization
 */
export function benchmarkKatexRendering(iterations = 2000): KatexBenchmarkResult[] {
  const results: KatexBenchmarkResult[] = [];

  for (const item of LATEX_FORMULAS) {
    // Warmup
    for (let i = 0; i < 50; i++) {
      renderSanitizedLatex(item.latex, { displayMode: true });
    }

    const start = performance.now();
    let lastHtml = '';
    for (let i = 0; i < iterations; i++) {
      lastHtml = renderSanitizedLatex(item.latex, { displayMode: true });
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
      sanitized: !lastHtml.includes('href="') && !lastHtml.includes('<script') && !lastHtml.includes('<a '),
    });
  }

  return results;
}

/**
 * Benchmark Math.js parsing, compilation, and evaluation across all test expressions
 */
export function benchmarkMathEvaluation(points = 50000): MathEvalBenchmarkResult[] {
  const results: MathEvalBenchmarkResult[] = [];

  for (const testTarget of MATH_EXPRESSIONS) {
    // 1. Uncompiled math evaluation on points
    const uncompiledIterations = Math.min(points, 2000);
    const startUncompiled = performance.now();
    let uncompiledSample = 0;
    const scope = createSandboxedScope({ x: 0 });

    for (let i = 0; i < uncompiledIterations; i++) {
      const x = (i / uncompiledIterations) * 10;
      scope.set('x', x);
      uncompiledSample = safeEvaluateMath(testTarget.expr, scope);
    }
    const uncompiledDurationMs = performance.now() - startUncompiled;
    const uncompiledOpsPerSec = Math.round((uncompiledIterations / uncompiledDurationMs) * 1000);

    results.push({
      expressionName: testTarget.name,
      expression: testTarget.expr,
      iterations: uncompiledIterations,
      mode: 'uncompiled-eval',
      durationMs: uncompiledDurationMs,
      opsPerSec: uncompiledOpsPerSec,
      speedupVsUncompiled: 1.0,
      sampleValue: uncompiledSample,
    });

    // 2. Pre-compiled Math.js AST evaluation
    const compiledCode = safeCompileMath(testTarget.expr);
    const precompiledScope = createSandboxedScope({ x: 0 });

    const startPrecompiled = performance.now();
    let precompiledSample = 0;
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10;
      precompiledScope.set('x', x);
      precompiledSample = compiledCode.evaluate(precompiledScope);
    }
    const precompiledDurationMs = performance.now() - startPrecompiled;
    const precompiledOpsPerSec = Math.round((points / precompiledDurationMs) * 1000);

    results.push({
      expressionName: testTarget.name,
      expression: testTarget.expr,
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
      expressionName: testTarget.name,
      expression: testTarget.expr,
      iterations: points,
      mode: 'native-js',
      durationMs: nativeDurationMs,
      opsPerSec: nativeOpsPerSec,
      speedupVsUncompiled: nativeOpsPerSec / uncompiledOpsPerSec,
      sampleValue: nativeSample,
    });
  }

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
