import type { Theme } from '../models/theme.js';
import { neonColors } from './color-sets/neon.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

/**
 * Neon — high-contrast dark tech theme with cyan/magenta accents,
 * inspired by ppt-agents' "dark" (cyan + magenta high contrast).
 */
export const neonTheme: Theme = {
  name: 'neon',
  colors: neonColors,
  fonts: systemFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'dracula',
};
