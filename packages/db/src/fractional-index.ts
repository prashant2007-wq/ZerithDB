/**
 * Generates a lexicographically sorted string that is strictly between `before` and `after`.
 * Used for fractional indexing to allow reordering without updating multiple records.
 *
 * @param before - The string before the target position (null/undefined if moving to the start)
 * @param after - The string after the target position (null/undefined if moving to the end)
 * @returns A string that sorts strictly between `before` and `after`
 */
export function generateFractionalIndex(before?: string | null, after?: string | null): string {
  if (before != null && after != null && before >= after) {
    throw new Error(`Invalid range: before (${before}) must be less than after (${after})`);
  }

  // Use visible ASCII range 32 (space) to 126 ('~')
  const MIN_CHAR = 32; 
  const MAX_CHAR = 126;

  let result = "";
  let i = 0;

  while (true) {
    const bChar = before && i < before.length ? before.charCodeAt(i) : null;
    const aChar = after && i < after.length ? after.charCodeAt(i) : null;

    const bVal = bChar !== null ? bChar : MIN_CHAR;
    const aVal = aChar !== null ? aChar : MAX_CHAR + 1;

    if (aVal - bVal > 1) {
      const midVal = Math.floor((bVal + aVal) / 2);
      result += String.fromCharCode(midVal);
      return result;
    }

    if (bChar !== null || aChar !== null) {
      result += String.fromCharCode(bChar !== null ? bChar : MIN_CHAR);
      i++;
    } else {
      // Fallback to avoid infinite loops, unreachable with valid inputs
      i++;
    }
  }
}
