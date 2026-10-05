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
 fromUsd: 2000,
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


// ─── Journal Articles ─────────────────────────────────────────────────────────

export const JOURNAL_ARTICLES = [
 {
 id: "building-greene-studios",
 title: "Building Greene Studios",
 excerpt: "I started a design studio with no clients, no capital, and a name I picked because I liked the colour green. A year later, I understand what I was actually trying to build, and it's not what I thought.",
 category: "Business",
 date: "June 12, 2026",
 readTime: "3 min read",
 featured: false,
 slug: "building-greene-studios",
 image: "/images/covers/building-greene-studios.webp",
 original: "https://olabisiadigun.xyz/blog/building-greene-studios/",
 content: [
 { type: "p", text: "Greene Studios started as a lie I told myself to feel more legitimate." },
 { type: "p", text: "I was freelancing, taking whatever Figma gig I could find on Twitter, designing logos for ₦15,000, doing landing page redesigns for clients who would spend three weeks in feedback loops and then disappear without paying. It worked. Kind of. But it felt shapeless. I had skills, I had clients, but I didn't have anything I could point to and say: this is what I do." },
 { type: "p", text: "So I created a brand. I named it Greene Studios, registered an email address, built a one-page website, and started telling clients they were working with a studio rather than a freelancer. The work was identical. But something shifted in how clients treated me, in what they were willing to pay, and in how I thought about what I was doing." },
 { type: "h2", text: "The name" },
 { type: "p", text: "I get asked about the name often. The honest answer: I like the colour green. It feels calm, ambitious, and alive at the same time. I wanted a name that felt like a place where interesting work happened. A studio, not a service." },
 { type: "p", text: "The \"e\" at the end is deliberate. It makes it look older, more established. Like something that's been around long enough to have developed a house style." },
 { type: "h2", text: "What I got wrong about running a creative business" },
 { type: "p", text: "Almost everything, in sequence." },
 { type: "p", text: "I priced by the hour. Hourly pricing is a trap for creative work. It punishes speed and rewards inefficiency. A designer who delivers a polished identity in 8 hours is worth more than one who takes 40 hours to reach the same result, but hourly billing has that exactly backwards. I switched to project-based pricing after three months and immediately started making more money with fewer clients." },
 { type: "p", text: "I thought good work would market itself. Good work is necessary but not sufficient. The design industry is full of incredibly talented people doing work nobody knows about. Distribution is a skill, and I had to learn it the hard way. I spent six months building a portfolio that three people saw." },
 { type: "p", text: "I confused being busy with making progress. There was a period where I had more clients than I could handle, was constantly exhausted, and was producing work I wasn't proud of. That's not running a studio. That's running a sweatshop with one employee." },
 { type: "quote", text: "A studio has a point of view. A service provider delivers outputs. I had to decide which one I wanted to be." },
 { type: "h2", text: "What Greene Studios is actually about" },
 { type: "p", text: "After a year of making mistakes and correcting them, I've arrived at a clearer sense of what the studio is for." },
 { type: "p", text: "Greene Studios exists to help ambitious internet products look and feel as good as they actually are. Most founders build something genuinely interesting and then present it to the world in a way that undersells it completely. Bad typography. Generic colour palettes. Visual hierarchy that communicates nothing. I fix that." },
 { type: "p", text: "Specifically, I work with startups and founders in their first 18 months, when the product is still being defined, when the brand is still malleable, and when the visual decisions being made will compound for years. That's the moment where design has the most leverage, and it's where I do my best work." },
 { type: "h2", text: "The technical turn" },
 { type: "p", text: "Something I didn't anticipate when I started the studio: being a full-stack engineer makes me a significantly better designer. When you understand how constraints compound across a system, how a design decision on a component level ripples into performance, accessibility, and maintenance cost, you make different choices." },
 { type: "p", text: "Greene Studios now offers implementation, not just design. I don't hand clients a Figma file and wish them luck. I build. That changes the nature of the relationship entirely, and it changes what \"good design\" means: it has to work in production, not just in a prototype." },
 { type: "h2", text: "Where it goes from here" },
 { type: "p", text: "I'm not trying to build a large agency. I'm not interested in managing a team of ten designers and spending my days in project management software. What I want is a small, selective operation with a distinctive point of view that produces a small number of exceptional things per year." },
 { type: "p", text: "The model I aspire to is closer to an architect's practice than a design agency. The architect doesn't just hand you blueprints. They think deeply about how you'll inhabit a space, advocate for decisions that serve you in ways you didn't know to ask for, and take responsibility for the final result." },
 { type: "p", text: "That's what Greene Studios is becoming." }
 ],
 },
 {
 id: "why-i-built-meshlearn",
 title: "Why I Built MeshLearn",
 excerpt: "How a frustrating lecture-download problem turned into the most technically challenging project of my life, and what I learned about building for people who are truly underserved.",
 category: "Product",
 date: "July 4, 2026",
 readTime: "4 min read",
 featured: false,
 slug: "why-i-built-meshlearn",
 image: "/images/covers/why-i-built-meshlearn.webp",
 original: "https://olabisiadigun.xyz/blog/why-i-built-meshlearn/",
 content: [
 { type: "p", text: "It started with a 200MB video lecture that took six hours to download." },
 { type: "p", text: "We were deep into the second semester of second year, and the university's e-learning portal had just been updated with a new batch of recorded lectures for our Data Structures course. Great. Except the campus network was essentially unusable by 9am because hundreds of students were all trying to pull the same files simultaneously." },
 { type: "p", text: "By the time my laptop finished downloading, it was past midnight. I'd spent the whole day in the library waiting. Not studying. Waiting. And I was one of the lucky ones: I had a laptop and a reliable enough connection that the download eventually completed. Many of my classmates just gave up and found someone's WhatsApp group where a single student had compressed the video into a grainy 40MB file." },
 { type: "p", text: "That was the moment I started paying serious attention to the problem." },
 { type: "h2", text: "The real scale of it" },
 { type: "p", text: "I started talking to students across different faculties and departments. Same story, different details. Engineering students downloading CAD software packages. Medical students trying to access virtual lab simulations. Law students pulling down case libraries." },
 { type: "p", text: "The shared theme was always: the content exists, the device exists, the desire to learn exists, but the pipe is broken." },
 { type: "quote", text: "The most dangerous kind of poverty isn't not having access to content. It's being close enough to touch it but unable to grab it." },
 { type: "p", text: "I didn't want to wait for the infrastructure to catch up. I wanted to build something that worked with the hardware that already existed in every student's pocket." },
 { type: "h2", text: "The first bad idea" },
 { type: "p", text: "My first instinct was an offline-first progressive web app. Download lectures when you have connectivity, consume them offline later. Standard stuff. I built a prototype in about two weeks." },
 { type: "p", text: "It worked. But it didn't solve the real problem. It still required each student to independently find connectivity and download content. If you lived off-campus, or your device died before you could sync, or you simply didn't know a lecture had been uploaded, you were still stuck." },
 { type: "p", text: "The insight I was missing was this: the problem isn't individual access, it's collective distribution. On any given campus, a handful of students with decent connectivity are accidentally gatekeeping content from the students around them." },
 { type: "h2", text: "Bluetooth as a network" },
 { type: "p", text: "The idea of using Bluetooth for content distribution came from an unlikely source: reading about how people have used Bluetooth-based messaging apps to communicate when cellular networks were throttled. If Bluetooth could carry those messages, it could definitely carry lecture PDFs." },
 { type: "p", text: "I spent two weeks reading everything I could about BLE (Bluetooth Low Energy): how it works, what its throughput limits are, how Android and iOS handle BLE differently, what background scanning limitations exist on each platform." },
 { type: "p", text: "BLE is slow. Maximum throughput in ideal conditions is around 250kbps on a single connection. But the key insight is that in a mesh topology, you're not relying on a single connection. You're pipelining data across multiple hops. One device seeds to five nearby devices simultaneously, each of which becomes a seed node for the next five." },
 { type: "h2", text: "What I got wrong" },
 { type: "p", text: "I underestimated how aggressively Android kills background Bluetooth processes to save battery. The first version of the mesh collapsed every time a user locked their phone." },
 { type: "p", text: "I assumed all Bluetooth stacks behave the same across Android manufacturers. They do not. Samsung, Xiaomi, and Tecno all have slightly different BLE implementations." },
 { type: "p", text: "I built the content chunking algorithm to optimise for speed, not resilience. Chunks arrived out of order, and reassembly failed silently. Students got corrupted files with no feedback about why." },
 { type: "p", text: "I assumed students would keep the app open. They don't. I had to rebuild the entire transfer queue around the assumption that the app could be killed at any point." },
 { type: "p", text: "Each of these failures cost me weeks. But I kept going, because every time I showed a working version to a student who actually needed it, watching their face when a video loaded without them having to hunt for connectivity, I felt the pull of the problem too strongly to quit." },
 { type: "h2", text: "Where it is now" },
 { type: "p", text: "MeshLearn is in closed beta with about 60 students across three departments. The BLE mesh is stable. Content propagation works. The ML recommendation engine is live but still rough around the edges." },
 { type: "p", text: "The most surprising result of the beta has been the social dynamics it creates. Students have started forming informal study groups around the app. They meet physically because the mesh works best when devices are close together, and those in-person meetings have been more effective than anything a digital tool alone could engineer." },
 { type: "quote", text: "Sometimes the best outcome of a technology is the human behaviour it accidentally enables." },
 { type: "h2", text: "What this taught me about building products" },
 { type: "p", text: "Building MeshLearn taught me that the most important product skill is not knowing how to build things. It's knowing why things are the way they are before you try to change them. I spent months assuming the problem was a technology problem. It's actually a distribution problem, which requires a technology solution, but those are very different framings, and they lead to very different products." },
 { type: "p", text: "The version of MeshLearn that exists today bears almost no resemblance to the version I imagined in that library at midnight, watching a progress bar crawl. And that's exactly how it should be." }
 ],
 },
 {
 id: "why-motion-matters",
 title: "Why Motion Design Is the Most Undervalued Investment in UX",
 excerpt: "Most teams treat animation as decoration. It works better as communication. Here's the difference.",
 category: "Motion Design",
 date: "December 12, 2024",
 readTime: "8 min read",
 featured: false,
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
 featured: false,
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
 }
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const FAQS = [
 {
 question: "How quickly do you reply?",
 answer: "Within hours, and always within one working day. Send a brief through the contact page or email hello@greenestudios.com.",
 },
 {
 question: "How long does a project take?",
 answer: "A brand identity or a website usually takes 1 to 3 weeks. A web or mobile app takes 2 to 4 months. You get a timeline with your quote, before anything starts.",
 },
 {
 question: "Do you work with startups?",
 answer: "Yes. We work with founders who are just starting and with established businesses. There's a package for each stage, and smaller one-off jobs too.",
 },
 {
 question: "What does working with you look like?",
 answer: "A short call first, then a quote and timeline. Once you're happy, we design, share the work with you for feedback, build, test and launch. You see progress at every step.",
 },
 {
 question: "Can you work with our own developers?",
 answer: "Yes. We can design and hand over the files and a design system to your team, or design and build alongside them.",
 },
 {
 question: "What happens after launch?",
 answer: "App builds include 30 days of support after launch. For ongoing changes and new features there's a monthly retainer.",
 },
 {
 question: "Do you sign NDAs and contracts?",
 answer: "Yes. Every project starts with a contract covering scope, ownership, payment and confidentiality, and we're happy to sign your NDA.",
 },
 {
 question: "Can I pay in my own currency?",
 answer: "Prices are set in US dollars and shown in your currency as a guide. We quote and invoice in the currency we agree with you.",
 }
];
