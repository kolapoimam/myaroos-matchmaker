
import { useState } from "react";

type ErrorMessages = {
  required: string[];
  pattern: string[];
};

const defaultMessages: ErrorMessages = {
  required: [
    "Careful, you don't wanna marry the wrong person! This field is required.",
    "SubhanAllah, this important field can't be skipped! Fill it in before proceeding.",
    "By the wisdom of marriage, this question needs answering!",
    "This field is as necessary as a wali for nikah - please fill it in!",
    "Oops! Skipping this is like forgetting half your deen. Please answer!",
    "Don't leave this blank - your future spouse will thank you!",
  ],
  pattern: [
    "That doesn't look quite right. Try again with a valid format.",
    "Hmm, this answer format seems off. Please check it.",
    "This answer needs to follow the correct pattern.",
  ],
};

export function useFormError() {
  const [lastIndex, setLastIndex] = useState(0);

  const getRandomErrorMessage = (type: keyof ErrorMessages = "required") => {
    const messages = defaultMessages[type];
    // Get a different message each time
    const newIndex = (lastIndex + 1) % messages.length;
    setLastIndex(newIndex);
    return messages[newIndex];
  };

  return { getRandomErrorMessage };
}
