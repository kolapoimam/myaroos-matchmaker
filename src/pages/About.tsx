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
                <p className="mb-4 text-left">
                  MyAroos was created to help Muslims make one of life's most important decisions - choosing a spouse - 
                  based on Islamic principles and practical compatibility.
                </p>
                <p className="text-left">
                  We believe that a successful marriage begins with proper preparation and a thoughtful evaluation of compatibility.
                  Our tools help you assess yourself and potential spouses in a structured, Islamic-oriented way.
                </p>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-semibold mb-4 text-left">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="mb-10">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Is this app a substitute for parental guidance or wali involvement?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    No, absolutely not. MyAroos is designed to be a complementary tool to traditional Islamic approaches to marriage. 
                    We strongly encourage involving parents, guardians (wali), and trusted community members in your marriage process. 
                    Our tools can help you clarify your own readiness and compatibility, but should be used alongside proper Islamic 
                    protocols for marriage.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How does the compatibility assessment work?
                </AccordionTrigger>
                <AccordionContent className="text-left">
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
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Is my data secure and private?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    Yes. We do not store any of your responses or personal information on our servers. All assessments happen locally 
                    in your browser, and the results are not saved after you close or refresh the page. Your privacy is important to us, 
                    especially when it comes to such personal matters.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Are the hadiths used in this app authentic?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    We have made every effort to include only authentic hadiths from reliable sources. All hadiths displayed in our app 
                    come from recognized collections such as Bukhari, Muslim, Tirmidhi, Ibn Majah, and others. However, we are not Islamic 
                    scholars, and we encourage users to verify hadiths through reputable Islamic scholarship if they have any concerns.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  What if I get a low compatibility score with someone?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    A low compatibility score doesn't necessarily mean you shouldn't proceed with the relationship, but it does indicate 
                    areas where significant differences exist. These differences may require compromise, adjustment, or further discussion. 
                    We provide a respectful breakup message generator for those who decide not to proceed, but we also encourage prayer (Istikhara) 
                    and consultation with trusted advisors before making any final decisions.
                  </p>
                </AccordionContent>
              </AccordionItem>
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
