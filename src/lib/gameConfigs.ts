import { GameConfig } from './types';

export const gameConfigs: GameConfig[] = [
  { id: 'capitals', title: 'تحدي العواصم', description: 'اختر العاصمة الصحيحة لكل دولة', icon: '🏛️', mode: 'both', timePerQuestion: 15, questionsPerRound: 20, category: 'جغرافيا' },
  { id: 'flags', title: 'أعلام الدول', description: 'حدد الدولة من خلال علمها', icon: '🏴', mode: 'both', timePerQuestion: 10, questionsPerRound: 20, category: 'جغرافيا' },
  { id: 'arabic-songs', title: 'أغاني وأفلام عربية', description: 'اعرف الأغنية أو الفيلم من الإيموجي', icon: '🎬', mode: 'both', timePerQuestion: 20, questionsPerRound: 20, category: 'ترفيه' },
  { id: 'famous-movies', title: 'أفلام مشهورة', description: 'حدد الفيلم من الاقتباس أو الصورة', icon: '🎥', mode: 'team', timePerQuestion: 15, questionsPerRound: 20, category: 'ترفيه' },
  { id: 'fastmath', title: 'رياضيات سريعة', description: 'حل العمليات الحسابية بسرعة', icon: '🔢', mode: 'both', timePerQuestion: 10, questionsPerRound: 20, category: 'تعليم' },
  { id: 'chemistry', title: 'كيمياء العناصر', description: 'اختر الرمز الصحيح للعنصر', icon: '⚗️', mode: 'both', timePerQuestion: 12, questionsPerRound: 20, category: 'تعليم' },
  { id: 'fastestanswer', title: 'أسرع إجابة', description: 'أول إجابة صحيحة تكسب النقاط', icon: '⚡', mode: 'team', timePerQuestion: 8, questionsPerRound: 20, category: 'تحدي' },
  { id: 'jordanianfood', title: 'أكلات أردنية', description: 'أسئلة عن الأكلات الشعبية الأردنية', icon: '🍽️', mode: 'solo', timePerQuestion: 12, questionsPerRound: 20, category: 'طعام' },
  { id: 'series', title: 'تحدي المسلسلات', description: 'اختبر معرفتك بمسلسلات باب الحارة، فروم، ولاكاسا دي بابل', icon: '📺', mode: 'both', timePerQuestion: 15, questionsPerRound: 20, category: 'entertainment' },
  { id: 'death-roulette', title: 'روليت الموت', description: 'تحدي الحظ الأخير، 3 أرواح ومسدس واحد.. هل ستنجو؟', icon: '💀', mode: 'multiplayer', timePerQuestion: 0, questionsPerRound: 0, category: 'تحدي' },
  { id: 'time-limit', title: 'وقت محدود', description: 'أجب خلال 5 ثوانٍ فقط!', icon: '⏱️', mode: 'solo', timePerQuestion: 5, questionsPerRound: 20, category: 'تحدي' },
  { id: 'true-false', title: 'صح أم خطأ', description: 'حدد إذا كانت المعلومة صحيحة', icon: '✅', mode: 'solo', timePerQuestion: 8, questionsPerRound: 20, category: 'معلومات' },
  { id: 'who-said', title: 'من القائل', description: 'حدد صاحب الاقتباس المشهور', icon: '💬', mode: 'team', timePerQuestion: 15, questionsPerRound: 20, category: 'ثقافة' },
  { id: 'jordan-places', title: 'أماكن في الأردن', description: 'حدد المكان السياحي من الصورة', icon: '🏜️', mode: 'team', timePerQuestion: 12, questionsPerRound: 20, category: 'سياحة' },
  { id: 'saudi-landmarks', title: 'معالم السعودية', description: 'حدد المعلم السياحي السعودي', icon: '🕌', mode: 'team', timePerQuestion: 12, questionsPerRound: 20, category: 'سياحة' },
  { id: 'emoji-majors', title: 'إيموجي التخصصات', description: 'اعرف التخصص من الإيموجي', icon: '🎓', mode: 'both', timePerQuestion: 15, questionsPerRound: 20, category: 'تعليم' },
];
