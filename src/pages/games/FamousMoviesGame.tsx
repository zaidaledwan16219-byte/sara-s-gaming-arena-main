import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { famousMoviesQuestions } from '@/data/famousMoviesQuestions';
import { useNavigate } from 'react-router-dom';

const FamousMoviesGame: React.FC = () => {
  const navigate = useNavigate();
  const config = gameConfigs.find(g => g.id === 'famous-movies')!;
  return <GameEngine config={config} questions={famousMoviesQuestions} onBack={() => navigate('/')} />;
};

export default FamousMoviesGame;
