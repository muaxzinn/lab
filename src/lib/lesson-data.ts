/**
 * Deep Interactive Curriculum Lessons Dataset (FEAT-01)
 * High-rigor, step-by-step lessons with KaTeX formulas, deep theoretical derivations,
 * real-world applications, and concept checkpoints.
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

export const LESSONS: Lesson[] = [
  // ==========================================
  // PHYSICS LESSONS
  // ==========================================
  {
    id: "phys-newton",
    discipline: "physics",
    title: "Newtonian Dynamics & Mechanical Equilibrium",
    thaiTitle: "กฎการเคลื่อนที่ของนิวตันและพลศาสตร์ของวัตถุ",
    estimatedMinutes: 20,
    level: "Foundation",
    overview: "Formulate the fundamental laws governing classical force, mass, momentum, and conservative vector fields.",
    thaiOverview: "ทำความเข้าใจกฎการเคลื่อนที่ 3 ข้อของนิวตัน พลศาสตร์เวกเตอร์ และการอนุรักษ์โมเมนตัมในระบบกลศาสตร์",
    tags: ["Classical Mechanics", "Forces", "Newton", "Vector Calculus"],
    steps: [
      {
        stepNumber: 1,
        title: "First Law: Inertia & Galilean Frames",
        thaiTitle: "กฎข้อที่ 1: ความเฉื่อยและกรอบอ้างอิงเฉื่อย",
        summary: "An object maintains its state of rest or uniform rectilinear motion unless acted upon by a non-zero net external force.",
        thaiSummary: "วัตถุจะรักษาสภาพหยุดนิ่งหรือเคลื่อนที่ด้วยความเร็วคงที่ในแนวเส้นตรง เว้นแต่จะมีแรงลัพธ์ภายนอกที่ไม่เป็นศูนย์มากระทำ",
        deepTheory: [
          "Inertia is the inherent resistance of matter to any modification in its velocity state. In an inertial reference frame (a coordinate system not undergoing acceleration), the sum of forces acting on a body at rest or constant velocity strictly vanishes: \\Sigma \\vec{F} = \\vec{0}.",
          "Galilean relativity dictates that the fundamental laws of mechanics remain completely invariant across all inertial frames. If the frame itself accelerates (such as a spinning carousel or braking vehicle), non-inertial fictitious forces (Coriolis or centrifugal forces) must be introduced to retain coordinate validity."
        ],
        formulaLatex: "\\sum \\vec{F} = \\vec{0} \\iff \\frac{d\\vec{v}}{dt} = \\vec{0}",
        formulaSymbols: [
          { symbol: "\\Sigma \\vec{F}", meaning: "Vector sum of all external forces", unit: "N (Newtons)" },
          { symbol: "\\vec{v}", meaning: "Instantaneous velocity vector", unit: "m/s" },
          { symbol: "t", meaning: "Time", unit: "s" },
        ],
        application: {
          title: "Spacecraft Inertial Coasting",
          thaiTitle: "การแล่นด้วยแรงเฉื่อยของยานอวกาศวอยเอเจอร์",
          description: "NASA's Voyager 1 spacecraft continues traveling at 17 km/s through interstellar space without active engine propulsion because deep space lacks friction or resisting atmospheres.",
          thaiDescription: "ยานวอยเอเจอร์ 1 เดินทางด้วยความเร็วกว่า 17 กม./วินาที ในอวกาศระหว่างดวงดาวโดยไม่ต้องติดเครื่องยนต์ขับดันอย่างต่อเนื่อง เนื่องจากไม่มีแรงเสียดทานของบรรยากาศมาต้านทาน",
        },
        checkpoint: {
          question: "A book sits motionless on a table. Why does it not accelerate downward?",
          thaiQuestion: "หนังสือวางนิ่งอยู่บนโต๊ะ เหตุใดหนังสือจึงไม่เคลื่อนที่ตกลงสู่พื้นตามแรงโน้มถ่วง?",
          options: [
            "Gravity ceases to act on stationary objects",
            "The normal force exerted by the table exactly balances the downward gravitational pull",
            "Frictional forces push the book upwards",
            "The mass of the book creates an upward buoyant pressure"
          ],
          correctIndex: 1,
          explanation: "The normal contact force from the table is equal in magnitude and opposite in direction to gravity, yielding a net force of zero (mechanical equilibrium).",
          thaiExplanation: "แรงแนวฉาก (Normal force) จากผิวโต๊ะมีขนาดเท่ากับและทิศตรงข้ามกับแรงโน้มถ่วง ทำให้แรงลัพธ์เป็นศูนย์ วัตถุจึงอยู่ในสมดุลสถิต",
        },
      },
      {
        stepNumber: 2,
        title: "Second Law: Force as Rate of Momentum Change",
        thaiTitle: "กฎข้อที่ 2: แรงและอัตราการเปลี่ยนโมเมนตัม",
        summary: "The net external force on a system equals the time derivative of its linear momentum: F = dp/dt = ma (for invariant mass).",
        thaiSummary: "แรงลัพธ์ภายนอกที่กระทำต่อระบบ มีค่าเท่ากับอนุพันธ์เทียบเวลาของโมเมนตัมเชิงเส้น F = dp/dt หรือ F = ma ในระบบที่มวลคงที่",
        deepTheory: [
          "Newton originally defined force not merely as mass times acceleration, but as the time rate of change of linear momentum: \\vec{F}_{net} = d\\vec{p}/dt. For classical systems with fixed invariant mass m, this simplifies cleanly to \\vec{F}_{net} = m(d\\vec{v}/dt) = m\\vec{a}.",
          "When mass varies over time (such as rocket propulsion expelling propellant mass at exhaust velocity v_rel), Tsiolkovsky's rocket equation applies: F_{thrust} = v_{ex} (dm/dt) - mg.",
        ],
        formulaLatex: "\\vec{F}_{net} = \\frac{d\\vec{p}}{dt} = \\frac{d(m\\vec{v})}{dt} = m\\vec{a} + \\vec{v}\\frac{dm}{dt}",
        formulaSymbols: [
          { symbol: "\\vec{p}", meaning: "Linear momentum vector", unit: "kg·m/s" },
          { symbol: "m", meaning: "Inertial mass", unit: "kg" },
          { symbol: "\\vec{a}", meaning: "Vector acceleration", unit: "m/s²" },
        ],
        application: {
          title: "Falcon 9 Rocket Staging",
          thaiTitle: "การคำนวณแรงขับดันจรวด Falcon 9",
          description: "As Merlin rocket engines burn tonnes of liquid kerosene (RP-1) and liquid oxygen per second, the total mass m drops drastically, causing acceleration a to surge exponentially before main engine cut-off.",
          thaiDescription: "เมื่อเครื่องยนต์จรวดเผาไหม้เชื้อเพลิงและพ่นไอเสียออกไปหลายตันต่อวินาที มวล m รวมของจรวดจะลดลงอย่างรวดเร็ว ส่งผลให้ความเร่ง a พุ่งสูงขึ้นอย่างก้าวกระโดดก่อนการตัดการทำงานของเครื่องยนต์",
        },
        checkpoint: {
          question: "If a constant net force F acts on an object whose mass doubles, what happens to its acceleration?",
          thaiQuestion: "หากมีแรงลัพธ์คงที่ F กระทำต่อวัตถุที่มีมวลเพิ่มขึ้นเป็น 2 เท่า ความเร่งของวัตถุจะเป็นอย่างไร?",
          options: [
            "It doubles (2a)",
            "It halves (a/2)",
            "It quadruples (4a)",
            "It remains constant (a)"
          ],
          correctIndex: 1,
          explanation: "From a = F / m, acceleration is inversely proportional to mass. Doubling mass cuts acceleration in half.",
          thaiExplanation: "จากสมการ a = F/m ความเร่งแปรผกผันกับมวล เมื่อมวลเพิ่มขึ้น 2 เท่า ความเร่งจะลดลงเหลือครึ่งหนึ่ง",
        },
      },
      {
        stepNumber: 3,
        title: "Third Law: Action & Reaction Mutual Pairs",
        thaiTitle: "กฎข้อที่ 3: แรงกิริยาและแรงปฏิกิริยาคู่สมมาตร",
        summary: "Whenever one body exerts a force on a second body, the second body exerts an equal and opposite force on the first.",
        thaiSummary: "เมื่อวัตถุหนึ่งออกแรงกระทำต่ออีกวัตถุหนึ่ง วัตถุที่สองจะออกแรงที่มีขนาดเท่ากันแต่ทิศทางตรงกันข้ามกลับมายังวัตถุแรกเสมอ",
        deepTheory: [
          "Action and reaction forces occur simultaneously on two DIFFERENT interacting bodies. Because they act on different entities, they NEVER cancel each other out internally.",
          "This law enforces the fundamental conservation of total linear momentum in closed physical systems: \\Delta \\vec{P}_{sys} = \\vec{0}.",
        ],
        formulaLatex: "\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A} \\implies \\frac{d}{dt}(\\vec{p}_A + \\vec{p}_B) = 0",
        formulaSymbols: [
          { symbol: "\\vec{F}_{A \\to B}", meaning: "Force exerted by body A upon body B", unit: "N" },
          { symbol: "\\vec{F}_{B \\to A}", meaning: "Reaction force exerted by body B upon body A", unit: "N" },
        ],
        application: {
          title: "Ion Thruster Deep Space Propulsion",
          thaiTitle: "เครื่องยนต์ขับดันไอออนในยานสำรวจอวกาศ",
          description: "Ion engines accelerate Xenon ions electrostatically out of the thruster nozzle; the reaction force propels the spacecraft forward with extraordinary fuel efficiency (Isp > 3000 s).",
          thaiDescription: "เครื่องยนต์ไอออนเร่งอนุภาคซีนอนที่มีประจุไฟฟ้าให้พุ่งออกทางหัวฉีด แรงปฏิกิริยาที่เท่ากันจะผลักยานอวกาศไปข้างหน้าด้วยประสิทธิภาพการใช้เชื้อเพลิงที่สูงมาก",
        },
      },
    ],
  },

  {
    id: "phys-orbits",
    discipline: "physics",
    title: "Orbital Mechanics & Kepler's Laws",
    thaiTitle: "กลศาสตร์วงโคจรและกฎของเคปเลอร์",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Explore gravitational central-force potentials, angular momentum conservation, and orbital eccentricity.",
    thaiOverview: "ศึกษาศักย์แรงโน้มถ่วงสู่ศูนย์กลาง การอนุรักษ์โมเมนตัมเชิงมุม และความรีของวงโคจรเทห์ฟากฟ้า",
    tags: ["Astrophysics", "Kepler", "Gravity", "Orbital Kinematics"],
    steps: [
      {
        stepNumber: 1,
        title: "Kepler's First Law: Elliptical Orbits",
        thaiTitle: "กฎข้อที่ 1 ของเคปเลอร์: วงโคจรทรงรี",
        summary: "Planets orbit the Sun in elliptical trajectories, with the Sun situated at one of the two foci.",
        thaiSummary: "ดาวเคราะห์ทุกดวงโคจรรอบดวงอาทิตย์เป็นรูปวงรี โดยมีดวงอาทิตย์อยู่ที่จุดโฟกัสจุดหนึ่งในสองจุด",
        deepTheory: [
          "An ellipse is the geometric locus of points where the sum of distances to two foci F1 and F2 is constant: r1 + r2 = 2a (where a is the semi-major axis).",
          "The eccentricity e quantifies orbital elongation: e = \\sqrt{1 - b^2/a^2}. For a circle e=0; for Earth e=0.0167; for comets e approaches 1.0.",
        ],
        formulaLatex: "r(\\theta) = \\frac{a(1 - e^2)}{1 + e \\cos \\theta}",
        formulaSymbols: [
          { symbol: "r(\\theta)", meaning: "Distance from focus to orbiting body at true anomaly \\theta", unit: "m or AU" },
          { symbol: "a", meaning: "Semi-major axis", unit: "m or AU" },
          { symbol: "e", meaning: "Orbital eccentricity", unit: "dimensionless" },
        ],
        application: {
          title: "GPS Satellite Constellation Orbits",
          thaiTitle: "วงโคจรดาวเทียมนำทาง GPS",
          description: "24+ operational GPS satellites orbit in near-circular Medium Earth Orbits (MEO, altitude ~20,200 km) with low eccentricity (e < 0.02) to maintain predictable atomic clock synchronization.",
          thaiDescription: "ดาวเทียม GPS กว่า 24 ดวงโคจรในวงโคจรระดับกลางเกือบกลม (e < 0.02) เพื่อให้การซิงโครไนซ์สัญญาณนาฬิกาอะตอมมีความแม่นยำสูงสุด",
        },
      },
      {
        stepNumber: 2,
        title: "Kepler's Second Law: Areal Velocity Conservation",
        thaiTitle: "กฎข้อที่ 2 ของเคปเลอร์: การกวาดพื้นที่เท่ากันในเวลาเท่ากัน",
        summary: "A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time.",
        thaiSummary: "เส้นตรงที่ลากเชื่อมระหว่างดวงอาทิตย์กับดาวเคราะห์ จะกวาดพื้นที่ได้เท่ากันในระยะเวลาที่เท่ากัน",
        deepTheory: [
          "This law is an immediate consequence of angular momentum conservation in a central gravitational field: \\vec{\\tau} = \\vec{r} \\times \\vec{F} = \\vec{0}.",
          "Because angular momentum L = m r^2 \\dot{\\theta} is strictly constant, areal velocity dA/dt = L / (2m) is invariant. Consequently, planets travel fastest at perihelion (closest approach) and slowest at aphelion (farthest distance).",
        ],
        formulaLatex: "\\frac{dA}{dt} = \\frac{1}{2} r^2 \\frac{d\\theta}{dt} = \\frac{L}{2m} = \\text{constant}",
        formulaSymbols: [
          { symbol: "dA/dt", meaning: "Areal velocity", unit: "m²/s" },
          { symbol: "L", meaning: "Orbital angular momentum", unit: "kg·m²/s" },
        ],
        application: {
          title: "Halley's Comet Perihelion Acceleration",
          thaiTitle: "ความเร็วของดาวหางฮัลเลย์ ณ จุดใกล้ดวงอาทิตย์ที่สุด",
          description: "Halley's comet accelerates to 54.6 km/s at perihelion (0.586 AU from the Sun) but slows to just 0.91 km/s at aphelion (35.1 AU near Pluto's orbit).",
          thaiDescription: "ดาวหางฮัลเลย์มีความเร็วพุ่งสูงถึง 54.6 กม./วินาที เมื่อเข้าใกล้ดวงอาทิตย์ที่สุด แต่จะชะลอความเร็วเหลือเพียง 0.91 กม./วินาที เมื่ออยู่ที่จุดไกลสุดขอบระบบสุริยะ",
        },
      },
      {
        stepNumber: 3,
        title: "Kepler's Third Law: Harmonic Period-Distance Ratio",
        thaiTitle: "กฎข้อที่ 3 ของเคปเลอร์: กฎแห่งความสอดคล้องของคาบ",
        summary: "The square of the orbital period T is directly proportional to the cube of the semi-major axis a: T² / a³ = constant.",
        thaiSummary: "กำลังสองของคาบการโคจร (T) จะแปรผันตรงกับกำลังสามของกึ่งแกนเอก (a): T² / a³ มีค่าคงที่เสมอ",
        deepTheory: [
          "By equating Newton's gravitational attraction F = G M m / r^2 with centripetal acceleration m v^2 / r for circular approximation, one derives: T^2 = (4\\pi^2 / G(M+m)) a^3.",
          "When measured in Earth years and Astronomical Units (AU), for all planets orbiting our Sun: T^2 / a^3 \\approx 1.000.",
        ],
        formulaLatex: "T^2 = \\left( \\frac{4\\pi^2}{G(M + m)} \\right) a^3",
        formulaSymbols: [
          { symbol: "T", meaning: "Orbital period", unit: "s or years" },
          { symbol: "a", meaning: "Semi-major axis", unit: "m or AU" },
          { symbol: "G", meaning: "Universal gravitational constant (6.674×10⁻¹¹)", unit: "N·m²/kg²" },
          { symbol: "M", meaning: "Central body mass (Sun)", unit: "kg" },
        ],
        application: {
          title: "Geostationary Satellite Placement",
          thaiTitle: "การคำนวณวงโคจรดาวเทียมค้างฟ้า (GEO)",
          description: "Setting T = 23.93 hours (1 sidereal day) dictates that communication satellites must orbit at an exact orbital radius of 42,164 km (altitude 35,786 km) to remain stationary above the equator.",
          thaiDescription: "เมื่อกำหนดคาบ T = 23.93 ชั่วโมง (1 วันดาราคติ) ดาวเทียมสื่อสารต้องอยู่ที่ระยะ 42,164 กม. จากใจกลางโลกพอดี เพื่อให้หมุนไปพร้อมกับโลกและอยู่นิ่งสัมพัทธ์กับพื้นดิน",
        },
      },
    ],
  },

  // ==========================================
  // CHEMISTRY LESSONS
  // ==========================================
  {
    id: "chem-orbitals",
    discipline: "chemistry",
    title: "Quantum Orbitals & Electron Configuration",
    thaiTitle: "ออร์บิทัลเชิงควอนตัมและการจัดเรียงอิเล็กตรอน",
    estimatedMinutes: 20,
    level: "Intermediate",
    overview: "Master quantum numbers (n, l, ml, ms), Aufbau principle, Hund's rule, and Pauli exclusion principle.",
    thaiOverview: "เข้าใจเลขควอนตัม 4 ตัว หลักการออฟบาว กฎของฮุนด์ และหลักการกีดกันของเพาลีในการจัดชั้นอิเล็กตรอน",
    tags: ["Quantum Chemistry", "Electron Shells", "Aufbau", "Spectroscopy"],
    steps: [
      {
        stepNumber: 1,
        title: "The Four Quantum Numbers",
        thaiTitle: "เลขควอนตัมทั้ง 4 ของอิเล็กตรอน",
        summary: "Every electron state in an atom is uniquely described by four quantum coordinates: n, l, m_l, and m_s.",
        thaiSummary: "สถานะของอิเล็กตรอนทุกตัวในอะตอมถูกกำหนดด้วยเลขควอนตัม 4 ค่า ได้แก่ n, l, m_l และ m_s อย่างจำเพาะ",
        deepTheory: [
          "Principal quantum number (n): Dictates the main energy level and orbital radial shell distance (n = 1, 2, 3...).",
          "Azimuthal/angular momentum (l): Defines orbital shape (l = 0 for s, 1 for p, 2 for d, 3 for f). Ranges from 0 to n-1.",
          "Magnetic quantum number (m_l): Defines spatial orientation in 3D space. Ranges from -l to +l.",
          "Spin quantum number (m_s): Represents intrinsic electron angular momentum (spin +1/2 or -1/2).",
        ],
        formulaLatex: "\\psi_{n, l, m_l, m_s}(r, \\theta, \\phi) = R_{n,l}(r) Y_{l,m_l}(\\theta, \\phi) \\chi_{m_s}",
        formulaSymbols: [
          { symbol: "n", meaning: "Principal energy level (1, 2, 3...)" },
          { symbol: "l", meaning: "Orbital angular momentum (0 to n-1)" },
          { symbol: "m_l", meaning: "Magnetic orientation (-l to +l)" },
          { symbol: "m_s", meaning: "Spin orientation (+1/2, -1/2)" },
        ],
        application: {
          title: "Magnetic Resonance Imaging (MRI)",
          thaiTitle: "เครื่องตรวจคลื่นแม่เหล็กไฟฟ้า MRI",
          description: "MRI machines align nuclear and electron spins in hydrogen atoms using superconducting magnetic fields (1.5 - 3.0 Tesla), detecting radiofrequency relaxation photons to generate anatomical tissue contrast.",
          thaiDescription: "เครื่อง MRI จัดเรียงสปินของนิวเคลียสไฮโดรเจนในร่างกายด้วยสนามแม่เหล็กยิ่งยวด แล้วตรวจวัดคลื่นวิทยุที่คายออกมาเพื่อสร้างภาพตัดขวางของอวัยวะที่มีความละเอียดสูง",
        },
      },
      {
        stepNumber: 2,
        title: "Aufbau Principle & Madelung (n + l) Rule",
        thaiTitle: "หลักการออฟบาวและกฎการเติมพลังงาน (n + l)",
        summary: "Electrons occupy the lowest available energy orbital before populating higher levels, filling in order of increasing n + l.",
        thaiSummary: "อิเล็กตรอนจะเข้าบรรจุในออร์บิทัลที่มีระดับพลังงานต่ำที่สุดก่อน โดยเรียงลำดับตามค่า (n + l) ที่น้อยกว่าก่อน",
        deepTheory: [
          "The Aufbau ('building-up') principle states that ground-state electron configurations populate subshells in order of increasing energy.",
          "The Madelung rule dictates that subshells with lower (n + l) fill first. When two subshells share equal (n + l), the one with smaller n fills first (e.g., 4s with n+l=4 fills before 3d with n+l=5).",
        ],
        formulaLatex: "E_{orbital} \\propto (n + l) \\implies 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p",
        formulaSymbols: [
          { symbol: "E_{orbital}", meaning: "Relative subshell energy level" },
        ],
        application: {
          title: "Semiconductor Bandgap Engineering",
          thaiTitle: "วิศวกรรมแถบพลังงานในสารกึ่งตัวนำ",
          description: "In Silicon and Gallium Arsenide microchips, the valence and conduction band electron configurations determine conductivity, switching speed, and photon emission in LEDs.",
          thaiDescription: "ในไมโครชิปซิลิคอน การจัดเรียงอิเล็กตรอนในแถบวาเลนซ์และแถบการนำไฟฟ้าเป็นตัวกำหนดสภาพนำไฟฟ้าและความเร็วในการประมวลผล",
        },
      },
      {
        stepNumber: 3,
        title: "Hund's Rule & Pauli Exclusion Principle",
        thaiTitle: "กฎของฮุนด์และหลักการกีดกันของเพาลี",
        summary: "No two electrons in an atom can have identical four quantum numbers, and degenerate orbitals maximize parallel spin.",
        thaiSummary: "อิเล็กตรอนสองตัวในอะตอมเดียวกันจะมีเลขควอนตัมทั้ง 4 ค่าซ้ำกันไม่ได้ และในออร์บิทัลที่มีพลังงานเท่ากันจะบรรจุแบบเดี่ยวด้วยสปินขนานก่อน",
        deepTheory: [
          "Pauli Exclusion Principle: An orbital can hold a maximum of 2 electrons, which must have antiparallel spins (+1/2 and -1/2).",
          "Hund's Rule of Maximum Multiplicity: Electrons occupy degenerate orbitals singly with parallel spins before pairing up. This minimizes electron-electron Coulombic repulsion and maximizes exchange stabilization energy.",
        ],
        formulaLatex: "\\forall i \\neq j: \\quad (n_i, l_i, m_{l,i}, m_{s,i}) \\neq (n_j, l_j, m_{l,j}, m_{s,j})",
        formulaSymbols: [
          { symbol: "i, j", meaning: "Indices of two distinct electrons in the same atom" },
        ],
        application: {
          title: "Ferromagnetism in Iron & Neodymium Magnets",
          thaiTitle: "ความเป็นแม่เหล็กในแร่เหล็กและแม่เหล็กนีโอไดเมียม",
          description: "Iron has 4 unpaired 3d electrons (3d6), whose aligned parallel spins create magnetic domains responsible for permanent ferromagnetism in electric motor rotors.",
          thaiDescription: "ธาตุเหล็กมีอิเล็กตรอนเดี่ยว 4 ตัวในชั้น 3d ซึ่งมีสปินชี้ไปในทิศทางเดียวกันตามกฎของฮุนด์ ก่อให้เกิดโดเมนแม่เหล็กและคุณสมบัติแม่เหล็กถาวรในมอเตอร์ไฟฟ้า",
        },
      },
    ],
  },

  {
    id: "chem-vsepr",
    discipline: "chemistry",
    title: "VSEPR Theory & Molecular Geometry",
    thaiTitle: "ทฤษฎี VSEPR และเรขาคณิตโมเลกุล",
    estimatedMinutes: 20,
    level: "Intermediate",
    overview: "Predict 3D spatial molecular shapes based on valence shell electron pair electrostatic repulsions.",
    thaiOverview: "ทำนายรูปร่างเรขาคณิต 3 มิติของโมเลกุลโคเวเลนต์ตามแรงผลักระหว่างคู่อิเล็กตรอนในชั้นวาเลนซ์",
    tags: ["VSEPR", "Stereochemistry", "Hybridization", "Dipole Moment"],
    steps: [
      {
        stepNumber: 1,
        title: "Steric Number & Electron Pair Repulsion",
        thaiTitle: "จำนวนสเตอริกและแรงผลักของคู่อิเล็กตรอน",
        summary: "Valence Shell Electron Pair Repulsion (VSEPR) posits that electron pairs orient themselves as far apart as possible.",
        thaiSummary: "ทฤษฎี VSEPR ระบุว่าคู่อิเล็กตรอนรอบอะตอมกลางจะจัดตัวในทิศทางที่อยู่ห่างกันมากที่สุดเพื่อลดแรงผลักไฟฟ้าสถิตให้เหลือน้อยที่สุด",
        deepTheory: [
          "Steric Number (SN) = (Number of bonded atoms) + (Number of lone pairs on the central atom).",
          "The repulsive strength hierarchy: Lone Pair - Lone Pair (LP-LP) > Lone Pair - Bonding Pair (LP-BP) > Bonding Pair - Bonding Pair (BP-BP).",
        ],
        formulaLatex: "\\text{Steric Number (SN)} = \\sigma\\text{-bonds} + \\text{Lone Pairs}",
        formulaSymbols: [
          { symbol: "SN", meaning: "Steric Number determining electronic geometry" },
        ],
        application: {
          title: "Pharmacophore Drug-Receptor Binding",
          thaiTitle: "การจับกันของโมเลกุลยากับตัวรับในเซลล์",
          description: "Pharmaceutical active sites are spatially engineered to fit enzyme pockets with sub-angstrom geometric precision (lock-and-key / induced fit).",
          thaiDescription: "การออกแบบโครงสร้างโมเลกุลยาจำเป็นต้องมีมุมพันธะและรูปทรง 3 มิติที่พอดีกับช่องโปรตีนเป้าหมายในระดับต่ำกว่าอังสตรอม",
        },
      },
      {
        stepNumber: 2,
        title: "Canonical Geometries: Linear to Octahedral",
        thaiTitle: "รูปทรงเรขาคณิตพื้นฐาน: จากเส้นตรงสู่ทรงแปดหน้า",
        summary: "Steric numbers 2 through 6 dictate linear, trigonal planar, tetrahedral, trigonal bipyramidal, and octahedral geometries.",
        thaiSummary: "จำนวนสเตอริก 2 ถึง 6 กำหนดรูปทรงเส้นตรง สามเหลี่ยมแบนราบ ทรงสี่หน้า พีระมิดคู่ฐานสามเหลี่ยม และทรงแปดหน้า",
        deepTheory: [
          "SN = 2: Linear (180°), e.g., BeCl2, CO2.",
          "SN = 3: Trigonal planar (120°), e.g., BF3.",
          "SN = 4: Tetrahedral (109.5°), e.g., CH4. With 1 lone pair: Trigonal pyramidal (107°, NH3). With 2 lone pairs: Bent (104.5°, H2O).",
          "SN = 5: Trigonal bipyramidal (90°, 120°), e.g., PCl5.",
          "SN = 6: Octahedral (90°), e.g., SF6.",
        ],
        formulaLatex: "\\theta_{\\text{tetrahedral}} = \\arccos\\left(-\\frac{1}{3}\\right) \\approx 109.47^\\circ",
        formulaSymbols: [
          { symbol: "\\theta", meaning: "Bond angle in an ideal tetrahedral molecule" },
        ],
        application: {
          title: "Water's Anomalous Density & Ice Crystal Lattice",
          thaiTitle: "โครงสร้างผลึกน้ำแข็งและความหนาแน่นของน้ำ",
          description: "Water's bent 104.5° geometry and 2 lone pairs enable a hexagonal open hydrogen-bonded ice network, making ice less dense than liquid water and enabling aquatic life to survive frozen winters.",
          thaiDescription: "มุมงอ 104.5° และคู่อิเล็กตรอนโดดเดี่ยว 2 คู่ของน้ำ ทำให้เกิดโครงข่ายพันธะไฮโดรเจนรูปหกเหลี่ยมที่โปร่ง น้ำแข็งจึงลอยน้ำและปกป้องสิ่งมีชีวิตใต้น้ำในฤดูหนาว",
        },
      },
    ],
  },

  // ==========================================
  // BIOLOGY LESSONS
  // ==========================================
  {
    id: "bio-organelles",
    discipline: "biology",
    title: "Eukaryotic Cell Ultrastructure & Endomembrane System",
    thaiTitle: "โครงสร้างละเอียดของเซลล์ยูแคริโอตและระบบเอนโดเมมเบรน",
    estimatedMinutes: 20,
    level: "Foundation",
    overview: "Investigate organelle compartmentalization, membrane transport, and protein export pathways.",
    thaiOverview: "ศึกษาการแบ่งส่วนการทำงานภายในเซลล์ ระบบเยื่อหุ้มภายใน และวิถีการส่งออกโปรตีน",
    tags: ["Cell Biology", "Cytology", "Organelles", "Endosymbiosis"],
    steps: [
      {
        stepNumber: 1,
        title: "The Endomembrane Secretory Superhighway",
        thaiTitle: "วิถีการลำเลียงสารในระบบเอนโดเมมเบรน",
        summary: "Secretory and membrane proteins travel from the Rough ER through the Golgi apparatus to secretory vesicles and the plasma membrane.",
        thaiSummary: "โปรตีนที่จะส่งออกนอกเซลล์จะถูกสังเคราะห์ที่ RER แล้วส่งผ่านเวสิเคิลไปยังกอลจิบอดีเพื่อปรับแต่งโครงสร้างก่อนหลั่งออกนอกเซลล์",
        deepTheory: [
          "Proteins destined for secretion contain an N-terminal hydrophobic signal peptide recognized by the Signal Recognition Particle (SRP), docking the ribosome to the Sec61 translocon on the RER membrane.",
          "Inside the ER lumen, chaperone proteins (BiP) ensure correct folding, and core oligosaccharides are added (N-linked glycosylation).",
          "Transport vesicles coated with COPII bud from the ER and fuse with the cis-Golgi network. Cisternal maturation transports proteins to the trans-Golgi, where sorting signals direct them to lysosomes or secretory exocytic vesicles.",
        ],
        formulaLatex: "\\text{DNA} \\xrightarrow{\\text{transcribe}} \\text{mRNA} \\xrightarrow{\\text{RER 80S}} \\text{Pro-peptide} \\xrightarrow{\\text{Golgi}} \\text{Glycoprotein} \\xrightarrow{\\text{Exocytosis}} \\text{Extracellular}",
        formulaSymbols: [
          { symbol: "\\text{RER}", meaning: "Rough Endoplasmic Reticulum" },
          { symbol: "\\text{Golgi}", meaning: "Golgi Apparatus cis/trans compartments" },
        ],
        application: {
          title: "Insulin Production in Pancreatic Beta Cells",
          thaiTitle: "การผลิตฮอร์โมนอินซูลินในเซลล์ตับอ่อน",
          description: "Human pancreatic beta cells produce preproinsulin on the RER, cleave it into proinsulin, excise the C-peptide inside Golgi secretory granules, and release mature active insulin into the bloodstream.",
          thaiDescription: "เซลล์บีตาของตับอ่อนสังเคราะห์พรีโปรอินซูลินบน RER ตัดแต่งสายเพปไทด์ในกอลจิบอดีเป็นอินซูลินที่พร้อมใช้งาน แล้วหลั่งเข้าสู่กระแสเลือดเพื่อควบคุมระดับน้ำตาล",
        },
      },
      {
        stepNumber: 2,
        title: "Endosymbiotic Theory: Mitochondria & Chloroplasts",
        thaiTitle: "ทฤษฎีเอนโดซิมไบโอซิส: กำเนิดไมโทคอนเดรียและคลอโรพลาสต์",
        summary: "Mitochondria and chloroplasts evolved from engulfed aerobic alphaproteobacteria and photosynthetic cyanobacteria.",
        thaiSummary: "ไมโทคอนเดรียและคลอโรพลาสต์วิวัฒนาการมาจากแบคทีเรียที่ใช้ออกซิเจนและไซยาโนแบคทีเรียโบราณที่เข้าไปอาศัยอยู่ร่วมกันในเซลล์โฮสต์",
        deepTheory: [
          "Lynn Margulis's serial endosymbiotic theory is supported by robust invariant cellular evidence:",
          "1. Double Membrane: The inner membrane resembles bacterial membrane composition (contains cardiolipin, lacks cholesterol); the outer membrane was derived from the host phagocytic vesicle.",
          "2. Autonomous Circular DNA: Possess their own circular mitochondrial DNA (mtDNA) without histones, replicating independently via binary fission.",
          "3. 70S Bacterial Ribosomes: Sensitive to antibiotics (chloramphenicol, streptomycin) that inhibit bacterial 70S ribosomes, but unaffected by cycloheximide (which inhibits eukaryotic 80S ribosomes).",
        ],
        formulaLatex: "\\text{Host Archaea} + \\alpha\\text{-proteobacterium} \\xrightarrow{\\text{Endosymbiosis}} \\text{Ancestral Eukaryote (Aerobic)}",
        formulaSymbols: [
          { symbol: "\\text{mtDNA}", meaning: "Circular mitochondrial DNA" },
        ],
        application: {
          title: "Maternal Lineage & Forensic Anthropology",
          thaiTitle: "การสืบรอยสายพันธุ์มารดาด้วยไมโทคอนเดรียลดีเอ็นเอ",
          description: "Because sperm mitochondria are tagged with ubiquitin and digested upon fertilization, humans inherit mtDNA exclusively from their mother, enabling evolutionary geneticists to trace the 'Mitochondrial Eve' lineage back 150,000+ years.",
          thaiDescription: "เนื่องจากไมโทคอนเดรียในสเปิร์มจะถูกทำลายหลังการปฏิสนธิ มนุษย์จึงได้รับ mtDNA มาจากมารดาเพียงฝ่ายเดียว ช่วยให้นักพันธุศาสตร์สามารถสืบสายวิวัฒนาการของมนุษยชาติย้อนหลังได้นับแสนปี",
        },
      },
    ],
  },

  {
    id: "bio-central-dogma",
    discipline: "biology",
    title: "Central Dogma of Molecular Biology",
    thaiTitle: "หลักการศูนย์กลางทางอณูชีววิทยา (Central Dogma)",
    estimatedMinutes: 25,
    level: "Advanced",
    overview: "Trace directional genetic information flow: DNA replication, RNA transcription, and ribosomal translation.",
    thaiOverview: "ติดตามการถ่ายทอดข้อมูลทางพันธุกรรม: การจำลองดีเอ็นเอ การถอดรหัสเป็นอาร์เอ็นเอ และการแปลรหัสเป็นโปรตีน",
    tags: ["Genetics", "DNA", "RNA", "Transcription", "Translation"],
    steps: [
      {
        stepNumber: 1,
        title: "DNA Semiconservative Replication",
        thaiTitle: "การจำลองตัวเองแบบกึ่งอนุรักษ์ของ DNA",
        summary: "DNA helicase unwinds the double helix, and DNA polymerase III synthesizes new complementary strands 5' to 3'.",
        thaiSummary: "เอนไซม์เฮลิเคสคลายเกลียวคู่ และดีเอ็นเอพอลิเมอเรสสร้างสายใหม่ที่มีเบสคู่สมในทิศทาง 5' ไป 3' เสมอ",
        deepTheory: [
          "Meselson-Stahl experiment (1958) using 15N and 14N isotope density gradient centrifugation confirmed that each daughter DNA molecule contains one original parent template strand and one newly synthesized daughter strand.",
          "The leading strand is synthesized continuously towards the replication fork, whereas the lagging strand is synthesized discontinuously in Okazaki fragments joined by DNA ligase.",
        ],
        formulaLatex: "\\text{DNA}_{\\text{double}} \\xrightarrow{\\text{Helicase + Pol III}} 2 \\times \\text{DNA}_{\\text{semiconservative}} (\\text{Parent} + \\text{Daughter})",
        formulaSymbols: [
          { symbol: "5' \\to 3'", meaning: "Direction of nucleic acid chain elongation" },
        ],
        application: {
          title: "Polymerase Chain Reaction (PCR)",
          thaiTitle: "เทคนิค PCR ในการเพิ่มปริมาณ DNA",
          description: "PCR mimics biological replication in vitro using heat-stable Taq polymerase from Thermus aquaticus across thermal cycles (95°C denature, 55°C anneal, 72°C extend) to amplify DNA billion-fold for medical diagnostics.",
          thaiDescription: "เทคนิค PCR เลียนแบบการจำลอง DNA ในหลอดทดลอง โดยใช้เอนไซม์ Taq polymerase ทนความร้อน เพื่อเพิ่มปริมาณสารพันธุกรรมหลายพันล้านเท่าในการตรวจวินิจฉัยโรคและตรวจคัดกรองเชื้อไวรัส",
        },
      },
      {
        stepNumber: 2,
        title: "Transcription & Ribosomal Translation",
        thaiTitle: "การถอดรหัส (Transcription) และการแปลรหัส (Translation)",
        summary: "RNA polymerase transcribes DNA into mRNA, which the 80S ribosome translates into a polypeptide using tRNA anticodons.",
        thaiSummary: "อาร์เอ็นเอพอลิเมอเรสถอดรหัสยีนเป็น mRNA แล้วไรโบโซมจะแปลรหัสโคดอนทีละ 3 เบสเป็นกรดอะมิโนต่อกันเป็นสายโปรตีน",
        deepTheory: [
          "The genetic code is universal, degenerate (64 codons encode 20 standard amino acids), and non-overlapping. The canonical start codon AUG encodes Methionine, while UAA, UAG, and UGA serve as stop signals.",
          "tRNA molecules carry cognate amino acids charged by aminoacyl-tRNA synthetases. The ribosome's A (aminoacyl), P (peptidyl), and E (exit) sites catalyze peptide bond formation via peptidyl transferase activity of 28S rRNA.",
        ],
        formulaLatex: "\\text{Codon triplets } (4^3 = 64) \\implies 20 \\text{ standard amino acids} + 3 \\text{ stop codons}",
        formulaSymbols: [
          { symbol: "AUG", meaning: "Universal translation start codon (Methionine)" },
          { symbol: "\\text{A, P, E}", meaning: "Ribosomal catalytic tRNA binding sites" },
        ],
        application: {
          title: "mRNA Vaccines (COVID-19)",
          thaiTitle: "วัคซีนชนิด mRNA สำหรับการสร้างภูมิคุ้มกัน",
          description: "Synthetic lipid nanoparticle-encapsulated mRNA instructs patient ribosomes to translate viral Spike glycoprotein, provoking robust neutralizing antibodies without inserting foreign genetic material into the cell nucleus.",
          thaiDescription: "วัคซีน mRNA บรรจุในอนุภาคไขมันนาโน ทำหน้าที่ส่งคำสั่งให้ไรโบโซมของร่างกายสร้างโปรตีนหนาม (Spike) ของไวรัส เพื่อกระตุ้นระบบภูมิคุ้มกันได้อย่างปลอดภัยโดยไม่รบกวนจีโนมในนิวเคลียส",
        },
      },
    ],
  },

  // ==========================================
  // MATHEMATICS LESSONS
  // ==========================================
  {
    id: "math-calculus-limits",
    discipline: "mathematics",
    title: "Differential Calculus, Limits & Derivatives",
    thaiTitle: "แคลคูลัสเชิงอนุพันธ์ ลิมิต และอนุพันธ์",
    estimatedMinutes: 20,
    level: "Foundation",
    overview: "Grasp formal epsilon-delta limits, instantaneous rates of change, tangent slopes, and optimization.",
    thaiOverview: "ทำความเข้าใจนิยามลิมิตแบบเอปไซลอน-เดลตา อัตราการเปลี่ยนแปลงขณะใดขณะหนึ่ง และความชันของเส้นสัมผัส",
    tags: ["Calculus", "Limits", "Derivatives", "Optimization"],
    steps: [
      {
        stepNumber: 1,
        title: "The Concept of Limits: Bridging Infinitesimals",
        thaiTitle: "แนวคิดเรื่องลิมิต: การเข้าใกล้ค่าอนันต์และค่าเล็กยิ่งยวด",
        summary: "The limit of f(x) as x approaches c is the real value L that f(x) arbitrarily nears as x gets arbitrarily close to c.",
        thaiSummary: "ลิมิตของ f(x) เมื่อ x เข้าใกล้ c คือค่า L ที่ f(x) เข้าใกล้อย่างยิ่งยวดเมื่อ x เข้าใกล้ c โดยที่ x ไม่จำเป็นต้องเท่ากับ c",
        deepTheory: [
          "Cauchy and Weierstrass formalized the limit definition rigorously: For every \\epsilon > 0, there exists a \\delta > 0 such that whenever 0 < |x - c| < \\delta, then |f(x) - L| < \\epsilon.",
          "Limits resolve classical indeterminate forms (0/0, \\infty/\\infty) without dividing by zero, unlocking instantaneous physical measurements.",
        ],
        formulaLatex: "\\lim_{x \\to c} f(x) = L \\iff \\forall \\varepsilon > 0, \\exists \\delta > 0 : (0 < |x - c| < \\delta \\implies |f(x) - L| < \\varepsilon)",
        formulaSymbols: [
          { symbol: "\\epsilon", meaning: "Arbitrary positive error tolerance in the function output" },
          { symbol: "\\delta", meaning: "Required proximity interval in the input variable" },
          { symbol: "L", meaning: "Limiting value" },
        ],
        application: {
          title: "Speedometer Instantaneous Velocity",
          thaiTitle: "การคำนวณความเร็วขณะใดขณะหนึ่งของมาตรวัดความเร็วรถยนต์",
          description: "While average speed is distance divided by elapsed time, a digital vehicle speedometer computes instantaneous speed as the limit of delta-s over delta-t as delta-t approaches zero.",
          thaiDescription: "ขณะที่ความเร็วเฉลี่ยคำนวณจากระยะทางหารด้วยเวลาทั้งหมด มาตรวัดความเร็วของรถยนต์จะคำนวณความเร็วขณะใดขณะหนึ่งจากลิมิตของ \\Delta s / \\Delta t เมื่อช่วงเวลา \\Delta t เข้าใกล้ศูนย์",
        },
      },
      {
        stepNumber: 2,
        title: "Definition of the Derivative & Power Rule",
        thaiTitle: "นิยามของอนุพันธ์และกฎลูกโซ่",
        summary: "The derivative represents the instantaneous slope of the tangent line to the curve at any given point.",
        thaiSummary: "อนุพันธ์แสดงถึงความชันของเส้นสัมผัสกราฟ ณ จุดใดจุดหนึ่ง และแสดงอัตราการเปลี่ยนแปลงขณะใดขณะหนึ่ง",
        deepTheory: [
          "The first derivative is defined as the limit of the difference quotient: f'(x) = \\lim_{h \\to 0} [f(x+h) - f(x)] / h.",
          "For power functions f(x) = x^n, applying binomial expansion yields the Power Rule: d/dx(x^n) = n x^(n-1).",
          "The Chain Rule enables differentiation of composite functions: d/dx[f(g(x))] = f'(g(x)) · g'(x).",
        ],
        formulaLatex: "f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
        formulaSymbols: [
          { symbol: "f'(x)", meaning: "Derivative of f with respect to x (tangent slope)" },
          { symbol: "h", meaning: "Infinitesimal increment in input variable x" },
        ],
        application: {
          title: "Machine Learning Gradient Descent (Backpropagation)",
          thaiTitle: "การปรับค่าน้ำหนักในโครงข่ายประสาทเทียมด้วยเกรเดียนต์",
          description: "Deep neural networks train by computing partial derivatives of the loss function with respect to millions of model weights using the Chain Rule to minimize classification error.",
          thaiDescription: "การฝึกโครงข่ายประสาทเทียม (Deep Learning) ใช้กฎลูกโซ่คำนวณอนุพันธ์ย่อยของฟังก์ชันการสูญเสียเทียบกับค่าน้ำหนักนับล้านตัว เพื่อปรับค่าน้ำหนักให้โมเดลทำนายได้แม่นยำที่สุด",
        },
      },
    ],
  },

  {
    id: "math-integrals",
    discipline: "mathematics",
    title: "Riemann Integration & Fundamental Theorem of Calculus",
    thaiTitle: "การอินทิเกรตแบบรีมันน์และทฤษฎีบทมูลฐานของแคลคูลัส",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Connect accumulation, area under curves, antiderivatives, and the Fundamental Theorem of Calculus.",
    thaiOverview: "เชื่อมโยงการสะสมผลรวม พื้นที่ใต้กราฟ ปริพันธ์ และทฤษฎีบทมูลฐานที่รวมแคลคูลัสสองสายเข้าด้วยกัน",
    tags: ["Calculus", "Integration", "Riemann Sum", "Accumulation"],
    steps: [
      {
        stepNumber: 1,
        title: "Riemann Sums: Partitioning the Area",
        thaiTitle: "ผลบวกรีมันน์: การแบ่งย่อยพื้นที่เพื่อหาผลรวมสะสม",
        summary: "The definite integral is the limit of Riemann sums partitioning the domain into infinitely thin rectangles.",
        thaiSummary: "ปริพันธ์จำกัดเขตคือลิมิตของผลรวมรูปสี่เหลี่ยมผืนผ้าที่มีความกว้างบางลงเรื่อยๆ จนเข้าสู่อนันต์",
        deepTheory: [
          "Given a continuous function f(x) on [a, b], we partition the interval into n subintervals of width \\Delta x = (b - a)/n.",
          "Choosing sample evaluation points x_i^* in each partition, the Riemann sum is \\sum f(x_i^*) \\Delta x. As n \\to \\infty, the sum converges to the definite integral \\int_a^b f(x) dx.",
        ],
        formulaLatex: "\\int_a^b f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x",
        formulaSymbols: [
          { symbol: "\\int_a^b f(x) dx", meaning: "Net signed area between curve f(x) and the x-axis" },
          { symbol: "\\Delta x", meaning: "Partition width: (b - a) / n" },
        ],
        application: {
          title: "Structural Civil Engineering: Beam Load Deflection",
          thaiTitle: "วิศวกรรมโครงสร้าง: การคำนวณแรงดัดในคานสะพาน",
          description: "Civil engineers integrate distributed dynamic traffic loads across bridge suspension spans to determine bending moments, shear stress distributions, and steel reinforcement thicknesses.",
          thaiDescription: "วิศวกรโยธาใช้การอินทิเกรตกระจายน้ำหนักของรถยนต์บนสะพานเพื่อคำนวณโมเมนต์ดัดและแรงเฉือน ป้องกันการวิบัติของโครงสร้างคอนกรีตเสริมเหล็ก",
        },
      },
      {
        stepNumber: 2,
        title: "The Fundamental Theorem of Calculus (FTC)",
        thaiTitle: "ทฤษฎีบทมูลฐานของแคลคูลัส (FTC)",
        summary: "Differentiation and integration are inverse operations: the integral of a rate of change equals the net change.",
        thaiSummary: "การหาอนุพันธ์และการอินทิเกรตเป็นกระบวนการผกผันซึ่งกันและกัน ผลรวมของการเปลี่ยนแปลงจะเท่ากับการเปลี่ยนแปลงสุทธิ",
        deepTheory: [
          "Part 1: If F(x) = \\int_a^x f(t) dt, then F'(x) = f(x). Accumulating area under a curve has a derivative exactly equal to the curve itself.",
          "Part 2: If F is any antiderivative of f (so F' = f), then \\int_a^b f(x) dx = F(b) - F(a). This eliminates the need to calculate infinite Riemann sum limits.",
        ],
        formulaLatex: "\\frac{d}{dx} \\left( \\int_a^x f(t) \\, dt \\right) = f(x) \\quad \\text{and} \\quad \\int_a^b f(x) \\, dx = F(b) - F(a)",
        formulaSymbols: [
          { symbol: "F(x)", meaning: "Antiderivative of f(x) such that F'(x) = f(x)" },
        ],
        application: {
          title: "Electric Power Grid Energy Metering",
          thaiTitle: "การคำนวณพลังงานไฟฟ้ากิโลวัตต์-ชั่วโมงในมิเตอร์",
          description: "Electric utility meters compute total consumed energy in kWh by integrating instantaneous power P(t) = V(t) · I(t) over time t across days and billing cycles.",
          thaiDescription: "มิเตอร์ไฟฟ้าคำนวณพลังงานรวม (kWh) โดยการอินทิเกรตกำลังไฟฟ้าขณะใดขณะหนึ่ง P(t) = V(t)·I(t) เทียบกับเวลาตลอดทั้งเดือนเพื่อคิดค่าไฟฟ้า",
        },
      },
    ],
  },

  // ==========================================
  // COMPUTER SCIENCE LESSONS
  // ==========================================
  {
    id: "cs-boolean-logic",
    discipline: "cs",
    title: "Boolean Logic, Logic Gates & Binary Adders",
    thaiTitle: "ตรรกศาสตร์บูลีน เกตดิจิทัล และวงจรบวกเลขฐานสอง",
    estimatedMinutes: 20,
    level: "Foundation",
    overview: "Build truth tables, synthesize Boolean algebraic expressions, and construct Half and Full Adders.",
    thaiOverview: "สร้างตารางค่าความจริง ลดทอนสมการพีชคณิตบูลีน และประกอบวงจร Half Adder และ Full Adder จากเกตพื้นฐาน",
    tags: ["Computer Science", "Boolean Algebra", "Logic Gates", "ALU"],
    steps: [
      {
        stepNumber: 1,
        title: "Primitive Logic Gates & Universal NAND/NOR",
        thaiTitle: "เกตตรรกะพื้นฐานและเกตสากล NAND / NOR",
        summary: "AND, OR, NOT, and XOR form the foundation of digital computation. NAND and NOR gates are functionally complete.",
        thaiSummary: "AND, OR, NOT และ XOR เป็นรากฐานของคอมพิวเตอร์ดิจิทัล โดยเกต NAND และ NOR เป็นเกตสากลที่สามารถสร้างเกตทุกชนิดได้",
        deepTheory: [
          "Boolean algebra operates on binary variables {0, 1}. The fundamental operators are Conjunction (AND, \\land), Disjunction (OR, \\lor), and Negation (NOT, \\neg).",
          "De Morgan's Laws: \\neg(A \\land B) = \\neg A \\lor \\neg B, and \\neg(A \\lor B) = \\neg A \\land \\neg B.",
          "Functional Completeness: Any Boolean function can be implemented using exclusively NAND gates or exclusively NOR gates, which dramatically simplifies integrated circuit silicon lithography.",
        ],
        formulaLatex: "\\overline{A \\cdot B} = \\bar{A} + \\bar{B} \\quad \\text{and} \\quad \\overline{A + B} = \\bar{A} \\cdot \\bar{B}",
        formulaSymbols: [
          { symbol: "A, B", meaning: "Binary inputs \\in {0, 1}" },
          { symbol: "\\cdot", meaning: "Boolean AND" },
          { symbol: "+", meaning: "Boolean OR" },
          { symbol: "\\bar{A}", meaning: "Boolean NOT" },
        ],
        application: {
          title: "Flash Memory NAND Cell Arrays",
          thaiTitle: "หน่วยความจำ NAND Flash ใน SSD",
          description: "Solid State Drives (SSDs) and smartphone storage store billions of bits using floating-gate and charge-trap NAND transistor cell arrays for non-volatile, high-density data persistence.",
          thaiDescription: "ไดรฟ์ SSD และสมาร์ตโฟนบันทึกข้อมูลระดับเทระไบต์ด้วยทรานซิสเตอร์แบบ NAND Flash ซึ่งเก็บประจุไฟฟ้าไว้ได้แม้ไม่มีกระแสไฟฟ้าหล่อเลี้ยง",
        },
      },
      {
        stepNumber: 2,
        title: "Binary Half Adder & Full Adder Synthesis",
        thaiTitle: "การสร้างวงจรบวก Half Adder และ Full Adder",
        summary: "Combine XOR and AND gates to compute the Sum bit and Carry bit for multi-bit binary addition in CPU ALUs.",
        thaiSummary: "รวมเกต XOR และ AND เพื่อสร้างบิตผลบวก (Sum) และบิตทด (Carry) สำหรับหน่วยคำนวณและตรรกะ (ALU) ในไมโครโพรเซสเซอร์",
        deepTheory: [
          "Half Adder: Takes two single-bit inputs A and B. Sum = A \\oplus B (XOR); Carry = A \\cdot B (AND).",
          "Full Adder: Adds two bits A and B along with a Carry-In (C_in) from the preceding lower significant bit stage:",
          "Sum = A \\oplus B \\oplus C_{in}, and C_{out} = (A \\cdot B) + (C_{in} \\cdot (A \\oplus B)).",
          "Cascading N Full Adders produces an N-bit Ripple Carry Adder capable of integer addition inside the CPU Arithmetic Logic Unit (ALU).",
        ],
        formulaLatex: "S = A \\oplus B \\oplus C_{in}, \\quad C_{out} = (A \\cdot B) + (C_{in} \\cdot (A \\oplus B))",
        formulaSymbols: [
          { symbol: "S", meaning: "Sum bit output \\in {0, 1}" },
          { symbol: "C_{out}", meaning: "Carry-out bit to next higher stage" },
          { symbol: "C_{in}", meaning: "Carry-in bit from previous stage" },
          { symbol: "\\oplus", meaning: "Exclusive OR (XOR) operator" },
        ],
        application: {
          title: "CPU Arithmetic Logic Unit (ALU)",
          thaiTitle: "หน่วยประมวลผลคณิตศาสตร์ ALU ในซีพียู",
          description: "Modern 64-bit processors (x86-64, ARM Cortex) utilize advanced Carry-Lookahead Adders (CLA) based on these Boolean logic equations to perform billions of 64-bit integer additions every second.",
          thaiDescription: "ซีพียูสมัยใหม่ขนาด 64 บิต ใช้โครงสร้างวงจรบวกแบบทดล่วงหน้า (Carry-Lookahead Adder) เพื่อคำนวณทางคณิตศาสตร์ได้หลายพันล้านคำสั่งต่อวินาที",
        },
      },
    ],
  },

  {
    id: "cs-big-o-complexity",
    discipline: "cs",
    title: "Algorithmic Complexity & Big-O Notation",
    thaiTitle: "ความซับซ้อนของขั้นตอนวิธีและสัญกรณ์บิ๊กโอ (Big-O)",
    estimatedMinutes: 20,
    level: "Intermediate",
    overview: "Analyze asymptotic runtime and memory growth rates for sorting and searching algorithms.",
    thaiOverview: "วิเคราะห์อัตราการเติบโตของเวลาประมวลผลและการใช้หน่วยความจำของอัลกอริทึมในการค้นหาและจัดเรียงข้อมูล",
    tags: ["Algorithms", "Big-O", "Data Structures", "Sorting"],
    steps: [
      {
        stepNumber: 1,
        title: "Asymptotic Bound Definitions: O, Omega, and Theta",
        thaiTitle: "นิยามขอบเขตเชิงเส้นกำกับ: Big-O, Omega, และ Theta",
        summary: "Big-O characterizes the mathematical upper bound of an algorithm's resource consumption as input size n approaches infinity.",
        thaiSummary: "สัญกรณ์บิ๊กโอ (Big-O) ระบุขอบเขตบนของเวลาหรือหน่วยความจำที่อัลกอริทึมต้องใช้เมื่อขนาดข้อมูล n เพิ่มขึ้นสู่ค่าอนันต์",
        deepTheory: [
          "Formal definition: f(n) = O(g(n)) if and only if there exist positive constants c > 0 and n_0 > 0 such that 0 \\le f(n) \\le c \\cdot g(n) for all n \\ge n_0.",
          "Common complexity hierarchy from fastest to slowest:",
          "O(1) Constant < O(\\log n) Logarithmic < O(n) Linear < O(n \\log n) Linearithmic < O(n^2) Quadratic < O(2^n) Exponential < O(n!) Factorial.",
        ],
        formulaLatex: "f(n) \\in O(g(n)) \\iff \\exists c > 0, n_0 > 0 : \\forall n \\ge n_0, \\, 0 \\le f(n) \\le c \\cdot g(n)",
        formulaSymbols: [
          { symbol: "f(n)", meaning: "Actual execution steps taken by the algorithm" },
          { symbol: "g(n)", meaning: "Asymptotic upper bound envelope function" },
          { symbol: "n", meaning: "Input dataset size (number of elements)" },
        ],
        application: {
          title: "Database Indexing via B-Trees & Hash Maps",
          thaiTitle: "การทำดัชนีฐานข้อมูลด้วย B-Tree และ Hash Table",
          description: "PostgreSQL and MySQL use B-Tree indexes to reduce search time from O(n) full table scans to O(log n), and in-memory hash indexes to achieve instantaneous O(1) primary key lookups.",
          thaiDescription: "ระบบฐานข้อมูลใช้ดัชนี B-Tree เพื่อลดเวลาค้นหาข้อมูลนับล้านแถวจาก O(n) เหลือ O(log n) และใช้ Hash Index สำหรับการค้นหาแบบ O(1) ทันที",
        },
      },
    ],
  },

  // ==========================================
  // THAI LANGUAGE LESSONS
  // ==========================================
  {
    id: "thai-triyang-phonology",
    discipline: "thai",
    title: "Triyang 3-Consonant Classes & Tone Rules",
    thaiTitle: "ไตรยางศ์ อักษรสามหมู่ และกฎการผันวรรณยุกต์คำเป็น-คำตาย",
    estimatedMinutes: 20,
    level: "Foundation",
    overview: "Master acoustic consonant categorization (Mid, High, Low) and dead/live syllable tone mutations.",
    thaiOverview: "เจาะลึกการจำแนกสัทศาสตร์พยัญชนะไทย 3 หมู่ กฎเกณฑ์คำเป็นคำตาย และกลไกการเปลี่ยนระดับเสียงวรรณยุกต์ 5 เสียง",
    tags: ["Thai Phonology", "Triyang", "Tones", "Acoustics"],
    steps: [
      {
        stepNumber: 1,
        title: "Triyang Classification: Acoustic Consonant Tripartite",
        thaiTitle: "การแบ่งไตรยางศ์: อักษรกลาง อักษรสูง และอักษรต่ำ",
        summary: "Thai consonants are categorized into Mid (9), High (11), and Low (24) classes based on intrinsic acoustic pitch registers.",
        thaiSummary: "พยัญชนะไทย 44 รูป ถูกจัดแบ่งเป็น 3 หมู่ตามระดับเสียงแท้จริง: อักษรกลาง (9 ตัว) อักษรสูง (11 ตัว) และอักษรต่ำ (24 ตัว)",
        deepTheory: [
          "1. อักษรกลาง (Mid Class, 9 consonants: ก จ ด ต บ ป อ ฎ ฏ): Voiced and unaspirated stops. Can naturally produce all 5 phonemic tones without acoustic register shift.",
          "2. อักษรสูง (High Class, 11 consonants: ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห): Voiceless aspirated stops and fricatives. Natural base pitch starts in the Rising tone without mark.",
          "3. อักษรต่ำ (Low Class, 24 consonants): Subdivided into อักษรต่ำเดี่ยว (10 nasals/approximants: ง ญ ณ น ม ย ร ล ว ฬ) and อักษรต่ำคู่ (14 aspirated stops paired with High class: ค ฅ ฆ ช ซ ฌ ฑ ฒ ท ธ พ ฟ ภ ฮ).",
        ],
        formulaLatex: "\\text{Consonants (44)} = \\text{Mid (9)} + \\text{High (11)} + \\text{Low (24 [10 Single + 14 Paired])}",
        formulaSymbols: [
          { symbol: "\\text{Mid}", meaning: "ก จ ด ต บ ป อ ฎ ฏ" },
          { symbol: "\\text{High}", meaning: "ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห" },
          { symbol: "\\text{Low}", meaning: "ค ฅ ฆ ช ซ ฌ ฑ ฒ ท ธ พ ฟ ภ ฮ ง ญ ณ น ม ย ร ล ว ฬ" },
        ],
        application: {
          title: "Thai Natural Language Processing (NLP) Tokenizers",
          thaiTitle: "การตัดคำและประมวลผลภาษาธรรมชาติ (Thai NLP)",
          description: "Modern Thai text-to-speech (TTS) engines and deep learning tokenizers use Triyang phoneme tables to synthesize acoustic pitch trajectories and resolve syllable boundaries.",
          thaiDescription: "ระบบแปลงข้อความเป็นเสียงพูด (Text-to-Speech) ใช้กฎไตรยางศ์ในการสร้างคลื่นความถี่เสียงวรรณยุกต์สังเคราะห์ให้มีความเป็นธรรมชาติถูกต้องตามหลักสัทศาสตร์",
        },
      },
      {
        stepNumber: 2,
        title: "Live vs. Dead Syllables (คำเป็น - คำตาย)",
        thaiTitle: "การจำแนกคำเป็น - คำตาย และมาตราตัวสะกด",
        summary: "Acoustic duration and airflow stoppage govern tone behavior: Live syllables sustain airflow; Dead syllables cut it abruptly.",
        thaiSummary: "คำเป็นคือพยางค์ที่ลากเสียงยาวและอากาศไหลต่อเนื่อง ส่วนคำตายคือพยางค์ที่ลมถูกปิดกั้นอย่างฉับพลันด้วยสระเสียงสั้นหรือแม่ กบด",
        deepTheory: [
          "คำเป็น (Live Syllables):",
          "1. Syllables ending in vowels with long acoustic duration in แม่ ก กา (สระเสียงยาว เช่น อา, อี, อู, เอ, โอ).",
          "2. Syllables with nasal/resonant codas: แม่ กง, กน, กม, เกย, เกอว (ท่องจำ: นมยวง).",
          "3. Special vowel morphemes: อำ, ไอ, ใบล, เอา (บรรจุเสียงพยัญชนะสะกด ม, ย, ว ในตัว).",
          "",
          "คำตาย (Dead Syllables):",
          "1. Syllables ending in short vowels without a coda consonant in แม่ ก กา (เช่น อะ, อิ, อุ, แอะ).",
          "2. Syllables with stop consonant codas (แม่ กก, กบ, กด - ท่องจำ: กบด) where the oral cavity creates a complete glottal/buccal stop.",
        ],
        formulaLatex: "\\text{Live} = \\text{Long Vowel} \\lor \\text{Coda}(\\text{นมยวง}), \\quad \\text{Dead} = \\text{Short Vowel} \\lor \\text{Coda}(\\text{กบด})",
        formulaSymbols: [
          { symbol: "\\text{กบด}", meaning: "Stop consonant codas (แม่ กก, แม่ กบ, แม่ กด)" },
          { symbol: "\\text{นมยวง}", meaning: "Resonant codas (แม่ กน, แม่ กม, แม่ เกย, แม่ เกอว, แม่ กง)" },
        ],
        application: {
          title: "Thai Orthography Acoustic Tone Matrix",
          thaiTitle: "เมทริกซ์การผันวรรณยุกต์คำเป็น-คำตาย",
          description: "Low-class dead syllables with short vowels naturally yield High tone (e.g. นะ, คะ), whereas long vowels yield Falling tone (e.g. มาก, พูด), solving frequent orthographic errors.",
          thaiDescription: "อักษรต่ำคำตายสระเสียงสั้นจะผันเป็นเสียงตรีโดยไม่ต้องใส่ไม้ตรี (เช่น นะ, คะ, รัก) ส่วนสระเสียงยาวจะผันเป็นเสียงโท (เช่น มาก, พูด, โลก) การเข้าใจกฎนี้ช่วยแก้ปัญหาการเขียนผิดได้อย่างถาวร",
        },
      },
    ],
  },

  {
    id: "thai-morphology-compounds",
    discipline: "thai",
    title: "Thai Morphology: Kam Samas & Kam Sondhi",
    thaiTitle: "กลไกคำสมาสและคำสนธิในภาษาไทย",
    estimatedMinutes: 20,
    level: "Intermediate",
    overview: "Deconstruct Pali and Sanskrit loanword morphology, phonetic sandhi fusion, and syllable liaison.",
    thaiOverview: "ศึกษากระบวนการสร้างคำแบบสมาสและสนธิที่รับมาจากภาษาบาลี-สันสกฤต การเชื่อมเสียง และการกลมกลืนเสียง",
    tags: ["Thai Morphology", "Sanskrit", "Pali", "Linguistics"],
    steps: [
      {
        stepNumber: 1,
        title: "Kam Samas: Word Compounding Mechanisms",
        thaiTitle: "คำสมาส: การสร้างคำประสมแบบบาลี-สันสกฤต",
        summary: "Kam Samas combines two Pali/Sanskrit roots into a single compound, translating meaning from back to front with liaison pronunciation.",
        thaiSummary: "คำสมาสคือการนำคำที่มาจากภาษาบาลีหรือสันสกฤตตั้งแต่ 2 คำขึ้นไปมารวมกัน แปลความหมายจากหลังมาหน้า และออกเสียงเชื่อมพยางค์",
        deepTheory: [
          "Rules of Kam Samas (สมาสแบบชนคำ):",
          "1. Both components must originate from Pali or Sanskrit (words of Thai, Khmer, or European origin cannot form true Samas).",
          "2. The primary meaning is read from back to front (e.g., ภูมิศาสตร์ = ศาสตร์ (วิชา) + ภูมิ (แผ่นดิน) = วิเคราะห์เกี่ยวกับแผ่นดิน).",
          "3. Syllable liaison: When the first word ends without a written vowel mark, a connecting vowel sound (often /a/ or /i/) is pronounced (e.g., ประวัติศาสตร์ ออกเสียง ปฺระ-หวัด-ติ-สาด).",
          "4. Stripping of vowel markers: The joining boundary drops Thanthakhat (การันต์) and Wisanchani (ะ) from the prior word.",
        ],
        formulaLatex: "\\text{Root}_A (\\text{Pali/Skt}) + \\text{Root}_B (\\text{Pali/Skt}) \\xrightarrow{\\text{Samas}} \\text{Compound}_{AB} \\quad (\\text{Meaning: } B \\to A)",
        formulaSymbols: [
          { symbol: "\\text{Root}_A", meaning: "First Pali/Sanskrit morpheme" },
          { symbol: "\\text{Root}_B", meaning: "Second Pali/Sanskrit morpheme determining head noun" },
        ],
        application: {
          title: "Technical Lexicon & Neologisms",
          thaiTitle: "การบัญญัติศัพท์วิชาการในราชบัณฑิตยสภา",
          description: "The Royal Society of Thailand constructs modern scientific terms through Samas compounding (e.g., ดาราศาสตร์ for Astronomy, เทคโนโลยีชีวภาพ for Biotechnology).",
          thaiDescription: "ราชบัณฑิตยสภาใช้หลักคำสมาสในการบัญญัติคำศัพท์วิทยาศาสตร์และเทคโนโลยีสมัยใหม่ เช่น วิศวกรรมศาสตร์, เทคโนโลยีชีวภาพ, ดาราศาสตร์ฟิสิกส์",
        },
      },
      {
        stepNumber: 2,
        title: "Kam Sondhi: Phonetic Fusion & Sandhi Assimilation",
        thaiTitle: "คำสนธิ: การเชื่อมเสียงและกลืนเสียง (Sandhi)",
        summary: "Kam Sondhi fuses adjacent vowel and consonant sounds at the morpheme boundary, causing phonetic mutations.",
        thaiSummary: "คำสนธิคือการเชื่อมเสียงระหว่างคำหน้าและคำหลังให้กลมกลืนเป็นเสียงเดียวกัน โดยมีการเปลี่ยนแปลงสระ พยัญชนะ หรือนิคหิต",
        deepTheory: [
          "Sandhi categories:",
          "1. สระสนธิ (Vowel Sandhi): The trailing vowel of word A fuses with the initial vowel of word B.",
          "   - a/aa + i/ii \\to e (e.g., มหา + อิสี \\to มเหสี, ราชา + อินทร์ \\to ราเชนทร์).",
          "   - a/aa + u/uu \\to o (e.g., ราช + อุปโภค \\to ราชูปโภค, นร + อุดม \\to นโรดม).",
          "2. พยัญชนะสนธิ (Consonant Sandhi): Rare in Thai, alters consonants according to Sanskrit phonetic grids.",
          "3. นฤคหิตสนธิ (Niggahita Sandhi): The nasal dot (นิคหิต / อัง) transforms into the nasal consonant of the following word's consonant class (e.g., สํ + คม \\to สังคม [ค อยู่ในวรรค กะ \\to ง], สํ + ฐาน \\to สัณฐาน [ฐ อยู่ในวรรค ตะเล็ก \\to ณ]).",
        ],
        formulaLatex: "\\text{Stem}_1 + \\text{Stem}_2 \\xrightarrow{\\text{Vowel Fusion}} a + i \\to e, \\quad a + u \\to o",
        formulaSymbols: [
          { symbol: "\\text{Sandhi}", meaning: "Sanskrit/Pali phonetic boundary fusion" },
        ],
        application: {
          title: "Etymological Precision in Classical Literature",
          thaiTitle: "การสืบค้นรากศัพท์ในวรรณคดีและชื่อบุคคล",
          description: "Deciphering Sondhi allows linguistic scholars to instantly analyze classical Thai names and royal titles (e.g., จุฬาลงกรณ์ = จุฬา + อลงกรณ์, รามาธิบดี = ราม + อธิบดี).",
          thaiDescription: "การเข้าใจคำสนธิช่วยให้สามารถถอดรหัสชื่อมงคล ราชทินนาม และวรรณคดีชั้นสูงได้อย่างแม่นยำ เช่น จุฬาลงกรณ์ มาจาก จุฬา (มงกุฎ) + อลงกรณ์ (เครื่องประดับ)",
        },
      },
    ],
  },
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
