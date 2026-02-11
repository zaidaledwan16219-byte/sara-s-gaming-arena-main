import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { FastMathQuestions } from '@/data/FastMathQuestions';
import { useNavigate } from 'react-router-dom';

const FastMath: React.FC = () => {
  const navigate = useNavigate();

  // البحث عن إعدادات لعبة الرياضيات من القائمة
  const config = gameConfigs.find(g => g.id === 'FastMath');

  return (
    <GameEngine 
      config={config} 
      questions={FastMathQuestions} 
      onBack={() => navigate('/')} 
    />
  );
};

export default FastMath;