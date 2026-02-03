
import React, { useState } from 'react';
import { RefactoringChallenge } from '../types';
import { Check, X, ShieldAlert, Zap, BookMarked, ArrowRight } from 'lucide-react';

const CHALLENGES: RefactoringChallenge[] = [
  {
    id: '1',
    original: "Faziam dez anos que a ALEGO não mudava de sede.",
    correctVersion: "Fazia dez anos que a ALEGO não mudava de sede.",
    explanation: "O verbo 'fazer' indicando tempo decorrido é impessoal e deve ficar no singular.",
    hint: "Pense na concordância do verbo impessoal."
  },
  {
    id: '2',
    original: "O deputado que refiro-me está em plenário.",
    correctVersion: "O deputado a que me refiro está em plenário.",
    explanation: "Quem se refere, refere-se A algo/alguém. O pronome relativo exige a preposição e a próclise.",
    hint: "Regência e colocação pronominal."
  },
  {
    id: '3',
    original: "Chegou as dez horas para a votação.",
    correctVersion: "Chegou às dez horas para a votação.",
    explanation: "Indicação de horas exatas exige crase.",
    hint: "Lembre-se da regra das horas."
  }
];

export const KnowledgeSprint: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userValue, setUserValue] = useState("");
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const challenge = CHALLENGES[currentIdx];

  const handleSubmit = () => {
    if (userValue.trim().toLowerCase() === challenge.correctVersion.toLowerCase()) {
      setFeedback('success');
    } else {
      setFeedback('error');
    }
  };

  const nextChallenge = () => {
    setFeedback(null);
    setUserValue("");
    setCurrentIdx((prev) => (prev + 1) % CHALLENGES.length);
  };

  return (
    <div className="bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 md:p-12 opacity-10 pointer-events-none hidden md:block">
        <BookMarked size={200} />
      </div>

      <div className="relative z-10">
        <header className="mb-6 md:mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-indigo-500/30 mb-3 md:mb-4">
            <Zap size={14} className="fill-indigo-300" /> Sprint #01
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-1 md:mb-2">Refactoring Sintático</h2>
          <p className="text-slate-400 text-sm md:text-lg">Corrija os 'bugs' da língua portuguesa.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <div className="p-6 md:p-8 bg-slate-800/50 rounded-2xl md:rounded-3xl border border-slate-700/50 backdrop-blur-sm">
              <span className="text-[10px] md:text-xs font-bold text-red-400 uppercase tracking-widest block mb-3 md:mb-4 flex items-center gap-2">
                <ShieldAlert size={16} /> Debug Mode
              </span>
              <p className="text-lg md:text-2xl font-medium leading-relaxed italic text-slate-100">
                "{challenge.original}"
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-2 md:ml-4">Sua Versão Corrigida</label>
              <textarea 
                value={userValue}
                onChange={(e) => setUserValue(e.target.value)}
                placeholder="Digite a frase corretamente..."
                className="w-full h-24 md:h-32 bg-slate-800 border-2 border-slate-700 rounded-2xl md:rounded-3xl p-4 md:p-6 text-sm md:text-lg focus:outline-none focus:border-indigo-500 transition-all resize-none shadow-inner"
              />
              
              {!feedback ? (
                <button 
                  onClick={handleSubmit}
                  className="w-full py-4 md:py-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-lg shadow-indigo-900/40 transition-all active:scale-95"
                >
                  Submeter Refactoring
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                   {feedback === 'success' ? (
                     <div className="p-4 md:p-6 bg-green-500/10 border border-green-500/30 rounded-2xl md:rounded-3xl flex items-start gap-3 md:gap-4">
                       <div className="bg-green-500 p-2 rounded-lg md:rounded-xl mt-1"><Check size={18} className="text-white" /></div>
                       <div>
                         <p className="text-green-400 font-bold text-base md:text-lg leading-tight">Build Success!</p>
                         <p className="text-green-400/70 text-xs md:text-sm mt-1">{challenge.explanation}</p>
                       </div>
                     </div>
                   ) : (
                     <div className="p-4 md:p-6 bg-red-500/10 border border-red-500/30 rounded-2xl md:rounded-3xl flex items-start gap-3 md:gap-4">
                       <div className="bg-red-500 p-2 rounded-lg md:rounded-xl mt-1"><X size={18} className="text-white" /></div>
                       <div>
                         <p className="text-red-400 font-bold text-base md:text-lg leading-tight">Runtime Error</p>
                         <p className="text-red-400/70 text-xs md:text-sm mt-1">Dica: {challenge.hint}</p>
                       </div>
                     </div>
                   )}
                   <button 
                    onClick={nextChallenge}
                    className="w-full py-3 md:py-4 bg-slate-700 hover:bg-slate-600 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all"
                  >
                    Próximo Desafio <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:mt-8">
            <div className="p-6 md:p-8 bg-indigo-600 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <h4 className="text-lg md:text-xl font-black mb-3 md:mb-4 flex items-center gap-2">
                <BookMarked size={20} /> Sandbox: Frase
              </h4>
              <p className="text-indigo-100/80 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                Verbos impessoais (haver, fazer) são os 'root nodes' do erro.
              </p>
              <ul className="space-y-2 md:space-y-3 text-[11px] md:text-sm font-medium">
                <li className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">🔹 Sujeito Composto: Plural</li>
                <li className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">🔹 Fenômenos: Impessoais</li>
              </ul>
            </div>

            <div className="p-4 md:p-6 border border-slate-700 rounded-2xl md:rounded-3xl">
               <h5 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 md:mb-4">Mapeamento Visual</h5>
               <div className="bg-slate-800 rounded-xl md:rounded-2xl p-3 md:p-4 overflow-x-auto text-indigo-300 font-mono text-[10px] md:text-xs whitespace-pre">
                 {`graph TD\n  A[Oração] --> B[Sujeito]\n  A --> C[Predicado]\n  B --> D[Simples]\n  B --> E[Composto]`}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
