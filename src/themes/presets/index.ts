/**
 * Built-in ThemePreset registry — 主题预设（色彩 × 文字 × 版式 组合包）。
 *
 * 数据流：
 *   presets/<name>.ts → getTheme(..., { preset }) / convert(..., { preset }) → Theme
 *
 * 契约（第 5 步拍板）：
 *   - `-t` / frontmatter `theme:` 仍只表示 ColorScheme 名
 *   - 预设走独立入口 `preset` / `--preset`；不传 = 现网行为（不自动套默认预设）
 *   - 显式 textScheme / layoutScheme / theme 覆盖预设对应槽位
 *
 * 当前仅内置 `blue`（用户指定：ocean + academic + legacy）。
 */

import type { ThemePreset } from '../../models/theme-preset.js';
import { bluePreset } from './blue.js';

/** All built-in presets. Keep in sync with *.ts files in this directory. */
const builtInThemePresets: ThemePreset[] = [bluePreset];

export const themePresets: Record<string, ThemePreset> = Object.fromEntries(
  builtInThemePresets.map((p) => [p.name.toLowerCase(), p]),
);

export function getThemePreset(name?: string): ThemePreset | undefined {
  if (!name) return undefined;
  return themePresets[name.toLowerCase()];
}

export function listThemePresets(): ThemePreset[] {
  return Object.values(themePresets);
}

export function registerThemePreset(preset: ThemePreset): void {
  themePresets[preset.name.toLowerCase()] = preset;
}

export function themePresetNames(): string[] {
  return listThemePresets().map((p) => p.name);
}

export function hasThemePreset(name?: string): boolean {
  return Boolean(name && getThemePreset(name));
}

export { bluePreset };
