import type { Theme } from '../models/theme.js';
import { auroraColors } from './color-sets/aurora.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

/**
 * Aurora — dark neon gradient (mint/blue/purple accents on deep navy),
 * inspired by the SlideForge "aurora" deck palette.
 */
export const auroraTheme: Theme = {
  name: 'aurora',
  colors: auroraColors,
  fonts: systemFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'dracula',
};
