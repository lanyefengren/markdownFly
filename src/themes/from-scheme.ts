/**
 * Build a full Theme from a ColorScheme (+ optional font / text-set overrides).
 *
 * Text-set layer is the only font source: `textScheme` (default `system`)
 * bridges into Theme.fonts / Theme.fontSize. Explicit `options.fonts` /
 * `options.fontSize` still win when provided.
 *
 * The legacy `font-sets/` folder has been removed; do not reintroduce it.
 */

import type { ColorScheme } from '../models/color-scheme.js';
import { resolveSchemeMode } from '../models/color-scheme.js';
import type { Theme, ThemeFonts, ThemeFontSizes } from '../models/theme.js';
import {
  DEFAULT_TEXT_SCHEME_NAME,
  type FontStyleEntry,
  type TextScheme,
  type TextSchemePositionKey,
} from '../models/text-set.js';
import { resolveColorScheme } from './resolve-scheme.js';
import { getTextScheme } from './text-schemes/text-index.js';

export interface ThemeFromSchemeOptions {
  fonts?: ThemeFonts;
  fontSize?: ThemeFontSizes;
  shikiTheme?: string;
  layouts?: Theme['layouts'];
  styles?: Theme['styles'];
  typography?: Theme['typography'];
  avoid?: string[];
  /** Text scheme name or object; defaults to `system` */
  textScheme?: string | TextScheme;
}

export function resolveTextSchemeOption(
  input?: string | TextScheme,
): TextScheme {
  if (input && typeof input === 'object') return input;
  const name =
    typeof input === 'string' && input.trim() ? input.trim() : DEFAULT_TEXT_SCHEME_NAME;
  const scheme = getTextScheme(name);
  if (!scheme) {
    if (typeof input === 'string' && input.trim()) {
      console.warn(`Text scheme "${name}" not found, using "${DEFAULT_TEXT_SCHEME_NAME}"`);
    }
    const fallback = getTextScheme(DEFAULT_TEXT_SCHEME_NAME);
    if (!fallback) {
      throw new Error(`Default text scheme "${DEFAULT_TEXT_SCHEME_NAME}" is not registered`);
    }
    return fallback;
  }
  return scheme;
}

/** Bridge TextScheme → ThemeFonts. Red-line `fonts.cjk` always written. */
export function bridgeFontsFromTextScheme(scheme: TextScheme): ThemeFonts {
  const p = scheme.positions;
  const body = p.body;
  const headingSource = p.slideTitle ?? p.coverTitle;
  return {
    body: body.face,
    cjk: body.cjkFace ?? body.face,
    heading: headingSource.face ?? body.face,
    code: p.code.face,
  };
}

export function bridgeFontSizesFromTextScheme(scheme: TextScheme): ThemeFontSizes {
  const p = scheme.positions;
  return {
    title: p.coverTitle.size,
    heading: p.slideTitle.size,
    body: p.body.size,
    code: p.code.size,
    small: p.small.size,
  };
}

function textStylesFromScheme(
  scheme: TextScheme,
): Partial<Record<TextSchemePositionKey, FontStyleEntry>> {
  return { ...scheme.positions };
}

export function createThemeFromScheme(
  scheme: ColorScheme,
  options: ThemeFromSchemeOptions = {},
): Theme {
  const textScheme = resolveTextSchemeOption(options.textScheme);

  const fonts = options.fonts ?? bridgeFontsFromTextScheme(textScheme);
  const fontSize = options.fontSize ?? bridgeFontSizesFromTextScheme(textScheme);

  return {
    name: scheme.name,
    colors: resolveColorScheme(scheme),
    fonts,
    fontSize,
    shikiTheme:
      options.shikiTheme ??
      (resolveSchemeMode(scheme) === 'dark' ? 'github-dark' : 'github-light'),
    layouts: options.layouts,
    styles: options.styles,
    typography: options.typography,
    avoid: options.avoid,
    textSet: textScheme.name,
    textScheme,
    textStyles: textStylesFromScheme(textScheme),
  };
}
