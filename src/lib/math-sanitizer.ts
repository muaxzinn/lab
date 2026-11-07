/**
 * Math Sanitization and Secure Expression Evaluation
 * Strictly enforces XSS defense, macro bounds, and Math.js prototype-safe execution.
 * Reference: docs/TECHNICAL_AUDIT.md Section 6
 */

import katex from 'katex';
import { compile, evaluate } from 'mathjs';

/**
 * Options for sanitized KaTeX rendering
 */
export interface LatexSanitizeOptions {
  displayMode?: boolean;
  maxExpand?: number;
  maxSize?: number;
}

/**
 * Render LaTeX markup to secure HTML string.
 * Disables untrusted HTML/JS injection (\href, \url, \html, script injection)
 * and clamps macro expansion to prevent Billion-Laughs DoS attacks.
 */
export function renderSanitizedLatex(
  latex: string,
  options: LatexSanitizeOptions = {}
): string {
  const {
    displayMode = false,
    maxExpand = 1000,
    maxSize = 500,
  } = options;

  if (!latex || typeof latex !== 'string') {
    return '';
  }

  return katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    trust: false, // Strictly forbids dangerous commands (\href{javascript:...}, \url, \htmlData)
    strict: 'warn',
    maxExpand,
    maxSize,
  });
}

/**
 * Prohibited identifier patterns to mitigate AST prototype walking and code execution attacks.
 */
const FORBIDDEN_IDENTIFIERS = [
  '__proto__',
  'constructor',
  'prototype',
  'eval',
  'Function',
  'process',
  'global',
  'window',
  'document',
  'import',
];

/**
 * Validate that a math expression string does not contain forbidden prototype traversal tokens.
 */
export function validateExpressionSecurity(expr: string): void {
  if (typeof expr !== 'string') {
    throw new TypeError('Math expression must be a string');
  }

  for (const token of FORBIDDEN_IDENTIFIERS) {
    const regex = new RegExp(`\\b${token}\\b`, 'i');
    if (regex.test(expr)) {
      throw new Error(`Security Violation: Forbidden identifier "${token}" detected in expression`);
    }
  }
}

/**
 * Create a sandboxed evaluation scope.
 * Math.js typed-functions natively support Map instances, which are immune to
 * JavaScript Object prototype pollution (__proto__, constructor tampering).
 */
export function createSandboxedScope(
  variables: Record<string, number> = {}
): Map<string, number> {
  const scope = new Map<string, number>();
  for (const [key, value] of Object.entries(variables)) {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      scope.set(key, value);
    }
  }
  return scope;
}

/**
 * Safely evaluate a single math expression with isolated scope and AST security validation.
 */
export function safeEvaluateMath(
  expr: string,
  scope?: Map<string, number> | Record<string, number>
): number {
  validateExpressionSecurity(expr);

  const evaluationScope = scope instanceof Map
    ? scope
    : scope ? createSandboxedScope(scope) : new Map<string, number>();

  const result = evaluate(expr, evaluationScope);
  if (typeof result !== 'number') {
    throw new TypeError(`Expected scalar numeric result from math evaluation, got: ${typeof result}`);
  }
  return result;
}

/**
 * Safely pre-compile a math expression for high-throughput evaluation.
 */
export function safeCompileMath(expr: string) {
  validateExpressionSecurity(expr);
  const compiled = compile(expr);

  return {
    evaluate: (scope?: Map<string, number> | Record<string, number>): number => {
      const evaluationScope = scope instanceof Map
        ? scope
        : scope ? createSandboxedScope(scope) : new Map<string, number>();

      const result = compiled.evaluate(evaluationScope);
      if (typeof result !== 'number') {
        throw new TypeError(`Expected scalar numeric result from compiled math, got: ${typeof result}`);
      }
      return result;
    },
  };
}
