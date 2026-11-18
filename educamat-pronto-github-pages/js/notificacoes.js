/* ============ AVISOS DO SISTEMA (notificações) ============ */
// Funciona assim: o service worker (sw.js) mostra a notificação no sistema,
// então ela aparece mesmo com a aba em segundo plano ou fora do site.
// Precisa de HTTPS ou localhost (não funciona abrindo o arquivo com dois cliques).
const temNotificacao = "Notification" in window;
const temServiceWorker = "serviceWorker" in navigator;
let registroSW = null;

async function registrarServiceWorker() {
  if (!temServiceWorker) return;
  try { registroSW = await navigator.serviceWorker.register("sw.js"); }
  catch (erro) { registroSW = null; }
}

function atualizarBotaoAvisos() {
  const botao = document.getElementById("botao-avisos");
  if (!temNotificacao || !botao) return;
  // só mostra o botão se o usuário ainda não decidiu
  botao.hidden = Notification.permission !== "default";
}

async function pedirPermissaoAvisos() {
  if (!temNotificacao) return;
  await Notification.requestPermission();
  atualizarBotaoAvisos();
}

// Chamada pelo app.js quando o teste termina
async function notificarConclusao(acertos, total, assuntoPrioritario) {
  if (!temNotificacao || Notification.permission !== "granted") return;

  const titulo = "EducaMat: teste concluído!";
  const texto = "Você acertou " + acertos + " de " + total + " questões." +
    (assuntoPrioritario ? " Revise primeiro: " + assuntoPrioritario + "." : " Parabéns, você foi bem em tudo!");
  const opcoes = { body: texto, icon: "icones/icone-192.png", tag: "educamat-conclusao" };

  try {
    const registro = registroSW || (temServiceWorker ? await navigator.serviceWorker.getRegistration() : null);
    if (registro) { await registro.showNotification(titulo, opcoes); return; }
    new Notification(titulo, opcoes); // plano B, sem service worker
  } catch (erro) { /* se falhar, o site continua funcionando normalmente */ }
}

document.getElementById("botao-avisos").addEventListener("click", pedirPermissaoAvisos);
registrarServiceWorker();
atualizarBotaoAvisos();
