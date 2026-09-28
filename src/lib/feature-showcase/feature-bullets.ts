/** Split existing copy into up to `max` bullet lines without changing dictionary text. */
export function featureBulletsFromText(text: string, max = 3): string[] {
  const normalized = text.trim();
  if (!normalized) {
    return [];
  }

  const byComma = normalized
    .split(/،\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 4);

  if (byComma.length >= 2) {
    return byComma.slice(0, max).map((part) => part.replace(/\.$/u, ""));
  }

  const bySentence = normalized
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 4);

  if (bySentence.length >= 2) {
    return bySentence.slice(0, max);
  }

  return [normalized];
}
