import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { tiktokQuestions } from '@/data/tiktokQuestion'; 
import { useNavigate } from 'react-router-dom';

const TikTokGame: React.FC = () => {
  const navigate = useNavigate();

  // البحث عن إعدادات اللعبة باستخدام المعرف 'tiktok'
  const config = gameConfigs.find(g => g.id === 'tiktok')!;

  return (
    <GameEngine 
      config={config} 
      questions={tiktokQuestions} 
      onBack={() => navigate('/')} 
    />
  );
};

export default TikTokGame;