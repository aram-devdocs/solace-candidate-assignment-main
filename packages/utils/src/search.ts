/**
 * Text highlighting configuration for search results
 */
export interface HighlightConfig {
  /**
   * CSS class to apply to highlighted text
   * @default "bg-yellow-200 text-neutral-900 rounded px-0.5"
   */
  className?: string;
}

/**
 * Represents a text segment that can be either plain text or highlighted
 */
export interface TextSegment {
  text: string;
  highlighted: boolean;
}

/**
 * Splits text into segments based on search tokens, marking which segments should be highlighted.
 * Returns an array of text segments that can be rendered with highlighting.
 *
 * @param text - The text to search within and highlight
 * @param searchTokens - Array of search tokens to highlight
 * @returns Array of text segments with highlighting info
 *
 * @example
 * getHighlightedSegments('Denver Vegan Advocate', ['denver', 'vegan'])
 * // Returns: [
 * //   { text: 'Denver', highlighted: true },
 * //   { text: ' ', highlighted: false },
 * //   { text: 'Vegan', highlighted: true },
 * //   { text: ' Advocate', highlighted: false }
 * // ]
 */
export function getHighlightedSegments(text: string, searchTokens?: string[]): TextSegment[] {
  if (!searchTokens || searchTokens.length === 0 || !text) {
    return [{ text, highlighted: false }];
  }

  const segments: TextSegment[] = [];
  let remainingText = text;
  let currentIndex = 0;

  // Sort tokens by length (longest first) to match longer phrases before shorter ones
  const sortedTokens = [...searchTokens].sort((a, b) => b.length - a.length);

  while (currentIndex < text.length) {
    let matchFound = false;
    let earliestMatch: { token: string; index: number } | null = null;

    // Find the earliest matching token in the remaining text
    for (const token of sortedTokens) {
      const regex = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const match = regex.exec(remainingText);

      if (match && (earliestMatch === null || match.index < earliestMatch.index)) {
        earliestMatch = { token, index: match.index };
      }
    }

    if (earliestMatch) {
      // Add non-highlighted text before the match
      if (earliestMatch.index > 0) {
        segments.push({
          text: remainingText.substring(0, earliestMatch.index),
          highlighted: false,
        });
      }

      // Add the highlighted match
      const matchLength = earliestMatch.token.length;
      const matchedText = remainingText.substring(
        earliestMatch.index,
        earliestMatch.index + matchLength
      );
      segments.push({
        text: matchedText,
        highlighted: true,
      });

      // Update remaining text and index
      currentIndex += earliestMatch.index + matchLength;
      remainingText = remainingText.substring(earliestMatch.index + matchLength);
      matchFound = true;
    }

    if (!matchFound) {
      // No more matches, add the rest as non-highlighted
      if (remainingText) {
        segments.push({
          text: remainingText,
          highlighted: false,
        });
      }
      break;
    }
  }

  return segments.length > 0 ? segments : [{ text, highlighted: false }];
}

/**
 * Parses search string into tokens, handling quoted phrases.
 * Quoted phrases are treated as single tokens for exact matching.
 * Unquoted words are split and each becomes a separate token.
 *
 * @param search - Raw search string from user input
 * @returns Array of search tokens
 *
 * @example
 * parseSearchTokens('denver vegan') // ['denver', 'vegan']
 * parseSearchTokens('"sports medicine" denver') // ['sports medicine', 'denver']
 * parseSearchTokens('  john   doe  ') // ['john', 'doe']
 */
export function parseSearchTokens(search: string): string[] {
  if (!search || !search.trim()) {
    return [];
  }

  const tokens: string[] = [];
  const trimmed = search.trim();
  let currentPos = 0;

  while (currentPos < trimmed.length) {
    // Skip whitespace
    while (currentPos < trimmed.length && /\s/.test(trimmed[currentPos])) {
      currentPos++;
    }

    if (currentPos >= trimmed.length) break;

    // Check for quoted phrase
    if (trimmed[currentPos] === '"') {
      currentPos++; // Skip opening quote
      let phrase = "";

      // Collect characters until closing quote or end of string
      while (currentPos < trimmed.length && trimmed[currentPos] !== '"') {
        phrase += trimmed[currentPos];
        currentPos++;
      }

      if (currentPos < trimmed.length) {
        currentPos++; // Skip closing quote
      }

      if (phrase.trim()) {
        tokens.push(phrase.trim());
      }
    } else {
      // Collect unquoted word
      let word = "";
      while (
        currentPos < trimmed.length &&
        !/\s/.test(trimmed[currentPos]) &&
        trimmed[currentPos] !== '"'
      ) {
        word += trimmed[currentPos];
        currentPos++;
      }

      if (word.trim()) {
        tokens.push(word.trim());
      }
    }
  }

  // Remove duplicates while preserving order
  return Array.from(new Set(tokens));
}
