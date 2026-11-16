/**
 * Frequently asked questions. Used on the About page, in the FAQ structured data
 * (JSON-LD) and in /llms-full.txt, so edit answers here only.
 */
export interface FaqItem {
  question: string;
  /** One string per paragraph */
  answer: string[];
  /** Optional bullet list shown after the first paragraph */
  list?: string[];
}

export const faq: FaqItem[] = [
  {
    "question": "Is this app a substitute for parental guidance or Wali involvement?",
    "answer": [
      "No, absolutely not. MyAroos is designed to be a complementary tool to traditional Islamic approaches to marriage. We strongly encourage involving parents, guardians (Wali), and trusted community members in your marriage process. Our tools can help you clarify your own readiness and compatibility, but should be used alongside proper Islamic protocols for marriage."
    ]
  },
  {
    "question": "How does the compatibility assessment work?",
    "answer": [
      "Our compatibility assessment examines several key areas that are important in an Islamic marriage, including:",
      "We use a weighted scoring system that prioritizes religious compatibility while also accounting for personal preferences."
    ],
    "list": [
      "Religious values and practices",
      "Level of religious commitment",
      "Core religious practices",
      "Personality and lifestyle preferences",
      "Long-term goals and expectations"
    ]
  },
  {
    "question": "Is my data secure and private?",
    "answer": [
      "Yes. We do not store any of your responses or personal information on our servers. All assessments happen locally in your browser, and the results are not saved after you close or refresh the page. Your privacy is important to us, especially when it comes to such personal matters."
    ]
  },
  {
    "question": "Are the hadiths used in this app authentic?",
    "answer": [
      "We have made every effort to include only authentic hadiths from reliable sources. All hadiths displayed in our app come from recognized collections such as Bukhari, Muslim, Tirmidhi, Ibn Majah, and others. However, we are not Islamic scholars, and we encourage users to verify hadiths through reputable Islamic scholarship if they have any concerns."
    ]
  },
  {
    "question": "What if I get a low compatibility score with someone?",
    "answer": [
      "A low compatibility score doesn't necessarily mean you shouldn't proceed with the relationship, but it does indicate areas where significant differences exist. These differences may require compromise, adjustment, or further discussion. We provide a respectful breakup message generator for those who decide not to proceed, but we also encourage prayer (Istikhara) and consultation with trusted advisors before making any final decisions."
    ]
  },
  {
    "question": "Can I use this app for arranged marriage prospects?",
    "answer": [
      "Absolutely! MyAroos is especially useful for arranged marriage scenarios where you may have limited information about the potential spouse. The compatibility test can help guide your conversations during initial meetings and identify areas where you should seek more information. Many of our users find it helpful to complete the compatibility test after meeting a potential spouse suggested by family members."
    ]
  },
  {
    "question": "How often should I take the marriage readiness quiz?",
    "answer": [
      "We recommend taking the marriage readiness quiz at least once a year if you're actively seeking marriage. Personal growth happens continuously, and your readiness may change over time. If you've been working on specific areas of improvement, you might retake it after a few months to track your progress. The quiz is designed to be a tool for self-reflection rather than a one-time assessment."
    ]
  },
  {
    "question": "Does the app consider cultural differences in marriage expectations?",
    "answer": [
      "Yes, our compatibility tool recognizes that Muslims come from diverse cultural backgrounds with varying customs and traditions. While we prioritize Islamic principles that apply universally, we acknowledge cultural differences in our assessment questions. We encourage users to discuss cultural expectations openly, as these can significantly impact marital harmony."
    ]
  },
  {
    "question": "Can converts to Islam use this app effectively?",
    "answer": [
      "Absolutely! MyAroos is designed to be accessible to all Muslims, including recent converts. We've intentionally created our tools to focus on core Islamic values while being inclusive of people at different stages in their Islamic journey. If you're a convert, the marriage readiness quiz can be particularly helpful in identifying areas where you might benefit from more Islamic knowledge or community support before marriage."
    ]
  },
  {
    "question": "Is MyAroos suitable for Muslims of all madhabs?",
    "answer": [
      "Yes, MyAroos is designed to be inclusive of all orthodox Islamic schools of thought. Our questions focus on fundamental aspects of marriage that are generally agreed upon across major madhabs. Where there might be differences in fiqh rulings, we've taken a balanced approach that respects diverse interpretations while maintaining core Islamic principles."
    ]
  },
  {
    "question": "How are the scores calculated in your assessment?",
    "answer": [
      "Our scoring system is based on a weighted algorithm that prioritizes factors in this order: religious compatibility, life goals and values, personality traits, and practical considerations. Religious factors receive the highest weight in our calculations because of their fundamental importance in an Islamic marriage. Each category contributes to your overall compatibility score, giving you a comprehensive view of your potential relationship's strengths and areas that may need discussion."
    ]
  },
  {
    "question": "How can I contribute feedback to improve MyAroos?",
    "answer": [
      "We welcome feedback from our users! Your insights help us make MyAroos more beneficial for the Muslim community. You can share your suggestions, report any issues, or tell us your success stories by opening an issue on our GitHub repository. We particularly value feedback from Islamic scholars, marriage counselors, and community leaders who can help ensure our content remains authentic and beneficial."
    ]
  }
];
