import React from 'react';

import { DEFAULTS, CSS_CLASSES } from '../../core/constants';
import { type ButtonProps } from '../../core/types';
import {
  DEFAULT_BUTTON_THEME,
  getVariantStyle,
  generateVariantStyles,
} from '../../core/themes/buttonTheme';

import './Button.scss';

// Example 1: Composition + Theme Extensibility
// Closed for modification: The button logic doesn't change
// Open for extension: Consumers can provide their own theme via the `theme` prop
// This is truly open/closed because we don't need to modify constants or component code to add variants
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      startIcon,
      endIcon,
      variant = DEFAULTS.BUTTON_VARIANT,
      theme = DEFAULT_BUTTON_THEME,
      isLoading = DEFAULTS.BUTTON_IS_LOADING,
      disabled,
      className = '',
      style,
      ...props
    },
    ref,
  ) => {
    // Get variant style from theme
    const variantStyle = getVariantStyle(variant, theme);

    // Generate inline styles if variant style exists
    const variantInlineStyles = variantStyle
      ? generateVariantStyles(variantStyle, disabled || false, isLoading)
      : undefined;

    // Merge inline styles with passed style prop
    const mergedStyles = {
      ...variantInlineStyles,
      ...style,
    };

    return (
      <button
        ref={ref}
        className={`${CSS_CLASSES.BTN} ${className}`}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        style={Object.keys(mergedStyles).length > 0 ? mergedStyles : undefined}
        {...props}
      >
        {isLoading && <span aria-hidden="true">⟳ </span>}
        {startIcon && !isLoading && <span aria-hidden="true">{startIcon}</span>}
        {children}
        {endIcon && !isLoading && <span aria-hidden="true">{endIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
