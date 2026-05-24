// ─── Projects Data ────────────────────────────────────────────────────────────
// Extended with metrics, highlights, year, role, and gradient config
// for the premium SaaS showcase redesign.

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    tagline: 'Full-featured shopping experience at scale',
    description:
      'A production-ready e-commerce platform with user authentication, dynamic product catalog, cart management, Stripe payment integration, real-time inventory sync, and a powerful admin dashboard.',
    category: 'Full Stack',
    year: '2024',
    role: 'Solo Developer',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    // Color system
    color: '#00F5FF',
    colorSecondary: '#3B82F6',
    gradient: 'linear-gradient(135deg, rgba(0,245,255,0.18) 0%, rgba(59,130,246,0.12) 100%)',
    // Project metrics shown on card
    metrics: [
      { label: 'Users',    value: '2K+' },
      { label: 'Products', value: '500+' },
      { label: 'Uptime',   value: '99.9%' },
    ],
    // Key highlights for the modal
    highlights: [
      'JWT-based auth with refresh tokens and role-based access control',
      'Stripe payment gateway with webhook handling and order lifecycle',
      'Real-time inventory updates via Socket.IO',
      'Admin dashboard with sales analytics and inventory management',
      'Optimized MongoDB queries with indexing — sub-50ms response',
    ],
    // Canvas-drawn preview theme
    previewTheme: { bg: '#07090F', accent: '#00F5FF', secondary: '#3B82F6' },
  },
  {
    id: 2,
    title: 'Inventory Management System',
    tagline: 'Enterprise stock control, reimagined',
    description:
      'Enterprise-grade inventory system with real-time stock tracking, automated low-stock alerts, multi-warehouse support, barcode scanning integration, and detailed analytics reports exported as PDF/Excel.',
    category: 'Full Stack',
    year: '2024',
    role: 'Full Stack Developer',
    tags: ['React', 'ASP.NET', 'SQL Server', 'C#', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    color: '#3B82F6',
    colorSecondary: '#8B5CF6',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.12) 100%)',
    metrics: [
      { label: 'SKUs',        value: '10K+' },
      { label: 'Warehouses',  value: '5' },
      { label: 'Accuracy',    value: '99.7%' },
    ],
    highlights: [
      'Multi-warehouse stock distribution with transfer tracking',
      'Automated email/SMS alerts on low-stock thresholds',
      'Barcode scanner integration for rapid item lookup',
      'PDF & Excel report generation with charts',
      'Role-based access: Admin, Manager, Staff levels',
    ],
    previewTheme: { bg: '#07090F', accent: '#3B82F6', secondary: '#8B5CF6' },
  },
  {
    id: 3,
    title: 'Banking Software',
    tagline: 'Secure digital banking for the modern era',
    description:
      'A secure digital banking solution featuring account management, fund transfers, transaction history with filtering, loan lifecycle management, multi-factor authentication, and comprehensive audit trails.',
    category: 'Backend',
    year: '2023',
    role: 'Backend Engineer',
    tags: ['C#', 'ASP.NET', 'SQL Server', 'REST API', 'JWT'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    color: '#8B5CF6',
    colorSecondary: '#F472B6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(244,114,182,0.12) 100%)',
    metrics: [
      { label: 'Transactions', value: '50K+' },
      { label: 'Security',     value: 'AES-256' },
      { label: 'APIs',         value: '40+' },
    ],
    highlights: [
      'AES-256 encryption for all sensitive financial data',
      'Multi-factor authentication with TOTP support',
      'Full audit trail with tamper-proof logging',
      'Loan management: application, approval, EMI calculation',
      'RESTful API with Swagger documentation',
    ],
    previewTheme: { bg: '#07090F', accent: '#8B5CF6', secondary: '#F472B6' },
  },
  {
    id: 4,
    title: 'Smart Farming System',
    tagline: 'IoT precision agriculture platform',
    description:
      'An IoT-powered precision agriculture platform providing real-time soil monitoring, automated irrigation scheduling, crop health analytics, pest alerts, and weather-based recommendations via ML models.',
    category: 'Full Stack',
    year: '2023',
    role: 'Full Stack Developer',
    tags: ['React', 'Node.js', 'MySQL', 'IoT', 'Chart.js'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    color: '#10B981',
    colorSecondary: '#00F5FF',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(0,245,255,0.12) 100%)',
    metrics: [
      { label: 'Sensors',    value: '200+' },
      { label: 'Water Saved', value: '35%' },
      { label: 'Yield Up',   value: '+28%' },
    ],
    highlights: [
      'Real-time soil moisture, pH, and temperature monitoring',
      'Automated drip irrigation triggered by sensor thresholds',
      'ML-based crop yield prediction (scikit-learn)',
      'Weather API integration for 7-day planning',
      'Mobile-responsive dashboard with Chart.js visualizations',
    ],
    previewTheme: { bg: '#07090F', accent: '#10B981', secondary: '#00F5FF' },
  },
];

export const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];
