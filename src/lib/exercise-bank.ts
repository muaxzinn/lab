/**
 * Standardized High-School & Foundation Curriculum Exercise Bank
 * Spanning Mathematics, Physics, Chemistry, Biology, and Thai Language.
 * Supports Single Choice, Multiple Select, Fill-in-the-Blank, and Numeric evaluations.
 */

export type ExerciseSubject = 'math' | 'physics' | 'chemistry' | 'biology' | 'thai';
export type QuestionType = 'single-choice' | 'multiple-select' | 'fill-in-blank' | 'numeric';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface ExerciseOption {
  id: string;
  text: string;
  latex?: string;
}

export interface ExerciseQuestion {
  id: string;
  subject: ExerciseSubject;
  type: QuestionType;
  difficulty: DifficultyLevel;
  title: string;
  prompt: string;
  latexPrompt?: string;
  options?: ExerciseOption[];
  correctAnswer: string | string[] | number;
  tolerance?: number;
  acceptableAnswers?: string[];
  hints: string[];
  explanation: {
    overview: string;
    steps: string[];
    latexFormula?: string;
  };
}

export const SUBJECT_METADATA: Record<
  ExerciseSubject,
  { name: string; thaiName: string; color: string; badge: string }
> = {
  math: {
    name: 'Mathematics',
    thaiName: 'คณิตศาสตร์',
    color: '#38bdf8',
    badge: 'bg-sky-950/80 text-sky-300 border-sky-700/80',
  },
  physics: {
    name: 'Physics',
    thaiName: 'ฟิสิกส์',
    color: '#34d399',
    badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80',
  },
  chemistry: {
    name: 'Chemistry',
    thaiName: 'เคมี',
    color: '#fb923c',
    badge: 'bg-orange-950/80 text-orange-300 border-orange-700/80',
  },
  biology: {
    name: 'Biology',
    thaiName: 'ชีววิทยา',
    color: '#a78bfa',
    badge: 'bg-purple-950/80 text-purple-300 border-purple-700/80',
  },
  thai: {
    name: 'Thai Language',
    thaiName: 'ภาษาไทย',
    color: '#f43f5e',
    badge: 'bg-rose-950/80 text-rose-300 border-rose-700/80',
  },
};

export const EXERCISE_BANK: ExerciseQuestion[] = [
  // 1. Mathematics Questions
  {
    id: 'math-01',
    subject: 'math',
    type: 'single-choice',
    difficulty: 'medium',
    title: 'Differential Calculus: Derivative of Polynomial Function',
    prompt: 'จงหาอนุพันธ์อันดับหนึ่งของฟังก์ชัน f(x) เมื่อกำหนดให้:',
    latexPrompt: 'f(x) = 4x^3 - 5x^2 + 7x - 9',
    options: [
      { id: 'opt-a', text: '12x^2 - 10x + 7', latex: "f'(x) = 12x^2 - 10x + 7" },
      { id: 'opt-b', text: '12x^3 - 10x^2 + 7', latex: "f'(x) = 12x^3 - 10x^2 + 7" },
      { id: 'opt-c', text: '4x^2 - 5x + 7', latex: "f'(x) = 4x^2 - 5x + 7" },
      { id: 'opt-d', text: '12x^2 - 10x', latex: "f'(x) = 12x^2 - 10x" },
    ],
    correctAnswer: 'opt-a',
    hints: [
      'ใช้กฎผลคูณกำลัง (Power Rule): d/dx [x^n] = n * x^(n-1)',
      'อนุพันธ์ของค่าคงที่ d/dx [c] = 0',
    ],
    explanation: {
      overview: 'การหาอนุพันธ์ของฟังก์ชันพหุนามสามารถกระจายหาอนุพันธ์ทีละพจน์ได้ตามกฎ Power Rule',
      steps: [
        'd/dx [4x^3] = 4 * 3x^2 = 12x^2',
        'd/dx [-5x^2] = -5 * 2x = -10x',
        'd/dx [7x] = 7 * 1 = 7',
        'd/dx [-9] = 0',
        'รวมผลลัพธ์: f\'(x) = 12x^2 - 10x + 7',
      ],
      latexFormula: "\\frac{d}{dx}[ax^n] = a \\cdot n x^{n-1}",
    },
  },
  {
    id: 'math-02',
    subject: 'math',
    type: 'numeric',
    difficulty: 'easy',
    title: 'Definite Integration: Area Under Curve',
    prompt: 'จงคำนวณหาค่าของอินทิกรัลจำกัดเขตต่อไปนี้ (ตอบเป็นทศนิยมหรือจำนวนเต็ม):',
    latexPrompt: '\\int_{0}^{3} (2x + 1) \\, dx',
    correctAnswer: 12,
    tolerance: 0.05,
    hints: [
      'หาปฏิยานุพันธ์ (Anti-derivative) ของ 2x + 1 ก่อน',
      'อินทิกรัลของ 2x คือ x^2 และของ 1 คือ x',
      'แทนค่าขอบบน x = 3 แล้วลบด้วยการแทนค่าขอบล่าง x = 0',
    ],
    explanation: {
      overview: 'ใช้ทฤษฎีบทหลักมูลของแคลคูลัส (Fundamental Theorem of Calculus)',
      steps: [
        'ปฏิยานุพันธ์ F(x) = x^2 + x',
        'แทนค่าขอบบน: F(3) = (3)^2 + 3 = 9 + 3 = 12',
        'แทนค่าขอบล่าง: F(0) = 0 + 0 = 0',
        'F(3) - F(0) = 12 - 0 = 12',
      ],
      latexFormula: "\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)",
    },
  },
  {
    id: 'math-03',
    subject: 'math',
    type: 'multiple-select',
    difficulty: 'medium',
    title: 'Linear Algebra: Invertible Matrix Properties',
    prompt: 'กำหนดให้เมทริกซ์ A มีมิติ n x n ข้อใดต่อไปนี้เป็นเงื่อนไขที่สมมูลกับการที่เมทริกซ์ A สามารถหาเมทริกซ์ผกผันได้ (Invertible / Non-singular) (เลือกทุกข้อที่ถูกต้อง):',
    options: [
      { id: 'opt-det', text: 'det(A) ≠ 0', latex: '\\det(A) \\neq 0' },
      { id: 'opt-rank', text: 'rank(A) = n', latex: '\\mathrm{rank}(A) = n' },
      { id: 'opt-null', text: 'Nullity of A is 0', latex: '\\dim(\\ker(A)) = 0' },
      { id: 'opt-zero', text: 'A มีแถวใดแถวหนึ่งเป็นศูนย์ทั้งหมด', latex: '\\text{A has a zero row}' },
    ],
    correctAnswer: ['opt-det', 'opt-rank', 'opt-null'],
    hints: [
      'ตามทฤษฎีบท Invertible Matrix Theorem ดีเทอร์มิแนนต์ต้องไม่เท่ากับศูนย์',
      'หากมีแถวที่เป็นศูนย์ทั้งหมด ดีเทอร์มิแนนต์จะเป็นศูนย์ทันที',
    ],
    explanation: {
      overview: 'Invertible Matrix Theorem ระบุเงื่อนไขสมมูลของการมีอินเวิร์สของเมทริกซ์จัตุรัส',
      steps: [
        'det(A) ≠ 0 คือเงื่อนไขจำเป็นและเพียงพอ',
        'เมทริกซ์ที่มีอินเวิร์สต้องมี Full Rank (rank = n)',
        'ตาม Rank-Nullity Theorem: nullity = n - rank = 0',
        'ส่วนแถวที่เป็นศูนย์จะทำให้ det(A) = 0 ซึ่งหาอินเวิร์สไม่ได้',
      ],
      latexFormula: "A \\text{ is invertible} \\iff \\det(A) \\neq 0 \\iff \\mathrm{rank}(A) = n",
    },
  },

  // 2. Physics Questions
  {
    id: 'phys-01',
    subject: 'physics',
    type: 'numeric',
    difficulty: 'easy',
    title: 'Classical Mechanics: Kinetic Energy Calculation',
    prompt: 'วัตถุมวล 4 กิโลกรัม กำลังเคลื่อนที่ด้วยความเร็ว 15 เมตรต่อวินาที จงหาพลังงานจลน์ (Kinetic Energy) ของวัตถุนี้ในหน่วยจูล (J):',
    latexPrompt: 'E_k = \\frac{1}{2} m v^2',
    correctAnswer: 450,
    tolerance: 0.1,
    hints: [
      'แทนค่ามวล m = 4 kg และความเร็ว v = 15 m/s ลงในสูตร',
      'อย่าลืมยกกำลังสองความเร็วก่อนนำไปคูณ: 15^2 = 225',
    ],
    explanation: {
      overview: 'พลังงานจลน์ขึ้นอยู่กับมวลและกำลังสองของอัตราเร็วของวัตถุ',
      steps: [
        'E_k = 0.5 * m * v^2',
        'E_k = 0.5 * (4 kg) * (15 m/s)^2',
        'E_k = 2 * 225 = 450 J',
      ],
      latexFormula: "E_k = \\frac{1}{2}(4)(15)^2 = 450\\text{ J}",
    },
  },
  {
    id: 'phys-02',
    subject: 'physics',
    type: 'single-choice',
    difficulty: 'medium',
    title: 'Electromagnetism: Snell’s Law of Refraction',
    prompt: 'แสงเดินทางจากตัวกลางที่ 1 ที่มีดัชนีหักเห n1 เข้าสู่ตัวกลางที่ 2 ที่มีดัชนีหักเห n2 โดย n2 > n1 ข้อใดกล่าวถูกต้องเกี่ยวกับการเคลื่อนที่ของลำแสง:',
    options: [
      { id: 'opt-towards', text: 'ความเร็วแสงลดลง และมุมหักเหเบนเข้าหาเส้นแนวฉาก (θ2 < θ1)' },
      { id: 'opt-away', text: 'ความเร็วแสงเพิ่มขึ้น และมุมหักเหเบนออกจากเส้นแนวฉาก (θ2 > θ1)' },
      { id: 'opt-same-v', text: 'ความเร็วแสงคงที่ แต่มุมหักเหเปลี่ยนไป' },
      { id: 'opt-no-bend', text: 'ความยาวคลื่นแสงเพิ่มขึ้น และไม่เกิดการหักเห' },
    ],
    correctAnswer: 'opt-towards',
    hints: [
      'ดัชนีหักเห n = c / v ตัวกลางที่มี n สูงกว่าจะมีความเร็วแสงช้ากว่า',
      'ตามกฎของสเนลล์ n1 * sin(θ1) = n2 * sin(θ2) ถ้า n2 > n1 แล้ว sin(θ2) ต้องน้อยกว่า sin(θ1)',
    ],
    explanation: {
      overview: 'กฎของสเนลล์ (Snell\'s Law) อธิบายการเปลี่ยนทิศทางและความเร็วของคลื่นแสงเมื่อผ่านรอยต่อระหว่างสองตัวกลาง',
      steps: [
        'จาก n = c/v เมื่อ n2 > n1 แสดงว่า v2 < v1 (แสงเคลื่อนที่ช้าลง)',
        'จาก n1 sin(θ1) = n2 sin(θ2) เมื่อ n2 > n1 จะได้ sin(θ2) < sin(θ1)',
        'ดังนั้น มุมหักเห θ2 < θ1 ทำให้ลำแสงเบนเข้าหาเส้นแนวฉาก (Normal Line)',
      ],
      latexFormula: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
    },
  },
  {
    id: 'phys-03',
    subject: 'physics',
    type: 'fill-in-blank',
    difficulty: 'medium',
    title: 'Thermodynamics: Entropy and the Second Law',
    prompt: 'ตามกฎข้อที่สองของอุณหพลศาสตร์ (Second Law of Thermodynamics) ในระบบโดดเดี่ยว (Isolated System) ค่าเอนโทรปี (Entropy, S) โดยรวมจะมีแนวโน้มเป็นอย่างไรเสมอเมื่อเวลาผ่านไป (ตอบ: เพิ่มขึ้น หรือ ลดลง หรือ คงที่):',
    correctAnswer: 'เพิ่มขึ้น',
    acceptableAnswers: ['เพิ่มขึ้น', 'เพิ่ม', 'increase', 'increases'],
    hints: [
      'เอนโทรปีคือมาตรวัดความไม่เป็นระเบียบของระบบ',
      'กระบวนการทางธรรมชาติที่เกิดขึ้นได้เอง (Spontaneous Process) ทำให้จักรวาลมีความไม่เป็นระเบียบมากขึ้นเสมอ',
    ],
    explanation: {
      overview: 'กฎข้อที่สองของอุณหพลศาสตร์ระบุว่าเอนโทรปีของระบบโดดเดี่ยวจะไม่ลดลง',
      steps: [
        'ΔS_universe = ΔS_system + ΔS_surroundings ≥ 0',
        'สำหรับกระบวนการที่ย้อนกลับไม่ได้ (Irreversible Process) ΔS > 0 เสมอ',
        'ดังนั้น เอนโทรปีโดยรวมจะ "เพิ่มขึ้น" เสมอตามทิศทางของเวลา (Arrow of Time)',
      ],
      latexFormula: "\\Delta S_{\\text{isolated}} \\geq 0",
    },
  },

  // 3. Chemistry Questions
  {
    id: 'chem-01',
    subject: 'chemistry',
    type: 'single-choice',
    difficulty: 'medium',
    title: 'Atomic Structure: Electron Configuration of Transition Metals',
    prompt: 'การจัดเรียงอิเล็กตรอนในสถานะพื้น (Ground State) ของอะตอมโครเมียม (Chromium, Cr, Z = 24) ข้อใดถูกต้อง:',
    options: [
      { id: 'opt-half', text: '[Ar] 3d⁵ 4s¹ (Half-filled stability)', latex: '[\\mathrm{Ar}]\\, 3d^5 4s^1' },
      { id: 'opt-aufbau', text: '[Ar] 3d⁴ 4s²', latex: '[\\mathrm{Ar}]\\, 3d^4 4s^2' },
      { id: 'opt-wrong1', text: '[Ar] 3d⁶', latex: '[\\mathrm{Ar}]\\, 3d^6' },
      { id: 'opt-wrong2', text: '[Ar] 3d³ 4s² 4p¹', latex: '[\\mathrm{Ar}]\\, 3d^3 4s^2 4p^1' },
    ],
    correctAnswer: 'opt-half',
    hints: [
      'โครเมียมเป็นข้อยกเว้นของหลักการเอาฟเบา (Aufbau Principle)',
      'การจัดเรียงแบบกึ่งเต็ม (Half-filled subshell, 3d5) มีความเสถียรเป็นพิเศษ',
    ],
    explanation: {
      overview: 'ข้อยกเว้นการจัดเรียงอิเล็กตรอนของธาตุทรานซิชันคาบ 4 ได้แก่ Cr (Z=24) และ Cu (Z=29)',
      steps: [
        'หากจัดตามปกติจะได้ [Ar] 4s^2 3d^4',
        'แต่อิเล็กตรอน 1 ตัวจาก 4s จะย้ายไปที่ 3d เพื่อให้เป็น 3d^5',
        'การมีอิเล็กตรอนบรรจุกึ่งเต็มใน 3d ออร์บิทัล (d^5) จะมีพลังงานต่ำกว่าและเสถียรกว่าจาก Exchange Energy',
        'ดังนั้นคำตอบที่ถูกต้องคือ [Ar] 3d^5 4s^1',
      ],
      latexFormula: "\\mathrm{Cr}\\,(Z=24): [\\mathrm{Ar}]\\, 3d^5 4s^1",
    },
  },
  {
    id: 'chem-02',
    subject: 'chemistry',
    type: 'numeric',
    difficulty: 'easy',
    title: 'Acid-Base Equilibria: pH Calculation',
    prompt: 'สารละลายกรดแก่ไฮโดรคลอริก (HCl) เข้มข้น 0.001 โมลาร์ (M) แตกตัวได้ 100% จะมีค่า pH เท่าใด:',
    latexPrompt: '\\mathrm{pH} = -\\log[\\mathrm{H}_3\\mathrm{O}^+]',
    correctAnswer: 3,
    tolerance: 0.01,
    hints: [
      'HCl เป็นกรดแก่ แตกตัวได้ [H3O+] = 0.001 M = 10^(-3) M',
      'pH = -log(10^-3)',
    ],
    explanation: {
      overview: 'กรดแก่ไฮโดรคลอริกแตกตัวสมบูรณ์ในน้ำ',
      steps: [
        '[H3O+] = 0.001 M = 1 x 10^-3 M',
        'pH = -log(10^-3)',
        'pH = -(-3) = 3.0',
      ],
      latexFormula: "\\mathrm{pH} = -\\log(10^{-3}) = 3.0",
    },
  },
  {
    id: 'chem-03',
    subject: 'chemistry',
    type: 'multiple-select',
    difficulty: 'medium',
    title: 'Chemical Equilibrium: Le Chatelier’s Principle',
    prompt: 'สำหรับปฏิกิริยาคายความร้อน (Exothermic Reaction) ในภาชนะปิดต่อไปนี้:\nN2(g) + 3H2(g) ⇌ 2NH3(g)  [ΔH < 0]\nการกระทำในข้อใดจะทำให้สมดุลเลื่อนไปทางขวาเพื่อเกิดแก๊สแอมโมเนีย (NH3) มากขึ้น (เลือกทุกข้อที่ถูกต้อง):',
    options: [
      { id: 'opt-p-up', text: 'การเพิ่มความดันของระบบ (โดยการลดปริมาตรภาชนะ)' },
      { id: 'opt-t-down', text: 'การลดอุณหภูมิของระบบ' },
      { id: 'opt-add-n2', text: 'การเติมแก๊ส N2 เข้าสู่ระบบ' },
      { id: 'opt-t-up', text: 'การเพิ่มอุณหภูมิของระบบ' },
    ],
    correctAnswer: ['opt-p-up', 'opt-t-down', 'opt-add-n2'],
    hints: [
      'นับจำนวนโมลของแก๊ส: ฝั่งซ้ายมี 1 + 3 = 4 โมล ฝั่งขวามี 2 โมล',
      'ปฏิกิริยาคายความร้อน ถือว่าความร้อนเป็นผลพลอยได้ฝั่งขวา การลดอุณหภูมิจะดึงสมดุลไปทางขวา',
    ],
    explanation: {
      overview: 'หลักของเลอชาเตอลิเยร์ (Le Chatelier\'s Principle) เมื่อระบบถูกรบกวน ระบบจะปรับตัวในทิศทางลดการรบกวนนั้น',
      steps: [
        '1. เพิ่มความดัน: ระบบจะเลื่อนไปทางที่มีโมลแก๊สน้อยกว่า (ฝั่งขวา 2 โมล vs ซ้าย 4 โมล) -> สมดุลเลื่อนขวา',
        '2. ลดอุณหภูมิ: ปฏิกิริยาคายความร้อน การดึงความร้อนออกทำให้ระบบสร้างความร้อนเพิ่ม -> สมดุลเลื่อนขวา',
        '3. เติมสารตั้งต้น N2: ระบบจะลด N2 โดยการเปลี่ยนไปเป็นผลิตภัณฑ์ -> สมดุลเลื่อนขวา',
        '4. การเพิ่มอุณหภูมิจะผลักสมดุลย้อนกลับไปทางซ้าย',
      ],
      latexFormula: "\\mathrm{N}_2(g) + 3\\mathrm{H}_2(g) \\rightleftharpoons 2\\mathrm{NH}_3(g) + \\text{Heat}",
    },
  },

  // 4. Biology Questions
  {
    id: 'bio-01',
    subject: 'biology',
    type: 'single-choice',
    difficulty: 'easy',
    title: 'Cell Biology: Plant vs Animal Organelle Differences',
    prompt: 'ออร์แกเนลล์ในข้อใดพบได้เฉพาะในเซลล์พืช แต่ "ไม่พบ" ในเซลล์สัตว์ชั้นสูงทั่วไป:',
    options: [
      { id: 'opt-chloro', text: 'Chloroplast (คลอโรพลาสต์) และ Cell Wall (ผนังเซลล์)' },
      { id: 'opt-mito', text: 'Mitochondria (ไมโทคอนเดรีย) และ Ribosome' },
      { id: 'opt-golgi', text: 'Golgi Apparatus และ Lysosome' },
      { id: 'opt-rer', text: 'Endoplasmic Reticulum และ Centrosome' },
    ],
    correctAnswer: 'opt-chloro',
    hints: [
      'เซลล์พืชต้องการออร์แกเนลล์เพื่อการสังเคราะห์ด้วยแสงและรักษาความแข็งแรงของผนังเซลล์',
      'ไมโทคอนเดรียและไรโบโซมพบได้ในเซลล์ยูแคริโอตทั้งสองชนิด',
    ],
    explanation: {
      overview: 'เซลล์พืชมีออร์แกเนลล์เฉพาะตัวที่เกี่ยวข้องกับการสร้างอาหารและการคงรูปทรงของต้นพืช',
      steps: [
        'คลอโรพลาสต์มีรงควัตถุคลอโรฟิลล์ใช้สังเคราะห์ด้วยแสง พบในเซลล์พืช',
        'ผนังเซลล์มีเซลลูโลสเพิ่มความแข็งแรง ป้องกันเซลล์แตก พบในเซลล์พืช',
        'ส่วนไมโทคอนเดรีย กอลจิ และเอนโดพลาสมิกเรติคูลัมพบได้ในทั้งเซลล์พืชและเซลล์สัตว์',
      ],
    },
  },
  {
    id: 'bio-02',
    subject: 'biology',
    type: 'fill-in-blank',
    difficulty: 'easy',
    title: 'Cellular Respiration: Universal Energy Molecule',
    prompt: 'สารชีวโมเลกุลพลังงานสูงที่มีโครงสร้างเป็นนิวคลีโอไทด์ และทำหน้าที่เป็น "สกุลเงินพลังงานสากล" (Energy Currency) ของสิ่งมีชีวิตทุกชนิดคือสารใด (ตอบเป็นอักษรย่อภาษาอังกฤษ 3 ตัว):',
    correctAnswer: 'ATP',
    acceptableAnswers: ['ATP', 'atp', 'Atp'],
    hints: [
      'ย่อมาจาก Adenosine Triphosphate',
      'ประกอบด้วยเบสอะดีนีน น้ำตาลไรโบส และหมู่ฟอสเฟต 3 หมู่',
    ],
    explanation: {
      overview: 'ATP (Adenosine Triphosphate) เป็นสารให้พลังงานหลักในกระบวนการเมแทบอลิซึมของเซลล์',
      steps: [
        'การสลายพันธะฟอสเฟตพลังงานสูง (High-energy phosphate bond) เปลี่ยน ATP เป็น ADP + Pi จะปลดปล่อยพลังงานประมาณ 7.3 kcal/mol',
        'ถูกสร้างขึ้นเป็นหลักในไมโทคอนเดรียผ่านกระบวนการ Cellular Respiration',
      ],
      latexFormula: "\\mathrm{ATP} + \\mathrm{H}_2\\mathrm{O} \\rightarrow \\mathrm{ADP} + \\mathrm{P}_i + \\Delta G \\,(-7.3\\text{ kcal/mol})",
    },
  },
  {
    id: 'bio-03',
    subject: 'biology',
    type: 'single-choice',
    difficulty: 'medium',
    title: 'Genetics: Mendelian Monohybrid Cross Ratio',
    prompt: 'การผสมพันธุ์ถั่วลันเตาต้นสูงพันธุ์ทาง (Heterozygous: Tt) กับต้นสูงพันธุ์ทาง (Tt) ตามกฎพันธุศาสตร์ของเมนเดล จะได้อัตราส่วนฟีโนไทป์ (Phenotypic ratio) ต้นสูง : ต้นเตี้ย ในรุ่นลูก (F1) เท่าใด:',
    options: [
      { id: 'opt-3-1', text: '3 : 1 (สูง 75% : เตี้ย 25%)' },
      { id: 'opt-1-1', text: '1 : 1 (สูง 50% : เตี้ย 50%)' },
      { id: 'opt-1-2-1', text: '1 : 2 : 1 (TT : Tt : tt - Genotypic ratio)' },
      { id: 'opt-all', text: '4 : 0 (สูงทั้งหมด 100%)' },
    ],
    correctAnswer: 'opt-3-1',
    hints: [
      'ใช้ตารางพันเนตต์ (Punnett Square): เซลล์สืบพันธุ์คือ T และ t',
      'โจทย์ถามอัตราส่วนฟีโนไทป์ (ลักษณะภายนอก) ไม่ใช่อัตราส่วนจีโนไทป์',
    ],
    explanation: {
      overview: 'การผสมพันธุ์ลักษณะเดี่ยว (Monohybrid Cross) ของสิ่งมีชีวิตเฮเทอโรไซกัส Tt x Tt',
      steps: [
        'จีโนไทป์รุ่นลูก: 1 TT : 2 Tt : 1 tt',
        'แอลลีล T เป็นลักษณะเด่นสมบูรณ์ (Complete dominance) ข่ม t',
        'ดังนั้น TT (1) และ Tt (2) แสดงลักษณะต้นสูง รวมเป็น 3 ส่วน',
        'tt (1) แสดงลักษณะต้นเตี้ย 1 ส่วน',
        'อัตราส่วนฟีโนไทป์ สูง : เตี้ย จึงเท่ากับ 3 : 1',
      ],
    },
  },

  // 5. Thai Language Questions
  {
    id: 'thai-01',
    subject: 'thai',
    type: 'multiple-select',
    difficulty: 'easy',
    title: 'Phonology: Triyang Mid-Class Consonants (อักษรกลาง 9 ตัว)',
    prompt: 'พยัญชนะในข้อใดต่อไปนี้จัดอยู่ในกลุ่ม "อักษรกลาง" (ไตรยางศ์) ทั้งหมด (เลือกทุกข้อที่ถูกต้อง):',
    options: [
      { id: 'opt-mid-k', text: 'ก, จ, ด, ต' },
      { id: 'opt-mid-b', text: 'บ, ป, อ' },
      { id: 'opt-mid-complex', text: 'ฎ, ฏ' },
      { id: 'opt-high', text: 'ข, ฉ, ถ, ผ (อักษรสูง)' },
    ],
    correctAnswer: ['opt-mid-k', 'opt-mid-b', 'opt-mid-complex'],
    hints: [
      'ท่องจำ: "ไก่ จิก เด็ก ตาย เด็ก(ฎ) ตาย(ฏ) บน ปาก โอ่ง"',
      'อักษรกลางมีทั้งหมด 9 ตัวพอดี และสามารถผันวรรณยุกต์ได้ครบทั้ง 5 เสียง',
    ],
    explanation: {
      overview: 'ไตรยางศ์แบ่งพยัญชนะไทย 44 ตัวออกเป็น 3 หมู่ตามระดับเสียงพื้นฐาน',
      steps: [
        'อักษรกลางมี 9 ตัว ได้แก่ ก จ ด ต ฎ ฏ บ ป อ',
        'คำท่องจำโบราณ: ไก่(ก) จิก(จ) เด็ก(ด) ตาย(ต) เด็ก(ฎ) ตาย(ฏ) บน(บ) ปาก(ป) โอ่ง(อ)',
        'ตัวเลือก ข ฉ ถ ผ จัดเป็นอักษรสูง (พื้นเสียงเป็นเสียงจัตวา)',
      ],
    },
  },
  {
    id: 'thai-02',
    subject: 'thai',
    type: 'single-choice',
    difficulty: 'medium',
    title: 'Phonology: Live and Dead Syllable Rules (คำเป็น คำตาย)',
    prompt: 'คำในข้อใดต่อไปนี้เป็น "คำตาย" ทุกคำตามหลักไวยากรณ์ไทย:',
    options: [
      { id: 'opt-dead', text: 'บท, มัก, ลัด, กะทิ' },
      { id: 'opt-live1', text: 'ลม, วาน, เกย, ดาว (คำเป็น แม่กม กน เกย เกอว)' },
      { id: 'opt-mixed', text: 'รัก, เธอ, นิ, รันดร์' },
      { id: 'opt-live2', text: 'แม่, น้ำ, โขง, ไหล' },
    ],
    correctAnswer: 'opt-dead',
    hints: [
      'คำตายสังเกตจาก: 1. สะกดด้วยแม่ กก กบ กด (กบด = กบฏ ตายเร็ว) หรือ 2. สระเสียงสั้นในแม่ ก กา',
      'คำเป็น: สะกดด้วย นมยวง (แม่กน กม เกย เกอว กง) หรือ สระเสียงยาวในแม่ ก กา หรือสระ อำ ไอ ใอ เอา',
    ],
    explanation: {
      overview: 'การแยกคำเป็นและคำตายอาศัยมาตราตัวสะกดและความสั้นยาวของเสียงสระ',
      steps: [
        'บท (สะกดด้วยแม่กด = คำตาย)',
        'มัก (สะกดด้วยแม่กก = คำตาย)',
        'ลัด (สะกดด้วยแม่กด = คำตาย)',
        'กะ-ทิ (สระสั้น อะ, อิ ในแม่ ก กา = คำตาย)',
        'ดังนั้น "บท, มัก, ลัด, กะทิ" เป็นคำตายทุกคำ',
      ],
    },
  },
  {
    id: 'thai-03',
    subject: 'thai',
    type: 'fill-in-blank',
    difficulty: 'medium',
    title: 'Tone Derivation: Low Class Obstruent Tone Shift',
    prompt: 'คำว่า "ม้า" (พยัญชนะต้น ม ม้า เป็นอักษรต่ำเดียว ผสมสระ อา และมีรูปวรรณยุกต์โท) จะออกเป็น "เสียงวรรณยุกต์" ใด (ตอบ: สามัญ หรือ เอก หรือ โท หรือ ตรี หรือ จัตวา):',
    correctAnswer: 'ตรี',
    acceptableAnswers: ['ตรี', 'เสียงตรี'],
    hints: [
      'กฎอักษรต่ำ: รูปเอก เสียงโท, รูปโท เสียงตรี',
      'คำว่า ม้า มีรูปวรรณยุกต์โท ดังนั้นเสียงจะถูกยกขึ้นหนึ่งระดับ',
    ],
    explanation: {
      overview: 'กฎการผันเสียงวรรณยุกต์ของอักษรต่ำ (Low Class Tone Invariant)',
      steps: [
        'อักษรต่ำ คำเป็น: พื้นเสียง (ไม่มีรูป) = เสียงสามัญ',
        'อักษรต่ำ คำเป็น มีรูปเอก = ออกเสียงโท (เช่น ม่า)',
        'อักษรต่ำ คำเป็น มีรูปโท = ออกเสียงตรี (เช่น ม้า)',
        'ดังนั้น คำว่า "ม้า" มีรูปโท แต่ออก "เสียงตรี"',
      ],
    },
  },
];

/**
 * Exercise Engine Evaluator & Helper Functions
 */
export function getQuestionsBySubject(subject: ExerciseSubject | 'all'): ExerciseQuestion[] {
  if (subject === 'all') return EXERCISE_BANK;
  return EXERCISE_BANK.filter((q) => q.subject === subject);
}

export function getQuestionsByDifficulty(diff: DifficultyLevel | 'all'): ExerciseQuestion[] {
  if (diff === 'all') return EXERCISE_BANK;
  return EXERCISE_BANK.filter((q) => q.difficulty === diff);
}

export interface EvaluationResult {
  isCorrect: boolean;
  score: number; // 0 to 1
  feedback: string;
}

export function evaluateAnswer(
  question: ExerciseQuestion,
  userAnswer: string | string[] | number | null | undefined
): EvaluationResult {
  if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
    return {
      isCorrect: false,
      score: 0,
      feedback: 'ยังไม่ได้ตอบคำถามข้อนี้',
    };
  }

  // 1. Single Choice
  if (question.type === 'single-choice') {
    const isCorrect = String(userAnswer).trim() === String(question.correctAnswer).trim();
    return {
      isCorrect,
      score: isCorrect ? 1 : 0,
      feedback: isCorrect ? 'ถูกต้อง ยอดเยี่ยมมาก' : 'คำตอบยังไม่ถูกต้อง ลองศึกษาจากเฉลยละเอียดด้านล่าง',
    };
  }

  // 2. Multiple Select
  if (question.type === 'multiple-select') {
    if (!Array.isArray(userAnswer)) {
      return { isCorrect: false, score: 0, feedback: 'รูปแบบคำตอบไม่ถูกต้อง' };
    }
    const correctArr = Array.isArray(question.correctAnswer)
      ? (question.correctAnswer as string[])
      : [String(question.correctAnswer)];

    const userSet = new Set(userAnswer.map((s) => String(s).trim()));
    const correctSet = new Set(correctArr.map((s) => String(s).trim()));

    if (userSet.size !== correctSet.size) {
      return {
        isCorrect: false,
        score: 0,
        feedback: `คุณเลือก ${userSet.size} ตัวเลือก แต่คำตอบที่ถูกต้องมี ${correctSet.size} ตัวเลือก`,
      };
    }

    const allMatch = [...userSet].every((item) => correctSet.has(item));
    return {
      isCorrect: allMatch,
      score: allMatch ? 1 : 0,
      feedback: allMatch ? 'ถูกต้อง คุณเลือกได้ครบทุกตัวเลือกที่สมบูรณ์' : 'ยังมีบางตัวเลือกที่ยังไม่ถูกต้อง',
    };
  }

  // 3. Fill in the Blank
  if (question.type === 'fill-in-blank') {
    const normalizedUser = String(userAnswer).trim().toLowerCase();
    const correctPrimary = String(question.correctAnswer).trim().toLowerCase();
    const acceptable = (question.acceptableAnswers ?? []).map((s) => s.trim().toLowerCase());

    const isMatch = normalizedUser === correctPrimary || acceptable.includes(normalizedUser);
    return {
      isCorrect: isMatch,
      score: isMatch ? 1 : 0,
      feedback: isMatch ? 'ถูกต้อง ตอบได้ตรงตามหลักวิชาการ' : `คำตอบยังไม่ถูกต้อง (คำตอบที่ถูกต้องคือ "${question.correctAnswer}")`,
    };
  }

  // 4. Numeric
  if (question.type === 'numeric') {
    const numUser = typeof userAnswer === 'number' ? userAnswer : parseFloat(String(userAnswer));
    if (isNaN(numUser)) {
      return {
        isCorrect: false,
        score: 0,
        feedback: 'กรุณาใส่ตัวเลขที่ถูกต้อง',
      };
    }
    const numCorrect = Number(question.correctAnswer);
    const tol = question.tolerance ?? 0.01;
    const isClose = Math.abs(numUser - numCorrect) <= tol;

    return {
      isCorrect: isClose,
      score: isClose ? 1 : 0,
      feedback: isClose
        ? `ถูกต้อง ค่าที่คำนวณได้ (${numUser}) อยู่ในเกณฑ์ความคลาดเคลื่อนที่ยอมรับได้`
        : `คำตอบยังไม่ถูกต้อง ค่าที่คำนวณได้คือ ${numUser} (คำตอบที่ถูกต้องคือ ${numCorrect})`,
    };
  }

  return { isCorrect: false, score: 0, feedback: 'ประเภทคำถามไม่รองรับ' };
}
