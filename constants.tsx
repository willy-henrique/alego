import { TimelineEvent, AlegoPermission, Flashcard } from './types';

export const HISTORIA_GOIAS: TimelineEvent[] = [
  { year: 1748, title: "Criação da Capitania de Goiás", description: "Desmembramento da Capitania de São Paulo.", context: "Início da autonomia administrativa da região mineradora." },
  { year: 1889, title: "Proclamação da República em Goiás", description: "Adesão ao movimento republicano nacional.", context: "Transição do regime monárquico para o republicano." },
  { year: 1933, title: "Lançamento da Pedra Fundamental de Goiânia", description: "O projeto de Pedro Ludovico Teixeira ganha vida.", context: "A Marcha para o Oeste e a modernização de Goiás." },
  { year: 1942, title: "Inauguração de Goiânia", description: "Nova capital do estado começa a funcionar.", context: "Batismo cultural com a presença de artistas e intelectuais." },
  { year: 1988, title: "Constituição Federal", description: "Promulgação da Constituição Cidadã.", context: "Base para a nova Constituição Estadual de Goiás." },
  { year: 1989, title: "Constituição Estadual de Goiás", description: "Adaptação à nova ordem democrática nacional.", context: "Consolidação dos direitos e deveres do cidadão goiano." },
  { year: 2023, title: "Sede Nova da ALEGO", description: "Inauguração do Palácio Maguito Vilela.", context: "Modernização das instalações legislativas." }
];

export const FLASHCARDS_BANCO: Flashcard[] = [
  // Legislação
  { id: 'leg1', category: 'Legislação', question: "Qual a idade mínima para ser Deputado Estadual?", answer: "21 anos completos até a data da posse.", difficulty: 'easy' },
  { id: 'leg2', category: 'Legislação', question: "Quantos Deputados compõem a ALEGO?", answer: "41 Deputados Estaduais.", difficulty: 'easy' },
  { id: 'leg3', category: 'Legislação', question: "Qual o quórum para aprovar Lei Complementar?", answer: "Maioria absoluta (21 deputados).", difficulty: 'medium' },
  { id: 'leg4', category: 'Legislação', question: "Qual o quórum para aprovar Emenda à Constituição Estadual?", answer: "3/5 dos deputados (25), em dois turnos.", difficulty: 'hard' },
  { id: 'leg5', category: 'Legislação', question: "Quem pode propor Lei Complementar?", answer: "Qualquer deputado, Governador, TCE, MP, TJ (nas suas competências) e cidadãos (iniciativa popular).", difficulty: 'medium' },
  
  // História
  { id: 'hist1', category: 'História', question: "Quem foi o fundador simbólico de Goiânia?", answer: "Pedro Ludovico Teixeira (interventor federal).", difficulty: 'easy' },
  { id: 'hist2', category: 'História', question: "Em que ano foi promulgada a Constituição Estadual de Goiás?", answer: "5 de outubro de 1989.", difficulty: 'easy' },
  { id: 'hist3', category: 'História', question: "Qual era a capital de Goiás antes de Goiânia?", answer: "Cidade de Goiás (antiga Vila Boa).", difficulty: 'easy' },
  { id: 'hist4', category: 'História', question: "Quando Goiás foi desmembrado de São Paulo?", answer: "1748, criação da Capitania de Goiás.", difficulty: 'medium' },
  
  // RLM
  { id: 'rlm1', category: 'RLM', question: "Se P → Q é verdadeiro e P é verdadeiro, qual o valor de Q?", answer: "Q é verdadeiro (Modus Ponens).", difficulty: 'easy' },
  { id: 'rlm2', category: 'RLM', question: "Qual a negação de 'Todo A é B'?", answer: "'Existe A que não é B' ou 'Algum A não é B'.", difficulty: 'medium' },
  { id: 'rlm3', category: 'RLM', question: "O que é uma tautologia?", answer: "Proposição composta sempre verdadeira, independente dos valores de suas componentes.", difficulty: 'medium' },
  { id: 'rlm4', category: 'RLM', question: "Qual a equivalência de ~(P ∧ Q)?", answer: "~P ∨ ~Q (Lei de De Morgan).", difficulty: 'medium' },
  { id: 'rlm5', category: 'RLM', question: "P → Q é equivalente a qual proposição?", answer: "~P ∨ Q (também ~Q → ~P, contrapositiva).", difficulty: 'hard' },
  
  // Informática
  { id: 'info1', category: 'Informática', question: "O que significa RBAC?", answer: "Role-Based Access Control (Controle de acesso baseado em papéis).", difficulty: 'easy' },
  { id: 'info2', category: 'Informática', question: "O que é um ataque de SQL Injection?", answer: "Inserção de código SQL malicioso em inputs para manipular banco de dados.", difficulty: 'medium' },
  { id: 'info3', category: 'Informática', question: "O que é criptografia assimétrica?", answer: "Usa par de chaves (pública e privada) para cifrar/decifrar dados.", difficulty: 'medium' },
  { id: 'info4', category: 'Informática', question: "O que é phishing?", answer: "Golpe que usa comunicações fraudulentas para obter dados sensíveis.", difficulty: 'easy' },
  
  // Português
  { id: 'port1', category: 'Português', question: "Qual a diferença entre 'a fim de' e 'afim'?", answer: "'A fim de' = finalidade. 'Afim' = semelhante, parente.", difficulty: 'easy' },
  { id: 'port2', category: 'Português', question: "Quando usar 'há' e 'a' com sentido de tempo?", answer: "'Há' = tempo passado. 'A' = tempo futuro.", difficulty: 'easy' },
  { id: 'port3', category: 'Português', question: "O que é próclise?", answer: "Colocação do pronome oblíquo átono ANTES do verbo.", difficulty: 'medium' },
  { id: 'port4', category: 'Português', question: "O verbo 'fazer' indicando tempo é pessoal ou impessoal?", answer: "Impessoal (fica no singular): 'Faz dois anos que...'.", difficulty: 'medium' },
];

export const ALEGO_RBAC: AlegoPermission[] = [
  { resource: "LEI_ESTADUAL", action: "PROPOR", scope: "DEPUTADO", description: "Iniciativa de leis ordinárias e complementares." },
  { resource: "ORCAMENTO_ANUAL", action: "FISCALIZAR", scope: "ASSEMBLEIA", description: "Controle externo sobre as contas do Executivo." },
  { resource: "CARGOS_COMISSIONADOS", action: "NOMEAR", scope: "MESA_DIRETORA", description: "Gestão do quadro de pessoal interno." },
  { resource: "PEDIDO_INFORMACAO", action: "REQUISITAR", scope: "COMISSOES", description: "Solicitação formal de documentos a Secretários de Estado." }
];

export const INITIAL_TASKS = [
  { id: '1', title: 'Revisar Resolução 1.073 (Regimento)', category: 'Legislação', completed: false, priority: 'alta' },
  { id: '2', title: 'Simulado de Tabela-Verdade', category: 'RLM', completed: true, priority: 'media' },
  { id: '3', title: 'História: Era Pedro Ludovico', category: 'História', completed: false, priority: 'baixa' },
];
