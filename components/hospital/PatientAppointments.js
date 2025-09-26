import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getDoctorAppointments } from '../../data/dummyData';

export function PatientAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const fetchAppointments = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use dummy data for doctor appointments
      const doctorId = user?.id || 'DOC001';
      const doctorAppointments = getDoctorAppointments(doctorId);
      setAppointments(doctorAppointments || []);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;
    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          String(apt.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(apt.symptoms || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((apt) => apt.status === statusFilter);
    }
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    if (dateFilter === 'today') {
      filtered = filtered.filter((apt) => apt.date === today);
    } else if (dateFilter === 'tomorrow') {
      filtered = filtered.filter((apt) => apt.date === tomorrowStr);
    } else if (dateFilter === 'upcoming') {
      filtered = filtered.filter((apt) => apt.date >= today);
    }
    setFilteredAppointments(filtered);
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    // In a real app, this would make an API call to update status
    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)));
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

  const statusOptions = [
    { key: 'all', label: 'All Status' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const dateOptions = [
    { key: 'all', label: 'All Dates' },
    { key: 'today', label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'upcoming', label: 'Upcoming' },
  ];

  const statusBadgeStyle = (status) => {
    switch (status) {
      case 'scheduled':
        return [styles.badge, { backgroundColor: '#DBEAFE', color: '#1E3A8A' }];
      case 'in-progress':
        return [styles.badge, { backgroundColor: '#FEF3C7', color: '#92400E' }];
      case 'completed':
        return [styles.badge, { backgroundColor: '#DCFCE7', color: '#065F46' }];
      case 'cancelled':
        return [styles.badge, { backgroundColor: '#FEE2E2', color: '#991B1B' }];
      default:
        return [styles.badge, { backgroundColor: '#E5E7EB', color: '#111827' }];
    }
  };

  const urgencyBadgeStyle = (urgency) => {
    switch (urgency) {
      case 'high':
        return [styles.badge, { backgroundColor: '#FEE2E2', color: '#991B1B' }];
      case 'normal':
        return [styles.badge, { backgroundColor: '#DBEAFE', color: '#1E3A8A' }];
      case 'low':
        return [styles.badge, { backgroundColor: '#DCFCE7', color: '#065F46' }];
      default:
        return [styles.badge, { backgroundColor: '#E5E7EB', color: '#111827' }];
    }
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>👥 Patient Appointments</Text>
        <Text style={styles.muted}>Manage your scheduled consultations with patients</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.grid4}>
          <TextInput
            placeholder="Search patient ID or symptoms..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={[styles.input, { flex: 1 }]}
          />

          <View style={styles.rowWrap}>
            {statusOptions.map((o) => (
              <TouchableOpacity key={o.key} onPress={() => setStatusFilter(o.key)} style={[styles.chip, statusFilter === o.key && styles.chipActive]}>
                <Text style={[styles.chipText, statusFilter === o.key && styles.chipTextActive]}>{o.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.rowWrap}>
            {dateOptions.map((o) => (
              <TouchableOpacity key={o.key} onPress={() => setDateFilter(o.key)} style={[styles.chip, dateFilter === o.key && styles.chipActive]}>
                <Text style={[styles.chipText, dateFilter === o.key && styles.chipTextActive]}>{o.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setDateFilter('all');
            }}
            style={styles.outlineButton}
          >
            <Text style={styles.outlineButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      {filteredAppointments.length === 0 ? (
        <View style={[styles.card, { alignItems: 'center' }]}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>👥</Text>
          <Text style={{ fontWeight: '600', color: '#6B7280' }}>No appointments found</Text>
          <Text style={styles.muted}>
            {appointments.length === 0 ? "You don't have any appointments yet." : 'No appointments match your current filters.'}
          </Text>
        </View>
      ) : (
        <View style={{ gap: 12 }}>
          {filteredAppointments.map((appointment, index) => (
            <View key={appointment.id || index} style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Patient ID: {appointment.patientId}</Text>
                    <Text style={statusBadgeStyle(appointment.status)}>{appointment.status}</Text>
                    <Text style={urgencyBadgeStyle(appointment.urgency)}>{appointment.urgency} priority</Text>
                  </View>

                  <View style={styles.grid2}>
                    <Text style={styles.muted}>📅 {new Date(appointment.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    <Text style={styles.muted}>⏰ {appointment.time}</Text>
                  </View>

                  <View style={{ marginTop: 4, marginBottom: 6 }}>
                    <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 2 }}>Patient Symptoms:</Text>
                    <Text style={styles.muted}>{appointment.symptoms}</Text>
                  </View>

                  <Text style={{ fontSize: 10, color: '#9CA3AF' }}>
                    Appointment ID: {appointment.id} | Booked: {new Date(appointment.createdAt).toLocaleString()}
                  </Text>
                </View>

                <View style={{ gap: 8, marginLeft: 8, alignItems: 'flex-end' }}>
                  {appointment.status === 'scheduled' && (
                    <>
                      <TouchableOpacity
                        style={[styles.primaryButton, { backgroundColor: '#16A34A', width: 160, alignItems: 'center' }]}
                        onPress={() => updateAppointmentStatus(appointment.id, 'in-progress')}
                      >
                        <Text style={styles.primaryButtonText}>🎥 Start Consultation</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.outlineButton}
                        onPress={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                      >
                        <Text style={styles.outlineButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {appointment.status === 'in-progress' && (
                    <TouchableOpacity
                      style={[styles.primaryButton, { backgroundColor: '#2563EB', width: 160, alignItems: 'center' }]}
                      onPress={() => updateAppointmentStatus(appointment.id, 'completed')}
                    >
                      <Text style={styles.primaryButtonText}>Complete Consultation</Text>
                    </TouchableOpacity>
                  )}

                  {appointment.status === 'completed' && (
                    <Text style={[styles.badge, { backgroundColor: '#E5E7EB', color: '#111827', width: 160, textAlign: 'center' }]}>Consultation Completed</Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={[styles.card, { backgroundColor: '#FFF1F2', borderColor: '#FECACA' }]}>
        <View style={styles.grid4}> 
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#991B1B' }]}>{appointments.filter((apt) => apt.status === 'scheduled').length}</Text>
            <Text style={styles.muted}>Scheduled</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#CA8A04' }]}>{appointments.filter((apt) => apt.status === 'in-progress').length}</Text>
            <Text style={styles.muted}>In Progress</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#16A34A' }]}>{appointments.filter((apt) => apt.status === 'completed').length}</Text>
            <Text style={styles.muted}>Completed</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#374151' }]}>{appointments.length}</Text>
            <Text style={styles.muted}>Total</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FECACA', borderRadius: 12, padding: 12, gap: 12 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#991B1B' },
  muted: { color: '#6B7280', fontSize: 12 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  chip: { backgroundColor: '#FFE4E6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#DC2626' },
  chipText: { color: '#991B1B', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  outlineButton: { borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, alignItems: 'center' },
  outlineButtonText: { color: '#991B1B', fontWeight: '600' },
  primaryButton: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  badge: { borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8, overflow: 'hidden' },
  kpiNumber: { fontSize: 20, fontWeight: '700' },
});
