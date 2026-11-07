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

/**
 * Resolves contextually tailored action button text for launching laboratories from a lesson
 */
export function getLabActionLabel(lessonId: string, discipline: Lesson["discipline"]): string {
  if (discipline === "mathematics") {
    return "เปิดเครื่องมือวาดกราฟคณิตศาสตร์ (Mafs 2D Grapher)";
  }
  if (discipline === "cs") {
    return "เปิดแซนด์บ็อกซ์วงจรตรรกะดิจิทัล (Logic Gate Simulator)";
  }
  if (discipline === "thai") {
    return "เปิดสตูดิอสัทศาสตร์และไตรยางศ์ (Phonology Visualizer)";
  }
  if (discipline === "physics") {
    if (lessonId.includes("circuit") || lessonId.includes("kirchhoff")) {
      return "เปิดตัวจำลองวงจรไฟฟ้ากระแสตรง (MNA DC Circuit Simulator)";
    }
    if (lessonId.includes("projectile") || lessonId.includes("circular")) {
      return "ทดลองคำนวณวิถีโพรเจกไทล์และวงโคจร (Verlet Orbit Mechanics)";
    }
    return "เปิดแบบจำลองระบบสุริยะ 3D (3D Keplerian Solar System)";
  }
  if (discipline === "chemistry") {
    if (lessonId.includes("equilibrium") || lessonId.includes("stoichiometry")) {
      return "เปิดเครื่องมือดุลสมการเคมี (Gauss-Jordan Balancer)";
    }
    return "เปิดโมเลกุลนี้ใน 3D Molecular Lab";
  }
  if (discipline === "biology") {
    if (
      lessonId.includes("organelle") ||
      lessonId.includes("membrane") ||
      lessonId.includes("energetics") ||
      lessonId.includes("atp")
    ) {
      return "เปิดแบบจำลองเซลล์ยูแคริโอต 3D (3D Cytology Explorer)";
    }
    return "เปิดเมทริกซ์ออร์แกเนลล์และภาพตัดขวาง 2D (Cell Matrix)";
  }
  return "เปิดห้องปฏิบัติการจำลองสำหรับบทเรียนนี้";
}
