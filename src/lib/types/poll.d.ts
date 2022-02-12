export type Poll = {
  id: string;
  title: string;
  description?: string;
  created: Date;
  options: Option[];
  mode: PollMode;
  requireAuth: boolean;
  allowMultipleAnswers: boolean;
  authToken?: string;
};

export type PollMode = ChoiceMode | OrderMode;

export type ChoiceMode = {
  type: 'choice';
  maxChoices: number;
  minChoices: number;
};

export type OrderMode = {
  type: 'order';
};

export type Results = {
  id: string;
  answers: Answer[];
};

export type Option = {
  id: string;
  text: string;
};

export type Answer = {
  id: string;
  uid: string | null;
  options: string[];
  submitted: Date;
};
