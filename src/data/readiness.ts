/**
 * Marriage Readiness Quiz questions.
 *
 * Each category is one step of the quiz. Each option has a score from 0 to 10;
 * the highest option score in a question is treated as that question's maximum.
 * To add a question, append it to a category. Keep ids unique and stable.
 */
import type { Question } from "@/components/QuestionCard";

export interface ReadinessCategory {
  id: string;
  title: string;
  emoji: string;
  questions: Question[];
}

export const categories: ReadinessCategory[] = [
  {
    id: "spiritual",
    emoji: "🕌",
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
    emoji: "💛",
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
          { value: "completely", label: "No past relationships, I'm good", score: 10 },
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
    emoji: "💰",
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
    emoji: "🏡",
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

