// ─── Brand Data ───────────────────────────────────────────────────────────────

export const BRAND = {
  name: "Greene Studios",
  tagline: "We design and build digital experiences that move people.",
  email: "hello@greenestudios.co",
  phone: "+1 (555) 000-0000",
  location: "Lagos, Nigeria · Remote",
  instagram: "https://instagram.com/greenestudios",
  twitter: "https://twitter.com/greenestudios",
  linkedin: "https://linkedin.com/company/greenestudios",
  github: "https://github.com/greenestudios",
  founded: "2022",
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: "luminary-saas",
    title: "Luminary",
    category: "SaaS · Web Design",
    year: "2024",
    description: "A next-generation analytics platform that transforms raw data into actionable intelligence. We crafted an interface that makes complexity feel effortless.",
    tags: ["UI/UX", "Development", "Motion"],
    color: "#12372A",
    accentColor: "#6B8F71",
    featured: true,
    image: "https://images.pexels.com/photos/7172661/pexels-photo-7172661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    results: ["340% increase in user engagement", "2.1s average load time", "98 Lighthouse score"],
    slug: "luminary-saas",
  },
  {
    id: "vera-brand",
    title: "Vera",
    category: "Branding · Identity",
    year: "2024",
    description: "Complete brand identity for a luxury wellness startup. From naming and visual identity to a fully immersive digital experience.",
    tags: ["Branding", "Web Design", "Strategy"],
    color: "#D9C9A3",
    accentColor: "#12372A",
    featured: true,
    image: "https://images.pexels.com/photos/6892716/pexels-photo-6892716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    results: ["Featured on Awwwards", "4.8/5 client NPS", "200K launch day visitors"],
    slug: "vera-brand",
  },
  {
    id: "arc-ecommerce",
    title: "Arc Commerce",
    category: "E-commerce · Development",
    year: "2024",
    description: "A headless e-commerce platform for a premium fashion brand. Custom checkout flow, editorial storytelling, and 0.8s page loads.",
    tags: ["E-commerce", "Frontend Dev", "Performance"],
    color: "#1a1a1a",
    accentColor: "#D9C9A3",
    featured: true,
    image: "https://images.pexels.com/photos/8534173/pexels-photo-8534173.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    results: ["67% increase in conversion", "Avg session 4m 12s", "£2.4M launch month revenue"],
    slug: "arc-ecommerce",
  },
  {
    id: "bloom-health",
    title: "Bloom Health",
    category: "Healthcare · Product Design",
    year: "2023",
    description: "Patient-centered health platform redesign. We simplified a complex medical journey into a calm, trustworthy interface.",
    tags: ["Product Design", "UX Research", "Systems"],
    color: "#6B8F71",
    accentColor: "#F7F5F2",
    featured: false,
    image: "https://images.pexels.com/photos/7679662/pexels-photo-7679662.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    results: ["52% reduction in drop-off", "4.9 App Store rating", "10K+ daily active users"],
    slug: "bloom-health",
  },
  {
    id: "onyx-fintech",
    title: "Onyx Finance",
    category: "Fintech · AI Integration",
    year: "2023",
    description: "AI-powered personal finance dashboard for Gen Z. Making money management feel like a game, not a chore.",
    tags: ["AI Integration", "UI Design", "Mobile"],
    color: "#12372A",
    accentColor: "#D9C9A3",
    featured: false,
    image: "https://images.pexels.com/photos/17279854/pexels-photo-17279854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    results: ["Series A: $12M raised", "300K users in 90 days", "Techcrunch Disrupt Winner"],
    slug: "onyx-fintech",
  },
  {
    id: "prism-edu",
    title: "Prism Education",
    category: "EdTech · Web Application",
    year: "2023",
    description: "Adaptive learning platform connecting 50,000+ students with personalized curriculum paths and real-time progress tracking.",
    tags: ["Web App", "Design System", "Development"],
    color: "#2d2d2d",
    accentColor: "#6B8F71",
    featured: false,
    image: "https://images.pexels.com/photos/8534041/pexels-photo-8534041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    results: ["92% course completion rate", "50K+ active learners", "$4M ARR in year one"],
    slug: "prism-edu",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    id: "web-design",
    icon: "✦",
    title: "Web Design",
    shortDesc: "Websites that stop the scroll and start conversations.",
    description: "We craft visually stunning, strategically crafted websites that communicate your value instantly. Every pixel intentional, every interaction meaningful.",
    deliverables: ["Custom UI Design", "Responsive Layouts", "Design System", "Prototype & Handoff"],
    href: "/services/web-design",
  },
  {
    id: "ui-ux",
    icon: "◈",
    title: "UI/UX Design",
    shortDesc: "Interfaces that feel inevitable.",
    description: "Deep user research and systems thinking combine to create products that users love instinctively. We design for outcomes, not aesthetics alone.",
    deliverables: ["UX Research", "User Flows", "Wireframes", "Usability Testing"],
    href: "/services/ui-ux-design",
  },
  {
    id: "branding",
    icon: "◉",
    title: "Branding",
    shortDesc: "Identity systems that outlast trends.",
    description: "Your brand is a promise. We help you define it, visualise it, and scale it across every touchpoint — digital and physical.",
    deliverables: ["Brand Strategy", "Visual Identity", "Logo Design", "Brand Guidelines"],
    href: "/services/branding",
  },
  {
    id: "frontend-dev",
    icon: "⬡",
    title: "Frontend Development",
    shortDesc: "Pixel-perfect code, blazing performance.",
    description: "Clean, maintainable frontend code built with modern frameworks. We close the gap between design and development — zero compromise.",
    deliverables: ["React / Next.js", "Animation & Motion", "CMS Integration", "Performance Audit"],
    href: "/services/frontend-development",
  },
  {
    id: "motion-design",
    icon: "◎",
    title: "Motion Design",
    shortDesc: "Motion that communicates, not just decorates.",
    description: "From micro-interactions to full-scale brand films. We use motion as a narrative tool — purposeful, precise, and unforgettable.",
    deliverables: ["UI Animations", "Brand Films", "Motion Guidelines", "GSAP / Lottie"],
    href: "/services/motion-design",
  },
  {
    id: "product-design",
    icon: "⬣",
    title: "Product Design",
    shortDesc: "Products users choose to return to.",
    description: "End-to-end product design from concept to launch. We embed with your team to design systems that scale with your product.",
    deliverables: ["Product Strategy", "0→1 Design", "Design Systems", "Developer Handoff"],
    href: "/services/product-design",
  },
  {
    id: "web-applications",
    icon: "◆",
    title: "Web Applications",
    shortDesc: "Full-stack apps built to last.",
    description: "Complex web applications with clean architecture. We handle everything from database design to deployment — so you can focus on growth.",
    deliverables: ["Full-Stack Dev", "API Design", "Database Architecture", "DevOps"],
    href: "/services/web-applications",
  },
  {
    id: "ai-integration",
    icon: "⬟",
    title: "AI Integration",
    shortDesc: "Making AI actually useful in your product.",
    description: "We integrate AI capabilities into your product thoughtfully — from LLM-powered features to computer vision, without the hype.",
    deliverables: ["AI Feature Design", "LLM Integration", "Prompt Engineering", "AI UX Patterns"],
    href: "/services/ai-integration",
  },
  {
    id: "design-systems",
    icon: "◇",
    title: "Design Systems",
    shortDesc: "Scale your design. Maintain your sanity.",
    description: "Component libraries and design tokens that grow with your team. Consistent, accessible, and beautifully documented.",
    deliverables: ["Component Library", "Design Tokens", "Storybook Docs", "Accessibility Audit"],
    href: "/services/design-systems",
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We start by listening. Deep dive into your goals, audience, competitive landscape, and what success truly looks like for your project.",
    duration: "1–2 weeks",
  },
  {
    number: "02",
    title: "Research",
    description: "User interviews, competitor audits, market analysis. We build the strategic foundation that every design decision rests on.",
    duration: "1–2 weeks",
  },
  {
    number: "03",
    title: "Strategy",
    description: "Architecture, content strategy, and creative direction. We align on the north star before a single pixel is placed.",
    duration: "1 week",
  },
  {
    number: "04",
    title: "Wireframes",
    description: "Low-fidelity structures that prioritize flow and hierarchy. We test assumptions early before investing in high-fidelity design.",
    duration: "1–2 weeks",
  },
  {
    number: "05",
    title: "Design",
    description: "High-fidelity screens brought to life with our signature attention to detail. Every state, every edge case, every delight.",
    duration: "2–4 weeks",
  },
  {
    number: "06",
    title: "Prototype",
    description: "Interactive prototypes for stakeholder alignment and user testing. You'll feel the product before a line of code is written.",
    duration: "1 week",
  },
  {
    number: "07",
    title: "Development",
    description: "Clean, performant code that brings designs to life with precision. We use modern frameworks and obsess over performance.",
    duration: "3–8 weeks",
  },
  {
    number: "08",
    title: "Testing",
    description: "Cross-device, cross-browser, accessibility audits, performance benchmarks. We ship nothing we wouldn't be proud to sign.",
    duration: "1–2 weeks",
  },
  {
    number: "09",
    title: "Launch",
    description: "Coordinated go-live with monitoring, rollback plans, and your team trained on every part of the system.",
    duration: "1 week",
  },
  {
    number: "10",
    title: "Support",
    description: "We don't disappear after launch. Ongoing support, iteration, and growth — a true long-term partnership.",
    duration: "Ongoing",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Greene Studios didn't just build our website — they reimagined how our brand communicates entirely. The results were immediate and extraordinary.",
    author: "Sarah Chen",
    title: "CEO, Luminary Analytics",
    avatar: "SC",
    rating: 5,
  },
  {
    id: 2,
    quote: "Working with Greene felt like having a world-class design team embedded in our startup. They understood our vision before we even finished explaining it.",
    author: "Marcus Williams",
    title: "Founder, Arc Commerce",
    avatar: "MW",
    rating: 5,
  },
  {
    id: 3,
    quote: "The attention to detail is unmatched. Every micro-interaction, every animation — it all feels intentional. Our users notice, and they love it.",
    author: "Priya Sharma",
    title: "CPO, Bloom Health",
    avatar: "PS",
    rating: 5,
  },
  {
    id: 4,
    quote: "Three months post-launch, our conversion rate is still climbing. Greene didn't just make things beautiful — they made them work better.",
    author: "James Okonkwo",
    title: "Co-Founder, Onyx Finance",
    avatar: "JO",
    rating: 5,
  },
];

// ─── Pricing Packages ─────────────────────────────────────────────────────────

export const PRICING_PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    price: "$4,800",
    timeline: "3–4 weeks",
    ideal: "Founders and personal brands launching their first professional digital presence.",
    features: [
      { label: "Brand Strategy Session", included: true },
      { label: "UI Design (up to 5 pages)", included: true },
      { label: "Responsive Development", included: true },
      { label: "Basic SEO Setup", included: true },
      { label: "CMS Integration", included: false },
      { label: "Motion & Animations", included: false },
      { label: "Design System", included: false },
      { label: "AI Integration", included: false },
      { label: "Priority Support", included: false },
    ],
    support: "14 days",
    seo: "Basic",
    cta: "Start a Project",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$12,000",
    timeline: "6–8 weeks",
    ideal: "Growing startups and scale-ups ready to compete at a premium level.",
    features: [
      { label: "Brand Strategy Session", included: true },
      { label: "UI Design (up to 15 pages)", included: true },
      { label: "Responsive Development", included: true },
      { label: "Advanced SEO Setup", included: true },
      { label: "CMS Integration", included: true },
      { label: "Motion & Animations", included: true },
      { label: "Design System", included: false },
      { label: "AI Integration", included: false },
      { label: "Priority Support", included: false },
    ],
    support: "60 days",
    seo: "Advanced",
    cta: "Start a Project",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "Custom",
    timeline: "10–16 weeks",
    ideal: "Enterprises and ambitious brands that want a digital ecosystem, not just a website.",
    features: [
      { label: "Brand Strategy Session", included: true },
      { label: "UI Design (unlimited pages)", included: true },
      { label: "Responsive Development", included: true },
      { label: "Enterprise SEO", included: true },
      { label: "CMS Integration", included: true },
      { label: "Motion & Animations", included: true },
      { label: "Design System", included: true },
      { label: "AI Integration", included: true },
      { label: "Priority Support", included: true },
    ],
    support: "6 months",
    seo: "Enterprise",
    cta: "Book a Call",
    popular: false,
  },
];

// ─── Journal Articles ─────────────────────────────────────────────────────────

export const JOURNAL_ARTICLES = [
  {
    id: "why-motion-matters",
    title: "Why Motion Design Is the Most Undervalued Investment in UX",
    excerpt: "Most teams treat animation as decoration. The studios winning awards treat it as communication. Here's the difference.",
    category: "Motion Design",
    date: "December 12, 2024",
    readTime: "8 min read",
    featured: true,
    slug: "why-motion-matters",
    image: "https://images.pexels.com/photos/7172661/pexels-photo-7172661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
  },
  {
    id: "design-systems-at-scale",
    title: "Design Systems at Scale: Lessons from 3 Years of Building Component Libraries",
    excerpt: "Building a design system isn't a sprint — it's a discipline. After three years and dozens of implementations, here's what we've learned.",
    category: "Design Systems",
    date: "November 28, 2024",
    readTime: "12 min read",
    featured: true,
    slug: "design-systems-at-scale",
    image: "https://images.pexels.com/photos/6892716/pexels-photo-6892716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
  },
  {
    id: "ai-in-product-design",
    title: "AI in Product Design: Separating Signal from Hype",
    excerpt: "Every week brings a new AI tool claiming to replace designers. After testing dozens of them, here's our honest assessment.",
    category: "AI",
    date: "November 14, 2024",
    readTime: "10 min read",
    featured: false,
    slug: "ai-in-product-design",
    image: "https://images.pexels.com/photos/17279854/pexels-photo-17279854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
  },
  {
    id: "typography-that-converts",
    title: "Typography That Converts: The Science of Type in Landing Pages",
    excerpt: "We A/B tested 14 typeface combinations across 6 client sites. The results surprised us — and will change how you choose fonts.",
    category: "Design",
    date: "October 30, 2024",
    readTime: "7 min read",
    featured: false,
    slug: "typography-that-converts",
    image: "https://images.pexels.com/photos/8534173/pexels-photo-8534173.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
  },
  {
    id: "the-$0-seo-strategy",
    title: "The $0 SEO Strategy That Got Us 40K Monthly Visitors",
    excerpt: "No paid backlinks, no black-hat tricks. Just a content system that compounded over 18 months. Here's the full playbook.",
    category: "Business",
    date: "October 15, 2024",
    readTime: "15 min read",
    featured: false,
    slug: "the-0-seo-strategy",
    image: "https://images.pexels.com/photos/7679662/pexels-photo-7679662.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
  },
  {
    id: "freelance-to-studio",
    title: "From Freelancer to Studio: The Decisions That Changed Everything",
    excerpt: "The moment I stopped selling hours and started selling outcomes, everything changed. This is that story.",
    category: "Freelancing",
    date: "September 29, 2024",
    readTime: "9 min read",
    featured: false,
    slug: "freelance-to-studio",
    image: "https://images.pexels.com/photos/8534041/pexels-photo-8534041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    question: "How long does a typical project take?",
    answer: "Most projects run 4–16 weeks depending on scope. A focused website can be completed in 4 weeks. A full brand + web + app ecosystem typically takes 12–16 weeks. We'll give you a detailed timeline in your discovery call.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer: "Both. We have packages designed for founders at day one, and we work with series B+ companies who need a complete digital overhaul. What matters is ambition and clarity of vision.",
  },
  {
    question: "What does your design process look like?",
    answer: "Discovery → Research → Strategy → Wireframes → Design → Prototype → Development → Testing → Launch → Support. Every phase has clear deliverables, reviews, and your input built in.",
  },
  {
    question: "Can you work with our existing development team?",
    answer: "Absolutely. We often act as a design partner for technical teams — delivering pixel-perfect Figma files, design systems, and detailed component specs that make developer handoff seamless.",
  },
  {
    question: "What's included after launch?",
    answer: "Every package includes post-launch support ranging from 14 days (Starter) to 6 months (Premium). We monitor performance, squash bugs, and iterate based on real user data.",
  },
  {
    question: "Do you sign NDAs and contracts?",
    answer: "Yes, always. Every project starts with a detailed contract covering scope, IP, payment terms, and confidentiality. We take these seriously because your work is valuable.",
  },
];

// ─── Metrics ──────────────────────────────────────────────────────────────────

export const METRICS = [
  { value: "40+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "$50M+", label: "Revenue Generated for Clients" },
  { value: "3.2s", label: "Average Build Time Per Page" },
];

// ─── Industries ───────────────────────────────────────────────────────────────

export const INDUSTRIES = [
  { name: "SaaS", icon: "⬡", href: "/industries/saas" },
  { name: "E-commerce", icon: "◈", href: "/industries/ecommerce" },
  { name: "Startups", icon: "◉", href: "/industries/startups" },
  { name: "Finance", icon: "◆", href: "/industries/finance" },
  { name: "Healthcare", icon: "◇", href: "/industries/healthcare" },
  { name: "Education", icon: "◎", href: "/industries/education" },
  { name: "Personal Brands", icon: "✦", href: "/industries/personal-brands" },
  { name: "Agencies", icon: "⬣", href: "/industries/agencies" },
];

// ─── Journal Categories ───────────────────────────────────────────────────────

export const JOURNAL_CATEGORIES = [
  "All",
  "Design",
  "Development",
  "Branding",
  "Animation",
  "AI",
  "Business",
  "Freelancing",
  "Tutorials",
];
