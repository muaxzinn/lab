import type { Lesson } from "./types.ts";

export const CS_LESSONS: Lesson[] = [
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
          "Functional Completeness: Any Boolean function can be implemented using exclusively NAND gates or exclusively NOR gates, which dramatically simplifies integrated circuit silicon lithography."
        ],
        formulaLatex: "\\overline{A \\cdot B} = \\bar{A} + \\bar{B} \\quad \\text{and} \\quad \\overline{A + B} = \\bar{A} \\cdot \\bar{B}",
        formulaSymbols: [
          { symbol: "A, B", meaning: "Binary inputs \\in {0, 1}" },
          { symbol: "\\cdot", meaning: "Boolean AND" },
          { symbol: "+", meaning: "Boolean OR" },
          { symbol: "\\bar{A}", meaning: "Boolean NOT" }
        ],
        application: {
          title: "Flash Memory NAND Cell Arrays",
          thaiTitle: "หน่วยความจำ NAND Flash ใน SSD",
          description: "Solid State Drives (SSDs) and smartphone storage store billions of bits using floating-gate and charge-trap NAND transistor cell arrays for non-volatile, high-density data persistence.",
          thaiDescription: "ไดรฟ์ SSD และสมาร์ตโฟนบันทึกข้อมูลระดับเทระไบต์ด้วยทรานซิสเตอร์แบบ NAND Flash ซึ่งเก็บประจุไฟฟ้าไว้ได้แม้ไม่มีกระแสไฟฟ้าหล่อเลี้ยง"
        },
        checkpoint: {
          question: "According to De Morgan's Law, what is the equivalent Boolean expression for NOT(A AND B)?",
          thaiQuestion: "ตามกฎของเดอมอร์แกน นิพจน์ NOT(A AND B) มีค่าเทียบเท่ากับนิพจน์ใด?",
          options: [
            "(NOT A) AND (NOT B)",
            "(NOT A) OR (NOT B)",
            "A OR B",
            "A AND (NOT B)"
          ],
          correctIndex: 1,
          explanation: "De Morgan's First Law states: ~(A · B) = ~A + ~B. The negation of a conjunction is the disjunction of the negations.",
          thaiExplanation: "กฎของเดอมอร์แกนระบุว่า การนิเสธของ AND จะเท่ากับ OR ของนิเสธ: ~(A · B) = ~A + ~B"
        }
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
          "Cascading N Full Adders produces an N-bit Ripple Carry Adder capable of integer addition inside the CPU Arithmetic Logic Unit (ALU)."
        ],
        formulaLatex: "S = A \\oplus B \\oplus C_{in}, \\quad C_{out} = (A \\cdot B) + (C_{in} \\cdot (A \\oplus B))",
        formulaSymbols: [
          { symbol: "S", meaning: "Sum bit output \\in {0, 1}" },
          { symbol: "C_{out}", meaning: "Carry-out bit to next higher stage" },
          { symbol: "C_{in}", meaning: "Carry-in bit from previous stage" },
          { symbol: "\\oplus", meaning: "Exclusive OR (XOR) operator" }
        ],
        application: {
          title: "CPU Arithmetic Logic Unit (ALU)",
          thaiTitle: "หน่วยประมวลผลคณิตศาสตร์ ALU ในซีพียู",
          description: "Modern 64-bit processors (x86-64, ARM Cortex) utilize advanced Carry-Lookahead Adders (CLA) based on these Boolean logic equations to perform billions of 64-bit integer additions every second.",
          thaiDescription: "ซีพียูสมัยใหม่ขนาด 64 บิต ใช้โครงสร้างวงจรบวกแบบทดล่วงหน้า (Carry-Lookahead Adder) เพื่อคำนวณทางคณิตศาสตร์ได้หลายพันล้านคำสั่งต่อวินาที"
        },
        checkpoint: {
          question: "When adding two binary bits A = 1 and B = 1 in a Half Adder, what are the Sum and Carry outputs?",
          thaiQuestion: "เมื่อบวกเลขฐานสอง A = 1 และ B = 1 ในวงจร Half Adder จะได้ค่าผลบวก (Sum) และตัวทด (Carry) เป็นเท่าใด?",
          options: [
            "Sum = 1, Carry = 0",
            "Sum = 0, Carry = 1 (Binary 10₂ = Decimal 2)",
            "Sum = 1, Carry = 1",
            "Sum = 0, Carry = 0"
          ],
          correctIndex: 1,
          explanation: "1 + 1 = 10 in binary. The XOR gate outputs Sum = 1 ⊕ 1 = 0, and the AND gate outputs Carry = 1 · 1 = 1.",
          thaiExplanation: "1 + 1 = 10 ในเลขฐานสอง เกต XOR ให้ผลบวก Sum = 0 และเกต AND ให้ตัวทด Carry = 1"
        }
      },
      {
        stepNumber: 3,
        title: "Sequential Logic: Latches, Flip-Flops & Registers",
        thaiTitle: "วงจรตรรกะเชิงลำดับ แลตช์ ฟลิปฟลอป และรีจิสเตอร์",
        summary: "Feedback loops transform combinational logic into bistable memory elements synchronized by a global clock signal.",
        thaiSummary: "การป้อนกลับสัญญาณ (Feedback) เปลี่ยนวงจรเกตให้กลายเป็นหน่วยความจำที่สามารถกักเก็บสถานะ 1 บิต ซิงโครไนซ์ด้วยสัญญาณนาฬิกา",
        deepTheory: [
          "Combinational logic outputs depend strictly on current inputs; Sequential logic contains internal feedback memory depending on past state history.",
          "SR Latch: Cross-coupled NOR gates retain state Q. Set S=1 forces Q=1; Reset R=1 forces Q=0; S=R=0 retains prior memory; S=R=1 is forbidden (metastable contention).",
          "D Flip-Flop: Clocks data input D on rising edge (\\uparrow clock), forming the fundamental 1-bit memory cell of CPU registers and SRAM caches."
        ],
        formulaLatex: "Q_{\\text{next}} = D \\quad (\\text{at rising edge } \\uparrow \\text{clk}), \\quad Q = \\overline{R + \\bar{Q}}",
        formulaSymbols: [
          { symbol: "Q", meaning: "Stored binary memory state output bit" },
          { symbol: "D", meaning: "Data input sampled on clock transition" },
          { symbol: "\\text{clk}", meaning: "Periodic square-wave clock pulse" }
        ],
        application: {
          title: "CPU L1 Hardware Cache Registers",
          thaiTitle: "หน่วยความจำแคชระดับ L1 ในชิปประมวลผล",
          description: "Ultra-fast 6-transistor (6T) SRAM cells built from cross-coupled inverters store instructions inside CPU L1 caches, achieving sub-nanosecond access latencies at 5+ GHz clock frequencies.",
          thaiDescription: "แคช L1 ภายในซีพียูสร้างจากวงจรฟลิปฟลอปแบบ 6T SRAM ทำให้เข้าถึงข้อมูลได้รวดเร็วในระดับต่ำกว่า 1 นาโนวินาที ที่ความถี่สัญญาณนาฬิกากว่า 5 GHz"
        },
        checkpoint: {
          question: "What hardware component synchronizes state transitions across billions of flip-flops in a modern computer CPU?",
          thaiQuestion: "อุปกรณ์ฮาร์ดแวร์ใดทำหน้าที่ส่งสัญญาณจังหวะเพื่อซิงโครไนซ์การเปลี่ยนสถานะของฟลิปฟลอปหลายพันล้านตัวในซีพียู?",
          options: [
            "The Power Supply Unit (PSU)",
            "The Global Clock Oscillator (สัญญาณนาฬิกา)",
            "The Hard Drive Motor",
            "The GPU cooling fan"
          ],
          correctIndex: 1,
          explanation: "The global clock oscillator broadcasts a high-frequency square wave (e.g. 3-5 GHz) triggering synchronous edge-triggered flip-flop updates across the entire microprocessor.",
          thaiExplanation: "สัญญาณนาฬิกา (Clock) ปล่อยคลื่นสี่เหลี่ยมความถี่สูงเพื่อควบคุมให้ทุกทรานซิสเตอร์ในซีพียูอัปเดตข้อมูลพร้อมกันอย่างเป็นจังหวะ"
        }
      }
    ]
  },

  {
    id: "cs-data-structures",
    discipline: "cs",
    title: "Fundamental Data Structures: Trees, Graphs & Hash Tables",
    thaiTitle: "โครงสร้างข้อมูลพื้นฐาน: ทรี กราฟ และตารางแฮช",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Explore hierarchical binary search trees, adjacency representations for graphs, and hash collision resolution strategies.",
    thaiOverview: "ศึกษาโครงสร้างต้นไม้ค้นหาทวิภาค กราฟแบบเมทริกซ์และลิสต์ประชิด และกลไกแก้การชนกันในตารางแฮช",
    tags: ["Data Structures", "Trees", "Graphs", "Hash Table", "Algorithms"],
    steps: [
      {
        stepNumber: 1,
        title: "Hash Tables, Hash Functions & Collision Resolution",
        thaiTitle: "ตารางแฮช ฟังก์ชันแฮช และการจัดการการชนกันของข้อมูล",
        summary: "Hash tables achieve O(1) amortized lookup by mapping arbitrary keys to bucket array indices using deterministic hash functions.",
        thaiSummary: "ตารางแฮชค้นหาและบันทึกข้อมูลได้เร็วเฉลี่ยระดับ O(1) โดยแปลงคีย์เป็นดัชนีช่องด้วยฟังก์ชันแฮช และจัดการการชนกันของคีย์",
        deepTheory: [
          "A hash function h(k) maps a key k from a large universe into array index range [0, m-1]. Good hash functions distribute keys uniformly across all slots to satisfy the Simple Uniform Hashing Assumption (SUHA).",
          "Collision Resolution: 1. Separate Chaining: Each bucket holds a linked list of entries that hash to the same slot. 2. Open Addressing: Probes alternative empty slots using Linear Probing (h(k, i) = (h'(k) + i) mod m) or Double Hashing."
        ],
        formulaLatex: "\\text{index} = h(k) \\pmod m, \\quad \\alpha = \\frac{n}{m} \\quad (\\text{Load Factor})",
        formulaSymbols: [
          { symbol: "h(k)", meaning: "Deterministic hash function converting key into integer" },
          { symbol: "m", meaning: "Number of array slots in the hash table bucket array" },
          { symbol: "\\alpha", meaning: "Load factor ratio of elements n to buckets m" }
        ],
        application: {
          title: "In-Memory Redis Caching & Python Dictionaries",
          thaiTitle: "ระบบแคช Redis และโครงสร้าง Dictionary ในภาษา Python",
          description: "Python dicts and Redis key-value stores use dynamic open-addressing hash tables with perturbation-based probing to execute lookups, insertions, and deletions in constant O(1) amortized time.",
          thaiDescription: "ระบบแคช Redis และตัวแปรดิกชันนารีใน Python ใช้ตารางแฮชในการค้นหาข้อมูลขนาดใหญ่หลายสิบล้านชุดได้ในเวลาคงที่ O(1)"
        },
        checkpoint: {
          question: "What is the expected average time complexity of looking up a value by its key in a properly tuned hash table?",
          thaiQuestion: "ความซับซ้อนของเวลาเฉลี่ยในการค้นหาข้อมูลด้วยคีย์ในตารางแฮชที่มีการกระจายตัวดีมีค่าเท่าใด?",
          options: [
            "O(1) Constant time",
            "O(log n) Logarithmic time",
            "O(n) Linear time",
            "O(n²) Quadratic time"
          ],
          correctIndex: 0,
          explanation: "Under the simple uniform hashing assumption with a bounded load factor (α < 0.75), bucket lookup executes in O(1) expected time.",
          thaiExplanation: "เมื่อตารางแฮชมีขนาดพอเหมาะและฟังก์ชันแฮชกระจายตัวดี การคำนวณดัชนีและเข้าถึงข้อมูลจะใช้เวลาคงที่เฉลี่ย O(1)"
        }
      },
      {
        stepNumber: 2,
        title: "Binary Search Trees (BST) & Balanced Invariants",
        thaiTitle: "ต้นไม้ค้นหาทวิภาค (BST) และคุณสมบัติการปรับสมดุล",
        summary: "Binary Search Trees enforce that all keys in the left subtree are smaller than the node, while right subtree keys are larger.",
        thaiSummary: "ต้นไม้ค้นหาทวิภาค (BST) กำหนดให้โหนดลูกทางซ้ายมีค่าน้อยกว่าโหนดแม่เสมอ และโหนดลูกทางขวามีค่ามากกว่าเสมอ",
        deepTheory: [
          "BST Invariant: For any node x, if y is in the left subtree of x, then key(y) < key(x); if y is in the right subtree of x, then key(y) > key(x).",
          "Balanced Trees (AVL, Red-Black): Degenerate insertion orders can cause unbalanced BSTs to collapse into O(n) linked lists. Self-balancing trees execute left and right tree rotations to guarantee height h = O(log n), ensuring O(log n) worst-case search, insertion, and deletion."
        ],
        formulaLatex: "h \\le 1.44 \\log_2(n + 2) \\implies T_{\\text{search}}(n) = O(\\log n)",
        formulaSymbols: [
          { symbol: "h", meaning: "Height of the self-balancing binary search tree" },
          { symbol: "n", meaning: "Total number of nodes stored in the tree" }
        ],
        application: {
          title: "Linux CFS Kernel Process Scheduler",
          thaiTitle: "ตัวจัดคิวโพรเซสในเคอร์เนลลินุกซ์ (Linux CFS Scheduler)",
          description: "The Linux kernel's Completely Fair Scheduler (CFS) indexes runnable processes in a Red-Black self-balancing tree sorted by virtual runtime, picking the leftmost task to execute in O(log n) time.",
          thaiDescription: "ระบบปฏิบัติการ Linux ใช้โครงสร้างต้นไม้ Red-Black Tree ในการจัดลำดับคิวการทำงานของ CPU ช่วยให้สลับแอปพลิเคชันได้อย่างรวดเร็วและเป็นธรรม"
        },
        checkpoint: {
          question: "In an in-order traversal (Left, Root, Right) of a valid Binary Search Tree, what property does the output sequence exhibit?",
          thaiQuestion: "การท่องต้นไม้ค้นหาทวิภาค (BST) แบบ In-order Traversal (ซ้าย, โหนดแม่, ขวา) จะให้ลำดับข้อมูลเป็นอย่างไร?",
          options: [
            "Randomly shuffled",
            "Sorted in strictly ascending numerical order",
            "Sorted in descending order",
            "Grouped by node depth"
          ],
          correctIndex: 1,
          explanation: "Because in-order visits Left (< Root) then Root then Right (> Root), it naturally produces a strictly sorted ascending sequence of all keys.",
          thaiExplanation: "เนื่องจาก In-order จะแวะโหนดซ้าย (< แม่) ก่อน แล้วแวะโหนดแม่ จากนั้นจึงแวะโหนดขวา (> แม่) ลำดับผลลัพธ์จึงเรียงจากน้อยไปมากเสมอ"
        }
      },
      {
        stepNumber: 3,
        title: "Graph Representations & Breadth/Depth First Searches",
        thaiTitle: "โครงสร้างกราฟ และการค้นหาแบบตามแนวกว้าง (BFS) และแนวลึก (DFS)",
        summary: "Graphs model pairwise entity relations using vertices and edges, traversed systematically via queue-based BFS or recursive stack DFS.",
        thaiSummary: "กราฟจำลองความสัมพันธ์ระหว่างจุดยอด (Vertices) และเส้นเชื่อม (Edges) โดยมีอัลกอริทึม BFS ใช้คิว และ DFS ใช้สแต็กในการท่องกราฟ",
        deepTheory: [
          "Graph representations: 1. Adjacency Matrix A (size |V| × |V|), optimal for dense graphs with O(1) edge lookup. 2. Adjacency List, optimal for sparse graphs with O(|V| + |E|) memory.",
          "Breadth-First Search (BFS): Uses a First-In-First-Out (FIFO) queue to explore neighbors layer by layer, guaranteeing the shortest path in unweighted graphs.",
          "Depth-First Search (DFS): Uses recursion or a Last-In-First-Out (LIFO) stack to traverse deeply along branches, detecting cycles and computing topological sort order in DAGs."
        ],
        formulaLatex: "T_{\\text{BFS}} = T_{\\text{DFS}} = O(|V| + |E|), \\quad \\text{Space} = O(|V|)",
        formulaSymbols: [
          { symbol: "|V|", meaning: "Number of vertices (nodes) in the graph" },
          { symbol: "|E|", meaning: "Number of edges (connections) in the graph" }
        ],
        application: {
          title: "Google Maps Shortest Route Navigation",
          thaiTitle: "ระบบนำทางเส้นทางที่สั้นที่สุดใน Google Maps",
          description: "Road networks are represented as weighted directed graphs where intersections are vertices and roads are edges. Dijkstra's and A* search algorithms (priority queue BFS) find optimal driving routes in milliseconds.",
          thaiDescription: "แผนที่ Google Maps จำลองถนนเป็นกราฟถ่วงน้ำหนัก โดยใช้ขั้นตอนวิธีค้นหาเส้นทางแบบ A* และ Dijkstra คำนวณเส้นทางที่เร็วที่สุดให้ผู้ขับขี่"
        },
        checkpoint: {
          question: "Which graph traversal algorithm guarantees finding the shortest path (minimum edge count) between two nodes in an unweighted graph?",
          thaiQuestion: "ขั้นตอนวิธีท่องกราฟใดที่รับประกันว่าจะพบเส้นทางที่สั้นที่สุด (จำนวนเส้นเชื่อมน้อยที่สุด) ในกราฟที่ไม่มีค่าน้ำหนัก?",
          options: [
            "Depth-First Search (DFS)",
            "Breadth-First Search (BFS)",
            "Linear Scanning",
            "Random Walk"
          ],
          correctIndex: 1,
          explanation: "BFS explores all vertices at distance k before exploring vertices at distance k+1, guaranteeing that the first time a target node is visited, it is along the shortest path.",
          thaiExplanation: "BFS สำรวจโหนดที่อยู่ห่าง 1 ช่วงก่อน แล้วจึงขยายไป 2 ช่วงเป็นชั้นๆ จึงรับประกันว่าจะพบเส้นทางที่สั้นที่สุดก่อนเสมอ"
        }
      }
    ]
  },

  {
    id: "cs-big-o-complexity",
    discipline: "cs",
    title: "Big-O Algorithmic Complexity & Sorting Algorithms",
    thaiTitle: "ความซับซ้อนของขั้นตอนวิธี สัญกรณ์บิ๊กโอ (Big-O) และอัลกอริทึมการเรียงลำดับ",
    estimatedMinutes: 25,
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
          "O(1) Constant < O(\\log n) Logarithmic < O(n) Linear < O(n \\log n) Linearithmic < O(n^2) Quadratic < O(2^n) Exponential < O(n!) Factorial."
        ],
        formulaLatex: "f(n) \\in O(g(n)) \\iff \\exists c > 0, n_0 > 0 : \\forall n \\ge n_0, \\, 0 \\le f(n) \\le c \\cdot g(n)",
        formulaSymbols: [
          { symbol: "f(n)", meaning: "Actual execution steps taken by the algorithm" },
          { symbol: "g(n)", meaning: "Asymptotic upper bound envelope function" },
          { symbol: "n", meaning: "Input dataset size (number of elements)" }
        ],
        application: {
          title: "Database Indexing via B-Trees & Hash Maps",
          thaiTitle: "การทำดัชนีฐานข้อมูลด้วย B-Tree และ Hash Table",
          description: "PostgreSQL and MySQL use B-Tree indexes to reduce search time from O(n) full table scans to O(log n), and in-memory hash indexes to achieve instantaneous O(1) primary key lookups.",
          thaiDescription: "ระบบฐานข้อมูลใช้ดัชนี B-Tree เพื่อลดเวลาค้นหาข้อมูลนับล้านแถวจาก O(n) เหลือ O(log n) และใช้ Hash Index สำหรับการค้นหาแบบ O(1) ทันที"
        },
        checkpoint: {
          question: "If an algorithm runs in O(n²) time and takes 1 second to process 1,000 items, approximately how long will it take to process 10,000 items?",
          thaiQuestion: "หากอัลกอริทึมมีอัตราการเติบโตแบบ O(n²) และใช้เวลา 1 วินาทีในการประมวลผลข้อมูล 1,000 ตัว จะใช้เวลากี่วินาทีกับข้อมูล 10,000 ตัว?",
          options: [
            "10 seconds",
            "100 seconds",
            "1,000 seconds",
            "10,000 seconds"
          ],
          correctIndex: 1,
          explanation: "Input size n increased by factor 10. For an O(n²) algorithm, runtime increases by (10)² = 100 times, so 1 s × 100 = 100 seconds.",
          thaiExplanation: "ขนาดข้อมูลเพิ่มขึ้น 10 เท่า เมื่อความซับซ้อนเป็น n² เวลาจะเพิ่มขึ้น 10² = 100 เท่า ดังนั้นจะใช้เวลา 100 วินาที"
        }
      },
      {
        stepNumber: 2,
        title: "Divide-and-Conquer Sorting: Merge Sort & Quick Sort",
        thaiTitle: "การเรียงลำดับแบบแบ่งแยกและเอาชนะ: Merge Sort และ Quick Sort",
        summary: "Divide-and-conquer algorithms partition arrays into smaller subproblems, achieving optimal O(n log n) comparison sorting.",
        thaiSummary: "อัลกอริทึมแบบแบ่งแยกและเอาชนะจะแบ่งชุดข้อมูลออกเป็นส่วนย่อยเพื่อจัดเรียง ทำให้ทำความเร็วได้ถึงระดับ O(n log n)",
        deepTheory: [
          "Information theoretic lower bound: Any comparison-based sorting algorithm requires at least \\Omega(n \\log n) comparisons in the worst case (log2(n!) ≈ n log2 n - n log2 e).",
          "Merge Sort: Recursively divides array in half (log2 n levels) and merges sorted halves in O(n) time, guaranteeing strict O(n log n) in all cases, but requires O(n) auxiliary space.",
          "Quick Sort: Partitions around a pivot element. Average runtime is O(n log n) with in-place O(log n) stack memory, but worst-case is O(n²) if pivot choice is adversarial."
        ],
        formulaLatex: "T(n) = 2 T\\left(\\frac{n}{2}\\right) + O(n) \\implies T(n) = O(n \\log n)",
        formulaSymbols: [
          { symbol: "T(n)", meaning: "Recurrence relation time complexity solved via Master Theorem" }
        ],
        application: {
          title: "Timsort in Python (list.sort) & Java Arrays.sort",
          thaiTitle: "อัลกอริทึม Timsort ในคำสั่ง sort ของภาษา Python และ Java",
          description: "Python and Java standard libraries use Timsort (a hybrid of Merge Sort and Insertion Sort designed by Tim Peters) to exploit pre-existing ordered runs in real-world data, achieving O(n) best-case and O(n log n) worst-case performance.",
          thaiDescription: "ภาษา Python และ Java ใช้ Timsort ซึ่งผสมผสานระหว่าง Merge Sort และ Insertion Sort เพื่อเรียงลำดับข้อมูลจริงได้อย่างรวดเร็วในเวลา O(n log n)"
        },
        checkpoint: {
          question: "What is the worst-case time complexity of standard Merge Sort on an array of size n?",
          thaiQuestion: "ในกรณีเลวร้ายที่สุด (Worst-case) อัลกอริทึม Merge Sort จะมีความซับซ้อนของเวลาเท่าใด?",
          options: [
            "O(n)",
            "O(n log n)",
            "O(n²)",
            "O(2ⁿ)"
          ],
          correctIndex: 1,
          explanation: "Merge Sort always divides the array into two equal halves (log n depth) and merges them in linear O(n) time, strictly guaranteeing O(n log n) in best, average, and worst cases.",
          thaiExplanation: "Merge Sort รับประกันความซับซ้อน O(n log n) ในทุกกรณี ไม่ว่าข้อมูลจะเรียงมาอย่างไรก็ตาม"
        }
      },
      {
        stepNumber: 3,
        title: "Linear Time Sorting: Counting Sort & Radix Sort",
        thaiTitle: "การเรียงลำดับในเวลาเชิงเส้น: Counting Sort และ Radix Sort",
        summary: "Non-comparison sorting circumvents the Ω(n log n) lower bound by leveraging integer keys and counting bucket distributions.",
        thaiSummary: "การเรียงลำดับโดยไม่เปรียบเทียบคู่ข้อมูลสามารถทำความเร็วได้ถึง O(n + k) ในเวลาเชิงเส้น โดยอาศัยการนับความถี่ของเลขจำนวนเต็ม",
        deepTheory: [
          "Counting Sort: Computes the frequency of each integer value in range [0, k], builds a running prefix sum of counts, and places elements directly into output positions in O(n + k) time.",
          "Radix Sort: Processes integers digit by digit from least significant digit (LSD) to most significant digit (MSD) using a stable sub-sort (Counting Sort). For d digits with base b, runtime is O(d(n + b)), achieving linear time when d is constant."
        ],
        formulaLatex: "T(n) = O(d \\cdot (n + b)) \\quad (\\text{for } d \\text{ digits and base } b)",
        formulaSymbols: [
          { symbol: "d", meaning: "Number of digits in the maximum key value" },
          { symbol: "b", meaning: "Radix base (typically 10 for decimal or 256 for bytes)" }
        ],
        application: {
          title: "GPU Parallel Radix Sort in NVIDIA CUDA Thrust",
          thaiTitle: "การเรียงลำดับข้อมูลระดับกิกะไบต์บนการ์ดจอด้วย CUDA Radix Sort",
          description: "High-performance computing clusters and graphics cards use parallel GPU Radix Sort in NVIDIA CUDA libraries to sort hundreds of millions of 32-bit floating point numbers per second for ray tracing and physics simulations.",
          thaiDescription: "การ์ดจอ NVIDIA ใช้ขั้นตอนวิธี Radix Sort ในการเรียงลำดับข้อมูลอนุภาค 3D หลายร้อยล้านตัวต่อวินาทีได้อย่างขนานกันเต็มประสิทธิภาพ"
        },
        checkpoint: {
          question: "Why can Counting Sort and Radix Sort achieve O(n) linear runtime, beating the theoretical Ω(n log n) lower bound?",
          thaiQuestion: "เหตุใด Counting Sort จึงสามารถทำเวลาได้เร็วถึง O(n) ก้าวข้ามขีดจำกัดล่าง Ω(n log n) ได้?",
          options: [
            "They use quantum entanglement",
            "They do not compare pairs of elements; they use direct indexing based on integer values",
            "They only work on pre-sorted arrays",
            "They drop elements that are difficult to sort"
          ],
          correctIndex: 1,
          explanation: "The Ω(n log n) lower bound applies strictly to comparison-based sorting models. Non-comparison sorts use the integer values directly as array addresses.",
          thaiExplanation: "ขีดจำกัด Ω(n log n) บังคับใช้เฉพาะอัลกอริทึมที่ใช้การเปรียบเทียบคู่ข้อมูล ส่วน Counting Sort ใช้ค่าของตัวเลขเป็นดัชนีเข้าถึงตำแหน่งโดยตรง"
        }
      }
    ]
  }
];
