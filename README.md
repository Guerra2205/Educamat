# EducaMat
confira: https://guerra2205.github.io/Educamat/

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
| `js/conta.js` | Minha conta (perfil, segurança, preferências, excluir) e recuperação de senha |
| `js/notificacoes.js` | Avisos do sistema ao concluir o teste |
| `sw.js` | Service worker: avisos, modo offline e clique na notificação |
| `manifest.json` e `icones/` | Dados para instalar o site como app |

## Minha conta e recuperação de senha

- **Minha conta** (botão na barra de cima): perfil (nome e foto), troca de e-mail com código de confirmação, troca de senha (pede a atual), encerrar outras sessões, preferências (tema e aviso ao concluir o teste) e excluir conta (pede a senha).
- **Esqueceu a senha?** (na tela de login): o usuário informa o e-mail, recebe um código de 6 dígitos e cria a nova senha.
- Segurança aplicada: senha só como hash com sal; código com validade de 30 minutos, uso único e invalidado após 5 erros; resposta igual exista a conta ou não; limite de 3 pedidos a cada 15 minutos; trocar a senha encerra as outras sessões.
- **Limite importante:** o site não tem servidor, então o e-mail é **simulado**. O código aparece no botão "Abrir e-mail de demonstração". Para enviar e-mail de verdade, troque o corpo da função `enviarEmail` em `js/sessao.js` por uma chamada ao seu backend ou a um serviço como EmailJS ou Resend. Com contas e códigos guardados no navegador, a proteção real só existe com um servidor.

## Como funciona

1. Cada teste sorteia 6 assuntos e 3 questões de cada.
2. O site conta os acertos por assunto.
3. A árvore de decisão classifica: 3 acertos = domina, 2 = precisa revisar, 0 ou 1 = dificuldade alta.
4. A tela mostra o diagnóstico e a ordem de revisão.

## Como adicionar questões

Em `js/questoes.js`, inclua uma linha no `banco` do assunto. A **primeira**
alternativa é sempre a correta (o site embaralha antes de mostrar).
