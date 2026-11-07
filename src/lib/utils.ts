/**
 * Utility functions for Interactive Learning Platform
 * Strictly adhering to Firman Agentic OS Lobe 3 (Aesthetics & Multibyte Discipline).
 */

/**
 * Truncate a UTF-8 string by byte length without slicing midway through multibyte sequences.
 * Thai characters in UTF-8 are 3 bytes long (starting with byte 0xE0).
 * Slicing across these 3 bytes corrupts the character and results in  or question marks.
 *
 * @param str The input string to truncate
 * @param maxBytes Maximum number of UTF-8 bytes allowed in the truncated string (excluding suffix)
 * @param suffix Optional ellipsis string appended when truncation occurs (default: "…")
 */
export function safeTruncateThaiBytes(
  str: string,
  maxBytes: number,
  suffix: string = "…"
): string {
  if (!str) return "";
  if (maxBytes <= 0) return suffix;

  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  if (bytes.length <= maxBytes) return str;

  let i = 0;
  let lastValidCut = 0;

  while (i < bytes.length && i < maxBytes) {
    const c = bytes[i];
    let charLen = 1;

    if (c < 0x80) {
      charLen = 1; // 1-byte ASCII
    } else if ((c & 0xe0) === 0xc0) {
      charLen = 2; // 2-byte UTF-8
    } else if ((c & 0xf0) === 0xe0) {
      charLen = 3; // 3-byte UTF-8 (Thai characters 0xE0B8xx - 0xE0B9xx)
    } else if ((c & 0xf8) === 0xf0) {
      charLen = 4; // 4-byte UTF-8 (Astral symbols / emojis)
    } else {
      charLen = 1; // Fallback for invalid sequence
    }

    if (i + charLen <= maxBytes) {
      i += charLen;
      lastValidCut = i;
    } else {
      break;
    }
  }

  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes.subarray(0, lastValidCut)) + suffix;
}

/**
 * Truncate a string by user-perceived grapheme clusters.
 * In Thai, combining vowels and tonal marks (e.g. น + ้ + ำ = น้ำ) form a single grapheme cluster.
 * Slicing by naive character indices detaches floating vowels and tone marks.
 *
 * @param str The input string to truncate
 * @param maxGraphemes Maximum number of grapheme clusters allowed
 * @param suffix Optional ellipsis string appended when truncation occurs (default: "…")
 */
export function safeTruncateThaiGraphemes(
  str: string,
  maxGraphemes: number,
  suffix: string = "…"
): string {
  if (!str) return "";
  if (maxGraphemes <= 0) return suffix;

  // Intl.Segmenter with 'th' locale and 'grapheme' granularity preserves compound Thai glyphs
  const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(str), (s) => s.segment);

  if (segments.length <= maxGraphemes) return str;
  return segments.slice(0, maxGraphemes).join("") + suffix;
}

/**
 * Universal safe truncation for Thai strings.
 * Defaults to grapheme-cluster-safe truncation for visual UI rendering.
 */
export function safeTruncateThai(
  str: string,
  maxLength: number,
  mode: "graphemes" | "bytes" = "graphemes",
  suffix: string = "…"
): string {
  if (mode === "bytes") {
    return safeTruncateThaiBytes(str, maxLength, suffix);
  }
  return safeTruncateThaiGraphemes(str, maxLength, suffix);
}
