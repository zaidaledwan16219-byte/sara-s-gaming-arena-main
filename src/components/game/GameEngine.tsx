import React, { useState, useEffect, useCallback } from 'react';
import { Question, GameConfig, GameMode, GameState } from '@/lib/types';
import { selectRandomQuestions } from '@/lib/gameUtils';
import { playSound } from '@/lib/sounds';
import { savePlayerScore, saveTeamScore } from '@/lib/leaderboard';
import GameSetup from './GameSetup';
import QuestionCard from './QuestionCard';
import GameResults from './GameResults';

interface Props {
  config: GameConfig;
  questions: Question[];
  onBack: () => void;
}

const GameEngine: React.FC<Props> = ({ config, questions, onBack }) => {
  const [phase, setPhase] = useState<'setup' | 'playing' | 'results'>('setup');
  const [state, setState] = useState<GameState>({
    mode: 'solo',
    playerName: '',
    team1Name: '',
    team2Name: '',
    currentQuestion: 0,
    score: 0,
    team1Score: 0,
    team2Score: 0,
    currentTeam: 1,
    questions: [],
    isFinished: false,
    selectedAnswer: null,
    isCorrect: null,
    showAnswer: false,
  });
  const [timeLeft, setTimeLeft] = useState(config.timePerQuestion);

  const handleStart = (mode: GameMode, playerName: string, team1Name: string, team2Name: string) => {
    const selected = selectRandomQuestions(questions, config.questionsPerRound);
    setState({
      mode,
      playerName,
      team1Name,
      team2Name,
      currentQuestion: 0,
      score: 0,
      team1Score: 0,
      team2Score: 0,
      currentTeam: 1,
      questions: selected,
      isFinished: false,
      selectedAnswer: null,
      isCorrect: null,
      showAnswer: false,
    });
    setTimeLeft(config.timePerQuestion);
    setPhase('playing');
  };

  const moveToNext = useCallback(() => {
    const next = state.currentQuestion + 1;
    if (next >= state.questions.length) {
      if (state.mode === 'solo') {
        savePlayerScore({
          name: state.playerName,
          score: state.score,
          gameId: config.id,
          date: new Date().toISOString(),
        });
      } else {
        saveTeamScore({
          team1Name: state.team1Name,
          team2Name: state.team2Name,
          team1Score: state.team1Score,
          team2Score: state.team2Score,
          gameId: config.id,
          date: new Date().toISOString(),
        });
      }
      setPhase('results');
      playSound('achievement');
    } else {
      setState(prev => ({
        ...prev,
        currentQuestion: next,
        selectedAnswer: null,
        isCorrect: null,
        showAnswer: false,
        currentTeam: prev.mode === 'team' ? (prev.currentTeam === 1 ? 2 : 1) as 1 | 2 : 1,
      }));
      setTimeLeft(config.timePerQuestion);
    }
  }, [state, config]);

  const handleAnswer = (answer: string) => {
    if (state.selectedAnswer) return;
    const correct = answer === state.questions[state.currentQuestion].correctAnswer;

    playSound(correct ? 'correct' : 'wrong');

    setState(prev => {
      const newState = { ...prev, selectedAnswer: answer, isCorrect: correct, showAnswer: true };
      if (correct) {
        if (prev.mode === 'solo') {
          newState.score = prev.score + 10;
        } else {
          if (prev.currentTeam === 1) newState.team1Score = prev.team1Score + 10;
          else newState.team2Score = prev.team2Score + 10;
        }
      }
      return newState;
    });

    setTimeout(moveToNext, 1500);
  };

  const handleTimeout = useCallback(() => {
    if (!state.selectedAnswer) {
      playSound('wrong');
      setState(prev => ({ ...prev, selectedAnswer: '___timeout___', isCorrect: false, showAnswer: true }));
      setTimeout(moveToNext, 1500);
    }
  }, [state.selectedAnswer, moveToNext]);

  useEffect(() => {
    if (phase !== 'playing' || state.selectedAnswer) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    if (timeLeft <= 3) playSound('tick');
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, state.selectedAnswer, handleTimeout]);

  if (phase === 'setup') {
    return <GameSetup config={config} onStart={handleStart} onBack={onBack} />;
  }

  if (phase === 'results') {
    return (
      <GameResults
        state={state}
        config={config}
        onPlayAgain={() => setPhase('setup')}
        onBack={onBack}
      />
    );
  }

  const currentQ = state.questions[state.currentQuestion];

  // --- التعديل اللي طلبته هون ---
  // بنجهز نسخة من السؤال عشان نتحكم بالصورة
  const questionToRender = { 
    ...currentQ,
    // إذا اللعبة تيك توك ولسا ما جاوب، بنخلي الصورة فاضية عشان ما تطلع
    image: (config.id === 'tiktok' && !state.showAnswer) ? undefined : currentQ.image
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            سؤال {state.currentQuestion + 1} / {state.questions.length}
          </span>
          {state.mode === 'team' && (
            <span className="text-sm font-bold text-primary">
              دور: {state.currentTeam === 1 ? state.team1Name : state.team2Name}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center bg-card rounded-xl p-3 gold-border">
          {state.mode === 'solo' ? (
            <div className="flex justify-between w-full">
              <span className="text-foreground font-bold">{state.playerName}</span>
              <span className="gold-text font-bold">{state.score} نقطة</span>
            </div>
          ) : (
            <>
              <div className="text-center flex-1">
                <div className="text-sm text-muted-foreground">{state.team1Name}</div>
                <div className="text-xl font-bold gold-text">{state.team1Score}</div>
              </div>
              <div className="text-muted-foreground font-bold">VS</div>
              <div className="text-center flex-1">
                <div className="text-sm text-muted-foreground">{state.team2Name}</div>
                <div className="text-xl font-bold gold-text">{state.team2Score}</div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${
            timeLeft <= 3 ? 'border-destructive text-destructive animate-pulse' : 'border-primary text-primary'
          }`}>
            {timeLeft}
          </div>
        </div>

        <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full gold-gradient rounded-full transition-all duration-300"
            style={{ width: `${((state.currentQuestion + 1) / state.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <QuestionCard
        question={questionToRender}
        selectedAnswer={state.selectedAnswer}
        isCorrect={state.isCorrect}
        showAnswer={state.showAnswer}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default GameEngine;