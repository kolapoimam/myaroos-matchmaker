
import { Button } from "@/components/ui/button";
import HadithCarousel from "@/components/HadithCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col islamic-pattern">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Find Your <span className="text-brand-green">Perfect Match</span> with Islamic Values
                </h1>
                <p className="text-lg mb-8 text-muted-foreground">
                  MyAroos helps you assess your marriage readiness and find compatibility with potential suitors based on Islamic principles.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild size="lg">
                    <Link to="/marriage-readiness">Readiness Quiz</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/compatibility">Compatibility Test</Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-brand-black-light p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Words of Wisdom</h2>
                <HadithCarousel />
              </div>
            </div>
          </div>
        </section>
        
        {/* Information Sections */}
        <section className="py-16 bg-white dark:bg-brand-black-light">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose MyAroos?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-brand-black p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">What is MyAroos?</h3>
                <p>
                  MyAroos is a comprehensive Islamic tool designed to help Muslims evaluate their readiness for marriage and assess compatibility with potential spouses.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-brand-black p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Why Use MyAroos?</h3>
                <p>
                  Marriage is half our deen, and MyAroos helps ensure you're making this important decision based on Islamic principles and personal compatibility.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-brand-black p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">How It Works?</h3>
                <p>
                  Take our Marriage Readiness Quiz, input information about yourself and your potential spouse, and get personalized Islamic guidance.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container-custom">
            <TestimonialsCarousel />
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-brand-green text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Take the first step towards a blessed union by assessing your marriage readiness and compatibility based on Islamic values.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-brand-green hover:bg-gray-100">
              <Link to="/marriage-readiness">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
