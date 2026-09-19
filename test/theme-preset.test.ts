import { describe, it, expect } from 'vitest';
import {
  getTheme,
  DEFAULT_THEME_NAME,
  DEFAULT_PRESET_NAME,
  getThemePreset,
  listThemePresets,
  bluePreset,
} from '../src/themes/index.js';

const HEX = /^[0-9A-Fa-f]{6}$/;

describe('ThemePreset as user-facing theme name', () => {
  it('registers only blue; default theme name is blue', () => {
    expect(DEFAULT_THEME_NAME).toBe('blue');
    expect(DEFAULT_PRESET_NAME).toBe('blue');
    expect(listThemePresets().map((p) => p.name)).toEqual(['blue']);
    expect(bluePreset.colorScheme).toBe('ocean');
    expect(bluePreset.textScheme).toBe('academic');
    expect(bluePreset.layoutScheme).toBe('legacy');
    expect(getThemePreset('blue')).toBeDefined();
  });

  it('getTheme("blue") and default both select the blue package', () => {
    for (const name of ['blue', 'Blue', undefined, ''] as const) {
      const theme = getTheme(name as string | undefined);
      expect(theme.presetSet).toBe('blue');
      expect(theme.name).toBe('ocean');
      expect(theme.textSet).toBe('academic');
      expect(theme.layoutSet).toBe('legacy');
      expect(theme.layouts?.title?.titleAlign).toBe('center');
    }
  });

  it('color-only names keep production text/layout path', () => {
    const theme = getTheme('ocean');
    expect(theme.presetSet).toBeUndefined();
    expect(theme.layoutSet).toBeUndefined();
    expect(theme.textSet).toBe('system');
  });

  it('explicit textScheme/layoutScheme override blue slots', () => {
    const theme = getTheme('blue', {
      textScheme: 'system',
      layoutScheme: 'folio',
    });
    expect(theme.presetSet).toBe('blue');
    expect(theme.textSet).toBe('system');
    expect(theme.layoutSet).toBe('folio');
  });

  it('keeps red-line Theme fields after blue resolution', () => {
    const theme = getTheme('blue');
    expect(theme.colors.background).toMatch(HEX);
    expect(theme.fonts.cjk).toBeTruthy();
    expect(theme.fonts.body).toBeTruthy();
  });
});
