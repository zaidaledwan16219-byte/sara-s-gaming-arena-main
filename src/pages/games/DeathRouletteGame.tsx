import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameConfigs } from '@/lib/gameConfigs';

const DeathRouletteGame: React.FC = () => {
  const navigate = useNavigate();
  const config = gameConfigs.find(g => g.id === 'death-roulette');

  const [players, setPlayers] = useState<{ name: string; fails: number; alive: boolean }[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [phase, setPhase] = useState<'selection' | 'execution'>('selection');
  
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [chamber, setChamber] = useState<boolean[]>([]);
  const [isFiring, setIsFiring] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioGun = useRef(new Audio('/gun.mp3'));
  const audioNoGun = useRef(new Audio('/nongun.mp3'));
  const audioCtx = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playTickSound = () => {
    if (!audioCtx.current) return;
    const oscillator = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, audioCtx.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);
    oscillator.start();
    oscillator.stop(audioCtx.current.currentTime + 0.1);
  };

  const addPlayer = () => {
    const cleanName = playerName.trim();
    if (!cleanName) return;

    const isExist = players.some(p => p.name.toLowerCase() === cleanName.toLowerCase());
    
    if (isExist) {
      alert("هذا الاسم موجود بالفعل، اختر اسماً آخر!");
      return;
    }

    setPlayers([...players, { name: cleanName, fails: 0, alive: true }]);
    setPlayerName('');
  };

  const resetChamber = () => {
    const newChamber = Array(6).fill(false);
    newChamber[Math.floor(Math.random() * 6)] = true;
    setChamber(newChamber);
  };

  const startGame = () => {
    if (players.length < 2) return;
    initAudio();
    resetChamber();
    setGameStarted(true);
  };

  const handleRestart = () => {
    setPlayers(prev => prev.map(p => ({ ...p, fails: 0, alive: true })));
    setWinner(null);
    setPhase('selection');
    setSelectedIdx(null);
    setIsFiring(false);
    setGameStarted(false);
    resetChamber();
  };

  const startSpin = () => {
    initAudio();
    setIsSpinning(true);
    let count = 0;
    let speed = 50;
    const spin = () => {
      const aliveIndices = players.map((p, i) => p.alive ? i : -1).filter(i => i !== -1);
      setSelectedIdx(aliveIndices[Math.floor(Math.random() * aliveIndices.length)]);
      playTickSound();
      count++;
      if (count < 30) {
        setTimeout(spin, speed);
        if (count > 20) speed += 20;
      } else {
        setIsSpinning(false);
        setTimeout(() => setPhase('execution'), 1000);
      }
    };
    spin();
  };

  const handleFire = () => {
    if (isFiring) return;
    setIsFiring(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log(e));
    }

    const currentPlayer = players[selectedIdx!];
    const forceKill = currentPlayer.fails >= 2;
    const isBullet = forceKill ? true : chamber[0];
    const nextChamber = chamber.slice(1);

    setTimeout(() => {
      if (isBullet) {
        audioGun.current.play();
        const updatedPlayers = players.map((p, i) => i === selectedIdx ? { ...p, alive: false } : p);
        setPlayers(updatedPlayers);
        resetChamber();
        
        setTimeout(() => {
          checkWinner(updatedPlayers);
        }, 2500); 

      } else {
        audioNoGun.current.play();
        setPlayers(prev => prev.map((p, i) => i === selectedIdx ? { ...p, fails: p.fails + 1 } : p));
        setChamber(nextChamber.length === 0 ? [] : nextChamber);
        if (nextChamber.length === 0) resetChamber();
        
        setTimeout(() => {
          setPhase('selection');
          setIsFiring(false);
        }, 1200);
      }
    }, 350); 
  };

  const checkWinner = (currentPlayers: any[]) => {
    const survivors = currentPlayers.filter(p => p.alive);
    if (survivors.length === 1) {
      setWinner(survivors[0].name);
    } else {
      setPhase('selection');
      setIsFiring(false);
    }
  };

  if (winner) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-1000">
        <h1 className="text-5xl sm:text-7xl font-black text-yellow-500 mb-6 drop-shadow-2xl animate-bounce">🏆 الفائز النهائي 🏆</h1>
        <div className="text-6xl sm:text-9xl font-black mb-12 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">{winner}</div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={handleRestart} 
            className="px-8 sm:px-16 py-4 sm:py-6 bg-red-600 rounded-2xl sm:rounded-3xl font-black text-xl sm:text-3xl hover:scale-110 transition shadow-[0_0_30px_red]"
          >
            لعبة جديدة
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="px-8 sm:px-16 py-4 sm:py-6 bg-zinc-700 rounded-2xl sm:rounded-3xl font-black text-xl sm:text-3xl hover:scale-110 transition shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden" dir="rtl">
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center h-screen p-6">
          <h1 className="text-4xl sm:text-6xl font-black text-red-700 mb-8 sm:text-12 tracking-tighter shadow-red-900 drop-shadow-lg text-center">روليت الموت 💀</h1>
          <div className="w-full max-w-md bg-zinc-900 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 shadow-2xl">
            <input 
              type="text" value={playerName} onChange={e => setPlayerName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPlayer()}
              placeholder="اسم اللاعب..." className="w-full bg-transparent border-b-2 sm:border-b-4 border-red-900 py-3 sm:py-4 text-2xl sm:text-3xl outline-none mb-6 sm:mb-8 text-center focus:border-white transition-all"
            />
            <button onClick={addPlayer} className="w-full py-4 sm:py-5 bg-red-700 rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl mb-6 sm:mb-8 hover:bg-red-600 active:scale-95 transition">إضافة للقائمة</button>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-h-40 overflow-y-auto p-2">
              {players.map((p, i) => (
                <div key={i} className="bg-white/5 p-3 sm:p-4 rounded-xl border border-white/5 flex justify-between items-center text-lg sm:text-xl font-bold animate-in zoom-in">
                  <span className="truncate">{p.name}</span>
                  <button onClick={() => setPlayers(players.filter((_, idx) => idx !== i))} className="text-red-500 px-2 font-black">✕</button>
                </div>
              ))}
            </div>
            <button disabled={players.length < 2} onClick={startGame} className="w-full py-5 sm:py-6 bg-white text-black font-black text-2xl sm:text-3xl rounded-2xl sm:rounded-3xl active:scale-95 disabled:opacity-20 shadow-2xl transition-all">ابدأ التحدي</button>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col items-center justify-center">
          {phase === 'selection' ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black">
              <h2 className="text-3xl sm:text-5xl font-black mb-8 sm:text-16 text-red-600 animate-pulse">من الضحية؟</h2>
              
              {/* التعديل الجوهري هنا لتصغير المربعات في الجوال */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 w-full max-w-7xl px-4 sm:px-10 overflow-y-auto py-4">
                {players.map((p, i) => (
                  <div key={i} className={`p-4 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 sm:border-4 transition-all duration-75 text-center ${!p.alive ? 'opacity-10 grayscale blur-sm' : selectedIdx === i ? 'bg-red-600 border-white scale-105 sm:scale-110 shadow-[0_0_30px_red] z-10' : 'bg-zinc-900 border-white/10'}`}>
                    <div className="text-xl sm:text-4xl font-black mb-2 sm:mb-4 uppercase truncate">{p.name}</div>
                    <div className="flex justify-center gap-1 sm:gap-3">
                      {[...Array(3)].map((_, idx) => (
                        <div key={idx} className={`w-5 h-5 sm:w-10 sm:h-10 rounded-full border-2 sm:border-4 ${idx < p.fails ? 'bg-red-600 border-red-400 shadow-[0_0_10px_red]' : 'border-white/10'}`}></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <button disabled={isSpinning} onClick={startSpin} className="mt-8 sm:mt-20 bg-white text-black px-12 sm:px-24 py-5 sm:py-10 rounded-full font-black text-3xl sm:text-5xl shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-90 transition-all cursor-pointer">لف الروليت</button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full px-4 animate-in fade-in duration-500">
              <h2 className="text-4xl sm:text-6xl font-black mb-6 sm:mb-12 text-white italic tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-center">{players[selectedIdx!].name}</h2>
              <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-[2rem] sm:rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(255,0,0,0.5)] border-2 border-white/10 relative">
                <video ref={videoRef} src="/gun.mp4" className="w-full h-full object-cover" playsInline muted={false} />
              </div>
              <button onClick={handleFire} disabled={isFiring} className="mt-8 sm:mt-16 px-16 sm:px-28 py-6 sm:py-12 bg-red-700 rounded-full font-black text-3xl sm:text-6xl shadow-[0_0_80px_red] hover:bg-red-600 active:scale-95 transition-all border-4 sm:border-8 border-white/5 uppercase italic">اطلق</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeathRouletteGame;
