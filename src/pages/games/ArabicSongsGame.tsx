import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { arabicSongsQuestions } from '@/data/arabicSongsQuestions';
import { useNavigate } from 'react-router-dom';

const ArabicSongsGame: React.FC = () => {
  const navigate = useNavigate();
  const config = gameConfigs.find(g => g.id === 'arabic-songs')!;
  return <GameEngine config={config} questions={arabicSongsQuestions} onBack={() => navigate('/')} />;
};

export default ArabicSongsGame;
