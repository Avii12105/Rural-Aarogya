import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from './styles';
import { LoginPage } from './components/auth/LoginPage';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { HospitalDashboard } from './components/hospital/HospitalDashboard';
import { ASHADashboard } from './components/asha/ASHADashboard';
import { HealthDeptDashboard } from './components/health-dept/HealthDeptDashboard';
import { PharmacyDashboard } from './components/pharmacy/PharmacyDashboard';

// Custom Heart Icon Component (replacing SVG)
const HeartIcon = ({ size = 32, color = '#ffffff' }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={[styles.iconText, { color, fontSize: size * 0.6 }]}>❤️</Text>
  </View>
);

// Custom Warning Icon Component (replacing SVG)
const WarningIcon = ({ size = 32, color = '#dc2626' }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size }]}>
    <Text style={[styles.iconText, { color, fontSize: size * 0.6 }]}>⚠️</Text>
  </View>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      // Check AsyncStorage for demo session (replacing localStorage)
      const storedUser = await AsyncStorage.getItem('nabha_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userType, userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage for demo (replacing localStorage)
      await AsyncStorage.removeItem('nabha_user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null); // Force logout even if there's an error
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <ThemeProvider initialTheme="light">
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <View style={styles.loadingContainer}>
              <View style={styles.loadingCard}>
                <View style={styles.logoSection}>
                  <View style={styles.logoContainer}>
                    <HeartIcon size={32} color="#ffffff" />
                  </View>
                  <Text style={styles.title}>Nabha Healthcare Platform </Text>
                  <Text style={styles.subtitle}>Connecting 173 villages with quality healthcare </Text>
                </View>

                <View style={styles.loadingSection}>
                  <ActivityIndicator size="large" color="#2563eb" style={styles.spinner} />
                  <View style={styles.loadingTextSection}>
                    <Text style={styles.loadingText}>Initializing secure connection...</Text>
                    <View style={styles.progressBar}>
                      <View style={styles.progressFill} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  // Show login page if user is not authenticated
  if (!user) {
    return (
      <SafeAreaProvider>
        <ThemeProvider initialTheme="light">
          <LoginPage onLogin={handleLogin} />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  // Route to appropriate dashboard based on user type
  const renderDashboard = () => {
    switch (user.userType) {
      case 'patient':
        return <PatientDashboard user={user} onLogout={handleLogout} />;
      case 'hospital':
        return <HospitalDashboard user={user} onLogout={handleLogout} />;
      case 'asha':
        return <ASHADashboard user={user} onLogout={handleLogout} />;
      case 'health_dept':
        return <HealthDeptDashboard user={user} onLogout={handleLogout} />;
      case 'pharmacy':
        return <PharmacyDashboard user={user} onLogout={handleLogout} />;
      default:
        return (
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fef2f2" />
            <View style={styles.errorContainer}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.errorCard}>
                  <View style={styles.errorHeader}>
                    <View style={styles.errorIconContainer}>
                      <WarningIcon size={32} color="#dc2626" />
                    </View>
                    <Text style={styles.errorTitle}>Access Error</Text>
                    <Text style={styles.errorMessage}>
                      Your account type "
                      <Text style={styles.errorUserType}>{user.userType}</Text>
                      " is not recognized in our system.
                    </Text>
                  </View>
                  <View style={styles.userTypesContainer}>
                    <Text style={styles.userTypesTitle}>Available User Types:</Text>
                    <View style={styles.userTypesList}>
                      <Text style={styles.userTypeItem}>• <Text style={styles.userTypeBold}>patient</Text> - Rural patients</Text>
                      <Text style={styles.userTypeItem}>• <Text style={styles.userTypeBold}>hospital</Text> - Civil Hospital staff</Text>
                      <Text style={styles.userTypeItem}>• <Text style={styles.userTypeBold}>asha</Text> - ASHA workers</Text>
                      <Text style={styles.userTypeItem}>• <Text style={styles.userTypeBold}>health_dept</Text> - Punjab Health Department</Text>
                      <Text style={styles.userTypeItem}>• <Text style={styles.userTypeBold}>pharmacy</Text> - Local pharmacies</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.logoutButtonText}>Logout and Try Again</Text>
                  </TouchableOpacity>
                  <Text style={styles.helpText}>
                    If this problem persists, please contact your system administrator
                  </Text>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <ThemeProvider initialTheme="light">
          {renderDashboard()}
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff', // Light blue background to approximate gradient
  },
  loadingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563eb', // Single color instead of gradient
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingSection: {
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 16,
  },
  loadingTextSection: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    width: 200,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fef2f2',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  errorIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorUserType: {
    fontFamily: 'monospace',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
  },
  userTypesContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  userTypesTitle: {
    fontSize: 14,
    color: '#991b1b',
    marginBottom: 8,
    fontWeight: '500',
  },
  userTypesList: {
    gap: 4,
  },
  userTypeItem: {
    fontSize: 12,
    color: '#b91c1c',
    lineHeight: 16,
  },
  userTypeBold: {
    fontWeight: 'bold',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  helpText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  iconPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
});