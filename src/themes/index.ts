import type { Theme } from '../models/theme.js';
import { cleanTheme } from './clean.js';
import { academicTheme } from './academic.js';
import { darkTheme } from './dark.js';
import { businessTheme } from './business.js';
import { warmTheme } from './warm.js';
import { auroraTheme } from './aurora.js';
import { neonTheme } from './neon.js';
import { nordTheme } from './nord.js';
import { draculaTheme } from './dracula.js';
import { beigeTheme } from './beige.js';
import { inkTheme } from './ink.js';
import { defaultTheme } from './default.js';

export const themes: Record<string, Theme> = {
  clean: cleanTheme,
  academic: academicTheme,
  dark: darkTheme,
  business: businessTheme,
  warm: warmTheme,
  aurora: auroraTheme,
  neon: neonTheme,
  nord: nordTheme,
  dracula: draculaTheme,
  beige: beigeTheme,
  ink: inkTheme,
  default: defaultTheme,
};

export function getTheme(name?: string): Theme {
  if (!name) {
    return cleanTheme;
  }
  if (typeof name !== 'string') {
    throw new Error(`Invalid theme value: expected a string, got ${typeof name}`);
  }
  const theme = themes[name.toLowerCase()];
  if (!theme) {
    console.warn(`Theme "${name}" not found, using "clean"`);
    return cleanTheme;
  }
  return theme;
}

export {
  cleanTheme,
  academicTheme,
  darkTheme,
  businessTheme,
  warmTheme,
  auroraTheme,
  neonTheme,
  nordTheme,
  draculaTheme,
  beigeTheme,
  inkTheme,
  defaultTheme,
};

// ColorScheme pipeline (new path; legacy themes above stay untouched)
export { resolveColorScheme } from './resolve-scheme.js';
export { createThemeFromScheme } from './from-scheme.js';
export type { ThemeFromSchemeOptions } from './from-scheme.js';
export {
  colorSchemes,
  getColorScheme,
  listColorSchemes,
  registerColorScheme,
  oceanBlueScheme,
} from './color-schemes/index.js';
