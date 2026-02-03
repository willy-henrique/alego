
import React from 'react';
import { Flame } from 'lucide-react';

export const StreakCounter: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 bg-orange-50 border border-orange-100 p-2 md:p-4 rounded-xl md:rounded-2xl shadow-sm">
      <div className="bg-orange-500 p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0">
        <Flame className="text-white w-4 h-4 md:w-6 h-6 animate-pulse" />
      </div>
      <div>
        <p className="hidden sm:block text-[8px] md:text-xs font-semibold text-orange-600 uppercase tracking-wider">Estudo Ativo</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl md:text-3xl font-bold text-orange-700">{count}</span>
          <span className="text-orange-600 font-medium text-[10px] md:text-sm">dias</span>
        </div>
      </div>
    </div>
  );
};
