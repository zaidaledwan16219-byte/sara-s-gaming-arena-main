import React from 'react';
import { Question } from '@/lib/types';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  showAnswer: boolean;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<Props> = ({ question, selectedAnswer, isCorrect, showAnswer, onAnswer }) => {
  const getButtonClass = (option: string) => {
    const base = 'w-full p-4 rounded-xl text-lg font-semibold transition-all duration-300 border-2 text-right';
    if (!selectedAnswer) {
      return `${base} bg-secondary border-border text-foreground hover:border-primary hover:bg-secondary/80 cursor-pointer`;
    }
    if (option === question.correctAnswer) {
      return `${base} bg-green-900/50 border-green-500 text-green-300`;
    }
    if (option === selectedAnswer && !isCorrect) {
      return `${base} bg-red-900/50 border-red-500 text-red-300`;
    }
    return `${base} bg-secondary/50 border-border/50 text-muted-foreground opacity-50`;
  };

  return (
    <div className="w-full max-w-2xl animate-fade-in">
      <div className="bg-card rounded-2xl p-6 gold-border mb-6">
        {/* Image */}
        {question.image && (
          <div className="card-flip mb-4 h-64 relative mx-auto w-full max-w-md">
            <div className={`card-flip-inner w-full h-full ${showAnswer ? 'flipped' : ''}`}>
              <div className="card-flip-front flex items-center justify-center">
                <img
                  src={question.image}
                  alt="سؤال"
                  className="w-full h-48 md:h-64 object-cover rounded-lg"
                  loading="lazy"
                />
             </div>

              <div className="card-flip-back flex items-center justify-center bg-card rounded-lg p-4">
                {showAnswer && (
                  <span className="text-xl font-bold gold-text text-center">
                    {question.correctAnswer}
                  </span>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Emoji */}
        {question.emoji && (
          <div className="text-center mb-4">
            <span className="text-5xl">{question.emoji}</span>
          </div>
        )}

        {/* Question text */}
        <h3 className="text-xl font-bold text-foreground text-center">{question.question}</h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            disabled={!!selectedAnswer}
            className={getButtonClass(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
