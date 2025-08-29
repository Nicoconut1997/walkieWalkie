// Sample partnership data for vet clinic B2B2C partnerships
// Shows existing relationships between walkieWalkie and local veterinary practices

export const samplePartnerships = [
  {
    id: 'partnership-001',
    clinicName: 'Sunset Animal Hospital',
    partnerSince: '2023-06-15',
    address: '2847 Sunset Blvd, Los Angeles, CA 90026',
    phone: '(323) 555-0123',
    website: 'sunsetanimalhospital.com',
    vetName: 'Dr. Sarah Chen',
    specialties: ['General Practice', 'Surgery', 'Dental Care'],
    servicesOffered: [
      'Routine check-ups and vaccinations',
      'Emergency care',
      'Surgical procedures',
      'Pet dental cleaning',
      'Nutrition counseling'
    ],
    walkieWalkieBenefits: [
      'Discounted health checks for walking group members',
      'Priority appointments for walkieWalkie customers',
      'Monthly wellness seminars',
      'Free first consultation for new walking group participants'
    ],
    customerBenefits: [
      'Vet-recommended walking groups',
      'Health-focused walking routes',
      'Expert advice on exercise for different dog breeds',
      'Socialization tips from veterinary professionals'
    ],
    partnershipType: 'Premium Partner',
    rating: 4.8,
    totalCustomersServed: 247,
    monthlyWalkingGroupsSponsored: 8,
    image: '🏥',
    status: 'active'
  },
  {
    id: 'partnership-002',
    clinicName: 'Beverly Hills Veterinary Associates',
    partnerSince: '2023-03-20',
    address: '9876 Wilshire Blvd, Beverly Hills, CA 90210',
    phone: '(310) 555-0456',
    website: 'beverlyhillsvets.com',
    vetName: 'Dr. Michael Rodriguez',
    specialties: ['Cardiology', 'Orthopedics', 'Dermatology'],
    servicesOffered: [
      'Specialized cardiac care',
      'Orthopedic surgery',
      'Skin condition treatments',
      'Advanced diagnostics',
      'Rehabilitation therapy'
    ],
    walkieWalkieBenefits: [
      '15% discount on specialized treatments',
      '24/7 emergency hotline for walking groups',
      'Quarterly health screenings',
      'Custom exercise plans for dogs with health conditions'
    ],
    customerBenefits: [
      'Access to specialist veterinary care',
      'Tailored walking programs for dogs with medical needs',
      'Educational workshops on pet health',
      'Direct consultation with veterinary specialists'
    ],
    partnershipType: 'Specialist Partner',
    rating: 4.9,
    totalCustomersServed: 189,
    monthlyWalkingGroupsSponsored: 12,
    image: '🏥',
    status: 'active'
  },
  {
    id: 'partnership-003',
    clinicName: 'Echo Park Pet Clinic',
    partnerSince: '2023-09-10',
    address: '1456 Echo Park Ave, Los Angeles, CA 90026',
    phone: '(213) 555-0789',
    website: 'echoparkpets.com',
    vetName: 'Dr. Emily Foster',
    specialties: ['Preventive Care', 'Behavioral Health', 'Nutrition'],
    servicesOffered: [
      'Preventive wellness programs',
      'Behavioral consultations',
      'Nutritional assessments',
      'Puppy training programs',
      'Senior pet care'
    ],
    walkieWalkieBenefits: [
      'Free behavioral assessments for rescue dogs',
      'Group training sessions',
      'Nutrition workshops for pet owners',
      'Discounted microchipping services'
    ],
    customerBenefits: [
      'Expert-led dog training walking groups',
      'Behavioral support for reactive dogs',
      'Nutritional guidance for optimal walking performance',
      'Community-focused approach to pet wellness'
    ],
    partnershipType: 'Community Partner',
    rating: 4.7,
    totalCustomersServed: 156,
    monthlyWalkingGroupsSponsored: 6,
    image: '🏥',
    status: 'active'
  },
  {
    id: 'partnership-004',
    clinicName: 'Westside Emergency Animal Hospital',
    partnerSince: '2023-11-05',
    address: '12000 W Pico Blvd, Los Angeles, CA 90064',
    phone: '(310) 555-0234',
    website: 'westsideemergencyvet.com',
    vetName: 'Dr. James Liu',
    specialties: ['Emergency Medicine', 'Critical Care', 'Surgery'],
    servicesOffered: [
      '24/7 emergency services',
      'Critical care medicine',
      'Emergency surgery',
      'Trauma treatment',
      'Toxicology cases'
    ],
    walkieWalkieBenefits: [
      'Emergency response protocol for walking groups',
      'First aid training for group leaders',
      'Priority emergency treatment',
      'Mobile emergency contact system'
    ],
    customerBenefits: [
      'Peace of mind during walks with emergency backup',
      'First aid certified walking group leaders',
      'Emergency contact protocols',
      'Safety-focused walking route planning'
    ],
    partnershipType: 'Safety Partner',
    rating: 4.6,
    totalCustomersServed: 78,
    monthlyWalkingGroupsSponsored: 4,
    image: '🚑',
    status: 'active'
  },
  {
    id: 'partnership-005',
    clinicName: 'Silver Lake Animal Wellness Center',
    partnerSince: '2024-01-12',
    address: '1234 Silver Lake Blvd, Los Angeles, CA 90026',
    phone: '(323) 555-0567',
    website: 'silverlakewellness.com',
    vetName: 'Dr. Andrea Thompson',
    specialties: ['Holistic Medicine', 'Acupuncture', 'Physical Therapy'],
    servicesOffered: [
      'Holistic health assessments',
      'Acupuncture treatments',
      'Physical rehabilitation',
      'Alternative medicine',
      'Wellness coaching'
    ],
    walkieWalkieBenefits: [
      'Holistic health screenings',
      'Alternative therapy consultations',
      'Wellness-focused walking programs',
      'Stress reduction techniques for pets'
    ],
    customerBenefits: [
      'Mindful walking experiences',
      'Stress reduction walking techniques',
      'Holistic approach to pet fitness',
      'Mental wellness support for both pets and owners'
    ],
    partnershipType: 'Wellness Partner',
    rating: 4.8,
    totalCustomersServed: 92,
    monthlyWalkingGroupsSponsored: 5,
    image: '🌿',
    status: 'active'
  }
];

// Partnership statistics
export const partnershipStats = {
  totalPartners: 5,
  totalCustomersServed: 762,
  averageRating: 4.76,
  totalWalkingGroupsSponsored: 35,
  partnershipTypes: [
    { type: 'Premium Partner', count: 1 },
    { type: 'Specialist Partner', count: 1 },
    { type: 'Community Partner', count: 1 },
    { type: 'Safety Partner', count: 1 },
    { type: 'Wellness Partner', count: 1 }
  ]
};
