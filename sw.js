/* ============ SERVICE WORKER do EducaMat ============ */
const NOME_CACHE = "educamat-v3";
const ARQUIVOS = [
  "./", "index.html", "estilo.css", "manifest.json",
  "js/questoes.js", "js/modelo.js", "js/sessao.js", "js/notificacoes.js", "js/conta.js", "js/app.js", "js/login.js",
  "icones/icone-192.png", "icones/icone-512.png"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(caches.open(NOME_CACHE).then(function (cache) { return cache.addAll(ARQUIVOS); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.filter(function (n) { return n !== NOME_CACHE; }).map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Abre o site já salvo mesmo sem internet
self.addEventListener("fetch", function (evento) {
  if (evento.request.method !== "GET") return;
  evento.respondWith(caches.match(evento.request).then(function (salvo) { return salvo || fetch(evento.request); }));
});

// Ao tocar na notificação: abre o EducaMat (ou volta para a aba que já está aberta)
self.addEventListener("notificationclick", function (evento) {
  evento.notification.close();
  evento.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (janelas) {
      for (const janela of janelas) { if ("focus" in janela) return janela.focus(); }
      return self.clients.openWindow("./index.html");
    })
  );
});

// Para o futuro: recebe um push enviado por um servidor (FCM, OneSignal ou Web Push) e mostra o aviso
self.addEventListener("push", function (evento) {
  const dados = evento.data ? evento.data.json() : {};
  evento.waitUntil(self.registration.showNotification(dados.titulo || "EducaMat", {
    body: dados.texto || "Que tal revisar um assunto hoje?",
    icon: "icones/icone-192.png"
  }));
});
