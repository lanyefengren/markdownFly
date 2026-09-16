/**
 * Resolve a compact ColorScheme into the existing ThemeColors shape.
 *
 * Compatibility: output uses only current ThemeColors fields. Renderer and
 * diagrams/theme.ts (isDarkTheme → colors.background) keep working unchanged.
 * background is always a bare hex without '#'.
 */

import type { ColorScheme } from '../models/color-scheme.js';
import type { ThemeColors } from '../models/theme.js';
import { mixHex } from '../utils/color-mix.js';

export function resolveColorScheme(scheme: ColorScheme): ThemeColors {
  const { mode, primary, secondary, accent, tertiary, ink, paper } = scheme;
  const dark = mode === 'dark';

  const background = dark ? ink : paper;
  const text = dark ? paper : ink;

  // Code block sits on the opposite surface, lightly mixed toward the text color.
  // Light decks: near-ink panel; dark decks: near-ink lifted slightly toward paper.
  const codeBackground = dark ? mixHex(ink, paper, 0.08) : mixHex(ink, paper, 0.12);
  const codeText = dark ? mixHex(paper, ink, 0.15) : mixHex(paper, ink, 0.05);

  // Cover: brand-tinted surface + readable text
  const titleBackground = dark ? mixHex(ink, primary, 0.18) : mixHex(paper, primary, 0.12);
  const titleText = dark ? paper : ink;

  // Marked lines in code: subtle lift from codeBackground toward accent
  const highlightBackground = mixHex(codeBackground, accent, 0.28);

  // Secondary body text: chromatic secondary mixed with the reading ink
  const secondaryText = dark ? mixHex(secondary, paper, 0.35) : mixHex(secondary, ink, 0.25);

  return {
    primary,
    secondary: secondaryText,
    background,
    text,
    accent,
    codeBackground,
    codeText,
    titleBackground,
    titleText,
    highlightBackground,
    // Extension slots (optional in ThemeColors) — filled so new consumers can use them
    accents: [primary, secondary, accent, tertiary],
    subtitle: secondaryText,
    divider: dark ? mixHex(paper, ink, 0.55) : mixHex(ink, paper, 0.55),
    muted: dark ? mixHex(paper, ink, 0.4) : mixHex(ink, paper, 0.4),
    tableHeader: dark ? mixHex(ink, primary, 0.22) : mixHex(paper, primary, 0.1),
    tableZebra: dark ? mixHex(ink, paper, 0.06) : mixHex(paper, ink, 0.04),
  };
}
