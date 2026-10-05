// ─── Brand Data ───────────────────────────────────────────────────────────────

export const BRAND = {
 name: "Greene Studios",
 tagline: "We design and build digital experiences that move people.",
 email: "hello@greenestudios.com",
 location: "Remote, Available worldwide",
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
 { label: "Studio", href: "/studio" },
 { label: "Team", href: "/team" },
 { label: "Contact", href: "/contact" },
];


// ─── Services ─────────────────────────────────────────────────────────────────

export const SERVICES = [
 {
 id: "web-design",
 icon: "✦",
 title: "Web Design",
 shortDesc: "Websites that explain what you do and bring in enquiries.",
 description: "A custom website that tells people what you do, why it matters to them and what to do next. Designed around your content, not a template.",
 deliverables: [
 "Custom page designs",
 "Layouts for phone, tablet and desktop",
 "A small design system",
 "Clickable prototype"
 ],
 href: "/services/web-design",
 fromUsd: 690,
 whatIsIt: "Your website is often the first proper look someone gets at your business. We design it so a visitor understands what you offer quickly, trusts you, and knows how to get in touch.",
 whoItsFor: [
 "Businesses launching something new",
 "Companies whose site no longer matches how good they are",
 "Startups that need a clear landing page for customers or investors",
 "Shops moving to a custom storefront"
 ],
 approach: [
 { title: "Words first", desc: "We sort out what the page needs to say before we design it, so the design supports the message." },
 { title: "A look of your own", desc: "Type, colour and layout chosen for your brand, so the site doesn't look like a template." },
 { title: "See it before it's built", desc: "You click through a prototype first, so changes are cheap and fast." }
 ]
 },
 {
 id: "ui-ux",
 icon: "◈",
 title: "UI/UX Design",
 shortDesc: "Apps and tools that are easy to use.",
 description: "We work out how people use your product, then design screens that make the common tasks quick and obvious.",
 deliverables: [
 "User research",
 "User flows",
 "Wireframes",
 "Usability testing"
 ],
 href: "/services/ui-ux-design",
 fromUsd: 590,
 whatIsIt: "UI/UX design is about making a product easy to use. We look at what people are trying to do, remove the steps that get in the way, and design screens that are clear at a glance.",
 whoItsFor: [
 "Software where users drop off during sign-up or setup",
 "Older tools that work but are hard to use",
 "Apps people download but don't come back to",
 "Founders who want to test an idea with a clickable prototype"
 ],
 approach: [
 { title: "Talk to users", desc: "We speak to the people who use your product and note where they get stuck." },
 { title: "Put things where people look", desc: "We organise features and content so the important things are easy to find." },
 { title: "Clear, accessible screens", desc: "Final designs that are readable, consistent and work for everyone." }
 ]
 },
 {
 id: "branding",
 icon: "◉",
 title: "Branding",
 shortDesc: "A brand that looks like you, everywhere.",
 description: "We help you decide what your brand stands for, then design the logo and visual system that shows it on screen and in print.",
 deliverables: [
 "Brand strategy",
 "Visual identity",
 "Logo design",
 "Brand guidelines"
 ],
 href: "/services/branding",
 fromUsd: 480,
 whatIsIt: "Your brand is how people recognise and remember you. We work out who you're for and how you want to come across, then turn that into a logo, colours, type and a tone that fit together.",
 whoItsFor: [
 "New businesses that want to look established from the start",
 "Companies that have changed what they do",
 "Brands that look different on every platform",
 "Products entering a crowded market"
 ],
 approach: [
 { title: "Positioning first", desc: "We agree who you're for and what makes you different before any sketching." },
 { title: "A system, not only a logo", desc: "Logo, colour, type and imagery rules that work together." },
 { title: "Guidelines you can use", desc: "A clear guide so your team can keep the brand consistent." }
 ]
 },
 {
 id: "frontend-dev",
 icon: "⬡",
 title: "Frontend Development",
 shortDesc: "Designs turned into fast, reliable websites.",
 description: "We build what's been designed, in clean, maintainable code. The people who design it build it, so nothing gets lost in between.",
 deliverables: [
 "React and Next.js builds",
 "Animation and motion",
 "CMS setup",
 "Speed check"
 ],
 href: "/services/frontend-development",
 fromUsd: 690,
 whatIsIt: "Frontend development turns a design into a working site or app. We write code that loads quickly, works on every screen and is easy to keep updating.",
 whoItsFor: [
 "Design teams who need their Figma files built properly",
 "Companies moving to a modern setup like Next.js",
 "Sites that are slow or rank poorly because of it",
 "Brands that want rich animation on their site"
 ],
 approach: [
 { title: "Reusable parts", desc: "Built from components, so the site stays consistent and updates are easy." },
 { title: "Motion built in", desc: "Animation planned with the build, so it stays smooth." },
 { title: "Fast by default", desc: "Images, code and hosting set up so pages load quickly." }
 ]
 },
 {
 id: "motion-design",
 icon: "◎",
 title: "Motion Design",
 shortDesc: "Animation that helps people understand.",
 description: "From small interface animations to logo animations, we use motion to explain what's happening and give your brand some character.",
 deliverables: [
 "Interface animations",
 "Logo animation",
 "Motion guidelines",
 "Lottie and GSAP files"
 ],
 href: "/services/motion-design",
 fromUsd: 190,
 whatIsIt: "Motion design adds movement to your product or brand. Done well, it shows people where to look, explains what just changed, and makes the experience feel more like you.",
 whoItsFor: [
 "Products that feel stiff",
 "Dashboards where data changes need explaining",
 "Websites showing a physical product",
 "Brands that want a recognisable feel"
 ],
 approach: [
 { title: "One rhythm", desc: "Timing and easing chosen once, so everything moves the same way." },
 { title: "Feedback that helps", desc: "Buttons, toggles and loaders that react clearly when used." },
 { title: "Story on scroll", desc: "Animations that reveal your product as people scroll, where it helps." }
 ]
 },
 {
 id: "product-design",
 icon: "⬣",
 title: "Product Design",
 shortDesc: "Products people come back to.",
 description: "Product design from first idea to launch. We work with your team to design the product and the system behind it.",
 deliverables: [
 "Product strategy",
 "Design from scratch",
 "Design system",
 "Handoff to developers"
 ],
 href: "/services/product-design",
 fromUsd: 890,
 whatIsIt: "Product design covers the whole product: what it should do, how it works, how it looks, and whether it can be built. We help you make those decisions and design something people actually use.",
 whoItsFor: [
 "Founders building a first version",
 "Software companies redesigning their main product",
 "Teams who need a designer working alongside their developers",
 "Products that need a design system to keep up with growth"
 ],
 approach: [
 { title: "Start with the business", desc: "We learn your goals, your users and your limits first." },
 { title: "Design for the edge cases", desc: "Screens and states that cover more than the happy path." },
 { title: "Ship in steps", desc: "Design delivered in rounds and improved with real feedback." }
 ]
 },
 {
 id: "web-applications",
 icon: "◆",
 title: "Web Applications",
 shortDesc: "Web apps, built properly from front to back.",
 description: "We build complete web applications: the database, the server and the screens. You get a working product you can grow.",
 deliverables: [
 "Full-stack development",
 "API design",
 "Database design",
 "Hosting and deployment"
 ],
 href: "/services/web-applications",
 fromUsd: 1500,
 whatIsIt: "A web application is software people use in the browser, like a dashboard, a booking system or a platform. We build all of it, from how the data is stored to the screens people use.",
 whoItsFor: [
 "Startups that need a first version built well",
 "Companies replacing old internal tools",
 "Founders with a design who need it built",
 "Products that need live updates or complex logic"
 ],
 approach: [
 { title: "Proven tools", desc: "Built on Next.js, Node and PostgreSQL, hosted on Vercel or AWS." },
 { title: "Ready for mobile later", desc: "A clean API, so a mobile app can use the same backend." },
 { title: "Tested and secure", desc: "Sign-in, automated tests and deploy checks set up from the start." }
 ]
 },
 {
 id: "ai-integration",
 icon: "⬟",
 title: "AI Integration",
 shortDesc: "AI features that actually help.",
 description: "We add AI to your product where it saves people time, such as search, writing help or support, and design it so people can trust it.",
 deliverables: [
 "AI feature design",
 "LLM integration",
 "Prompt design",
 "AI interface patterns"
 ],
 href: "/services/ai-integration",
 fromUsd: 490,
 whatIsIt: "AI integration means adding features powered by models like GPT or Claude to your product. We pick the places where it genuinely helps and design the experience around it.",
 whoItsFor: [
 "Products that handle lots of text",
 "Tools where long forms could become a conversation",
 "Apps that could sort or suggest things automatically",
 "Companies that want help with support or onboarding"
 ],
 approach: [
 { title: "Be clear it's AI", desc: "People always know when AI is involved and how their data is used." },
 { title: "Built to be reliable", desc: "Streaming, limits and long conversations handled properly." },
 { title: "Plan for mistakes", desc: "Fallbacks for when the model gets it wrong or the service is down." }
 ]
 },
 {
 id: "design-systems",
 icon: "◇",
 title: "Design Systems",
 shortDesc: "One set of parts for design and code.",
 description: "A shared library of components, styles and documentation, so your product stays consistent as it grows.",
 deliverables: [
 "Component library",
 "Design tokens",
 "Documentation",
 "Accessibility check"
 ],
 href: "/services/design-systems",
 fromUsd: 590,
 whatIsIt: "A design system is one shared set of building blocks for your product: buttons, forms, colours, type and the rules for using them, kept in step in Figma and in code.",
 whoItsFor: [
 "Teams where design and code keep drifting apart",
 "Products that look inconsistent after years of changes",
 "Companies about to grow their team",
 "Businesses running several products under one brand"
 ],
 approach: [
 { title: "Tokens", desc: "Colour, spacing and type stored as variables, so a change is made once." },
 { title: "Figma matches code", desc: "Each Figma component has a matching coded one." },
 { title: "Written down", desc: "Clear notes on when and how to use each part." }
 ]
 },
 {
 id: "seo-geo-aeo",
 icon: "◍",
 title: "SEO · GEO · AEO",
 shortDesc: "Easy to find on Google and in AI answers.",
 description: "We build search into your site from the start: fast pages, clear structure and content that answers real questions, so search engines and AI assistants can find and quote you.",
 deliverables: [
 "Technical SEO",
 "Structured data",
 "Answer-ready content",
 "AI search visibility"
 ],
 href: "/services/seo-geo-aeo",
 fromUsd: 190,
 whatIsIt: "SEO helps you show up in Google results. GEO and AEO help you get mentioned in AI answers from tools like ChatGPT and Perplexity. All three depend on a well-built site with clear, useful content.",
 whoItsFor: [
 "Good-looking sites that barely show up in search",
 "Businesses whose competitors get mentioned by AI tools",
 "Teams whose articles never get picked up",
 "Launches that want search built in from day one"
 ],
 approach: [
 { title: "Solid foundations", desc: "Fast pages, clean structure and the right metadata." },
 { title: "Readable by machines", desc: "Structured data so search engines and AI tools understand your pages." },
 { title: "Answer real questions", desc: "Copy that answers what customers actually search for." }
 ]
 },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
 {
 number: "",
 title: "Discovery",
 description: "We start by listening. Deep dive into your goals, audience, competitive landscape, and what success truly looks like for your project.",
 duration: "1–2 weeks",
 },
 {
 number: "",
 title: "Research",
 description: "User interviews, competitor audits, market analysis. We build the strategic foundation that every design decision rests on.",
 duration: "1–2 weeks",
 },
 {
 number: "",
 title: "Strategy",
 description: "Architecture, content strategy, and creative direction. We align on the north star before a single pixel is placed.",
 duration: "1 week",
 },
 {
 number: "",
 title: "Wireframes",
 description: "Low-fidelity structures that prioritize flow and hierarchy. We test assumptions early before investing in high-fidelity design.",
 duration: "1–2 weeks",
 },
 {
 number: "",
 title: "Design",
 description: "High-fidelity screens brought to life with our signature attention to detail. Every state, every edge case, every delight.",
 duration: "2–4 weeks",
 },
 {
 number: "",
 title: "Prototype",
 description: "Interactive prototypes for stakeholder alignment and user testing. You'll feel the product before a line of code is written.",
 duration: "1 week",
 },
 {
 number: "",
 title: "Development",
 description: "Clean, performant code that brings designs to life with precision. We use modern frameworks and obsess over performance.",
 duration: "3–8 weeks",
 },
 {
 number: "",
 title: "Testing",
 description: "Cross-device, cross-browser, accessibility audits, performance benchmarks. We ship nothing we wouldn't be proud to sign.",
 duration: "1–2 weeks",
 },
 {
 number: "",
 title: "Launch",
 description: "Coordinated go-live with monitoring, rollback plans, and your team trained on every part of the system.",
 duration: "1 week",
 },
 {
 number: "",
 title: "Support",
 description: "We don't disappear after launch. Ongoing support, iteration, and growth, a true long-term partnership.",
 duration: "Ongoing",
 },
];

// ─── Process · condensed phases (homepage) ────────────────────────────────────

export const PROCESS_PHASES = [
 { number: "", title: "Find the signal", stages: "Strategy · Research", description: "We align on the problem, the audience and the opportunity before a single pixel is placed.", duration: "1–2 weeks" },
 { number: "", title: "Build the system", stages: "Architecture · Design", description: "We turn the north star into a flexible identity, interface and experience your team can actually use.", duration: "2–4 weeks" },
 { number: "", title: "Make it move", stages: "Development · Motion", description: "Design and engineering work together to make the system feel alive, fast and considered across every screen.", duration: "3–8 weeks" },
 { number: "", title: "Put it in the world", stages: "Launch · Iteration", description: "We ship carefully, measure what matters and stay close enough to improve what comes next.", duration: "Ongoing" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────



// ─── Journal Articles ─────────────────────────────────────────────────────────

export const JOURNAL_ARTICLES = [
 {
 id: "why-motion-matters",
 title: "Why Motion Design Is the Most Undervalued Investment in UX",
 excerpt: "Most teams treat animation as decoration. It works better as communication. Here's the difference.",
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
 { type: "p", text: "Stakeholders often ask for the ROI of motion design. It's notoriously difficult to measure directly through A/B testing because motion affects long-term brand perception and emotional resonance rather than immediate click-through rates. Still, motion that explains where things come from and where they go answers the 'where did that go?' questions before anyone has to ask them." },
 { type: "p", text: "Why? Because when a user clicked a menu icon, the items slid out from the icon's origin point. The user's eye naturally tracked the movement, establishing a spatial relationship in their mind. They learned the interface through physics." },
 { type: "h2", text: "Implementing Motion Sensibly" },
 { type: "p", text: "To do motion right, it needs to be established at the design system level, not the component level. Define your easing curves globally. Decide on your duration tokens (e.g., 150ms for micro-interactions, 300ms for large layout shifts). Treat motion as a core brand element, just like your typography or color palette." },
 { type: "p", text: "When motion is purposeful, quick, and grounded in physical reality, it elevates a product from a mere tool into an experience." }
 ]
 },
 {
 id: "design-systems-at-scale",
 title: "Design Systems at Scale: What Makes One Last",
 excerpt: "Building a design system isn't a sprint, it's a discipline. Here's what makes the difference between one that lasts and one that's abandoned.",
 category: "Design Systems",
 date: "November 28, 2024",
 readTime: "12 min read",
 featured: true,
 slug: "design-systems-at-scale",
 image: "/images/covers/design-systems-at-scale.webp",
 content: [
 { type: "p", text: "Three years ago, 'Design System' was the hottest buzzword in the industry. Every company, regardless of size, felt compelled to build one. Many of them ended up as a graveyard of abandoned Figma files and deprecated React libraries." },
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
 excerpt: "Every week brings a new AI tool claiming to replace designers. Here's our honest take on where it helps and where it doesn't.",
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
 }
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
 answer: "Discovery, Research, Strategy, Wireframes, Design, Prototype, Development, Testing, Launch, Support. Every phase has clear deliverables, reviews, and your input built in.",
 },
 {
 question: "Can you work with our existing development team?",
 answer: "Absolutely. We often act as a design partner for technical teams, delivering pixel-perfect Figma files, design systems, and detailed component specs that make developer handoff seamless.",
 },
 {
 question: "What's included after launch?",
 answer: "Every tier includes post-launch support, 14 days on MVP, 30 days on Growth, 12 months on Enterprise. We watch performance, fix what breaks, and iterate on what real usage shows.",
 },
 {
 question: "Do you sign NDAs and contracts?",
 answer: "Yes, always. Every project starts with a detailed contract covering scope, IP, payment terms, and confidentiality. We take these seriously because your work is valuable.",
 },
];

// ─── Metrics ──────────────────────────────────────────────────────────────────


// ─── Industries ───────────────────────────────────────────────────────────────

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

export type Currency = "USD" | "EUR" | "NGN";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
 USD: "$",
 EUR: "\u20ac",
 NGN: "\u20a6",
};

export const EXCHANGE_RATES: Record<Currency, number> = {
 USD: 1,
 EUR: 0.92,
 NGN: 1500,
};

export interface PricingTier {
 name: string;
 description: string;
 basePrice: number;
 timeline: string;
 features: string[];
 isPopular?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
 {
 name: "Starter",
 description: "For founders getting the first version in front of real people.",
 basePrice: 1200,
 timeline: "2 weeks",
 features: [
 "Brand identity, logo, palette, type",
 "Landing page design",
 "Next.js build, deployed",
 "Technical SEO baseline",
 "95+ Lighthouse, or we keep working",
 ],
 },
 {
 name: "Growth",
 description: "For teams whose product has outgrown its presence.",
 basePrice: 2800,
 timeline: "4 to 6 weeks",
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
 name: "Scale",
 description: "For complex products with real users and constraints.",
 basePrice: 6500,
 timeline: "8 to 16 weeks",
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
