/* Barrica landing — enhancement progressivo das cenas cinematográficas.
   Regra: a still (poster) é o piso, o vídeo é o teto. Aparelho e conexão
   decidem o que carrega. Pior caso = página de stills, nunca quebrada. */
(function () {
  'use strict';

  var portraitMQ = window.matchMedia('(max-width: 760px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Posters art-directed já vêm do CSS (style inline --poster-l / --poster-p),
  // então funcionam com zero JS. Aqui cuidamos só do vídeo por cima.
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-cinema]'));

  // Decidir se o vídeo pode entrar.
  function connectionAllowsVideo() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    // API ausente (Safari/iOS): permite — confiamos no lazy-load + reduced-motion.
    if (!c) return true;
    if (c.saveData) return false;
    if (c.effectiveType && /(^|\b)(slow-2g|2g|3g)\b/.test(c.effectiveType)) return false;
    return true;
  }

  var allowVideo = !reduceMotion.matches && connectionAllowsVideo();
  if (!allowVideo || !('IntersectionObserver' in window)) return; // fica nas stills

  // 3) Fonte de vídeo conforme orientação. data-video-* = "a.webm|a.mp4".
  function sourcesFor(sec) {
    var raw = portraitMQ.matches ? sec.dataset.videoP : sec.dataset.videoL;
    if (!raw && sec.dataset.videoL) raw = sec.dataset.videoL; // fallback landscape
    return raw ? raw.split('|') : [];
  }

  function buildVideo(sec) {
    if (sec._video) return sec._video;
    var media = sec.querySelector('.cinema-media');
    var srcs = sourcesFor(sec);
    if (!media || !srcs.length) return null;

    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.preload = 'auto';
    if (sec.dataset.posterL) v.poster = portraitMQ.matches && sec.dataset.posterP ? sec.dataset.posterP : sec.dataset.posterL;

    srcs.forEach(function (src) {
      var s = document.createElement('source');
      s.src = src;
      s.type = /\.webm$/i.test(src) ? 'video/webm' : 'video/mp4';
      v.appendChild(s);
    });
    media.appendChild(v);
    sec._video = v;
    return v;
  }

  var playing = null;
  function playOnly(sec) {
    var v = buildVideo(sec);
    if (!v) return;
    if (playing && playing !== v) { try { playing.pause(); } catch (e) {} }
    var p = v.play();
    if (p && p.catch) p.catch(function () {}); // autoplay pode falhar; poster cobre
    playing = v;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        playOnly(e.target);
      } else if (e.target._video) {
        try { e.target._video.pause(); } catch (err) {}
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function (sec) {
    if (sec.dataset.videoL || sec.dataset.videoP) io.observe(sec);
  });
})();

/* Cena do copo que esvazia: o progresso do scroll vira --empty (0..1).
   Independente do gate de vídeo (crossfade de opacidade é movimento mínimo,
   controlado pelo dedo do usuário). Sem JS, fica no piso: copo cheio. */
(function () {
  'use strict';
  var scene = document.querySelector('.glass-scene');
  if (!scene) return;
  scene.classList.add('is-enhanced');

  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var total = scene.offsetHeight - vh;            // distância de scroll dentro da cena
    if (total <= 0) { scene.style.setProperty('--empty', '0'); return; } // reduced-motion
    var top = scene.getBoundingClientRect().top;    // 0 quando a sticky engata
    var scrolled = Math.min(Math.max(-top, 0), total);
    scene.style.setProperty('--empty', (scrolled / total).toFixed(3));
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
