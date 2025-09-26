// Dummy Data for Rural Aarogya - Healthcare Platform for 173 Villages
// This file contains realistic sample data for all user types and features

// =============================================================================
// DOCTORS DATA
// =============================================================================
export const dummyDoctors = [
  {
    id: 'DOC001',
    name: 'Rajesh Kumar',
    specialization: 'General Medicine',
    qualification: 'MBBS, MD',
    experience: 12,
    hospital: 'Civil Hospital Nabha',
    phone: '+91-9876543210',
    email: 'dr.rajesh@nabhahealth.gov.in',
    avatar: null,
    rating: 4.8,
    consultationFee: 200,
    languages: ['Hindi', 'Punjabi', 'English'],
    availability: {
      monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      friday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      saturday: ['09:00', '10:00', '11:00'],
      sunday: ['10:00', '11:00']
    }
  },
  {
    id: 'DOC002',
    name: 'Priya Sharma',
    specialization: 'Pediatrics',
    qualification: 'MBBS, DCH',
    experience: 8,
    hospital: 'Civil Hospital Nabha',
    phone: '+91-9876543211',
    email: 'dr.priya@nabhahealth.gov.in',
    avatar: null,
    rating: 4.9,
    consultationFee: 250,
    languages: ['Hindi', 'Punjabi', 'English'],
    availability: {
      monday: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
      tuesday: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
      wednesday: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
      thursday: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
      friday: ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
      saturday: ['09:00', '10:00', '11:00'],
      sunday: []
    }
  },
  {
    id: 'DOC003',
    name: 'Amarjit Singh',
    specialization: 'Cardiology',
    qualification: 'MBBS, MD, DM (Cardiology)',
    experience: 15,
    hospital: 'Civil Hospital Nabha',
    phone: '+91-9876543212',
    email: 'dr.amarjit@nabhahealth.gov.in',
    avatar: null,
    rating: 4.7,
    consultationFee: 400,
    languages: ['Hindi', 'Punjabi', 'English'],
    availability: {
      monday: ['14:00', '15:00', '16:00', '17:00'],
      tuesday: ['14:00', '15:00', '16:00', '17:00'],
      wednesday: ['14:00', '15:00', '16:00', '17:00'],
      thursday: ['14:00', '15:00', '16:00', '17:00'],
      friday: ['14:00', '15:00', '16:00', '17:00'],
      saturday: [],
      sunday: []
    }
  },
  {
    id: 'DOC004',
    name: 'Sunita Kaur',
    specialization: 'Gynecology',
    qualification: 'MBBS, MS (Obstetrics & Gynecology)',
    experience: 10,
    hospital: 'Civil Hospital Nabha',
    phone: '+91-9876543213',
    email: 'dr.sunita@nabhahealth.gov.in',
    avatar: null,
    rating: 4.6,
    consultationFee: 300,
    languages: ['Hindi', 'Punjabi', 'English'],
    availability: {
      monday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      thursday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      friday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      saturday: ['09:00', '10:00', '11:00'],
      sunday: []
    }
  },
  {
    id: 'DOC005',
    name: 'Harpreet Singh',
    specialization: 'Orthopedics',
    qualification: 'MBBS, MS (Orthopedics)',
    experience: 14,
    hospital: 'Civil Hospital Nabha',
    phone: '+91-9876543214',
    email: 'dr.harpreet@nabhahealth.gov.in',
    avatar: null,
    rating: 4.5,
    consultationFee: 350,
    languages: ['Hindi', 'Punjabi', 'English'],
    availability: {
      monday: ['10:00', '11:00', '15:00', '16:00'],
      tuesday: ['10:00', '11:00', '15:00', '16:00'],
      wednesday: ['10:00', '11:00', '15:00', '16:00'],
      thursday: ['10:00', '11:00', '15:00', '16:00'],
      friday: ['10:00', '11:00', '15:00', '16:00'],
      saturday: ['10:00', '11:00'],
      sunday: []
    }
  }
];

// Legacy compatibility
export const DOCTORS = dummyDoctors.map(doctor => ({
  id: parseInt(doctor.id.replace('DOC', ''), 10),
  name: `Dr. ${doctor.name}`,
  specialization: doctor.specialization,
  experience: `${doctor.experience} years`
}));

// Villages within Nabha District only
export const VILLAGES = [
  // Main blocks and towns in Nabha District
  'Nabha', 'Tappa', 'Bhadson', 'Lehragaga', 'Bahadurgarh',
  
  // Villages in Nabha Block
  'Khera', 'Sangatpura', 'Bhamola', 'Dudhansadhan', 'Kot Shamir', 
  'Dhanouri', 'Amargarh', 'Mehraj', 'Lalton Kalan', 'Joga Singh Wala',
  
  // Villages in Tappa Block
  'Samaspur', 'Nangal Kalan', 'Raman', 'Bassian', 'Patiala Road',
  
  // Villages in Bhadson Block  
  'Bhadson', 'Rajgarh', 'Dhanaula', 'Nangal Khurd', 'Kheri Naudh Singh',
  
  // Villages in Lehragaga Block
  'Lehragaga', 'Kaleke', 'Badbar', 'Khanpur', 'Ghanaur',
  
  // Additional villages in Nabha District
  'Pail', 'Mahal Kalan', 'Mahal Khurd', 'Raikot', 'Dakala',
  'Uggi', 'Saroya', 'Badopal', 'Naruana', 'Madho Majra'
];

// Patient Dashboard Data
export const PATIENT_DATA = {
  appointments: [
    {
      id: 'APT001',
      doctorName: 'Rajesh Kumar',
      date: '2024-12-28',
      time: '10:30 AM',
      symptoms: 'Fever, cough, body ache',
      status: 'scheduled',
      urgency: 'normal',
      type: 'video_call'
    },
    {
      id: 'APT002',
      doctorName: 'Priya Sharma',
      date: '2024-12-30',
      time: '2:00 PM',
      symptoms: 'Child vaccination checkup',
      status: 'confirmed',
      urgency: 'routine',
      type: 'in_person'
    },
    {
      id: 'APT003',
      doctorName: 'Amrit Singh',
      date: '2024-12-25',
      time: '11:15 AM',
      symptoms: 'Chest pain, shortness of breath',
      status: 'completed',
      urgency: 'high',
      type: 'video_call'
    },
    {
      id: 'APT004',
      doctorName: 'Sunita Kaur',
      date: '2024-12-22',
      time: '3:30 PM',
      symptoms: 'Pregnancy routine checkup',
      status: 'completed',
      urgency: 'routine',
      type: 'in_person'
    },
    {
      id: 'APT005',
      doctorName: 'Harjeet Singh',
      date: '2024-12-20',
      time: '9:45 AM',
      symptoms: 'Knee pain, joint stiffness',
      status: 'completed',
      urgency: 'normal',
      type: 'video_call'
    }
  ],
  
  healthRecords: [
    {
      id: 'HR001',
      date: '2024-12-25',
      doctor: 'Dr. Amrit Singh',
      diagnosis: 'Hypertension Stage 1',
      prescription: 'Amlodipine 5mg daily, lifestyle modifications',
      vitals: { bp: '140/90', pulse: '78', temp: '98.6°F', weight: '72kg' },
      followUp: '2025-01-15'
    },
    {
      id: 'HR002',
      date: '2024-12-22',
      doctor: 'Dr. Sunita Kaur',
      diagnosis: 'Antenatal Care - 28 weeks',
      prescription: 'Iron and folic acid tablets, calcium supplements',
      vitals: { bp: '120/80', pulse: '85', temp: '98.2°F', weight: '68kg' },
      followUp: '2025-01-05'
    },
    {
      id: 'HR003',
      date: '2024-12-15',
      doctor: 'Dr. Rajesh Kumar',
      diagnosis: 'Upper Respiratory Tract Infection',
      prescription: 'Azithromycin 500mg for 3 days, paracetamol as needed',
      vitals: { bp: '118/75', pulse: '82', temp: '101.2°F', weight: '72kg' },
      followUp: 'As needed'
    }
  ],
  
  medications: [
    { name: 'Amlodipine 5mg', frequency: 'Once daily', duration: '30 days', remaining: 25 },
    { name: 'Iron tablets', frequency: 'Twice daily', duration: '90 days', remaining: 78 },
    { name: 'Paracetamol 500mg', frequency: 'As needed', duration: 'PRN', remaining: 18 }
  ]
};

// Hospital Dashboard Data
export const HOSPITAL_DATA = {
  todayAppointments: [
    {
      id: 'HAPT001',
      patientId: 'PAT12845',
      patientName: 'Kuldeep Singh',
      time: '9:00 AM',
      symptoms: 'Diabetes follow-up, blood sugar monitoring',
      urgency: 'normal',
      status: 'scheduled',
      village: 'Khera',
      age: 45,
      contactNumber: '+91-98765-43210'
    },
    {
      id: 'HAPT002',
      patientId: 'PAT12846',
      patientName: 'Simran Kaur',
      time: '9:30 AM',
      symptoms: 'Pregnancy complications, high BP',
      urgency: 'high',
      status: 'in_progress',
      village: 'Sangatpura',
      age: 28,
      contactNumber: '+91-98765-43211'
    },
    {
      id: 'HAPT003',
      patientId: 'PAT12847',
      patientName: 'Ramesh Kumar',
      time: '10:15 AM',
      symptoms: 'Chest pain, cardiac evaluation needed',
      urgency: 'high',
      status: 'waiting',
      village: 'Bhamola',
      age: 52,
      contactNumber: '+91-98765-43212'
    },
    {
      id: 'HAPT004',
      patientId: 'PAT12848',
      patientName: 'Manjit Kaur',
      time: '11:00 AM',
      symptoms: 'Routine checkup, joint pain',
      urgency: 'normal',
      status: 'scheduled',
      village: 'Dudhansadhan',
      age: 38,
      contactNumber: '+91-98765-43213'
    },
    {
      id: 'HAPT005',
      patientId: 'PAT12849',
      patientName: 'Balwinder Singh',
      time: '11:45 AM',
      symptoms: 'Eye examination, vision problems',
      urgency: 'normal',
      status: 'scheduled',
      village: 'Tappa',
      age: 41,
      contactNumber: '+91-98765-43214'
    }
  ],
  
  doctorSchedules: [
    {
      doctorId: 1,
      name: 'Dr. Rajesh Kumar',
      schedule: {
        '2024-12-28': [
          { time: '9:00-10:00', type: 'General Consultation', status: 'available' },
          { time: '10:00-11:00', type: 'Telemedicine', status: 'booked', patient: 'Kuldeep Singh' },
          { time: '11:00-12:00', type: 'General Consultation', status: 'available' },
          { time: '2:00-3:00', type: 'Emergency Cases', status: 'available' },
          { time: '3:00-4:00', type: 'Telemedicine', status: 'available' }
        ]
      }
    },
    {
      doctorId: 2,
      name: 'Dr. Priya Sharma',
      schedule: {
        '2024-12-28': [
          { time: '9:30-10:30', type: 'Pediatric Consultation', status: 'available' },
          { time: '10:30-11:30', type: 'Vaccination Drive', status: 'booked', patient: 'Multiple Children' },
          { time: '11:30-12:30', type: 'Pediatric Consultation', status: 'available' },
          { time: '2:30-3:30', type: 'Telemedicine', status: 'available' }
        ]
      }
    }
  ],
  
  hospitalStats: {
    totalPatients: 2847,
    todayPatients: 23,
    villagesServed: 173,
    activeDoctors: 11,
    sanctionedDoctors: 23,
    occupancyRate: '78%',
    emergencyCases: 5,
    telemedicineConsultations: 156
  }
};

// Health Department Dashboard Data - Nabha District Focus
export const HEALTH_DEPT_DATA = {
  stateStats: {
    populationServed: '175K',
    healthcareFacilities: 28,
    villagesCovered: 173,
    budgetAllocated: '₹4.2Cr',
    budgetUtilized: '₹2.8Cr',
    infrastructureFund: '₹1.2Cr',
    emergencyFund: '₹0.7Cr'
  },
  
  criticalAlerts: [
    {
      title: 'Doctor Shortage Crisis - Nabha District',
      subtitle: 'Only 11/23 sanctioned doctors at Civil Hospital',
      variant: 'error',
      badge: 'URGENT',
      district: 'Nabha',
      severity: 'critical',
      affectedPopulation: 175000,
      actionRequired: 'Immediate recruitment drive needed'
    },
    {
      title: 'Medicine Stock Alert - Rural Areas',
      subtitle: 'Critical shortage in 67 PHCs across state',
      variant: 'warning',
      badge: 'HIGH',
      district: 'Multiple',
      severity: 'high',
      affectedPopulation: 890000,
      actionRequired: 'Emergency procurement and distribution'
    },
    {
      title: 'Infrastructure Maintenance',
      subtitle: '23 facilities need immediate repair work',
      variant: 'warning',
      badge: 'MEDIUM',
      district: 'Various',
      severity: 'medium',
      affectedPopulation: 245000,
      actionRequired: 'Maintenance budget allocation'
    }
  ],
  
  districtPerformance: [
    {
      name: 'Nabha Block',
      doctorAvailability: 48,
      villagesServed: 45,
      telemedicineUsage: '+31%',
      rating: 'poor',
      population: 52000,
      healthFacilities: 3,
      primaryConcerns: ['Doctor shortage', 'Equipment outdated']
    },
    {
      name: 'Tappa Block',
      doctorAvailability: 72,
      villagesServed: 38,
      telemedicineUsage: '+28%',
      rating: 'good',
      population: 41000,
      healthFacilities: 2,
      primaryConcerns: ['Transport connectivity']
    },
    {
      name: 'Bhadson Block',
      doctorAvailability: 65,
      villagesServed: 42,
      telemedicineUsage: '+24%',
      rating: 'good',
      population: 38000,
      healthFacilities: 2,
      primaryConcerns: ['Internet connectivity', 'Medicine supply']
    },
    {
      name: 'Lehragaga Block',
      doctorAvailability: 58,
      villagesServed: 48,
      telemedicineUsage: '+19%',
      rating: 'poor',
      population: 44000,
      healthFacilities: 1,
      primaryConcerns: ['Staff shortage', 'Infrastructure']
    }
  ],
  
  healthInitiatives: [
    {
      title: 'Nabha District Telemedicine Network',
      status: 'Active',
      budget: '₹1.2 Cr',
      beneficiaries: 175000,
      progress: 75
    },
    {
      title: 'Village Health Worker Training Program',
      status: 'Expanding',
      budget: '₹0.8 Cr',
      beneficiaries: 35000,
      progress: 60
    },
    {
      title: 'Rural Doctor Recruitment - Nabha',
      status: 'In Progress',
      budget: '₹1.5 Cr',
      beneficiaries: 89000,
      progress: 40
    },
    {
      title: 'Primary Health Center Upgradation - Nabha Blocks',
      status: 'Phase 2',
      budget: '₹0.9 Cr',
      beneficiaries: 67500,
      progress: 85
    }
  ]
};

// ASHA Dashboard Data
export const ASHA_DATA = {
  personalStats: {
    familiesServed: 847,
    healthScreenings: 23,
    villagesCovered: 12,
    referralsMade: 156,
    immunizationsCompleted: 89,
    maternalHealthChecks: 34
  },
  
  todayTasks: [
    {
      id: 'TASK001',
      title: 'Maternal Health Check - Village Khera',
      description: '3 pregnant women due for checkup',
      priority: 'high',
      status: 'pending',
      estimatedTime: '2 hours',
      village: 'Khera',
      beneficiaries: ['Simran Kaur', 'Rajwinder Kaur', 'Manpreet Kaur']
    },
    {
      id: 'TASK002',
      title: 'Child Immunization Drive - Village Sangatpura',
      description: '15 children scheduled for vaccination',
      priority: 'normal',
      status: 'scheduled',
      estimatedTime: '3 hours',
      village: 'Sangatpura',
      beneficiaries: ['Multiple children aged 6-24 months']
    },
    {
      id: 'TASK003',
      title: 'Hypertension Screening - Village Bhamola',
      description: 'Adults above 40 years screening',
      priority: 'normal',
      status: 'pending',
      estimatedTime: '4 hours',
      village: 'Bhamola',
      beneficiaries: ['25 elderly residents']
    },
    {
      id: 'TASK004',
      title: 'Diabetes Awareness Session - Village Dudhansadhan',
      description: 'Community education on diabetes prevention',
      priority: 'low',
      status: 'scheduled',
      estimatedTime: '1.5 hours',
      village: 'Dudhansadhan',
      beneficiaries: ['40+ community members']
    }
  ],
  
  healthAlerts: [
    {
      title: 'Dengue cases reported in nearby district',
      subtitle: 'Increase vector control measures in assigned villages',
      variant: 'error',
      actionRequired: 'Immediate awareness campaign',
      affectedAreas: ['Khera', 'Sangatpura']
    },
    {
      title: 'Monsoon season approach',
      subtitle: 'Focus on water-borne disease prevention',
      variant: 'warning',
      actionRequired: 'Distribute ORS packets, water purification tablets',
      affectedAreas: ['All assigned villages']
    },
    {
      title: 'Vaccination drive next week',
      subtitle: 'Prepare beneficiary lists for immunization',
      variant: 'info',
      actionRequired: 'Survey and prepare beneficiary database',
      affectedAreas: ['Bhamola', 'Dudhansadhan']
    }
  ],
  
  recentActivities: [
    {
      activity: 'Conducted health screening in Village Khera',
      timestamp: '2 hours ago',
      beneficiaries: 12,
      outcome: '2 referrals made to Civil Hospital'
    },
    {
      activity: 'Referred pregnant woman to Civil Hospital',
      timestamp: '4 hours ago',
      beneficiaries: 1,
      outcome: 'Emergency referral - high BP detected'
    },
    {
      activity: 'Completed immunization drive',
      timestamp: 'Yesterday',
      beneficiaries: 18,
      outcome: '18 children vaccinated successfully'
    },
    {
      activity: 'Submitted monthly village report',
      timestamp: '2 days ago',
      beneficiaries: 847,
      outcome: 'Report approved by supervisor'
    }
  ],
  
  villageData: [
    {
      name: 'Khera',
      population: 1240,
      families: 285,
      pregnantWomen: 8,
      childrenUnder5: 145,
      elderlyAbove60: 98,
      chronicPatients: 34,
      lastVisit: '2024-12-26'
    },
    {
      name: 'Sangatpura',
      population: 890,
      families: 198,
      pregnantWomen: 5,
      childrenUnder5: 98,
      elderlyAbove60: 67,
      chronicPatients: 23,
      lastVisit: '2024-12-24'
    },
    {
      name: 'Bhamola',
      population: 1580,
      families: 345,
      pregnantWomen: 12,
      childrenUnder5: 189,
      elderlyAbove60: 123,
      chronicPatients: 45,
      lastVisit: '2024-12-25'
    },
    {
      name: 'Dudhansadhan',
      population: 1120,
      families: 256,
      pregnantWomen: 7,
      childrenUnder5: 134,
      elderlyAbove60: 89,
      chronicPatients: 28,
      lastVisit: '2024-12-23'
    },
    {
      name: 'Tappa',
      population: 2240,
      families: 498,
      pregnantWomen: 15,
      childrenUnder5: 267,
      elderlyAbove60: 178,
      chronicPatients: 52,
      lastVisit: '2024-12-22'
    }
  ]
};

// Pharmacy Dashboard Data
export const PHARMACY_DATA = {
  dailyStats: {
    medicinesInStock: 847,
    lowStockAlerts: 23,
    dailyCustomers: 156,
    customerGrowth: '+12%',
    todaySales: '₹45,678',
    salesTarget: '₹40,000',
    prescriptionsFilled: 89,
    averageOrderValue: '₹512'
  },
  
  stockAlerts: [
    {
      title: 'Paracetamol 500mg',
      subtitle: 'Only 12 tablets remaining - High demand medicine',
      variant: 'error',
      badge: 'CRITICAL',
      currentStock: 12,
      minimumStock: 100,
      dailyConsumption: 25,
      supplier: 'MedSupply Co.',
      lastOrderDate: '2024-12-20'
    },
    {
      title: 'Crocin 650mg',
      subtitle: '23 tablets left - Reorder recommended',
      variant: 'warning',
      badge: 'LOW',
      currentStock: 23,
      minimumStock: 50,
      dailyConsumption: 8,
      supplier: 'HealthCare Distributors',
      lastOrderDate: '2024-12-18'
    },
    {
      title: 'ORS Packets',
      subtitle: '45 packets remaining - Monitor closely',
      variant: 'warning',
      badge: 'MEDIUM',
      currentStock: 45,
      minimumStock: 100,
      dailyConsumption: 15,
      supplier: 'Rural Health Supplies',
      lastOrderDate: '2024-12-22'
    }
  ],
  
  recentOrders: [
    {
      id: 'ORD1247',
      customerName: 'Rajesh Kumar',
      items: 'Paracetamol, Cough Syrup, Vitamin D',
      amount: '₹245',
      status: 'completed',
      timestamp: '2 hours ago',
      village: 'Khera',
      prescriptionId: 'PRESC001',
      paymentMethod: 'Cash'
    },
    {
      id: 'ORD1248',
      customerName: 'Sunita Devi',
      items: 'Iron tablets, Folic acid',
      amount: '₹89',
      status: 'preparing',
      timestamp: '1 hour ago',
      village: 'Sangatpura',
      prescriptionId: 'PRESC002',
      paymentMethod: 'Digital'
    },
    {
      id: 'ORD1249',
      customerName: 'Mohan Singh',
      items: 'Diabetes medication, BP tablets',
      amount: '₹567',
      status: 'reserved',
      timestamp: '30 min ago',
      village: 'Bhamola',
      prescriptionId: 'PRESC003',
      paymentMethod: 'Insurance'
    }
  ],
  
  popularMedicines: [
    { name: 'Paracetamol 500mg', unitsSold: 234, category: 'Pain Relief' },
    { name: 'Crocin 650mg', unitsSold: 189, category: 'Fever' },
    { name: 'ORS Packets', unitsSold: 156, category: 'Rehydration' },
    { name: 'Vitamin D tablets', unitsSold: 134, category: 'Supplements' },
    { name: 'Cough Syrup', unitsSold: 98, category: 'Respiratory' },
    { name: 'Iron tablets', unitsSold: 87, category: 'Supplements' },
    { name: 'Antacid tablets', unitsSold: 76, category: 'Digestive' },
    { name: 'Bandages', unitsSold: 65, category: 'First Aid' }
  ],
  
  monthlyFinancials: {
    totalSales: '₹8,45,678',
    netProfit: '₹2,34,567',
    ordersFulfilled: 2847,
    customerSatisfaction: '98.5%',
    topSellingCategory: 'Pain Relief',
    averageDailySales: '₹28,189',
    monthlyGrowth: '+15.2%'
  },
  
  inventory: [
    {
      id: 'MED001',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      currentStock: 12,
      minimumStock: 100,
      price: '₹2.50',
      expiryDate: '2025-08-15',
      supplier: 'MedSupply Co.'
    },
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      currentStock: 156,
      minimumStock: 75,
      price: '₹8.75',
      expiryDate: '2025-06-22',
      supplier: 'PharmaCorp Ltd.'
    },
    {
      id: 'MED003',
      name: 'Iron tablets',
      category: 'Supplements',
      currentStock: 234,
      minimumStock: 100,
      price: '₹1.25',
      expiryDate: '2025-11-30',
      supplier: 'HealthCare Distributors'
    }
  ]
};

// =============================================================================
// COMPREHENSIVE HEALTH RECORDS DATA
// =============================================================================
export const dummyHealthRecords = [
  {
    id: 'HR001',
    patientId: 'PAT001',
    patientName: 'Raman Singh',
    doctorId: 'DOC001',
    doctorName: 'Rajesh Kumar',
    appointmentId: 'APT001',
    createdAt: '2024-01-15T10:30:00Z',
    diagnosis: 'Viral Fever with Upper Respiratory Tract Infection',
    symptoms: 'High fever (102°F), body ache, headache, sore throat, mild cough, fatigue',
    prescription: `1. Paracetamol 650mg - 1 tablet every 6 hours for fever (max 4 tablets/day)
2. Azithromycin 500mg - 1 tablet daily for 3 days (after meals)
3. Betadine gargle - 3 times daily with warm water
4. Cough syrup (Ascoril) - 2 tsp three times daily
5. Vitamin C tablets - 1 daily for 7 days`,
    notes: 'Patient advised complete bed rest for 3-4 days. Increase fluid intake. Steam inhalation twice daily. Avoid cold foods and drinks. Follow up if fever persists beyond 3 days or if breathing difficulties develop.',
    severity: 'normal',
    followUpDate: '2024-01-20',
    vitalSigns: {
      temperature: '102°F',
      bloodPressure: '120/80',
      heartRate: '88 bpm',
      oxygenSaturation: '98%'
    },
    tests: [],
    status: 'completed'
  },
  {
    id: 'HR002',
    patientId: 'PAT001',
    patientName: 'Raman Singh',
    doctorId: 'DOC003',
    doctorName: 'Amarjit Singh',
    appointmentId: 'APT002',
    createdAt: '2024-01-22T15:00:00Z',
    diagnosis: 'Hypertension - Stage 1, Newly Diagnosed',
    symptoms: 'Occasional headaches, dizziness, fatigue, no chest pain',
    prescription: `1. Amlodipine 5mg - 1 tablet daily in the morning (empty stomach)
2. Aspirin 75mg - 1 tablet daily after dinner
3. Atorvastatin 10mg - 1 tablet at bedtime
4. Continue monitoring BP daily for 1 week`,
    notes: 'Patient diagnosed with mild hypertension. Lifestyle modifications discussed: reduce salt intake (<6g/day), regular exercise (30 min daily walk), weight management, quit smoking if applicable. Family history of hypertension noted. Patient counseled about medication compliance.',
    severity: 'normal',
    followUpDate: '2024-02-05',
    vitalSigns: {
      temperature: '98.6°F',
      bloodPressure: '142/92',
      heartRate: '78 bpm',
      weight: '75 kg'
    },
    tests: [
      { name: 'ECG', result: 'Normal sinus rhythm', date: '2024-01-22' },
      { name: 'Lipid Profile', result: 'Cholesterol: 245 mg/dl (High)', date: '2024-01-22' }
    ],
    status: 'active'
  },
  {
    id: 'HR003',
    patientId: 'PAT002',
    patientName: 'Gurpreet Kaur',
    doctorId: 'DOC004',
    doctorName: 'Sunita Kaur',
    appointmentId: 'APT003',
    createdAt: '2024-01-20T09:30:00Z',
    diagnosis: 'Iron Deficiency Anemia in Pregnancy (28 weeks)',
    symptoms: 'Fatigue, weakness, pale skin, shortness of breath during activities, craving for ice',
    prescription: `1. Ferrous Sulfate 200mg + Folic Acid 0.5mg - 1 tablet twice daily (1 hour before meals)
2. Vitamin C 500mg - 1 tablet daily (to enhance iron absorption)
3. Calcium + Vitamin D3 - 1 tablet daily with milk
4. Continue prenatal vitamins as prescribed
5. Iron-rich diet counseling provided`,
    notes: 'Patient at 28 weeks gestation with moderate iron deficiency anemia. Advised iron-rich diet including green leafy vegetables, lean meat, dried fruits. Avoid tea/coffee 1 hour before and after iron tablets. Monitor for side effects like constipation or stomach upset. Prenatal check-up scheduled.',
    severity: 'normal',
    followUpDate: '2024-02-03',
    vitalSigns: {
      temperature: '98.4°F',
      bloodPressure: '115/75',
      heartRate: '92 bpm',
      weight: '62 kg',
      fundalHeight: '28 cm'
    },
    tests: [
      { name: 'Hemoglobin', result: '8.2 g/dl (Low)', date: '2024-01-20' },
      { name: 'Serum Iron', result: '45 μg/dl (Low)', date: '2024-01-20' },
      { name: 'Ultrasound', result: 'Normal fetal growth, 28 weeks', date: '2024-01-20' }
    ],
    status: 'active'
  },
  {
    id: 'HR004',
    patientId: 'PAT003',
    patientName: 'Balwinder Singh',
    doctorId: 'DOC005',
    doctorName: 'Harpreet Singh',
    appointmentId: 'APT004',
    createdAt: '2024-01-18T11:00:00Z',
    diagnosis: 'Acute Lower Back Pain (Lumbar Strain)',
    symptoms: 'Severe lower back pain, difficulty bending, muscle spasms, pain radiating to left leg',
    prescription: `1. Diclofenac 50mg + Serratiopeptidase - 1 tablet twice daily after meals for 5 days
2. Chlorzoxazone 500mg - 1 tablet twice daily for muscle relaxation
3. Apply Diclofenac gel on affected area twice daily
4. Hot water bag application 15-20 minutes, 3 times daily
5. Strict bed rest for 2 days, then gradual mobilization`,
    notes: 'Patient lifted heavy sacks 3 days ago, developed acute lower back pain. No neurological deficits noted. Advised physiotherapy exercises after acute pain subsides. Proper lifting techniques demonstrated. Return to work gradually. Avoid heavy lifting for 2 weeks.',
    severity: 'normal',
    followUpDate: '2024-01-25',
    vitalSigns: {
      temperature: '98.6°F',
      bloodPressure: '130/85',
      heartRate: '76 bpm'
    },
    tests: [],
    status: 'active'
  },
  {
    id: 'HR005',
    patientId: 'PAT004',
    patientName: 'Simran Kaur',
    doctorId: 'DOC002',
    doctorName: 'Priya Sharma',
    appointmentId: 'APT005',
    createdAt: '2024-01-16T16:30:00Z',
    diagnosis: 'Acute Gastroenteritis in Child (Age 7)',
    symptoms: 'Vomiting (4-5 times), loose stools (6-7 times/day), mild fever, decreased appetite, mild dehydration',
    prescription: `1. ORS (Oral Rehydration Solution) - 1 packet in 200ml water, give frequently in small sips
2. Zinc sulphate 20mg - 1/2 tablet daily for 10 days (crush and mix with water)
3. Paracetamol syrup - 5ml every 6 hours if fever >100°F
4. Probiotics sachet - 1 daily for 5 days
5. BRAT diet: Banana, Rice, Apple, Toast for 2-3 days`,
    notes: 'Child presented with acute gastroenteritis. Mild dehydration noted. Parents counseled about ORS preparation and administration. Advised to continue breastfeeding if applicable. Warning signs explained: persistent vomiting, high fever, severe dehydration. Avoid dairy products for 3-4 days.',
    severity: 'mild',
    followUpDate: '2024-01-19',
    vitalSigns: {
      temperature: '99.8°F',
      heartRate: '110 bpm',
      weight: '22 kg',
      hydrationStatus: 'Mild dehydration'
    },
    tests: [],
    status: 'completed'
  }
];

// =============================================================================
// COMPREHENSIVE APPOINTMENTS DATA
// =============================================================================
export const dummyAppointments = [
  {
    id: 'APT006',
    patientId: 'PAT001',
    patientName: 'Raman Singh',
    patientAge: 45,
    patientVillage: 'Dhanaula',
    doctorId: 'DOC001',
    doctorName: 'Rajesh Kumar',
    date: '2024-01-28',
    time: '10:00',
    status: 'scheduled',
    urgency: 'normal',
    symptoms: 'Follow-up for hypertension medication review. Experiencing mild headaches in the morning, want to discuss current medication effectiveness.',
    appointmentType: 'follow-up',
    consultationFee: 200,
    bookedAt: '2024-01-25T14:30:00Z',
    notes: 'Regular BP monitoring patient, last visit 1 week ago'
  },
  {
    id: 'APT007',
    patientId: 'PAT002',
    patientName: 'Gurpreet Kaur',
    patientAge: 28,
    patientVillage: 'Amloh',
    doctorId: 'DOC004',
    doctorName: 'Sunita Kaur',
    date: '2024-01-28',
    time: '11:00',
    status: 'scheduled',
    urgency: 'normal',
    symptoms: 'Routine prenatal checkup at 30 weeks. Want to discuss baby movement patterns and some swelling in feet.',
    appointmentType: 'routine',
    consultationFee: 300,
    bookedAt: '2024-01-26T09:15:00Z',
    notes: 'Regular prenatal care, previous iron deficiency being monitored'
  },
  {
    id: 'APT008',
    patientId: 'PAT005',
    patientName: 'Jasbir Singh',
    patientAge: 52,
    patientVillage: 'Bhadson',
    doctorId: 'DOC003',
    doctorName: 'Amarjit Singh',
    date: '2024-01-28',
    time: '15:00',
    status: 'scheduled',
    urgency: 'high',
    symptoms: 'Chest discomfort and shortness of breath during walking. Family history of heart disease. Concerned about recent episodes of chest tightness.',
    appointmentType: 'consultation',
    consultationFee: 400,
    bookedAt: '2024-01-27T16:20:00Z',
    notes: 'Urgent cardiac consultation needed'
  },
  {
    id: 'APT009',
    patientId: 'PAT006',
    patientName: 'Kuldeep Kaur',
    patientAge: 35,
    patientVillage: 'Sahnewal',
    doctorId: 'DOC002',
    doctorName: 'Priya Sharma',
    date: '2024-01-29',
    time: '09:00',
    status: 'scheduled',
    urgency: 'normal',
    symptoms: 'My 5-year-old daughter has been having persistent cough for 1 week, mild fever on and off. Not eating properly.',
    appointmentType: 'consultation',
    consultationFee: 250,
    bookedAt: '2024-01-27T11:45:00Z',
    notes: 'Pediatric consultation for persistent respiratory symptoms'
  },
  // Past appointments
  {
    id: 'APT001',
    patientId: 'PAT001',
    patientName: 'Raman Singh',
    patientAge: 45,
    patientVillage: 'Dhanaula',
    doctorId: 'DOC001',
    doctorName: 'Rajesh Kumar',
    date: '2024-01-15',
    time: '10:30',
    status: 'completed',
    urgency: 'normal',
    symptoms: 'High fever, body ache, headache, sore throat for 3 days',
    appointmentType: 'consultation',
    consultationFee: 200,
    bookedAt: '2024-01-13T08:30:00Z',
    notes: 'Completed consultation, health record created'
  },
  {
    id: 'APT002',
    patientId: 'PAT001',
    patientName: 'Raman Singh',
    patientAge: 45,
    patientVillage: 'Dhanaula',
    doctorId: 'DOC003',
    doctorName: 'Amarjit Singh',
    date: '2024-01-22',
    time: '15:00',
    status: 'completed',
    urgency: 'high',
    symptoms: 'Frequent headaches, dizziness, family history of heart disease',
    appointmentType: 'consultation',
    consultationFee: 400,
    bookedAt: '2024-01-20T10:15:00Z',
    notes: 'Cardiac consultation, hypertension diagnosed'
  }
];

// =============================================================================
// PATIENT DATA
// =============================================================================
export const dummyPatients = [
  {
    id: 'PAT001',
    name: 'Raman Singh',
    age: 45,
    gender: 'male',
    village: 'Dhanaula',
    phone: '+91-9988776655',
    email: 'raman.singh@example.com',
    bloodGroup: 'B+',
    emergencyContact: {
      name: 'Kulwinder Singh (Brother)',
      phone: '+91-9988776656'
    },
    medicalHistory: {
      allergies: ['Sulfa drugs'],
      chronicConditions: ['Hypertension'],
      previousSurgeries: [],
      familyHistory: ['Diabetes (Father)', 'Hypertension (Mother)']
    },
    registeredAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'PAT002',
    name: 'Gurpreet Kaur',
    age: 28,
    gender: 'female',
    village: 'Amloh',
    phone: '+91-9988776657',
    email: 'gurpreet.kaur@example.com',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Harjinder Singh (Husband)',
      phone: '+91-9988776658'
    },
    medicalHistory: {
      allergies: [],
      chronicConditions: ['Iron Deficiency Anemia'],
      previousSurgeries: [],
      familyHistory: ['Diabetes (Maternal Grandmother)']
    },
    pregnancyInfo: {
      currentWeek: 30,
      expectedDueDate: '2024-04-15',
      complications: ['Iron Deficiency Anemia']
    },
    registeredAt: '2024-01-12T11:30:00Z'
  }
];

// =============================================================================
// MEDICINES DATA
// =============================================================================
export const dummyMedicines = [
  {
    id: 'MED001',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    strength: '500mg',
    type: 'Tablet',
    manufacturer: 'Cipla',
    category: 'Analgesic/Antipyretic',
    price: 25.50,
    description: 'Used for fever and mild to moderate pain relief',
    sideEffects: ['Nausea', 'Stomach upset (rare)', 'Liver damage (with overdose)'],
    dosage: 'Adults: 1-2 tablets every 4-6 hours, max 8 tablets/day',
    prescription: true,
    inStock: true,
    expiryDate: '2025-12-31'
  },
  {
    id: 'MED002',
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    strength: '500mg',
    type: 'Tablet',
    manufacturer: 'Sun Pharma',
    category: 'Antibiotic',
    price: 85.00,
    description: 'Antibiotic for bacterial infections',
    sideEffects: ['Diarrhea', 'Nausea', 'Stomach pain', 'Headache'],
    dosage: 'Adults: 1 tablet daily for 3-5 days as prescribed',
    prescription: true,
    inStock: true,
    expiryDate: '2025-08-31'
  },
  {
    id: 'MED003',
    name: 'ORS (Oral Rehydration Solution)',
    genericName: 'Oral Rehydration Salts',
    strength: '20.5g',
    type: 'Powder Sachet',
    manufacturer: 'WHO-UNICEF Formula',
    category: 'Electrolyte Supplement',
    price: 12.00,
    description: 'For treatment of dehydration due to diarrhea',
    sideEffects: ['None if used as directed'],
    dosage: '1 packet in 200ml clean water, give frequently in small amounts',
    prescription: false,
    inStock: true,
    expiryDate: '2026-03-31'
  }
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Get appointments for a specific patient
export const getPatientAppointments = (patientId) => {
  return dummyAppointments.filter(apt => apt.patientId === patientId);
};

// Get health records for a specific patient
export const getPatientHealthRecords = (patientId) => {
  return dummyHealthRecords.filter(record => record.patientId === patientId);
};

// Get appointments for a specific doctor
export const getDoctorAppointments = (doctorId) => {
  return dummyAppointments.filter(apt => apt.doctorId === doctorId);
};

// Get available doctors
export const getAvailableDoctors = () => {
  return dummyDoctors.filter(doctor => doctor.id); // All doctors for now
};

// Get doctor by ID
export const getDoctorById = (doctorId) => {
  return dummyDoctors.find(doctor => doctor.id === doctorId);
};

// Get patient by ID
export const getPatientById = (patientId) => {
  return dummyPatients.find(patient => patient.id === patientId);
};

// Get appointments by status
export const getAppointmentsByStatus = (status) => {
  return dummyAppointments.filter(apt => apt.status === status);
};

// Get upcoming appointments (next 7 days)
export const getUpcomingAppointments = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekStr = nextWeek.toISOString().split('T')[0];
  
  return dummyAppointments.filter(apt => 
    apt.date >= today && apt.date <= nextWeekStr && apt.status === 'scheduled'
  );
};

// Search medicines
export const searchMedicines = (query) => {
  const searchTerm = query.toLowerCase();
  return dummyMedicines.filter(med => 
    med.name.toLowerCase().includes(searchTerm) ||
    med.genericName.toLowerCase().includes(searchTerm) ||
    med.category.toLowerCase().includes(searchTerm)
  );
};

// Generate time slots for next 14 days for a doctor
export const getDoctorAvailability = (doctorId) => {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return [];
  
  const availability = [];
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = days[date.getDay()];
    const dateString = date.toISOString().split('T')[0];
    
    const timeSlots = doctor.availability[dayName] || [];
    
    // Filter out already booked slots
    const bookedSlots = dummyAppointments
      .filter(apt => apt.doctorId === doctorId && apt.date === dateString)
      .map(apt => apt.time);
    
    const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
    
    availability.push({
      date: dateString,
      available: availableSlots.length > 0,
      timeSlots: availableSlots
    });
  }
  
  return availability;
};

// Common utility functions
export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Export everything as default for easy importing
export default {
  dummyDoctors,
  dummyHealthRecords,
  dummyAppointments,
  dummyPatients,
  dummyMedicines,
  VILLAGES,
  DOCTORS,
  PATIENT_DATA,
  HOSPITAL_DATA,
  HEALTH_DEPT_DATA,
  ASHA_DATA,
  PHARMACY_DATA,
  // Helper functions
  getPatientAppointments,
  getPatientHealthRecords,
  getDoctorAppointments,
  getAvailableDoctors,
  getDoctorById,
  getPatientById,
  getAppointmentsByStatus,
  getUpcomingAppointments,
  searchMedicines,
  getDoctorAvailability
};
