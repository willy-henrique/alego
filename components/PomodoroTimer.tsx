import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Zap, Volume2, VolumeX } from 'lucide-react';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface PomodoroTimerProps {
  onSessionComplete?: (mode: TimerMode) => void;
}

const TIMER_CONFIGS: Record<TimerMode, { duration: number; label: string; color: string }> = {
  focus: { duration: 25 * 60, label: 'Foco', color: 'indigo' },
  shortBreak: { duration: 5 * 60, label: 'Pausa Curta', color: 'green' },
  longBreak: { duration: 15 * 60, label: 'Pausa Longa', color: 'blue' },
};

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onSessionComplete }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(TIMER_CONFIGS.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const config = TIMER_CONFIGS[mode];

  const playSound = useCallback(() => {
    if (soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleWQqTrPq2rRxMBE/mN7gvptOGi11qdzfpFgEAEu+7+rAhSwMNYPb6eGrZRIMR6/s58WFKQYrgdXm3aBOBQxDqurg');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, [soundEnabled]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound();
      setIsRunning(false);
      onSessionComplete?.(mode);
      
      if (mode === 'focus') {
        const newSessions = sessions + 1;
        setSessions(newSessions);
        // A cada 4 sessões, pausa longa
        if (newSessions % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(TIMER_CONFIGS.longBreak.duration);
        } else {
          setMode('shortBreak');
          setTimeLeft(TIMER_CONFIGS.shortBreak.duration);
        }
      } else {
        setMode('focus');
        setTimeLeft(TIMER_CONFIGS.focus.duration);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessions, onSessionComplete, playSound]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_CONFIGS[mode].duration);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_CONFIGS[newMode].duration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((TIMER_CONFIGS[mode].duration - timeLeft) / TIMER_CONFIGS[mode].duration) * 100;

  const colorMap = {
    indigo: {
      bg: 'bg-indigo-600',
      bgLight: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      ring: 'ring-indigo-500/20',
    },
    green: {
      bg: 'bg-green-600',
      bgLight: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      ring: 'ring-green-500/20',
    },
    blue: {
      bg: 'bg-blue-600',
      bgLight: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      ring: 'ring-blue-500/20',
    },
  };

  const colors = colorMap[config.color as keyof typeof colorMap];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
          <Brain className="text-indigo-600" /> Pomodoro
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            title={soundEnabled ? 'Desativar som' : 'Ativar som'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-slate-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
          <div className="flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-full">
            <Zap className="w-3 h-3 text-orange-500" />
            <span className="text-xs font-bold text-orange-600">{sessions} sessões</span>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => switchMode('focus')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'focus'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <Brain className="w-3 h-3 inline mr-1" /> Foco
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'shortBreak'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <Coffee className="w-3 h-3 inline mr-1" /> 5min
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'longBreak'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <Coffee className="w-3 h-3 inline mr-1" /> 15min
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative mb-6">
        <div className={`relative w-48 h-48 mx-auto rounded-full ${colors.bgLight} flex items-center justify-center ring-8 ${colors.ring}`}>
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-200"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className={colors.text}
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * progress) / 100}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          
          <div className="relative z-10 text-center">
            <span className={`text-5xl font-black ${colors.text} tabular-nums`}>
              {formatTime(timeLeft)}
            </span>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
              {config.label}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={resetTimer}
          className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5 text-slate-500" />
        </button>
        <button
          onClick={toggleTimer}
          className={`px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${colors.bg} hover:opacity-90`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 inline mr-2" /> Pausar
            </>
          ) : (
            <>
              <Play className="w-5 h-5 inline mr-2" /> {timeLeft === TIMER_CONFIGS[mode].duration ? 'Iniciar' : 'Continuar'}
            </>
          )}
        </button>
      </div>

      {/* Session indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`w-3 h-3 rounded-full transition-all ${
              n <= (sessions % 4 || (sessions > 0 ? 4 : 0))
                ? 'bg-indigo-600 scale-110'
                : 'bg-slate-200'
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-slate-400">até pausa longa</span>
      </div>
    </div>
  );
};
