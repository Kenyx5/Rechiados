/*const CACHE_NAME = "meu-cache";
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
});*/



  // Versão do cache — mude sempre que atualizar arquivos
const CACHE_NAME = "meu-cache-v2";

// Lista de arquivos para cache — coloque apenas arquivos que existem
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./Carrinho.html",
  "./Cardapio.css",
  "./app.js",
  "./imgs/pizza (1).png",
  "./imgs/batatas-fritas.png",
  "./imgs/bacon.webp",
  "./imgs/batataf.webp",
  "./imgs/brincalhao.webp",
  "./imgs/calabresa.webp",
  "./imgs/Capa.webp",
  "./imgs/cebola.webp",
  "./imgs/correio.png",
  "./imgs/fatia.webp",
  "./imgs/frango.webp",
  "./imgs/fundo.webp",
  "./imgs/hamburguer.png",
  "./imgs/magoga.webp",
  "./imgs/queijo.webp",
  "./imgs/sandes.webp",
  "./imgs/xtudo-com-pao.webp",
  "./imgs/xtudo.webp"
];

// Instalando e cacheando arquivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Adiciona arquivos individualmente para ignorar erros
      return Promise.all(
        FILES_TO_CACHE.map(file =>
          cache.add(file).catch(err => {
            console.warn("Falha ao adicionar ao cache:", file, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Ativando SW e removendo caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Deletando cache antigo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepta requests e responde do cache ou da rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Opcional: fallback offline (ex: página offline)
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});