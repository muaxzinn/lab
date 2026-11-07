"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Award,
  Compass,
  Check,
  Flame,
} from "lucide-react";
import {
  EXERCISE_BANK,
  SUBJECT_METADATA,
  evaluateAnswer,
  type ExerciseQuestion,
  type ExerciseSubject,
  type DifficultyLevel,
  type EvaluationResult,
} from "@/lib/exercise-bank";
import { renderSanitizedLatex } from "@/lib/math-sanitizer";

export function ExerciseEngine() {
  const [selectedSubject, setSelectedSubject] = useState<ExerciseSubject | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "all">("all");
  const [currentIdx, setCurrentIdx] = useState(0);

  // User state per question ID
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[] | number>>({});
  const [submittedStates, setSubmittedStates] = useState<Record<string, EvaluationResult>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState(0);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return EXERCISE_BANK.filter((q) => {
      const matchSub = selectedSubject === "all" || q.subject === selectedSubject;
      const matchDiff = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
      return matchSub && matchDiff;
    });
  }, [selectedSubject, selectedDifficulty]);

  // Safe active index & question
  const safeIdx = filteredQuestions.length > 0
    ? Math.min(Math.max(0, currentIdx), filteredQuestions.length - 1)
    : 0;
  const currentQuestion: ExerciseQuestion | undefined = filteredQuestions[safeIdx];

  // Overall Score Calculation
  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    for (const q of EXERCISE_BANK) {
      const res = submittedStates[q.id];
      if (res) {
        answered++;
        if (res.isCorrect) correct++;
      }
    }
    const percent = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, correct, percent, total: EXERCISE_BANK.length };
  }, [submittedStates]);

  const activeAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const submission = currentQuestion ? submittedStates[currentQuestion.id] : undefined;
  const activeHintsCount = currentQuestion ? (revealedHints[currentQuestion.id] ?? 0) : 0;

  // Validation: answer cannot be empty or zero-length selection
  const isAnswerEmpty = useMemo(() => {
    if (activeAnswer === undefined || activeAnswer === null) return true;
    if (typeof activeAnswer === "string") return activeAnswer.trim() === "";
    if (Array.isArray(activeAnswer)) return activeAnswer.length === 0;
    return false;
  }, [activeAnswer]);

  // Handlers
  const handleSelectOption = (optId: string) => {
    if (!currentQuestion || submission) return; // Locked once submitted until reset

    if (currentQuestion.type === "single-choice") {
      setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: optId }));
    } else if (currentQuestion.type === "multiple-select") {
      const currentList = Array.isArray(activeAnswer) ? [...activeAnswer] : [];
      const exists = currentList.includes(optId);
      const nextList = exists ? currentList.filter((id) => id !== optId) : [...currentList, optId];
      setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: nextList }));
    }
  };

  const handleTextOrNumberChange = (val: string) => {
    if (!currentQuestion || submission) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
  };

  const handleSubmit = () => {
    if (!currentQuestion || submission) return;
    const result = evaluateAnswer(currentQuestion, activeAnswer);
    setSubmittedStates((prev) => ({ ...prev, [currentQuestion.id]: result }));

    if (result.isCorrect) {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleResetCurrent = () => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
    setSubmittedStates((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
    setRevealedHints((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const handleRevealNextHint = () => {
    if (!currentQuestion || activeHintsCount >= currentQuestion.hints.length) return;
    setRevealedHints((prev) => ({
      ...prev,
      [currentQuestion.id]: activeHintsCount + 1,
    }));
  };

  const handleResetEntireQuiz = () => {
    setUserAnswers({});
    setSubmittedStates({});
    setRevealedHints({});
    setStreak(0);
    setCurrentIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Engine Header & Overall Telemetry HUD */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-cyan-400">
              <BookOpen className="h-5 w-5 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-semibold text-lg text-neutral-100">
                  Universal Practice & Exercise Engine
                </h2>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/80 text-cyan-300">
                  FEAT-21 &bull; Auto-Grading & Hints
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                ระบบฝึกทำโจทย์แบบเลือกตอบ หลายคำตอบ เติมคำ และคำนวณตัวเลข พร้อมเฉลยละเอียดและแสดงสูตร KaTeX
              </p>
            </div>
          </div>

          {/* Quick Stats Telemetry Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-xs font-mono">
              <Award className="h-4 w-4 text-emerald-400" />
              <span className="text-neutral-400">Score:</span>
              <span className="text-neutral-100 font-bold">
                {stats.correct} / {stats.answered} ({stats.percent}%)
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center gap-2 text-xs font-mono">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-neutral-400">Streak:</span>
              <span className="text-orange-400 font-bold">{streak}</span>
            </div>

            <button
              type="button"
              onClick={handleResetEntireQuiz}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-xs font-mono text-neutral-300 flex items-center gap-1.5 transition-colors"
              title="Reset all question responses"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset Quiz</span>
            </button>
          </div>
        </div>

        {/* Filter Controls: Subjects & Difficulties */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {/* Subject Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => {
                setSelectedSubject("all");
                setCurrentIdx(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors whitespace-nowrap ${
                selectedSubject === "all"
                  ? "bg-cyan-950/90 text-cyan-300 border border-cyan-700/80 font-medium"
                  : "bg-neutral-950 text-neutral-400 border border-neutral-850 hover:bg-neutral-900"
              }`}
            >
              All Subjects ({EXERCISE_BANK.length})
            </button>

            {(Object.keys(SUBJECT_METADATA) as ExerciseSubject[]).map((sub) => {
              const isSel = selectedSubject === sub;
              const meta = SUBJECT_METADATA[sub];
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => {
                    setSelectedSubject(sub);
                    setCurrentIdx(0);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors whitespace-nowrap border ${
                    isSel
                      ? `${meta.badge} font-semibold shadow-sm`
                      : "bg-neutral-950 text-neutral-400 border-neutral-850 hover:bg-neutral-900 hover:text-neutral-200"
                  }`}
                >
                  {meta.name}
                </button>
              );
            })}
          </div>

          {/* Difficulty Dropdown / Tabs */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 self-start sm:self-auto">
            <span className="text-[11px] font-mono text-neutral-400 px-1.5">Diff:</span>
            {(["all", "easy", "medium", "hard"] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => {
                  setSelectedDifficulty(diff);
                  setCurrentIdx(0);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors capitalize ${
                  selectedDifficulty === diff
                    ? "bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Question Palette / Navigation Jump Bar */}
        {filteredQuestions.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-neutral-850">
            <span className="text-xs font-mono text-neutral-500 whitespace-nowrap pr-1">
              Questions ({filteredQuestions.length}):
            </span>
            {filteredQuestions.map((q, idx) => {
              const isCurrent = idx === safeIdx;
              const res = submittedStates[q.id];
              const hasAnswered = !!res;

              return (
                <button
                  key={q.id}
                  type="button"
                  aria-label={`Jump to question ${idx + 1}`}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-7 w-7 rounded-md text-xs font-mono flex items-center justify-center transition-all border ${
                    isCurrent
                      ? "ring-2 ring-cyan-400 font-bold bg-neutral-800 text-cyan-300 border-neutral-600"
                      : hasAnswered
                      ? res.isCorrect
                        ? "bg-emerald-950/60 border-emerald-700/80 text-emerald-300"
                        : "bg-rose-950/60 border-rose-700/80 text-rose-300"
                      : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:bg-neutral-900"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Question Card Stage or Empty State */}
      {!currentQuestion ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-12 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-neutral-800 border border-neutral-700 mx-auto flex items-center justify-center text-neutral-400">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-semibold text-neutral-200">
              ไม่พบโจทย์ที่ตรงกับเงื่อนไขการกรอง
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              ไม่มีข้อสอบในหมวดหมู่วิชาหรือระดับความยากที่เลือกในขณะนี้
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedSubject("all");
              setSelectedDifficulty("all");
              setCurrentIdx(0);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-neutral-950 font-mono text-xs font-semibold transition-colors"
          >
            Clear Filters (แสดงโจทย์ทั้งหมด)
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8 space-y-6">
          {/* Question Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                  SUBJECT_METADATA[currentQuestion.subject].badge
                }`}
              >
                {SUBJECT_METADATA[currentQuestion.subject].thaiName} ({SUBJECT_METADATA[currentQuestion.subject].name})
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 uppercase">
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
                {currentQuestion.type === "single-choice"
                  ? "Multiple Choice (1 ข้อ)"
                  : currentQuestion.type === "multiple-select"
                  ? "Multiple Select (หลายข้อ)"
                  : currentQuestion.type === "fill-in-blank"
                  ? "Fill-in-the-Blank"
                  : "Numeric Answer"}
              </span>
            </div>

            <span className="text-xs font-mono text-neutral-400">
              Question {safeIdx + 1} of {filteredQuestions.length}
            </span>
          </div>

        {/* Question Title & Prompt */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-heading font-semibold text-neutral-100">
            {currentQuestion.title}
          </h3>
          <p className="text-sm font-sans text-neutral-300 leading-relaxed whitespace-pre-line">
            {currentQuestion.prompt}
          </p>

          {/* Optional KaTeX Display Math for the question */}
          {currentQuestion.latexPrompt && (
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-center overflow-x-auto my-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: renderSanitizedLatex(currentQuestion.latexPrompt, { displayMode: true }),
                }}
              />
            </div>
          )}
        </div>

        {/* Input / Choice Options Section */}
        <div className="space-y-3 pt-2">
          {/* 1. SINGLE CHOICE */}
          {currentQuestion.type === "single-choice" && currentQuestion.options && (
            <div className="grid grid-cols-1 gap-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = activeAnswer === opt.id;
                const isCorrectOpt = submission && opt.id === currentQuestion.correctAnswer;
                const isIncorrectSel = submission && isSelected && !isCorrectOpt;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={!!submission}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between gap-4 ${
                      isCorrectOpt
                        ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500"
                        : isIncorrectSel
                        ? "bg-rose-950/70 border-rose-500/80 text-rose-200 ring-1 ring-rose-500"
                        : isSelected
                        ? "bg-cyan-950/50 border-cyan-500/80 text-cyan-200 ring-1 ring-cyan-500"
                        : "bg-neutral-950/60 border-neutral-850 hover:border-neutral-700 text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-950"
                            : "border-neutral-700 bg-neutral-900"
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-cyan-400" />}
                      </div>
                      <span className="text-xs sm:text-sm font-sans">{opt.text}</span>
                    </div>

                    {opt.latex && (
                      <div
                        className="font-mono text-xs text-neutral-300 shrink-0"
                        dangerouslySetInnerHTML={{
                          __html: renderSanitizedLatex(opt.latex, { displayMode: false }),
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. MULTIPLE SELECT */}
          {currentQuestion.type === "multiple-select" && currentQuestion.options && (
            <div className="grid grid-cols-1 gap-2.5">
              {currentQuestion.options.map((opt) => {
                const currentList = Array.isArray(activeAnswer) ? activeAnswer : [];
                const isSelected = currentList.includes(opt.id);
                const correctArr = Array.isArray(currentQuestion.correctAnswer)
                  ? (currentQuestion.correctAnswer as string[])
                  : [String(currentQuestion.correctAnswer)];
                const isCorrectOpt = submission && correctArr.includes(opt.id);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={!!submission}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between gap-4 ${
                      submission && isCorrectOpt
                        ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500"
                        : submission && isSelected && !isCorrectOpt
                        ? "bg-rose-950/70 border-rose-500/80 text-rose-200 ring-1 ring-rose-500"
                        : isSelected
                        ? "bg-cyan-950/50 border-cyan-500/80 text-cyan-200 ring-1 ring-cyan-500"
                        : "bg-neutral-950/60 border-neutral-850 hover:border-neutral-700 text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-950"
                            : "border-neutral-700 bg-neutral-900"
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                      </div>
                      <span className="text-xs sm:text-sm font-sans">{opt.text}</span>
                    </div>

                    {opt.latex && (
                      <div
                        className="font-mono text-xs text-neutral-300 shrink-0"
                        dangerouslySetInnerHTML={{
                          __html: renderSanitizedLatex(opt.latex, { displayMode: false }),
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 3. FILL IN THE BLANK */}
          {currentQuestion.type === "fill-in-blank" && (
            <div className="max-w-md space-y-2">
              <label className="text-xs font-mono text-neutral-400 block">
                พิมพ์คำตอบของคุณลงในช่องว่าง:
              </label>
              <input
                type="text"
                disabled={!!submission}
                value={typeof activeAnswer === "string" ? activeAnswer : ""}
                onChange={(e) => handleTextOrNumberChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !submission && handleSubmit()}
                placeholder="เช่น เพิ่มขึ้น, ATP, ไตรยางศ์..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm font-sans text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          )}

          {/* 4. NUMERIC INPUT */}
          {currentQuestion.type === "numeric" && (
            <div className="max-w-md space-y-2">
              <label className="text-xs font-mono text-neutral-400 block">
                ป้อนค่าตัวเลขที่คำนวณได้:
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  disabled={!!submission}
                  value={activeAnswer !== undefined ? String(activeAnswer) : ""}
                  onChange={(e) => handleTextOrNumberChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !submission && handleSubmit()}
                  placeholder="เช่น 450, 12, 3.0..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm font-mono text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <span className="absolute right-3.5 top-3 text-xs font-mono text-neutral-500">
                  Numeric
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls: Submit, Retry, Hints & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-2">
            {!submission ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isAnswerEmpty}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-600 text-neutral-950 font-heading font-semibold text-xs tracking-wide transition-all shadow-md shadow-cyan-950 flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                <span>Submit Answer (ตรวจคำตอบ)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetCurrent}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="h-4 w-4 text-cyan-400" />
                <span>Try Again (ทำซ้ำ)</span>
              </button>
            )}

            {/* Hint Reveal Button */}
            {currentQuestion.hints.length > 0 && (
              <button
                type="button"
                onClick={handleRevealNextHint}
                disabled={activeHintsCount >= currentQuestion.hints.length}
                className="px-3.5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs font-mono flex items-center gap-2 transition-colors disabled:opacity-40"
              >
                <HelpCircle className="h-4 w-4 text-amber-400" />
                <span>
                  Hint ({activeHintsCount}/{currentQuestion.hints.length})
                </span>
              </button>
            )}
          </div>

          {/* Prev / Next Question Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safeIdx === 0}
              onClick={() => setCurrentIdx(Math.max(0, safeIdx - 1))}
              className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 disabled:opacity-40 text-neutral-300 transition-colors"
              title="Previous Question"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-neutral-500 px-1">
              {safeIdx + 1} / {filteredQuestions.length}
            </span>
            <button
              type="button"
              disabled={safeIdx >= filteredQuestions.length - 1}
              onClick={() => setCurrentIdx(Math.min(filteredQuestions.length - 1, safeIdx + 1))}
              className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 disabled:opacity-40 text-neutral-300 transition-colors"
              title="Next Question"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Revealed Hints Box */}
        {activeHintsCount > 0 && (
          <div className="rounded-xl border border-amber-800/60 bg-amber-950/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>คำใบ้เพื่อช่วยในการคิด (Progressive Hints):</span>
            </div>
            <ul className="space-y-1.5 text-xs font-sans text-amber-200/90 pl-5 list-disc">
              {currentQuestion.hints.slice(0, activeHintsCount).map((hint, hIdx) => (
                <li key={hIdx}>{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submission Feedback & Step-by-Step Explanation */}
        {submission && (
          <div className="space-y-4 pt-2" aria-live="polite">
            {/* Feedback Banner */}
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                submission.isCorrect
                  ? "bg-emerald-950/40 border-emerald-600/80 text-emerald-200"
                  : "bg-rose-950/40 border-rose-600/80 text-rose-200"
              }`}
            >
              {submission.isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
              )}
              <div className="text-xs font-sans">
                <span className="font-semibold block">{submission.feedback}</span>
              </div>
            </div>

            {/* Step-by-Step Solution Breakdown */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 border-b border-neutral-850 pb-2">
                <Compass className="h-4 w-4" />
                <span className="font-semibold uppercase tracking-wider">
                  Step-by-Step Explanation (เฉลยวิธีทำอย่างละเอียด)
                </span>
              </div>

              <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                {currentQuestion.explanation.overview}
              </p>

              {/* Steps List */}
              <div className="space-y-1.5 pl-1">
                {currentQuestion.explanation.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs font-mono text-neutral-300">
                    <span className="text-cyan-400 font-semibold">{sIdx + 1}.</span>
                    <span className="font-sans text-neutral-300">{step}</span>
                  </div>
                ))}
              </div>

              {/* Optional Explanation Formula */}
              {currentQuestion.explanation.latexFormula && (
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-x-auto mt-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderSanitizedLatex(currentQuestion.explanation.latexFormula, {
                        displayMode: true,
                      }),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
