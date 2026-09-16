import type { Theme } from '../models/theme.js';
import { warmColors } from './color-sets/warm.js';
import { serifGeorgiaFonts } from './font-sets/serif-georgia.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

export const warmTheme: Theme = {
  name: 'warm',
  colors: warmColors,
  fonts: serifGeorgiaFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'github-dark',
};
