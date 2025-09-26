import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { InventoryManagement } from './InventoryManagement.js';
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
import { PHARMACY_DATA } from '../../data/dummyData';

// Placeholder components for tabs not present in TSX (OrderTracking, SalesAnalytics)
function OrderTracking({ user }) {
  return (
    <Card>
      <Typography variant="h4">📦 Order Tracking</Typography>
      <Typography variant="muted">This section can show prescription orders and their status.</Typography>
    </Card>
  );
}
function SalesAnalytics({ user }) {
  return (
    <Card>
      <Typography variant="h4">📈 Sales Analytics</Typography>
      <Typography variant="muted">Add charts and KPIs using a chart library for React Native.</Typography>
    </Card>
  );
}

export function PharmacyDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dailyStats] = useState(PHARMACY_DATA.dailyStats);
  const [stockAlerts] = useState(PHARMACY_DATA.stockAlerts);
  const [recentOrders] = useState(PHARMACY_DATA.recentOrders);
  const [popularMedicines] = useState(PHARMACY_DATA.popularMedicines);
  const [monthlyFinancials] = useState(PHARMACY_DATA.monthlyFinancials);
  const [inventory] = useState(PHARMACY_DATA.inventory);

  const DashboardHome = () => (
    <Stack gap={16} style={{ paddingBottom: 24 }}>
      <Card variant="info" style={{ alignItems: 'center', backgroundColor: '#F3E8FF', borderColor: '#E9D5FF' }}>
        <Typography variant="h3" color="#6B21A8">Welcome, {user?.name || 'Pharmacist'}!</Typography>
        <Typography variant="muted" color="#7C3AED">Local Pharmacy Management Portal</Typography>
      </Card>

      <CardGrid columns={2} style={styles.centeredButtonGrid}>
        <StatCard icon="📦" number={dailyStats.medicinesInStock.toString()} label="Medicines in Stock " sublabel={`${dailyStats.lowStockAlerts} low stock alerts`} />
        <StatCard icon="👥" number={dailyStats.dailyCustomers.toString()} label="Daily Customers " sublabel={dailyStats.customerGrowth + ' from yesterday'} />
        <StatCard icon="📈" number={dailyStats.todaySales} label="Today's Sales" sublabel="Above target " />
        <StatCard icon="💊" number={dailyStats.prescriptionsFilled.toString()} label="Prescriptions Filled " sublabel="Today" />
      </CardGrid>

      <AlertList 
        title="Critical Stock Alerts"
        style={{ backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }}
        alerts={stockAlerts}
      />

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: '#6B21A8' }]}>Recent Customer Orders</Text>
        <View style={{ gap: 8 }}>
          {[
            { id: '1247', name: 'Rajesh Kumar', items: 'Paracetamol, Cough Syrup, Vitamin D - ₹245  ', status: 'Completed', when: '2 hours ago', color: '#16A34A' },
            { id: '1248', name: 'Sunita Devi', items: 'Iron tablets, Folic acid - ₹89', status: 'Preparing', when: '1 hour ago', color: '#CA8A04' },
            { id: '1249', name: 'Mohan Singh', items: 'Diabetes medication, BP tablets - ₹567  ', status: 'Reserved', when: '30 min ago', color: '#2563EB' },
          ].map((o) => (
            <View key={o.id} style={styles.orderRow}>
              <View>
                <Text style={{ fontWeight: '600' }}>Order #{o.id} - {o.name}</Text>
                <Text style={styles.muted}>{o.items}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.badge, { backgroundColor: o.color, color: '#fff', marginBottom: 2 }]}>{o.status}</Text>
                <Text style={styles.mutedXs}>{o.when}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Grid columns={3} gap={7} style={styles.centeredButtonGrid} >
        <QuickActionCard 
          icon="📦"
          title="Inventory Management"
          subtitle="Update stock levels"
          onPress={() => setActiveTab('inventory')}
        />
        <QuickActionCard 
          icon="💊"
          title="Order Tracking"
          subtitle="Manage prescriptions"
          onPress={() => setActiveTab('orders')}
        />
        <QuickActionCard 
          icon="📈"
          title="Sales Analytics"
          subtitle="View reports & trends"
          onPress={() => setActiveTab('analytics')}
        />
      </Grid>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: '#6B21A8' }]}>Most Requested Medicines</Text>
        <View style={styles.grid2}>
          <View style={{ gap: 4 }}>
            {['Paracetamol 500mg','Crocin 650mg','ORS Packets','Vitamin D tablets','Cough Syrup'].map((n, i) => (
              <View key={i} style={styles.rowBetween}><Text>{i+1}. {n}</Text><Text style={{ fontWeight: '600' }}>{[234,189,156,134,98][i]} units</Text></View>
            ))}
          </View>
          <View style={{ gap: 6 }}>
            <Text style={[styles.muted, { color: '#6B21A8', fontWeight: '700' }]}>Seasonal Demands</Text>
            <Text style={[styles.muted, { color: '#6B21A8' }]}>• Winter: Cold & flu medications</Text>
            <Text style={[styles.muted, { color: '#6B21A8' }]}>• Monsoon: Digestive & fever medicines</Text>
            <Text style={[styles.muted, { color: '#6B21A8' }]}>• Summer: Hydration & heat-related medicines</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
        <Text style={[styles.cardTitle, { color: '#1E40AF' }]}>Telemedicine Integration</Text>
        <View style={styles.grid2}>
          <View style={{ gap: 4 }}>
            <Text style={styles.muted}>• Receive prescriptions from telemedicine consultations</Text>
            <Text style={styles.muted}>• Auto-update medicine availability status</Text>
            <Text style={styles.muted}>• Send stock alerts to healthcare platform</Text>
          </View>
          <View style={{ gap: 4 }}>
            <Text style={styles.muted}>• Patients can check availability before traveling</Text>
            <Text style={styles.muted}>• Reserve medicines via the platform</Text>
            <Text style={styles.muted}>• Notify when prescriptions are ready</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: '#6B21A8' }]}>Financial Summary - December 2024</Text>
        <View style={styles.grid4}>
          <View style={{ alignItems: 'center' }}><Text style={[styles.kpiNumber, { color: '#6B21A8' }]}>₹8,45,678</Text><Text style={styles.muted}>Total Sales</Text></View>
          <View style={{ alignItems: 'center' }}><Text style={[styles.kpiNumber, { color: '#16A34A' }]}>₹2,34,567</Text><Text style={styles.muted}>Net Profit</Text></View>
          <View style={{ alignItems: 'center' }}><Text style={[styles.kpiNumber, { color: '#2563EB' }]}>2,847</Text><Text style={styles.muted}>Orders Fulfilled</Text></View>
          <View style={{ alignItems: 'center' }}><Text style={[styles.kpiNumber, { color: '#CA8A04' }]}>98.5%</Text><Text style={styles.muted}>Customer Satisfaction</Text></View>
        </View>
      </View>
    </Stack>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryManagement user={user} />;
      case 'orders':
        return <OrderTracking user={user} />;
      case 'analytics':
        return <SalesAnalytics user={user} />;
      default:
        return <DashboardHome />;
    }
  };

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'inventory', label: 'Inventory' },
    { key: 'orders', label: 'Orders' },
    { key: 'analytics', label: 'Analytics' },
  ];

  return (
    <DashboardLayout
      navbar={
        <NavBar 
          title="Local Pharmacy Portal"
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
  container: { flex: 1, backgroundColor: '#F3E8FF' },
  navbar: { height: 56, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E9D5FF', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { fontSize: 18, color: '#6B21A8', fontWeight: '600' },
  mutedSmall: { fontSize: 12, color: '#6B7280' },
  outlineButton: { borderWidth: 1, borderColor: '#C4B5FD', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#F5F3FF' },
  buttonText: { fontWeight: '600' },
  tabBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 8, paddingVertical: 8, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E9D5FF' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#EDE9FE' },
  tabButtonActive: { backgroundColor: '#7C3AED' },
  tabButtonText: { color: '#6B21A8', fontSize: 12 },
  tabButtonTextActive: { color: '#FFFFFF', fontWeight: '600' },
  main: { flex: 1, padding: 16 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9D5FF', borderRadius: 12, padding: 12, gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  muted: { color: '#6B7280', fontSize: 12 },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: { flexBasis: '47%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9D5FF', borderRadius: 12, paddingVertical: 16, alignItems: 'center', gap: 4 },
  statIcon: { fontSize: 24, color: '#7C3AED' },
  kpiNumber: { fontSize: 20, fontWeight: '700' },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#FCA5A5', backgroundColor: '#FEE2E2' },
  orderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#F9FAFB', borderRadius: 8 },
  badge: { borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8, overflow: 'hidden', fontSize: 12 },
  quickCard: { flexBasis: '31%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9D5FF', borderRadius: 12, padding: 16, alignItems: 'center', gap: 6 },
  quickTitle: { fontSize: 14, fontWeight: '600' },
  quickSub: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
  kpiNumberSmall: { fontSize: 18, fontWeight: '700' },
  kpiNumber: { fontSize: 20, fontWeight: '700' },
  mutedXs: { color: '#9CA3AF', fontSize: 10 },
  centeredButtonGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});