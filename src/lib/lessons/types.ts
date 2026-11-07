/**
 * Curriculum Lesson Types & Domain Interfaces (FEAT-01)
 */

export interface FormulaSymbol {
  symbol: string;
  meaning: string;
  unit?: string;
}

export interface LessonCheckpoint {
  question: string;
  thaiQuestion: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  thaiExplanation: string;
}

export interface LessonStep {
  stepNumber: number;
  title: string;
  thaiTitle: string;
  summary: string;
  thaiSummary: string;
  deepTheory: string[];
  formulaLatex?: string;
  formulaSymbols?: FormulaSymbol[];
  application: {
    title: string;
    thaiTitle: string;
    description: string;
    thaiDescription: string;
  };
  checkpoint?: LessonCheckpoint;
}

export interface Lesson {
  id: string;
  discipline: "physics" | "chemistry" | "biology" | "mathematics" | "cs" | "thai";
  title: string;
  thaiTitle: string;
  estimatedMinutes: number;
  level: "Foundation" | "Intermediate" | "Advanced";
  overview: string;
  thaiOverview: string;
  tags: string[];
  steps: LessonStep[];
}
