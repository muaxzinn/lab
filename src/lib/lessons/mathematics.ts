import type { Lesson } from "./types.ts";

export const MATH_LESSONS: Lesson[] = [
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
          "Limits resolve classical indeterminate forms (0/0, \\infty/\\infty) without dividing by zero, unlocking instantaneous physical measurements."
        ],
        formulaLatex: "\\lim_{x \\to c} f(x) = L \\iff \\forall \\varepsilon > 0, \\exists \\delta > 0 : (0 < |x - c| < \\delta \\implies |f(x) - L| < \\varepsilon)",
        formulaSymbols: [
          { symbol: "\\epsilon", meaning: "Arbitrary positive error tolerance in the function output" },
          { symbol: "\\delta", meaning: "Required proximity interval in the input variable" },
          { symbol: "L", meaning: "Limiting value" }
        ],
        application: {
          title: "Speedometer Instantaneous Velocity",
          thaiTitle: "การคำนวณความเร็วขณะใดขณะหนึ่งของมาตรวัดความเร็วรถยนต์",
          description: "While average speed is distance divided by elapsed time, a digital vehicle speedometer computes instantaneous speed as the limit of delta-s over delta-t as delta-t approaches zero.",
          thaiDescription: "ขณะที่ความเร็วเฉลี่ยคำนวณจากระยะทางหารด้วยเวลาทั้งหมด มาตรวัดความเร็วของรถยนต์จะคำนวณความเร็วขณะใดขณะหนึ่งจากลิมิตของ \\Delta s / \\Delta t เมื่อช่วงเวลา \\Delta t เข้าใกล้ศูนย์"
        },
        checkpoint: {
          question: "Evaluate the limit: lim (x → 2) of (x² - 4) / (x - 2).",
          thaiQuestion: "จงหาค่าของลิมิต lim (x → 2) ของ (x² - 4) / (x - 2)",
          options: [
            "0",
            "2",
            "4",
            "Undefined (division by zero)"
          ],
          correctIndex: 2,
          explanation: "Factoring the numerator: (x² - 4) = (x - 2)(x + 2). For x ≠ 2, the (x - 2) terms cancel, leaving lim (x → 2) of (x + 2) = 4.",
          thaiExplanation: "แยกตัวประกอบตัวเศษได้ (x - 2)(x + 2) ตัดกับตัวส่วน (x - 2) จะเหลือ x + 2 เมื่อแทนค่า x = 2 จะได้คำตอบเท่ากับ 4"
        }
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
          "The Chain Rule enables differentiation of composite functions: d/dx[f(g(x))] = f'(g(x)) · g'(x)."
        ],
        formulaLatex: "f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}",
        formulaSymbols: [
          { symbol: "f'(x)", meaning: "Derivative of f with respect to x (tangent slope)" },
          { symbol: "h", meaning: "Infinitesimal increment in input variable x" }
        ],
        application: {
          title: "Machine Learning Gradient Descent (Backpropagation)",
          thaiTitle: "การปรับค่าน้ำหนักในโครงข่ายประสาทเทียมด้วยเกรเดียนต์",
          description: "Deep neural networks train by computing partial derivatives of the loss function with respect to millions of model weights using the Chain Rule to minimize classification error.",
          thaiDescription: "การฝึกโครงข่ายประสาทเทียม (Deep Learning) ใช้กฎลูกโซ่คำนวณอนุพันธ์ย่อยของฟังก์ชันการสูญเสียเทียบกับค่าน้ำหนักนับล้านตัว เพื่อปรับค่าน้ำหนักให้โมเดลทำนายได้แม่นยำที่สุด"
        },
        checkpoint: {
          question: "What is the derivative of f(x) = 3x⁴ - 5x² + 7 with respect to x?",
          thaiQuestion: "อนุพันธ์ของ f(x) = 3x⁴ - 5x² + 7 เทียบกับ x มีค่าเท่าใด?",
          options: [
            "12x³ - 10x",
            "12x³ - 10x + 7",
            "7x³ - 3x",
            "12x⁴ - 10x²"
          ],
          correctIndex: 0,
          explanation: "Applying the power rule term by term: d/dx(3x⁴) = 12x³, d/dx(-5x²) = -10x, and d/dx(7) = 0, giving 12x³ - 10x.",
          thaiExplanation: "ใช้กฎเลขชี้กำลังทีละพจน์: 3(4)x³ - 5(2)x + 0 = 12x³ - 10x"
        }
      },
      {
        stepNumber: 3,
        title: "Critical Points, Concavity & Optimization",
        thaiTitle: "จุดวิกฤต ความเว้า และการหาค่าเหมาะที่สุด (Optimization)",
        summary: "Extrema occur where the first derivative equals zero; the second derivative sign reveals local maxima vs. minima.",
        thaiSummary: "จุดสูงสุดและต่ำสุดสัมพัทธ์จะเกิดขึ้น ณ ตำแหน่งที่อนุพันธ์อันดับหนึ่งเป็นศูนย์ และเครื่องหมายของอนุพันธ์อันดับสองจะระบุความเว้า",
        deepTheory: [
          "Fermat's Theorem on Stationary Points: If f has a local extremum at c and is differentiable, then f'(c) = 0.",
          "Second Derivative Test: If f'(c) = 0 and f''(c) > 0, the curve is concave up and c is a local minimum. If f''(c) < 0, the curve is concave down and c is a local maximum. Inflection points occur where f''(x) = 0 and concavity changes sign."
        ],
        formulaLatex: "f'(c) = 0 \\quad \\text{and} \\quad f''(c) > 0 \\implies c \\text{ is a local minimum}",
        formulaSymbols: [
          { symbol: "f''(c)", meaning: "Second derivative measuring curve concavity", unit: "1/units²" }
        ],
        application: {
          title: "Aerospace Fuel Tank Surface Minimization",
          thaiTitle: "การออกแบบถังเชื้อเพลิงให้ใช้วัสดุน้อยที่สุดแต่จุได้มากที่สุด",
          description: "Engineers use derivative optimization to calculate the optimal radius-to-height ratio (r/h) of cylindrical rocket propellant tanks that maximizes volume while minimizing titanium hull structural weight.",
          thaiDescription: "วิศวกรการบินใช้แคลคูลัสหาค่าเหมาะที่สุดเพื่อคำนวณสัดส่วนรัศมีต่อความสูงของถังเชื้อเพลิงจรวด ให้จุน้ำมันได้มากที่สุดโดยใช้วัสดุแผ่นไทเทเนียมที่มีน้ำหนักน้อยที่สุด"
        },
        checkpoint: {
          question: "At a critical point x = c where f'(c) = 0, if f''(c) = -6, what type of point is c?",
          thaiQuestion: "ณ จุดวิกฤต x = c ที่ f'(c) = 0 หากคำนวณได้ f''(c) = -6 จุด c จัดเป็นจุดประเภทใด?",
          options: [
            "Local minimum",
            "Local maximum",
            "Saddle point",
            "Point of inflection"
          ],
          correctIndex: 1,
          explanation: "Because the second derivative is strictly negative (f''(c) < 0), the curve is concave downward (like an upside-down parabola), making c a local maximum.",
          thaiExplanation: "เนื่องจากอนุพันธ์อันดับสองมีค่าเป็นลบ (f''(c) < 0) กราฟจึงมีลักษณะคว่ำ จุด c จึงเป็นจุดสูงสุดสัมพัทธ์"
        }
      }
    ]
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
          "Choosing sample evaluation points x_i^* in each partition, the Riemann sum is \\sum f(x_i^*) \\Delta x. As n \\to \\infty, the sum converges to the definite integral \\int_a^b f(x) dx."
        ],
        formulaLatex: "\\int_a^b f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x",
        formulaSymbols: [
          { symbol: "\\int_a^b f(x) dx", meaning: "Net signed area between curve f(x) and the x-axis" },
          { symbol: "\\Delta x", meaning: "Partition width: (b - a) / n" }
        ],
        application: {
          title: "Structural Civil Engineering: Beam Load Deflection",
          thaiTitle: "วิศวกรรมโครงสร้าง: การคำนวณแรงดัดในคานสะพาน",
          description: "Civil engineers integrate distributed dynamic traffic loads across bridge suspension spans to determine bending moments, shear stress distributions, and steel reinforcement thicknesses.",
          thaiDescription: "วิศวกรโยธาใช้การอินทิเกรตกระจายน้ำหนักของรถยนต์บนสะพานเพื่อคำนวณโมเมนต์ดัดและแรงเฉือน ป้องกันการวิบัติของโครงสร้างคอนกรีตเสริมเหล็ก"
        },
        checkpoint: {
          question: "As the number of partition subintervals n approaches infinity, what happens to the rectangle width Δx in a Riemann sum?",
          thaiQuestion: "เมื่อจำนวนแถบสี่เหลี่ยมย่อย n เพิ่มขึ้นจนเข้าสู่อนันต์ ความกว้างของสี่เหลี่ยม Δx ในผลบวกรีมันน์จะเป็นอย่างไร?",
          options: [
            "It approaches infinity",
            "It approaches zero (infinitesimal dx)",
            "It remains constant at 1",
            "It doubles"
          ],
          correctIndex: 1,
          explanation: "Because Δx = (b - a) / n, as n → ∞, Δx approaches zero, transforming the discrete sum into a continuous definite integral.",
          thaiExplanation: "เนื่องจาก Δx = (b - a) / n เมื่อ n เข้าสู่อนันต์ ค่า Δx จะเข้าใกล้ศูนย์ กลายเป็นส่วนเพิ่มเล็กยิ่งยวด dx"
        }
      },
      {
        stepNumber: 2,
        title: "The Fundamental Theorem of Calculus (FTC)",
        thaiTitle: "ทฤษฎีบทมูลฐานของแคลคูลัส (FTC)",
        summary: "Differentiation and integration are inverse operations: the integral of a rate of change equals the net change.",
        thaiSummary: "การหาอนุพันธ์และการอินทิเกรตเป็นกระบวนการผกผันซึ่งกันและกัน ผลรวมของการเปลี่ยนแปลงจะเท่ากับการเปลี่ยนแปลงสุทธิ",
        deepTheory: [
          "Part 1: If F(x) = \\int_a^x f(t) dt, then F'(x) = f(x). Accumulating area under a curve has a derivative exactly equal to the curve itself.",
          "Part 2: If F is any antiderivative of f (so F' = f), then \\int_a^b f(x) dx = F(b) - F(a). This eliminates the need to calculate infinite Riemann sum limits."
        ],
        formulaLatex: "\\frac{d}{dx} \\left( \\int_a^x f(t) \\, dt \\right) = f(x) \\quad \\text{and} \\quad \\int_a^b f(x) \\, dx = F(b) - F(a)",
        formulaSymbols: [
          { symbol: "F(x)", meaning: "Antiderivative of f(x) such that F'(x) = f(x)" }
        ],
        application: {
          title: "Electric Power Grid Energy Metering",
          thaiTitle: "การคำนวณพลังงานไฟฟ้ากิโลวัตต์-ชั่วโมงในมิเตอร์",
          description: "Electric utility meters compute total consumed energy in kWh by integrating instantaneous power P(t) = V(t) · I(t) over time t across days and billing cycles.",
          thaiDescription: "มิเตอร์ไฟฟ้าคำนวณพลังงานรวม (kWh) โดยการอินทิเกรตกำลังไฟฟ้าขณะใดขณะหนึ่ง P(t) = V(t)·I(t) เทียบกับเวลาตลอดทั้งเดือนเพื่อคิดค่าไฟฟ้า"
        },
        checkpoint: {
          question: "Evaluate the definite integral: ∫ from 0 to 3 of (2x) dx.",
          thaiQuestion: "จงหาค่าของปริพันธ์จำกัดเขต: ∫ (จาก 0 ถึง 3) ของ 2x dx",
          options: [
            "3",
            "6",
            "9",
            "18"
          ],
          correctIndex: 2,
          explanation: "The antiderivative of 2x is x². Evaluating from 0 to 3: F(3) - F(0) = 3² - 0² = 9 - 0 = 9.",
          thaiExplanation: "ปฏิยานุพันธ์ของ 2x คือ x² แทนค่าขอบเขตบนลบขอบเขตล่าง: 3² - 0² = 9"
        }
      },
      {
        stepNumber: 3,
        title: "Integration Techniques: Substitution & Parts",
        thaiTitle: "เทคนิคการอินทิเกรต: การเปลี่ยนตัวแปรและการอินทิเกรตทีละส่วน",
        summary: "Integration by Substitution reverses the Chain Rule, while Integration by Parts reverses the Product Rule for multi-function integrals.",
        thaiSummary: "การเปลี่ยนตัวแปร (u-substitution) คือการย้อนกลับของกฎลูกโซ่ และการอินทิเกรตทีละส่วน (by parts) คือการย้อนกลับของกฎผลคูณ",
        deepTheory: [
          "u-Substitution: \\int f(g(x)) g'(x) dx = \\int f(u) du, where u = g(x) and du = g'(x) dx.",
          "Integration by Parts: Derived from d/dx(uv) = u(dv/dx) + v(du/dx). Integrating both sides yields: \\int u \\, dv = u v - \\int v \\, du. The LIATE rule (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential) assists optimal choice of u."
        ],
        formulaLatex: "\\int u \\, dv = u v - \\int v \\, du",
        formulaSymbols: [
          { symbol: "u, v", meaning: "Differentiable functions of independent variable x" }
        ],
        application: {
          title: "Fourier Transform Signal Spectral Decomposition",
          thaiTitle: "การแปลงฟูเรียร์ในระบบประมวลผลสัญญาณเสียงดิจิทัล",
          description: "Digital audio processing (MP3 encoding, noise-canceling headphones) evaluates continuous Fourier integrals using integration by parts to decompose raw waveforms into pure frequency sinusoids.",
          thaiDescription: "ระบบตัดเสียงรบกวนในหูฟังใช้การแปลงฟูเรียร์อินทิเกรตแยกคลื่นเสียงออกเป็นความถี่เดี่ยว เพื่อสร้างคลื่นเฟสตรงข้ามมาหักล้างเสียงรบกวนแบบเรียลไทม์"
        },
        checkpoint: {
          question: "When evaluating ∫ x e^x dx using integration by parts (∫ u dv = uv - ∫ v du), what is the optimal choice for u according to LIATE?",
          thaiQuestion: "ในการหาปริพันธ์ ∫ x e^x dx ด้วยวิธี By Parts ตามกฎ LIATE ควรเลือก u เป็นพจน์ใด?",
          options: [
            "u = e^x",
            "u = x (Algebraic)",
            "u = x e^x",
            "u = dx"
          ],
          correctIndex: 1,
          explanation: "Choosing u = x (algebraic) yields du = dx, which simplifies the remaining integral ∫ v du = ∫ e^x dx into an easily solvable form.",
          thaiExplanation: "เลือก u = x เพราะเมื่อหาอนุพันธ์จะได้ du = dx ทำให้ปริพันธ์ที่เหลือ ∫ e^x dx สามารถอินทิเกรตได้ทันที"
        }
      }
    ]
  },

  {
    id: "math-linear-algebra-vectors",
    discipline: "mathematics",
    title: "Linear Algebra, Vectors & Matrix Transformations",
    thaiTitle: "พีชคณิตเชิงเส้น ปริภูมิเวกเตอร์ และการแปลงเชิงเส้นด้วยเมทริกซ์",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Master vector dot and cross products, matrix transformations in Cartesian space, determinants, and eigenvalue systems.",
    thaiOverview: "เข้าใจผลคูณจุดและผลคูณไขว้ของเวกเตอร์ การแปลงเชิงเส้นด้วยเมทริกซ์ ดีเทอร์มิแนนต์ และระบบไอเกนแวลู",
    tags: ["Linear Algebra", "Vectors", "Matrices", "Eigenvalues", "Transformations"],
    steps: [
      {
        stepNumber: 1,
        title: "Vector Spaces, Dot Product & Orthogonality",
        thaiTitle: "ปริภูมิเวกเตอร์ ผลคูณจุด (Dot Product) และการตั้งฉาก",
        summary: "Vectors represent directed geometric quantities; the dot product measures directional alignment and tests orthogonality.",
        thaiSummary: "เวกเตอร์เป็นปริมาณที่มีทั้งขนาดและทิศทาง ผลคูณจุด (Dot Product) วัดความสอดคล้องของทิศทางและใช้ตรวจสอบการตั้งฉาก",
        deepTheory: [
          "The algebraic dot product in R^n: \\vec{u} \\cdot \\vec{v} = \\sum_{i=1}^n u_i v_i. Geometric equivalence: \\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos\\theta.",
          "Two non-zero vectors are strictly orthogonal (perpendicular, \\theta = 90^\\circ) if and only if their dot product vanishes: \\vec{u} \\cdot \\vec{v} = 0. The vector projection of u onto v is: \\text{proj}_{\\vec{v}}(\\vec{u}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|^2} \\vec{v}."
        ],
        formulaLatex: "\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos\\theta = u_x v_x + u_y v_y + u_z v_z",
        formulaSymbols: [
          { symbol: "\\vec{u} \\cdot \\vec{v}", meaning: "Scalar inner product of vectors u and v" },
          { symbol: "\\|\\vec{u}\\|", meaning: "Euclidean vector norm (magnitude)" },
          { symbol: "\\theta", meaning: "Angle between vector rays" }
        ],
        application: {
          title: "3D Video Game Lighting Shaders (Lambertian Reflection)",
          thaiTitle: "การคำนวณแสงเงา 3D ในเกมด้วยเวกเตอร์แนวฉาก",
          description: "Modern GPU fragment shaders compute diffuse surface brightness by evaluating the dot product between the surface normal vector N and the light direction vector L: I = I_0 max(0, N · L).",
          thaiDescription: "กราฟิกการ์ดในเกม 3 มิติคำนวณความสว่างของพื้นผิววัตถุโดยใช้ผลคูณจุดระหว่างเวกเตอร์แนวฉากของพื้นผิว (N) กับทิศทางของแสง (L)"
        },
        checkpoint: {
          question: "If two 2D vectors u = [3, 4] and v = [-4, k] are orthogonal, what must be the value of k?",
          thaiQuestion: "หากเวกเตอร์ u = [3, 4] และ v = [-4, k] ตั้งฉากกัน ค่าของ k ต้องมีค่าเท่าใด?",
          options: [
            "k = 3",
            "k = -3",
            "k = 0",
            "k = 4"
          ],
          correctIndex: 0,
          explanation: "For orthogonal vectors, u · v = 0 → (3)(-4) + (4)(k) = 0 → -12 + 4k = 0 → 4k = 12 → k = 3.",
          thaiExplanation: "เวกเตอร์ตั้งฉากกันเมื่อ Dot Product เป็น 0: (3)(-4) + 4(k) = -12 + 4k = 0 ดังนั้น k = 3"
        }
      },
      {
        stepNumber: 2,
        title: "Matrix Transformations & The Determinant",
        thaiTitle: "การแปลงเชิงเส้นด้วยเมทริกซ์และดีเทอร์มิแนนต์",
        summary: "Matrices act as geometric functions that scale, rotate, and shear vector spaces, with the determinant measuring area scaling.",
        thaiSummary: "เมทริกซ์ทำหน้าที่เป็นการแปลงเชิงเส้นที่หมุน ยืด หด หรือเฉือนปริภูมิเวกเตอร์ โดยมีค่าดีเทอร์มิแนนต์เป็นตัววัดอัตราการขยายพื้นที่",
        deepTheory: [
          "A matrix A transforms vector x linearly: T(\\vec{x}) = A\\vec{x}. The columns of A represent the coordinates where the standard basis vectors \\hat{i} and \\hat{j} land after transformation.",
          "The determinant det(A) represents the signed factor by which the linear transformation scales volumes or areas. If det(A) = 0, the transformation collapses dimensions into a line or point, meaning the matrix is singular (non-invertible)."
        ],
        formulaLatex: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc, \\quad \\text{Area}_{\\text{trans}} = |\\det(A)| \\cdot \\text{Area}_{\\text{orig}}",
        formulaSymbols: [
          { symbol: "\\det(A)", meaning: "Determinant scalar representing spatial scaling ratio" }
        ],
        application: {
          title: "Computer Graphics 3D Camera Projection Pipelines",
          thaiTitle: "เมทริกซ์การฉายภาพ 3D สู่จอแสดงผล 2D",
          description: "Game engines (Unreal, Unity) chain 4x4 affine transformation matrices (Model × View × Projection) to rotate, translate, and perspective-project 3D vertex coordinates onto a 2D monitor screen.",
          thaiDescription: "เอนจินเกมใช้เมทริกซ์ 4x4 ในการคูณแปลงพิกัดของโมเดล 3D จากพิกัดโลก สู่มุมมองกล้อง และฉายลงบนหน้าจอดิจิทัล 2 มิติ"
        },
        checkpoint: {
          question: "What does it geometrically imply if the determinant of a 2x2 matrix A is equal to zero (det(A) = 0)?",
          thaiQuestion: "ในทางเรขาคณิต หากดีเทอร์มิแนนต์ของเมทริกซ์ 2x2 มีค่าเท่ากับศูนย์ (det(A) = 0) มีความหมายว่าอย่างไร?",
          options: [
            "The transformation is a pure 90° rotation",
            "The transformation collapses 2D space onto a 1D line or 0D point (non-invertible)",
            "The transformed area is quadrupled",
            "The basis vectors remain completely unchanged"
          ],
          correctIndex: 1,
          explanation: "A determinant of zero means the transformation squashes 2D area down to zero (flattening the plane onto a single line or point), rendering it irreversible and non-invertible.",
          thaiExplanation: "ดีเทอร์มิแนนต์เป็น 0 หมายความว่าการแปลงนั้นบีบพื้นที่ 2 มิติให้ยุบเหลือเพียงเส้นตรง 1 มิติหรือจุด ทำให้ไม่สามารถหาเมทริกซ์ผกผันเพื่อแปลงกลับได้"
        }
      },
      {
        stepNumber: 3,
        title: "Eigenvalues, Eigenvectors & Diagonalization",
        thaiTitle: "ไอเกนแวลู ไอเกนเวกเตอร์ และการแปลงเมทริกซ์ทแยงมุม",
        summary: "Eigenvectors are special directions that undergo pure scalar stretching by factor λ without changing spatial orientation.",
        thaiSummary: "ไอเกนเวกเตอร์คือทิศทางพิเศษที่เมื่อถูกแปลงด้วยเมทริกซ์แล้วจะคงแนวเดิมไว้ มีเพียงความยาวที่ยืดหรือหดด้วยตัวคูณไอเกนแวลู λ",
        deepTheory: [
          "Characteristic Equation: A\\vec{v} = \\lambda \\vec{v} \\iff (A - \\lambda I)\\vec{v} = \\vec{0}. Non-trivial solutions exist if and only if \\det(A - \\lambda I) = 0.",
          "Solving the characteristic polynomial yields eigenvalues \\lambda_i. For symmetric matrices, eigenvectors are guaranteed orthogonal, enabling spectral decomposition: A = P D P^{-1}, where D is a diagonal matrix of eigenvalues."
        ],
        formulaLatex: "A \\vec{v} = \\lambda \\vec{v} \\iff \\det(A - \\lambda I) = 0",
        formulaSymbols: [
          { symbol: "A", meaning: "Square transformation matrix (n × n)" },
          { symbol: "\\vec{v}", meaning: "Eigenvector invariant in spatial direction" },
          { symbol: "\\lambda", meaning: "Eigenvalue scalar scaling factor" },
          { symbol: "I", meaning: "Identity matrix" }
        ],
        application: {
          title: "Google PageRank & Principal Component Analysis (PCA)",
          thaiTitle: "อัลกอริทึม Google PageRank และการวิเคราะห์ PCA ใน Data Science",
          description: "Google's original PageRank algorithm models web surfing as a Markov transition matrix; the stationary probability distribution is the dominant eigenvector corresponding to eigenvalue lambda = 1.",
          thaiDescription: "อัลกอริทึม PageRank ของ Google จำลองการเปิดเว็บเพจเป็นเมทริกซ์มาร์คอฟ และคำนวณหาความสำคัญของเว็บไซต์จากไอเกนเวกเตอร์เด่นที่มีไอเกนแวลูเท่ากับ 1"
        },
        checkpoint: {
          question: "If matrix A transforms vector v such that A·v = 5v, what is the eigenvalue associated with eigenvector v?",
          thaiQuestion: "หากเมทริกซ์ A แปลงเวกเตอร์ v แล้วได้ผลลัพธ์เป็น A·v = 5v ไอเกนแวลู (Eigenvalue) ที่คู่กับเวกเตอร์ v มีค่าเท่าใด?",
          options: [
            "λ = 0",
            "λ = 1",
            "λ = 5",
            "λ = 25"
          ],
          correctIndex: 2,
          explanation: "By the defining equation A v = λ v, the scalar multiplier is 5, so the eigenvalue λ = 5.",
          thaiExplanation: "จากสมการนิยาม Av = λv ค่าสเกลาร์ที่คูณอยู่คือ 5 ดังนั้นไอเกนแวลู λ = 5"
        }
      }
    ]
  },

  {
    id: "math-trig-shm",
    discipline: "mathematics",
    title: "Simple Harmonic Motion & Trigonometric Dynamics",
    thaiTitle: "การสั่นแบบฮาร์มอนิกอย่างง่ายและพลศาสตร์ตรีโกณมิติ",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Formulate trigonometric sinusoidal oscillators, harmonic differential equations, phase angles, and mechanical energy conservation.",
    thaiOverview: "สร้างฟังก์ชันตรีโกณมิติไซนูซอยด์ แก้สมการเชิงอนุพันธ์ฮาร์มอนิก วิเคราะห์มุมเฟส และการอนุรักษ์พลังงานกล",
    tags: ["Trigonometry", "SHM", "Oscillations", "Harmonics", "Differential Equations"],
    steps: [
      {
        stepNumber: 1,
        title: "The Unit Circle & Sinusoidal Waveforms",
        thaiTitle: "วงกลมหนึ่งหน่วยและรูปคลื่นไซนูซอยด์",
        summary: "Trigonometric functions map rotation angle around the unit circle to orthogonal projections x = cos(θ) and y = sin(θ).",
        thaiSummary: "ฟังก์ชันตรีโกณมิติเชื่อมโยงมุมการหมุนบนวงกลมหนึ่งหน่วยกับพิกัด x = cos(θ) และ y = sin(θ) ก่อให้เกิดรูปคลื่นไซน์ที่เป็นคาบ",
        deepTheory: [
          "Euler's Formula links trigonometry and complex analysis: e^{i\\theta} = \\cos\\theta + i\\sin\\theta.",
          "Fundamental Pythagorean trigonometric identity: \\cos^2\\theta + \\sin^2\\theta = 1. A harmonic wave is parameterized by amplitude A, angular frequency \\omega = 2\\pi f, and phase constant \\phi: x(t) = A\\cos(\\omega t + \\phi)."
        ],
        formulaLatex: "x(t) = A \\cos(\\omega t + \\phi), \\quad \\cos^2\\theta + \\sin^2\\theta = 1",
        formulaSymbols: [
          { symbol: "A", meaning: "Oscillation amplitude (peak displacement)", unit: "m" },
          { symbol: "\\omega", meaning: "Angular frequency (2π / T)", unit: "rad/s" },
          { symbol: "\\phi", meaning: "Phase angle shift at t = 0", unit: "rad" }
        ],
        application: {
          title: "AC Electrical Power Sinusoidal Grid Transmission",
          thaiTitle: "การส่งจ่ายกระแสไฟฟ้าสลับในสายส่งแรงสูง",
          description: "Alternating current (AC) power generators rotate wire coils through magnetic fields, generating sinusoidal voltages V(t) = 311 cos(100π t) Volts (50 Hz, 220V RMS in Thailand).",
          thaiDescription: "เครื่องกำเนิดไฟฟ้าหมุนขดลวดในสนามแม่เหล็กเพื่อสร้างแรงดันไฟฟ้าสลับรูปคลื่นไซน์ความถี่ 50 Hz จ่ายกระแสไฟฟ้าไปยังบ้านเรือนทั่วประเทศ"
        },
        checkpoint: {
          question: "What is the relationship between angular frequency ω and regular frequency f?",
          thaiQuestion: "ความถี่เชิงมุม ω และความถี่รอบ f มีความสัมพันธ์กันตามสมการใด?",
          options: [
            "ω = f / 2π",
            "ω = 2π f",
            "ω = f²",
            "ω = 1 / f"
          ],
          correctIndex: 1,
          explanation: "Each cycle corresponds to 2π radians of rotation, giving ω = 2π f = 2π / T.",
          thaiExplanation: "การเคลื่อนที่ครบ 1 รอบคิดเป็นมุม 2π เรเดียน ดังนั้นความถี่เชิงมุม ω = 2π f"
        }
      },
      {
        stepNumber: 2,
        title: "The Simple Harmonic Oscillator Differential Equation",
        thaiTitle: "สมการเชิงอนุพันธ์ของการสั่นแบบฮาร์มอนิกอย่างง่าย",
        summary: "Hooke's linear restoring force generates an acceleration directly proportional and opposite to displacement: d²x/dt² + ω²x = 0.",
        thaiSummary: "แรงดึงกลับตามกฎของฮุกทำให้เกิดความเร่งที่แปรผันตรงแต่มีทิศตรงข้ามกับการกระจัด นำไปสู่สมการอนุพันธ์ d²x/dt² + ω²x = 0",
        deepTheory: [
          "For a spring-mass system: F = -kx. By Newton's Second Law, m \\frac{d^2x}{dt^2} = -kx \\implies \\frac{d^2x}{dt^2} + \\left(\\frac{k}{m}\\right)x = 0.",
          "Setting \\omega = \\sqrt{k/m}, the general analytical solution is: x(t) = c_1 \\cos(\\omega t) + c_2 \\sin(\\omega t). Taking derivatives yields velocity v(t) = -\\omega A \\sin(\\omega t + \\phi) and acceleration a(t) = -\\omega^2 x(t)."
        ],
        formulaLatex: "\\frac{d^2x}{dt^2} + \\omega^2 x = 0 \\implies x(t) = A \\cos\\left(\\sqrt{\\frac{k}{m}} t + \\phi\\right)",
        formulaSymbols: [
          { symbol: "k", meaning: "Spring stiffness constant", unit: "N/m" },
          { symbol: "m", meaning: "Oscillating body mass", unit: "kg" }
        ],
        application: {
          title: "Skyscraper Tuned Mass Dampers (Taipei 101)",
          thaiTitle: "ลูกตุ้มถ่วงน้ำหนักต้านแผ่นดินไหวในตึกระฟ้าไทเป 101",
          description: "Taipei 101 suspends a 660-tonne steel pendulum tuned to the building's natural oscillation frequency (omega); when typhoons strike, the pendulum sways in anti-phase, damping wind vibration.",
          thaiDescription: "ตึกไทเป 101 แขวนลูกตุ้มเหล็กหนัก 660 ตัน ที่ปรับความถี่ธรรมชาติให้ตรงกับตึก เมื่อเกิดลมพายุ ลูกตุ้มจะแกว่งในทิศตรงข้ามเพื่อสลายพลังงานการสั่นไหว"
        },
        checkpoint: {
          question: "If the mass m attached to a spring is quadrupled (4m), what happens to the oscillation period T?",
          thaiQuestion: "หากเพิ่มมวล m ที่ติดอยู่กับสปริงเป็น 4 เท่า (4m) คาบการสั่น T จะเปลี่ยนแปลงอย่างไร?",
          options: [
            "T halves (T/2)",
            "T doubles (2T)",
            "T quadruples (4T)",
            "T remains unchanged"
          ],
          correctIndex: 1,
          explanation: "The oscillation period is T = 2π √(m/k). Multiplying mass by 4 multiplies the period by √4 = 2.",
          thaiExplanation: "จากสูตรคาบ T = 2π√(m/k) เมื่อมวลเพิ่ม 4 เท่า คาบจะเพิ่มขึ้นเป็น √4 = 2 เท่า"
        }
      },
      {
        stepNumber: 3,
        title: "Energy Conservation in Mechanical Oscillators",
        thaiTitle: "การอนุรักษ์พลังงานในระบบสั่นฮาร์มอนิก",
        summary: "Mechanical energy continuously exchanges between kinetic energy and elastic potential energy, maintaining a constant sum E_total = ½ k A².",
        thaiSummary: "พลังงานกลจะถ่ายโอนสลับกันอย่างสมบูรณ์ระหว่างพลังงานจลน์และพลังงานศักย์ยืดหยุ่น โดยผลรวมคงที่เสมอ E = ½ k A²",
        deepTheory: [
          "Kinetic Energy: K(t) = \\frac{1}{2} m v^2 = \\frac{1}{2} m \\omega^2 A^2 \\sin^2(\\omega t + \\phi) = \\frac{1}{2} k A^2 \\sin^2(\\omega t + \\phi).",
          "Potential Energy: U(t) = \\frac{1}{2} k x^2 = \\frac{1}{2} k A^2 \\cos^2(\\omega t + \\phi).",
          "Total Mechanical Energy: E = K + U = \\frac{1}{2} k A^2 (\\sin^2 + \\cos^2) = \\frac{1}{2} k A^2 = \\text{constant}. At x = 0, energy is purely kinetic (v_max = \\omega A); at x = \\pm A, energy is purely potential."
        ],
        formulaLatex: "E_{\\text{total}} = \\frac{1}{2} m v^2 + \\frac{1}{2} k x^2 = \\frac{1}{2} k A^2 = \\text{constant}",
        formulaSymbols: [
          { symbol: "E_{\\text{total}}", meaning: "Total mechanical energy of harmonic oscillator", unit: "Joules" },
          { symbol: "A", meaning: "Maximum displacement amplitude", unit: "m" }
        ],
        application: {
          title: "Quartz Crystal Microbalance (QCM)",
          thaiTitle: "เครื่องตรวจวัดอนุภาคระดับนาโนกรัมด้วยผลึกควอตซ์ (QCM)",
          description: "Piezoelectric quartz disks oscillate with sub-Hertz precision; when viruses or antibodies bind to the gold electrode, the infinitesimal added mass shifts resonance frequency, allowing nanogram mass detection.",
          thaiDescription: "ผลึกควอตซ์แกว่งด้วยความถี่เรโซแนนซ์ที่แม่นยำสูง เมื่อมีไวรัสหรือโมเลกุลมาเกาะ น้ำหนักที่เพิ่มขึ้นเพียงเล็กน้อยจะเปลี่ยนความถี่การสั่น ช่วยตรวจวัดมวลได้ถึงระดับนาโนกรัม"
        },
        checkpoint: {
          question: "At what position during simple harmonic oscillation is the kinetic energy at its absolute maximum?",
          thaiQuestion: "ณ ตำแหน่งใดของการสั่นแบบฮาร์มอนิกอย่างง่าย ที่พลังงานจลน์จะมีค่าสูงสุด?",
          options: [
            "At maximum positive amplitude (+A)",
            "At maximum negative amplitude (-A)",
            "At the equilibrium position (x = 0)",
            "Halfway between equilibrium and amplitude (x = A/2)"
          ],
          correctIndex: 2,
          explanation: "At the equilibrium position x = 0, elastic potential energy is zero (U = 0), so by energy conservation, kinetic energy reaches its maximum (K = ½ k A²).",
          thaiExplanation: "ที่ตำแหน่งสมดุล x = 0 พลังงานศักย์จะเป็นศูนย์ พลังงานกลทั้งหมดจึงเปลี่ยนเป็นพลังงานจลน์สูงสุด"
        }
      }
    ]
  }
];
