export interface Feedback {
  id: string;
  score: 1 | 2 | 3 | 4 | 5;
  notes: string;
  employeeName: string;
  date: string;
}
