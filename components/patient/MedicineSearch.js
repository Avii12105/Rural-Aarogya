import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { searchMedicines } from '../../data/dummyData';

export function MedicineSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Use dummy data for medicine search
      const medicines = searchMedicines(searchQuery);
      
      // Add mock pharmacy info and stock data
      const medicinesWithMockData = medicines.map(medicine => ({
        ...medicine,
        stock: Math.floor(Math.random() * 50) + 5, // Random stock between 5-55
        type: medicine.type,
        description: medicine.description
      }));
      
      setSearchResults(medicinesWithMockData);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (stock) => {
    if (stock > 10) return { status: 'In Stock', color: '#16A34A', icon: '✅' };
    if (stock > 0) return { status: 'Low Stock', color: '#CA8A04', icon: '⚠️' };
    return { status: 'Out of Stock', color: '#DC2626', icon: '❌' };
  };

  const common = ['Paracetamol', 'Crocin', 'Aspirin', 'Ibuprofen', 'Cough Syrup', 'Antibiotics', 'Vitamin D', 'Iron Tablets'];

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={styles.headerText}>🔎 Medicine Availability Search</Text>
        <Text style={styles.muted}>Find medicines available at local pharmacies in real-time</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for medicine (e.g., Paracetamol)"
            onSubmitEditing={handleSearch}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity onPress={handleSearch} disabled={loading || !searchQuery.trim()} style={[styles.primaryButton, { backgroundColor: loading || !searchQuery.trim() ? '#93C5FD' : '#2563EB' }]}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Search</Text>}
          </TouchableOpacity>
        </View>
      </View>

      {searchResults.length > 0 && (
        <View style={{ gap: 12 }}>
          <Text style={{ fontWeight: '600', color: '#111827' }}>Search Results for "{searchQuery}"</Text>
          {searchResults.map((medicine, index) => {
            const stockInfo = getStockStatus(medicine.stock);
            return (
              <View key={index} style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                      <Text style={{ fontSize: 16, fontWeight: '600' }}>{medicine.name}</Text>
                      <Text style={[styles.badge, { backgroundColor: '#FFFFFF', borderColor: '#D1D5DB', color: '#111827' }]}>{medicine.type}</Text>
                      <Text style={{ color: stockInfo.color }}>
                        {stockInfo.icon} {stockInfo.status}
                      </Text>
                    </View>
                    <Text style={styles.muted}>{medicine.description}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.muted}>Price: <Text style={{ fontWeight: '700', color: '#111827' }}>₹{medicine.price}</Text></Text>
                      <Text style={styles.muted}>Stock Available: <Text style={{ fontWeight: '700', color: '#111827' }}>{medicine.stock} units</Text></Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>₹{medicine.price}</Text>
                    <Text style={styles.muted}>{medicine.stock} in stock</Text>
                  </View>
                </View>

                <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                      <Text style={styles.muted}>📍 Pharmacy Near Civil Hospital</Text>
                      <Text style={styles.muted}>📞 +91 98765 43210</Text>
                      <Text style={styles.muted}>⏰ 9 AM - 9 PM</Text>
                    </View>
                    {medicine.stock > 0 && (
                      <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#16A34A' }]}>
                        <Text style={styles.primaryButtonText}>Reserve Medicine</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {searchQuery && searchResults.length === 0 && !loading && (
        <View style={[styles.card, { alignItems: 'center' }]}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>🔎</Text>
          <Text style={{ fontWeight: '600', color: '#6B7280' }}>No medicines found</Text>
          <Text style={styles.muted}>Try a different name or check the spelling.</Text>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
        <Text style={[styles.cardTitle, { color: '#1E40AF' }]}>Commonly Searched Medicines</Text>
        <View style={styles.grid4}>
          {common.map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => { setSearchQuery(m); setTimeout(handleSearch, 100); }}
              style={styles.outlineButton}
            >
              <Text style={styles.outlineButtonText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}>
        <Text style={{ fontWeight: '600', color: '#92400E', marginBottom: 6 }}>Important Information</Text>
        <View style={{ gap: 4 }}>
          <Text style={[styles.muted, { color: '#92400E' }]}>• Availability is updated in real-time</Text>
          <Text style={[styles.muted, { color: '#92400E' }]}>• Prices may vary between pharmacies</Text>
          <Text style={[styles.muted, { color: '#92400E' }]}>• Reserve to ensure availability when you visit</Text>
          <Text style={[styles.muted, { color: '#92400E' }]}>• Always carry your prescription when buying medicines</Text>
          <Text style={[styles.muted, { color: '#92400E' }]}>• Call the pharmacy to confirm before traveling</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 12, padding: 12, gap: 12 },
  headerText: { fontSize: 16, fontWeight: '600', color: '#1E40AF' },
  muted: { color: '#6B7280', fontSize: 12 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  primaryButton: { borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden', fontSize: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  outlineButton: { borderWidth: 1, borderColor: '#93C5FD', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  outlineButtonText: { color: '#1E40AF', fontWeight: '600' },
});
