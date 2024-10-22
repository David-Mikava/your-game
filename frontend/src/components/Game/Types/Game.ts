export type Game = {
  id: number;
  total: number;
  answers: { questions: Question[] };
};

export type Question = {
  correctly: boolean; questionId: number; name: string
};
