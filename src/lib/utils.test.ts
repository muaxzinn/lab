import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  safeTruncateThai,
  safeTruncateThaiBytes,
  safeTruncateThaiGraphemes,
} from "./utils.ts";

describe("Thai UTF-8 Safe Truncation Utilities", () => {
  describe("safeTruncateThaiBytes", () => {
    it("returns original string when byte length is within maxBytes", () => {
      const input = "ภาษาไทย";
      assert.equal(safeTruncateThaiBytes(input, 100), input);
    });

    it("handles empty strings and zero maxBytes", () => {
      assert.equal(safeTruncateThaiBytes("", 10), "");
      assert.equal(safeTruncateThaiBytes("ทดสอบ", 0), "…");
    });

    it("handles pure ASCII strings correctly", () => {
      const input = "Hello World";
      assert.equal(safeTruncateThaiBytes(input, 5), "Hello…");
    });

    it("never slices midway across 3-byte Thai characters (lead 0xE0)", () => {
      // 'ก' = 3 bytes (0xE0, 0xB8, 0x81)
      // 'ข' = 3 bytes (0xE0, 0xB8, 0x82)
      // 'ค' = 3 bytes (0xE0, 0xB8, 0x83)
      const input = "กขค"; // 9 bytes total

      // Requesting 1 or 2 bytes must NOT cut into 'ก' (which requires 3 bytes)
      assert.equal(safeTruncateThaiBytes(input, 1), "…");
      assert.equal(safeTruncateThaiBytes(input, 2), "…");

      // Exactly 3 bytes cuts after 'ก'
      assert.equal(safeTruncateThaiBytes(input, 3), "ก…");

      // Requesting 4 or 5 bytes must NOT cut into 'ข'
      assert.equal(safeTruncateThaiBytes(input, 4), "ก…");
      assert.equal(safeTruncateThaiBytes(input, 5), "ก…");

      // Exactly 6 bytes cuts after 'ข'
      assert.equal(safeTruncateThaiBytes(input, 6), "กข…");

      // Requesting 7 or 8 bytes must NOT cut into 'ค'
      assert.equal(safeTruncateThaiBytes(input, 7), "กข…");
      assert.equal(safeTruncateThaiBytes(input, 8), "กข…");

      // Exactly 9 bytes returns the full string
      assert.equal(safeTruncateThaiBytes(input, 9), "กขค");
    });

    it("safely handles mixed ASCII and Thai characters", () => {
      // "Lab: ฟิสิกส์" -> "Lab: " is 5 bytes ASCII, 'ฟ' is 3 bytes
      const input = "Lab: ฟิสิกส์";
      // Cut at 6 or 7 bytes must not corrupt 'ฟ'
      assert.equal(safeTruncateThaiBytes(input, 6), "Lab: …");
      assert.equal(safeTruncateThaiBytes(input, 7), "Lab: …");
      // Cut at 8 bytes includes 'ฟ' (5 + 3 = 8)
      assert.equal(safeTruncateThaiBytes(input, 8), "Lab: ฟ…");
    });
  });

  describe("safeTruncateThaiGraphemes", () => {
    it("preserves Thai compound grapheme clusters without detaching tone marks", () => {
      // In Unicode grapheme clusters for "น้ำดื่มสะอาด":
      // cluster 0: "น้ำ" (consonant น + tone ้ + vowel ำ)
      // cluster 1: "ดื่" (consonant ด + vowel ื + tone ่)
      // cluster 2: "ม"   (final consonant ม)
      // cluster 3: "ส"   (consonant ส)
      // cluster 4: "ะ"   (vowel ะ)
      // cluster 5: "อ"   (consonant อ)
      // cluster 6: "า"   (vowel า)
      // cluster 7: "ด"   (final consonant ด)
      const input = "น้ำดื่มสะอาด";

      assert.equal(safeTruncateThaiGraphemes(input, 1), "น้ำ…");
      assert.equal(safeTruncateThaiGraphemes(input, 2), "น้ำดื่…");
      assert.equal(safeTruncateThaiGraphemes(input, 3), "น้ำดื่ม…");
      assert.equal(safeTruncateThaiGraphemes(input, 100), input);
    });

    it("handles zero or negative maxGraphemes", () => {
      assert.equal(safeTruncateThaiGraphemes("ฟิสิกส์", 0), "…");
      assert.equal(safeTruncateThaiGraphemes("", 5), "");
    });
  });

  describe("safeTruncateThai universal dispatch", () => {
    it("defaults to grapheme-safe truncation", () => {
      const input = "น้ำดื่มสะอาด";
      assert.equal(safeTruncateThai(input, 3), "น้ำดื่ม…");
    });

    it("supports byte-mode truncation when specified", () => {
      const input = "กขค";
      assert.equal(safeTruncateThai(input, 4, "bytes"), "ก…");
    });
  });
});
