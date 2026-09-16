import type { Theme } from '../models/theme.js';
import { draculaColors } from './color-sets/dracula.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

/**
 * Dracula — the official Dracula palette (purple primary + pink accent on charcoal).
 */
export const draculaTheme: Theme = {
  name: 'dracula',
  colors: draculaColors,
  fonts: systemFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'dracula',
};
