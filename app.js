// Detectar iOS corretamente
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// ===============================
// SERVICE WORKER (Android apenas)
// ===============================
if ("serviceWorker" in navigator && !isIOS) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker registrado (Android)"))
    .catch(err => console.error("Erro ao registrar SW:", err));
} else {
  console.log("iOS detectado: Service Worker desativado");
}

// ===============================
// BOTÃO DE INSTALAÇÃO PWA
// ===============================
const installBtn = document.getElementById("installBtn");
const iosHint = document.getElementById("iosHint");

let deferredPrompt = null;

// Android: evento de instalação
window.addEventListener("beforeinstallprompt", (event) => {
  if (isIOS) return;

  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false;
  console.log("beforeinstallprompt (Android)");
});

// Clique no botão
installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  } else if (isIOS) {
    iosHint.hidden = false;
    alert("No iPhone: Compartilhar → Adicionar à Tela de Início");
  } else {
    alert("Instalação não suportada");
  }
});