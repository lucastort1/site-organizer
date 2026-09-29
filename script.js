/* =========================================================
   FABI TORT ORGANIZER — SCRIPTS
   ---------------------------------------------------------
   1.  Configurações e dados da galeria
   2.  Utilidades
   3.  Cabeçalho (compacto ao rolar + seção ativa no menu)
   4.  Menu mobile
   5.  Slideshow do topo
   6.  Serviços ("Saiba mais")
   7.  Carrossel dos blocos da galeria
   8.  Galeria em tela cheia (lightbox)
   9.  Vídeo do podcast
   10. Formulário → WhatsApp
   11. Inicialização
   ========================================================= */


/* ===================== 1. CONFIGURAÇÕES E DADOS ===================== */
const CONFIG = {
  whatsapp: '5511973806105',
  heroIntervalo: 5000,     // troca de foto do topo (ms)
  galeriaIntervalo: 6000,  // troca de foto em cada bloco da galeria (ms)
  galeriaDefasagem: 1300   // atraso entre o início de cada bloco, para não trocarem juntos (ms)
};

/*
  Fotos de cada categoria. A primeira de cada lista é a capa (a mesma do index.html).
  Para adicionar uma foto: coloque o arquivo na pasta e inclua o nome aqui.
*/
const GALERIA = {
  closet: {
    nome: 'Closet',
    pasta: 'Closet',
    fotos: [
      'imagemD05.jpg', 'imagemD01.jpg', 'imagemD02.jpg', 'imagemD03.jpg', 'imagemD04.jpg',
      'imagemD06.jpg', 'imagemD07.jpg', 'imagemD08.jpg', 'imagemD09.jpg', 'imagemD11.jpg',
      'imagemD12.jpeg', 'imagemD13.jpeg', 'imagemD14.jpeg', 'imagemD15.jpeg', 'imagemD16.jpeg',
      'imagemD17.jpeg', 'imagemD18.jpeg', 'imagemD20.jpeg', 'imagemD21.jpeg', 'imagemD22.jpeg',
      'imagemD23.jpeg', 'imagemD24.jpeg'
    ]
  },
  cozinha: {
    nome: 'Cozinha',
    pasta: 'Cozinha',
    fotos: [
      'imagemE07.jpeg', 'imagemE01.jpeg', 'imagemE02.jpeg', 'imagemE03.jpeg', 'imagemE04.jpeg',
      'imagemE05.jpeg', 'imagemE06.jpeg', 'imagemE08.jpeg', 'imagemE09.jpeg', 'imagemE10.jpeg'
    ]
  },
  despensa: {
    nome: 'Despensa',
    pasta: 'Despensa',
    fotos: [
      'imagemF01.jpg', 'imagemF02.jpeg', 'imagemF03.jpeg', 'imagemF04.jpeg', 'imagemF05.jpeg',
      'imagemF06.jpeg', 'imagemF07.jpeg', 'imagemF08.jpeg', 'imagemF09.jpeg'
    ]
  },
  rouparia: {
    nome: 'Rouparia',
    pasta: 'Rouparia',
    fotos: [
      'imagemI06.jpeg', 'imagemI01.jpg', 'imagemI02.jpeg', 'imagemI03.jpeg', 'imagemI04.jpeg',
      'imagemI05.jpeg', 'imagemI07.jpeg'
    ]
  },
  brinquedoteca: {
    nome: 'Brinquedoteca',
    pasta: 'Brinquedoteca',
    fotos: [
      'imagemC01.jpeg', 'imagemC02.jpeg', 'imagemC03.jpeg', 'imagemC04.jpeg', 'imagemC05.jpeg',
      'imagemC06.jpeg'
    ]
  },
  'area-de-servico': {
    nome: 'Área de serviço',
    pasta: 'Área de Serviço',
    fotos: [
      'imagemA02.jpeg', 'imagemA01.jpeg', 'imagemA03.jpeg', 'imagemA04.jpeg', 'imagemA05.jpeg'
    ]
  },
  banheiro: {
    nome: 'Banheiro',
    pasta: 'Banheiro',
    fotos: ['imagemB03.jpeg', 'imagemB01.jpeg', 'imagemB02.jpeg', 'imagemB04.jpeg']
  },
  loucaria: {
    nome: 'Louçaria',
    pasta: 'Louçaria',
    fotos: [
      'imagemG02.jpg', 'imagemG01.jpg', 'imagemG03.jpg', 'imagemG04.jpg', 'imagemG05.jpg',
      'imagemG06.jpg', 'imagemG07.jpg', 'imagemG08.jpg', 'imagemG09.jpg', 'imagemG10.jpeg',
      'imagemG11.jpeg', 'imagemG12.jpeg', 'imagemG13.jpeg', 'imagemG14.jpeg', 'imagemG15.jpeg'
    ]
  }
};


/* ===================== 2. UTILIDADES ===================== */
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Caminho da foto, com acentos e espaços codificados para a URL. */
function caminhoFoto(categoria, indice) {
  const cat = GALERIA[categoria];
  return encodeURI(`assets/img/${cat.pasta}/${cat.fotos[indice]}`);
}

/** Texto alternativo padrão de cada foto. */
function textoAlt(categoria, indice) {
  const cat = GALERIA[categoria];
  return `${cat.nome} organizado, foto ${indice + 1} de ${cat.fotos.length}`;
}

/** Carrega uma imagem e só resolve quando ela estiver pronta para aparecer. */
function carregarImagem(img, src) {
  return new Promise((resolve) => {
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) resolve();
  });
}


/* ===================== 3. CABEÇALHO ===================== */
function iniciarCabecalho() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Cabeçalho fica mais baixo e ganha sombra depois de rolar um pouco
  const atualizar = () => header.classList.toggle('is-compacto', window.scrollY > 24);
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });

  // Destaca no menu a seção que está na tela
  const links = document.querySelectorAll('.nav-link');
  const secoes = [...links]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((link) => {
        const ativo = link.getAttribute('href') === `#${entrada.target.id}`;
        link.classList.toggle('is-ativo', ativo);
        if (ativo) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secoes.forEach((secao) => observador.observe(secao));
}


/* ===================== 4. MENU MOBILE ===================== */
function iniciarMenuMobile() {
  const botao = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu-mobile');
  if (!botao || !menu) return;

  menu.inert = true;

  const abrir = () => {
    menu.classList.add('is-aberto');
    menu.inert = false;
    menu.setAttribute('aria-hidden', 'false');
    botao.setAttribute('aria-expanded', 'true');
    botao.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('menu-aberto', 'trava-rolagem');
  };

  const fechar = () => {
    menu.classList.remove('is-aberto');
    menu.inert = true;
    menu.setAttribute('aria-hidden', 'true');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-aberto', 'trava-rolagem');
  };

  botao.addEventListener('click', () => {
    menu.classList.contains('is-aberto') ? fechar() : abrir();
  });

  // Fecha ao escolher uma seção (a rolagem suave vem do CSS)
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fechar));

  // Fecha com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-aberto')) {
      fechar();
      botao.focus();
    }
  });

  // Se a tela crescer para o tamanho de computador, garante o menu fechado
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
    if (e.matches) fechar();
  });
}


/* ===================== 5. SLIDESHOW DO TOPO ===================== */
function iniciarSlideshowTopo() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length < 2) return;

  let atual = 0;
  let timer = null;

  const mostrar = (indice) => {
    slides[atual].classList.remove('is-active');
    dots[atual]?.classList.remove('is-active');
    dots[atual]?.setAttribute('aria-pressed', 'false');

    atual = indice;

    slides[atual].classList.add('is-active');
    dots[atual]?.classList.add('is-active');
    dots[atual]?.setAttribute('aria-pressed', 'true');
  };

  const iniciar = () => {
    if (movimentoReduzido.matches) return;
    clearInterval(timer);
    timer = setInterval(() => mostrar((atual + 1) % slides.length), CONFIG.heroIntervalo);
  };

  // Clicar numa bolinha mostra a foto e reinicia a contagem
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    mostrar(i);
    iniciar();
  }));

  iniciar();
}


/* ===================== 6. SERVIÇOS ("SAIBA MAIS") ===================== */
function iniciarServicos() {
  document.querySelectorAll('.servico-toggle').forEach((botao) => {
    const card = botao.closest('.servico');
    const rotulo = botao.querySelector('span');
    const extra = document.getElementById(botao.getAttribute('aria-controls'));
    if (extra) extra.inert = true;

    botao.addEventListener('click', () => {
      const aberto = card.classList.toggle('is-aberto');
      botao.setAttribute('aria-expanded', String(aberto));
      rotulo.textContent = aberto ? 'Mostrar menos' : 'Saiba mais';
      if (extra) extra.inert = !aberto;
    });
  });
}


/* ===================== 7. CARROSSEL DOS BLOCOS DA GALERIA ===================== */
/*
  Cada bloco passa por todas as fotos da sua categoria.
  Usa duas camadas de imagem: a próxima foto carrega escondida e só depois
  aparece com esmaecimento, então a página nunca baixa as 80 fotos de uma vez.
  Os carrosséis só rodam quando a galeria está visível na tela.
*/
const carrosseis = [];
let galeriaVisivel = false;
let lightboxAberto = false;

function iniciarCarrosselGaleria() {
  const blocos = document.querySelectorAll('.tile[data-categoria]');

  blocos.forEach((bloco, ordem) => {
    const categoria = bloco.dataset.categoria;
    const dados = GALERIA[categoria];
    if (!dados) return;

    const midia = bloco.querySelector('.tile-midia');
    const camadaA = midia.querySelector('.tile-img');
    const camadaB = document.createElement('img');
    camadaB.className = 'tile-img';
    camadaB.alt = '';
    midia.appendChild(camadaB);

    carrosseis.push({
      bloco,
      categoria,
      total: dados.fotos.length,
      atual: 0,
      camadas: [camadaA, camadaB],
      visivel: 0,
      proximaTroca: 0,
      atraso: ordem * CONFIG.galeriaDefasagem,
      trocando: false
    });

    // Abre a galeria em tela cheia na foto que o bloco está mostrando
    bloco.addEventListener('click', () => {
      const c = carrosseis.find((item) => item.bloco === bloco);
      abrirLightbox(categoria, c ? c.atual : 0);
    });
  });

  if (!carrosseis.length || movimentoReduzido.matches) return;

  // Só roda quando a seção está na tela
  const secao = document.getElementById('organizacoes');
  const observador = new IntersectionObserver(([entrada]) => {
    galeriaVisivel = entrada.isIntersecting;
    if (galeriaVisivel) {
      const agora = performance.now();
      carrosseis.forEach((c) => {
        if (c.proximaTroca < agora) c.proximaTroca = agora + CONFIG.galeriaIntervalo + c.atraso;
      });
    }
  }, { threshold: 0.15 });
  observador.observe(secao);

  // Um único relógio para todos os blocos
  setInterval(() => {
    if (!galeriaVisivel || lightboxAberto || document.hidden) return;
    const agora = performance.now();
    carrosseis.forEach((c) => {
      if (!c.trocando && c.total > 1 && agora >= c.proximaTroca) trocarFotoBloco(c);
    });
  }, 250);
}

async function trocarFotoBloco(c) {
  c.trocando = true;
  const proxima = (c.atual + 1) % c.total;
  const atualImg = c.camadas[c.visivel];
  const novaImg = c.camadas[1 - c.visivel];

  await carregarImagem(novaImg, caminhoFoto(c.categoria, proxima));
  novaImg.alt = textoAlt(c.categoria, proxima);

  // Esmaecimento cruzado
  novaImg.classList.add('is-active');
  atualImg.classList.remove('is-active');
  atualImg.alt = '';

  c.visivel = 1 - c.visivel;
  c.atual = proxima;
  c.proximaTroca = performance.now() + CONFIG.galeriaIntervalo;
  c.trocando = false;
}


/* ===================== 8. GALERIA EM TELA CHEIA (LIGHTBOX) ===================== */
const lightbox = {
  el: null,
  img: null,
  titulo: null,
  contador: null,
  miniaturas: null,
  categoria: null,
  indice: 0
};

function iniciarLightbox() {
  lightbox.el = document.getElementById('lightbox');
  if (!lightbox.el) return;

  lightbox.img = document.getElementById('lightbox-img');
  lightbox.titulo = document.getElementById('lightbox-titulo');
  lightbox.contador = document.getElementById('lightbox-contador');
  lightbox.miniaturas = document.getElementById('lightbox-miniaturas');

  lightbox.el.querySelector('.lightbox-fechar').addEventListener('click', fecharLightbox);
  lightbox.el.querySelector('.lightbox-anterior').addEventListener('click', () => mudarFoto(-1));
  lightbox.el.querySelector('.lightbox-proxima').addEventListener('click', () => mudarFoto(1));

  // Setas do teclado
  lightbox.el.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') mudarFoto(-1);
    if (e.key === 'ArrowRight') mudarFoto(1);
  });

  // Clique no fundo escuro fecha
  lightbox.el.addEventListener('click', (e) => {
    if (e.target === lightbox.el || e.target.classList.contains('lightbox-palco')) fecharLightbox();
  });

  // Esc (evento nativo do <dialog>)
  lightbox.el.addEventListener('close', aoFecharLightbox);

  // Deslizar para os lados no celular
  let inicioX = null;
  lightbox.img.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  lightbox.img.addEventListener('touchend', (e) => {
    if (inicioX === null) return;
    const distancia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(distancia) > 40) mudarFoto(distancia < 0 ? 1 : -1);
    inicioX = null;
  });
}

function abrirLightbox(categoria, indice) {
  if (!lightbox.el) return;
  lightbox.categoria = categoria;
  lightbox.titulo.textContent = GALERIA[categoria].nome;
  montarMiniaturas();
  mostrarFoto(indice, false);

  lightboxAberto = true;
  document.body.classList.add('trava-rolagem');
  lightbox.el.showModal();
}

function fecharLightbox() {
  if (lightbox.el?.open) lightbox.el.close();
}

function aoFecharLightbox() {
  lightboxAberto = false;
  document.body.classList.remove('trava-rolagem');
}

function montarMiniaturas() {
  const { categoria } = lightbox;
  lightbox.miniaturas.innerHTML = '';

  GALERIA[categoria].fotos.forEach((_, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'miniatura';
    botao.setAttribute('aria-label', `Ver foto ${i + 1}`);

    const img = document.createElement('img');
    img.src = caminhoFoto(categoria, i);
    img.alt = '';
    img.loading = 'lazy';

    botao.appendChild(img);
    botao.addEventListener('click', () => mostrarFoto(i));
    lightbox.miniaturas.appendChild(botao);
  });
}

function mudarFoto(direcao) {
  const total = GALERIA[lightbox.categoria].fotos.length;
  mostrarFoto((lightbox.indice + direcao + total) % total);
}

async function mostrarFoto(indice, animar = true) {
  const { categoria } = lightbox;
  const total = GALERIA[categoria].fotos.length;
  lightbox.indice = indice;

  lightbox.contador.textContent = `Foto ${indice + 1} de ${total}`;

  // Destaca a miniatura atual e mantém ela visível
  [...lightbox.miniaturas.children].forEach((mini, i) => {
    const ativa = i === indice;
    mini.classList.toggle('is-ativa', ativa);
    mini.setAttribute('aria-current', ativa ? 'true' : 'false');
    if (ativa) mini.scrollIntoView({ block: 'nearest', inline: 'center', behavior: animar ? 'smooth' : 'auto' });
  });

  // Troca a foto principal com um esmaecimento curto
  if (animar && !movimentoReduzido.matches) {
    lightbox.img.classList.add('is-trocando');
    await new Promise((r) => setTimeout(r, 200));
  }
  await carregarImagem(lightbox.img, caminhoFoto(categoria, indice));
  lightbox.img.alt = textoAlt(categoria, indice);
  lightbox.img.classList.remove('is-trocando');
}


/* ===================== 9. VÍDEO DO PODCAST ===================== */
/* Mostra só a capa; o player do YouTube só é carregado quando a pessoa clica (página mais leve). */
function iniciarVideo() {
  document.querySelectorAll('.video[data-video-id]').forEach((video) => {
    const capa = video.querySelector('.video-capa');
    capa?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${video.dataset.videoId}?autoplay=1&rel=0`;
      iframe.title = 'Podcast PodChique: organizar a vida com auxílio profissional';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      video.replaceChildren(iframe);
    });
  });
}


/* ===================== 10. FORMULÁRIO → WHATSAPP ===================== */
function iniciarFormulario() {
  const form = document.getElementById('form-contato');
  const aviso = document.getElementById('form-erro');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação: marca os campos vazios ou inválidos
    let valido = true;
    form.querySelectorAll('input, textarea').forEach((campo) => {
      const ok = campo.checkValidity() && campo.value.trim() !== '';
      campo.closest('.campo').classList.toggle('tem-erro', !ok);
      campo.setAttribute('aria-invalid', String(!ok));
      if (!ok) valido = false;
    });

    aviso.hidden = valido;
    if (!valido) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const dados = new FormData(form);
    const mensagem =
      `Olá! Meu nome é ${dados.get('nome').trim()}.\n` +
      `Telefone: ${dados.get('telefone').trim()}\n` +
      `E-mail: ${dados.get('email').trim()}\n` +
      `Gostaria de organizar: ${dados.get('mensagem').trim()}`;

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank', 'noopener');
  });

  // Tira a marcação de erro assim que o campo é corrigido
  form.querySelectorAll('input, textarea').forEach((campo) => {
    campo.addEventListener('input', () => {
      if (campo.value.trim() !== '' && campo.checkValidity()) {
        campo.closest('.campo').classList.remove('tem-erro');
        campo.setAttribute('aria-invalid', 'false');
      }
    });
  });
}


/* ===================== 11. INICIALIZAÇÃO ===================== */
document.addEventListener('DOMContentLoaded', () => {
  iniciarCabecalho();
  iniciarMenuMobile();
  iniciarSlideshowTopo();
  iniciarServicos();
  iniciarLightbox();
  iniciarCarrosselGaleria();
  iniciarVideo();
  iniciarFormulario();

  // Ano atual no rodapé
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
});