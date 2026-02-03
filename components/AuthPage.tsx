
import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheck, Rocket, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRole: 'Analista Legislativo'
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Candidato(a)',
      email: formData.email || 'contato@exemplo.com',
      targetRole: formData.targetRole,
      streak: 1,
      joinedAt: new Date().toISOString()
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 md:p-6 overflow-x-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-slate-800/50 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative z-10">
        {/* Lado Esquerdo - Branding (Hidden on small mobile if desired, or simplified) */}
        <div className="hidden md:flex p-12 bg-indigo-600 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black text-2xl shadow-xl mb-8">
              A
            </div>
            <h1 className="text-4xl font-black leading-tight mb-4">Prepare-se para a ALEGO.</h1>
            <p className="text-indigo-100/80">Entre na plataforma de estudos que utiliza a lógica de desenvolvimento.</p>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <ShieldCheck className="text-emerald-400" />
              <span className="text-sm font-medium">Conteúdo atualizado</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <Rocket className="text-orange-400" />
              <span className="text-sm font-medium">Active Recall</span>
            </div>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>
        </div>

        {/* Lado Direito - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6 md:mb-8 text-center md:text-left">
            <div className="md:hidden w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg mx-auto mb-4">
              A
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{isLogin ? 'Bem-vindo' : 'Crie seu Perfil'}</h2>
            <p className="text-slate-400 text-sm">Insira seus dados para acessar.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Nome Completo</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Cargo Alvo</label>
                <select 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                >
                  <option>Analista Legislativo</option>
                  <option>Consultor Legislativo</option>
                  <option>Policial Legislativo</option>
                  <option>Técnico Legislativo</option>
                </select>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="password" 
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-slate-900 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-indigo-50 transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 md:mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 text-xs md:text-sm hover:text-white transition-colors"
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já possui perfil? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
