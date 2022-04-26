export type Poll = {
  id: string;
  title: string;
  description?: string;
  created: Date;
  choices: Choice[];
  settings: {
    mode: 'order' | 'choice';
    minChoices: number;
    maxChoices: number;
    allowMultipleAnswers: boolean;
    shuffleChoices: boolean;
  };
};

export type Choice = {
  id: string;
  text: string;
};

/* Results of a poll */
export type Results = {
  id: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  uid: string | null;
  selected: string[];
  submitted: Date;
};
