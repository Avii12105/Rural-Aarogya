/**
 * Global styles for React Native
 * Converted from CSS base styles and utilities
 */

import { StyleSheet } from 'react-native';

/**
 * Common layout styles
 */
export const layout = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  containerPadded: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  row: {
    flexDirection: 'row',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  centerHorizontal: {
    alignItems: 'center',
  },
  
  centerVertical: {
    justifyContent: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  
  alignStart: {
    alignItems: 'flex-start',
  },
  
  alignEnd: {
    alignItems: 'flex-end',
  },
  
  alignStretch: {
    alignItems: 'stretch',
  },
  
  justifyStart: {
    justifyContent: 'flex-start',
  },
  
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  
  wrap: {
    flexWrap: 'wrap',
  },
  
  nowrap: {
    flexWrap: 'nowrap',
  },
});

/**
 * Spacing utilities
 */
export const spacing = StyleSheet.create({
  // Margin
  m0: { margin: 0 },
  m1: { margin: 4 },
  m2: { margin: 8 },
  m3: { margin: 12 },
  m4: { margin: 16 },
  m5: { margin: 20 },
  m6: { margin: 24 },
  m8: { margin: 32 },
  m10: { margin: 40 },
  m12: { margin: 48 },
  
  // Margin Horizontal
  mx0: { marginHorizontal: 0 },
  mx1: { marginHorizontal: 4 },
  mx2: { marginHorizontal: 8 },
  mx3: { marginHorizontal: 12 },
  mx4: { marginHorizontal: 16 },
  mx5: { marginHorizontal: 20 },
  mx6: { marginHorizontal: 24 },
  mx8: { marginHorizontal: 32 },
  
  // Margin Vertical
  my0: { marginVertical: 0 },
  my1: { marginVertical: 4 },
  my2: { marginVertical: 8 },
  my3: { marginVertical: 12 },
  my4: { marginVertical: 16 },
  my5: { marginVertical: 20 },
  my6: { marginVertical: 24 },
  my8: { marginVertical: 32 },
  
  // Margin Top
  mt0: { marginTop: 0 },
  mt1: { marginTop: 4 },
  mt2: { marginTop: 8 },
  mt3: { marginTop: 12 },
  mt4: { marginTop: 16 },
  mt5: { marginTop: 20 },
  mt6: { marginTop: 24 },
  mt8: { marginTop: 32 },
  
  // Margin Bottom
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4: { marginBottom: 16 },
  mb5: { marginBottom: 20 },
  mb6: { marginBottom: 24 },
  mb8: { marginBottom: 32 },
  
  // Padding
  p0: { padding: 0 },
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p5: { padding: 20 },
  p6: { padding: 24 },
  p8: { padding: 32 },
  p10: { padding: 40 },
  p12: { padding: 48 },
  
  // Padding Horizontal
  px0: { paddingHorizontal: 0 },
  px1: { paddingHorizontal: 4 },
  px2: { paddingHorizontal: 8 },
  px3: { paddingHorizontal: 12 },
  px4: { paddingHorizontal: 16 },
  px5: { paddingHorizontal: 20 },
  px6: { paddingHorizontal: 24 },
  px8: { paddingHorizontal: 32 },
  
  // Padding Vertical
  py0: { paddingVertical: 0 },
  py1: { paddingVertical: 4 },
  py2: { paddingVertical: 8 },
  py3: { paddingVertical: 12 },
  py4: { paddingVertical: 16 },
  py5: { paddingVertical: 20 },
  py6: { paddingVertical: 24 },
  py8: { paddingVertical: 32 },
});

/**
 * Border utilities
 */
export const borders = StyleSheet.create({
  border: {
    borderWidth: 1,
  },
  
  border0: {
    borderWidth: 0,
  },
  
  border2: {
    borderWidth: 2,
  },
  
  borderTop: {
    borderTopWidth: 1,
  },
  
  borderBottom: {
    borderBottomWidth: 1,
  },
  
  borderLeft: {
    borderLeftWidth: 1,
  },
  
  borderRight: {
    borderRightWidth: 1,
  },
  
  rounded: {
    borderRadius: 8,
  },
  
  roundedSm: {
    borderRadius: 6,
  },
  
  roundedMd: {
    borderRadius: 8,
  },
  
  roundedLg: {
    borderRadius: 10,
  },
  
  roundedXl: {
    borderRadius: 14,
  },
  
  roundedFull: {
    borderRadius: 9999,
  },
  
  roundedNone: {
    borderRadius: 0,
  },
});

/**
 * Shadow utilities
 */
export const shadows = StyleSheet.create({
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  
  shadowXl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  
  shadowNone: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

/**
 * Position utilities
 */
export const positioning = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  
  relative: {
    position: 'relative',
  },
  
  inset0: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  
  top0: { top: 0 },
  right0: { right: 0 },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  
  zIndex1: { zIndex: 1 },
  zIndex10: { zIndex: 10 },
  zIndex20: { zIndex: 20 },
  zIndex30: { zIndex: 30 },
  zIndex40: { zIndex: 40 },
  zIndex50: { zIndex: 50 },
});

/**
 * Opacity utilities
 */
export const opacity = StyleSheet.create({
  opacity0: { opacity: 0 },
  opacity25: { opacity: 0.25 },
  opacity50: { opacity: 0.5 },
  opacity75: { opacity: 0.75 },
  opacity100: { opacity: 1 },
});

/**
 * Helper functions for creating themed styles
 */
export const createThemedGlobalStyles = (theme) => StyleSheet.create({
  // Themed background colors
  bgPrimary: {
    backgroundColor: theme.colors.primary,
  },
  
  bgSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  
  bgAccent: {
    backgroundColor: theme.colors.accent,
  },
  
  bgMuted: {
    backgroundColor: theme.colors.muted,
  },
  
  bgCard: {
    backgroundColor: theme.colors.card,
  },
  
  bgBackground: {
    backgroundColor: theme.colors.background,
  },
  
  bgDestructive: {
    backgroundColor: theme.colors.destructive,
  },
  
  // Themed border colors
  borderPrimary: {
    borderColor: theme.colors.primary,
  },
  
  borderSecondary: {
    borderColor: theme.colors.secondary,
  },
  
  borderMuted: {
    borderColor: theme.colors.muted,
  },
  
  borderDefault: {
    borderColor: theme.colors.border,
  },
  
  // Themed text colors
  textPrimary: {
    color: theme.colors.primary,
  },
  
  textSecondary: {
    color: theme.colors.secondary,
  },
  
  textMuted: {
    color: theme.colors.mutedForeground,
  },
  
  textForeground: {
    color: theme.colors.foreground,
  },
  
  textDestructive: {
    color: theme.colors.destructive,
  },
});

/**
 * Utility function to combine styles
 * @param {...object} styles - Styles to combine
 */
export const combineStyles = (...styles) => {
  return styles.filter(Boolean).reduce((acc, style) => ({ ...acc, ...style }), {});
};

/**
 * Safe area utilities for different screen sizes
 */
export const safeArea = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // For status bar
  },
  
  containerWithPadding: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});