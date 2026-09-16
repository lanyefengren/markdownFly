import type { Theme } from '../models/theme.js';
import { businessColors } from './color-sets/business.js';
import { systemFonts } from './font-sets/system.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

export const businessTheme: Theme = {
  name: 'business',
  colors: businessColors,
  fonts: systemFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'github-dark',
};
