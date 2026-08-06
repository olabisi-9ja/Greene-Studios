// ─── Brand Data ───────────────────────────────────────────────────────────────

export const BRAND = {
 name: "Greene Studios",
 tagline: "We design and build digital experiences that move people.",
 email: "hello@greenestudios.co",
 phone: "+1 (555) 000-0000",
 location: "Working worldwide",
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
 challenge: "Luminary's previous interface was drowning users in data. Financial analysts were spending hours exporting CSVs rather than using the built-in tools because the visualization engine was too complex and intimidating.",
 goals: [
 "Simplify the onboarding process for non-technical users",
 "Develop a robust design system for 50+ chart types",
 "Reduce dashboard load times by 70%",
 "Establish a premium visual language that commands trust"
 ],
 approach: [
 { title: "Progressive Disclosure", desc: "We redesigned the interface to hide complexity until needed, allowing users to drill down from high-level metrics to raw data effortlessly." },
 { title: "Custom Visualization Engine", desc: "We built a bespoke charting library using D3.js and Canvas to ensure rendering 100k+ data points remains buttery smooth at 60fps." },
 { title: "Dark Mode Optimization", desc: "Created a low-contrast dark mode specifically calibrated to reduce eye strain for analysts looking at screens for 8+ hours a day." }
 ],
 lessons: "The biggest takeaway from Luminary was the power of restraint. By removing 40% of the visible UI elements and replacing them with context-aware floating menus, we actually increased feature discoverability."
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
 results: ["4.8/5 client NPS", "200K launch day visitors", "92% brand recall in testing"],
 slug: "vera-brand",
 challenge: "Vera was entering an incredibly saturated wellness market dominated by clinical whites and pharmaceutical blues. They needed a brand that felt luxurious, grounded, and deeply human without crossing into pseudoscience.",
 goals: [
 "Create a distinct visual identity differentiating Vera from 100+ competitors",
 "Design physical packaging that feels like a premium unboxing experience",
 "Develop a highly sensory, tactile e-commerce website",
 "Establish a tone of voice that is authoritative yet warm"
 ],
 approach: [
 { title: "Earthy Palette", desc: "We developed a palette rooted in natural materials, clay, moss, sandstone, to evoke grounding and physical reality." },
 { title: "Tactile Digital", desc: "We used WebGL to create subtle, organic distortion effects on imagery, making the digital experience feel physically tangible." },
 { title: "Editorial Typography", desc: "Paired a robust, classic serif with an ultra-clean sans to bridge the gap between ancient apothecary and modern science." }
 ],
 lessons: "Vera taught us that digital products don't have to feel digital. By injecting organic noise, soft easing curves, and earthy tones, we can create digital spaces that lower the user's heart rate."
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
 challenge: "Arc's previous monolithic Shopify setup was failing. Load times exceeded 4 seconds, the design felt like a template, and they couldn't weave their rich editorial content natively into the shopping experience.",
 goals: [
 "Migrate to a headless architecture (Shopify + Next.js)",
 "Achieve sub-second page transitions",
 "Integrate editorial content seamlessly into product pages",
 "Design a frictionless, one-page custom checkout"
 ],
 approach: [
 { title: "Headless Architecture", desc: "We decoupled the frontend using Next.js and Vercel, connecting to Shopify via the Storefront API for blazing fast speeds." },
 { title: "Editorial Integration", desc: "Built a custom Sanity CMS integration that allows editors to drop shoppable products directly into long-form lookbooks." },
 { title: "Fluid Transitions", desc: "Implemented Framer Motion for seamless, app-like page transitions that keep the user immersed in the shopping journey." }
 ],
 lessons: "Performance is a design feature. We noticed that when pages load instantly, users browse 3x as many products. The engineering investment paid for itself in conversion rates within 14 days."
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
 challenge: "Patients navigating Bloom Health were highly anxious. The existing interface used harsh medical terminology, alarming red alerts, and a confusing navigation structure that exacerbated user stress during critical moments.",
 goals: [
 "Redesign the patient portal to prioritize calm and clarity",
 "Pass strict WCAG 2.1 AA accessibility standards",
 "Simplify the prescription refill and appointment booking flows",
 "Create a unified design system across iOS, Android, and Web"
 ],
 approach: [
 { title: "Empathetic UX", desc: "We rewrote the entire product copy to be conversational, supportive, and completely jargon-free." },
 { title: "Calm Color Psychology", desc: "Removed harsh alert colors, replacing them with soft sage greens and warm neutrals that communicate safety." },
 { title: "Frictionless Forms", desc: "Broke down complex 10-page intake forms into bite-sized, conversational interactions with auto-save." }
 ],
 lessons: "In healthcare design, clarity is kindness. We learned that hiding complex medical data isn't the answer, rather, it must be paced. Progressive disclosure is vital for anxious users."
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
 challenge: "Gen Z users were completely disengaged from traditional banking apps. Onyx needed to present complex financial forecasting in a way that felt as native, engaging, and effortless as scrolling through social media.",
 goals: [
 "Design a mobile-first interface that breaks fintech conventions",
 "Integrate an AI financial assistant that feels like a peer",
 "Gamify savings goals without feeling patronizing",
 "Ensure Bank-level security UI elements"
 ],
 approach: [
 { title: "Neomorphic Gaming UI", desc: "We adopted a dark, neon-accented aesthetic that draws heavily from gaming interfaces rather than traditional banking." },
 { title: "Conversational AI", desc: "Built a chat interface where users can ask 'Can I afford to eat out tonight?' and the AI analyzes their budget to respond." },
 { title: "Dynamic Data Viz", desc: "Replaced boring pie charts with interactive, physics-based bubbles that users can drag and drop into savings pots." }
 ],
 lessons: "Financial tools don't have to look boring to be taken seriously. By leaning into consumer app aesthetics, Onyx built trust through high-end execution rather than traditional institutional signifiers."
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
 challenge: "Prism had a massive library of incredible educational content, but a rigid linear curriculum structure meant students were getting bored and dropping off when the material wasn't perfectly paced for their learning style.",
 goals: [
 "Build a dynamic curriculum graph UI",
 "Create an engaging, distraction-free video learning environment",
 "Implement real-time collaboration tools for students",
 "Design a robust instructor dashboard for grading"
 ],
 approach: [
 { title: "Node-Based Curriculum", desc: "We designed a visual 'skill tree' interface similar to RPG video games, allowing students to visually see their learning paths and unlock new concepts." },
 { title: "Focus Mode", desc: "Built a theater-mode learning environment that automatically dims the UI and disables notifications during deep-work sessions." },
 { title: "Micro-Interactions", desc: "Added satisfying haptic feedback and micro-animations to celebrate small wins, keeping dopamine levels steady throughout the course." }
 ],
 lessons: "We discovered that motivation is a design problem. By providing constant, visual feedback on progress and allowing non-linear exploration, student retention skyrocketed."
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
 whatIsIt: "Web Design for us isn't just about putting pretty boxes on a screen. It's the architecture of your digital headquarters. A great website acts as your best salesperson, your brand ambassador, and your most reliable conversion engine.",
 whoItsFor: [
 "Companies launching a completely new product offering",
 "Established brands whose digital presence feels 5 years behind",
 "Startups needing a high-converting landing page to secure funding",
 "E-commerce brands transitioning to custom headless storefronts"
 ],
 approach: [
 { title: "Content-First Wireframing", desc: "We don't design around lorem ipsum. We structure the narrative first, ensuring the design serves the message, not the other way around." },
 { title: "Creative Direction", desc: "We establish a unique visual language, typography, color, grid systems, that ensures you don't look like another template." },
 { title: "Interactive Prototyping", desc: "You'll feel the website before we write a single line of code, allowing us to perfect the pacing and flow." }
 ]
 },
 {
 id: "ui-ux",
 icon: "◈",
 title: "UI/UX Design",
 shortDesc: "Interfaces that feel inevitable.",
 description: "Deep user research and systems thinking combine to create products that users love instinctively. We design for outcomes, not aesthetics alone.",
 deliverables: ["UX Research", "User Flows", "Wireframes", "Usability Testing"],
 href: "/services/ui-ux-design",
 whatIsIt: "UI/UX is the science of human behavior applied to digital interfaces. It's the process of removing friction between what a user wants to do and the action required to do it. Good UI/UX feels like the product is reading the user's mind.",
 whoItsFor: [
 "SaaS platforms struggling with high churn or onboarding drop-off",
 "Complex legacy software that needs consumer-grade modernization",
 "Mobile apps failing to retain daily active users",
 "Founders who want to validate their product with a clickable prototype"
 ],
 approach: [
 { title: "Empathy Mapping", desc: "We interview your actual users, map their emotional journey, and identify exactly where they experience frustration." },
 { title: "Information Architecture", desc: "We organize your data and features logically, ensuring users can find what they need in 3 clicks or less." },
 { title: "High-Fidelity UI", desc: "We wrap our structural logic in beautiful, accessible, and intuitive interfaces that elevate your brand perception." }
 ]
 },
 {
 id: "branding",
 icon: "◉",
 title: "Branding",
 shortDesc: "Identity systems that outlast trends.",
 description: "Your brand is a promise. We help you define it, visualise it, and scale it across every touchpoint, digital and physical.",
 deliverables: ["Brand Strategy", "Visual Identity", "Logo Design", "Brand Guidelines"],
 href: "/services/branding",
 whatIsIt: "Branding is the gut feeling people have about your company. We help you define that feeling and encode it into every visual asset, from your logo and typography to your color palette and tone of voice.",
 whoItsFor: [
 "Startups that need to look like enterprise players from day one",
 "Companies pivoting their offering and needing a visual reset",
 "Fragmented brands that look different across every platform",
 "Products launching into highly saturated, competitive markets"
 ],
 approach: [
 { title: "Strategic Positioning", desc: "We define your archetype, your audience, and your wedge in the market before sketching a single concept." },
 { title: "Visual Identity System", desc: "We design flexible systems, not just a logo, including typography rules, color logic, and photographic direction." },
 { title: "Comprehensive Guidelines", desc: "We deliver a robust playbook so your internal team can scale the brand consistently for years to come." }
 ]
 },
 {
 id: "frontend-dev",
 icon: "⬡",
 title: "Frontend Development",
 shortDesc: "Pixel-perfect code, blazing performance.",
 description: "Clean, maintainable frontend code built with modern frameworks. We close the gap between design and development, zero compromise.",
 deliverables: ["React / Next.js", "Animation & Motion", "CMS Integration", "Performance Audit"],
 href: "/services/frontend-development",
 whatIsIt: "Frontend Development is where design becomes reality. We write clean, performant, and accessible code that brings static designs to life with fluid animations and instantaneous load times.",
 whoItsFor: [
 "Design teams that need a reliable partner to build their Figma files perfectly",
 "Companies needing a migration to modern stacks (Next.js, React)",
 "Websites suffering from poor Lighthouse scores and SEO penalties",
 "Brands wanting complex WebGL or GSAP animations on their site"
 ],
 approach: [
 { title: "Component-Driven", desc: "We build modular, reusable React components that ensure consistency and make future updates trivial." },
 { title: "Motion as a First Principle", desc: "We integrate GSAP and Framer Motion directly into the architecture, ensuring animations are performant, not bolted-on." },
 { title: "Obsessive Optimization", desc: "We aggressively optimize assets, implement edge caching, and ensure your site scores 95+ on Lighthouse." }
 ]
 },
 {
 id: "motion-design",
 icon: "◎",
 title: "Motion Design",
 shortDesc: "Motion that communicates, not just decorates.",
 description: "From micro-interactions to full-scale brand films. We use motion as a narrative tool, purposeful, precise, and unforgettable.",
 deliverables: ["UI Animations", "Brand Films", "Motion Guidelines", "GSAP / Lottie"],
 href: "/services/motion-design",
 whatIsIt: "Motion Design brings the dimension of time to your digital presence. It guides the user's eye, provides context for state changes, and injects personality into otherwise static interfaces.",
 whoItsFor: [
 "Products that feel rigid and lack delight",
 "Complex dashboards that need to explain data transitions clearly",
 "Marketing sites that need to demonstrate a physical product digitally",
 "Brands wanting a signature 'feel' to their digital interactions"
 ],
 approach: [
 { title: "Choreography", desc: "We design the timing and easing curves of your entire interface so elements enter and exit with a cohesive rhythm." },
 { title: "Functional Micro-interactions", desc: "We animate buttons, toggles, and loaders to provide immediate, satisfying feedback to user actions." },
 { title: "Scroll Storytelling", desc: "We build complex, scroll-triggered WebGL and CSS animations that unveil your product's story as the user scrolls." }
 ]
 },
 {
 id: "product-design",
 icon: "⬣",
 title: "Product Design",
 shortDesc: "Products users choose to return to.",
 description: "End-to-end product design from concept to launch. We embed with your team to design systems that scale with your product.",
 deliverables: ["Product Strategy", "0→1 Design", "Design Systems", "Developer Handoff"],
 href: "/services/product-design",
 whatIsIt: "Product Design encompasses the entire lifecycle of a digital tool. It bridges business strategy, UX research, UI design, and technical feasibility to create holistic applications that solve real problems.",
 whoItsFor: [
 "Founders building a 0-to-1 MVP and needing a foundational design",
 "SaaS companies requiring a complete overhaul of their core application",
 "Teams that need an embedded design partner to work alongside engineering",
 "Products scaling rapidly and needing design systems to maintain speed"
 ],
 approach: [
 { title: "Business Alignment", desc: "We start by deeply understanding your unit economics, growth loops, and technical constraints." },
 { title: "Systems Thinking", desc: "We don't just design screens; we design flexible components and states that account for edge cases and future features." },
 { title: "Continuous Delivery", desc: "We work in agile sprints, shipping design directly to engineering and iterating based on real user feedback." }
 ]
 },
 {
 id: "web-applications",
 icon: "◆",
 title: "Web Applications",
 shortDesc: "Full-stack apps built to last.",
 description: "Complex web applications with clean architecture. We handle everything from database design to deployment, so you can focus on growth.",
 deliverables: ["Full-Stack Dev", "API Design", "Database Architecture", "DevOps"],
 href: "/services/web-applications",
 whatIsIt: "We build secure, scalable, and highly interactive full-stack web applications. From the database schema to the server logic and the client interface, we architect systems designed to handle millions of users.",
 whoItsFor: [
 "Startups needing a robust MVP built rapidly but securely",
 "Enterprises replacing legacy internal tools with modern web apps",
 "Founders who have a design but need an elite engineering team to build it",
 "Platforms that require real-time data, websockets, or complex state management"
 ],
 approach: [
 { title: "Modern Stack", desc: "We build on battle-tested modern infrastructure: Next.js, Node, PostgreSQL, and Vercel/AWS." },
 { title: "API-First Design", desc: "We architect clean, well-documented REST or GraphQL APIs that allow your product to easily scale to mobile in the future." },
 { title: "Security & Testing", desc: "We implement robust auth, CI/CD pipelines, and automated testing to ensure your application never breaks in production." }
 ]
 },
 {
 id: "ai-integration",
 icon: "⬟",
 title: "AI Integration",
 shortDesc: "Making AI actually useful in your product.",
 description: "We integrate AI capabilities into your product thoughtfully, from LLM-powered features to computer vision, without the hype.",
 deliverables: ["AI Feature Design", "LLM Integration", "Prompt Engineering", "AI UX Patterns"],
 href: "/services/ai-integration",
 whatIsIt: "We move past the AI hype to implement genuine utility. Whether it's connecting to OpenAI, training custom models, or building intelligent agents, we design AI features that actually improve the user's workflow.",
 whoItsFor: [
 "Products that process massive amounts of unstructured text data",
 "Platforms looking to replace complex UI forms with conversational interfaces",
 "Tools that can benefit from predictive analytics or auto-categorization",
 "Companies wanting to automate customer support or onboarding"
 ],
 approach: [
 { title: "Ethical UX Design", desc: "We design clear AI affordances, ensuring users always know when they are interacting with AI and how their data is used." },
 { title: "Robust Engineering", desc: "We handle rate-limiting, streaming responses, and context-window management to ensure a seamless experience." },
 { title: "Graceful Degradation", desc: "We design fallbacks and error states for when models hallucinate or APIs go down, keeping the product usable." }
 ]
 },
 {
 id: "design-systems",
 icon: "◇",
 title: "Design Systems",
 shortDesc: "Scale your design. Maintain your sanity.",
 description: "Component libraries and design tokens that grow with your team. Consistent, accessible, and beautifully documented.",
 deliverables: ["Component Library", "Design Tokens", "Storybook Docs", "Accessibility Audit"],
 href: "/services/design-systems",
 whatIsIt: "A Design System is a single source of truth for your digital product. We build comprehensive libraries of reusable components, design tokens, and documentation that align your design and engineering teams.",
 whoItsFor: [
 "Large teams where designers and developers are constantly misaligned",
 "Products that look inconsistent because they were built over many years",
 "Companies preparing to scale their engineering team rapidly",
 "Organizations managing multiple products under one umbrella brand"
 ],
 approach: [
 { title: "Tokenization", desc: "We abstract colors, spacing, and typography into variables, making global sweeping changes effortless." },
 { title: "Figma to Code", desc: "We build a 1:1 match between your Figma component library and your React/Vue codebase." },
 { title: "Documentation", desc: "We write clear guidelines in Storybook or ZeroHeight on exactly how and when to use every component." }
 ]
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
 description: "We don't disappear after launch. Ongoing support, iteration, and growth, a true long-term partnership.",
 duration: "Ongoing",
 },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
 {
 id: 1,
 quote: "Greene Studios didn't just build our website, they reimagined how our brand communicates entirely. The results were immediate and extraordinary.",
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
 quote: "The attention to detail is unmatched. Every micro-interaction, every animation, it all feels intentional. Our users notice, and they love it.",
 author: "Priya Sharma",
 title: "CPO, Bloom Health",
 avatar: "PS",
 rating: 5,
 },
 {
 id: 4,
 quote: "Three months post-launch, our conversion rate is still climbing. Greene didn't just make things beautiful, they made them work better.",
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
 content: [
 { type: "p", text: "When we look at the digital products that truly captivate us, the ones we describe as 'magical' or 'intuitive', there is almost always a common denominator: purposeful motion design. Yet, in most product development cycles, animation is treated as the garnish. It's the sprinkles added at the very end of the process, assuming there is any budget or time remaining." },
 { type: "h2", text: "Motion is Communication, Not Decoration" },
 { type: "p", text: "The fundamental misunderstanding of motion design is treating it as an aesthetic choice rather than a functional one. Human beings are biologically wired to notice movement. In the physical world, movement provides context. If you drop a ball, physics dictates how it falls, bounces, and settles. These physical laws give us an intuitive understanding of weight, space, and relationship." },
 { type: "p", text: "When an interface lacks motion, it lacks physics. Objects suddenly appear and disappear in zero milliseconds. Menus teleport. Content jumps. This causes a microscopic cognitive load on the user. Their brain has to constantly reconcile these impossible state changes." },
 { type: "quote", text: "Good motion design bridges the gap between state A and state B. It answers the user's subconscious question: 'Where did that come from, and where did it go?'" },
 { type: "h2", text: "The ROI of Delight" },
 { type: "p", text: "Stakeholders often ask for the ROI of motion design. It's notoriously difficult to measure directly through A/B testing because motion affects long-term brand perception and emotional resonance rather than immediate click-through rates. However, when we implemented a comprehensive motion system for a recent FinTech client, we noticed a 14% drop in support tickets related to 'I don't know where to find X'." },
 { type: "p", text: "Why? Because when a user clicked a menu icon, the items slid out from the icon's origin point. The user's eye naturally tracked the movement, establishing a spatial relationship in their mind. They learned the interface through physics." },
 { type: "h2", text: "Implementing Motion Sensibly" },
 { type: "p", text: "To do motion right, it needs to be established at the design system level, not the component level. Define your easing curves globally. Decide on your duration tokens (e.g., 150ms for micro-interactions, 300ms for large layout shifts). Treat motion as a core brand element, just like your typography or color palette." },
 { type: "p", text: "When motion is purposeful, quick, and grounded in physical reality, it elevates a product from a mere tool into an experience." }
 ]
 },
 {
 id: "design-systems-at-scale",
 title: "Design Systems at Scale: Lessons from 3 Years of Building Component Libraries",
 excerpt: "Building a design system isn't a sprint, it's a discipline. After three years and dozens of implementations, here's what we've learned.",
 category: "Design Systems",
 date: "November 28, 2024",
 readTime: "12 min read",
 featured: true,
 slug: "design-systems-at-scale",
 image: "https://images.pexels.com/photos/6892716/pexels-photo-6892716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
 content: [
 { type: "p", text: "Three years ago, 'Design System' was the hottest buzzword in the industry. Every company, regardless of size, felt compelled to build one. We were hired to audit, rescue, or rebuild dozens of them. What we found was a graveyard of abandoned Figma files and deprecated React libraries." },
 { type: "h2", text: "The Fallacy of the 'Finished' System" },
 { type: "p", text: "The most common failure mode we observe is treating a design system as a project with a finish line. A team is assembled, they spend three months building 50 components, they launch 'Version 1.0', and then the team is disbanded back to feature work. Within six months, the system is obsolete." },
 { type: "p", text: "A design system is not a project; it is a product. And like any product, it needs dedicated maintainers, a roadmap, and a continuous feedback loop from its users (the developers and designers)." },
 { type: "quote", text: "If your design system doesn't have a dedicated governance model, you don't have a design system. You just have a UI kit." },
 { type: "h2", text: "Flexibility vs. Consistency" },
 { type: "p", text: "The central tension in any design system is balancing strict consistency with the flexibility required to build innovative features. If a system is too strict, designers will rebel, detach instances, and create 'rogue' components. If it's too loose, you lose the benefits of having a system in the first place." },
 { type: "p", text: "We've found success in adopting the 'Slot' or 'Composition' pattern. Instead of building a Card component with 25 different boolean props (hasImage, hasFooter, isDestructive), build a base Card container that accepts children. Let the feature teams compose the layout they need using foundational primitives." },
 { type: "h2", text: "The Future is Tokenized" },
 { type: "p", text: "The industry is rapidly moving toward Design Tokens as the definitive source of truth. By abstracting values into semantic tokens (e.g., color-background-danger instead of red-500), we bridge the gap between Figma and code. In our most successful implementations, a designer updating a token in Figma automatically triggers a PR in GitHub that updates the CSS variables across the entire application suite." }
 ]
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
 content: [
 { type: "p", text: "The anxiety in the design community is palpable. As AI image generators and UI generators become more sophisticated, the existential question looms: What is the role of a product designer in an AI-driven world?" },
 { type: "h2", text: "AI as a Co-Pilot, Not an Autopilot" },
 { type: "p", text: "Over the last six months, our studio has rigorously integrated AI into our workflow. We've tested tools that promise to generate full UI layouts from text prompts. The reality? They are incredible at generating the 'expected' or the 'average'. If you need a standard SaaS dashboard, AI can give you a competent wireframe in seconds." },
 { type: "p", text: "However, great product design is rarely about the average. It's about finding the specific, idiosyncratic wedge that solves a unique business problem. AI lacks context. It doesn't know that your user base consists of 60-year-old accountants who have terrible eyesight and hate dropdown menus." },
 { type: "quote", text: "AI raises the floor of design quality, but it does not raise the ceiling. The baseline will become competent, making exceptional human insight more valuable than ever." },
 { type: "h2", text: "Where We Find Actual Value" },
 { type: "p", text: "While full UI generation isn't quite there, AI has completely revolutionized our 'messy middle' processes:" },
 { type: "p", text: "1. Rapid Copywriting: We no longer use Lorem Ipsum. We use LLMs to generate highly contextual, realistic copy for our prototypes, which drastically improves user testing accuracy." },
 { type: "p", text: "2. Synthesizing User Research: Feeding transcripts of user interviews into an LLM to extract themes and sentiment analysis saves our UX researchers hours of manual tagging." },
 { type: "p", text: "3. Edge Case Generation: We ask AI to act as an adversarial user and identify edge cases or error states we might have missed in our happy-path designs." },
 { type: "h2", text: "The Human Premium" },
 { type: "p", text: "As digital experiences become easier and cheaper to generate, the market will flood with competent, homogeneous interfaces. In this environment, human idiosyncrasy, emotional resonance, and brand point-of-view will command a massive premium. The future of design isn't pushing pixels; it's editorial taste and strategic curation." }
 ]
 },
 {
 id: "typography-that-converts",
 title: "Typography That Converts: The Science of Type in Landing Pages",
 excerpt: "We A/B tested 14 typeface combinations across 6 client sites. The results surprised us, and will change how you choose fonts.",
 category: "Design",
 date: "October 30, 2024",
 readTime: "7 min read",
 featured: false,
 slug: "typography-that-converts",
 image: "https://images.pexels.com/photos/8534173/pexels-photo-8534173.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
 content: [
 { type: "p", text: "Designers love typography. We can spend hours debating the merits of Inter versus Roboto, or hunting for the perfect geometric sans-serif to elevate a brand. But how much does typography actually impact business metrics? Does the end user really care if a font has humanist terminals?" },
 { type: "p", text: "We decided to find out. Over three months, we ran extensive A/B tests across multiple high-traffic landing pages, isolating typography as the only variable." },
 { type: "h2", text: "Legibility Over Personality" },
 { type: "p", text: "Our first major finding was that legibility trumps brand personality when it comes to conversion. In one test for a fintech client, we swapped a highly stylized, 'techy' display font in the hero section for a standard, highly readable system font (San Francisco/Inter). The conversion rate increased by 8.4%." },
 { type: "p", text: "Users spend milliseconds evaluating a page. If their brain has to work even 10% harder to decode the letterforms, cognitive friction increases, and they bounce. Highly stylized fonts should be reserved for massive headings or decorative elements, never for value propositions." },
 { type: "quote", text: "Nobody ever abandoned a checkout flow because the font was too boring. Millions have abandoned them because the font was too hard to read." },
 { type: "h2", text: "The Serif Trust Factor" },
 { type: "p", text: "Interestingly, we found that for high-ticket items and B2B services, introducing a classic serif (like Garamond or Playfair Display) in headers significantly increased perceived trust. In a survey of users who saw the serif version of a consulting landing page, responses rated the company as 'more established' and 'authoritative' compared to the sans-serif control group." },
 { type: "h2", text: "Line Height and Line Length" },
 { type: "p", text: "Perhaps the most impactful typographic change wasn't the font family at all, but the typesetting. We found that restricting line lengths to 60-70 characters and increasing line-height to 1.6 on body copy increased time-on-page by an average of 22%. Users were actually reading the content rather than skimming." },
 { type: "p", text: "Typography is the voice of your interface. Make sure it's speaking clearly." }
 ]
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
 content: [
 { type: "p", text: "When we launched Greene Studios, we had zero marketing budget. We couldn't compete on paid ads with massive agencies, and buying sketchy backlinks felt completely misaligned with our brand values. We had to grow organically, relying purely on the quality of our insights." },
 { type: "p", text: "18 months later, our journal drives 40,000 highly targeted organic visitors per month, resulting in a consistent pipeline of high-quality leads. Here is exactly how we did it." },
 { type: "h2", text: "Writing for the Practitioner, Not the Algorithm" },
 { type: "p", text: "The biggest mistake companies make with SEO is writing 'SEO content'. You know what I'm talking about: articles titled 'What is UI Design?' that read like a Wikipedia entry written by a robot. Nobody shares that content. Nobody links to it organically." },
 { type: "p", text: "Instead of targeting massive, impossible keywords, we targeted hyper-specific problems we were solving in our daily work. We wrote highly technical deep-dives on topics like 'Managing Z-Index in complex React Applications' or 'Designing state machines for checkout flows'. These articles had low search volume, but incredibly high intent." },
 { type: "quote", text: "Don't write content to answer a search query. Write content to solve a peer's problem so thoroughly that they bookmark it." },
 { type: "h2", text: "The compounding effect of 'Original Research'" },
 { type: "p", text: "Our biggest spikes in traffic came from publishing original data. Whenever we ran an A/B test or audited 50 SaaS pricing pages, we published the raw data and our analysis. Because we were the primary source of this data, other blogs and newsletters linked to us naturally. One article containing original research generated more backlinks than 20 opinion pieces combined." },
 { type: "h2", text: "Technical SEO Basics" },
 { type: "p", text: "While content is king, you must provide a clean house for it. We ensured our Next.js architecture delivered sub-second load times, perfect semantic HTML, and dynamic OpenGraph images for social sharing. Google rewards fast, accessible websites with higher rankings." },
 { type: "p", text: "SEO isn't a hack. It's the natural byproduct of consistently publishing excellent, helpful content on a well-built website." }
 ]
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
 content: [
 { type: "p", text: "For the first three years of my career, I was a successful freelancer by all external metrics. I was fully booked, working with good clients, and making a decent living. But internally, I was exhausted. I was trading time for money, which meant there was a hard ceiling on my income and a constant floor on my stress levels." },
 { type: "h2", text: "The Hourly Trap" },
 { type: "p", text: "When you bill by the hour, your interests and the client's interests are fundamentally misaligned. You are incentivized to take longer; they are incentivized to rush you. Furthermore, as you get better and faster at your craft, you actually penalize yourself financially." },
 { type: "p", text: "The turning point was realizing that clients don't want to buy hours of design. They want to buy a business outcome. They want more signups, a better brand perception, or a smoother user experience." },
 { type: "quote", text: "When you sell hours, you are a commodity. When you sell outcomes, you are a partner." },
 { type: "h2", text: "Productizing the Service" },
 { type: "p", text: "To make the leap from freelancer to studio, we had to standardize our offering. We stopped doing custom proposals for every single inquiry. Instead, we created defined packages (Starter, Growth, Premium) with clear deliverables, timelines, and value propositions." },
 { type: "p", text: "This constraint was liberating. It allowed us to build highly optimized internal processes. We weren't reinventing the wheel every month. We knew exactly how long a 'Growth' project took, which allowed us to hire contractors and scale the team confidently." },
 { type: "h2", text: "Saying No to Say Yes" },
 { type: "p", text: "The hardest part of the transition was turning down work that didn't fit our new model. We had to reject lucrative hourly contracts because they diluted our focus. But saying 'no' to the wrong work created the vacuum necessary to attract the right work, clients who respected our process and valued our expertise over our time." }
 ]
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
 answer: "Absolutely. We often act as a design partner for technical teams, delivering pixel-perfect Figma files, design systems, and detailed component specs that make developer handoff seamless.",
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
