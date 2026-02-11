import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { fastestAnswerQuestions } from '@/data/fastestAnswerQuestions';
import { useNavigate } from 'react-router-dom';

const FastestAnswerGame: React.FC = () => {
  const navigate = useNavigate();

  // تأكد إن الـ id هون هو 'fastest-answer' زي ما كتبنا في الـ config
  const config = gameConfigs.find(g => g.id === 'fastest-answer');

  if (!config) return <div>تحميل الإعدادات...</div>;

  return (
    <GameEngine
      config={config}
      questions={fastestAnswerQuestions}
      onBack={() => navigate('/')}
    />
  );
};

export default FastestAnswerGame;