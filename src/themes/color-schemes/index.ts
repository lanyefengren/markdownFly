/**
 * Built-in ColorScheme registry.
 *
 * Presets are ordinary ColorScheme objects — same shape as user customs.
 * Concrete palettes are imported here once provided; the registry itself
 * has no privileged path. Do not invent "pretty" defaults in code review
 * loops; wait for the author-supplied schemes.
 */

import type { ColorScheme } from '../../models/color-scheme.js';

export const colorSchemes: Record<string, ColorScheme> = {};

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
