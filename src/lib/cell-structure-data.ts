/**
 * Eukaryotic Plant and Animal Cytology Data Specification
 * Standardized biological organelles, biochemical functions, and high-yield concepts.
 * FEAT-07 Reference dataset.
 */

export type CellType = 'plant' | 'animal';

export interface Organelle {
  id: string;
  name: string;
  thaiName: string;
  presence: 'both' | 'plant-only' | 'animal-only';
  color: string;
  borderColor: string;
  glowColor: string;
  category: 'genetic' | 'energy' | 'endomembrane' | 'structural';
  function: string;
  functionThai: string;
  structuralDetails: string;
  examKeyPointThai: string;
  coordinates: {
    plant: { cx: number; cy: number; r?: number; rx?: number; ry?: number; rotation?: number };
    animal: { cx: number; cy: number; r?: number; rx?: number; ry?: number; rotation?: number };
  };
}

export const ORGANELLES: Organelle[] = [
  {
    id: 'nucleus',
    name: 'Nucleus & Nucleolus',
    thaiName: 'นิวเคลียสและนิวคลีโอลัส',
    presence: 'both',
    color: '#818cf8',
    borderColor: '#4f46e5',
    glowColor: 'rgba(129, 140, 248, 0.4)',
    category: 'genetic',
    function: 'Houses genomic DNA, regulates gene expression, and synthesizes ribosomal RNA (rRNA) inside the nucleolus.',
    functionThai: 'บรรจุสารพันธุกรรม (DNA) ควบคุมการแสดงออกของยีน และสังเคราะห์ rRNA ภายในนิวคลีโอลัส',
    structuralDetails: 'Double nuclear membrane with nuclear pores, chromatin fibers, and dense nucleolus core.',
    examKeyPointThai: 'เยื่อหุ้มนิวเคลียสเป็นเยื่อ 2 ชั้น (Double membrane) มีรูนิวเคลียร์พอร์ควบคุมการเข้าออกของ mRNA',
    coordinates: {
      plant: { cx: 210, cy: 190, r: 42 },
      animal: { cx: 200, cy: 190, r: 45 },
    },
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    thaiName: 'ไมโทคอนเดรีย',
    presence: 'both',
    color: '#f87171',
    borderColor: '#dc2626',
    glowColor: 'rgba(248, 113, 113, 0.4)',
    category: 'energy',
    function: 'Powerhouse of the cell; produces ATP energy currency through the Krebs cycle and oxidative phosphorylation.',
    functionThai: 'แหล่งผลิตพลังงานหลักของเซลล์ สังเคราะห์โมเลกุล ATP ผ่านวัฏจักรเครบส์และกระบวนการออกซิเดทีฟฟอสฟอรีเลชัน',
    structuralDetails: 'Outer membrane, folded inner cristae membrane increasing surface area, and mitochondrial matrix with mtDNA.',
    examKeyPointThai: 'มีดีเอ็นเอและไรโบโซม 70S ของตนเอง ตามทฤษฎี Endosymbiotic Theory สามารถจำลองตัวเองได้',
    coordinates: {
      plant: { cx: 120, cy: 260, rx: 26, ry: 15, rotation: -25 },
      animal: { cx: 120, cy: 130, rx: 28, ry: 16, rotation: 35 },
    },
  },
  {
    id: 'chloroplast',
    name: 'Chloroplast',
    thaiName: 'คลอโรพลาสต์',
    presence: 'plant-only',
    color: '#4ade80',
    borderColor: '#16a34a',
    glowColor: 'rgba(74, 222, 128, 0.4)',
    category: 'energy',
    function: 'Conducts photosynthesis by absorbing sunlight via chlorophyll pigments to convert CO2 and water into glucose.',
    functionThai: 'ทำหน้าที่สังเคราะห์ด้วยแสง ดูดกลืนพลังงานแสงผ่านคลอโรฟิลล์เพื่อเปลี่ยน CO2 และน้ำเป็นน้ำตาลกลูโคส',
    structuralDetails: 'Double membrane enclosing stroma fluid and stacked thylakoid discs (grana).',
    examKeyPointThai: 'พบเฉพาะในเซลล์พืชและสาหร่าย ไม่พบในเซลล์สัตว์ มีเอนไซม์ RuBisCO อยู่ในสโตรมา',
    coordinates: {
      plant: { cx: 290, cy: 120, rx: 30, ry: 18, rotation: 15 },
      animal: { cx: 0, cy: 0, rx: 0, ry: 0 },
    },
  },
  {
    id: 'vacuole',
    name: 'Vacuole (Central Vacuole)',
    thaiName: 'แวคิวโอล (เซนทรัลแวคิวโอล)',
    presence: 'both',
    color: '#38bdf8',
    borderColor: '#0284c7',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    category: 'structural',
    function: 'Stores water, ions, nutrients, and waste products; generates turgor pressure against the plant cell wall.',
    functionThai: 'กักเก็บน้ำ แร่ธาตุ สารอาหาร และสร้างแรงดันเต่ง (Turgor pressure) ดันผนังเซลล์ให้พืชตั้งตรง',
    structuralDetails: 'Enclosed by a specialized selectively permeable tonoplast membrane.',
    examKeyPointThai: 'ในเซลล์พืชมีขนาดใหญ่มากเรียกว่า Central Vacuole ส่วนในเซลล์สัตว์มีขนาดเล็กหรือไม่มีเลย',
    coordinates: {
      plant: { cx: 150, cy: 140, rx: 48, ry: 38, rotation: 10 },
      animal: { cx: 270, cy: 130, rx: 16, ry: 14, rotation: -10 },
    },
  },
  {
    id: 'rough-er',
    name: 'Rough Endoplasmic Reticulum (RER)',
    thaiName: 'เอนโดพลาสมิกเรติคูลัมแบบขรุขระ (RER)',
    presence: 'both',
    color: '#fb923c',
    borderColor: '#ea580c',
    glowColor: 'rgba(251, 146, 60, 0.4)',
    category: 'endomembrane',
    function: 'Studded with ribosomes; synthesizes, folds, and modifies secretory and membrane proteins.',
    functionThai: 'มีไรโบโซมเกาะที่ผิวด้านนอก ทำหน้าที่สังเคราะห์ โปรตีนพับตัว และส่งต่อไปยังกอลจิคอมเพล็กซ์',
    structuralDetails: 'Interconnected flattened membrane cisternae continuous with the outer nuclear envelope.',
    examKeyPointThai: 'โปรตีนที่สังเคราะห์จาก RER จะถูกส่งออกนอกเซลล์หรือใช้เป็นโปรตีนบนเยื่อหุ้มเซลล์',
    coordinates: {
      plant: { cx: 220, cy: 245, rx: 35, ry: 14, rotation: -10 },
      animal: { cx: 210, cy: 250, rx: 40, ry: 16, rotation: 5 },
    },
  },
  {
    id: 'smooth-er',
    name: 'Smooth Endoplasmic Reticulum (SER)',
    thaiName: 'เอนโดพลาสมิกเรติคูลัมแบบเรียบ (SER)',
    presence: 'both',
    color: '#facc15',
    borderColor: '#ca8a04',
    glowColor: 'rgba(250, 204, 21, 0.4)',
    category: 'endomembrane',
    function: 'Synthesizes lipids, phospholipids, and steroid hormones; metabolizes carbohydrates and detoxifies drugs.',
    functionThai: 'สังเคราะห์ไขมัน ฟอสโฟลิพิด ฮอร์โมนสเตียรอยด์ กำจัดสารพิษในเซลล์ตับ และสะสมแคลเซียมไอออน',
    structuralDetails: 'Tubular network lacking ribosomes on its surface.',
    examKeyPointThai: 'พบมากในเซลล์ตับ (กำจัดสารพิษ) และเซลล์ต่อมหมวกไตชั้นนอก/อัณฑะ/รังไข่ (สร้างสเตียรอยด์)',
    coordinates: {
      plant: { cx: 270, cy: 210, rx: 25, ry: 12, rotation: 40 },
      animal: { cx: 270, cy: 215, rx: 28, ry: 14, rotation: 45 },
    },
  },
  {
    id: 'ribosomes',
    name: 'Ribosomes',
    thaiName: 'ไรโบโซม',
    presence: 'both',
    color: '#f59e0b',
    borderColor: '#d97706',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    category: 'genetic',
    function: 'Non-membrane organelle consisting of large and small ribonucleoprotein subunits that translate mRNA into polypeptide amino acid chains.',
    functionThai: 'ออร์แกเนลล์ขนาดเล็กที่ไม่มีเยื่อหุ้ม ประกอบด้วย rRNA และโปรตีน ทำหน้าที่แปลรหัสพันธุกรรม (Translation) จาก mRNA สังเคราะห์เป็นสายพอลิเพปไทด์',
    structuralDetails: 'Consists of 60S large and 40S small subunits forming 80S ribosomes in eukaryotic cytoplasm; 70S ribosomes in mitochondria and chloroplasts.',
    examKeyPointThai: 'เป็นออร์แกเนลล์ที่ไม่มีเยื่อหุ้ม (Non-membrane bound) ไรโบโซมอิสระในไซโทพลาสซึมสร้างโปรตีนใช้ในเซลล์ ไรโบโซมเกาะบน RER สร้างโปรตีนส่งออกนอกเซลล์',
    coordinates: {
      plant: { cx: 165, cy: 220, r: 16 },
      animal: { cx: 155, cy: 170, r: 16 },
    },
  },
  {
    id: 'golgi',
    name: 'Golgi Apparatus',
    thaiName: 'กอลจิคอมเพล็กซ์ / กอลจิบอดี',
    presence: 'both',
    color: '#c084fc',
    borderColor: '#9333ea',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    category: 'endomembrane',
    function: 'Modifies, sorts, tags with carbohydrates (glycosylation), and packages proteins into vesicles for secretion.',
    functionThai: 'ดัดแปลง เติมหมู่น้ำตาล (Glycosylation) คัดแยก และบรรจุโปรตีนลงในถุงเวสิเคิลเพื่อส่งออก',
    structuralDetails: 'Stack of curved cisternae with distinct cis-entry face and trans-exit face.',
    examKeyPointThai: 'มีทิศทางการทำงานจาก Cis face (รับถุงจาก RER) ไปยัง Trans face (ปล่อยเวสิเคิลออก)',
    coordinates: {
      plant: { cx: 120, cy: 195, rx: 24, ry: 14, rotation: -35 },
      animal: { cx: 130, cy: 220, rx: 28, ry: 15, rotation: -20 },
    },
  },
  {
    id: 'lysosome',
    name: 'Lysosome',
    thaiName: 'ไลโซโซม',
    presence: 'animal-only',
    color: '#f43f5e',
    borderColor: '#be123c',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    category: 'endomembrane',
    function: 'Acidic organelle containing acid hydrolase enzymes; digests cellular waste, foreign bacteria, and performs autophagy.',
    functionThai: 'ถุงบรรจุเอนไซม์ไฮโดรเลสที่มีฤทธิ์เป็นกรด ย่อยสลายสารอาหาร เชื้อโรค และกำจัดออร์แกเนลล์ที่เสื่อมสภาพ',
    structuralDetails: 'Single lipid membrane maintaining internal pH ~4.5 to 5.0.',
    examKeyPointThai: 'เด่นชัดในเซลล์สัตว์โดยเฉพาะเม็ดเลือดขาว (Phagocytosis) และกระบวนการ Autophagy',
    coordinates: {
      plant: { cx: 0, cy: 0, r: 0 },
      animal: { cx: 280, cy: 175, r: 12 },
    },
  },
  {
    id: 'centrosome',
    name: 'Centrosome & Centrioles',
    thaiName: 'เซนโทรโซมและเซนทริโอล',
    presence: 'animal-only',
    color: '#2dd4bf',
    borderColor: '#0f766e',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    category: 'structural',
    function: 'Microtubule-organizing center (MTOC); organizes spindle fibers during mitosis and meiosis cell division.',
    functionThai: 'ศูนย์ควบคุมการสร้างไมโครทิวบูล (MTOC) สร้างเส้นใยสปินเดิลเพื่อดึงโครโมโซมขณะแบ่งเซลล์',
    structuralDetails: 'Pair of cylindrical centrioles arranged perpendicularly in a 9x3 triplet microtubule pattern.',
    examKeyPointThai: 'พบเฉพาะในเซลล์สัตว์และโพรทิสต์บางชนิด เซลล์พืชชั้นสูงไม่มีเซนทริโอลแต่มี MTOC บริเวณขั้วเซลล์',
    coordinates: {
      plant: { cx: 0, cy: 0, r: 0 },
      animal: { cx: 190, cy: 120, r: 14 },
    },
  },
  {
    id: 'cell-wall',
    name: 'Cell Wall',
    thaiName: 'ผนังเซลล์',
    presence: 'plant-only',
    color: '#22c55e',
    borderColor: '#15803d',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    category: 'structural',
    function: 'Rigid outer layer composed of cellulose microfibrils providing structural support, tensile protection, and shape.',
    functionThai: 'ชั้นนอกสุดที่มีความแข็งแรง ประกอบด้วยเส้นใยเซลลูโลส ช่วยคงรูปทรงของเซลล์และป้องกันเซลล์แตกเมื่อแช่ในน้ำ',
    structuralDetails: 'Primary wall with cellulose and pectin, secondary wall with lignin in woody tissues.',
    examKeyPointThai: 'เป็นสารจำพวกคาร์โบไฮเดรต (เซลลูโลส) ยอมให้สารผ่านเข้าออกได้อย่างอิสระ (Freely permeable)',
    coordinates: {
      plant: { cx: 200, cy: 200, rx: 175, ry: 145 },
      animal: { cx: 0, cy: 0 },
    },
  },
  {
    id: 'plasma-membrane',
    name: 'Plasma Membrane',
    thaiName: 'เยื่อหุ้มเซลล์ (พลาสมาเมมเบรน)',
    presence: 'both',
    color: '#06b6d4',
    borderColor: '#0891b2',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    category: 'structural',
    function: 'Selectively permeable phospholipid bilayer regulating transport of substances into and out of the cell.',
    functionThai: 'เยื่อเลือกผ่านฟอสโฟลิพิด 2 ชั้น (Bilayer) ควบคุมการลำเลียงสารเข้าและออกจากเซลล์ และรับสัญญาณภายนอก',
    structuralDetails: 'Fluid mosaic model with embedded transport proteins, cholesterol, and glycoproteins.',
    examKeyPointThai: 'จัดเป็นเยื่อเลือกผ่าน (Semi-permeable membrane) ประกอบด้วยฟอสโฟลิพิดหันส่วนหัวชอบน้ำออกด้านนอก',
    coordinates: {
      plant: { cx: 200, cy: 200, rx: 165, ry: 135 },
      animal: { cx: 200, cy: 200, rx: 160, ry: 140 },
    },
  },
];

export function getOrganellesByCellType(type: CellType): Organelle[] {
  return ORGANELLES.filter(
    (o) => o.presence === 'both' || (type === 'plant' ? o.presence === 'plant-only' : o.presence === 'animal-only')
  );
}

export function getOrganelleById(id: string): Organelle | undefined {
  return ORGANELLES.find((o) => o.id === id);
}
