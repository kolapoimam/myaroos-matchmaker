import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const hadiths = [
  {
    text: "The best among you are those who are best to their wives.",
    source: "Tirmidhi"
  },
  {
    text: "When a man marries, he has fulfilled half of his religion.",
    source: "Bayhaqi"
  },
  {
    text: "A woman is married for four things: her wealth, her lineage, her beauty, and her religion. Marry the one who is religious, may your hands be rubbed with dust!",
    source: "Bukhari & Muslim"
  },
  {
    text: "The most blessed marriage is the one with the least expenses.",
    source: "Ibn Hibban"
  },
  {
    text: "Marriage is my Sunnah. Whosoever keeps away from it is not from me.",
    source: "Ibn Majah"
  }
];

export default function HadithCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hadiths.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full">
      <div className="relative min-h-[11rem]" aria-live="polite">
        {hadiths.map((hadith, index) => (
          <figure
            key={index}
            aria-hidden={index !== currentIndex}
            className={cn(
              "absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out",
              index === currentIndex ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            )}
          >
            <blockquote className="font-display text-xl font-medium leading-snug md:text-2xl">
              <span className="mr-1 text-gold">“</span>
              {hadith.text}
              <span className="ml-1 text-gold">”</span>
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {hadith.source}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        {hadiths.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
            )}
            aria-label={`Go to hadith ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
