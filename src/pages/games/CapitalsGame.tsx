import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { capitalsQuestions } from '@/data/capitalsQuestions';
import { useNavigate } from 'react-router-dom';

const CapitalsGame: React.FC = () => {
  const navigate = useNavigate();
  const config = gameConfigs.find(g => g.id === 'capitals')!;
  return <GameEngine config={config} questions={capitalsQuestions} onBack={() => navigate('/')} />;
};

export default CapitalsGame;
