/**
 * Closing slide layout — fixed “Thank you” page (@(layout=closing)).
 * Extras: thankText, titleRule (rules above/below the word).
 */

import PptxGenJS from 'pptxgenjs';
import type { SlideNode } from '../../models/slide.js';
import type { Theme } from '../../models/theme.js';
import {
  addHRuler,
  extraBoolean,
  extraNumber,
  extraString,
  layoutSpec,
  resolveSideMargins,
  ruleColor,
  specAlign,
  titleRuleRole,
} from './layout-spec.js';

export function renderClosingSlide(
  slide: PptxGenJS.Slide,
  node: SlideNode,
  theme: Theme,
): void {
  const spec = layoutSpec(theme, 'closing');
  const align = specAlign(spec.titleAlign, 'center');
  const { left, right } = resolveSideMargins(spec, 0.8);
  const contentW = Math.max(3, 13.33 - left - right);
  const thankText = extraString(spec, 'thankText', 'Thank you');
  const primary = node.title?.trim() || thankText;
  const textY = extraNumber(spec, 'textY', 2.7);
  const showRules = extraBoolean(spec, 'titleRule', false);
  const color = ruleColor(theme, titleRuleRole(spec) === 'primary' ? 'primary' : titleRuleRole(spec));
  const ruleW = extraNumber(spec, 'ruleWidth', Math.min(contentW, 3.2));
  const ruleX = align === 'center' ? left + (contentW - ruleW) / 2 : left;

  if (showRules) {
    addHRuler(slide, { x: ruleX, y: textY - 0.35, w: ruleW, h: 0.03, color });
  }

  slide.addText(primary, {
    x: left,
    y: textY,
    w: contentW,
    h: 1.3,
    fontSize: theme.fontSize.title,
    fontFace: theme.fonts.heading,
    color: theme.colors.primary,
    bold: true,
    align,
    valign: 'middle',
  });

  if (showRules) {
    addHRuler(slide, { x: ruleX, y: textY + 1.35, w: ruleW, h: 0.03, color });
  }

  const secondary = node.subtitle?.trim();
  if (secondary) {
    slide.addText(secondary, {
      x: left,
      y: textY + 1.7,
      w: contentW,
      h: 0.6,
      fontSize: theme.fontSize.body,
      fontFace: theme.fonts.body,
      color: theme.colors.secondary,
      align,
      valign: 'middle',
    });
  }
}
