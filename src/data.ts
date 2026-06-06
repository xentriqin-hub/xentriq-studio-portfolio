import { Service, Project } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Bespoke iOS and Android mobile solutions built with modern React Native and Swift/Kotlin engines.',
    detailedPoints: [
      'High-performance native compiling',
      'Offline-first capabilities and localized SQLite storage',
      'Biometric authentication and secure token handling',
      'Optimized push notifications structure'
    ],
    features: ['React Native', 'Swift', 'Kotlin', 'Tailwind Native']
  },
  {
    id: 'web-apps',
    title: 'Web Application Development',
    description: 'Robust, fully-typed, server-rendered React & Next.js applications engineered for high scale and fault tolerance.',
    detailedPoints: [
      'Incremental Static Regeneration (ISR) and server-side hydration',
      'State-of-the-art state synchronization',
      'Comprehensive module splitting and asset preloading',
      'Strict API abstraction and middleware caching'
    ],
    features: ['React', 'Next.js', 'TypeScript', 'Node.js']
  },
  {
    id: 'websites',
    title: 'Website Development',
    description: 'High-luxury visual landing pages, content hubs, and branding websites showcasing masterful typography.',
    detailedPoints: [
      'Ultra-fast time-to-interactive scores',
      'Masterfully detailed typographic scales and spacing harmonies',
      'Fluid motion-guided visual layouts',
      'Fluid asset responsiveness across screen sizes'
    ],
    features: ['Vite', 'Tailwind CSS', 'Framer Motion', 'SEO Optimized']
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platforms',
    description: 'Custom headless commerce systems with high conversion flows, custom shopping logic, and instant checkout speeds.',
    detailedPoints: [
      'Seamless multi-gateway payment processing (Stripe, Apple Pay)',
      'Highly flexible discount engine integration',
      'Custom catalog search engine setups',
      'Painless inventory database synchronization'
    ],
    features: ['Headless Shopify', 'Stripe', 'GraphQL', 'Tailwind']
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description: 'Expert-level modern UI systems architecture, design system authorship, and performance auditing.',
    detailedPoints: [
      'Reusable web component systems compliant with strict design systems',
      'Deep, eye-focused layout styling and fluid custom layouts',
      'Accessible focus states and screen-reader compliant structures',
      'Micro-interaction styling with responsive hover controls'
    ],
    features: ['Tailwind CSS v4', 'Design Tokens', 'Radix Primitives', 'Motion']
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Secure, resilient Node.js / Go backend microservices, SQL / NoSQL database design, and efficient caching.',
    detailedPoints: [
      'Fully secure RESTful and GraphQL APIs with OAuth access authorization',
      'High performance PostgreSQL or Firestore database modeling',
      'Caching layers with sub-millisecond query responses',
      'Rigorous unit testing pipelines'
    ],
    features: ['Express', 'PostgreSQL', 'Firestore', 'docker']
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Scientific search engine visibility mapping, programmatic semantic hierarchy tuning, and structured data generation.',
    detailedPoints: [
      'Schema.org JSON-LD microdata integration',
      'Pristine heading hierarchy (H1-H6) and semantic tags',
      'Core Web Vitals monitoring and bundle size shaving',
      'Comprehensive metadata and social graph configuration'
    ],
    features: ['JSON-LD', 'Sitemap Automation', 'Metadata Registry', 'Lighthouse 100/100']
  },
  {
    id: 'product-design',
    title: 'Product Design',
    description: 'Rigorous digital product blueprints, typography selection, aesthetic mood-boarding, and interactive prototypes.',
    detailedPoints: [
      'User psychology wireframes and high-fidelity mockups',
      'Design tokens definitions for cross-platform visual consistency',
      'High-fidelity interactives detailing button and scroll feelings',
      'Clean hand-offs to frontend engineering teams'
    ],
    features: ['Aesthetic Auditing', 'Figma Mastery', 'Design Systems', 'Interactive Prototyping']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'tn-today',
    title: 'TN Today',
    subtitle: 'Tamil Nadu News Platform',
    description: 'Tamil Nadu-focused news platform delivering important updates, government announcements, public information, and daily news in a modern mobile-first experience. Launching in Late Summer 2026.',
    status: 'In Active Development',
    timeline: 'Late Summer 2026 Release',
    features: [
      'Mobile-first high-fidelity layouts',
      'Instant push updates for government circulars',
      'Offline reading cache capabilities',
      'Elegant, focus-driven Tamil & English typography'
    ],
    highlight: 'Xentriq Studio Flagship Product'
  }
];
