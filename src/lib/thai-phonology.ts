/**
 * Thai Phonology Engine & Syllable Deconstructor
 * Strictly adhering to Firman Agentic OS Lobe 3 (Aesthetics & Multibyte Discipline)
 * and 3-byte UTF-8 character boundary safety.
 */

export type ConsonantClass = 'mid' | 'high' | 'low';
export type ConsonantSubClass = 'mid' | 'high' | 'low_single' | 'low_pair';
export type VowelLength = 'short' | 'long';
export type SyllableType = 'live' | 'dead'; // คำเป็น | คำตาย
export type ToneMark = 'none' | 'mai_ek' | 'mai_tho' | 'mai_tri' | 'mai_chattawa';
export type ToneSound = 'common' | 'low' | 'falling' | 'high' | 'rising'; // สามัญ, เอก, โท, ตรี, จัตวา

export interface ThaiSyllableAnalysis {
  rawSyllable: string;
  initialConsonant: string;
  initialClass: ConsonantClass;
  initialSubClass: ConsonantSubClass;
  leadingType: 'single' | 'cluster' | 'ho_nam' | 'o_nam';
  vowel: string;
  vowelLength: VowelLength;
  finalConsonant: string;
  spellingSection: string; // e.g. "แม่ กง", "แม่ กก", "แม่ ก กา"
  syllableType: SyllableType; // คำเป็น / คำตาย
  toneMark: ToneMark;
  toneMarkSymbol: string;
  calculatedTone: ToneSound;
  toneNameThai: string; // "สามัญ", "เอก", "โท", "ตรี", "จัตวา"
  toneNameEn: string; // "Common (Mid)", "Low", "Falling", "High", "Rising"
  explanation: string[];
}

// -----------------------------------------------------------------------------
// Consonant Classifications (ไตรยางศ์: อักษร 3 หมู่)
// -----------------------------------------------------------------------------

export const MID_CONSONANTS = new Set(['ก', 'จ', 'ด', 'ต', 'ฎ', 'ฏ', 'บ', 'ป', 'อ']);
export const HIGH_CONSONANTS = new Set(['ข', 'ฃ', 'ฉ', 'ฐ', 'ถ', 'ผ', 'ฝ', 'ศ', 'ษ', 'ส', 'ห']);
export const LOW_SINGLE_CONSONANTS = new Set(['ง', 'ญ', 'ณ', 'น', 'ม', 'ย', 'ร', 'ล', 'ว', 'ฬ']);
export const LOW_PAIRED_CONSONANTS = new Set(['ค', 'ฅ', 'ฆ', 'ช', 'ซ', 'ฌ', 'ฑ', 'ฒ', 'ท', 'ธ', 'พ', 'ฟ', 'ภ', 'ฮ']);

// -----------------------------------------------------------------------------
// Valid True Consonant Clusters in Thai Phonology (อักษรควบแท้)
// -----------------------------------------------------------------------------
const TRUE_CLUSTERS_R = new Set(['กร', 'ขร', 'คร', 'ตร', 'ปร', 'พร']);
const TRUE_CLUSTERS_L = new Set(['กล', 'ขล', 'คล', 'ปล', 'ผล', 'พล']);
const TRUE_CLUSTERS_W = new Set(['กว', 'ขว', 'คว']);

// -----------------------------------------------------------------------------
// Spelling Sections (มาตราตัวสะกด 8 แม่ + แม่ ก กา)
// -----------------------------------------------------------------------------

const FINAL_SONORANTS = {
  KONG: new Set(['ง']),
  KON: new Set(['น', 'ณ', 'ญ', 'ร', 'ล', 'ฬ']),
  KOM: new Set(['ม']),
  KOEY: new Set(['ย']),
  KOEW: new Set(['ว']),
};

const FINAL_STOPS = {
  KOK: new Set(['ก', 'ข', 'ค', 'ฆ']),
  KOP: new Set(['บ', 'ป', 'พ', 'ฟ', 'ภ']),
  KOT: new Set(['ด', 'ต', 'ถ', 'ท', 'ธ', 'จ', 'ช', 'ซ', 'ฌ', 'ฎ', 'ฏ', 'ฐ', 'ฑ', 'ฒ', 'ศ', 'ษ', 'ส']),
};

const TONE_MARKS: Record<string, ToneMark> = {
  '\u0E48': 'mai_ek',      // ่
  '\u0E49': 'mai_tho',     // ้
  '\u0E4A': 'mai_tri',     // ๊
  '\u0E4B': 'mai_chattawa', // ๋
};

const TONE_NAMES_THAI: Record<ToneSound, string> = {
  common: 'สามัญ',
  low: 'เอก',
  falling: 'โท',
  high: 'ตรี',
  rising: 'จัตวา',
};

const TONE_NAMES_EN: Record<ToneSound, string> = {
  common: 'Common (Mid)',
  low: 'Low',
  falling: 'Falling',
  high: 'High',
  rising: 'Rising',
};

/**
 * Returns consonant classification for a single Thai consonant character.
 */
export function getConsonantClass(char: string): { class: ConsonantClass; subClass: ConsonantSubClass } {
  if (MID_CONSONANTS.has(char)) {
    return { class: 'mid', subClass: 'mid' };
  }
  if (HIGH_CONSONANTS.has(char)) {
    return { class: 'high', subClass: 'high' };
  }
  if (LOW_SINGLE_CONSONANTS.has(char)) {
    return { class: 'low', subClass: 'low_single' };
  }
  return { class: 'low', subClass: 'low_pair' };
}

/**
 * Identify final spelling section (มาตราตัวสะกด) and whether it is sonorant or stop.
 */
export function identifyFinalConsonant(char: string): {
  section: string;
  isSonorant: boolean;
  isStop: boolean;
} {
  if (!char) {
    return { section: 'แม่ ก กา', isSonorant: false, isStop: false };
  }
  if (FINAL_SONORANTS.KONG.has(char)) return { section: 'แม่ กง', isSonorant: true, isStop: false };
  if (FINAL_SONORANTS.KON.has(char)) return { section: 'แม่ กน', isSonorant: true, isStop: false };
  if (FINAL_SONORANTS.KOM.has(char)) return { section: 'แม่ กม', isSonorant: true, isStop: false };
  if (FINAL_SONORANTS.KOEY.has(char)) return { section: 'แม่ เกย', isSonorant: true, isStop: false };
  if (FINAL_SONORANTS.KOEW.has(char)) return { section: 'แม่ เกอว', isSonorant: true, isStop: false };

  if (FINAL_STOPS.KOK.has(char)) return { section: 'แม่ กก', isSonorant: false, isStop: true };
  if (FINAL_STOPS.KOP.has(char)) return { section: 'แม่ กบ', isSonorant: false, isStop: true };
  if (FINAL_STOPS.KOT.has(char)) return { section: 'แม่ กด', isSonorant: false, isStop: true };

  return { section: 'แม่ ก กา', isSonorant: false, isStop: false };
}

/**
 * Calculates tone according to standard Central Thai phonological rules:
 * - Triyang (Initial class)
 * - Syllable status (Live / Dead)
 * - Vowel length (Short / Long)
 * - Tone mark (None, Ek, Tho, Tri, Chattawa)
 */
export function calculateThaiTone(
  consonantClass: ConsonantClass,
  syllableType: SyllableType,
  vowelLength: VowelLength,
  toneMark: ToneMark
): { tone: ToneSound; explanation: string[] } {
  const explanation: string[] = [];

  const classThai = consonantClass === 'mid' ? 'อักษรกลาง' : consonantClass === 'high' ? 'อักษรสูง' : 'อักษรต่ำ';
  const typeThai = syllableType === 'live' ? 'คำเป็น' : 'คำตาย';
  const lengthThai = vowelLength === 'short' ? 'สระเสียงสั้น' : 'สระเสียงยาว';

  explanation.push(`พยัญชนะต้นเป็น ${classThai}`);
  explanation.push(`พยางค์นี้เป็น ${typeThai} (${lengthThai})`);

  if (toneMark !== 'none') {
    const markName =
      toneMark === 'mai_ek'
        ? 'ไม้เอก (่)'
        : toneMark === 'mai_tho'
        ? 'ไม้โท (้)'
        : toneMark === 'mai_tri'
        ? 'ไม้ตรี (๊)'
        : 'ไม้จัตวา (๋)';
    explanation.push(`มีรูปวรรณยุกต์ ${markName}`);
  } else {
    explanation.push('ไม่มีรูปวรรณยุกต์กำกับ (รูปสามัญ)');
  }

  // 1. อักษรกลาง
  if (consonantClass === 'mid') {
    if (toneMark === 'mai_ek') {
      explanation.push('อักษรกลาง + ไม้เอก -> เสียงเอก');
      return { tone: 'low', explanation };
    }
    if (toneMark === 'mai_tho') {
      explanation.push('อักษรกลาง + ไม้โท -> เสียงโท');
      return { tone: 'falling', explanation };
    }
    if (toneMark === 'mai_tri') {
      explanation.push('อักษรกลาง + ไม้ตรี -> เสียงตรี');
      return { tone: 'high', explanation };
    }
    if (toneMark === 'mai_chattawa') {
      explanation.push('อักษรกลาง + ไม้จัตวา -> เสียงจัตวา');
      return { tone: 'rising', explanation };
    }

    // No mark
    if (syllableType === 'live') {
      explanation.push('อักษรกลาง + คำเป็น + ไม่มีรูปวรรณยุกต์ -> เสียงสามัญ');
      return { tone: 'common', explanation };
    } else {
      explanation.push('อักษรกลาง + คำตาย + ไม่มีรูปวรรณยุกต์ -> เสียงเอก');
      return { tone: 'low', explanation };
    }
  }

  // 2. อักษรสูง
  if (consonantClass === 'high') {
    if (toneMark === 'mai_ek') {
      explanation.push('อักษรสูง + ไม้เอก -> เสียงเอก');
      return { tone: 'low', explanation };
    }
    if (toneMark === 'mai_tho') {
      explanation.push('อักษรสูง + ไม้โท -> เสียงโท');
      return { tone: 'falling', explanation };
    }

    // No mark
    if (syllableType === 'live') {
      explanation.push('อักษรสูง + คำเป็น + ไม่มีรูปวรรณยุกต์ -> เสียงจัตวา');
      return { tone: 'rising', explanation };
    } else {
      explanation.push('อักษรสูง + คำตาย + ไม่มีรูปวรรณยุกต์ -> เสียงเอก');
      return { tone: 'low', explanation };
    }
  }

  // 3. อักษรต่ำ
  if (consonantClass === 'low') {
    if (toneMark === 'mai_ek') {
      explanation.push('อักษรต่ำ + ไม้เอก -> เสียงโท');
      return { tone: 'falling', explanation };
    }
    if (toneMark === 'mai_tho') {
      explanation.push('อักษรต่ำ + ไม้โท -> เสียงตรี');
      return { tone: 'high', explanation };
    }
    if (toneMark === 'mai_tri') {
      explanation.push('อักษรต่ำ + ไม้ตรี -> เสียงตรี');
      return { tone: 'high', explanation };
    }
    if (toneMark === 'mai_chattawa') {
      explanation.push('อักษรต่ำ + ไม้จัตวา -> เสียงจัตวา');
      return { tone: 'rising', explanation };
    }

    // No mark
    if (syllableType === 'live') {
      explanation.push('อักษรต่ำ + คำเป็น + ไม่มีรูปวรรณยุกต์ -> เสียงสามัญ');
      return { tone: 'common', explanation };
    } else {
      // Dead syllable
      if (vowelLength === 'short') {
        explanation.push('อักษรต่ำ + คำตาย (สระสั้น) + ไม่มีรูปวรรณยุกต์ -> เสียงตรี');
        return { tone: 'high', explanation };
      } else {
        explanation.push('อักษรต่ำ + คำตาย (สระยาว) + ไม่มีรูปวรรณยุกต์ -> เสียงโท');
        return { tone: 'falling', explanation };
      }
    }
  }

  return { tone: 'common', explanation };
}

const isThaiConsonant = (c: string) => c >= '\u0E01' && c <= '\u0E2E';

/**
 * Deconstructs a Thai syllable into its phonetic constituents and calculates tone.
 */
export function deconstructThaiSyllable(rawInput: string): ThaiSyllableAnalysis {
  const cleanInput = rawInput.trim();
  if (!cleanInput) {
    return {
      rawSyllable: '',
      initialConsonant: '',
      initialClass: 'mid',
      initialSubClass: 'mid',
      leadingType: 'single',
      vowel: '',
      vowelLength: 'short',
      finalConsonant: '',
      spellingSection: 'แม่ ก กา',
      syllableType: 'dead',
      toneMark: 'none',
      toneMarkSymbol: '',
      calculatedTone: 'common',
      toneNameThai: 'สามัญ',
      toneNameEn: 'Common (Mid)',
      explanation: ['กรุณาป้อนคำหรือพยางค์ภาษาไทย'],
    };
  }

  // 1. Detect and extract tone mark
  let toneMark: ToneMark = 'none';
  let toneMarkSymbol = '';
  for (const char of cleanInput) {
    if (TONE_MARKS[char]) {
      toneMark = TONE_MARKS[char];
      toneMarkSymbol = char;
      break;
    }
  }

  // 2. Strip Thanthakhat (การันต์) and its silenced consonants
  // Any consonant immediately preceding \u0E4C (์), plus optional floating vowel (ิ, ุ) before ์
  const sanitizedChars = Array.from(cleanInput);
  const thanthakhatIdx = sanitizedChars.indexOf('\u0E4C');
  if (thanthakhatIdx !== -1) {
    let cutStart = thanthakhatIdx - 1;
    while (cutStart > 0 && !isThaiConsonant(sanitizedChars[cutStart])) {
      cutStart--;
    }
    sanitizedChars.splice(cutStart, thanthakhatIdx - cutStart + 1);
  }

  // Filter out tone marks from working array
  const charsWithoutTones = sanitizedChars.filter((c) => !TONE_MARKS[c] && c !== '\u0E4C');
  const workingStr = charsWithoutTones.join('');

  // 3. Parse leading vowel (เ, แ, โ, ใ, ไ)
  let leadingVowel = '';
  let startIndex = 0;
  if (charsWithoutTones.length > 0 && ['เ', 'แ', 'โ', 'ใ', 'ไ'].includes(charsWithoutTones[0])) {
    leadingVowel = charsWithoutTones[0];
    startIndex = 1;
  }

  // 4. Identify consonant indices
  const consonantIndices: number[] = [];
  for (let i = startIndex; i < charsWithoutTones.length; i++) {
    if (isThaiConsonant(charsWithoutTones[i])) {
      consonantIndices.push(i);
    }
  }

  let initialConsonant = '';
  let finalConsonant = '';
  let leadingType: 'single' | 'cluster' | 'ho_nam' | 'o_nam' = 'single';
  let effectiveClassChar = '';
  let isUaVowel = false;

  const hasChar = (c: string) => workingStr.includes(c);
  const hasVowelSign = () =>
    hasChar('า') ||
    hasChar('\u0E31') || // ั
    hasChar('\u0E34') || // ิ
    hasChar('\u0E35') || // ี
    hasChar('\u0E36') || // ึ
    hasChar('\u0E37') || // ื
    hasChar('\u0E38') || // ุ
    hasChar('\u0E39') || // ู
    hasChar('ะ') ||
    hasChar('\u0E47') || // ็
    leadingVowel !== '';

  // 5. Initial Consonant and Cluster Identification
  if (consonantIndices.length === 0) {
    initialConsonant = 'อ';
    effectiveClassChar = 'อ';
  } else if (consonantIndices.length === 1) {
    initialConsonant = charsWithoutTones[consonantIndices[0]];
    effectiveClassChar = initialConsonant;
  } else if (consonantIndices.length === 2) {
    const c1 = charsWithoutTones[consonantIndices[0]];
    const c2 = charsWithoutTones[consonantIndices[1]];
    const cluster2 = c1 + c2;

    // Check Ho-Nam (ห นำ อักษรต่ำเดี่ยว)
    if (c1 === 'ห' && LOW_SINGLE_CONSONANTS.has(c2) && consonantIndices[1] === consonantIndices[0] + 1) {
      initialConsonant = cluster2;
      effectiveClassChar = 'ห';
      leadingType = 'ho_nam';
    }
    // Check O-Nam (อ นำ ย)
    else if (c1 === 'อ' && c2 === 'ย' && consonantIndices[1] === consonantIndices[0] + 1) {
      initialConsonant = cluster2;
      effectiveClassChar = 'อ';
      leadingType = 'o_nam';
    }
    // Check open สระ อัว (-ัว) e.g. "ตัว", "หัว", "บัว", "วัว", "ชั่ว"
    else if (c2 === 'ว' && hasChar('\u0E31')) {
      initialConsonant = c1;
      effectiveClassChar = c1;
      isUaVowel = true;
      finalConsonant = ''; // Open syllable in แม่ ก กา
    }
    // Check open สระ เอีย (เ-ีย) e.g. "เสีย", "เปีย", "เมีย"
    else if (leadingVowel === 'เ' && c2 === 'ย' && hasChar('\u0E35')) {
      initialConsonant = c1;
      effectiveClassChar = c1;
      finalConsonant = ''; // Open syllable in แม่ ก กา
    }
    // Check open สระ เอือ (เ-ือ) e.g. "เสือ", "เรือ", "เนื้อ"
    else if (leadingVowel === 'เ' && c2 === 'อ' && hasChar('\u0E37')) {
      initialConsonant = c1;
      effectiveClassChar = c1;
      finalConsonant = ''; // Open syllable in แม่ ก กา
    }
    // Check open สระ เออ (เ-อ) e.g. "เธอ", "เจอ", "เรอ"
    else if (leadingVowel === 'เ' && c2 === 'อ' && !hasChar('\u0E34') && !hasChar('\u0E37')) {
      initialConsonant = c1;
      effectiveClassChar = c1;
      finalConsonant = ''; // Open syllable in แม่ ก กา
    }
    // Check true clusters (คำควบแท้) with vowel signs
    else if (
      consonantIndices[1] === consonantIndices[0] + 1 &&
      (TRUE_CLUSTERS_R.has(cluster2) || TRUE_CLUSTERS_L.has(cluster2) || TRUE_CLUSTERS_W.has(cluster2)) &&
      (hasChar('า') || hasChar('\u0E31') || hasChar('\u0E34') || hasChar('\u0E35') || hasChar('\u0E36') || hasChar('\u0E37') || hasChar('\u0E38') || hasChar('\u0E39') || hasChar('ะ'))
    ) {
      initialConsonant = cluster2;
      effectiveClassChar = c1;
      leadingType = 'cluster';
    } else {
      // First is initial, second is final consonant
      initialConsonant = c1;
      effectiveClassChar = c1;
      finalConsonant = c2;
    }
  } else {
    // 3 or more consonants
    const c1 = charsWithoutTones[consonantIndices[0]];
    const c2 = charsWithoutTones[consonantIndices[1]];
    const cluster2 = c1 + c2;
    const lastConsonant = charsWithoutTones[consonantIndices[consonantIndices.length - 1]];

    // 1. Ho-Nam
    if (c1 === 'ห' && LOW_SINGLE_CONSONANTS.has(c2) && consonantIndices[1] === consonantIndices[0] + 1) {
      initialConsonant = cluster2;
      effectiveClassChar = 'ห';
      leadingType = 'ho_nam';
      finalConsonant = lastConsonant;
    }
    // 2. O-Nam
    else if (c1 === 'อ' && c2 === 'ย' && consonantIndices[1] === consonantIndices[0] + 1) {
      initialConsonant = cluster2;
      effectiveClassChar = 'อ';
      leadingType = 'o_nam';
      finalConsonant = lastConsonant;
    }
    // 3. Cluster with ร or ล (e.g. กราบ, กลัว, กล้วย)
    else if (
      consonantIndices[1] === consonantIndices[0] + 1 &&
      (TRUE_CLUSTERS_R.has(cluster2) || TRUE_CLUSTERS_L.has(cluster2))
    ) {
      if (lastConsonant === 'ว' && hasChar('\u0E31')) {
        initialConsonant = cluster2;
        effectiveClassChar = c1;
        leadingType = 'cluster';
        isUaVowel = true;
        finalConsonant = '';
      } else if (charsWithoutTones[consonantIndices[2]] === 'ว' && !hasChar('า') && !hasChar('\u0E31') && !hasChar('\u0E34') && !hasChar('\u0E35')) {
        // e.g. "กล้วย" : cluster "กล", vowel "-ัว-", final "ย"
        initialConsonant = cluster2;
        effectiveClassChar = c1;
        leadingType = 'cluster';
        isUaVowel = true;
        finalConsonant = lastConsonant;
      } else {
        initialConsonant = cluster2;
        effectiveClassChar = c1;
        leadingType = 'cluster';
        finalConsonant = lastConsonant;
      }
    }
    // 4. Cluster with ว (กว, ขว, คว) when ANOTHER vowel sign is present (e.g. กวาง, ขวาน, ควัน, แกว่ง)
    else if (
      consonantIndices[1] === consonantIndices[0] + 1 &&
      TRUE_CLUSTERS_W.has(cluster2) &&
      hasVowelSign()
    ) {
      initialConsonant = cluster2;
      effectiveClassChar = c1;
      leadingType = 'cluster';
      finalConsonant = lastConsonant;
    }
    // 5. Single initial followed by vowel -ัว- (ลดรูป), e.g. "ขวด", "บวก", "สวน", "ดวง", "พวก", "มวย", "ช่วย", "กวน", "ควบ"
    else {
      const middleHasW = consonantIndices.some(
        (idx, i) => i > 0 && i < consonantIndices.length - 1 && charsWithoutTones[idx] === 'ว'
      );
      if (middleHasW && !hasChar('า') && !hasChar('\u0E31') && !hasChar('\u0E34') && !hasChar('\u0E35')) {
        initialConsonant = c1;
        effectiveClassChar = c1;
        isUaVowel = true;
        finalConsonant = lastConsonant;
      } else {
        initialConsonant = c1;
        effectiveClassChar = c1;
        finalConsonant = lastConsonant;
      }
    }
  }

  // 6. Analyze Initial Consonant Class
  const classInfo = getConsonantClass(effectiveClassChar);

  // 7. Analyze Vowel Length and Identity
  let vowel = '';
  let vowelLength: VowelLength = 'long';

  // Check compound / diphthong patterns first
  if (leadingVowel === 'เ' && hasChar('า') && hasChar('ะ')) {
    vowel = 'เ-าะ';
    vowelLength = 'short';
  } else if (leadingVowel === 'เ' && hasChar('อ') && hasChar('ะ')) {
    vowel = 'เ-อะ';
    vowelLength = 'short';
  } else if (leadingVowel === 'แ' && hasChar('ะ')) {
    vowel = 'แ-ะ';
    vowelLength = 'short';
  } else if (leadingVowel === 'โ' && hasChar('ะ')) {
    vowel = 'โ-ะ';
    vowelLength = 'short';
  } else if (leadingVowel === 'เ' && hasChar('ะ')) {
    vowel = 'เ-ะ';
    vowelLength = 'short';
  } else if (hasChar('\u0E47')) { // ไม้ไต่คู้ (็) always marks short vowel
    vowel = leadingVowel ? `${leadingVowel}-็-` : '-็-';
    vowelLength = 'short';
  } else if (leadingVowel === 'เ' && hasChar('\u0E35') && hasChar('ย')) {
    vowel = 'เ-ีย';
    vowelLength = 'long';
  } else if (leadingVowel === 'เ' && hasChar('\u0E37') && (hasChar('อ') || finalConsonant)) {
    vowel = 'เ-ือ';
    vowelLength = 'long';
  } else if (leadingVowel === 'เ' && hasChar('\u0E34')) {
    // เ-ิ- : สระ เออ แปลงรูปเมื่อมีตัวสะกด เช่น เดิน, เงิน, เกิด, เชิด, เลิศ
    vowel = 'เ-อ (แปลงรูป เ-ิ)';
    vowelLength = 'long';
  } else if (leadingVowel === 'เ' && (hasChar('อ') || finalConsonant === 'ย')) {
    // เ-อ open e.g. เธอ, เจอ หรือ เ-ย e.g. เลย, เฉย (สระ เออ ลดรูป)
    vowel = finalConsonant === 'ย' ? 'เ-อ (ลดรูป)' : 'เ-อ';
    vowelLength = 'long';
  } else if (isUaVowel) {
    if (!finalConsonant) {
      vowel = '-ัว';
      vowelLength = 'long';
    } else {
      vowel = '-ัว (ลดรูป)';
      vowelLength = 'long';
    }
  } else if (hasChar('ะ')) {
    vowel = leadingVowel ? `${leadingVowel}-ะ` : '-ะ';
    vowelLength = 'short';
  } else if (hasChar('\u0E31')) { // ั (ไม้หันอากาศ)
    vowel = '-ั-';
    vowelLength = 'short';
  } else if (hasChar('\u0E34')) { // ิ
    vowel = '-ิ';
    vowelLength = 'short';
  } else if (hasChar('\u0E36')) { // ึ
    vowel = '-ึ';
    vowelLength = 'short';
  } else if (hasChar('\u0E38')) { // ุ
    vowel = '-ุ';
    vowelLength = 'short';
  }
  // Special diphthongs with inherent sonorant endings
  else if (leadingVowel === 'ใ') {
    vowel = 'ใ-';
    vowelLength = 'long';
  } else if (leadingVowel === 'ไ') {
    vowel = 'ไ-';
    vowelLength = 'long';
  } else if (hasChar('ำ')) {
    vowel = '-ำ';
    vowelLength = 'long';
  } else if (leadingVowel === 'เ' && hasChar('า')) {
    vowel = 'เ-า';
    vowelLength = 'long';
  }
  // Standard long vowels
  else if (hasChar('า')) {
    vowel = leadingVowel ? `${leadingVowel}-า` : '-า';
    vowelLength = 'long';
  } else if (hasChar('\u0E35')) { // ี
    vowel = '-ี';
    vowelLength = 'long';
  } else if (hasChar('\u0E37')) { // ื
    vowel = '-ื';
    vowelLength = 'long';
  } else if (hasChar('\u0E39')) { // ู
    vowel = '-ู';
    vowelLength = 'long';
  } else if (leadingVowel === 'โ') {
    vowel = 'โ-';
    vowelLength = 'long';
  } else if (leadingVowel === 'แ') {
    vowel = 'แ-';
    vowelLength = 'long';
  } else if (leadingVowel === 'เ') {
    vowel = 'เ-';
    vowelLength = 'long';
  } else if (hasChar('อ') && finalConsonant) {
    vowel = '-อ-';
    vowelLength = 'long';
  } else {
    if (finalConsonant) {
      vowel = 'โ-ะ (ลดรูป)';
      vowelLength = 'short';
    } else {
      vowel = '-อ (ก กา)';
      vowelLength = 'long';
    }
  }

  // 8. Analyze Final Consonant and Live/Dead Status
  const finalInfo = identifyFinalConsonant(finalConsonant);
  let syllableType: SyllableType = 'live';

  if (finalConsonant) {
    syllableType = finalInfo.isStop ? 'dead' : 'live';
  } else {
    // แม่ ก กา: Determined by vowel length
    syllableType = vowelLength === 'short' ? 'dead' : 'live';
  }

  // 9. Calculate Tone Sound
  const toneResult = calculateThaiTone(classInfo.class, syllableType, vowelLength, toneMark);

  return {
    rawSyllable: cleanInput,
    initialConsonant,
    initialClass: classInfo.class,
    initialSubClass: classInfo.subClass,
    leadingType,
    vowel,
    vowelLength,
    finalConsonant,
    spellingSection: finalInfo.section,
    syllableType,
    toneMark,
    toneMarkSymbol,
    calculatedTone: toneResult.tone,
    toneNameThai: TONE_NAMES_THAI[toneResult.tone],
    toneNameEn: TONE_NAMES_EN[toneResult.tone],
    explanation: toneResult.explanation,
  };
}
