/**
 * Theme constants for React Native
 * Converted from CSS custom properties
 */

// Helper function to convert oklch to hex (simplified for common values)
const oklchToHex = {
  'oklch(0.145 0 0)': '#252525',      // Very dark gray
  'oklch(0.985 0 0)': '#fafafa',      // Very light gray
  'oklch(0.205 0 0)': '#343434',      // Dark gray
  'oklch(0.269 0 0)': '#444444',      // Medium dark gray
  'oklch(0.708 0 0)': '#b5b5b5',      // Medium light gray
  'oklch(0.922 0 0)': '#ebebeb',      // Light gray
  'oklch(0.97 0 0)': '#f7f7f7',       // Very light gray
  'oklch(0.95 0.0058 264.53)': '#f1f1f6', // Light purple-gray
  'oklch(0.439 0 0)': '#707070',      // Medium gray
  'oklch(0.396 0.141 25.723)': '#8b4513', // Dark reddish brown
  'oklch(0.637 0.237 25.331)': '#cd853f', // Sandy brown
  'oklch(0.488 0.243 264.376)': '#6366f1', // Indigo
  'oklch(0.696 0.17 162.48)': '#10b981',   // Emerald
  'oklch(0.769 0.188 70.08)': '#f59e0b',   // Amber
  'oklch(0.627 0.265 303.9)': '#8b5cf6',   // Violet
  'oklch(0.645 0.246 16.439)': '#f97316',  // Orange
  'oklch(0.646 0.222 41.116)': '#eab308',  // Yellow
  'oklch(0.6 0.118 184.704)': '#06b6d4',   // Cyan
  'oklch(0.398 0.07 227.392)': '#3b82f6',  // Blue
  'oklch(0.828 0.189 84.429)': '#84cc16',  // Lime
};

const convertColor = (oklchValue) => {
  return oklchToHex[oklchValue] || oklchValue;
};

export const lightTheme = {
  colors: {
    // Base colors
    background: '#ffffff',
    foreground: convertColor('oklch(0.145 0 0)'),
    
    // Card colors
    card: '#ffffff',
    cardForeground: convertColor('oklch(0.145 0 0)'),
    
    // Popover colors
    popover: convertColor('oklch(1 0 0)'),
    popoverForeground: convertColor('oklch(0.145 0 0)'),
    
    // Primary colors
    primary: '#2563EB',
    primaryForeground: '#FFFFFF',
    
    // Secondary colors
    secondary: '#F1F5F9',
    secondaryForeground: '#334155',
    
    // Muted colors
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    
    // Accent colors
    accent: '#e9ebef',
    accentForeground: '#030213',
    
    // Destructive colors
    destructive: '#d4183d',
    destructiveForeground: '#ffffff',
    
    // Border and input colors
    border: 'rgba(0, 0, 0, 0.1)',
    input: 'transparent',
    inputBackground: '#f3f3f5',
    switchBackground: '#cbced4',
    ring: convertColor('oklch(0.708 0 0)'),
    
    // Chart colors
    chart1: convertColor('oklch(0.646 0.222 41.116)'),
    chart2: convertColor('oklch(0.6 0.118 184.704)'),
    chart3: convertColor('oklch(0.398 0.07 227.392)'),
    chart4: convertColor('oklch(0.828 0.189 84.429)'),
    chart5: convertColor('oklch(0.769 0.188 70.08)'),
    
    // Sidebar colors
    sidebar: convertColor('oklch(0.985 0 0)'),
    sidebarForeground: convertColor('oklch(0.145 0 0)'),
    sidebarPrimary: '#030213',
    sidebarPrimaryForeground: convertColor('oklch(0.985 0 0)'),
    sidebarAccent: convertColor('oklch(0.97 0 0)'),
    sidebarAccentForeground: convertColor('oklch(0.205 0 0)'),
    sidebarBorder: convertColor('oklch(0.922 0 0)'),
    sidebarRing: convertColor('oklch(0.708 0 0)'),
  },
  
  // Spacing and sizing
  radius: {
    sm: 6,  // calc(10px - 4px)
    md: 8,  // calc(10px - 2px)
    lg: 10, // 10px (0.625rem)
    xl: 14, // calc(10px + 4px)
  },
  
  // Typography
  fontSize: {
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
  },
};

export const darkTheme = {
  colors: {
    // Base colors
    background: convertColor('oklch(0.145 0 0)'),
    foreground: convertColor('oklch(0.985 0 0)'),
    
    // Card colors
    card: convertColor('oklch(0.145 0 0)'),
    cardForeground: convertColor('oklch(0.985 0 0)'),
    
    // Popover colors
    popover: convertColor('oklch(0.145 0 0)'),
    popoverForeground: convertColor('oklch(0.985 0 0)'),
    
    // Primary colors
    primary: convertColor('oklch(0.985 0 0)'),
    primaryForeground: convertColor('oklch(0.205 0 0)'),
    
    // Secondary colors
    secondary: convertColor('oklch(0.269 0 0)'),
    secondaryForeground: convertColor('oklch(0.985 0 0)'),
    
    // Muted colors
    muted: convertColor('oklch(0.269 0 0)'),
    mutedForeground: convertColor('oklch(0.708 0 0)'),
    
    // Accent colors
    accent: convertColor('oklch(0.269 0 0)'),
    accentForeground: convertColor('oklch(0.985 0 0)'),
    
    // Destructive colors
    destructive: convertColor('oklch(0.396 0.141 25.723)'),
    destructiveForeground: convertColor('oklch(0.637 0.237 25.331)'),
    
    // Border and input colors
    border: convertColor('oklch(0.269 0 0)'),
    input: convertColor('oklch(0.269 0 0)'),
    inputBackground: convertColor('oklch(0.269 0 0)'),
    switchBackground: convertColor('oklch(0.269 0 0)'),
    ring: convertColor('oklch(0.439 0 0)'),
    
    // Chart colors
    chart1: convertColor('oklch(0.488 0.243 264.376)'),
    chart2: convertColor('oklch(0.696 0.17 162.48)'),
    chart3: convertColor('oklch(0.769 0.188 70.08)'),
    chart4: convertColor('oklch(0.627 0.265 303.9)'),
    chart5: convertColor('oklch(0.645 0.246 16.439)'),
    
    // Sidebar colors
    sidebar: convertColor('oklch(0.205 0 0)'),
    sidebarForeground: convertColor('oklch(0.985 0 0)'),
    sidebarPrimary: convertColor('oklch(0.488 0.243 264.376)'),
    sidebarPrimaryForeground: convertColor('oklch(0.985 0 0)'),
    sidebarAccent: convertColor('oklch(0.269 0 0)'),
    sidebarAccentForeground: convertColor('oklch(0.985 0 0)'),
    sidebarBorder: convertColor('oklch(0.269 0 0)'),
    sidebarRing: convertColor('oklch(0.439 0 0)'),
  },
  
  // Spacing and sizing (same as light theme)
  radius: {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 14,
  },
  
  // Typography (same as light theme)
  fontSize: {
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};