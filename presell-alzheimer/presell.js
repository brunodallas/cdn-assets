/* =========================================================
   presell.js
   1. Um único ponto para trocar o destino de TODOS os CTAs.
   2. Repassa a query string de entrada (sub1, tblci, ref_id, utm_*)
      para o link da oferta — sem isso o tracking quebra.
   ========================================================= */
(function () {
  "use strict";

  /* >>> TROQUE AQUI O DESTINO DA OFERTA <<< */
  /* ATENÇÃO: o doc do BP não trouxe a URL da VSL. Preencher antes de subir. */
  var OFFER_URL = "https://EXEMPLO-TROCAR.com/vsl";

  /* Parâmetros que devem ser repassados. "*" repassa tudo. */
  var PASSTHROUGH = "*";

  function buildHref() {
    var incoming = window.location.search.replace(/^\?/, "");
    if (!incoming) return OFFER_URL;

    var kept = incoming;
    if (PASSTHROUGH !== "*") {
      var allow = PASSTHROUGH;
      kept = incoming
        .split("&")
        .filter(function (pair) {
          return allow.indexOf(pair.split("=")[0]) !== -1;
        })
        .join("&");
    }
    if (!kept) return OFFER_URL;

    return OFFER_URL + (OFFER_URL.indexOf("?") === -1 ? "?" : "&") + kept;
  }

  function wire() {
    var href = buildHref();
    var links = document.querySelectorAll("[data-offer]");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", href);
      links[i].setAttribute("rel", "nofollow noopener");
    }
  }

  /* ---------------------------------------------------------
     Placeholder: enquanto as imagens reais não estiverem em
     /images, mostra um bloco cinza com o nome do arquivo
     esperado em vez do ícone de imagem quebrada.
     Pode remover este trecho depois de subir as imagens.
     --------------------------------------------------------- */
  function placeholderFor(name) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">' +
      '<rect width="800" height="450" fill="#e9e9e9"/>' +
      '<rect x="8" y="8" width="784" height="434" fill="none" stroke="#c4c4c4" stroke-width="2" stroke-dasharray="10 8"/>' +
      '<text x="400" y="215" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="26" fill="#8a8a8a">imagem ausente</text>' +
      '<text x="400" y="255" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="#a5a5a5">' +
      name +
      "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function wirePlaceholders() {
    var imgs = document.querySelectorAll("img[src^='images/']");
    for (var i = 0; i < imgs.length; i++) {
      (function (img) {
        var original = img.getAttribute("src") || "imagem";
        var done = false;
        function fallback() {
          if (done) return;
          done = true;
          img.src = placeholderFor(original);
        }
        img.addEventListener("error", fallback);
        /* o erro pode ter disparado antes deste script rodar */
        if (img.complete && img.naturalWidth === 0) fallback();
      })(imgs[i]);
    }
  }

  function init() {
    wire();
    wirePlaceholders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
