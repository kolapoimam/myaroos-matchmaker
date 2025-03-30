
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

// Define the religious values
const maleReligiousValues = [
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
];

const femaleReligiousValues = [
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
          { value: "yes", label: "Yes", score: 10 },
          { value: "sometimes", label: "Sometimes", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "ramadan-fasting",
        question: "Do they fast during Ramadan?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "somewhat", label: "Somewhat", score: 5 },
          { value: "no", label: "No", score: 0 },
        ],
      },
      {
        id: "avoid-riba",
        question: "Do they avoid riba (interest-based transactions)?",
        options: [
          { value: "strictly", label: "Strictly", score: 10 },
          { value: "sometimes", label: "Sometimes", score: 5 },
          { value: "not-concerned", label: "Not Concerned", score: 0 },
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
          { value: "introvert", label: "Introvert", score: 5 },
          { value: "extrovert", label: "Extrovert", score: 5 },
          { value: "ambivert", label: "Ambivert", score: 5 },
        ],
      },
      {
        id: "family-career",
        question: "Do they prioritize family over career?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "balanced", label: "Balanced", score: 7 },
          { value: "no", label: "No", score: 3 },
        ],
      },
      {
        id: "weekend-preference",
        question: "How do they prefer to spend weekends?",
        options: [
          { value: "home", label: "At home", score: 5 },
          { value: "socializing", label: "Socializing", score: 5 },
          { value: "balanced", label: "Balanced mix", score: 5 },
        ],
      },
    ],
  },
  {
    category: "Long-Term Compatibility",
    questions: [
      {
        id: "polygamy",
        question: "Are they open to polygamy?",
        options: [
          { value: "yes", label: "Yes", score: 5 },
          { value: "no", label: "No", score: 5 },
          { value: "not-sure", label: "Not Sure", score: 5 },
        ],
      },
      {
        id: "children",
        question: "Do they want children?",
        options: [
          { value: "yes", label: "Yes", score: 5 },
          { value: "no", label: "No", score: 5 },
          { value: "undecided", label: "Undecided", score: 5 },
        ],
      },
      {
        id: "relocate",
        question: "Are they willing to relocate for marriage?",
        options: [
          { value: "yes", label: "Yes", score: 10 },
          { value: "maybe", label: "Maybe", score: 5 },
          { value: "no", label: "No", score: 0 },
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
  const { toast } = useToast();

  const handleYourInfoChange = (field: string, value: string) => {
    setYourInfo((prev) => ({ ...prev, [field]: value }));
    
    // Reset religious values when gender changes
    if (field === "gender") {
      setYourInfo((prev) => ({ ...prev, religiousValues: [] }));
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
    // Check if at least one question from each category is answered
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
        setShowResults(true);
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
    let maxPossibleScore = 0;
    let answeredQuestions = 0;
    
    // Religious values match
    const sharedValues = yourInfo.religiousValues.filter((value) =>
      suitorInfo.religiousValues.includes(value)
    );
    
    const valueScore = (sharedValues.length / yourInfo.religiousValues.length) * 40;
    
    // Religious commitment match (0-20 points)
    let commitmentScore = 0;
    if (yourInfo.religiousCommitment === suitorInfo.religiousCommitment) {
      commitmentScore = 20;
    } else if (
      (yourInfo.religiousCommitment === "practicing" && suitorInfo.religiousCommitment === "moderate") ||
      (yourInfo.religiousCommitment === "moderate" && suitorInfo.religiousCommitment === "practicing")
    ) {
      commitmentScore = 10;
    }
    
    // Compatibility questions (0-40 points)
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
            
            // For personality questions, all options have the same score
            // For other questions, use the max score
            const maxScore = question.id.includes("personality") 
              ? option.score 
              : Math.max(...question.options.map((o) => o.score));
              
            questionsMaxScore += maxScore;
          }
        }
      });
    });
    
    // Normalize questions score to a 0-40 scale
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
        message: "Your compatibility is exceptional. You share core religious values and have similar life goals.",
      };
    } else if (score >= 60) {
      return {
        title: "There's potential!",
        message: "Like biryani without raita—you'll need some adjustments, but you have a strong foundation.",
      };
    } else if (score >= 40) {
      return {
        title: "Major differences exist.",
        message: "Think tea with salt instead of sugar! You may need to have serious discussions about expectations.",
      };
    } else {
      return {
        title: "Run. Like, really.",
        message: "It's giving \"Pharaoh and Musa\" vibes. You might want to reconsider this match.",
      };
    }
  };

  const getCategoryScores = () => {
    const scores = {
      "Religious Values": 0,
      "Religious Commitment": 0,
      "Core Religious Practice": 0,
      "Personality & Lifestyle": 0,
      "Long-Term Compatibility": 0,
    };
    
    // Religious values match
    const sharedValues = yourInfo.religiousValues.filter((value) =>
      suitorInfo.religiousValues.includes(value)
    );
    scores["Religious Values"] = Math.round((sharedValues.length / yourInfo.religiousValues.length) * 100);
    
    // Religious commitment match
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
    
    // Compatibility questions
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
      "I really appreciate the time we've spent getting to know each other. After careful thought and consideration, I don't think we are fully aligned in terms of our values and future goals. I wish you the best in finding someone who is a great match for you, In Sha Allah.",
      "Thank you for our discussions and for sharing your perspective. I have reflected on our compatibility and, after seeking guidance, I believe it's best for us to part ways. May Allah grant us both what is best.",
      "It has been great learning about you, and I sincerely appreciate the time. However, I feel we may have some fundamental differences that could impact our future. I pray Allah grants us both spouses who align with our paths."
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
                        {yourInfo.gender === "male" && 
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
                        }
                        {yourInfo.gender === "female" && 
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
                        }
                        {yourInfo.gender === "prefer-not-to-say" && 
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
                        }
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
                        {suitorInfo.gender === "male" && 
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
                        }
                        {suitorInfo.gender === "female" && 
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
                        }
                        {suitorInfo.gender === "prefer-not-to-say" && 
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
                        }
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
              <div>
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
