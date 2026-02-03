
import React, { useState } from 'react';
import { TimelineEvent } from '../types';
import { Calendar, ChevronRight } from 'lucide-react';

export const InteractiveTimeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = events[selectedIdx];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 h-full">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="text-indigo-600" />
        Linha do Tempo: Goiás
      </h3>
      
      <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {events.map((event, idx) => (
          <button
            key={event.year}
            onClick={() => setSelectedIdx(idx)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              selectedIdx === idx 
                ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {event.year}
          </button>
        ))}
      </div>

      <div className="mt-4 p-6 bg-slate-50 rounded-2xl border-l-4 border-indigo-500 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h4 className="text-2xl font-black text-indigo-900 mb-2">{selected.title}</h4>
        <p className="text-slate-600 leading-relaxed mb-4">{selected.description}</p>
        <div className="flex items-start gap-2 text-sm bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
          <span className="text-slate-500 font-medium italic">Contexto: {selected.context}</span>
        </div>
      </div>
    </div>
  );
};
