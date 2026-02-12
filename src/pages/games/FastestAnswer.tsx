import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { FastestAnswerQuestions } from '@/data/fastestAnswerQuestions';
import { useNavigate } from 'react-router-dom';

const FastestAnswer: React.FC = () => {
  const navigate = useNavigate();

  // تأكد إن الـ id هون مطابق لملف gameConfigs.ts
  const config = gameConfigs.find(g => g.id === 'fastestanswer');

  if (!config) return <div className="text-white p-10">تحميل الإعدادات...</div>;

  return (
    <GameEngine
      config={config}
      questions={FastestAnswerQuestions}
      onBack={() => navigate('/')}
    />
  );
};

export default FastestAnswer;