import type { Lesson } from "./types.ts";

export const CHEMISTRY_LESSONS: Lesson[] = [
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
          "Spin quantum number (m_s): Represents intrinsic electron angular momentum (spin +1/2 or -1/2)."
        ],
        formulaLatex: "\\psi_{n, l, m_l, m_s}(r, \\theta, \\phi) = R_{n,l}(r) Y_{l,m_l}(\\theta, \\phi) \\chi_{m_s}",
        formulaSymbols: [
          { symbol: "n", meaning: "Principal energy level (1, 2, 3...)" },
          { symbol: "l", meaning: "Orbital angular momentum (0 to n-1)" },
          { symbol: "m_l", meaning: "Magnetic orientation (-l to +l)" },
          { symbol: "m_s", meaning: "Spin orientation (+1/2, -1/2)" }
        ],
        application: {
          title: "Magnetic Resonance Imaging (MRI)",
          thaiTitle: "เครื่องตรวจคลื่นแม่เหล็กไฟฟ้า MRI",
          description: "MRI machines align nuclear and electron spins in hydrogen atoms using superconducting magnetic fields (1.5 - 3.0 Tesla), detecting radiofrequency relaxation photons to generate anatomical tissue contrast.",
          thaiDescription: "เครื่อง MRI จัดเรียงสปินของนิวเคลียสไฮโดรเจนในร่างกายด้วยสนามแม่เหล็กยิ่งยวด แล้วตรวจวัดคลื่นวิทยุที่คายออกมาเพื่อสร้างภาพตัดขวางของอวัยวะที่มีความละเอียดสูง"
        },
        checkpoint: {
          question: "Which quantum number specifies the 3D geometric shape of an atomic orbital (s, p, d, f)?",
          thaiQuestion: "เลขควอนตัมใดเป็นตัวกำหนดรูปทรงเรขาคณิต 3 มิติของออร์บิทัล (s, p, d, f)?",
          options: [
            "Principal quantum number (n)",
            "Azimuthal / angular momentum quantum number (l)",
            "Magnetic quantum number (ml)",
            "Spin quantum number (ms)"
          ],
          correctIndex: 1,
          explanation: "The azimuthal quantum number l defines the orbital angular momentum and its geometric morphology (l=0 sphere s, l=1 dumbbell p, l=2 cloverleaf d).",
          thaiExplanation: "เลขควอนตัม l (Azimuthal) เป็นตัวกำหนดโมเมนตัมเชิงมุมและรูปทรงของออร์บิทัล เช่น ทรงกลม s หรือดัมเบลล์ p"
        }
      },
      {
        stepNumber: 2,
        title: "Aufbau Principle & Madelung (n + l) Rule",
        thaiTitle: "หลักการออฟบาวและกฎการเติมพลังงาน (n + l)",
        summary: "Electrons occupy the lowest available energy orbital before populating higher levels, filling in order of increasing n + l.",
        thaiSummary: "อิเล็กตรอนจะเข้าบรรจุในออร์บิทัลที่มีระดับพลังงานต่ำที่สุดก่อน โดยเรียงลำดับตามค่า (n + l) ที่น้อยกว่าก่อน",
        deepTheory: [
          "The Aufbau ('building-up') principle states that ground-state electron configurations populate subshells in order of increasing energy.",
          "The Madelung rule dictates that subshells with lower (n + l) fill first. When two subshells share equal (n + l), the one with smaller n fills first (e.g., 4s with n+l=4 fills before 3d with n+l=5)."
        ],
        formulaLatex: "E_{\\text{orbital}} \\propto (n + l) \\implies 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p",
        formulaSymbols: [
          { symbol: "E_{\\text{orbital}}", meaning: "Relative subshell energy level" }
        ],
        application: {
          title: "Semiconductor Bandgap Engineering",
          thaiTitle: "วิศวกรรมแถบพลังงานในสารกึ่งตัวนำ",
          description: "In Silicon and Gallium Arsenide microchips, the valence and conduction band electron configurations determine conductivity, switching speed, and photon emission in LEDs.",
          thaiDescription: "ในไมโครชิปซิลิคอน การจัดเรียงอิเล็กตรอนในแถบวาเลนซ์และแถบการนำไฟฟ้าเป็นตัวกำหนดสภาพนำไฟฟ้าและความเร็วในการประมวลผล"
        },
        checkpoint: {
          question: "According to the Madelung (n+l) rule, why does the 4s orbital fill before the 3d orbital?",
          thaiQuestion: "ตามกฎ (n+l) เหตุใดออร์บิทัล 4s จึงถูกบรรจุอิเล็กตรอนก่อนออร์บิทัล 3d?",
          options: [
            "4s has n+l=4, whereas 3d has n+l=5",
            "4s has a higher principal quantum number n",
            "3d can hold fewer electrons than 4s",
            "4s electrons have opposite spins"
          ],
          correctIndex: 0,
          explanation: "For 4s: n=4, l=0 → n+l = 4. For 3d: n=3, l=2 → n+l = 5. Lower (n+l) fills first.",
          thaiExplanation: "สำหรับ 4s มีค่า n+l = 4+0 = 4 ส่วน 3d มีค่า n+l = 3+2 = 5 ออร์บิทัลที่มีค่า (n+l) ต่ำกว่าจะเสถียรและถูกบรรจุก่อน"
        }
      },
      {
        stepNumber: 3,
        title: "Hund's Rule & Pauli Exclusion Principle",
        thaiTitle: "กฎของฮุนด์และหลักการกีดกันของเพาลี",
        summary: "No two electrons in an atom can have identical four quantum numbers, and degenerate orbitals maximize parallel spin.",
        thaiSummary: "อิเล็กตรอนสองตัวในอะตอมเดียวกันจะมีเลขควอนตัมทั้ง 4 ค่าซ้ำกันไม่ได้ และในออร์บิทัลที่มีพลังงานเท่ากันจะบรรจุแบบเดี่ยวด้วยสปินขนานก่อน",
        deepTheory: [
          "Pauli Exclusion Principle: An orbital can hold a maximum of 2 electrons, which must have antiparallel spins (+1/2 and -1/2).",
          "Hund's Rule of Maximum Multiplicity: Electrons occupy degenerate orbitals singly with parallel spins before pairing up. This minimizes electron-electron Coulombic repulsion and maximizes exchange stabilization energy."
        ],
        formulaLatex: "\\forall i \\neq j: \\quad (n_i, l_i, m_{l,i}, m_{s,i}) \\neq (n_j, l_j, m_{l,j}, m_{s,j})",
        formulaSymbols: [
          { symbol: "i, j", meaning: "Indices of two distinct electrons in the same atom" }
        ],
        application: {
          title: "Ferromagnetism in Iron & Neodymium Magnets",
          thaiTitle: "ความเป็นแม่เหล็กในแร่เหล็กและแม่เหล็กนีโอไดเมียม",
          description: "Iron has 4 unpaired 3d electrons (3d6), whose aligned parallel spins create magnetic domains responsible for permanent ferromagnetism in electric motor rotors.",
          thaiDescription: "ธาตุเหล็กมีอิเล็กตรอนเดี่ยว 4 ตัวในชั้น 3d ซึ่งมีสปินชี้ไปในทิศทางเดียวกันตามกฎของฮุนด์ ก่อให้เกิดโดเมนแม่เหล็กและคุณสมบัติแม่เหล็กถาวรในมอเตอร์ไฟฟ้า"
        },
        checkpoint: {
          question: "What is the maximum number of electrons that can occupy a single d subshell (l = 2)?",
          thaiQuestion: "ระดับพลังงานย่อย d (l = 2) สามารถบรรจุอิเล็กตรอนได้มากที่สุดกี่ตัว?",
          options: [
            "2 electrons",
            "6 electrons",
            "10 electrons",
            "14 electrons"
          ],
          correctIndex: 2,
          explanation: "For l=2, ml can take 5 values (-2, -1, 0, +1, +2), meaning 5 distinct orbitals. Each holds 2 electrons (spin up and down), giving 5 × 2 = 10 electrons.",
          thaiExplanation: "สำหรับชั้น d มี 5 ออร์บิทัล แต่ละออร์บิทัลบรรจุได้ 2 ตัว รวมเป็น 10 ตัว"
        }
      }
    ]
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
          "The repulsive strength hierarchy: Lone Pair - Lone Pair (LP-LP) > Lone Pair - Bonding Pair (LP-BP) > Bonding Pair - Bonding Pair (BP-BP)."
        ],
        formulaLatex: "\\text{Steric Number (SN)} = \\sigma\\text{-bonds} + \\text{Lone Pairs}",
        formulaSymbols: [
          { symbol: "SN", meaning: "Steric Number determining electronic geometry" }
        ],
        application: {
          title: "Pharmacophore Drug-Receptor Binding",
          thaiTitle: "การจับกันของโมเลกุลยากับตัวรับในเซลล์",
          description: "Pharmaceutical active sites are spatially engineered to fit enzyme pockets with sub-angstrom geometric precision (lock-and-key / induced fit).",
          thaiDescription: "การออกแบบโครงสร้างโมเลกุลยาจำเป็นต้องมีมุมพันธะและรูปทรง 3 มิติที่พอดีกับช่องโปรตีนเป้าหมายในระดับต่ำกว่าอังสตรอม"
        },
        checkpoint: {
          question: "Which electron pair interaction produces the strongest electrostatic repulsion?",
          thaiQuestion: "อันตรกิริยาระหว่างคู่อิเล็กตรอนแบบใดที่ให้แรงผลักไฟฟ้าสถิตแรงที่สุด?",
          options: [
            "Bonding Pair - Bonding Pair (BP-BP)",
            "Lone Pair - Bonding Pair (LP-BP)",
            "Lone Pair - Lone Pair (LP-LP)",
            "All interactions have identical repulsion"
          ],
          correctIndex: 2,
          explanation: "Lone pairs are held by only one atomic nucleus and spread out spatially over a larger volume, generating the strongest repulsion (LP-LP > LP-BP > BP-BP).",
          thaiExplanation: "อิเล็กตรอนคู่โดดเดี่ยวถูกดึงดูดโดยนิวเคลียสเพียงตัวเดียว จึงกระจายตัวกว้างและสร้างแรงผลักมากที่สุด (LP-LP > LP-BP > BP-BP)"
        }
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
          "SN = 6: Octahedral (90°), e.g., SF6."
        ],
        formulaLatex: "\\theta_{\\text{tetrahedral}} = \\arccos\\left(-\\frac{1}{3}\\right) \\approx 109.47^\\circ",
        formulaSymbols: [
          { symbol: "\\theta", meaning: "Bond angle in an ideal tetrahedral molecule" }
        ],
        application: {
          title: "Water's Anomalous Density & Ice Crystal Lattice",
          thaiTitle: "โครงสร้างผลึกน้ำแข็งและความหนาแน่นของน้ำ",
          description: "Water's bent 104.5° geometry and 2 lone pairs enable a hexagonal open hydrogen-bonded ice network, making ice less dense than liquid water and enabling aquatic life to survive frozen winters.",
          thaiDescription: "มุมงอ 104.5° และคู่อิเล็กตรอนโดดเดี่ยว 2 คู่ของน้ำ ทำให้เกิดโครงข่ายพันธะไฮโดรเจนรูปหกเหลี่ยมที่โปร่ง น้ำแข็งจึงลอยน้ำและปกป้องสิ่งมีชีวิตใต้น้ำในฤดูหนาว"
        },
        checkpoint: {
          question: "What is the molecular geometry of ammonia (NH3), which has 3 bonding pairs and 1 lone pair?",
          thaiQuestion: "โมเลกุลของแอมโมเนีย (NH3) ซึ่งมี 3 พันธะและ 1 คู่อิเล็กตรอนโดดเดี่ยว มีรูปร่างโมเลกุลเป็นแบบใด?",
          options: [
            "Trigonal planar",
            "Trigonal pyramidal",
            "Tetrahedral",
            "T-shaped"
          ],
          correctIndex: 1,
          explanation: "With SN = 4 (3 bonds + 1 lone pair), the electron geometry is tetrahedral, but the molecular geometry considering atoms only is trigonal pyramidal (bond angle ~107°).",
          thaiExplanation: "แอมโมเนียมีอิเล็กตรอน 4 คู่ (3 พันธะ + 1 คู่โดดเดี่ยว) รูปร่างโมเลกุลจึงเป็น พีระมิดฐานสามเหลี่ยม (Trigonal pyramidal)"
        }
      },
      {
        stepNumber: 3,
        title: "Orbital Hybridization & Bond Polarity",
        thaiTitle: "การผสมออร์บิทัล (Hybridization) และขั้วของพันธะ",
        summary: "Atomic orbitals mix to form sp, sp², and sp³ hybrid orbitals that determine bond angles and molecular dipole moments.",
        thaiSummary: "การผสมออร์บิทัลของอะตอมเกิดเป็นไฮบริดออร์บิทัล sp, sp², sp³ ซึ่งกำหนดมุมพันธะและสภาพมีขั้วของโมเลกุล",
        deepTheory: [
          "Linear geometry correlates with sp hybridization (50% s character). Trigonal planar correlates with sp² (33% s character). Tetrahedral correlates with sp³ (25% s character).",
          "Bond dipole moments are vector quantities: \\vec{\\mu} = q \\cdot \\vec{d}. A molecule with polar bonds can be non-polar overall if its geometric symmetry causes vector cancellation (e.g., CO2 and CCl4 have \\Sigma \\vec{\\mu} = \\vec{0})."
        ],
        formulaLatex: "\\vec{\\mu}_{\\text{net}} = \\sum_{i=1}^k \\vec{\\mu}_i = \\sum_{i=1}^k q_i \\vec{d}_i",
        formulaSymbols: [
          { symbol: "\\vec{\\mu}_{\\text{net}}", meaning: "Net molecular dipole moment", unit: "Debye (D)" },
          { symbol: "q", meaning: "Partial charge separation magnitude", unit: "C" },
          { symbol: "\\vec{d}", meaning: "Bond distance displacement vector", unit: "m" }
        ],
        application: {
          title: "Surfactants, Micelles & Soap Cleansing Action",
          thaiTitle: "กลไกการชำระล้างของสบู่และไมเซลล์",
          description: "Soaps combine non-polar hydrocarbon tails (sp3 hybridized) and polar carboxylate heads. In water, they spontaneously assemble into spherical micelles that entrap hydrophobic oils.",
          thaiDescription: "โมเลกุลสบู่มีส่วนหางไฮโดรคาร์บอนที่ไม่มีขั้วและส่วนหัวที่มีขั้ว เมื่ออยู่ในน้ำจะรวมตัวกันเป็นไมเซลล์ (Micelle) ทรงกลมเพื่อดักจับคราบไขมัน"
        },
        checkpoint: {
          question: "Why is carbon dioxide (CO2) a non-polar molecule even though both C=O bonds are highly polar?",
          thaiQuestion: "เหตุใดก๊าซคาร์บอนไดออกไซด์ (CO2) จึงเป็นโมเลกุลไม่มีขั้ว ทั้งที่พันธะ C=O มีขั้วสูง?",
          options: [
            "The electronegativity difference between C and O is zero",
            "Its linear 180° geometry causes the two opposite dipole vectors to cancel out",
            "CO2 has two lone pairs on the carbon atom",
            "The double bonds prevent charge separation"
          ],
          correctIndex: 1,
          explanation: "CO2 has a linear geometry (180°). The two equal C=O bond dipole vectors point in exactly opposite directions, summing to a net dipole moment of zero.",
          thaiExplanation: "CO2 มีรูปร่างเป็นเส้นตรง (180°) เวกเตอร์ขั้วของพันธะ C=O ทั้งสองข้างชี้ไปในทิศทางตรงกันข้ามและหักล้างกันหมดพอดี"
        }
      }
    ]
  },

  {
    id: "chem-equilibrium-stoichiometry",
    discipline: "chemistry",
    title: "Chemical Equilibrium & Reaction Stoichiometry",
    thaiTitle: "สมดุลเคมี หลักของเลอชาเตอลิเย และปริมาณสารสัมพันธ์",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Calculate equilibrium constants (Keq), analyze reaction quotients (Q), apply Le Chatelier perturbations, and balance reaction mass.",
    thaiOverview: "คำนวณค่าคงที่สมดุล (Keq) เปรียบเทียบผลหารปฏิกิริยา (Q) ประยุกต์หลักของเลอชาเตอลิเย และคำนวณปริมาณสารสัมพันธ์",
    tags: ["Equilibrium", "Le Chatelier", "Stoichiometry", "Keq", "Limiting Reactant"],
    steps: [
      {
        stepNumber: 1,
        title: "Dynamic Equilibrium & The Law of Mass Action",
        thaiTitle: "สมดุลพลวัตและกฎการกระทำของมวล",
        summary: "Chemical equilibrium is reached when forward and reverse reaction rates are equal, establishing a constant concentration ratio Keq.",
        thaiSummary: "สมดุลเคมีเกิดขึ้นเมื่ออัตราการเกิดปฏิกิริยาไปข้างหน้าเท่ากับอัตราการเกิดปฏิกิริยาย้อนกลับ โดยอัตราส่วนความเข้มข้นจะคงที่ตามค่า Keq",
        deepTheory: [
          "Chemical equilibrium is dynamic: forward and reverse molecular transformations continue uninterrupted at identical microscopic rates: r_{fwd} = r_{rev}.",
          "For a general reaction aA + bB ⇌ cC + dD, the equilibrium constant is K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}. Pure solids and liquids have constant thermodynamic activity equal to 1 and are excluded from the expression."
        ],
        formulaLatex: "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}, \\quad Q_c = \\frac{[C]_t^c [D]_t^d}{[A]_t^a [B]_t^b}",
        formulaSymbols: [
          { symbol: "K_c", meaning: "Equilibrium constant at specified temperature" },
          { symbol: "Q_c", meaning: "Reaction quotient at arbitrary non-equilibrium time t" }
        ],
        application: {
          title: "Haber-Bosch Ammonia Synthesis",
          thaiTitle: "กระบวนการฮาเบอร์-บอชในการผลิตปุ๋ยแอมโมเนีย",
          description: "Global agricultural fertilizer relies on the Haber process (N2 + 3H2 ⇌ 2NH3). Chemical engineers compress gases to 200 atm and 450°C over iron catalysts to shift equilibrium yields.",
          thaiDescription: "ปุ๋ยไนโตรเจนที่เลี้ยงประชากรโลกผลิตจากกระบวนการฮาเบอร์-บอช โดยวิศวกรเคมีใช้ความดัน 200 บรรยากาศเพื่อเลื่อนสมดุลให้ได้ผลผลิตแอมโมเนียสูงสุด"
        },
        checkpoint: {
          question: "If Qc < Kc for a reversible reaction system, in which direction will the reaction spontaneously proceed?",
          thaiQuestion: "หากค่าผลหารปฏิกิริยา Qc มีค่าน้อยกว่าค่าคงที่สมดุล Kc ระบบจะดำเนินไปในทิศทางใดเพื่อเข้าสู่สมดุล?",
          options: [
            "Forward (towards products)",
            "Reverse (towards reactants)",
            "The system is already at equilibrium",
            "The reaction permanently stops"
          ],
          correctIndex: 0,
          explanation: "When Qc < Kc, there are fewer products than at equilibrium, so the reaction proceeds forward to convert reactants into products until Qc = Kc.",
          thaiExplanation: "เมื่อ Qc < Kc แสดงว่าผลิตภัณฑ์ยังมีน้อยกว่าภาวะสมดุล ปฏิกิริยาจึงต้องดำเนินไปข้างหน้าเพื่อสร้างผลิตภัณฑ์เพิ่มขึ้นจนกระทั่ง Qc = Kc"
        }
      },
      {
        stepNumber: 2,
        title: "Le Chatelier's Principle: System Perturbations",
        thaiTitle: "หลักของเลอชาเตอลิเย: การรบกวนภาวะสมดุล",
        summary: "When an external stress (concentration, pressure, volume, temperature) is applied to an equilibrium system, it shifts to counteract the perturbation.",
        thaiSummary: "เมื่อระบบที่อยู่ในภาวะสมดุลถูกรบกวนด้วยการเปลี่ยนแปลงความเข้มข้น ความดัน ปริมาตร หรืออุณหภูมิ ระบบจะปรับตัวในทิศทางที่ลดการรบกวนนั้น",
        deepTheory: [
          "Concentration: Adding a reactant shifts equilibrium forward; removing product shifts equilibrium forward.",
          "Pressure & Volume: Increasing total pressure by reducing volume shifts equilibrium toward the side with fewer gas moles (\\Delta n_{gas}).",
          "Temperature: For exothermic reactions (\\Delta H < 0), heat acts as a product; increasing temperature shifts equilibrium in reverse, lowering Keq (Van 't Hoff equation: \\frac{d \\ln K}{dT} = \\frac{\\Delta H^\\circ}{R T^2})."
        ],
        formulaLatex: "\\ln\\left(\\frac{K_2}{K_1}\\right) = -\\frac{\\Delta H^\\circ}{R} \\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)",
        formulaSymbols: [
          { symbol: "\\Delta H^\\circ", meaning: "Standard reaction enthalpy change", unit: "kJ/mol" },
          { symbol: "R", meaning: "Universal gas constant (8.314 J/mol·K)" }
        ],
        application: {
          title: "Blood Oxygen Binding & High-Altitude Acclimatization",
          thaiTitle: "การจับออกซิเจนของฮีโมโกลบินในที่สูง",
          description: "At high altitudes with lower atmospheric pO2, equilibrium Hb + 4O2 ⇌ Hb(O2)4 shifts left, triggering the kidneys to secrete erythropoietin (EPO) to synthesize more red blood cells.",
          thaiDescription: "บนยอดเขาสูงที่มีออกซิเจนเบาบาง สมดุลการจับออกซิเจนของฮีโมโกลบินจะเลื่อนถอยหลัง ร่างกายจึงปรับตัวด้วยการหลั่งฮอร์โมน EPO สร้างเม็ดเลือดแดงเพิ่มขึ้น"
        },
        checkpoint: {
          question: "For an exothermic reaction (ΔH < 0), what happens to the value of Keq if the temperature is increased?",
          thaiQuestion: "สำหรับปฏิกิริยาคายความร้อน (ΔH < 0) หากเพิ่มอุณหภูมิ ค่าคงที่สมดุล Keq จะเปลี่ยนแปลงอย่างไร?",
          options: [
            "Keq increases",
            "Keq decreases",
            "Keq remains unchanged",
            "Keq becomes zero"
          ],
          correctIndex: 1,
          explanation: "In an exothermic reaction, heat is a product. Adding heat shifts the equilibrium in reverse, decreasing product concentrations and lowering Keq.",
          thaiExplanation: "ในปฏิกิริยาคายความร้อน ความร้อนเปรียบเสมือนผลิตภัณฑ์ การเพิ่มอุณหภูมิจะผลักให้ปฏิกิริยาย้อนกลับ ทำให้ค่า Keq ลดลง"
        }
      },
      {
        stepNumber: 3,
        title: "Stoichiometry, Limiting Reactants & Percent Yield",
        thaiTitle: "ปริมาณสารสัมพันธ์ สารกำหนดปริมาณ และร้อยละผลได้",
        summary: "Chemical equations conserve mass; the limiting reactant strictly bounds the maximum theoretical yield of products.",
        thaiSummary: "สมการเคมีต้องเป็นไปตามกฎทรงมวล สารกำหนดปริมาณจะเป็นตัวจำกัดปริมาณผลิตภัณฑ์สูงสุดทางทฤษฎีที่จะเกิดขึ้นได้",
        deepTheory: [
          "Molar ratios from balanced chemical equations dictate exact stoichiometric consumption. The limiting reactant is the reagent with the minimum ratio of available moles to stoichiometric coefficient: \\min(n_i / \\nu_i).",
          "Theoretical yield is the calculated maximum product mass based on 100% limiting reactant conversion. Percent yield measures practical efficiency: \\text{Percent Yield} = (\\text{Actual Mass} / \\text{Theoretical Mass}) \\times 100\\%."
        ],
        formulaLatex: "\\text{Yield}\\% = \\left( \\frac{m_{\\text{actual}}}{m_{\\text{theoretical}}} \\right) \\times 100\\%",
        formulaSymbols: [
          { symbol: "m_{\\text{actual}}", meaning: "Experimentally measured product mass obtained", unit: "g" },
          { symbol: "m_{\\text{theoretical}}", meaning: "Calculated stoichiometric maximum product mass", unit: "g" }
        ],
        application: {
          title: "Pharmaceutical Drug Synthesis Optimization",
          thaiTitle: "การเพิ่มผลผลิตในการสังเคราะห์ยารักษาโรค",
          description: "Pharmaceutical chemists optimizing multi-step synthesis of active ingredients (like Paxlovid) minimize byproducts and maximize percent yield to reduce toxic waste and drug manufacturing costs.",
          thaiDescription: "นักเคมียาปรับแต่งสภาวะปฏิกิริยาเพื่อให้ได้ร้อยละผลได้สูงกว่า 95% ในการผลิตยา เพื่อลดของเสียที่เป็นพิษและลดต้นทุนยาสำหรับผู้ป่วย"
        },
        checkpoint: {
          question: "If 2 moles of H2 react with 2 moles of O2 to form water (2 H2 + O2 → 2 H2O), which is the limiting reactant?",
          thaiQuestion: "หากนำ H2 จำนวน 2 โมล มาทำปฏิกิริยากับ O2 จำนวน 2 โมล (2 H2 + O2 → 2 H2O) สารใดเป็นสารกำหนดปริมาณ?",
          options: [
            "H2 (Hydrogen gas)",
            "O2 (Oxygen gas)",
            "Both are consumed completely simultaneously",
            "H2O (Water)"
          ],
          correctIndex: 0,
          explanation: "Reaction requires 2 moles of H2 for every 1 mole of O2. 2 moles of H2 consume only 1 mole of O2, leaving 1 mole of O2 in excess. Thus H2 is the limiting reactant.",
          thaiExplanation: "ปฏิกิริยาต้องใช้ H2 2 โมลต่อ O2 1 โมล ดังนั้น H2 2 โมลจะใช้ O2 เพียง 1 โมล ทำให้ O2 เหลือ 1 โมล H2 จึงเป็นสารกำหนดปริมาณที่หมดก่อน"
        }
      }
    ]
  },

  {
    id: "chem-organic-biomolecules",
    discipline: "chemistry",
    title: "Organic Functional Groups & Biomolecules",
    thaiTitle: "หมู่ฟังก์ชันสารอินทรีย์และชีวโมเลกุลขนาดใหญ่",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Identify organic functional groups (alcohols, carbonyls, esters, amines) and analyze macromolecules: carbohydrates, lipids, proteins, and nucleic acids.",
    thaiOverview: "ทำความเข้าใจหมู่ฟังก์ชันสารอินทรีย์ และวิเคราะห์โครงสร้างชีวโมเลกุล 4 กลุ่มหลัก: คาร์โบไฮเดรต ลิพิด โปรตีน และกรดนิวคลีอิก",
    tags: ["Organic Chemistry", "Biomolecules", "Functional Groups", "Polymers"],
    steps: [
      {
        stepNumber: 1,
        title: "Fundamental Organic Functional Groups",
        thaiTitle: "หมู่ฟังก์ชันพื้นฐานของสารประกอบอินทรีย์",
        summary: "Functional groups impart specific chemical reactivity, polarity, and boiling points to hydrocarbon carbon skeletons.",
        thaiSummary: "หมู่ฟังก์ชันเป็นกลุ่มอะตอมจำเพาะที่กำหนดคุณสมบัติทางเคมี จุดเดือด และการละลายน้ำของโมเลกุลสารอินทรีย์",
        deepTheory: [
          "Hydroxyl (-OH): Found in alcohols, forms hydrogen bonds, elevates boiling point (e.g., ethanol).",
          "Carbonyl (C=O): Polar group subdivided into Aldehydes (-CHO) at chain terminals and Ketones (-CO-) internally.",
          "Carboxyl (-COOH): Weak organic acids capable of donating protons (e.g., acetic acid in vinegar).",
          "Amino (-NH2): Basic nitrogen groups capable of accepting protons to form ammonium ions (-NH3+)."
        ],
        formulaLatex: "R-\\text{COOH} + R'-\\text{OH} \\xrightleftharpoons{\\text{H}^+} R-\\text{COO}-R' + \\text{H}_2\\text{O}",
        formulaSymbols: [
          { symbol: "R, R'", meaning: "Alkyl or aryl hydrocarbon carbon backbones" }
        ],
        application: {
          title: "Aspirin Synthesis via Esterification",
          thaiTitle: "การสังเคราะห์ยาแอสไพรินด้วยปฏิกิริยาเอสเทอริฟิเคชัน",
          description: "Aspirin (acetylsalicylic acid) is industrially synthesized by reacting salicylic acid's phenolic -OH group with acetic anhydride, forming an ester bond that relieves pain without irritating the stomach.",
          thaiDescription: "ยาแก้ปวดแอสไพรินสังเคราะห์ได้จากปฏิกิริยาเอสเทอริฟิเคชันระหว่างกรดซาลิไซลิกกับแอซีติกแอนไฮไดรด์ ทำให้ได้ยาที่มีประสิทธิภาพบรรเทาอาการอักเสบ"
        },
        checkpoint: {
          question: "Which functional group gives organic carboxylic acids (such as acetic acid) their acidic properties?",
          thaiQuestion: "หมู่ฟังก์ชันใดที่ทำให้กรดคาร์บอกซิลิก (เช่น กรดแอซีติก) มีสมบัติเป็นกรด?",
          options: [
            "-OH (Hydroxyl group)",
            "-COOH (Carboxyl group)",
            "-NH2 (Amino group)",
            "-CHO (Aldehyde group)"
          ],
          correctIndex: 1,
          explanation: "The carboxyl group (-COOH) consists of a carbonyl and hydroxyl group on the same carbon, allowing resonance-stabilized dissociation of the proton (H+).",
          thaiExplanation: "หมู่คาร์บอกซิล (-COOH) สามารถแตกตัวให้โปรตอน (H+) ได้อย่างเสถียรด้วยโครงสร้างเรโซแนนซ์ จึงแสดงสมบัติเป็นกรด"
        }
      },
      {
        stepNumber: 2,
        title: "Carbohydrates & Glycosidic Linkages",
        thaiTitle: "คาร์โบไฮเดรตและพันธะไกลโคซิดิก",
        summary: "Monosaccharides polymerize into storage and structural polysaccharides via condensation forming ether glycosidic bonds.",
        thaiSummary: "น้ำตาลโมเลกุลเดี่ยวเชื่อมต่อกันเป็นพอลิแซ็กคาไรด์สะสมพลังงานและโครงสร้าง ผ่านพันธะไกลโคซิดิกแบบควบแน่น",
        deepTheory: [
          "Monosaccharides (hexoses like Glucose C6H12O6) exist predominantly as dynamic 6-membered pyranose hemiacetal rings in aqueous solution.",
          "Alpha(1→4) glycosidic bonds form helical digestible polymers like starch and glycogen, whereas Beta(1→4) bonds form rigid linear crystalline fibers like cellulose, which humans lack the cellulase enzyme to hydrolyze."
        ],
        formulaLatex: "n \\, \\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{condensation}} (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + (n-1)\\,\\text{H}_2\\text{O}",
        formulaSymbols: [
          { symbol: "n", meaning: "Degree of polymerization (number of glucose monomers)" }
        ],
        application: {
          title: "Biodegradable Polylactic Acid (PLA) Plastics",
          thaiTitle: "พลาสติกชีวภาพย่อยสลายได้ PLA จากแป้งข้าวโพด",
          description: "Corn starch is fermented into lactic acid and polymerized into PLA, creating biodegradable 3D printer filaments and food packaging that degrade naturally in industrial compost.",
          thaiDescription: "แป้งข้าวโพดถูกหมักเป็นกรดแลกติกแล้วพอลิเมอไรซ์เป็นพลาสติก PLA ที่ย่อยสลายได้ตามธรรมชาติ ใช้ทำเส้นพลาสติกสำหรับเครื่องพิมพ์ 3D และบรรจุภัณฑ์รักษ์โลก"
        },
        checkpoint: {
          question: "What structural difference prevents humans from digesting cellulose while easily digesting starch?",
          thaiQuestion: "ความแตกต่างทางโครงสร้างใดที่ทำให้มนุษย์ไม่สามารถย่อยสลายเซลลูโลสได้ ทั้งที่ย่อยแป้งได้ตามปกติ?",
          options: [
            "Cellulose is made of fructose instead of glucose",
            "Cellulose has Beta(1→4) glycosidic bonds, while starch has Alpha(1→4) bonds",
            "Cellulose lacks carbon atoms",
            "Cellulose is completely water soluble"
          ],
          correctIndex: 1,
          explanation: "Humans possess alpha-amylase which hydrolyzes Alpha(1→4) linkages in starch, but lack cellulase enzymes capable of cleaving Beta(1→4) glycosidic bonds in cellulose.",
          thaiExplanation: "มนุษย์มีเอนไซม์อะไมเลสที่ย่อยพันธะ แอลฟา(1→4) ในแป้งได้ แต่ไม่มีเอนไซม์เซลลูเลสสำหรับย่อยพันธะ บีตา(1→4) ของเซลลูโลส"
        }
      },
      {
        stepNumber: 3,
        title: "Proteins, Peptide Bonds & Quaternary Architecture",
        thaiTitle: "โปรตีน พันธะเพปไทด์ และโครงสร้างสี่ระดับ",
        summary: "Amino acids condense via amide peptide bonds into linear polypeptides that fold into sophisticated 3D biological nanomachines.",
        thaiSummary: "กรดอะมิโนเชื่อมต่อกันด้วยพันธะเพปไทด์เป็นสายพอลิเพปไทด์ ซึ่งจะพับทบเป็นโครงสร้าง 3 มิติเพื่อทำหน้าที่เป็นเอนไซม์และโครงสร้างเซลล์",
        deepTheory: [
          "Primary structure: Linear sequence of 20 amino acids joined by rigid planar amide bonds (-CONH-).",
          "Secondary structure: Local hydrogen-bonded alpha-helices and beta-pleated sheets.",
          "Tertiary structure: Overall 3D conformation stabilized by hydrophobic interactions, salt bridges, and covalent disulfide bonds (-S-S- between cysteines).",
          "Quaternary structure: Assembly of multiple polypeptide subunits (e.g., hemoglobin's alpha2-beta2 tetramer)."
        ],
        formulaLatex: "\\text{R}_1\\text{-COOH} + \\text{H}_2\\text{N-R}_2 \\to \\text{R}_1\\text{-CO-NH-R}_2 + \\text{H}_2\\text{O}",
        formulaSymbols: [
          { symbol: "\\text{-CO-NH-}", meaning: "Planar amide peptide bond linking amino acids" }
        ],
        application: {
          title: "CRISPR-Cas9 Gene Editing Endonuclease",
          thaiTitle: "เอนไซม์ตัดต่อยีน CRISPR-Cas9",
          description: "Cas9 is a multi-domain bacterial protein whose precise 3D tertiary structure binds a guide RNA scaffold and cleaves double-stranded target DNA at designated genomic sites for molecular therapy.",
          thaiDescription: "เอนไซม์ Cas9 เป็นโปรตีนที่มีโครงสร้าง 3 มิติซับซ้อน สามารถจับกับไกด์อาร์เอ็นเอแล้วตัดสายดีเอ็นเอเป้าหมายได้อย่างแม่นยำเพื่อการรักษาโรคทางพันธุกรรม"
        },
        checkpoint: {
          question: "What covalent bond stabilizes the tertiary structure of proteins by linking two cysteine residues?",
          thaiQuestion: "พันธะโคเวเลนต์ชนิดใดที่ช่วยยึดโครงสร้างระดับตติยภูมิของโปรตีน โดยเชื่อมระหว่างกรดอะมิโนซิสเทอีน 2 ตัว?",
          options: [
            "Hydrogen bond",
            "Disulfide bond (-S-S-)",
            "Ionic salt bridge",
            "Van der Waals contact"
          ],
          correctIndex: 1,
          explanation: "Disulfide bonds (-S-S-) form covalently between the thiol (-SH) side chains of two cysteine residues, providing high thermal and structural stability.",
          thaiExplanation: "พันธะไดซัลไฟด์ (-S-S-) เกิดขึ้นระหว่างหมู่ไทออล (-SH) ของซิสเทอีน 2 ตัว เป็นพันธะโคเวเลนต์ที่แข็งแรงที่สุดในการยึดโครงสร้างโปรตีน"
        }
      }
    ]
  }
];
