import React from 'react';
import { TrendingUp, Target, Award, Calendar, Clock, Zap, BookOpen, Brain } from 'lucide-react';

interface StudyStatsProps {
  totalXP: number;
  level: number;
  cardsReviewed: number;
  correctAnswers: number;
  studyMinutesToday: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export const StudyStats: React.FC<StudyStatsProps> = ({
  totalXP,
  level,
  cardsReviewed,
  correctAnswers,
  studyMinutesToday,
  weeklyGoal,
  weeklyProgress,
}) => {
  const xpForNextLevel = level * 500;
  const currentLevelXP = totalXP % 500;
  const levelProgress = (currentLevelXP / 500) * 100;
  const accuracy = cardsReviewed > 0 ? Math.round((correctAnswers / cardsReviewed) * 100) : 0;
  const weeklyPercent = Math.min(100, Math.round((weeklyProgress / weeklyGoal) * 100));

  const statCards = [
    {
      icon: BookOpen,
      label: 'Cartões Hoje',
      value: cardsReviewed,
      color: 'indigo',
      subtext: `${accuracy}% acerto`,
    },
    {
      icon: Clock,
      label: 'Tempo de Estudo',
      value: `${studyMinutesToday}min`,
      color: 'green',
      subtext: 'hoje',
    },
    {
      icon: Brain,
      label: 'Acertos',
      value: correctAnswers,
      color: 'purple',
      subtext: 'respostas certas',
    },
  ];

  const colorClasses = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', icon: 'text-indigo-500' },
    green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-500' },
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="text-indigo-600" /> Seu Progresso
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg shadow-orange-200">
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm font-black text-white">Nível {level}</span>
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-indigo-900">{totalXP} XP</span>
          </div>
          <span className="text-xs font-semibold text-indigo-500">
            {xpForNextLevel - currentLevelXP} XP para nível {level + 1}
          </span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {statCards.map((stat) => {
          const colors = colorClasses[stat.color as keyof typeof colorClasses];
          return (
            <div key={stat.label} className={`${colors.bg} rounded-2xl p-4 text-center`}>
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${colors.icon}`} />
              <p className={`text-2xl font-black ${colors.text}`}>{stat.value}</p>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Weekly Goal */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-slate-600" />
            <span className="font-bold text-slate-700">Meta Semanal</span>
          </div>
          <span className="text-sm font-semibold text-slate-500">
            {weeklyProgress}/{weeklyGoal} min
          </span>
        </div>
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              weeklyPercent >= 100
                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                : 'bg-gradient-to-r from-slate-400 to-slate-500'
            }`}
            style={{ width: `${weeklyPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-400">
            <Calendar className="w-3 h-3 inline mr-1" />
            Esta semana
          </span>
          <span className={`text-xs font-bold ${weeklyPercent >= 100 ? 'text-green-600' : 'text-slate-500'}`}>
            {weeklyPercent}% concluído
          </span>
        </div>
      </div>

      {/* Achievements Preview */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-slate-700">Conquistas Recentes</span>
          <button className="text-xs font-semibold text-indigo-600 hover:underline">Ver todas</button>
        </div>
        <div className="flex gap-2">
          {[
            { emoji: '🔥', title: '7 dias seguidos', unlocked: true },
            { emoji: '🎯', title: '100% de acerto', unlocked: true },
            { emoji: '📚', title: '50 cartões', unlocked: false },
            { emoji: '🏆', title: 'Primeira semana', unlocked: false },
          ].map((badge, i) => (
            <div
              key={i}
              className={`flex-1 p-3 rounded-xl text-center transition-all ${
                badge.unlocked
                  ? 'bg-amber-50 border-2 border-amber-200'
                  : 'bg-slate-50 border-2 border-slate-100 opacity-40 grayscale'
              }`}
              title={badge.title}
            >
              <span className="text-2xl">{badge.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
