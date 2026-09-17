import { describe, it, expect } from 'vitest';
import { highlightBackgroundFor } from '../src/renderer/code-highlighter.js';
import {
  getTheme,
  themeNames,
  hasTheme,
  DEFAULT_SCHEME_NAME,
  listColorSchemes,
  createThemeFromScheme,
} from '../src/themes/index.js';
import { isDarkColor } from '../src/utils/color-mix.js';

const HEX = /^[0-9A-Fa-f]{6}$/;

describe('Theme System (ColorScheme path)', () => {
  it('registers built-in schemes as the only themes', () => {
    expect(themeNames()).toContain('ocean');
    expect(themeNames()).toContain('ocean-dark');
    expect(themeNames()).not.toContain('clean');
    expect(themeNames()).not.toContain('ink');
    expect(hasTheme('ocean')).toBe(true);
    hasTheme('clean');
    expect(hasTheme('clean')).toBe(false);
  });

  it('resolves every registered scheme to a Theme with valid hex colors', () => {
    for (const scheme of listColorSchemes()) {
      const theme = createThemeFromScheme(scheme);
      expect(theme.name).toBe(scheme.name);
      const c = theme.colors;
      expect(HEX.test(c.primary)).toBe(true);
      expect(HEX.test(c.secondary)).toBe(true);
      expect(HEX.test(c.background)).toBe(true);
      expect(HEX.test(c.text)).toBe(true);
      expect(HEX.test(c.accent)).toBe(true);
      expect(HEX.test(c.codeBackground)).toBe(true);
      expect(HEX.test(c.codeText)).toBe(true);
    }
  });

  it('getTheme resolves scheme names case-insensitively', () => {
    expect(getTheme('ocean').name).toBe('ocean');
    expect(getTheme('Ocean').name).toBe('ocean');
    expect(getTheme('OCEAN-DARK').name).toBe('ocean-dark');
  });

  it('falls back to the default scheme when theme is unknown or empty', () => {
    expect(getTheme(undefined).name).toBe(DEFAULT_SCHEME_NAME);
    expect(getTheme('').name).toBe(DEFAULT_SCHEME_NAME);
    expect(getTheme('non-existent-theme').name).toBe(DEFAULT_SCHEME_NAME);
  });

  it('throws on non-string theme values (CLI contract)', () => {
    expect(() => getTheme(['clean'] as unknown as string)).toThrow(/Invalid theme value/);
  });

  it('pairs light/dark schemes with a matching shiki theme', () => {
    expect(getTheme('ocean').shikiTheme).toBe('github-light');
    expect(getTheme('ocean-dark').shikiTheme).toBe('github-dark');
  });

  it('maps paper→background and ink→text without swapping roles', () => {
    const light = getTheme('ocean');
    const dark = getTheme('ocean-dark');
    expect(light.colors.background).toBe('F0F8FF');
    expect(light.colors.text).toBe('1E4A6F');
    expect(dark.colors.background).toBe('0B1C2E');
    expect(dark.colors.text).toBe('D6E7F5');
    expect(isDarkColor(light.colors.background)).toBe(false);
    expect(isDarkColor(dark.colors.background)).toBe(true);
  });

  it('keeps cover title text readable against the cover background', () => {
    for (const scheme of listColorSchemes()) {
      const theme = createThemeFromScheme(scheme);
      const text = theme.colors.titleText ?? theme.colors.text;
      const bg = theme.colors.titleBackground ?? theme.colors.background;
      const lum = (hex: string): number => {
        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;
        return 0.299 * r + 0.587 * g + 0.114 * b;
      };
      expect(Math.abs(lum(bg) - lum(text))).toBeGreaterThan(0.2);
    }
  });
});

describe('code highlight colour on scheme themes', () => {
  const isDark = (hex: string): boolean => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b < 128;
  };

  it('derives a readable highlight band for every scheme theme', () => {
    for (const scheme of listColorSchemes()) {
      const theme = createThemeFromScheme(scheme);
      const band = highlightBackgroundFor(theme).replace(/^#/, '');
      expect(HEX.test(band), `${scheme.name}: band #${band}`).toBe(true);
      // Light decks use github-light tokens (dark text) — a light tint is correct.
      // Dark decks use github-dark tokens (light text) — the band must stay dark.
      const darkDeck =
        (theme.shikiTheme ?? '').includes('dark') || isDarkColor(theme.colors.codeBackground);
      if (darkDeck) {
        expect(isDark(band), `${scheme.name}: highlight band #${band} is too light`).toBe(true);
      }
    }
  });
});
