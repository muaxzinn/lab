import type { Lesson } from "./types.ts";

export const THAI_LESSONS: Lesson[] = [
  {
    id: "thai-triyang-phonology",
    discipline: "thai",
    title: "Triyang 3-Consonant Classes & Acoustic Tone Rules",
    thaiTitle: "ไตรยางศ์ อักษรสามหมู่ และสัทศาสตร์ระดับเสียง",
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
          "3. อักษรต่ำ (Low Class, 24 consonants): Subdivided into อักษรต่ำเดี่ยว (10 nasals/approximants: ง ญ ณ น ม ย ร ล ว ฬ) and อักษรต่ำคู่ (14 aspirated stops paired with High class: ค ฅ ฆ ช ซ ฌ ฑ ฒ ท ธ พ ฟ ภ ฮ)."
        ],
        formulaLatex: "\\text{Consonants (44)} = \\text{Mid (9)} + \\text{High (11)} + \\text{Low (24 [10 Single + 14 Paired])}",
        formulaSymbols: [
          { symbol: "\\text{Mid}", meaning: "ก จ ด ต บ ป อ ฎ ฏ" },
          { symbol: "\\text{High}", meaning: "ข ฃ ฉ ฐ ถ ผ ฝ ศ ษ ส ห" },
          { symbol: "\\text{Low}", meaning: "ค ฅ ฆ ช ซ ฌ ฑ ฒ ท ธ พ ฟ ภ ฮ ง ญ ณ น ม ย ร ล ว ฬ" }
        ],
        application: {
          title: "Thai Natural Language Processing (NLP) Tokenizers",
          thaiTitle: "การตัดคำและประมวลผลภาษาธรรมชาติ (Thai NLP)",
          description: "Modern Thai text-to-speech (TTS) engines and deep learning tokenizers use Triyang phoneme tables to synthesize acoustic pitch trajectories and resolve syllable boundaries.",
          thaiDescription: "ระบบแปลงข้อความเป็นเสียงพูด (Text-to-Speech) ใช้กฎไตรยางศ์ในการสร้างคลื่นความถี่เสียงวรรณยุกต์สังเคราะห์ให้มีความเป็นธรรมชาติถูกต้องตามหลักสัทศาสตร์"
        },
        checkpoint: {
          question: "How many consonant letters comprise the Mid-class (อักษรกลาง) in Thai orthography?",
          thaiQuestion: "พยัญชนะอักษรกลางในภาษาไทยมีทั้งหมดกี่ตัว?",
          options: [
            "7 ตัว",
            "9 ตัว (ไก่ จิก เด็ก ตาย บน ปาก โอ่ง ฎ ฏ)",
            "11 ตัว",
            "24 ตัว"
          ],
          correctIndex: 1,
          explanation: "There are exactly 9 Mid-class consonants: ก จ ด ต บ ป อ ฎ ฏ, famously memorized via the mnemonic phrase 'ไก่จิกเด็กตายบนปากโอ่ง'.",
          thaiExplanation: "อักษรกลางมี 9 ตัว ได้แก่ ก จ ด ต บ ป อ ฎ ฏ สามารถผันวรรณยุกต์ได้ครบทั้ง 5 เสียง"
        }
      },
      {
        stepNumber: 2,
        title: "Leading Consonants (อักษรนำ) & Tone Elevation",
        thaiTitle: "อักษรนำและการยกคู่ระดับเสียง",
        summary: "High or Mid consonants leading a single Low consonant force the cluster to adopt the tone inflection rules of the leading consonant.",
        thaiSummary: "เมื่ออักษรสูงหรืออักษรกลางนำหน้าอักษรต่ำเดี่ยว จะบังคับให้ออกเสียงวรรณยุกต์ตามกฎของอักษรนำนั้น (เช่น ห นำ และ อ นำ ย)",
        deepTheory: [
          "อักษรนำ 2 พยางค์ (เช่น ขนม [ขะ-หนม], ตลาด [ตะ-หลาด], จมูก [จะ-หมูก]): The first syllable is pronounced with an inherent short vowel /a/, and the second syllable shifts its tone to match the High or Mid leading consonant.",
          "ห นำ (Silent Ho Nam): The letter ห acts as an acoustic tone modifier before low single consonants (ง ญ น ม ย ร ล ว) without being pronounced itself (e.g., หน้า, หมอ, หวาน).",
          "อ นำ ย: Exactly four historic words in modern Thai (อย่า อยู่ อย่าง อยาก)."
        ],
        formulaLatex: "\\text{High/Mid} + \\text{Low Single} \\xrightarrow{\\text{Leading Rule}} \\text{Acoustic Tone matches High/Mid class}",
        formulaSymbols: [
          { symbol: "\\text{ห นำ}", meaning: "Acoustic high-register tone modifier prefix" }
        ],
        application: {
          title: "Speech Recognition Acoustic Modeling",
          thaiTitle: "การรู้จำเสียงพูดในระบบสั่งการด้วยเสียง (Siri/Google)",
          description: "Speech recognition neural networks analyze the tone contour of leading consonant syllables to differentiate minimal pairs (e.g., มา /maa/ vs. หมา /mǎa/).",
          thaiDescription: "โมเดลรู้จำเสียงพูดใช้การวิเคราะห์เส้นเสียงของอักษรนำเพื่อแยกแยะคำที่มีพยัญชนะสะกดเหมือนกันแต่ต่างวรรณยุกต์ เช่น มา และ หมา"
        },
        checkpoint: {
          question: "Which of the following words is an example of 'อ นำ ย' in Thai?",
          thaiQuestion: "คำในข้อใดเป็นตัวอย่างของคำที่มี 'อ นำ ย' ในภาษาไทย?",
          options: [
            "อร่อย",
            "อยาก",
            "อารมณ์",
            "อนุญาต"
          ],
          correctIndex: 1,
          explanation: "The four words in Thai with 'อ นำ ย' are อย่า, อยู่, อย่าง, and อยาก.",
          thaiExplanation: "คำที่มี อ นำ ย ในภาษาไทยมีเพียง 4 คำ คือ อย่า อยู่ อย่าง อยาก"
        }
      },
      {
        stepNumber: 3,
        title: "Acoustic Pitch Contours: The 5 Phonemic Tones",
        thaiTitle: "เส้นระดับเสียงวรรณยุกต์ 5 เสียงในทางสัทศาสตร์",
        summary: "Thai is a tonal language with five contrastive pitch contours: Common (Mid), Low, Falling, High, and Rising.",
        thaiSummary: "ภาษาไทยมีวรรณยุกต์ 5 เสียง ซึ่งมีเส้นระดับความถี่มูลฐาน (F0) ในทางสัทศาสตร์แตกต่างกันอย่างชัดเจน: สามัญ เอก โท ตรี จัตวา",
        deepTheory: [
          "1. เสียงสามัญ (Mid tone, 33 in Chao pitch letters): Flat fundamental frequency (~110-120 Hz).",
          "2. เสียงเอก (Low tone, 21): Low falling pitch curve (~90-100 Hz).",
          "3. เสียงโท (Falling tone, 51): Sharp high-to-low pitch drop (~140 Hz down to 90 Hz).",
          "4. เสียงตรี (High tone, 45 or 55): High sustained or rising pitch (~140-150 Hz).",
          "5. เสียงจัตวา (Rising tone, 214): Dipping low then soaring upward (~90 Hz up to 140 Hz)."
        ],
        formulaLatex: "\\text{F0}(t) \\in \\{\\text{Mid (33)}, \\text{Low (21)}, \\text{Falling (51)}, \\text{High (45)}, \\text{Rising (214)}\\}",
        formulaSymbols: [
          { symbol: "\\text{F0}", meaning: "Fundamental vocal fold acoustic pitch frequency", unit: "Hz" }
        ],
        application: {
          title: "Cochlear Implant Tone Perception",
          thaiTitle: "ประสาทหูเทียมและการฟื้นฟูการได้ยินเสียงวรรณยุกต์",
          description: "Biomedical engineers program cochlear implant electrode arrays with enhanced temporal envelope coding so Thai patients can perceive pitch trajectories essential for sentence comprehension.",
          thaiDescription: "วิศวกรการแพทย์ปรับแต่งสัญญาณไฟฟ้าในประสาทหูเทียมให้ส่งสัญญาณความถี่เสียงวรรณยุกต์อย่างแม่นยำ เพื่อให้ผู้บกพร่องทางการได้ยินชาวไทยเข้าใจความหมายของประโยคได้ถูกต้อง"
        },
        checkpoint: {
          question: "What fundamental frequency pitch contour characterizes the Rising tone (เสียงจัตวา) in Thai phonetics?",
          thaiQuestion: "ในทางสัทศาสตร์ เสียงจัตวามีลักษณะของเส้นความถี่ระดับเสียง (Pitch contour) เป็นอย่างไร?",
          options: [
            "Flat level pitch throughout",
            "Starts low, dips slightly, and sweeps steeply upward",
            "Starts high and drops sharply to the bottom",
            "High flat monotonic pitch"
          ],
          correctIndex: 1,
          explanation: "The Rising tone (Chao tone 214) begins at a low acoustic frequency, dips momentarily, and then sweeps upward to a high pitch register.",
          thaiExplanation: "เสียงจัตวา (214) เริ่มต้นจากระดับเสียงต่ำ ลดลงเล็กน้อย แล้วตวัดขึ้นสู่ระดับเสียงสูงอย่างรวดเร็ว"
        }
      }
    ]
  },

  {
    id: "thai-spelling-live-dead",
    discipline: "thai",
    title: "Thai Spelling Sections & Live/Dead Syllable Tone Rules",
    thaiTitle: "มาตราตัวสะกด 8 แม่ และกฎการผันวรรณยุกต์คำเป็น-คำตาย",
    estimatedMinutes: 20,
    level: "Intermediate",
    overview: "Deconstruct the 8 coda spelling sections, distinguish live vs. dead syllable acoustic boundaries, and master the tone realization matrix.",
    thaiOverview: "เจาะลึกมาตราตัวสะกด 8 แม่ การแยกแยะคำเป็น-คำตายตามระยะเวลาเสียง และเมทริกซ์การผันวรรณยุกต์ที่สมบูรณ์",
    tags: ["Thai Spelling", "Live Dead Syllables", "Codas", "Tone Matrix"],
    steps: [
      {
        stepNumber: 1,
        title: "The 8 Thai Spelling Sections (มาตราตัวสะกด 8 มาตรา)",
        thaiTitle: "มาตราตัวสะกด 8 มาตราตรงตามมาตราและไม่ตรงตามมาตรา",
        summary: "Thai final coda consonants are categorized into 8 phonological sections, excluding แม่ ก กา (open syllables).",
        thaiSummary: "พยัญชนะสะกดท้ายพยางค์ในภาษาไทยถูกจัดเป็น 8 มาตรา (ไม่นับแม่ ก กา ที่ไม่มีตัวสะกด) แบ่งเป็นกลุ่มเสียงก้องและกลุ่มเสียงหยุด",
        deepTheory: [
          "แม่ ก กา: Open syllables without a final consonant (e.g., ปา, ไก่, ดู).",
          "Resonant Codas (มาตราเสียงก้อง / คำเป็น):",
          "1. แม่กง: Coda /ng/ (ง).",
          "2. แม่กน: Coda /n/ (น, ณ, ญ, ร, ล, ฬ).",
          "3. แม่กม: Coda /m/ (ม).",
          "4. แม่เกย: Coda /j/ (ย).",
          "5. แม่เกอว: Coda /w/ (ว). Memorized as 'นมยวง'.",
          "Stop Codas (มาตราเสียงหยุด / คำตาย):",
          "6. แม่กก: Velar stop /k/ (ก, ข, ค, ฆ).",
          "7. แม่กด: Alveolar stop /t/ (ด, ต, จ, ช, ซ, ฎ, ฏ, ฐ, ฑ, ฒ, ถ, ท, ธ, ศ, ษ, ส).",
          "8. แม่กบ: Bilabial stop /p/ (บ, ป, พ, ฟ, ภ). Memorized as 'กบด'."
        ],
        formulaLatex: "\\text{Coda Sections (8)} = \\text{Live (นมยวง [กง, กน, กม, เกย, เกอว])} + \\text{Dead (กบด [กก, กด, กบ])}",
        formulaSymbols: [
          { symbol: "\\text{นมยวง}", meaning: "Resonant sonorant nasal/approximant coda consonants" },
          { symbol: "\\text{กบด}", meaning: "Unreleased stop coda consonants (buccal closure)" }
        ],
        application: {
          title: "Thai Phonetic Sorting & Rhyme Search Engines",
          thaiTitle: "เครื่องมือค้นหาคำสัมผัสคล้องจองและพจนานุกรมอิเล็กทรอนิกส์",
          description: "Digital poetry generators and rap lyric engines group words by vowel length and coda section to automatically match true poetic rhymes (สัมผัสสระและสัมผัสมาตราตัวสะกด).",
          thaiDescription: "ระบบประพันธ์คำกลอนดิจิทัลใช้มาตราตัวสะกดและสระในการจับคู่คำสัมผัสคล้องจอง เช่น คำที่สะกดด้วยแม่กนจะสัมผัสกันได้ทั้งหมดแม้รูปพยัญชนะจะต่างกัน"
        },
        checkpoint: {
          question: "Which of the following words belongs to the 'แม่กน' spelling section despite ending in letter 'ร'?",
          thaiQuestion: "คำในข้อใดจัดอยู่ในมาตราตัวสะกด 'แม่กน' แม้จะลงท้ายด้วยตัวอักษร 'ร'?",
          options: [
            "การ",
            "กาก",
            "กราบ",
            "กอด"
          ],
          correctIndex: 0,
          explanation: "The word 'การ' ends in ร, which represents the alveolar nasal /n/ coda in the แม่กน section (pronounced /kaan/).",
          thaiExplanation: "คำว่า 'การ' ลงท้ายด้วย ร แต่ออกเสียงสะกดด้วยเสียง /n/ จึงจัดอยู่ในแม่กน"
        }
      },
      {
        stepNumber: 2,
        title: "Deterministic Invariants of Kham Pen vs. Kham Tai",
        thaiTitle: "กฎเกณฑ์ตายตัวของการจำแนกคำเป็นและคำตาย",
        summary: "Live syllables sustain acoustic resonance; Dead syllables terminate abruptly through glottal or buccal stops.",
        thaiSummary: "คำเป็นคือพยางค์ที่ลากเสียงได้ยาวไม่ขาดตอน ส่วนคำตายคือพยางค์ที่เสียงถูกกักหยุดอย่างเฉียบพลัน",
        deepTheory: [
          "Algorithm for Syllable Classification:",
          "Rule 1: Check final consonant coda first. If the syllable has a coda from แม่ กก, กด, กบ (กบด) → Strictly คำตาย (regardless of vowel length!).",
          "Rule 2: If the syllable has a coda from แม่ กง, กน, กม, เกย, เกอว (นมยวง) → Strictly คำเป็น.",
          "Rule 3: If in แม่ ก กา (no coda consonant): Long vowel (อา, อี, อู, เอ, โอ) or special diphthongs (อำ, ไอ, ใบล, เอา) → คำเป็น. Short vowel (อะ, อิ, อุ, เอะ) → คำตาย."
        ],
        formulaLatex: "\\text{Type} = \\begin{cases} \\text{คำตาย} & \\text{if Coda} \\in \\{\\text{กก, กด, กบ}\\} \\lor (\\text{ก กา} \\land \\text{Short}) \\\\ \\text{คำเป็น} & \\text{if Coda} \\in \\{\\text{กง, กน, กม, เกย, เกอว}\\} \\lor (\\text{ก กา} \\land \\text{Long}) \\end{cases}",
        formulaSymbols: [
          { symbol: "\\text{คำตาย}", meaning: "Acoustically checked syllable with abrupt airflow cessation" },
          { symbol: "\\text{คำเป็น}", meaning: "Acoustically sustained syllable with ongoing airflow" }
        ],
        application: {
          title: "Chanda Verse Meter in Classical Literature (ครุ-ลหุ)",
          thaiTitle: "ฉันทลักษณ์คำครุและคำลหุในวรรณคดีไทย",
          description: "In classical Thai poetry (ฉันท์), poets compose strict metrical rhythms using Lahut (light syllables: dead syllables with short vowels) and Kharut (heavy syllables: all live syllables and dead syllables with codas).",
          thaiDescription: "ในการแต่งคำประพันธ์ประเภทฉันท์ กวีต้องกำหนดจังหวะคำหนัก (ครุ) และคำเบา (ลหุ) อย่างเคร่งครัดตามกฎคำเป็น-คำตาย"
        },
        checkpoint: {
          question: "Is the word 'ชาติ' (meaning nation) a Live syllable (คำเป็น) or a Dead syllable (คำตาย)?",
          thaiQuestion: "คำว่า 'ชาติ' จัดเป็น คำเป็น หรือ คำตาย?",
          options: [
            "คำเป็น เพราะมีสระอาเสียงยาว",
            "คำตาย เพราะสะกดด้วยแม่กด (ติ ออกเสียงเหมือน ด)",
            "เป็นได้ทั้งสองอย่าง",
            "ไม่สามารถระบุได้"
          ],
          correctIndex: 1,
          explanation: "Rule 1 takes precedence: The final sound is /t/ (แม่กด), making 'ชาติ' strictly a Dead syllable (คำตาย) despite having the long vowel อา.",
          thaiExplanation: "กฎข้อแรกระบุว่าหากมีตัวสะกดในแม่ กบด (ในที่นี้คือ ติ ออกเสียงแม่กด) จะต้องเป็นคำตายเสมอ แม้สระจะเป็นเสียงยาวก็ตาม"
        }
      },
      {
        stepNumber: 3,
        title: "The Comprehensive Tone Realization Matrix",
        thaiTitle: "เมทริกซ์การผันวรรณยุกต์แบบสมบูรณ์",
        summary: "Crossing consonant class with syllable type produces a deterministic tone without tone marks, and distinct shifts with tone marks.",
        thaiSummary: "การผสานระหว่างหมู่อักษรกับประเภทคำเป็น-คำตาย กำหนดเสียงวรรณยุกต์พื้นฐานเมื่อไม่มีรูปวรรณยุกต์ และการเลื่อนเสียงเมื่อมีไม้เอก ไม้โท",
        deepTheory: [
          "Base tone without tone marks (พื้นเสียง):",
          "• อักษรกลาง: คำเป็น → เสียงสามัญ (กา); คำตาย → เสียงเอก (กะ, กัด).",
          "• อักษรสูง: คำเป็น → เสียงจัตวา (ขา); คำตาย → เสียงเอก (ขะ, ขัด).",
          "• อักษรต่ำ: คำเป็น → เสียงสามัญ (คา); คำตายสระสั้น → เสียงตรี (คะ, รัก); คำตายสระยาว → เสียงโท (มาก, พูด).",
          "With Tone Marks on Low Class:",
          "• ไม้เอก ( ่ ) → เสียงโท (ค่า, นั่ง).",
          "• ไม้โท ( ้ ) → เสียงตรี (ค้า, ไม้)."
        ],
        formulaLatex: "\\text{Tone}(\\text{Low Class, คำตาย, สระสั้น}) = \\text{เสียงตรี} \\quad (\\text{e.g., นะ, คะ, รัก, ชิพ})",
        formulaSymbols: [
          { symbol: "\\text{Low Class}", meaning: "อักษรต่ำ 24 ตัว" },
          { symbol: "\\text{เสียงตรี}", meaning: "High tone produced naturally without tone mark" }
        ],
        application: {
          title: "Eliminating Common Orthographic Errors (นะคะ vs นะค่ะ)",
          thaiTitle: "การแก้ปัญหาการเขียนผิดคำว่า 'นะคะ' และ 'นะค่ะ'",
          description: "Understanding this matrix proves why 'คะ' (Low class + Dead syllable + Short vowel) is naturally High tone (เสียงตรี). Writing 'ค่ะ' adds a Mai Ek mark, shifting the tone to Falling tone (เสียงโท), used for polite statements rather than questions.",
          thaiDescription: "ความเข้าใจเมทริกซ์นี้อธิบายว่าทำไม 'คะ' จึงเป็นเสียงตรีอยู่แล้วไม่ต้องใส่ไม้เอก ส่วน 'ค่ะ' มีไม้เอกจึงเป็นเสียงโท ใช้สำหรับตอบรับไม่ใช่คำถาม"
        },
        checkpoint: {
          question: "Why is the word 'รัก' (Low class consonant ร + short vowel + coda ก) pronounced with a High tone (เสียงตรี) without any tone mark?",
          thaiQuestion: "เหตุใดคำว่า 'รัก' (อักษรต่ำ + สระเสียงสั้น + แม่กก) จึงออกเสียงเป็นเสียงตรีโดยไม่ต้องใส่ไม้ตรี?",
          options: [
            "It has an invisible tone mark",
            "Because Low class consonants with short-vowel Dead syllables have a natural High tone (เสียงตรี) base",
            "It is borrowed from Sanskrit",
            "Because it is an irregular exception"
          ],
          correctIndex: 1,
          explanation: "According to the Thai tone matrix, any Low-class consonant in a Dead syllable with a short vowel naturally produces a High tone (เสียงตรี) as its baseline sound.",
          thaiExplanation: "ตามกฎเมทริกซ์วรรณยุกต์ อักษรต่ำคำตายสระเสียงสั้น พื้นเสียงตามธรรมชาติจะเป็นเสียงตรีเสมอ"
        }
      }
    ]
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
          "2. The primary meaning is read from back to front (e.g., ภูมิศาสตร์ = ศาสตร์ (วิชา) + ภูมิ (แผ่นดิน) = วิชาว่าด้วยแผ่นดิน).",
          "3. Syllable liaison: When the first word ends without a written vowel mark, a connecting vowel sound (often /a/ or /i/) is pronounced (e.g., ประวัติศาสตร์ ออกเสียง ปฺระ-หวัด-ติ-สาด).",
          "4. Stripping of vowel markers: The joining boundary drops Thanthakhat (การันต์) and Wisanchani (ะ) from the prior word."
        ],
        formulaLatex: "\\text{Root}_A (\\text{Pali/Skt}) + \\text{Root}_B (\\text{Pali/Skt}) \\xrightarrow{\\text{Samas}} \\text{Compound}_{AB} \\quad (\\text{Meaning: } B \\to A)",
        formulaSymbols: [
          { symbol: "\\text{Root}_A", meaning: "First Pali/Sanskrit morpheme" },
          { symbol: "\\text{Root}_B", meaning: "Second Pali/Sanskrit morpheme determining head noun" }
        ],
        application: {
          title: "Technical Lexicon & Neologisms",
          thaiTitle: "การบัญญัติศัพท์วิชาการในราชบัณฑิตยสภา",
          description: "The Royal Society of Thailand constructs modern scientific terms through Samas compounding (e.g., ดาราศาสตร์ for Astronomy, เทคโนโลยีชีวภาพ for Biotechnology).",
          thaiDescription: "ราชบัณฑิตยสภาใช้หลักคำสมาสในการบัญญัติคำศัพท์วิทยาศาสตร์และเทคโนโลยีสมัยใหม่ เช่น วิศวกรรมศาสตร์, เทคโนโลยีชีวภาพ, ดาราศาสตร์ฟิสิกส์"
        },
        checkpoint: {
          question: "Which of the following is a genuine Kam Samas (คำสมาสแท้)?",
          thaiQuestion: "คำในข้อใดเป็นคำสมาสแท้ที่ถูกต้องตามหลักภาษาศาสตร์?",
          options: [
            "ผลไม้ (ผล [บาลี] + ไม้ [ไทย])",
            "ราชวัง (ราช [บาลี] + วัง [ไทย])",
            "ภูมิศาสตร์ (ภูมิ [บาลี] + ศาสตร์ [สันสกฤต])",
            "รถเก๋ง (รถ [บาลี] + เก๋ง [จีน])"
          ],
          correctIndex: 2,
          explanation: "True Kam Samas requires both words to originate from Pali or Sanskrit. ภูมิ (Pali) + ศาสตร์ (Sanskrit) forms a genuine Samas compound translated from back to front.",
          thaiExplanation: "คำสมาสแท้ต้องประกอบด้วยคำบาลีหรือสันสกฤตทั้งสองคำ ในที่นี้ 'ภูมิศาสตร์' มาจาก บาลี + สันสกฤต ส่วนข้ออื่นมีคำไทยหรือภาษาอื่นปน"
        }
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
          "   - a/aa + i/ii → e (e.g., มหา + อิสี → มเหสี, ราชา + อินทร์ → ราเชนทร์).",
          "   - a/aa + u/uu → o (e.g., ราช + อุปโภค → ราชูปโภค, นร + อุดม → นโรดม).",
          "2. พยัญชนะสนธิ (Consonant Sandhi): Alters consonants according to Sanskrit phonetic grids.",
          "3. นฤคหิตสนธิ (Niggahita Sandhi): The nasal dot (นิคหิต / อัง) transforms into the nasal consonant of the following word's consonant class (e.g., สํ + คม → สังคม [ค อยู่ในวรรค กะ → ง], สํ + ฐาน → สัณฐาน [ฐ อยู่ในวรรค ตะเล็ก → ณ])."
        ],
        formulaLatex: "\\text{Stem}_1 + \\text{Stem}_2 \\xrightarrow{\\text{Vowel Fusion}} a + i \\to e, \\quad a + u \\to o",
        formulaSymbols: [
          { symbol: "\\text{Sandhi}", meaning: "Sanskrit/Pali phonetic boundary fusion" }
        ],
        application: {
          title: "Etymological Precision in Classical Literature",
          thaiTitle: "การสืบค้นรากศัพท์ในวรรณคดีและชื่อบุคคล",
          description: "Deciphering Sondhi allows linguistic scholars to instantly analyze classical Thai names and royal titles (e.g., จุฬาลงกรณ์ = จุฬา + อลงกรณ์, รามาธิบดี = ราม + อธิบดี).",
          thaiDescription: "การเข้าใจคำสนธิช่วยให้สามารถถอดรหัสชื่อมงคล ราชทินนาม และวรรณคดีชั้นสูงได้อย่างแม่นยำ เช่น จุฬาลงกรณ์ มาจาก จุฬา (มงกุฎ) + อลงกรณ์ (เครื่องประดับ)"
        },
        checkpoint: {
          question: "The royal name 'ราเชนทร์' is formed by the Sondhi fusion of which two words?",
          thaiQuestion: "คำว่า 'ราเชนทร์' เกิดจากการสนธิระหว่างคำคู่ใด?",
          options: [
            "ราชา + อินทร์ (สระ อา + อิ กลายเป็น เอ)",
            "ราช + เอนทร์",
            "ราชา + เอ็นทรา",
            "ราเช + นทร์"
          ],
          correctIndex: 0,
          explanation: "In Sanskrit vowel Sandhi, when the front word ends in /a/ or /aa/ and the back word starts with /i/ or /ii/, they fuse into the vowel /e/: ราชา + อินทร์ → ราเชนทร์.",
          thaiExplanation: "ตามกฎสระสนธิ: สระ อา + สระ อิ จะกลืนเสียงกลายเป็น สระ เอ (ราชา + อินทร์ = ราเชนทร์)"
        }
      },
      {
        stepNumber: 3,
        title: "Niggahita Sandhi & Consonant Class Assimilation",
        thaiTitle: "นฤคหิตสนธิและการเชื่อมเสียงตามวรรคพยัญชนะ",
        summary: "The Sanskrit nasal mark Niggahita ( ํ ) transforms into the specific final nasal consonant of the following letter's consonant class.",
        thaiSummary: "นฤคหิต ( ํ ) เมื่อสนธิกับคำหลัง จะแปลงเป็นพยัญชนะตัวสุดท้าย (ตัวที่ 5 ซึ่งเป็นเสียงนาสิก) ของวรรคที่พยัญชนะตัวแรกของคำหลังสังกัดอยู่",
        deepTheory: [
          "Consonant Class Divisions (วรรคพยัญชนะ 5 วรรค):",
          "• วรรค กะ: ก ข ค ฆ [ง] → สํ + กร = สังกร, สํ + คม = สังคม.",
          "• วรรค จะ: จ ฉ ช ซ ฌ [ญ] → สํ + จร = สัญจร, สํ + ชาติ = สัญชาติ.",
          "• วรรค ฏะ (ตะใหญ่): ฏ ฐ ฑ ฒ [ณ] → สํ + ฐาน = สัณฐาน.",
          "• วรรค ตะ (ตะเล็ก): ต ถ ท ธ [น] → สํ + นิบาต = สันนิบาต, สํ + โดษ = สันโดษ.",
          "• วรรค ปะ: ป ผ พ ภ [ม] → สํ + ผัส = สัมผัส, สํ + พัทธ์ = สัมพัทธ์.",
          "• เศษวรรค: ย ร ล ว ศ ษ ส ห ฬ ํ → แปลงนฤคหิตเป็น ง เช่น สํ + สาร = สงสาร, สํ + วาส = สังวาส."
        ],
        formulaLatex: "\\text{สํ} + \\text{Coda}(\\text{Class}_k) \\to \\text{ส} + \\text{Nasal}_k + \\text{Coda}(\\text{Class}_k)",
        formulaSymbols: [
          { symbol: "\\text{Nasal}_k", meaning: "5th consonant of corresponding Sanskrit varga class" }
        ],
        application: {
          title: "Scientific Terms: Relativity (ทฤษฎีสัมพัทธภาพ)",
          thaiTitle: "ศัพท์วิทยาศาสตร์: ทฤษฎีสัมพัทธภาพของไอน์สไตน์",
          description: "Einstein's Theory of Relativity was coined in Thai as 'ทฤษฎีสัมพัทธภาพ' via Niggahita Sandhi: สํ + พัทธ (วรรค ปะ: ป ผ พ ภ [ม]) → สัมพัทธ์ (relative/interconnected).",
          thaiDescription: "คำว่า 'สัมพัทธภาพ' (Relativity) เกิดจากนฤคหิตสนธิ: สํ + พัทธ ซึ่ง พ อยู่ในวรรคปะ นฤคหิตจึงแปลงเป็นตัวสะกด ม เกิดเป็นคำว่า 'สัมพัทธ์'"
        },
        checkpoint: {
          question: "When 'สํ' undergoes Niggahita Sandhi with 'คม' (which begins with ค in วรรคกะ: ก ข ค ฆ ง), what word is formed?",
          thaiQuestion: "เมื่อ 'สํ' สนธิกับคำว่า 'คม' (ซึ่งขึ้นต้นด้วย ค ในวรรคกะ) นฤคหิตจะแปลงเป็นตัวสะกดใด และได้คำว่าอะไร?",
          options: [
            "แปลงเป็น น ได้คำว่า สันคม",
            "แปลงเป็น ม ได้คำว่า สัมคม",
            "แปลงเป็น ง ได้คำว่า สังคม",
            "แปลงเป็น ญ ได้คำว่า สัญคม"
          ],
          correctIndex: 2,
          explanation: "Because ค belongs to วรรค กะ (ก ข ค ฆ ง), the nasal consonant of this class is ง, transforming สํ + คม into 'สังคม'.",
          thaiExplanation: "เนื่องจาก ค อยู่ในวรรคกะ ตัวสุดท้ายของวรรคกะคือ ง นฤคหิตจึงเปลี่ยนเป็นตัวสะกด ง ได้เป็นคำว่า 'สังคม'"
        }
      }
    ]
  }
];
