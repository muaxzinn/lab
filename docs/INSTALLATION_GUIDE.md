# Installation & Deployment Guide

> **Project**: Interactive Learning Platform (แพลตฟอร์มการเรียนรู้แบบโต้ตอบ)  
> **Target Release**: v1.0.0 Production  
> **Master Plan Reference**: [`masterplan.md`](file:///Users/muaxzinn/Project/lab/masterplan.md) (Section 10 & Phase 11)

---

## 1. System Requirements & Prerequisites

ก่อนเริ่มติดตั้งระบบ โปรดตรวจสอบว่าสภาพแวดล้อมของเครื่องโฮสต์ตรงตามข้อกำหนดดังต่อไปนี้:

| Requirement | Minimum Specification | Recommended Specification |
|---|---|---|
| **Node.js Runtime** | Node.js v20.x LTS | **Node.js v26.x** (Active Engine) |
| **Package Manager** | `pnpm` v9.x | **`pnpm` v12.16.x** (Strict Mandate) |
| **Operating System** | macOS 14+, Ubuntu 22.04 LTS, Windows 11 (WSL2) | macOS Sonoma / Sequoia, Linux Kernel 6.x |
| **Memory (RAM)** | 4 GB | 8 GB+ |
| **Storage** | 1 GB Free Disk Space | 2 GB+ SSD |
| **Web Browser** | Chrome 115+, Safari 16+, Firefox 115+, Edge 115+ | Latest Chrome, Safari, or Chromium Kiosk |

> [!IMPORTANT]
> **Strict Package Manager Mandate**:
> โครงการนี้กำหนดให้ใช้ **`pnpm` เท่านั้น** สำหรับการจัดการ dependencies ภายในโปรเจกต์ ห้ามใช้ `npm install` หรือ `yarn add` โดยตรงเพื่อรักษาความสอดคล้องของ `pnpm-lock.yaml` และโครงสร้าง hard-linked node_modules

---

## 2. Step-by-Step Installation

### Step 2.1: Clone Repository
เปิด Terminal และทำการ Clone ซอร์สโค้ดของโครงการ:

```bash
git clone https://github.com/muaxzinn/lab.git
cd lab
```

### Step 2.2: Verify Node.js and pnpm Version
ตรวจสอบเวอร์ชันของ Node.js และ pnpm:

```bash
node -v
# Output ตัวอย่าง: v26.0.0 หรือ v20.x.x

pnpm -v
# Output ตัวอย่าง: 12.16.1
```

หากยังไม่ได้ติดตั้ง `pnpm` สามารถติดตั้งได้ผ่าน Corepack หรือคำสั่งทางการ:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### Step 2.3: Install Dependencies
ดำเนินการติดตั้งไลบรารีทั้งหมดโดยใช้คำสั่ง `pnpm`:

```bash
pnpm install
```

การติดตั้งจะจัดโครงสร้าง dependencies ภายใต้ความปลอดภัยของ lockfile โดยปราศจาก warning หรือ peer dependency error

---

## 3. Development Workflow

### Step 3.1: Start Local Development Server
รันเซิร์ฟเวอร์สำหรับการพัฒนา (พร้อม Next.js Turbopack):

```bash
pnpm dev
```

ผลลัพธ์บนคอนโซล:
```text
▲ Next.js 15.5.29 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
✓ Ready in 1.2s
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000` เพื่อเข้าถึงหน้า Platform Portal

---

## 4. Production Build & Verification

### Step 4.1: Execute Quality Gates & Tests
ก่อนทำการ Build หรือ Deploy แนะนำให้รันชุดทดสอบอัตโนมัติ:

```bash
# 1. รัน Unit & Integration Test Suites (161 tests, 58 suites)
pnpm test

# 2. ตรวจสอบ Type Safety
pnpm typecheck

# 3. ตรวจสอบ Linting และ Coding Standards
pnpm lint
```

### Step 4.2: Build Production Artifacts
สร้าง Production Bundle ที่ผ่านการคอมไพล์และทำ Static Prerendering:

```bash
pnpm build
```

Next.js Turbopack จะสร้างหน้า Static Pages ครบทั้ง 13 เส้นทาง (รวม Web App Manifest) และ Optimize ขนาด JavaScript Chunk อย่างมีประสิทธิภาพ

### Step 4.3: Launch Production Server
ทดสอบรัน Production Bundle บนเครื่อง Local:

```bash
pnpm start
```

---

## 5. Offline PWA & Service Worker Setup

แพลตฟอร์มมาพร้อมความสามารถ Progressive Web App (PWA) และ Service Worker แคชออฟไลน์:

1. **Service Worker (`public/sw.js`)**: ถูกลงทะเบียนอัตโนมัติเมื่อผู้ใช้เข้าใช้งานเว็บผ่านเบราว์เซอร์ที่รองรับ
2. **Precached Routes**: เส้นทางหลักทั้ง 8 หน้า (`/`, `/math`, `/physics`, `/chemistry`, `/biology`, `/cs`, `/thai`, `/practice`), ไอคอน PWA, และหน้า Fallback (`/offline.html`) จะถูกแคชไว้ใน `CacheStorage` ภายในเครื่องของผู้ใช้
3. **การทดสอบโหมดออฟไลน์**:
   - เปิด Chrome DevTools (`F12` หรือ `Option + ⌘ + I`)
   - ไปที่แท็บ **Network**
   - เปลี่ยนสถานะจาก **No throttling** เป็น **Offline**
   - รีเฟรชหน้าเว็บ หรือคลิกเข้าสู่โมดูลต่างๆ — ระบบจะแสดงแบนเนอร์แจ้งเตือนสถานะออฟไลน์ และโหลดเนื้อหาจำลองจากแคชได้ทันทีโดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต

---

## 6. Kiosk Lockdown Deployment

สำหรับการติดตั้งบนจอสัมผัสตู้คีออส (Interactive Kiosk Display) หรือแท็บเล็ตประจำห้องทดลอง:

1. **โหมดล็อกดาวน์ (Kiosk Lockdown)**:
   - ทำงานอัตโนมัติผ่าน `KioskContainer.tsx`
   - ป้องกันการเลื่อนหลุดขอบหน้าจอ (`overscroll-behavior: none`)
   - ดักจับการกดปุ่ม Back / ปัดหน้าจอถอยหลัง (`popstate trapping`)
   - ปิดการทำงานของ Context Menu (คลิกขวา หรือแตะค้าง)
2. **โหมดเต็มจอ (Fullscreen Kiosk)**:
   - กดปุ่ม **"Fullscreen Kiosk"** บนแถบ Header หรือใช้คีย์ลัดเบราว์เซอร์ (`F11`) เพื่อเข้าสู่โหมดเต็มหน้าจอโดยไม่มีแถบ URL Bar

---

## 7. Advanced Auditing & Benchmarking Tools

โครงการใช้เครื่องมือวิเคราะห์เชิงลึกผ่าน `npx` (Zero Global Install Mandate):

```bash
# วัดประสิทธิภาพการคำนวณฟิสิกส์ การตัดคำภาษาไทย และ KaTeX
pnpm benchmark

# ตรวจจับ Dead Code และ Unused Exports
npx --yes knip

# ตรวจวัดระดับความสมบูรณ์ของ TypeScript Types
npx --yes typescript-coverage-report -r text

# ตรวจจับโค้ดที่ซ้ำซ้อน (Copy-Paste Duplication)
npx --yes jscpd src/
```

---

## 8. Troubleshooting & Common Issues

### Issue 1: Port 3000 already in use
**อาการ**: Next.js แจ้งเตือนว่าพอร์ต 3000 ถูกใช้งานโดยโปรเซสอื่น  
**วิธีแก้**: ระบุพอร์ตอื่นในคำสั่งรัน เช่น:
```bash
pnpm dev --port 3001
```

### Issue 2: Service Worker เก่าค้างในแคช
**อาการ**: แก้ไขโค้ดแล้วเบราว์เซอร์ยังคงโหลดไฟล์เดิม  
**วิธีแก้**:
- เปิด Chrome DevTools -> แท็บ **Application** -> หัวข้อ **Service Workers**
- คลิก **Unregister** หรือทำเครื่องหมายที่ **Update on reload**
- ล้างแคชที่ **Storage** -> **Clear site data**

### Issue 3: Turbopack Cache มีปัญหา
**อาการ**: เกิดข้อผิดพลาดในการประมวลผล Cache หลังเปลี่ยนกิ่ง git  
**วิธีแก้**: ลบโฟลเดอร์แคช `.next` แล้วคอมไพล์ใหม่:
```bash
rm -rf .next
pnpm dev
```
