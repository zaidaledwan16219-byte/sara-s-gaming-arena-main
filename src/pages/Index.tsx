import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gameConfigs } from '@/lib/gameConfigs';
import Leaderboard from '@/components/Leaderboard';
import Footer from '@/components/Footer';
import saraGamingLogo from '@/assets/sara-gaming1.jpg'; // صورة الشعار اللي فوق
import saraGamingBG from '@/assets/sara-gaming.jpg';   // صورة الخلفية
import FastMath from './games/FastMath';

const gameRoutes: Record<string, string> = {
  'Capitals': '/game/Capitals',
  'flags': '/game/flags',
  'arabic-songs': '/game/arabic-songs',
  'famous-movies': '/game/famous-movies',
  'FastMath': '/game/FastMathh',
  'chemistry': '/game/chemistry',
  'fastest-answer': '/game/fastest-answer',
  'time-limit': '/game/time-limit',
  'true-false': '/game/true-false',
  'who-said': '/game/who-said',
  'jordanianfood': '/game/jordanianfood',
  'jordan-places': '/game/jordan-places',
  'saudi-landmarks': '/game/saudi-landmarks',
  'emoji-majors': '/game/emoji-majors',
};

const availableGames = ['capitals', 'flags', 'arabic-songs', 'famous-movies', 'jordanianfood', 'FastMath', 'chemistry', 'fastest-answer'];

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${saraGamingBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12">
          <img
            src={saraGamingLogo}
            alt="Sara Game"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-6 gold-border gold-shadow"
          />
          <h1 className="text-5xl font-black gold-text mb-3">Sara Game</h1>
          <p className="text-xl text-muted-foreground">اختبر معلوماتك مع 14 لعبة تفاعلية!</p>
        </header>

        {/* Games Grid */}
        <main className="container mx-auto px-4 pb-8">
          <h2 className="text-2xl font-bold gold-text text-center mb-8">🎮 اختر لعبتك</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {gameConfigs.map(game => {
              const isAvailable = availableGames.includes(game.id);
              return (
                <button
                  key={game.id}
                  onClick={() => isAvailable && navigate(gameRoutes[game.id])}
                  disabled={!isAvailable}
                  className={`bg-white/5 backdrop-blur-[2px] rounded-2xl p-6 text-center transition-all duration-300 gold-border group ${
                    isAvailable
                      ? 'hover:gold-shadow hover:scale-[1.02] cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="text-5xl block mb-3 group-hover:scale-110 transition-transform">{game.icon}</span>
                  <h3 className="text-lg font-bold text-foreground mb-1">{game.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{game.description}</p>
                  <div className="flex justify-center gap-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                      {game.category}
                    </span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                      {game.mode === 'solo' ? 'فردي' : game.mode === 'team' ? 'فريقين' : 'فردي/فريقين'}
                    </span>
                  </div>
                  {!isAvailable && (
                    <span className="text-xs text-primary mt-2 block">🔜 قريباً</span>
                  )}
                </button>
              );
            })}
          </div>

          <Leaderboard />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
