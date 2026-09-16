import type { Theme } from '../models/theme.js';
import { nordColors } from './color-sets/nord.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

/**
 * Nord — the classic Arctic Frost palette (frost blues + aurora warm accents).
 */
export const nordTheme: Theme = {
  name: 'nord',
  colors: nordColors,
  fonts: systemFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'nord',
};
