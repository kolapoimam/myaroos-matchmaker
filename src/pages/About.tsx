import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col islamic-pattern font-poppins">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">About MyAroos</h1>
            
            <Card className="mb-10">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="mb-4">
                  MyAroos was created to help Muslims make one of life's most important decisions - choosing a spouse - 
                  based on Islamic principles and practical compatibility.
                </p>
                <p>
                  We believe that a successful marriage begins with proper preparation and a thoughtful evaluation of compatibility.
                  Our tools help you assess yourself and potential spouses in a structured, Islamic-oriented way.
                </p>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="mb-10">
              {[
                { question: "Is this app a substitute for parental guidance or wali involvement?", answer: "No, absolutely not. MyAroos is designed to be a complementary tool..." },
                { question: "How does the compatibility assessment work?", answer: "Our compatibility assessment examines several key areas..." },
                { question: "Is my data secure and private?", answer: "Yes. We do not store any of your responses or personal information..." },
                { question: "Are the hadiths used in this app authentic?", answer: "We have made every effort to include only authentic hadiths..." },
                { question: "What if I get a low compatibility score with someone?", answer: "A low compatibility score doesn't necessarily mean you shouldn't proceed..." },
                { question: "Can I use this app for arranged marriage prospects?", answer: "Absolutely! MyAroos is especially useful for arranged marriage scenarios..." },
                { question: "How often should I take the marriage readiness quiz?", answer: "We recommend taking the marriage readiness quiz at least once a year..." },
                { question: "Does the app consider cultural differences in marriage expectations?", answer: "Yes, our compatibility tool recognizes that Muslims come from diverse cultural backgrounds..." },
                { question: "Can converts to Islam use this app effectively?", answer: "Absolutely! MyAroos is designed to be accessible to all Muslims, including recent converts..." },
                { question: "Is MyAroos suitable for Muslims of all madhabs?", answer: "Yes, MyAroos is designed to be inclusive of all orthodox Islamic schools of thought..." },
                { question: "How are the scores calculated in your assessment?", answer: "Our scoring system is based on a weighted algorithm..." },
                { question: "How can I contribute feedback to improve MyAroos?", answer: "We welcome feedback from our users! Your insights help us improve..." }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="bg-brand-green text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-6">
                Have questions, suggestions, or feedback? We'd love to hear from you! 
              </p>
              <p className="font-medium">
                Email: hello@myaroos.com
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
