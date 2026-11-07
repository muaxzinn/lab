import type { Lesson } from "./types.ts";

export const BIOLOGY_LESSONS: Lesson[] = [
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
          "Transport vesicles coated with COPII bud from the ER and fuse with the cis-Golgi network. Cisternal maturation transports proteins to the trans-Golgi, where sorting signals direct them to lysosomes or secretory exocytic vesicles."
        ],
        formulaLatex: "\\text{DNA} \\xrightarrow{\\text{transcribe}} \\text{mRNA} \\xrightarrow{\\text{RER 80S}} \\text{Pro-peptide} \\xrightarrow{\\text{Golgi}} \\text{Glycoprotein} \\xrightarrow{\\text{Exocytosis}} \\text{Extracellular}",
        formulaSymbols: [
          { symbol: "\\text{RER}", meaning: "Rough Endoplasmic Reticulum" },
          { symbol: "\\text{Golgi}", meaning: "Golgi Apparatus cis/trans compartments" }
        ],
        application: {
          title: "Insulin Production in Pancreatic Beta Cells",
          thaiTitle: "การผลิตฮอร์โมนอินซูลินในเซลล์ตับอ่อน",
          description: "Human pancreatic beta cells produce preproinsulin on the RER, cleave it into proinsulin, excise the C-peptide inside Golgi secretory granules, and release mature active insulin into the bloodstream.",
          thaiDescription: "เซลล์บีตาของตับอ่อนสังเคราะห์พรีโปรอินซูลินบน RER ตัดแต่งสายเพปไทด์ในกอลจิบอดีเป็นอินซูลินที่พร้อมใช้งาน แล้วหลั่งเข้าสู่กระแสเลือดเพื่อควบคุมระดับน้ำตาล"
        },
        checkpoint: {
          question: "Which organelle is responsible for sorting, modifying (glycosylation), and packaging proteins into vesicles for secretion?",
          thaiQuestion: "ออร์แกเนลล์ใดทำหน้าที่จัดเรียง ปรับแต่งโครงสร้าง (เติมน้ำตาล) และบรรจุโปรตีนลงถุงเวสิเคิลเพื่อส่งออกนอกเซลล์?",
          options: [
            "Mitochondria",
            "Golgi Apparatus",
            "Lysosome",
            "Peroxisome"
          ],
          correctIndex: 1,
          explanation: "The Golgi Apparatus receives proteins from the Rough ER at its cis-face, modifies oligosaccharide chains in cisternae, and buds off secretory vesicles from its trans-face.",
          thaiExplanation: "กอลจิบอดี (Golgi Apparatus) ทำหน้าที่รับโปรตีนจาก RER มาเติมหมู่น้ำตาลและบรรจุลงเวสิเคิลเพื่อส่งไปยังจุดหมาย"
        }
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
          "3. 70S Bacterial Ribosomes: Sensitive to antibiotics (chloramphenicol, streptomycin) that inhibit bacterial 70S ribosomes, but unaffected by cycloheximide (which inhibits eukaryotic 80S ribosomes)."
        ],
        formulaLatex: "\\text{Host Archaea} + \\alpha\\text{-proteobacterium} \\xrightarrow{\\text{Endosymbiosis}} \\text{Ancestral Eukaryote (Aerobic)}",
        formulaSymbols: [
          { symbol: "\\text{mtDNA}", meaning: "Circular mitochondrial DNA" }
        ],
        application: {
          title: "Maternal Lineage & Forensic Anthropology",
          thaiTitle: "การสืบรอยสายพันธุ์มารดาด้วยไมโทคอนเดรียลดีเอ็นเอ",
          description: "Because sperm mitochondria are tagged with ubiquitin and digested upon fertilization, humans inherit mtDNA exclusively from their mother, enabling evolutionary geneticists to trace the 'Mitochondrial Eve' lineage back 150,000+ years.",
          thaiDescription: "เนื่องจากไมโทคอนเดรียในสเปิร์มจะถูกทำลายหลังการปฏิสนธิ มนุษย์จึงได้รับ mtDNA มาจากมารดาเพียงฝ่ายเดียว ช่วยให้นักพันธุศาสตร์สามารถสืบสายวิวัฒนาการของมนุษยชาติย้อนหลังได้นับแสนปี"
        },
        checkpoint: {
          question: "Which feature of mitochondria provides strong evolutionary evidence for their bacterial endosymbiotic origin?",
          thaiQuestion: "คุณสมบัติใดของไมโทคอนเดรียที่เป็นหลักฐานยืนยันว่าวิวัฒนาการมาจากแบคทีเรียโบราณ?",
          options: [
            "They possess linear chromosomes with histones",
            "They contain their own circular DNA and 70S ribosomes",
            "They lack an inner membrane",
            "They replicate via eukaryotic mitosis"
          ],
          correctIndex: 1,
          explanation: "Mitochondria contain their own naked circular genome and 70S bacterial-type ribosomes, replicating via binary fission identical to prokaryotes.",
          thaiExplanation: "ไมโทคอนเดรียมีดีเอ็นเอวงกลมเปลือยและไรโบโซมขนาด 70S แบบเดียวกับแบคทีเรีย และแบ่งตัวด้วยวิธี Binary Fission"
        }
      },
      {
        stepNumber: 3,
        title: "Lysosomes, Autophagy & The Cytoskeleton Network",
        thaiTitle: "ไลโซโซม กระบวนการกลืนกินตัวเอง (Autophagy) และโครงร่างเซลล์",
        summary: "Acid hydrolases degrade cellular debris within membrane-bounded lysosomes, while microfilaments and microtubules provide architectural scaffold.",
        thaiSummary: "เอนไซม์ไฮโดรเลสในไลโซโซมทำหน้าที่ย่อยสลายของเสียและออร์แกเนลล์เสื่อมสภาพ ในขณะที่โครงร่างเซลล์คอยค้ำจุนรูปร่างและการขนส่งภายใน",
        deepTheory: [
          "Lysosomes maintain an acidic interior (pH ~4.5-5.0) via vacuolar H+-ATPase proton pumps, ensuring acid hydrolase enzymes remain inactive if accidentally leaked into the neutral cytosol (pH ~7.2).",
          "Autophagy (Nobel Prize 2016, Yoshinori Ohsumi): Cells engulf damaged mitochondria in double-membrane autophagosomes that fuse with lysosomes for metabolic recycling.",
          "The cytoskeleton tripartite network: Microfilaments (actin, 7nm), Intermediate filaments (keratin/lamin, 10nm), and Microtubules (tubulin dimers, 25nm with kinesin/dynein motor proteins)."
        ],
        formulaLatex: "\\text{V-ATPase: } \\text{ATP} + \\text{H}^+_{\\text{cytosol}} \\to \\text{ADP} + \\text{P}_i + \\text{H}^+_{\\text{lysosome}} \\quad (\\text{pH} \\approx 4.8)",
        formulaSymbols: [
          { symbol: "\\text{V-ATPase}", meaning: "Vacuolar proton translocating ATPase" }
        ],
        application: {
          title: "Neurodegenerative Disease & Autophagy Failure",
          thaiTitle: "โรคพาร์กินสันและการบกพร่องของระบบ Autophagy",
          description: "In Parkinson's and Alzheimer's diseases, impaired lysosomal clearance leads to toxic protein aggregates (alpha-synuclein Lewy bodies and amyloid-beta plaques) that trigger neuronal apoptosis.",
          thaiDescription: "ในผู้ป่วยโรคพาร์กินสัน การทำงานที่บกพร่องของระบบไลโซโซมทำให้เกิดการสะสมของกลุ่มก้อนโปรตีนแอลฟา-ซินิวคลีอินที่เป็นพิษ นำไปสู่การตายของเซลล์ประสาท"
        },
        checkpoint: {
          question: "Why do lysosomal digestive enzymes cause minimal damage to the cell if a single lysosome ruptures?",
          thaiQuestion: "เหตุใดหากไลโซโซมเพียงถุงเดียวแตก เอนไซม์ย่อยสลายจึงไม่ทำลายส่วนประกอบอื่นๆ ของเซลล์?",
          options: [
            "The enzymes instantly evaporate",
            "The enzymes require an acidic pH (~4.8) and are denatured/inactivated by neutral cytosolic pH (~7.2)",
            "The nucleus absorbs all released enzymes",
            "Cytosol lacks water required for hydrolysis"
          ],
          correctIndex: 1,
          explanation: "Lysosomal acid hydrolases evolved optimal catalytic activity at pH 4.5-5.0. At the neutral cytosolic pH of ~7.2, their catalytic rate drops drastically, shielding the cell from accidental autodigestion.",
          thaiExplanation: "เอนไซม์ของไลโซโซมทำงานได้เฉพาะในภาวะกรด (pH ~4.8) เมื่อหลุดออกมาในไซโทซอลที่มีสภาวะเป็นกลาง (pH ~7.2) ประสิทธิภาพจะลดลงจนไม่สามารถทำลายเซลล์ได้"
        }
      }
    ]
  },

  {
    id: "bio-membrane-osmosis",
    discipline: "biology",
    title: "Cell Membrane Dynamics, Passive Diffusion & Osmosis",
    thaiTitle: "โครงสร้างเยื่อหุ้มเซลล์ การแพร่แบบพาซซีฟ และการออสโมซิส",
    estimatedMinutes: 25,
    level: "Intermediate",
    overview: "Explore fluid mosaic bilayer thermodynamics, passive and facilitated diffusion, osmotic pressure gradients, and primary active transport.",
    thaiOverview: "ศึกษาพลศาสตร์ของเยื่อหุ้มเซลล์แบบฟลูอิดโมเสก การแพร่แบบฟาซิลิเทต แรงดันออสโมซิส และการลำเลียงสารแบบใช้พลังงาน",
    tags: ["Membrane", "Osmosis", "Diffusion", "Active Transport", "Biophysics"],
    steps: [
      {
        stepNumber: 1,
        title: "Fluid Mosaic Model & Bilayer Thermodynamics",
        thaiTitle: "แบบจำลองฟลูอิดโมเสกและอุณหพลศาสตร์ของชั้นฟอสโฟลิพิด",
        summary: "The plasma membrane is a 2D fluid of amphipathic phospholipids embedded with mobile peripheral and integral transport proteins.",
        thaiSummary: "เยื่อหุ้มเซลล์ประกอบด้วยฟอสโฟลิพิดสองชั้นที่มีคุณสมบัติเป็นของไหล 2 มิติ แทรกด้วยโปรตีนข้ามเยื่อและคอเลสเตอรอลที่ช่วยรักษาเสถียรภาพ",
        deepTheory: [
          "Phospholipids are amphipathic: hydrophilic polar phosphate heads face aqueous extracellular and cytosolic interfaces, while hydrophobic fatty acid tails sequester internally via hydrophobic effect entropy gains.",
          "Membrane fluidity is dynamically buffered by cholesterol: at high temperatures, cholesterol restricts phospholipid tail wobbling; at low temperatures, it prevents crystalline tight packing, maintaining permeability homeostasis."
        ],
        formulaLatex: "\\Delta G_{\\text{bilayer}} = \\Delta H_{\\text{vdw}} - T \\Delta S_{\\text{hydrophobic}} < 0",
        formulaSymbols: [
          { symbol: "\\Delta G", meaning: "Gibbs free energy of spontaneous bilayer assembly", unit: "kJ/mol" }
        ],
        application: {
          title: "Liposomal Nanocarrier Drug Delivery",
          thaiTitle: "อนุภาคไลโปโซมนำส่งยารักษามะเร็ง",
          description: "Chemotherapy drugs like Doxil are encapsulated within synthetic 100nm phospholipid liposomes that circulate through blood vessels and deliver high drug payloads selectively to tumors without damaging healthy heart tissue.",
          thaiDescription: "ยาเคมีบำบัดถูกบรรจุในอนุภาคไลโปโซมฟอสโฟลิพิดขนาด 100 นาโนเมตร เพื่อซึมผ่านหลอดเลือดเข้าสู่ก้อนมะเร็งอย่างจำเพาะเจาะจง โดยไม่ทำลายเนื้อเยื่อหัวใจ"
        },
        checkpoint: {
          question: "How does cholesterol affect plasma membrane fluidity at high temperatures?",
          thaiQuestion: "คอเลสเตอรอลส่งผลต่อสภาพของไหลของเยื่อหุ้มเซลล์อย่างไรเมื่ออุณหภูมิสูงขึ้น?",
          options: [
            "It dissolves the membrane completely",
            "It restricts phospholipid mobility, preventing the membrane from becoming excessively fluid",
            "It causes fatty acids to freeze into a solid gel",
            "It increases water permeability by ten-fold"
          ],
          correctIndex: 1,
          explanation: "At high temperatures, cholesterol's rigid steroid ring hinders excessive lipid displacement, keeping the membrane intact and preventing leakage.",
          thaiExplanation: "ที่อุณหภูมิสูง วงแหวนสเตียรอยด์ที่แข็งเกร็งของคอเลสเตอรอลจะจำกัดการเคลื่อนที่ของฟอสโฟลิพิด ป้องกันไม่ให้เยื่อหุ้มเซลล์เหลวเกินไป"
        }
      },
      {
        stepNumber: 2,
        title: "Fick's Diffusion Law & Osmotic Pressure Gradients",
        thaiTitle: "กฎการแพร่ของฟิกและเกรเดียนต์แรงดันออสโมซิส",
        summary: "Water moves across semipermeable membranes from regions of low solute concentration to high solute concentration.",
        thaiSummary: "น้ำจะออสโมซิสผ่านเยื่อเลือกผ่านจากบริเวณที่มีความเข้มข้นของสารละลายต่ำ (น้ำมาก) ไปยังบริเวณที่มีความเข้มข้นของสารละลายสูง (น้ำน้อย)",
        deepTheory: [
          "Fick's First Law describes net solute flux: J = -D \\frac{dC}{dx}, where flux is proportional to concentration gradient and membrane diffusion coefficient D.",
          "Van 't Hoff formula for osmotic pressure: \\Pi = i C R T. In hypertonic environments (\\Pi_{out} > \\Pi_{in}), animal cells undergo crenation and plant cells undergo plasmolysis. In hypotonic solutions, animal cells lyse while plant cells develop turgor pressure against their rigid cell walls."
        ],
        formulaLatex: "\\Pi = i C R T \\quad \\text{and} \\quad J = -D \\frac{dC}{dx}",
        formulaSymbols: [
          { symbol: "\\Pi", meaning: "Osmotic pressure", unit: "atm or kPa" },
          { symbol: "i", meaning: "Van 't Hoff ionization factor" },
          { symbol: "C", meaning: "Molar solute concentration", unit: "mol/L" },
          { symbol: "D", meaning: "Diffusion coefficient", unit: "m²/s" }
        ],
        application: {
          title: "Hemodialysis Kidney Replacement Therapy",
          thaiTitle: "เครื่องไตเทียมและการฟอกเลือดด้วยเยื่อกรองออสโมซิส",
          description: "Hemodialysis machines pass patient blood alongside dialysate fluid separated by a semipermeable membrane; urea and potassium diffuse down concentration gradients, while red blood cells and serum albumin are retained.",
          thaiDescription: "เครื่องฟอกไตจะส่งเลือดของผู้ป่วยไหลขนานกับน้ำยาฟอกเลือดโดยมีเยื่อเลือกผ่านกั้นกลาง ยูเรียและของเสียจะแพร่ออกจากเลือดตามเกรเดียนต์ความเข้มข้น"
        },
        checkpoint: {
          question: "What happens to human red blood cells when placed into pure distilled water (a hypotonic solution)?",
          thaiQuestion: "จะเกิดอะไรขึ้นกับเซลล์เม็ดเลือดแดงของมนุษย์เมื่อแช่ในน้ำกลั่นบริสุทธิ์ (สารละลายไฮโปโทนิก)?",
          options: [
            "They shrink and shrivel (crenation)",
            "Water rushes in causing them to swell and burst (hemolysis)",
            "They develop a protective cellulose wall",
            "There is zero net movement of water"
          ],
          correctIndex: 1,
          explanation: "Distilled water has zero solute concentration. Water rapidly enters the hypertonic cell interior through aquaporins, generating high osmotic pressure that ruptures the animal cell membrane (hemolysis).",
          thaiExplanation: "น้ำกลั่นมีความเข้มข้นต่ำกว่าภายในเซลล์ น้ำจึงออสโมซิสเข้าสู่เซลล์อย่างรวดเร็วจนเซลล์เต่งและแตกออก (Hemolysis)"
        }
      },
      {
        stepNumber: 3,
        title: "Active Transport & The Na+/K+ ATPase Pump",
        thaiTitle: "การลำเลียงแบบใช้พลังงานและปั๊มโซเดียม-โพแทสเซียม",
        summary: "Primary active transport hydrolyzes ATP to pump ions against their steep electrochemical gradients, maintaining cell resting membrane potential.",
        thaiSummary: "การลำเลียงแบบแอกทีฟทรานสปอร์ตสลาย ATP เพื่อปั๊มไอออนต้านเกรเดียนต์ความเข้มข้น รักษาสภาพศักย์ไฟฟ้าขณะพักของเซลล์ประสาท",
        deepTheory: [
          "The electrogenic Na+/K+ ATPase pump exports 3 Na+ ions out of the cell and imports 2 K+ ions into the cell for every 1 ATP molecule hydrolyzed.",
          "This 3:2 stoichiometry establishes a steep resting membrane potential of ~ -70 mV across the plasma membrane, creating the electrochemical battery driving secondary active transport (e.g., Na+/glucose symporter SGLT1)."
        ],
        formulaLatex: "3\\text{Na}^+_{\\text{in}} + 2\\text{K}^+_{\\text{out}} + \\text{ATP} + \\text{H}_2\\text{O} \\to 3\\text{Na}^+_{\\text{out}} + 2\\text{K}^+_{\\text{in}} + \\text{ADP} + \\text{P}_i",
        formulaSymbols: [
          { symbol: "\\text{Na}^+", meaning: "Sodium ion pumped against its inward concentration gradient" },
          { symbol: "\\text{K}^+", meaning: "Potassium ion pumped against its outward concentration gradient" }
        ],
        application: {
          title: "Cardiac Digoxin Pharmacology",
          thaiTitle: "กลไกยาไดจ็อกซินรักษาภาวะหัวใจล้มเหลว",
          description: "Digoxin blocks heart Na+/K+ ATPase pumps, causing intracellular Na+ to rise; this slows the Na+/Ca2+ exchanger, elevating cytosolic Ca2+ to dramatically boost cardiac muscle contractile force.",
          thaiDescription: "ยาไดจ็อกซินยับยั้งปั๊ม Na+/K+ ในกล้ามเนื้อหัวใจ ส่งผลให้แคลเซียมสะสมในเซลล์มากขึ้น ช่วยเพิ่มแรงบีบตัวของหัวใจในผู้ป่วยภาวะหัวใจวาย"
        },
        checkpoint: {
          question: "For every single molecule of ATP hydrolyzed, what is the exact net ion transport ratio of the Na+/K+ ATPase pump?",
          thaiQuestion: "ต่อการสลาย ATP 1 โมเลกุล ปั๊ม Na+/K+ ATPase จะขนส่งไอออนในอัตราส่วนเท่าใด?",
          options: [
            "2 Na+ out, 2 K+ in",
            "3 Na+ out, 2 K+ in",
            "2 Na+ in, 3 K+ out",
            "3 Na+ in, 3 K+ out"
          ],
          correctIndex: 1,
          explanation: "The Na+/K+ ATPase pump exports 3 Na+ out of the cell and imports 2 K+ into the cell per ATP molecule, making it an electrogenic pump.",
          thaiExplanation: "ปั๊ม Na+/K+ จะนำ Na+ ออก 3 ไอออน และนำ K+ เข้า 2 ไอออน ต่อการใช้ 1 ATP"
        }
      }
    ]
  },

  {
    id: "bio-energetics-atp",
    discipline: "biology",
    title: "Bioenergetics: Photosynthesis & Cellular Respiration",
    thaiTitle: "พลังงานชีวภาพ: การสังเคราะห์ด้วยแสงและการหายใจระดับเซลล์",
    estimatedMinutes: 25,
    level: "Advanced",
    overview: "Trace energy transduction through chloroplast thylakoid photophosphorylation, the Krebs cycle, and mitochondrial ATP synthase chemiosmosis.",
    thaiOverview: "ติดตามการถ่ายทอดพลังงานผ่านการสังเคราะห์ด้วยแสงในคลอโรพลาสต์ วัฏจักรเครบส์ และการสังเคราะห์ ATP ด้วยแรงขับโปรตอนในไมโทคอนเดรีย",
    tags: ["Bioenergetics", "Photosynthesis", "Respiration", "ATP Synthase", "Krebs Cycle"],
    steps: [
      {
        stepNumber: 1,
        title: "Photosystem Light Reactions & Calvin Cycle",
        thaiTitle: "ปฏิกิริยาแสงในไทลาคอยด์และวัฏจักรคัลวิน",
        summary: "Photosystems II and I absorb photons to split water, generate NADPH and ATP, which power the Calvin cycle fixing CO2 into G3P sugar.",
        thaiSummary: "ระบบแสงดูดกลืนโฟตอนเพื่อสลายน้ำและสร้าง NADPH กับ ATP จากนั้นวัฏจักรคัลวินจะตรึง CO2 ให้กลายเป็นน้ำตาล G3P ในสโตรมา",
        deepTheory: [
          "Non-cyclic photophosphorylation: Photon absorption at P680 (PSII) excites electrons, triggering photolysis of water: 2H2O → O2 + 4H+ + 4e-. Electrons traverse the cytochrome b6f complex, pumping H+ into the thylakoid lumen.",
          "Electrons re-energize at P700 (PSI) and reduce NADP+ to NADPH via ferredoxin-NADP+ reductase.",
          "Calvin Cycle (Stroma): Ribulose-1,5-bisphosphate carboxylase-oxygenase (RuBisCO) fixes CO2 onto RuBP to produce 3-PGA, which is reduced to glyceraldehyde 3-phosphate (G3P) using ATP and NADPH."
        ],
        formulaLatex: "6\\text{CO}_2 + 6\\text{H}_2\\text{O} + h\\nu \\xrightarrow{\\text{Chloroplast}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2",
        formulaSymbols: [
          { symbol: "h\\nu", meaning: "Incident solar photon electromagnetic energy", unit: "Joules" },
          { symbol: "\\text{RuBisCO}", meaning: "Ribulose-1,5-bisphosphate carboxylase/oxygenase" }
        ],
        application: {
          title: "C4 & CAM Photosynthetic Drought Adaptations",
          thaiTitle: "การปรับตัวในการสังเคราะห์ด้วยแสงแบบ C4 และ CAM ในพืชทะเลทราย",
          description: "C4 plants (corn, sugarcane) and CAM plants (cacti, pineapples) separate carbon fixation temporally or spatially via PEP carboxylase, eliminating wasteful photorespiration in hot arid climates.",
          thaiDescription: "พืช C4 (ข้าวโพด อ้อย) และพืช CAM (กระบองเพชร สับปะรด) ใช้เอนไซม์ PEP Carboxylase ตรึงคาร์บอนเพื่อป้องกันการหายใจแสง (Photorespiration) ช่วยประหยัดน้ำในพื้นที่แห้งแล้ง"
        },
        checkpoint: {
          question: "Where do the oxygen gas molecules (O2) released during plant photosynthesis originate from?",
          thaiQuestion: "ก๊าซออกซิเจน (O2) ที่พืชปล่อยออกมาในการสังเคราะห์ด้วยแสงมีต้นกำเนิดมาจากโมเลกุลใด?",
          options: [
            "Carbon dioxide (CO2)",
            "Water (H2O) split at Photosystem II",
            "Glucose (C6H12O6)",
            "Atmospheric nitrogen"
          ],
          correctIndex: 1,
          explanation: "Isotope tracer experiments using 18O proved that photosynthetic oxygen gas originates exclusively from the photolysis of water molecules at the oxygen-evolving complex of PSII.",
          thaiExplanation: "การทดลองใช้ไอโซโทปยืนยันว่า ก๊าซออกซิเจนทั้งหมดเกิดจากการแตกตัวของโมเลกุลน้ำ (Photolysis of water) ที่ระบบแสง II ไม่ได้มาจาก CO2"
        }
      },
      {
        stepNumber: 2,
        title: "Glycolysis & The Mitochondrial Citric Acid Cycle",
        thaiTitle: "ไกลโคไลซิสและวัฏจักรกรดซิตริก (วัฏจักรเครบส์)",
        summary: "Glucose splits into pyruvate in the cytoplasm, which enters the mitochondrial matrix to produce NADH, FADH2, and CO2.",
        thaiSummary: "กลูโคสถูกสลายเป็นไพรูเวตในไซโทซอล จากนั้นเข้าสู่ไมโทคอนเดรียเพื่อสร้าง NADH, FADH2 และปล่อย CO2 ในวัฏจักรเครบส์",
        deepTheory: [
          "Glycolysis (Cytosol): 1 Glucose (6C) is converted into 2 Pyruvate (3C), yielding a net gain of 2 ATP (substrate-level phosphorylation) and 2 NADH.",
          "Pyruvate Dehydrogenase Complex: Pyruvate undergoes oxidative decarboxylation into Acetyl-CoA (2C), releasing CO2 and reducing NAD+ to NADH.",
          "Citric Acid Cycle (Mitochondrial Matrix): Acetyl-CoA condenses with Oxaloacetate (4C) to form Citrate (6C). Through 8 enzymatic steps, each turn yields 3 NADH, 1 FADH2, 1 GTP/ATP, and releases 2 CO2."
        ],
        formulaLatex: "\\text{Glucose} + 2\\text{NAD}^+ + 2\\text{ADP} + 2\\text{P}_i \\to 2\\text{Pyruvate} + 2\\text{NADH} + 2\\text{H}^+ + 2\\text{ATP}",
        formulaSymbols: [
          { symbol: "\\text{NADH}", meaning: "Reduced nicotinamide adenine dinucleotide (electron donor)" },
          { symbol: "\\text{FADH}_2", meaning: "Reduced flavin adenine dinucleotide" }
        ],
        application: {
          title: "Lactic Acid Fermentation in Anaerobic Exercise",
          thaiTitle: "การหมักกรดแลกติกในกล้ามเนื้อขณะออกกำลังกายอย่างหนัก",
          description: "When intense sprinting depletes oxygen delivery, muscle cells regenerate NAD+ by converting pyruvate into lactate via lactate dehydrogenase, sustaining short bursts of ATP production without the electron transport chain.",
          thaiDescription: "เมื่อออกกำลังกายอย่างหนักจนเซลล์ขาดออกซิเจน กล้ามเนื้อจะเปลี่ยนไพรูเวตเป็นกรดแลกติกเพื่อสร้าง NAD+ กลับมาใช้ในไกลโคไลซิสต่อไป"
        },
        checkpoint: {
          question: "How many net molecules of ATP are generated directly by substrate-level phosphorylation during glycolysis of one glucose molecule?",
          thaiQuestion: "กระบวนการไกลโคไลซิสให้ผลได้สุทธิของ ATP กี่โมเลกุลต่อการสลายกลูโคส 1 โมเลกุล?",
          options: [
            "1 ATP",
            "2 ATP",
            "4 ATP",
            "32 ATP"
          ],
          correctIndex: 1,
          explanation: "Glycolysis consumes 2 ATP in the energy investment phase and generates 4 ATP in the payoff phase, yielding a net gain of 2 ATP per glucose.",
          thaiExplanation: "ไกลโคไลซิสใช้ไป 2 ATP ในช่วงแรก และสร้างได้ 4 ATP ในช่วงหลัง จึงได้ผลผลิตสุทธิเท่ากับ 2 ATP"
        }
      },
      {
        stepNumber: 3,
        title: "Chemiosmosis & The F0F1-ATP Synthase Rotary Motor",
        thaiTitle: "เคมิออสโมซิสและกลไกมอเตอร์หมุนของเอนไซม์ ATP Synthase",
        summary: "The electron transport chain creates a proton gradient across the inner mitochondrial membrane, driving rotary synthesis of 30-32 ATP.",
        thaiSummary: "ลูกโซ่ถ่ายทอดอิเล็กตรอนปั๊มโปรตอนสร้างความต่างศักย์ข้ามเยื่อหุ้มชั้นใน ซึ่งจะขับเคลื่อนการหมุนของ ATP Synthase เพื่อสร้าง ATP 30-32 โมเลกุล",
        deepTheory: [
          "Peter Mitchell's chemiosmotic hypothesis (Nobel Prize 1978): Complexes I, III, and IV pump protons from the matrix into the intermembrane space, creating a proton-motive force (PMF) comprising an electrical potential (\\Delta \\psi \\approx 160-180 mV) and pH gradient (\\Delta pH \\approx 0.5-1.0).",
          "F0F1-ATP Synthase is a true rotary nanomotor: Proton flow through the membrane-embedded c-ring of F0 drives rotation of the central gamma stalk, inducing conformational changes (Open, Loose, Tight) in catalytic beta-subunits of F1 that condense ADP and inorganic phosphate (Pi) into ATP."
        ],
        formulaLatex: "\\Delta p = \\Delta \\psi - \\left( \\frac{2.3 RT}{F} \\right) \\Delta \\text{pH} \\approx 180-220 \\text{ mV}",
        formulaSymbols: [
          { symbol: "\\Delta p", meaning: "Proton-motive force across inner mitochondrial membrane", unit: "mV" },
          { symbol: "\\Delta \\psi", meaning: "Transmembrane electrical potential difference", unit: "mV" }
        ],
        application: {
          title: "Cyanide Poisoning & ETC Complex IV Inhibition",
          thaiTitle: "พิษของไซยาไนด์และการยับยั้งลูกโซ่ถ่ายทอดอิเล็กตรอน",
          description: "Cyanide (CN-) binds irreversibly to Fe3+ in cytochrome c oxidase (Complex IV), halting all electron flow and collapsing the proton gradient, which ceases cellular ATP synthesis within minutes.",
          thaiDescription: "สารพิษไซยาไนด์จะเข้าจับกับธาตุเหล็กใน Complex IV ทำให้การถ่ายทอดอิเล็กตรอนหยุดชะงัก การสร้าง ATP ล้มเหลว และทำให้เซลล์ตายอย่างรวดเร็ว"
        },
        checkpoint: {
          question: "What physical force directly drives the mechanical rotation of the F0 subunit in ATP Synthase?",
          thaiQuestion: "แรงขับเคลื่อนใดที่ทำให้ส่วน F0 ของเอนไซม์ ATP Synthase เกิดการหมุนเชิงกล?",
          options: [
            "Direct glucose binding",
            "The proton-motive force (electrochemical H+ gradient flowing down its concentration gradient)",
            "ATP hydrolysis",
            "Thermal Brownian noise alone"
          ],
          correctIndex: 1,
          explanation: "Protons flowing down their steep electrochemical gradient from the intermembrane space back into the matrix pass through channels in the F0 c-ring, causing it to spin like a water turbine.",
          thaiExplanation: "โปรตอน (H+) ที่ไหลตามเกรเดียนต์ความเข้มข้นผ่านช่องของ F0 จะผลักให้แกนหมุนเชิงกลทำงานคล้ายกังหันน้ำเพื่อสังเคราะห์ ATP"
        }
      }
    ]
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
          "The leading strand is synthesized continuously towards the replication fork, whereas the lagging strand is synthesized discontinuously in Okazaki fragments joined by DNA ligase."
        ],
        formulaLatex: "\\text{DNA}_{\\text{double}} \\xrightarrow{\\text{Helicase + Pol III}} 2 \\times \\text{DNA}_{\\text{semiconservative}} (\\text{Parent} + \\text{Daughter})",
        formulaSymbols: [
          { symbol: "5' \\to 3'", meaning: "Direction of nucleic acid chain elongation" }
        ],
        application: {
          title: "Polymerase Chain Reaction (PCR)",
          thaiTitle: "เทคนิค PCR ในการเพิ่มปริมาณ DNA",
          description: "PCR mimics biological replication in vitro using heat-stable Taq polymerase from Thermus aquaticus across thermal cycles (95°C denature, 55°C anneal, 72°C extend) to amplify DNA billion-fold for medical diagnostics.",
          thaiDescription: "เทคนิค PCR เลียนแบบการจำลอง DNA ในหลอดทดลอง โดยใช้เอนไซม์ Taq polymerase ทนความร้อน เพื่อเพิ่มปริมาณสารพันธุกรรมหลายพันล้านเท่าในการตรวจวินิจฉัยโรคและตรวจคัดกรองเชื้อไวรัส"
        },
        checkpoint: {
          question: "Why is the lagging strand of DNA synthesized discontinuously in Okazaki fragments?",
          thaiQuestion: "เหตุใดสาย Lagging strand ของ DNA จึงต้องสร้างเป็นท่อนสั้นๆ (Okazaki fragments)?",
          options: [
            "DNA ligase runs out of ATP",
            "DNA polymerase can only synthesize nucleic acid chains in the 5' to 3' direction",
            "The lagging strand contains RNA bases only",
            "Helicase only unzips one strand at a time"
          ],
          correctIndex: 1,
          explanation: "Because the two DNA strands are antiparallel and DNA polymerase III can only add nucleotides to a free 3'-OH group (synthesizing strictly 5' to 3'), the lagging strand must be synthesized away from the fork in Okazaki fragments.",
          thaiExplanation: "เนื่องจากสาย DNA สองสายขนานกันในทิศตรงกันข้าม และเอนไซม์ DNA Polymerase สามารถต่อสายใหม่ได้เฉพาะในทิศทาง 5' ไป 3' เท่านั้น"
        }
      },
      {
        stepNumber: 2,
        title: "Transcription & Ribosomal Translation",
        thaiTitle: "การถอดรหัส (Transcription) และการแปลรหัส (Translation)",
        summary: "RNA polymerase transcribes DNA into mRNA, which the 80S ribosome translates into a polypeptide using tRNA anticodons.",
        thaiSummary: "อาร์เอ็นเอพอลิเมอเรสถอดรหัสยีนเป็น mRNA แล้วไรโบโซมจะแปลรหัสโคดอนทีละ 3 เบสเป็นกรดอะมิโนต่อกันเป็นสายโปรตีน",
        deepTheory: [
          "The genetic code is universal, degenerate (64 codons encode 20 standard amino acids), and non-overlapping. The canonical start codon AUG encodes Methionine, while UAA, UAG, and UGA serve as stop signals.",
          "tRNA molecules carry cognate amino acids charged by aminoacyl-tRNA synthetases. The ribosome's A (aminoacyl), P (peptidyl), and E (exit) sites catalyze peptide bond formation via peptidyl transferase activity of 28S rRNA."
        ],
        formulaLatex: "\\text{Codon triplets } (4^3 = 64) \\implies 20 \\text{ standard amino acids} + 3 \\text{ stop codons}",
        formulaSymbols: [
          { symbol: "AUG", meaning: "Universal translation start codon (Methionine)" },
          { symbol: "\\text{A, P, E}", meaning: "Ribosomal catalytic tRNA binding sites" }
        ],
        application: {
          title: "mRNA Vaccines (COVID-19)",
          thaiTitle: "วัคซีนชนิด mRNA สำหรับการสร้างภูมิคุ้มกัน",
          description: "Synthetic lipid nanoparticle-encapsulated mRNA instructs patient ribosomes to translate viral Spike glycoprotein, provoking robust neutralizing antibodies without inserting foreign genetic material into the cell nucleus.",
          thaiDescription: "วัคซีน mRNA บรรจุในอนุภาคไขมันนาโน ทำหน้าที่ส่งคำสั่งให้ไรโบโซมของร่างกายสร้างโปรตีนหนาม (Spike) ของไวรัส เพื่อกระตุ้นระบบภูมิคุ้มกันได้อย่างปลอดภัยโดยไม่รบกวนจีโนมในนิวเคลียส"
        },
        checkpoint: {
          question: "Which of the following serves as the universal translation initiation (start) codon across all domains of life?",
          thaiQuestion: "รหัสโคดอนใดทำหน้าที่เป็นรหัสเริ่มต้น (Start codon) ในกระบวนการแปลรหัสของสิ่งมีชีวิตเกือบทุกชนิด?",
          options: [
            "UAA",
            "UAG",
            "AUG",
            "UGA"
          ],
          correctIndex: 2,
          explanation: "AUG is the universal start codon, specifying the amino acid Methionine in eukaryotes and formylmethionine in prokaryotes.",
          thaiExplanation: "AUG คือรหัสเริ่มต้นสากลที่กำหนดกรดอะมิโนเมทไธโอนีน (Methionine)"
        }
      },
      {
        stepNumber: 3,
        title: "Epigenetic Regulation & Reverse Transcription",
        thaiTitle: "การควบคุมเหนือพันธุกรรม (Epigenetics) และกระบวนการย้อนกลับ",
        summary: "DNA methylation and histone acetylation modulate gene expression without altering base sequence; retroviruses utilize reverse transcriptase.",
        thaiSummary: "การเติมหมู่เมทิลบนดีเอ็นเอและการเติมหมู่อะเซทิลบนฮิสโตนควบคุมการแสดงออกของยีนโดยไม่เปลี่ยนลำดับเบส และไวรัสเรโทรใช้รีเวิร์สทรานสคริปเทสเปลี่ยน RNA เป็น DNA",
        deepTheory: [
          "Epigenetics: DNA methyltransferases add methyl groups to cytosine residues in CpG islands, silencing transcription. Histone acetyltransferases (HAT) add acetyl groups, neutralizing lysine positive charges to relax chromatin (euchromatin) and activate gene transcription.",
          "Exceptions to strict Central Dogma: Retroviruses (e.g., HIV) carry the enzyme Reverse Transcriptase, synthesizing complementary cDNA from an RNA template: RNA → DNA. Prions cause infectious protein conformational cascades without nucleic acid intermediaries."
        ],
        formulaLatex: "\\text{Viral RNA} \\xrightarrow{\\text{Reverse Transcriptase}} \\text{cDNA} \\xrightarrow{\\text{Integrase}} \\text{Host Proviral Genome}",
        formulaSymbols: [
          { symbol: "\\text{cDNA}", meaning: "Complementary DNA synthesized from an RNA template" }
        ],
        application: {
          title: "Antiretroviral HIV Therapy (ART)",
          thaiTitle: "ยาต้านไวรัส HIV และยายับยั้งรีเวิร์สทรานสคริปเทส",
          description: "Nucleoside Reverse Transcriptase Inhibitors (NRTIs like Tenofovir) incorporate chain-terminating nucleotides into retroviral cDNA, blocking HIV integration into human helper T-cell genomes.",
          thaiDescription: "ยาต้านไวรัส HIV กลุ่ม NRTIs เลียนแบบนิวคลีโอไทด์เพื่อหยุดการทำงานของเอนไซม์ Reverse Transcriptase ป้องกันไม่ให้ไวรัสจำลองตัวและทำลายระบบภูมิคุ้มกัน"
        },
        checkpoint: {
          question: "What biological exception directly violates the unidirectional DNA → RNA flow postulated in Francis Crick's original Central Dogma?",
          thaiQuestion: "กระบวนการทางชีววิทยาใดที่ส่งข้อมูลย้อนทิศทาง ขัดแย้งกับหลักการดั้งเดิมของ Central Dogma (DNA → RNA)?",
          options: [
            "DNA Replication",
            "Reverse Transcription (RNA → DNA in retroviruses)",
            "Alternative splicing",
            "Protein denaturation"
          ],
          correctIndex: 1,
          explanation: "Retroviruses like HIV utilize the enzyme Reverse Transcriptase to copy single-stranded viral RNA back into double-stranded DNA (RNA → DNA).",
          thaiExplanation: "เอนไซม์ Reverse Transcriptase ในไวรัสกลุ่มเรโทรไวรัสสามารถสังเคราะห์ DNA ย้อนกลับจากแม่แบบ RNA (RNA → DNA)"
        }
      }
    ]
  }
];
