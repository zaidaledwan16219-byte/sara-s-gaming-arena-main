import React, { useState } from 'react';
import { GameConfig, GameMode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  config: GameConfig;
  onStart: (mode: GameMode, playerName: string, team1Name: string, team2Name: string) => void;
  onBack: () => void;
}

const GameSetup: React.FC<Props> = ({ config, onStart, onBack }) => {
  const [mode, setMode] = useState<GameMode | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const canStart = mode === 'solo' ? playerName.trim() : (team1Name.trim() && team2Name.trim());

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl p-8 gold-border gold-shadow animate-scale-in">
        <button onClick={onBack} className="text-muted-foreground hover:text-primary mb-4 text-sm">
          → العودة للقائمة
        </button>
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">{config.icon}</span>
          <h2 className="text-2xl font-bold gold-text">{config.title}</h2>
          <p className="text-muted-foreground mt-2">{config.description}</p>
        </div>

        {!mode ? (
          <div className="space-y-4">
            <h3 className="text-center text-foreground font-semibold">اختر نوع اللعب</h3>
            {(config.mode === 'solo' || config.mode === 'both') && (
              <Button onClick={() => setMode('solo')} className="w-full h-14 text-lg gold-gradient text-primary-foreground hover:opacity-90">
                🧑 لعب فردي
              </Button>
            )}
            {(config.mode === 'team' || config.mode === 'both') && (
              <Button onClick={() => setMode('team')} className="w-full h-14 text-lg gold-gradient text-primary-foreground hover:opacity-90">
                👥 فريقين
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {mode === 'solo' ? (
              <div>
                <label className="text-sm text-muted-foreground block mb-2">اسم اللاعب</label>
                <Input
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  placeholder="أدخل اسمك..."
                  className="text-center text-lg h-12 bg-secondary border-border"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">اسم الفريق الأول</label>
                  <Input
                    value={team1Name}
                    onChange={e => setTeam1Name(e.target.value)}
                    placeholder="الفريق الأول..."
                    className="text-center text-lg h-12 bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">اسم الفريق الثاني</label>
                  <Input
                    value={team2Name}
                    onChange={e => setTeam2Name(e.target.value)}
                    placeholder="الفريق الثاني..."
                    className="text-center text-lg h-12 bg-secondary border-border"
                  />
                </div>
              </>
            )}
            <Button
              onClick={() => onStart(mode, playerName, team1Name, team2Name)}
              disabled={!canStart}
              className="w-full h-14 text-lg gold-gradient text-primary-foreground hover:opacity-90 disabled:opacity-40"
            >
              🎮 ابدأ اللعب
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSetup;
