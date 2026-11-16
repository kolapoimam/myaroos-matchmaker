/**
 * Per page SEO metadata. Used at runtime by `useSeo` and at build time by
 * `scripts/seo-build.mjs`, which writes a static HTML file per route so crawlers
 * and AI assistants that do not run JavaScript still see the right content.
 */
export const SITE = {
  name: "MyAroos",
  url: "https://myaroos.vercel.app",
  tagline: "Marriage readiness and compatibility, the halal way",
  description:
    "MyAroos is a free Islamic marriage readiness quiz and spouse compatibility test. Answer honest questions, get a score with practical tips, and download your report as PNG or PDF. Private, no sign up.",
  ogImage: "/og-image.png",
  twitter: "@PiousGeek",
  author: "Kolapo Imam",
  repo: "https://github.com/kolapoimam/myaroos-matchmaker",
};

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  /** Short plain text summary shown to crawlers that do not run JavaScript */
  summary: string;
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
}

export const routes: RouteSeo[] = [
  {
    path: "/",
    title: "MyAroos | Islamic Marriage Readiness Quiz & Compatibility Test",
    description: SITE.description,
    summary:
      "MyAroos helps Muslims prepare for marriage. Take the free Marriage Readiness Quiz to see how ready you are spiritually, emotionally, financially and socially, or use the Compatibility Match Tool to compare values and lifestyle with a potential spouse. Results include category scores, improvement tips, a marriage checklist and a downloadable PNG or PDF report. Everything runs in your browser and nothing is stored.",
    priority: 1,
    changefreq: "weekly",
  },
  {
    path: "/marriage-readiness",
    title: "Marriage Readiness Quiz for Muslims | MyAroos",
    description:
      "Am I ready for marriage? Take this free 23 question Islamic marriage readiness quiz covering prayer and faith, emotional maturity, finances and mahr, family and in-laws. Get your score and tips in 5 minutes.",
    summary:
      "The MyAroos Marriage Readiness Quiz has 23 questions in four categories: Spiritual Readiness, Emotional Readiness, Financial Readiness, and Family & Social Readiness. Each answer scores from 0 to 10. You get an overall readiness percentage, a score for each category and practical tips for weak areas. It is free, takes about five minutes and stores no data.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/compatibility",
    title: "Islamic Compatibility Test for a Potential Spouse | MyAroos",
    description:
      "Is this person right for me? Compare religious values, level of practice, personality, life goals and culture with a suitor. Free halal compatibility test with a marriage checklist and a respectful way to say no.",
    summary:
      "The MyAroos Compatibility Match Tool compares you with a potential spouse in three steps: your details, the suitor's details, and questions about the suitor. The score out of 100 combines shared religious values (40), religious commitment (20) and answers across Core Religious Practice, Personality & Lifestyle, Long-Term Compatibility and Cultural & Educational Compatibility (40). Results include an Islamic marriage checklist and a respectful breakup message generator.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "About MyAroos | FAQ, Privacy & How Scoring Works",
    description:
      "Learn how MyAroos works, how scores are calculated, how your privacy is protected and how to contribute to this open source Islamic marriage tool.",
    summary:
      "MyAroos was created to help Muslims choose a spouse based on Islamic principles and practical compatibility. It is a guidance tool, not a replacement for a wali, family or scholars. It is open source under the MIT License and runs fully in the browser with no data stored.",
    priority: 0.6,
    changefreq: "monthly",
  },
];

export function getRouteSeo(path: string): RouteSeo | undefined {
  return routes.find((r) => r.path === path);
}
