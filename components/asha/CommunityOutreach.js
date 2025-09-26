import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export function CommunityOutreach({ user }) {
  const [activeView, setActiveView] = useState('programs');
  const [newProgram, setNewProgram] = useState({
    title: '',
    village: '',
    date: '',
    type: '',
    description: '',
    targetBeneficiaries: ''
  });

  const [programs] = useState([
    {
      id: 1,
      title: 'Maternal Health Awareness',
      village: 'Khera',
      date: '2024-12-20',
      type: 'health_education',
      status: 'scheduled',
      beneficiaries: 25,
      description: 'Antenatal care and nutrition awareness session'
    },
    {
      id: 2,
      title: 'Child Immunization Drive',
      village: 'Sangatpura',
      date: '2024-12-22',
      type: 'immunization',
      status: 'scheduled',
      beneficiaries: 40,
      description: 'Routine immunization for children 0-5 years'
    },
    {
      id: 3,
      title: 'Hygiene and Sanitation Workshop',
      village: 'Bhamola',
      date: '2024-12-18',
      type: 'health_education',
      status: 'completed',
      beneficiaries: 60,
      description: 'Hand washing and clean water practices'
    }
  ]);

  const handleCreateProgram = () => {
    // In RN, use Alert instead of browser alert()
    Alert.alert('Success', 'Program scheduled successfully!');
    setNewProgram({ title: '', village: '', date: '', type: '', description: '', targetBeneficiaries: '' });
    setActiveView('programs');
  };

  const statusStyle = (status) => {
    switch (status) {
      case 'scheduled': return [styles.badge, { backgroundColor: '#DBEAFE' }];
      case 'in-progress': return [styles.badge, { backgroundColor: '#FEF3C7' }];
      case 'completed': return [styles.badge, { backgroundColor: '#DCFCE7' }];
      case 'cancelled': return [styles.badge, { backgroundColor: '#FEE2E2' }];
      default: return [styles.badge, { backgroundColor: '#F3F4F6' }];
    }
  };

  const typeStyle = (type) => {
    switch (type) {
      case 'immunization': return [styles.badge, { backgroundColor: '#E9D5FF' }];
      case 'health_education': return [styles.badge, { backgroundColor: '#FFEDD5' }];
      case 'screening': return [styles.badge, { backgroundColor: '#DCFCE7' }];
      case 'nutrition': return [styles.badge, { backgroundColor: '#DBEAFE' }];
      default: return [styles.badge, { backgroundColor: '#F3F4F6' }];
    }
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 24 }}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>👥 Community Outreach Programs</Text>
            <Text style={styles.muted}>Plan and manage village health programs and awareness campaigns</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setActiveView('create')}>
            <Text style={styles.primaryButtonText}>＋ New Program</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeView === 'create' ? (
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.cardTitle}>Schedule New Outreach Program</Text>
            <TouchableOpacity style={styles.outlineButton} onPress={() => setActiveView('programs')}>
              <Text style={styles.outlineButtonText}>Back to Programs</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12 }}>
            <View>
              <Text style={styles.label}>Program Title *</Text>
              <TextInput
                value={newProgram.title}
                onChangeText={(t) => setNewProgram((p) => ({ ...p, title: t }))}
                placeholder="e.g., Maternal Health Awareness"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Village *</Text>
              <TextInput
                value={newProgram.village}
                onChangeText={(t) => setNewProgram((p) => ({ ...p, village: t }))}
                placeholder="e.g., Khera"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Date *</Text>
              <TextInput
                value={newProgram.date}
                onChangeText={(t) => setNewProgram((p) => ({ ...p, date: t }))}
                placeholder="YYYY-MM-DD"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Program Type *</Text>
              <TextInput
                value={newProgram.type}
                onChangeText={(t) => setNewProgram((p) => ({ ...p, type: t }))}
                placeholder="health_education / immunization / screening / nutrition"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Target Beneficiaries</Text>
              <TextInput
                value={newProgram.targetBeneficiaries}
                onChangeText={(t) => setNewProgram((p) => ({ ...p, targetBeneficiaries: t }))}
                placeholder="Expected number of participants"
                style={styles.input}
                keyboardType="number-pad"
              />
            </View>

            <View>
              <Text style={styles.label}>Program Description *</Text>
              <TextInput
                value={newProgram.description}
                onChangeText={(t) => setNewProgram((p) => ({ ...p, description: t }))}
                placeholder="Describe the program objectives, activities, and target audience..."
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                multiline
              />
            </View>

            <TouchableOpacity style={[styles.primaryButton, { alignSelf: 'stretch' }]} onPress={handleCreateProgram}>
              <Text style={styles.primaryButtonText}>Schedule Program</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={{ gap: 12 }}>
            {programs.map((program) => (
              <View key={program.id} style={styles.card}>
                <View style={{ gap: 6 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{program.title}</Text>
                    <View style={statusStyle(program.status)}>
                      <Text style={styles.badgeText}>{program.status}</Text>
                    </View>
                    <View style={typeStyle(program.type)}>
                      <Text style={styles.badgeText}>{program.type.replace('_', ' ')}</Text>
                    </View>
                  </View>

                  <View style={styles.metaGrid}>
                    <Text style={styles.muted}>📍 Village {program.village}</Text>
                    <Text style={styles.muted}>🗓️ {new Date(program.date).toLocaleDateString('en-IN')}</Text>
                    <Text style={styles.muted}>👥 {program.beneficiaries} beneficiaries</Text>
                  </View>

                  <Text style={styles.muted}>{program.description}</Text>

                  <View style={{ alignItems: 'flex-start' }}>
                    {program.status === 'scheduled' ? (
                      <TouchableOpacity style={[styles.successButton, { paddingHorizontal: 12, paddingVertical: 8 }]} onPress={() => Alert.alert('Marked', 'Program marked complete')}>
                        <Text style={styles.successButtonText}>✓ Mark Complete</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={[styles.badge, { backgroundColor: '#E5E7EB' }]}>
                        <Text style={[styles.badgeText, { color: '#111827' }]}>Completed</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }]}>
            <Text style={[styles.cardTitle, { color: '#9A3412' }]}>Outreach Summary</Text>
            <View style={styles.statsGrid4}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#9A3412' }]}>{programs.filter(p => p.status === 'scheduled').length}</Text>
                <Text style={styles.muted}>Scheduled</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#15803D' }]}>{programs.filter(p => p.status === 'completed').length}</Text>
                <Text style={styles.muted}>Completed</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#1D4ED8' }]}>{programs.reduce((sum, p) => sum + p.beneficiaries, 0)}</Text>
                <Text style={styles.muted}>Total Beneficiaries</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.statNumber, { color: '#7E22CE' }]}>{new Set(programs.map(p => p.village)).size}</Text>
                <Text style={styles.muted}>Villages Covered</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={[styles.cardTitle, { color: '#9A3412' }]}>Program Templates</Text>
            <View style={styles.templatesGrid}>
              {[
                { title: 'Maternal Health Package', desc: 'Comprehensive antenatal care, nutrition counseling, and delivery preparation' },
                { title: 'Child Health & Nutrition', desc: 'Growth monitoring, immunization tracking, and nutritional assessment' },
                { title: 'Family Planning', desc: 'Contraceptive counseling and reproductive health education' },
                { title: 'Elderly Care', desc: 'Chronic disease management and mobility support' },
              ].map((tpl, i) => (
                <View key={i} style={styles.templateCard}>
                  <Text style={{ fontWeight: '600', marginBottom: 6 }}>{tpl.title}</Text>
                  <Text style={[styles.muted, { marginBottom: 8 }]}>{tpl.desc}</Text>
                  <TouchableOpacity style={styles.outlineButton} onPress={() => Alert.alert('Template', 'Template applied')}>
                    <Text style={styles.outlineButtonText}>Use Template</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFE4CC',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: '600', color: '#9A3412' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  muted: { color: '#6B7280', fontSize: 12 },
  primaryButton: { backgroundColor: '#EA580C', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  primaryButtonText: { color: 'white', fontWeight: '600' },
  outlineButton: { borderWidth: 1, borderColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  outlineButtonText: { color: '#9A3412', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  badge: { borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  successButton: { backgroundColor: '#16A34A', borderRadius: 8 },
  successButtonText: { color: 'white', fontWeight: '600' },
  statsGrid4: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statNumber: { fontSize: 22, fontWeight: '700' },
  templatesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  templateCard: { flexBasis: '48%', borderWidth: 1, borderColor: '#FED7AA', borderRadius: 10, padding: 12 },
});
