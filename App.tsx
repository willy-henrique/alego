import React, { useState, useEffect, useCallback } from 'react';
import { StudyDashboard } from './components/StudyDashboard';
import { StreakCounter } from './components/StreakCounter';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { FlashcardEngine } from './components/FlashcardEngine';
import { KnowledgeSprint } from './components/KnowledgeSprint';
import { AuthPage } from './components/AuthPage';
import { PomodoroTimer } from './components/PomodoroTimer';
import { StudyStats } from './components/StudyStats';
import { DailyGoals } from './components/DailyGoals';
import { QuickStudyActions } from './components/QuickStudyActions';
import { HISTORIA_GOIAS } from './constants';
import { User as UserType } from './types';
import { Layout, Search, Settings, User as UserIcon, Bell, ChevronRight, GraduationCap, LogOut, Zap, Timer, Target, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ActiveSection = 'overview' | 'study' | 'focus' | 'notifications' | 'settings';
type NotificationCategory = 'study' | 'reminder' | 'system';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationCategory;
  read: boolean;
}

const MOCK_FLASHCARDS = [
  { id: 'f1', category: 'Legislação', question: "Qual a idade mínima para ser Deputado Estadual na ALEGO?", answer: "21 anos completos até a posse." },
  { id: 'f2', category: 'História', question: "Quem foi o fundador simbólico de Goiânia?", answer: "Pedro Ludovico Teixeira (Inaugurada em 1942)." },
  { id: 'f3', category: 'Informática', question: "O que significa RBAC em sistemas de segurança?", answer: "Role-Based Access Control (Controle de acesso baseado em papéis)." },
  { id: 'f4', category: 'Legislação', question: "Quantos Deputados compõem a ALEGO?", answer: "41 Deputados Estaduais." },
  { id: 'f5', category: 'RLM', question: "Se P → Q é verdadeiro e P é verdadeiro, qual o valor de Q?", answer: "Q é verdadeiro (Modus Ponens)." },
  { id: 'f6', category: 'Português', question: "Qual a diferença entre 'a fim de' e 'afim'?", answer: "'A fim de' = finalidade. 'Afim' = semelhante, parente." },
  { id: 'f7', category: 'História', question: "Em que ano foi promulgada a Constituição Estadual de Goiás?", answer: "1989 (5 de outubro de 1989)." },
  { id: 'f8', category: 'Legislação', question: "Qual o quórum para aprovar Lei Complementar na ALEGO?", answer: "Maioria absoluta (21 deputados)." },
  { id: 'f9', category: 'Informática', question: "O que é um ataque de SQL Injection?", answer: "Inserção de código SQL malicioso em inputs para manipular banco de dados." },
  { id: 'f10', category: 'RLM', question: "Qual a negação de 'Todo A é B'?", answer: "'Existe A que não é B' ou 'Algum A não é B'." },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Resumo liberado: Constituição Estadual',
    message: 'Nova versão com comentários dos artigos 50 a 65 já disponível.',
    time: 'Há 2 horas',
    type: 'study',
    read: false,
  },
  {
    id: 'n2',
    title: 'Sprint do dia',
    message: 'Você tem 3 cartões de informática atrasados. Reforce o ciclo de repetição.',
    time: 'Há 5 horas',
    type: 'reminder',
    read: false,
  },
  {
    id: 'n3',
    title: 'Configuração sincronizada',
    message: 'Suas preferências foram sincronizadas entre os dispositivos.',
    time: 'Ontem',
    type: 'system',
    read: true,
  },
];

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [studyPreferences, setStudyPreferences] = useState({
    reminderChannel: 'push',
    reminderTime: '18:00',
    focusMode: 'equilibrado',
    emailAlerts: true,
    pushAlerts: true,
  });

  // Study Stats State
  const [totalXP, setTotalXP] = useState(() => {
    const saved = localStorage.getItem('alego_xp');
    return saved ? parseInt(saved, 10) : 250;
  });
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [studyMinutesToday, setStudyMinutesToday] = useState(0);
  const [pomodoroSessions, setPomodoroSessions] = useState(0);

  const level = Math.floor(totalXP / 500) + 1;

  // Persist XP
  useEffect(() => {
    localStorage.setItem('alego_xp', totalXP.toString());
  }, [totalXP]);

  const handleXPGain = useCallback((xp: number) => {
    setTotalXP((prev) => prev + xp);
  }, []);

  const handlePomodoroComplete = useCallback((mode: 'focus' | 'shortBreak' | 'longBreak') => {
    if (mode === 'focus') {
      setPomodoroSessions((prev) => prev + 1);
      setStudyMinutesToday((prev) => prev + 25);
      handleXPGain(50); // 50 XP por sessão Pomodoro
    }
  }, [handleXPGain]);

  const handleFlashcardSession = useCallback((stats: { total: number; correct: number; wrong: number; streak: number }) => {
    setCardsReviewed((prev) => prev + stats.total);
    setCorrectAnswers((prev) => prev + stats.correct);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('alego_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    localStorage.setItem('alego_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('alego_user');
  };

  const handleUserUpdate = (updates: Partial<UserType>) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('alego_user', JSON.stringify(updated));
      return updated;
    });
  };

  const unreadNotifications = notifications.filter((notification) => !notification.read).length;
  const sectionLabels: Record<ActiveSection, string> = {
    overview: 'Painel Geral',
    study: 'Modo de Estudo',
    focus: 'Modo Foco',
    notifications: 'Alertas & Insights',
    settings: 'Preferências',
  };

  const notificationIconMap: Record<NotificationCategory, LucideIcon> = {
    study: GraduationCap,
    reminder: Bell,
    system: Settings,
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
  };

  const navItems: Array<{
    id: ActiveSection;
    icon: LucideIcon;
    label: string;
    desktopOnly?: boolean;
    badge?: number;
  }> = [
    { id: 'overview', icon: Layout, label: 'Painel' },
    { id: 'study', icon: GraduationCap, label: 'Estudos' },
    { id: 'focus', icon: Timer, label: 'Foco' },
    { id: 'notifications', icon: Bell, label: 'Alertas', badge: unreadNotifications },
    { id: 'settings', icon: Settings, label: 'Configurações', desktopOnly: true },
  ];

  if (loading) return null;

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar Navigation - Responsive: Sidebar on Desktop, Bottom Bar on Mobile */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-slate-200 flex flex-row items-center justify-around px-4 z-50 md:top-0 md:left-0 md:h-full md:w-20 md:border-r md:border-t-0 md:flex-col md:py-8 md:gap-10">
        <div className="hidden md:flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
          A
        </div>
        <div className="flex flex-row md:flex-col gap-2 md:gap-6 items-center w-full justify-around md:justify-start">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative p-3 rounded-xl transition-all ${item.desktopOnly ? 'hidden md:flex' : 'flex'} ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 shadow-sm shadow-indigo-100'
                    : 'text-slate-400 hover:text-indigo-500 hover:bg-slate-100'
                }`}
                aria-label={item.label}
              >
                <Icon size={24} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] px-1 text-[10px] font-bold rounded-full bg-red-500 text-white text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <button 
            onClick={handleLogout}
            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Sair"
          >
            <LogOut size={24} />
          </button>
        </div>
        <div className="hidden md:flex mt-auto flex-col gap-4 items-center">
          <button className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
             <UserIcon size={20} className="text-indigo-600" />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pb-20 md:pb-0 md:pl-20 min-h-screen transition-all">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">ALEGO <span className="text-indigo-600">MASTER</span></h1>
            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-500 border border-slate-200">
              {sectionLabels[activeSection]}
            </span>
            <div className="hidden lg:flex items-center bg-slate-100 px-4 py-2 rounded-full border border-slate-200 w-80">
              <Search className="text-slate-400 w-4 h-4 mr-2" />
              <input type="text" placeholder="Buscar lei, história ou RLM..." className="bg-transparent text-sm w-full outline-none text-slate-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            <div className="text-right hidden lg:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Foco Atual</p>
              <p className="text-xs font-bold text-slate-800">{currentUser.targetRole}</p>
            </div>
            <StreakCounter count={currentUser.streak} />
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-10 space-y-8 md:space-y-12">
          {activeSection === 'overview' && (
            <>
              {/* Hero com Stats Rápidos */}
              <section>
                <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                            Nível {level}
                          </span>
                          <span className="px-3 py-1 bg-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <Zap className="w-3 h-3" /> {totalXP} XP
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black mb-2">Bom dia, {currentUser.name.split(' ')[0]}!</h2>
                        <p className="text-indigo-100 text-sm md:text-base max-w-md">
                          Continue focado em <span className="font-bold text-white">{currentUser.targetRole}</span>. Você está indo muito bem!
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveSection('focus')}
                        className="w-full lg:w-auto px-6 py-4 bg-white text-indigo-700 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <Timer className="w-5 h-5" /> Iniciar Sessão de Foco
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-4 h-4 text-indigo-200" />
                          <span className="text-xs text-indigo-200 font-semibold">Cartões Hoje</span>
                        </div>
                        <p className="text-2xl font-black">{cardsReviewed}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Timer className="w-4 h-4 text-indigo-200" />
                          <span className="text-xs text-indigo-200 font-semibold">Pomodoros</span>
                        </div>
                        <p className="text-2xl font-black">{pomodoroSessions}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-indigo-200" />
                          <span className="text-xs text-indigo-200 font-semibold">Acertos</span>
                        </div>
                        <p className="text-2xl font-black">{cardsReviewed > 0 ? Math.round((correctAnswers / cardsReviewed) * 100) : 0}%</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-indigo-200" />
                          <span className="text-xs text-indigo-200 font-semibold">Minutos</span>
                        </div>
                        <p className="text-2xl font-black">{studyMinutesToday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Actions + Daily Goals */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                <QuickStudyActions onActionClick={(id) => {
                  if (id === 'flashcards') setActiveSection('study');
                  else if (id === 'simulado') setActiveSection('focus');
                }} />
                <DailyGoals />
              </section>

              {/* Sprint + Stats */}
              <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                <div className="xl:col-span-2">
                  <KnowledgeSprint />
                </div>
                <StudyStats
                  totalXP={totalXP}
                  level={level}
                  cardsReviewed={cardsReviewed}
                  correctAnswers={correctAnswers}
                  studyMinutesToday={studyMinutesToday}
                  weeklyGoal={300}
                  weeklyProgress={studyMinutesToday + 85}
                />
              </section>

              {/* Flashcards + Timeline */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
                  <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                    <GraduationCap className="text-indigo-600" /> Revisão Rápida
                  </h3>
                  <FlashcardEngine 
                    cards={MOCK_FLASHCARDS.slice(0, 5)} 
                    onXPGain={handleXPGain}
                    onSessionComplete={handleFlashcardSession}
                  />
                </div>
                <InteractiveTimeline events={HISTORIA_GOIAS} />
              </section>

              {/* Dashboard */}
              <section>
                <StudyDashboard />
              </section>
            </>
          )}

          {activeSection === 'study' && (
            <div className="space-y-8">
              {/* Header da Seção */}
              <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black mb-2">Sessão de Estudo</h2>
                    <p className="text-emerald-100 text-sm">Revise seus cartões e pratique português</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white/20 rounded-xl text-sm font-bold">
                      {cardsReviewed} cartões revisados
                    </div>
                  </div>
                </div>
              </section>

              {/* Conteúdo Principal */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
                  <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                    <Brain className="text-indigo-600" /> Flashcards Completos
                  </h3>
                  <FlashcardEngine 
                    cards={MOCK_FLASHCARDS} 
                    onXPGain={handleXPGain}
                    onSessionComplete={handleFlashcardSession}
                  />
                </div>
                <div className="space-y-6">
                  <StudyStats
                    totalXP={totalXP}
                    level={level}
                    cardsReviewed={cardsReviewed}
                    correctAnswers={correctAnswers}
                    studyMinutesToday={studyMinutesToday}
                    weeklyGoal={300}
                    weeklyProgress={studyMinutesToday + 85}
                  />
                  <InteractiveTimeline events={HISTORIA_GOIAS} />
                </div>
              </section>

              {/* Sprint */}
              <section>
                <KnowledgeSprint />
              </section>
            </div>
          )}

          {activeSection === 'focus' && (
            <div className="space-y-8">
              {/* Header Modo Foco */}
              <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    <Timer className="w-4 h-4" /> Modo Foco Ativo
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-2">Concentração Total</h2>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Elimine distrações e maximize seu aprendizado com sessões Pomodoro
                  </p>
                </div>
              </section>

              {/* Timer + Flashcards */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PomodoroTimer onSessionComplete={handlePomodoroComplete} />
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
                  <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                    <Brain className="text-indigo-600" /> Revisão Durante o Foco
                  </h3>
                  <FlashcardEngine 
                    cards={MOCK_FLASHCARDS} 
                    onXPGain={handleXPGain}
                    onSessionComplete={handleFlashcardSession}
                  />
                </div>
              </section>

              {/* Metas + Stats */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DailyGoals />
                <StudyStats
                  totalXP={totalXP}
                  level={level}
                  cardsReviewed={cardsReviewed}
                  correctAnswers={correctAnswers}
                  studyMinutesToday={studyMinutesToday}
                  weeklyGoal={300}
                  weeklyProgress={studyMinutesToday + 85}
                />
              </section>
            </div>
          )}

          {activeSection === 'notifications' && (
            <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-1">Central de Alertas</h2>
                  <p className="text-sm text-slate-500">Monitoramos seus lembretes, releases e sincronizações.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleMarkNotificationsRead}
                    disabled={!unreadNotifications}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      unreadNotifications
                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
                        : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    Marcar como lidas
                  </button>
                  <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-sm font-semibold">
                    {unreadNotifications} pendente(s)
                  </span>
                </div>
              </div>
              <ul className="divide-y divide-slate-100">
                {notifications.map((notification) => {
                  const Icon = notificationIconMap[notification.type];
                  return (
                    <li
                      key={notification.id}
                      className={`py-5 flex items-start gap-4 ${notification.read ? 'opacity-60' : ''}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          notification.type === 'study'
                            ? 'bg-indigo-50 text-indigo-600'
                            : notification.type === 'reminder'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <p className="text-base font-semibold text-slate-800">{notification.title}</p>
                          <span className="text-xs font-semibold text-slate-400">{notification.time}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{notification.message}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {activeSection === 'settings' && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 space-y-4">
                <h3 className="text-lg font-black text-slate-800">Perfil</h3>
                <label className="text-sm font-semibold text-slate-500">
                  Nome
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => handleUserUpdate({ name: e.target.value })}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-500">
                  E-mail
                  <input
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => handleUserUpdate({ email: e.target.value })}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-500">
                  Objetivo
                  <select
                    value={currentUser.targetRole}
                    onChange={(e) => handleUserUpdate({ targetRole: e.target.value })}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    <option value="Consultor Legislativo">Consultor Legislativo</option>
                    <option value="Policial Legislativo">Policial Legislativo</option>
                    <option value="Analista Parlamentar">Analista Parlamentar</option>
                    <option value={currentUser.targetRole}>Outro objetivo ({currentUser.targetRole})</option>
                  </select>
                </label>
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 space-y-6">
                <h3 className="text-lg font-black text-slate-800">Preferências de Estudo</h3>
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Canal de lembrete</label>
                  <div className="flex gap-3">
                    {['push', 'email'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setStudyPreferences((prev) => ({ ...prev, reminderChannel: option }))}
                        className={`flex-1 px-4 py-3 rounded-2xl border font-semibold capitalize ${
                          studyPreferences.reminderChannel === option
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                            : 'border-slate-200 text-slate-500'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Horário Preferido</label>
                  <input
                    type="time"
                    value={studyPreferences.reminderTime}
                    onChange={(e) => setStudyPreferences((prev) => ({ ...prev, reminderTime: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Intensidade</label>
                  <select
                    value={studyPreferences.focusMode}
                    onChange={(e) => setStudyPreferences((prev) => ({ ...prev, focusMode: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    <option value="equilibrado">Equilibrado (ideal)</option>
                    <option value="intenso">Intenso (simulados diários)</option>
                    <option value="leve">Leve (1h/dia)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Alertas</label>
                  <div className="flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200">
                    <span className="text-sm font-semibold text-slate-600">E-mail</span>
                    <input
                      type="checkbox"
                      checked={studyPreferences.emailAlerts}
                      onChange={(e) => setStudyPreferences((prev) => ({ ...prev, emailAlerts: e.target.checked }))}
                      className="w-5 h-5 accent-indigo-600"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200">
                    <span className="text-sm font-semibold text-slate-600">Push</span>
                    <input
                      type="checkbox"
                      checked={studyPreferences.pushAlerts}
                      onChange={(e) => setStudyPreferences((prev) => ({ ...prev, pushAlerts: e.target.checked }))}
                      className="w-5 h-5 accent-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
        
        <footer className="py-12 px-10 border-t border-slate-200 text-center mb-16 md:mb-0">
          <p className="text-slate-400 text-xs md:text-sm font-medium">© 2024 ALEGO Master - Perfil de {currentUser.name}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
