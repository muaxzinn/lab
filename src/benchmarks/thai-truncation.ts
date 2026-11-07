/**
 * Thai UTF-8 Safe Truncation Engine Throughput Benchmark
 * Measures execution time, operations per millisecond, and memory delta
 * for Thai multibyte byte-safe and grapheme-safe truncation algorithms.
 */

import {
  safeTruncateThaiBytes,
  safeTruncateThaiGraphemes,
  safeTruncateThai,
} from '../lib/utils.ts';

export interface TruncationBenchmarkCase {
  label: string;
  input: string;
  limit: number;
}

export interface TruncationBenchmarkResult {
  engine: string;
  testCase: string;
  iterations: number;
  durationMs: number;
  opsPerMs: number;
  opsPerSec: number;
  memoryDeltaMb: number;
  sampleOutput: string;
  sampleOutputByteLength: number;
}

export const BENCHMARK_PAYLOADS: TruncationBenchmarkCase[] = [
  {
    label: 'Pure Thai Academic Text',
    input: 'การทดลองทางวิทยาศาสตร์และเทคโนโลยีสารสนเทศเพื่อการศึกษาแห่งอนาคตในศตวรรษที่ยี่สิบเอ็ด',
    limit: 45, // Target byte limit right in the middle of 3-byte characters
  },
  {
    label: 'Mixed Thai & Technical English',
    input: 'Next.js 15 + React 19 แพลตฟอร์มการเรียนรู้ระดับสูงพร้อม 100% Type Safety และ Kiosk Containment',
    limit: 60,
  },
  {
    label: 'Dense Tone Marks & Vowels',
    input: 'ผู้ปฏิบัติการทางวิทยาศาสตร์ ณ ห้องแล็บฟิสิกส์ชั้นสูงที่มหาวิทยาลัยเทคโนโลยีแห่งชาติ',
    limit: 50,
  },
  {
    label: 'Short Boundary Edge Cases',
    input: 'วิทยาศาสตร์', // 33 bytes (11 Thai chars * 3 bytes)
    limit: 8, // Slices between 2nd and 3rd Thai character (6 bytes vs 9 bytes)
  },
];

/**
 * Benchmark byte-safe truncation engine
 */
export function benchmarkByteTruncation(
  iterations = 100000
): TruncationBenchmarkResult[] {
  const results: TruncationBenchmarkResult[] = [];

  for (const testCase of BENCHMARK_PAYLOADS) {
    // Warmup
    for (let i = 0; i < 1000; i++) {
      safeTruncateThaiBytes(testCase.input, testCase.limit);
    }

    const startMem = process.memoryUsage().heapUsed;
    const start = performance.now();

    let lastResult = '';
    for (let i = 0; i < iterations; i++) {
      lastResult = safeTruncateThaiBytes(testCase.input, testCase.limit);
    }

    const durationMs = performance.now() - start;
    const endMem = process.memoryUsage().heapUsed;
    const memoryDeltaMb = Math.max(0, (endMem - startMem) / (1024 * 1024));

    results.push({
      engine: 'safeTruncateThaiBytes (Zero-Copy Buffer Scanning)',
      testCase: testCase.label,
      iterations,
      durationMs,
      opsPerMs: Math.round(iterations / durationMs),
      opsPerSec: Math.round((iterations / durationMs) * 1000),
      memoryDeltaMb,
      sampleOutput: lastResult,
      sampleOutputByteLength: Buffer.byteLength(lastResult, 'utf-8'),
    });
  }

  return results;
}

/**
 * Benchmark grapheme-safe truncation engine (Intl.Segmenter)
 */
export function benchmarkGraphemeTruncation(
  iterations = 100000
): TruncationBenchmarkResult[] {
  const results: TruncationBenchmarkResult[] = [];

  for (const testCase of BENCHMARK_PAYLOADS) {
    // Limits translated to grapheme counts (e.g. 15 graphemes)
    const graphemeLimit = Math.max(5, Math.floor(testCase.limit / 3));

    // Warmup
    for (let i = 0; i < 1000; i++) {
      safeTruncateThaiGraphemes(testCase.input, graphemeLimit);
    }

    const startMem = process.memoryUsage().heapUsed;
    const start = performance.now();

    let lastResult = '';
    for (let i = 0; i < iterations; i++) {
      lastResult = safeTruncateThaiGraphemes(testCase.input, graphemeLimit);
    }

    const durationMs = performance.now() - start;
    const endMem = process.memoryUsage().heapUsed;
    const memoryDeltaMb = Math.max(0, (endMem - startMem) / (1024 * 1024));

    results.push({
      engine: 'safeTruncateThaiGraphemes (Intl.Segmenter Cluster Parsing)',
      testCase: testCase.label,
      iterations,
      durationMs,
      opsPerMs: Math.round(iterations / durationMs),
      opsPerSec: Math.round((iterations / durationMs) * 1000),
      memoryDeltaMb,
      sampleOutput: lastResult,
      sampleOutputByteLength: Buffer.byteLength(lastResult, 'utf-8'),
    });
  }

  return results;
}

/**
 * Benchmark universal dispatcher
 */
export function benchmarkUniversalDispatcher(
  iterations = 100000
): TruncationBenchmarkResult[] {
  const results: TruncationBenchmarkResult[] = [];
  const testCase = BENCHMARK_PAYLOADS[0]; // Pure Thai Academic Text

  const start = performance.now();
  let lastResult = '';
  for (let i = 0; i < iterations; i++) {
    lastResult = safeTruncateThai(testCase.input, 20, 'graphemes');
  }
  const durationMs = performance.now() - start;

  results.push({
    engine: 'safeTruncateThai (Universal Dispatcher - Grapheme Mode)',
    testCase: testCase.label,
    iterations,
    durationMs,
    opsPerMs: Math.round(iterations / durationMs),
    opsPerSec: Math.round((iterations / durationMs) * 1000),
    memoryDeltaMb: 0,
    sampleOutput: lastResult,
    sampleOutputByteLength: Buffer.byteLength(lastResult, 'utf-8'),
  });

  return results;
}

/**
 * Execute full Thai truncation benchmark suite
 */
export function runAllThaiTruncationBenchmarks(iterations = 100000) {
  const byteResults = benchmarkByteTruncation(iterations);
  const graphemeResults = benchmarkGraphemeTruncation(iterations);
  const dispatcherResults = benchmarkUniversalDispatcher(iterations);

  return {
    iterations,
    byteResults,
    graphemeResults,
    dispatcherResults,
  };
}
