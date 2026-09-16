/**
 * Build a full Theme from a ColorScheme (+ optional font overrides).
 * Preset themes should go through this path so they stay interchangeable
 * with user-defined schemes.
 */

import type { ColorScheme } from '../models/color-scheme.js';
import { resolveSchemeMode } from '../models/color-scheme.js';
import type { Theme, ThemeFonts, ThemeFontSizes } from '../models/theme.js';
import { resolveColorScheme } from './resolve-scheme.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

export interface ThemeFromSchemeOptions {
  /** Override font set (defaults to system sans) */
  fonts?: ThemeFonts;
  /** Override size ladder (defaults to standardFontSizes) */
  fontSize?: ThemeFontSizes;
  /** Shiki highlighter theme name */
  shikiTheme?: string;
  /** Optional layout/style/typography extras */
  layouts?: Theme['layouts'];
  styles?: Theme['styles'];
  typography?: Theme['typography'];
  avoid?: string[];
}

export function createThemeFromScheme(
  scheme: ColorScheme,
  options: ThemeFromSchemeOptions = {},
): Theme {
  return {
    name: scheme.name,
    colors: resolveColorScheme(scheme),
    fonts: options.fonts ?? systemFonts,
    fontSize: options.fontSize ?? standardFontSizes,
    shikiTheme:
      options.shikiTheme ??
      (resolveSchemeMode(scheme) === 'dark' ? 'github-dark' : 'github-light'),
    layouts: options.layouts,
    styles: options.styles,
    typography: options.typography,
    avoid: options.avoid,
  };
}
