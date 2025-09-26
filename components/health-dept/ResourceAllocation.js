import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export function ResourceAllocation({ user }) {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  const budgetData = [
    { category: 'Staff Salaries', allocated: 18.5, utilized: 16.2, percentage: 39 },
    { category: 'Infrastructure', allocated: 12.4, utilized: 8.9, percentage: 26 },
    { category: 'Medicine & Supplies', allocated: 8.7, utilized: 7.8, percentage: 18 },
    { category: 'Technology', allocated: 4.2, utilized: 3.1, percentage: 9 },
    { category: 'Training & Development', allocated: 2.1, utilized: 1.8, percentage: 4 },
    { category: 'Emergency Fund', allocated: 1.3, utilized: 0.4, percentage: 3 },
  ];

  const staffingData = [
    { district: 'Nabha', sanctioned: 23, current: 11, shortage: 12 },
    { district: 'Patiala', sanctioned: 45, current: 39, shortage: 6 },
    { district: 'Ludhiana', sanctioned: 67, current: 48, shortage: 19 },
    { district: 'Amritsar', sanctioned: 52, current: 47, shortage: 5 },
    { district: 'Jalandhar', sanctioned: 38, current: 26, shortage: 12 },
    { district: 'Bathinda', sanctioned: 31, current: 17, shortage: 14 },
  ];

  const priorityProjects = [
    { id: 1, name: 'Nabha Hospital Doctor Recruitment', budget: 2.8, timeline: '3 months', status: 'urgent', impact: 'High - Serves 173 villages' },
    { id: 2, name: 'Rural Telemedicine Infrastructure', budget: 4.1, timeline: '6 months', status: 'in-progress', impact: 'Medium - 50 PHCs' },
    { id: 3, name: 'ASHA Worker Training Program', budget: 1.6, timeline: '4 months', status: 'planned', impact: 'High - 1200 workers' },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case 'urgent': return [styles.badge, { backgroundColor: '#FEE2E2', color: '#991B1B' }];
      case 'in-progress': return [styles.badge, { backgroundColor: '#FEF3C7', color: '#92400E' }];
      case 'planned': return [styles.badge, { backgroundColor: '#DBEAFE', color: '#1E3A8A' }];
      case 'completed': return [styles.badge, { backgroundColor: '#DCFCE7', color: '#065F46' }];
      default: return [styles.badge, { backgroundColor: '#F3F4F6', color: '#111827' }];
    }
  };

  const districts = ['all', 'nabha', 'patiala', 'ludhiana', 'amritsar', 'jalandhar'];
  const years = ['2024', '2023', '2022'];

  const totalAllocated = budgetData.reduce((s, b) => s + b.allocated, 0).toFixed(1);
  const totalUtilized = budgetData.reduce((s, b) => s + b.utilized, 0).toFixed(1);
  const totalRemaining = (parseFloat(totalAllocated) - parseFloat(totalUtilized)).toFixed(1);
  const utilizedPct = Math.round((parseFloat(totalUtilized) / parseFloat(totalAllocated)) * 100);

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>💰 Resource Allocation & Budget Management</Text>
        <Text style={styles.muted}>Manage budget allocation, staffing, and resource distribution across Punjab health system</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.rowWrap}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>District</Text>
            <View style={styles.rowWrap}>
              {districts.map((d) => (
                <TouchableOpacity key={d} onPress={() => setSelectedDistrict(d)} style={[styles.chip, selectedDistrict === d && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedDistrict === d && styles.chipTextActive]}>{d === 'all' ? 'All Districts' : d[0].toUpperCase() + d.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Financial Year</Text>
            <View style={styles.rowWrap}>
              {years.map((y) => (
                <TouchableOpacity key={y} onPress={() => setSelectedYear(y)} style={[styles.chip, selectedYear === y && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedYear === y && styles.chipTextActive]}>FY {y}-{String(Number(y) + 1).slice(2)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.label}>Budget Summary</Text>
          <View style={styles.rowWrap}>
            <Text style={styles.muted}>Allocated: <Text style={{ color: '#16A34A', fontWeight: '700' }}>₹{totalAllocated} Cr</Text></Text>
            <Text style={styles.muted}>Utilized: <Text style={{ color: '#2563EB', fontWeight: '700' }}>₹{totalUtilized} Cr ({utilizedPct}%)</Text></Text>
            <Text style={styles.muted}>Remaining: <Text style={{ color: '#EA580C', fontWeight: '700' }}>₹{totalRemaining} Cr</Text></Text>
          </View>
        </View>
      </View>

      <View style={styles.grid4}>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>💰</Text><Text style={styles.kpiNumber}>₹47.2Cr</Text><Text style={styles.muted}>Total Budget</Text><Text style={[styles.muted, { color: '#16A34A' }]}>FY 2024-25</Text></View>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>👥</Text><Text style={styles.kpiNumber}>1,248</Text><Text style={styles.muted}>Staff Count</Text><Text style={[styles.muted, { color: '#DC2626' }]}>Need 856 more</Text></View>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>🏥</Text><Text style={styles.kpiNumber}>487</Text><Text style={styles.muted}>Facilities</Text><Text style={[styles.muted, { color: '#CA8A04' }]}>52% under-staffed</Text></View>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>📈</Text><Text style={styles.kpiNumber}>81%</Text><Text style={styles.muted}>Budget Utilization</Text><Text style={[styles.muted, { color: '#16A34A' }]}>Above target</Text></View>
      </View>

      <View style={styles.grid2}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget Distribution (₹Cr)</Text>
          <View style={{ gap: 6 }}>
            {budgetData.map((b, i) => (
              <View key={i} style={{ gap: 4 }}>
                <Text style={{ fontWeight: '600' }}>{b.category}</Text>
                <View style={styles.barRow}><Text style={styles.barLabel}>Allocated</Text><View style={[styles.bar, { width: `${(b.allocated/18.5)*100}%`, backgroundColor: '#16A34A' }]} /></View>
                <View style={styles.barRow}><Text style={styles.barLabel}>Utilized</Text><View style={[styles.bar, { width: `${(b.utilized/18.5)*100}%`, backgroundColor: '#2563EB' }]} /></View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>District-wise Staff Shortage</Text>
          <View style={{ gap: 6 }}>
            {staffingData.map((s, i) => (
              <View key={i} style={{ gap: 4 }}>
                <Text style={{ fontWeight: '600' }}>{s.district}</Text>
                <View style={styles.barRow}><Text style={styles.barLabel}>Current</Text><View style={[styles.bar, { width: `${(s.current/s.sanctioned)*100}%`, backgroundColor: '#16A34A' }]} /></View>
                <View style={styles.barRow}><Text style={styles.barLabel}>Shortage</Text><View style={[styles.bar, { width: `${(s.shortage/s.sanctioned)*100}%`, backgroundColor: '#EF4444' }]} /></View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Detailed Budget Analysis</Text>
        <View style={{ gap: 6 }}>
          {budgetData.map((item, index) => {
            const utilizationPercent = ((item.utilized / item.allocated) * 100).toFixed(1);
            const remaining = (item.allocated - item.utilized).toFixed(1);
            const pct = parseFloat(utilizationPercent);
            const status = pct > 85 ? ['On Track', '#DCFCE7', '#065F46'] : pct >= 60 ? ['Monitor', '#FEF3C7', '#92400E'] : ['Underutilized', '#FEE2E2', '#991B1B'];
            return (
              <View key={index} style={[styles.itemRow, { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }]}>
                <Text style={{ flex: 1, fontWeight: '600' }}>{item.category}</Text>
                <Text style={styles.muted}>₹{item.allocated}</Text>
                <Text style={styles.muted}>₹{item.utilized}</Text>
                <Text style={styles.muted}>{utilizationPercent}%</Text>
                <Text style={styles.muted}>₹{remaining}</Text>
                <Text style={[styles.badge, { backgroundColor: status[1], color: status[2] }]}>{status[0]}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: '#065F46' }]}>Priority Resource Allocation Projects</Text>
        <View style={{ gap: 12 }}>
          {priorityProjects.map((p) => (
            <View key={p.id} style={[styles.panel, { borderColor: '#E5E7EB' }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                    <Text style={{ fontWeight: '600' }}>{p.name}</Text>
                    <Text style={statusStyle(p.status)}>{p.status.replace('-', ' ')}</Text>
                  </View>
                  <View style={styles.metaGrid3}>
                    <Text><Text style={styles.metaLabel}>Budget:</Text> ₹{p.budget} Cr</Text>
                    <Text><Text style={styles.metaLabel}>Timeline:</Text> {p.timeline}</Text>
                    <Text><Text style={styles.metaLabel}>Impact:</Text> {p.impact}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>Approve Budget</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}>
        <Text style={[styles.cardTitle, { color: '#92400E' }]}>Budget Reallocation Recommendations</Text>
        <View style={{ gap: 8 }}>
          <View style={[styles.panel, { backgroundColor: '#FDE68A' }]}>
            <Text style={{ fontWeight: '600', color: '#92400E' }}>Infrastructure → Emergency Staffing</Text>
            <Text style={{ color: '#92400E' }}>Reallocate ₹3.5 Cr from underutilized infrastructure budget to immediate doctor recruitment</Text>
          </View>
          <View style={[styles.panel, { backgroundColor: '#DBEAFE' }]}>
            <Text style={{ fontWeight: '600', color: '#1E3A8A' }}>Technology → Training Programs</Text>
            <Text style={{ color: '#1E3A8A' }}>Redirect ₹1.1 Cr to accelerate ASHA worker digital training initiatives</Text>
          </View>
          <View style={[styles.panel, { backgroundColor: '#DCFCE7' }]}>
            <Text style={{ fontWeight: '600', color: '#065F46' }}>Emergency Fund → Telemedicine</Text>
            <Text style={{ color: '#065F46' }}>Utilize ₹0.9 Cr from emergency reserve for rural connectivity improvement</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.grid3}>
          <TouchableOpacity style={styles.outlineButtonBig}><Text>💰 Approve Budget Request</Text></TouchableOpacity>
          <TouchableOpacity style={styles.outlineButtonBig}><Text>👥 Staff Deployment Plan</Text></TouchableOpacity>
          <TouchableOpacity style={styles.outlineButtonBig}><Text>📈 Generate Budget Report</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, padding: 12, gap: 12 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#065F46' },
  muted: { color: '#6B7280', fontSize: 12 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  label: { fontSize: 12, color: '#374151', marginBottom: 4 },
  chip: { backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#059669' },
  chipText: { color: '#065F46', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiCard: { flexBasis: '47%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, paddingVertical: 16, alignItems: 'center', gap: 4 },
  kpiIcon: { fontSize: 24 },
  kpiNumber: { fontSize: 20, fontWeight: '700' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barLabel: { width: 90, fontSize: 12, color: '#374151' },
  bar: { height: 10, borderRadius: 6 },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 10, borderWidth: 1 },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  panel: { borderRadius: 10, padding: 10 },
  metaGrid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metaLabel: { fontWeight: '600', color: '#374151' },
  primaryButton: { backgroundColor: '#059669', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, alignSelf: 'flex-start' },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  outlineButtonBig: { borderWidth: 1, borderColor: '#86EFAC', borderRadius: 10, padding: 16, alignItems: 'center', flexBasis: '31%' },
});