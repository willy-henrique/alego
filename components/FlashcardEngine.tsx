import React, { useState, useCallback, useEffect } from 'react';
import { Flashcard } from '../types';
import { RotateCcw, Brain, CheckCircle, HelpCircle, AlertCircle, Zap, Trophy, Shuffle, SkipForward } from 'lucide-react';

interface FlashcardEngineProps {
  cards: Flashcard[];
  onXPGain?: (xp: number) => void;
  onSessionComplete?: (stats: SessionStats) => void;
}

interface SessionStats {
  total: number;
  correct: number;
  wrong: number;
  streak: number;
}

export const FlashcardEngine: React.FC<FlashcardEngineProps> = ({ cards, onXPGain, onSessionComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>({ total: 0, correct: 0, wrong: 0, streak: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [xpGained, setXPGained] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>(cards);
  
  const card = shuffledCards[currentIdx];
  const isLastCard = currentIdx === shuffledCards.length - 1;

  const shuffleCards = useCallback(() => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIdx(0);
    setFlipped(false);
    setSessionStats({ total: 0, correct: 0, wrong: 0, streak: 0 });
  }, [cards]);

  const handleFeedback = (difficulty: 'easy' | 'medium' | 'hard') => {
    const isCorrect = difficulty === 'easy' || difficulty === 'medium';
    const xp = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 10 : 5;
    
    setSessionStats((prev) => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      streak: isCorrect ? prev.streak + 1 : 0,
    }));

    setXPGained((prev) => prev + xp);
    onXPGain?.(xp);

    // Streak bonus celebration
    if (isCorrect && (sessionStats.streak + 1) % 5 === 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }

    setFlipped(false);
    
    if (isLastCard) {
      // Session complete
      setTimeout(() => {
        onSessionComplete?.(sessionStats);
      }, 500);
    } else {
      setTimeout(() => {
        setCurrentIdx((prev) => prev + 1);
      }, 300);
    }
  };

  const skipCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % shuffledCards.length);
    }, 200);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped((prev) => !prev);
      } else if (flipped) {
        if (e.key === '1') handleFeedback('hard');
        else if (e.key === '2') handleFeedback('medium');
        else if (e.key === '3') handleFeedback('easy');
      } else if (e.key === 's') {
        skipCard();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [flipped]);

  const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;

  return (
    <div className="max-w-md mx-auto perspective-1000 relative">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none animate-in zoom-in duration-300">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            <div>
              <p className="font-black text-lg">{sessionStats.streak} em sequência!</p>
              <p className="text-amber-100 text-sm">+50 XP bônus</p>
            </div>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-400">
            {currentIdx + 1}/{shuffledCards.length}
          </span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
            {card.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={shuffleCards}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="Embaralhar (R)"
          >
            <Shuffle className="w-4 h-4 text-slate-400" />
          </button>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-lg">
            <Zap className="w-3 h-3 text-green-600" />
            <span className="text-xs font-bold text-green-600">+{xpGained}</span>
          </div>
        </div>
      </div>

      {/* Session Stats Bar */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-xl">
        <div className="flex-1 flex items-center justify-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span className="text-xs font-bold text-green-600">{sessionStats.correct}</span>
        </div>
        <div className="w-px h-4 bg-slate-200" />
        <div className="flex-1 flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3 text-red-500" />
          <span className="text-xs font-bold text-red-600">{sessionStats.wrong}</span>
        </div>
        <div className="w-px h-4 bg-slate-200" />
        <div className="flex-1 flex items-center justify-center gap-1">
          <Trophy className="w-3 h-3 text-amber-500" />
          <span className="text-xs font-bold text-amber-600">{sessionStats.streak}🔥</span>
        </div>
        <div className="w-px h-4 bg-slate-200" />
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-600">{accuracy}%</span>
        </div>
      </div>

      {/* Card */}
      <div 
        className={`relative h-64 transition-all duration-500 preserve-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-100 rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center text-center">
          <HelpCircle className="w-10 h-10 text-slate-200 mb-4" />
          <p className="text-lg font-semibold text-slate-800 leading-snug">{card.question}</p>
          <p className="mt-6 text-[10px] font-bold text-indigo-500 uppercase flex items-center gap-2">
            <RotateCcw className="w-3 h-3" /> Space ou clique para virar
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center text-center text-white">
          <Brain className="w-10 h-10 text-indigo-300 mb-4" />
          <p className="text-base font-medium leading-relaxed">{card.answer}</p>
        </div>
      </div>

      {/* Feedback Buttons */}
      {flipped ? (
        <div className="grid grid-cols-3 gap-3 mt-6 animate-in slide-in-from-bottom-4 duration-300">
          <button 
            onClick={() => handleFeedback('hard')}
            className="flex flex-col items-center gap-1 p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all hover:scale-105 active:scale-95 border border-red-100"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-xs font-bold">Difícil</span>
            <span className="text-[10px] text-red-400">+5 XP</span>
          </button>
          <button 
            onClick={() => handleFeedback('medium')}
            className="flex flex-col items-center gap-1 p-3 bg-orange-50 text-orange-600 rounded-2xl hover:bg-orange-100 transition-all hover:scale-105 active:scale-95 border border-orange-100"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-xs font-bold">Médio</span>
            <span className="text-[10px] text-orange-400">+10 XP</span>
          </button>
          <button 
            onClick={() => handleFeedback('easy')}
            className="flex flex-col items-center gap-1 p-3 bg-green-50 text-green-600 rounded-2xl hover:bg-green-100 transition-all hover:scale-105 active:scale-95 border border-green-100"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-xs font-bold">Fácil</span>
            <span className="text-[10px] text-green-400">+15 XP</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-center mt-6">
          <button
            onClick={skipCard}
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all text-sm"
          >
            <SkipForward className="w-4 h-4" /> Pular (S)
          </button>
        </div>
      )}

      {/* Keyboard hints */}
      <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-slate-400">
        <span><kbd className="px-1.5 py-0.5 bg-slate-100 rounded">1</kbd> Difícil</span>
        <span><kbd className="px-1.5 py-0.5 bg-slate-100 rounded">2</kbd> Médio</span>
        <span><kbd className="px-1.5 py-0.5 bg-slate-100 rounded">3</kbd> Fácil</span>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};
