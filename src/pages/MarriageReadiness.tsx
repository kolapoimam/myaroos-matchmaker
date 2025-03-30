
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Define question categories
const categories = [
  {
    id: "spiritual",
    title: "Spiritual Readiness",
    questions: [
      {
        id: "pray-five-times",
        question: "Do you pray five times daily?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "sometimes", label: "Sometimes", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "islamic-marriage-study",
        question: "Have you studied Islamic marriage rights & responsibilities?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "occasionally", label: "Occasionally", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "islamic-knowledge",
        question: "How often do you seek Islamic knowledge?",
        options: [
          { value: "daily", label: "Daily", score: 10 },
          { value: "weekly", label: "Weekly", score: 7 },
          { value: "occasionally", label: "Occasionally", score: 4 },
          { value: "rarely", label: "Rarely", score: 0 },
        ],
      },
      {
        id: "religious-practice",
        question: "Are you comfortable leading/cooperating in religious household practices?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "needs-improvement", label: "Needs Improvement", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "emotional",
    title: "Emotional Readiness",
    questions: [
      {
        id: "handle-disagreements",
        question: "Can you handle disagreements maturely and Islamically?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "working-on-it", label: "Working on it", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "handle-stress",
        question: "How do you handle stress and difficult conversations?",
        options: [
          { value: "calmly", label: "Calmly", score: 10 },
          { value: "with-difficulty", label: "With Difficulty", score: 5 },
          { value: "avoid-it", label: "I Avoid It", score: 0 },
        ],
      },
      {
        id: "patience",
        question: "Are you patient and understanding when things don't go your way?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "sometimes", label: "Sometimes", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "financial",
    title: "Financial Readiness",
    questions: [
      {
        id: "stable-income",
        question: "Do you have a stable income?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "working-on-it", label: "Working on it", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "financial-goals",
        question: "Do you have financial goals for marriage?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "somewhat", label: "Somewhat", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "budget",
        question: "Can you budget effectively and avoid debt?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "trying-to-improve", label: "Trying to Improve", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
  {
    id: "family-social",
    title: "Family & Social Readiness",
    questions: [
      {
        id: "family-expectations",
        question: "Have you discussed marriage expectations with your family?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "planning-to-soon", label: "Planning to Soon", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "cultural-dynamics",
        question: "Are you open to different cultural family dynamics?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "depends", label: "Depends", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "in-law-relationships",
        question: "Are you prepared for in-law relationships?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "havent-thought", label: "I Haven't Thought About It", score: 3 },
          { value: "no", label: "No", score: 0 },
        ],
      },
    ],
  },
];

const totalPossibleScore = categories.reduce(
  (sum, category) =>
    sum +
    category.questions.reduce((qSum, question) => {
      const maxScore = Math.max(...question.options.map((o) => o.score));
      return qSum + maxScore;
    }, 0),
  0
);

const MarriageReadiness = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([categories[0].id]);
  const { toast } = useToast();

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    // Check if all questions in current category are answered
    const currentCategoryQuestions = categories[currentCategory].questions;
    const allAnswered = currentCategoryQuestions.every(
      (q) => answers[q.id] !== undefined
    );

    if (!allAnswered) {
      toast({
        title: "Please answer all questions",
        description: "All questions in this section must be answered before moving on.",
        variant: "destructive",
      });
      return;
    }

    if (currentCategory < categories.length - 1) {
      setCurrentCategory((prev) => prev + 1);
      setExpandedCategories([categories[currentCategory + 1].id]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
      setExpandedCategories([categories[currentCategory - 1].id]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    
    categories.forEach((category) => {
      category.questions.forEach((question) => {
        const answer = answers[question.id];
        if (answer) {
          const option = question.options.find((o) => o.value === answer);
          if (option) {
            totalScore += option.score;
          }
        }
      });
    });
    
    return totalScore;
  };

  const getScorePercentage = () => {
    const score = calculateScore();
    return Math.round((score / totalPossibleScore) * 100);
  };

  const getResultMessage = () => {
    const percentage = getScorePercentage();
    
    if (percentage >= 80) {
      return {
        title: "MashaAllah! You're marriage-ready!",
        message: "You show excellent preparation for marriage in all key areas. Time to find your other half!",
      };
    } else if (percentage >= 60) {
      return {
        title: "You're close!",
        message: "Just a few tweaks and you'll be nikkah-ready, In Sha Allah!",
      };
    } else {
      return {
        title: "Uh-oh! More preparation needed.",
        message: "You might need some personal development before saying \"Qabiltu!\"",
      };
    }
  };

  return (
    <div className="min-h-screen flex flex-col islamic-pattern">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white dark:bg-brand-black-light p-6 md:p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Marriage Readiness Quiz</h1>
            
            {!showResults ? (
              <>
                <p className="mb-8 text-center text-muted-foreground">
                  Answer the following questions honestly to assess your readiness for marriage according to Islamic principles.
                </p>
                
                <div className="mb-8">
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Category {currentCategory + 1} of {categories.length}</span>
                    <span>{Math.round(((currentCategory + 1) / categories.length) * 100)}% Complete</span>
                  </div>
                  <Progress value={((currentCategory + 1) / categories.length) * 100} className="h-2" />
                </div>

                <Accordion
                  type="single"
                  collapsible
                  value={expandedCategories[0]}
                  onValueChange={(value) => setExpandedCategories([value])}
                >
                  {categories.map((category, index) => (
                    <AccordionItem 
                      key={category.id} 
                      value={category.id}
                      disabled={index !== currentCategory}
                      className={index !== currentCategory ? "opacity-50" : ""}
                    >
                      <AccordionTrigger className="text-xl font-medium">
                        {category.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          {category.questions.map((question) => (
                            <div key={question.id} className="p-4 border rounded-lg">
                              <p className="font-medium mb-4">{question.question}</p>
                              <RadioGroup
                                value={answers[question.id]}
                                onValueChange={(value) =>
                                  handleAnswerChange(question.id, value)
                                }
                              >
                                <div className="space-y-3">
                                  {question.options.map((option) => (
                                    <div key={option.value} className="flex items-center">
                                      <RadioGroupItem
                                        value={option.value}
                                        id={`${question.id}-${option.value}`}
                                      />
                                      <Label
                                        htmlFor={`${question.id}-${option.value}`}
                                        className="ml-2"
                                      >
                                        {option.label}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentCategory === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    {currentCategory < categories.length - 1 ? "Next" : "See Results"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Your Marriage Readiness Results</h2>
                
                <div className="mb-8">
                  <div className="flex justify-center items-center mb-4">
                    <div className="relative w-48 h-48">
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl font-bold">{getScorePercentage()}%</span>
                      </div>
                      <svg className="absolute top-0 left-0" width="192" height="192" viewBox="0 0 192 192">
                        <circle
                          cx="96"
                          cy="96"
                          r="92"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="8"
                          strokeDasharray={`${getScorePercentage() * 5.8} 1000`}
                          transform="rotate(-90, 96, 96)"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-green mb-2">{getResultMessage().title}</h3>
                  <p className="mb-6">{getResultMessage().message}</p>
                  
                  <div className="p-6 bg-gray-50 dark:bg-brand-black rounded-lg mb-8">
                    <h4 className="font-semibold mb-4">Areas to focus on:</h4>
                    <ul className="space-y-2 text-left">
                      {getScorePercentage() < 80 && (
                        categories.map(category => {
                          // Calculate category score
                          let categoryScore = 0;
                          let categoryMaxScore = 0;
                          
                          category.questions.forEach(question => {
                            const answer = answers[question.id];
                            if (answer) {
                              const option = question.options.find(o => o.value === answer);
                              if (option) {
                                categoryScore += option.score;
                              }
                            }
                            
                            const maxScore = Math.max(...question.options.map(o => o.score));
                            categoryMaxScore += maxScore;
                          });
                          
                          const categoryPercentage = Math.round((categoryScore / categoryMaxScore) * 100);
                          
                          // Only show categories with scores less than 80%
                          if (categoryPercentage < 80) {
                            return (
                              <li key={category.id} className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                                <span>{category.title} ({categoryPercentage}%)</span>
                              </li>
                            );
                          }
                          
                          return null;
                        })
                      )}
                      
                      {getScorePercentage() >= 80 && (
                        <li className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                          <span>MashaAllah, you're doing well in all areas! Continue to grow in your faith.</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="space-x-4">
                  <Button onClick={() => {
                    setAnswers({});
                    setCurrentCategory(0);
                    setShowResults(false);
                    setExpandedCategories([categories[0].id]);
                  }} variant="outline">
                    Retake Quiz
                  </Button>
                  <Button asChild>
                    <a href="/compatibility">Try Compatibility Test</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarriageReadiness;
