
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import ResultsActions from "@/components/ResultsActions";

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
          { value: "yes", label: "Yes, consistently on time", score: 10 },
          { value: "most-times", label: "Yes, but sometimes delayed", score: 8 },
          { value: "sometimes", label: "Sometimes (3-4 prayers daily)", score: 5 },
          { value: "rarely", label: "Rarely (1-2 prayers daily)", score: 2 },
          { value: "no", label: "No, not currently praying", score: 0 },
        ],
      },
      {
        id: "islamic-marriage-study",
        question: "Have you studied Islamic marriage rights & responsibilities?",
        options: [
          { value: "extensively", label: "Yes, extensively through courses/books", score: 10 },
          { value: "somewhat", label: "Yes, through occasional lectures/articles", score: 7 },
          { value: "occasionally", label: "Occasionally, basic knowledge only", score: 5 },
          { value: "minimal", label: "Very minimal knowledge", score: 2 },
          { value: "no", label: "No, not at all", score: 0 },
        ],
      },
      {
        id: "islamic-knowledge",
        question: "How often do you seek Islamic knowledge?",
        options: [
          { value: "daily", label: "Daily dedicated study time", score: 10 },
          { value: "weekly", label: "Weekly classes/study circles", score: 7 },
          { value: "occasionally", label: "Occasionally when I have time", score: 4 },
          { value: "rarely", label: "Rarely, only during Ramadan", score: 2 },
          { value: "not-at-all", label: "Not currently seeking knowledge", score: 0 },
        ],
      },
      {
        id: "religious-practice",
        question: "Are you comfortable leading/cooperating in religious household practices?",
        options: [
          { value: "very-comfortable", label: "Very comfortable and knowledgeable", score: 10 },
          { value: "comfortable", label: "Comfortable with most aspects", score: 8 },
          { value: "needs-improvement", label: "Needs improvement in some areas", score: 5 },
          { value: "uncomfortable", label: "Uncomfortable but willing to learn", score: 3 },
          { value: "no", label: "Not comfortable at all", score: 0 },
        ],
      },
      {
        id: "quran-recitation",
        question: "How often do you recite and reflect on the Quran?",
        options: [
          { value: "daily", label: "Daily with reflection on meanings", score: 10 },
          { value: "few-times-week", label: "A few times per week", score: 7 },
          { value: "weekly", label: "Weekly, usually on Friday", score: 5 },
          { value: "rarely", label: "Rarely, only on special occasions", score: 2 },
          { value: "not-at-all", label: "Not currently reciting", score: 0 },
        ],
      },
      {
        id: "islamic-etiquettes",
        question: "How well do you practice Islamic etiquettes in daily life (eating, sleeping, etc.)?",
        options: [
          { value: "consistently", label: "Consistently follow Sunnah practices", score: 10 },
          { value: "most-times", label: "Most of the time", score: 7 },
          { value: "sometimes", label: "Sometimes, when I remember", score: 5 },
          { value: "rarely", label: "Rarely think about Islamic etiquettes", score: 2 },
          { value: "not-at-all", label: "Not currently practicing these", score: 0 },
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
          { value: "excellent", label: "Yes, with patience and proper Islamic etiquette", score: 10 },
          { value: "good", label: "Yes, though I sometimes get frustrated", score: 7 },
          { value: "working-on-it", label: "Working on it, improving gradually", score: 5 },
          { value: "difficult", label: "Find it difficult to remain calm", score: 2 },
          { value: "no", label: "No, I struggle with controlling emotions", score: 0 },
        ],
      },
      {
        id: "handle-stress",
        question: "How do you handle stress and difficult conversations?",
        options: [
          { value: "very-calmly", label: "Very calmly with dua and reflection", score: 10 },
          { value: "calmly", label: "Calmly most of the time", score: 8 },
          { value: "varies", label: "It varies depending on the situation", score: 5 },
          { value: "with-difficulty", label: "With difficulty, often get overwhelmed", score: 3 },
          { value: "avoid-it", label: "I avoid difficult conversations", score: 0 },
        ],
      },
      {
        id: "patience",
        question: "Are you patient and understanding when things don't go your way?",
        options: [
          { value: "always", label: "Always, with complete trust in Allah's plan", score: 10 },
          { value: "most-times", label: "Most of the time", score: 7 },
          { value: "sometimes", label: "Sometimes, depending on the situation", score: 5 },
          { value: "rarely", label: "Rarely, I usually get upset", score: 2 },
          { value: "no", label: "No, I struggle with this consistently", score: 0 },
        ],
      },
      {
        id: "emotional-independence",
        question: "How emotionally independent are you from your parents/family?",
        options: [
          { value: "very", label: "Very independent while maintaining good relations", score: 10 },
          { value: "moderately", label: "Moderately independent", score: 7 },
          { value: "somewhat", label: "Somewhat dependent for emotional support", score: 5 },
          { value: "very-dependent", label: "Very dependent on family for decisions", score: 2 },
          { value: "completely-dependent", label: "Completely dependent on family", score: 0 },
        ],
      },
      {
        id: "past-relationships",
        question: "Have you emotionally healed from past relationships or rejections?",
        options: [
          { value: "completely", label: "Completely healed and moved forward", score: 10 },
          { value: "mostly", label: "Mostly healed, occasional thoughts", score: 7 },
          { value: "in-process", label: "In the process of healing", score: 5 },
          { value: "struggling", label: "Still struggling with past experiences", score: 2 },
          { value: "not-started", label: "Haven't started the healing process", score: 0 },
        ],
      },
      {
        id: "expectations",
        question: "Do you have realistic expectations about marriage and your future spouse?",
        options: [
          { value: "very-realistic", label: "Very realistic and well-researched", score: 10 },
          { value: "mostly-realistic", label: "Mostly realistic with some idealism", score: 7 },
          { value: "somewhat-realistic", label: "Somewhat realistic, some Hollywood influence", score: 5 },
          { value: "unrealistic", label: "Quite unrealistic expectations", score: 2 },
          { value: "fairy-tale", label: "Completely fairy-tale expectations", score: 0 },
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
          { value: "very-stable", label: "Yes, very stable with savings", score: 10 },
          { value: "stable", label: "Yes, stable but limited savings", score: 8 },
          { value: "somewhat-stable", label: "Somewhat stable, paycheck to paycheck", score: 5 },
          { value: "working-on-it", label: "Working on it, currently unstable", score: 3 },
          { value: "no", label: "No income currently", score: 0 },
        ],
      },
      {
        id: "financial-goals",
        question: "Do you have financial goals for marriage?",
        options: [
          { value: "detailed-plan", label: "Yes, with detailed plans and timelines", score: 10 },
          { value: "general-goals", label: "Yes, general goals without specific plans", score: 7 },
          { value: "somewhat", label: "Somewhat, haven't thought deeply about it", score: 5 },
          { value: "vague", label: "Very vague ideas about finances", score: 3 },
          { value: "no", label: "No financial planning for marriage", score: 0 },
        ],
      },
      {
        id: "budget",
        question: "Can you budget effectively and avoid debt?",
        options: [
          { value: "excellent", label: "Yes, excellent at budgeting and debt-free", score: 10 },
          { value: "good", label: "Good at budgeting with minimal debt", score: 8 },
          { value: "average", label: "Average, occasional budgeting issues", score: 5 },
          { value: "trying-to-improve", label: "Trying to improve, significant debt", score: 3 },
          { value: "no", label: "No budgeting skills, serious debt issues", score: 0 },
        ],
      },
      {
        id: "islamic-finance",
        question: "Do you follow Islamic principles in financial matters (avoiding riba/interest)?",
        options: [
          { value: "strictly", label: "Yes, strictly avoid all interest-based transactions", score: 10 },
          { value: "mostly", label: "Mostly, with few exceptions when necessary", score: 7 },
          { value: "trying", label: "Trying, but have some interest-based loans/cards", score: 4 },
          { value: "minimal", label: "Minimal consideration of Islamic finance", score: 2 },
          { value: "no", label: "No consideration of Islamic finance principles", score: 0 },
        ],
      },
      {
        id: "mahr-preparation",
        question: "Are you financially prepared to give/receive mahr (dowry)?",
        options: [
          { value: "fully-prepared", label: "Fully prepared with savings set aside", score: 10 },
          { value: "mostly-prepared", label: "Mostly prepared, need some time", score: 7 },
          { value: "somewhat-prepared", label: "Somewhat prepared, actively saving", score: 5 },
          { value: "barely-prepared", label: "Barely prepared, minimal savings", score: 3 },
          { value: "not-prepared", label: "Not prepared at all", score: 0 },
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
          { value: "detailed-discussions", label: "Yes, detailed discussions with clear understanding", score: 10 },
          { value: "general-discussions", label: "Yes, general discussions", score: 7 },
          { value: "mentioned", label: "Briefly mentioned but no deep discussions", score: 5 },
          { value: "planning-to-soon", label: "Planning to discuss soon", score: 3 },
          { value: "no", label: "No discussions at all", score: 0 },
        ],
      },
      {
        id: "cultural-dynamics",
        question: "Are you open to different cultural family dynamics?",
        options: [
          { value: "very-open", label: "Very open and appreciative of diversity", score: 10 },
          { value: "open", label: "Open to most cultural differences", score: 8 },
          { value: "somewhat-open", label: "Somewhat open, with some preferences", score: 6 },
          { value: "depends", label: "Depends on the specific culture", score: 4 },
          { value: "no", label: "Not open to different cultural practices", score: 0 },
        ],
      },
      {
        id: "in-law-relationships",
        question: "Are you prepared for in-law relationships?",
        options: [
          { value: "well-prepared", label: "Yes, well-prepared with realistic expectations", score: 10 },
          { value: "prepared", label: "Yes, generally prepared", score: 7 },
          { value: "somewhat-prepared", label: "Somewhat prepared, some concerns", score: 5 },
          { value: "havent-thought", label: "I haven't thought about it much", score: 3 },
          { value: "no", label: "No, anxious about in-law relationships", score: 0 },
        ],
      },
      {
        id: "work-life-balance",
        question: "Do you have healthy work-life balance skills?",
        options: [
          { value: "excellent", label: "Excellent balance prioritizing family", score: 10 },
          { value: "good", label: "Good balance most of the time", score: 7 },
          { value: "moderate", label: "Moderate balance, sometimes overwork", score: 5 },
          { value: "poor", label: "Poor balance, often overwhelmed", score: 3 },
          { value: "no-balance", label: "No balance, work dominates everything", score: 0 },
        ],
      },
      {
        id: "household-skills",
        question: "Do you have basic household management skills (cooking, cleaning, maintenance)?",
        options: [
          { value: "excellent", label: "Excellent at multiple household skills", score: 10 },
          { value: "good", label: "Good at most household tasks", score: 7 },
          { value: "moderate", label: "Moderate skills in some areas", score: 5 },
          { value: "minimal", label: "Minimal skills but willing to learn", score: 3 },
          { value: "none", label: "No household skills currently", score: 0 },
        ],
      },
      {
        id: "friendships",
        question: "Do you maintain good, halal friendships that would support your marriage?",
        options: [
          { value: "strong-supportive", label: "Strong, supportive friends who encourage good", score: 10 },
          { value: "good-friends", label: "Good friends with positive influence", score: 7 },
          { value: "mixed", label: "Mixed friendships, some positive, some negative", score: 5 },
          { value: "few-friends", label: "Few friends, mostly acquaintances", score: 3 },
          { value: "no-friends", label: "No friends or negative influences only", score: 0 },
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
  const [improvementTips, setImprovementTips] = useState<Record<string, string[]>>({});
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
      // Generate improvement tips based on answers
      const tips: Record<string, string[]> = {};
      
      categories.forEach(category => {
        const categoryTips: string[] = [];
        
        category.questions.forEach(question => {
          const answer = answers[question.id];
          if (answer) {
            const option = question.options.find(o => o.value === answer);
            if (option && option.score < 5) {
              switch (question.id) {
                case "pray-five-times":
                  categoryTips.push("Establish a daily prayer routine. Try using prayer apps with reminders and gradually build consistency.");
                  break;
                case "islamic-marriage-study":
                  categoryTips.push("Take a course on Islamic marriage. Many online platforms offer self-paced courses on marriage in Islam.");
                  break;
                case "islamic-knowledge":
                  categoryTips.push("Dedicate just 15 minutes daily to Islamic learning. Try following scholars on social media for daily reminders.");
                  break;
                case "handle-disagreements":
                  categoryTips.push("Practice active listening techniques. Take a short pause before responding when upset.");
                  break;
                case "stable-income":
                  categoryTips.push("Develop a skill that's in demand. Consider freelancing or part-time work to build financial stability.");
                  break;
                case "budget":
                  categoryTips.push("Try the 50/30/20 budgeting method: 50% needs, 30% wants, 20% savings. Use budgeting apps to track spending.");
                  break;
                case "islamic-finance":
                  categoryTips.push("Research halal investment and banking options. Consider consulting with an Islamic finance advisor.");
                  break;
                case "family-expectations":
                  categoryTips.push("Schedule a casual conversation with family about your future, gradually introducing marriage discussions.");
                  break;
                case "household-skills":
                  categoryTips.push("Learn one new recipe each week. YouTube has excellent tutorials for basic household skills.");
                  break;
                default:
                  if (category.id === "spiritual") {
                    categoryTips.push("Focus on developing a stronger connection with Allah through daily dhikr and extra prayers.");
                  } else if (category.id === "emotional") {
                    categoryTips.push("Practice mindfulness and emotional regulation techniques when facing challenges.");
                  } else if (category.id === "financial") {
                    categoryTips.push("Work on creating an emergency fund and developing better spending habits.");
                  } else if (category.id === "family-social") {
                    categoryTips.push("Practice effective communication and boundary-setting with family and friends.");
                  }
              }
            }
          }
        });
        
        if (categoryTips.length > 0) {
          tips[category.id] = [...new Set(categoryTips)]; // Remove duplicates
        }
      });
      
      setImprovementTips(tips);
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

  const getCategoryScore = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 0;
    
    let categoryScore = 0;
    let categoryMaxScore = 0;
    
    category.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find((o) => o.value === answer);
        if (option) {
          categoryScore += option.score;
        }
      }
      
      const maxScore = Math.max(...question.options.map((o) => o.score));
      categoryMaxScore += maxScore;
    });
    
    return Math.round((categoryScore / categoryMaxScore) * 100);
  };

  const getResultMessage = () => {
    const percentage = getScorePercentage();
    
    if (percentage >= 80) {
      return {
        title: "MashaAllah! You're more marriage-ready than a fresh batch of samosas!",
        message: "Your preparation for marriage is excellent! You've clearly put in the work spiritually, emotionally, financially, and socially. Make dua for a spouse who matches your level of readiness—they're in for a treat, in sha Allah!",
      };
    } else if (percentage >= 60) {
      return {
        title: "You're closer than Arafah is to Mina—almost there!",
        message: "You've made solid progress on your marriage preparation journey! With a few tweaks here and there, you'll be saying 'qabiltu' (I accept) before you know it. Focus on the areas you scored lower in, and in sha Allah, you'll be fully prepared when the right person comes along.",
      };
    } else if (percentage >= 40) {
      return {
        title: "Your marriage prep is like biryani without rice—essential ingredients missing!",
        message: "You've started the journey, but there's still considerable work to do. Don't rush into marriage before addressing the areas where you scored lower. Remember, a good marriage requires good preparation, just like you wouldn't serve uncooked biryani to guests!",
      };
    } else {
        return {
          title: "Uh-oh! Your marriage readiness is giving 'left socks in the washing machine' vibes.",
          message: "Let's be honest—you might need significant personal development before saying 'Qabiltu!' Marriage requires preparation, and rushing in unprepared is like trying to memorize Surah Baqarah the night before Ramadan. Focus on the specific improvement areas we've highlighted for you.",
        };
    }
  };

  const getShareText = () => {
    const percentage = getScorePercentage();
    return `I just completed the Marriage Readiness Quiz on MyAroos and scored ${percentage}%! ${getResultMessage().title} Check out your own readiness at MyAroos.com!`;
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
              <div className="text-center" id="results-container">
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
                  
                  {Object.keys(improvementTips).length > 0 && (
                    <div className="p-6 bg-gray-50 dark:bg-brand-black rounded-lg mb-8">
                      <h4 className="font-semibold mb-4">Areas to focus on:</h4>
                      
                      <Accordion type="multiple" className="w-full">
                        {Object.entries(improvementTips).map(([categoryId, tips]) => {
                          const category = categories.find(c => c.id === categoryId);
                          const categoryScore = getCategoryScore(categoryId);
                          
                          return (
                            <AccordionItem key={categoryId} value={categoryId}>
                              <AccordionTrigger className="text-left">
                                <span className="flex items-center">
                                  <span className="inline-block w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                                  <span>{category?.title} ({categoryScore}%)</span>
                                </span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                  {tips.map((tip, index) => (
                                    <li key={index} className="text-sm text-left">{tip}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                      
                      {getScorePercentage() >= 80 && (
                        <div className="mt-4">
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                            <span>MashaAllah, you're doing well in all areas! Continue to grow in your faith.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <ResultsActions 
                    title={getResultMessage().title}
                    subtitle={getResultMessage().message}
                    score={getScorePercentage()}
                    type="readiness"
                    shareText={getShareText()}
                  />
                </div>
                
                <div className="space-x-4 mt-8">
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
