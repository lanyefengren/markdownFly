import type { Theme } from '../models/theme.js';
import { academicColors } from './color-sets/academic.js';
import { serifAcademicFonts } from './font-sets/serif-academic.js';
import { standardFontSizes } from './font-sets/font-sizes.js';

export const academicTheme: Theme = {
  name: 'academic',
  colors: academicColors,
  fonts: serifAcademicFonts,
  fontSize: standardFontSizes,
  shikiTheme: 'github-dark',
};
