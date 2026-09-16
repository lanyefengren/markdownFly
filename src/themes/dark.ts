import type { Theme } from '../models/theme.js';
import { darkColors } from './color-sets/dark.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

export const darkTheme: Theme = {
  name: 'dark',
  colors: darkColors,
  fonts: systemFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'dracula',
};
