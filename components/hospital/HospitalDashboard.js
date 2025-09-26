import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { DoctorSchedule } from './DoctorSchedule.js';
import { PatientAppointments } from './PatientAppointments.js';
import { HealthRecordForm } from './HealthRecordForm.js';
import { 
  Card, 
  Button, 
  Badge, 
  Typography, 
  StatCard, 
  NavBar, 
  TabBar, 
  QuickActionCard 
} from '../ui/shared-components';
import { 
  Container, 
  Grid, 
  Stack, 
  DashboardLayout, 
  CardGrid,
  Row 
} from '../ui/layout-components';
import { HOSPITAL_DATA } from '../../data/dummyData';

export function HospitalDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [todayAppointments, setTodayAppointments] = useState(HOSPITAL_DATA.todayAppointments);
  const [loading, setLoading] = useState(false);
  const [hospitalStats] = useState(HOSPITAL_DATA.hospitalStats);
  const [doctorSchedules] = useState(HOSPITAL_DATA.doctorSchedules);

  useEffect(() => {
    // Simulate loading time for realism
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const DashboardHome = () => (
    <Stack gap={16} style={{ paddingBottom: 24 }}>
      <Card variant="info" style={{ alignItems: 'center' }}>
        <Typography variant="h3">Welcome, Dr. {user?.name || ''}!</Typography>
        <Typography variant="muted">Nabha Civil Hospital Staff Portal </Typography>
      </Card>

      <CardGrid columns={2} style={styles.centeredButtonGrid}>
        <StatCard 
          icon="👥"
          number={todayAppointments.length.toString()}
          label="Today's Patients"
        />
        <StatCard 
          icon="📅"
          number="173"
          label="Villages Served "
        />
        <StatCard 
          icon="📄"
          number="11"
          label="Active Doctors "
        />
        <StatCard 
          icon="🎥"
          number="24/7"
          label="Telemedicine "
        />
      </CardGrid>

      <Card>
        <Typography variant="h4" color="#991B1B" style={{ marginBottom: 12 }}>Today's Appointments</Typography>
        {loading ? (
          <View style={{ paddingVertical: 12, alignItems: 'center' }}>
            <ActivityIndicator color="#DC2626" />
            <Typography variant="muted">Loading appointments...</Typography>
          </View>
        ) : todayAppointments.length === 0 ? (
          <Typography variant="muted">No appointments scheduled for today.</Typography>
        ) : (
          <Stack gap={8}>
            {todayAppointments.map((apt, index) => (
              <Row key={index} style={styles.appointmentRow} justify="space-between" align="flex-start">
                <View style={{ flex: 1 }}>
                  <Typography variant="body" style={{ fontWeight: '600' }}>Patient ID: {apt.patientId}</Typography>
                  <Typography variant="caption">{apt.time} - {apt.symptoms}</Typography>
                  <Badge variant={apt.urgency === 'high' ? 'error' : apt.urgency === 'normal' ? 'info' : 'default'}>
                    {apt.urgency} priority
                  </Badge>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Button 
                    variant="primary" 
                    size="small" 
                    style={{ backgroundColor: '#DC2626', marginBottom: 6 }}
                    onPress={() => Alert.alert('Consultation', 'Starting consultation...')}
                  >
                    🎥 Start
                  </Button>
                  <Typography variant="caption" style={{ fontSize: 10 }}>Status: {apt.status}</Typography>
                </View>
              </Row>
            ))}
          </Stack>
        )}
      </Card>

      <Grid columns={3} gap={12}>
        <QuickActionCard 
          icon="⚙️"
          title="Manage Schedule"
          subtitle="Set availability times"
          onPress={() => setActiveTab('schedule')}
        />
        <QuickActionCard 
          icon="👥"
          title="View All Patients"
          subtitle="Manage appointments"
          onPress={() => setActiveTab('appointments')}
        />
        <QuickActionCard 
          icon="📄"
          title="Add Health Record"
          subtitle="Create patient records"
          onPress={() => setActiveTab('records')}
        />
      </Grid>

      <Card style={{ backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }}>
        <Typography variant="h4" color="#1E40AF" style={{ marginBottom: 12 }}>Nabha Civil Hospital</Typography>
        <Row style={{ flexWrap: 'wrap', gap: 16, justifyContent: 'space-between' }}> 
          <View style={{ minWidth: '45%' }}>
            <Typography><Text style={{ fontWeight: '700' }}>Sanctioned Doctors:</Text> 23</Typography>
            <Typography><Text style={{ fontWeight: '700' }}>Current Staff:</Text> 11 (48% capacity)</Typography>
            <Typography><Text style={{ fontWeight: '700' }}>Villages Served:</Text> 173</Typography>
          </View>
          <View style={{ minWidth: '45%' }}>
            <Typography><Text style={{ fontWeight: '700' }}>Emergency Contact:</Text> 108</Typography>
            <Typography><Text style={{ fontWeight: '700' }}>Hospital Phone:</Text> +91-1765-XXXXX</Typography>
            <Typography><Text style={{ fontWeight: '700' }}>Operating Hours:</Text> 24/7</Typography>
          </View>
        </Row>
      </Card>
    </Stack>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <DoctorSchedule user={user} doctorSchedules={doctorSchedules} />;
      case 'appointments':
        return <PatientAppointments user={user} appointments={todayAppointments} />;
      case 'records':
        return <HealthRecordForm user={user} />;
      default:
        return <DashboardHome />;
    }
  };

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'schedule', label: 'My Schedule' },
    { key: 'appointments', label: 'Patient Appointments' },
    { key: 'records', label: 'Health Records' },
  ];

  return (
    <DashboardLayout
      navbar={
        <NavBar 
          title="Civil Hospital Staff Portal"
          user={user}
          onLogout={onLogout}
        />
      }
      tabBar={
        <TabBar 
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      }
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {renderContent()}
      </ScrollView>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  appointmentRow: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  centeredButtonGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
