import type { ThemeColors } from '../../models/theme.js';

/** ink colors - referenced by ink.ts */
export const inkColors: ThemeColors = {
  primary: '2F3530',
  secondary: '6F6A5E',
  background: 'F7F4EC',
  text: '262626',
  accent: 'C0272D',
  codeBackground: '2B2924',
  codeText: 'D8D2C0',
  titleBackground: '30352F',
  titleText: '262626',
  // highlightBackground omitted: light band is unreadable under Shiki dark
  // tokens — highlightBackgroundFor() derives a dark band from codeBackground.
  backgroundGradient: {
    from: 'F7F4EC',
    to: 'EFE8DA',
    angle: 180,
  },
};
