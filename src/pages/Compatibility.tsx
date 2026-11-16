import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Copy, HeartHandshake, RotateCcw, Shuffle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CompatibilityGraph from "@/components/CompatibilityGraph";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResultsActions from "@/components/ResultsActions";
import PageShell from "@/components/PageShell";
import { useSeo } from "@/hooks/useSeo";
import Stepper from "@/components/Stepper";
import ScoreRing from "@/components/ScoreRing";
import QuestionCard from "@/components/QuestionCard";
import { compatibilityQuestions, femaleReligiousValues, maleReligiousValues } from "@/data/compatibility";
import { celebrate } from "@/lib/celebrate";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const steps = [
  { id: "your-info", label: "Your Info", emoji: "🙋" },
  { id: "suitor-info", label: "Suitor's Info", emoji: "💌" },
  { id: "compatibility", label: "Compatibility", emoji: "⚖️" },
];

const commitmentLevels = [
  { value: "practicing", label: "Practicing (Prays 5 times, follows Islamic finance, modesty, etc.)" },
  { value: "moderate", label: "Moderately Practicing (Observes basics but flexible on some aspects)" },
  { value: "non-practicing", label: "Non-Practicing (Identifies as Muslim but does not follow many obligations)" },
];

const checklistItems = [
  "Meet the wali (guardian) if applicable",
  "Perform Istikhara (prayer for guidance)",
  "Discuss financial expectations (mahr, living expenses, work-life balance)",
  "Align on family planning (number of children, education, etc.)",
  "Decide on living arrangements (relocation, in-laws, independence)",
  "Clarify boundaries on gender interactions and social settings",
  "Discuss goals for Islamic growth together",
];

const breakupMessages = [
  "I really appreciate the time we've spent getting to know each other. After careful thought, prayer, and consideration, I don't think we are fully aligned in terms of our values and future goals. I wish you the best in finding someone who is a great match for you, In Sha Allah.",
  "Thank you for our discussions and for sharing your perspective. I have reflected on our compatibility and, after seeking guidance through Istikhara, I believe it's best for us to part ways. May Allah grant us both what is best and lead us to spouses who will help us grow closer to Him.",
  "It has been great learning about you, and I sincerely appreciate the time we've spent getting to know each other. However, I feel we may have some fundamental differences that could impact our future together. I pray Allah grants us both spouses who align with our paths and strengthen our deen.",
];

function valuesFor(gender: string) {
  if (gender === "male") return maleReligiousValues;
  if (gender === "female") return femaleReligiousValues;
  return [...maleReligiousValues, ...femaleReligiousValues].filter(
    (value, index, self) => index === self.findIndex((v) => v.id === value.id)
  );
}

interface ValuesPickerProps {
  idPrefix: string;
  gender: string;
  selected: string[];
  onToggle: (id: string, checked: boolean) => void;
  emptyText: string;
}

/** Religious values as toggleable chips (checkboxes under the hood) */
function ValuesPicker({ idPrefix, gender, selected, onToggle, emptyText }: ValuesPickerProps) {
  if (!gender) {
    return <p className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">{emptyText}</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {valuesFor(gender).map((value) => {
        const id = `${idPrefix}-value-${value.id}`;
        const on = selected.includes(value.id);
        return (
          <label
            key={value.id}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-all duration-200",
              "hover:-translate-y-0.5 hover:border-primary/50",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
              on ? "border-primary bg-primary text-primary-foreground shadow-md" : "bg-card"
            )}
          >
            <Checkbox
              id={id}
              checked={on}
              onCheckedChange={(c) => onToggle(value.id, c === true)}
              className="sr-only"
            />
            <span aria-hidden="true">{on ? "✓" : "+"}</span>
            {value.label}
          </label>
        );
      })}
    </div>
  );
}

const Compatibility = () => {
  useSeo();
  const [activeTab, setActiveTab] = useState("your-info");
  const [yourInfo, setYourInfo] = useState({
    name: "",
    age: "",
    gender: "",
    religiousCommitment: "",
    religiousValues: [] as string[],
  });
  const [suitorInfo, setSuitorInfo] = useState({
    name: "",
    age: "",
    gender: "",
    religiousCommitment: "",
    religiousValues: [] as string[],
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([compatibilityQuestions[0].category]);
  const [breakupIndex, setBreakupIndex] = useState(() => Math.floor(Math.random() * breakupMessages.length));
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [lowScoreAreas, setLowScoreAreas] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

  const handleYourInfoChange = (field: string, value: string) => {
    setYourInfo((prev) => ({ ...prev, [field]: value }));
    
    // Reset religious values and set suitor gender when your gender changes
    if (field === "gender") {
      setYourInfo((prev) => ({ ...prev, religiousValues: [] }));
      if (value === "male") {
        setSuitorInfo((prev) => ({ ...prev, gender: "female", religiousValues: [] }));
      } else if (value === "female") {
        setSuitorInfo((prev) => ({ ...prev, gender: "male", religiousValues: [] }));
      } else {
        setSuitorInfo((prev) => ({ ...prev, gender: "", religiousValues: [] }));
      }
    }
  };

  const handleSuitorInfoChange = (field: string, value: string) => {
    setSuitorInfo((prev) => ({ ...prev, [field]: value }));
    
    // Reset religious values when gender changes
    if (field === "gender") {
      setSuitorInfo((prev) => ({ ...prev, religiousValues: [] }));
    }
  };

  const handleYourReligiousValueChange = (id: string, checked: boolean) => {
    if (checked) {
      setYourInfo((prev) => ({
        ...prev,
        religiousValues: [...prev.religiousValues, id],
      }));
    } else {
      setYourInfo((prev) => ({
        ...prev,
        religiousValues: prev.religiousValues.filter((val) => val !== id),
      }));
    }
  };

  const handleSuitorReligiousValueChange = (id: string, checked: boolean) => {
    if (checked) {
      setSuitorInfo((prev) => ({
        ...prev,
        religiousValues: [...prev.religiousValues, id],
      }));
    } else {
      setSuitorInfo((prev) => ({
        ...prev,
        religiousValues: prev.religiousValues.filter((val) => val !== id),
      }));
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const validateYourInfo = () => {
    if (!yourInfo.name || !yourInfo.age || !yourInfo.gender || !yourInfo.religiousCommitment) {
      toast({
        title: "Please fill in all fields",
        description: "All basic information fields are required.",
        variant: "destructive",
      });
      return false;
    }
    
    if (yourInfo.religiousValues.length === 0) {
      toast({
        title: "Please select at least one religious value",
        description: "Select the religious values that are important to you.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const validateSuitorInfo = () => {
    if (!suitorInfo.name || !suitorInfo.age || !suitorInfo.gender || !suitorInfo.religiousCommitment) {
      toast({
        title: "Please fill in all fields",
        description: "All basic information fields for your suitor are required.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const validateCompatibilityAnswers = () => {
    for (const category of compatibilityQuestions) {
      const hasAnswer = category.questions.some(
        (question) => answers[question.id] !== undefined
      );
      
      if (!hasAnswer) {
        toast({
          title: "Please answer at least one question per category",
          description: `Please answer at least one question from the "${category.category}" category.`,
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };

  const handleNextTab = () => {
    if (activeTab === "your-info") {
      if (validateYourInfo()) {
        setActiveTab("suitor-info");
      }
    } else if (activeTab === "suitor-info") {
      if (validateSuitorInfo()) {
        setActiveTab("compatibility");
      }
    } else if (activeTab === "compatibility") {
      if (validateCompatibilityAnswers()) {
        const tips: Record<string, string[]> = {};
        
        const sharedValues = yourInfo.religiousValues.filter((value) =>
          suitorInfo.religiousValues.includes(value)
        );
        
        const religiousValueScore = (sharedValues.length / yourInfo.religiousValues.length) * 100;
        
        if (religiousValueScore < 60) {
          tips["Religious Values"] = [
            "Discuss your non-negotiable values clearly before proceeding further",
            "Consider which values you might be flexible on and which ones are absolute must-haves",
            "Ask about the reasoning behind their values to better understand their perspective"
          ];
        }
        
        if (yourInfo.religiousCommitment !== suitorInfo.religiousCommitment) {
          tips["Religious Commitment"] = [
            "Discuss expectations regarding religious growth in marriage",
            "Consider how differences in practice might affect daily life together",
            "Talk about how you would handle religious teaching for children"
          ];
        }
        
        compatibilityQuestions.forEach((category) => {
          let categoryScore = 0;
          let categoryMaxScore = 0;
          let answeredQuestions = 0;
          const categoryTips: string[] = [];
          
          category.questions.forEach((question) => {
            const answer = answers[question.id];
            if (answer) {
              answeredQuestions++;
              const option = question.options.find((o) => o.value === answer);
              
              if (option) {
                categoryScore += option.score;
                if (question.id !== "personality-type" && option.score < 5) {
                  switch (question.id) {
                    case "daily-prayers":
                      categoryTips.push("Consider how differences in prayer habits might affect your daily routine together");
                      break;
                    case "avoid-riba":
                      categoryTips.push("Discuss financial principles and how you'll handle major purchases in an Islamically-compliant way");
                      break;
                    case "relocate":
                      categoryTips.push("Have an honest conversation about where you both see yourselves living long-term");
                      break;
                    case "financial-management":
                      categoryTips.push("Consider creating a financial plan together to align your approaches to money");
                      break;
                    case "conflict-resolution":
                      categoryTips.push("Discuss and practice healthy conflict resolution techniques together");
                      break;
                    default:
                      if (category.category === "Core Religious Practice") {
                        categoryTips.push("Discuss expectations for religious practices in your household");
                      } else if (category.category === "Long-Term Compatibility") {
                        categoryTips.push("Have deeper conversations about your 5-10 year vision for life together");
                      }
                  }
                }
                
                const maxScore = Math.max(...question.options.map((o) => o.score));
                categoryMaxScore += maxScore;
              }
            }
          });
          
          if (answeredQuestions > 0) {
            const normScore = Math.round((categoryScore / categoryMaxScore) * 100);
            if (normScore < 70 && categoryTips.length > 0) {
              tips[category.category] = [...new Set(categoryTips)];
            }
          }
        });
        
        setLowScoreAreas(tips);
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePreviousTab = () => {
    if (activeTab === "suitor-info") {
      setActiveTab("your-info");
    } else if (activeTab === "compatibility") {
      setActiveTab("suitor-info");
    }
  };

  const calculateCompatibilityScore = () => {
    let totalScore = 0;
    let answeredQuestions = 0;
    
    const sharedValues = yourInfo.religiousValues.filter((value) =>
      suitorInfo.religiousValues.includes(value)
    );
    
    const valueScore = (sharedValues.length / yourInfo.religiousValues.length) * 40;
    
    let commitmentScore = 0;
    if (yourInfo.religiousCommitment === suitorInfo.religiousCommitment) {
      commitmentScore = 20;
    } else if (
      (yourInfo.religiousCommitment === "practicing" && suitorInfo.religiousCommitment === "moderate") ||
      (yourInfo.religiousCommitment === "moderate" && suitorInfo.religiousCommitment === "practicing")
    ) {
      commitmentScore = 10;
    }
    
    let questionsScore = 0;
    let questionsMaxScore = 0;
    
    compatibilityQuestions.forEach((category) => {
      category.questions.forEach((question) => {
        const answer = answers[question.id];
        if (answer) {
          answeredQuestions++;
          const option = question.options.find((o) => o.value === answer);
          if (option) {
            questionsScore += option.score;
            
            const maxScore = question.id.includes("personality") || 
                            question.id === "weekend-preference" ||
                            question.id === "polygamy" ||
                            question.id === "children"
              ? option.score 
              : Math.max(...question.options.map((o) => o.score));
              
            questionsMaxScore += maxScore;
          }
        }
      });
    });
    
    const normalizedQuestionsScore = answeredQuestions > 0
      ? (questionsScore / questionsMaxScore) * 40
      : 0;
    
    totalScore = valueScore + commitmentScore + normalizedQuestionsScore;
    
    return Math.round(totalScore);
  };

  const getResultMessage = () => {
    const score = calculateCompatibilityScore();
    
    if (score >= 80) {
      return {
        title: "MashaAllah! You two are a great match.",
        message: "Your compatibility is excellent. You share strong religious values and your outlook on life lines up well. Keep making dua for barakah, and remember that even the best matches need care, patience and good communication every day.",
      };
    } else if (score >= 60) {
      return {
        title: "Real potential here, with a few things to talk through.",
        message: "You have a promising foundation, alhamdulillah. There are some differences, but nothing that open and honest conversation can't handle. Talk through the areas below with patience, pray Istikhara (prayer for guidance), and move forward with clarity.",
      };
    } else if (score >= 40) {
      return {
        title: "Proceed with care. Some big differences showed up.",
        message: "There are significant differences in key areas that could lead to challenges later. A good marriage is still possible, but it would take real compromise and understanding from both of you. Discuss the areas below honestly and pray Istikhara before going further.",
      };
    } else {
      return {
        title: "Lots of red flags. This match needs a serious rethink.",
        message: "Your answers point to major differences in values and expectations. Allah can bring any two hearts together, but a marriage built on deep mismatch is hard work. Seek advice from family and people you trust, pray Istikhara, and don't be afraid to walk away kindly.",
      };
    }
  };

  const getShareText = () => {
    const score = calculateCompatibilityScore();
    return `I just completed the Compatibility Match Tool on MyAroos and scored ${score}% with ${suitorInfo.name}! ${getResultMessage().title} Try your own compatibility test at ${SITE_URL}`;
  };

  const getCategoryScores = () => {
    const scores = {
      "Religious Values": 0,
      "Religious Commitment": 0,
      "Core Religious Practice": 0,
      "Personality & Lifestyle": 0,
      "Long-Term Compatibility": 0,
      "Cultural & Educational Compatibility": 0,
    };
    
    const sharedValues = yourInfo.religiousValues.filter((value) =>
      suitorInfo.religiousValues.includes(value)
    );
    scores["Religious Values"] = Math.round((sharedValues.length / yourInfo.religiousValues.length) * 100);
    
    if (yourInfo.religiousCommitment === suitorInfo.religiousCommitment) {
      scores["Religious Commitment"] = 100;
    } else if (
      (yourInfo.religiousCommitment === "practicing" && suitorInfo.religiousCommitment === "moderate") ||
      (yourInfo.religiousCommitment === "moderate" && suitorInfo.religiousCommitment === "practicing")
    ) {
      scores["Religious Commitment"] = 50;
    } else {
      scores["Religious Commitment"] = 25;
    }
    
    compatibilityQuestions.forEach((category) => {
      let categoryScore = 0;
      let categoryMaxScore = 0;
      let answeredQuestions = 0;
      
      category.questions.forEach((question) => {
        const answer = answers[question.id];
        if (answer) {
          answeredQuestions++;
          const option = question.options.find((o) => o.value === answer);
          if (option) {
            categoryScore += option.score;
            const maxScore = Math.max(...question.options.map((o) => o.score));
            categoryMaxScore += maxScore;
          }
        }
      });
      
      scores[category.category] = answeredQuestions > 0
        ? Math.round((categoryScore / categoryMaxScore) * 100)
        : 0;
    });
    
    return scores;
  };

  useEffect(() => {
    if (showResults && calculateCompatibilityScore() >= 60) celebrate("big");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults]);

  const stepIndex = steps.findIndex((st) => st.id === activeTab);

  const goToStep = (index: number) => {
    setActiveTab(steps[index].id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPersonFields = (who: "your" | "suitor") => {
    const info = who === "your" ? yourInfo : suitorInfo;
    const onChange = who === "your" ? handleYourInfoChange : handleSuitorInfoChange;
    const label = who === "your" ? "Your" : "Suitor's";
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${who}-name`}>{label} Name/Nickname</Label>
          <Input
            id={`${who}-name`}
            value={info.name}
            placeholder={who === "your" ? "e.g. Aisha" : "e.g. Yusuf"}
            className="h-12 rounded-xl"
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${who}-age`}>{label} Age</Label>
          <Input
            id={`${who}-age`}
            type="number"
            value={info.age}
            placeholder="e.g. 27"
            className="h-12 rounded-xl"
            onChange={(e) => onChange("age", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${who}-gender`}>{label} Gender</Label>
          <Select
            value={info.gender}
            onValueChange={(value) => onChange("gender", value)}
            disabled={who === "suitor" && (yourInfo.gender === "male" || yourInfo.gender === "female")}
          >
            <SelectTrigger id={`${who}-gender`} className="h-12 rounded-xl">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${who}-religious-commitment`}>Level of Religious Commitment</Label>
          <Select value={info.religiousCommitment} onValueChange={(value) => onChange("religiousCommitment", value)}>
            <SelectTrigger id={`${who}-religious-commitment`} className="h-12 rounded-xl text-left">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {commitmentLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const score = showResults ? calculateCompatibilityScore() : 0;
  const result = showResults ? getResultMessage() : null;
  const categoryScores: Record<string, number> = showResults ? getCategoryScores() : {};
  const doneCount = checklistItems.filter((_, i) => checked[i]).length;

  const restart = () => {
    setShowResults(false);
    setActiveTab("your-info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageShell>
      <section className="container-custom py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> 3 quick steps · fully private
            </span>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
              Compatibility <span className="italic text-primary">Match</span> Tool
            </h1>
          </div>

          {!showResults ? (
            <div className="surface p-5 md:p-8">
              <Stepper steps={steps} current={stepIndex} onSelect={goToStep} />

              <div key={activeTab} className="mt-10 animate-rise">
                {activeTab === "your-info" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-semibold">Tell us about you 🙋</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Just a nickname is fine. Nothing leaves your device.</p>
                    </div>
                    {renderPersonFields("your")}
                    <div>
                      <Label className="mb-3 block">Indicate Religious Values (Select at least one)</Label>
                      <ValuesPicker
                        idPrefix="your"
                        gender={yourInfo.gender}
                        selected={yourInfo.religiousValues}
                        onToggle={handleYourReligiousValueChange}
                        emptyText="Please select your gender to see relevant religious values."
                      />
                    </div>
                  </div>
                )}

                {activeTab === "suitor-info" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-semibold">Now, the suitor 💌</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Describe them as they are, not as you hope they are.</p>
                    </div>
                    {renderPersonFields("suitor")}
                    <div>
                      <Label className="mb-3 block">Select Shared Religious Values</Label>
                      <ValuesPicker
                        idPrefix="suitor"
                        gender={suitorInfo.gender}
                        selected={suitorInfo.religiousValues}
                        onToggle={handleSuitorReligiousValueChange}
                        emptyText="Please select your gender first to see suitor's relevant religious values."
                      />
                    </div>
                  </div>
                )}

                {activeTab === "compatibility" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-semibold">The vibe check ⚖️</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Answer the following questions about your potential suitor. You only need to answer questions you
                        know the answers to.
                      </p>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      value={expandedCategories[0]}
                      onValueChange={(value) => setExpandedCategories([value])}
                      className="space-y-3"
                    >
                      {compatibilityQuestions.map((category) => {
                        const answered = category.questions.filter((q) => answers[q.id] !== undefined).length;
                        return (
                          <AccordionItem
                            key={category.category}
                            value={category.category}
                            className="overflow-hidden rounded-2xl border bg-background/50 px-4"
                          >
                            <AccordionTrigger className="text-left hover:no-underline">
                              <span className="flex flex-1 items-center gap-3">
                                <span className="text-2xl" aria-hidden="true">
                                  {category.emoji}
                                </span>
                                <span className="font-display text-lg font-semibold">{category.category}</span>
                                <span
                                  className={cn(
                                    "ml-auto mr-3 rounded-full px-2.5 py-0.5 text-xs font-bold",
                                    answered > 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                                  )}
                                >
                                  {answered}/{category.questions.length}
                                </span>
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 pb-2 pt-2">
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
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
                <Button
                  onClick={handlePreviousTab}
                  disabled={activeTab === "your-info"}
                  variant="ghost"
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNextTab} size="lg" className="rounded-full px-7">
                  {activeTab === "compatibility" ? "See Results" : "Next"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            result && (
              <div id="results-container" className="space-y-6 animate-rise">
                <div className="surface p-6 text-center md:p-10">
                  <p className="eyebrow mb-4">Your Compatibility Results</p>
                  <p className="mb-6 font-display text-2xl font-semibold">
                    {yourInfo.name} <span className="text-rose">♥</span> {suitorInfo.name}
                  </p>
                  <ScoreRing score={score} />
                  <h2 className="mx-auto mt-6 max-w-xl text-2xl font-semibold leading-snug text-primary md:text-3xl">
                    {result.title}
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">{result.message}</p>

                  <div className="mt-8">
                    <ResultsActions
                      shareText={getShareText()}
                      report={{
                        heading: "Compatibility Report",
                        subheading: `${yourInfo.name} & ${suitorInfo.name}`,
                        score,
                        verdict: result.title,
                        message: result.message,
                        categories: Object.entries(categoryScores).map(([label, value]) => ({ label, score: value })),
                        tips: Object.entries(lowScoreAreas).map(([area, items]) => ({ area, items })),
                      }}
                    />
                  </div>
                </div>

                <div className="surface p-6 md:p-8">
                  <h3 className="mb-5 text-2xl font-semibold">Score breakdown</h3>
                  <CompatibilityGraph scores={categoryScores} />
                </div>

                {Object.keys(lowScoreAreas).length > 0 && (
                  <div className="surface p-6 md:p-8">
                    <h3 className="mb-4 text-2xl font-semibold">Areas to Consider</h3>
                    <Accordion type="multiple" className="w-full">
                      {Object.entries(lowScoreAreas).map(([area, tips]) => (
                        <AccordionItem key={area} value={area}>
                          <AccordionTrigger className="text-left font-semibold hover:no-underline">{area}</AccordionTrigger>
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
                      ))}
                    </Accordion>
                  </div>
                )}

                <div id="next-steps" className="surface p-6 md:p-8">
                  <h3 className="mb-1 text-2xl font-semibold">Next Steps</h3>
                  <p className="mb-6 text-sm text-muted-foreground">Whichever way you lean, do it with ihsan.</p>
                  <Tabs defaultValue="proceed">
                    <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5">
                      <TabsTrigger
                        value="proceed"
                        className="flex-col gap-0.5 rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <span className="font-semibold">Proceed with Relationship</span>
                        <span className="text-xs font-normal opacity-80">Marriage Checklist</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="end"
                        className="flex-col gap-0.5 rounded-xl py-3 data-[state=active]:bg-foreground data-[state=active]:text-background"
                      >
                        <span className="font-semibold">End Things Respectfully</span>
                        <span className="text-xs font-normal opacity-80">Breakup Message</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="proceed">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="flex items-center gap-2 font-display text-xl font-semibold">
                          <HeartHandshake className="h-5 w-5 text-primary" /> Islamic Marriage Checklist
                        </h4>
                        <span className="sticker rotate-2 text-xs">
                          {doneCount}/{checklistItems.length} done
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {checklistItems.map((item, i) => (
                          <li key={item}>
                            <label
                              htmlFor={`step${i + 1}`}
                              className={cn(
                                "flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-3 transition-colors",
                                checked[i] && "border-primary/40 bg-[hsl(var(--mint)/0.4)]"
                              )}
                            >
                              <Checkbox
                                id={`step${i + 1}`}
                                checked={!!checked[i]}
                                onCheckedChange={(c) => {
                                  const next = { ...checked, [i]: c === true };
                                  setChecked(next);
                                  if (checklistItems.every((_, j) => next[j])) celebrate("small");
                                }}
                                className="mt-0.5"
                              />
                              <span className={cn("text-sm leading-relaxed", checked[i] && "text-muted-foreground line-through")}>
                                {item}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    <TabsContent value="end">
                      <h4 className="mb-4 font-display text-xl font-semibold">Respectful Breakup Message</h4>
                      <blockquote className="relative rounded-2xl bg-muted p-6 pl-10 italic leading-relaxed">
                        <span className="absolute left-3 top-1 font-display text-5xl text-gold" aria-hidden="true">
                          “
                        </span>
                        {breakupMessages[breakupIndex]}
                      </blockquote>
                      <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <Button
                          variant="ghost"
                          className="rounded-full"
                          onClick={() => setBreakupIndex((i) => (i + 1) % breakupMessages.length)}
                        >
                          <Shuffle className="mr-2 h-4 w-4" /> Another one
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={() => {
                            navigator.clipboard.writeText(breakupMessages[breakupIndex]);
                            toast({
                              title: "Message Copied",
                              description: "The breakup message has been copied to your clipboard.",
                            });
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" /> Copy Message
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex justify-center pt-2">
                  <Button onClick={restart} variant="outline" size="lg" className="rounded-full">
                    <RotateCcw className="mr-2 h-4 w-4" /> Start New Compatibility Test
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default Compatibility;
