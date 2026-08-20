/**
 * Central dummy-data source.
 * Swap these for real API payloads later — the UI just maps over these arrays.
 *
 * NOTE: `icon` values are plain STRING keys (e.g. "web", "mobile").
 * Components stay OUT of the data so the payloads remain serializable
 * (important when real API data arrives). The Icon component maps these
 * keys to lucide-react icons in the UI.
 */

export const services = [
  {
    id: "web-development",
    title: "Web Development",
    icon: "web",
    desc: "React, Node & custom platforms built for scale — from marketing sites to complex SaaS.",
    features: ["Single-page apps", "Progressive Web Apps", "E-commerce platforms", "APIs & integrations"],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    icon: "mobile",
    desc: "Android & iOS apps with native performance and delightful UX.",
    features: ["Cross-platform (React Native)", "Native iOS / Android", "App store launch", "Maintenance & updates"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "cloud",
    desc: "AWS/Azure architecture, CI/CD pipelines and 24/7 monitoring.",
    features: ["Cloud migration", "CI/CD automation", "Infra as code", "Observability & alerts"],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    icon: "ai",
    desc: "ML models, chatbots and workflow automation that save real hours.",
    features: ["Machine learning", "LLM integrations & chatbots", "Process automation", "Data pipelines"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: "design",
    desc: "Interfaces people actually enjoy using — research-driven and pixel-perfect.",
    features: ["Design systems", "Prototyping", "Usability testing", "Brand identity"],
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    icon: "consulting",
    desc: "Tech strategy for growing businesses — the right stack, the right roadmap.",
    features: ["Tech audits", "Architecture design", "Team augmentation", "Digital roadmap"],
  },
];

export const products = [
  {
    id: "innobles-crm",
    slug: "innobles-crm",
    title: "Innobles CRM",
    tagline: "Close deals faster with a CRM built for growing teams",
    category: "Sales & CRM",
    icon: "crm",
    desc: "Track leads, manage pipelines and automate follow-ups — without the enterprise bloat.",
    features: ["Lead & pipeline management", "Email & call logging", "Team dashboards", "Integrations with Gmail & Slack"],
    pricing: "From ₹4,999 / month",
  },
  {
    id: "stockflow",
    slug: "stockflow",
    title: "StockFlow",
    tagline: "Real-time inventory across warehouses and stores",
    category: "Operations",
    icon: "inventory",
    desc: "Know what's in stock, what's running low and what's on order — from one dashboard.",
    features: ["Multi-warehouse tracking", "Low-stock alerts", "Purchase order workflow", "Barcode & SKU support"],
    pricing: "From ₹6,499 / month",
  },
  {
    id: "peoplehub",
    slug: "peoplehub",
    title: "PeopleHub HRMS",
    tagline: "Payroll, attendance and people ops in one place",
    category: "Human Resources",
    icon: "hrms",
    desc: "Onboard employees, run payroll and manage leave policies without spreadsheets.",
    features: ["Employee self-service portal", "Payroll & compliance", "Leave & attendance", "Performance reviews"],
    pricing: "From ₹3,999 / month",
  },
  {
    id: "insightboard",
    slug: "insightboard",
    title: "InsightBoard",
    tagline: "Business analytics that answer questions, not create more",
    category: "Analytics",
    icon: "analytics",
    desc: "Connect your data sources and get live KPI dashboards your whole team can trust.",
    features: ["Custom KPI dashboards", "Scheduled reports", "Role-based access", "Export to PDF & Excel"],
    pricing: "From ₹5,499 / month",
  },
  {
    id: "shopbridge",
    slug: "shopbridge",
    title: "ShopBridge",
    tagline: "Headless commerce for brands that outgrew templates",
    category: "E-commerce",
    icon: "commerce",
    desc: "Launch storefronts, manage catalogues and accept payments with a stack you control.",
    features: ["Product catalogue & variants", "Payment gateway ready", "Order management", "SEO-friendly storefront"],
    pricing: "From ₹7,999 / month",
  },
  {
    id: "docuai",
    slug: "docuai",
    title: "DocuAI",
    tagline: "Extract, classify and route documents automatically",
    category: "AI Automation",
    icon: "ai",
    desc: "Turn invoices, contracts and forms into structured data — and push them into your systems.",
    features: ["OCR & data extraction", "Custom document types", "Approval workflows", "API & webhook exports"],
    pricing: "From ₹8,499 / month",
  },
];

/** Mega-menu categories shown on Services hover (Navbar). */
export const serviceMegaMenu = [
  {
    id: "web-development",
    title: "Web Development",
    icon: "web",
    items: [
      "Ecommerce Development",
      "React Web Development",
      "Node.js Development",
      "Custom Web Development",
      "Progressive Web Apps",
      "API & Integrations",
      "WordPress & CMS Development",
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    icon: "mobile",
    items: [
      "Android App Development",
      "iOS App Development",
      "React Native Apps",
      "Cross-platform Solutions",
      "App Store Launch",
      "IoT Development",
      "Wearable App Development",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "cloud",
    items: [
      "Cloud Migration",
      "AWS / Azure Architecture",
      "CI/CD Automation",
      "Infrastructure as Code",
      "24/7 Monitoring",
      "Observability & Alerts",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    icon: "ai",
    items: [
      "Machine Learning",
      "LLM Integrations",
      "Chatbots & Assistants",
      "Process Automation",
      "Data Pipelines",
      "Workflow Automation",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: "design",
    items: [
      "UI/UX Design",
      "Design Systems",
      "Prototyping",
      "Usability Testing",
      "Brand Identity",
    ],
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    icon: "consulting",
    items: [
      "Tech Audits",
      "Architecture Design",
      "Staff Augmentation",
      "Digital Roadmap",
      "Enterprise Solutions",
    ],
  },
];

export const stats = [
  { number: "50+", label: "Projects Delivered" },
  { number: "30+", label: "Happy Clients" },
  { number: "5+", label: "Years Combined Exp." },
  { number: "24/7", label: "Support" },
];

/* Home page banner (Hero) + featured/highlighted cards. All dummy content,
   so the whole hero can be edited from one place. */
export const heroBanner = {
  badge: "Software · Mobile · AI · Cloud",
  headlineTop: "Build products that move",
  headlineHighlight: "faster",
  headlineBottom: "than your market.",
  description:
    "Innobles ships web platforms, mobile apps and AI-driven systems for teams that want to outpace their competition.",
  primaryCta: { label: "Start a Project", to: "/contact" },
  secondaryCta: { label: "Explore Products", to: "/products" },
  socialProofCount: "30+ teams",
  socialProofSub: "Across fintech, health, retail & more",
  avatars: ["RV", "NK", "AS", "PN"],
  liveFeature: {
    label: "Live delivery",
    value: "98%",
    note: "Sprints completed on time",
    progress: 98,
  },
  featuredStats: [
    { number: "2M+", label: "Records processed daily" },
    { number: "40%", label: "Faster time-to-market" },
  ],
  highlightCard: {
    label: "Core Stack",
    badges: ["React", "Node", "AWS", "AI"],
  },
  responseCard: { label: "Avg. response", value: "< 24 hrs" },
  heroImage: null, // path to a banner image goes here when available
};

export const process = [
  { step: "01", title: "Discover", desc: "We dig into your goals, users and constraints before writing a single line of code." },
  { step: "02", title: "Design", desc: "Prototypes and design systems that align your team and validate the product early." },
  { step: "03", title: "Build", desc: "Agile sprints with weekly demos — you always see working software, not promises." },
  { step: "04", title: "Scale", desc: "Launch, monitor and iterate. We stay on board to grow with your business." },
];

export const projects = [
  { id: "fintech-dashboard", title: "Fintech Analytics Dashboard", category: "Web App", desc: "Real-time KPI dashboards processing 2M+ records a day for a fintech startup.", tech: ["React", "Node", "PostgreSQL"] },
  { id: "healthcare-app", title: "Healthcare Booking App", category: "Mobile", desc: "Appointment booking and tele-consultation app for a chain of clinics.", tech: ["React Native", "Firebase"] },
  { id: "retail-ecommerce", title: "Retail E-commerce Platform", category: "Web App", desc: "Headless commerce storefront with a 40% faster checkout and higher conversions.", tech: ["Next.js", "Stripe", "Tailwind"] },
  { id: "logistics-automation", title: "Logistics Automation", category: "AI / Automation", desc: "Automated route optimisation cutting fuel cost by 22% for a logistics firm.", tech: ["Python", "ML", "AWS"] },
  { id: "corporate-site", title: "Corporate Brand Site", category: "Marketing", desc: "High-performance, SEO-first marketing site for a B2B SaaS company.", tech: ["React", "GraphQL"] },
  { id: "edu-platform", title: "EdTech Learning Platform", category: "Web App", desc: "Course delivery, live classes and analytics for a fast-growing edtech startup.", tech: ["React", "Node", "Redis"] },
];

export const team = [
  { name: "Rahul Verma", role: "Founder & CEO", avatar: "RV" },
  { name: "Neha Kapoor", role: "Head of Engineering", avatar: "NK" },
  { name: "Amit Singh", role: "Lead Product Designer", avatar: "AS" },
  { name: "Priya Nair", role: "AI / ML Lead", avatar: "PN" },
];

/* About page "Our Locations" section.
   `illustration` is a string key mapped by the LocationIllustration component.
   Addresses are clean placeholders — swap them for official office data when
   it becomes available. Phone/email follow the siteConfig contact conventions. */
export const locations = [
  {
    id: "lucknow",
    city: "Lucknow",
    country: "India",
    label: "Lucknow, India",
    illustration: "lucknow",
    address: "2nd Floor, Hazratganj, Lucknow, Uttar Pradesh 226001, India",
    phone: "+91 98765 43210",
    email: "lucknow@innobles.in",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    label: "Mumbai, India",
    illustration: "mumbai",
    address: "Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051, India",
    phone: "+91 98765 43210",
    email: "mumbai@innobles.in",
  },
  {
    id: "delhi",
    city: "Delhi",
    country: "India",
    label: "Delhi, India",
    illustration: "delhi",
    address: "Connaught Place, New Delhi, Delhi 110001, India",
    phone: "+91 98765 43210",
    email: "delhi@innobles.in",
  },
  {
    id: "uae",
    city: "UAE",
    country: "United Arab Emirates",
    label: "UAE",
    illustration: "uae",
    address: "Business Bay, Dubai, United Arab Emirates",
    phone: "+971 4 000 0000",
    email: "uae@innobles.in",
  },
];

export const careers = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote - Global",
    type: "Full-time",
    status: "Hot",
    postedLabel: "Posted 2 days ago",
    postedDays: 2,
    description:
      "Build polished, high-performance interfaces for our company website and product experiences. Collaborate with design and backend teams to ship scalable features.",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Bengaluru, India",
    type: "Part-time",
    status: "Featured",
    postedLabel: "Posted 5 days ago",
    postedDays: 5,
    description:
      "Shape intuitive product journeys, create design systems, and collaborate closely with engineering to deliver elegant user experiences.",
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Platform",
    location: "Remote - APAC",
    type: "Full-time",
    status: "New",
    postedLabel: "Posted 1 week ago",
    postedDays: 7,
    description:
      "Design APIs, optimize performance, and build reliable backend services that power our product and career platforms.",
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote - Global",
    type: "Full-time",
    status: "Hot",
    postedLabel: "Posted 1 day ago",
    postedDays: 1,
    description:
      "Own features end-to-end across TypeScript, React and Node.js. Write clean, tested code that ships fast and scales without surprises.",
  },
  {
    id: "react-developer",
    title: "React Developer",
    department: "Engineering",
    location: "Bengaluru, India",
    type: "Contract",
    status: "New",
    postedLabel: "Posted 3 days ago",
    postedDays: 3,
    description:
      "Craft delightful component libraries and app shells in React. Obsess over performance, accessibility and developer experience.",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Mumbai, India",
    type: "Full-time",
    status: "Featured",
    postedLabel: "Posted 4 days ago",
    postedDays: 4,
    description:
      "Run research, wireframing and high-fidelity UI for our SaaS products. Turn ambiguous briefs into pixel-perfect, shippable designs.",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    department: "Platform",
    location: "Remote - Global",
    type: "Full-time",
    status: "Hot",
    postedLabel: "Posted 6 days ago",
    postedDays: 6,
    description:
      "Apply LLMs and classical ML to real products. Build reliable evaluation pipelines, prompt systems and data infrastructure.",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Gurugram, India",
    type: "Full-time",
    status: "New",
    postedLabel: "Posted 8 days ago",
    postedDays: 8,
    description:
      "Own cloud infrastructure, container orchestration and CI/CD pipelines on Kubernetes and AWS. Automate everything that repeats.",
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    department: "Engineering",
    location: "Delhi, India",
    type: "Full-time",
    status: "Hot",
    postedLabel: "Posted 2 days ago",
    postedDays: 2,
    description:
      "Design end-to-end test strategy, write E2E suites, and keep our release bar high. You automate regressions before they reach users.",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    department: "Product",
    location: "Kolkata, India",
    type: "Full-time",
    status: "Featured",
    postedLabel: "Posted 10 days ago",
    postedDays: 10,
    description:
      "Drive roadmap, discovery and delivery for our flagship products. Turn customer feedback into decisions engineers love to build.",
  },
  {
    id: "business-development-executive",
    title: "Business Development Executive",
    department: "Operations",
    location: "Mumbai, India",
    type: "Full-time",
    status: "New",
    postedLabel: "Posted 12 days ago",
    postedDays: 12,
    description:
      "Own outbound pipeline, demos and proposals for enterprise clients. Partner with engineering to win and shape our biggest deals.",
  },
  {
    id: "content-marketing-intern",
    title: "Content Marketing Intern",
    department: "Marketing",
    location: "Remote - Global",
    type: "Internship",
    status: "Open",
    postedLabel: "Posted 1 day ago",
    postedDays: 1,
    description:
      "Write stories around our products and engineering culture. Help grow reach across blog, email and social with thoughtful content.",
  },
  {
    id: "hr-generalist",
    title: "HR Generalist",
    department: "Human Resources",
    location: "Kolkata, India",
    type: "Part-time",
    status: "New",
    postedLabel: "Posted 15 days ago",
    postedDays: 15,
    description:
      "Own talent operations, onboarding and people culture. Design human experiences that make Innobles a place people grow in.",
  },
  {
    id: "devops-intern",
    title: "DevOps Intern",
    department: "Engineering",
    location: "Remote - APAC",
    type: "Internship",
    status: "New",
    postedLabel: "Posted 3 days ago",
    postedDays: 3,
    description:
      "Learn infrastructure-as-code, CI/CD and observability hands-on. Earn real ownership of tools that keep our products running.",
  },
  {
    id: "solutions-architect",
    title: "Solutions Architect",
    department: "Sales & Pre-Sales",
    location: "Remote - Global",
    type: "Contract",
    status: "Featured",
    postedLabel: "Posted 20 days ago",
    postedDays: 20,
    description:
      "Design technical solutions for enterprise opportunities. Bridge pre-sales, engineering and delivery to scope work that wins.",
  },
];

export const faqs = [
  { q: "How much does a typical project cost?", a: "It depends on scope — most engagements start around ₹1.5L for smaller builds and scale with complexity. We give a fixed quote after a free discovery call." },
  { q: "How long will it take to build our product?", a: "A marketing site ships in 2–4 weeks, web apps in 6–12 weeks, and larger platforms in 3–6 months. You'll see working demos every week." },
  { q: "Do you provide support after launch?", a: "Yes. Every project includes a free 30-day post-launch warranty, and we offer ongoing maintenance and monitoring plans." },
  { q: "Can you work with our existing in-house team?", a: "Absolutely. Team augmentation is one of our core services — we slot into your stack and processes seamlessly." },
];
