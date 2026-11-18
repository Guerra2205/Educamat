/* ============ CONTAS E SESSÃO (demonstração, tudo no navegador) ============ */
// As contas ficam no localStorage deste navegador. Não existe servidor.
// A senha nunca é guardada como texto: guardamos só um "hash" dela (SHA-256 com sal).
const CHAVE_USUARIOS = "educamat_usuarios";
const CHAVE_SESSAO = "educamat_sessao";

function lerUsuarios() {
  try { return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || {}; }
  catch (erro) { return {}; }
}

function salvarUsuarios(usuarios) {
  try { localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios)); return true; }
  catch (erro) { return false; }
}

function gerarSal() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

async function gerarHash(senha, sal) {
  const dados = new TextEncoder().encode(sal + senha);
  const resumo = await crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(resumo)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function cadastrar(nome, email, senha) {
  nome = nome.trim();
  email = email.trim().toLowerCase();
  if (nome === "") return { ok: false, mensagem: "Digite seu nome." };
  if (!emailValido(email)) return { ok: false, mensagem: "Digite um e-mail válido." };
  if (senha.length < 6) return { ok: false, mensagem: "A senha precisa ter pelo menos 6 caracteres." };

  const usuarios = lerUsuarios();
  if (usuarios[email]) return { ok: false, mensagem: "Já existe uma conta com esse e-mail." };

  const sal = gerarSal();
  usuarios[email] = { nome: nome, sal: sal, senhaHash: await gerarHash(senha, sal) };
  if (!salvarUsuarios(usuarios)) return { ok: false, mensagem: "Não foi possível salvar a conta neste navegador." };

  try { localStorage.setItem(CHAVE_SESSAO, email); } catch (erro) {}
  return { ok: true };
}

async function entrar(email, senha) {
  email = email.trim().toLowerCase();
  const usuario = lerUsuarios()[email];
  const erro = { ok: false, mensagem: "E-mail ou senha incorretos." };
  if (!usuario) return erro;
  if (await gerarHash(senha, usuario.sal) !== usuario.senhaHash) return erro;

  try { localStorage.setItem(CHAVE_SESSAO, email); } catch (e) {}
  return { ok: true };
}

function usuarioLogado() {
  try {
    const email = localStorage.getItem(CHAVE_SESSAO);
    const usuario = email ? lerUsuarios()[email] : null;
    return usuario ? { nome: usuario.nome, email: email } : null;
  } catch (erro) { return null; }
}

function sair() {
  try { localStorage.removeItem(CHAVE_SESSAO); } catch (erro) {}
}
