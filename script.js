// SLIDESHOW DO TOPO
const heroSlides = document.querySelectorAll('.slide');
let heroIndex = 0;


function trocarHeroSlide() {
  heroSlides[heroIndex].classList.remove('active');
  heroIndex = (heroIndex + 1) % heroSlides.length;
  heroSlides[heroIndex].classList.add('active');
}


setInterval(trocarHeroSlide, 6000);


// CARROSSEL DE ORGANIZAÇÕES
const carrossel = document.getElementById('carrosselImagens');


function avancarSlide() {
  carrossel.scrollBy({ left: 420, behavior: 'smooth' });
}


function voltarSlide() {
  carrossel.scrollBy({ left: -420, behavior: 'smooth' });
}


// FORMULÁRIO – ENVIO PARA WHATSAPP
function enviarFormulario(event) {
  event.preventDefault();


  const nome = document.querySelector('input[name="nome"]').value;
  const telefone = document.querySelector('input[name="telefone"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const assunto = document.querySelector('textarea[name="assunto"]').value;


  const mensagem = `Olá! Meu nome é ${nome}.
Telefone: ${telefone}
Email: ${email}
Assunto: ${assunto}`;


  const numeroWhatsapp = '5511973806105';
  const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;


  window.open(url, '_blank');
}


document.addEventListener("DOMContentLoaded", function () {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const currentItem = this.parentElement;
        const allItems = document.querySelectorAll(".accordion-item");

        allItems.forEach((item) => {
          if (item !== currentItem) {
            item.classList.remove("active");
          }
        });

        currentItem.classList.toggle("active");
      });
    });
  });