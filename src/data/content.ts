import { type LucideIcon, Code2, Church, Globe, Compass, Target, Puzzle, Wrench, Handshake, TrendingUp, Scaling, Clock, ClipboardList, MessageSquare, Archive, Network, Store, Building2, GraduationCap, HeartHandshake, Users, Landmark, Sprout } from "lucide-react";

import radianceImage from "@/assets/portfolio/radiance.png.asset.json";
import mitSystemImage from "@/assets/portfolio/mit-system.png.asset.json";
import nawiriImage from "@/assets/portfolio/nawiri.png.asset.json";

/* ------------------------------------------------------------------ */
/* Site-wide facts                                                      */
/* ------------------------------------------------------------------ */

export const site = {
  name: "TackTech",
  tagline: "Technology with Purpose.",
  centralMessage: "Technology with Purpose. Solutions that Move Organisations Forward.",
  phone: "+254 723 259 914",
  whatsappUrl: "https://wa.me/254723259914",
  location: "Kenya",
  // TODO: replace email with the real TackTech address before launch.
  email: "hello@tacktech.co.ke",
  established: "Established 2025 · Kenya",
  copyright: "© 2025 TackTech. All rights reserved.",
  fiveTsLine: "Transformation | Technology | Trust | Tenacity | Trajectory.",
};

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: site.name,
  headlineLead: "Technology with",
  headlineAccent: "Purpose",
  supporting:
    "We design and build practical digital systems for organisations, businesses and institutions.",
  primaryCta: { label: "Start a Conversation", href: "#contact" },
  secondaryCta: { label: "See Our Work", href: "#work" },
};

/* ------------------------------------------------------------------ */
/* The problem                                                          */
/* ------------------------------------------------------------------ */

export const problem = {
  lead: "Organisations lose time to inefficient processes, administrative complexity, communication gaps, poor information management and limited digital infrastructure.",
  points: [
    { icon: Clock, title: "Inefficient processes", text: "Manual, repetitive work slows teams down and invites error." },
    { icon: ClipboardList, title: "Administrative complexity", text: "Records, approvals and reporting become harder to manage as an organisation grows." },
    { icon: MessageSquare, title: "Communication gaps", text: "Leadership, staff and departments end up working from different information." },
    { icon: Archive, title: "Poor information management", text: "Important data sits in scattered files that nobody can find or trust." },
    { icon: Network, title: "Limited digital infrastructure", text: "Missing systems hold back day-to-day operations and future growth." },
  ],
  closing: "We don’t just introduce technology. We create solutions with purpose.",
};

/* ------------------------------------------------------------------ */
/* Services                                                             */
/* ------------------------------------------------------------------ */

export type Service = { icon: LucideIcon; title: string; description: string; bullets: string[] };

export const services: Service[] = [
  {
    icon: Code2,
    title: "Custom Software & System Development",
    description: "We design and build digital systems around specific organisational needs.",
    bullets: [
      "Institutional and business management systems",
      "Membership and database management",
      "Attendance and reporting",
      "Workflow automation",
      "Custom dashboards",
    ],
  },
  {
    icon: Church,
    title: "Church & Institutional Technology",
    description: "Digital tools that help churches and institutions run their operations more effectively.",
    bullets: [
      "Church management systems",
      "Membership and leadership management",
      "Attendance and departmental tracking",
      "Giving and financial administration",
      "Events and communication",
    ],
  },
  {
    icon: Globe,
    title: "Website Development & Digital Presence",
    description: "A professional, effective online presence for businesses and organisations.",
    bullets: [
      "Corporate websites",
      "Landing pages",
      "Portals and online platforms",
      "Responsive design",
      "Maintenance and updates",
    ],
  },
  {
    icon: Compass,
    title: "Technology Consultancy & Digital Transformation",
    description: "We help organisations find technology gaps and fix them in practical ways.",
    bullets: [
      "Needs assessment",
      "Process improvement",
      "System integration",
      "Automation",
      "Technology strategy and implementation support",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* How we work                                                          */
/* ------------------------------------------------------------------ */

export const process = {
  steps: [
    { number: "01", title: "Discover", text: "We understand the organisation, its structure, challenges and objectives." },
    { number: "02", title: "Design", text: "We develop a solution tailored to its specific needs." },
    { number: "03", title: "Develop", text: "We build, configure and implement the solution." },
    { number: "04", title: "Deploy", text: "We introduce the solution, support implementation and help users adopt it." },
    { number: "05", title: "Support & Evolve", text: "Ongoing technical support, maintenance and improvement." },
  ],
  closing: "Practical, scalable and sustainable.",
};

/* ------------------------------------------------------------------ */
/* Our work                                                             */
/* ------------------------------------------------------------------ */

export type WorkItem = {
  name: string;
  tag: string;
  image: string;
  imageAlt: string;
  description: string;
  features: string[];
};

export const work = {
  title: "Our Work",
  subtitle: "Real systems, in daily use.",
  items: [
    {
      name: "Radiance",
      tag: "Church & Organisational Management",
      image: radianceImage.url,
      imageAlt: "Radiance management system screenshot",
      description: "A management system that gives leadership a live view of the organisation.",
      features: [
        "Member and department tracking",
        "Service attendance records",
        "Weekly rota and ministry schedule",
        "Challenges reported across departments",
        "Role-based access",
      ],
    },
    {
      name: "MIT System",
      tag: "Institutional Management",
      image: mitSystemImage.url,
      imageAlt: "MIT System management platform screenshot",
      description: "A management system for a ministry training institute, covering the student journey from enrolment to alumni.",
      features: [
        "Student records",
        "Topics and academic hours",
        "Attendance",
        "Exams and assignments",
        "Fees",
        "Alumni",
        "Reports",
        "Activity log",
      ],
    },
    {
      name: "Nawiri",
      tag: "Brand Website & E-commerce",
      image: nawiriImage.url,
      imageAlt: "Nawiri Skin Care online storefront screenshot",
      description: "An online storefront for a handmade skincare brand in Mombasa, built to showcase the products and drive sales.",
      features: ["Mobile-first storefront", "Product showcase", "Shopping cart", "Brand-led design"],
    },
  ] satisfies WorkItem[],
};

/* ------------------------------------------------------------------ */
/* Why TackTech                                                         */
/* ------------------------------------------------------------------ */

export type WhyItem = { icon: LucideIcon; title: string; text: string };

export const whyItems: WhyItem[] = [
  { icon: Target, title: "Purpose-driven innovation", text: "We build technology to solve actual problems, not add complexity." },
  { icon: Puzzle, title: "Tailored solutions", text: "Every organisation is different, and its systems should reflect that." },
  { icon: Wrench, title: "Practical implementation", text: "We focus on solutions people can adopt and use." },
  { icon: Handshake, title: "Reliable partnerships", text: "We value trust, accountability and long-term relationships." },
  { icon: TrendingUp, title: "Continuous improvement", text: "Technology must evolve alongside the organisations it serves." },
  { icon: Scaling, title: "Scalable thinking", text: "We build with future growth in mind." },
];

/* ------------------------------------------------------------------ */
/* Who we serve                                                         */
/* ------------------------------------------------------------------ */

export type Market = { icon: LucideIcon; label: string };

export const markets: Market[] = [
  { icon: Church, label: "Churches and faith-based organisations" },
  { icon: Store, label: "Small and medium-sized enterprises" },
  { icon: Building2, label: "Corporate businesses" },
  { icon: GraduationCap, label: "Educational institutions" },
  { icon: HeartHandshake, label: "Non-governmental organisations" },
  { icon: Users, label: "Community-based organisations" },
  { icon: Landmark, label: "Professional institutions" },
  { icon: Sprout, label: "Entrepreneurs and growing businesses" },
];

export const whoWeServeClosing = "Every organisation deserves technology that helps it operate better.";

/* ------------------------------------------------------------------ */
/* The Five Ts                                                          */
/* ------------------------------------------------------------------ */

export const fiveTs = [
  { word: "Transformation", text: "Turning challenges into opportunities for growth and progress." },
  { word: "Technology", text: "Innovation applied to practical, intelligent solutions." },
  { word: "Trust", text: "Reliability, integrity and delivering on our promises." },
  { word: "Tenacity", text: "Determined, resilient and committed to finding solutions." },
  { word: "Trajectory", text: "Purposeful direction and sustainable growth." },
];

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const about = {
  established: site.established,
  vision:
    "To become a leading technology and innovation company, transforming how organisations, businesses and institutions operate through intelligent digital solutions.",
  mission:
    "To identify challenges, develop innovative technology solutions and empower organisations, businesses and institutions to achieve greater efficiency, growth and impact.",
};

/* ------------------------------------------------------------------ */
/* Closing CTA                                                          */
/* ------------------------------------------------------------------ */

export const closingCta = {
  headline: "Let’s identify challenges, engineer solutions and move organisations forward.",
  button: { label: "Start a Conversation", href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */

export const contact = {
  title: "Contact",
  subtitle: "Tell us what you need, and we’ll show you how we’d approach it.",
  orgTypePlaceholder: "Select your organisation type",
  submitLabel: "Send Message",
  successTitle: "Message received",
  successText: "Thank you for reaching out. We’ll get back to you shortly.",
  whatsappLabel: "Chat on WhatsApp",
};

// Organisation types offered in the contact form dropdown.
export const orgTypeOptions = markets.map((m) => m.label);

export type ContactFormValues = {
  name: string;
  organisation: string;
  email: string;
  orgType: string;
  message: string;
};
