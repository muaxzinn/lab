# 🛠️ NPX Skills & Tooling Governance Registry (เฟสพิเศษ)

> **Master Plan Reference**: [`masterplan.md`](file:///Users/muaxzinn/Project/lab/masterplan.md)  
> **Directive**: ค้นหาและเรียกใช้งาน Skills, CLI Utilities, Scaffolding และ Auditing Tools จาก Open-Source/GitHub โดยใช้คำสั่ง **`npx` เท่านั้น** (Zero global installation, zero unnecessary dependency pollution) พร้อมบันทึกประวัติการเรียกใช้ในตารางนี้อย่างเคร่งครัด

---

## 1. NPX Skills Execution Matrix

| # | Phase | Date / Milestone | Command Executed | Source Package / Repo | Purpose & Scope | Output / Result | Status |
|---|---|---|---|---|---|---|:---:|
| 1 | Phase 0 | 2026-11-07 | `npx create-next-app@latest ...` | `create-next-app` | สกัดและวางรากฐานโครงสร้าง Next.js 15 App Router | ติดตั้ง TypeScript + Tailwind CSS v4 สำเร็จ | Verified |
| 2 | Special Phase | 2026-11-07 | `npx knip --version` | `knip` | เตรียมความพร้อมตรวจสอบ Dead Code, Unused Exports และ Unused Dependencies | พร้อมใช้งานใน Phase 5-11 | Ready |
| 3 | Special Phase | 2026-11-07 | `npx type-coverage` | `type-coverage` | เครื่องมือวัดระดับความสมบูรณ์ของ TypeScript Type Coverage แบบ 100% | พร้อมใช้งานใน Quality Gate | Ready |
| 4 | Special Phase | 2026-11-07 | `npx jscpd --version` | `jscpd` | ตรวจจับ Duplicate Code ในอัลกอริทึมและการคำนวณฟิสิกส์/คณิตศาสตร์ | พร้อมใช้งานใน Refactoring Gate | Ready |
| 5 | Special Phase | 2026-11-07 | `npx license-checker-rseidelsohn` | `license-checker-rseidelsohn` | ตรวจสอบความถูกต้องของ License แบบ Recursive ใน `node_modules` | พร้อมใช้งานใน Phase 3-11 Audit | Ready |

---

## 2. Guidelines for NPX Skills Usage

1. **Zero-Install Mandate**: ทุกครั้งที่ต้องการเครื่องมือวิเคราะห์ ให้รันผ่าน `npx --yes <package>@<version> <arguments>`
2. **Registry Documentation**: ห้ามรันคำสั่ง `npx` ลอยๆ โดยไม่บันทึกลงในเอกสารนี้ ทุกคำสั่งต้องระบุเหตุผลและผลลัพธ์
3. **Safe Dry-Run**: เครื่องมือที่มีการเปลี่ยนแปลงโค้ด (Code Mod / Scaffolder) ต้องรันด้วย safe flag หรือตรวจสอบ `git diff` ทุกครั้งก่อน Commit
