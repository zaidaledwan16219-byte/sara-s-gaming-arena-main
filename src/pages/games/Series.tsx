import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { seriesQuestions } from '@/data/seriesQuestions';
import { useNavigate } from 'react-router-dom';

const SeriesGame: React.FC = () => {
  const navigate = useNavigate();

  // البحث عن إعدادات اللعبة باستخدام المعرف 'series'
  const config = gameConfigs.find(g => g.id === 'series')!;

  return (
    <GameEngine 
      config={config} 
      questions={seriesQuestions} 
      onBack={() => navigate('/')} 
    />
  );
};

export default SeriesGame;