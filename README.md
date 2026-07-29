# PDI Interativo — Marcus Romano

Aplicação estática para acompanhar o Plano de Desenvolvimento Individual de 2026, com metas, competências, timeline e registro local de evidências.

## Funcionalidades

- ciclo de desenvolvimento de 90 dias;
- acompanhamento de metas e checklists;
- matriz de competências;
- registro de evidências no formato contexto, ação e resultado;
- persistência local no navegador;
- exportação em JSON e impressão em PDF;
- integração com o portfólio e perfil do GitHub;
- deploy automático pelo GitHub Pages.

## Desenvolvimento local

Abra `index.html` diretamente ou execute:

```bash
python -m http.server 8000
```

## Privacidade

As informações adicionadas na área de evidências são armazenadas somente no `localStorage` do navegador e não são enviadas ao repositório.
