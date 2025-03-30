
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

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
