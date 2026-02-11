import React from 'react';
import { GameState, GameConfig } from '@/lib/types';
import { getPlayerScores, getTeamScores } from '@/lib/leaderboard';
import { Button } from '@/components/ui/button';

interface Props {
  state: GameState;
  config: GameConfig;
  onPlayAgain: () => void;
  onBack: () => void;
}

const GameResults: React.FC<Props> = ({ state, config, onPlayAgain, onBack }) => {
  const playerScores = getPlayerScores(config.id).slice(0, 5);
  const teamScores = getTeamScores(config.id).slice(0, 5);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card rounded-2xl p-8 gold-border gold-shadow animate-scale-in text-center">
        <span className="text-6xl block mb-4">🏆</span>
        <h2 className="text-3xl font-bold gold-text mb-6">النتائج</h2>

        {state.mode === 'solo' ? (
          <div className="mb-8">
            <p className="text-xl text-foreground mb-2">{state.playerName}</p>
            <p className="text-4xl font-bold gold-text">{state.score} نقطة</p>
            <p className="text-muted-foreground mt-2">من أصل {state.questions.length * 10}</p>
          </div>
        ) : (
          <div className="mb-8 space-y-4">
            <div className="flex justify-between items-center bg-secondary rounded-xl p-4">
              <span className="text-foreground font-bold">{state.team1Name}</span>
              <span className="text-2xl font-bold gold-text">{state.team1Score}</span>
            </div>
            <div className="text-muted-foreground font-bold">VS</div>
            <div className="flex justify-between items-center bg-secondary rounded-xl p-4">
              <span className="text-foreground font-bold">{state.team2Name}</span>
              <span className="text-2xl font-bold gold-text">{state.team2Score}</span>
            </div>
            <div className="mt-4 p-3 rounded-lg gold-gradient text-primary-foreground font-bold text-lg">
              🎉 الفائز: {state.team1Score > state.team2Score ? state.team1Name :
                state.team2Score > state.team1Score ? state.team2Name : 'تعادل!'}
            </div>
          </div>
        )}

        {/* Mini Leaderboard */}
        {(playerScores.length > 0 || teamScores.length > 0) && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-3">🏅 لوحة المتصدرين</h3>
            <div className="space-y-2">
              {state.mode === 'solo' ? (
                playerScores.map((s, i) => (
                  <div key={i} className="flex justify-between bg-secondary rounded-lg p-2 px-4 text-sm">
                    <span className="text-foreground">{i + 1}. {s.name}</span>
                    <span className="gold-text font-bold">{s.score}</span>
                  </div>
                ))
              ) : (
                teamScores.map((s, i) => (
                  <div key={i} className="flex justify-between bg-secondary rounded-lg p-2 px-4 text-sm">
                    <span className="text-foreground">{s.team1Name} vs {s.team2Name}</span>
                    <span className="gold-text font-bold">{s.team1Score}-{s.team2Score}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button onClick={onPlayAgain} className="w-full h-12 gold-gradient text-primary-foreground hover:opacity-90">
            🔄 العب مرة أخرى
          </Button>
          <Button onClick={onBack} variant="outline" className="w-full h-12 border-primary text-primary hover:bg-primary/10">
            🏠 القائمة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
