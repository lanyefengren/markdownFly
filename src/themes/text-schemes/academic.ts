/**
 * academic TextScheme — uniform typeface: 宋体.
 */

import { defineUniformTextScheme } from '../../models/text-set.js';
import { sharedCode } from '../text-entries.js';

export const academicTextScheme = defineUniformTextScheme({
  name: 'academic',
  face: '宋体',
  codeEntry: sharedCode,
  note: '学术：正文/标题统一宋体，代码 Consolas。',
});
