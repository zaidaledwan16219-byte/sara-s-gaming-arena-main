import React from 'react';
import { getAllTopPlayers } from '@/lib/leaderboard';

const Leaderboard: React.FC = () => {
  const topPlayers = getAllTopPlayers();

  if (topPlayers.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold gold-text text-center mb-6">🏆 لوحة المتصدرين</h2>
      <div className="bg-card rounded-2xl gold-border gold-shadow overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-border text-sm text-muted-foreground font-semibold">
          <span>المركز</span>
          <span>اللاعب</span>
          <span className="text-left">النقاط</span>
        </div>
        {topPlayers.map((player, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-4 p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors">
            <span className="text-foreground font-bold">
              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
            </span>
            <span className="text-foreground">{player.name}</span>
            <span className="gold-text font-bold text-left">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
