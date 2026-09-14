import { FontFamily, FontSize, SpacingSize } from '../types/resume';

export const FONT_CLASSES: Record<FontFamily, string> = {
  inter: 'font-sans', // Inter
  merriweather: 'font-serif', // Merriweather
  playfair: 'font-playfair',
  outfit: 'font-outfit',
  jakarta: 'font-jakarta',
};

export const FONT_FAMILY_MAP: Record<FontFamily, string> = {
  inter: "'Inter', sans-serif",
  merriweather: "'Merriweather', serif",
  playfair: "'Playfair Display', serif",
  outfit: "'Outfit', sans-serif",
  jakarta: "'Plus Jakarta Sans', sans-serif",
};

export const FONT_SIZE_CLASSES: Record<FontSize, { base: string; title: string; subtitle: string; body: string; sm: string }> = {
  sm: {
    base: 'text-xs',
    title: 'text-xl font-bold',
    subtitle: 'text-sm font-semibold',
    body: 'text-xs leading-normal',
    sm: 'text-[10px]',
  },
  md: {
    base: 'text-sm',
    title: 'text-2xl font-bold',
    subtitle: 'text-base font-semibold',
    body: 'text-sm leading-relaxed',
    sm: 'text-xs',
  },
  lg: {
    base: 'text-base',
    title: 'text-3xl font-bold',
    subtitle: 'text-lg font-semibold',
    body: 'text-base leading-relaxed',
    sm: 'text-sm',
  },
};

export const SPACING_CLASSES: Record<SpacingSize, { sectionGap: string; itemGap: string; padding: string }> = {
  compact: {
    sectionGap: 'mb-3',
    itemGap: 'mb-2',
    padding: 'p-6',
  },
  normal: {
    sectionGap: 'mb-5',
    itemGap: 'mb-3.5',
    padding: 'p-8',
  },
  spacious: {
    sectionGap: 'mb-7',
    itemGap: 'mb-5',
    padding: 'p-10',
  },
};

export const ACCENT_COLOR_PRESETS = [
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Slate Dark', value: '#1e293b' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Amber', value: '#d97706' },
];
