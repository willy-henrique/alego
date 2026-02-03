
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StudyTask } from '../types';
import { INITIAL_TASKS } from '../constants';
import { CheckCircle2, Circle, ListTodo, Trophy, Rocket, BookOpen } from 'lucide-react';

export const StudyDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>(INITIAL_TASKS);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const data = [
    { name: 'Concluído', value: completedCount, color: '#4F46E5' },
    { name: 'Pendente', value: tasks.length - completedCount, color: '#E2E8F0' },
  ];

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 p-0">
      {/* Progresso Geral */}
      <div className="lg:col-span-1 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-2">
          <Trophy className="text-yellow-500 w-5 h-5" /> Meta de Sprint
        </h3>
        
        <div className="w-full h-48 md:h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl md:text-4xl font-black text-indigo-600">{progressPercent}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-indigo-50 rounded-2xl w-full">
          <p className="text-indigo-700 font-bold text-xs md:text-sm">Você está no caminho certo!</p>
          <p className="text-indigo-600/70 text-[10px] md:text-xs">Faltam {tasks.length - completedCount} tópicos para fechar.</p>
        </div>
      </div>

      {/* Backlog do Estudante */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
            <ListTodo className="text-indigo-600 w-5 h-5" /> Backlog do Estudante
          </h3>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-all group">
            Edital Completo <Rocket className="w-3 h-3 md:w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {tasks.map(task => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`group flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                task.completed 
                ? 'bg-slate-50 border-transparent opacity-60 shadow-none' 
                : 'bg-white border-slate-50 hover:border-indigo-100 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <div className="shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="text-green-500 w-5 h-5 md:w-6 h-6" />
                  ) : (
                    <Circle className="text-slate-300 group-hover:text-indigo-400 w-5 h-5 md:w-6 h-6" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <h4 className={`font-bold text-sm md:text-base transition-all truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded flex items-center gap-1">
                      <BookOpen className="w-2.5 h-2.5 md:w-3 h-3" /> {task.category}
                    </span>
                    <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      task.priority === 'alta' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
