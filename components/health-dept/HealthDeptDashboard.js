import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RegionalOverview } from './RegionalOverview.js';
import { PolicyManagement } from './PolicyManagement.js';
import { ResourceAllocation } from './ResourceAllocation.js';
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
import { HEALTH_DEPT_DATA } from '../../data/dummyData';

export function HealthDeptDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stateStats] = useState(HEALTH_DEPT_DATA.stateStats);
  const [criticalAlerts] = useState(HEALTH_DEPT_DATA.criticalAlerts);
  const [districtPerformance] = useState(HEALTH_DEPT_DATA.districtPerformance);
  const [healthInitiatives] = useState(HEALTH_DEPT_DATA.healthInitiatives);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <RegionalOverview user={user} />;
      case 'policy':
        return <PolicyManagement user={user} />;
      case 'resources':
        return <ResourceAllocation user={user} />;
      default:
        return (
          <Stack gap={16} style={{ paddingBottom: 24 }}>
            <Card variant="info" style={{ alignItems: 'center' }}>
              <Typography variant="h3">ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, {user?.name || 'Official'}!</Typography>
              <Typography variant="muted">Nabha District Health Department - Administrative Dashboard</Typography>
            </Card>

            <CardGrid columns={2} style={styles.centeredButtonGrid}>
              <StatCard 
                icon="👥"
                number={stateStats.populationServed}
                label="Population Served"
                sublabel="Nabha District"
              />
              <StatCard 
                icon="🩺"
                number={stateStats.healthcareFacilities.toString()}
                label="Healthcare Facilities"
                sublabel="52% under-staffed"
              />
              <StatCard 
                icon="📍"
                number={stateStats.villagesCovered.toLocaleString()}
                label="Villages Covered"
                sublabel="98% connectivity"
              />
              <StatCard 
                icon="📈"
                number={stateStats.budgetAllocated}
                label="Budget Allocated"
                sublabel="FY 2024-25"
              />
            </CardGrid>

            <AlertList 
              title="Critical Health Alerts - Nabha District"
              style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}
              alerts={criticalAlerts}
            />

            <Card>
              <View style={styles.districtPerformanceHeader}>
                <Typography variant="h4" color="#166534">District Performance Overview</Typography>
                <View style={styles.performanceLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#16A34A' }]} />
                    <Typography variant="caption">Excellent</Typography>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#CA8A04' }]} />
                    <Typography variant="caption">Good</Typography>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
                    <Typography variant="caption">Needs Attention</Typography>
                  </View>
                </View>
              </View>
              
              <View style={styles.districtRowsContainer}>
                {districtPerformance.map((district, index) => {
                  const availabilityColor = district.doctorAvailability >= 80 ? '#16A34A' : district.doctorAvailability >= 60 ? '#CA8A04' : '#DC2626';
                  const ratingColor = district.rating === 'excellent' ? '#16A34A' : district.rating === 'good' ? '#CA8A04' : district.rating === 'poor' ? '#DC2626' : '#CA8A04';
                  const villagesServed = district.villagesServed || 0;
                  const populationText = (district.population / 1000).toFixed(0) + 'K';
                  
                  return (
                    <View key={index} style={styles.districtPerformanceRow}>
                      <View style={styles.districtRowHeader}>
                        <View style={styles.districtNameSection}>
                          <Typography variant="body" style={[styles.districtName, { color: ratingColor }]}>
                            {district.name}
                          </Typography>
                          <View style={[styles.ratingBadge, { backgroundColor: ratingColor }]}>
                            <Typography variant="caption" style={styles.ratingText}>
                              {district.rating.toUpperCase()}
                            </Typography>
                          </View>
                        </View>
                        <View style={styles.populationSection}>
                          <Typography variant="caption" style={styles.populationInfo}>
                            Population: {populationText}
                          </Typography>
                          <Typography variant="caption" style={styles.populationInfo}>
                            Villages: {villagesServed.toLocaleString()}
                          </Typography>
                        </View>
                      </View>
                      
                      <View style={styles.metricsRowContainer}>
                        <View style={styles.metricBox}>
                          <View style={styles.metricHeader}>
                            <Typography variant="caption" style={styles.metricIcon}>👨‍⚕️</Typography>
                            <Typography variant="caption" style={styles.metricLabel}>Doctor Availability</Typography>
                          </View>
                          <Typography variant="body" style={[styles.metricValue, { color: availabilityColor }]}>
                            {district.doctorAvailability}%
                          </Typography>
                          <View style={[styles.progressBar, styles.progressBarBg]}>
                            <View style={[
                              styles.progressFill, 
                              { 
                                width: `${district.doctorAvailability}%`, 
                                backgroundColor: availabilityColor 
                              }
                            ]} />
                          </View>
                        </View>
                        
                        <View style={styles.metricBox}>
                          <View style={styles.metricHeader}>
                            <Typography variant="caption" style={styles.metricIcon}>💻</Typography>
                            <Typography variant="caption" style={styles.metricLabel}>Telemedicine Growth</Typography>
                          </View>
                          <Typography variant="body" style={[styles.metricValue, { color: '#059669' }]}>
                            {district.telemedicineUsage}
                          </Typography>
                          <Typography variant="caption" style={styles.metricSubtext}>
                            usage growth
                          </Typography>
                        </View>
                        
                        <View style={styles.metricBox}>
                          <View style={styles.metricHeader}>
                            <Typography variant="caption" style={styles.metricIcon}>🏥</Typography>
                            <Typography variant="caption" style={styles.metricLabel}>Health Facilities</Typography>
                          </View>
                          <Typography variant="body" style={[styles.metricValue, { color: '#166534' }]}>
                            {district.healthFacilities}
                          </Typography>
                          <Typography variant="caption" style={styles.metricSubtext}>
                            active centers
                          </Typography>
                        </View>
                        
                        <View style={styles.actionButtonContainer}>
                          <TouchableOpacity 
                            style={styles.viewDetailsButton}
                            onPress={() => Alert.alert('District Details', `Viewing detailed analytics for ${district.name}`)}
                          >
                            <Typography variant="caption" style={styles.viewDetailsText}>View Details</Typography>
                          </TouchableOpacity>
                        </View>
                      </View>
                      
                      {district.primaryConcerns && district.primaryConcerns.length > 0 && (
                        <View style={styles.concernsContainer}>
                          <Typography variant="caption" style={styles.concernsLabel}>Key Concerns:</Typography>
                          <View style={styles.concernsRow}>
                            {district.primaryConcerns.map((concern, i) => (
                              <View key={i} style={styles.concernBadge}>
                                <Typography variant="caption" style={styles.concernText}>
                                  {concern}
                                </Typography>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </Card>

            <Grid columns={3} gap={12}>
              <QuickActionCard 
                icon="📈"
                title="Regional Overview"
                subtitle="Statewide health analytics"
                onPress={() => setActiveTab('overview')}
              />
              <QuickActionCard 
                icon="📄"
                title="Policy Management"
                subtitle="Health policies & guidelines"
                onPress={() => setActiveTab('policy')}
              />
              <QuickActionCard 
                icon="👥"
                title="Resource Allocation"
                subtitle="Budget & staff management"
                onPress={() => setActiveTab('resources')}
              />
            </Grid>

            <Card style={{ backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }}>
              <Typography variant="h4" color="#1E40AF" style={{ marginBottom: 12 }}>Recent Nabha District Health Initiatives</Typography>
              <Stack gap={8}>
                {healthInitiatives.map((initiative, i) => {
                  const variant = initiative.status === 'Active' ? 'default' : 
                                 initiative.status === 'Expanding' ? 'success' : 
                                 initiative.status === 'In Progress' ? 'warning' : 'info';
                  return (
                    <Row key={i} justify="space-between" align="center">
                      <Typography style={{ flex: 1 }}>{initiative.title}</Typography>
                      <Badge variant={variant}>{initiative.status}</Badge>
                    </Row>
                  );
                })}
              </Stack>
            </Card>

            <Card>
              <Typography variant="h4" color="#166534" style={{ marginBottom: 12 }}>FY 2024-25 Health Budget Utilization</Typography>
              <CardGrid columns={2}>
                <StatCard icon="💰" number={stateStats.budgetAllocated} label="Total Allocated" />
                <StatCard icon="📊" number={stateStats.budgetUtilized} label="Utilized (59.5%)" />
                <StatCard icon="🏗️" number={stateStats.infrastructureFund} label="Infrastructure" />
                <StatCard icon="🚨" number={stateStats.emergencyFund} label="Emergency Fund" />
              </CardGrid>
            </Card>
          </Stack>
        );
    }
  };

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'overview', label: 'Regional Overview' },
    { key: 'policy', label: 'Policy Management' },
    { key: 'resources', label: 'Resource Allocation' },
  ];

  return (
    <DashboardLayout
      navbar={
        <NavBar 
          title="Nabha District Health Portal"
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
  centeredButtonGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // District Performance Overview Styles
  districtPerformanceHeader: {
    marginBottom: 16,
  },
  performanceLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  districtRowsContainer: {
    gap: 12,
  },
  districtPerformanceRow: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  districtRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  districtNameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  districtName: {
    fontSize: 16,
    fontWeight: '700',
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  populationInfo: {
    color: '#64748B',
    fontSize: 12,
  },
  populationSection: {
    alignItems: 'flex-end',
  },
  metricsRowContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    minHeight: 80,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  metricIcon: {
    fontSize: 14,
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  metricSubtext: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  progressBarBg: {
    backgroundColor: '#E2E8F0',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  viewDetailsButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  // Concerns Section Styles
  concernsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  concernsLabel: {
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 6,
  },
  concernsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  concernBadge: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  concernText: {
    color: '#92400E',
    fontSize: 10,
    fontWeight: '600',
  },
});
