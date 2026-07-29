# PDI Interativo — Marcus Romano

Camada de execução do Plano de Desenvolvimento Individual de 2026. O plano aprovado
vive nas KBs de Carreira no Notion; este site serve para **executar, medir e recalibrar**
o ciclo de 90 dias sem que nenhum dado saia do navegador.

## O que tem aqui

**Conteúdo (espelha o Notion)**

> **Recalibrado em 28/07/2026.** O ciclo assume autonomia limitada para criar backlog
> e concentra o desenvolvimento em capacidades aplicáveis às demandas já atribuídas.
> SDD, observabilidade, SRE, AWS, FinOps e engenharia agêntica são métodos e lentes,
> não objetivos profissionais concorrentes.

- objetivo de carreira, trilha primária, base profissional comprovada, diferenciação e horizonte;
- restrição de autonomia assumida explicitamente;
- 3 objetivos do ciclo com **ações**, **evidências de conclusão** e **critério de sucesso**;
- **trilhas de capacidade** conectadas aos objetivos: comunicação, arquitetura e integração,
  SDD, observabilidade/SRE, AWS/segurança, FinOps/negócio e engenharia agêntica;
- separação entre requisitos do ciclo e **stretch goals** dependentes de oportunidade ou alinhamento;
- prioridades explicitamente **fora de escopo** neste ciclo;
- plano por fase (dias 1–15, 16–45, 46–75, 76–90) com datas reais e fase atual destacada;
- matriz de competências: 9 dimensões, escala 0–5 e alvos indicativos de transição Pleno → Sênior;
- 7 indicadores derivados do ciclo;
- metas de 6 e 12 meses;
- perguntas obrigatórias para a liderança;
- playbook da banca trimestral (agenda de 60 min e decisões obrigatórias).

**Interação**

- **Prontidão do ciclo** calculada e explicada: execução 55% · indicadores 30% · matriz 15%;
- contador de dia do ciclo, fase atual e dias restantes;
- checklists por objetivo e por fase, com anel de progresso e status manual;
- **matriz interativa com radar** — a nota só conta quando há evidência escrita
  (regra da KB: ausência de evidência recebe 0, nunca estimativa otimista);
- registro de evidências (contexto → ação → resultado) com objetivo, escopo, confiança,
  competências demonstradas, busca, filtros, edição e desfazer exclusão;
- **indicadores derivados**: nada é marcável à mão, tudo vem do que foi registrado;
- diário de checkpoints para recalibração, com os prompts da skill de revisão;
- respostas às perguntas da liderança;
- **command palette** (`⌘K` / `Ctrl+K`), tema claro/escuro, atalhos (`T`, `E`, `/`);
- exportação em **JSON** (backup/restauração) e **Markdown** (para colar no Notion),
  importação de JSON e impressão em PDF.

## Estrutura

| Arquivo | Papel |
| --- | --- |
| `pdi-data.js` | Todo o conteúdo do PDI. **Atualize aqui quando o plano mudar no Notion.** |
| `index.html` | Estrutura semântica das seções |
| `styles.css` | Design system (tokens, temas claro/escuro, responsivo, print) |
| `app.js` | Estado, cálculo de progresso, renderização e interações |

Sem build, sem dependências: é HTML/CSS/JS estático publicado no GitHub Pages.

## Desenvolvimento local

```bash
python -m http.server 8000
```

## Fonte de verdade

O plano aprovado é o **PDI Atual — Marcus Romano — Baseline LinkedIn** no Notion.
Ao mudar o plano lá, atualize `pdi-data.js` e o campo `governance.updatedAt`.

## Privacidade

Progresso, matriz, evidências, checkpoints e respostas ficam apenas no `localStorage`
do navegador. Nada é enviado para servidor algum nem versionado no repositório —
exporte o JSON antes de trocar de máquina.

O conteúdo estático e público deve permanecer sanitizado: não versione nomes internos,
topologias reais, incidentes, vulnerabilidades, métricas, custos ou controles corporativos.