import { Github, MessageCircle, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageShell from "@/components/PageShell";
import { REPO_URL } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pillars = [
  { icon: ShieldCheck, title: "Private by design", body: "Everything runs in your browser. Nothing is stored or sent." },
  { icon: Sparkles, title: "Islamic first", body: "Questions centred on deen, adab and real married life." },
  { icon: Users, title: "Community built", body: "Open source, so scholars and developers can help improve it." },
];

const About = () => {
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
              <AccordionItem value="item-1" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Is this app a substitute for parental guidance or Wali involvement?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    No, absolutely not. MyAroos is designed to be a complementary tool to traditional Islamic approaches to marriage. 
                    We strongly encourage involving parents, guardians (Wali), and trusted community members in your marriage process. 
                    Our tools can help you clarify your own readiness and compatibility, but should be used alongside proper Islamic 
                    protocols for marriage.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How does the compatibility assessment work?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    Our compatibility assessment examines several key areas that are important in an Islamic marriage, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Religious values and practices</li>
                    <li>Level of religious commitment</li>
                    <li>Core religious practices</li>
                    <li>Personality and lifestyle preferences</li>
                    <li>Long-term goals and expectations</li>
                  </ul>
                  <p className="mt-2">
                    We use a weighted scoring system that prioritizes religious compatibility while also accounting for personal preferences.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Is my data secure and private?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    Yes. We do not store any of your responses or personal information on our servers. All assessments happen locally 
                    in your browser, and the results are not saved after you close or refresh the page. Your privacy is important to us, 
                    especially when it comes to such personal matters.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Are the hadiths used in this app authentic?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    We have made every effort to include only authentic hadiths from reliable sources. All hadiths displayed in our app 
                    come from recognized collections such as Bukhari, Muslim, Tirmidhi, Ibn Majah, and others. However, we are not Islamic 
                    scholars, and we encourage users to verify hadiths through reputable Islamic scholarship if they have any concerns.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What if I get a low compatibility score with someone?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    A low compatibility score doesn't necessarily mean you shouldn't proceed with the relationship, but it does indicate 
                    areas where significant differences exist. These differences may require compromise, adjustment, or further discussion. 
                    We provide a respectful breakup message generator for those who decide not to proceed, but we also encourage prayer (Istikhara) 
                    and consultation with trusted advisors before making any final decisions.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I use this app for arranged marriage prospects?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    Absolutely! MyAroos is especially useful for arranged marriage scenarios where you may have limited information about the potential spouse. 
                    The compatibility test can help guide your conversations during initial meetings and identify areas where you should seek more information. 
                    Many of our users find it helpful to complete the compatibility test after meeting a potential spouse suggested by family members.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How often should I take the marriage readiness quiz?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    We recommend taking the marriage readiness quiz at least once a year if you're actively seeking marriage. Personal growth 
                    happens continuously, and your readiness may change over time. If you've been working on specific areas of improvement, you 
                    might retake it after a few months to track your progress. The quiz is designed to be a tool for self-reflection rather than 
                    a one-time assessment.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Does the app consider cultural differences in marriage expectations?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    Yes, our compatibility tool recognizes that Muslims come from diverse cultural backgrounds with varying customs and traditions. 
                    While we prioritize Islamic principles that apply universally, we acknowledge cultural differences in our assessment questions. 
                    We encourage users to discuss cultural expectations openly, as these can significantly impact marital harmony.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-9" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can converts to Islam use this app effectively?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    Absolutely! MyAroos is designed to be accessible to all Muslims, including recent converts. We've intentionally created our 
                    tools to focus on core Islamic values while being inclusive of people at different stages in their Islamic journey. If you're 
                    a convert, the marriage readiness quiz can be particularly helpful in identifying areas where you might benefit from more 
                    Islamic knowledge or community support before marriage.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Is MyAroos suitable for Muslims of all madhabs?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    Yes, MyAroos is designed to be inclusive of all orthodox Islamic schools of thought. Our questions focus on fundamental 
                    aspects of marriage that are generally agreed upon across major madhabs. Where there might be differences in fiqh rulings, 
                    we've taken a balanced approach that respects diverse interpretations while maintaining core Islamic principles.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-11" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How are the scores calculated in your assessment?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    Our scoring system is based on a weighted algorithm that prioritizes factors in this order: religious compatibility, life goals 
                    and values, personality traits, and practical considerations. Religious factors receive the highest weight in our calculations because 
                    of their fundamental importance in an Islamic marriage. Each category contributes to your overall compatibility score, giving you 
                    a comprehensive view of your potential relationship's strengths and areas that may need discussion.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-12" className="rounded-2xl border bg-card/80 px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How can I contribute feedback to improve MyAroos?
                </AccordionTrigger>
                <AccordionContent className="text-left leading-relaxed text-muted-foreground">
                  <p>
                    We welcome feedback from our users! Your insights help us make MyAroos more beneficial for the Muslim community. You can share your 
                    suggestions, report any issues, or tell us your success stories by opening an issue on our GitHub repository. We particularly value feedback from Islamic scholars, 
                    marriage counselors, and community leaders who can help ensure our content remains authentic and beneficial.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-center text-primary-foreground">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[hsl(var(--gold)/0.35)] blur-3xl" />
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
