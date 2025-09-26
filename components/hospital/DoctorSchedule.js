import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert, ActivityIndicator } from 'react-native';

export function DoctorSchedule({ user }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlots, setTimeSlots] = useState(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']);
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  const getNext30Days = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    }
    return days;
  };

  const addTimeSlot = () => {
    if (newTimeSlot && /^\d{2}:\d{2}$/.test(newTimeSlot) && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot].sort());
      setNewTimeSlot('');
    } else if (!/^\d{2}:\d{2}$/.test(newTimeSlot)) {
      Alert.alert('Invalid time', 'Please enter time as HH:MM');
    }
  };

  const removeTimeSlot = (slot) => {
    setTimeSlots(timeSlots.filter((s) => s !== slot));
  };

  const saveSchedule = async () => {
    if (!selectedDate) {
      Alert.alert('Missing date', 'Please select a date');
      return;
    }
    setLoading(true);
    try {
      const { projectId } = await import('../../utils/supabase/info');
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2ba4e71/doctor/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken || ''}`,
        },
        body: JSON.stringify({ date: selectedDate, timeSlots, available: isAvailable }),
      });
      const result = await response.json();
      if (result.success) {
        Alert.alert('Success', 'Schedule updated successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to save schedule:', error);
      Alert.alert('Error', 'Failed to save schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>📅 Manage Your Availability Schedule</Text>
        <Text style={styles.muted}>Set your available times for telemedicine consultations</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Select Date</Text>
        <View style={styles.rowWrap}>
          {getNext30Days().map((day) => (
            <TouchableOpacity key={day.value} onPress={() => setSelectedDate(day.value)} style={[styles.chip, selectedDate === day.value && styles.chipActive]}>
              <Text style={[styles.chipText, selectedDate === day.value && styles.chipTextActive]}>{day.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Switch value={isAvailable} onValueChange={setIsAvailable} />
          <Text>Available for consultations on this date</Text>
        </View>

        {isAvailable && (
          <View style={{ gap: 12 }}>
            <Text style={styles.label}>Available Time Slots</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TextInput
                placeholder="HH:MM"
                value={newTimeSlot}
                onChangeText={setNewTimeSlot}
                keyboardType="numbers-and-punctuation"
                style={[styles.input, { width: 100 }]}
              />
              <TouchableOpacity onPress={addTimeSlot} style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>＋ Add Slot</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrap}>
              {timeSlots.map((slot) => (
                <View key={slot} style={[styles.slotPill] }>
                  <Text style={{ fontWeight: '600', color: '#991B1B' }}>⏰ {slot}</Text>
                  <TouchableOpacity onPress={() => removeTimeSlot(slot)}>
                    <Text style={{ color: '#991B1B', marginLeft: 6 }}>✖</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {timeSlots.length === 0 && (
              <Text style={styles.muted}>No time slots added yet. Add some time slots above.</Text>
            )}
          </View>
        )}

        <TouchableOpacity onPress={saveSchedule} disabled={loading || !selectedDate} style={[styles.primaryButton, { backgroundColor: loading || !selectedDate ? '#FCA5A5' : '#DC2626' }]}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Save Schedule</Text>}
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: '#FFF1F2', borderColor: '#FECACA' }]}>
        <Text style={[styles.cardTitle, { color: '#991B1B' }]}>Quick Schedule Templates</Text>
        <View style={styles.grid3}>
          <TouchableOpacity style={styles.outlineButtonBig} onPress={() => setTimeSlots(['09:00', '10:00', '11:00', '12:00'])}>
            <Text style={[styles.badge, { backgroundColor: '#E5E7EB', color: '#111827' }]}>Morning Shift</Text>
            <Text style={styles.muted}>9 AM - 12 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButtonBig} onPress={() => setTimeSlots(['14:00', '15:00', '16:00', '17:00'])}>
            <Text style={[styles.badge, { backgroundColor: '#E5E7EB', color: '#111827' }]}>Afternoon Shift</Text>
            <Text style={styles.muted}>2 PM - 5 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButtonBig} onPress={() => setTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'])}>
            <Text style={[styles.badge, { backgroundColor: '#E5E7EB', color: '#111827' }]}>Full Day</Text>
            <Text style={styles.muted}>9-12 & 2-5</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Schedule Guidelines</Text>
        <View style={{ gap: 4 }}>
          <Text style={styles.muted}>• Each consultation slot is typically 15-20 minutes</Text>
          <Text style={styles.muted}>• Schedule updates are immediately visible to patients</Text>
          <Text style={styles.muted}>• Modify schedule up to 24 hours in advance</Text>
          <Text style={styles.muted}>• Emergency slots can be added for urgent cases</Text>
          <Text style={styles.muted}>• Include breaks between slots for documentation</Text>
          <Text style={styles.muted}>• Weekend availability helps serve more rural patients</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FECACA', borderRadius: 12, padding: 12, gap: 12 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#991B1B' },
  muted: { color: '#6B7280', fontSize: 12 },
  label: { fontSize: 12, color: '#374151', marginBottom: 4 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#FFE4E6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#DC2626' },
  chipText: { color: '#991B1B', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  outlineButton: { borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  outlineButtonText: { color: '#991B1B', fontWeight: '600' },
  slotPill: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#FCA5A5', backgroundColor: '#FFF1F2', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  primaryButton: { borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  badge: { borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8, overflow: 'hidden' },
  outlineButtonBig: { borderWidth: 1, borderColor: '#FECACA', borderRadius: 10, padding: 12, alignItems: 'center', gap: 4, flexBasis: '31%' },
  grid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});
