/* ============ TELA DE LOGIN: abas, formulário e botão Sair ============ */
let modoCadastro = false;

// Mostra o login ou o teste, dependendo de quem está logado
function atualizarTela() {
  const usuario = usuarioLogado();
  document.getElementById("tela-login").hidden = !!usuario;
  document.getElementById("tela-teste").hidden = !usuario;
  if (usuario) document.getElementById("saudacao").textContent = "Olá, " + usuario.nome;
  window.scrollTo(0, 0);
}

function escolherModo(cadastro) {
  modoCadastro = cadastro;
  document.getElementById("aba-entrar").setAttribute("aria-selected", String(!cadastro));
  document.getElementById("aba-criar").setAttribute("aria-selected", String(cadastro));
  document.getElementById("campo-nome").hidden = !cadastro;
  document.getElementById("dica-senha").hidden = !cadastro;
  document.getElementById("botao-login").textContent = cadastro ? "Criar conta" : "Entrar";
  document.getElementById("senha").setAttribute("autocomplete", cadastro ? "new-password" : "current-password");
  document.getElementById("mensagem-login").hidden = true;
}

function limparFormulario() {
  document.getElementById("formulario-login").reset();
}

document.getElementById("aba-entrar").addEventListener("click", function () { escolherModo(false); });
document.getElementById("aba-criar").addEventListener("click", function () { escolherModo(true); });

document.getElementById("formulario-login").addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const mensagem = document.getElementById("mensagem-login");
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!window.crypto || !crypto.subtle) {
    mensagem.textContent = "Este navegador não permite o login. Abra o site em um navegador atual.";
    mensagem.hidden = false;
    return;
  }

  const resposta = modoCadastro ? await cadastrar(nome, email, senha) : await entrar(email, senha);
  if (!resposta.ok) {
    mensagem.textContent = resposta.mensagem;
    mensagem.hidden = false;
    return;
  }
  mensagem.hidden = true;
  limparFormulario();
  atualizarTela();
});

document.getElementById("botao-sair").addEventListener("click", function () {
  sair();
  // o próximo usuário começa com um teste novo
  document.getElementById("resultado").hidden = true;
  montarProva();
  desenharQuestoes();
  escolherModo(false);
  limparFormulario();
  atualizarTela();
});

atualizarTela();
