# Module Technical Specifications

> **Specification Reference**: `masterplan.md` (Section 2, Section 3, Section 7, Section 8 Phase 5)  
> **Platform Phase**: Phase 5 — Architecture Design & Technical Specifications  
> **Target Components**: `FormulaViewer.tsx`, `VerletSimulationCanvas.tsx`, `ThaiPhonologyVisualizer.tsx`, `KioskContainer.tsx`  
> **Status**: Approved Specifications Baseline  
> **Last Updated**: 2026-11-07  

---

## 1. Module 1: Dynamic Math & Formula Sandbox (`FormulaViewer.tsx`)

### 1.1 Purpose & Pedagogical Goal
Enables learners to explore mathematical equations interactively with synchronized LaTeX typesetting (KaTeX) and real-time numeric evaluation (Math.js). The module bridges abstract algebraic symbolism and tangible numeric behavior with strict anti-XSS boundaries.

### 1.2 Mathematical Specifications
- **KaTeX Render Engine**: Synchronous rendering via `renderSanitizedLatex` (`trust: false`, `throwOnError: false`, `maxExpand: 1000`).
- **Math.js AST Evaluator**: Dynamic compilation and sandboxed execution via `safeCompileMath` and `safeEvaluateMath`.
- **Scope Model**: Scopes are isolated `Map<string, number>` instances preventing prototype-walking attacks (`__proto__`, `constructor`).

### 1.3 State & Interface Contract
```typescript
export interface FormulaPreset {
  id: string;
  name: string;
  subject: string;
  description: string;
  latex: string;
  expression: string;
  variables: Record<string, { label: string; unit: string; min: number; max: number; step: number; defaultValue: number }>;
}
```

### 1.4 Presets Provided
1. **Kinetic Energy**: $E_k = \frac{1}{2}mv^2$ (Variables: Mass $m$, Velocity $v$) — with interactive 2D quadratic curve via Mafs
2. **Wave Speed**: $v = f \lambda$ (Variables: Frequency $f$, Wavelength $\lambda$) — with interactive 2D linear curve via Mafs
3. **Simple Harmonic Oscillator**: $T = 2\pi\sqrt{\frac{m}{k}}$ (Variables: Mass $m$, Spring constant $k$) — with interactive square-root curve via Mafs
4. **Ohm's Law**: $V = I \cdot R$ (Variables: Current $I$, Resistance $R$) — with interactive 2D linear curve via Mafs
5. **Ideal Gas Law (Pressure)**: $P = \frac{n R T}{V}$ (Variables: Amount $n$, Temperature $T$, Volume $V$) — with interactive isothermal hyperbolic curve via Mafs
6. **Newton's Universal Gravitation**: $F = G \frac{m_1 m_2}{r^2}$ (Variables: $m_1, m_2, r$, with $G = 6.674 \times 10^{-11}$)

### 1.5 Coordinate Graphing Layer (Mafs)
- Interactive 2D Cartesian coordinate plane dynamically rendering the active preset's mathematical function $f(x)$ in real time.
- Operates alongside the KaTeX formula view and live sliders with an animated point tracker $(x_0, y_0)$ marking the currently evaluated operating coordinate.

### 1.6 Security & Robustness Assertions
- All expressions must pass `validateExpressionSecurity` before AST compilation.
- Any NaN or Infinity evaluations must gracefully display friendly fallback badges ("Undefined (∞)") rather than crashing the component.

---

## 2. Module 2: Symplectic Physics & Velocity Verlet Simulation Canvas (`VerletSimulationCanvas.tsx`)

### 2.1 Purpose & Scientific Foundation
Demonstrates celestial mechanics and orbital dynamics using a symplectic numerical integrator (**Velocity Verlet**), illustrating why standard Explicit Euler methods diverge and violate conservation of energy over time.

### 2.2 Numerical Integration Equations
For gravitational two-body and central-force systems under potential $U(r) = -G \frac{M m}{r}$:
1. **Position Update**:
   $$\vec{r}(t + \Delta t) = \vec{r}(t) + \vec{v}(t)\Delta t + \frac{1}{2}\vec{a}(t)\Delta t^2$$
2. **Acceleration Recalculation**:
   $$\vec{a}(t + \Delta t) = -\frac{G M}{|\vec{r}(t + \Delta t)|^3} \vec{r}(t + \Delta t)$$
3. **Velocity Update**:
   $$\vec{v}(t + \Delta t) = \vec{v}(t) + \frac{\vec{a}(t) + \vec{a}(t + \Delta t)}{2}\Delta t$$

### 2.3 Hamiltonian Energy Conservation
- **Kinetic Energy**: $T = \frac{1}{2}m |\vec{v}|^2$
- **Potential Energy**: $U = -\frac{G M m}{|\vec{r}|}$
- **Total Energy**: $H = T + U$
- **Relative Energy Error**: $\epsilon = \frac{|H(t) - H(0)|}{|H(0)|}$
- The canvas features a real-time energy gauge proving that Velocity Verlet maintains bounded, oscillating error ($\epsilon < 0.005$) without secular energy drift.

### 2.4 GPU & Canvas Lifecycle Management
- **High-DPI Clamping**: DPR clamped to $\le 2.0$ via `clampDevicePixelRatio` to prevent mobile GPU thermal throttling.
- **Teardown Protocol**: Cancels active `requestAnimationFrame`, clears canvas trails buffer, and detaches WebGL/Canvas context listeners on unmount.
- **Interactive Controls**: Play, Pause, Step ($\Delta t$), Reset, Trail Toggle, Speed Multiplier, Central Mass ($M$), Planet Mass ($m$), and Gravitational Constant ($G$).

---

## 3. Module 3: Thai Phonological Engine (`ThaiPhonologyVisualizer.tsx`)

### 3.1 Purpose & Linguistic Rigor
Provides interactive deconstruction and phonological rule analysis for the Thai writing system, strictly adhering to Firman Agentic OS Lobe 3 (Aesthetics & Multibyte Discipline) and standard Royal Society of Thailand phonetic guidelines.

### 3.2 Processing Pipeline
1. **Multibyte String Sanitization**: Preserves 3-byte UTF-8 sequences (`0xE0`) without corrupted byte offsets.
2. **Syllable Deconstruction**:
   - Extract tone mark (`่`, `้`, `๊`, `๋`) and strip Thanthakhat (`์`) alongside its silenced consonant cluster.
   - Identify leading vowel (`เ`, `แ`, `โ`, `ใ`, `ไ`).
   - Determine initial consonant cluster:
     - Single consonant
     - True cluster (คำควบแท้):
       - with `ร`: `กร`, `ขร`, `คร`, `ตร`, `ปร`, `พร`
       - with `ล`: `กล`, `ขล`, `คล`, `ปล`, `ผล`, `พล`
       - with `ว`: `กว`, `ขว`, `คว` (distinguished from vowel `-ัว-` by checking presence of explicit vowel signs)
     - Ho-Nam (ห นำ อักษรต่ำเดี่ยว: หง, หน, หม, ฯลฯ) -> follows High class
     - O-Nam (อ นำ ย: อย่า, อยู่, อย่าง, อยาก) -> follows Mid class
3. **Triyang Classification**:
   - **อักษรกลาง (Mid)**: ก จ ด ต ฎ ฏ บ ป อ (9 ตัว)
   - **อักษรสูง (High)**: ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห (11 ตัว)
   - **อักษรต่ำเดี่ยว (Low Single / Sonorant)**: ง ญ ณ น ม ย ร ล ว ฬ (10 ตัว)
   - **อักษรต่ำคู่ (Low Paired / Obstruent)**: ค ฅ ฆ ช ซ ฌ ฑ ฒ ท ธ พ ฟ ภ ฮ (14 ตัว)
4. **Complex Vowel Classification & Heuristics**:
   - **Open `-ัว` vs. Closed `-ัว-`**: Open syllables with `ั` + `ว` without subsequent consonants (`ตัว`, `บัว`, `หัว`, `กลัว`) are classified under `แม่ ก กา` with long vowel length; syllables with middle `ว` (`ขวด`, `บวก`, `สวน`, `พวก`) are parsed as vowel `-ัว (ลดรูป)` with the final consonant correctly identified.
   - **Diphthongs `เ-ีย` and `เ-ือ`**: Open syllables (`เสีย`, `เปีย`, `เสือ`, `เรือ`) are classified under `แม่ ก กา` with long vowel length.
   - **Form Transformations of `เ-อ`**: Open `เ-อ` (`เธอ`, `เจอ`) under `แม่ ก กา`; closed with `เ-ิ` (`เดิน`, `เกิด`, `เชิด`, `เลิศ`) classified as long vowel `เ-อ (แปลงรูป เ-ิ)` preserving correct dead-syllable tone shift (falling tone for low class); closed with `ย` (`เลย`, `เฉย`) under `แม่ เกย`.
   - **Vowel `เ-าะ`**: Correctly isolated for syllables such as `เกาะ`, `เพราะ` as short dead vowels.
   - **Inherent Sonorants**: `ำ`, `เ-า`, `ใ-`, `ไ-` (treated as long / live open syllables).
5. **Spelling Section (มาตราตัวสะกด)**:
   - Sonorant Live Endings: แม่ กง, แม่ กน, แม่ กม, แม่ เกย, แม่ เกอว
   - Stop Dead Endings: แม่ กก, แม่ กบ, แม่ กด
   - Open Syllable: แม่ ก กา (Live if long vowel, Dead if short vowel)
6. **Tone Sound Calculation (ผันวรรณยุกต์ 5 เสียง)**:
   - เสียงสามัญ (Mid/Common), เสียงเอก (Low), เสียงโท (Falling), เสียงตรี (High), เสียงจัตวา (Rising)
7. **SVG Pitch Contour Chart**: Visual trajectory representation of the acoustic pitch curve corresponding to the derived tone.

---

## 4. Module 4: Kiosk Shell & Containment Container (`KioskContainer.tsx`)

### 4.1 Purpose & Deployment Targets
Provides a lockdown containment container designed for dedicated museum touchscreens, tablet kiosks, and interactive classroom displays.

### 4.2 Lockdown Capabilities
- **Viewport Containment**: CSS `overscroll-behavior: none`, `touch-action: pan-x pan-y`, preventing pull-to-refresh and elastic bounce.
- **Navigation Popstate Trap**: Automatically traps browser history navigation (`window.history.pushState(null, '', window.location.href)`) to prevent learners from accidentally leaving the learning sandbox via swipe gestures.
- **Fullscreen API Integration**: Cross-browser fullscreen request/exit controller (`document.documentElement.requestFullscreen`).
- **Standalone PWA Detection**: Identifies whether the application is running in browser tab mode, iOS Home Screen standalone (`(navigator as any).standalone`), or Chromium PWA mode (`display-mode: standalone`).
- **Status HUD**: Real-time telemetry bar indicating viewport resolution, DPR, containment mode, and fullscreen status.
