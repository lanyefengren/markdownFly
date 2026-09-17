import type { ThemeColors } from '../../models/theme.js';

/** beige colors - referenced by beige.ts */
export const beigeColors: ThemeColors = {
  primary: '8B6F3D',
  secondary: '6B6455',
  background: 'F7F3DE',
  text: '2F2A1F',
  accent: 'C0563C',
  codeBackground: '3A352B',
  codeText: 'E8E0CC',
  titleBackground: '8B6F3D',
  titleText: '2F2A1F',
  // highlightBackground omitted: light tokens from Shiki dark themes need a
  // dark band — highlightBackgroundFor() derives one from codeBackground.
  backgroundGradient: {
    from: 'F7F3DE',
    to: 'F1E8D2',
    angle: 180,
  },
};
