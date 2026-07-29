(() => {
  'use strict';
  const R = window.PDI_ROADMAP;
  if (!R) return;

  const KEY = 'pdi.marcus.roadmap.v1';
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const goalLabels = { padrao: 'Julgamento', plataforma: 'Ownership', pessoas: 'Influência' };
  const load = () => {
    try { return { checks: {}, open: {}, filter: 'all', ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
    catch { return { checks: {}, open: {}, filter: 'all' }; }
  };
  let state = load();
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const allSteps = () => R.phases.flatMap((p) => p.steps);
  const progress = (steps) => steps.length ? Math.round(steps.filter((s) => state.checks[s.id]).length / steps.length * 100) : 0;

  function currentPhaseId() {
    const data = window.PDI_DATA;
    if (!data?.cycle?.startDate || !data?.phases) return R.phases[0].id;
    const start = new Date(`${data.cycle.startDate}T00:00:00`);
    const today = new Date(); today.setHours(0,0,0,0);
    const day = Math.max(1, Math.floor((today - start) / 86400000) + 1);
    const phase = data.phases.find((p) => day >= p.from && day <= p.to) || data.phases[data.phases.length - 1];
    return R.phases.find((p) => p.phaseRef === phase.id)?.id || R.phases[0].id;
  }

  function sectionTemplate() {
    return `<section class="section section-alt" id="roadmap">
      <div class="container">
        <div class="section-heading reveal is-in">
          <span class="eyebrow">Passo a passo interativo</span>
          <h2>${esc(R.title)}</h2>
          <p>${esc(R.subtitle)}</p>
        </div>
        <div class="roadmap-shell">
          <article class="roadmap-overview reveal is-in">
            <div class="roadmap-overview-copy">
              <span class="eyebrow">Visão do ciclo</span>
              <h3>48 subtarefas organizadas em quatro fases</h3>
              <p>Expanda cada fase, filtre por objetivo e marque o progresso. Os dados permanecem somente neste navegador.</p>
            </div>
            <div class="roadmap-overview-score" id="roadmap-score"><div class="roadmap-score-inner"><strong>0%</strong><br><span>concluído</span></div></div>
          </article>
          <div class="roadmap-toolbar reveal is-in">
            <div class="roadmap-filters" id="roadmap-filters"></div>
            <div class="roadmap-toolbar-actions">
              <button class="button button-ghost" type="button" data-roadmap-action="expand">Expandir tudo</button>
              <button class="button button-ghost" type="button" data-roadmap-action="collapse">Recolher tudo</button>
            </div>
          </div>
          <div class="roadmap-timeline" id="roadmap-timeline"></div>
          <p class="roadmap-empty" id="roadmap-empty">Nenhuma subtarefa corresponde ao filtro selecionado.</p>
        </div>
      </div>
    </section>`;
  }

  function stepTemplate(step, index) {
    const checked = !!state.checks[step.id];
    const hidden = state.filter !== 'all' && state.filter !== step.goal;
    return `<article class="roadmap-step${checked ? ' is-done' : ''}${hidden ? ' is-hidden' : ''}" data-roadmap-goal="${esc(step.goal)}">
      <input class="roadmap-step-check" type="checkbox" data-roadmap-step="${esc(step.id)}" ${checked ? 'checked' : ''} aria-label="Concluir ${esc(step.title)}">
      <div><span class="roadmap-step-code">${String(index + 1).padStart(2,'0')}</span><h4>${esc(step.title)}</h4><p>${esc(step.detail)}</p><span class="roadmap-step-evidence"><b>Evidência:</b> ${esc(step.evidence)}</span></div>
      <span class="roadmap-goal-chip">${esc(goalLabels[step.goal])}</span>
    </article>`;
  }

  function render() {
    const timeline = document.querySelector('#roadmap-timeline');
    if (!timeline) return;
    const current = currentPhaseId();
    timeline.innerHTML = R.phases.map((phase) => {
      const pct = progress(phase.steps);
      const open = state.open[phase.id] ?? (phase.id === current);
      const visible = state.filter === 'all' || phase.steps.some((s) => s.goal === state.filter);
      return `<article class="roadmap-phase${open ? ' is-open' : ''}${phase.id === current ? ' is-current' : ''}" data-roadmap-phase="${esc(phase.id)}" ${visible ? '' : 'hidden'}>
        <header class="roadmap-phase-head" data-roadmap-toggle="${esc(phase.id)}" tabindex="0" role="button" aria-expanded="${open}">
          <div class="roadmap-phase-index">${esc(phase.index)}</div>
          <div class="roadmap-phase-title"><small>${esc(phase.label)}${phase.id === current ? ' · fase atual' : ''}</small><h3>${esc(phase.title)}</h3><p>${esc(phase.emphasis)}</p></div>
          <div class="roadmap-phase-progress"><div class="roadmap-phase-progress-top"><span>${phase.steps.filter((s) => state.checks[s.id]).length}/${phase.steps.length} tarefas</span><strong>${pct}%</strong></div><div class="roadmap-mini-track"><i style="width:${pct}%"></i></div></div>
          <button class="roadmap-chevron" type="button" aria-label="Alternar fase"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>
        </header>
        <div class="roadmap-phase-body">
          <div class="roadmap-steps">${phase.steps.map(stepTemplate).join('')}</div>
          <div class="roadmap-phase-footer">
            <div class="roadmap-info"><h4>Entregáveis esperados</h4><ul>${phase.outputs.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>
            <div class="roadmap-info roadmap-gate"><h4>Gate de saída</h4><p>${esc(phase.gate)}</p></div>
          </div>
        </div>
      </article>`;
    }).join('');

    const filters = document.querySelector('#roadmap-filters');
    filters.innerHTML = R.filters.map((f) => `<button class="roadmap-filter${state.filter === f.id ? ' is-active' : ''}" type="button" data-roadmap-filter="${esc(f.id)}">${esc(f.label)}</button>`).join('');
    const total = progress(allSteps());
    const score = document.querySelector('#roadmap-score');
    score.style.setProperty('--roadmap-progress', total);
    score.querySelector('strong').textContent = `${total}%`;
    document.querySelector('#roadmap-empty').style.display = timeline.querySelector('[data-roadmap-phase]:not([hidden])') ? 'none' : 'block';
  }

  function addNavigation() {
    const nav = document.querySelector('#nav-links');
    if (nav && !nav.querySelector('a[href="#roadmap"]')) {
      const a = document.createElement('a'); a.href = '#roadmap'; a.textContent = 'Roadmap';
      const target = nav.querySelector('a[href="#trilhas"]'); nav.insertBefore(a, target || null);
    }
    const mobile = document.querySelector('#mobile-menu');
    if (mobile && !mobile.querySelector('a[href="#roadmap"]')) {
      const a = document.createElement('a'); a.href = '#roadmap'; a.textContent = 'Roadmap';
      mobile.appendChild(a);
    }
  }

  function boot() {
    const anchor = document.querySelector('#trilhas') || document.querySelector('#fases');
    if (!anchor || document.querySelector('#roadmap')) return;
    anchor.insertAdjacentHTML('beforebegin', sectionTemplate());
    addNavigation();
    render();

    document.querySelector('#roadmap').addEventListener('click', (event) => {
      const filter = event.target.closest('[data-roadmap-filter]');
      if (filter) { state.filter = filter.dataset.roadmapFilter; save(); render(); return; }
      const action = event.target.closest('[data-roadmap-action]');
      if (action) {
        const open = action.dataset.roadmapAction === 'expand';
        R.phases.forEach((p) => { state.open[p.id] = open; }); save(); render(); return;
      }
      const toggle = event.target.closest('[data-roadmap-toggle]');
      if (toggle && !event.target.closest('input')) {
        const id = toggle.dataset.roadmapToggle; state.open[id] = !(state.open[id] ?? id === currentPhaseId()); save(); render();
      }
    });
    document.querySelector('#roadmap').addEventListener('change', (event) => {
      const checkbox = event.target.closest('[data-roadmap-step]');
      if (!checkbox) return;
      state.checks[checkbox.dataset.roadmapStep] = checkbox.checked; save(); render();
    });
    document.querySelector('#roadmap').addEventListener('keydown', (event) => {
      const toggle = event.target.closest('[data-roadmap-toggle]');
      if (toggle && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); toggle.click(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
