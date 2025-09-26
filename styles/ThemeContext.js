/**
 * Theme Context for React Native
 * Provides theme management and utilities
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { theme } from './theme';

// Create Theme Context
const ThemeContext = createContext({
  currentTheme: theme.light,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

/**
 * Theme Provider Component
 * Wraps your app to provide theme context
 */
export const ThemeProvider = ({ children, initialTheme = 'system' }) => {
  const [isDark, setIsDark] = useState(false);
  const [themeMode, setThemeMode] = useState(initialTheme);

  // Listen to system theme changes
  useEffect(() => {
    if (themeMode === 'system') {
      const colorScheme = Appearance.getColorScheme();
      setIsDark(colorScheme === 'dark');

      // Listen for changes in system theme
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        if (themeMode === 'system') {
          setIsDark(colorScheme === 'dark');
        }
      });

      return () => subscription.remove();
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
    setIsDark(newMode === 'dark');
  };

  const setTheme = (mode) => {
    setThemeMode(mode);
    if (mode === 'system') {
      const colorScheme = Appearance.getColorScheme();
      setIsDark(colorScheme === 'dark');
    } else {
      setIsDark(mode === 'dark');
    }
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  const value = {
    currentTheme,
    isDark,
    themeMode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

/**
 * Hook to get themed styles
 * @param {function} styleFactory - Function that takes theme and returns styles
 */
export const useThemedStyles = (styleFactory) => {
  const { currentTheme } = useTheme();
  return styleFactory(currentTheme);
};

/**
 * Utility function to create themed styles
 * @param {function} styleFactory - Function that takes theme and returns StyleSheet
 */
export const createThemedStyles = (styleFactory) => {
  return (currentTheme) => styleFactory(currentTheme);
};

/**
 * Higher Order Component to inject theme
 */
export const withTheme = (WrappedComponent) => {
  return function ThemedComponent(props) {
    const themeProps = useTheme();
    return <WrappedComponent {...props} theme={themeProps} />;
  };
};

/**
 * Utility functions for colors
 */
export const themeUtils = {
  /**
   * Get color with opacity
   * @param {string} color - Base color
   * @param {number} opacity - Opacity value (0-1)
   */
  getColorWithOpacity: (color, opacity) => {
    if (color.startsWith('rgba')) {
      return color;
    }
    
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
  },

  /**
   * Get contrasting text color
   * @param {string} backgroundColor - Background color
   * @param {object} theme - Current theme
   */
  getContrastingTextColor: (backgroundColor, theme) => {
    // Simple contrast logic - in a real app you might want more sophisticated logic
    const lightColors = ['#ffffff', '#fff', 'white'];
    const isLight = lightColors.some(color => 
      backgroundColor.toLowerCase().includes(color.toLowerCase())
    );
    
    return isLight ? theme.colors.foreground : theme.colors.background;
  },

  /**
   * Get semantic colors based on intent
   * @param {string} intent - Color intent (success, warning, error, info)
   * @param {object} theme - Current theme
   */
  getSemanticColor: (intent, theme) => {
    const semanticMap = {
      success: theme.colors.chart2, // Green
      warning: theme.colors.chart5, // Orange
      error: theme.colors.destructive, // Red
      info: theme.colors.chart3, // Blue
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
    };
    
    return semanticMap[intent] || theme.colors.foreground;
  },
};