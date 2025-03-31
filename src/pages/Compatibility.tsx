import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CompatibilityGraph from "@/components/CompatibilityGraph";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResultsActions from "@/components/ResultsActions";

// Define the religious values
const maleReligiousValues = [
  { id: "beard", label: "Has a beard (Sunnah practice)" },
  { id: "prayers", label: "Prays 5 times daily" },
  { id: "islamic-finance", label: "Observes Islamic finance (avoids riba)" },
  { id: "polygamy", label: "Comfortable with polygamy" },
  { id: "islamic-banking", label: "Prefers Islamic banking" },
  { id: "wali", label: "Prefers a wali's involvement in the marriage process" },
  { id: "modesty", label: "Observes modesty in dress and social interactions" },
  { id: "relocate", label: "Willing to relocate for marriage" },
  { id: "madhab", label: "Follows a specific school of thought" },
  { id: "halal-food", label: "Eats only halal-certified food" },
  { id: "provider", label: "Plans to financially provide for the family" },
  { id: "homeschooling", label: "Open to homeschooling children with Islamic studies" },
  { id: "quran", label: "Reads Quran regularly" },
  { id: "islamic-knowledge", label: "Seeks Islamic knowledge actively" },
  { id: "cooking", label: "Has cooking skills" },
  { id: "children", label: "Wants children" },
  { id: "tahajjud", label: "Prays Tahajjud regularly" },
  { id: "fasting", label: "Observes voluntary fasts" },
  { id: "masjid", label: "Attends masjid regularly" },
];

const femaleReligiousValues = [
  { id: "hijab", label: "Wears Hijab" },
  { id: "niqab", label: "Wears Niqab" },
  { id: "prayers", label: "Prays 5 times daily" },
  { id: "polygamy", label: "Comfortable with polygamy" },
  { id: "homeschooling", label: "Open to homeschooling children with Islamic studies" },
  { id: "islamic-banking", label: "Prefers Islamic banking (avoids riba)" },
  { id: "modest-interactions", label: "Observes modest social interactions" },
  { id: "relocate", label: "Willing to relocate for marriage" },
  { id: "madhab", label: "Follows a specific school of thought" },
  { id: "halal-food", label: "Eats only halal-certified food" },
  { id: "in-laws", label: "Willing to live with in-laws if necessary" },
  { id: "long-distance", label: "Open to long-distance marriage initially" },
  { id: "arabic", label: "Speaks Arabic or is willing to learn" },
  { id: "quran", label: "Reads Quran regularly" },
  { id: "islamic-knowledge", label: "Seeks Islamic knowledge actively" },
  { id: "cooking", label: "Has cooking skills" },
  { id: "children", label: "Wants children" },
  { id: "tahajjud", label: "Prays Tahajjud regularly" },
  { id: "fasting", label: "Observes voluntary fasts" },
];

// Define compatibility questions
const compatibilityQuestions = [
  {
    category: "Core Religious Practice",
    questions: [
      {
        id: "daily-prayers",
        question: "Does this person pray five times daily?",
        options: [
          { value: "yes-on-time", label: "Yes, consistently on time", score: 10 },
          { value: "yes", label: "Yes, but sometimes delayed", score: 8 },
          { value: "sometimes", label: "Sometimes (3-4 prayers daily)", score: 5 },
          { value: "rarely", label: "Rarely (1-2 prayers daily)", score: 2 },
          { value: "no", label: "No, not currently praying", score: 0 },
        ],
      },
      {
        id: "ramadan-fasting",
        question: "Do they fast during Ramadan?",
        options: [
          { value: "all", label: "Yes, all days with enthusiasm", score: 10 },
          { value: "most", label: "Yes, most days", score: 8 },
          { value: "half", label: "About half the month", score: 5 },
          { value: "few", label: "Only a few days", score: 3 },
          { value: "no", label: "No, rarely or never", score: 0 },
        ],
      },
      {
        id: "avoid-riba",
        question: "Do they avoid riba (interest-based transactions)?",
        options: [
          { value: "strictly", label: "Strictly, including student loans and mortgages", score: 10 },
          { value: "mostly", label: "Mostly, with few exceptions when necessary", score: 7 },
          { value: "sometimes", label: "Sometimes, but has some interest-based loans", score: 5 },
          { value: "rarely", label: "Rarely thinks about it", score: 2 },
          { value: "not-concerned", label: "Not concerned about Islamic finance", score: 0 },
        ],
      },
      {
        id: "quran-reading",
        magiquequestion: "How often do they read or listen to Quran?",
        options: [
          { value: "daily", label: "Daily, with understanding", score: 10 },
          { value: "weekly", label: "Weekly, consistent schedule", score: 7 },
          { value: "occasionally", label: "Occasionally, especially during Ramadan", score: 5 },
          { value: "rarely", label: "Rarely, only on special occasions", score: 3 },
          { value: "never", label: "Never or almost never", score: 0 },
        ],
      },
      {
        id: "islamic-knowledge",
        question: "Do they actively seek Islamic knowledge?",
        options: [
          { value: "consistently", label: "Consistently through classes and self-study", score: 10 },
          { value: "regularly", label: "Regularly through online lectures", score: 7 },
          { value: "occasionally", label: "Occasionally when interested in a topic", score: 5 },
          { value: "rarely", label: "Rarely seeks knowledge", score: 2 },
          { value: "never", label: "Never actively seeks knowledge", score: 0 },
        ],
      },
      {
        id: "halal-lifestyle",
        question: "How strict are they about following a halal lifestyle (food, entertainment, etc.)?",
        options: [
          { value: "very-strict", label: "Very strict in all aspects", score: 10 },
          { value: "mostly-strict", label: "Mostly strict with occasional exceptions", score: 7 },
          { value: "moderately", label: "Moderately observant, flexible on some things", score: 5 },
          { value: "minimally", label: "Minimally observant, only basic requirements", score: 3 },
          { value: "not-observant", label: "Not particularly observant", score: 0 },
        ],
      },
    ],
  },
  {
    category: "Personality & Lifestyle",
    questions: [
      {
        id: "personality-type",
        question: "Are they introverted or extroverted?",
        options: [
          { value: "strongly-introvert", label: "Strongly introverted", score: 5 },
          { value: "introvert", label: "Somewhat introverted", score: 5 },
          { value: "ambivert", label: "Ambivert (balanced)", score: 5 },
          { value: "extrovert", label: "Somewhat extroverted", score: 5 },
          { value: "strongly-extrovert", label: "Strongly extroverted", score: 5 },
        ],
      },
      {
        id: "communication-style",
        question: "How would you describe their communication style?",
        options: [
          { value: "direct", label: "Direct and straightforward", score: 5 },
          { value: "diplomatic", label: "Diplomatic and tactful", score: 5 },
          { value: "reflective", label: "Reflective and thoughtful", score: 5 },
          { value: "emotional", label: "Emotional and expressive", score: 5 },
          { value: "avoidant", label: "Avoidant of difficult topics", score: 2 },
        ],
      },
      {
        id: "conflict-resolution",
        question: "How do they handle conflicts and disagreements?",
        options: [
          { value: "calm-discussion", label: "Through calm, solution-focused discussion", score: 10 },
          { value: "compromise", label: "Through compromise and understanding", score: 8 },
          { value: "time-out", label: "Taking a time-out, then revisiting", score: 7 },
          { value: "emotional", label: "Emotionally, occasionally heated", score: 3 },
          { value: "avoidance", label: "Avoiding conflict altogether", score: 1 },
        ],
      },
      {
        id: "family-career",
        question: "Do they prioritize family over career?",
        options: [
          { value: "family-first", label: "Family always comes first", score: 10 },
          { value: "mostly-family", label: "Mostly family, but career is important", score: 8 },
          { value: "balanced", label: "Balanced approach to both", score: 7 },
          { value: "mostly-career", label: "Career-focused with family time", score: 5 },
          { value: "career-first", label: "Career is the top priority", score: 3 },
        ],
      },
      {
        id: "weekend-preference",
        question: "How do they prefer to spend weekends?",
        options: [
          { value: "home", label: "Relaxing at home", score: 5 },
          { value: "family", label: "With family activities", score: 5 },
          { value: "outdoors", label: "Outdoor activities and adventures", score: 5 },
          { value: "socializing", label: "Socializing with friends", score: 5 },
          { value: "productive", label: "Being productive (work/study/projects)", score: 5 },
        ],
      },
      {
        id: "life-pace",
        question: "What pace of life do they prefer?",
        options: [
          { value: "slow", label: "Slow and relaxed, minimal commitments", score: 5 },
          { value: "moderate", label: "Moderate pace with planned activities", score: 5 },
          { value: "busy", label: "Busy and structured with many activities", score: 5 },
          { value: "dynamic", label: "Dynamic and spontaneous", score: 5 },
          { value: "hectic", label: "Fast-paced and hectic", score: 5 },
        ],
      },
      {
        id: "cleanliness",
        question: "How would you describe their cleanliness and organization habits?",
        options: [
          { value: "very-organized", label: "Very organized and clean", score: 5 },
          { value: "mostly-organized", label: "Mostly organized with occasional messiness", score: 5 },
          { value: "average", label: "Average cleanliness", score: 5 },
          { value: "somewhat-messy", label: "Somewhat messy but functional", score: 5 },
          { value: "very-messy", label: "Very messy and disorganized", score: 5 },
        ],
      },
    ],
  },
  {
    category: "Long-Term Compatibility",
    questions: [
      {
        id: "financial-management",
        question: "How do they approach financial management?",
        options: [
          { value: "very-responsible", label: "Very responsible, saves regularly", score: 10 },
          { value: "responsible", label: "Responsible with occasional splurges", score: 8 },
          { value: "balanced", label: "Balanced approach to saving and spending", score: 7 },
          { value: "impulsive", label: "Somewhat impulsive spending habits", score: 3 },
          { value: "irresponsible", label: "Struggles with financial management", score: 1 },
        ],
      },
      {
        id: "polygamy",
        question: "Are they open to polygamy?",
        options: [
          { value: "yes-actively", label: "Yes, actively considering it", score: 5 },
          { value: "yes", label: "Yes, if circumstances warrant it", score: 5 },
          { value: "maybe", label: "Maybe, under specific conditions", score: 5 },
          { value: "not-sure", label: "Not Sure", score: 5 },
          { value: "no", label: "No", score: 5 },
        ],
      },
      {
        id: "children",
        question: "Do they want children?",
        options: [
          { value: "yes-many", label: "Yes, many (4+)", score: 5 },
          { value: "yes-few", label: "Yes, a few (1-3)", score: 5 },
          { value: "undecided", label: "Undecided but open to it", score: 5 },
          { value: "prefer-not", label: "Prefer not to have children", score: 5 },
          { value: "no", label: "Definitely no children", score: 5 },
        ],
      },
      {
        id: "parenting-style",
        question: "What's their parenting style or preference?",
        options: [
          { value: "islamic-strict", label: "Islamic-focused with structure and discipline", score: 5 },
          { value: "islamic-balanced", label: "Islamic-focused with balanced approach", score: 5 },
          { value: "permissive", label: "Permissive but with Islamic values", score: 5 },
          { value: "western-influenced", label: "Modern/Western-influenced approach", score: 5 },
          { value: "not-thought-about", label: "Haven't thought much about it", score: 5 },
        ],
      },
      {
        id: "in-laws",
        question: "How do they feel about living with or near in-laws?",
        options: [
          { value: "very-comfortable", label: "Very comfortable living with in-laws", score: 5 },
          { value: "comfortable", label: "Comfortable living near in-laws", score: 5 },
          { value: "temporary", label: "Comfortable temporarily if needed", score: 5 },
          { value: "prefer-distance", label: "Prefers some distance from in-laws", score: 5 },
          { value: "uncomfortable", label: "Uncomfortable with close in-law relationships", score: 5 },
        ],
      },
      {
        id: "relocate",
        question: "Are they willing to relocate for marriage?",
        options: [
          { value: "yes-anywhere", label: "Yes, anywhere including internationally", score: 10 },
          { value: "yes-within-country", label: "Yes, within the same country", score: 8 },
          { value: "yes-nearby", label: "Yes, but only within nearby areas", score: 6 },
          { value: "maybe", label: "Maybe under specific circumstances", score: 5 },
          { value: "no", label: "No, not willing to relocate", score: 0 },
        ],
      },
      {
        id: "life-goals",
        question: "Do they have clear life goals and plans?",
        options: [
          { value: "very-clear", label: "Very clear goals with action plans", score: 10 },
          { value: "clear", label: "Clear goals but flexible plans", score: 8 },
          { value: "general", label: "General direction but no specific plans", score: 6 },
          { value: "figuring-out", label: "Still figuring things out", score: 4 },
          { value: "no-goals", label: "No clear goals or plans", score: 2 },
        ],
      },
    ],
  },
  {
    category: "Cultural & Educational Compatibility",
    questions: [
      {
        id: "cultural-background",
        question: "How important is their cultural background in daily life?",
        options: [
          { value: "very-important", label: "Very important, practices cultural traditions", score: 5 },
          { value: "somewhat-important", label: "Somewhat important, observes major customs", score: 5 },
          { value: "balanced", label: "Balanced between culture and Islamic practices", score: 5 },
          { value: "less-important", label: "Less important than Islamic identity", score: 5 },
          { value: "not-important", label: "Not important at all", score: 5 },
        ],
      },
      {
        id: "mixed-gender-settings",
        question: "How do they behave in mixed-gender settings?",
        options: [
          { value: "strict-segregation", label: "Prefers strict segregation", score: 5 },
          { value: "limited-interaction", label: "Limited, necessary interaction only", score: 5 },
          { value: "modest-interaction", label: "Modest interaction with boundaries", score: 5 },
          { value: "comfortable-boundaries", label: "Comfortable but maintains Islamic boundaries", score: 5 },
          { value: "very-comfortable", label: "Very comfortable with minimal boundaries", score: 5 },
        ],
      },
      {
        id: "education",
        question: "What is their level of education or value placed on education?",
        options: [
          { value: "highly-educated", label: "Highly educated and values continuous learning", score: 5 },
          { value: "college-education", label: "College educated and values knowledge", score: 5 },
          { value: "vocational", label: "Vocational/specialized training", score: 5 },
          { value: "high-school", label: "High school education", score: 5 },
          { value: "self-taught", label: "Self-taught/informal education", score: 5 },
        ],
      },
      {
        id: "language",
        question: "Do they speak or are willing to learn your native language?",
        options: [
          { value: "fluent", label: "Already fluent in my language", score: 5 },
          { value: "learning", label: "Currently learning my language", score: 5 },
          { value: "willing", label: "Willing to learn my language", score: 5 },
          { value: "not-sure", label: "Not sure if they're willing to learn", score: 5 },
          { value: "not-willing", label: "Not willing to learn my language", score: 5 },
        ],
      },
    ],
  },
];

const Compatibility = () => {
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
          let categoryTips: string[] = [];
          
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
        title: "MashaAllah! You two are like Medina dates—sweet and blessed!",
        message: "Your compatibility is exceptional. Like a perfect cup of Arabic coffee and fresh dates, you complement each other wonderfully. Your shared religious values provide a strong foundation, and your personalities seem to fit together like the pieces of a beautiful Islamic geometric pattern. Make dua for continued harmony, and remember that even the most compatible couples need to nurture their relationship daily.",
      };
    } else if (score >= 60) {
      return {
        title: "There's potential! Like biryani without raita—good but needs some adjustments.",
        message: "You have a promising foundation, alhamdulillah! Like a pot of biryani that's missing its raita—the fundamentals are excellent, but a few complementary elements would make it perfect. With open communication and patience, your minor differences could actually strengthen your relationship. Focus on the areas where you align well, and approach your differences with compassion and understanding. Perhaps perform Istikhara (prayer for guidance) as you consider moving forward.",
      };
    } else if (score >= 40) {
      return {
        title: "Major differences exist—like tea with salt instead of sugar!",
        message: "Your compatibility is like accidentally putting salt in your tea instead of sugar—the fundamental elements are there, but the experience might not be what you're hoping for! There are significant differences in key areas that could lead to challenges. This doesn't mean a relationship is impossible, but it would require substantial compromise and understanding from both sides. Consider whether you're prepared for the work this relationship might require, and definitely perform Istikhara before proceeding.",
      };
    } else {
      return {
        title: "Run. Like, really run. It's giving 'Pharaoh and Musa' vibes.",
        message: "Your compatibility score suggests this match has more red flags than a Moroccan souk! Like Pharaoh and Musa (AS), you seem to be headed in completely different directions. While Allah is capable of bringing together even the most unlikely hearts, this particular match might require more adjustments than renovating the Kaaba. Consider whether you're prepared to make fundamental compromises on your values and expectations—and then consider if that's really what Allah would want for you. Perhaps it's time to make dua for patience and look elsewhere.",
      };
    }
  };

  const getShareText = () => {
    const score = calculateCompatibilityScore();
    return `I just completed the Compatibility Match Tool on MyAroos and scored ${score}% with ${suitorInfo.name}! ${getResultMessage().title} Try your own compatibility test at MyAroos.com!`;
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

  const generateMarriageChecklist = () => {
    return (
      <div className="bg-gray-50 dark:bg-brand-black p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Islamic Marriage Checklist</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full border border-brand-green flex items-center justify-center mr-2 mt-0.5">
              <Checkbox id="step1" className="h-4 w-4" />
            </div>
            <Label htmlFor="step1" className="text-base">Meet the wali (guardian) if applicable</Label>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full border border-brand-green flex items-center justify-center mr-2 mt-0.5">
              <Checkbox id="step2" className="h-4 w-4" />
            </div>
            <Label htmlFor="step2" className="text-base">Perform Istikhara (prayer for guidance)</Label>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full border border-brand-green flex items-center justify-center mr-2 mt-0.5">
              <Checkbox id="step3" className="h-4 w-4" />
            </div>
            <Label htmlFor="step3" className="text-base">Discuss financial expectations (mahr, living expenses, work-life balance)</Label>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full border border-brand-green flex items-center justify-center mr-2 mt-0.5">
              <Checkbox id="step4" className="h-4 w-4" />
            </div>
            <Label htmlFor="step4" className="text-base">Align on family planning (number of children, education, etc.)</Label>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full border border-brand-green flex items-center justify-center mr-2 mt-0.5">
              <Checkbox id="step5" className="h-4 w-4" />
            </div>
            <Label htmlFor="step5" className="text-base">Decide on living arrangements (relocation, in-laws, independence)</Label>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full border border-brand-green flex items-center justify-center mr-2 mt-0.5">
              <Checkbox id="step6" className="h-4 w-4" />
            </div>
            <Label htmlFor="step6" className="text-base">Clarify boundaries on gender interactions and social settings</Label>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full border border-brand-green flex items-center justify-center mr-2 mt-0.5">
              <Checkbox id="step7" className="h-4 w-4" />
            </div>
            <Label htmlFor="step7" className="text-base">Discuss goals for Islamic growth together</Label>
          </li>
        </ul>
      </div>
    );
  };

  const generateBreakupMessage = () => {
    const messages = [
      "I really appreciate the time we've spent getting to know each other. After careful thought, prayer, and consideration, I don't think we are fully aligned in terms of our values and future goals. I wish you the best in finding someone who is a great match for you, In Sha Allah.",
      "Thank you for our discussions and for sharing your perspective. I have reflected on our compatibility and, after seeking guidance through Istikhara, I believe it's best for us to part ways. May Allah grant us both what is best and lead us to spouses who will help us grow closer to Him.",
      "It has been great learning about you, and I sincerely appreciate the time we've spent getting to know each other. However, I feel we may have some fundamental differences that could impact our future together. I pray Allah grants us both spouses who align with our paths and strengthen our deen."
    ];
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    
    return (
      <div className="bg-gray-50 dark:bg-brand-black p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Respectful Breakup Message</h3>
        <p className="italic">"{messages[randomIndex]}"</p>
        <div className="mt-4 text-right">
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(messages[randomIndex]);
            toast({
              title: "Message Copied",
              description: "The breakup message has been copied to your clipboard.",
            });
          }}>
            Copy Message
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col islamic-pattern">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white dark:bg-brand-black-light p-6 md:p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Compatibility Match Tool</h1>
            
            {!showResults ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="your-info">Your Information</TabsTrigger>
                  <TabsTrigger value="suitor-info">Suitor's Information</TabsTrigger>
                  <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                </TabsList>
                
                <TabsContent value="your-info">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="your-name">Your Name/Nickname</Label>
                        <Input
                          id="your-name"
                          value={yourInfo.name}
                          onChange={(e) => handleYourInfoChange("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="your-age">Your Age</Label>
                        <Input
                          id="your-age"
                          type="number"
                          value={yourInfo.age}
                          onChange={(e) => handleYourInfoChange("age", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="your-gender">Your Gender</Label>
                        <Select
                          value={yourInfo.gender}
                          onValueChange={(value) => handleYourInfoChange("gender", value)}
                        >
                          <SelectTrigger id="your-gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="your-religious-commitment">Level of Religious Commitment</Label>
                        <Select
                          value={yourInfo.religiousCommitment}
                          onValueChange={(value) => handleYourInfoChange("religiousCommitment", value)}
                        >
                          <SelectTrigger id="your-religious-commitment">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="practicing">Practicing (Prays 5 times, follows Islamic finance, modesty, etc.)</SelectItem>
                            <SelectItem value="moderate">Moderately Practicing (Observes basics but flexible on some aspects)</SelectItem>
                            <SelectItem value="non-practicing">Non-Practicing (Identifies as Muslim but does not follow many obligations)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-3 block">
                        Select Must-Have Religious Values (Select at least one)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {!yourInfo.gender ? (
                          <p className="text-muted-foreground">Please select your gender to see relevant religious values.</p>
                        ) : yourInfo.gender === "male" ? (
                          maleReligiousValues.map((value) => (
                            <div key={value.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`your-value-${value.id}`}
                                checked={yourInfo.religiousValues.includes(value.id)}
                                onCheckedChange={(checked) => handleYourReligiousValueChange(value.id, checked === true)}
                              />
                              <Label htmlFor={`your-value-${value.id}`}>{value.label}</Label>
                            </div>
                          ))
                        ) : yourInfo.gender === "female" ? (
                          femaleReligiousValues.map((value) => (
                            <div key={value.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`your-value-${value.id}`}
                                checked={yourInfo.religiousValues.includes(value.id)}
                                onCheckedChange={(checked) => handleYourReligiousValueChange(value.id, checked === true)}
                              />
                              <Label htmlFor={`your-value-${value.id}`}>{value.label}</Label>
                            </div>
                          ))
                        ) : (
                          [...maleReligiousValues, ...femaleReligiousValues]
                            .filter((value, index, self) => 
                              index === self.findIndex((v) => v.id === value.id)
                            )
                            .map((value) => (
                              <div key={value.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`your-value-${value.id}`}
                                  checked={yourInfo.religiousValues.includes(value.id)}
                                  onCheckedChange={(checked) => handleYourReligiousValueChange(value.id, checked === true)}
                                />
                                <Label htmlFor={`your-value-${value.id}`}>{value.label}</Label>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="suitor-info">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="suitor-name">Suitor's Name/Nickname</Label>
                        <Input
                          id="suitor-name"
                          value={suitorInfo.name}
                          onChange={(e) => handleSuitorInfoChange("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="suitor-age">Suitor's Age</Label>
                        <Input
                          id="suitor-age"
                          type="number"
                          value={suitorInfo.age}
                          onChange={(e) => handleSuitorInfoChange("age", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="suitor-gender">Suitor's Gender</Label>
                        <Select
                          value={suitorInfo.gender}
                          onValueChange={(value) => handleSuitorInfoChange("gender", value)}
                          disabled={yourInfo.gender === "male" || yourInfo.gender === "female"}
                        >
                          <SelectTrigger id="suitor-gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="suitor-religious-commitment">Level of Religious Commitment</Label>
                        <Select
                          value={suitorInfo.religiousCommitment}
                          onValueChange={(value) => handleSuitorInfoChange("religiousCommitment", value)}
                        >
                          <SelectTrigger id="suitor-religious-commitment">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="practicing">Practicing (Prays 5 times, follows Islamic finance, modesty, etc.)</SelectItem>
                            <SelectItem value="moderate">Moderately Practicing (Observes basics but flexible on some aspects)</SelectItem>
                            <SelectItem value="non-practicing">Non-Practicing (Identifies as Muslim but does not follow many obligations)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-3 block">
                        Select Shared Religious Values
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {!suitorInfo.gender ? (
                          <p className="text-muted-foreground">Please select your gender first to see suitor's relevant religious values.</p>
                        ) : suitorInfo.gender === "male" ? (
                          maleReligiousValues.map((value) => (
                            <div key={value.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`suitor-value-${value.id}`}
                                checked={suitorInfo.religiousValues.includes(value.id)}
                                onCheckedChange={(checked) => handleSuitorReligiousValueChange(value.id, checked === true)}
                              />
                              <Label htmlFor={`suitor-value-${value.id}`}>{value.label}</Label>
                            </div>
                          ))
                        ) : suitorInfo.gender === "female" ? (
                          femaleReligiousValues.map((value) => (
                            <div key={value.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`suitor-value-${value.id}`}
                                checked={suitorInfo.religiousValues.includes(value.id)}
                                onCheckedChange={(checked) => handleSuitorReligiousValueChange(value.id, checked === true)}
                              />
                              <Label htmlFor={`suitor-value-${value.id}`}>{value.label}</Label>
                            </div>
                          ))
                        ) : (
                          [...maleReligiousValues, ...femaleReligiousValues]
                            .filter((value, index, self) => 
                              index === self.findIndex((v) => v.id === value.id)
                            )
                            .map((value) => (
                              <div key={value.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`suitor-value-${value.id}`}
                                  checked={suitorInfo.religiousValues.includes(value.id)}
                                  onCheckedChange={(checked) => handleSuitorReligiousValueChange(value.id, checked === true)}
                                />
                                <Label htmlFor={`suitor-value-${value.id}`}>{value.label}</Label>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="compatibility">
                  <div className="space-y-6">
                    <p className="text-muted-foreground mb-4">
                      Answer the following questions about your potential suitor. You only need to answer questions you know the answers to.
                    </p>
                    
                    <Accordion
                      type="single"
                      collapsible
                      value={expandedCategories[0]}
                      onValueChange={(value) => setExpandedCategories([value])}
                    >
                      {compatibilityQuestions.map((category) => (
                        <AccordionItem 
                          key={category.category} 
                          value={category.category}
                        >
                          <AccordionTrigger className="text-xl font-medium">
                            {category.category}
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
                  </div>
                </TabsContent>
                
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePreviousTab}
                    disabled={activeTab === "your-info"}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNextTab}>
                    {activeTab === "compatibility" ? "See Results" : "Next"}
                  </Button>
                </div>
              </Tabs>
            ) : (
              <div id="results-container">
                <h2 className="text-2xl font-bold mb-6 text-center">Your Compatibility Results</h2>
                
                <div className="mb-8">
                  <div className="flex justify-center items-center mb-4">
                    <div className="relative w-48 h-48">
                      <div className="w-full h-full rounded-full bg-gray-100 dark:bg-brand-black flex items-center justify-center">
                        <span className="text-4xl font-bold">{calculateCompatibilityScore()}%</span>
                      </div>
                      <svg className="absolute top-0 left-0" width="192" height="192" viewBox="0 0 192 192">
                        <circle
                          cx="96"
                          cy="96"
                          r="92"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="8"
                          strokeDasharray={`${calculateCompatibilityScore() * 5.8} 1000`}
                          transform="rotate(-90, 96, 96)"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-brand-green mb-2">{getResultMessage().title}</h3>
                    <p>{getResultMessage().message}</p>
                  </div>
                  
                  <CompatibilityGraph scores={getCategoryScores()} />
                  
                  {Object.keys(lowScoreAreas).length > 0 && (
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-brand-black rounded-lg">
                      <h4 className="font-semibold text-lg mb-4">Areas to Consider:</h4>
                      
                      <Accordion type="multiple" className="w-full">
                        {Object.entries(lowScoreAreas).map(([area, tips]) => (
                          <AccordionItem key={area} value={area}>
                            <AccordionTrigger className="text-left">
                              <span>{area}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 space-y-2 mt-2">
                                {tips.map((tip, index) => (
                                  <li key={index} className="text-sm">{tip}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                  
                  <ResultsActions 
                    title={getResultMessage().title}
                    subtitle={getResultMessage().message}
                    score={calculateCompatibilityScore()}
                    type="compatibility"
                    shareText={getShareText()}
                  />
                  
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Button 
                        className="h-auto py-6"
                        onClick={() => {
                          const nextStepsSection = document.getElementById("next-steps");
                          if (nextStepsSection) {
                            nextStepsSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        <div>
                          <p className="font-semibold mb-1">Proceed with Relationship</p>
                          <p className="text-xs font-normal">Generate Marriage Checklist</p>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-6"
                        onClick={() => {
                          const nextStepsSection = document.getElementById("next-steps");
                          if (nextStepsSection) {
                            nextStepsSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        <div>
                          <p className="font-semibold mb-1">End Things Respectfully</p>
                          <p className="text-xs font-normal">Generate Breakup Message</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                  
                  <div id="next-steps" className="mt-12 pt-6 border-t">
                    <Tabs defaultValue="proceed">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="proceed">Marriage Checklist</TabsTrigger>
                        <TabsTrigger value="end">Breakup Message</TabsTrigger>
                      </TabsList>
                      <TabsContent value="proceed">
                        {generateMarriageChecklist()}
                      </TabsContent>
                      <TabsContent value="end">
                        {generateBreakupMessage()}
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={() => {
                        setShowResults(false);
                        setActiveTab("your-info");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      variant="outline"
                    >
                      Start New Compatibility Test
                    </Button>
                  </div>
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

export default Compatibility;
