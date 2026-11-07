/**
 * Utility functions for Interactive Learning Platform
 */

/**
 * Safely truncate a UTF-8 string without slicing multibyte characters mid-sequence.
 * Ensures compatibility with 3-byte Thai characters (0xE0 range).
 */
export function safeTruncateThai(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return Array.from(str).slice(0, maxLength).join("") + "…";
}
