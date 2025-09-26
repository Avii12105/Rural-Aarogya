import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getPatientHealthRecords } from '../../data/dummyData';

export function HealthRecords({ user }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchHealthRecords(); }, []);

  const fetchHealthRecords = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use dummy data for health records
      const patientId = user?.id || 'PAT001';
      const healthRecords = getPatientHealthRecords(patientId);
      setRecords(healthRecords || []);
    } catch (error) {
      console.error('Failed to fetch health records:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewRecord = (record) => {
    Alert.alert('Health Record', `Date: ${new Date(record.createdAt).toLocaleDateString()}\nDoctor: Dr. ${record.doctorName || 'Unknown'}\n\nDiagnosis:\n${record.diagnosis}\n\nPrescription:\n${record.prescription}\n\nNotes:\n${record.notes || '-'}`);
  };

  if (loading) {
    return (
      <View style={{ gap: 12 }}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={[styles.card, { opacity: 0.6 }]}> 
            <ActivityIndicator />
            <Text style={styles.muted}>Loading...</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>📄 Digital Health Records</Text>
        <Text style={styles.muted}>Your complete medical history stored securely</Text>
      </View>

      {records.length === 0 ? (
        <View style={[styles.card, { alignItems: 'center' }]}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>📄</Text>
          <Text style={{ fontWeight: '600', color: '#6B7280' }}>No Health Records Yet</Text>
          <Text style={styles.muted}>Your health records will appear here after your first consultation.</Text>
        </View>
      ) : (
        <View style={{ gap: 12 }}>
          {records.map((record, index) => (
            <View key={record.id || index} style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600' }}>{new Date(record.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                  <Text style={styles.muted}>👨‍⚕️ Dr. {record.doctorName || 'Unknown Doctor'}</Text>
                </View>
                <TouchableOpacity onPress={() => viewRecord(record)} style={styles.outlineButton}>
                  <Text style={styles.outlineButtonText}>View</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 8, gap: 8 }}>
                <View>
                  <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 4 }}>Diagnosis</Text>
                  <Text style={styles.muted}>{record.diagnosis}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 4 }}>Prescription</Text>
                  <View style={{ backgroundColor: '#EFF6FF', padding: 8, borderRadius: 8 }}>
                    <Text style={{ color: '#1E40AF' }}>{record.prescription}</Text>
                  </View>
                </View>
                {record.notes ? (
                  <View>
                    <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 4 }}>Doctor's Notes</Text>
                    <Text style={styles.muted}>{record.notes}</Text>
                  </View>
                ) : null}
                <View style={{ paddingTop: 6, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
                  <Text style={[styles.badge, { backgroundColor: '#E5E7EB', color: '#111827', alignSelf: 'flex-start' }]}>Record ID: {record.id}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={[styles.card, { backgroundColor: '#ECFDF5', borderColor: '#86EFAC' }]}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Text style={{ fontSize: 18 }}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600', color: '#065F46' }}>Offline Access Available</Text>
            <Text style={[styles.muted, { color: '#047857' }]}>Your health records may be cached locally and accessible offline. Share details with providers when needed.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 12, padding: 12, gap: 8 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#1E40AF' },
  muted: { color: '#6B7280', fontSize: 12 },
  outlineButton: { borderWidth: 1, borderColor: '#93C5FD', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start' },
  outlineButtonText: { color: '#1E40AF', fontWeight: '600' },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden', fontSize: 12 },
});
