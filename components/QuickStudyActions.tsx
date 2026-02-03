import React from 'react';
import { 
  Brain, 
  FileText, 
  Lightbulb, 
  BookMarked, 
  Calculator, 
  Scale, 
  History,
  Keyboard,
  Sparkles
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  onClick?: () => void;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'flashcards',
    title: 'Flashcards',
    subtitle: '15 cartões pendentes',
    icon: Brain,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'simulado',
    title: 'Simulado Rápido',
    subtitle: '10 questões aleatórias',
    icon: FileText,
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'resumos',
    title: 'Resumos',
    subtitle: 'Constituição Estadual',
    icon: BookMarked,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'rlm',
    title: 'RLM',
    subtitle: 'Tabela-verdade',
    icon: Calculator,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'legislacao',
    title: 'Legislação',
    subtitle: 'Regimento Interno',
    icon: Scale,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'historia',
    title: 'História',
    subtitle: 'Goiás & Brasil',
    icon: History,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
  },
];

interface QuickStudyActionsProps {
  onActionClick?: (actionId: string) => void;
}

export const QuickStudyActions: React.FC<QuickStudyActionsProps> = ({ onActionClick }) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
          <Lightbulb className="text-amber-500" /> Estudo Rápido
        </h3>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Keyboard className="w-3 h-3" />
          <span>Atalhos: 1-6</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {QUICK_ACTIONS.map((action, idx) => (
          <button
            key={action.id}
            onClick={() => onActionClick?.(action.id)}
            className="group relative overflow-hidden rounded-2xl p-4 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
            />

            {/* Content */}
            <div className="relative z-10">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 shadow-lg`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-0.5">{action.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium">{action.subtitle}</p>
              
              {/* Keyboard shortcut */}
              <span className="absolute top-3 right-3 w-5 h-5 rounded bg-slate-100 text-slate-400 text-[10px] font-bold flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                {idx + 1}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* AI Study Suggestion */}
      <div className="mt-6 p-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              Sugestão IA
            </p>
            <p className="text-sm font-bold truncate">
              Baseado no seu histórico, revise <span className="text-indigo-400">Constituição Estadual Art. 50-65</span>
            </p>
          </div>
          <button className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors shrink-0">
            Estudar
          </button>
        </div>
      </div>
    </div>
  );
};
