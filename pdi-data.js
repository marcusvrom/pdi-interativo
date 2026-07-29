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
 * RECALIBRAÇÃO 2026-07-29 — fato novo: autonomia limitada para criar backlog novo.
 * Os objetivos foram reescritos para depender do desenvolvimento individual de
 * capacidades dentro das demandas já atribuídas, e não da aprovação de uma
 * iniciativa nova. Registre esta recalibração no Notion antes da próxima banca.
 *
 * Ao atualizar o PDI no Notion, atualize este arquivo e a data em `governance`.
 */
window.PDI_DATA = {
  profile: {
    name: 'Marcus Romano',
    role: 'Analista de Engenharia TI Pleno',
    company: 'Itaú Unibanco',
    track: 'Senior Software Engineer IC',
    edge: 'Confiabilidade + Engenharia agêntica',
    horizon: 'Staff / Platform / Architecture',
    headline: 'Software Engineer · Fullstack · Cloud · SRE · AI Engineering',
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
      'Recalibrado em 29/07/2026 para autonomia limitada de backlog. Impacto, prontidão e alcance continuam dependendo de evidência do trabalho real e de feedback da liderança — nada aqui vira nota sem lastro.',
    notionUrl: 'https://app.notion.com/p/3acff07cc1f1818e9469ef9628ae76d7'
  },

  objective:
    'Desenvolver, dentro do trabalho que já é meu, as capacidades que definem um Senior Software Engineer IC: rigor de decisão, profundidade em confiabilidade e custo, método próprio de engenharia e comunicação que muda o resultado dos outros.',

  /** A restrição que molda todo o desenho deste ciclo. */
  constraint: {
    title: 'Restrição assumida: autonomia limitada de backlog',
    text:
      'Não há autonomia para definir iniciativas novas além das já atribuídas. Por isso nenhum objetivo deste ciclo depende de escopo aprovado: todos se aplicam às demandas que já existem e podem começar hoje. Senioridade aqui é medida por como o trabalho é feito, não por qual trabalho foi conseguido.'
  },

  pillars: [
    'Elevar o padrão dentro do backlog que já é meu',
    'Profundidade em confiabilidade, cloud e custo',
    'Comunicação e mentoria como competência central, não como acessório'
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
      text: 'Decisão registrada antes do código, sistema compreendido em falha e custo, método de trabalho reprodutível e comunicação que alinha outras pessoas.'
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
    { n: '01', text: 'Spec-Driven Development: especificação e critério de aceite antes do código' },
    { n: '02', text: 'Agentes como executores do fluxo, com skills e KBs reutilizáveis' },
    { n: '03', text: 'Avaliação por casos de teste e baseline, não por percepção de produtividade' },
    { n: '04', text: 'Observabilidade e custo como parte da definição de pronto' }
  ],

  exclusions: [
    'Esperar a aprovação de uma iniciativa nova para começar a demonstrar senioridade',
    'Acumular certificações sem aplicação no trabalho atual',
    'Estudar várias tecnologias em paralelo sem vínculo com o backlog de hoje',
    'Tratar promoção ou cargo como meta diretamente controlável',
    'Confundir volume de entregas com evidência de senioridade',
    'Priorizar Go/performance sem demanda real que justifique aplicação imediata'
  ],

  /**
   * Trilhas de capacidade: as áreas que sustentam a evolução individual.
   * Cada uma tem um primeiro passo que não depende de autorização.
   */
  tracks: [
    {
      id: 'soft',
      name: 'Soft skills e comunicação',
      why: 'É o que mais separa Pleno de Sênior e o que menos depende de permissão. Decisão que ninguém entende não conta como decisão.',
      start: 'Transformar a próxima decisão técnica em um documento curto que outra pessoa consiga seguir sozinha.',
      evidence: 'Documentos de decisão, feedback recebido por escrito, sessões conduzidas.',
      goal: 'pessoas'
    },
    {
      id: 'obs',
      name: 'Observabilidade',
      why: 'Sênior é quem consegue explicar o comportamento do sistema com dados, não com suposição.',
      start: 'Listar os sinais que existem hoje no serviço que você mantém e o que você não conseguiria responder durante um incidente.',
      evidence: 'Mapa de lacunas, dashboard ou instrumentação nova, pergunta antes irrespondível agora respondida.',
      goal: 'plataforma'
    },
    {
      id: 'sre',
      name: 'SRE e confiabilidade',
      why: 'Ownership de verdade continua depois do deploy: SLIs, SLOs, incidentes e prevenção.',
      start: 'Propor 3 SLIs para o seu serviço e medir o comportamento real antes de sugerir qualquer meta.',
      evidence: 'SLIs medidos, SLO candidato, runbook validado, revisão de incidente.',
      goal: 'plataforma'
    },
    {
      id: 'cloud',
      name: 'Cloud e infraestrutura (AWS)',
      why: 'Decisão de arquitetura sem entender a infraestrutura que a sustenta é palpite.',
      start: 'Desenhar a topologia real do seu serviço na AWS: o que roda onde, com quais permissões e quais pontos de falha.',
      evidence: 'Diagrama de topologia, IaC revisado, ponto de falha identificado e endereçado.',
      goal: 'plataforma'
    },
    {
      id: 'finops',
      name: 'FinOps',
      why: 'Custo é um requisito não-funcional. Engenheiro que traduz decisão técnica em dinheiro muda o nível da conversa.',
      start: 'Levantar quanto custa por mês o serviço que você mantém e qual componente domina a conta. Ninguém precisa aprovar uma análise.',
      evidence: 'Análise de custo, oportunidade quantificada, proposta de otimização com trade-off.',
      goal: 'plataforma'
    },
    {
      id: 'sdd',
      name: 'Spec-Driven Development',
      why: 'Especificar antes de codar é a forma mais barata de demonstrar pensamento arquitetural dentro de qualquer demanda.',
      start: 'Escrever, na próxima tarefa atribuída, uma spec de uma página com problema, alternativas e critério de aceite antes de abrir a IDE.',
      evidence: 'Specs versionadas, critérios de aceite, alternativas descartadas com motivo.',
      goal: 'metodo'
    },
    {
      id: 'agentic',
      name: 'Ambiente agêntico',
      why: 'Diferenciação real quando o fluxo é governado e avaliado — não quando é apenas usado.',
      start: 'Escolher a etapa mais repetitiva do seu fluxo e transformá-la em uma skill ou KB reutilizável.',
      evidence: 'Artefato versionado, casos de teste, comparação com baseline, limites documentados.',
      goal: 'metodo'
    },
    {
      id: 'padrao',
      name: 'Rigor de engenharia',
      why: 'O mesmo backlog executado com trade-offs registrados e pós-produção acompanhada já é outro nível de atuação.',
      start: 'Aplicar spec → ADR leve → observação pós-deploy na demanda que você já tem em mãos.',
      evidence: 'ADR, antes/depois de um indicador, revisão pós-produção.',
      goal: 'padrao'
    }
  ],

  goals: [
    {
      id: 'padrao',
      index: '01',
      tag: 'Rigor',
      title: 'Elevar o padrão do que já é meu',
      summary:
        'Sem esperar iniciativa nova: aplicar rigor de sênior às demandas já atribuídas — especificar antes de codar, registrar trade-offs, observar depois do deploy e revisar o resultado.',
      dimensions: ['entrega', 'arquitetura', 'tecnica'],
      scopeHint:
        'Escolher, entre as demandas que já são suas, uma com risco ou impacto real para ser o caso de referência do ciclo.',
      actions: [
        'Escolher a demanda de referência entre as já atribuídas e registrar problema, usuários afetados, riscos e critério de pronto.',
        'Escrever uma spec curta antes da implementação, incluindo as alternativas descartadas e o motivo.',
        'Registrar os trade-offs de arquitetura, segurança, integração e operação em um ADR leve.',
        'Acompanhar a entrega depois do deploy: erro, latência, falha de integração ou retrabalho.',
        'Escrever uma revisão pós-produção com resultado, limitação e próximo passo.',
        'Repetir o mesmo padrão em uma segunda demanda, para provar que é método e não exceção.'
      ],
      proofs: [
        'Spec escrita antes da implementação',
        'ADR ou registro de trade-offs',
        'Antes/depois de ao menos um indicador técnico',
        'Revisão pós-produção',
        'Feedback de um par sobre a clareza da decisão',
        'O mesmo padrão aplicado duas vezes'
      ],
      success:
        'O modo de trabalhar de Marcus mudou de forma verificável dentro do backlog existente, sem depender de escopo novo aprovado.'
    },
    {
      id: 'plataforma',
      index: '02',
      tag: 'Confiabilidade',
      title: 'Profundidade de plataforma: observabilidade, SRE, AWS e FinOps',
      summary:
        'Construir capacidade operacional real no sistema que você já mantém. Tudo aqui começa sem pedir autorização: observar, medir, entender falha e entender custo.',
      dimensions: ['confiabilidade', 'produto', 'tecnica'],
      scopeHint:
        'Escolher um único serviço sob sua responsabilidade como laboratório do ciclo. Um serviço entendido a fundo vale mais que cinco superficialmente.',
      actions: [
        'Mapear o serviço escolhido: topologia AWS, dependências, pontos de falha e sinais que já existem.',
        'Propor três SLIs e medir o comportamento real antes de sugerir qualquer meta de SLO.',
        'Instrumentar ou melhorar o que faltar em log, métrica, trace ou dashboard.',
        'Escrever um runbook para a falha mais provável e validá-lo com quem opera.',
        'Levantar o custo AWS do serviço e identificar duas oportunidades de FinOps com estimativa e trade-off.',
        'Fazer a revisão de um incidente ou quase-incidente com foco em causa e prevenção.'
      ],
      proofs: [
        'Mapa de topologia, dependências e pontos de falha',
        'SLIs medidos e SLO candidato',
        'Dashboard ou instrumentação nova',
        'Runbook validado por quem opera',
        'Análise de custo com oportunidades quantificadas',
        'Revisão de incidente ou quase-incidente'
      ],
      success:
        'Marcus explica com dados como o serviço se comporta, como ele falha e quanto ele custa — e propôs melhoria em pelo menos duas dessas frentes.'
    },
    {
      id: 'metodo',
      index: '03',
      tag: 'Método',
      title: 'Método próprio: SDD + ambiente agêntico',
      summary:
        'Transformar o próprio jeito de trabalhar em método reprodutível: especificação primeiro, agentes como executores e avaliação por casos de teste em vez de percepção.',
      dimensions: ['aprendizado', 'escala', 'tecnica'],
      actions: [
        'Descrever o fluxo atual e onde ele custa mais tempo, retrabalho ou inconsistência.',
        'Adotar spec-driven development em pelo menos três demandas: especificação e critério de aceite antes do código.',
        'Criar uma skill, KB ou agente reutilizável para a etapa mais repetitiva desse fluxo.',
        'Definir três casos de teste representativos e critérios de qualidade para o artefato.',
        'Comparar o resultado assistido com o baseline em qualidade, retrabalho, tempo ou consistência.',
        'Registrar falhas, limites e riscos antes de sugerir adoção por outras pessoas.'
      ],
      proofs: [
        'Descrição do fluxo antes e depois',
        'Três specs com critério de aceite',
        'Artefato agêntico versionado',
        'Casos de teste e resultados',
        'Comparação com baseline',
        'Registro de limites e riscos'
      ],
      success:
        'Existe um método pessoal documentado e avaliado — não apenas a sensação de que a IA ajuda.'
    },
    {
      id: 'pessoas',
      index: '04',
      tag: 'Pessoas',
      title: 'Comunicação, influência e mentoria',
      summary:
        'A competência que mais pesa na transição para Sênior e a que menos depende de autorização: clareza escrita, posições defendidas com dados e capacidade de elevar quem está ao lado.',
      dimensions: ['comunicacao', 'colaboracao', 'escala'],
      actions: [
        'Transformar três decisões técnicas em documentos curtos que outra pessoa consiga seguir sem você.',
        'Conduzir uma sessão por mês — design review, troubleshooting ou compartilhamento — mesmo que informal.',
        'Apoiar de forma recorrente um colega em uma competência ligada ao trabalho atual.',
        'Pedir feedback objetivo sobre clareza, utilidade e mudança gerada, e registrar o que veio.',
        'Defender ao menos uma posição técnica divergente com dados e registrar o desfecho, inclusive se perder.',
        'Registrar exemplos em que outra pessoa executou melhor, mais rápido ou com menos risco por causa da sua atuação.'
      ],
      proofs: [
        'Três documentos de decisão',
        'Agendas ou registros das sessões',
        'Relato de mentoria recorrente',
        'Feedback recebido por escrito',
        'Um caso de divergência conduzida com dados',
        'Exemplo de capacidade ampliada em outra pessoa'
      ],
      success:
        'Há evidência de que a comunicação e a atuação de Marcus mudaram decisões e ampliaram a capacidade de outras pessoas.'
    }
  ],

  phases: [
    {
      id: 'fase-1',
      from: 1,
      to: 15,
      title: 'Escolhas e baseline',
      items: [
        'Apresentar este PDI recalibrado à liderança',
        'Obter critérios internos de Pleno para Sênior',
        'Escolher a demanda de referência entre as já atribuídas',
        'Escolher o serviço-laboratório de observabilidade e custo',
        'Descrever o fluxo de trabalho atual e seus gargalos',
        'Organizar de três a cinco casos anteriores como evidências',
        'Combinar checkpoints e sponsors'
      ]
    },
    {
      id: 'fase-2',
      from: 16,
      to: 45,
      title: 'Aplicação no trabalho real',
      items: [
        'Aplicar spec, ADR e pós-produção na demanda de referência',
        'Mapear topologia, falhas e lacunas de observabilidade',
        'Adotar SDD em pelo menos duas demandas',
        'Instrumentar o que faltava em log, métrica ou dashboard',
        'Conduzir a primeira sessão técnica do ciclo',
        'Coletar feedback intermediário'
      ]
    },
    {
      id: 'fase-3',
      from: 46,
      to: 75,
      title: 'Profundidade e evidência',
      items: [
        'Repetir o padrão em uma segunda demanda',
        'Medir SLIs, propor SLO e validar runbook',
        'Concluir a análise de custo e as oportunidades de FinOps',
        'Avaliar a skill ou agente com casos de teste e baseline',
        'Sustentar a mentoria recorrente e pedir feedback objetivo',
        'Consolidar evidências de decisão e de influência'
      ]
    },
    {
      id: 'fase-4',
      from: 76,
      to: 90,
      title: 'Banca e decisão',
      items: [
        'Fechar as revisões pós-produção',
        'Consolidar comparações com baseline',
        'Atualizar a matriz de competências com evidência',
        'Realizar a banca de PDI',
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
    { id: 'produto', short: 'Produto', name: '5. Produto e negócio', target: 3, desc: 'Problema do cliente, métricas, valor, custo de oportunidade e priorização — inclui custo de operação.' },
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
    { id: 'ind-1', label: 'Padrão de rigor aplicado duas vezes', hint: 'Objetivo 01 concluído', kind: 'goal', goal: 'padrao' },
    { id: 'ind-2', label: 'Serviço entendido em falha e em custo', hint: 'Objetivo 02 concluído', kind: 'goal', goal: 'plataforma' },
    { id: 'ind-3', label: 'Método pessoal documentado e avaliado', hint: 'Objetivo 03 concluído', kind: 'goal', goal: 'metodo' },
    { id: 'ind-4', label: 'Comunicação e mentoria demonstradas', hint: 'Objetivo 04 concluído', kind: 'goal', goal: 'pessoas' },
    { id: 'ind-5', label: 'Três evidências de influência ou mentoria', hint: '3 evidências ligadas ao Objetivo 04', kind: 'evidenceByGoal', goal: 'pessoas', target: 3 },
    { id: 'ind-6', label: 'Cinco casos profissionais estruturados', hint: '5 evidências registradas', kind: 'evidenceCount', target: 5 },
    { id: 'ind-7', label: 'Dois checkpoints formais de feedback', hint: '2 checkpoints no diário', kind: 'checkpointCount', target: 2 },
    { id: 'ind-8', label: 'Banca final com decisão do próximo ciclo', hint: '1 checkpoint do tipo Banca', kind: 'bancaCount', target: 1 }
  ],

  horizons: [
    {
      id: 'h6',
      title: 'Metas de 6 meses',
      items: [
        'Aplicar spec → trade-offs → pós-produção como rotina, não como exceção.',
        'Manter um portfólio de cinco a oito casos profissionais estruturados.',
        'Ter um serviço com observabilidade, SLO proposto e custo compreendido ponta a ponta.',
        'Ter um método pessoal de SDD e agentes usado por pelo menos mais uma pessoa.',
        'Receber feedback explícito sobre prontidão, lacunas e oportunidades para o próximo nível.'
      ]
    },
    {
      id: 'h12',
      title: 'Metas de 12 meses',
      items: [
        'Demonstrar consistência compatível com Sênior, mesmo que a decisão formal dependa da organização.',
        'Sustentar decisões técnicas com confiabilidade, segurança, custo e impacto de produto.',
        'Ser reconhecido em ao menos um eixo: arquitetura front-end e integração, confiabilidade e operação, ou engenharia agêntica aplicada.',
        'Possuir sponsor e narrativa de progressão baseada em evidências.',
        'Decidir, com experiência real, entre Staff/Platform/Architecture, Tech Lead ou especialização mais profunda.'
      ]
    }
  ],

  leadershipQuestions: [
    { id: 'q1', text: 'Quais comportamentos e resultados diferenciam Pleno e Sênior no meu contexto?' },
    { id: 'q2', text: 'Quais aspectos da minha atuação atual já estão no próximo nível?' },
    { id: 'q3', text: 'Quais duas lacunas mais limitam minha progressão hoje?' },
    { id: 'q4', text: 'Dentro do backlog que já é meu, onde há espaço para eu assumir mais decisão?' },
    { id: 'q5', text: 'Que tipo de melhoria eu poderia propor sem conflitar com as prioridades do time?' },
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
