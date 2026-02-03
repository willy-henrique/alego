import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  progress: number;
  target: number;
}

const INITIAL_GOALS: Goal[] = [
  {
    id: 'g1',
    title: 'Revisar 10 cartões',
    description: 'Complete uma sessão de flashcards',
    xpReward: 50,
    completed: false,
    progress: 3,
    target: 10,
  },
  {
    id: 'g2',
    title: '15 minutos de foco',
    description: 'Use o timer Pomodoro',
    xpReward: 30,
    completed: false,
    progress: 5,
    target: 15,
  },
  {
    id: 'g3',
    title: 'Completar 1 sprint',
    description: 'Finalize um desafio de português',
    xpReward: 75,
    completed: true,
    progress: 1,
    target: 1,
  },
  {
    id: 'g4',
    title: 'Acertar 5 seguidas',
    description: 'Sem errar nenhum cartão',
    xpReward: 100,
    completed: false,
    progress: 2,
    target: 5,
  },
];

export const DailyGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

  const completedCount = goals.filter((g) => g.completed).length;
  const totalXP = goals.filter((g) => g.completed).reduce((acc, g) => acc + g.xpReward, 0);
  const allCompleted = completedCount === goals.length;

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, completed: !g.completed, progress: !g.completed ? g.target : g.progress } : g
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
          <Target className="text-indigo-600" /> Metas do Dia
        </h3>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-semibold">XP Ganho</p>
            <p className="text-lg font-black text-indigo-600">+{totalXP}</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className={`mb-6 p-4 rounded-2xl ${allCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' : 'bg-slate-50 border border-slate-100'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {allCompleted ? (
              <Trophy className="w-5 h-5 text-green-600" />
            ) : (
              <Sparkles className="w-5 h-5 text-slate-500" />
            )}
            <span className={`font-bold ${allCompleted ? 'text-green-700' : 'text-slate-700'}`}>
              {allCompleted ? 'Todas as metas cumpridas!' : `${completedCount}/${goals.length} concluídas`}
            </span>
          </div>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              allCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-indigo-400 to-purple-500'
            }`}
            style={{ width: `${(completedCount / goals.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`group p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              goal.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {goal.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`font-bold text-sm transition-all ${
                      goal.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {goal.title}
                  </h4>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      goal.completed
                        ? 'bg-green-100 text-green-600'
                        : 'bg-indigo-100 text-indigo-600'
                    }`}
                  >
                    +{goal.xpReward} XP
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{goal.description}</p>

                {/* Mini progress bar */}
                {!goal.completed && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-400 rounded-full transition-all"
                        style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {goal.progress}/{goal.target}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-indigo-200">
        Ver Plano de Estudos Completo <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
