// ===== CONFIGURAÇÃO =====
const CACHE_NAME = "meu-cache-v3";

// Cache apenas de assets estáticos (IMAGENS)
const FILES_TO_CACHE = [
  "./",
    "/index.html",
    "/Cardapio.css",
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

// ===== INSTALL =====
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ===== ACTIVATE =====
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ===== FETCH =====
self.addEventListener("fetch", event => {
  const req = event.request;

  // HTML → network first (sempre atualiza)
  if (req.destination === "document") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match("./"))
    );
    return;
  }

  // CSS e JS → network first
  if (req.destination === "style" || req.destination === "script") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Imagens → cache first
  event.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});

// ===== CONTROLE DE ATUALIZAÇÃO =====
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});