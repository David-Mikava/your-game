export type Room = {
  id: number;
  themes: [
    {
      id: number;
      name: string;
      questions: Question[];
    },
  ];
};

export type Question = {
  id: number;
  name: string;
  answer: string;
  points: number;
};
