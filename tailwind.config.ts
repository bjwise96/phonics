import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        lexend: ['var(--font-lexend)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        inkwell: {
          50: '#f4f6fb',
          100: '#e8edf6',
          200: '#cbd8ed',
          300: '#9ebbe0',
          400: '#6b98ce',
          500: '#487cbe',
          600: '#3561a3',
          700: '#2c4e85',
          800: '#28436e',
          900: '#25395c',
          950: '#18243c',
        },
        phonics: {
          // Consonants (blue/slate)
          consonant: {
            bg: '#eff6ff',
            border: '#93c5fd',
            text: '#1e3a8a',
            darkBg: '#1e293b',
            darkText: '#93c5fd',
          },
          // Short Vowels (red/coral/salmon)
          vowel: {
            bg: '#fef2f2',
            border: '#fca5a5',
            text: '#991b1b',
            darkBg: '#450a0a',
            darkText: '#fca5a5',
          },
          // Vowel Teams & Diphthongs (emerald/green)
          vowelTeam: {
            bg: '#f0fdf4',
            border: '#86efac',
            text: '#166534',
            darkBg: '#052e16',
            darkText: '#86efac',
          },
          // R-Controlled Vowels (amber/orange)
          rControlled: {
            bg: '#fffbeb',
            border: '#fcd34d',
            text: '#92400e',
            darkBg: '#451a03',
            darkText: '#fcd34d',
          },
          // Silent-E & Markers (violet/purple)
          silentE: {
            bg: '#f5f3ff',
            border: '#c4b5fd',
            text: '#5b21b6',
            darkBg: '#2e1065',
            darkText: '#c4b5fd',
          },
          // Affixes & Suffixes (cyan/teal)
          affix: {
            bg: '#ecfeff',
            border: '#67e8f9',
            text: '#155e75',
            darkBg: '#083344',
            darkText: '#67e8f9',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
