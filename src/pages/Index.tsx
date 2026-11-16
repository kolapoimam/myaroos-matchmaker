import { Link } from "react-router-dom";
import { ArrowRight, Github, HeartHandshake, Lock, ScrollText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import HadithCarousel from "@/components/HadithCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import PageShell from "@/components/PageShell";
import { REPO_URL } from "@/lib/constants";

const features = [
  {
    emoji: "📝",
    title: "What is MyAroos?",
    body: "A comprehensive Islamic tool designed to help Muslims evaluate their readiness for marriage and assess compatibility with potential spouses.",
    tint: "bg-[hsl(var(--mint))]",
  },
  {
    emoji: "💍",
    title: "Why use MyAroos?",
    body: "Marriage is half our deen. MyAroos helps you make this important decision based on Islamic principles and personal compatibility.",
    tint: "bg-[hsl(var(--gold)/0.18)]",
  },
  {
    emoji: "✨",
    title: "How does it work?",
    body: "Take the Readiness Quiz, describe yourself and your potential spouse, and get personalised guidance you can download and share.",
    tint: "bg-[hsl(var(--rose)/0.35)]",
  },
];

const tools = [
  {
    to: "/marriage-readiness",
    emoji: "🧭",
    title: "Marriage Readiness Quiz",
    body: "23 honest questions across spiritual, emotional, financial and family readiness.",
    cta: "Try Readiness Quiz",
  },
  {
    to: "/compatibility",
    emoji: "⚖️",
    title: "Compatibility Match Tool",
    body: "Compare values, commitment and lifestyle with a suitor. Get a checklist, or a kind exit message.",
    cta: "Get Compatibility Score",
  },
];

const Index = () => {
  return (
    <PageShell>
      {/* Hero */}
      <section className="container-custom pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-rise text-center lg:text-left">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> Free · Private · Open source
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] md:text-7xl">
              Find your <span className="italic text-primary">perfect match</span>{" "}
              <span className="text-gold-gradient">with Islamic values</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              MyAroos helps you assess your marriage readiness and find compatibility with potential suitors based on
              Islamic principles. Honest questions, playful results, zero data stored.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-14 rounded-full px-8 text-base shadow-lg shadow-primary/20">
                <Link to="/marriage-readiness">
                  Try Readiness Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-2 px-8 text-base">
                <Link to="/compatibility">Get Compatibility Score</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-primary" /> Runs in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <ScrollText className="h-4 w-4 text-primary" /> PNG & PDF reports
              </span>
            </div>
          </div>

          {/* Hadith card with floating stickers */}
          <div className="relative mx-auto w-full max-w-md animate-rise [animation-delay:150ms]">
            <span
              className="sticker absolute -left-4 -top-5 z-10 animate-float bg-[hsl(var(--gold))] text-[hsl(165_35%_8%)] [--r:-8deg]"
              aria-hidden="true"
            >
              💍 half your deen
            </span>
            <span
              className="sticker absolute -bottom-5 -right-3 z-10 animate-float bg-[hsl(var(--rose))] text-[hsl(165_35%_8%)] [--r:6deg] [animation-delay:1.5s]"
              aria-hidden="true"
            >
              🌙 bismillah
            </span>
            <div className="surface relative overflow-hidden p-8">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 animate-spin-slow rounded-full border-[18px] border-dashed border-[hsl(var(--gold)/0.25)]"
              />
              <p className="eyebrow mb-6">Words of Wisdom</p>
              <HadithCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="container-custom pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool, i) => (
            <Link
              key={tool.to}
              to={tool.to}
              className={`surface group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                i === 0 ? "md:-rotate-[0.6deg]" : "md:rotate-[0.6deg]"
              } hover:rotate-0`}
            >
              <span className="text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 inline-block" aria-hidden="true">
                {tool.emoji}
              </span>
              <h2 className="mt-5 text-3xl font-semibold">{tool.title}</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">{tool.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                {tool.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="border-y bg-card/60 py-20">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <span className="eyebrow">The basics</span>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">Why choose MyAroos?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${f.tint}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-3xl shadow-sm">
                    {f.emoji}
                  </span>
                  <span className="font-display text-5xl font-semibold text-foreground/10">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/75">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <TestimonialsCarousel />
      </section>

      {/* CTA */}
      <section className="container-custom">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center text-primary-foreground md:px-16">
          <div
            aria-hidden="true"
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[hsl(var(--gold)/0.35)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-[hsl(var(--rose)/0.35)] blur-3xl"
          />
          <HeartHandshake className="relative mx-auto h-12 w-12 animate-wiggle text-[hsl(var(--gold))]" />
          <h2 className="relative mt-5 text-4xl font-semibold md:text-5xl">Ready to find your perfect match?</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg opacity-85">
            Take the first step towards a blessed union by assessing your marriage readiness and compatibility based on
            Islamic values.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="h-14 rounded-full px-8 text-base">
              <Link to="/marriage-readiness">Get Started Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-14 rounded-full border border-current/30 px-8 text-base hover:bg-white/10 hover:text-current"
            >
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
