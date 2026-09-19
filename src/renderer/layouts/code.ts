/**
 * Code-focused slide layout
 * Supports asymmetric margins + optional title rule via layout spec extras.
 */

import PptxGenJS from 'pptxgenjs';
import type { SlideNode } from '../../models/slide.js';
import type { Theme } from '../../models/theme.js';
import type { RenderContext } from './index.js';
import {
  addHRuler,
  extraBoolean,
  layoutSpec,
  resolveSideMargins,
  ruleColor,
  specAlign,
  specNumber,
  titleRuleHeight,
  titleRuleRole,
} from './layout-spec.js';

export async function renderCodeSlide(
  slide: PptxGenJS.Slide,
  node: SlideNode,
  theme: Theme,
  ctx: RenderContext,
): Promise<void> {
  const spec = layoutSpec(theme, 'code');
  const { left, right } = resolveSideMargins(spec, 0.5);
  const titleH = specNumber(spec.titleHeight, 0.7);
  const titleAlign = specAlign(spec.titleAlign, 'left');
  const contentW = Math.max(3, 13.33 - left - right);
  const titleGap = 0.2;

  let yPos = 0.3;

  if (node.title) {
    slide.addText(node.title, {
      x: left,
      y: yPos,
      w: contentW,
      h: titleH,
      fontSize: theme.fontSize.heading,
      fontFace: theme.fonts.heading,
      color: theme.colors.primary,
      bold: true,
      align: titleAlign === 'center' ? 'center' : 'left',
    });

    if (extraBoolean(spec, 'titleRule', false)) {
      const rh = titleRuleHeight(spec, 0.03);
      addHRuler(slide, {
        x: left,
        y: yPos + titleH + 0.02,
        w: contentW,
        h: rh,
        color: ruleColor(theme, titleRuleRole(spec)),
      });
    }
    yPos += titleH + titleGap;
  }

  for (const element of node.elements) {
    if (element.type === 'code') {
      const runs = await ctx.highlightCode(
        element.content,
        element.language ?? 'text',
        element.highlightLines,
      );

      slide.addText(runs, {
        x: left,
        y: yPos,
        w: contentW,
        h: 7.5 - yPos - 0.45,
        fill: { color: theme.colors.codeBackground },
        color: theme.colors.codeText,
        fontFace: theme.fonts.code,
        fontSize: theme.fontSize.code,
        valign: 'top',
        paraSpaceAfter: 2,
        margin: [10, 15, 10, 15],
      });
      yPos += 5.0;
    }
  }
}
