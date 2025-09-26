/**
 * Shared UI Components for RuralAarogya
 * Provides consistent styling across all dashboards
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, useThemedStyles } from '../../styles';

// Shared Card Component
export const Card = ({ children, style, variant = 'default' }) => {
  const { currentTheme } = useTheme();
  
  const cardStyles = useThemedStyles((theme) => StyleSheet.create({
    default: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.lg,
      padding: 16,
    },
    info: {
      backgroundColor: theme.colors.secondary,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.lg,
      padding: 16,
    }
  }));

  return (
    <View style={[cardStyles[variant], style]}>
      {children}
    </View>
  );
};

// Shared Button Component
export const Button = ({ 
  children, 
  onPress, 
  variant = 'primary', 
  size = 'default', 
  style,
  textStyle,
  disabled = false,
  ...props 
}) => {
  const { currentTheme } = useTheme();
  
  const buttonStyles = useThemedStyles((theme) => StyleSheet.create({
    base: {
      borderRadius: theme.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    small: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    default: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    large: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    disabled: {
      opacity: 0.6,
    }
  }));

  const textStyles = useThemedStyles((theme) => StyleSheet.create({
    primary: {
      color: theme.colors.primaryForeground,
      fontWeight: '600',
      fontSize: theme.fontSize.base,
    },
    secondary: {
      color: theme.colors.secondaryForeground,
      fontWeight: '500',
      fontSize: theme.fontSize.base,
    },
    outline: {
      color: theme.colors.foreground,
      fontWeight: '500',
      fontSize: theme.fontSize.base,
    },
    ghost: {
      color: theme.colors.foreground,
      fontWeight: '500',
      fontSize: theme.fontSize.base,
    },
    small: {
      fontSize: 14,
    },
    large: {
      fontSize: theme.fontSize.lg,
    }
  }));

  return (
    <TouchableOpacity
      style={[
        buttonStyles.base,
        buttonStyles[variant],
        buttonStyles[size],
        disabled && buttonStyles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[
        textStyles[variant],
        textStyles[size],
        textStyle
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

// Shared Badge Component
export const Badge = ({ 
  children, 
  variant = 'default', 
  style,
  textStyle 
}) => {
  const { currentTheme } = useTheme();
  
  const badgeStyles = useThemedStyles((theme) => StyleSheet.create({
    base: {
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 4,
      alignSelf: 'flex-start',
    },
    default: {
      backgroundColor: theme.colors.secondary,
    },
    success: {
      backgroundColor: '#10B981',
    },
    warning: {
      backgroundColor: '#F59E0B',
    },
    error: {
      backgroundColor: '#EF4444',
    },
    info: {
      backgroundColor: '#3B82F6',
    }
  }));

  const textStyles = useThemedStyles((theme) => StyleSheet.create({
    base: {
      fontSize: 12,
      fontWeight: '500',
    },
    default: {
      color: theme.colors.secondaryForeground,
    },
    success: {
      color: '#FFFFFF',
    },
    warning: {
      color: '#FFFFFF',
    },
    error: {
      color: '#FFFFFF',
    },
    info: {
      color: '#FFFFFF',
    }
  }));

  return (
    <View style={[badgeStyles.base, badgeStyles[variant], style]}>
      <Text style={[textStyles.base, textStyles[variant], textStyle]}>
        {children}
      </Text>
    </View>
  );
};

// Shared Typography Components
export const Typography = ({ 
  variant = 'body', 
  children, 
  style,
  color,
  ...props 
}) => {
  const { currentTheme } = useTheme();
  
  const textStyles = useThemedStyles((theme) => StyleSheet.create({
    h1: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.colors.foreground,
      lineHeight: 34,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.foreground,
      lineHeight: 30,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.foreground,
      lineHeight: 26,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.foreground,
      lineHeight: 24,
    },
    body: {
      fontSize: theme.fontSize.base,
      color: theme.colors.foreground,
      lineHeight: 20,
    },
    bodySmall: {
      fontSize: 14,
      color: theme.colors.foreground,
      lineHeight: 18,
    },
    caption: {
      fontSize: 12,
      color: theme.colors.mutedForeground,
      lineHeight: 16,
    },
    muted: {
      fontSize: theme.fontSize.base,
      color: theme.colors.mutedForeground,
      lineHeight: 20,
    }
  }));

  return (
    <Text 
      style={[
        textStyles[variant], 
        color && { color },
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

// Shared Stat Card Component
export const StatCard = ({ 
  icon, 
  number, 
  label, 
  sublabel, 
  style,
  variant = 'default'
}) => {
  const { currentTheme } = useTheme();
  
  const cardStyles = useThemedStyles((theme) => StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.lg,
      padding: 16,
      alignItems: 'center',
      minHeight: 120,
      justifyContent: 'center',
    },
    icon: {
      fontSize: 24,
      marginBottom: 8,
    },
    number: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.foreground,
      marginBottom: 4,
    },
    label: {
      fontSize: 12,
      color: theme.colors.mutedForeground,
      textAlign: 'center',
    },
    sublabel: {
      fontSize: 10,
      color: theme.colors.mutedForeground,
      textAlign: 'center',
      marginTop: 2,
    }
  }));

  return (
    <View style={[cardStyles.container, style]}>
      <Text style={cardStyles.icon}>{icon}</Text>
      <Text style={cardStyles.number}>{number}</Text>
      <Text style={cardStyles.label}>{label}</Text>
      {sublabel && <Text style={cardStyles.sublabel}>{sublabel}</Text>}
    </View>
  );
};

// Shared Navigation Bar
export const NavBar = ({ 
  title, 
  user, 
  onLogout, 
  rightContent,
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const navStyles = useThemedStyles((theme) => StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: '600',
      color: theme.colors.foreground,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    userName: {
      fontSize: 12,
      color: theme.colors.mutedForeground,
    }
  }));

  return (
    <View style={[navStyles.container, style]}>
      <Typography variant="h4">{title}</Typography>
      <View style={navStyles.rightSection}>
        {user && (
          <Typography variant="caption">
            {user.name || 'User'}
          </Typography>
        )}
        {rightContent}
        {onLogout && (
          <Button 
            variant="outline" 
            size="small" 
            onPress={onLogout}
          >
            Logout
          </Button>
        )}
      </View>
    </View>
  );
};

// Shared Tab Bar
export const TabBar = ({ 
  tabs, 
  activeTab, 
  onTabPress, 
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const tabStyles = useThemedStyles((theme) => StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.secondary,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    tabActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    tabText: {
      fontSize: 14,
      color: theme.colors.secondaryForeground,
      fontWeight: '500',
    },
    tabTextActive: {
      color: theme.colors.primaryForeground,
      fontWeight: '600',
    }
  }));

  return (
    <View style={[tabStyles.container, style]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabPress(tab.key)}
          style={[
            tabStyles.tab,
            activeTab === tab.key && tabStyles.tabActive
          ]}
        >
          <Text style={[
            tabStyles.tabText,
            activeTab === tab.key && tabStyles.tabTextActive
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Quick Action Card
export const QuickActionCard = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const cardStyles = useThemedStyles((theme) => StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.lg,
      padding: 16,
      alignItems: 'center',
      minHeight: 120,
    },
    icon: {
      fontSize: 32,
      marginBottom: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.foreground,
      textAlign: 'center',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 12,
      color: theme.colors.mutedForeground,
      textAlign: 'center',
    }
  }));

  return (
    <TouchableOpacity 
      style={[cardStyles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={cardStyles.icon}>{icon}</Text>
      <Text style={cardStyles.title}>{title}</Text>
      <Text style={cardStyles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

// Alert Item Component
export const AlertItem = ({ 
  title, 
  subtitle, 
  variant = 'info', 
  badge,
  style 
}) => {
  const { currentTheme } = useTheme();
  
  const alertStyles = useThemedStyles((theme) => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      gap: 12,
    },
    error: {
      backgroundColor: '#FEE2E2',
      borderColor: '#FCA5A5',
    },
    warning: {
      backgroundColor: '#FEF3C7',
      borderColor: '#FDE68A',
    },
    info: {
      backgroundColor: '#DBEAFE',
      borderColor: '#BFDBFE',
    },
    success: {
      backgroundColor: '#D1FAE5',
      borderColor: '#A7F3D0',
    },
    content: {
      flex: 1,
    },
    title: {
      fontWeight: '600',
      marginBottom: 4,
    },
    titleError: {
      color: '#991B1B',
    },
    titleWarning: {
      color: '#92400E',
    },
    titleInfo: {
      color: '#1E40AF',
    },
    titleSuccess: {
      color: '#065F46',
    },
    subtitle: {
      fontSize: 12,
    },
    subtitleError: {
      color: '#DC2626',
    },
    subtitleWarning: {
      color: '#B45309',
    },
    subtitleInfo: {
      color: '#2563EB',
    },
    subtitleSuccess: {
      color: '#047857',
    }
  }));

  return (
    <View style={[alertStyles.container, alertStyles[variant], style]}>
      <View style={alertStyles.content}>
        <Typography 
          style={[alertStyles.title, alertStyles[`title${variant.charAt(0).toUpperCase() + variant.slice(1)}`]]}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            style={[alertStyles.subtitle, alertStyles[`subtitle${variant.charAt(0).toUpperCase() + variant.slice(1)}`]]}
          >
            {subtitle}
          </Typography>
        )}
      </View>
      {badge && (
        <Badge variant={variant}>{badge}</Badge>
      )}
    </View>
  );
};

// Alert List Component
export const AlertList = ({ 
  title, 
  alerts = [], 
  style 
}) => {
  return (
    <Card style={style}>
      <Typography variant="h4" style={{ marginBottom: 12 }}>{title}</Typography>
      <View style={{ gap: 8 }}>
        {alerts.map((alert, index) => (
          <AlertItem
            key={index}
            title={alert.title}
            subtitle={alert.subtitle}
            variant={alert.variant}
            badge={alert.badge}
          />
        ))}
      </View>
    </Card>
  );
};
