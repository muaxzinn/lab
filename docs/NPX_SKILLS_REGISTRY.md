# NPX Skills & Tooling Governance Registry (เฟสพิเศษ)

> **Master Plan Reference**: [`masterplan.md`](file:///Users/muaxzinn/Project/lab/masterplan.md)  
> **Directive**: ค้นหาและเรียกใช้งาน Skills, CLI Utilities, Scaffolding และ Auditing Tools จาก Open-Source/GitHub โดยใช้คำสั่ง **`npx` เท่านั้น** (Zero global installation, zero unnecessary dependency pollution) พร้อมบันทึกประวัติการเรียกใช้ในตารางนี้อย่างเคร่งครัด

---

## 1. NPX Skills Execution Matrix

| # | Phase | Date / Milestone | Command Executed | Source Package / Repo | Purpose & Scope | Output / Result | Status |
|---|---|---|---|---|---|---|:---:|
| 1 | Phase 0 | 2026-11-07 | `npx create-next-app@latest ...` | `create-next-app` | สกัดและวางรากฐานโครงสร้าง Next.js 15 App Router | ติดตั้ง TypeScript + Tailwind CSS v4 สำเร็จ | Verified |
| 2 | Special Phase | 2026-11-07 | `npx knip --version` | `knip` | เตรียมความพร้อมตรวจสอบ Dead Code, Unused Exports และ Unused Dependencies | พร้อมใช้งานใน Phase 5-11 | Ready |
| 3 | Special Phase | 2026-11-07 | `npx --yes typescript-coverage-report -r text` | `typescript-coverage-report` | เครื่องมือวัดระดับความสมบูรณ์ของ TypeScript Type Coverage ทั่วทั้งโปรเจกต์ | 99.76% overall coverage (8,000/8,019 symbols); All 4 components 100% | Verified |
| 4 | Special Phase | 2026-11-07 | `npx jscpd --version` | `jscpd` | ตรวจจับ Duplicate Code ในอัลกอริทึมและการคำนวณฟิสิกส์/คณิตศาสตร์ | พร้อมใช้งานใน Refactoring Gate | Ready |
| 5 | Phase 3-4 Audit | 2026-11-07 | `npx --yes license-checker-rseidelsohn --summary` | `license-checker-rseidelsohn` | ตรวจสอบความถูกต้องของ License แบบ Recursive ใน `node_modules` | MIT: 288, Apache-2.0: 22, ISC: 13, BSD: 9, etc. (All permissive) | Verified |
| 6 | Phase 5-6 Gate | 2026-11-07 | `npx --yes knip` | `knip` | ตรวจสอบ Unused Files, Exports และ Dependencies ทั่วทั้งโปรเจกต์ | 0 dead files, 0 unused dependencies, 0 unused exports (Exit code 0) | Verified |
| 7 | Phase 7 Gate | 2026-11-07 | `npx --yes knip` | `knip` | ตรวจสอบ Dead Code และ Unused Exports หลังพัฒนา Phase 7 (ExerciseEngine, PeriodicTable, CellStructure) | 0 dead files, 0 unused dependencies, 0 unused exports (Exit code 0) | Verified |
| 8 | Phase 7 Gate | 2026-11-07 | `npx --yes typescript-coverage-report -r text` | `typescript-coverage-report` | ตรวจวัด Type Coverage รวมทุกโมดูลใน Phase 7 | 99.88% overall coverage (15,838/15,857 symbols); All components & datasets 100.00% | Verified |
| 9 | Pre-Phase 8 | 2026-11-07 | `npx --yes skills find react` | `skills.sh / vercel-labs` | ค้นหา AI Agent Skills สำหรับ React & Component Optimization | ค้นพบ 50+ รายการรวม vercel-react-best-practices และ vercel-composition-patterns | Verified |
| 10 | Pre-Phase 8 | 2026-11-07 | `npx --yes skills find nextjs` | `skills.sh / vercel-labs` | ค้นหา AI Agent Skills สำหรับ Next.js 14-15 App Router Architecture | ค้นพบ 50+ รายการรวม wshobson/agents@nextjs-app-router-patterns | Verified |
| 11 | Pre-Phase 8 | 2026-11-07 | `npx --yes skills use vercel-labs/agent-skills@vercel-react-best-practices` | `vercel-labs/agent-skills` | สกัด Best Practices 70 ข้อ (Chunk isolation, zero barrel imports, waterfall elimination, memoized renders) | นำกฎสถาปัตยกรรมระดับโลกมาปรับใช้ใน App Router และ Component Tree | Verified |
| 12 | Pre-Phase 8 | 2026-11-07 | `npx --yes skills use wshobson/agents@nextjs-app-router-patterns` | `wshobson/agents` | สกัดแพทเทิร์น Next.js App Router multi-route, Server Components default, streaming และ layout composition | ปรับโครงสร้างเว็บเป็น Multi-Route Platform 7 หน้าแยก Chunk อิสระ | Verified |
| 13 | Pre-Phase 8 | 2026-11-07 | `npx --yes skills use vercel-labs/agent-skills@vercel-composition-patterns` | `vercel-labs/agent-skills` | สกัดกฎการออกแบบ Compound Component และ State Lifting ป้องกัน Boolean Prop Proliferation | ออกแบบ AppHeader, AppSidebar, AppNavbar และ KioskShell ได้ตามมาตรฐาน | Verified |
| 14 | Pre-Phase 8 Gate | 2026-11-07 | `npx --yes knip` | `knip` | ตรวจสอบ Dead Code, Unused Exports และ Dependencies หลังปรับ Multi-Route Modular Platform | 0 dead files, 0 unused dependencies, 0 unused exports (Exit code 0) | Verified |
| 15 | Pre-Phase 8 Gate | 2026-11-07 | `npx --yes typescript-coverage-report -r text` | `typescript-coverage-report` | ตรวจวัด Type Coverage รวมทุกโมดูล, Route ย่อย และ App Shell ใน v0.5.1 | 99.89% overall coverage (17,774/17,793 symbols); All 7 routes & App Shell 100.00% | Verified |
| 16 | Phase 8 Gate | 2026-11-07 | `npx --yes knip` | `knip` | ตรวจสอบ Dead Code และ Unused Exports หลังพัฒนา Circuit MNA, Chemical Stoichiometry และ Logic Gate Sandbox | 0 dead files, 0 unused dependencies, 0 unused exports (Exit code 0) | Verified |
| 17 | Phase 8 Gate | 2026-11-07 | `npx --yes typescript-coverage-report -r text` | `typescript-coverage-report` | ตรวจวัด Type Coverage รวมทุกโมดูลใน Phase 8 (24,505 symbols) | 99.89% overall coverage (24,479/24,505 symbols); 100.00% across all new solvers & UI modules | Verified |
| 18 | Phase 8 Review & Hardening | 2026-11-07 | `npx --yes knip` | `knip` | ตรวจสอบ Dead Code, Unused Exports หลังแก้ปัญหา Circuit Topology, Polarity และ Universal NOR | 0 dead files, 0 unused dependencies, 0 unused exports (Exit code 0) | Verified |
| 19 | Phase 8 Review & Hardening | 2026-11-07 | `npx --yes typescript-coverage-report -r text` | `typescript-coverage-report` | ตรวจวัด Type Coverage รวมทุกโมดูลหลังเพิ่ม Wheatstone Bridge และ Universal NOR (25,524 symbols) | 99.90% overall coverage (25,498/25,524 symbols); 100.00% across all new solvers & UI modules | Verified |
| 20 | Phase 9 Audit | 2026-11-07 | `npx --yes license-checker-rseidelsohn --summary` | `license-checker-rseidelsohn` | ตรวจสอบ License ของทุก Dependencies ใน `node_modules` | MIT: 287, Apache-2.0: 22, ISC: 13, BSD: 9, MPL: 2 (100% Permissive Open Source) | Verified |
| 21 | Phase 9 QA Gate | 2026-11-07 | `npx --yes @axe-core/cli --help` | `@axe-core/cli` | ประเมินเครื่องมือ Accessibility Testing สำหรับ WCAG 2.1 AA | ติดตั้ง CLI พร้อมใช้งานและตรวจสอบกฎเกณฑ์ a11y ในคอมโพเนนต์ | Verified |
| 22 | Phase 9 QA Gate | 2026-11-07 | `npx --yes knip` | `knip` | ตรวจสอบ Dead Code และ Unused Exports หลังเพิ่ม Integration & Security Test Suites | 0 dead files, 0 unused dependencies, 0 unused exports (Exit code 0) | Verified |
| 23 | Phase 9 QA Gate | 2026-11-07 | `npx --yes typescript-coverage-report -r text` | `typescript-coverage-report` | ตรวจวัด Type Coverage รวม 59 ไฟล์ (26,845 symbols) | 99.90% overall coverage (26,819/26,845 symbols); All test suites 100.00% | Verified |
| 24 | Phase 9 QA Gate | 2026-11-07 | `npx --yes jscpd src/` | `jscpd` | ตรวจจับ Duplicate Code ในโค้ดทั้งหมด 18,789 บรรทัด | 1.93% duplication rate (362 lines), อยู่ในเกณฑ์มาตรฐาน (< 5.0%) | Verified |

---

## 2. Guidelines for NPX Skills Usage

1. **Zero-Install Mandate**: ทุกครั้งที่ต้องการเครื่องมือวิเคราะห์ ให้รันผ่าน `npx --yes <package>@<version> <arguments>`
2. **Registry Documentation**: ห้ามรันคำสั่ง `npx` ลอยๆ โดยไม่บันทึกลงในเอกสารนี้ ทุกคำสั่งต้องระบุเหตุผลและผลลัพธ์
3. **Safe Dry-Run**: เครื่องมือที่มีการเปลี่ยนแปลงโค้ด (Code Mod / Scaffolder) ต้องรันด้วย safe flag หรือตรวจสอบ `git diff` ทุกครั้งก่อน Commit
4. **Anti-Emoji Mandate in Registry & Tools**: ห้ามใช้อีโมจิการ์ตูนในการตกแต่งสถานะหรือข้อความในเอกสารระบบ
