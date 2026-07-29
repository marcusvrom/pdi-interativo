const STORAGE_KEY = 'marcus-pdi-2026';

const initialState = {
  checks: {},
  progress: { ownership: 0, agents: 0, influence: 0 },
  evidences: []
};

function cloneInitialState() {
  return JSON.parse(JSON.stringify(initialState));
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      ...cloneInitialState(),
      ...stored,
      checks: { ...stored.checks },
      progress: { ...initialState.progress, ...stored.progress },
      evidences: Array.isArray(stored.evidences) ? stored.evidences : []
    };
  } catch {
    return cloneInitialState();
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateOverallProgress();
}

function updateOverallProgress() {
  const manualValues = Object.values(state.progress).map(Number);
  const manualScore = manualValues.reduce((sum, value) => sum + (value || 0), 0) / manualValues.length;
  const allChecks = [...document.querySelectorAll('[data-check]')];
  const completedChecks = allChecks.filter(input => input.checked).length;
  const checklistScore = allChecks.length ? (completedChecks / allChecks.length) * 100 : 0;
  const evidenceScore = Math.min(state.evidences.length / 5, 1) * 100;
  const total = Math.round(manualScore * 0.5 + checklistScore * 0.3 + evidenceScore * 0.2);

  document.querySelector('#overall-progress-label').textContent = `${total}%`;
  document.querySelector('#overall-progress-bar').style.width = `${total}%`;
}

function restoreControls() {
  document.querySelectorAll('[data-check]').forEach(input => {
    input.checked = Boolean(state.checks[input.dataset.check]);
    input.addEventListener('change', () => {
      state.checks[input.dataset.check] = input.checked;
      saveState();
    });
  });

  document.querySelectorAll('[data-progress]').forEach(input => {
    const key = input.dataset.progress;
    const output = input.parentElement.querySelector('output');
    input.value = state.progress[key] ?? 0;
    output.textContent = `${input.value}%`;

    input.addEventListener('input', () => {
      state.progress[key] = Number(input.value);
      output.textContent = `${input.value}%`;
      saveState();
    });
  });
}

function renderEvidences() {
  const list = document.querySelector('#evidence-list');
  const count = document.querySelector('#evidence-count');
  const template = document.querySelector('#evidence-template');

  count.textContent = state.evidences.length;
  list.innerHTML = '';

  if (!state.evidences.length) {
    list.innerHTML = `
      <div class="empty-state">
        <span>＋</span>
        <p>Seu portfólio ainda está vazio.</p>
        <small>Registre uma entrega, decisão ou melhoria relevante.</small>
      </div>`;
    updateOverallProgress();
    return;
  }

  state.evidences.forEach((item, index) => {
    const node = template.content.cloneNode(true);
    node.querySelector('.evidence-scope').textContent = item.scope;
    node.querySelector('.evidence-title').textContent = item.title;
    node.querySelector('.evidence-context').textContent = item.context;
    node.querySelector('.evidence-action').textContent = item.action;
    node.querySelector('.evidence-result').textContent = item.result;
    node.querySelector('.evidence-confidence').textContent = `Confiança: ${item.confidence}`;
    node.querySelector('.evidence-delete').addEventListener('click', () => {
      state.evidences.splice(index, 1);
      saveState();
      renderEvidences();
    });
    list.appendChild(node);
  });

  updateOverallProgress();
}

function restoreFromState() {
  document.querySelectorAll('[data-check]').forEach(input => {
    input.checked = Boolean(state.checks[input.dataset.check]);
  });

  document.querySelectorAll('[data-progress]').forEach(input => {
    input.value = state.progress[input.dataset.progress] ?? 0;
    input.parentElement.querySelector('output').textContent = `${input.value}%`;
  });

  renderEvidences();
  updateOverallProgress();
}

document.querySelector('#evidence-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  state.evidences.unshift({
    id: crypto.randomUUID?.() || String(Date.now()),
    createdAt: new Date().toISOString(),
    title: String(data.get('title')).trim(),
    context: String(data.get('context')).trim(),
    action: String(data.get('action')).trim(),
    result: String(data.get('result')).trim(),
    scope: String(data.get('scope')),
    confidence: String(data.get('confidence'))
  });

  event.currentTarget.reset();
  saveState();
  renderEvidences();
});

document.querySelector('#export-button').addEventListener('click', () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    profile: 'Marcus Romano',
    cycle: 'PDI 2026 — 90 dias',
    ...state
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pdi-marcus-romano.json';
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector('#print-button').addEventListener('click', () => window.print());

document.querySelector('#reset-button').addEventListener('click', () => {
  const confirmed = window.confirm('Deseja apagar o progresso e todas as evidências salvas neste navegador?');
  if (!confirmed) return;

  state = cloneInitialState();
  localStorage.removeItem(STORAGE_KEY);
  restoreFromState();
});

window.addEventListener('scroll', () => {
  const availableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = availableHeight > 0 ? (window.scrollY / availableHeight) * 100 : 0;
  document.querySelector('#page-progress').style.width = `${progress}%`;
});

restoreControls();
renderEvidences();
updateOverallProgress();
