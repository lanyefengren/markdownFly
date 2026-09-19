/**
 * Quote slide layout
 *
 * Creative extras:
 * - extra.quoteBar: thick left pull-quote rule instead of a giant “ mark
 * - extra.quoteMark=false hides the decorative mark
 * - extra.attributionAlign: left | right (default right for legacy)
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
  specAlign,
} from './layout-spec.js';

export function renderQuoteSlide(
  slide: PptxGenJS.Slide,
  node: SlideNode,
  theme: Theme,
): void {
  const spec = layoutSpec(theme, 'quote');
  const showMark = extraBoolean(spec, 'quoteMark', true);
  const markSize = extraNumber(spec, 'quoteMarkSize', 72);
  const align = specAlign(spec.titleAlign, 'center');
  const { left, right } = resolveSideMargins(spec, 1.5);
  const quoteBar = extraBoolean(spec, 'quoteBar', false);
  const barW = extraNumber(spec, 'quoteBarWidth', 0.09);
  const attrAlign = extraString(spec, 'attributionAlign', 'right') as 'left' | 'right' | 'center';

  if (showMark && !quoteBar) {
    slide.addText('“', {
      x: left,
      y: 1.0,
      w: 2.0,
      h: 1.5,
      fontSize: markSize,
      fontFace: 'Georgia',
      color: theme.colors.accent,
      bold: true,
    });
  }

  const quoteElement = node.elements.find((e) => e.type === 'blockquote');
  if (!quoteElement || quoteElement.type !== 'blockquote') return;

  let quoteText = quoteElement.content;
  let attribution = '';
  const attrMatch = quoteText.match(/\n?\s*[—–-]\s*(.+)$/);
  if (attrMatch) {
    attribution = attrMatch[1].trim();
    quoteText = quoteText.slice(0, attrMatch.index).trim();
  }

  const textX = quoteBar ? left + barW + 0.35 : Math.max(left, showMark && !quoteBar ? 1.8 : left);
  const textW = Math.max(4, 13.33 - textX - right);
  const textY = quoteBar ? 2.2 : 2.5;
  const textH = quoteBar ? 2.8 : 2.5;

  if (quoteBar) {
    addHRuler(slide, {
      // vertical bar via tall thin rect
      x: left,
      y: textY,
      w: barW,
      h: textH,
      color: theme.colors.accent,
    });
  }

  slide.addText(quoteText, {
    x: textX,
    y: textY,
    w: textW,
    h: textH,
    fontSize: theme.fontSize.heading,
    fontFace: theme.fonts.body,
    color: theme.colors.text,
    italic: true,
    align,
    valign: 'middle',
  });

  if (attribution) {
    slide.addText(`— ${attribution}`, {
      x: textX,
      y: textY + textH + 0.25,
      w: textW,
      h: 0.55,
      fontSize: theme.fontSize.body,
      fontFace: theme.fonts.body,
      color: theme.colors.secondary,
      align: attrAlign === 'left' ? 'left' : attrAlign === 'center' ? 'center' : 'right',
    });
  }
}
