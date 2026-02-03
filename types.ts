
export interface User {
  id: string;
  name: string;
  email: string;
  targetRole: string; // Ex: Consultor Legislativo, Policial Legislativo
  avatar?: string;
  streak: number;
  joinedAt: string;
}

export interface StudyTask {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  priority: 'baixa' | 'media' | 'alta';
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  context: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface RefactoringChallenge {
  id: string;
  original: string;
  explanation: string;
  correctVersion: string;
  hint: string;
}

export interface AlegoPermission {
  resource: string;
  action: string;
  scope: string;
  description: string;
}
