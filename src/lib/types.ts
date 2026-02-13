export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string;
  emoji?: string;
  type?: 'text' | 'image' | 'emoji' | 'math';
}

export interface GameConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  mode: 'team' | 'solo' | 'both' | 'multiplayer';
  timePerQuestion: number; // seconds
  questionsPerRound: number;
  category: string;
}

export interface PlayerScore {
  name: string;
  score: number;
  gameId: string;
  date: string;
}

export interface TeamScore {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  gameId: string;
  date: string;
}

export type GameMode = 'team' | 'solo'| 'both' | 'multiplayer';

export interface GameState {
  mode: GameMode;
  playerName: string;
  team1Name: string;
  team2Name: string;
  currentQuestion: number;
  score: number;
  team1Score: number;
  team2Score: number;
  currentTeam: 1 | 2;
  questions: Question[];
  isFinished: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  showAnswer: boolean;
}
