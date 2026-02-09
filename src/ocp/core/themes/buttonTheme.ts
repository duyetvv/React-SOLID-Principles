import { type ButtonTheme, type ButtonVariantStyle } from '../types';

/**
 * Default theme with common button variants
 * This is just a default starting point - consumers can override or extend it
 */
export const DEFAULT_BUTTON_THEME: ButtonTheme = {
  primary: {
    backgroundColor: '#007bff',
    color: 'white',
    hoverBackgroundColor: '#0056b3',
    activeBackgroundColor: '#003d82',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: 'white',
    hoverBackgroundColor: '#545b62',
    activeBackgroundColor: '#3d4147',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: 'white',
    hoverBackgroundColor: '#c82333',
    activeBackgroundColor: '#bd2130',
  },
};

/**
 * Merges custom theme with default theme
 * This allows consumers to extend or override specific variants
 */
export const mergeButtonThemes = (
  customTheme?: ButtonTheme,
  baseTheme: ButtonTheme = DEFAULT_BUTTON_THEME
): ButtonTheme => {
  return {
    ...baseTheme,
    ...customTheme,
  };
};

/**
 * Gets variant style from theme
 * Returns undefined if variant doesn't exist, allowing fallback to CSS
 */
export const getVariantStyle = (
  variant: string | undefined,
  theme: ButtonTheme
): ButtonVariantStyle | undefined => {
  if (!variant) return undefined;
  return theme[variant];
};

/**
 * Generates inline styles for a button variant
 * Useful for dynamic styling without CSS classes
 */
export const generateVariantStyles = (
  variantStyle: ButtonVariantStyle | undefined,
  isDisabled: boolean,
  isLoading: boolean
): React.CSSProperties | undefined => {
  if (!variantStyle) return undefined;

  const opacity = isDisabled || isLoading ? 0.6 : 1;

  return {
    backgroundColor: variantStyle.backgroundColor,
    color: variantStyle.color,
    opacity,
    cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
  };
};

/**
 * Factory function to create a themed button component
 * Allows consumers to create button variants without modifying the base Button component
 */
export const createThemedButton = (theme: ButtonTheme) => {
  return theme;
};
