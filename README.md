# 🔬 Interactive Learning Platform (`lab`)

> **Next-Generation Scientific & Educational Workbenches**  
> **Live Production URL**: [https://lab-beige-mu.vercel.app](https://lab-beige-mu.vercel.app)  
> **GitHub Repository**: [https://github.com/muaxzinn/lab](https://github.com/muaxzinn/lab)  
> **Release Version**: `v1.1.0` | 186 Tests Passed Across 64 Suites (100% Pass Rate)

An advanced interactive educational platform built with **Next.js 15 App Router**, **Three.js 3D WebGL**, **Mafs 2D**, **Matter.js**, and **KaTeX**. Integrates OpenLyceum's full fleet of 61 scientific simulations alongside 8 native educational laboratories organized into a minimalist, card-categorized scientific studio.

---

## 🌟 Key Highlights

- **Minimalist Scientific Hub**: True Apple/Linear-grade interface featuring real-time bilingual search (Thai/English) and 9 standard scientific domains.
- **OpenLyceum 65-Repo Fleet Adaptation**: Complete adaptation of 61 simulations, PubChem/PDB 3D molecular coordinates, and Keplerian orbital models.
- **Interactive 3D WebGL Laboratories (Three.js)**:
  - **3D Molecular Lab**: Ball-and-Stick / Space-Filling rendering of 10 landmark molecules with CPK standard colors and zero VRAM memory leaks.
  - **3D Keplerian Solar System**: Heliocentric simulation with glowing Sun, 8 planets, Saturn rings, orbital trails, and 1x-100x time warp.
  - **3D Cutaway Cytology Explorer**: 3D eukaryotic cell model with raycast organelle inspection (Nucleus, Mitochondria, ER, Golgi, Chloroplast).
- **22 Deep Guided-Inquiry Lessons (`FEAT-01`)**: Step-by-step scientific theory, KaTeX equations, real-world engineering applications, and concept checkpoints.
- **PWA & Offline Ready**: Native Web App Manifest, Service Worker precaching 8 core routes, and zero external dependency offline fallback.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v20+ (recommended v22 or v26)
- **Package Manager**: `pnpm` (v9 or v10)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/muaxzinn/lab.git
cd lab

# Install dependencies
pnpm install

# Start development server
pnpm dev
# Open http://localhost:3000
```

### Verification & Quality Gates

```bash
# Run unit & integration test suite (186 tests)
pnpm test

# Run strict TypeScript typecheck
pnpm typecheck

# Run Next.js ESLint
pnpm lint

# Production Turbopack build (13 static routes)
pnpm build
```

---

## 📚 Scientific Domains & Core Workbenches

| Domain | Thai Label | Highlights | Route |
|---|---|---|---|
| **Astronomy & Space** | ดาราศาสตร์และอวกาศ | 3D Keplerian Solar System, Transit Hunter, Stellar Wobble | `/physics` |
| **Physics & Mechanics** | ฟิสิกส์และกลศาสตร์ | 2D Velocity Verlet, The Ramp, Relativistic Dynamics | `/physics` |
| **Waves & Optics** | คลื่น แสง และเสียง | Doppler Effect, Standing Waves, Resonance, Optics Lab | `/physics` |
| **Electricity & Circuits** | ไฟฟ้าและแม่เหล็ก | MNA DC/AC Circuit Solver, RLC Phasors, Capacitors | `/physics` |
| **Chemistry & Matter** | เคมีและโครงสร้างโมเลกุล | 3D Molecules (PubChem/PDB), IUPAC 118 Table, Balancer | `/chemistry` |
| **Quantum & Atomic** | ควอนตัมและอะตอม | 3D Hydrogen Orbitals, Quantum Tunneling, Qubit Bloch | `/physics` |
| **Biology & Cytology** | ชีววิทยาและเซลล์ | 3D Cutaway Eukaryotic Cell, 12 Organelles, Central Dogma | `/biology` |
| **Mathematics & CS** | คณิตศาสตร์และคอมพิวเตอร์ | Mafs 2D Function Studio, Digital Logic DAG, Big-O | `/math`, `/cs` |
| **Linguistics & Practice** | ภาษาศาสตร์และบทเรียน | Thai Phonology & Tone Contours, Universal Practice | `/thai`, `/practice` |

---

## 📄 Documentation

- [`docs/MASTER_PLAN.md`](docs/MASTER_PLAN.md): Complete engineering specification
- [`docs/USER_GUIDE.md`](docs/USER_GUIDE.md): Student and educator user manual
- [`docs/DEVELOPER_GUIDE.md`](docs/DEVELOPER_GUIDE.md): Architecture and component manual
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md): Semantic version history
- [`docs/NPX_SKILLS_REGISTRY.md`](docs/NPX_SKILLS_REGISTRY.md): Tooling governance registry

---

## ⚖️ License

MIT License. Designed and engineered for high-performance interactive science education.
