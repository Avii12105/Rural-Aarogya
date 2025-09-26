import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export function RegionalOverview({ user }) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('doctor_availability');

  const regionalData = [
    { district: 'Nabha Block', doctorAvailability: 48, telemedicine: 135, budget: 1.2, population: 52000 },
    { district: 'Tappa Block', doctorAvailability: 72, telemedicine: 168, budget: 1.0, population: 41000 },
    { district: 'Bhadson Block', doctorAvailability: 65, telemedicine: 142, budget: 0.9, population: 38000 },
    { district: 'Lehragaga Block', doctorAvailability: 58, telemedicine: 98, budget: 0.8, population: 44000 },
  ];

  const timeSeriesData = [
    { month: 'Jul', consultations: 2450, referrals: 189, outcomes: 94 },
    { month: 'Aug', consultations: 2890, referrals: 201, outcomes: 96 },
    { month: 'Sep', consultations: 3120, referrals: 178, outcomes: 95 },
    { month: 'Oct', consultations: 2980, referrals: 156, outcomes: 97 },
    { month: 'Nov', consultations: 3350, referrals: 143, outcomes: 98 },
    { month: 'Dec', consultations: 3780, referrals: 134, outcomes: 96 },
  ];

  const perfColor = (value) => {
    if (value >= 80) return '#16A34A';
    if (value >= 60) return '#CA8A04';
    return '#DC2626';
  };

  const regions = ['all', 'nabha', 'tappa', 'bhadson', 'lehragaga'];
  const metrics = [
    { key: 'doctor_availability', label: 'Doctor Availability' },
    { key: 'telemedicine', label: 'Telemedicine Usage' },
    { key: 'budget', label: 'Budget Utilization' },
    { key: 'population', label: 'Population Coverage' },
  ];

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>📍 Nabha District Health Overview</Text>
        <Text style={styles.muted}>Comprehensive health metrics across Nabha district blocks and rural areas</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.rowWrap}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Block/Area</Text>
            <View style={styles.rowWrap}>
              {regions.map((r) => (
                <TouchableOpacity key={r} onPress={() => setSelectedRegion(r)} style={[styles.chip, selectedRegion === r && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedRegion === r && styles.chipTextActive]}>{r === 'all' ? 'All Blocks' : r[0].toUpperCase() + r.slice(1) + ' Block'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Primary Metric</Text>
            <View style={styles.rowWrap}>
              {metrics.map((m) => (
                <TouchableOpacity key={m.key} onPress={() => setSelectedMetric(m.key)} style={[styles.chip, selectedMetric === m.key && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedMetric === m.key && styles.chipTextActive]}>{m.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.muted}>Total District Population</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#16A34A' }}>175K</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.grid4}>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>🏥</Text><Text style={styles.kpiNumber}>28</Text><Text style={styles.muted}>Healthcare Facilities</Text><Text style={[styles.muted, { color: '#CA8A04' }]}>48% under-staffed</Text></View>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>👨‍⚕️</Text><Text style={styles.kpiNumber}>11</Text><Text style={styles.muted}>Active Doctors</Text><Text style={[styles.muted, { color: '#DC2626' }]}>Need 12 more</Text></View>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>📈</Text><Text style={styles.kpiNumber}>1,847</Text><Text style={styles.muted}>Monthly Consultations</Text><Text style={[styles.muted, { color: '#16A34A' }]}>+31% growth</Text></View>
        <View style={styles.kpiCard}><Text style={styles.kpiIcon}>📍</Text><Text style={styles.kpiNumber}>98.8%</Text><Text style={styles.muted}>Village Coverage</Text><Text style={[styles.muted, { color: '#16A34A' }]}>173 villages</Text></View>
      </View>

      <View style={styles.card}>
        <View style={styles.performanceHeader}>
          <Text style={styles.cardTitle}>Block Performance Overview</Text>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#16A34A' }]} />
              <Text style={styles.legendText}>Excellent (80%+)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#CA8A04' }]} />
              <Text style={styles.legendText}>Good (60-79%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
              <Text style={styles.legendText}>Needs Attention (&lt;60%)</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.performanceContainer}>
          {regionalData.map((d, index) => {
            const doctorPerformance = d.doctorAvailability;
            const telemedicineScore = Math.round((d.telemedicine / 168) * 100);
            const budgetUtilization = Math.round((d.budget / 1.2) * 100);
            const populationDensity = Math.round(d.population / 1000);
            
            return (
              <View key={d.district} style={styles.districtRow}>
                <View style={styles.districtHeader}>
                  <View style={styles.districtTitleSection}>
                    <Text style={styles.districtName}>{d.district}</Text>
                    <Text style={styles.populationText}>{populationDensity}K population</Text>
                  </View>
                  <View style={styles.overallScore}>
                    <Text style={styles.overallScoreLabel}>Overall Score</Text>
                    <Text style={[
                      styles.overallScoreValue,
                      { color: perfColor(Math.round((doctorPerformance + telemedicineScore + budgetUtilization) / 3)) }
                    ]}>
                      {Math.round((doctorPerformance + telemedicineScore + budgetUtilization) / 3)}%
                    </Text>
                  </View>
                </View>
                
                <View style={styles.metricsGrid}>
                  <View style={styles.metricItem}>
                    <View style={styles.metricHeader}>
                      <Text style={styles.metricIcon}>👨‍⚕️</Text>
                      <Text style={styles.metricLabel}>Doctor Availability</Text>
                    </View>
                    <View style={styles.metricValueContainer}>
                      <Text style={[
                        styles.metricValue, 
                        { color: perfColor(doctorPerformance) }
                      ]}>
                        {doctorPerformance}%
                      </Text>
                      <View style={[
                        styles.performanceBadge,
                        { backgroundColor: perfColor(doctorPerformance) }
                      ]}>
                        <Text style={styles.badgeText}>
                          {doctorPerformance >= 80 ? 'Excellent' : doctorPerformance >= 60 ? 'Good' : 'Critical'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.metricItem}>
                    <View style={styles.metricHeader}>
                      <Text style={styles.metricIcon}>💻</Text>
                      <Text style={styles.metricLabel}>Telemedicine Usage</Text>
                    </View>
                    <View style={styles.metricValueContainer}>
                      <Text style={[
                        styles.metricValue,
                        { color: perfColor(telemedicineScore) }
                      ]}>
                        {d.telemedicine} sessions
                      </Text>
                      <View style={[
                        styles.performanceBadge,
                        { backgroundColor: perfColor(telemedicineScore) }
                      ]}>
                        <Text style={styles.badgeText}>
                          {telemedicineScore >= 80 ? 'High' : telemedicineScore >= 60 ? 'Medium' : 'Low'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.metricItem}>
                    <View style={styles.metricHeader}>
                      <Text style={styles.metricIcon}>💰</Text>
                      <Text style={styles.metricLabel}>Budget Utilization</Text>
                    </View>
                    <View style={styles.metricValueContainer}>
                      <Text style={[
                        styles.metricValue,
                        { color: perfColor(budgetUtilization) }
                      ]}>
                        ₹{d.budget}M
                      </Text>
                      <View style={[
                        styles.performanceBadge,
                        { backgroundColor: perfColor(budgetUtilization) }
                      ]}>
                        <Text style={styles.badgeText}>
                          {budgetUtilization}%
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Telemedicine Adoption Trends</Text>
        <View style={{ gap: 6 }}>
          {timeSeriesData.map((t) => (
            <View key={t.month} style={styles.activityRow}>
              <Text style={{ width: 40 }}>{t.month}</Text>
              <Text style={styles.muted}>Consultations: {t.consultations}</Text>
              <Text style={styles.muted}>Referrals: {t.referrals}</Text>
              <Text style={styles.muted}>Success: {t.outcomes}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Detailed District Analysis</Text>
        <View style={{ gap: 6 }}>
          {regionalData.map((d, i) => (
            <View key={i} style={[styles.itemRow, { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }]}>
              <Text style={{ flex: 1, fontWeight: '600' }}>{d.district}</Text>
              <Text style={styles.muted}>{(d.population/1000).toFixed(0)}K</Text>
              <Text style={{ color: perfColor(d.doctorAvailability), fontWeight: '700' }}>{d.doctorAvailability}%</Text>
              <Text style={styles.muted}>{d.telemedicine}</Text>
              <Text style={styles.muted}>₹{d.budget}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}>
        <Text style={[styles.cardTitle, { color: '#92400E' }]}>Priority Action Items</Text>
        <View style={{ gap: 8 }}>
          <View style={[styles.itemRow, { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#991B1B' }}>Immediate Doctor Recruitment - Nabha Block</Text>
              <Text style={{ color: '#DC2626', fontSize: 12 }}>Deploy mobile medical units and expedite hiring process</Text>
            </View>
            <Text style={[styles.badge, { backgroundColor: '#DC2626', color: '#fff' }]}>Critical</Text>
          </View>
          <View style={[styles.itemRow, { backgroundColor: '#FFEDD5', borderColor: '#FED7AA' }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#9A3412' }}>Telemedicine Infrastructure - Rural Areas</Text>
              <Text style={{ color: '#9A3412', fontSize: 12 }}>Expand high-speed internet to remaining 2% villages</Text>
            </View>
            <Text style={[styles.badge, { backgroundColor: '#EA580C', color: '#fff' }]}>High</Text>
          </View>
          <View style={[styles.itemRow, { backgroundColor: '#DBEAFE', borderColor: '#BFDBFE' }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#1E3A8A' }}>Budget Reallocation</Text>
              <Text style={{ color: '#1D4ED8', fontSize: 12 }}>Redirect unused infrastructure funds to emergency staffing</Text>
            </View>
            <Text style={[styles.badge, { backgroundColor: '#2563EB', color: '#fff' }]}>Medium</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: '#ECFDF5', borderColor: '#86EFAC' }]}>
        <Text style={[styles.cardTitle, { color: '#065F46' }]}>Success Stories & Best Practices</Text>
        <View style={{ gap: 4 }}>
          <Text style={{ color: '#047857' }}>• Tappa Block: 72% doctor availability via retention incentives</Text>
          <Text style={{ color: '#047857' }}>• Bhadson Block: 35% reduction in patient travel time</Text>
          <Text style={{ color: '#047857' }}>• Nabha Block: ASHA training improved outcomes by 28%</Text>
          <Text style={{ color: '#047857' }}>• District-wide: Telemedicine adoption up 31% CAGR</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, padding: 12, gap: 8 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#065F46' },
  muted: { color: '#6B7280', fontSize: 12 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  label: { fontSize: 12, color: '#374151', marginBottom: 4 },
  chip: { backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#059669' },
  chipText: { color: '#065F46', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiCard: { flexBasis: '47%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, paddingVertical: 16, alignItems: 'center', gap: 4 },
  kpiIcon: { fontSize: 24 },
  kpiNumber: { fontSize: 20, fontWeight: '700' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barLabel: { width: 110, fontSize: 12, color: '#374151' },
  bar: { height: 10, borderRadius: 6 },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 10, borderWidth: 1 },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' },
  // Enhanced District Performance Styles
  performanceHeader: {
    marginBottom: 16
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  legendText: {
    fontSize: 11,
    color: '#6B7280'
  },
  performanceContainer: {
    gap: 16
  },
  districtRow: {
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F7FEF7'
  },
  districtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#BBF7D0'
  },
  districtTitleSection: {
    flex: 1
  },
  districtName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 2
  },
  populationText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic'
  },
  overallScore: {
    alignItems: 'center'
  },
  overallScoreLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4
  },
  overallScoreValue: {
    fontSize: 24,
    fontWeight: '700'
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8
  },
  metricIcon: {
    fontSize: 16
  },
  metricLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    flex: 1
  },
  metricValueContainer: {
    alignItems: 'center',
    gap: 6
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center'
  },
  performanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600'
  },
});
