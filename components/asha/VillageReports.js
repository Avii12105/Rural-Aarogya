import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export function VillageReports({ user }) {
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const healthMetrics = [
    { month: 'Aug', screenings: 45, referrals: 8, programs: 3 },
    { month: 'Sep', screenings: 52, referrals: 12, programs: 4 },
    { month: 'Oct', screenings: 38, referrals: 6, programs: 2 },
    { month: 'Nov', screenings: 41, referrals: 9, programs: 5 },
    { month: 'Dec', screenings: 23, referrals: 4, programs: 2 },
  ];

  const diseaseDistribution = [
    { name: 'Hypertension', value: 35, color: '#8884d8' },
    { name: 'Diabetes', value: 28, color: '#82ca9d' },
    { name: 'Respiratory', value: 20, color: '#ffc658' },
    { name: 'Malnutrition', value: 12, color: '#ff7300' },
    { name: 'Others', value: 5, color: '#8dd1e1' },
  ];

  const villageData = {
    Khera: { population: 1247, households: 312, childrenUnder5: 89, pregnantWomen: 23, elderlyAbove60: 156, lastScreening: '2024-12-18' },
    Sangatpura: { population: 892, households: 234, childrenUnder5: 67, pregnantWomen: 18, elderlyAbove60: 98, lastScreening: '2024-12-17' },
    Bhamola: { population: 1456, households: 398, childrenUnder5: 102, pregnantWomen: 31, elderlyAbove60: 189, lastScreening: '2024-12-19' },
  };

  const generateReport = () => {
    Alert.alert('Report', `Generating comprehensive health report for ${selectedVillage === 'all' ? 'all villages' : selectedVillage}`);
  };

  const actionItems = [
    {
      id: 1,
      title: 'Monthly Village Health Survey',
      description: 'Conduct door-to-door health screening in Khera village',
      dueDate: '2025-01-05',
      priority: 'high',
      category: 'screening',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Vaccination Camp Organization',
      description: 'Coordinate with PHC for child immunization drive',
      dueDate: '2025-01-10',
      priority: 'high',
      category: 'immunization',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Maternal Health Workshop',
      description: 'Educational session on prenatal care for expecting mothers',
      dueDate: '2025-01-15',
      priority: 'medium',
      category: 'education',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Quarterly Report Submission',
      description: 'Submit health metrics and village reports to district office',
      dueDate: '2025-01-20',
      priority: 'medium',
      category: 'administrative',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Medicine Inventory Check',
      description: 'Review and restock essential medicines and supplies',
      dueDate: '2025-01-25',
      priority: 'low',
      category: 'supplies',
      status: 'pending'
    },
    {
      id: 6,
      title: 'Community Health Meeting',
      description: 'Monthly meeting with village committee on health initiatives',
      dueDate: '2025-01-30',
      priority: 'medium',
      category: 'community',
      status: 'pending'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { bg: '#FEE2E2', border: '#FCA5A5', badge: '#DC2626' };
      case 'medium': return { bg: '#FEF3C7', border: '#FDE68A', badge: '#D97706' };
      case 'low': return { bg: '#D1FAE5', border: '#A7F3D0', badge: '#059669' };
      default: return { bg: '#F3F4F6', border: '#D1D5DB', badge: '#6B7280' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#6B7280';
      case 'in-progress': return '#2563EB';
      case 'completed': return '#059669';
      case 'overdue': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'screening': return '🩺';
      case 'immunization': return '💉';
      case 'education': return '📚';
      case 'administrative': return '📋';
      case 'supplies': return '📦';
      case 'community': return '👥';
      default: return '📌';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const markAsCompleted = (id) => {
    Alert.alert('Task Completed', `Marked task as completed!`);
  };

  const maxScreen = Math.max(...healthMetrics.map(h => h.screenings));
  const maxRef = Math.max(...healthMetrics.map(h => h.referrals));
  const maxProg = Math.max(...healthMetrics.map(h => h.programs));

  return (
    <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 24 }}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>📈 Village Health Reports & Analytics</Text>
            <Text style={styles.muted}>Monitor health trends and generate reports for better community health planning</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={generateReport}>
            <Text style={styles.primaryButtonText}>⬇ Generate Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={{ gap: 12 }}>
          <View>
            <Text style={styles.label}>Village</Text>
            <View style={styles.rowWrap}>
              {[
                { key: 'all', label: 'All Villages' },
                { key: 'Khera', label: 'Khera' },
                { key: 'Sangatpura', label: 'Sangatpura' },
                { key: 'Bhamola', label: 'Bhamola' },
              ].map((v) => (
                <TouchableOpacity key={v.key} onPress={() => setSelectedVillage(v.key)} style={[styles.chip, selectedVillage === v.key && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedVillage === v.key && styles.chipTextActive]}>{v.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.label}>Time Period</Text>
            <View style={styles.rowWrap}>
              {[
                { key: 'week', label: 'Last Week' },
                { key: 'month', label: 'Last Month' },
                { key: 'quarter', label: 'Last Quarter' },
                { key: 'year', label: 'Last Year' },
              ].map((p) => (
                <TouchableOpacity key={p.key} onPress={() => setSelectedPeriod(p.key)} style={[styles.chip, selectedPeriod === p.key && styles.chipActive]}>
                  <Text style={[styles.chipText, selectedPeriod === p.key && styles.chipTextActive]}>{p.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>🗓️ Custom Date Range</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.grid4}> 
        <View style={styles.kpiCard}>
          <Text style={[styles.kpiNumber, { color: '#EA580C' }]}>159</Text>
          <Text style={styles.muted}>Total Screenings</Text>
          <Text style={[styles.muted, { color: '#16A34A' }]}>+12% from last month</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={[styles.kpiNumber, { color: '#EF4444' }]}>39</Text>
          <Text style={styles.muted}>Hospital Referrals</Text>
          <Text style={[styles.muted, { color: '#CA8A04' }]}>+5% from last month</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={[styles.kpiNumber, { color: '#16A34A' }]}>16</Text>
          <Text style={styles.muted}>Health Programs</Text>
          <Text style={[styles.muted, { color: '#16A34A' }]}>+3 from last month</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={[styles.kpiNumber, { color: '#2563EB' }]}>2,841</Text>
          <Text style={styles.muted}>People Reached</Text>
          <Text style={[styles.muted, { color: '#16A34A' }]}>+8% coverage</Text>
        </View>
      </View>

      <View style={styles.grid2}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Activity Trends</Text>
          <View style={{ gap: 10 }}>
            {healthMetrics.map((m) => (
              <View key={m.month} style={{ gap: 4 }}>
                <Text style={{ fontWeight: '600' }}>{m.month}</Text>
                <View style={styles.barRow}>
                  <Text style={styles.barLabel}>Screenings</Text>
                  <View style={[styles.bar, { width: `${(m.screenings / maxScreen) * 100}%`, backgroundColor: '#F97316' }]} />
                </View>
                <View style={styles.barRow}>
                  <Text style={styles.barLabel}>Referrals</Text>
                  <View style={[styles.bar, { width: `${(m.referrals / maxRef) * 100}%`, backgroundColor: '#EF4444' }]} />
                </View>
                <View style={styles.barRow}>
                  <Text style={styles.barLabel}>Programs</Text>
                  <View style={[styles.bar, { width: `${(m.programs / maxProg) * 100}%`, backgroundColor: '#22C55E' }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Common Health Issues</Text>
          <View style={{ gap: 6 }}>
            {diseaseDistribution.map((d) => (
              <View key={d.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: d.color }} />
                <Text style={{ flex: 1 }}>{d.name}</Text>
                <Text style={styles.muted}>{d.value}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Village Demographics Overview</Text>
        <View style={styles.demographicsContainer}>
          {Object.entries(villageData).map(([village, data]) => (
            <View key={village} style={styles.villageRow}>
              <View style={styles.villageHeader}>
                <Text style={styles.villageName}>{village}</Text>
                <Text style={styles.lastScreeningDate}>
                  Last Screening: {new Date(data.lastScreening).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.demographicsRow}>
                <View style={styles.demoItem}>
                  <Text style={styles.demoValue}>{data.population.toLocaleString()}</Text>
                  <Text style={styles.demoLabel}>Total Population</Text>
                </View>
                <View style={styles.demoItem}>
                  <Text style={styles.demoValue}>{data.households}</Text>
                  <Text style={styles.demoLabel}>Households</Text>
                </View>
                <View style={styles.demoItem}>
                  <Text style={styles.demoValue}>{data.childrenUnder5}</Text>
                  <Text style={styles.demoLabel}>Children </Text>
                </View>
                <View style={styles.demoItem}>
                  <Text style={styles.demoValue}>{data.pregnantWomen}</Text>
                  <Text style={styles.demoLabel}>Pregnant Women</Text>
                </View>
                <View style={styles.demoItem}>
                  <Text style={styles.demoValue}>{data.elderlyAbove60}</Text>
                  <Text style={styles.demoLabel}>Elderly 60+</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }]}>
        <Text style={[styles.cardTitle, { color: '#9A3412' }]}>December 2024 Monthly Summary</Text>
        <View style={styles.grid2}>
          <View>
            <Text style={{ fontWeight: '600', marginBottom: 6 }}>Key Achievements</Text>
            {[
              'Conducted health screenings for 159 community members',
              'Organized 5 health awareness programs',
              'Successfully referred 39 high-risk cases to hospital',
              'Completed immunization drive covering 120 children',
              'Distributed iron tablets to 45 pregnant women',
            ].map((t, i) => (
              <Text key={i} style={[styles.muted, { color: '#9A3412' }]}>• {t}</Text>
            ))}
          </View>
          <View>
            <Text style={{ fontWeight: '600', marginBottom: 6 }}>Areas for Improvement</Text>
            {[
              'Increase diabetes screening in elderly population',
              'Enhance maternal nutrition counseling',
              'Improve follow-up rate for referred patients',
              'Expand family planning awareness programs',
              'Address seasonal disease prevention',
            ].map((t, i) => (
              <Text key={i} style={[styles.muted, { color: '#9A3412' }]}>• {t}</Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.actionItemsHeader}>
          <Text style={[styles.cardTitle, { color: '#9A3412' }]}>Upcoming Action Items</Text>
          <TouchableOpacity style={styles.addTaskButton}>
            <Text style={styles.addTaskText}>+ Add Task</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionItemsContainer}>
          {actionItems.slice(0, 5).map((item) => {
            const priorityColors = getPriorityColor(item.priority);
            const daysUntil = getDaysUntilDue(item.dueDate);
            const isOverdue = daysUntil < 0;
            const isUrgent = daysUntil <= 3 && daysUntil >= 0;
            
            return (
              <View 
                key={item.id} 
                style={[
                  styles.enhancedItemRow, 
                  { 
                    backgroundColor: priorityColors.bg, 
                    borderColor: priorityColors.border,
                    borderLeftWidth: 4,
                    borderLeftColor: priorityColors.badge
                  }
                ]}
              >
                <View style={styles.actionItemContent}>
                  <View style={styles.actionItemTop}>
                    <View style={styles.actionItemTitleRow}>
                      <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
                      <Text style={styles.actionItemTitle}>{item.title}</Text>
                      <View style={[styles.priorityBadge, { backgroundColor: priorityColors.badge }]}>
                        <Text style={styles.priorityText}>{item.priority.toUpperCase()}</Text>
                      </View>
                    </View>
                    <Text style={styles.actionItemDescription}>{item.description}</Text>
                  </View>
                  
                  <View style={styles.actionItemBottom}>
                    <View style={styles.dueDateSection}>
                      <Text style={[
                        styles.dueDateText,
                        { color: isOverdue ? '#DC2626' : isUrgent ? '#D97706' : '#6B7280' }
                      ]}>
                        {isOverdue ? `Overdue by ${Math.abs(daysUntil)} days` : 
                         daysUntil === 0 ? 'Due Today!' :
                         daysUntil === 1 ? 'Due Tomorrow' :
                         `Due in ${daysUntil} days`}
                      </Text>
                      <Text style={styles.formattedDate}>{formatDate(item.dueDate)}</Text>
                    </View>
                    
                    <View style={styles.actionItemButtons}>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                        <Text style={styles.statusText}>{item.status.replace('-', ' ').toUpperCase()}</Text>
                      </View>
                      {item.status !== 'completed' && (
                        <TouchableOpacity 
                          style={styles.completeButton}
                          onPress={() => markAsCompleted(item.id)}
                        >
                          <Text style={styles.completeButtonText}>✓</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Tasks ({actionItems.length})</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FFE4CC', borderRadius: 12, padding: 12, gap: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: '600', color: '#9A3412' },
  muted: { color: '#6B7280', fontSize: 12 },
  primaryButton: { backgroundColor: '#EA580C', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  primaryButtonText: { color: 'white', fontWeight: '600' },
  outlineButton: { borderWidth: 1, borderColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  outlineButtonText: { color: '#9A3412', fontWeight: '600' },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#FFF1E6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#EA580C' },
  chipText: { color: '#9A3412', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiCard: { flexBasis: '47%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#FFE4CC', borderRadius: 12, paddingVertical: 16, alignItems: 'center', gap: 4 },
  kpiNumber: { fontSize: 20, fontWeight: '700' },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barLabel: { width: 90, fontSize: 12, color: '#374151' },
  bar: { height: 10, borderRadius: 6 },
  demographicsContainer: { gap: 16 },
  villageRow: { 
    borderWidth: 1, 
    borderColor: '#FED7AA', 
    borderRadius: 10, 
    padding: 12,
    backgroundColor: '#FFFBF5'
  },
  villageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FED7AA'
  },
  villageName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9A3412'
  },
  lastScreeningDate: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic'
  },
  demographicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8
  },
  demoItem: {
    alignItems: 'center',
    minWidth: '18%',
    flex: 1
  },
  demoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EA580C',
    marginBottom: 2
  },
  demoLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 12
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  value: { fontWeight: '600' },
  // Enhanced Action Items Styles
  actionItemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  addTaskButton: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  addTaskText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600'
  },
  actionItemsContainer: {
    gap: 12
  },
  enhancedItemRow: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 0,
    overflow: 'hidden'
  },
  actionItemContent: {
    padding: 12
  },
  actionItemTop: {
    marginBottom: 12
  },
  actionItemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8
  },
  categoryIcon: {
    fontSize: 16
  },
  actionItemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937'
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  priorityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700'
  },
  actionItemDescription: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18
  },
  actionItemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dueDateSection: {
    flex: 1
  },
  dueDateText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2
  },
  formattedDate: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  actionItemButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600'
  },
  completeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center'
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700'
  },
  viewAllButton: {
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  viewAllText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600'
  },
  // Legacy styles (keeping for compatibility)
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 10, borderWidth: 1 },
  badge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999 },
});
