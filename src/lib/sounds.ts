const SOUND_URLS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  wrong: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
  tick: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  applause: 'https://assets.mixkit.co/active_storage/sfx/477/477-preview.mp3',
  bell: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
  achievement: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
};

const audioCache: Record<string, HTMLAudioElement> = {};

export function playSound(sound: keyof typeof SOUND_URLS) {
  try {
    if (!audioCache[sound]) {
      audioCache[sound] = new Audio(SOUND_URLS[sound]);
    }
    const audio = audioCache[sound];
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch {}
}

export function stopSound(sound: keyof typeof SOUND_URLS) {
  try {
    if (audioCache[sound]) {
      audioCache[sound].pause();
      audioCache[sound].currentTime = 0;
    }
  } catch {}
}
