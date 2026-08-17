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

export const testimonials = [
  { quote: "Innobles shipped our dashboard two weeks early and the quality is outstanding. They feel like an in-house team.", name: "Riya Sharma", role: "CEO, FinTech Startup", avatar: "RS" },
  { quote: "Their team understood our hospital workflows better than any agency we've worked with. Patients love the new app.", name: "Dr. Arjun Mehta", role: "COO, Healthcare Chain", avatar: "AM" },
  { quote: "The automation they built saves our ops team 200+ hours every month. ROI was obvious within a quarter.", name: "Sneha Patel", role: "Operations Head, Logistics", avatar: "SP" },
];

export const team = [
  { name: "Rahul Verma", role: "Founder & CEO", avatar: "RV" },
  { name: "Neha Kapoor", role: "Head of Engineering", avatar: "NK" },
  { name: "Amit Singh", role: "Lead Product Designer", avatar: "AS" },
  { name: "Priya Nair", role: "AI / ML Lead", avatar: "PN" },
];

export const values = [
  { icon: "🎯", title: "Outcome-first", desc: "We measure success by the results our software delivers, not lines of code." },
  { icon: "🤝", title: "Radical transparency", desc: "Weekly demos, honest estimates and no hidden surprises — ever." },
  { icon: "🚀", title: "Ship & iterate", desc: "We move fast, learn from real users and improve continuously." },
  { icon: "🎓", title: "Always learning", desc: "The stack changes; our curiosity doesn't. We invest in the latest tools." },
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

/* ------------------------------------------------------------------
 * Blog feed (mock backend).
 * Each entry follows the API-ready shape:
 *   { id, title, slug, category, description, image, author, authorAvatar, date }
 * plus backward-compatible fields (tag/excerpt/readTime/featured) so the
 * Home Blog strip and BlogDetail keep working.
 * ------------------------------------------------------------------ */
export const blogs = (() => {
  const featured = [
    {
      id: "designing-scalable-systems",
      slug: "designing-scalable-systems",
      category: "Engineering",
      tag: "Engineering",
      title: "Designing scalable systems for fast-moving teams",
      description: "A practical look at architecture decisions that help teams ship faster without sacrificing quality.",
      excerpt: "A practical look at architecture decisions that help teams ship faster without sacrificing quality.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
      author: "Ava Thompson",
      authorAvatar: "https://i.pravatar.cc/96?img=47",
      date: "Aug 12, 2026",
      readTime: "6 min read",
      featured: true,
    },
    {
      id: "product-feedback-to-roadmap-wins",
      slug: "how-product-teams-turn-feedback-into-roadmap-wins",
      category: "Product",
      tag: "Product",
      title: "How product teams turn feedback into roadmap wins",
      description: "Learn how we prioritize customer insights and convert them into measurable product improvements.",
      excerpt: "Learn how we prioritize customer insights and convert them into measurable product improvements.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
      author: "Mark Kim",
      authorAvatar: "https://i.pravatar.cc/96?img=12",
      date: "Aug 08, 2026",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: "practical-ai-features-teams-use",
      slug: "building-practical-ai-features-that-teams-actually-use",
      category: "AI",
      tag: "AI",
      title: "Building practical AI features that teams actually use",
      description: "Lessons from turning AI capabilities into simple, useful experiences that solve real business problems.",
      excerpt: "Lessons from turning AI capabilities into simple, useful experiences that solve real business problems.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
      author: "Sophia Martin",
      authorAvatar: "https://i.pravatar.cc/96?img=32",
      date: "Aug 05, 2026",
      readTime: "7 min read",
      featured: true,
    },
  ];

  const allBlogs = [];

  allBlogs.push(
    {
      id: "quarterly-planning-keeps-teams-aligned",
      slug: "quarterly-planning-keeps-teams-aligned",
      category: "Strategy",
      tag: "Strategy",
      title: "Quarterly planning that keeps teams aligned",
      description: "A repeatable framework for setting goals, tracking progress, and keeping execution focused.",
      excerpt: "A repeatable framework for setting goals, tracking progress, and keeping execution focused.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      author: "Olivia Chen",
      authorAvatar: "https://i.pravatar.cc/96?img=45",
      date: "Jul 21, 2026",
      readTime: "6 min read",
    },
    {
      id: "improving-frontend-performance-simple-patterns",
      slug: "improving-frontend-performance-with-simple-patterns",
      category: "Engineering",
      tag: "Engineering",
      title: "Improving frontend performance with simple patterns",
      description: "Small changes in rendering, assets, and interaction design can dramatically improve UX.",
      excerpt: "Small changes in rendering, assets, and interaction design can dramatically improve UX.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
      author: "Ethan Brooks",
      authorAvatar: "https://i.pravatar.cc/96?img=60",
      date: "Jul 18, 2026",
      readTime: "5 min read",
    },
    {
      id: "ai-workflows-save-teams-hours",
      slug: "building-ai-workflows-that-save-teams-hours-every-week",
      category: "AI",
      tag: "AI",
      title: "Building AI workflows that save teams hours every week",
      description: "How practical automation and intelligent workflows can remove repetitive work from growing teams.",
      excerpt: "How practical automation and intelligent workflows can remove repetitive work from growing teams.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      author: "Ava Thompson",
      authorAvatar: "https://i.pravatar.cc/96?img=47",
      date: "Jul 10, 2026",
      readTime: "8 min read",
    },
    {
      id: "operational-dashboards-better-decisions",
      slug: "operational-dashboards-that-drive-better-decisions",
      category: "Operations",
      tag: "Operations",
      title: "Operational dashboards that drive better decisions",
      description: "The metrics and visual patterns we use to keep leadership aligned on what matters most.",
      excerpt: "The metrics and visual patterns we use to keep leadership aligned on what matters most.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      author: "Marcus Lee",
      authorAvatar: "https://i.pravatar.cc/96?img=53",
      date: "Jul 06, 2026",
      readTime: "5 min read",
    },
    {
      id: "creativity-across-distributed-teams",
      slug: "how-we-keep-creativity-high-across-distributed-teams",
      category: "People",
      tag: "People",
      title: "How we keep creativity high across distributed teams",
      description: "A few habits that help our team stay connected, inspired, and productive every week.",
      excerpt: "A few habits that help our team stay connected, inspired, and productive every week.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      author: "Sofia Martin",
      authorAvatar: "https://i.pravatar.cc/96?img=26",
      date: "Jul 01, 2026",
      readTime: "6 min read",
    },
    {
      id: "customer-feedback-better-product-decisions",
      slug: "from-customer-feedback-to-better-product-decisions",
      category: "Product",
      tag: "Product",
      title: "From customer feedback to better product decisions",
      description: "A practical approach to turning customer conversations into clear product priorities.",
      excerpt: "A practical approach to turning customer conversations into clear product priorities.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
      author: "Mark Kim",
      authorAvatar: "https://i.pravatar.cc/96?img=12",
      date: "Jun 27, 2026",
      readTime: "7 min read",
    },
    {
      id: "building-reliable-apis-growing-products",
      slug: "building-reliable-apis-for-growing-products",
      category: "Engineering",
      tag: "Engineering",
      title: "Building reliable APIs for growing products",
      description: "Key backend practices that help services remain stable as traffic, features, and teams grow.",
      excerpt: "Key backend practices that help services remain stable as traffic, features, and teams grow.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
      author: "Ethan Brooks",
      authorAvatar: "https://i.pravatar.cc/96?img=60",
      date: "Jun 22, 2026",
      readTime: "9 min read",
    },
    {
      id: "practical-ai-adoption-modern-teams",
      slug: "what-practical-ai-adoption-looks-like-inside-modern-teams",
      category: "AI",
      tag: "AI",
      title: "What practical AI adoption looks like inside modern teams",
      description: "A look at where AI creates real value and where teams should keep humans in the loop.",
      excerpt: "A look at where AI creates real value and where teams should keep humans in the loop.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
      author: "Olivia Chen",
      authorAvatar: "https://i.pravatar.cc/96?img=45",
      date: "Jun 18, 2026",
      readTime: "6 min read",
    },
    /* __ALL_BLOGS_2__ */
  );
  const legacy = [];

  legacy.push(
    {
      id: "custom-web-app-signs",
      slug: "5-signs-your-business-needs-a-custom-web-app",
      category: "Web Development",
      tag: "Web Dev",
      title: "5 Signs Your Business Needs a Custom Web App",
      description: "When templates and off-the-shelf tools start holding you back, it's time to go custom. Here's how to tell.",
      excerpt: "When templates and off-the-shelf tools start holding you back, it's time to go custom. Here's how to tell.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4dfeb?auto=format&fit=crop&w=1600&q=80",
      author: "Mark Kim",
      authorAvatar: "https://i.pravatar.cc/96?img=12",
      date: "May 18, 2026",
      readTime: "6 min read",
    },
    {
      id: "ai-automation-2026",
      slug: "why-ai-automation-is-no-longer-optional-in-2026",
      category: "AI",
      tag: "AI",
      title: "Why AI Automation Is No Longer Optional in 2026",
      description:
        "From chatbots to document pipelines — where automation delivers the fastest, safest ROI today.",
      excerpt: "From chatbots to document pipelines — where automation delivers the fastest, safest ROI today.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
      author: "Sophia Martin",
      authorAvatar: "https://i.pravatar.cc/96?img=32",
      date: "May 04, 2026",
      readTime: "5 min read",
    },
    {
      id: "react-vs-vue",
      slug: "choosing-between-react-and-vue",
      category: "Frontend",
      tag: "Frontend",
      title: "Choosing Between React and Vue for Your Next Project",
      description: "A practical, no-hype comparison to help you pick the right framework for your team and goals.",
      excerpt: "A practical, no-hype comparison to help you pick the right framework for your team and goals.",
      image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1600&q=80",
      author: "Ava Thompson",
      authorAvatar: "https://i.pravatar.cc/96?img=47",
      date: "Apr 21, 2026",
      readTime: "7 min read",
    },
    {
      id: "cloud-migration-guide",
      slug: "cloud-migration-guide-for-growing-teams",
      category: "Cloud",
      tag: "Cloud",
      title: "Cloud Migration Guide for Growing Teams",
      description: "A step-by-step playbook for moving legacy systems to AWS or Azure without downtime surprises.",
      excerpt: "A step-by-step playbook for moving legacy systems to AWS or Azure without downtime surprises.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
      author: "Ethan Brooks",
      authorAvatar: "https://i.pravatar.cc/96?img=60",
      date: "Apr 02, 2026",
      readTime: "8 min read",
    },
    {
      id: "mobile-app-mvp",
      slug: "how-to-launch-a-mobile-app-mvp-in-90-days",
      category: "Mobile",
      tag: "Mobile",
      title: "How to Launch a Mobile App MVP in 90 Days",
      description: "Scope, stack and sprint planning tips to ship a credible MVP fast — without cutting corners on UX.",
      excerpt: "Scope, stack and sprint planning tips to ship a credible MVP fast — without cutting corners on UX.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
      author: "Olivia Chen",
      authorAvatar: "https://i.pravatar.cc/96?img=45",
      date: "Mar 16, 2026",
      readTime: "6 min read",
    },
    {
      id: "design-systems-scale",
      slug: "design-systems-that-scale-with-your-product",
      category: "Design",
      tag: "Design",
      title: "Design Systems That Scale With Your Product",
      description: "Why a shared component library pays off once your team and feature surface area start growing.",
      excerpt: "Why a shared component library pays off once your team and feature surface area start growing.",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80",
      author: "Marcus Lee",
      authorAvatar: "https://i.pravatar.cc/96?img=53",
      date: "Mar 02, 2026",
      readTime: "5 min read",
    },
    /* __LEGACY_2__ */
  );

  const archiveSeed = [
    { category: "Engineering", title: "Shipping faster with feature flags", description: "How toggles turn risky releases into low-stress, reversible rollouts your whole team can trust.", image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1600&q=80" },
    { category: "Engineering", title: "The real cost of technical debt", description: "A measured look at where debt accumulates and the smallest habits that keep codebases young.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80" },
    { category: "Engineering", title: "Observability tips for modern web apps", description: "The practical parts of observability teams actually use — traces, logs, and knowing what to alert on.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80" },
    { category: "Engineering", title: "Database schemas built for the long run", description: "Naming, constraint and migration habits that keep your data model easy to change for years.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1600&q=80" },
    { category: "People", title: "Retrospectives that actually stick", description: "How we run meetings that turn team frustration into a short list of real, owned next steps.", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80" },
    { category: "Product", title: "Design systems that scale with your product", description: "Why a shared component library pays off once your team and feature surface area start growing.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80" },
    { category: "People", title: "A culture of continuous feedback", description: "Small, timely feedback loops that make reviews feel like coaching instead of criticism.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80" },
    { category: "Strategy", title: "The business case for design reviews", description: "How a deliberate review hour repays itself by catching expensive mistakes before they ship.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80" },
    { category: "Engineering", title: "Automating deployments without fear", description: "Progressive rollouts and safe defaults that make automated releases calm and repeatable.", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80" },
    { category: "Product", title: "Better discovery interviews in four steps", description: "Ask the right people the right questions and listen for the problems behind the feature requests.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80" },
    { category: "Engineering", title: "Zero-downtime migrations at small scale", description: "Replay, verify and switch — a simple pattern for changing data stores without ever stopping traffic.", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80" },
    { category: "Strategy", title: "Privacy by design in SaaS", description: "Building privacy carefully from day one costs far less than scrambling to retrofit it later.", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80" },
    { category: "Operations", title: "Docs that engineers actually read", description: "The formats and search habits that keep internal documentation alive and actually useful.", image: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?auto=format&fit=crop&w=1600&q=80" },
    { category: "Operations", title: "Observability versus monitoring", description: "Know the difference — alerting on everything is a failure mode, not a safety net.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80" },
    { category: "People", title: "Why we write everything down", description: "Written decisions mature better than discussions — here is how we run a lightweight decision log.", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1600&q=80" },
    { category: "Strategy", title: "Sprints that feel less like crunch", description: "Planning and scope habits that protect a sustainable pace without compromising on delivery.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80" },
    { category: "Product", title: "Content design for developers", description: "Tone, structure and helpful error strings — the writing your engineering product is hiding.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80" },
    { category: "Product", title: "Designing onboarding that sticks", description: "Activation is a design problem. A practical walkthrough of the first ten minutes that count most.", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80" },
    { category: "Operations", title: "From chaos to clarity in data", description: "A simple data warehouse checklist that turns a reporting mess into trusted daily numbers.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80" },
    { category: "People", title: "Career growth for product engineers", description: "Owning outcomes instead of tickets — how engineering craft turns into career leverage.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80" },
    { category: "Engineering", title: "A secret for readable codebases", description: "Naming and abstraction habits that let any engineer on the team touch any module with confidence.", image: "https://images.unsplash.com/photo-1503437313881-503a912ec02e?auto=format&fit=crop&w=1600&q=80" },
    { category: "People", title: "Measuring teams, not hours", description: "Focus on outcomes that matter, and the busywork — and the micro-management — disappears.", image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1600&q=80" },
    { category: "Strategy", title: "Build versus buy, done responsibly", description: "When the spreadsheet says build, and when buying moves twice as fast — a practical framework.", image: "https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?auto=format&fit=crop&w=1600&q=80" },
    /* __SEED_2__ */
  ];

  /* Deterministic mock "backend" content so the feed supports 8 pagination pages (6 posts each). */
  const archiveAuthors = ["Ava Thompson", "Mark Kim", "Sophia Martin", "Olivia Chen", "Ethan Brooks", "Marcus Lee"];
  const archiveAvatars = [
    "https://i.pravatar.cc/96?img=47",
    "https://i.pravatar.cc/96?img=12",
    "https://i.pravatar.cc/96?img=32",
    "https://i.pravatar.cc/96?img=45",
    "https://i.pravatar.cc/96?img=60",
    "https://i.pravatar.cc/96?img=53",
  ];
  const archiveReadTimes = ["5 min read", "6 min read", "7 min read", "8 min read"];

  const buildArchive = () => {
    const TOTAL = 48;
    const count = TOTAL - featured.length - allBlogs.length - legacy.length;
    const entries = [];
    const start = new Date("2026-02-20T00:00:00");
    for (let i = 0; i < count; i += 1) {
      const seed = archiveSeed[i % archiveSeed.length];
      const cycle = Math.floor(i / archiveSeed.length);
      const stamp = new Date(start);
      stamp.setDate(start.getDate() - (i + count + featured.length) * 6);
      entries.push({
        id: `${seed.category.toLowerCase().replace(/\s+/g, "-")}-${(i + 1).toString().padStart(2, "0")}`,
        slug: `${seed.category.toLowerCase().replace(/\s+/g, "-")}-archive-${(i + 1)}`,
        category: seed.category,
        tag: seed.category,
        title: cycle === 0 ? seed.title : `${seed.title} — Part ${cycle + 1}`,
        description: seed.description,
        excerpt: seed.description,
        image: seed.image,
        author: archiveAuthors[i % archiveAuthors.length],
        authorAvatar: archiveAvatars[i % archiveAvatars.length],
        date: stamp.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        readTime: archiveReadTimes[i % archiveReadTimes.length],
        featured: false,
      });
    }
    return entries;
  };

  return [...featured, ...allBlogs, ...legacy, ...buildArchive()];
})();

export const faqs = [
  { q: "How much does a typical project cost?", a: "It depends on scope — most engagements start around ₹1.5L for smaller builds and scale with complexity. We give a fixed quote after a free discovery call." },
  { q: "How long will it take to build our product?", a: "A marketing site ships in 2–4 weeks, web apps in 6–12 weeks, and larger platforms in 3–6 months. You'll see working demos every week." },
  { q: "Do you provide support after launch?", a: "Yes. Every project includes a free 30-day post-launch warranty, and we offer ongoing maintenance and monitoring plans." },
  { q: "Can you work with our existing in-house team?", a: "Absolutely. Team augmentation is one of our core services — we slot into your stack and processes seamlessly." },
];
