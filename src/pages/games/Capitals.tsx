import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { CapitalsQuestions } from '@/data/capitalsQuestions';
import { useNavigate } from 'react-router-dom';

const CapitalsGame: React.FC = () => {
  const navigate = useNavigate();

  // شلنا علامة التعجب (!) وضفنا فحص بسيط عشان ما ينهار الموقع
  const config = gameConfigs.find((g) => g.id === 'capitals');

  if (!config) return <div>Loading...</div>;

  return (
    <GameEngine 
      config={config} 
      questions={CapitalsQuestions} 
      onBack={() => navigate('/')} 
    />
  );
};

export default CapitalsGame;