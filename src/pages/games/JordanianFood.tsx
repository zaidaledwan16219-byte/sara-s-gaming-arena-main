import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { jordanianFoodQuestions } from '@/data/jordanianfoodQuestions';
import { jordanianfoodQuestions } from '@/data/jordanianfoodQuestions';
import { useNavigate } from 'react-router-dom';

const JordanianFood = () => {
  const navigate = useNavigate();
  const config = gameConfigs.find(g => g.id === 'jordanianfood');

  if (!config) return null;

  return (
    <GameEngine 
      config={config} 
      questions={jordanianFoodQuestions} 
      questions={jordanianfoodQuestions} 
      onBack={() => navigate('/')} 
    />
  );
};

export default JordanianFood;