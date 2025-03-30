
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative h-48">
        {hadiths.map((hadith, index) => (
          <Card
            key={index}
            className={`absolute w-full transform transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="pt-6 flex flex-col items-center justify-center h-40 text-center">
              <p className="text-lg mb-2 font-medium italic">"{hadith.text}"</p>
              <p className="text-sm text-muted-foreground">— {hadith.source}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {hadiths.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-brand-green" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
