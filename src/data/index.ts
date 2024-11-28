export const engineers = [
  {
    name: 'John Smith',
    specialty: 'HVAC',
    id: 'ENG-001',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    email: 'john.smith@vh3connect.io',
    phone: '+44 7700 900123',
    location: 'London, UK',
    status: 'online',
    workingHours: {
      start: '09:00',
      end: '17:30',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    skills: ['Installation', 'System Maintenance', 'Balancing', "IPAF"]
  },
  {
    name: 'Emily Brown',
    specialty: 'Electrical',
    id: 'ENG-002',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    email: 'emily.brown@vh3connect.io',
    phone: '+44 7700 900456',
    location: 'Manchester, UK',
    status: 'on-site',
    workingHours: {
      start: '08:00',
      end: '16:30',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    skills: ['Electrical Systems', 'PAT Tester', 'Safety Standards']
  },
  {
    name: 'Michael Johnson',
    specialty: 'Plumbing',
    id: 'ENG-003',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    email: 'michael.johnson@vh3connect.io',
    phone: '+44 7700 900789',
    location: 'Birmingham, UK',
    status: 'travelling',
    workingHours: {
      start: '07:30',
      end: '16:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    skills: ['Plumbing Systems', 'Maintenance', 'Emergency Repairs']
  }
];

export const agents = [
  {
    name: 'Connie',
    email: 'connie@vh3connect.io',
    phone: '+44 7700 900321',
    avatar: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/670ff95af45c7ec22d49b6a5_Connie%20(1)-p-500.png'
  },
  {
    name: 'Tia',
    email: 'tia@vh3connect.io',
    phone: '+44 7700 900654',
    avatar: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/670ff95a46d6e6f16d17d265_Tia%20(1)-p-500.png'
  },
  {
    name: 'Kyle',
    email: 'kyle@vh3connect.io',
    phone: '+44 7700 900987',
    avatar: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/670ff95a1efb74925dcfda15_Kyle%20(1)-p-500.png'
  },
  {
    name: 'Salma',
    email: 'salma@vh3connect.io',
    phone: '+44 7700 900147',
    avatar: 'https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/670ff95a1efb74925dcfda18_Salma%20(1)-p-500.png'
  },
  {
    name: 'Harris',
    email: 'harris@vh3connect.io',
    phone: '+44 7700 900258',
    avatar: 'https://cdn.prod.website-files.com/6701e87c2e96a0cc809c90f7/6721cdde7001c2b78da48979_Harris.svg'
  },
  {
    name: 'Ollie',
    email: 'ollie@vh3connect.io',
    phone: '+44 7700 900369',
    avatar: 'https://cdn.prod.website-files.com/6701e87c2e96a0cc809c90f7/6721cdce9c38d1248f1893fb_Ollie.svg'
  }
];

export const messages = [
  {
    id: '1',
    sender: 'Emily Brown',
    preview: 'Good idea! I\'ll schedule a c...',
    category: 'Design',
    status: 'read',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    sender: 'John Smith',
    preview: 'Latest updates on Project...',
    category: 'Design',
    status: 'unread',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    id: '3',
    sender: 'Michael Johnson',
    preview: 'Feedback received for Pro...',
    category: 'Design',
    status: 'unread',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  }
];

export const chatMessages = [
  {
    id: '1',
    sender: 'Emily Brown',
    content: 'Hi ${user?.first_name || "there"}, we\'re wrapping up the design phase, but there are layout disagreements.',
    timestamp: '9:57',
    type: 'received'
  },
  {
    id: '2',
    sender: 'You',
    content: 'Should we have a team meeting to discuss it?',
    timestamp: '9:58',
    type: 'sent'
  },
  {
    id: '3',
    sender: 'Emily Brown',
    content: 'Good idea! I\'ll schedule a call for tomorrow.',
    timestamp: '10:00',
    type: 'received'
  }
];