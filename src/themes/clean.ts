import type { Theme } from '../models/theme.js';
import { cleanColors } from './color-sets/clean.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

export const cleanTheme: Theme = {
  name: 'clean',
  colors: cleanColors,
  fonts: systemFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'github-dark',
};
