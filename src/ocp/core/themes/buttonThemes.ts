/**
 * EXAMPLE: How to use the Button component with custom themes
 * This demonstrates true Open/Closed Principle - extending without modification
 */

import { type ButtonTheme } from '../types';
import { mergeButtonThemes } from './buttonTheme';

/**
 * Example 1: Creating a completely custom theme
 * No modifications to Button component or constants needed!
 */
export const DARK_THEME: ButtonTheme = {
  primary: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    hoverBackgroundColor: '#333',
    activeBackgroundColor: '#555',
  },
  secondary: {
    backgroundColor: '#444',
    color: '#fff',
    hoverBackgroundColor: '#666',
    activeBackgroundColor: '#888',
  },
  success: {
    backgroundColor: '#28a745',
    color: '#fff',
    hoverBackgroundColor: '#218838',
    activeBackgroundColor: '#1e7e34',
  },
  warning: {
    backgroundColor: '#ffc107',
    color: '#000',
    hoverBackgroundColor: '#e0a800',
    activeBackgroundColor: '#d39e00',
  },
};

/**
 * Example 2: Extending the default theme with new variants
 * Keeping existing variants but adding new ones
 */
export const EXTENDED_THEME: ButtonTheme = mergeButtonThemes({
  success: {
    backgroundColor: '#28a745',
    color: '#white',
    hoverBackgroundColor: '#218838',
  },
  warning: {
    backgroundColor: '#ffc107',
    color: '#000',
    hoverBackgroundColor: '#e0a800',
  },
  info: {
    backgroundColor: '#17a2b8',
    color: '#white',
    hoverBackgroundColor: '#138496',
  },
});

/**
 * Example 3: Gradient theme (custom)
 */
export const GRADIENT_THEME: ButtonTheme = {
  gradient: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
  },
  neon: {
    backgroundColor: '#00ff00',
    color: '#000',
    hoverBackgroundColor: '#00cc00',
  },
};

/**
 * Example 4: Brand-specific theme
 */
export const BRAND_THEME: ButtonTheme = {
  brand_primary: {
    backgroundColor: '#ff6b35',
    color: '#fff',
    hoverBackgroundColor: '#e55a2b',
    activeBackgroundColor: '#cc4922',
  },
  brand_secondary: {
    backgroundColor: '#004e89',
    color: '#fff',
    hoverBackgroundColor: '#003d6e',
    activeBackgroundColor: '#002d53',
  },
  brand_accent: {
    backgroundColor: '#f7b801',
    color: '#000',
    hoverBackgroundColor: '#dfa500',
    activeBackgroundColor: '#c79200',
  },
};
