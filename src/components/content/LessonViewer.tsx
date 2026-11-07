"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Layers,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Activity,
  Check,
  X,
} from "lucide-react";
import {
  type Lesson,
  type LessonStep,
  getLessonsByDiscipline,
  getLabActionLabel,
} from "@/lib/lesson-data";
import { renderSanitizedLatex } from "@/lib/math-sanitizer";

interface LessonViewerProps {
  discipline: Lesson["discipline"];
  defaultLessonId?: string;
  onOpenLabAction?: (actionTag: string) => void;
}

export function LessonViewer({
  discipline,
  defaultLessonId,
  onOpenLabAction,
}: LessonViewerProps) {
  const disciplineLessons = useMemo(() => getLessonsByDiscipline(discipline), [discipline]);

  const [selectedLessonId, setSelectedLessonId] = useState<string>(() => {
    if (defaultLessonId && disciplineLessons.some((l) => l.id === defaultLessonId)) {
      return defaultLessonId;
    }
    return disciplineLessons[0]?.id || "";
  });

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasRevealedAnswer, setHasRevealedAnswer] = useState<boolean>(false);
  const [isDeepTheoryExpanded, setIsDeepTheoryExpanded] = useState<boolean>(true);

  // Synchronize state when discipline or defaultLessonId props change
  useEffect(() => {
    setSelectedLessonId((currentId) => {
      if (defaultLessonId && disciplineLessons.some((l) => l.id === defaultLessonId)) {
        return defaultLessonId;
      }
      if (!disciplineLessons.some((l) => l.id === currentId)) {
        return disciplineLessons[0]?.id || "";
      }
      return currentId;
    });
    setCurrentStepIndex(0);
    setSelectedAnswerIndex(null);
    setHasRevealedAnswer(false);
  }, [defaultLessonId, disciplineLessons]);

  const activeLesson = disciplineLessons.find((l) => l.id === selectedLessonId) || disciplineLessons[0];
  const safeStepIndex = Math.min(
    currentStepIndex,
    Math.max(0, (activeLesson?.steps.length ?? 1) - 1)
  );
  const activeStep: LessonStep | undefined = activeLesson?.steps[safeStepIndex];

  // Reset step & checkpoint state when changing lessons
  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentStepIndex(0);
    setSelectedAnswerIndex(null);
    setHasRevealedAnswer(false);
  };

  const handleNextStep = () => {
    if (!activeLesson) return;
    if (currentStepIndex < activeLesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setHasRevealedAnswer(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setSelectedAnswerIndex(null);
      setHasRevealedAnswer(false);
    }
  };

  if (!activeLesson || !activeStep) {
    return (
      <div className="p-8 rounded-xl border border-neutral-800 bg-neutral-900/60 text-center text-neutral-400 font-sans">
        ไม่มีบทเรียนสำหรับวิชานี้ในขณะนี้
      </div>
    );
  }

  // Render KaTeX formula safely
  const renderedFormulaHtml = activeStep.formulaLatex
    ? renderSanitizedLatex(activeStep.formulaLatex, { displayMode: true })
    : null;

  return (
    <div className="space-y-6">
      {/* Lesson Selector Bar */}
      {disciplineLessons.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {disciplineLessons.map((lesson) => {
            const isSelected = lesson.id === activeLesson.id;
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => handleSelectLesson(lesson.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-neutral-900 border border-cyan-800/80 text-cyan-300 shadow-sm font-semibold"
                    : "bg-neutral-950 border border-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                <BookOpen className={`h-3.5 w-3.5 ${isSelected ? "text-cyan-400" : "text-neutral-500"}`} />
                <span>{lesson.title}</span>
                <span className="hidden sm:inline text-neutral-500 font-sans text-[11px]">
                  ({lesson.thaiTitle})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Lesson Container Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
        {/* Lesson Header Banner */}
        <div className="border-b border-neutral-800/80 bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="uppercase tracking-wider">Curriculum Module</span>
                <span>•</span>
                <span className="text-neutral-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activeLesson.estimatedMinutes} min
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                  {activeLesson.level}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-100">
                {activeLesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans">
                {activeLesson.thaiOverview}
              </p>
            </div>

            {/* Step Progress Tracker */}
            <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
              <span className="text-xs font-mono text-neutral-400">
                ขั้นตอนที่ {currentStepIndex + 1} จาก {activeLesson.steps.length}
              </span>
              <div className="flex items-center gap-1.5">
                {activeLesson.steps.map((step, idx) => (
                  <button
                    key={step.stepNumber}
                    type="button"
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setSelectedAnswerIndex(null);
                      setHasRevealedAnswer(false);
                    }}
                    aria-label={`Go to step ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentStepIndex
                        ? "w-8 bg-cyan-400"
                        : idx < currentStepIndex
                        ? "w-4 bg-emerald-500/80"
                        : "w-2.5 bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step Body Content */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Step Title & Core Summary */}
          <div className="space-y-3 pb-6 border-b border-neutral-800/80">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                {activeStep.stepNumber}
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-neutral-100">
                {activeStep.title}
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 block">
                Fundamental Core Invariant (หัวใจสำคัญ)
              </span>
              <p className="text-sm font-sans text-neutral-200 leading-relaxed font-medium">
                {activeStep.thaiSummary}
              </p>
              <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                {activeStep.summary}
              </p>
            </div>
          </div>

          {/* KaTeX Mathematical Formulation (if present) */}
          {renderedFormulaHtml && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Mathematical Formulation & Governing Law
                </span>
                <span className="text-[10px] font-mono text-neutral-500">KaTeX Typeset</span>
              </div>

              {/* Rendered Equation */}
              <div
                className="py-3 px-4 rounded-lg bg-neutral-950 border border-neutral-800/80 overflow-x-auto text-neutral-100 flex justify-center text-lg sm:text-xl"
                dangerouslySetInnerHTML={{ __html: renderedFormulaHtml }}
              />

              {/* Symbol Legend */}
              {activeStep.formulaSymbols && activeStep.formulaSymbols.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                  {activeStep.formulaSymbols.map((sym, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/60 text-xs font-mono flex items-start gap-2"
                    >
                      <span className="text-cyan-300 font-semibold flex-shrink-0">{sym.symbol}:</span>
                      <span className="text-neutral-400 leading-snug">
                        {sym.meaning} {sym.unit && <span className="text-neutral-500">[{sym.unit}]</span>}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Deep Theoretical Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>Deep Theoretical Analysis (การวิเคราะห์ทฤษฎีเชิงลึก)</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsDeepTheoryExpanded((prev) => !prev)}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
              >
                {isDeepTheoryExpanded ? "ย่อทฤษฎี" : "ขยายทฤษฎี"}
              </button>
            </div>

            {isDeepTheoryExpanded && (
              <div className="space-y-3 text-sm font-sans text-neutral-300 leading-relaxed pl-2 border-l-2 border-emerald-500/40">
                {activeStep.deepTheory.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          {/* Real-World Engineering & Scientific Application */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <Lightbulb className="h-3.5 w-3.5" />
              <span>Real-World Application: {activeStep.application.thaiTitle}</span>
            </div>
            <h5 className="text-base font-heading font-medium text-neutral-100">
              {activeStep.application.title}
            </h5>
            <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed">
              {activeStep.application.thaiDescription}
            </p>
            <p className="text-xs font-sans text-neutral-500 leading-relaxed">
              {activeStep.application.description}
            </p>
          </div>

          {/* Concept Checkpoint (Interactive Understanding Check) */}
          {activeStep.checkpoint && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                  <HelpCircle className="h-4 w-4" />
                  <span>Concept Checkpoint (ตรวจสอบความเข้าใจ)</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Instant Verification</span>
              </div>

              <div className="space-y-1">
                <p className="text-sm sm:text-base font-sans font-medium text-neutral-100">
                  {activeStep.checkpoint.thaiQuestion}
                </p>
                <p className="text-xs font-sans text-neutral-400">
                  {activeStep.checkpoint.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {activeStep.checkpoint.options.map((option, optIdx) => {
                  const isSelected = selectedAnswerIndex === optIdx;
                  const isCorrect = optIdx === activeStep.checkpoint?.correctIndex;

                  let optionStyle = "bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700";
                  if (hasRevealedAnswer) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-medium";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "bg-rose-950/40 border-rose-500/80 text-rose-300";
                    } else {
                      optionStyle = "bg-neutral-950/50 border-neutral-800/60 text-neutral-500";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-neutral-900 border-cyan-500/80 text-cyan-200";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasRevealedAnswer}
                      onClick={() => {
                        setSelectedAnswerIndex(optIdx);
                        setHasRevealedAnswer(true);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {hasRevealedAnswer && (
                        <span>
                          {isCorrect ? (
                            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          ) : isSelected ? (
                            <X className="h-4 w-4 text-rose-400 flex-shrink-0" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reveal Explanation */}
              {hasRevealedAnswer && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5 animate-fadeIn">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 block">
                    Conceptual Explanation (คำอธิบายเฉลย)
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-neutral-200 leading-relaxed">
                    {activeStep.checkpoint.thaiExplanation}
                  </p>
                  <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                    {activeStep.checkpoint.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Interactive Lab Link Action (if registered) */}
          {onOpenLabAction && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => onOpenLabAction(activeLesson.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/60 text-cyan-300 text-xs font-mono hover:border-cyan-400 transition"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{getLabActionLabel(activeLesson.id, activeLesson.discipline)}</span>
              </button>
            </div>
          )}
        </div>

        {/* Step Navigation Footer */}
        <div className="border-t border-neutral-800 bg-neutral-900/30 p-4 sm:p-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100 hover:border-neutral-700 disabled:opacity-40 disabled:pointer-events-none transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>ขั้นตอนก่อนหน้า</span>
          </button>

          <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
            Step {currentStepIndex + 1} of {activeLesson.steps.length}
          </span>

          <button
            type="button"
            onClick={handleNextStep}
            disabled={currentStepIndex === activeLesson.steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-cyan-950/60 border border-cyan-800 text-cyan-300 hover:bg-cyan-900/80 hover:border-cyan-600 disabled:opacity-40 disabled:pointer-events-none transition font-semibold"
          >
            <span>ขั้นตอนถัดไป</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
