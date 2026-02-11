import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { mathQuestions } from '@/data/mathQuestions';
import { useNavigate } from 'react-router-dom';

const FastMath: React.FC = () => {
  const navigate = useNavigate();

  // البحث عن إعدادات لعبة الرياضيات من القائمة
  const config = gameConfigs.find(g => g.id === 'fast-math');

  return (
    <GameEngine 
      config={config} 
      questions={mathQuestions} 
      onBack={() => navigate('/')} 
    />
  );
};

export default FastMath;