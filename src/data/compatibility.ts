/**
 * Compatibility Match Tool data.
 *
 * Religious values are shown as checkboxes for each person (by gender).
 * Questions are answered about the suitor. Options with equal scores are
 * "preference" questions: they do not raise or lower the score.
 */
import type { Question } from "@/components/QuestionCard";

export interface CompatibilityCategory {
  category: string;
  emoji: string;
  questions: Question[];
}

// Define the religious values
export const maleReligiousValues = [
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

export const femaleReligiousValues = [
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
export const compatibilityQuestions: CompatibilityCategory[] = [
  {
    category: "Core Religious Practice",
    emoji: "🕌",
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
        question: "How often do they read or listen to Quran?",
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
    emoji: "🎭",
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
    emoji: "🌱",
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
    emoji: "🌍",
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

