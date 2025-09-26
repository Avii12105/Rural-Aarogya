import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginPage({ onLogin }) {
  const [selectedPortal, setSelectedPortal] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', userType: '' });
  const [loading, setLoading] = useState(false);

  const portalConfigs = {
    patient: { title: 'Rural Patients Portal', icon: '🧑‍⚕️', cardColor: '#EFF6FF', borderColor: '#BFDBFE', btnColor: '#2563EB', desc: 'Access healthcare from your village' },
    hospital: { title: 'Civil Hospital Staff', icon: '🏥', cardColor: '#FEF2F2', borderColor: '#FECACA', btnColor: '#DC2626', desc: 'Medical staff dashboard' },
    asha: { title: 'ASHA Workers', icon: '❤️', cardColor: '#FFF7ED', borderColor: '#FED7AA', btnColor: '#EA580C', desc: 'Community health workers' },
    health_dept: { title: 'Punjab Health Department', icon: '🩺', cardColor: '#ECFDF5', borderColor: '#BBF7D0', btnColor: '#16A34A', desc: 'Government health oversight' },
    pharmacy: { title: 'Local Pharmacies', icon: '💊', cardColor: '#F5F3FF', borderColor: '#DDD6FE', btnColor: '#7C3AED', desc: 'Medicine inventory management' },
  };

  const handleSubmit = async () => {
    if (!selectedPortal) return;
    setLoading(true);
    try {
      const userData = {
        id: `demo-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
        email: formData.email,
        name: formData.name || 'Demo User',
        userType: selectedPortal,
        accessToken: 'demo-token-' + Date.now(),
      };

      try {
        await AsyncStorage.setItem('nabha_user', JSON.stringify(userData));
      } catch (_) {
        // AsyncStorage might not be available; proceed without persistence
      }

      if (onLogin) onLogin(selectedPortal, userData);
    } catch (error) {
      const msg = error && error.message ? error.message : 'Unknown error';
      Alert.alert('Authentication failed', msg);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPortal) {
    return (
      <ScrollView contentContainerStyle={styles.portalContainer}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Text style={styles.brandHi}>नभा स्वास्थ्य सेवा</Text>
          <Text style={styles.brandEn}>Nabha Healthcare Platform </Text>
          <Text style={styles.brandSub}>Connecting rural communities with quality healthcare </Text>
        </View>

        <View style={styles.demoBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={styles.pulseDot} />
            <Text style={[styles.demoTitle]}>🚀 Demo Mode Active - Nabha Healthcare Platform</Text>
          </View>
          <Text style={styles.demoText}>
            Testing the comprehensive telemedicine solution for Nabha's 173 rural villages. Enter any email and password to access different portals.
          </Text>
        </View>

        <View style={styles.grid}>
          {Object.entries(portalConfigs).map(([key, config]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedPortal(key)}
              activeOpacity={0.8}
              style={[styles.portalCard, { backgroundColor: config.cardColor, borderColor: config.borderColor }]}
            >
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.portalIcon}>{config.icon}</Text>
                <Text style={styles.portalTitle}>{config.title}</Text>
                <Text style={styles.portalDesc}>{config.desc}</Text>
              </View>
              <View>
                <View style={[styles.primaryButton, { backgroundColor: config.btnColor }]}>
                  <Text style={styles.primaryButtonText}>Enter Portal</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.allPortalsNote}>
          <Text style={styles.allPortalsNoteText}>All portals: Any email/password works</Text>
        </View>
      </ScrollView>
    );
  }

  const config = portalConfigs[selectedPortal];

  return (
    <View style={[styles.authScreen, { backgroundColor: config.cardColor }]}>      
      <View style={styles.authCard}>
        <TouchableOpacity onPress={() => setSelectedPortal('')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <Text style={styles.portalIconLarge}>{config.icon}</Text>
          <Text style={styles.cardTitle}>{config.title}</Text>
          <Text style={styles.portalDesc}>{config.desc}</Text>
        </View>

        <View style={{ gap: 12 }}>
          {!isLogin && (
            <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={formData.name}
                onChangeText={(t) => setFormData((p) => ({ ...p, name: t }))}
                placeholder="Your full name"
                style={styles.input}
              />
            </View>
          )}

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={formData.email}
              onChangeText={(t) => setFormData((p) => ({ ...p, email: t }))}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={formData.password}
              onChangeText={(t) => setFormData((p) => ({ ...p, password: t }))}
              placeholder="••••••••"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={[styles.primaryButton, { backgroundColor: config.btnColor, alignItems: 'center' }]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>{isLogin ? 'Login' : 'Register'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin((v) => !v)} style={styles.ghostButton}>
            <Text style={styles.ghostButtonText}>
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.demoNoteBox}>
            <Text style={styles.demoNoteText}>🚀 Demo Mode: Any email/password works</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  portalContainer: { padding: 16, gap: 16 },
  brandHi: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  brandEn: { fontSize: 22, color: '#4B5563', marginBottom: 4 },
  brandSub: { fontSize: 12, color: '#6B7280' },
  demoBanner: { backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 12, padding: 12 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34D399', marginRight: 8 },
  demoTitle: { fontWeight: '600', color: '#1E3A8A' },
  demoText: { fontSize: 12, color: '#1D4ED8' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  portalCard: { flexBasis: '48%', borderWidth: 1, borderRadius: 12, padding: 12, justifyContent: 'space-between', gap: 10 },
  portalIcon: { fontSize: 28, marginBottom: 8 },
  portalIconLarge: { fontSize: 40, marginBottom: 8 },
  portalTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  portalDesc: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
  primaryButton: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', textAlign: 'center' },
  allPortalsNote: { borderWidth: 1, borderColor: '#BFDBFE', backgroundColor: '#F0F9FF', padding: 10, borderRadius: 8 },
  allPortalsNoteText: { fontSize: 12, color: '#2563EB', textAlign: 'center' },

  authScreen: { flex: 1, justifyContent: 'center', padding: 16 },
  authCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16 },
  backBtn: { position: 'absolute', top: 12, left: 12, padding: 8 },
  backBtnText: { color: '#6B7280' },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  label: { fontSize: 12, color: '#374151', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#FFFFFF' },
  ghostButton: { paddingVertical: 10, alignItems: 'center' },
  ghostButtonText: { color: '#374151' },
  demoNoteBox: { backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#FDE68A', borderRadius: 8, padding: 8 },
  demoNoteText: { fontSize: 12, color: '#B45309', textAlign: 'center' },
});
