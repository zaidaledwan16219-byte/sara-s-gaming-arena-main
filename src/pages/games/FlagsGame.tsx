import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { flagsQuestions } from '@/data/flagsQuestions';
import { useNavigate } from 'react-router-dom';

const FlagsGame: React.FC = () => {
  const navigate = useNavigate();
  const config = gameConfigs.find(g => g.id === 'flags')!;
  return <GameEngine config={config} questions={flagsQuestions} onBack={() => navigate('/')} />;
};

export default FlagsGame;
