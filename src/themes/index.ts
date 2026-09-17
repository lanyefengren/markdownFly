import type { Theme } from '../models/theme.js';
import { createThemeFromScheme } from './from-scheme.js';
import { getColorScheme, listColorSchemes } from './color-schemes/index.js';

/** Fallback scheme when no theme is requested or the name is unknown */
export const DEFAULT_SCHEME_NAME = 'ocean';

/**
 * Resolve a scheme name (CLI `-t` / frontmatter `theme`) into a Theme.
 *
 * The legacy 12 preset themes were removed; every theme is built from a
 * ColorScheme via `createThemeFromScheme`. Unknown names warn and fall back
 * to the default scheme. Non-string values still throw (CLI contract).
 */
export function getTheme(name?: string): Theme {
  if (name !== undefined && typeof name !== 'string') {
    throw new Error(`Invalid theme value: expected a string, got ${typeof name}`);
  }

  const trimmed = name?.trim();
  if (!trimmed) {
    return createThemeFromScheme(getColorScheme(DEFAULT_SCHEME_NAME)!);
  }

  const scheme = getColorScheme(trimmed);
  if (!scheme) {
    console.warn(`Theme "${trimmed}" not found, using "${DEFAULT_SCHEME_NAME}"`);
    return createThemeFromScheme(getColorScheme(DEFAULT_SCHEME_NAME)!);
  }
  return createThemeFromScheme(scheme);
}

/** Lower-cased scheme names currently registered (CLI choices, tests). */
export function themeNames(): string[] {
  return listColorSchemes().map((s) => s.name.toLowerCase());
}

/** Whether `name` resolves to a registered ColorScheme. */
export function hasTheme(name?: string): boolean {
  return Boolean(name && getColorScheme(name));
}

// ColorScheme pipeline
export { resolveColorScheme } from './resolve-scheme.js';
export { createThemeFromScheme } from './from-scheme.js';
export type { ThemeFromSchemeOptions } from './from-scheme.js';
export {
  colorSchemes,
  getColorScheme,
  listColorSchemes,
  registerColorScheme,
  oceanScheme,
  oceanDarkScheme,
} from './color-schemes/index.js';
