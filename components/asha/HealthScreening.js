import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';

export function HealthScreening({ user }) {
  const [activeView, setActiveView] = useState('list');
  const [screeningData, setScreeningData] = useState({
    patientName: '',
    age: '',
    gender: '',
    village: '',
    bloodPressure: '',
    pulse: '',
    temperature: '',
    weight: '',
    height: '',
    symptoms: '',
    riskFactors: '',
    recommendations: '',
    referralNeeded: false,
  });

  const [screenings] = useState([
    { id: 1, patientName: 'Rajesh Kumar', age: 45, village: 'Khera', date: '2024-12-19', riskLevel: 'high', findings: 'Elevated BP (160/95), complaints of headache', status: 'referred' },
    { id: 2, patientName: 'Sunita Devi', age: 28, village: 'Sangatpura', date: '2024-12-18', riskLevel: 'low', findings: 'Normal vitals, pregnant (6 months)', status: 'routine' },
    { id: 3, patientName: 'Mohan Singh', age: 62, village: 'Bhamola', date: '2024-12-17', riskLevel: 'medium', findings: 'Diabetes symptoms, frequent urination', status: 'follow-up' },
  ]);

  const handleSubmitScreening = () => {
    Alert.alert('Success', 'Health screening recorded successfully!');
    setScreeningData({
      patientName: '', age: '', gender: '', village: '', bloodPressure: '', pulse: '', temperature: '', weight: '', height: '', symptoms: '', riskFactors: '', recommendations: '', referralNeeded: false,
    });
    setActiveView('list');
  };

  const riskBadge = (risk) => {
    const map = { low: '#DCFCE7', medium: '#FEF3C7', high: '#FEE2E2' };
    return [styles.badge, { backgroundColor: map[risk] || '#F3F4F6' }];
  };

  const statusBadge = (status) => {
    const map = { routine: '#DBEAFE', 'follow-up': '#FEF3C7', referred: '#FEE2E2' };
    return [styles.badge, { backgroundColor: map[status] || '#F3F4F6' }];
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 24 }}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>❤️ Health Screening & Assessment</Text>
            <Text style={styles.muted}>Conduct basic health checks and identify health risks in the community</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setActiveView('new')}>
            <Text style={styles.primaryButtonText}>＋ New Screening</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeView === 'new' ? (
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.cardTitle}>New Health Screening</Text>
            <TouchableOpacity style={styles.outlineButton} onPress={() => setActiveView('list')}>
              <Text style={styles.outlineButtonText}>Back to List</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 16 }}>
            <View>
              <Text style={styles.sectionTitle}>Patient Information</Text>
              <View style={styles.grid3}> 
                <View style={styles.field}> 
                  <Text style={styles.label}>Patient Name *</Text>
                  <TextInput style={styles.input} value={screeningData.patientName} onChangeText={(t) => setScreeningData((p) => ({ ...p, patientName: t }))} />
                </View>
                <View style={styles.field}> 
                  <Text style={styles.label}>Age *</Text>
                  <TextInput style={styles.input} keyboardType="number-pad" value={String(screeningData.age)} onChangeText={(t) => setScreeningData((p) => ({ ...p, age: t }))} />
                </View>
                <View style={styles.field}> 
                  <Text style={styles.label}>Gender *</Text>
                  <TextInput style={styles.input} value={screeningData.gender} onChangeText={(t) => setScreeningData((p) => ({ ...p, gender: t }))} placeholder="male / female / other" />
                </View>
                <View style={styles.field}> 
                  <Text style={styles.label}>Village *</Text>
                  <TextInput style={styles.input} value={screeningData.village} onChangeText={(t) => setScreeningData((p) => ({ ...p, village: t }))} />
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.sectionTitle}>Vital Signs</Text>
              <View style={styles.grid4}>
                <View style={styles.field}> 
                  <Text style={styles.label}>Blood Pressure</Text>
                  <TextInput style={styles.input} placeholder="e.g., 120/80" value={screeningData.bloodPressure} onChangeText={(t) => setScreeningData((p) => ({ ...p, bloodPressure: t }))} />
                </View>
                <View style={styles.field}> 
                  <Text style={styles.label}>Pulse Rate</Text>
                  <TextInput style={styles.input} placeholder="beats/min" value={screeningData.pulse} onChangeText={(t) => setScreeningData((p) => ({ ...p, pulse: t }))} />
                </View>
                <View style={styles.field}> 
                  <Text style={styles.label}>Temperature</Text>
                  <TextInput style={styles.input} placeholder="°F" value={screeningData.temperature} onChangeText={(t) => setScreeningData((p) => ({ ...p, temperature: t }))} />
                </View>
                <View style={styles.field}> 
                  <Text style={styles.label}>Weight (kg)</Text>
                  <TextInput style={styles.input} keyboardType="numeric" value={screeningData.weight} onChangeText={(t) => setScreeningData((p) => ({ ...p, weight: t }))} />
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.sectionTitle}>Health Assessment</Text>
              <View style={{ gap: 12 }}>
                <View>
                  <Text style={styles.label}>Current Symptoms/Complaints</Text>
                  <TextInput style={[styles.input, styles.multiline]} multiline value={screeningData.symptoms} onChangeText={(t) => setScreeningData((p) => ({ ...p, symptoms: t }))} placeholder="Describe any symptoms or health complaints..." />
                </View>
                <View>
                  <Text style={styles.label}>Risk Factors Identified</Text>
                  <TextInput style={[styles.input, styles.multiline]} multiline value={screeningData.riskFactors} onChangeText={(t) => setScreeningData((p) => ({ ...p, riskFactors: t }))} placeholder="Family history, lifestyle factors, environmental risks..." />
                </View>
                <View>
                  <Text style={styles.label}>Recommendations</Text>
                  <TextInput style={[styles.input, styles.multiline]} multiline value={screeningData.recommendations} onChangeText={(t) => setScreeningData((p) => ({ ...p, recommendations: t }))} placeholder="Health advice, lifestyle changes, follow-up care..." />
                </View>
              </View>
            </View>

            <View style={styles.referralBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Switch value={screeningData.referralNeeded} onValueChange={(v) => setScreeningData((p) => ({ ...p, referralNeeded: v }))} />
                <Text style={{ fontWeight: '600' }}>Referral to Civil Hospital Required</Text>
              </View>
              {screeningData.referralNeeded ? (
                <Text style={{ fontSize: 12, color: '#92400E', marginTop: 4 }}>
                  Patient will be referred to Nabha Civil Hospital for further evaluation and treatment.
                </Text>
              ) : null}
            </View>

            <TouchableOpacity style={[styles.primaryButton, { alignSelf: 'stretch' }]} onPress={handleSubmitScreening}>
              <Text style={styles.primaryButtonText}>Complete Screening</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={{ gap: 12 }}>
            {screenings.map((screening) => (
              <View key={screening.id} style={styles.card}>
                <View style={{ gap: 6 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 16 }}>👤</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{screening.patientName}</Text>
                    <View style={riskBadge(screening.riskLevel)}>
                      <Text style={styles.badgeText}>{screening.riskLevel} risk</Text>
                    </View>
                    <View style={statusBadge(screening.status)}>
                      <Text style={styles.badgeText}>{screening.status}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                    <Text style={styles.muted}>Age: {screening.age} years</Text>
                    <Text style={styles.muted}>Village: {screening.village}</Text>
                    <Text style={styles.muted}>Date: {new Date(screening.date).toLocaleDateString('en-IN')}</Text>
                  </View>
                  <Text style={styles.muted}>{screening.findings}</Text>

                  <View style={{ alignItems: 'flex-start' }}>
                    {screening.riskLevel === 'high' ? (
                      <Text style={{ fontSize: 18 }}>⚠️</Text>
                    ) : screening.riskLevel === 'low' ? (
                      <Text style={{ fontSize: 18 }}>✅</Text>
                    ) : null}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }]}>
            <Text style={[styles.cardTitle, { color: '#9A3412' }]}>Quick Reference - Normal Ranges</Text>
            <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
              <View style={{ flexBasis: '48%' }}>
                <Text style={{ fontWeight: '600', marginBottom: 6 }}>Vital Signs (Adults)</Text>
                <Text style={[styles.muted, { marginBottom: 2 }]}>• Blood Pressure: 90/60 - 140/90 mmHg</Text>
                <Text style={[styles.muted, { marginBottom: 2 }]}>• Pulse Rate: 60-100 beats/min</Text>
                <Text style={[styles.muted, { marginBottom: 2 }]}>• Temperature: 97-99°F (36-37°C)</Text>
                <Text style={[styles.muted, { marginBottom: 2 }]}>• BMI: 18.5{'-'}24.9 kg/m²</Text>
              </View>
              <View style={{ flexBasis: '48%' }}>
                <Text style={{ fontWeight: '600', marginBottom: 6 }}>Warning Signs (Refer Immediately)</Text>
                <Text style={[styles.muted, { color: '#B91C1C' }]}>• BP {'>'} 140/90 or {'<'} 90/60</Text>
                <Text style={[styles.muted, { color: '#B91C1C' }]}>• Fever {'>'} 101°F (38.3°C)</Text>
                <Text style={[styles.muted, { color: '#B91C1C' }]}>• Chest pain or difficulty breathing</Text>
                <Text style={[styles.muted, { color: '#B91C1C' }]}>• Severe abdominal pain</Text>
                <Text style={[styles.muted, { color: '#B91C1C' }]}>• Signs of dehydration</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={[styles.cardTitle, { color: '#9A3412' }]}>Screening Summary</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#15803D' }]}>{screenings.filter(s => s.riskLevel === 'low').length}</Text>
                <Text style={styles.muted}>Low Risk</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#CA8A04' }]}>{screenings.filter(s => s.riskLevel === 'medium').length}</Text>
                <Text style={styles.muted}>Medium Risk</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#B91C1C' }]}>{screenings.filter(s => s.riskLevel === 'high').length}</Text>
                <Text style={styles.muted}>High Risk</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#7E22CE' }]}>{screenings.filter(s => s.status === 'referred').length}</Text>
                <Text style={styles.muted}>Referred</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FFE4CC', borderRadius: 12, padding: 12, gap: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: '600', color: '#9A3412' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  muted: { color: '#6B7280', fontSize: 12 },
  primaryButton: { backgroundColor: '#EA580C', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  primaryButtonText: { color: 'white', fontWeight: '600' },
  outlineButton: { borderWidth: 1, borderColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  outlineButtonText: { color: '#9A3412', fontWeight: '600' },
  sectionTitle: { fontWeight: '600', marginBottom: 6 },
  grid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  field: { flexBasis: '48%' },
  label: { fontSize: 12, color: '#374151', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  badge: { borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  referralBox: { backgroundColor: '#FEF3C7', padding: 12, borderRadius: 10 },
  statNumber: { fontSize: 22, fontWeight: '700' },
});
