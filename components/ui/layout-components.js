/**
 * Layout Components for RuralAarogya
 * Provides consistent spacing and layout patterns
 */

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme, spacing } from '../../styles';

// Container Component
export const Container = ({ 
  children, 
  style,
  padding = true,
  variant = 'default' 
}) => {
  const { currentTheme } = useTheme();
  
  const containerStyles = StyleSheet.create({
    default: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
    },
    padded: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      padding: 16,
    },
    centered: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  return (
    <View style={[
      containerStyles[variant],
      padding && !variant.includes('padded') && spacing.p4,
      style
    ]}>
      {children}
    </View>
  );
};

// Grid Components
export const Grid = ({ 
  children, 
  columns = 2, 
  gap = 12, 
  style 
}) => {
  const gridStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: gap,
    }
  });

  // Calculate flex basis for children
  const childStyle = {
    flexBasis: `${(100 / columns) - (gap * (columns - 1) / columns)}%`
  };

  return (
    <View style={[gridStyles.container, style]}>
      {React.Children.map(children, (child, index) => 
        React.cloneElement(child, {
          style: [child.props.style, childStyle]
        })
      )}
    </View>
  );
};

// Stack Component for vertical spacing
export const Stack = ({ 
  children, 
  gap = 16, 
  style,
  horizontal = false 
}) => {
  const stackStyles = StyleSheet.create({
    container: {
      flexDirection: horizontal ? 'row' : 'column',
      gap: gap,
    }
  });

  return (
    <View style={[stackStyles.container, style]}>
      {children}
    </View>
  );
};

// Section Component for grouped content
export const Section = ({ 
  children, 
  title, 
  subtitle,
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const sectionStyles = StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    header: {
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: currentTheme.colors.foreground,
      marginBottom: subtitle ? 4 : 0,
    },
    subtitle: {
      fontSize: 14,
      color: currentTheme.colors.mutedForeground,
    }
  });

  return (
    <View style={[sectionStyles.container, style]}>
      {(title || subtitle) && (
        <View style={sectionStyles.header}>
          {title && <Text style={sectionStyles.title}>{title}</Text>}
          {subtitle && <Text style={sectionStyles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
  );
};

// Row Component for horizontal layouts
export const Row = ({ 
  children, 
  justify = 'flex-start',
  align = 'center',
  gap = 0,
  style 
}) => {
  const rowStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: justify,
      alignItems: align,
      gap: gap,
    }
  });

  return (
    <View style={[rowStyles.container, style]}>
      {children}
    </View>
  );
};

// Spacer Component
export const Spacer = ({ 
  size = 16, 
  horizontal = false 
}) => {
  const spacerStyles = StyleSheet.create({
    spacer: {
      width: horizontal ? size : undefined,
      height: !horizontal ? size : undefined,
    }
  });

  return <View style={spacerStyles.spacer} />;
};

// Dashboard Layout Component
export const DashboardLayout = ({ 
  children, 
  navbar, 
  tabBar, 
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const layoutStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.colors.background,
    },
    content: {
      flex: 1,
    }
  });

  return (
    <View style={[layoutStyles.container, style]}>
      {navbar}
      {tabBar}
      <View style={layoutStyles.content}>
        {children}
      </View>
    </View>
  );
};

// Card Grid - Specific for dashboard stat cards
export const CardGrid = ({ 
  children, 
  columns = 2,
  style 
}) => {
  return (
    <Grid columns={columns} gap={12} style={style}>
      {children}
    </Grid>
  );
};

// Alert/Banner Component
export const Alert = ({ 
  children, 
  variant = 'info',
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const alertStyles = StyleSheet.create({
    base: {
      padding: 12,
      borderRadius: currentTheme.radius.md,
      borderWidth: 1,
    },
    info: {
      backgroundColor: '#EFF6FF',
      borderColor: '#BFDBFE',
    },
    success: {
      backgroundColor: '#ECFDF5',
      borderColor: '#BBF7D0',
    },
    warning: {
      backgroundColor: '#FFFBEB',
      borderColor: '#FDE68A',
    },
    error: {
      backgroundColor: '#FEF2F2',
      borderColor: '#FECACA',
    }
  });

  return (
    <View style={[alertStyles.base, alertStyles[variant], style]}>
      {children}
    </View>
  );
};

// Loading State Component
export const LoadingState = ({ 
  message = 'Loading...', 
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const loadingStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    text: {
      marginTop: 16,
      fontSize: 16,
      color: currentTheme.colors.mutedForeground,
    }
  });

  return (
    <View style={[loadingStyles.container, style]}>
      <ActivityIndicator size="large" color={currentTheme.colors.primary} />
      <Text style={loadingStyles.text}>{message}</Text>
    </View>
  );
};

// Empty State Component
export const EmptyState = ({ 
  icon,
  title,
  message,
  action,
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const emptyStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    icon: {
      fontSize: 48,
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: currentTheme.colors.foreground,
      textAlign: 'center',
      marginBottom: 8,
    },
    message: {
      fontSize: 16,
      color: currentTheme.colors.mutedForeground,
      textAlign: 'center',
      marginBottom: 24,
    }
  });

  return (
    <View style={[emptyStyles.container, style]}>
      {icon && <Text style={emptyStyles.icon}>{icon}</Text>}
      {title && <Text style={emptyStyles.title}>{title}</Text>}
      {message && <Text style={emptyStyles.message}>{message}</Text>}
      {action}
    </View>
  );
};