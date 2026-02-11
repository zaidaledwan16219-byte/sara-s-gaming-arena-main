import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { FastestAnswerQuestions } from '@/data/fastestAnswerQuestions';
import { useNavigate } from 'react-router-dom';

const FastestAnswer: React.FC = () => {
  const navigate = useNavigate();

  // تأكد إن الـ id هون هو 'Fastest-Answer' زي ما كتبنا في الـ config
  const config = gameConfigs.find(g => g.id === 'FastestAnswer');

  if (!config) return <div>تحميل الإعدادات...</div>;

  return (
    <GameEngine
      config={config}
      questions={FastestAnswerQuestions}
      onBack={() => navigate('/')}
    />
  );
};

export default FastestAnswer;