window.PDI_ROADMAP = {
  title: 'Roadmap visual do ciclo',
  subtitle: 'Um passo a passo granular para executar o PDI dentro do trabalho real, com progresso persistido, filtros por objetivo e gates claros entre as fases.',
  filters: [
    { id: 'all', label: 'Todas as trilhas' },
    { id: 'padrao', label: 'Julgamento e rigor' },
    { id: 'plataforma', label: 'Ownership operacional' },
    { id: 'pessoas', label: 'Influência e multiplicação' }
  ],
  phases: [
    {
      id: 'roadmap-f1', phaseRef: 'fase-1', index: '01', label: 'Dias 1–15', title: 'Baseline, alinhamento e escolhas',
      emphasis: 'Definir onde aplicar o ciclo, quais evidências buscar e quem validará a evolução.',
      gate: 'Existe clareza sobre demandas, serviço-laboratório, validadores, gaps e critérios de senioridade.',
      outputs: ['Critérios de senioridade alinhados', 'Até 2 demandas de referência', '1 serviço-laboratório', 'Baseline do método atual', 'Stakeholders e checkpoints definidos'],
      steps: [
        { id: 'f1-01', goal: 'pessoas', title: 'Preparar narrativa do ciclo', detail: 'Explicar que o plano será executado dentro do backlog existente, medindo método, ownership e influência.', evidence: 'Resumo executivo de uma página.' },
        { id: 'f1-02', goal: 'pessoas', title: 'Apresentar o PDI à liderança', detail: 'Validar a direção, a restrição de autonomia e o formato de evidências.', evidence: 'Registro da conversa e ajustes combinados.' },
        { id: 'f1-03', goal: 'pessoas', title: 'Obter critérios internos de Pleno para Sênior', detail: 'Perguntar quais comportamentos, resultados e sinais realmente diferenciam os níveis no contexto atual.', evidence: 'Critérios escritos e lacunas priorizadas.' },
        { id: 'f1-04', goal: 'padrao', title: 'Selecionar a primeira demanda de referência', detail: 'Escolher uma demanda já atribuída com risco, integração, segurança ou impacto relevante.', evidence: 'Problema, usuários afetados e relevância registrados.' },
        { id: 'f1-05', goal: 'padrao', title: 'Selecionar a segunda demanda candidata', detail: 'Reservar um segundo caso para provar repetição do método, sem bloquear o ciclo caso o backlog mude.', evidence: 'Demanda candidata e condição de uso.' },
        { id: 'f1-06', goal: 'plataforma', title: 'Escolher o serviço-laboratório', detail: 'Selecionar um único serviço sob responsabilidade para aprofundar operação, risco, segurança e custo.', evidence: 'Escopo e fronteiras do serviço definidos.' },
        { id: 'f1-07', goal: 'plataforma', title: 'Mapear stakeholders do serviço', detail: 'Identificar responsáveis por desenvolvimento, infraestrutura, operação, produto e suporte.', evidence: 'Mapa de pessoas e papéis.' },
        { id: 'f1-08', goal: 'padrao', title: 'Descrever o fluxo atual de trabalho', detail: 'Registrar como uma demanda passa de entendimento para implementação, validação e pós-produção.', evidence: 'Fluxo atual documentado.' },
        { id: 'f1-09', goal: 'padrao', title: 'Identificar gargalos do método atual', detail: 'Apontar decisões implícitas, retrabalho, critérios frágeis e falta de acompanhamento após o deploy.', evidence: 'Lista priorizada de gargalos.' },
        { id: 'f1-10', goal: 'plataforma', title: 'Inventariar sinais operacionais existentes', detail: 'Listar logs, métricas, traces, dashboards, alertas e perguntas que ainda não podem ser respondidas.', evidence: 'Mapa inicial de observabilidade.' },
        { id: 'f1-11', goal: 'pessoas', title: 'Organizar evidências profissionais anteriores', detail: 'Estruturar de três a cinco casos anteriores no formato contexto, ação, resultado e alcance.', evidence: 'Portfólio inicial de evidências.' },
        { id: 'f1-12', goal: 'pessoas', title: 'Combinar checkpoints e validadores', detail: 'Definir datas, participantes e o tipo de feedback esperado em cada revisão.', evidence: 'Agenda e responsáveis confirmados.' }
      ]
    },
    {
      id: 'roadmap-f2', phaseRef: 'fase-2', index: '02', label: 'Dias 16–45', title: 'Aplicação no trabalho real',
      emphasis: 'Executar o novo padrão em uma entrega real e criar a primeira visão operacional do serviço.',
      gate: 'O método já apareceu em uma demanda real e existe uma leitura inicial do comportamento do serviço.',
      outputs: ['1 spec aplicada', '1 decisão técnica registrada', 'Topologia sanitizada', '2 ou 3 SLIs candidatos', '1 documento reutilizável', 'Feedback intermediário'],
      steps: [
        { id: 'f2-01', goal: 'padrao', title: 'Escrever a primeira spec antes do código', detail: 'Descrever problema, restrições, usuários, alternativas, riscos e critérios de aceite.', evidence: 'Spec datada antes da implementação.' },
        { id: 'f2-02', goal: 'padrao', title: 'Definir critérios objetivos de pronto', detail: 'Incluir comportamento funcional, integração, segurança, observabilidade e pós-produção.', evidence: 'Checklist verificável de aceite.' },
        { id: 'f2-03', goal: 'padrao', title: 'Registrar alternativas descartadas', detail: 'Comparar opções e explicar por que a abordagem escolhida é adequada ao contexto.', evidence: 'Tabela ou seção de trade-offs.' },
        { id: 'f2-04', goal: 'padrao', title: 'Criar ADR leve da decisão principal', detail: 'Registrar contexto, decisão, consequências, riscos e possibilidade de evolução.', evidence: 'ADR ou registro equivalente.' },
        { id: 'f2-05', goal: 'padrao', title: 'Executar mantendo rastreabilidade', detail: 'Atualizar a spec quando fatos novos alterarem a decisão ou o escopo.', evidence: 'Histórico coerente entre decisão e entrega.' },
        { id: 'f2-06', goal: 'plataforma', title: 'Desenhar a topologia sanitizada', detail: 'Mapear componentes AWS, contratos, dependências, permissões relevantes e pontos de falha sem expor dados sensíveis.', evidence: 'Diagrama sanitizado.' },
        { id: 'f2-07', goal: 'plataforma', title: 'Definir perguntas operacionais críticas', detail: 'Escolher perguntas úteis durante falhas, degradação ou investigação de integração.', evidence: 'Lista de perguntas priorizadas.' },
        { id: 'f2-08', goal: 'plataforma', title: 'Selecionar 2 ou 3 SLIs candidatos', detail: 'Usar sinais disponíveis como erro, latência, disponibilidade ou falhas de integração.', evidence: 'Definição e fonte de cada SLI.' },
        { id: 'f2-09', goal: 'plataforma', title: 'Coletar baseline dos sinais disponíveis', detail: 'Medir o comportamento atual antes de propor metas ou mudanças.', evidence: 'Baseline técnico registrado.' },
        { id: 'f2-10', goal: 'plataforma', title: 'Levantar visão inicial de custo e esforço', detail: 'Identificar dados permitidos sobre consumo, capacidade, suporte ou custo da falha.', evidence: 'Hipóteses e dados disponíveis.' },
        { id: 'f2-11', goal: 'pessoas', title: 'Produzir documento utilizável por outra pessoa', detail: 'Converter a decisão ou investigação em material autossuficiente.', evidence: 'Documento revisado por um par.' },
        { id: 'f2-12', goal: 'pessoas', title: 'Conduzir sessão técnica e pedir feedback', detail: 'Realizar design review, troubleshooting ou compartilhamento e pedir retorno objetivo.', evidence: 'Agenda, decisões e feedback.' }
      ]
    },
    {
      id: 'roadmap-f3', phaseRef: 'fase-3', index: '03', label: 'Dias 46–75', title: 'Profundidade, repetição e multiplicação',
      emphasis: 'Provar que a evolução não foi um evento isolado e ampliar o impacto para além da execução individual.',
      gate: 'O método foi repetido, o serviço é compreendido com mais profundidade e existe evidência de influência.',
      outputs: ['Método repetido em 2 demandas', 'Análise operacional aprofundada', '1 recomendação fundamentada', '1 ativo reutilizável', 'Feedback escrito', 'Caso de influência estruturado'],
      steps: [
        { id: 'f3-01', goal: 'padrao', title: 'Aplicar o método na segunda demanda', detail: 'Repetir spec, critérios, trade-offs e acompanhamento pós-produção.', evidence: 'Segunda spec e decisão registradas.' },
        { id: 'f3-02', goal: 'padrao', title: 'Comparar a primeira e a segunda execução', detail: 'Avaliar clareza, previsibilidade, risco, retrabalho e qualidade da decisão.', evidence: 'Comparação antes/depois do método.' },
        { id: 'f3-03', goal: 'padrao', title: 'Fechar revisão pós-produção do primeiro caso', detail: 'Registrar resultado, limitações, aprendizado e próximo passo.', evidence: 'Revisão pós-produção concluída.' },
        { id: 'f3-04', goal: 'plataforma', title: 'Medir o comportamento real dos SLIs', detail: 'Observar tendências e responder as perguntas operacionais priorizadas.', evidence: 'Medições e interpretação.' },
        { id: 'f3-05', goal: 'plataforma', title: 'Mapear modos de falha relevantes', detail: 'Relacionar sintomas, dependências, impactos e caminhos de diagnóstico.', evidence: 'Mapa de falhas e pontos cegos.' },
        { id: 'f3-06', goal: 'plataforma', title: 'Relacionar sinais a risco e jornada', detail: 'Conectar comportamento técnico a risco operacional, segurança, cliente ou esforço do time.', evidence: 'Cadeia técnica → impacto.' },
        { id: 'f3-07', goal: 'plataforma', title: 'Priorizar uma lacuna operacional', detail: 'Selecionar a melhoria com melhor relação entre benefício, risco, esforço e viabilidade.', evidence: 'Matriz leve de priorização.' },
        { id: 'f3-08', goal: 'plataforma', title: 'Produzir recomendação fundamentada', detail: 'Descrever proposta, impacto esperado, riscos, dependências e trade-offs.', evidence: 'Recomendação pronta para decisão.' },
        { id: 'f3-09', goal: 'pessoas', title: 'Criar um ativo de multiplicação', detail: 'Construir template de spec, ADR, KB, skill ou guia de troubleshooting.', evidence: 'Artefato versionado e documentado.' },
        { id: 'f3-10', goal: 'pessoas', title: 'Avaliar o ativo com casos de teste', detail: 'Definir baseline, critérios de qualidade, falhas e limites conhecidos.', evidence: 'Resultados dos casos de teste.' },
        { id: 'f3-11', goal: 'pessoas', title: 'Apoiar um colega de forma recorrente', detail: 'Ajudar em decisão, investigação, documentação ou estruturação de demanda.', evidence: 'Registro de apoio e evolução.' },
        { id: 'f3-12', goal: 'pessoas', title: 'Coletar feedback e registrar influência', detail: 'Documentar como sua atuação aumentou clareza, autonomia, velocidade ou segurança.', evidence: 'Feedback escrito e caso estruturado.' }
      ]
    },
    {
      id: 'roadmap-f4', phaseRef: 'fase-4', index: '04', label: 'Dias 76–90', title: 'Consolidação, narrativa e banca',
      emphasis: 'Transformar execução em diagnóstico de carreira e decisão concreta para o próximo ciclo.',
      gate: 'O ciclo termina com evidências fortes, feedback explícito e uma tese clara para os próximos 90 dias.',
      outputs: ['5 casos fortes selecionados', 'Matriz atualizada', 'Narrativa dos 3 objetivos', 'Banca realizada', 'Decisões e próximo ciclo registrados'],
      steps: [
        { id: 'f4-01', goal: 'padrao', title: 'Fechar revisões pós-produção pendentes', detail: 'Consolidar resultados, limitações e aprendizados das demandas de referência.', evidence: 'Revisões finais concluídas.' },
        { id: 'f4-02', goal: 'padrao', title: 'Sintetizar evolução do julgamento técnico', detail: 'Explicar como mudou a qualidade das decisões, critérios e trade-offs.', evidence: 'Resumo do Objetivo 1.' },
        { id: 'f4-03', goal: 'plataforma', title: 'Sintetizar evolução do ownership operacional', detail: 'Explicar o que agora consegue responder sobre comportamento, risco e prioridade do serviço.', evidence: 'Resumo do Objetivo 2.' },
        { id: 'f4-04', goal: 'pessoas', title: 'Sintetizar evolução da influência', detail: 'Mostrar onde documentação, sessão, apoio ou ativo melhoraram o trabalho de outras pessoas.', evidence: 'Resumo do Objetivo 3.' },
        { id: 'f4-05', goal: 'pessoas', title: 'Selecionar os cinco casos mais fortes', detail: 'Escolher evidências que cubram contexto, ação, resultado e alcance.', evidence: 'Portfólio final do ciclo.' },
        { id: 'f4-06', goal: 'pessoas', title: 'Resumir cada caso em formato executivo', detail: 'Produzir uma leitura curta e objetiva para liderança e sponsor.', evidence: 'Cinco resumos executivos.' },
        { id: 'f4-07', goal: 'padrao', title: 'Atualizar a matriz de competências', detail: 'Pontuar somente dimensões com evidência rastreável e indicar stretch signals.', evidence: 'Matriz revisada.' },
        { id: 'f4-08', goal: 'pessoas', title: 'Comparar plano inicial e executado', detail: 'Registrar o que foi mantido, reduzido, substituído ou inviabilizado pelo contexto.', evidence: 'Relatório de recalibração.' },
        { id: 'f4-09', goal: 'pessoas', title: 'Preparar perguntas e contraditório', detail: 'Levar dúvidas concretas sobre prontidão, gaps, oportunidade e sponsorship.', evidence: 'Pauta da banca.' },
        { id: 'f4-10', goal: 'pessoas', title: 'Realizar a banca final', detail: 'Apresentar evidências, diagnóstico e hipóteses para o próximo ciclo.', evidence: 'Checkpoint do tipo banca.' },
        { id: 'f4-11', goal: 'pessoas', title: 'Registrar decisões e apoio necessário', detail: 'Definir o que continua, o que muda e o que depende da liderança.', evidence: 'Ata de decisões.' },
        { id: 'f4-12', goal: 'pessoas', title: 'Definir a tese do próximo ciclo', detail: 'Escolher o eixo de maior retorno com base nas evidências, não apenas em interesse.', evidence: 'Objetivo e primeira ação dos próximos 90 dias.' }
      ]
    }
  ]
};
