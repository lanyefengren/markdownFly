/**
 * Title slide layout — cover/opening slide
 *
 * Creative extras (folio etc., all optional; omit → legacy-centered cover):
 * - extra.spineWidth: left full-height spine bar (inches)
 * - extra.titleY / subtitleY / metaY: vertical anchors
 * - extra.titleRule: draw a horizontal rule under the title
 * - extra.metaBottom: park meta near the slide bottom
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

export function renderTitleSlide(
  slide: PptxGenJS.Slide,
  node: SlideNode,
  theme: Theme,
): void {
  const spec = layoutSpec(theme, 'title');
  const align = specAlign(spec.titleAlign, 'center');
  const { left, right } = resolveSideMargins(spec, 0.8);
  const spineW = extraNumber(spec, 'spineWidth', 0);
  const boxX = left + spineW;
  const contentW = Math.max(2, 13.33 - boxX - right);

  const textColor = theme.colors.titleText ?? 'FFFFFF';
  const subtitleColor = textColor === 'FFFFFF' ? 'FFFFFFCC' : theme.colors.secondary;
  const metaColor = textColor === 'FFFFFF' ? 'FFFFFF99' : theme.colors.secondary;

  const bgColor = theme.colors.backgroundGradient
    ? undefined
    : theme.colors.titleBackground ?? theme.colors.primary;
  if (bgColor) {
    slide.background = { color: bgColor };
  }

  // Editorial spine on the left edge
  if (spineW > 0) {
    slide.addShape('rect' as PptxGenJS.ShapeType, {
      x: 0,
      y: 0,
      w: spineW,
      h: 7.5,
      fill: { color: theme.colors.primary },
    });
  }

  const titleY = extraNumber(spec, 'titleY', 2.0);
  const subtitleY = extraNumber(spec, 'subtitleY', 3.8);
  const metaBottom = extraBoolean(spec, 'metaBottom', false);
  const metaY = extraNumber(spec, 'metaY', metaBottom ? 6.55 : 5.5);

  if (node.title) {
    slide.addText(node.title, {
      x: boxX,
      y: titleY,
      w: contentW,
      h: 1.5,
      fontSize: theme.fontSize.title,
      fontFace: theme.fonts.heading,
      color: textColor,
      bold: true,
      align,
      valign: 'middle',
    });

    if (extraBoolean(spec, 'titleRule', false)) {
      const ruleH = extraNumber(spec, 'titleRuleHeight', 0.03);
      const ruleY = extraNumber(spec, 'titleRuleY', titleY + 1.55);
      const ruleW = extraNumber(spec, 'titleRuleWidth', Math.min(contentW, 4.2));
      addHRuler(slide, {
        x: align === 'center' ? boxX + (contentW - ruleW) / 2 : boxX,
        y: ruleY,
        w: ruleW,
        h: ruleH,
        color: ruleColor(theme, titleRuleRole(spec)),
      });
    }
  }

  if (node.subtitle) {
    slide.addText(node.subtitle, {
      x: boxX,
      y: subtitleY,
      w: contentW,
      h: 0.8,
      fontSize: theme.fontSize.body,
      fontFace: theme.fonts.body,
      color: subtitleColor,
      align,
      valign: 'middle',
    });
  }

  const textElements = node.elements.filter((e) => e.type === 'text');
  if (textElements.length > 0) {
    const metaText = textElements.map((e) => e.content).join(' · ');
    slide.addText(metaText, {
      x: boxX,
      y: metaY,
      w: contentW,
      h: 0.6,
      fontSize: theme.fontSize.small,
      fontFace: theme.fonts.body,
      color: metaColor,
      align,
    });
  }
}
