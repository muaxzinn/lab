/**
 * Deep Interactive Curriculum Lessons Dataset (FEAT-01)
 * High-rigor, step-by-step lessons with KaTeX formulas, deep theoretical derivations,
 * real-world applications, and concept checkpoints across 6 core disciplines.
 */

import type { Lesson } from "./lessons/types.ts";
import { PHYSICS_LESSONS } from "./lessons/physics.ts";
import { CHEMISTRY_LESSONS } from "./lessons/chemistry.ts";
import { BIOLOGY_LESSONS } from "./lessons/biology.ts";
import { MATH_LESSONS } from "./lessons/mathematics.ts";
import { CS_LESSONS } from "./lessons/cs.ts";
import { THAI_LESSONS } from "./lessons/thai.ts";

export * from "./lessons/types.ts";

export const LESSONS: Lesson[] = [
  ...PHYSICS_LESSONS,
  ...CHEMISTRY_LESSONS,
  ...BIOLOGY_LESSONS,
  ...MATH_LESSONS,
  ...CS_LESSONS,
  ...THAI_LESSONS,
];

/**
 * Filter lessons by discipline
 */
export function getLessonsByDiscipline(discipline: Lesson["discipline"]): Lesson[] {
  return LESSONS.filter((l) => l.discipline === discipline);
}

/**
 * Get lesson by ID
 */
export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
