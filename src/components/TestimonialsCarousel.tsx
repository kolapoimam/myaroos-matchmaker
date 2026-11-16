import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aisha B.",
    location: "Lagos, Nigeria",
    testimonial: "The Marriage Readiness Quiz helped me realize I needed to work on my financial planning before considering marriage. Alhamdulillah for this guidance!",
    avatar: "AB"
  },
  {
    name: "Ibrahim K.",
    location: "Abuja, Nigeria",
    testimonial: "The compatibility tool confirmed what I felt about a suitor. It helped my family and I have an honest conversation about our different expectations.",
    avatar: "IK"
  },
  {
    name: "Fatima M.",
    location: "Kano, Nigeria",
    testimonial: "I was unsure about a potential spouse, but the compatibility test revealed we had different approaches to religious practice. Saved me future heartache!",
    avatar: "FM"
  },
  {
    name: "Yusuf O.",
    location: "Accra, Ghana",
    testimonial: "After scoring high on compatibility, we used the marriage checklist to guide our conversations before meeting the families. Extremely helpful!",
    avatar: "YO"
  },
  {
    name: "Aminah J.",
    location: "Nairobi, Kenya",
    testimonial: "The respectful breakup message generator helped me end things kindly when I realized we weren't compatible. Jazakallah khair for this tool!",
    avatar: "AJ"
  }
];

const tints = ["bg-[hsl(var(--mint))]", "bg-[hsl(var(--gold)/0.18)]", "bg-[hsl(var(--rose)/0.35)]"];

/** Infinite, hover-pausable marquee of testimonial cards */
export default function TestimonialsCarousel() {
  const loop = [...testimonials, ...testimonials];

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <span className="eyebrow">Alhamdulillah</span>
        <h2 className="mt-4 text-4xl font-semibold md:text-5xl">What our users say</h2>
      </div>
      <div className="group relative overflow-hidden">
        <div className="flex w-max animate-slide gap-5 py-4 [animation-duration:45s] group-hover:[animation-play-state:paused]">
          {loop.map((t, idx) => (
            <figure
              key={idx}
              className={`w-[300px] shrink-0 rounded-3xl border p-6 shadow-sm transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02] md:w-[340px] ${tints[idx % tints.length]}`}
              aria-hidden={idx >= testimonials.length}
            >
              <Quote className="mb-3 h-6 w-6 text-primary/60" />
              <blockquote className="text-[15px] leading-relaxed">{t.testimonial}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.location}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
