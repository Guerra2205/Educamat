/* ============ AVISOS DO SISTEMA (notificações) ============ */
const temNotificacao = "Notification" in window;
const temServiceWorker = "serviceWorker" in navigator;
let registroSW = null;

async function registrarServiceWorker() {
  if (!temServiceWorker) return null;
  try {
    registroSW = await navigator.serviceWorker.register("./sw.js");
    await navigator.serviceWorker.ready;
    registroSW = await navigator.serviceWorker.getRegistration("./");
    return registroSW;
  } catch (erro) {
    console.error("EducaMat: falha ao registrar o Service Worker:", erro);
    return null;
  }
}

function atualizarBotaoAvisos() {
  const botao = document.getElementById("botao-avisos");
  if (!botao) return;
  if (!temNotificacao) {
    botao.hidden = true;
    return;
  }
  botao.hidden = false;
  if (Notification.permission === "granted") {
    botao.textContent = "Avisos ativados";
    botao.disabled = true;
    botao.title = "Você já autorizou as notificações neste navegador.";
  } else if (Notification.permission === "denied") {
    botao.textContent = "Permissão bloqueada";
    botao.disabled = false;
    botao.title = "Altere a permissão de notificações nas configurações do navegador.";
  } else {
    botao.textContent = "Ativar avisos";
    botao.disabled = false;
    botao.title = "Permita notificações para receber o resultado do teste.";
  }
}

async function pedirPermissaoAvisos() {
  if (!temNotificacao) {
    alert("Este navegador não oferece suporte a notificações.");
    return;
  }
  if (Notification.permission === "denied") {
    alert("As notificações estão bloqueadas para este site. No Chrome, clique no ícone ao lado do endereço do site, abra Configurações do site e altere Notificações para Permitir. Depois, atualize a página.");
    return;
  }
  try {
    const permissao = await Notification.requestPermission();
    atualizarBotaoAvisos();
    if (permissao !== "granted") {
      alert("A permissão não foi concedida. Autorize as notificações nas configurações do navegador para receber o aviso ao terminar o teste.");
      return;
    }
    const registro = await registrarServiceWorker();
    if (!registro) {
      alert("A permissão foi concedida, mas o Service Worker não foi iniciado. Atualize a página e tente novamente.");
      return;
    }
    alert("Avisos ativados! Ao concluir o próximo teste, o EducaMat enviará uma notificação.");
  } catch (erro) {
    console.error("EducaMat: erro ao solicitar permissão:", erro);
    alert("Não foi possível ativar os avisos. Confira as permissões do navegador.");
  }
}

async function notificarConclusao(acertos, total, assuntoPrioritario) {
  if (!temNotificacao) {
    console.warn("EducaMat: API de notificações indisponível neste navegador.");
    return;
  }
  if (Notification.permission !== "granted") {
    console.warn("EducaMat: permissão de notificação não concedida:", Notification.permission);
    return;
  }
  const titulo = "EducaMat: teste concluído!";
  const texto = "Você acertou " + acertos + " de " + total + " questões." +
    (assuntoPrioritario ? " Revise primeiro: " + assuntoPrioritario + "." : " Parabéns, você foi bem em tudo!");
  const opcoes = { body: texto, icon: "./icones/icone-192.png", tag: "educamat-conclusao", renotify: true };
  try {
    const registro = registroSW || await navigator.serviceWorker.getRegistration("./");
    if (registro) {
      await registro.showNotification(titulo, opcoes);
    } else {
      new Notification(titulo, opcoes);
    }
  } catch (erro) {
    console.error("EducaMat: não foi possível exibir a notificação:", erro);
    alert("O teste foi concluído, mas o navegador não conseguiu mostrar a notificação. Confira se as notificações do EducaMat estão permitidas no Chrome e no Windows.");
  }
}

document.getElementById("botao-avisos")?.addEventListener("click", pedirPermissaoAvisos);
registrarServiceWorker().then(atualizarBotaoAvisos);
atualizarBotaoAvisos();
