import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export function SymptomChecker({ user }) {
  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Body ache', 'Fatigue',
    'Nausea', 'Vomiting', 'Diarrhea', 'Stomach pain', 'Chest pain',
    'Difficulty breathing', 'Dizziness', 'Rash', 'Joint pain'
  ];

  const database = {
    'fever,headache,body ache': {
      condition: 'Viral Fever', risk: 'low',
      advice: 'Rest, drink plenty of fluids, and take paracetamol for fever. Consult doctor if symptoms persist for more than 3 days.',
      urgency: 'Monitor at home'
    },
    'cough,sore throat,fever': {
      condition: 'Upper Respiratory Infection', risk: 'low',
      advice: 'Gargle with warm salt water, take steam inhalation, and rest. Avoid cold foods.',
      urgency: 'Home care recommended'
    },
    'chest pain,difficulty breathing': {
      condition: 'Requires Immediate Medical Attention', risk: 'high',
      advice: 'Seek immediate medical care. These symptoms could indicate serious conditions.',
      urgency: 'Emergency - Visit hospital immediately'
    },
    'nausea,vomiting,stomach pain': {
      condition: 'Gastroenteritis', risk: 'medium',
      advice: 'Stay hydrated with ORS, eat light foods like rice and curd. Avoid spicy and oily foods.',
      urgency: 'Consult doctor if severe'
    },
    'dizziness,fatigue,headache': {
      condition: 'Possible Anemia or Dehydration', risk: 'medium',
      advice: 'Increase iron-rich foods, drink more water, and get adequate rest. Blood test recommended.',
      urgency: 'Schedule routine appointment'
    }
  };

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]));
  };

  const addCustom = () => {
    if (customSymptom && !selectedSymptoms.includes(customSymptom)) {
      setSelectedSymptoms((p) => [...p, customSymptom]);
      setCustomSymptom('');
    }
  };

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      const key = selectedSymptoms.map((s) => s.toLowerCase()).sort().join(',');
      let analysis = database[key];
      if (!analysis) {
        for (const [k, value] of Object.entries(database)) {
          const keySymptoms = k.split(',');
          const matchCount = keySymptoms.filter((s) => selectedSymptoms.some((sel) => sel.toLowerCase().includes(s))).length;
          if (matchCount >= 2) { analysis = value; break; }
        }
      }
      if (!analysis) {
        analysis = {
          condition: 'General Health Concern', risk: 'medium',
          advice: 'Your symptoms require medical evaluation. Please consult with a doctor for proper diagnosis.',
          urgency: 'Schedule appointment soon'
        };
      }
      if (severity === 'severe' || selectedSymptoms.includes('Chest pain') || selectedSymptoms.includes('Difficulty breathing')) {
        analysis.risk = 'high';
        analysis.urgency = 'Seek immediate medical attention';
      }
      setResult({ ...analysis, symptoms: selectedSymptoms, duration, severity, timestamp: new Date().toLocaleString() });
      setLoading(false);
    }, 1500);
  };

  const riskStyle = (risk) => {
    switch (risk) {
      case 'low': return { text: { color: '#065F46' }, box: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' } };
      case 'medium': return { text: { color: '#92400E' }, box: { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' } };
      case 'high': return { text: { color: '#991B1B' }, box: { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' } };
      default: return { text: { color: '#374151' }, box: { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' } };
    }
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>🧠 AI Symptom Checker</Text>
        <Text style={styles.muted}>This tool provides general guidance only and is not a substitute for professional medical advice.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Select your symptoms:</Text>
        <View style={styles.rowWrap}>
          {commonSymptoms.map((s) => (
            <TouchableOpacity key={s} onPress={() => toggleSymptom(s)} style={[styles.chip, selectedSymptoms.includes(s) && styles.chipActive]}>
              <Text style={[styles.chipText, selectedSymptoms.includes(s) && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Add other symptoms:</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput value={customSymptom} onChangeText={setCustomSymptom} placeholder="Describe other symptoms..." style={[styles.input, { flex: 1 }]} />
          <TouchableOpacity onPress={addCustom} style={styles.outlineButton}><Text style={styles.outlineButtonText}>Add</Text></TouchableOpacity>
        </View>
      </View>

      {selectedSymptoms.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.label}>Selected symptoms:</Text>
          <View style={styles.rowWrap}>
            {selectedSymptoms.map((s) => (
              <TouchableOpacity key={s} onPress={() => toggleSymptom(s)}>
                <Text style={[styles.badge, { backgroundColor: '#E5E7EB', color: '#111827' }]}>{s} ×</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.card}>
        <View style={styles.grid2}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>How long have you had these symptoms?</Text>
            <View style={styles.rowWrap}>
              {['few hours', '1 day', '2-3 days', '1 week', 'more than week'].map((d) => (
                <TouchableOpacity key={d} onPress={() => setDuration(d)} style={[styles.chip, duration === d && styles.chipActive]}>
                  <Text style={[styles.chipText, duration === d && styles.chipTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>How severe are your symptoms?</Text>
            <View style={styles.rowWrap}>
              {['mild', 'moderate', 'severe'].map((sev) => (
                <TouchableOpacity key={sev} onPress={() => setSeverity(sev)} style={[styles.chip, severity === sev && styles.chipActive]}>
                  <Text style={[styles.chipText, severity === sev && styles.chipTextActive]}>{sev}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={analyze} disabled={selectedSymptoms.length === 0 || loading} style={[styles.primaryButton, { backgroundColor: selectedSymptoms.length === 0 || loading ? '#93C5FD' : '#2563EB' }]}>
        {loading ? (<ActivityIndicator color="#fff" />) : (<Text style={styles.primaryButtonText}>Analyze Symptoms</Text>)}
      </TouchableOpacity>

      {result && (
        <View style={[styles.card, { borderWidth: 2, ...riskStyle(result.risk).box }]}>
          <Text style={[styles.cardTitle, riskStyle(result.risk).text]}>Analysis Result</Text>
          <View style={{ gap: 8 }}>
            <View>
              <Text style={styles.label}>Possible Condition:</Text>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{result.condition}</Text>
            </View>
            <View>
              <Text style={styles.label}>Recommendation:</Text>
              <Text>{result.advice}</Text>
            </View>
            <View>
              <Text style={styles.label}>Next Steps:</Text>
              <Text style={{ fontWeight: '600' }}>{result.urgency}</Text>
            </View>
            <View style={{ paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
              <Text style={styles.muted}>Analysis based on: {result.symptoms.join(', ')} | Duration: {result.duration} | Severity: {result.severity}</Text>
              <Text style={[styles.muted, { fontSize: 10, marginTop: 4 }]}>Generated on: {result.timestamp}</Text>
            </View>
            {result.risk === 'high' && (
              <View style={{ backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5', padding: 10, borderRadius: 10 }}>
                <Text style={{ color: '#B91C1C', fontWeight: '600' }}>⚠️ Important: This appears to be a serious condition requiring immediate medical attention.</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }]}>
        <Text style={styles.muted}>
          Medical Disclaimer: This symptom checker is for informational purposes only and does not replace professional medical advice.
          Always consult qualified healthcare providers for diagnosis and treatment.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 12, padding: 12, gap: 12 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#1E40AF' },
  muted: { color: '#6B7280', fontSize: 12 },
  label: { fontSize: 12, color: '#374151' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  outlineButton: { borderWidth: 1, borderColor: '#93C5FD', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  outlineButtonText: { color: '#1E40AF', fontWeight: '600' },
  chip: { backgroundColor: '#EFF6FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#2563EB' },
  chipText: { color: '#1E40AF', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden', fontSize: 12 },
  primaryButton: { borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
});
