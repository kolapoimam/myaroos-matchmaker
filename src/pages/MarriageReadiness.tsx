import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageShell from "@/components/PageShell";
import QuestionCard from "@/components/QuestionCard";
import Stepper from "@/components/Stepper";
import ScoreRing from "@/components/ScoreRing";
import CompatibilityGraph from "@/components/CompatibilityGraph";
import { useToast } from "@/hooks/use-toast";
import ResultsActions from "@/components/ResultsActions";
import { categories } from "@/data/readiness";
import { celebrate } from "@/lib/celebrate";

const stepNudges = [
  "Bismillah, let's start with the heart of it all.",
  "Feelings check. Be honest, nobody is watching.",
  "Money talk. Mahr does not pay itself.",
  "Last stop: family, friends and the in-laws.",
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
      celebrate("small");
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

  useEffect(() => {
    if (showResults && getScorePercentage() >= 60) celebrate("big");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults]);

  const category = categories[currentCategory];
  const answeredInCategory = category.questions.filter((q) => answers[q.id] !== undefined).length;
  const result = getResultMessage();
  const percentage = getScorePercentage();
  const categoryScores = Object.fromEntries(categories.map((c) => [c.title, getCategoryScore(c.id)]));

  const restart = () => {
    setAnswers({});
    setCurrentCategory(0);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageShell>
      <section className="container-custom py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> {categories.reduce((n, c) => n + c.questions.length, 0)} questions · about 5 minutes
            </span>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
              Marriage Readiness <span className="italic text-primary">Quiz</span>
            </h1>
          </div>

          {!showResults ? (
            <div className="surface p-5 md:p-8">
              <p className="mb-8 text-center text-muted-foreground">
                Answer the following questions honestly to assess your readiness for marriage according to Islamic
                principles.
              </p>

              <Stepper
                steps={categories.map((c) => ({ id: c.id, label: c.title.replace(" Readiness", ""), emoji: c.emoji }))}
                current={currentCategory}
                onSelect={(i) => {
                  setCurrentCategory(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              <div key={category.id} className="mt-10 animate-rise">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      Category {currentCategory + 1} of {categories.length}
                    </p>
                    <h2 className="mt-1 flex items-center gap-2 text-3xl font-semibold">
                      <span aria-hidden="true">{category.emoji}</span> {category.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{stepNudges[currentCategory]}</p>
                  </div>
                  <span className="sticker -rotate-2 text-xs">
                    {answeredInCategory}/{category.questions.length} answered
                  </span>
                </div>

                <div className="space-y-4">
                  {category.questions.map((question, i) => (
                    <QuestionCard
                      key={question.id}
                      number={i + 1}
                      question={question}
                      value={answers[question.id]}
                      onChange={(value) => handleAnswerChange(question.id, value)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
                <Button onClick={handlePrevious} disabled={currentCategory === 0} variant="ghost" className="rounded-full">
                  <ArrowLeft className="mr-1.5 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNext} size="lg" className="rounded-full px-7">
                  {currentCategory < categories.length - 1 ? "Next" : "See Results"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div id="results-container" className="space-y-6 animate-rise">
              <div className="surface p-6 text-center md:p-10">
                <p className="eyebrow mb-6">Your Marriage Readiness Results</p>
                <ScoreRing score={percentage} />
                <h2 className="mx-auto mt-6 max-w-xl text-2xl font-semibold leading-snug text-primary md:text-3xl">
                  {result.title}
                </h2>
                <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">{result.message}</p>

                <div className="mt-8">
                  <ResultsActions
                    shareText={getShareText()}
                    report={{
                      heading: "Marriage Readiness Report",
                      score: percentage,
                      verdict: result.title,
                      message: result.message,
                      categories: categories.map((c) => ({ label: c.title, score: getCategoryScore(c.id) })),
                      tips: Object.entries(improvementTips).map(([categoryId, tips]) => ({
                        area: categories.find((c) => c.id === categoryId)?.title ?? categoryId,
                        items: tips,
                      })),
                    }}
                  />
                </div>
              </div>

              <div className="surface p-6 md:p-8">
                <h3 className="mb-5 text-2xl font-semibold">Score breakdown</h3>
                <CompatibilityGraph scores={categoryScores} />
              </div>

              {Object.keys(improvementTips).length > 0 && (
                <div className="surface p-6 md:p-8">
                  <h3 className="mb-2 text-2xl font-semibold">Areas to focus on</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Small, steady steps. Tap a category to see tips.</p>

                  <Accordion type="multiple" className="w-full">
                    {Object.entries(improvementTips).map(([categoryId, tips]) => {
                      const cat = categories.find((c) => c.id === categoryId);
                      const categoryScore = getCategoryScore(categoryId);

                      return (
                        <AccordionItem key={categoryId} value={categoryId}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="flex items-center gap-2 font-semibold">
                              <span aria-hidden="true">{cat?.emoji}</span>
                              {cat?.title}
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold">{categoryScore}%</span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {tips.map((tip, index) => (
                                <li key={index} className="flex gap-2 text-sm leading-relaxed">
                                  <span className="text-gold">✦</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>

                  {percentage >= 80 && (
                    <p className="mt-4 text-sm font-medium text-primary">
                      MashaAllah, you're doing well in all areas! Continue to grow in your faith.
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                <Button onClick={restart} variant="outline" size="lg" className="rounded-full">
                  <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
                </Button>
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/compatibility">
                    Try Compatibility Test <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default MarriageReadiness;
