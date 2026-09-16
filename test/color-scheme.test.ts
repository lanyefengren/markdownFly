import { describe, it, expect } from 'vitest';
import type { ColorScheme } from '../src/models/color-scheme.js';
import { CHROMATIC_SLOTS } from '../src/models/color-scheme.js';
import { resolveColorScheme } from '../src/themes/resolve-scheme.js';
import { createThemeFromScheme } from '../src/themes/from-scheme.js';
import { colorSchemes, getColorScheme, registerColorScheme } from '../src/themes/color-schemes/index.js';
import { mixHex, parseHex, toHex, isDarkColor, relativeLuminance } from '../src/utils/color-mix.js';

const lightScheme: ColorScheme = {
  name: 'test-light',
  mode: 'light',
  primary: '2563EB',
  secondary: '64748B',
  accent: 'C2410C',
  tertiary: '0F766E',
  ink: '1F2937',
  paper: 'FFFFFF',
};

const darkScheme: ColorScheme = {
  name: 'test-dark',
  mode: 'dark',
  primary: '38BDF8',
  secondary: '8FA3C9',
  accent: 'F472B6',
  tertiary: 'A3E635',
  ink: '0F172A',
  paper: 'F8FAFC',
};

describe('color-mix utils', () => {
  it('parses and formats hex without #', () => {
    expect(parseHex('2563EB')).toEqual([0x25, 0x63, 0xeb]);
    expect(toHex(0x25, 0x63, 0xeb)).toBe('2563EB');
  });

  it('mixes endpoints correctly', () => {
    expect(mixHex('000000', 'FFFFFF', 0)).toBe('000000');
    expect(mixHex('000000', 'FFFFFF', 1)).toBe('FFFFFF');
    expect(mixHex('000000', 'FFFFFF', 0.5)).toBe('808080');
  });

  it('rejects invalid hex', () => {
    expect(() => parseHex('XYZ')).toThrow();
  });

  it('luminance: white high, black low', () => {
    expect(relativeLuminance('FFFFFF')).toBeGreaterThan(0.9);
    expect(relativeLuminance('000000')).toBeLessThan(0.01);
    expect(isDarkColor('0F172A')).toBe(true);
    expect(isDarkColor('FFFFFF')).toBe(false);
  });
});

describe('resolveColorScheme', () => {
  it('light mode: paper background, ink text', () => {
    const c = resolveColorScheme(lightScheme);
    expect(c.background).toBe('FFFFFF');
    expect(c.text).toBe('1F2937');
    expect(c.primary).toBe('2563EB');
    expect(c.accent).toBe('C2410C');
  });

  it('dark mode: ink background, paper text', () => {
    const c = resolveColorScheme(darkScheme);
    expect(c.background).toBe('0F172A');
    expect(c.text).toBe('F8FAFC');
  });

  it('always emits background without # for isDarkTheme compatibility', () => {
    for (const s of [lightScheme, darkScheme]) {
      expect(resolveColorScheme(s).background).toMatch(/^[0-9A-F]{6}$/);
    }
  });

  it('fills accents in chromatic slot order', () => {
    const c = resolveColorScheme(lightScheme);
    expect(c.accents).toEqual(['2563EB', '64748B', 'C2410C', '0F766E']);
    expect(CHROMATIC_SLOTS).toEqual(['primary', 'secondary', 'accent', 'tertiary']);
  });

  it('derives code panel as a distinct surface', () => {
    const c = resolveColorScheme(lightScheme);
    expect(c.codeBackground).not.toBe(c.background);
    expect(c.codeBackground).not.toBe(c.text);
    // light deck → code panel darker than page
    expect(isDarkColor(c.codeBackground!)).toBe(true);
  });

  it('every produced hex is valid RRGGBB', () => {
    const c = resolveColorScheme(darkScheme);
    for (const v of Object.values(c)) {
      if (typeof v === 'string') expect(v).toMatch(/^[0-9A-F]{6}$/);
      if (Array.isArray(v)) v.forEach((x) => expect(x).toMatch(/^[0-9A-F]{6}$/));
    }
  });
});

describe('createThemeFromScheme', () => {
  it('builds a complete Theme with default fonts/sizes', () => {
    const theme = createThemeFromScheme(lightScheme);
    expect(theme.name).toBe('test-light');
    expect(theme.fonts.heading).toBe('Segoe UI');
    expect(theme.fontSize.title).toBe(36);
    expect(theme.colors.background).toBe('FFFFFF');
    expect(theme.shikiTheme).toBe('github-light');
  });

  it('dark scheme picks a dark shiki theme by default', () => {
    const theme = createThemeFromScheme(darkScheme);
    expect(theme.shikiTheme).toBe('github-dark');
  });

  it('accepts font overrides', () => {
    const theme = createThemeFromScheme(lightScheme, {
      fonts: { heading: 'Georgia', body: 'Segoe UI', code: 'Consolas', cjk: '微软雅黑' },
    });
    expect(theme.fonts.heading).toBe('Georgia');
  });
});

describe('color-schemes registry', () => {
  it('starts empty and supports register/lookup', () => {
    // isolate: only assert on a throwaway scheme
    registerColorScheme(lightScheme);
    expect(getColorScheme('TEST-LIGHT')?.name).toBe('test-light');
    expect(getColorScheme('nope')).toBeUndefined();
    delete colorSchemes['test-light'];
  });
});
