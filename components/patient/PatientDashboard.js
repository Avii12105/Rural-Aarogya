import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking, Vibration } from 'react-native';
import { AppointmentBooking } from './AppointmentBooking.js';
import { SymptomChecker } from './SymptomChecker.js';
import { HealthRecords } from './HealthRecords.js';
import { MedicineSearch } from './MedicineSearch.js';
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
  CardGrid 
} from '../ui/layout-components';
import { PATIENT_DATA } from '../../data/dummyData';

export function PatientDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState(PATIENT_DATA.appointments);
  const [loading, setLoading] = useState(false);
  const [healthRecords] = useState(PATIENT_DATA.healthRecords);
  const [medications] = useState(PATIENT_DATA.medications);
  
  // Emergency contacts and SOS functionality - Nabha District specific
  const emergencyContacts = [
    { name: 'Civil Hospital Nabha', number: '01763-223344', type: 'Hospital' },
    { name: 'Nabha PHC', number: '01763-224455', type: 'Primary Health Center' },
    { name: 'Ambulance Service', number: '108', type: 'Ambulance' },
    { name: 'Police Station Nabha', number: '01763-225566', type: 'Police' },
    { name: 'Dr. Rajesh Kumar (Civil Hospital)', number: '+91-9876543210', type: 'Doctor' },
    { name: 'ASHA Worker - Khera', number: '+91-9876543221', type: 'ASHA' },
    { name: 'Block Medical Officer', number: '+91-9876543222', type: 'BMO' }
  ];

  const handleSOSPress = () => {
    // Vibrate to indicate emergency activation
    Vibration.vibrate([500, 300, 500]);
    
    Alert.alert(
      '🚨 EMERGENCY SOS',
      'This will immediately contact emergency services and your registered emergency contacts. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Call 108 Ambulance',
          style: 'destructive',
          onPress: () => {
            Linking.openURL('tel:108');
            // Also send SMS to emergency contact (simulated)
            Alert.alert('Emergency Alert Sent', 'Emergency services have been contacted and your family has been notified.');
          }
        },
        {
          text: 'Show All Emergency Contacts',
          onPress: () => showEmergencyContacts()
        }
      ]
    );
  };

  const showEmergencyContacts = () => {
    const contactOptions = emergencyContacts.map(contact => ({
      text: `📞 ${contact.name} (${contact.type})`,
      onPress: () => Linking.openURL(`tel:${contact.number}`)
    }));
    
    contactOptions.push({
      text: 'Cancel',
      style: 'cancel'
    });

    Alert.alert(
      '🚨 Emergency Contacts',
      'Select who to call immediately:',
      contactOptions
    );
  };

  useEffect(() => {
    // Simulate loading time for realism
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const DashboardHome = () => (
    <Stack gap={16}>
      <Card variant="info" style={{ alignItems: 'center' }}>
        <Typography variant="h3">नमस्ते, {user?.name || 'Patient'}!</Typography>
        <Typography variant="muted">Welcome to your health dashboard</Typography>
      </Card>
      
      {/* Emergency SOS Button */}
      <TouchableOpacity 
        style={styles.sosButton} 
        onPress={handleSOSPress}
        activeOpacity={0.8}
      >
        <View style={styles.sosContent}>
          <Text style={styles.sosIcon}>🚨</Text>
          <View style={styles.sosTextContainer}>
            <Text style={styles.sosTitle}>EMERGENCY SOS</Text>
            <Text style={styles.sosSubtitle}>Tap for immediate medical assistance</Text>
          </View>
          <View style={styles.sosIndicator}>
            <Text style={styles.sosPhone}>📞</Text>
          </View>
        </View>
      </TouchableOpacity>

      <CardGrid columns={2} style={styles.centeredButtonGrid}>
        <QuickActionCard 
          icon="📅"
          title="Book Appointment"
          subtitle="Schedule with doctors "
          onPress={() => setActiveTab('book')}
        />
        <QuickActionCard 
          icon="💬"
          title="Symptom Checker"
          subtitle="AI-powered assessment  "
          onPress={() => setActiveTab('symptoms')}
        />
        <QuickActionCard 
          icon="📄"
          title="Health Records"
          subtitle="View your history "
          onPress={() => setActiveTab('records')}
        />
        <QuickActionCard 
          icon="🔎"
          title="Find Medicine"
          subtitle="Check availability "
          onPress={() => setActiveTab('medicine')}
        />
      </CardGrid>

      <Card>
        <Typography variant="h4" style={{ marginBottom: 12 }}>Recent Appointments</Typography>
        {loading ? (
          <Typography variant="muted">Loading appointments...</Typography>
        ) : appointments.length === 0 ? (
          <Typography variant="muted">No appointments yet. Book your first appointment!</Typography>
        ) : (
          <Stack gap={8}>
            {appointments.slice(0, 5).map((apt, index) => (
              <View key={index} style={styles.appointmentRow}>
                <View style={{ flex: 1 }}>
                  <Typography variant="body" style={{ fontWeight: '600' }}>Dr. {apt.doctorName || 'Unknown'}</Typography>
                  <Typography variant="caption">{apt.date} at {apt.time}</Typography>
                  <Typography variant="caption">{apt.symptoms}</Typography>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Badge variant="default">{apt.status}</Badge>
                  {apt.status === 'scheduled' && (
                    <Button 
                      size="small" 
                      style={{ marginTop: 6 }} 
                      onPress={() => Alert.alert('Video', 'Joining call...')}
                    >
                      🎥 Join Call
                    </Button>
                  )}
                </View>
              </View>
            ))}
          </Stack>
        )}
      </Card>

      <Card style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}>
        <Typography variant="h4" color="#991B1B" style={{ marginBottom: 12 }}>🚨 Emergency Contacts</Typography>
        <Stack gap={6}>
          {emergencyContacts.slice(0, 3).map((contact, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.emergencyContactRow}
              onPress={() => Linking.openURL(`tel:${contact.number}`)}
            >
              <Text style={styles.emergencyContactIcon}>📞</Text>
              <View style={{ flex: 1 }}>
                <Typography variant="body" style={{ fontWeight: '600', color: '#991B1B' }}>
                  {contact.name}
                </Typography>
                <Typography variant="caption" color="#DC2626">
                  {contact.number} ({contact.type})
                </Typography>
              </View>
              <Text style={styles.callNowText}>Call Now</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.viewAllContactsButton}
            onPress={showEmergencyContacts}
          >
            <Typography style={styles.viewAllContactsText}>View All Emergency Contacts</Typography>
          </TouchableOpacity>
        </Stack>
      </Card>
      
      <Card>
        <Typography variant="h4" color="#065F46" style={{ marginBottom: 12 }}>Daily Health Tips</Typography>
        <Stack gap={6}>
          <Typography color="#047857">• Drink at least 8 glasses of water daily</Typography>
          <Typography color="#047857">• Take a 30-minute walk every day</Typography>
          <Typography color="#047857">• Eat fresh fruits and vegetables</Typography>
          <Typography color="#047857">• Get 7-8 hours of sleep</Typography>
          <Typography color="#047857">• Wash hands frequently</Typography>
        </Stack>
      </Card>
    </Stack>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'book':
        return <AppointmentBooking user={user} appointments={appointments} setAppointments={setAppointments} />;
      case 'symptoms':
        return <SymptomChecker user={user} />;
      case 'records':
        return <HealthRecords user={user} healthRecords={healthRecords} />;
      case 'medicine':
        return <MedicineSearch medications={medications} />;
      default:
        return <DashboardHome />;
    }
  };

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'book', label: 'Book Appointment' },
    { key: 'symptoms', label: 'Symptom Checker' },
    { key: 'records', label: 'Health Records' },
    { key: 'medicine', label: 'Find Medicine' },
  ];

  return (
    <DashboardLayout
      navbar={
        <NavBar 
          title="Nabha District Patient Portal"
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 12,
  },
  centeredButtonGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // SOS Button Styles
  sosButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sosIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  sosTextContainer: {
    flex: 1,
  },
  sosTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sosSubtitle: {
    fontSize: 12,
    color: '#FEE2E2',
    marginTop: 2,
  },
  sosIndicator: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosPhone: {
    fontSize: 20,
  },
  emergencyActionCard: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
    borderWidth: 2,
  },
  // Emergency Contacts Styles
  emergencyContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 12,
  },
  emergencyContactIcon: {
    fontSize: 20,
  },
  callNowText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  viewAllContactsButton: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  viewAllContactsText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
