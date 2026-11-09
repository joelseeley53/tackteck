import { lazy, Suspense, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  MoveUpRight,
} from "lucide-react";

import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  about,
  closingCta,
  contact,
  fiveTs,
  hero,
  markets,
  navLinks,
  orgTypeOptions,
  process,
  problem,
  services,
  site,
  whoWeServeClosing,
  whyItems,
  work,
} from "@/data/content";

const NetworkScene = lazy(() => import("@/components/NetworkScene"));

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  organisation: z.string().trim().min(1, "Please enter your organisation."),
  email: z.string().trim().email("Enter a valid email address."),
  orgType: z.string().min(1, "Choose an organisation type."),
  message: z.string().trim().min(1, "Tell us what you need."),
});

type ContactValues = z.infer<typeof contactSchema>;

function SectionHeading({ eyebrow, title, intro, dark = false }: { eyebrow: string; title: string; intro?: string; dark?: boolean }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className={`mb-3 text-xs font-bold uppercase tracking-[0.12em] ${dark ? "text-gold-soft" : "text-gold"}`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl font-bold leading-tight sm:text-4xl ${dark ? "text-on-navy" : "text-foreground"}`}>{title}</h2>
      {intro ? <p className={`mt-4 text-base leading-7 ${dark ? "text-on-navy/70" : "text-muted-foreground"}`}>{intro}</p> : null}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 12);
      const current = ["home", "about", "services", "process", "work", "contact"]
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null)
        .find((element) => element.getBoundingClientRect().top <= 112);
      if (current) setActiveSection(current.id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b text-on-navy backdrop-blur-xl transition-colors duration-300 ${scrolled ? "border-gold/20 bg-navy/85 shadow-lg" : "border-on-navy/10 bg-navy"}`}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="TackTech home" className="flex items-center">
          <Logo variant="full-reverse" className="hidden h-9 sm:block" />
          <Logo variant="icon-reverse" className="h-9 w-9 sm:hidden" />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? "location" : undefined} className={`relative py-2 text-sm transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:transition-transform ${activeSection === link.href.slice(1) ? "text-gold-soft after:scale-x-100 after:bg-gold" : "text-on-navy/75 after:scale-x-0 after:bg-gold hover:text-gold-soft hover:after:scale-x-100"}`}>
              {link.label}
            </a>
          ))}
          <Button asChild variant="secondary" className="bg-gold text-navy hover:bg-gold-soft">
            <a href="#contact">Start a Conversation <ArrowRight aria-hidden="true" /></a>
          </Button>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open navigation" className="text-on-navy hover:bg-navy-soft hover:text-gold md:hidden">
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(21rem,88vw)] border-l-0 bg-navy text-on-navy">
            <SheetHeader className="border-b border-on-navy/15 pb-5 text-left">
              <SheetTitle className="text-on-navy"><Logo variant="full-reverse" className="h-9" /></SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="mt-7 flex flex-col gap-1">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-on-navy/10 py-4 text-left text-base text-on-navy/90">
                    {link.label}<ChevronRight aria-hidden="true" className="h-4 w-4 text-gold" />
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button asChild className="mt-5 bg-gold text-navy hover:bg-gold-soft">
                  <a href="#contact" onClick={() => setOpen(false)}>Start a Conversation <ArrowRight aria-hidden="true" /></a>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function Hero() {
  const featured = work.items[0];
  const reduceMotion = useReducedMotion();
  if (!featured) return null;

  return (
    <section id="home" className="tacktech-hero-grid tacktech-divider relative isolate overflow-hidden bg-navy text-on-navy">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <NetworkScene />
        </Suspense>
      </ClientOnly>
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <motion.div className="max-w-2xl" initial={reduceMotion ? false : "hidden"} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } } }}>
          <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65 }} className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-gold-soft">
            <span className="h-px w-8 bg-gold" />{hero.eyebrow}
          </motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: "easeOut" }} className="font-display text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">
            Technology with<br /><span className="text-gold drop-shadow-[0_0_18px_color-mix(in_oklab,var(--gold)_35%,transparent)]">Purpose.</span>
          </motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.7 }} className="mt-6 max-w-xl text-lg leading-8 text-on-navy/75">{hero.supporting}</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65 }} className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-gold px-6 text-navy shadow-[0_0_22px_color-mix(in_oklab,var(--gold)_22%,transparent)] transition duration-300 hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_38%,transparent)]">
              <a href={hero.primaryCta.href}>{hero.primaryCta.label}<ArrowRight aria-hidden="true" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-gold/50 bg-transparent px-6 text-on-navy transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-on-navy">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}<ArrowDown aria-hidden="true" /></a>
            </Button>
          </motion.div>
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.7 }} className="mt-10 text-sm text-on-navy/60">Practical digital systems, built around the way you work.</motion.p>
        </motion.div>
        <Reveal className="relative mx-auto w-full max-w-sm md:justify-self-end" delay={0.3}>
          <div className="absolute -left-8 top-14 hidden h-40 w-40 border-l border-t border-gold/40 sm:block" aria-hidden="true" />
          <motion.div whileHover={reduceMotion ? undefined : { y: -8, rotateY: -4, rotateX: 2 }} transition={{ type: "spring", stiffness: 180, damping: 20 }} className="relative mx-auto w-[min(72%,17rem)] rounded-[2rem] border border-gold/35 bg-navy-soft/90 p-2 shadow-2xl shadow-navy">
            <div className="overflow-hidden rounded-[1.5rem] bg-muted">
              <img src={featured.image} alt={featured.imageAlt} className="aspect-[9/16] w-full object-cover object-top" />
            </div>
          </motion.div>
          <div className="absolute -bottom-4 left-0 border border-on-navy/15 bg-navy-soft px-4 py-3 text-left sm:-left-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-soft">Featured system</p>
            <p className="mt-1 font-display text-sm font-semibold text-on-navy">{featured.name}</p>
          </div>
          <div className="absolute right-0 top-6 hidden h-10 w-10 border-b border-r border-gold/50 sm:block" aria-hidden="true" />
        </Reveal>
      </div>
      <motion.div className="relative z-10 border-t border-on-navy/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-5 py-4 text-xs text-on-navy/60 sm:px-8">
          <span className="font-semibold uppercase tracking-[0.1em] text-gold-soft">Technology with Purpose</span>
          <span>For organisations, businesses and institutions</span>
          <span>{site.location}</span>
        </div>
      </motion.div>
      <a href="#problem" aria-label="Scroll to discover" className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-on-navy/55 transition-colors hover:text-gold-soft md:flex">
        <span>Discover</span><ArrowDown aria-hidden="true" className="h-3.5 w-3.5 animate-bounce text-gold" />
      </a>
    </section>
  );
}

export function Problem() {
  return (
    <section id="problem" className="tacktech-divider bg-navy px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <p className="font-display text-2xl font-semibold leading-snug text-on-navy sm:text-3xl">{problem.lead}</p>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {problem.points.map(({ icon: Icon, title, text }, index) => (
                <div key={title} className={`flex gap-4 border-t border-on-navy/15 py-5 ${index === problem.points.length - 1 ? "sm:col-span-2" : ""}`}>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-gold/25 bg-gold/10 text-gold"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                  <div><h3 className="font-semibold text-on-navy">{title}</h3><p className="mt-1 text-sm leading-6 text-on-navy/65">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 border-l-2 border-gold pl-5 font-display text-xl font-semibold text-gold-soft">{problem.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="tacktech-divider bg-navy-soft px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="What we do" title="Technology that fits your work." intro="From custom systems to practical guidance, we turn operational needs into useful digital tools." dark /></Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map(({ icon: Icon, title, description, bullets }, index) => (
            <Reveal key={title} delay={index * 0.04}>
              <motion.article whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 200, damping: 22 }} className="group h-full border border-on-navy/10 bg-navy/55 p-6 transition-colors duration-300 hover:border-gold/40 hover:shadow-[inset_0_1px_color-mix(in_oklab,var(--gold)_20%,transparent)] sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/25 bg-gold/10 text-gold transition duration-300 group-hover:-translate-y-1 group-hover:bg-gold/15"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-gold">0{index + 1}</p>
                    <h3 className="font-display text-xl font-bold leading-snug text-on-navy">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-on-navy/65">{description}</p>
                    <ul className="mt-5 grid gap-x-3 gap-y-2 sm:grid-cols-2">
                      {bullets.map((bullet) => <li key={bullet} className="flex gap-2 text-sm leading-5 text-on-navy/80"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{bullet}</li>)}
                    </ul>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="process" className="tacktech-divider bg-navy px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="How we work" title="From challenge to lasting solution." intro="A considered process keeps every step grounded in your organisation's needs." dark /></Reveal>
        <div className="relative grid gap-0 border-y border-on-navy/15 sm:grid-cols-2 lg:grid-cols-5">
          <motion.div aria-hidden="true" initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease: "easeOut" }} className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-gold/70 lg:block" />
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.04}>
              <article className="relative h-full border-b border-on-navy/15 py-6 sm:px-4 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0">
                <span className="absolute -top-1.5 left-4 hidden h-3 w-3 rounded-full border border-gold bg-navy shadow-[0_0_12px_color-mix(in_oklab,var(--gold)_50%,transparent)] lg:block lg:first:left-0" />
                <p className="font-display text-4xl font-bold text-gold">{step.number}</p>
                <h3 className="mt-5 font-display text-lg font-semibold text-on-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-navy/70">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm font-semibold text-gold-soft">{process.closing}</p>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="tacktech-divider overflow-hidden bg-navy-soft px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Selected work" title={work.title} intro={work.subtitle} dark /></Reveal>
        <div className="grid gap-10 md:grid-cols-3 md:gap-7">
          {work.items.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.07}>
              <article className="group h-full border border-on-navy/10 bg-navy/65 p-4 transition-colors duration-300 hover:border-gold/40 sm:p-5">
                <div className="relative mx-auto mb-6 max-w-[15rem] overflow-hidden border border-gold/25 bg-navy p-2 shadow-xl shadow-navy">
                  <motion.img whileHover={{ scale: 1.04, y: -4 }} transition={{ duration: 0.5 }} src={item.image} alt={item.imageAlt} loading="lazy" className="aspect-[9/16] w-full object-cover object-top" />
                  <div className="pointer-events-none absolute inset-x-2 bottom-2 translate-y-full bg-navy/90 p-3 text-xs leading-5 text-on-navy opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{item.description}</div>
                </div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-gold-soft">{item.tag}</p>
                  <MoveUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="font-display text-2xl font-bold text-on-navy">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-on-navy/65">{item.description}</p>
                <ul className="mt-5 space-y-2 border-t border-on-navy/15 pt-4">
                  {item.features.map((feature) => <li key={feature} className="flex gap-2 text-sm text-on-navy/80"><Check aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />{feature}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyTackTech() {
  return (
    <section className="tacktech-divider bg-navy px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Why TackTech" title="Built with purpose. Delivered with care." dark /></Reveal>
        <div className="grid border-t border-on-navy/15 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.04}>
              <article className="h-full border-b border-on-navy/15 py-6 sm:px-6 sm:first:pl-0 sm:nth-[2]:border-l sm:nth-[2]:pl-6 lg:nth-[2]:border-l-0 lg:nth-[2]:pl-6 lg:nth-[3]:border-l lg:nth-[3]:pl-6">
                <Icon aria-hidden="true" className="h-5 w-5 text-gold" />
                <h3 className="mt-4 font-display text-lg font-semibold text-on-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-navy/65">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhoWeServe() {
  return (
    <section className="tacktech-divider bg-navy-soft px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Who we serve" title="For organisations moving forward." dark /></Reveal>
        <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map(({ icon: Icon, label }) => (
            <div key={label} className="flex min-h-16 items-center gap-3 border-t border-on-navy/15 py-4">
              <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-gold" />
              <p className="text-sm font-medium leading-5 text-on-navy">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl font-display text-xl font-semibold text-gold-soft">{whoWeServeClosing}</p>
      </div>
    </section>
  );
}

export function FiveTs() {
  return (
    <section className="tacktech-divider bg-navy px-5 py-14 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-7 text-xs font-bold uppercase tracking-[0.12em] text-gold-soft">The Five Ts</p>
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {fiveTs.map(({ word, text }, index) => (
            <motion.div key={word} whileHover={{ y: -4 }} className="group border-t border-on-navy/20 py-5 sm:px-4 lg:first:pl-0 lg:last:pr-0">
              <p className="text-xs font-bold text-gold-soft">0{index + 1}</p>
              <h3 className="mt-2 font-display text-lg font-semibold transition-colors group-hover:text-gold-soft">{word}</h3>
              <p className="mt-2 text-sm leading-6 text-on-navy/65">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="tacktech-divider bg-navy px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-gold">About TackTech</p>
            <h2 className="font-display text-3xl font-bold text-on-navy sm:text-4xl">Technology with purpose, from Kenya.</h2>
            <p className="mt-5 text-sm font-semibold text-on-navy/60">{about.established}</p>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2">
          <Reveal>
            <motion.article whileHover={{ rotateX: 2, rotateY: -2 }} transition={{ type: "spring", stiffness: 180 }} className="border border-gold/20 bg-on-navy/5 p-6 shadow-[inset_0_1px_color-mix(in_oklab,var(--gold)_12%,transparent)] backdrop-blur-md">
              <h3 className="font-display text-xl font-bold text-on-navy">Our vision</h3>
              <p className="mt-4 text-sm leading-7 text-on-navy/70">{about.vision}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <motion.article whileHover={{ rotateX: 2, rotateY: 2 }} transition={{ type: "spring", stiffness: 180 }} className="border border-gold/20 bg-on-navy/5 p-6 shadow-[inset_0_1px_color-mix(in_oklab,var(--gold)_12%,transparent)] backdrop-blur-md">
              <h3 className="font-display text-xl font-bold text-on-navy">Our mission</h3>
              <p className="mt-4 text-sm leading-7 text-on-navy/70">{about.mission}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="tacktech-divider bg-navy-soft px-5 py-16 text-on-navy sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">{closingCta.headline}</h2>
        <Button asChild size="lg" className="h-12 shrink-0 bg-gold px-6 text-navy hover:bg-gold-soft">
          <a href={closingCta.button.href}>{closingCta.button.label}<ArrowRight aria-hidden="true" /></a>
        </Button>
      </div>
    </section>
  );
}

export function Contact() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", organisation: "", email: "", orgType: "", message: "" },
  });

  function onSubmit(values: ContactValues) {
    void values;
    toast.success(contact.successTitle, { description: contact.successText });
    form.reset();
  }

  return (
    <section id="contact" className="tacktech-divider bg-navy px-5 py-20 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Contact" title={contact.title} intro={contact.subtitle} dark /></Reveal>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-x-5 gap-y-5 border border-gold/20 bg-navy-soft/60 p-5 shadow-[inset_0_1px_color-mix(in_oklab,var(--gold)_12%,transparent)] sm:grid-cols-2 sm:p-8">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-on-navy/85">Name</Label>
              <Input id="contact-name" autoComplete="name" aria-invalid={Boolean(form.formState.errors.name)} className="border-on-navy/20 bg-navy text-on-navy placeholder:text-on-navy/40 focus-visible:ring-gold" {...form.register("name")} />
              {form.formState.errors.name ? <p className="text-sm text-destructive">{form.formState.errors.name.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-organisation" className="text-on-navy/85">Organisation</Label>
              <Input id="contact-organisation" autoComplete="organization" aria-invalid={Boolean(form.formState.errors.organisation)} className="border-on-navy/20 bg-navy text-on-navy placeholder:text-on-navy/40 focus-visible:ring-gold" {...form.register("organisation")} />
              {form.formState.errors.organisation ? <p className="text-sm text-destructive">{form.formState.errors.organisation.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-on-navy/85">Email</Label>
              <Input id="contact-email" type="email" autoComplete="email" aria-invalid={Boolean(form.formState.errors.email)} className="border-on-navy/20 bg-navy text-on-navy placeholder:text-on-navy/40 focus-visible:ring-gold" {...form.register("email")} />
              {form.formState.errors.email ? <p className="text-sm text-destructive">{form.formState.errors.email.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-org-type" className="text-on-navy/85">Organisation type</Label>
              <Controller control={form.control} name="orgType" render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-org-type" aria-invalid={Boolean(form.formState.errors.orgType)} className="border-on-navy/20 bg-navy text-on-navy"><SelectValue placeholder={contact.orgTypePlaceholder} /></SelectTrigger>
                  <SelectContent>{orgTypeOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              )} />
              {form.formState.errors.orgType ? <p className="text-sm text-destructive">{form.formState.errors.orgType.message}</p> : null}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact-message" className="text-on-navy/85">What do you need?</Label>
              <Textarea id="contact-message" rows={5} aria-invalid={Boolean(form.formState.errors.message)} className="border-on-navy/20 bg-navy text-on-navy placeholder:text-on-navy/40 focus-visible:ring-gold" {...form.register("message")} />
              {form.formState.errors.message ? <p className="text-sm text-destructive">{form.formState.errors.message.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="h-12 bg-gold px-6 text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-gold-soft">
                {form.formState.isSubmitting ? "Sending…" : contact.submitLabel}<ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </form>
          <aside className="border-t border-on-navy/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold">Get in touch</p>
            <h3 className="mt-3 font-display text-2xl font-bold text-on-navy">Let’s talk about what you’re building.</h3>
            <div className="mt-7 space-y-5">
              <a className="block border-b border-on-navy/15 pb-4 text-sm text-on-navy transition-colors hover:text-gold-soft" href={`mailto:${site.email}`}>
                <span className="mb-1 block text-xs text-on-navy/55">Email</span>{site.email}
              </a>
              <a className="block border-b border-on-navy/15 pb-4 text-sm text-on-navy transition-colors hover:text-gold-soft" href={`tel:${site.phone.replaceAll(" ", "")}`}>
                <span className="mb-1 block text-xs text-on-navy/55">Phone</span>{site.phone}
              </a>
              <p className="text-sm text-on-navy"><span className="mb-1 block text-xs text-on-navy/55">Location</span>{site.location}</p>
            </div>
            <Button asChild variant="outline" className="mt-7 border-gold/35 bg-transparent text-on-navy hover:bg-gold/10 hover:text-on-navy">
              <a href={site.whatsappUrl} target="_blank" rel="noreferrer">{contact.whatsappLabel}<MoveUpRight aria-hidden="true" /></a>
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy px-5 py-10 text-on-navy sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 border-b border-on-navy/15 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo variant="full-reverse" className="h-10" />
            <p className="mt-3 text-xs text-on-navy/55">{site.fiveTsLine}</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="text-sm text-on-navy/70 transition-colors hover:text-gold-soft">{link.label}</a>)}
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-5 text-xs text-on-navy/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <a href="#home" className="flex items-center gap-2 text-on-navy/70 hover:text-gold-soft">Back to top <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 -rotate-45" /></a>
        </div>
      </div>
    </footer>
  );
}