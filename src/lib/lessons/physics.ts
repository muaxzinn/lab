import type { Lesson } from "./types.ts";

export const PHYSICS_LESSONS: Lesson[] = [
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
          { symbol: "t", meaning: "Time", unit: "s" }
        ],
        application: {
          title: "Spacecraft Inertial Coasting",
          thaiTitle: "การแล่นด้วยแรงเฉื่อยของยานอวกาศวอยเอเจอร์",
          description: "NASA's Voyager 1 spacecraft continues traveling at 17 km/s through interstellar space without active engine propulsion because deep space lacks friction or resisting atmospheres.",
          thaiDescription: "ยานวอยเอเจอร์ 1 เดินทางด้วยความเร็วกว่า 17 กม./วินาที ในอวกาศระหว่างดวงดาวโดยไม่ต้องติดเครื่องยนต์ขับดันอย่างต่อเนื่อง เนื่องจากไม่มีแรงเสียดทานของบรรยากาศมาต้านทาน"
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
          thaiExplanation: "แรงแนวฉาก (Normal force) จากผิวโต๊ะมีขนาดเท่ากับและทิศตรงข้ามกับแรงโน้มถ่วง ทำให้แรงลัพธ์เป็นศูนย์ วัตถุจึงอยู่ในสมดุลสถิต"
        }
      },
      {
        stepNumber: 2,
        title: "Second Law: Force as Rate of Momentum Change",
        thaiTitle: "กฎข้อที่ 2: แรงและอัตราการเปลี่ยนโมเมนตัม",
        summary: "The net external force on a system equals the time derivative of its linear momentum: F = dp/dt = ma (for invariant mass).",
        thaiSummary: "แรงลัพธ์ภายนอกที่กระทำต่อระบบ มีค่าเท่ากับอนุพันธ์เทียบเวลาของโมเมนตัมเชิงเส้น F = dp/dt หรือ F = ma ในระบบที่มวลคงที่",
        deepTheory: [
          "Newton originally defined force not merely as mass times acceleration, but as the time rate of change of linear momentum: \\vec{F}_{net} = d\\vec{p}/dt. For classical systems with fixed invariant mass m, this simplifies cleanly to \\vec{F}_{net} = m(d\\vec{v}/dt) = m\\vec{a}.",
          "When mass varies over time (such as rocket propulsion expelling propellant mass at exhaust velocity v_rel), Tsiolkovsky's rocket equation applies: F_{thrust} = v_{ex} (dm/dt) - mg."
        ],
        formulaLatex: "\\vec{F}_{net} = \\frac{d\\vec{p}}{dt} = \\frac{d(m\\vec{v})}{dt} = m\\vec{a} + \\vec{v}\\frac{dm}{dt}",
        formulaSymbols: [
          { symbol: "\\vec{p}", meaning: "Linear momentum vector", unit: "kg·m/s" },
          { symbol: "m", meaning: "Inertial mass", unit: "kg" },
          { symbol: "\\vec{a}", meaning: "Vector acceleration", unit: "m/s²" }
        ],
        application: {
          title: "Falcon 9 Rocket Staging",
          thaiTitle: "การคำนวณแรงขับดันจรวด Falcon 9",
          description: "As Merlin rocket engines burn tonnes of liquid kerosene (RP-1) and liquid oxygen per second, the total mass m drops drastically, causing acceleration a to surge exponentially before main engine cut-off.",
          thaiDescription: "เมื่อเครื่องยนต์จรวดเผาไหม้เชื้อเพลิงและพ่นไอเสียออกไปหลายตันต่อวินาที มวล m รวมของจรวดจะลดลงอย่างรวดเร็ว ส่งผลให้ความเร่ง a พุ่งสูงขึ้นอย่างก้าวกระโดดก่อนการตัดการทำงานของเครื่องยนต์"
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
          thaiExplanation: "จากสมการ a = F/m ความเร่งแปรผกผันกับมวล เมื่อมวลเพิ่มขึ้น 2 เท่า ความเร่งจะลดลงเหลือครึ่งหนึ่ง"
        }
      },
      {
        stepNumber: 3,
        title: "Third Law: Action & Reaction Mutual Pairs",
        thaiTitle: "กฎข้อที่ 3: แรงกิริยาและแรงปฏิกิริยาคู่สมมาตร",
        summary: "Whenever one body exerts a force on a second body, the second body exerts an equal and opposite force on the first.",
        thaiSummary: "เมื่อวัตถุหนึ่งออกแรงกระทำต่ออีกวัตถุหนึ่ง วัตถุที่สองจะออกแรงที่มีขนาดเท่ากันแต่ทิศทางตรงกันข้ามกลับมายังวัตถุแรกเสมอ",
        deepTheory: [
          "Action and reaction forces occur simultaneously on two DIFFERENT interacting bodies. Because they act on different entities, they NEVER cancel each other out internally.",
          "This law enforces the fundamental conservation of total linear momentum in closed physical systems: \\Delta \\vec{P}_{sys} = \\vec{0}."
        ],
        formulaLatex: "\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A} \\implies \\frac{d}{dt}(\\vec{p}_A + \\vec{p}_B) = 0",
        formulaSymbols: [
          { symbol: "\\vec{F}_{A \\to B}", meaning: "Force exerted by body A upon body B", unit: "N" },
          { symbol: "\\vec{F}_{B \\to A}", meaning: "Reaction force exerted by body B upon body A", unit: "N" }
        ],
        application: {
          title: "Ion Thruster Deep Space Propulsion",
          thaiTitle: "เครื่องยนต์ขับดันไอออนในยานสำรวจอวกาศ",
          description: "Ion engines accelerate Xenon ions electrostatically out of the thruster nozzle; the reaction force propels the spacecraft forward with extraordinary fuel efficiency (Isp > 3000 s).",
          thaiDescription: "เครื่องยนต์ไอออนเร่งอนุภาคซีนอนที่มีประจุไฟฟ้าให้พุ่งออกทางหัวฉีด แรงปฏิกิริยาที่เท่ากันจะผลักยานอวกาศไปข้างหน้าด้วยประสิทธิภาพการใช้เชื้อเพลิงที่สูงมาก"
        },
        checkpoint: {
          question: "When a rifle fires a bullet forward, what force acts on the rifle?",
          thaiQuestion: "เมื่อปืนยิงกระสุนพุ่งไปข้างหน้า เกิดแรงใดกระทำต่อตัวปืน?",
          options: [
            "No force acts on the rifle because the bullet is already gone",
            "An equal and backward recoil force acts on the rifle",
            "A force smaller than the bullet's force due to air friction",
            "A downward gravitational force only"
          ],
          correctIndex: 1,
          explanation: "By Newton's Third Law, the explosive expanding gas exerts equal and opposite forces: accelerating the light bullet forward and the heavy rifle backward (recoil).",
          thaiExplanation: "ตามกฎข้อที่ 3 ของนิวตัน ก๊าซที่ขยายตัวจะออกแรงที่มีขนาดเท่ากันแต่ทิศตรงข้าม ดันกระสุนไปข้างหน้าและดันตัวปืนถอยหลัง (แรงถีบกลับ)"
        }
      }
    ]
  },

  {
    id: "phys-projectile-circular",
    discipline: "physics",
    title: "Projectile & Uniform Circular Motion",
    thaiTitle: "การเคลื่อนที่แบบโพรเจกไทล์และการเคลื่อนที่เป็นวงกลม",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Decompose multi-dimensional kinematics into orthogonal independent vectors and analyze centripetal acceleration in curved coordinate systems.",
    thaiOverview: "แยกเวกเตอร์การเคลื่อนที่ 2 มิติอย่างอิสระในแกนตั้งฉาก และวิเคราะห์ความเร่งสู่ศูนย์กลางในระบบพิกัดโค้ง",
    tags: ["Kinematics", "Projectile", "Circular Motion", "Centripetal Force"],
    steps: [
      {
        stepNumber: 1,
        title: "2D Kinematics Decomposition & Parabolic Trajectories",
        thaiTitle: "การแยกเวกเตอร์ 2 มิติและวิถีพาราโบลา",
        summary: "Projectile motion separates into independent uniform motion horizontally and constant gravitational acceleration vertically.",
        thaiSummary: "การเคลื่อนที่แบบโพรเจกไทล์แยกออกเป็น 2 แนวตั้งฉากกันอย่างอิสระ: แนวราบเคลื่อนที่ด้วยความเร็วคงที่ และแนวดิ่งเคลื่อนที่ด้วยความเร่งโน้มถ่วงคงที่",
        deepTheory: [
          "Galileo's principle of superposition establishes that perpendicular kinematic components operate independently without mutual interference.",
          "Horizontal position evolves linearly: x(t) = v_0 \\cos\\theta \\cdot t. Vertical position follows quadratic free-fall: y(t) = v_0 \\sin\\theta \\cdot t - \\frac{1}{2}gt^2. Eliminating t yields a concave-down parabolic trajectory: y(x) = x\\tan\\theta - \\frac{g x^2}{2v_0^2\\cos^2\\theta}."
        ],
        formulaLatex: "y(x) = x \\tan\\theta - \\frac{g x^2}{2 v_0^2 \\cos^2\\theta}",
        formulaSymbols: [
          { symbol: "v_0", meaning: "Initial launch velocity", unit: "m/s" },
          { symbol: "\\theta", meaning: "Launch angle above horizontal", unit: "rad or deg" },
          { symbol: "g", meaning: "Gravitational acceleration (9.81 m/s²)", unit: "m/s²" }
        ],
        application: {
          title: "Artillery Ballistic Trajectory Fire Control",
          thaiTitle: "ระบบควบคุมการยิงปืนใหญ่วิถีโค้ง",
          description: "Modern naval artillery and ballistic fire-control computers calculate elevation angle theta, muzzle velocity, and aerodynamic drag coefficients to land shells accurately at 40+ km distances.",
          thaiDescription: "คอมพิวเตอร์ควบคุมการยิงของปืนใหญ่คำนวณมุมยิงและความเร็วต้นเพื่อหักล้างผลของแรงโน้มถ่วงและแรงต้านอากาศ ทำให้กระสุนตกตรงเป้าหมายในระยะไกลกว่า 40 กม."
        },
        checkpoint: {
          question: "At the peak of a projectile's flight, what is its vertical velocity component vy?",
          thaiQuestion: "ณ จุดสูงสุดของวิถีการเคลื่อนที่แบบโพรเจกไทล์ ความเร็วในแนวดิ่ง vy มีค่าเท่าใด?",
          options: [
            "Equal to v0",
            "Zero (0 m/s)",
            "Maximum positive",
            "Equal to horizontal velocity vx"
          ],
          correctIndex: 1,
          explanation: "At the apex, the vertical velocity instantaneously transitions from upward to downward, so vy = 0 m/s while horizontal velocity vx = v0 cos(theta) remains non-zero.",
          thaiExplanation: "ณ จุดสูงสุด ความเร็วแนวดิ่งจะเปลี่ยนทิศทางจึงมีค่าเป็น 0 ชั่วขณะ ในขณะที่ความเร็วแนวราบยังคงเท่ากับ v0 cos(theta)"
        }
      },
      {
        stepNumber: 2,
        title: "Flight Duration, Max Height & Optimal Range",
        thaiTitle: "เวลาในการเคลื่อนที่ ความสูงสูงสุด และระยะตกไกลสุด",
        summary: "Total flight time is determined by vertical launch velocity, while maximum horizontal range occurs at an optimal launch angle of 45°.",
        thaiSummary: "เวลาลอยตัวในอากาศถูกกำหนดด้วยความเร็วต้นในแนวดิ่ง และระยะตกไกลสุดบนพื้นราบจะเกิดขึ้นเมื่อมุมยิงเท่ากับ 45 องศา",
        deepTheory: [
          "Setting y(t) = 0 yields the total flight time: t_{flight} = \\frac{2 v_0 \\sin\\theta}{g}. Peak height reached at t_{flight}/2 is: H_{max} = \\frac{v_0^2 \\sin^2\\theta}{2g}.",
          "Horizontal range is R = v_x \\cdot t_{flight} = \\frac{v_0^2 \\sin(2\\theta)}{g}. Differentiating dR/d\\theta = 0 reveals that \\sin(2\\theta) = 1, meaning \\theta = 45^\\circ achieves the theoretical maximum range on flat terrain in a vacuum."
        ],
        formulaLatex: "R = \\frac{v_0^2 \\sin(2\\theta)}{g}, \\quad H_{\\max} = \\frac{v_0^2 \\sin^2\\theta}{2g}",
        formulaSymbols: [
          { symbol: "R", meaning: "Horizontal range on flat terrain", unit: "m" },
          { symbol: "H_{\\max}", meaning: "Maximum apex height", unit: "m" }
        ],
        application: {
          title: "Olympic Javelin & Shot Put Launch Optimization",
          thaiTitle: "การปรับมุมพุ่งแหลนและทุ่มน้ำหนักในกีฬาโอลิมปิก",
          description: "Olympic throwers release javelins at 34°-37° rather than 45° because the release height is above ground level (h0 ~ 2m) and aerodynamic lift generates upward flight buoyancy.",
          thaiDescription: "นักกีฬาพุ่งแหลนจะปล่อยแหลนที่มุม 34°-37° ซึ่งต่ำกว่า 45° เล็กน้อย เนื่องจากจุดปล่อยอยู่สูงกว่าพื้นดิน (ประมาณ 2 เมตร) และมีแรงยกตามหลักอากาศพลศาสตร์ช่วยพยุงแหลน"
        },
        checkpoint: {
          question: "Ignoring air resistance on flat ground, which two launch angles yield the exact same horizontal range?",
          thaiQuestion: "หากไม่คิดแรงต้านอากาศ มุมยิงคู่ใดที่ให้ระยะตกในแนวราบเท่ากันพอดี?",
          options: [
            "30° and 60°",
            "20° and 50°",
            "45° and 55°",
            "15° and 85°"
          ],
          correctIndex: 0,
          explanation: "Because sin(2θ) = sin(180° - 2θ) = sin(2(90° - θ)), complementary launch angles that sum to 90° (e.g. 30° and 60°) produce identical horizontal ranges.",
          thaiExplanation: "เนื่องจาก sin(2θ) = sin(2(90° - θ)) มุมยิงที่เป็นมุมประกอบมุมฉากรวมกันได้ 90 องศา เช่น 30° กับ 60° จะให้ระยะตกไกลเท่ากันเสมอ"
        }
      },
      {
        stepNumber: 3,
        title: "Uniform Circular Motion & Centripetal Acceleration",
        thaiTitle: "การเคลื่อนที่เป็นวงกลมสม่ำเสมอและความเร่งสู่ศูนย์กลาง",
        summary: "Even at constant speed, circular motion requires a continuous inward centripetal acceleration ac = v²/r perpendicular to velocity.",
        thaiSummary: "แม้ว่าอัตราเร็วจะคงที่ การเคลื่อนที่เป็นวงกลมจะต้องมีความเร่งสู่ศูนย์กลาง ac = v²/r คอยเปลี่ยนทิศทางของความเร็วอยู่ตลอดเวลา",
        deepTheory: [
          "Velocity is a vector quantity; changing its spatial direction requires acceleration even when magnitude |v| is strictly invariant.",
          "In polar coordinates, the position vector \\vec{r} = r \\hat{r} has derivatives: \\vec{v} = r\\dot{\\theta}\\hat{\\theta} and \\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{r} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{\\theta}. For uniform circular motion (r = \\text{const}, \\dot{\\theta} = \\omega = \\text{const}), this simplifies to inward radial acceleration: \\vec{a}_c = -\\omega^2 r \\hat{r} = -\\frac{v^2}{r}\\hat{r}."
        ],
        formulaLatex: "a_c = \\frac{v^2}{r} = \\omega^2 r = \\frac{4\\pi^2 r}{T^2}",
        formulaSymbols: [
          { symbol: "a_c", meaning: "Centripetal acceleration directed inward to center", unit: "m/s²" },
          { symbol: "\\omega", meaning: "Angular velocity (d\\theta/dt)", unit: "rad/s" },
          { symbol: "T", meaning: "Period of one complete revolution", unit: "s" }
        ],
        application: {
          title: "Banked Highway Curves & Roller Coasters",
          thaiTitle: "การยกโค้งถนนและรางรถไฟเหาะตีลังกา",
          description: "Civil engineers bank highway turns at an angle theta such that the normal force component F_N sin(theta) provides the required centripetal acceleration, allowing vehicles to corner safely without relying on tire friction.",
          thaiDescription: "วิศวกรโยธายกขอบถนนทางโค้งทำมุมเอียง theta เพื่อให้แรงแนวฉากจากผิวถนนทำหน้าที่เป็นแรงสู่ศูนย์กลาง ช่วยให้รถเข้าโค้งได้อย่างปลอดภัยแม้ถนนจะลื่น"
        },
        checkpoint: {
          question: "If a car negotiates a circular turn at double the speed (2v), by what factor does the required centripetal force increase?",
          thaiQuestion: "หากรถยนต์แล่นเข้าโค้งวงกลมด้วยความเร็วเพิ่มขึ้นเป็น 2 เท่า (2v) แรงสู่ศูนย์กลางที่ต้องใช้จะเพิ่มขึ้นกี่เท่า?",
          options: [
            "2 times",
            "4 times (quadrupled)",
            "Square root of 2",
            "It remains unchanged"
          ],
          correctIndex: 1,
          explanation: "Centripetal force is proportional to the square of speed: Fc = m v² / r. Doubling speed quadruples (4x) the required friction or banking force.",
          thaiExplanation: "จากสูตร Fc = mv²/r แรงสู่ศูนย์กลางแปรผันตรงกับความเร็วยกกำลังสอง การเพิ่มความเร็วเป็น 2 เท่า จึงต้องใช้แรงสู่ศูนย์กลางเพิ่มขึ้นถึง 4 เท่า"
        }
      }
    ]
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
          "The eccentricity e quantifies orbital elongation: e = \\sqrt{1 - b^2/a^2}. For a circle e=0; for Earth e=0.0167; for comets e approaches 1.0."
        ],
        formulaLatex: "r(\\theta) = \\frac{a(1 - e^2)}{1 + e \\cos \\theta}",
        formulaSymbols: [
          { symbol: "r(\\theta)", meaning: "Distance from focus to orbiting body at true anomaly \\theta", unit: "m or AU" },
          { symbol: "a", meaning: "Semi-major axis", unit: "m or AU" },
          { symbol: "e", meaning: "Orbital eccentricity", unit: "dimensionless" }
        ],
        application: {
          title: "GPS Satellite Constellation Orbits",
          thaiTitle: "วงโคจรดาวเทียมนำทาง GPS",
          description: "24+ operational GPS satellites orbit in near-circular Medium Earth Orbits (MEO, altitude ~20,200 km) with low eccentricity (e < 0.02) to maintain predictable atomic clock synchronization.",
          thaiDescription: "ดาวเทียม GPS กว่า 24 ดวงโคจรในวงโคจรระดับกลางเกือบกลม (e < 0.02) เพื่อให้การซิงโครไนซ์สัญญาณนาฬิกาอะตอมมีความแม่นยำสูงสุด"
        },
        checkpoint: {
          question: "Where is the central star located in an elliptical planetary orbit?",
          thaiQuestion: "ในวงโคจรทรงรีของดาวเคราะห์ ดาวฤกษ์ศูนย์กลางจะตั้งอยู่ที่ตำแหน่งใด?",
          options: [
            "At the exact geometric center of the ellipse",
            "At one of the two foci of the ellipse",
            "At the perihelion point",
            "At the co-vertex of the minor axis"
          ],
          correctIndex: 1,
          explanation: "Kepler's First Law explicitly states that the primary gravitating mass sits at one of the ellipse's two focal points, not at the geometric center.",
          thaiExplanation: "กฎข้อที่ 1 ของเคปเลอร์ระบุชัดเจนว่า ดาวฤกษ์จะอยู่ที่จุดโฟกัสจุดหนึ่งของวงรี ไม่ใช่ที่จุดศูนย์กลางทางเรขาคณิต"
        }
      },
      {
        stepNumber: 2,
        title: "Kepler's Second Law: Areal Velocity Conservation",
        thaiTitle: "กฎข้อที่ 2 ของเคปเลอร์: การกวาดพื้นที่เท่ากันในเวลาเท่ากัน",
        summary: "A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time.",
        thaiSummary: "เส้นตรงที่ลากเชื่อมระหว่างดวงอาทิตย์กับดาวเคราะห์ จะกวาดพื้นที่ได้เท่ากันในระยะเวลาที่เท่ากัน",
        deepTheory: [
          "This law is an immediate consequence of angular momentum conservation in a central gravitational field: \\vec{\\tau} = \\vec{r} \\times \\vec{F} = \\vec{0}.",
          "Because angular momentum L = m r^2 \\dot{\\theta} is strictly constant, areal velocity dA/dt = L / (2m) is invariant. Consequently, planets travel fastest at perihelion (closest approach) and slowest at aphelion (farthest distance)."
        ],
        formulaLatex: "\\frac{dA}{dt} = \\frac{1}{2} r^2 \\frac{d\\theta}{dt} = \\frac{L}{2m} = \\text{constant}",
        formulaSymbols: [
          { symbol: "dA/dt", meaning: "Areal velocity", unit: "m²/s" },
          { symbol: "L", meaning: "Orbital angular momentum", unit: "kg·m²/s" }
        ],
        application: {
          title: "Halley's Comet Perihelion Acceleration",
          thaiTitle: "ความเร็วของดาวหางฮัลเลย์ ณ จุดใกล้ดวงอาทิตย์ที่สุด",
          description: "Halley's comet accelerates to 54.6 km/s at perihelion (0.586 AU from the Sun) but slows to just 0.91 km/s at aphelion (35.1 AU near Pluto's orbit).",
          thaiDescription: "ดาวหางฮัลเลย์มีความเร็วพุ่งสูงถึง 54.6 กม./วินาที เมื่อเข้าใกล้ดวงอาทิตย์ที่สุด แต่จะชะลอความเร็วเหลือเพียง 0.91 กม./วินาที เมื่ออยู่ที่จุดไกลสุดขอบระบบสุริยะ"
        },
        checkpoint: {
          question: "At which point in its elliptical orbit does a planet attain its maximum orbital velocity?",
          thaiQuestion: "ดาวเคราะห์จะเคลื่อนที่ด้วยอัตราเร็วสูงสุด ณ ตำแหน่งใดในวงโคจรทรงรี?",
          options: [
            "At aphelion (farthest distance from the Sun)",
            "At perihelion (closest distance to the Sun)",
            "At the minor axis intersection",
            "Speed is constant throughout the orbit"
          ],
          correctIndex: 1,
          explanation: "By conservation of angular momentum L = m*r*v, when distance r is minimal at perihelion, velocity v must reach its maximum.",
          thaiExplanation: "จากการอนุรักษ์โมเมนตัมเชิงมุม L = mvr เมื่อระยะห่าง r สั้นที่สุดที่จุดเพอริฮีเลียน ความเร็ว v จึงมีค่าสูงสุด"
        }
      },
      {
        stepNumber: 3,
        title: "Kepler's Third Law: Harmonic Period-Distance Ratio",
        thaiTitle: "กฎข้อที่ 3 ของเคปเลอร์: กฎแห่งความสอดคล้องของคาบ",
        summary: "The square of the orbital period T is directly proportional to the cube of the semi-major axis a: T² / a³ = constant.",
        thaiSummary: "กำลังสองของคาบการโคจร (T) จะแปรผันตรงกับกำลังสามของกึ่งแกนเอก (a): T² / a³ มีค่าคงที่เสมอ",
        deepTheory: [
          "By equating Newton's gravitational attraction F = G M m / r^2 with centripetal acceleration m v^2 / r for circular approximation, one derives: T^2 = (4\\pi^2 / G(M+m)) a^3.",
          "When measured in Earth years and Astronomical Units (AU), for all planets orbiting our Sun: T^2 / a^3 \\approx 1.000."
        ],
        formulaLatex: "T^2 = \\left( \\frac{4\\pi^2}{G(M + m)} \\right) a^3",
        formulaSymbols: [
          { symbol: "T", meaning: "Orbital period", unit: "s or years" },
          { symbol: "a", meaning: "Semi-major axis", unit: "m or AU" },
          { symbol: "G", meaning: "Universal gravitational constant (6.674×10⁻¹¹)", unit: "N·m²/kg²" },
          { symbol: "M", meaning: "Central body mass (Sun)", unit: "kg" }
        ],
        application: {
          title: "Geostationary Satellite Placement",
          thaiTitle: "การคำนวณวงโคจรดาวเทียมค้างฟ้า (GEO)",
          description: "Setting T = 23.93 hours (1 sidereal day) dictates that communication satellites must orbit at an exact orbital radius of 42,164 km (altitude 35,786 km) to remain stationary above the equator.",
          thaiDescription: "เมื่อกำหนดคาบ T = 23.93 ชั่วโมง (1 วันดาราคติ) ดาวเทียมสื่อสารต้องอยู่ที่ระยะ 42,164 กม. จากใจกลางโลกพอดี เพื่อให้หมุนไปพร้อมกับโลกและอยู่นิ่งสัมพัทธ์กับพื้นดิน"
        },
        checkpoint: {
          question: "If an exoplanet orbits a sun-like star at a semi-major axis of a = 4 AU, what is its orbital period in Earth years?",
          thaiQuestion: "หากดาวเคราะห์นอกระบบสุริยะมีกึ่งแกนเอก a = 4 AU จะมีคาบการโคจรรอบดาวฤกษ์กี่ปีโลก?",
          options: [
            "4 years",
            "8 years",
            "16 years",
            "64 years"
          ],
          correctIndex: 1,
          explanation: "By Kepler's Third Law (T² = a³), T = √(4³) = √(64) = 8 Earth years.",
          thaiExplanation: "จากกฎข้อที่ 3 ของเคปเลอร์ T² = a³ จะได้ T = √(4³) = √64 = 8 ปีโลก"
        }
      }
    ]
  },

  {
    id: "phys-kirchhoff",
    discipline: "physics",
    title: "Kirchhoff's DC Circuit Laws & Nodal Analysis",
    thaiTitle: "กฎของเคอร์ชฮอฟฟ์และการวิเคราะห์วงจรไฟฟ้ากระแสตรง",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Formulate electrical networks through Kirchhoff's Current and Voltage Laws, and solve linear circuit matrices via Modified Nodal Analysis.",
    thaiOverview: "สร้างสมการโครงข่ายไฟฟ้าด้วยกฎกระแสและแรงดันของเคอร์ชฮอฟฟ์ และแก้สมการเมทริกซ์วงจรด้วย Modified Nodal Analysis",
    tags: ["Circuits", "Kirchhoff", "Ohm", "MNA Solver", "Electronics"],
    steps: [
      {
        stepNumber: 1,
        title: "Kirchhoff's Current Law (KCL) & Conservation of Charge",
        thaiTitle: "กฎกระแสไฟฟ้าของเคอร์ชฮอฟฟ์ (KCL) และการอนุรักษ์ประจุ",
        summary: "The algebraic sum of currents entering any electrical node must strictly equal the sum of currents leaving: Σ I_in = Σ I_out.",
        thaiSummary: "ผลรวมทางพีชคณิตของกระแสไฟฟ้าที่ไหลเข้าสู่จุดต่อ (Node) ใดๆ จะต้องเท่ากับผลรวมของกระแสไฟฟ้าที่ไหลออกจากจุดต่อนั้นเสมอ",
        deepTheory: [
          "Kirchhoff's Current Law directly formalizes the conservation of electric charge in lumped element networks: \\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot \\vec{J} = 0.",
          "At any discrete junction node k where multiple branch conductors connect, charges cannot accumulate indefinitely. Thus: \\sum_{j=1}^M I_{kj} = 0, where currents entering are designated positive and exiting negative."
        ],
        formulaLatex: "\\sum_{k=1}^N I_k = 0 \\iff \\sum I_{\\text{in}} = \\sum I_{\\text{out}}",
        formulaSymbols: [
          { symbol: "I_k", meaning: "Branch current incident on node k", unit: "A (Amperes)" },
          { symbol: "N", meaning: "Total number of conductive branches meeting at node" }
        ],
        application: {
          title: "Microprocessor Power Delivery Networks (PDN)",
          thaiTitle: "โครงข่ายจ่ายพลังงานในชิปซีพียู (PDN)",
          description: "Modern 5nm microprocessors draw 100+ Amperes across millions of microscopic power vias; motherboard PDN engineers apply KCL to balance current density and prevent electromigration burnout.",
          thaiDescription: "ชิปประมวลผลขนาด 5 นาโนเมตร ดึงกระแสไฟฟ้ากว่า 100 แอมแปร์ผ่านโครงข่ายสายไฟขนาดจิ๋ว วิศวกรใช้ KCL คำนวณความหนาแน่นของกระแสเพื่อป้องกันสายไฟไหม้เสียหาย"
        },
        checkpoint: {
          question: "Three wires enter a node carrying 2 A, 3 A, and 4 A. If only one wire leaves the node, what current must it carry?",
          thaiQuestion: "มีสายไฟ 3 เส้นนำกระแส 2 A, 3 A และ 4 A ไหลเข้าสู่จุดต่อ หากมีสายไฟไหลออกเพียงเส้นเดียว สายไฟนั้นต้องมีกระแสไหลผ่านเท่าใด?",
          options: [
            "1 A",
            "5 A",
            "9 A",
            "12 A"
          ],
          correctIndex: 2,
          explanation: "By KCL, Σ I_out = Σ I_in = 2 A + 3 A + 4 A = 9 A.",
          thaiExplanation: "ตามกฎ KCL กระแสไหลออกทั้งหมดต้องเท่ากับกระแสไหลเข้า: 2 + 3 + 4 = 9 แอมแปร์"
        }
      },
      {
        stepNumber: 2,
        title: "Kirchhoff's Voltage Law (KVL) & Energy Conservation",
        thaiTitle: "กฎแรงดันไฟฟ้าของเคอร์ชฮอฟฟ์ (KVL) และการอนุรักษ์พลังงาน",
        summary: "The directed sum of electrical potential differences around any closed circuit loop is zero: Σ V_loop = 0.",
        thaiSummary: "ผลรวมทางพีชคณิตของความต่างศักย์ไฟฟ้ารอบลูปวงจรปิดใดๆ จะมีค่าเท่ากับศูนย์เสมอ ตามกฎการอนุรักษ์พลังงาน",
        deepTheory: [
          "Electrostatic forces are conservative vector fields: \\oint_C \\vec{E} \\cdot d\\vec{\\ell} = 0 (Faraday's law under quasi-static DC conditions where \\partial \\vec{B}/\\partial t = 0).",
          "Traveling clockwise or counter-clockwise around any closed loop, the sum of voltage sources (potential gains) must equal the sum of resistive IR drops (potential drops): \\sum V_{sources} = \\sum I R."
        ],
        formulaLatex: "\\oint_C \\vec{E} \\cdot d\\vec{\\ell} = 0 \\implies \\sum_{k=1}^M V_k = 0",
        formulaSymbols: [
          { symbol: "V_k", meaning: "Potential difference across branch k along the loop", unit: "V (Volts)" }
        ],
        application: {
          title: "Electric Vehicle Battery Pack Cell Balancing",
          thaiTitle: "ระบบปรับสมดุลแรงดันในชุดแบตเตอรี่รถยนต์ไฟฟ้า (BMS)",
          description: "Battery Management Systems (BMS) in Tesla and BYD vehicles monitor hundreds of series-connected lithium cells using KVL loops to detect individual cell overvoltage and prevent thermal runaway.",
          thaiDescription: "ระบบ BMS ในรถยนต์ไฟฟ้าใช้การวัดแรงดันตามกฎ KVL รอบเซลล์ลิเทียมไอออนที่ต่ออนุกรมกันหลายร้อยเซลล์ เพื่อป้องกันเซลล์ใดเซลล์หนึ่งโอเวอร์ชาร์จจนเกิดความร้อนสะสม"
        },
        checkpoint: {
          question: "A single loop circuit contains a 12 V battery and two resistors. If the voltage drop across the first resistor is 4 V, what is the drop across the second?",
          thaiQuestion: "วงจรปิดแบบลูปเดี่ยวประกอบด้วยแบตเตอรี่ 12 V และตัวต้านทาน 2 ตัว หากตัวต้านทานตัวแรกมีแรงดันตกคร่อม 4 V ตัวที่สองจะมีแรงดันตกคร่อมเท่าใด?",
          options: [
            "4 V",
            "8 V",
            "12 V",
            "16 V"
          ],
          correctIndex: 1,
          explanation: "By KVL: V_source - V1 - V2 = 0 → 12 V - 4 V - V2 = 0 → V2 = 8 V.",
          thaiExplanation: "ตามกฎ KVL: ผลรวมแรงดันตกคร่อมต้องเท่ากับแรงดันแหล่งจ่าย 12 V - 4 V = 8 V"
        }
      },
      {
        stepNumber: 3,
        title: "Modified Nodal Analysis (MNA) & Linear Matrix Solving",
        thaiTitle: "การวิเคราะห์จุดต่อแบบดัดแปลง (MNA) และการแก้สมการเมทริกซ์",
        summary: "Formulate systematic circuit equations into a matrix system G·v = i to solve arbitrary node voltages simultaneously.",
        thaiSummary: "แปลงวงจรไฟฟ้าเป็นระบบสมการเมทริกซ์เชิงเส้น G·v = i เพื่อคำนวณศักย์ไฟฟ้าทุกจุดต่อและกระแสทุกกิ่งพร้อมกันใน SPICE",
        deepTheory: [
          "Modified Nodal Analysis (MNA) is the algorithmic heart of industry-standard circuit simulators (SPICE, LTspice).",
          "The network is described by an augmented linear matrix equation: [G, B; C, D] [v; j] = [i; e], where G is the conductance matrix derived from KCL, B and C handle independent voltage sources, and v represents unknown node potentials relative to ground."
        ],
        formulaLatex: "\\begin{bmatrix} G & B \\\\ C & D \\end{bmatrix} \\begin{bmatrix} \\mathbf{v} \\\\ \\mathbf{j} \\end{bmatrix} = \\begin{bmatrix} \\mathbf{i} \\\\ \\mathbf{e} \\end{bmatrix}",
        formulaSymbols: [
          { symbol: "G", meaning: "Conductance matrix (Siemens, 1/\\Omega)" },
          { symbol: "\\mathbf{v}", meaning: "Vector of unknown node voltages" },
          { symbol: "\\mathbf{i}", meaning: "Vector of independent current source injections" }
        ],
        application: {
          title: "SPICE Electronic Design Automation (EDA)",
          thaiTitle: "โปรแกรมจำลองวงจรอิเล็กทรอนิกส์ SPICE และ EDA",
          description: "Engineers designing GPUs and smartphones at NVIDIA and Apple use SPICE MNA solvers to simulate analog timing and signal integrity across billions of transistors before fabricating silicon wafers.",
          thaiDescription: "วิศวกรออกแบบชิปที่ Apple และ NVIDIA ใช้ตัวแก้ระบบสมการ MNA ในโปรแกรม SPICE เพื่อจำลองการทำงานของทรานซิสเตอร์หลายพันล้านตัวก่อนผลิตเวเฟอร์จริง"
        },
        checkpoint: {
          question: "In Nodal Analysis, what node serves as the universal reference with an assigned potential of 0 V?",
          thaiQuestion: "ในการวิเคราะห์แบบ Nodal Analysis จุดต่อใดทำหน้าที่เป็นจุดอ้างอิงที่มีศักย์ไฟฟ้า 0 V?",
          options: [
            "The node with the highest resistance",
            "The ground node (GND)",
            "The battery positive terminal",
            "Any floating unconnected node"
          ],
          correctIndex: 1,
          explanation: "The ground node (GND) is chosen as the universal zero-potential datum reference against which all other node voltages are solved.",
          thaiExplanation: "จุดต่อกราวด์ (GND) ถูกกำหนดให้เป็นจุดอ้างอิงที่มีศักย์ไฟฟ้า 0 โวลต์ เพื่อใช้วัดความต่างศักย์ของจุดต่ออื่นๆ ทั้งหมด"
        }
      }
    ]
  }
];
