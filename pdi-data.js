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
 * Ao atualizar o PDI no Notion, atualize este arquivo e a data em `governance`.
 */
window.PDI_DATA = {
  profile: {
    name: 'Marcus Romano',
    role: 'Analista de Engenharia TI Pleno',
    company: 'Itaú Unibanco',
    track: 'Senior Software Engineer IC',
    edge: 'AI Engineering / Developer Productivity',
    horizon: 'Staff / Platform / Architecture',
    headline: 'Software Engineer · Fullstack · Cloud · AI Engineering',
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
    updatedAt: '2026-07-29',
    note:
      'Impacto, prontidão para promoção e alcance organizacional ainda precisam ser comprovados com evidências do trabalho real e feedback da liderança. Nada aqui vira nota sem evidência.',
    notionUrl: 'https://app.notion.com/p/3acff07cc1f1818e9469ef9628ae76d7'
  },

  objective:
    'Evoluir de Analista de Engenharia TI Pleno para atuação consistente no nível de Senior Software Engineer IC, consolidando ownership ponta a ponta, decisões sustentadas por evidências e multiplicação de capacidade.',

  pillars: [
    'Ownership ponta a ponta de sistemas corporativos críticos',
    'Decisões arquiteturais e operacionais sustentadas por evidências',
    'Multiplicação de capacidade por padrões, engenharia agêntica, documentação e mentoria'
  ],

  positioning: [
    {
      index: '01',
      kicker: 'Agora',
      tag: 'Pleno',
      variant: 'now',
      text: 'Fullstack e cloud em formalização digital: .NET, Angular, microfrontends, Web Components, SignalR, AWS, Terraform, observabilidade, autenticação e prevenção de fraudes.'
    },
    {
      index: '02',
      kicker: 'Próximo nível',
      tag: 'Senior IC',
      variant: 'target',
      text: 'Ownership do diagnóstico ao pós-produção, trade-offs registrados, operação acompanhada por métricas e influência além da própria entrega.'
    },
    {
      index: '03',
      kicker: 'Horizonte',
      tag: 'Staff / Platform',
      variant: 'horizon',
      text: 'Problemas transversais, golden paths, padrões reutilizáveis e arquitetura adotada por múltiplos times — condicionado à repetição de impacto.'
    }
  ],

  stack: [
    'C# / .NET', 'Angular', 'TypeScript', 'Microfrontends', 'Web Components',
    'SignalR', 'AWS', 'Terraform', 'ECS · Lambda · S3', 'Datadog',
    'GitHub Actions', 'Jenkins', 'SQL / NoSQL'
  ],

  edgeStack: [
    { n: '01', text: 'Agentes aplicados ao ciclo de engenharia (Claude, StackSpot, Devin)' },
    { n: '02', text: 'Skills e knowledge bases reutilizáveis por arquétipo de projeto' },
    { n: '03', text: 'Avaliação com casos de teste e critérios de qualidade' },
    { n: '04', text: 'Developer productivity medida por evidência, não por percepção' }
  ],

  exclusions: [
    'Acumular certificações sem aplicação',
    'Estudar várias tecnologias simultaneamente',
    'Iniciar projetos paralelos sem vínculo com impacto profissional',
    'Tratar promoção ou cargo como meta diretamente controlável',
    'Priorizar Go/performance sem demanda real que justifique aplicação imediata'
  ],

  goals: [
    {
      id: 'ownership',
      index: '01',
      tag: 'Impacto',
      title: 'Ownership de uma melhoria em sistema crítico',
      summary:
        'Conduzir uma melhoria relevante na formalização digital ou em outro sistema sob sua responsabilidade, do diagnóstico à avaliação pós-produção.',
      dimensions: ['entrega', 'arquitetura', 'confiabilidade'],
      actions: [
        'Até o dia 15, escolher a iniciativa com liderança ou sponsor e registrar problema, usuários afetados, riscos e critérios de sucesso.',
        'Definir de três a cinco indicadores permitidos pelo contexto (erro, falhas de integração, latência, disponibilidade, incidentes, retrabalho, tempo operacional).',
        'Liderar ou co-liderar design, implementação, testes, observabilidade, rollout e acompanhamento.',
        'Registrar trade-offs de arquitetura, segurança, integração e operação.',
        'Produzir uma revisão pós-implementação com resultado, limitações e próximos passos.'
      ],
      proofs: [
        'Documento de contexto e design',
        'Baseline e comparação posterior',
        'Dashboards, logs ou registros operacionais permitidos',
        'Decisão arquitetural ou técnica documentada',
        'Feedback de ao menos dois pares ou responsáveis pelo sistema',
        'Revisão pós-produção'
      ],
      success:
        'Uma melhoria concluída ou validada em produção, com impacto demonstrável e responsabilidade de Marcus claramente delimitada.'
    },
    {
      id: 'agents',
      index: '02',
      tag: 'Diferenciação',
      title: 'Padrão de engenharia agêntica reutilizável',
      summary:
        'Transformar o uso atual de Claude, StackSpot, Devin e agentes personalizados em um fluxo reutilizável, governado e avaliado por evidências.',
      dimensions: ['escala', 'aprendizado', 'tecnica'],
      scopeHint:
        'Escolher um único caso de uso: documentação técnica, investigação de falhas, revisão de código, skills e KBs por arquétipo, ou apoio a design técnico e testes.',
      actions: [
        'Definir o fluxo atual sem agente e seus principais problemas.',
        'Criar uma versão mínima com instruções, skill, KB ou agente reutilizável.',
        'Definir pelo menos três casos de teste representativos e critérios de qualidade.',
        'Comparar resultado assistido e baseline em qualidade, retrabalho, tempo ou consistência.',
        'Executar um piloto com pelo menos um usuário ou contexto além do criador.',
        'Registrar falhas, limitações, riscos e melhorias antes de ampliar adoção.'
      ],
      proofs: [
        'Artefato reutilizável versionado',
        'Casos de teste e resultados',
        'Documentação de uso e limites',
        'Feedback de piloto',
        'Decisão de manter, revisar, expandir ou encerrar',
        'Uma métrica ou evidência qualitativa validada de benefício'
      ],
      success:
        'Um fluxo de engenharia agêntica utilizado e avaliado fora do uso individual, sem depender apenas de percepção de produtividade.'
    },
    {
      id: 'influence',
      index: '03',
      tag: 'Influência',
      title: 'Influência técnica e desenvolvimento de outros engenheiros',
      summary:
        'Demonstrar que o conhecimento e as decisões de Marcus melhoram a capacidade de outras pessoas, não apenas as próprias entregas.',
      dimensions: ['comunicacao', 'colaboracao', 'escala'],
      actions: [
        'Conduzir ao menos uma sessão de design review, arquitetura, troubleshooting ou compartilhamento técnico por mês.',
        'Apoiar de forma recorrente pelo menos um colega em uma competência ligada ao trabalho atual.',
        'Criar ou atualizar um material que facilite onboarding, manutenção ou tomada de decisão.',
        'Solicitar feedback objetivo sobre clareza, utilidade e mudança gerada.',
        'Registrar exemplos em que outra pessoa ou time executou melhor, mais rápido ou com menor risco.'
      ],
      proofs: [
        'Agendas, documentos ou decisões das sessões',
        'Material reutilizável',
        'Feedback de colegas ou liderança',
        'Exemplo de decisão, entrega ou onboarding melhorado',
        'Relato separando contribuição individual e resultado coletivo'
      ],
      success:
        'Duas ou mais evidências de que Marcus ampliou autonomia, qualidade ou capacidade de outras pessoas durante o ciclo.'
    }
  ],

  phases: [
    {
      id: 'fase-1',
      from: 1,
      to: 15,
      title: 'Baseline e alinhamento',
      items: [
        'Apresentar este PDI à liderança',
        'Obter critérios internos de Pleno para Sênior',
        'Selecionar a iniciativa do Objetivo 1',
        'Selecionar um único caso de engenharia agêntica',
        'Organizar de três a cinco casos profissionais anteriores como evidências',
        'Combinar checkpoints e sponsors'
      ]
    },
    {
      id: 'fase-2',
      from: 16,
      to: 45,
      title: 'Execução e feedback intermediário',
      items: [
        'Executar a melhoria do sistema crítico',
        'Construir o protótipo ou fluxo agêntico',
        'Realizar sessões de influência e mentoria',
        'Coletar baseline e feedback intermediário',
        'Remover ou renegociar dependências'
      ]
    },
    {
      id: 'fase-3',
      from: 46,
      to: 75,
      title: 'Validação e exposição',
      items: [
        'Acompanhar resultado pós-implementação',
        'Realizar piloto do fluxo agêntico',
        'Ajustar documentação e testes',
        'Apresentar decisões e aprendizados',
        'Consolidar evidências de impacto e influência'
      ]
    },
    {
      id: 'fase-4',
      from: 76,
      to: 90,
      title: 'Banca e decisão',
      items: [
        'Fechar revisão pós-produção',
        'Avaliar o piloto agêntico',
        'Atualizar a matriz de competências',
        'Realizar banca de PDI',
        'Definir o ciclo seguinte com base nas evidências'
      ]
    }
  ],

  /** Escala 0–5 da Matriz de Competências. */
  scale: [
    { level: 0, label: 'Sem evidência suficiente' },
    { level: 1, label: 'Executa com orientação frequente' },
    { level: 2, label: 'Autonomia em escopo delimitado' },
    { level: 3, label: 'Ownership ponta a ponta e trade-offs' },
    { level: 4, label: 'Multiplica capacidade e estabelece padrões' },
    { level: 5, label: 'Impacto organizacional sustentável' }
  ],

  /** `target` = leitura do critério de transição Pleno → Sênior. */
  dimensions: [
    { id: 'tecnica', short: 'Técnica', name: '1. Profundidade técnica', target: 3, desc: 'Fundamentos, diagnóstico, qualidade, performance, segurança e escolhas técnicas.' },
    { id: 'arquitetura', short: 'Arquitetura', name: '2. Arquitetura e system design', target: 3, desc: 'Decompor problemas, modelar contratos, dados, falhas, escala, custo e evolução.' },
    { id: 'entrega', short: 'Ownership', name: '3. Entrega e ownership', target: 3, desc: 'Do problema à produção, risco, pós-release e responsabilidade por resultados.' },
    { id: 'confiabilidade', short: 'Operação', name: '4. Confiabilidade e operação', target: 3, desc: 'Observabilidade, SLOs, incidentes, capacidade, resiliência e melhoria pós-falha.' },
    { id: 'produto', short: 'Produto', name: '5. Produto e negócio', target: 3, desc: 'Problema do cliente, métricas, valor, custo de oportunidade e priorização.' },
    { id: 'comunicacao', short: 'Influência', name: '6. Comunicação e influência', target: 4, desc: 'Clareza escrita e oral, decisões registradas, alinhamento e negociação de trade-offs.' },
    { id: 'colaboracao', short: 'Mentoria', name: '7. Colaboração e mentoria', target: 4, desc: 'Elevar o nível de colegas, feedback, onboarding, revisão e segurança para decidir.' },
    { id: 'escala', short: 'Escala org.', name: '8. Escala organizacional', target: 3, desc: 'Reuso, plataformas, golden paths, padrões e adoção entre times.' },
    { id: 'aprendizado', short: 'Aprendizado', name: '9. Aprendizado aplicado', target: 3, desc: 'Transformar estudo em experimento, entrega, decisão ou melhoria mensurável.' }
  ],

  matrixRule:
    'Cada nota exige ao menos uma evidência com contexto, ação, resultado e alcance. Ausência de evidência recebe 0 — nunca uma estimativa otimista.',
  matrixTransition:
    'Pleno → Sênior tende a exigir consistência próxima de 3 nas dimensões centrais e sinais de 4 em influência ou multiplicação.',

  /** Indicadores do ciclo — todos derivados do que você registra aqui. */
  indicators: [
    { id: 'ind-1', label: 'Iniciativa crítica de baseline a pós-produção', hint: 'Objetivo 01 concluído', kind: 'goal', goal: 'ownership' },
    { id: 'ind-2', label: 'Fluxo agêntico testado e pilotado', hint: 'Objetivo 02 concluído', kind: 'goal', goal: 'agents' },
    { id: 'ind-3', label: 'Três momentos de influência ou mentoria', hint: '3 evidências ligadas ao Objetivo 03', kind: 'evidenceByGoal', goal: 'influence', target: 3 },
    { id: 'ind-4', label: 'Cinco casos profissionais estruturados', hint: '5 evidências registradas', kind: 'evidenceCount', target: 5 },
    { id: 'ind-5', label: 'Dois checkpoints formais de feedback', hint: '2 checkpoints no diário', kind: 'checkpointCount', target: 2 },
    { id: 'ind-6', label: 'Banca final com decisão do próximo ciclo', hint: '1 checkpoint do tipo Banca', kind: 'bancaCount', target: 1 }
  ],

  horizons: [
    {
      id: 'h6',
      title: 'Metas de 6 meses',
      items: [
        'Repetir ownership ponta a ponta em pelo menos duas iniciativas relevantes.',
        'Manter um portfólio de cinco a oito casos profissionais estruturados.',
        'Ter pelo menos um padrão, biblioteca, skill ou fluxo adotado em mais de um contexto.',
        'Receber feedback explícito sobre prontidão, gaps e oportunidades para o próximo nível.',
        'Ser referência em ao menos um eixo: arquitetura front-end e integração, autenticação/formalização ou engenharia agêntica aplicada.'
      ]
    },
    {
      id: 'h12',
      title: 'Metas de 12 meses',
      items: [
        'Demonstrar consistência compatível com Sênior, mesmo que a decisão formal dependa da organização.',
        'Sustentar decisões técnicas com métricas, confiabilidade, segurança e impacto de produto.',
        'Influenciar múltiplos engenheiros ou times por padrões e ativos reutilizáveis.',
        'Possuir sponsor e narrativa de progressão baseada em evidências.',
        'Decidir, com experiência real, entre Staff/Platform/Architecture, Tech Lead ou especialização em AI Engineering.'
      ]
    }
  ],

  leadershipQuestions: [
    { id: 'q1', text: 'Quais comportamentos e resultados diferenciam Pleno e Sênior no meu contexto?' },
    { id: 'q2', text: 'Quais aspectos da minha atuação atual já estão no próximo nível?' },
    { id: 'q3', text: 'Quais duas lacunas mais limitam minha progressão hoje?' },
    { id: 'q4', text: 'Qual iniciativa me permitirá demonstrar ownership de ponta a ponta?' },
    { id: 'q5', text: 'Onde existe oportunidade real de impacto transversal?' },
    { id: 'q6', text: 'Quem pode validar minhas evidências e atuar como sponsor?' }
  ],

  checkpointPrompts: [
    'O que mudou no período?',
    'Qual evidência ficou mais forte?',
    'Que hipótese foi refutada?',
    'O plano continua ligado ao trabalho real?',
    'Algum objetivo virou apenas estudo?',
    'Há excesso de escopo?',
    'O que a liderança precisa habilitar?'
  ],

  banca: {
    prep: 'Sete dias antes: atualizar perfil, matriz, objetivos, evidências e feedbacks. Selecionar no máximo cinco casos e registrar perguntas e decisões necessárias.',
    people: 'Marcus; liderança direta ou sponsor; par técnico experiente; opcionalmente produto ou stakeholder.',
    agenda: [
      { min: 5, text: 'Contexto e objetivo da revisão' },
      { min: 15, text: 'Resultados e evidências' },
      { min: 10, text: 'Diagnóstico por competências' },
      { min: 10, text: 'Pareceres e contraditório' },
      { min: 10, text: 'Trilhas e oportunidades' },
      { min: 10, text: 'Decisões, apoios e próximos 90 dias' }
    ],
    decisions: [
      'Manter ou mudar a hipótese de trilha',
      'Concluir, revisar ou substituir cada objetivo',
      'Escolher o projeto de aplicação do próximo ciclo',
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
      text: 'Código, documentação, automações e experimentos que sustentam ownership, influência e engenharia aplicada.',
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

  scopes: ['Squad', 'Produto', 'Plataforma', 'Comunidade técnica', 'Organização'],
  confidences: ['Em construção', 'Boa', 'Forte'],
  goalStatuses: [
    { id: 'nao-iniciado', label: 'Não iniciado' },
    { id: 'em-andamento', label: 'Em andamento' },
    { id: 'em-risco', label: 'Em risco' },
    { id: 'concluido', label: 'Concluído' }
  ],
  checkpointTypes: ['Quinzenal', 'Mensal', 'Feedback de liderança', 'Banca']
};
