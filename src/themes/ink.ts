import type { Theme } from '../models/theme.js';
import { inkColors } from './color-sets/ink.js';
import { kaiFonts } from './font-sets/kai.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

/**
 * Ink — Chinese ink-wash style (rice-paper background, ink blacks,
 * vermilion seal-red accent, Kai serif typography).
 */
export const inkTheme: Theme = {
  name: 'ink',
  colors: inkColors,
  fonts: kaiFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'github-dark',
};
