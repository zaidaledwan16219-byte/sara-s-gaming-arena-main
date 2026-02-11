import React from 'react';
import GameEngine from '@/components/game/GameEngine';
import { gameConfigs } from '@/lib/gameConfigs';
import { chemistryQuestions } from '@/data/chemistryQuestions';
import { useNavigate } from 'react-router-dom';

const Chemistry: React.FC = () => {
  const navigate = useNavigate();

  // البحث عن إعدادات لعبة الكيمياء من القائمة
  // ملاحظة: تأكد أن id: 'chemistry' موجود في ملف gameConfigs
  const config = gameConfigs.find(g => g.id === 'chemistry') || gameConfigs.find(g => g.id === 'FastMath');

  return (
    <GameEngine
      config={config!}
      questions={chemistryQuestions}
      onBack={() => navigate('/')}
    />
  );
};

export default Chemistry;