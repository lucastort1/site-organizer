document.addEventListener('DOMContentLoaded', () => {
  // ===== HERO SLIDESHOW =====
  const heroSlides = document.querySelectorAll('.slide');
  let heroIndex = 0;
  if (heroSlides.length > 0) {
    setInterval(() => {
      heroSlides[heroIndex].classList.remove('active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('active');
    }, 6000);
  }

  // ===== MENU MOBILE =====
  const mobileMenu = document.getElementById('menu');
  const menuBtn = document.querySelector('.menu-toggle');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('active');
    document.body.classList.add('nav-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
  }
  // expõe para o HTML inline
  window.toggleMenu = toggleMenu;
  window.closeMenu = closeMenu;

  // fecha com ESC
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // fecha ao clicar em links dentro do menu mobile
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      if (hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== FORM -> WHATSAPP =====
  window.enviarFormulario = function (event) {
    if (event) event.preventDefault();
    const nome = (document.querySelector('input[name="nome"]') || {}).value || '';
    const telefone = (document.querySelector('input[name="telefone"]') || {}).value || '';
    const email = (document.querySelector('input[name="email"]') || {}).value || '';
    const assunto = (document.querySelector('textarea[name="assunto"]') || {}).value || '';

    const mensagem = `Olá! Meu nome é ${nome}.
Telefone: ${telefone}
Email: ${email}
Assunto: ${assunto}`;

    const numeroWhatsapp = '5511973806105';
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank', 'noopener');
  };

  // ===== CARROSSEL POR ABA =====
  const tabs  = document.querySelectorAll('.carrossel-tabs .tab');
  const panes = document.querySelectorAll('.carrossel-pane');

  // garante ativo inicial
  let activePane = document.querySelector('.carrossel-pane.active') || panes[0];
  if (!document.querySelector('.carrossel-pane.active') && panes[0]) {
    panes[0].classList.add('active');
    const firstTab = document.querySelector(`.carrossel-tabs .tab[data-pane="${panes[0].id}"]`);
    if (firstTab) {
      firstTab.classList.add('active');
      firstTab.setAttribute('aria-selected', 'true');
    }
  }

  function setActivePaneById(id) {
    panes.forEach(p => {
      const isActive = p.id === id;
      p.classList.toggle('active', isActive);
      if (isActive) activePane = p;
    });
    tabs.forEach(t => {
      const isActive = t.dataset.pane === id;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    // reseta scroll da trilha ao trocar de aba
    const track = activePane?.querySelector('.carrossel-imagens');
    if (track) track.scrollLeft = 0;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => setActivePaneById(tab.dataset.pane));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePaneById(tab.dataset.pane); }
    });
  });

  // passo = largura da primeira imagem + gap (robusto)
  function getStep(track) {
    if (!track) return window.innerWidth < 768 ? 320 : 520;
    const first = track.querySelector('img');
    const styles = getComputedStyle(track);
    const gap = parseInt(styles.gap || styles.columnGap || '20', 10) || 20;
    const width = first ? first.getBoundingClientRect().width : (window.innerWidth < 768 ? 300 : 500);
    return Math.round(width + gap);
  }

  // setas expostas globalmente para os botões inline
  window.avancarSlide = function() {
    const track = activePane?.querySelector('.carrossel-imagens');
    if (!track) return;
    track.scrollBy({ left: getStep(track), behavior: 'smooth' });
  };
  window.voltarSlide = function() {
    const track = activePane?.querySelector('.carrossel-imagens');
    if (!track) return;
    track.scrollBy({ left: -getStep(track), behavior: 'smooth' });
  };
});