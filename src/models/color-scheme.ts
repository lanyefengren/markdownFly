/**
 * ColorScheme — minimal user-facing palette for the PPT design system.
 *
 * A scheme is 4 chromatic slots + two neutrals (ink/paper). All other
 * ThemeColors roles are derived by `resolveColorScheme()`, following the
 * Marp Gaia/Uncover and Material Design 3 pattern (small source of truth,
 * roles generated). Built-in presets and user customs share this exact shape.
 */

export type ColorSchemeMode = 'light' | 'dark';

export interface ColorScheme {
  /** Stable id, e.g. 'ocean-light' */
  name: string;
  /** Surface polarity: paper-on-light vs ink-on-dark */
  mode: ColorSchemeMode;
  /** Chromatic 1 — brand / headings / primary bars */
  primary: string;
  /** Chromatic 2 — supporting UI (footer, secondary text chromatic) */
  secondary: string;
  /** Chromatic 3 — emphasis (callouts, section bars, highlights) */
  accent: string;
  /** Chromatic 4 — spare slot (extra callout / chart / decoration) */
  tertiary: string;
  /** Dark neutral (near-black allowed; may carry a slight hue) */
  ink: string;
  /** Light neutral (near-white allowed; may carry a slight hue) */
  paper: string;
}

/** Chromatic slots in a stable order (for accents[] and callout mapping) */
export const CHROMATIC_SLOTS = ['primary', 'secondary', 'accent', 'tertiary'] as const;

export type ChromaticSlot = (typeof CHROMATIC_SLOTS)[number];
