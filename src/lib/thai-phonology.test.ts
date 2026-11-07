import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  getConsonantClass,
  identifyFinalConsonant,
  calculateThaiTone,
  deconstructThaiSyllable,
  MID_CONSONANTS,
  HIGH_CONSONANTS,
  LOW_SINGLE_CONSONANTS,
  LOW_PAIRED_CONSONANTS,
} from "./thai-phonology.ts";

describe("Thai Phonology Engine & Triyang Rules", () => {
  describe("Consonant Classification (อักษร 3 หมู่)", () => {
    test("correctly identifies all 9 mid-class consonants (อักษรกลาง)", () => {
      const midExpected = ["ก", "จ", "ด", "ต", "ฎ", "ฏ", "บ", "ป", "อ"];
      assert.equal(MID_CONSONANTS.size, 9);
      for (const char of midExpected) {
        const result = getConsonantClass(char);
        assert.equal(result.class, "mid", `Expected ${char} to be mid`);
        assert.equal(result.subClass, "mid");
      }
    });

    test("correctly identifies all 11 high-class consonants (อักษรสูง)", () => {
      const highExpected = ["ข", "ฃ", "ฉ", "ฐ", "ถ", "ผ", "ฝ", "ศ", "ษ", "ส", "ห"];
      assert.equal(HIGH_CONSONANTS.size, 11);
      for (const char of highExpected) {
        const result = getConsonantClass(char);
        assert.equal(result.class, "high", `Expected ${char} to be high`);
        assert.equal(result.subClass, "high");
      }
    });

    test("correctly differentiates low-single (sonorants) and low-paired (obstruents)", () => {
      const lowSingleExpected = ["ง", "ญ", "ณ", "น", "ม", "ย", "ร", "ล", "ว", "ฬ"];
      assert.equal(LOW_SINGLE_CONSONANTS.size, 10);
      for (const char of lowSingleExpected) {
        const result = getConsonantClass(char);
        assert.equal(result.class, "low");
        assert.equal(result.subClass, "low_single");
      }

      const lowPairedExpected = ["ค", "ฅ", "ฆ", "ช", "ซ", "ฌ", "ฑ", "ฒ", "ท", "ธ", "พ", "ฟ", "ภ", "ฮ"];
      assert.equal(LOW_PAIRED_CONSONANTS.size, 14);
      for (const char of lowPairedExpected) {
        const result = getConsonantClass(char);
        assert.equal(result.class, "low");
        assert.equal(result.subClass, "low_pair");
      }
    });
  });

  describe("Final Spelling Sections (มาตราตัวสะกด 8 แม่ + ก กา)", () => {
    test("classifies sonorants as live endings", () => {
      assert.deepEqual(identifyFinalConsonant("ง"), { section: "แม่ กง", isSonorant: true, isStop: false });
      assert.deepEqual(identifyFinalConsonant("น"), { section: "แม่ กน", isSonorant: true, isStop: false });
      assert.deepEqual(identifyFinalConsonant("ล"), { section: "แม่ กน", isSonorant: true, isStop: false });
      assert.deepEqual(identifyFinalConsonant("ม"), { section: "แม่ กม", isSonorant: true, isStop: false });
      assert.deepEqual(identifyFinalConsonant("ย"), { section: "แม่ เกย", isSonorant: true, isStop: false });
      assert.deepEqual(identifyFinalConsonant("ว"), { section: "แม่ เกอว", isSonorant: true, isStop: false });
    });

    test("classifies stops as dead endings", () => {
      assert.deepEqual(identifyFinalConsonant("ก"), { section: "แม่ กก", isSonorant: false, isStop: true });
      assert.deepEqual(identifyFinalConsonant("ข"), { section: "แม่ กก", isSonorant: false, isStop: true });
      assert.deepEqual(identifyFinalConsonant("บ"), { section: "แม่ กบ", isSonorant: false, isStop: true });
      assert.deepEqual(identifyFinalConsonant("ภ"), { section: "แม่ กบ", isSonorant: false, isStop: true });
      assert.deepEqual(identifyFinalConsonant("ด"), { section: "แม่ กด", isSonorant: false, isStop: true });
      assert.deepEqual(identifyFinalConsonant("ต"), { section: "แม่ กด", isSonorant: false, isStop: true });
      assert.deepEqual(identifyFinalConsonant("ส"), { section: "แม่ กด", isSonorant: false, isStop: true });
    });

    test("handles open syllable (แม่ ก กา)", () => {
      assert.deepEqual(identifyFinalConsonant(""), { section: "แม่ ก กา", isSonorant: false, isStop: false });
    });
  });

  describe("Tone Sound Rules (การผันเสียงวรรณยุกต์)", () => {
    test("Mid class rules: 5 tones possible", () => {
      // Live syllable
      assert.equal(calculateThaiTone("mid", "live", "long", "none").tone, "common");
      assert.equal(calculateThaiTone("mid", "live", "long", "mai_ek").tone, "low");
      assert.equal(calculateThaiTone("mid", "live", "long", "mai_tho").tone, "falling");
      assert.equal(calculateThaiTone("mid", "live", "long", "mai_tri").tone, "high");
      assert.equal(calculateThaiTone("mid", "live", "long", "mai_chattawa").tone, "rising");

      // Dead syllable
      assert.equal(calculateThaiTone("mid", "dead", "short", "none").tone, "low");
      assert.equal(calculateThaiTone("mid", "dead", "long", "none").tone, "low");
    });

    test("High class rules: 3 tones possible", () => {
      // Live syllable
      assert.equal(calculateThaiTone("high", "live", "long", "none").tone, "rising");
      assert.equal(calculateThaiTone("high", "live", "long", "mai_ek").tone, "low");
      assert.equal(calculateThaiTone("high", "live", "long", "mai_tho").tone, "falling");

      // Dead syllable
      assert.equal(calculateThaiTone("high", "dead", "short", "none").tone, "low");
      assert.equal(calculateThaiTone("high", "dead", "long", "none").tone, "low");
    });

    test("Low class rules: tone shift with marks", () => {
      // Live syllable
      assert.equal(calculateThaiTone("low", "live", "long", "none").tone, "common");
      assert.equal(calculateThaiTone("low", "live", "long", "mai_ek").tone, "falling"); // Ek -> Falling
      assert.equal(calculateThaiTone("low", "live", "long", "mai_tho").tone, "high");    // Tho -> High

      // Dead syllable
      assert.equal(calculateThaiTone("low", "dead", "short", "none").tone, "high");    // e.g. คะ, คัด
      assert.equal(calculateThaiTone("low", "dead", "long", "none").tone, "falling");   // e.g. คาด
    });
  });

  describe("End-to-End Syllable Deconstruction & Complex Vowel Heuristics", () => {
    test("deconstructs mid-class syllables accurately", () => {
      const kang = deconstructThaiSyllable("กาง");
      assert.equal(kang.initialConsonant, "ก");
      assert.equal(kang.initialClass, "mid");
      assert.equal(kang.vowelLength, "long");
      assert.equal(kang.finalConsonant, "ง");
      assert.equal(kang.syllableType, "live");
      assert.equal(kang.calculatedTone, "common");

      const kat = deconstructThaiSyllable("กัด");
      assert.equal(kat.initialConsonant, "ก");
      assert.equal(kat.initialClass, "mid");
      assert.equal(kat.vowelLength, "short");
      assert.equal(kat.finalConsonant, "ด");
      assert.equal(kat.syllableType, "dead");
      assert.equal(kat.calculatedTone, "low");

      const kaMaiChattawa = deconstructThaiSyllable("ก๋า");
      assert.equal(kaMaiChattawa.initialConsonant, "ก");
      assert.equal(kaMaiChattawa.toneMark, "mai_chattawa");
      assert.equal(kaMaiChattawa.calculatedTone, "rising");
    });

    test("deconstructs high-class syllables accurately", () => {
      const khao = deconstructThaiSyllable("ขาว");
      assert.equal(khao.initialConsonant, "ข");
      assert.equal(khao.initialClass, "high");
      assert.equal(khao.syllableType, "live");
      assert.equal(khao.calculatedTone, "rising");

      const khaMaiEk = deconstructThaiSyllable("ข่า");
      assert.equal(khaMaiEk.toneMark, "mai_ek");
      assert.equal(khaMaiEk.calculatedTone, "low");

      const khaMaiTho = deconstructThaiSyllable("ข้า");
      assert.equal(khaMaiTho.toneMark, "mai_tho");
      assert.equal(khaMaiTho.calculatedTone, "falling");
    });

    test("deconstructs low-class syllables and dead tone shifts", () => {
      const khan = deconstructThaiSyllable("คาน");
      assert.equal(khan.initialConsonant, "ค");
      assert.equal(khan.initialClass, "low");
      assert.equal(khan.calculatedTone, "common");

      const khanMaiEk = deconstructThaiSyllable("ค่าน");
      assert.equal(khanMaiEk.toneMark, "mai_ek");
      assert.equal(khanMaiEk.calculatedTone, "falling");

      const khanMaiTho = deconstructThaiSyllable("ค้าน");
      assert.equal(khanMaiTho.toneMark, "mai_tho");
      assert.equal(khanMaiTho.calculatedTone, "high");

      const khat = deconstructThaiSyllable("คัด");
      assert.equal(khat.syllableType, "dead");
      assert.equal(khat.vowelLength, "short");
      assert.equal(khat.calculatedTone, "high");

      const khatLong = deconstructThaiSyllable("คาด");
      assert.equal(khatLong.syllableType, "dead");
      assert.equal(khatLong.vowelLength, "long");
      assert.equal(khatLong.calculatedTone, "falling");
    });

    test("handles leading consonants (ห นำ and อ นำ)", () => {
      const mon = deconstructThaiSyllable("หมอน");
      assert.equal(mon.initialConsonant, "หม");
      assert.equal(mon.leadingType, "ho_nam");
      assert.equal(mon.initialClass, "high");
      assert.equal(mon.calculatedTone, "rising");

      const wan = deconstructThaiSyllable("หวาน");
      assert.equal(wan.initialConsonant, "หว");
      assert.equal(wan.leadingType, "ho_nam");
      assert.equal(wan.calculatedTone, "rising");

      const ya = deconstructThaiSyllable("อย่า");
      assert.equal(ya.initialConsonant, "อย");
      assert.equal(ya.leadingType, "o_nam");
      assert.equal(ya.initialClass, "mid");
      assert.equal(ya.calculatedTone, "low");
    });

    test("handles true clusters (คำควบแท้) vs. สระ อัว", () => {
      const krap = deconstructThaiSyllable("กราบ");
      assert.equal(krap.initialConsonant, "กร");
      assert.equal(krap.leadingType, "cluster");
      assert.equal(krap.initialClass, "mid");
      assert.equal(krap.syllableType, "dead");
      assert.equal(krap.calculatedTone, "low");

      const kwang = deconstructThaiSyllable("กวาง");
      assert.equal(kwang.initialConsonant, "กว");
      assert.equal(kwang.leadingType, "cluster");
      assert.equal(kwang.vowel, "-า");
      assert.equal(kwang.finalConsonant, "ง");

      // Verify that ขวด, บวก, พวก, สวน are NOT clusters but สระ อัว ลดรูป
      const khuat = deconstructThaiSyllable("ขวด");
      assert.equal(khuat.initialConsonant, "ข");
      assert.equal(khuat.leadingType, "single");
      assert.equal(khuat.vowel, "-ัว (ลดรูป)");
      assert.equal(khuat.finalConsonant, "ด");
      assert.equal(khuat.calculatedTone, "low");

      const buak = deconstructThaiSyllable("บวก");
      assert.equal(buak.initialConsonant, "บ");
      assert.equal(buak.leadingType, "single");
      assert.equal(buak.vowel, "-ัว (ลดรูป)");
      assert.equal(buak.finalConsonant, "ก");
      assert.equal(buak.calculatedTone, "low");

      const phuak = deconstructThaiSyllable("พวก");
      assert.equal(phuak.initialConsonant, "พ");
      assert.equal(phuak.leadingType, "single");
      assert.equal(phuak.vowel, "-ัว (ลดรูป)");
      assert.equal(phuak.vowelLength, "long");
      assert.equal(phuak.finalConsonant, "ก");
      assert.equal(phuak.calculatedTone, "falling"); // Low class + dead long vowel = falling
    });

    test("correctly parses open สระ อัว (-ัว) in แม่ ก กา", () => {
      const tua = deconstructThaiSyllable("ตัว");
      assert.equal(tua.initialConsonant, "ต");
      assert.equal(tua.finalConsonant, "");
      assert.equal(tua.spellingSection, "แม่ ก กา");
      assert.equal(tua.vowel, "-ัว");
      assert.equal(tua.vowelLength, "long");
      assert.equal(tua.calculatedTone, "common");

      const bua = deconstructThaiSyllable("บัว");
      assert.equal(bua.initialConsonant, "บ");
      assert.equal(bua.finalConsonant, "");
      assert.equal(bua.spellingSection, "แม่ ก กา");
      assert.equal(bua.vowel, "-ัว");

      const hua = deconstructThaiSyllable("หัว");
      assert.equal(hua.initialConsonant, "ห");
      assert.equal(hua.finalConsonant, "");
      assert.equal(hua.spellingSection, "แม่ ก กา");
      assert.equal(hua.calculatedTone, "rising");
    });

    test("correctly parses open and closed สระ เอีย (เ-ีย) and สระ เอือ (เ-ือ)", () => {
      // Open เ-ีย
      const sia = deconstructThaiSyllable("เสีย");
      assert.equal(sia.initialConsonant, "ส");
      assert.equal(sia.finalConsonant, "");
      assert.equal(sia.spellingSection, "แม่ ก กา");
      assert.equal(sia.vowel, "เ-ีย");
      assert.equal(sia.calculatedTone, "rising");

      // Closed เ-ีย
      const tiang = deconstructThaiSyllable("เตียง");
      assert.equal(tiang.initialConsonant, "ต");
      assert.equal(tiang.finalConsonant, "ง");
      assert.equal(tiang.spellingSection, "แม่ กง");
      assert.equal(tiang.vowel, "เ-ีย");

      // Open เ-ือ
      const suea = deconstructThaiSyllable("เสือ");
      assert.equal(suea.initialConsonant, "ส");
      assert.equal(suea.finalConsonant, "");
      assert.equal(suea.spellingSection, "แม่ ก กา");
      assert.equal(suea.vowel, "เ-ือ");
      assert.equal(suea.calculatedTone, "rising");

      // Closed เ-ือ
      const mueang = deconstructThaiSyllable("เมือง");
      assert.equal(mueang.initialConsonant, "ม");
      assert.equal(mueang.finalConsonant, "ง");
      assert.equal(mueang.vowel, "เ-ือ");
      assert.equal(mueang.calculatedTone, "common");
    });

    test("correctly parses สระ เออ (เ-อ, เ-ิ, เ-ย) with dead syllable tone shifts", () => {
      // Open เ-อ
      const thoe = deconstructThaiSyllable("เธอ");
      assert.equal(thoe.initialConsonant, "ธ");
      assert.equal(thoe.finalConsonant, "");
      assert.equal(thoe.spellingSection, "แม่ ก กา");
      assert.equal(thoe.vowel, "เ-อ");

      // Closed เ-ิ (Long vowel)
      const doen = deconstructThaiSyllable("เดิน");
      assert.equal(doen.initialConsonant, "ด");
      assert.equal(doen.finalConsonant, "น");
      assert.equal(doen.vowel, "เ-อ (แปลงรูป เ-ิ)");
      assert.equal(doen.vowelLength, "long");

      // Dead syllable with เ-ิ : must be falling tone (เสียงโท) for low class
      const choet = deconstructThaiSyllable("เชิด");
      assert.equal(choet.initialConsonant, "ช");
      assert.equal(choet.finalConsonant, "ด");
      assert.equal(choet.vowel, "เ-อ (แปลงรูป เ-ิ)");
      assert.equal(choet.vowelLength, "long");
      assert.equal(choet.syllableType, "dead");
      assert.equal(choet.calculatedTone, "falling"); // Low class + dead long vowel = falling

      const loet = deconstructThaiSyllable("เลิศ");
      assert.equal(loet.initialConsonant, "ล");
      assert.equal(loet.finalConsonant, "ศ");
      assert.equal(loet.calculatedTone, "falling");

      // เ-ย (สระ เออ ลดรูป)
      const loei = deconstructThaiSyllable("เลย");
      assert.equal(loei.initialConsonant, "ล");
      assert.equal(loei.finalConsonant, "ย");
      assert.equal(loei.spellingSection, "แม่ เกย");
      assert.equal(loei.vowel, "เ-อ (ลดรูป)");
      assert.equal(loei.vowelLength, "long");
    });

    test("correctly strips Thanthakhat (การันต์) silenced clusters", () => {
      const sat = deconstructThaiSyllable("สัตว์");
      assert.equal(sat.initialConsonant, "ส");
      assert.equal(sat.finalConsonant, "ต");
      assert.equal(sat.spellingSection, "แม่ กด");
      assert.equal(sat.syllableType, "dead");
      assert.equal(sat.calculatedTone, "low"); // High class + dead short vowel = low

      const sit = deconstructThaiSyllable("สิทธิ์");
      assert.equal(sit.initialConsonant, "ส");
      assert.equal(sit.finalConsonant, "ท");
      assert.equal(sit.spellingSection, "แม่ กด");
      assert.equal(sit.calculatedTone, "low");
    });

    test("correctly identifies สระ เอาะ (เ-าะ)", () => {
      const ko = deconstructThaiSyllable("เกาะ");
      assert.equal(ko.initialConsonant, "ก");
      assert.equal(ko.finalConsonant, "");
      assert.equal(ko.vowel, "เ-าะ");
      assert.equal(ko.vowelLength, "short");
      assert.equal(ko.syllableType, "dead");
      assert.equal(ko.calculatedTone, "low");

      const phro = deconstructThaiSyllable("เพราะ");
      assert.equal(phro.initialConsonant, "พร");
      assert.equal(phro.finalConsonant, "");
      assert.equal(phro.vowel, "เ-าะ");
      assert.equal(phro.vowelLength, "short");
      assert.equal(phro.calculatedTone, "high"); // Low class + dead short vowel = high
    });

    test("gracefully handles empty and invalid inputs", () => {
      const empty = deconstructThaiSyllable("");
      assert.equal(empty.rawSyllable, "");
      assert.equal(empty.calculatedTone, "common");

      const whitespace = deconstructThaiSyllable("   ");
      assert.equal(whitespace.rawSyllable, "");
    });
  });
});
