/**
 * Main styles export file for React Native
 * Converted from globals.css to React Native compatible styles
 */

// Export theme constants and utilities
export { theme, lightTheme, darkTheme } from './theme';

// Export theme context and hooks
export {
  ThemeProvider,
  useTheme,
  useThemedStyles,
  createThemedStyles,
  withTheme,
  themeUtils,
} from './ThemeContext';

// Export typography styles
export {
  typography,
  getTypographyStyle,
  createThemedTypography,
} from './typography';

// Export global styles and utilities
export {
  layout,
  spacing,
  borders,
  shadows,
  positioning,
  opacity,
  createThemedGlobalStyles,
  combineStyles,
  safeArea,
} from './globalStyles';

/**
 * Example usage:
 * 
 * // In your App.js
 * import { ThemeProvider } from './styles';
 * 
 * export default function App() {
 *   return (
 *     <ThemeProvider initialTheme="system">
 *       <YourAppContent />
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // In your components
 * import { useTheme, useThemedStyles, layout, spacing } from './styles';
 * 
 * function MyComponent() {
 *   const { currentTheme } = useTheme();
 *   
 *   const styles = useThemedStyles((theme) => StyleSheet.create({
 *     container: {
 *       backgroundColor: theme.colors.background,
 *       padding: 16,
 *     },
 *     text: {
 *       color: theme.colors.foreground,
 *       fontSize: 16,
 *     },
 *   }));
 * 
 *   return (
 *     <View style={[layout.container, styles.container]}>
 *       <Text style={styles.text}>Hello World</Text>
 *     </View>
 *   );
 * }
 */