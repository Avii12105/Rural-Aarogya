import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

export function HealthRecordForm({ user }) {
  const [patientId, setPatientId] = useState('');
  const [formData, setFormData] = useState({ diagnosis: '', prescription: '', notes: '', followUpDate: '', severity: 'normal' });
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState(true);

  const handlePatientSearch = () => {
    if (!patientId.trim()) {
      Alert.alert('Missing', 'Please enter a patient ID');
      return;
    }
    setSearchMode(false);
  };

  const handleSubmit = async () => {
    if (!patientId || !formData.diagnosis || !formData.prescription) {
      Alert.alert('Missing', 'Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful health record creation
      const newHealthRecord = {
        id: `HR${Date.now()}`,
        patientId: patientId,
        doctorId: user?.id || 'DOC001',
        doctorName: user?.name || 'Dr. Rajesh Kumar',
        createdAt: new Date().toISOString(),
        diagnosis: formData.diagnosis,
        prescription: formData.prescription,
        notes: formData.notes,
        severity: formData.severity,
        followUpDate: formData.followUpDate,
        status: 'active'
      };
      
      console.log('New health record created:', newHealthRecord);
      Alert.alert('Success', 'Health record created successfully!');
      setPatientId('');
      setFormData({ diagnosis: '', prescription: '', notes: '', followUpDate: '', severity: 'normal' });
      setSearchMode(true);
    } catch (error) {
      console.error('Failed to create health record:', error);
      Alert.alert('Error', 'Failed to create health record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSearchMode(true);
    setPatientId('');
    setFormData({ diagnosis: '', prescription: '', notes: '', followUpDate: '', severity: 'normal' });
  };

  const SeverityPicker = () => {
    const options = [
      { key: 'mild', label: 'Mild' },
      { key: 'normal', label: 'Normal' },
      { key: 'serious', label: 'Serious' },
      { key: 'critical', label: 'Critical' },
    ];
    return (
      <View style={styles.rowWrap}>
        {options.map((o) => (
          <TouchableOpacity key={o.key} onPress={() => setFormData((p) => ({ ...p, severity: o.key }))} style={[styles.chip, formData.severity === o.key && styles.chipActive]}>
            <Text style={[styles.chipText, formData.severity === o.key && styles.chipTextActive]}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>📄 Create Health Record</Text>
        <Text style={styles.muted}>Document patient consultation and create digital health records</Text>
      </View>

      {searchMode ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Find Patient</Text>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Patient ID</Text>
              <TextInput value={patientId} onChangeText={setPatientId} placeholder="Enter patient ID" style={styles.input} />
            </View>
            <TouchableOpacity onPress={handlePatientSearch} style={[styles.primaryButton, { backgroundColor: '#DC2626' }]}>
              <Text style={styles.primaryButtonText}>Find Patient</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.cardTitle}>Health Record for Patient: {patientId}</Text>
              <Text style={styles.muted}>Complete the consultation record</Text>
            </View>
            <TouchableOpacity style={styles.outlineButton} onPress={resetForm}>
              <Text style={styles.outlineButtonText}>Change Patient</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12 }}>
            <View>
              <Text style={styles.label}>Diagnosis *</Text>
              <TextInput
                value={formData.diagnosis}
                onChangeText={(t) => setFormData((p) => ({ ...p, diagnosis: t }))}
                placeholder="Enter the primary diagnosis and any secondary conditions..."
                style={[styles.input, styles.multiline]}
                multiline
              />
            </View>

            <View>
              <Text style={styles.label}>Prescription *</Text>
              <TextInput
                value={formData.prescription}
                onChangeText={(t) => setFormData((p) => ({ ...p, prescription: t }))}
                placeholder="List medications, dosages, and instructions..."
                style={[styles.input, styles.multiline, { minHeight: 120 }]}
                multiline
              />
            </View>

            <View>
              <Text style={styles.label}>Additional Notes</Text>
              <TextInput
                value={formData.notes}
                onChangeText={(t) => setFormData((p) => ({ ...p, notes: t }))}
                placeholder="Any additional observations, recommendations, or instructions..."
                style={[styles.input, styles.multiline]}
                multiline
              />
            </View>

            <View style={styles.grid2}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Condition Severity</Text>
                <SeverityPicker />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Follow-up Date (YYYY-MM-DD)</Text>
                <TextInput
                  value={formData.followUpDate}
                  onChangeText={(t) => setFormData((p) => ({ ...p, followUpDate: t }))}
                  placeholder="YYYY-MM-DD"
                  style={styles.input}
                />
              </View>
            </View>

            <TouchableOpacity onPress={handleSubmit} disabled={loading} style={[styles.primaryButton, { backgroundColor: '#DC2626', alignItems: 'center' }]}>
              {loading ? (<ActivityIndicator color="#fff" />) : (<Text style={styles.primaryButtonText}>Save Health Record</Text>)}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!searchMode && (
        <View style={[styles.card, { backgroundColor: '#FFF1F2', borderColor: '#FECACA' }]}>
          <Text style={[styles.cardTitle, { color: '#991B1B' }]}>Quick Templates</Text>
          <View style={styles.grid2}>
            <TouchableOpacity style={styles.templateBtn} onPress={() => setFormData((p) => ({ ...p, diagnosis: 'Viral Fever', prescription: 'Paracetamol 500mg - 1 tablet every 6 hours for 3 days\nRest and increased fluid intake\nIsolation for 3-5 days' }))}>
              <Text style={{ fontWeight: '700' }}>Viral Fever</Text>
              <Text style={styles.muted}>Common cold/flu symptoms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.templateBtn} onPress={() => setFormData((p) => ({ ...p, diagnosis: 'Gastroenteritis', prescription: 'ORS - 1 packet in 1 liter water, sip frequently\nZinc tablets - 1 daily for 10 days\nLight diet (rice, curd, banana)\nAvoid dairy and spicy foods' }))}>
              <Text style={{ fontWeight: '700' }}>Gastroenteritis</Text>
              <Text style={styles.muted}>Stomach infection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.templateBtn} onPress={() => setFormData((p) => ({ ...p, diagnosis: 'Upper Respiratory Tract Infection', prescription: 'Azithromycin 500mg - 1 tablet daily for 3 days\nCough syrup - 2 tsp three times daily\nSteam inhalation twice daily\nWarm salt water gargling' }))}>
              <Text style={{ fontWeight: '700' }}>Upper Respiratory Infection</Text>
              <Text style={styles.muted}>Throat and chest congestion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.templateBtn} onPress={() => setFormData((p) => ({ ...p, diagnosis: 'Hypertension - Routine Check', prescription: 'Continue current medication\nReduce salt intake\nRegular exercise - 30 minutes daily\nMonitor BP weekly' }))}>
              <Text style={{ fontWeight: '700' }}>Hypertension Follow-up</Text>
              <Text style={styles.muted}>Blood pressure management</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Record Guidelines</Text>
        <View style={{ gap: 4 }}>
          <Text style={styles.muted}>• Include specific medication names, dosages, and duration</Text>
          <Text style={styles.muted}>• Document any allergies or contraindications</Text>
          <Text style={styles.muted}>• Provide clear follow-up instructions</Text>
          <Text style={styles.muted}>• Note any referrals to specialists if needed</Text>
          <Text style={styles.muted}>• Include lifestyle recommendations (diet, exercise, rest)</Text>
          <Text style={styles.muted}>• Records are automatically shared with patients</Text>
          <Text style={styles.muted}>• All records are encrypted</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FECACA', borderRadius: 12, padding: 12, gap: 12 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#991B1B' },
  muted: { color: '#6B7280', fontSize: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  label: { fontSize: 12, color: '#374151', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  primaryButton: { borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  outlineButton: { borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  outlineButtonText: { color: '#991B1B', fontWeight: '600' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#FFE4E6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#DC2626' },
  chipText: { color: '#991B1B', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  templateBtn: { borderWidth: 1, borderColor: '#FECACA', borderRadius: 10, padding: 12, flexBasis: '48%' },
});