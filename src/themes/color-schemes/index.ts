/**
 * Built-in ColorScheme registry.
 *
 * Presets are ordinary ColorScheme objects — same shape as user customs
 * (ink / paper / primary / secondary). No privileged path.
 */

import type { ColorScheme } from '../../models/color-scheme.js';
import { oceanBlueScheme } from './ocean-blue.js';

export const colorSchemes: Record<string, ColorScheme> = {
  [oceanBlueScheme.name]: oceanBlueScheme,
};

export function getColorScheme(name?: string): ColorScheme | undefined {
  if (!name) return undefined;
  return colorSchemes[name.toLowerCase()];
}

export function listColorSchemes(): ColorScheme[] {
  return Object.values(colorSchemes);
}

export function registerColorScheme(scheme: ColorScheme): void {
  colorSchemes[scheme.name.toLowerCase()] = scheme;
}

export { oceanBlueScheme };
