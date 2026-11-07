import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  EXERCISE_BANK,
  getQuestionsBySubject,
  getQuestionsByDifficulty,
  evaluateAnswer,
  parseNumericInput,
} from '../../lib/exercise-bank.ts';

describe('Universal Practice & Exercise Engine (FEAT-21)', () => {
  it('validates question bank structural integrity and coverage', () => {
    assert.ok(EXERCISE_BANK.length >= 15, 'Exercise bank should contain at least 15 curriculum questions');

    const ids = new Set<string>();
    const subjects = new Set<string>();
    const types = new Set<string>();

    for (const q of EXERCISE_BANK) {
      assert.ok(!ids.has(q.id), `Duplicate question id: ${q.id}`);
      ids.add(q.id);
      subjects.add(q.subject);
      types.add(q.type);

      assert.ok(q.title.length > 0, `Question ${q.id} missing title`);
      assert.ok(q.prompt.length > 0, `Question ${q.id} missing prompt`);
      assert.ok(q.hints.length >= 1, `Question ${q.id} should have at least 1 hint`);
      assert.ok(q.explanation.steps.length >= 1, `Question ${q.id} should have explanation steps`);

      if (q.type === 'single-choice' || q.type === 'multiple-select') {
        assert.ok(q.options && q.options.length >= 3, `Choice question ${q.id} needs at least 3 options`);
        const optIds = new Set(q.options.map((o) => o.id));

        if (q.type === 'single-choice') {
          assert.ok(optIds.has(q.correctAnswer as string), `Question ${q.id} correctAnswer must exist in options`);
        } else {
          const correctList = q.correctAnswer as string[];
          for (const c of correctList) {
            assert.ok(optIds.has(c), `Question ${q.id} multi-select answer ${c} must exist in options`);
          }
        }
      }
    }

    // Verify all 5 subjects are covered
    assert.ok(subjects.has('math'));
    assert.ok(subjects.has('physics'));
    assert.ok(subjects.has('chemistry'));
    assert.ok(subjects.has('biology'));
    assert.ok(subjects.has('thai'));

    // Verify all 4 question types are covered
    assert.ok(types.has('single-choice'));
    assert.ok(types.has('multiple-select'));
    assert.ok(types.has('fill-in-blank'));
    assert.ok(types.has('numeric'));
  });

  describe('Answer Evaluation & Grading Logic', () => {
    it('correctly grades single-choice questions', () => {
      const q = EXERCISE_BANK.find((item) => item.id === 'math-01')!;
      assert.ok(q);

      const correctEval = evaluateAnswer(q, 'opt-a');
      assert.strictEqual(correctEval.isCorrect, true);
      assert.strictEqual(correctEval.score, 1);

      const incorrectEval = evaluateAnswer(q, 'opt-b');
      assert.strictEqual(incorrectEval.isCorrect, false);
      assert.strictEqual(incorrectEval.score, 0);

      const emptyEval = evaluateAnswer(q, '');
      assert.strictEqual(emptyEval.isCorrect, false);
    });

    it('correctly grades multiple-select questions with strict set equality', () => {
      const q = EXERCISE_BANK.find((item) => item.id === 'math-03')!;
      assert.ok(q);

      // Exact match
      const perfectEval = evaluateAnswer(q, ['opt-det', 'opt-rank', 'opt-null']);
      assert.strictEqual(perfectEval.isCorrect, true);
      assert.strictEqual(perfectEval.score, 1);

      // Inverted order should still pass
      const reorderedEval = evaluateAnswer(q, ['opt-null', 'opt-det', 'opt-rank']);
      assert.strictEqual(reorderedEval.isCorrect, true);

      // Incomplete subset fails
      const partialEval = evaluateAnswer(q, ['opt-det', 'opt-rank']);
      assert.strictEqual(partialEval.isCorrect, false);
      assert.strictEqual(partialEval.score, 0);

      // Extra incorrect option fails
      const extraEval = evaluateAnswer(q, ['opt-det', 'opt-rank', 'opt-null', 'opt-zero']);
      assert.strictEqual(extraEval.isCorrect, false);
    });

    it('correctly grades fill-in-the-blank questions with normalization', () => {
      const q = EXERCISE_BANK.find((item) => item.id === 'phys-03')!;
      assert.ok(q);

      // Exact Thai match
      assert.strictEqual(evaluateAnswer(q, 'เพิ่มขึ้น').isCorrect, true);

      // Whitespace trimmed
      assert.strictEqual(evaluateAnswer(q, '  เพิ่มขึ้น  ').isCorrect, true);

      // Acceptable variation (English)
      assert.strictEqual(evaluateAnswer(q, 'Increase').isCorrect, true);
      assert.strictEqual(evaluateAnswer(q, 'INCREASE').isCorrect, true);

      // Incorrect answer
      assert.strictEqual(evaluateAnswer(q, 'ลดลง').isCorrect, false);
    });

    it('correctly grades numeric questions with tolerance boundary checking', () => {
      const q = EXERCISE_BANK.find((item) => item.id === 'phys-01')!;
      assert.ok(q); // correctAnswer = 450, tolerance = 0.1

      // Exact number
      assert.strictEqual(evaluateAnswer(q, 450).isCorrect, true);

      // Exact string number
      assert.strictEqual(evaluateAnswer(q, '450').isCorrect, true);

      // Within tolerance (450.05 vs 450, tolerance 0.1)
      assert.strictEqual(evaluateAnswer(q, 450.05).isCorrect, true);

      // Outside tolerance (450.3 vs 450)
      assert.strictEqual(evaluateAnswer(q, 450.3).isCorrect, false);

      // Non-numeric garbage string
      assert.strictEqual(evaluateAnswer(q, 'not-a-number').isCorrect, false);

      // Scientific notation (4.5e2 == 450)
      assert.strictEqual(evaluateAnswer(q, '4.5e2').isCorrect, true);

      // Comma decimal format ("450,05")
      assert.strictEqual(evaluateAnswer(q, '450,05').isCorrect, true);

      // Thai numerals ("๔๕๐")
      assert.strictEqual(evaluateAnswer(q, '๔๕๐').isCorrect, true);

      // Rejects invalid trailing unit suffix ("450J")
      assert.strictEqual(evaluateAnswer(q, '450J').isCorrect, false);

      // Rejects invalid unit text ("12m/s")
      assert.strictEqual(evaluateAnswer(q, '12m/s').isCorrect, false);
    });

    it('validates standalone parseNumericInput helper across edge cases', () => {
      assert.strictEqual(parseNumericInput(450), 450);
      assert.strictEqual(parseNumericInput('450'), 450);
      assert.strictEqual(parseNumericInput('  12.5  '), 12.5);
      assert.strictEqual(parseNumericInput('12,5'), 12.5);
      assert.strictEqual(parseNumericInput('1,000.5'), 1000.5);
      assert.strictEqual(parseNumericInput('1.000,5'), 1000.5);
      assert.strictEqual(parseNumericInput('๔๕๐'), 450);
      assert.strictEqual(parseNumericInput('4.5e2'), 450);
      assert.strictEqual(parseNumericInput('-15.3'), -15.3);

      // Invalid / Malicious inputs
      assert.strictEqual(parseNumericInput('450J'), null);
      assert.strictEqual(parseNumericInput('12abc'), null);
      assert.strictEqual(parseNumericInput(''), null);
      assert.strictEqual(parseNumericInput('   '), null);
      assert.strictEqual(parseNumericInput(null), null);
      assert.strictEqual(parseNumericInput(undefined), null);
      assert.strictEqual(parseNumericInput(Infinity), null);
      assert.strictEqual(parseNumericInput(NaN), null);
    });

    it('handles null, undefined, empty string, and empty array answers safely', () => {
      const q = EXERCISE_BANK[0];
      assert.strictEqual(evaluateAnswer(q, null).isCorrect, false);
      assert.strictEqual(evaluateAnswer(q, undefined).isCorrect, false);
      assert.strictEqual(evaluateAnswer(q, '').isCorrect, false);
      assert.strictEqual(evaluateAnswer(q, '   ').isCorrect, false);
      assert.strictEqual(evaluateAnswer(q, []).isCorrect, false);
    });
  });

  describe('Filtering Helpers', () => {
    it('filters questions by subject', () => {
      const thaiQuestions = getQuestionsBySubject('thai');
      assert.ok(thaiQuestions.length >= 3);
      assert.ok(thaiQuestions.every((q) => q.subject === 'thai'));

      const allQuestions = getQuestionsBySubject('all');
      assert.strictEqual(allQuestions.length, EXERCISE_BANK.length);
    });

    it('filters questions by difficulty', () => {
      const easyQuestions = getQuestionsByDifficulty('easy');
      assert.ok(easyQuestions.length > 0);
      assert.ok(easyQuestions.every((q) => q.difficulty === 'easy'));

      const mediumQuestions = getQuestionsByDifficulty('medium');
      assert.ok(mediumQuestions.length > 0);
      assert.ok(mediumQuestions.every((q) => q.difficulty === 'medium'));

      const hardQuestions = getQuestionsByDifficulty('hard');
      assert.ok(hardQuestions.length >= 5, 'Should have at least 5 hard questions spanning all subjects');
      assert.ok(hardQuestions.every((q) => q.difficulty === 'hard'));

      const allQuestions = getQuestionsByDifficulty('all');
      assert.strictEqual(allQuestions.length, EXERCISE_BANK.length);
    });
  });
});
