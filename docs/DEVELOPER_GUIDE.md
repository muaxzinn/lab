# Developer Architecture Manual & Extensibility Guide

> **Project**: Interactive Learning Platform  
> **Version**: v1.0.0 Production Release  
> **Master Plan Reference**: [`masterplan.md`](file:///Users/muaxzinn/Project/lab/masterplan.md) (Section 7, Section 10 & Phase 11)  
> **Audience**: สถาปนิกซอฟต์แวร์, นักพัฒนา Frontend, นักพัฒนาระบบคำนวณทางวิทยาศาสตร์, และผู้ดูแลระบบ

---

## 1. Architectural Philosophy & Design Principles

โครงสร้างสถาปัตยกรรมของ Interactive Learning Platform ถูกออกแบบภายใต้หลักการวิศวกรรมขั้นสูงตามกรอบ **Firman Agentic OS**:

1. **Decoupled Computational Kernels (สถาปัตยกรรมแยกส่วนการคำนวณ)**:
   - อัลกอริทึมทางวิทยาศาสตร์ คณิตศาสตร์ และภาษาศาสตร์ ทั้งหมดจะถูกเขียนเป็น **Pure TypeScript Functions** ปราศจาก UI dependencies อยู่ในไดเรกทอรี `src/lib/`
   - สามารถรัน Unit Test ได้อย่างรวดเร็วผ่าน Node.js Native Test Runner (`node:test`) โดยไม่ต้องพึ่งพา DOM หรือ Browser Environment
2. **Server Components Default with Isolated Client Interactive Boundaries**:
   - คอมโพเนนต์ใน `src/app/**` ทำหน้าที่เป็น Server Component Shell สำหรับการวาง Layout และ Metadata
   - ส่วนโต้ตอบที่มี State หรือการคำนวณ Canvas/SVG จะถูกประกาศเป็น Client Components (`"use client"`) เฉพาะจุด เพื่อลด First Load JavaScript Bundle
3. **Turbopack Static Prerendering (100% Static Pages)**:
   - ทั้ง 13 เส้นทาง (รวม 8 หน้าหลัก, หน้า 404, และ Web App Manifest) ถูก Prerender แบบ Static ล่วงหน้าทั้งหมด ส่งผลให้โหลดหน้าแรกได้เร็วในระดับศูนย์มิลลิวินาที (TTFB ต่ำสุด)
4. **Zero GPL Copyleft Contamination (Clean-Room Boundary)**:
   - โมดูลที่มีปัญหาด้านลิขสิทธิ์ เช่น PhET (GPL-3.0) หรือ CircuitJS1 (GPL-2.0) ถูก Rebuild ขึ้นใหม่ 100% ด้วย Pure TypeScript
5. **Anti-Emoji Mandate & Multibyte Safety**:
   - ห้ามใช้อีโมจิการ์ตูนในการตกแต่งปุ่มหรือหัวข้อใน UI โดยเด็ดขาด ให้ใช้ Lucide SVG Vector Icons เท่านั้น
   - การตัดคำภาษาไทยต้องผ่านฟังก์ชัน `safeTruncateThaiBytes` หรือ `safeTruncateThaiGraphemes` เพื่อป้องกันปัญหาการตัดกลางไบต์ UTF-8 (Lead Byte `0xE0`)

---

## 2. Codebase Topology & Directory Structure

```text
/Users/muaxzinn/Project/lab/
├── docs/                        # เอกสารตาม Master Plan Section 10 ครบชุด
│   ├── ARCHITECTURE.md          # สถาปัตยกรรมระบบและวงจรชีวิตหน่วยความจำ
│   ├── BENCHMARK_REPORT.md      # ผลการวัดประสิทธิภาพทางตัวเลข
│   ├── CHANGELOG.md             # ประวัติการปล่อยเวอร์ชัน
│   ├── DEVELOPER_GUIDE.md       # คู่มือนักพัฒนา (เอกสารนี้)
│   ├── FEATURE_MATRIX.md        # ตารางสถานะฟีเจอร์ทั้ง 24 โมดูล
│   ├── INSTALLATION_GUIDE.md    # คู่มือติดตั้งและทดสอบ
│   ├── LICENSE_AUDIT.md         # ผลการตรวจสอบสัญญาอนุญาตสากล
│   ├── MODULE_SPECIFICATIONS.md # ข้อกำหนดทางคณิตศาสตร์และฟิสิกส์
│   ├── NPX_SKILLS_REGISTRY.md   # ทะเบียนการใช้คำสั่ง NPX Tools
│   ├── PERFORMANCE_REPORT.md    # รายงาน Core Web Vitals และ Bundle Size
│   ├── REPOSITORY_CATALOG.md    # แคตตาล็อกประเมินโอเพนซอร์ส 23 โครงการ
│   ├── REQUIREMENTS.md          # ข้อกำหนดเชิงระบบ (FR / NFR)
│   ├── SECURITY_REPORT.md       # รายงานความมั่นคงปลอดภัยและภัยคุกคาม
│   ├── SOURCE_TRACKING.md       # แหล่งที่มาและบันทึกการปรับแต่งโค้ด
│   ├── TEST_REPORT.md           # รายงานผลการทดสอบอัตโนมัติ
│   └── USER_GUIDE.md            # คู่มือการใช้งานสำหรับผู้เรียนและผู้สอน
├── public/                      # Static Assets และ Service Worker
│   ├── icons/                   # ไอคอน PWA เวกเตอร์ SVG (192, 512, maskable)
│   ├── manifest.json            # Web App Manifest ฉบับ Static Fallback
│   ├── offline.html             # หน้าเว็บออฟไลน์แบบช่วยเหลือตนเอง
│   └── sw.js                    # Service Worker แคชออฟไลน์ 8 เส้นทางหลัก
├── src/
│   ├── app/                     # Next.js 15 App Router
│   │   ├── biology/page.tsx     # หน้าห้องทดลองชีววิทยาเซลล์
│   │   ├── chemistry/page.tsx   # หน้าห้องปฏิบัติการเคมีและดุลสมการ
│   │   ├── cs/page.tsx          # หน้าห้องทดลองตรรกศาสตร์ดิจิทัล
│   │   ├── math/page.tsx        # หน้าห้องทดลองคณิตศาสตร์ Mafs
│   │   ├── physics/page.tsx     # หน้าห้องทดลองฟิสิกส์และวงจรไฟฟ้า
│   │   ├── practice/page.tsx    # หน้าคลังแบบฝึกหัดและการประเมิน
│   │   ├── thai/page.tsx        # หน้าสตูดิโอสัทศาสตร์ภาษาไทย
│   │   ├── layout.tsx           # Global Root Layout พร้อมฟอนต์ไทยและ PWA
│   │   ├── manifest.ts          # Next.js Native Web App Manifest
│   │   ├── not-found.tsx        # Static 404 Kiosk Error Recovery
│   │   └── page.tsx             # หน้า Platform Portal & Dashboard
│   ├── components/              # คอมโพเนนต์การแสดงผล UI
│   │   ├── biology/             # CellStructureViewer
│   │   ├── chemistry/           # PeriodicTableViewer, ChemicalReactionViewer
│   │   ├── cs/                  # LogicGateSandbox
│   │   ├── exercises/           # ExerciseEngine
│   │   ├── layout/              # AppHeader, AppSidebar, AppNavbar, KioskShell, OfflineStatusBanner
│   │   ├── physics/             # CircuitSimulator, PhysicsLabContainer
│   │   ├── FormulaViewer.tsx    # KaTeX & Mafs 2D Graph Plotter
│   │   ├── KioskContainer.tsx   # Viewport Lockdown & Fullscreen Controller
│   │   ├── ThaiPhonologyVisualizer.tsx # ตัวแสดงผลไตรยางศ์และระดับเสียง
│   │   └── VerletSimulationCanvas.tsx # ตัวจำลองวงโคจรดาวเคราะห์
│   ├── lib/                     # โมเดลการคำนวณและฟังก์ชันบริสุทธิ์ (Pure TS)
│   │   ├── cell-structure-data.ts  # ข้อมูลและโครงสร้างออร์แกเนลล์เซลล์
│   │   ├── chemical-solver.ts      # อัลกอริทึมดุลสมการเคมีและสารสัมพันธ์
│   │   ├── circuit-solver.ts       # MNA Linear Solver วงจรไฟฟ้า DC
│   │   ├── exercise-bank.ts        # คลังโจทย์ 20 ข้อ พร้อมเกณฑ์ตรวจ
│   │   ├── logic-gate-engine.ts    # Boolean Engine และ Truth Table Generator
│   │   ├── math-sanitizer.ts       # ระบบป้องกัน XSS และ AST Scope Isolation
│   │   ├── periodic-table-data.ts  # ฐานข้อมูลธาตุเคมี IUPAC 118 ธาตุ
│   │   ├── thai-phonology.ts       # เครื่องยนต์วิเคราะห์สัทศาสตร์ภาษาไทย
│   │   ├── utils.ts                # ยูทิลิตีตัดคำไทยและ Escape HTML
│   │   ├── webgl-lifecycle.ts      # การกำจัด VRAM และกู้คืนบริบท WebGL
│   │   └── worker-protocol.ts      # โพรโทคอลสื่อสารศูนย์สำเนา (Zero-Copy)
│   ├── benchmarks/              # สคริปต์วัดประสิทธิภาพระดับระบบ
│   │   ├── math-eval.ts            # การทดสอบความเร็ว KaTeX และ Math.js
│   │   ├── physics-integrators.ts  # การเปรียบเทียบ Verlet vs Euler
│   │   ├── run-benchmarks.ts       # Master Benchmark Runner
│   │   └── thai-truncation.ts      # การทดสอบ Throughput การตัดคำไทย
│   └── pwa/                     # ชุดทดสอบ PWA และ Service Worker
│       └── pwa.test.ts
├── knip.json                    # คอนฟิกตรวจสอบโค้ดที่ไม่ได้ใช้งาน
├── package.json                 # การประกาศ dependencies และ scripts
└── tsconfig.json                # คอนฟิกูเรชัน TypeScript Strict
```

---

## 3. How to Extend the Platform

### 3.1 การเพิ่มข้อสอบใหม่ในคลังแบบฝึกหัด (`src/lib/exercise-bank.ts`)
แบบฝึกหัดถูกควบคุมโดย Type Interface `ExerciseQuestion`:

```typescript
export interface ExerciseQuestion {
  id: string;               // ตัวระบุเฉพาะ เช่น "math-005"
  subject: SubjectKey;      // "math" | "physics" | "chemistry" | "biology" | "thai" | "cs"
  difficulty: "easy" | "medium" | "hard";
  type: "single_choice" | "multiple_select" | "fill_blank" | "numeric";
  title: string;            // ชื่อโจทย์ภาษาไทย
  titleEn: string;          // ชื่อโจทย์ภาษาอังกฤษ
  question: string;         // ข้อความโจทย์ (รองรับ LaTeX $...$)
  options?: ExerciseOption[]; // ตัวเลือกสำหรับ single_choice หรือ multiple_select
  correctAnswer: string | string[] | number; // คำตอบที่ถูกต้อง
  tolerance?: number;       // ช่วงความคลาดเคลื่อนยอมรับได้สำหรับ numeric เช่น 0.05
  unit?: string;            // หน่วยทางวิทยาศาสตร์ เช่น "m/s²"
  explanation: string;      // คำอธิบายเฉลยละเอียดภาษาไทย
  hints: string[];          // คำใบ้ตามลำดับ
}
```

**ตัวอย่างการเพิ่มโจทย์ประเภทคำนวณตัวเลข (Numeric)**:
```typescript
{
  id: "phys-005",
  subject: "physics",
  difficulty: "medium",
  type: "numeric",
  title: "พลังงานศักย์โน้มถ่วง (Gravitational Potential Energy)",
  titleEn: "Gravitational Potential Energy Calculation",
  question: "วัตถุมวล $m = 2.0\\text{ kg}$ อยู่สูงจากพื้นดิน $h = 5.0\\text{ m}$ จงหาพลังงานศักย์โน้มถ่วง (กำหนดให้ $g = 9.8\\text{ m/s}^2$)",
  correctAnswer: 98.0,
  tolerance: 0.5,
  unit: "J",
  explanation: "คำนวณจากสูตร $E_p = mgh = (2.0)(9.8)(5.0) = 98.0\\text{ J}$",
  hints: [
    "ใช้สูตรพลังงานศักย์โน้มถ่วง $E_p = mgh$",
    "แทนค่า $m = 2.0$, $g = 9.8$, และ $h = 5.0$"
  ]
}
```

---

### 3.2 การเพิ่มพรีเซ็ตวงจรไฟฟ้าใหม่ (`src/lib/circuit-solver.ts`)
เพิ่มรายการในอาร์เรย์ `CIRCUIT_PRESETS`:

```typescript
export const CIRCUIT_PRESETS: CircuitPreset[] = [
  // ... รายการเดิม
  {
    id: "voltage-divider",
    name: "วงจรแบ่งแรงดัน (Voltage Divider)",
    description: "สองตัวต้านทานต่ออนุกรมเพื่อแบ่งแรงดันตามสัดส่วนความต้านทาน",
    circuit: {
      nodes: ["0", "1", "2"],
      groundNode: "0",
      components: [
        { id: "v1", type: "dc_source", node1: "1", node2: "0", value: 12 },
        { id: "r1", type: "resistor", node1: "1", node2: "2", value: 200 },
        { id: "r2", type: "resistor", node1: "2", node2: "0", value: 100 },
      ]
    }
  }
];
```

---

### 3.3 การเพิ่มปฏิกิริยาเคมีพรีเซ็ตใหม่ (`src/lib/chemical-solver.ts`)
เพิ่มในอาร์เรย์ `REACTION_PRESETS`:

```typescript
export const REACTION_PRESETS: ReactionPreset[] = [
  // ...
  {
    id: "ammonia-synthesis",
    name: "การสังเคราะห์แอมโมเนีย (Haber Process)",
    description: "N2 + H2 -> NH3 ภายใต้อุณหภูมิและความดันสูง",
    reactants: ["N2", "H2"],
    products: ["NH3"],
    defaultReactantAmounts: { "N2": 1.0, "H2": 3.0 }
  }
];
```

---

### 3.4 การเพิ่มวงจรตรรกศาสตร์พรีเซ็ตใหม่ (`src/lib/logic-gate-engine.ts`)
เพิ่มในอาร์เรย์ `LOGIC_CIRCUIT_PRESETS` โดยระบุ gates, inputs, outputs และการเชื่อมต่อสายสัญญาณ `wires`:

```typescript
export const LOGIC_CIRCUIT_PRESETS: LogicCircuitPreset[] = [
  // ...
  {
    id: "sr-latch-nor",
    name: "SR Latch (NOR Gate Cross-Coupled)",
    description: "วงจรความจำพื้นฐาน 1 บิต",
    // กำหนด topology gates, connections และ pin mappings
  }
];
```

---

## 4. Coding Standards & Quality Heuristics

### 4.1 Strict Anti-Emoji Mandate
- **ข้อห้ามเด็ดขาด**: ห้ามใช้อีโมจิการ์ตูนในการตกแต่ง UI ทุกจุด เช่น `🚀`, `💡`, `🔬`, `⚡`, `✅`, `❌`
- **วิธีปฏิบัติที่ถูกต้อง**: นำเข้าและใช้ SVG Vector Icon จาก `lucide-react`:
  ```tsx
  // ห้ามทำ:
  <button>🚀 เริ่มทดลอง</button>

  // ต้องทำ:
  import { Play } from "lucide-react";
  <button className="inline-flex items-center gap-2">
    <Play className="h-4 w-4 text-cyan-400" />
    <span>เริ่มทดลอง (Start Simulation)</span>
  </button>
  ```

### 4.2 Multibyte Thai UTF-8 String Safety
- ห้ามใช้ `String.prototype.slice()` หรือ `substring()` ตรงๆ กับข้อความภาษาไทยที่ต้องการจำกัดความยาวไบต์สำหรับ Storage หรือ Network Frame
- ให้ใช้ฟังก์ชันยูทิลิตีเฉพาะใน `src/lib/utils.ts`:
  ```typescript
  import { safeTruncateThaiBytes, safeTruncateThaiGraphemes } from "@/lib/utils";

  // ปลอดภัยต่อหน่วยความจำไบต์ ไม่ตัดกลาง 0xE0
  const byteSafe = safeTruncateThaiBytes("วิทยาศาสตร์", 12);

  // ปลอดภัยต่อรูปสระและวรรณยุกต์ ไม่ทำให้สระลอย
  const graphemeSafe = safeTruncateThaiGraphemes("น้ำเกลือ", 5);
  ```

### 4.3 WebGL Resource Disposal & Zero-Leak Mandate
เมื่อพัฒนาโมดูลที่ใช้ WebGL หรือ Three.js ในอนาคต ต้องใช้ยูทิลิตี `disposeThreeResources` จาก `src/lib/webgl-lifecycle.ts` ใน `useEffect` cleanup return:

```typescript
useEffect(() => {
  const scene = new THREE.Scene();
  // ...
  return () => {
    disposeThreeResources(scene, renderer);
  };
}, []);
```

---

## 5. Verification & Tooling Execution Workflow

นักพัฒนาต้องรันชุดคำสั่งตรวจสอบคุณภาพก่อน Commit ทุกครั้ง:

```bash
# 1. รันการทดสอบ Unit & Integration Test Suites
pnpm test

# 2. ตรวจสอบ Type Safety
pnpm typecheck

# 3. ตรวจสอบ Linting
pnpm lint

# 4. ทดสอบ Production Build แบบ Turbopack
pnpm build

# 5. ตรวจสอบ Dead Code ผ่าน npx
npx --yes knip

# 6. ตรวจสอบ Type Coverage ผ่าน npx
npx --yes typescript-coverage-report -r text

# 7. ตรวจสอบ Code Duplication ผ่าน npx
npx --yes jscpd src/
```
