// app.js

// Registrar o Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker registrado!"))
    .catch(err => console.log("Erro ao registrar SW:", err));
}

// Lógica do botão PWA
const installBtn = document.getElementById("installBtn");
const iosHint = document.getElementById("iosHint");

let deferredPrompt = null;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

// Evento Android para instalação
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false; // mostra o botão só quando disponível
  console.log("beforeinstallprompt disparado!");
});

// Clique no botão de instalar
installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      alert("✅ App instalado com sucesso!");
    }
    deferredPrompt = null;
  } else if (isIOS) {
    iosHint.hidden = false;
    alert("No iPhone: toque em Compartilhar → Adicionar à Tela de Início");
  } else {
    alert("Seu navegador não suporta instalação do app.");
  }
});