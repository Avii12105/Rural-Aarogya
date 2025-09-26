/**
 * Typography styles for React Native
 * Converted from CSS base typography
 */

import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  // Heading styles
  h1: {
    fontSize: 24, // --text-2xl
    fontWeight: '500', // --font-weight-medium
    lineHeight: 36, // 1.5 line height
  },
  
  h2: {
    fontSize: 20, // --text-xl
    fontWeight: '500', // --font-weight-medium
    lineHeight: 30, // 1.5 line height
  },
  
  h3: {
    fontSize: 18, // --text-lg
    fontWeight: '500', // --font-weight-medium
    lineHeight: 27, // 1.5 line height
  },
  
  h4: {
    fontSize: 16, // --text-base
    fontWeight: '500', // --font-weight-medium
    lineHeight: 24, // 1.5 line height
  },
  
  // Body text
  p: {
    fontSize: 16, // --text-base
    fontWeight: '400', // --font-weight-normal
    lineHeight: 24, // 1.5 line height
  },
  
  // Form elements
  label: {
    fontSize: 16, // --text-base
    fontWeight: '500', // --font-weight-medium
    lineHeight: 24, // 1.5 line height
  },
  
  button: {
    fontSize: 16, // --text-base
    fontWeight: '500', // --font-weight-medium
    lineHeight: 24, // 1.5 line height
  },
  
  input: {
    fontSize: 16, // --text-base
    fontWeight: '400', // --font-weight-normal
    lineHeight: 24, // 1.5 line height
  },
  
  // Additional utility text styles
  small: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  
  large: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
  
  // Text variants
  textMuted: {
    opacity: 0.7,
  },
  
  textBold: {
    fontWeight: '700',
  },
  
  textSemibold: {
    fontWeight: '600',
  },
  
  // Text alignment utilities
  textCenter: {
    textAlign: 'center',
  },
  
  textLeft: {
    textAlign: 'left',
  },
  
  textRight: {
    textAlign: 'right',
  },
});

/**
 * Function to get typography style with theme colors
 * @param {string} variant - Typography variant (h1, h2, p, etc.)
 * @param {object} theme - Current theme object
 * @param {object} customStyle - Additional custom styles
 */
export const getTypographyStyle = (variant, theme, customStyle = {}) => {
  const baseStyle = typography[variant] || typography.p;
  
  return {
    ...baseStyle,
    color: theme.colors.foreground,
    ...customStyle,
  };
};

/**
 * Themed typography styles factory
 * @param {object} theme - Current theme object
 */
export const createThemedTypography = (theme) => StyleSheet.create({
  h1: {
    ...typography.h1,
    color: theme.colors.foreground,
  },
  
  h2: {
    ...typography.h2,
    color: theme.colors.foreground,
  },
  
  h3: {
    ...typography.h3,
    color: theme.colors.foreground,
  },
  
  h4: {
    ...typography.h4,
    color: theme.colors.foreground,
  },
  
  p: {
    ...typography.p,
    color: theme.colors.foreground,
  },
  
  label: {
    ...typography.label,
    color: theme.colors.foreground,
  },
  
  button: {
    ...typography.button,
    color: theme.colors.primary,
  },
  
  input: {
    ...typography.input,
    color: theme.colors.foreground,
  },
  
  muted: {
    ...typography.p,
    color: theme.colors.mutedForeground,
  },
  
  accent: {
    ...typography.p,
    color: theme.colors.accentForeground,
  },
  
  destructive: {
    ...typography.p,
    color: theme.colors.destructive,
  },
});