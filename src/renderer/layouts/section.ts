/**
 * Section divider slide layout
 *
 * Creative extras:
 * - accentBar 'none' + extra.doubleRules → magazine band framed by two rules
 * - extra.ruleWeight / extra.bandY / extra.bandH control the ruled band
 */

import PptxGenJS from 'pptxgenjs';
import type { SlideNode } from '../../models/slide.js';
import type { Theme } from '../../models/theme.js';
import {
  addHRuler,
  extraBoolean,
  extraNumber,
  layoutSpec,
  resolveSideMargins,
  ruleColor,
  specAlign,
  titleRuleRole,
} from './layout-spec.js';

export function renderSectionSlide(
  slide: PptxGenJS.Slide,
  node: SlideNode,
  theme: Theme,
): void {
  const spec = layoutSpec(theme, 'section');
  const barW = theme.styles?.sectionBarWidth ?? extraNumber(spec, 'sectionBarWidth', 0.15);
  const accentBar = spec.accentBar ?? 'left';
  const titleAlign = specAlign(spec.titleAlign, 'left');
  const { left, right } = resolveSideMargins(spec, accentBar === 'left' ? 1.0 : 0.9);

  if (accentBar !== 'none') {
    if (accentBar === 'left') {
      slide.addShape('rect' as PptxGenJS.ShapeType, {
        x: 0,
        y: 0,
        w: barW,
        h: 7.5,
        fill: { color: theme.colors.accent },
      });
    } else if (accentBar === 'top') {
      slide.addShape('rect' as PptxGenJS.ShapeType, {
        x: 0,
        y: 0,
        w: 13.33,
        h: barW,
        fill: { color: theme.colors.accent },
      });
    } else if (accentBar === 'bottom') {
      slide.addShape('rect' as PptxGenJS.ShapeType, {
        x: 0,
        y: 7.5 - barW,
        w: 13.33,
        h: barW,
        fill: { color: theme.colors.accent },
      });
    }
  }

  const leftPad = accentBar === 'left' ? Math.max(left, barW + 0.85) : left;
  const textW = Math.max(3, 13.33 - leftPad - right);

  // Ruled editorial band (innovative section: no side bar)
  if (extraBoolean(spec, 'doubleRules', false)) {
    const weight = extraNumber(spec, 'ruleWeight', 0.035);
    const bandY = extraNumber(spec, 'bandY', 2.35);
    const bandH = extraNumber(spec, 'bandH', 1.7);
    const color = ruleColor(theme, titleRuleRole(spec) === 'primary' ? 'primary' : titleRuleRole(spec));
    const ruleX = leftPad;
    const ruleW = textW;
    addHRuler(slide, { x: ruleX, y: bandY, w: ruleW, h: weight, color });
    addHRuler(slide, { x: ruleX, y: bandY + bandH, w: ruleW, h: weight, color });

    if (node.title) {
      slide.addText(node.title, {
        x: leftPad,
        y: bandY + weight + 0.08,
        w: textW,
        h: bandH - weight * 2 - 0.16,
        fontSize: theme.fontSize.heading + 6,
        fontFace: theme.fonts.heading,
        color: theme.colors.text,
        bold: true,
        align: titleAlign,
        valign: 'middle',
      });
    }

    const sub = node.subtitle?.trim();
    if (sub) {
      slide.addText(sub, {
        x: leftPad,
        y: bandY + bandH + 0.35,
        w: textW,
        h: 0.45,
        fontSize: theme.fontSize.small,
        fontFace: theme.fonts.body,
        color: theme.colors.secondary,
        align: titleAlign,
      });
    }
    return;
  }

  if (node.title) {
    slide.addText(node.title, {
      x: leftPad,
      y: 2.5,
      w: textW,
      h: 2.0,
      fontSize: theme.fontSize.heading + 4,
      fontFace: theme.fonts.heading,
      color: theme.colors.text,
      bold: true,
      align: titleAlign,
      valign: 'middle',
    });
  }
}
