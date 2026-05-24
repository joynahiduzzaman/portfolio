// ─── Site Configuration ───────────────────────────────────────────────────────
// Single source of truth for all personal/site data.
// Update ONLY this file to personalize the portfolio.

export const SITE_CONFIG = {
  // ── Personal ──────────────────────────────────────────────────────────────
  name:         'Sk Joy',
  initials:     'SJ',     // ← Changed from 'YN' to 'SJ' (Sk Joy initials)
  title:        'Full Stack Software Engineer',
  tagline:      'Building elegant solutions to complex problems.',
  bio:          'A passionate Full Stack Software Engineer specializing in React, Node.js, and ASP.NET. I transform complex problems into elegant, high-performance web solutions that users love and businesses rely on.',
  location:     'Dhaka, Bangladesh',  // ← Update with your actual location
  email:        'skjoy1998@gmail.com',       // ← Update with your email
  phone:        '+8801939-652479',    // ← Update with your phone
  website:      'https://yourportfolio.dev',  // ← Update with your website
  resumeUrl:    '/resume.pdf',          // ← Place your resume in public/resume.pdf
  availability: true,

  // ── Social ────────────────────────────────────────────────────────────────
  social: {
    github: "https://github.com/joynahiduzzaman",
    linkedin: "https://www.linkedin.com/in/sheikh-nahiduzzaman-joy-b65114292/",
    twitter: "https://twitter.com/",
    email: "mailto:skjoy1998@gmail.com",               // ← Update with your email
  },

  // ── Hero stats ────────────────────────────────────────────────────────────
  stats: [
    { number: 10,  suffix: '+', label: 'Projects Built'      },
    { number: 3,   suffix: '+', label: 'Years Coding'        },
    { number: 100, suffix: '%', label: 'Client Satisfaction' },
  ],

  // ── SEO / Open Graph ──────────────────────────────────────────────────────
  seo: {
    title:         'Sk Joy — Full Stack Software Engineer',
    description:   'Full Stack Software Engineer specializing in React, Node.js, and ASP.NET. Available for full-time roles and freelance projects.',
    keywords:      'software engineer, full stack developer, react, nodejs, portfolio, web developer, ASP.NET, C#',
    ogImage:       '/og-image.png',
    twitterHandle: '@yourhandle',  // ← Update with your Twitter handle
    siteUrl:       'https://yourportfolio.dev',  // ← Update with your site URL
  },

  // ── EmailJS credentials ───────────────────────────────────────────────────
    emailjs: {
      serviceId:  'service_46trkio',
      templateId: 'template_zg1cdm8',
      publicKey:  'ZTDpXs_IvECsWFZUW',
    },

  // ── Feature flags ─────────────────────────────────────────────────────────
  features: {
    cursorGlow:      false,
    particleCanvas:  true,
    darkModeDefault: true,
  },
};

export default SITE_CONFIG;