
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Fatima H.",
    location: "London, UK",
    testimonial: "The Marriage Readiness Quiz helped me realize I had important areas to work on before finding a spouse. Alhamdulillah for this tool!",
    avatar: "FH"
  },
  {
    name: "Ahmed K.",
    location: "Toronto, Canada",
    testimonial: "The compatibility tool confirmed what I felt in my heart. It helped me have an honest conversation with my potential spouse.",
    avatar: "AK"
  },
  {
    name: "Aisha M.",
    location: "Dubai, UAE",
    testimonial: "I was unsure about a suitor, but the compatibility test revealed we had different religious values. Saved me future heartache!",
    avatar: "AM"
  },
  {
    name: "Anonymous",
    location: "Kuala Lumpur, Malaysia",
    testimonial: "After scoring high on compatibility, we used the marriage checklist to guide our pre-nikkah conversations. So helpful!",
    avatar: "A"
  },
  {
    name: "Yusuf R.",
    location: "Chicago, USA",
    testimonial: "The respectful breakup message generator helped me end things kindly when I realized we weren't compatible. Jazakallah khair!",
    avatar: "YR"
  }
];

export default function TestimonialsCarousel() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Display 3 testimonials at a time on larger screens, 1 on mobile
  const visibleTestimonials = [];
  for (let i = 0; i < 3; i++) {
    const index = (startIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-semibold text-center mb-8">What Our Users Say</h2>
      <div className="hidden md:grid grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial, idx) => (
          <Card key={idx} className="h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarFallback className="bg-brand-green text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <p className="mb-4 italic">{testimonial.testimonial}</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Mobile carousel - shows one testimonial at a time */}
      <div className="md:hidden">
        <Card className="h-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 mb-4">
                <AvatarFallback className="bg-brand-green text-white">
                  {testimonials[startIndex].avatar}
                </AvatarFallback>
              </Avatar>
              <p className="mb-4 italic">{testimonials[startIndex].testimonial}</p>
              <div>
                <p className="font-medium">{testimonials[startIndex].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[startIndex].location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === startIndex ? "bg-brand-green" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
