/**
 * MarkdownFly — Main orchestration
 * Public API: convert(inputPath, options) → outputPath
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseMarkdown } from './parser/index.js';
import { renderPresentation } from './renderer/index.js';
import { getTheme } from './themes/index.js';
import { getOutputPath } from './utils/output-namer.js';

export interface ConvertOptions {
  output?: string;
  /** ColorScheme name */
  theme?: string;
  /** TextScheme name (API-ready; CLI flag deferred) */
  textScheme?: string;
  /** LayoutScheme name (API-ready; CLI flag deferred) */
  layoutScheme?: string;
}

/**
 * Convert a Markdown file to PPTX
 * @returns Absolute path of the generated .pptx file
 */
export async function convert(inputPath: string, options: ConvertOptions = {}): Promise<string> {
  const absInput = resolve(inputPath);
  const markdown = readFileSync(absInput, 'utf-8');

  // Parse
  const presentation = parseMarkdown(markdown);

  // Merge CLI options into config
  if (options.theme) presentation.config.theme = options.theme;

  // Get theme (ColorScheme name → Theme; optional TextScheme / LayoutScheme)
  const theme = getTheme(presentation.config.theme, {
    textScheme: options.textScheme,
    layoutScheme: options.layoutScheme,
  });

  // Determine output path
  const outputPath = resolve(getOutputPath(absInput, options.output));

  // Render PPTX
  await renderPresentation(presentation, theme, outputPath, absInput);

  return outputPath;
}

// Re-export for library use
export { parseMarkdown } from './parser/index.js';
export {
  getTheme,
  themeNames,
  hasTheme,
  DEFAULT_SCHEME_NAME,
  resolveColorScheme,
  createThemeFromScheme,
  getColorScheme,
  listColorSchemes,
  registerColorScheme,
  oceanScheme,
  oceanDarkScheme,
  getTextScheme,
  listTextSchemes,
  registerTextScheme,
  textSchemes,
  systemTextScheme,
  academicTextScheme,
  kaiTextScheme,
  sourceHanSerifTextScheme,
  DEFAULT_TEXT_SCHEME_NAME,
  defineUniformTextScheme,
  layoutSchemes,
  getLayoutScheme,
  listLayoutSchemes,
  registerLayoutScheme,
  folioLayoutScheme,
  legacyLayoutScheme,
  DEFAULT_LAYOUT_SCHEME_NAME,
} from './themes/index.js';
export { renderDiagram, isDiagramLanguage } from './diagrams/index.js';
export { renderPresentation } from './renderer/index.js';
export type { Presentation, SlideNode, SlideElement } from './models/slide.js';
export type { Theme } from './models/theme.js';
export type { MarkdownFlyConfig } from './config/types.js';
export type { ColorScheme, ColorSchemeMode } from './models/color-scheme.js';
export type { LayoutScheme } from './models/layout-scheme.js';
export type {
  FontStyleEntry,
  TextScheme,
  TextSchemePositionKey,
  UniformTextSchemeOptions,
} from './models/text-set.js';
export { resolveSchemeMode, CHROMATIC_SLOTS } from './models/color-scheme.js';
export { TEXT_SCHEME_POSITION_KEYS } from './models/text-set.js';
