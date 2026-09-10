// ─── Brand Data ───────────────────────────────────────────────────────────────

export const BRAND = {
 name: "Greene Studios",
 tagline: "We design and build digital experiences that move people.",
 email: "hello@greenestudios.co",
 location: "Lagos, Nigeria — working worldwide",
 instagram: "https://instagram.com/greenestudios",
 twitter: "https://twitter.com/greenestudios",
 linkedin: "https://linkedin.com/company/greenestudios",
 github: "https://github.com/greenestudios",
 founded: "2022",
};

// ─── Navigation ───────────────────────────────────────────────────────────────

// The primary navigation stays deliberately small; deeper content remains
// discoverable from the work, studio and footer experiences.
export const NAV_LINKS = [
 { label: "Work", href: "/work" },
 { label: "Services", href: "/services" },
 { label: "Studio", href: "/studio" },
 { label: "Contact", href: "/contact" },
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
 from: "from $4,800",
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
 from: "from $6,000",
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
 from: "from $6,000",
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
 from: "from $6,000",
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
 from: "from $2,500",
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
 from: "from $8,000",
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
 from: "from $9,500",
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
 from: "from $4,000",
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
 from: "from $5,000",
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
 {
 id: "seo-geo-aeo",
 icon: "◍",
 title: "SEO · GEO · AEO",
 shortDesc: "Found by people, ranked by machines, quoted by AI.",
 description: "Search is no longer ten blue links. We engineer technical SEO, structured data and answer-ready content into every build, so Google, assistants and generative engines surface you first.",
 deliverables: ["Technical SEO", "Schema & structured data", "Answer-ready content", "AI-search visibility"],
 href: "/services/seo-geo-aeo",
 from: "from $2,000",
 whatIsIt: "SEO gets you ranked on results pages. GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) get you cited inside ChatGPT, Perplexity and Google's AI overviews. Together they decide whether a prospect finds you, or your competitor.",
 whoItsFor: [
 "Brands with a beautiful site that search engines barely index",
 "Companies whose competitors keep getting quoted by AI assistants",
 "Teams publishing content that never earns a featured snippet",
 "Launches that need discoverability built in from day one, not bolted on later"
 ],
 approach: [
 { title: "Engineering-first", desc: "Core Web Vitals, crawlable architecture, semantic markup and metadata systems, the technical foundation every ranking depends on." },
 { title: "Machine-readable everything", desc: "JSON-LD structured data, FAQ schemas and entity markup so answer engines can understand, trust and quote your pages." },
 { title: "Answer-ready content", desc: "We structure copy to directly answer the questions your customers actually type, into Google or into an AI." }
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

// ─── Process · condensed phases (homepage) ────────────────────────────────────
// The full 10-step methodology lives on /process. These six phases summarise it.

export const PROCESS_PHASES = [
 { number: "01", title: "Find the signal", stages: "Strategy · Research", description: "We align on the problem, the audience and the opportunity before a single pixel is placed.", duration: "1–2 weeks" },
 { number: "02", title: "Build the system", stages: "Architecture · Design", description: "We turn the north star into a flexible identity, interface and experience your team can actually use.", duration: "2–4 weeks" },
 { number: "03", title: "Make it move", stages: "Development · Motion", description: "Design and engineering work together to make the system feel alive, fast and considered across every screen.", duration: "3–8 weeks" },
 { number: "04", title: "Put it in the world", stages: "Launch · Iteration", description: "We ship carefully, measure what matters and stay close enough to improve what comes next.", duration: "Ongoing" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
// Every quote is anchored to a real case study and its headline result —
// proof, not floating praise.



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
 image: "/images/covers/why-motion-matters.webp",
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
 image: "/images/covers/design-systems-at-scale.webp",
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
 image: "/images/covers/ai-in-product-design.webp",
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
 image: "/images/covers/typography-that-converts.webp",
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
 image: "/images/covers/the-0-seo-strategy.webp",
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
 image: "/images/covers/freelance-to-studio.webp",
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
 answer: "Every tier includes post-launch support — 14 days on MVP, 30 days on Growth, 12 months on Enterprise. We watch performance, fix what breaks, and iterate on what real usage shows.",
 },
 {
 question: "Do you sign NDAs and contracts?",
 answer: "Yes, always. Every project starts with a detailed contract covering scope, IP, payment terms, and confidentiality. We take these seriously because your work is valuable.",
 },
];

// ─── Metrics ──────────────────────────────────────────────────────────────────


// ─── Industries ───────────────────────────────────────────────────────────────
// Each industry is a real destination: /industries/[slug]. Service refs point at
// SERVICES hrefs; work refs point at concept brand slugs (src/lib/brands).

export const INDUSTRIES = [
 {
 slug: "saas",
 name: "SaaS",
 icon: "⬡",
 tagline: "Products that sell themselves in the first session.",
 description: "We design SaaS products and marketing sites where the value is obvious in sixty seconds. Activation, retention and perceived quality, treated as design problems.",
 stat: { value: "50+", label: "Chart types in the Luminary system" },
 challenges: [
 { title: "Leaky onboarding", desc: "Signups arrive, tour three screens, and never come back. The product is powerful but the first-run experience hides it." },
 { title: "Feature bloat", desc: "Every release added a button. Navigation sprawls, settings multiply, and the core job-to-be-done gets buried alive." },
 { title: "Looks early-stage", desc: "The engineering is enterprise-grade, but the interface still looks like the MVP. Procurement teams notice, and it slows deals down." },
 ],
 moves: [
 { title: "Activation-first UX", desc: "We redesign the first session around the aha-moment. Progressive disclosure, opinionated defaults, empty states that teach." },
 { title: "Systems that scale", desc: "A tokenized design system covering every chart, form and state, so the product ships faster without drifting apart visually." },
 { title: "A site that closes", desc: "A marketing site engineered around demo conversion, with the product doing the talking instead of stock illustrations." },
 ],
 services: ["/services/ui-ux-design", "/services/product-design", "/services/web-design", "/services/design-systems"],
 work: ["luminary"],
 },
 {
 slug: "ecommerce",
 name: "E-commerce",
 icon: "◈",
 tagline: "Storefronts where speed is the brand.",
 description: "We build headless storefronts that load in under a second, read like an editorial magazine, and check out without friction. Performance is a design feature, not a ticket.",
 stat: { value: "0", label: "Layout shift on Arc Commerce" },
 challenges: [
 { title: "Slow and template-made", desc: "Four-second loads and a theme thousands of other stores share. Ad spend keeps rising while conversion quietly falls." },
 { title: "Content can't sell", desc: "Lookbooks, stories and campaigns live on a blog nobody visits, completely disconnected from the products they feature." },
 { title: "Checkout friction", desc: "Six steps, three accounts offers, surprise shipping costs. Carts get abandoned at the exact moment of intent." },
 ],
 moves: [
 { title: "Headless performance", desc: "Next.js storefronts on edge infrastructure with sub-second transitions. Every 100ms saved shows up in revenue." },
 { title: "Editorial commerce", desc: "Shoppable storytelling built into the CMS, so campaigns and products sell together on the same page." },
 { title: "One-page checkout", desc: "A custom, brand-consistent checkout with the fewest possible fields between desire and confirmation." },
 ],
 services: ["/services/web-design", "/services/frontend-development", "/services/motion-design"],
 work: ["arc", "vera"],
 },
 {
 slug: "startups",
 name: "Startups",
 icon: "◉",
 tagline: "Look funded before you are.",
 description: "We give early teams the brand, product and presence of a company three stages ahead. Investor-ready decks, user-ready products, one senior team for all of it.",
 stat: { value: "AA", label: "Contrast floor across Onyx" },
 challenges: [
 { title: "Credibility gap", desc: "The idea is big, the mockups are not. Customers, hires and investors all judge the company by surfaces that scream day one." },
 { title: "MVP paralysis", desc: "Six months of building features nobody has validated. The roadmap is guesswork and the budget is burning." },
 { title: "No story", desc: "The pitch explains what the product does, but never why anyone should care. Same deck, same gradients, same stock art." },
 ],
 moves: [
 { title: "Brand in three weeks", desc: "Positioning, identity and a messaging spine that makes a two-person team look inevitable, not aspirational." },
 { title: "Prototype before code", desc: "Testable, clickable product prototypes in weeks, so the roadmap is evidence instead of hope." },
 { title: "Launch assets", desc: "Site, deck, and product walkthrough built as one system. Everything an investor or first customer touches, consistent." },
 ],
 services: ["/services/branding", "/services/product-design", "/services/web-design"],
 work: ["onyx", "vera", "prism"],
 },
 {
 slug: "finance",
 name: "Finance",
 icon: "◆",
 tagline: "Complex money, made legible.",
 description: "We design fintech and financial products where the data is dense, the stakes are high, and trust is earned pixel by pixel. Compliance-friendly by default.",
 stat: { value: "Tabular", label: "Figures throughout Onyx" },
 challenges: [
 { title: "Institutional aesthetics", desc: "Grey tables and navy gradients that signal legacy. Younger users bounce before they ever see the product's value." },
 { title: "Data intimidation", desc: "Forecasting, portfolios and risk models crammed onto one screen. Analysts export to CSV because the product feels harder than the spreadsheet." },
 { title: "Trust without personality", desc: "Security theatre everywhere, humanity nowhere. The product is safe and completely forgettable." },
 ],
 moves: [
 { title: "Visualizations people read", desc: "Custom chart systems that reveal high-level truth first and raw data on demand. Density without intimidation." },
 { title: "Mainstream polish", desc: "Consumer-grade interfaces with gaming-native cues, proving finance can feel like a product people choose, not endure." },
 { title: "Designed-in compliance", desc: "Accessible, auditable component systems where disclosures and states are designed, not appended by legal later." },
 ],
 services: ["/services/ui-ux-design", "/services/product-design", "/services/ai-integration"],
 work: ["onyx", "luminary"],
 },
 {
 slug: "healthcare",
 name: "Healthcare",
 icon: "◇",
 tagline: "Calm is a feature. We design for it.",
 description: "We build patient-facing products where clarity lowers stress and accessibility is the baseline, not the audit. WCAG 2.1 AA is the floor we start from.",
 stat: { value: "AAA", label: "Body-text contrast on Bloom Health" },
 challenges: [
 { title: "Anxious users, hostile UI", desc: "People use health products at their most stressed. Alarmist reds, medical jargon and dense forms make hard moments harder." },
 { title: "Accessibility debt", desc: "Products serving elderly and disabled users that fail screen readers, contrast checks and basic keyboard navigation." },
 { title: "Fragmented experience", desc: "Portal, app and booking system all feel like different companies. Patients relearn the interface at every touchpoint." },
 ],
 moves: [
 { title: "Empathetic UX", desc: "Jargon-free content design, paced information, and flows written for a person having a difficult day, not a power user." },
 { title: "Calm visual systems", desc: "Color and type chosen for reassurance, with alert patterns that inform without alarming." },
 { title: "One system, every platform", desc: "A single design system across iOS, Android and web so patients learn the product once and trust it everywhere." },
 ],
 services: ["/services/product-design", "/services/ui-ux-design", "/services/design-systems"],
 work: ["bloom"],
 },
 {
 slug: "education",
 name: "Education",
 icon: "◎",
 tagline: "Learning products people actually finish.",
 description: "We design edtech where motivation is treated as a design problem. Progress is visible, focus is protected, and completion rates prove it.",
 stat: { value: "8pt", label: "Grid behind every Prism screen" },
 challenges: [
 { title: "The completion cliff", desc: "Enrollment looks great in the pitch. Then reality hits: rigid linear courses and 8% of students reaching the final module." },
 { title: "Content-rich, experience-poor", desc: "World-class material trapped inside a video player and a table of contents. The content deserves a better interface." },
 { title: "Invisible progress", desc: "Students can't see how far they've come or what's next. Without feedback, motivation quietly drains away." },
 ],
 moves: [
 { title: "Learning loops", desc: "Skill-tree curricula, unlockable paths and micro-feedback that make progress feel tangible session after session." },
 { title: "Focus-first environments", desc: "Theater-mode learning spaces that dim the interface, silence the noise and protect deep work." },
 { title: "Instructor clarity", desc: "Dashboards that show exactly where students stall, so educators spend time teaching instead of data-mining." },
 ],
 services: ["/services/product-design", "/services/ui-ux-design", "/services/web-applications"],
 work: ["prism"],
 },
 {
 slug: "personal-brands",
 name: "Personal Brands",
 icon: "✦",
 tagline: "An audience is fleeting. A brand compounds.",
 description: "We turn creators, founders and experts into media properties. Signature identities, editorial sites and systems that turn attention into owned revenue.",
 stat: { value: "2", label: "Typefaces in the whole Vera system" },
 challenges: [
 { title: "Rented land", desc: "Everything lives on one platform's algorithm. The audience is real, the relationship with it is not." },
 { title: "Generic presence", desc: "A link-in-bio page, a template site, a Canva logo. The person is distinctive; the brand around them is not." },
 { title: "Attention without revenue", desc: "High engagement, weak conversion. There's no system carrying followers toward products, bookings or sponsorships." },
 ],
 moves: [
 { title: "Signature identity", desc: "A recognisable visual language designed around one person's voice, and impossible to confuse with anyone else's." },
 { title: "The owned home base", desc: "An editorial-grade website that captures email, ranks on search, and makes every platform post a funnel, not a dead end." },
 { title: "Content systems", desc: "Templates and a publishing setup that keep output consistent without a design team on retainer." },
 ],
 services: ["/services/branding", "/services/web-design", "/services/motion-design"],
 work: ["vera"],
 },
 {
 slug: "agencies",
 name: "Agencies",
 icon: "⬣",
 tagline: "Your quiet specialist department.",
 description: "We plug into agencies as a white-label senior team. Overflow capacity, motion and WebGL firepower, and design systems expertise. Your name on the delivery.",
 stat: { value: "95+", label: "Lighthouse on every build" },
 challenges: [
 { title: "Overflow, unpredictably", desc: "The pipeline swings between drought and flood. Hiring for the peak is expensive, surviving the trough is survival." },
 { title: "Specialist gaps", desc: "The account is won, then the brief demands WebGL, design systems or motion craft the in-house team doesn't cover." },
 { title: "Risky subcontractors", desc: "Freelancers who vanish mid-sprint, hand off mystery files, or need managing you don't have time for." },
 ],
 moves: [
 { title: "White-label delivery", desc: "Senior design and build shipped under your brand, with NDAs as standard and your PMs in full control of the client." },
 { title: "Firepower on demand", desc: "Motion systems, interactive WebGL and design-system architecture, booked by the sprint without a hiring process." },
 { title: "Predictable process", desc: "Fixed-scope sprints, weekly demos, and handoff documentation your team can actually maintain after we leave." },
 ],
 services: ["/services/frontend-development", "/services/motion-design", "/services/design-systems"],
 work: [],
 },
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

// ─── Pricing ──────────────────────────────────────────────────────────────────
// One source of truth. These were hardcoded inside PricingTiers.tsx while a
// second, contradictory list (Starter / Growth / Premium) sat in this file —
// two different price lists shipping in the same build.

export type Currency = "USD" | "EUR" | "NGN";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
 USD: "$",
 EUR: "\u20ac",
 NGN: "\u20a6",
};

/** Indicative only — a real quote is settled on the discovery call. */
export const EXCHANGE_RATES: Record<Currency, number> = {
 USD: 1,
 EUR: 0.92,
 NGN: 1500,
};

export interface PricingTier {
 name: string;
 description: string;
 /** In USD; other currencies are converted at the rates above. */
 basePrice: number;
 timeline: string;
 features: string[];
 isPopular?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
 {
 name: "MVP",
 description: "For an early-stage team putting a first real thing in front of people.",
 basePrice: 4800,
 timeline: "2 weeks",
 features: [
 "Brand identity — logo, palette, type",
 "Landing page design",
 "Next.js build, deployed",
 "Technical SEO baseline",
 "95+ Lighthouse, or we keep working",
 ],
 },
 {
 name: "Growth",
 description: "For a business whose digital presence is behind its product.",
 basePrice: 9500,
 timeline: "4\u20136 weeks",
 isPopular: true,
 features: [
 "Full brand guidelines",
 "Custom web app design",
 "Full-stack build (Next.js + Supabase)",
 "Content management",
 "Advanced SEO and analytics",
 "95+ Lighthouse, or we keep working",
 ],
 },
 {
 name: "Enterprise",
 description: "For complex products with real users and real constraints.",
 basePrice: 18000,
 timeline: "8\u201316 weeks",
 features: [
 "User research and testing",
 "Multi-surface product design",
 "Design system and component library",
 "Custom integrations (CRM, ERP)",
 "Dedicated project lead",
 "12 months priority support",
 ],
 },
];
