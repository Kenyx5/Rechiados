const CACHE_NAME = "meu-cache";
const FILES_TO_CACHE = [
  "/index.html",
  "/Carrinho.html",
  "/Cardapio.css",
  "/app.js",
  "imgs/pizza (1).png",
  "imgs/batatas-fritas.png",
  "imgs/bacon.webp",
  "imgs/batataf.webp",
  "imgs/batatas-fritas.png",
  "imgs/brincalhao.webp",
  "imgs/calabresa.webp",
  "imgs/Capa.webp",
  "imgs/cebola.webp",
  "imgs/correio.png",
  "imgs/fatia.webp",
  "imgs/frango.webp",
  "imgs/fundo.webp",
  "imgs/hamburguer.png",
  "imgs/magoga.webp",
  "imgs/pizza-1.png",
  "imgs/queijo.webp",
  "imgs/sandes.webp",
  "imgs/xtudo-com-pao.webp",
  "imgs/xtudo.webp"

];

// Instalando e cacheando os arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Interceptando requests para servir do cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});