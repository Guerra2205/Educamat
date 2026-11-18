# EducaMat
conferira: https://guerra2205.github.io/Educamat/
Site que analisa o resultado de exercícios de matemática e mostra ao estudante
quais assuntos ele deve revisar primeiro.

## Como executar

1. Baixe a pasta do projeto.
2. Rode um servidor local na pasta (por exemplo `python3 -m http.server 8000`) e abra `http://localhost:8000`. Os avisos e o modo app só funcionam assim, em HTTPS ou localhost. Abrir o `index.html` com dois cliques mostra o site, mas sem avisos.

## Estrutura

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura da página |
| `estilo.css` | Visual (cores, layout, tema claro e escuro) |
| `js/questoes.js` | Banco de questões e assuntos |
| `js/modelo.js` | Árvore de decisão que classifica a dificuldade |
| `js/sessao.js` | Contas e sessão do login (salvas no navegador) |
| `js/app.js` | Sorteio, telas, leitura das respostas e botões |
| `js/login.js` | Tela de login, abas e botão Sair |
| `js/notificacoes.js` | Avisos do sistema ao concluir o teste |
| `sw.js` | Service worker: avisos, modo offline e clique na notificação |
| `manifest.json` e `icones/` | Dados para instalar o site como app |

## Como funciona

1. Cada teste sorteia 6 assuntos e 3 questões de cada.
2. O site conta os acertos por assunto.
3. A árvore de decisão classifica: 3 acertos = domina, 2 = precisa revisar, 0 ou 1 = dificuldade alta.
4. A tela mostra o diagnóstico e a ordem de revisão.

## Como adicionar questões

Em `js/questoes.js`, inclua uma linha no `banco` do assunto. A **primeira**
alternativa é sempre a correta (o site embaralha antes de mostrar).
