/**
 * Conteúdo do PDI — espelha as KBs de Carreira no Notion.
 *
 * Fontes de verdade (P0):
 *  - PDI Atual — Marcus Romano — Baseline LinkedIn — 2026-07-28
 *  - Perfil Profissional Atual — Marcus Romano
 * Apoio (P1):
 *  - Matriz de Competências de Engenharia de Software
 *  - Playbook — Banca Trimestral de PDI
 *  - Skill — Revisar Evolução e Recalibrar PDI
 *
 * RECALIBRAÇÃO 2026-07-28 — autonomia limitada para criar backlog novo.
 * O ciclo foi concentrado em três objetivos executáveis dentro das demandas
 * já atribuídas. SDD, observabilidade, SRE, AWS, FinOps e engenharia agêntica
 * são métodos e lentes de desenvolvimento, não carreiras paralelas.
 *
 * Ao atualizar o PDI no Notion, atualize este arquivo e a data em `governance`.
 */
window.PDI_DATA = {
  profile: {
    name: 'Marcus Romano',
    role: 'Analista de Engenharia TI Pleno',
    company: 'Itaú Unibanco',
    track: 'Senior Software Engineer IC',
    edge: 'Arquitetura de integração + Engenharia agêntica',
    horizon: 'Staff / Platform / Architecture',
    headline: 'Software Engineer · Fullstack · Cloud · Architecture · AI Engineering',
    photo: 'https://drive.google.com/thumbnail?id=1aWqj5boLiQyLnT8GMYeo-1XtkXYNy4wy&sz=w1000',
    photoFallback: 'https://avatars.githubusercontent.com/u/77813458?v=4'
  },

  cycle: {
    label: 'Ciclo 90 dias · 2026 Q3',
    startDate: '2026-07-28',
    lengthDays: 90
  },

  governance: {
    baseline: 'Perfil do LinkedIn fornecido em 28/07/2026',
    updatedAt: '2026-07-28',
    note:
      'Recalibrado para três objetivos executáveis dentro do backlog existente. Impacto, prontidão e alcance continuam dependendo de evidências do trabalho real e de feedback da liderança.',
    notionUrl: 'https://app.notion.com/p/3acff07cc1f1818e9469ef9628ae76d7'
  },

  objective:
    'Evoluir para Senior Software Engineer IC em sistemas corporativos críticos, consolidando julgamento arquitetural, ownership operacional e influência técnica, com SDD e engenharia agêntica como métodos para elevar qualidade, consistência e escala.',

  constraint: {
    title: 'Restrição assumida: autonomia limitada de backlog',
    text:
      'Não há autonomia total para definir novas iniciativas. Neste ciclo, a evolução será demonstrada pela qualidade das decisões, pelo ownership e pelo impacto produzido dentro do escopo disponível, buscando ampliar autonomia progressivamente. Cada objetivo começa com uma ação individual e evolui mediante alinhamento com o time.'
  },

  pillars: [
    'Transformar amplitude técnica em julgamento e rigor consistentes',
    'Compreender sistemas críticos em operação, risco, segurança e custo',
    'Multiplicar capacidade por comunicação, documentação e métodos reutilizáveis'
  ],

  positioning: [
    {
      index: '01',
      kicker: 'Base comprovada',
      tag: 'Pleno',
      variant: 'now',
      text: 'Arquitetura e integração de sistemas corporativos críticos: .NET, Angular, microfrontends, Web Components, SignalR, AWS, Terraform, autenticação, segurança e prevenção de fraudes.'
    },
    {
      index: '02',
      kicker: 'Próximo nível',
      tag: 'Senior IC',
      variant: 'target',
      text: 'Decisões com trade-offs explícitos, ownership após o deploy, leitura operacional por dados e comunicação que melhora o resultado de outras pessoas.'
    },
    {
      index: '03',
      kicker: 'Diferenciação e horizonte',
      tag: 'Staff / Platform',
      variant: 'horizon',
      text: 'SDD e engenharia agêntica governada como mecanismos de consistência e escala; no médio prazo, padrões e plataformas adotados em múltiplos contextos.'
    }
  ],

  stack: [
    'C# / .NET', 'Angular', 'TypeScript', 'Microfrontends', 'Web Components',
    'SignalR', 'AWS', 'Terraform', 'ECS · Lambda · S3', 'Datadog',
    'GitHub Actions', 'Jenkins', 'SQL / NoSQL'
  ],

  edgeStack: [
    { n: '01', text: 'Arquitetura e integração como base profissional comprovada' },
    { n: '02', text: 'Spec-Driven Development para explicitar problema, alternativas e critérios antes do código' },
    { n: '03', text: 'Agentes, skills e KBs avaliados por casos de teste, baseline e limites conhecidos' },
    { n: '04', text: 'Confiabilidade, segurança, risco, produto e custo como lentes de decisão' }
  ],

  exclusions: [
    'Esperar uma iniciativa ideal para começar a demonstrar evolução',
    'Transformar SRE, FinOps, cloud e IA em trilhas profissionais paralelas neste ciclo',
    'Acumular certificações ou estudos sem aplicação no trabalho atual',
    'Confundir volume de entregas ou documentos com impacto e senioridade',
    'Tratar promoção ou cargo como resultado diretamente controlável',
    'Priorizar Go ou performance sem demanda real que justifique aplicação imediata'
  ],

  tracks: [
    {
      id: 'soft',
      name: 'Comunicação e soft skills',
      why: 'Clareza, escuta, negociação e feedback transformam conhecimento individual em decisões coletivas melhores.',
      start: 'Registrar a próxima decisão técnica de forma que outra pessoa consiga compreender problema, alternativas e recomendação.',
      evidence: 'Documento de decisão, feedback objetivo e exemplo de alinhamento ou execução melhorada.',
      goal: 'pessoas'
    },
    {
      id: 'architecture',
      name: 'Arquitetura e integração',
      why: 'É a base já comprovada do perfil e deve evoluir de repertório técnico para julgamento explícito de trade-offs.',
      start: 'Mapear contratos, dependências, riscos, segurança e alternativas da próxima demanda relevante.',
      evidence: 'Spec, ADR leve, decisão de integração e revisão pós-produção.',
      goal: 'padrao'
    },
    {
      id: 'sdd',
      name: 'Spec-Driven Development',
      why: 'SDD é o método para tornar raciocínio, critérios e riscos verificáveis antes da implementação.',
      start: 'Escrever uma spec curta na próxima demanda atribuída antes de abrir a implementação.',
      evidence: 'Duas specs, critérios de aceite e alternativas descartadas com justificativa.',
      goal: 'padrao'
    },
    {
      id: 'obs',
      name: 'Observabilidade e SRE',
      why: 'Ownership continua após o deploy e exige responder perguntas operacionais com sinais reais.',
      start: 'Listar as perguntas que hoje não podem ser respondidas durante uma falha do serviço escolhido.',
      evidence: 'Mapa de sinais, SLIs medidos, lacuna priorizada e recomendação de melhoria.',
      goal: 'plataforma'
    },
    {
      id: 'cloud',
      name: 'AWS, segurança e infraestrutura',
      why: 'Decisões de aplicação precisam considerar topologia, permissões, resiliência, capacidade e pontos de falha.',
      start: 'Desenhar a topologia sanitizada do serviço e identificar suas dependências e riscos principais.',
      evidence: 'Topologia, revisão de IaC ou permissões e risco técnico explicitado.',
      goal: 'plataforma'
    },
    {
      id: 'finops',
      name: 'FinOps e visão de negócio',
      why: 'Custo é uma das lentes de decisão, junto de segurança, risco operacional, jornada do cliente e custo da falha.',
      start: 'Identificar quais dados de custo, uso ou esforço operacional estão disponíveis e qual decisão eles poderiam melhorar.',
      evidence: 'Estimativa permitida, hipótese de otimização e trade-off documentado.',
      goal: 'plataforma'
    },
    {
      id: 'agentic',
      name: 'Engenharia agêntica',
      why: 'Agentes geram diferenciação quando melhoram consistência e capacidade sem ocultar falhas, riscos ou limites.',
      start: 'Selecionar uma etapa repetitiva e definir três casos de teste antes de criar ou ajustar uma skill ou KB.',
      evidence: 'Artefato versionado, casos de teste, baseline, limites e reutilização quando houver oportunidade.',
      goal: 'pessoas'
    }
  ],

  goals: [
    {
      id: 'padrao',
      index: '01',
      tag: 'Julgamento',
      title: 'Julgamento técnico e rigor de execução',
      summary:
        'Transformar amplitude técnica em um método consistente de decisão: compreender o problema, explicitar alternativas, implementar com critérios claros e acompanhar o resultado após o deploy.',
      dimensions: ['entrega', 'arquitetura', 'tecnica'],
      scopeHint:
        'Aplicar o método em duas demandas já atribuídas. Escolher pelo menos uma com risco, integração ou impacto relevante.',
      actions: [
        'Selecionar duas demandas do backlog existente e registrar problema, usuário afetado, riscos e critério de pronto.',
        'Escrever uma spec curta antes da implementação em cada demanda.',
        'Registrar alternativas e trade-offs de arquitetura, integração, segurança, operação e evolução.',
        'Acompanhar pelo menos um indicador técnico ou operacional após o deploy.',
        'Produzir uma revisão curta com resultado, limitação, aprendizado e próximo passo.'
      ],
      proofs: [
        'Duas specs escritas antes da implementação',
        'Ao menos um registro explícito de alternativas e trade-offs',
        'Indicador acompanhado após o deploy',
        'Revisão pós-produção',
        'Feedback de um par sobre clareza ou qualidade da decisão'
      ],
      success:
        'O ciclo demonstra que especificação, decisão e acompanhamento deixaram de ser ações ocasionais e se tornaram um método repetível dentro do backlog existente.'
    },
    {
      id: 'plataforma',
      index: '02',
      tag: 'Ownership',
      title: 'Ownership operacional de um serviço',
      summary:
        'Compreender um serviço sob responsabilidade em operação, risco, segurança e custo, usando observabilidade, SRE, AWS e FinOps como lentes integradas — não como trilhas independentes.',
      dimensions: ['confiabilidade', 'produto', 'tecnica'],
      scopeHint:
        'Escolher um único serviço como laboratório. Profundidade em um contexto vale mais do que cobertura superficial de vários serviços.',
      actions: [
        'Mapear topologia, dependências, permissões relevantes, pontos de falha e sinais existentes.',
        'Definir duas ou três perguntas operacionais importantes e medir pelo menos dois SLIs disponíveis.',
        'Relacionar o comportamento técnico a risco operacional, segurança, jornada do cliente ou esforço do time.',
        'Construir uma visão inicial de custo, capacidade ou consumo com os dados permitidos pelo contexto.',
        'Priorizar uma lacuna e produzir uma recomendação de melhoria com benefício, risco e trade-off.'
      ],
      proofs: [
        'Mapa sanitizado de topologia, dependências e riscos',
        'Dois SLIs medidos ou perguntas operacionais respondidas com dados',
        'Relação explícita entre comportamento técnico e impacto',
        'Visão inicial de custo, capacidade ou esforço operacional',
        'Uma recomendação fundamentada de melhoria'
      ],
      success:
        'Marcus consegue explicar com dados como o serviço se comporta, quais riscos importam e qual melhoria deve ser priorizada. Dashboard novo, SLO, runbook e otimização de custo são stretch goals, não requisitos cumulativos.'
    },
    {
      id: 'pessoas',
      index: '03',
      tag: 'Influência',
      title: 'Influência técnica e multiplicação',
      summary:
        'Demonstrar que decisões, documentação e métodos de Marcus aumentam clareza, autonomia ou segurança de outras pessoas, sem depender de uma iniciativa transversal formal.',
      dimensions: ['comunicacao', 'colaboracao', 'escala'],
      scopeHint:
        'Usar decisões e aprendizados do trabalho atual. SDD, documentação e engenharia agêntica podem ser mecanismos de multiplicação.',
      actions: [
        'Produzir dois documentos técnicos que outra pessoa consiga utilizar sem explicação síncrona obrigatória.',
        'Conduzir uma sessão de design, troubleshooting ou compartilhamento durante o ciclo.',
        'Apoiar um colega em uma decisão ou competência ligada ao trabalho atual.',
        'Solicitar feedback objetivo sobre clareza, utilidade e mudança gerada.',
        'Quando houver oportunidade, avaliar uma skill, KB ou agente com três casos de teste e registrar limites antes de promover reutilização.'
      ],
      proofs: [
        'Dois documentos técnicos reutilizáveis',
        'Registro de uma sessão técnica',
        'Feedback objetivo recebido',
        'Exemplo de decisão ou execução melhorada por outra pessoa',
        'Como evidência estendida: artefato agêntico testado e reutilizado'
      ],
      success:
        'Há evidência concreta de que a atuação de Marcus melhorou uma decisão, execução ou capacidade além da própria entrega.'
    }
  ],

  phases: [
    {
      id: 'fase-1',
      from: 1,
      to: 15,
      title: 'Escolhas e baseline',
      items: [
        'Apresentar o PDI recalibrado à liderança',
        'Obter critérios internos de Pleno para Sênior',
        'Escolher duas demandas para o objetivo de rigor',
        'Escolher um serviço para o objetivo de ownership operacional',
        'Organizar de três a cinco casos anteriores como evidências',
        'Combinar checkpoints, feedbacks e possíveis sponsors'
      ]
    },
    {
      id: 'fase-2',
      from: 16,
      to: 45,
      title: 'Aplicação no trabalho real',
      items: [
        'Aplicar spec e trade-offs na primeira demanda',
        'Mapear topologia, dependências, riscos e sinais do serviço escolhido',
        'Definir perguntas operacionais e medir os primeiros SLIs',
        'Produzir o primeiro documento técnico reutilizável',
        'Conduzir a sessão técnica do ciclo',
        'Coletar feedback intermediário'
      ]
    },
    {
      id: 'fase-3',
      from: 46,
      to: 75,
      title: 'Repetição e profundidade',
      items: [
        'Repetir o método na segunda demanda',
        'Acompanhar indicador e concluir as revisões pós-produção',
        'Relacionar sinais técnicos a risco, segurança, produto ou custo',
        'Produzir e defender uma recomendação operacional',
        'Concluir o segundo documento reutilizável',
        'Avaliar skill ou agente como stretch goal, quando houver oportunidade'
      ]
    },
    {
      id: 'fase-4',
      from: 76,
      to: 90,
      title: 'Banca e decisão',
      items: [
        'Consolidar no máximo cinco evidências fortes',
        'Atualizar a matriz de competências com lastro',
        'Separar requisitos concluídos de stretch goals',
        'Realizar a banca de PDI',
        'Definir o ciclo seguinte com base em evidências e feedback'
      ]
    }
  ],

  scale: [
    { level: 0, label: 'Sem evidência suficiente' },
    { level: 1, label: 'Executa com orientação frequente' },
    { level: 2, label: 'Autonomia em escopo delimitado' },
    { level: 3, label: 'Ownership ponta a ponta e trade-offs' },
    { level: 4, label: 'Multiplica capacidade e estabelece padrões' },
    { level: 5, label: 'Impacto organizacional sustentável' }
  ],

  dimensions: [
    { id: 'tecnica', short: 'Técnica', name: '1. Profundidade técnica', target: 3, desc: 'Fundamentos, diagnóstico, qualidade, performance, segurança e escolhas técnicas.' },
    { id: 'arquitetura', short: 'Arquitetura', name: '2. Arquitetura e system design', target: 3, desc: 'Decompor problemas, modelar contratos, integrações, dados, falhas, escala, custo e evolução.' },
    { id: 'entrega', short: 'Ownership', name: '3. Entrega e ownership', target: 3, desc: 'Do problema à produção, risco, pós-release e responsabilidade por resultados.' },
    { id: 'confiabilidade', short: 'Operação', name: '4. Confiabilidade e operação', target: 3, desc: 'Observabilidade, SLIs, incidentes, capacidade, resiliência, segurança e melhoria pós-falha.' },
    { id: 'produto', short: 'Produto', name: '5. Produto, risco e negócio', target: 3, desc: 'Cliente, segurança, risco operacional, métricas, valor, custo da falha, custo de oportunidade e operação.' },
    { id: 'comunicacao', short: 'Influência', name: '6. Comunicação e influência', target: 3, desc: 'Clareza escrita e oral, decisões registradas, escuta, alinhamento e negociação de trade-offs.' },
    { id: 'colaboracao', short: 'Mentoria', name: '7. Colaboração e mentoria', target: 3, desc: 'Elevar colegas por feedback, onboarding, revisão, apoio recorrente e segurança para decidir.' },
    { id: 'escala', short: 'Escala org.', name: '8. Escala organizacional', target: 3, desc: 'Reuso, golden paths, padrões e adoção entre contextos. Nível 4 é stretch neste ciclo.' },
    { id: 'aprendizado', short: 'Aprendizado', name: '9. Aprendizado aplicado', target: 3, desc: 'Transformar estudo em experimento, entrega, decisão ou melhoria mensurável.' }
  ],

  matrixRule:
    'Cada nota exige ao menos uma evidência com contexto, ação, resultado e alcance. Ausência de evidência recebe 0 — nunca uma estimativa otimista.',
  matrixTransition:
    'Pleno → Sênior tende a exigir consistência próxima de 3 nas dimensões centrais. Nível 4 em influência, mentoria ou escala é sinal estendido e não requisito obrigatório deste ciclo.',

  indicators: [
    { id: 'ind-1', label: 'Método de rigor aplicado em duas demandas', hint: 'Objetivo 01 concluído', kind: 'goal', goal: 'padrao' },
    { id: 'ind-2', label: 'Serviço compreendido em operação e impacto', hint: 'Objetivo 02 concluído', kind: 'goal', goal: 'plataforma' },
    { id: 'ind-3', label: 'Influência técnica demonstrada', hint: 'Objetivo 03 concluído', kind: 'goal', goal: 'pessoas' },
    { id: 'ind-4', label: 'Duas evidências de influência ou multiplicação', hint: '2 evidências ligadas ao Objetivo 03', kind: 'evidenceByGoal', goal: 'pessoas', target: 2 },
    { id: 'ind-5', label: 'Cinco casos profissionais estruturados', hint: '5 evidências registradas', kind: 'evidenceCount', target: 5 },
    { id: 'ind-6', label: 'Dois checkpoints formais de feedback', hint: '2 checkpoints no diário', kind: 'checkpointCount', target: 2 },
    { id: 'ind-7', label: 'Banca final com decisão do próximo ciclo', hint: '1 checkpoint do tipo Banca', kind: 'bancaCount', target: 1 }
  ],

  horizons: [
    {
      id: 'h6',
      title: 'Metas de 6 meses',
      items: [
        'Aplicar problema → alternativas → decisão → pós-produção como rotina.',
        'Manter um portfólio de cinco a oito casos profissionais estruturados.',
        'Ter um serviço compreendido em observabilidade, risco, segurança e custo operacional.',
        'Ter SDD e ao menos um artefato agêntico avaliados como métodos pessoais de engenharia.',
        'Receber feedback explícito sobre prontidão, lacunas e oportunidades para o próximo nível.'
      ]
    },
    {
      id: 'h12',
      title: 'Metas de 12 meses',
      items: [
        'Demonstrar consistência compatível com Sênior, mesmo que a decisão formal dependa da organização.',
        'Sustentar decisões técnicas com confiabilidade, segurança, risco, custo e impacto de produto.',
        'Ser reconhecido por arquitetura e integração de sistemas críticos, com engenharia agêntica como diferenciação.',
        'Possuir sponsor e narrativa de progressão baseada em evidências.',
        'Decidir, com experiência real, entre Staff/Platform/Architecture, Tech Lead ou especialização mais profunda.'
      ]
    }
  ],

  leadershipQuestions: [
    { id: 'q1', text: 'Quais comportamentos e resultados diferenciam Pleno e Sênior no meu contexto?' },
    { id: 'q2', text: 'Quais aspectos da minha atuação atual já estão no próximo nível?' },
    { id: 'q3', text: 'Quais duas lacunas mais limitam minha progressão hoje?' },
    { id: 'q4', text: 'Dentro do backlog atual, onde posso assumir mais decisão e acompanhamento pós-produção?' },
    { id: 'q5', text: 'Quais evidências de impacto, risco ou influência têm mais valor na avaliação interna?' },
    { id: 'q6', text: 'Quem pode validar minhas evidências e atuar como sponsor?' }
  ],

  checkpointPrompts: [
    'O que mudou no período?',
    'Qual evidência ficou mais forte?',
    'Que hipótese foi refutada?',
    'O plano continua ligado ao trabalho real?',
    'Algum método virou apenas produção de artefato?',
    'Há excesso de escopo ou stretch goal tratado como obrigatório?',
    'O que a liderança precisa habilitar?'
  ],

  banca: {
    prep: 'Sete dias antes: atualizar perfil, matriz, objetivos, evidências e feedbacks. Selecionar no máximo cinco casos, separar requisitos de stretch goals e registrar as decisões necessárias.',
    people: 'Marcus; liderança direta ou sponsor; par técnico experiente; opcionalmente produto ou stakeholder.',
    agenda: [
      { min: 5, text: 'Contexto e objetivo da revisão' },
      { min: 15, text: 'Resultados e evidências' },
      { min: 10, text: 'Diagnóstico por competências' },
      { min: 10, text: 'Pareceres e contraditório' },
      { min: 10, text: 'Trilhas, restrições e oportunidades' },
      { min: 10, text: 'Decisões, apoios e próximos 90 dias' }
    ],
    decisions: [
      'Manter ou mudar a hipótese de trilha',
      'Concluir, revisar ou substituir cada objetivo',
      'Escolher onde aplicar o próximo ciclo dentro do backlog previsto',
      'Combinar o apoio necessário da liderança',
      'Definir evidências e data do próximo checkpoint'
    ]
  },

  links: [
    {
      kicker: 'Portfólio profissional',
      title: 'Projetos, trajetória e posicionamento técnico',
      text: 'Espaço complementar para consolidar cases, projetos independentes, stack, decisões e aprendizados relevantes.',
      cta: 'Abrir new-portfolio',
      href: 'https://github.com/marcusvrom/new-portfolio',
      featured: true
    },
    {
      kicker: 'GitHub',
      title: 'Repositórios como evidência contínua',
      text: 'Código, documentação, automações e experimentos que sustentam rigor, método e engenharia aplicada.',
      cta: 'Ver perfil',
      href: 'https://github.com/marcusvrom'
    },
    {
      kicker: 'Fonte de verdade',
      title: 'PDI Atual no Notion',
      text: 'Este site é a camada de execução. O plano aprovado, a matriz e os playbooks de banca vivem na base de conhecimento.',
      cta: 'Abrir no Notion',
      href: 'https://app.notion.com/p/3acff07cc1f1818e9469ef9628ae76d7'
    }
  ],

  scopes: ['Individual', 'Squad', 'Produto', 'Plataforma', 'Comunidade técnica', 'Organização'],
  confidences: ['Em construção', 'Boa', 'Forte'],
  goalStatuses: [
    { id: 'nao-iniciado', label: 'Não iniciado' },
    { id: 'em-andamento', label: 'Em andamento' },
    { id: 'em-risco', label: 'Em risco' },
    { id: 'concluido', label: 'Concluído' }
  ],
  checkpointTypes: ['Quinzenal', 'Mensal', 'Feedback de liderança', 'Banca']
};