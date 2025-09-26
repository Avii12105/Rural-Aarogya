import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CommunityOutreach } from './CommunityOutreach.js';
import { HealthScreening } from './HealthScreening.js';
import { VillageReports } from './VillageReports.js';
import { 
  Card, 
  Button, 
  Badge, 
  Typography, 
  StatCard, 
  NavBar, 
  TabBar, 
  QuickActionCard,
  AlertList 
} from '../ui/shared-components';
import { 
  Container, 
  Grid, 
  Stack, 
  DashboardLayout, 
  CardGrid,
  Row 
} from '../ui/layout-components';
import { ASHA_DATA } from '../../data/dummyData';

export function ASHADashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [personalStats] = useState(ASHA_DATA.personalStats);
  const [todayTasks] = useState(ASHA_DATA.todayTasks);
  const [healthAlerts] = useState(ASHA_DATA.healthAlerts);
  const [recentActivities] = useState(ASHA_DATA.recentActivities);
  const [villageData] = useState(ASHA_DATA.villageData);

  const renderContent = () => {
    switch (activeTab) {
      case 'outreach':
        return <CommunityOutreach user={user} />;
      case 'screening':
        return <HealthScreening user={user} />;
      case 'reports':
        return <VillageReports user={user} />;
      default:
        return (
          <Stack gap={16} style={{ paddingBottom: 24 }}>
            <Card variant="info" style={{ alignItems: 'center' }}>
              <Typography variant="h3">नमस्ते, {user?.name || 'ASHA'}!</Typography>
              <Typography variant="muted">ASHA Worker Community Health Dashboard</Typography>
            </Card>

            <CardGrid columns={2} style={styles.centeredButtonGrid}>
              <StatCard 
                icon="👥"
                number={personalStats.familiesServed.toString()}
                label="Families Served"
              />
              <StatCard 
                icon="❤️"
                number={personalStats.healthScreenings.toString()}
                label="Health Screenings"
              />
              <StatCard 
                icon="📍"
                number={personalStats.villagesCovered.toString()}
                label="Villages Covered"
              />
              <StatCard 
                icon="📞"
                number={personalStats.referralsMade.toString()}
                label="Referrals Made"
              />
            </CardGrid>

            <Card>
              <Row align="center" style={{ marginBottom: 12 }}>
                <Typography variant="h4" style={{ marginRight: 8 }}>📄</Typography>
                <Typography variant="h4">Today's Priority Tasks</Typography>
              </Row>
              <Stack gap={8}>
                <Row justify="space-between" align="center" style={styles.taskRow}>
                  <View style={{ flex: 1 }}>
                    <Typography variant="body" style={{ fontWeight: '600' }}>Maternal Health Check - Village Khera</Typography>
                    <Typography variant="caption">3 pregnant women due for checkup</Typography>
                  </View>
                  <Badge variant="warning">High Priority</Badge>
                </Row>

                <Row justify="space-between" align="center" style={styles.taskRow}>
                  <View style={{ flex: 1 }}>
                    <Typography variant="body" style={{ fontWeight: '600' }}>Child Immunization Drive - Village Sangatpura</Typography>
                    <Typography variant="caption">15 children scheduled for vaccination</Typography>
                  </View>
                  <Badge variant="default">Scheduled</Badge>
                </Row>

                <Row justify="space-between" align="center" style={styles.taskRow}>
                  <View style={{ flex: 1 }}>
                    <Typography variant="body" style={{ fontWeight: '600' }}>Hypertension Screening - Village Bhamola</Typography>
                    <Typography variant="caption">Adults above 40 years</Typography>
                  </View>
                  <Badge variant="default" style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D1D5DB' }}>Pending</Badge>
                </Row>
              </Stack>
            </Card>

            <Grid columns={3} gap={12}>
              <QuickActionCard 
                icon="👥"
                title="Community Outreach"
                subtitle="Village health programs"
                onPress={() => setActiveTab('outreach')}
              />

              <QuickActionCard 
                icon="❤️"
                title="Health Screening"
                subtitle="Basic health checks"
                onPress={() => setActiveTab('screening')}
              />

              <QuickActionCard 
                icon="📈"
                title="Village Reports"
                subtitle="Health data & analytics"
                onPress={() => setActiveTab('reports')}
              />
            </Grid>

            <AlertList 
              title="Health Alerts & Warnings"
              style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}
              alerts={healthAlerts}
            />

            <Card>
              <Typography variant="h4" color="#9A3412" style={{ marginBottom: 12 }}>Recent Activities</Typography>
              <Stack gap={8}>
                {recentActivities.map((activity, index) => (
                  <Row key={index} justify="space-between" align="center">
                    <Typography style={{ flex: 1 }}>{activity.activity}</Typography>
                    <Typography variant="caption">{activity.timestamp}</Typography>
                  </Row>
                ))}
              </Stack>
            </Card>
          </Stack>
        );
    }
  };

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'outreach', label: 'Community Outreach' },
    { key: 'screening', label: 'Health Screening' },
    { key: 'reports', label: 'Village Reports' },
  ];

  return (
    <DashboardLayout
      navbar={
        <NavBar 
          title="ASHA Worker Portal"
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
  taskRow: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  centeredButtonGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
