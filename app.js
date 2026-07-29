/* =========================================================
   PDI 2026 — camada de execução
   Estado 100% local (localStorage). Nada sai do navegador.
   ========================================================= */
(() => {
  'use strict';

  const D = window.PDI_DATA;
  const STORAGE_KEY = 'pdi.marcus.v3';
  const LEGACY_KEYS = ['pdi.marcus.v2', 'marcus-pdi-2026'];
  /** Objetivos foram redesenhados na recalibração de 29/07/2026. */
  const GOAL_ID_MAP = { ownership: 'padrao', agents: 'metodo', influence: 'pessoas' };

  if (!D) {
    console.error('pdi-data.js não carregou — verifique se a versão do arquivo bate com index.html.');
    return;
  }

  /** Um bloco que falha não pode derrubar o resto da página. */
  function safe(label, fn) {
    try {
      return fn();
    } catch (error) {
      console.error(`[PDI] falha ao renderizar "${label}":`, error);
      return undefined;
    }
  }

  /* ---------------------------------------------------------
     Utilidades
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`);

  const esc = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

  const nl2br = (value) => esc(value).replace(/\n/g, '<br>');

  function debounce(fn, wait = 350) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  }

  const DAY = 86400000;
  const parseDate = (iso) => new Date(`${iso}T00:00:00`);
  const addDays = (date, days) => new Date(date.getTime() + days * DAY);
  const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const toISO = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const fmtShort = (date) => date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
  const fmtLong = (iso) => {
    if (!iso) return '';
    const d = parseDate(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const icon = (name) => {
    const paths = {
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      check: '<path d="m4.5 12.5 5 5 10-11"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      edit: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/>',
      trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
      download: '<path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 19.5h14"/>',
      upload: '<path d="M12 20V9M7.5 13 12 8.5 16.5 13M5 4.5h14"/>',
      print: '<path d="M7 9V4h10v5M7 18H5v-6h14v6h-2M8 14h8v6H8z"/>',
      target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/>',
      flag: '<path d="M6 21V4M6 4h11l-2 3.5L17 11H6"/>',
      compass: '<circle cx="12" cy="12" r="8.5"/><path d="m14.8 9.2-1.5 4.1-4.1 1.5 1.5-4.1z"/>',
      copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 5H6a1.5 1.5 0 0 0-1.5 1.5V15"/>',
      external: '<path d="M14 5h5v5M19 5l-8 8M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
      theme: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none"/>',
      warn: '<path d="M12 9v5M12 17.5v.01"/><path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20.4h15.6a2 2 0 0 0 1.7-3l-7.8-13.5a2 2 0 0 0-3.4 0Z"/>',
      note: '<path d="M6 3.5h9L19 8v12.5H6z"/><path d="M9 12h7M9 16h5"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || ''}</svg>`;
  };

  /**
   * Evita o flicker das animações de entrada quando um bloco é
   * re-renderizado: só a primeira pintura de cada bloco anima.
   */
  const painted = new Set();
  const rv = (key) => {
    if (painted.has(key)) return 'reveal is-in';
    painted.add(key);
    return 'reveal';
  };

  /* ---------------------------------------------------------
     Estado
     --------------------------------------------------------- */
  const blankState = () => ({
    version: 2,
    checks: {},
    goalStatus: {},
    matrix: {},
    evidences: [],
    checkpoints: [],
    answers: {},
    prefs: { theme: null },
    savedAt: null
  });

  /**
   * Traz o que continua válido de versões anteriores.
   * Evidências, checkpoints, matriz e respostas sobrevivem; os checklists de
   * objetivo não, porque as ações mudaram na recalibração.
   */
  function migrateLegacy(state) {
    for (const key of LEGACY_KEYS) {
      let old;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        old = JSON.parse(raw);
      } catch {
        continue;
      }

      if (Array.isArray(old.evidences)) {
        state.evidences = old.evidences.map((item) => ({
          id: item.id || uid(),
          createdAt: item.createdAt || new Date().toISOString(),
          date: item.date || (item.createdAt || '').slice(0, 10) || toISO(startOfToday()),
          title: item.title || '',
          context: item.context || '',
          action: item.action || '',
          result: item.result || '',
          scope: item.scope || D.scopes[0],
          confidence: item.confidence || D.confidences[0],
          goal: GOAL_ID_MAP[item.goal] || (D.goals.some((g) => g.id === item.goal) ? item.goal : ''),
          dimensions: Array.isArray(item.dimensions) ? item.dimensions : []
        }));
      }
      if (Array.isArray(old.checkpoints)) state.checkpoints = old.checkpoints;
      if (old.matrix) state.matrix = { ...old.matrix };
      if (old.answers) state.answers = { ...old.answers };
      if (old.prefs) state.prefs = { ...state.prefs, ...old.prefs };

      // grava o novo formato ANTES de descartar o antigo: um reload sem
      // interação não pode perder o que foi migrado.
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        localStorage.removeItem(key);
      } catch {
        console.warn('[PDI] migração não pôde ser persistida; dados antigos preservados.');
      }
      break;
    }
    return state;
  }

  function loadState() {
    let state = blankState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        state = {
          ...state,
          ...stored,
          checks: { ...stored.checks },
          goalStatus: { ...stored.goalStatus },
          matrix: { ...stored.matrix },
          answers: { ...stored.answers },
          prefs: { ...state.prefs, ...stored.prefs },
          evidences: Array.isArray(stored.evidences) ? stored.evidences : [],
          checkpoints: Array.isArray(stored.checkpoints) ? stored.checkpoints : []
        };
      } else {
        state = migrateLegacy(state);
      }
    } catch {
      state = blankState();
    }
    D.dimensions.forEach((dim) => {
      state.matrix[dim.id] = { level: 0, evidence: '', ...(state.matrix[dim.id] || {}) };
    });
    return state;
  }

  let state = loadState();

  function save({ silent = true } = {}) {
    state.savedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      toast('Não foi possível salvar neste navegador (armazenamento cheio ou bloqueado).', { kind: 'error' });
    }
    renderStorageNote();
    if (!silent) toast('Alterações salvas.');
  }

  /* ---------------------------------------------------------
     Ciclo
     --------------------------------------------------------- */
  const cycleStart = parseDate(D.cycle.startDate);
  const cycleEnd = addDays(cycleStart, D.cycle.lengthDays - 1);

  function cycleInfo() {
    const today = startOfToday();
    const rawDay = Math.floor((today - cycleStart) / DAY) + 1;
    const day = clamp(rawDay, 1, D.cycle.lengthDays);
    const phase = D.phases.find((p) => day >= p.from && day <= p.to) || D.phases[D.phases.length - 1];
    return {
      day,
      rawDay,
      remaining: Math.max(0, D.cycle.lengthDays - day),
      elapsedPct: (day / D.cycle.lengthDays) * 100,
      phase,
      notStarted: rawDay < 1,
      finished: rawDay > D.cycle.lengthDays
    };
  }

  const phaseDates = (phase) => ({
    start: addDays(cycleStart, phase.from - 1),
    end: addDays(cycleStart, phase.to - 1)
  });

  /* ---------------------------------------------------------
     Cálculo de progresso
     --------------------------------------------------------- */
  const goalItems = (goal) => [
    ...goal.actions.map((_, i) => `${goal.id}:a:${i}`),
    ...goal.proofs.map((_, i) => `${goal.id}:p:${i}`)
  ];

  function goalProgress(goal) {
    if (state.goalStatus[goal.id] === 'concluido') return 100;
    const keys = goalItems(goal);
    const done = keys.filter((k) => state.checks[k]).length;
    return keys.length ? (done / keys.length) * 100 : 0;
  }

  function phaseProgress(phase) {
    const done = phase.items.filter((_, i) => state.checks[`${phase.id}:${i}`]).length;
    return phase.items.length ? (done / phase.items.length) * 100 : 0;
  }

  const evidencesForGoal = (goalId) => state.evidences.filter((e) => e.goal === goalId);

  function indicatorState(indicator) {
    switch (indicator.kind) {
      case 'goal': {
        const goal = D.goals.find((g) => g.id === indicator.goal);
        const pct = goal ? goalProgress(goal) : 0;
        return { value: Math.round(pct), max: 100, pct, met: pct >= 100, display: `${Math.round(pct)}%` };
      }
      case 'evidenceByGoal': {
        const n = evidencesForGoal(indicator.goal).length;
        return { value: n, max: indicator.target, pct: Math.min(n / indicator.target, 1) * 100, met: n >= indicator.target, display: `${n}/${indicator.target}` };
      }
      case 'evidenceCount': {
        const n = state.evidences.length;
        return { value: n, max: indicator.target, pct: Math.min(n / indicator.target, 1) * 100, met: n >= indicator.target, display: `${n}/${indicator.target}` };
      }
      case 'checkpointCount': {
        const n = state.checkpoints.length;
        return { value: n, max: indicator.target, pct: Math.min(n / indicator.target, 1) * 100, met: n >= indicator.target, display: `${n}/${indicator.target}` };
      }
      case 'bancaCount': {
        const n = state.checkpoints.filter((c) => c.type === 'Banca').length;
        return { value: n, max: indicator.target, pct: Math.min(n / indicator.target, 1) * 100, met: n >= indicator.target, display: `${n}/${indicator.target}` };
      }
      default:
        return { value: 0, max: 1, pct: 0, met: false, display: '—' };
    }
  }

  /** Nível só conta com evidência registrada — regra da Matriz de Competências. */
  const effectiveLevel = (dim) => {
    const entry = state.matrix[dim.id] || { level: 0, evidence: '' };
    return entry.evidence.trim() ? Number(entry.level) || 0 : 0;
  };

  function scores() {
    const execution = D.goals.reduce((sum, g) => sum + goalProgress(g), 0) / D.goals.length;
    const met = D.indicators.filter((i) => indicatorState(i).met).length;
    const indicators = (met / D.indicators.length) * 100;
    const matrix =
      (D.dimensions.reduce((sum, dim) => sum + Math.min(effectiveLevel(dim) / dim.target, 1), 0) / D.dimensions.length) * 100;
    const overall = execution * 0.55 + indicators * 0.3 + matrix * 0.15;
    return { execution, indicators, matrix, overall, indicatorsMet: met };
  }

  /* ---------------------------------------------------------
     Toasts
     --------------------------------------------------------- */
  const toastStack = $('#toast-stack');

  function toast(message, { kind = 'ok', undo = null, timeout = 5000 } = {}) {
    const node = document.createElement('div');
    node.className = `toast${kind === 'ok' ? '' : ` is-${kind}`}`;
    node.innerHTML = `
      <span class="toast-icon">${icon(kind === 'ok' ? 'check' : 'warn')}</span>
      <span class="toast-body">${esc(message)}</span>
      ${undo ? '<button class="toast-undo" type="button">Desfazer</button>' : ''}`;

    const dismiss = () => {
      node.classList.add('is-leaving');
      setTimeout(() => node.remove(), 220);
    };
    const timer = setTimeout(dismiss, timeout);

    if (undo) {
      $('.toast-undo', node).addEventListener('click', () => {
        clearTimeout(timer);
        undo();
        dismiss();
      });
    }
    toastStack.appendChild(node);
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label} copiado para a área de transferência.`);
    } catch {
      toast('Seu navegador bloqueou a cópia automática.', { kind: 'warn' });
    }
  }

  /* ---------------------------------------------------------
     Navegação
     --------------------------------------------------------- */
  const SECTIONS = [
    { id: 'inicio', label: 'Início', nav: false },
    { id: 'visao', label: 'Visão', nav: true },
    { id: 'metas', label: 'Metas', nav: true },
    { id: 'trilhas', label: 'Trilhas', nav: true },
    { id: 'fases', label: 'Fases', nav: false },
    { id: 'competencias', label: 'Competências', nav: true },
    { id: 'evidencias', label: 'Evidências', nav: true },
    { id: 'indicadores', label: 'Indicadores', nav: false },
    { id: 'checkpoints', label: 'Checkpoints', nav: true },
    { id: 'lideranca', label: 'Liderança', nav: false },
    { id: 'horizontes', label: 'Horizontes', nav: false },
    { id: 'portfolio', label: 'Portfólio', nav: false },
    { id: 'dados', label: 'Dados', nav: false }
  ];

  function renderNav() {
    $('#nav-links').innerHTML = SECTIONS.filter((s) => s.nav)
      .map((s) => `<a href="#${s.id}" data-nav="${s.id}">${s.label}</a>`)
      .join('');
    $('#mobile-menu').innerHTML = SECTIONS.filter((s) => s.id !== 'inicio')
      .map((s) => `<a href="#${s.id}" data-nav="${s.id}">${s.label}</a>`)
      .join('');
  }

  function setActiveSection() {
    const offset = 140;
    let current = SECTIONS[0].id;
    SECTIONS.forEach((s) => {
      const node = document.getElementById(s.id);
      if (node && node.getBoundingClientRect().top <= offset) current = s.id;
    });
    $$('[data-nav]').forEach((a) => a.classList.toggle('is-active', a.dataset.nav === current));
  }

  /* ---------------------------------------------------------
     Render — cabeçalho e cockpit
     --------------------------------------------------------- */
  function renderHeader() {
    $('#brand-cycle').textContent = D.cycle.label;
    $('#hero-role').textContent = D.profile.headline;
    $('#hero-objective').textContent = D.objective;
    $('#hero-pillars').innerHTML = D.pillars.map((p) => `<li>${esc(p)}</li>`).join('');

    const photo = $('#profile-photo');
    photo.src = D.profile.photo;
    photo.addEventListener('error', () => { photo.src = D.profile.photoFallback; }, { once: true });

    $('#profile-name').textContent = D.profile.name;
    $('#profile-headline').textContent = `${D.profile.role} · ${D.profile.company}`;
    $('#fact-role').textContent = D.profile.role;
    $('#fact-company').textContent = D.profile.company;
    $('#fact-track').textContent = D.profile.track;
    $('#fact-edge').textContent = D.profile.edge;
    $('#cycle-total').textContent = `/ ${D.cycle.lengthDays}`;

    $('#footer-governance').textContent =
      `Baseline: ${D.governance.baseline} · atualizado em ${fmtLong(D.governance.updatedAt)}`;
    $('#footer-notion').href = D.governance.notionUrl;

    $('#matrix-rule').textContent = D.matrixRule;
    $('#matrix-transition').textContent = `Critério de transição: ${D.matrixTransition}`;

    $('#banca-prep').textContent = D.banca.prep;
    $('#banca-agenda').innerHTML = D.banca.agenda
      .map((item) => `<li><b>${item.min} min</b><span>${esc(item.text)}</span></li>`)
      .join('');
    $('#banca-decisions').innerHTML = D.banca.decisions.map((d) => `<li><span>${esc(d)}</span></li>`).join('');
    $('#checkpoint-prompts').innerHTML = D.checkpointPrompts.map((p) => `<li>${esc(p)}</li>`).join('');
  }

  function renderCycle() {
    const info = cycleInfo();
    $('#cycle-day').textContent = info.notStarted ? '0' : info.day;
    $('#cycle-phase').textContent = info.finished ? 'Ciclo encerrado' : info.phase.title;
    $('#cycle-dates').textContent = `${fmtShort(cycleStart)} → ${fmtShort(cycleEnd)}`;
    $('#cycle-remaining').textContent = info.finished
      ? 'Hora da banca e do próximo ciclo'
      : `${info.remaining} dias restantes`;
    $('#cycle-elapsed').style.width = `${clamp(info.elapsedPct, 0, 100)}%`;
    $('#cycle-marks').innerHTML = D.phases
      .slice(0, -1)
      .map((p) => `<span style="left:${(p.to / D.cycle.lengthDays) * 100}%"></span>`)
      .join('');
  }

  function renderScores() {
    const s = scores();
    $('#overall-score').textContent = `${Math.round(s.overall)}%`;
    $('#overall-bar').style.width = `${clamp(s.overall, 0, 100)}%`;
    $('#score-breakdown').innerHTML = [
      { label: 'Execução das metas', value: s.execution },
      { label: `Indicadores (${s.indicatorsMet}/${D.indicators.length})`, value: s.indicators },
      { label: 'Prontidão da matriz', value: s.matrix }
    ]
      .map(
        (row) => `
          <li>
            <span>${esc(row.label)}</span>
            <span class="mini-track"><i style="width:${clamp(row.value, 0, 100)}%"></i></span>
            <b>${Math.round(row.value)}%</b>
          </li>`
      )
      .join('');
  }

  /* ---------------------------------------------------------
     Render — posicionamento
     --------------------------------------------------------- */
  function renderPositioning() {
    $('#path-grid').innerHTML = D.positioning
      .map(
        (p) => `
        <article class="path-card ${p.variant}">
          <span class="path-index">${p.index}</span>
          <h3>${esc(p.kicker)}</h3>
          <p>${esc(p.text)}</p>
          <span class="tag">${esc(p.tag)}</span>
        </article>`
      )
      .join('');

    $('#stack-cloud').innerHTML = D.stack.map((s) => `<span>${esc(s)}</span>`).join('');
    $('#edge-list').innerHTML = D.edgeStack
      .map((e) => `<li><b>${e.n}</b><span>${esc(e.text)}</span></li>`)
      .join('');
    $('#exclusion-list').innerHTML = D.exclusions.map((e) => `<li><span>${esc(e)}</span></li>`).join('');

    $('#constraint-title').textContent = D.constraint.title;
    $('#constraint-text').textContent = D.constraint.text;
  }

  function renderTracks() {
    $('#track-grid').innerHTML = D.tracks
      .map((track) => {
        const goal = D.goals.find((g) => g.id === track.goal);
        return `
        <article class="track-card ${rv('tracks')}">
          <div class="track-top">
            <h3>${esc(track.name)}</h3>
            ${goal ? `<span class="chip">Obj. ${esc(goal.index)}</span>` : ''}
          </div>
          <p class="track-why">${esc(track.why)}</p>
          <div class="track-start">
            <strong>Começa hoje, sem depender de ninguém</strong>
            <p>${esc(track.start)}</p>
          </div>
          <p class="track-evidence"><span>Evidência que gera</span>${esc(track.evidence)}</p>
        </article>`;
      })
      .join('');
    observeReveals();
  }

  /* ---------------------------------------------------------
     Render — metas
     --------------------------------------------------------- */
  const ringSvg = (pct) => {
    const r = 26;
    const c = 2 * Math.PI * r;
    const offset = c * (1 - clamp(pct, 0, 100) / 100);
    return `
      <svg class="ring" viewBox="0 0 62 62" role="img" aria-label="${Math.round(pct)}% concluído">
        <circle class="ring-bg" cx="31" cy="31" r="${r}"/>
        <circle class="ring-fg" cx="31" cy="31" r="${r}"
          stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
          transform="rotate(-90 31 31)"/>
        <text x="31" y="35">${Math.round(pct)}%</text>
      </svg>`;
  };

  function checkItem(key, label, extraClass = '') {
    return `
      <label class="check-item ${extraClass}">
        <input type="checkbox" data-check="${esc(key)}" ${state.checks[key] ? 'checked' : ''}>
        <span>${esc(label)}</span>
      </label>`;
  }

  function renderGoals() {
    $('#goals-grid').innerHTML = D.goals
      .map((goal) => {
        const pct = goalProgress(goal);
        const status = state.goalStatus[goal.id] || 'nao-iniciado';
        const doneItems = goalItems(goal).filter((k) => state.checks[k]).length;
        const linked = evidencesForGoal(goal.id).length;
        return `
        <article class="goal-card ${rv('goals')} ${status === 'concluido' ? 'is-done' : ''} ${status === 'em-risco' ? 'is-risk' : ''}" data-goal="${goal.id}">
          <div class="goal-head">
            <div class="goal-head-copy">
              <span class="goal-index">OBJETIVO ${goal.index}</span>
              <span class="goal-tag">${esc(goal.tag)}</span>
            </div>
            ${ringSvg(pct)}
          </div>
          <h3>${esc(goal.title)}</h3>
          <p>${esc(goal.summary)}</p>
          ${goal.scopeHint ? `<p class="scope-hint">${esc(goal.scopeHint)}</p>` : ''}

          <div class="goal-block">
            <div class="goal-block-head"><span>Ações</span><b>${goal.actions.filter((_, i) => state.checks[`${goal.id}:a:${i}`]).length}/${goal.actions.length}</b></div>
            <div class="checklist">
              ${goal.actions.map((a, i) => checkItem(`${goal.id}:a:${i}`, a)).join('')}
            </div>
          </div>

          <div class="goal-block">
            <div class="goal-block-head"><span>Evidências de conclusão</span><b>${goal.proofs.filter((_, i) => state.checks[`${goal.id}:p:${i}`]).length}/${goal.proofs.length}</b></div>
            <div class="checklist">
              ${goal.proofs.map((p, i) => checkItem(`${goal.id}:p:${i}`, p)).join('')}
            </div>
          </div>

          <div class="success-box">
            <strong>Critério de sucesso</strong>
            <p>${esc(goal.success)}</p>
          </div>

          <div class="goal-foot">
            <div>
              <label for="status-${goal.id}">Status</label>
              <select class="select" id="status-${goal.id}" data-goal-status="${goal.id}">
                ${D.goalStatuses.map((s) => `<option value="${s.id}" ${s.id === status ? 'selected' : ''}>${esc(s.label)}</option>`).join('')}
              </select>
            </div>
            <span class="goal-evidence-count"><b>${doneItems}</b>/${goalItems(goal).length} itens · <b>${linked}</b> evidências</span>
          </div>
        </article>`;
      })
      .join('');
    observeReveals();
  }

  /* ---------------------------------------------------------
     Render — fases
     --------------------------------------------------------- */
  function renderPhases() {
    const info = cycleInfo();
    $('#phase-grid').innerHTML = D.phases
      .map((phase) => {
        const { start, end } = phaseDates(phase);
        const isCurrent = !info.notStarted && !info.finished && phase.id === info.phase.id;
        const isPast = info.day > phase.to || info.finished;
        const pct = phaseProgress(phase);
        return `
        <article class="phase-card ${rv('phases')} ${isCurrent ? 'is-current' : ''} ${isPast && !isCurrent ? 'is-past' : ''}">
          <div class="phase-top">
            <span class="phase-range">Dias ${phase.from}–${phase.to}</span>
            ${isCurrent ? '<span class="chip chip-live">Agora</span>' : ''}
          </div>
          <h3>${esc(phase.title)}</h3>
          <span class="phase-dates">${fmtShort(start)} — ${fmtShort(end)}</span>
          <div class="phase-items">
            ${phase.items.map((item, i) => checkItem(`${phase.id}:${i}`, item)).join('')}
          </div>
          <div class="phase-meter"><i style="width:${pct}%"></i></div>
        </article>`;
      })
      .join('');
    observeReveals();
  }

  /* ---------------------------------------------------------
     Render — matriz de competências + radar
     --------------------------------------------------------- */
  function radarPoints(radius, center, values, max = 5) {
    const step = (Math.PI * 2) / values.length;
    return values.map((v, i) => {
      const angle = -Math.PI / 2 + i * step;
      const r = (clamp(v, 0, max) / max) * radius;
      return [center.x + Math.cos(angle) * r, center.y + Math.sin(angle) * r];
    });
  }

  const pointsAttr = (points) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  function renderRadar() {
    const size = { w: 440, h: 350 };
    const center = { x: 220, y: 170 };
    const R = 112;
    const dims = D.dimensions;
    const levels = dims.map(effectiveLevel);
    const targets = dims.map((d) => d.target);

    const rings = [1, 2, 3, 4, 5]
      .map((lvl) => `<polygon class="radar-ring" points="${pointsAttr(radarPoints(R, center, dims.map(() => lvl)))}"/>`)
      .join('');

    const axes = radarPoints(R, center, dims.map(() => 5))
      .map(([x, y]) => `<line class="radar-axis" x1="${center.x}" y1="${center.y}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`)
      .join('');

    const labels = radarPoints(R + 26, center, dims.map(() => 5))
      .map(([x, y], i) => {
        const dx = x - center.x;
        const anchor = Math.abs(dx) < 12 ? 'middle' : dx > 0 ? 'start' : 'end';
        // sem avaliação = neutro; avaliado abaixo do alvo = gap explícito
        const status = levels[i] === 0 ? '' : levels[i] < dims[i].target ? 'is-gap' : 'is-ok';
        return `<text class="radar-label ${status}" x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}" text-anchor="${anchor}">${esc(dims[i].short)}</text>`;
      })
      .join('');

    const currentPts = radarPoints(R, center, levels);
    const dots = currentPts
      .map(([x, y]) => `<circle class="radar-point" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4"/>`)
      .join('');

    $('#radar-wrap').innerHTML = `
      <svg viewBox="0 0 ${size.w} ${size.h}" role="img" aria-label="Radar de competências, escala 0 a 5">
        ${rings}${axes}
        <polygon class="radar-target" points="${pointsAttr(radarPoints(R, center, targets))}"/>
        <polygon class="radar-current" points="${pointsAttr(currentPts)}"/>
        ${dots}${labels}
      </svg>`;

    const scored = dims.filter((d) => effectiveLevel(d) > 0).length;
    const gaps = dims.filter((d) => effectiveLevel(d) < d.target).length;
    const avg = levels.reduce((a, b) => a + b, 0) / dims.length;
    $('#radar-summary').innerHTML = `
      <div><strong>${avg.toFixed(1)}</strong><span>Média atual</span></div>
      <div><strong>${scored}/${dims.length}</strong><span>Com evidência</span></div>
      <div><strong>${gaps}</strong><span>Abaixo do alvo</span></div>`;
  }

  function renderMatrix() {
    $('#matrix-list').innerHTML = D.dimensions
      .map((dim) => {
        const entry = state.matrix[dim.id];
        const level = Number(entry.level) || 0;
        const hasEvidence = Boolean(entry.evidence.trim());
        const gap = effectiveLevel(dim) < dim.target;
        return `
        <article class="matrix-row ${rv('matrix')} ${gap ? 'is-gap' : ''}" data-dim="${dim.id}">
          <div class="matrix-row-top">
            <div>
              <h4>${esc(dim.name)}</h4>
              <p>${esc(dim.desc)}</p>
            </div>
            <span class="matrix-target">Alvo <b>${dim.target}</b></span>
          </div>
          <div class="level-picker" role="group" aria-label="Nível de ${esc(dim.short)}">
            ${D.scale
              .map((s) => `<button type="button" data-level="${s.level}" data-dim="${dim.id}" class="${s.level === level ? 'is-on' : ''}" title="${esc(s.label)}" aria-pressed="${s.level === level}">${s.level}</button>`)
              .join('')}
          </div>
          <p class="level-caption">${esc(D.scale[level].label)}</p>
          <input class="matrix-evidence" data-dim-evidence="${dim.id}" value="${esc(entry.evidence)}" placeholder="Evidência que sustenta esta nota (contexto, ação, resultado, alcance)">
          ${level > 0 && !hasEvidence ? `<span class="no-evidence">${icon('warn')} Sem evidência: contabilizado como 0</span>` : ''}
        </article>`;
      })
      .join('');
    renderRadar();
    observeReveals();
  }

  /* ---------------------------------------------------------
     Render — evidências
     --------------------------------------------------------- */
  const evidenceFilters = { goal: 'all', confidence: 'all', query: '' };
  let editingId = null;

  function renderEvidenceForm() {
    $('#evidence-goal').innerHTML =
      '<option value="">Não vinculado</option>' +
      D.goals.map((g) => `<option value="${g.id}">${g.index} · ${esc(g.title)}</option>`).join('');
    $('#evidence-scope').innerHTML = D.scopes.map((s) => `<option>${esc(s)}</option>`).join('');
    $('#evidence-confidence').innerHTML = D.confidences.map((c) => `<option>${esc(c)}</option>`).join('');
    $('#evidence-dimensions').innerHTML = D.dimensions
      .map((d) => `<button type="button" class="tag-toggle" data-dim-tag="${d.id}">${esc(d.short)}</button>`)
      .join('');
    $('#checkpoint-type').innerHTML = D.checkpointTypes.map((t) => `<option>${esc(t)}</option>`).join('');
    const today = toISO(startOfToday());
    $('#evidence-form').elements.date.value = today;
    $('#checkpoint-form').elements.date.value = today;
  }

  function renderEvidenceFilters() {
    const chips = [
      { key: 'goal', value: 'all', label: 'Todos os objetivos' },
      ...D.goals.map((g) => ({ key: 'goal', value: g.id, label: `${g.index} · ${g.tag}` })),
      { key: 'confidence', value: 'all', label: 'Toda confiança' },
      ...D.confidences.map((c) => ({ key: 'confidence', value: c, label: c }))
    ];
    $('#evidence-filters').innerHTML = chips
      .map(
        (c) =>
          `<button type="button" class="filter-chip ${evidenceFilters[c.key] === c.value ? 'is-on' : ''}" data-filter="${c.key}" data-value="${esc(c.value)}">${esc(c.label)}</button>`
      )
      .join('');
  }

  const confClass = (c) =>
    c === 'Forte' ? 'conf-forte' : c === 'Boa' ? 'conf-boa' : 'conf-construcao';

  function filteredEvidences() {
    const q = evidenceFilters.query.trim().toLowerCase();
    return state.evidences.filter((e) => {
      if (evidenceFilters.goal !== 'all' && e.goal !== evidenceFilters.goal) return false;
      if (evidenceFilters.confidence !== 'all' && e.confidence !== evidenceFilters.confidence) return false;
      if (!q) return true;
      return [e.title, e.context, e.action, e.result].join(' ').toLowerCase().includes(q);
    });
  }

  function renderEvidences() {
    const list = $('#evidence-list');
    const items = filteredEvidences();

    $('#evidence-count').textContent = state.evidences.length;
    $('#evidence-strong').textContent = state.evidences.filter((e) => e.confidence === 'Forte').length;
    $('#evidence-target').textContent = `${Math.min(state.evidences.length, 5)}/5`;

    if (!items.length) {
      const empty = state.evidences.length === 0;
      list.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">${icon(empty ? 'plus' : 'search')}</span>
          <p>${empty ? 'Nenhuma evidência registrada ainda.' : 'Nenhuma evidência para este filtro.'}</p>
          <small>${
            empty
              ? 'Comece pelos casos que você já viveu: uma melhoria entregue, uma decisão técnica defendida, um material que outra pessoa usou. Meta do ciclo: 5 casos estruturados.'
              : 'Ajuste os filtros ou a busca para ver outros registros.'
          }</small>
        </div>`;
      return;
    }

    list.innerHTML = items
      .map((e) => {
        const goal = D.goals.find((g) => g.id === e.goal);
        const dims = (e.dimensions || [])
          .map((id) => D.dimensions.find((d) => d.id === id))
          .filter(Boolean);
        return `
        <article class="evidence-card" data-evidence="${e.id}">
          <div class="evidence-card-top">
            <div>
              <div class="evidence-meta">
                ${goal ? `<span class="chip">${esc(goal.index)} · ${esc(goal.tag)}</span>` : ''}
                <span class="chip">${esc(e.scope)}</span>
              </div>
              <h3>${esc(e.title)}</h3>
            </div>
            <div class="evidence-card-actions">
              <button class="mini-button" type="button" data-edit="${e.id}" aria-label="Editar evidência">${icon('edit')}</button>
              <button class="mini-button danger" type="button" data-delete="${e.id}" aria-label="Excluir evidência">${icon('trash')}</button>
            </div>
          </div>
          <dl class="evidence-body">
            <div><dt>Contexto</dt><dd>${nl2br(e.context)}</dd></div>
            <div><dt>Ação</dt><dd>${nl2br(e.action)}</dd></div>
            <div><dt>Resultado</dt><dd>${nl2br(e.result)}</dd></div>
          </dl>
          <div class="evidence-foot">
            <span class="conf-chip ${confClass(e.confidence)}">${esc(e.confidence)}</span>
            ${dims.map((d) => `<span class="chip">${esc(d.short)}</span>`).join('')}
            <span class="evidence-date">${esc(e.date || (e.createdAt || '').slice(0, 10))}</span>
          </div>
        </article>`;
      })
      .join('');
  }

  function startEditEvidence(id) {
    const item = state.evidences.find((e) => e.id === id);
    if (!item) return;
    editingId = id;
    const form = $('#evidence-form');
    form.elements.title.value = item.title;
    form.elements.context.value = item.context;
    form.elements.action.value = item.action;
    form.elements.result.value = item.result;
    form.elements.goal.value = item.goal || '';
    form.elements.scope.value = item.scope;
    form.elements.confidence.value = item.confidence;
    form.elements.date.value = item.date || '';
    $$('[data-dim-tag]').forEach((btn) =>
      btn.classList.toggle('is-on', (item.dimensions || []).includes(btn.dataset.dimTag))
    );
    $('#evidence-form-title').textContent = 'Editar evidência';
    $('#evidence-submit').textContent = 'Salvar alterações';
    $('#evidence-cancel').hidden = false;
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.elements.title.focus();
  }

  function resetEvidenceForm() {
    editingId = null;
    const form = $('#evidence-form');
    form.reset();
    form.elements.date.value = toISO(startOfToday());
    $$('[data-dim-tag]').forEach((btn) => btn.classList.remove('is-on'));
    $$('.field.is-invalid', form).forEach((f) => f.classList.remove('is-invalid'));
    $('#evidence-form-title').textContent = 'Nova evidência';
    $('#evidence-submit').textContent = 'Adicionar evidência';
    $('#evidence-cancel').hidden = true;
  }

  /* ---------------------------------------------------------
     Render — indicadores
     --------------------------------------------------------- */
  function renderIndicators() {
    $('#indicator-grid').innerHTML = D.indicators
      .map((ind) => {
        const s = indicatorState(ind);
        return `
        <article class="indicator-card ${rv('indicators')} ${s.met ? 'is-met' : ''}">
          <div class="indicator-top">
            <span class="indicator-badge">${s.met ? icon('check') : icon('target')}</span>
            <h3>${esc(ind.label)}</h3>
          </div>
          <small>${esc(ind.hint)}</small>
          <div class="indicator-meter"><i style="width:${clamp(s.pct, 0, 100)}%"></i></div>
          <span class="indicator-value">${esc(s.display)}</span>
        </article>`;
      })
      .join('');
    observeReveals();
  }

  /* ---------------------------------------------------------
     Render — checkpoints
     --------------------------------------------------------- */
  function renderCheckpoints() {
    const list = $('#checkpoint-list');
    if (!state.checkpoints.length) {
      list.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">${icon('note')}</span>
          <p>Nenhum checkpoint registrado.</p>
          <small>O PDI só se corrige com fatos novos. Registre revisões quinzenais ou mensais — o ciclo exige pelo menos dois checkpoints formais e uma banca final.</small>
        </div>`;
      return;
    }

    const ordered = [...state.checkpoints].sort((a, b) => (a.date < b.date ? 1 : -1));
    list.innerHTML = ordered
      .map((c) => {
        const rows = [
          ['O que mudou', c.changed],
          ['Aprendizado / hipótese', c.learned],
          ['Decisões', c.decisions],
          ['Bloqueios e apoio', c.blockers],
          ['Próximo passo', c.next]
        ].filter(([, v]) => v && v.trim());
        return `
        <article class="checkpoint-card ${c.type === 'Banca' ? 'is-banca' : ''}">
          <div class="checkpoint-head">
            <div>
              <span class="chip">${esc(c.type)}</span>
              <h3>${esc(fmtLong(c.date))}</h3>
            </div>
            <button class="mini-button danger" type="button" data-delete-checkpoint="${c.id}" aria-label="Excluir checkpoint">${icon('trash')}</button>
          </div>
          <dl class="checkpoint-body">
            ${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${nl2br(v)}</dd></div>`).join('')}
          </dl>
        </article>`;
      })
      .join('');
  }

  /* ---------------------------------------------------------
     Render — perguntas para a liderança
     --------------------------------------------------------- */
  function renderQuestions() {
    $('#question-grid').innerHTML = D.leadershipQuestions
      .map((q, i) => {
        const answer = state.answers[q.id] || '';
        return `
        <article class="question-card ${rv('questions')} ${answer.trim() ? 'is-answered' : ''}">
          <div class="question-card-top">
            <span class="question-num">${String(i + 1).padStart(2, '0')}</span>
            <p>${esc(q.text)}</p>
          </div>
          <textarea data-answer="${q.id}" placeholder="Resposta obtida com a liderança…">${esc(answer)}</textarea>
        </article>`;
      })
      .join('');
    const answered = D.leadershipQuestions.filter((q) => (state.answers[q.id] || '').trim()).length;
    $('#question-progress').textContent = `${answered} de ${D.leadershipQuestions.length} respondidas`;
    observeReveals();
  }

  /* ---------------------------------------------------------
     Render — horizontes, links, dados
     --------------------------------------------------------- */
  function renderStatic() {
    $('#horizon-grid').innerHTML = D.horizons
      .map(
        (h) => `
        <article class="horizon-card reveal">
          <span class="eyebrow">${h.id === 'h6' ? 'Médio prazo' : 'Longo prazo'}</span>
          <h3 style="margin-top:10px">${esc(h.title)}</h3>
          <ol>${h.items.map((i) => `<li><span>${esc(i)}</span></li>`).join('')}</ol>
        </article>`
      )
      .join('');

    $('#link-grid').innerHTML = D.links
      .map((l) => {
        const tag = l.href ? 'a' : 'article';
        return `
        <${tag} class="link-card reveal ${l.featured ? 'featured' : ''}" ${l.href ? `href="${esc(l.href)}" target="_blank" rel="noreferrer"` : ''}>
          <span class="eyebrow">${esc(l.kicker)}</span>
          <h3>${esc(l.title)}</h3>
          <p>${esc(l.text)}</p>
          <strong>${esc(l.cta)} ${icon('external')}</strong>
        </${tag}>`;
      })
      .join('');
    observeReveals();
  }

  function renderStorageNote() {
    const note = $('#storage-note');
    if (!note) return;
    const when = state.savedAt ? new Date(state.savedAt) : null;
    note.textContent = when
      ? `Última alteração salva em ${when.toLocaleDateString('pt-BR')} às ${when.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`
      : 'Nenhuma alteração salva ainda neste navegador.';
  }

  /* ---------------------------------------------------------
     Exportações
     --------------------------------------------------------- */
  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportJSON() {
    const payload = {
      exportedAt: new Date().toISOString(),
      profile: D.profile.name,
      cycle: D.cycle,
      state
    };
    download(`pdi-${toISO(startOfToday())}.json`, JSON.stringify(payload, null, 2), 'application/json');
    toast('JSON exportado.');
  }

  function exportMarkdown() {
    const info = cycleInfo();
    const s = scores();
    const lines = [];

    lines.push(`# PDI — ${D.profile.name} — status em ${fmtLong(toISO(startOfToday()))}`, '');
    lines.push(`Ciclo: ${D.cycle.label} · dia ${info.day} de ${D.cycle.lengthDays} · fase "${info.phase.title}".`);
    lines.push(`Prontidão geral: ${Math.round(s.overall)}% (execução ${Math.round(s.execution)}%, indicadores ${Math.round(s.indicators)}%, matriz ${Math.round(s.matrix)}%).`, '');

    lines.push('## Objetivos', '');
    D.goals.forEach((goal) => {
      const status = D.goalStatuses.find((st) => st.id === (state.goalStatus[goal.id] || 'nao-iniciado'));
      lines.push(`### ${goal.index} — ${goal.title}`);
      lines.push(`Status: ${status.label} · progresso ${Math.round(goalProgress(goal))}%`, '');
      lines.push('Ações:');
      goal.actions.forEach((a, i) => lines.push(`- [${state.checks[`${goal.id}:a:${i}`] ? 'x' : ' '}] ${a}`));
      lines.push('', 'Evidências de conclusão:');
      goal.proofs.forEach((p, i) => lines.push(`- [${state.checks[`${goal.id}:p:${i}`] ? 'x' : ' '}] ${p}`));
      lines.push('');
    });

    lines.push('## Matriz de competências (0–5, nota só com evidência)', '');
    lines.push('| Dimensão | Nível | Alvo | Evidência |', '| --- | --- | --- | --- |');
    D.dimensions.forEach((dim) => {
      const entry = state.matrix[dim.id];
      lines.push(`| ${dim.name} | ${effectiveLevel(dim)} | ${dim.target} | ${(entry.evidence || '—').replace(/\|/g, '/').replace(/\n/g, ' ')} |`);
    });
    lines.push('');

    lines.push('## Indicadores do ciclo', '');
    D.indicators.forEach((ind) => {
      const st = indicatorState(ind);
      lines.push(`- [${st.met ? 'x' : ' '}] ${ind.label} — ${st.display}`);
    });
    lines.push('');

    lines.push(`## Evidências (${state.evidences.length})`, '');
    if (!state.evidences.length) lines.push('_Nenhuma evidência registrada._', '');
    state.evidences.forEach((e) => {
      const goal = D.goals.find((g) => g.id === e.goal);
      lines.push(`### ${e.title}`);
      lines.push(`${e.date || ''} · escopo ${e.scope} · confiança ${e.confidence}${goal ? ` · objetivo ${goal.index}` : ''}`, '');
      lines.push(`- **Contexto:** ${e.context}`);
      lines.push(`- **Ação:** ${e.action}`);
      lines.push(`- **Resultado:** ${e.result}`);
      if ((e.dimensions || []).length) {
        const names = e.dimensions.map((id) => D.dimensions.find((d) => d.id === id)?.short).filter(Boolean);
        lines.push(`- **Competências:** ${names.join(', ')}`);
      }
      lines.push('');
    });

    lines.push(`## Checkpoints (${state.checkpoints.length})`, '');
    if (!state.checkpoints.length) lines.push('_Nenhum checkpoint registrado._', '');
    [...state.checkpoints]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .forEach((c) => {
        lines.push(`### ${c.date} — ${c.type}`);
        if (c.changed) lines.push(`- **O que mudou:** ${c.changed}`);
        if (c.learned) lines.push(`- **Aprendizado / hipótese:** ${c.learned}`);
        if (c.decisions) lines.push(`- **Decisões:** ${c.decisions}`);
        if (c.blockers) lines.push(`- **Bloqueios e apoio:** ${c.blockers}`);
        if (c.next) lines.push(`- **Próximo passo:** ${c.next}`);
        lines.push('');
      });

    lines.push('## Perguntas para a liderança', '');
    D.leadershipQuestions.forEach((q, i) => {
      lines.push(`${i + 1}. ${q.text}`);
      lines.push(`   > ${(state.answers[q.id] || '_sem resposta registrada_').replace(/\n/g, ' ')}`);
    });
    lines.push('', `---`, `Fonte de verdade: ${D.governance.notionUrl}`, `Governança: ${D.governance.note}`);

    download(`pdi-${toISO(startOfToday())}.md`, lines.join('\n'), 'text/markdown;charset=utf-8');
    toast('Markdown exportado — pronto para colar no Notion.');
  }

  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const incoming = parsed.state || parsed;
        if (typeof incoming !== 'object' || !incoming) throw new Error('formato');
        if (!window.confirm('Importar substitui todo o conteúdo atual deste navegador. Continuar?')) return;
        state = {
          ...blankState(),
          ...incoming,
          checks: { ...(incoming.checks || {}) },
          goalStatus: { ...(incoming.goalStatus || {}) },
          matrix: { ...(incoming.matrix || {}) },
          answers: { ...(incoming.answers || {}) },
          prefs: { ...blankState().prefs, ...(incoming.prefs || {}) },
          evidences: Array.isArray(incoming.evidences) ? incoming.evidences : [],
          checkpoints: Array.isArray(incoming.checkpoints) ? incoming.checkpoints : []
        };
        D.dimensions.forEach((dim) => {
          state.matrix[dim.id] = { level: 0, evidence: '', ...(state.matrix[dim.id] || {}) };
        });
        save();
        renderAll();
        toast('Dados importados.');
      } catch {
        toast('Arquivo inválido: esperado um JSON exportado por este PDI.', { kind: 'error' });
      }
    };
    reader.readAsText(file);
  }

  /* ---------------------------------------------------------
     Tema
     --------------------------------------------------------- */
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    $('#theme-button').setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
  }

  function initTheme() {
    const stored = state.prefs.theme;
    const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    applyTheme(stored || system);
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    state.prefs.theme = next;
    applyTheme(next);
    save();
    renderRadar();
  }

  /* ---------------------------------------------------------
     Command palette
     --------------------------------------------------------- */
  const paletteEl = $('#palette');
  const paletteInput = $('#palette-input');
  const paletteList = $('#palette-list');
  let paletteIndex = 0;
  let paletteItems = [];

  function commands() {
    const nav = SECTIONS.filter((s) => s.id !== 'inicio').map((s) => ({
      group: 'Ir para',
      label: s.label,
      hint: `#${s.id}`,
      icon: 'arrow',
      run: () => goTo(s.id)
    }));

    const actions = [
      { group: 'Ações', label: 'Nova evidência', hint: 'E', icon: 'plus', run: newEvidence },
      { group: 'Ações', label: 'Registrar checkpoint', hint: '', icon: 'note', run: () => { goTo('checkpoints'); setTimeout(() => $('#checkpoint-form').elements.changed.focus(), 420); } },
      { group: 'Ações', label: 'Alternar tema claro/escuro', hint: 'T', icon: 'theme', run: toggleTheme },
      { group: 'Ações', label: 'Copiar perguntas para a liderança', hint: '', icon: 'copy', run: copyQuestions },
      { group: 'Ações', label: 'Copiar pauta da banca', hint: '', icon: 'copy', run: copyBanca },
      { group: 'Dados', label: 'Exportar JSON', hint: '', icon: 'download', run: exportJSON },
      { group: 'Dados', label: 'Exportar Markdown (Notion)', hint: '', icon: 'download', run: exportMarkdown },
      { group: 'Dados', label: 'Importar JSON', hint: '', icon: 'upload', run: () => $('#import-input').click() },
      { group: 'Dados', label: 'Imprimir / salvar em PDF', hint: '', icon: 'print', run: () => window.print() },
      { group: 'Dados', label: 'Limpar todos os dados locais', hint: '', icon: 'trash', run: resetData },
      { group: 'Links', label: 'Abrir PDI no Notion', hint: '', icon: 'external', run: () => window.open(D.governance.notionUrl, '_blank', 'noreferrer') },
      { group: 'Links', label: 'Abrir portfólio no GitHub', hint: '', icon: 'external', run: () => window.open(D.links[0].href, '_blank', 'noreferrer') }
    ];

    const goals = D.goals.map((g) => ({
      group: 'Objetivos',
      label: `${g.index} · ${g.title}`,
      hint: `${Math.round(goalProgress(g))}%`,
      icon: 'target',
      run: () => goTo('metas')
    }));

    return [...nav, ...actions, ...goals];
  }

  function renderPalette(query = '') {
    const q = query.trim().toLowerCase();
    paletteItems = commands().filter((c) => !q || `${c.group} ${c.label}`.toLowerCase().includes(q));
    paletteIndex = 0;

    if (!paletteItems.length) {
      paletteList.innerHTML = '<li class="palette-empty">Nada encontrado.</li>';
      return;
    }

    let html = '';
    let lastGroup = '';
    paletteItems.forEach((item, i) => {
      if (item.group !== lastGroup) {
        html += `<li class="palette-group">${esc(item.group)}</li>`;
        lastGroup = item.group;
      }
      html += `<li class="palette-item ${i === 0 ? 'is-active' : ''}" role="option" data-index="${i}">
        <span class="palette-icon">${icon(item.icon)}</span>
        <span>${esc(item.label)}</span>
        ${item.hint ? `<small>${esc(item.hint)}</small>` : ''}
      </li>`;
    });
    paletteList.innerHTML = html;
  }

  function movePalette(delta) {
    if (!paletteItems.length) return;
    paletteIndex = (paletteIndex + delta + paletteItems.length) % paletteItems.length;
    $$('.palette-item', paletteList).forEach((el) =>
      el.classList.toggle('is-active', Number(el.dataset.index) === paletteIndex)
    );
    const active = $('.palette-item.is-active', paletteList);
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function openPalette() {
    paletteEl.hidden = false;
    paletteInput.value = '';
    renderPalette('');
    paletteInput.focus();
  }

  function closePalette() {
    paletteEl.hidden = true;
  }

  function runPalette(index = paletteIndex) {
    const item = paletteItems[index];
    if (!item) return;
    closePalette();
    item.run();
  }

  /* ---------------------------------------------------------
     Ações
     --------------------------------------------------------- */
  function goTo(id) {
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }

  function newEvidence() {
    resetEvidenceForm();
    goTo('evidencias');
    setTimeout(() => $('#evidence-form').elements.title.focus({ preventScroll: true }), 420);
  }

  function copyQuestions() {
    const text = D.leadershipQuestions
      .map((q, i) => `${i + 1}. ${q.text}${state.answers[q.id]?.trim() ? `\n   → ${state.answers[q.id].trim()}` : ''}`)
      .join('\n');
    copyText(text, 'Roteiro de perguntas');
  }

  function copyBanca() {
    const text = [
      `Banca de PDI — ${D.profile.name}`,
      `Preparação: ${D.banca.prep}`,
      `Participantes: ${D.banca.people}`,
      '',
      'Agenda (60 min):',
      ...D.banca.agenda.map((a, i) => `${i + 1}. ${a.text} — ${a.min} min`),
      '',
      'Decisões obrigatórias:',
      ...D.banca.decisions.map((d) => `- ${d}`)
    ].join('\n');
    copyText(text, 'Pauta da banca');
  }

  function resetData() {
    if (!window.confirm('Apagar progresso, matriz, evidências, checkpoints e respostas salvos neste navegador?')) return;
    const backup = JSON.stringify(state);
    state = blankState();
    D.dimensions.forEach((dim) => { state.matrix[dim.id] = { level: 0, evidence: '' }; });
    localStorage.removeItem(STORAGE_KEY);
    renderAll();
    toast('Dados locais apagados.', {
      kind: 'warn',
      timeout: 9000,
      undo: () => {
        state = JSON.parse(backup);
        save();
        renderAll();
        toast('Dados restaurados.');
      }
    });
  }

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  let revealObserver = null;

  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach((el) => el.classList.add('is-in'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
      );
    }
    $$('.reveal:not(.is-in)').forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     Eventos
     --------------------------------------------------------- */
  const saveDebounced = debounce(() => save(), 500);

  function bindEvents() {
    // checkboxes (metas + fases)
    document.addEventListener('change', (event) => {
      const check = event.target.closest('[data-check]');
      if (check) {
        const key = check.dataset.check;
        state.checks[key] = check.checked;
        save();
        if (key.startsWith('fase-')) {
          renderPhases();
        } else {
          renderGoals();
          renderIndicators();
          renderScores();
        }
        return;
      }

      const status = event.target.closest('[data-goal-status]');
      if (status) {
        state.goalStatus[status.dataset.goalStatus] = status.value;
        save();
        renderGoals();
        renderIndicators();
        renderScores();
      }
    });

    // matriz: níveis
    document.addEventListener('click', (event) => {
      const level = event.target.closest('[data-level]');
      if (level) {
        state.matrix[level.dataset.dim].level = Number(level.dataset.level);
        save();
        renderMatrix();
        renderScores();
      }
    });

    // matriz: evidência (texto)
    document.addEventListener('input', (event) => {
      const dimInput = event.target.closest('[data-dim-evidence]');
      if (dimInput) {
        const dim = D.dimensions.find((d) => d.id === dimInput.dataset.dimEvidence);
        state.matrix[dim.id].evidence = dimInput.value;
        const row = dimInput.closest('.matrix-row');
        const warn = $('.no-evidence', row);
        const needsWarn = Number(state.matrix[dim.id].level) > 0 && !dimInput.value.trim();
        if (needsWarn && !warn) {
          dimInput.insertAdjacentHTML('afterend', `<span class="no-evidence">${icon('warn')} Sem evidência: contabilizado como 0</span>`);
        } else if (!needsWarn && warn) {
          warn.remove();
        }
        row.classList.toggle('is-gap', effectiveLevel(dim) < dim.target);
        saveDebounced();
        renderRadar();
        renderScores();
        return;
      }

      const answer = event.target.closest('[data-answer]');
      if (answer) {
        state.answers[answer.dataset.answer] = answer.value;
        answer.closest('.question-card').classList.toggle('is-answered', Boolean(answer.value.trim()));
        const answered = D.leadershipQuestions.filter((q) => (state.answers[q.id] || '').trim()).length;
        $('#question-progress').textContent = `${answered} de ${D.leadershipQuestions.length} respondidas`;
        saveDebounced();
      }
    });

    // ações globais
    document.addEventListener('click', (event) => {
      const actionEl = event.target.closest('[data-action]');
      if (actionEl) {
        const map = {
          palette: openPalette,
          'new-evidence': newEvidence,
          'export-json': exportJSON,
          'export-md': exportMarkdown,
          import: () => $('#import-input').click(),
          print: () => window.print(),
          reset: resetData,
          'copy-questions': copyQuestions,
          'copy-banca': copyBanca
        };
        (map[actionEl.dataset.action] || (() => {}))();
        return;
      }

      const tag = event.target.closest('[data-dim-tag]');
      if (tag) {
        tag.classList.toggle('is-on');
        return;
      }

      const filter = event.target.closest('[data-filter]');
      if (filter) {
        evidenceFilters[filter.dataset.filter] = filter.dataset.value;
        renderEvidenceFilters();
        renderEvidences();
        return;
      }

      const edit = event.target.closest('[data-edit]');
      if (edit) return startEditEvidence(edit.dataset.edit);

      const del = event.target.closest('[data-delete]');
      if (del) return deleteEvidence(del.dataset.delete);

      const delCp = event.target.closest('[data-delete-checkpoint]');
      if (delCp) return deleteCheckpoint(delCp.dataset.deleteCheckpoint);

      const navLink = event.target.closest('#mobile-menu a');
      if (navLink) closeMobileMenu();
    });

    // formulário de evidências
    $('#evidence-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const required = ['title', 'context', 'action', 'result'];
      let valid = true;
      required.forEach((name) => {
        const field = form.elements[name];
        const wrapper = field.closest('.field');
        const ok = field.value.trim().length > 0;
        wrapper.classList.toggle('is-invalid', !ok);
        if (!ok && valid) { field.focus(); valid = false; }
      });
      if (!valid) {
        toast('Preencha contexto, ação e resultado — evidência sem os três não sustenta nota.', { kind: 'warn' });
        return;
      }

      const payload = {
        title: form.elements.title.value.trim(),
        context: form.elements.context.value.trim(),
        action: form.elements.action.value.trim(),
        result: form.elements.result.value.trim(),
        goal: form.elements.goal.value,
        scope: form.elements.scope.value,
        confidence: form.elements.confidence.value,
        date: form.elements.date.value || toISO(startOfToday()),
        dimensions: $$('[data-dim-tag].is-on').map((b) => b.dataset.dimTag)
      };

      if (editingId) {
        const index = state.evidences.findIndex((e) => e.id === editingId);
        if (index >= 0) state.evidences[index] = { ...state.evidences[index], ...payload };
        toast('Evidência atualizada.');
      } else {
        state.evidences.unshift({ id: uid(), createdAt: new Date().toISOString(), ...payload });
        toast('Evidência registrada.');
      }

      resetEvidenceForm();
      save();
      renderEvidences();
      renderGoals();
      renderIndicators();
      renderScores();
    });

    $('#evidence-cancel').addEventListener('click', resetEvidenceForm);

    $('#evidence-search').addEventListener('input', (event) => {
      evidenceFilters.query = event.target.value;
      renderEvidences();
    });

    // formulário de checkpoints
    $('#checkpoint-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.elements.changed.value.trim()) {
        form.elements.changed.closest('.field').classList.add('is-invalid');
        form.elements.changed.focus();
        toast('Descreva o que mudou no período — sem fatos novos, mantenha o plano.', { kind: 'warn' });
        return;
      }
      state.checkpoints.unshift({
        id: uid(),
        date: form.elements.date.value || toISO(startOfToday()),
        type: form.elements.type.value,
        changed: form.elements.changed.value.trim(),
        learned: form.elements.learned.value.trim(),
        decisions: form.elements.decisions.value.trim(),
        blockers: form.elements.blockers.value.trim(),
        next: form.elements.next.value.trim()
      });
      form.reset();
      form.elements.date.value = toISO(startOfToday());
      $$('.field.is-invalid', form).forEach((f) => f.classList.remove('is-invalid'));
      save();
      renderCheckpoints();
      renderIndicators();
      renderScores();
      toast('Checkpoint registrado.');
    });

    $('#import-input').addEventListener('change', (event) => {
      const file = event.target.files?.[0];
      if (file) importJSON(file);
      event.target.value = '';
    });

    // tema e menus
    $('#theme-button').addEventListener('click', toggleTheme);
    $('#palette-button').addEventListener('click', openPalette);
    $('#menu-button').addEventListener('click', toggleMobileMenu);

    // palette
    paletteEl.addEventListener('click', (event) => {
      if (event.target === paletteEl) return closePalette();
      const item = event.target.closest('.palette-item');
      if (item) runPalette(Number(item.dataset.index));
    });
    paletteInput.addEventListener('input', (event) => renderPalette(event.target.value));
    paletteInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') { event.preventDefault(); movePalette(1); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); movePalette(-1); }
      else if (event.key === 'Enter') { event.preventDefault(); runPalette(); }
    });

    // atalhos globais
    document.addEventListener('keydown', (event) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        paletteEl.hidden ? openPalette() : closePalette();
        return;
      }
      if (event.key === 'Escape') {
        if (!paletteEl.hidden) closePalette();
        closeMobileMenu();
        return;
      }
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === '/') { event.preventDefault(); openPalette(); }
      else if (event.key.toLowerCase() === 't') toggleTheme();
      else if (event.key.toLowerCase() === 'e') { event.preventDefault(); newEvidence(); }
    });

    // scroll
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
          $('#page-progress i').style.width = `${pct}%`;
          $('#topbar').classList.toggle('is-stuck', window.scrollY > 12);
          setActiveSection();
          ticking = false;
        });
      },
      { passive: true }
    );

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
      if (!state.prefs.theme) applyTheme(event.matches ? 'light' : 'dark');
    });
  }

  function deleteEvidence(id) {
    const index = state.evidences.findIndex((e) => e.id === id);
    if (index < 0) return;
    const [removed] = state.evidences.splice(index, 1);
    if (editingId === id) resetEvidenceForm();
    save();
    renderEvidences();
    renderGoals();
    renderIndicators();
    renderScores();
    toast(`"${removed.title}" excluída.`, {
      kind: 'warn',
      undo: () => {
        state.evidences.splice(index, 0, removed);
        save();
        renderEvidences();
        renderGoals();
        renderIndicators();
        renderScores();
      }
    });
  }

  function deleteCheckpoint(id) {
    const index = state.checkpoints.findIndex((c) => c.id === id);
    if (index < 0) return;
    const [removed] = state.checkpoints.splice(index, 1);
    save();
    renderCheckpoints();
    renderIndicators();
    renderScores();
    toast('Checkpoint excluído.', {
      kind: 'warn',
      undo: () => {
        state.checkpoints.splice(index, 0, removed);
        save();
        renderCheckpoints();
        renderIndicators();
        renderScores();
      }
    });
  }

  function toggleMobileMenu() {
    const menu = $('#mobile-menu');
    const open = menu.hidden;
    menu.hidden = !open;
    $('#menu-button').setAttribute('aria-expanded', String(open));
  }

  function closeMobileMenu() {
    $('#mobile-menu').hidden = true;
    $('#menu-button').setAttribute('aria-expanded', 'false');
  }

  /* ---------------------------------------------------------
     Bootstrap
     --------------------------------------------------------- */
  function injectDefs() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    svg.innerHTML = `
      <defs>
        <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--accent)"/>
          <stop offset="100%" stop-color="var(--teal)"/>
        </linearGradient>
      </defs>`;
    document.body.appendChild(svg);
  }

  function renderAll() {
    safe('ciclo', renderCycle);
    safe('metas', renderGoals);
    safe('fases', renderPhases);
    safe('matriz', renderMatrix);
    safe('filtros de evidência', renderEvidenceFilters);
    safe('evidências', renderEvidences);
    safe('indicadores', renderIndicators);
    safe('checkpoints', renderCheckpoints);
    safe('perguntas', renderQuestions);
    safe('prontidão', renderScores);
    safe('nota de armazenamento', renderStorageNote);
  }

  function init() {
    safe('defs', injectDefs);
    safe('tema', initTheme);
    safe('navegação', renderNav);
    safe('cabeçalho', renderHeader);
    safe('posicionamento', renderPositioning);
    safe('trilhas', renderTracks);
    safe('blocos estáticos', renderStatic);
    safe('formulários', renderEvidenceForm);
    renderAll();
    safe('eventos', bindEvents);
    safe('animações', observeReveals);
    safe('scrollspy', setActiveSection);
    $('#topbar')?.classList.toggle('is-stuck', window.scrollY > 12);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
