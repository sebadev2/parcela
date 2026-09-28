// Cambia este número por el WhatsApp real: código de país + número, sin "+" ni espacios.
const WHATSAPP = '56900000000';

const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// Todos los botones de WhatsApp abren el chat con un mensaje prellenado
document.querySelectorAll('.js-wa').forEach((el) => {
  el.href = waLink(el.dataset.msg || 'Hola, quiero consultar por la parcela.');
  el.target = '_blank';
  el.rel = 'noopener';
});

// Menú en celular
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

menu.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Formulario: arma el mensaje y lo envía por WhatsApp (no requiere servidor)
const form = document.getElementById('form-consulta');
const error = form.querySelector('.form__error');
const fecha = form.elements.fecha;

fecha.min = new Date().toISOString().slice(0, 10);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { nombre, personas, tipo } = form.elements;

  if (!nombre.value.trim() || !fecha.value || !personas.value) {
    error.hidden = false;
    return;
  }
  error.hidden = true;

  const fechaTexto = new Date(`${fecha.value}T12:00:00`).toLocaleDateString('es-CL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const msg = [
    `Hola, soy ${nombre.value.trim()}.`,
    `Quiero consultar disponibilidad para el ${fechaTexto}.`,
    `Evento: ${tipo.value}.`,
    `Personas: ${personas.value}.`,
  ].join('\n');

  window.open(waLink(msg), '_blank', 'noopener');
});
