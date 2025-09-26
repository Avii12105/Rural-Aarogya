import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export function PolicyManagement({ user }) {
  const [activeView, setActiveView] = useState('policies');

  const policies = [
    { id: 1, title: 'Rural Telemedicine Implementation Guidelines', category: 'Digital Health', status: 'active', version: '2.1', lastUpdated: '2024-11-15', effectiveDate: '2024-12-01', description: 'Comprehensive guidelines for implementing telemedicine services in rural Punjab' },
    { id: 2, title: 'ASHA Worker Incentive Structure', category: 'Human Resources', status: 'active', version: '1.3', lastUpdated: '2024-10-20', effectiveDate: '2024-11-01', description: 'Updated compensation and incentive framework for community health workers' },
    { id: 3, title: 'Emergency Medical Response Protocol', category: 'Emergency Care', status: 'draft', version: '3.0', lastUpdated: '2024-12-10', effectiveDate: '2025-01-15', description: 'Standardized emergency response procedures for rural healthcare facilities' },
    { id: 4, title: 'Medicine Procurement & Distribution Policy', category: 'Supply Chain', status: 'under_review', version: '1.8', lastUpdated: '2024-12-05', effectiveDate: '2025-02-01', description: 'Guidelines for efficient medicine procurement and distribution to rural areas' },
  ];

  const guidelines = [
    { id: 1, title: 'COVID-19 Prevention in Rural Areas', type: 'Health Guidelines', audience: 'Healthcare Workers', lastUpdated: '2024-11-30' },
    { id: 2, title: 'Maternal Health Best Practices', type: 'Clinical Guidelines', audience: 'Doctors & ASHA Workers', lastUpdated: '2024-10-15' },
    { id: 3, title: 'Digital Health Record Management', type: 'Technical Guidelines', audience: 'IT & Medical Staff', lastUpdated: '2024-12-01' },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case 'active': return [styles.badge, { backgroundColor: '#DCFCE7', color: '#065F46' }];
      case 'draft': return [styles.badge, { backgroundColor: '#FEF3C7', color: '#92400E' }];
      case 'under_review': return [styles.badge, { backgroundColor: '#DBEAFE', color: '#1E3A8A' }];
      case 'archived': return [styles.badge, { backgroundColor: '#F3F4F6', color: '#111827' }];
      default: return [styles.badge, { backgroundColor: '#F3F4F6', color: '#111827' }];
    }
  };

  const categoryStyle = (category) => {
    const map = {
      'Digital Health': ['#DBEAFE', '#1E3A8A'],
      'Human Resources': ['#EDE9FE', '#5B21B6'],
      'Emergency Care': ['#FEE2E2', '#991B1B'],
      'Supply Chain': ['#FFEDD5', '#9A3412'],
    };
    const [bg, fg] = map[category] || ['#F3F4F6', '#111827'];
    return [styles.badge, { backgroundColor: bg, color: fg }];
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>📄 Health Policy & Guidelines Management</Text>
            <Text style={styles.muted}>Manage state health policies, guidelines, and regulatory frameworks</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={[styles.tabBtn, activeView === 'policies' && styles.tabBtnActive]} onPress={() => setActiveView('policies')}>
              <Text style={[styles.tabBtnText, activeView === 'policies' && styles.tabBtnTextActive]}>Policies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabBtn, activeView === 'guidelines' && styles.tabBtnActive]} onPress={() => setActiveView('guidelines')}>
              <Text style={[styles.tabBtnText, activeView === 'guidelines' && styles.tabBtnTextActive]}>Guidelines</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('New Policy', 'Create policy flow')}>
              <Text style={styles.primaryButtonText}>＋ New Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {activeView === 'policies' ? (
        <>
          <View style={styles.grid4}> 
            <View style={styles.kpiCard}><Text style={[styles.kpiNumber, { color: '#16A34A' }]}>{policies.filter(p => p.status === 'active').length}</Text><Text style={styles.muted}>Active Policies</Text></View>
            <View style={styles.kpiCard}><Text style={[styles.kpiNumber, { color: '#CA8A04' }]}>{policies.filter(p => p.status === 'draft').length}</Text><Text style={styles.muted}>Draft Policies</Text></View>
            <View style={styles.kpiCard}><Text style={[styles.kpiNumber, { color: '#2563EB' }]}>{policies.filter(p => p.status === 'under_review').length}</Text><Text style={styles.muted}>Under Review</Text></View>
            <View style={styles.kpiCard}><Text style={[styles.kpiNumber, { color: '#7C3AED' }]}>47</Text><Text style={styles.muted}>Total Policies</Text></View>
          </View>

          <View style={{ gap: 12 }}>
            {policies.map((policy) => (
              <View key={policy.id} style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600' }}>{policy.title}</Text>
                      <Text style={statusStyle(policy.status)}>{policy.status.replace('_', ' ')}</Text>
                      <Text style={categoryStyle(policy.category)}>{policy.category}</Text>
                    </View>
                    <Text style={styles.muted}>{policy.description}</Text>
                    <View style={styles.metaGrid4}>
                      <Text><Text style={styles.metaLabel}>Version:</Text> {policy.version}</Text>
                      <Text><Text style={styles.metaLabel}>Last Updated:</Text> {new Date(policy.lastUpdated).toLocaleDateString()}</Text>
                      <Text><Text style={styles.metaLabel}>Effective Date:</Text> {new Date(policy.effectiveDate).toLocaleDateString()}</Text>
                      <Text><Text style={styles.metaLabel}>Policy ID:</Text> PH-{String(policy.id).padStart(3, '0')}</Text>
                    </View>
                  </View>
                  <View style={{ gap: 8, marginLeft: 8, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.outlineButton}><Text style={styles.outlineButtonText}>👁️ View</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.outlineButton}><Text style={styles.outlineButtonText}>⬇ Download</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: '#ECFDF5', borderColor: '#86EFAC' }]}>
            <Text style={[styles.cardTitle, { color: '#065F46' }]}>Recent Policy Updates</Text>
            <View style={{ gap: 6 }}>
              <View style={styles.activityRow}><Text>Rural Telemedicine Implementation Guidelines v2.1 published</Text><Text style={styles.muted}>Nov 15, 2024</Text></View>
              <View style={styles.activityRow}><Text>Emergency Medical Response Protocol v3.0 submitted for review</Text><Text style={styles.muted}>Dec 10, 2024</Text></View>
              <View style={styles.activityRow}><Text>Medicine Procurement Policy v1.8 under stakeholder review</Text><Text style={styles.muted}>Dec 5, 2024</Text></View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{ gap: 12 }}>
            {guidelines.map((g) => (
              <View key={g.id} style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600' }}>{g.title}</Text>
                      <Text style={[styles.badge, { backgroundColor: '#E5E7EB', color: '#111827' }]}>{g.type}</Text>
                    </View>
                    <View style={styles.metaGrid2}>
                      <Text><Text style={styles.metaLabel}>Target Audience:</Text> {g.audience}</Text>
                      <Text><Text style={styles.metaLabel}>Last Updated:</Text> {new Date(g.lastUpdated).toLocaleDateString()}</Text>
                    </View>
                  </View>
                  <View style={{ gap: 8, marginLeft: 8, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.outlineButton}><Text style={styles.outlineButtonText}>👁️ View</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.outlineButton}><Text style={styles.outlineButtonText}>⬇ Download</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
            <Text style={[styles.cardTitle, { color: '#1E40AF' }]}>Upcoming Guidelines & Training</Text>
            <View style={{ gap: 8 }}>
              <View style={[styles.itemRow, { backgroundColor: '#DBEAFE', borderColor: '#BFDBFE' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', color: '#1E3A8A' }}>Mental Health Support in Rural Areas</Text>
                  <Text style={{ color: '#1D4ED8', fontSize: 12 }}>Comprehensive guide for addressing mental health challenges</Text>
                </View>
                <Text style={[styles.badge, { backgroundColor: '#2563EB', color: '#fff' }]}>Jan 2025</Text>
              </View>
              <View style={[styles.itemRow, { backgroundColor: '#EDE9FE', borderColor: '#DDD6FE' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', color: '#5B21B6' }}>AI-Assisted Diagnosis Guidelines</Text>
                  <Text style={{ color: '#6D28D9', fontSize: 12 }}>Framework for integrating AI tools in rural healthcare</Text>
                </View>
                <Text style={[styles.badge, { backgroundColor: '#7C3AED', color: '#fff' }]}>Feb 2025</Text>
              </View>
            </View>
          </View>
        </>
      )}

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: '#065F46' }]}>Policy Development Pipeline</Text>
        <View style={styles.grid5}>
          {[{t:'Research', c:'#FEF3C7', tc:'#92400E', n:3},{t:'Drafting', c:'#DBEAFE', tc:'#1E3A8A', n:2},{t:'Review', c:'#EDE9FE', tc:'#5B21B6', n:1},{t:'Approval', c:'#FFEDD5', tc:'#9A3412', n:1},{t:'Implementation', c:'#ECFDF5', tc:'#065F46', n:2}].map((s,i)=> (
            <View key={i} style={[styles.stageCard, { backgroundColor: s.c }] }>
              <Text style={{ fontWeight: '600', color: s.tc }}>{s.t}</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: s.tc }}>{s.n}</Text>
              <Text style={styles.muted}>policies</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: '#065F46' }]}>Quick Actions</Text>
        <View style={styles.grid3}> 
          <TouchableOpacity style={styles.outlineButtonBig}><Text>📄 Create Policy Template</Text></TouchableOpacity>
          <TouchableOpacity style={styles.outlineButtonBig}><Text>📅 Schedule Review Meeting</Text></TouchableOpacity>
          <TouchableOpacity style={styles.outlineButtonBig}><Text>⬇ Policy Archive Report</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, padding: 12, gap: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: '600', color: '#065F46' },
  muted: { color: '#6B7280', fontSize: 12 },
  tabBtn: { backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  tabBtnActive: { backgroundColor: '#059669' },
  tabBtnText: { color: '#065F46', fontWeight: '600' },
  tabBtnTextActive: { color: '#FFFFFF' },
  primaryButton: { backgroundColor: '#059669', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '600' },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiCard: { flexBasis: '47%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBF7D0', borderRadius: 12, paddingVertical: 16, alignItems: 'center', gap: 4 },
  kpiNumber: { fontSize: 22, fontWeight: '700' },
  metaGrid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6 },
  metaGrid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6 },
  metaLabel: { fontWeight: '600', color: '#374151' },
  outlineButton: { borderWidth: 1, borderColor: '#10B981', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  outlineButtonText: { color: '#065F46', fontWeight: '600' },
  activityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8, overflow: 'hidden' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  grid5: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stageCard: { flexBasis: '31%', borderRadius: 10, padding: 12, alignItems: 'center', gap: 4 },
  grid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  outlineButtonBig: { borderWidth: 1, borderColor: '#86EFAC', borderRadius: 10, padding: 16, alignItems: 'center', flexBasis: '31%' },
});
