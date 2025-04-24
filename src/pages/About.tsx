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
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Is this app a substitute for parental guidance or Wali involvement?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    No, absolutely not. MyAroos is designed to be a complementary tool to traditional Islamic approaches to marriage. 
                    We strongly encourage involving parents, guardians (Wali), and trusted community members in your marriage process. 
                    Our tools can help you clarify your own readiness and compatibility, but should be used alongside proper Islamic 
                    protocols for marriage.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
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
                <AccordionTrigger>
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
                <AccordionTrigger>
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
                <AccordionTrigger>
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
              
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Can I use this app for arranged marriage prospects?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    Absolutely! MyAroos is especially useful for arranged marriage scenarios where you may have limited information about the potential spouse. 
                    The compatibility test can help guide your conversations during initial meetings and identify areas where you should seek more information. 
                    Many of our users find it helpful to complete the compatibility test after meeting a potential spouse suggested by family members.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  How often should I take the marriage readiness quiz?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    We recommend taking the marriage readiness quiz at least once a year if you're actively seeking marriage. Personal growth 
                    happens continuously, and your readiness may change over time. If you've been working on specific areas of improvement, you 
                    might retake it after a few months to track your progress. The quiz is designed to be a tool for self-reflection rather than 
                    a one-time assessment.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger>
                  Does the app consider cultural differences in marriage expectations?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    Yes, our compatibility tool recognizes that Muslims come from diverse cultural backgrounds with varying customs and traditions. 
                    While we prioritize Islamic principles that apply universally, we acknowledge cultural differences in our assessment questions. 
                    We encourage users to discuss cultural expectations openly, as these can significantly impact marital harmony.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-9">
                <AccordionTrigger>
                  Can converts to Islam use this app effectively?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    Absolutely! MyAroos is designed to be accessible to all Muslims, including recent converts. We've intentionally created our 
                    tools to focus on core Islamic values while being inclusive of people at different stages in their Islamic journey. If you're 
                    a convert, the marriage readiness quiz can be particularly helpful in identifying areas where you might benefit from more 
                    Islamic knowledge or community support before marriage.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10">
                <AccordionTrigger>
                  Is MyAroos suitable for Muslims of all madhabs?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    Yes, MyAroos is designed to be inclusive of all orthodox Islamic schools of thought. Our questions focus on fundamental 
                    aspects of marriage that are generally agreed upon across major madhabs. Where there might be differences in fiqh rulings, 
                    we've taken a balanced approach that respects diverse interpretations while maintaining core Islamic principles.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-11">
                <AccordionTrigger>
                  How are the scores calculated in your assessment?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    Our scoring system is based on a weighted algorithm that prioritizes factors in this order: religious compatibility, life goals 
                    and values, personality traits, and practical considerations. Religious factors receive the highest weight in our calculations because 
                    of their fundamental importance in an Islamic marriage. Each category contributes to your overall compatibility score, giving you 
                    a comprehensive view of your potential relationship's strengths and areas that may need discussion.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-12">
                <AccordionTrigger>
                  How can I contribute feedback to improve MyAroos?
                </AccordionTrigger>
                <AccordionContent className="text-left">
                  <p>
                    We welcome feedback from our users! Your insights help us make MyAroos more beneficial for the Muslim community. You can share your 
                    suggestions, report any issues, or tell us your success stories by emailing us. We particularly value feedback from Islamic scholars, 
                    marriage counselors, and community leaders who can help ensure our content remains authentic and beneficial.
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
                Email:
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
