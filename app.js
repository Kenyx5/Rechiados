// Detectar iOS corretamente
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// SERVICE WORKER (Android apenas)
if ("serviceWorker" in navigator && !isIOS) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker registrado (Android)"))
    .catch(err => console.error("Erro ao registrar SW:", err));
} else {
  console.log("iOS detectado: Service Worker desativado");
}

// BOTÃO DE INSTALAÇÃO PWA
const installBtn = document.getElementById("installBtn");
const iosHint = document.getElementById("iosHint");

let deferredPrompt = null;

// Esconder botão inicialmente
installBtn.hidden = false; // botão visível sempre, mas só age no clique
if (iosHint) iosHint.hidden = true;

// Capturar evento Android (beforeinstallprompt)
window.addEventListener("beforeinstallprompt", (event) => {
  if (isIOS) return; // ignorar iOS

  event.preventDefault();
  deferredPrompt = event;
  console.log("beforeinstallprompt capturado (Android)");
});

// Clique no botão
installBtn.addEventListener("click", async () => {
  if (isIOS) {
    // iOS: alerta sempre
    if (iosHint) iosHint.hidden = false;
    alert("No iPhone: Compartilhar → Adicionar à Tela de Início");
    return;
  }

  if (deferredPrompt) {
    // Android: dispara prompt
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("Usuário escolheu:", choice.outcome);
    deferredPrompt = null;
  } else {
    // Caso Android não possa instalar
    alert("Instalação não suportada");
  }
});