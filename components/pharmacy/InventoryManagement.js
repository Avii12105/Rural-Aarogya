import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export function InventoryManagement({ user }) {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({ name: '', type: '', price: '', stock: '', description: '', expiryDate: '', manufacturer: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initialMedicines = [
      { id: 1, name: 'Paracetamol 500mg', type: 'Tablet', price: 2.5, stock: 12, description: 'Pain relief and fever reducer', expiryDate: '2025-06-15', manufacturer: 'Generic Pharma' },
      { id: 2, name: 'Crocin 650mg', type: 'Tablet', price: 3.2, stock: 23, description: 'Fast relief from headache and fever', expiryDate: '2025-03-20', manufacturer: 'GSK' },
      { id: 3, name: 'ORS Packets', type: 'Powder', price: 5.0, stock: 45, description: 'Oral rehydration solution', expiryDate: '2026-01-10', manufacturer: 'Cipla' },
      { id: 4, name: 'Amoxicillin 500mg', type: 'Capsule', price: 8.5, stock: 78, description: 'Antibiotic for bacterial infections', expiryDate: '2025-09-30', manufacturer: 'Sun Pharma' },
      { id: 5, name: 'Cough Syrup', type: 'Syrup', price: 45.0, stock: 34, description: 'Relief from dry and wet cough', expiryDate: '2025-08-25', manufacturer: 'Dabur' },
    ];
    console.log('Pharmacy Inventory initialized with', initialMedicines.length, 'medicines');
    setMedicines(initialMedicines);
  }, []);

  const filteredMedicines = medicines.filter((m) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(q) || m.manufacturer.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || m.type === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stockBadge = (stock) => {
    if (stock <= 10) return ['Critical', { backgroundColor: '#FEE2E2', color: '#991B1B' }];
    if (stock <= 25) return ['Low', { backgroundColor: '#FEF3C7', color: '#92400E' }];
    if (stock <= 50) return ['Medium', { backgroundColor: '#DBEAFE', color: '#1E3A8A' }];
    return ['Good', { backgroundColor: '#DCFCE7', color: '#065F46' }];
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditData({ ...medicine });
  };

  const handleSave = async (medicineId) => {
    try {
      setSaving(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update medicine in dummy data
      setMedicines((prev) => prev.map((med) => (med.id === medicineId ? { ...editData } : med)));
      setEditingId(null);
      setEditData({});
      console.log('Medicine updated:', editData);
      Alert.alert('Success', 'Medicine updated successfully!');
    } catch (e) {
      console.error('Failed to update medicine:', e);
      Alert.alert('Error', 'Failed to update medicine. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddMedicine = async () => {
    try {
      // Validate required fields
      if (!newMedicine.name || !newMedicine.type || !newMedicine.price || !newMedicine.stock || !newMedicine.expiryDate || !newMedicine.manufacturer) {
        Alert.alert('Missing Fields', 'Please fill in all required fields.');
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add medicine to dummy data
      const medicineWithId = { 
        ...newMedicine, 
        id: Date.now(), 
        price: parseFloat(newMedicine.price), 
        stock: parseInt(newMedicine.stock) 
      };
      
      setMedicines((prev) => [...prev, medicineWithId]);
      setNewMedicine({ name: '', type: '', price: '', stock: '', description: '', expiryDate: '', manufacturer: '' });
      setShowAddForm(false);
      console.log('Medicine added:', medicineWithId);
      Alert.alert('Success', 'Medicine added successfully!');
    } catch (e) {
      console.error('Failed to add medicine:', e);
      Alert.alert('Error', 'Failed to add medicine. Please try again.');
    }
  };

  const types = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Powder', 'Cream'];

  return (
    <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: '#6B21A8' }]}>📦 Medicine Inventory Management</Text>
        <Text style={styles.muted}>Manage stock levels, prices, and medicine information</Text>
        <TouchableOpacity onPress={() => setShowAddForm((s) => !s)} style={[styles.primaryButton, { backgroundColor: '#7C3AED', alignSelf: 'flex-start' }]}>
          <Text style={styles.primaryButtonText}>＋ Add Medicine</Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add New Medicine</Text>
          <View style={styles.grid2}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Medicine Name *</Text>
              <TextInput value={newMedicine.name} onChangeText={(t) => setNewMedicine((p) => ({ ...p, name: t }))} style={styles.input} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Type *</Text>
              <View style={styles.rowWrap}>
                {types.map((t) => (
                  <TouchableOpacity key={t} onPress={() => setNewMedicine((p) => ({ ...p, type: t }))} style={[styles.chip, newMedicine.type === t && styles.chipActive]}>
                    <Text style={[styles.chipText, newMedicine.type === t && styles.chipTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Price (₹) *</Text>
              <TextInput value={String(newMedicine.price)} onChangeText={(t) => setNewMedicine((p) => ({ ...p, price: t }))} keyboardType="decimal-pad" style={styles.input} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Stock Quantity *</Text>
              <TextInput value={String(newMedicine.stock)} onChangeText={(t) => setNewMedicine((p) => ({ ...p, stock: t }))} keyboardType="number-pad" style={styles.input} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Expiry Date (YYYY-MM-DD) *</Text>
              <TextInput value={newMedicine.expiryDate} onChangeText={(t) => setNewMedicine((p) => ({ ...p, expiryDate: t }))} placeholder="YYYY-MM-DD" style={styles.input} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Manufacturer *</Text>
              <TextInput value={newMedicine.manufacturer} onChangeText={(t) => setNewMedicine((p) => ({ ...p, manufacturer: t }))} style={styles.input} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity onPress={handleAddMedicine} style={[styles.primaryButton, { backgroundColor: '#7C3AED' }]}>
              <Text style={styles.primaryButtonText}>Add Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAddForm(false)} style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.card}>
        <View style={styles.grid3}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Search medicines...</Text>
            <TextInput value={searchTerm} onChangeText={setSearchTerm} placeholder="Search by name or manufacturer" style={styles.input} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Filter by type</Text>
            <View style={styles.rowWrap}>
              {['all', ...types].map((t) => (
                <TouchableOpacity key={t} onPress={() => setCategoryFilter(t)} style={[styles.chip, categoryFilter === t && styles.chipActive]}>
                  <Text style={[styles.chipText, categoryFilter === t && styles.chipTextActive]}>{t === 'all' ? 'All' : t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={styles.muted}>Total: {filteredMedicines.length} medicines</Text>
            <Text style={styles.muted}>Low Stock: {filteredMedicines.filter((m) => m.stock <= 25).length} items</Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        {filteredMedicines.map((m) => {
          const [level, badgeStyle] = stockBadge(m.stock);
          const isEditing = editingId === m.id;
          return (
            <View key={m.id} style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  {isEditing ? (
                    <View style={{ gap: 8 }}>
                      <View style={styles.grid3}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.label}>Medicine Name</Text>
                          <TextInput value={editData.name || ''} onChangeText={(t) => setEditData((p) => ({ ...p, name: t }))} style={styles.input} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.label}>Price (₹)</Text>
                          <TextInput value={String(editData.price || '')} onChangeText={(t) => setEditData((p) => ({ ...p, price: parseFloat(t) || 0 }))} keyboardType="decimal-pad" style={styles.input} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.label}>Stock</Text>
                          <TextInput value={String(editData.stock || '')} onChangeText={(t) => setEditData((p) => ({ ...p, stock: parseInt(t) || 0 }))} keyboardType="number-pad" style={styles.input} />
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity disabled={saving} onPress={() => handleSave(m.id)} style={[styles.primaryButton, { backgroundColor: '#16A34A' }]}>
                          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Save</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEditingId(null)} style={styles.outlineButton}>
                          <Text style={styles.outlineButtonText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{m.name}</Text>
                        <Text style={[styles.badge, { backgroundColor: '#FFFFFF', borderColor: '#D1D5DB', color: '#111827' }]}>{m.type}</Text>
                        <Text style={[styles.badge, badgeStyle]}>{level}</Text>
                        {m.stock <= 10 && <Text style={{ color: '#DC2626' }}>⚠️</Text>}
                      </View>
                      <Text style={styles.muted}>{m.description}</Text>
                      <View style={styles.grid5}>
                        <Text style={styles.muted}>Price: <Text style={{ fontWeight: '700', color: '#111827' }}>₹{m.price}</Text></Text>
                        <Text style={styles.muted}>Stock: <Text style={{ fontWeight: '700', color: '#111827' }}>{m.stock} units</Text></Text>
                        <Text style={styles.muted}>Expiry: <Text style={{ fontWeight: '700', color: '#111827' }}>{new Date(m.expiryDate).toLocaleDateString()}</Text></Text>
                        <Text style={styles.muted}>Manufacturer: <Text style={{ fontWeight: '700', color: '#111827' }}>{m.manufacturer}</Text></Text>
                        <Text style={styles.muted}>Medicine ID: <Text style={{ fontWeight: '700', color: '#111827' }}>MED-{m.id}</Text></Text>
                      </View>
                    </View>
                  )}
                </View>
                {!isEditing && (
                  <View style={{ gap: 8, marginLeft: 8, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.outlineButton} onPress={() => handleEdit(m)}>
                      <Text style={styles.outlineButtonText}>✏️ Edit</Text>
                    </TouchableOpacity>
                    {m.stock <= 25 && (
                      <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#EA580C' }]}>
                        <Text style={styles.primaryButtonText}>Reorder</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <View style={[styles.card, { backgroundColor: '#F3E8FF', borderColor: '#E9D5FF' }]}>
        <Text style={[styles.cardTitle, { color: '#6B21A8' }]}>Inventory Summary</Text>
        <View style={styles.grid4}> 
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#16A34A' }]}>{medicines.filter((m) => m.stock > 50).length}</Text>
            <Text style={styles.muted}>Well Stocked</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#2563EB' }]}>{medicines.filter((m) => m.stock > 25 && m.stock <= 50).length}</Text>
            <Text style={styles.muted}>Medium Stock</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#CA8A04' }]}>{medicines.filter((m) => m.stock > 10 && m.stock <= 25).length}</Text>
            <Text style={styles.muted}>Low Stock</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.kpiNumber, { color: '#B91C1C' }]}>{medicines.filter((m) => m.stock <= 10).length}</Text>
            <Text style={styles.muted}>Critical Stock</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9D5FF', borderRadius: 12, padding: 12, gap: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  muted: { color: '#6B7280', fontSize: 12 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' },
  outlineButton: { borderWidth: 1, borderColor: '#C4B5FD', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  outlineButtonText: { color: '#6B21A8', fontWeight: '600' },
  primaryButton: { borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid4: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid5: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#F5F3FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipActive: { backgroundColor: '#7C3AED' },
  chipText: { color: '#6B21A8', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden', fontSize: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  kpiNumber: { fontSize: 20, fontWeight: '700' },
});
