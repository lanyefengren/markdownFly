import type { Theme } from '../models/theme.js';
import { beigeColors } from './color-sets/beige.js';
import { serifGeorgiaFonts } from './font-sets/serif-georgia.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

/**
 * Beige — warm minimal light theme (paper beige, bronze + terracotta accents),
 * inspired by reveal.js' "beige" palette.
 */
export const beigeTheme: Theme = {
  name: 'beige',
  colors: beigeColors,
  fonts: serifGeorgiaFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'github-dark',
};
