import { Github, MessageCircle, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageShell from "@/components/PageShell";
import { REPO_URL } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq } from "@/data/faq";
import { useSeo } from "@/hooks/useSeo";

const pillars = [
  { icon: ShieldCheck, title: "Private by design", body: "Everything runs in your browser. Nothing is stored or sent." },
  { icon: Sparkles, title: "Islamic first", body: "Questions centred on deen, adab and real married life." },
  { icon: Users, title: "Community built", body: "Open source, so scholars and developers can help improve it." },
];

const About = () => {
  useSeo();
  return (
    <PageShell>
      <section className="container-custom py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="eyebrow">About</span>
            <h1 className="mt-4 text-5xl font-semibold md:text-6xl">
              About <span className="italic text-primary">MyAroos</span>
            </h1>
          </div>

          <div className="surface mb-8 p-8 md:p-10">
            <h2 className="mb-4 text-3xl font-semibold">Our Mission</h2>
            <p className="mb-4 text-lg leading-relaxed">
              MyAroos was created to help Muslims make one of life's most important decisions, choosing a spouse, based
              on Islamic principles and practical compatibility.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We believe that a successful marriage begins with proper preparation and a thoughtful evaluation of
              compatibility. Our tools help you assess yourself and potential spouses in a structured, Islamic-oriented
              way.
            </p>
          </div>

          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-3xl border bg-[hsl(var(--mint)/0.6)] p-6">
                <p.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-foreground/75">{p.body}</p>
              </div>
            ))}
          </div>

            <h2 className="mb-6 text-center text-4xl font-semibold">Frequently asked questions</h2>
            
            <Accordion type="single" collapsible className="mb-14 space-y-3">
              {faq.map((item, i) => (
                <AccordionItem key={item.question} value={`item-${i + 1}`} className="rounded-2xl border bg-card/80 px-5">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-left leading-relaxed text-muted-foreground">
                    <p>{item.answer[0]}</p>
                    {item.list && (
                      <ul className="list-disc space-y-1 pl-6">
                        {item.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                    {item.answer.slice(1).map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-center text-primary-foreground">
              <div aria-hidden="true" className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gold" />
              <h2 className="relative text-3xl font-semibold">Contact & contribute</h2>
              <p className="relative mx-auto mt-3 max-w-xl opacity-85">
                Have questions, suggestions, or feedback? Open an issue on GitHub or send a pull request. Scholars,
                counsellors, designers and developers are all welcome.
              </p>
              <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="rounded-full">
                  <a href={`${REPO_URL}/issues/new/choose`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Share feedback
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-full border border-current/30 hover:bg-white/10 hover:text-current"
                >
                  <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>
        </div>
      </section>
    </PageShell>
  );
};

export default About;
