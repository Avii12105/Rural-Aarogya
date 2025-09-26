import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getAvailableDoctors, getDoctorAvailability } from '../../data/dummyData';

export function AppointmentBooking({ user, onSuccess }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availability, setAvailability] = useState([]);
  const [formData, setFormData] = useState({ date: '', time: '', symptoms: '', urgency: 'normal' });
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => { fetchDoctors(); }, []);
  useEffect(() => { if (selectedDoctor) fetchDoctorAvailability(selectedDoctor); }, [selectedDoctor]);

  const fetchDoctors = async () => {
    try {
      // Use dummy data instead of API call
      const doctorsData = getAvailableDoctors();
      setDoctors(doctorsData || []);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      Alert.alert('Error', 'Failed to load doctors');
    } finally {
      setLoadingDoctors(false);
    }
  };

  const fetchDoctorAvailability = async (doctorId) => {
    try {
      // Use dummy data for doctor availability
      const doctorAvailability = getDoctorAvailability(doctorId);
      setAvailability(doctorAvailability);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDoctor || !formData.date || !formData.time || !formData.symptoms.trim()) {
      Alert.alert('Missing fields', 'Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful appointment booking
      const newAppointment = {
        id: `APT${Date.now()}`,
        patientId: user?.id || 'PAT001',
        doctorId: selectedDoctor,
        date: formData.date,
        time: formData.time,
        symptoms: formData.symptoms,
        urgency: formData.urgency,
        status: 'scheduled',
        bookedAt: new Date().toISOString()
      };
      
      console.log('New appointment booked:', newAppointment);
      Alert.alert('Success', 'Appointment booked successfully!');
      setFormData({ date: '', time: '', symptoms: '', urgency: 'normal' });
      setSelectedDoctor('');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Booking failed:', error);
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = (date) => {
    const dayAvailability = availability.find((avail) => avail.date === date);
    return dayAvailability?.available ? dayAvailability.timeSlots || [] : [];
  };

  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      dates.push({ value: dateString, label: date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) });
    }
    return dates;
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>📅 Book New Appointment</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Select Doctor</Text>
        {loadingDoctors ? (
          <ActivityIndicator color="#2563EB" />
        ) : (
          <View style={styles.rowWrap}>
            {doctors.map((doctor) => (
              <TouchableOpacity key={doctor.id} onPress={() => setSelectedDoctor(doctor.id)} style={[styles.chip, selectedDoctor === doctor.id && styles.chipActive]}>
                <Text style={[styles.chipText, selectedDoctor === doctor.id && styles.chipTextActive]}>Dr. {doctor.name}</Text>
              </TouchableOpacity>
            ))}
            {doctors.length === 0 && <Text style={styles.muted}>No doctors available</Text>}
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Select Date</Text>
        <View style={styles.rowWrap}>
          {getAvailableDates().map((d) => (
            <TouchableOpacity key={d.value} onPress={() => setFormData((p) => ({ ...p, date: d.value, time: '' }))} style={[styles.chip, formData.date === d.value && styles.chipActive]}>
              <Text style={[styles.chipText, formData.date === d.value && styles.chipTextActive]}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {!!formData.date && (
        <View style={styles.card}>
          <Text style={styles.label}>Available Time Slots</Text>
          <View style={styles.rowWrap}>
            {getAvailableSlots(formData.date).map((slot) => (
              <TouchableOpacity key={slot} onPress={() => setFormData((p) => ({ ...p, time: slot }))} style={[styles.slotPill, formData.time === slot && styles.slotPillActive]}>
                <Text style={[styles.slotText, formData.time === slot && styles.slotTextActive]}>⏰ {slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {getAvailableSlots(formData.date).length === 0 && <Text style={styles.muted}>No slots available for this date</Text>}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Describe your symptoms</Text>
        <TextInput
          value={formData.symptoms}
          onChangeText={(t) => setFormData((p) => ({ ...p, symptoms: t }))}
          placeholder="Please describe your health concerns in detail..."
          style={[styles.input, styles.multiline]}
          multiline
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Urgency Level</Text>
        <View style={styles.rowWrap}>
          {['low', 'normal', 'high'].map((u) => (
            <TouchableOpacity key={u} onPress={() => setFormData((p) => ({ ...p, urgency: u }))} style={[styles.chip, formData.urgency === u && styles.chipActive]}>
              <Text style={[styles.chipText, formData.urgency === u && styles.chipTextActive]}>
                {u === 'low' ? 'Low - Routine' : u === 'normal' ? 'Normal' : 'High - Urgent'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={handleSubmit} disabled={loading || !selectedDoctor || !formData.date || !formData.time} style={[styles.primaryButton, { backgroundColor: loading || !selectedDoctor || !formData.date || !formData.time ? '#93C5FD' : '#2563EB' }]}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Book Appointment</Text>}
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
        <Text style={[styles.cardTitle, { color: '#1E40AF' }]}>Important Instructions</Text>
        <View style={{ gap: 4 }}>
          <Text style={styles.muted}>• Be available 5 minutes before your appointment time</Text>
          <Text style={styles.muted}>• Ensure a stable internet connection for video consultation</Text>
          <Text style={styles.muted}>• Keep your previous medical records handy</Text>
          <Text style={styles.muted}>• You'll receive a video call link via SMS</Text>
          <Text style={styles.muted}>• For emergencies, visit the hospital directly</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 12, padding: 12, gap: 12 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#1E40AF' },
  label: { fontSize: 12, color: '#374151' },
  muted: { color: '#6B7280', fontSize: 12 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#EFF6FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#2563EB' },
  chipText: { color: '#1E40AF', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  slotPill: { borderWidth: 1, borderColor: '#93C5FD', backgroundColor: '#EFF6FF', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  slotPillActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  slotText: { color: '#1E40AF', fontWeight: '600' },
  slotTextActive: { color: '#FFFFFF', fontWeight: '700' },
  primaryButton: { borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
});
