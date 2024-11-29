import style from './style.js';

class ContenedorDigitos extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>${style}</style><slot></slot>`;
    this.contador = 0;
    this.actualizarTiempo = this.actualizarTiempo.bind(this);
  }

  connectedCallback() {
    this.iniciarTemporizador();
  }

  disconnectedCallback() {
    document.body.removeEventListener('actualizarTiempo', this.actualizarTiempo);
  }

  iniciarTemporizador() {
    document.body.addEventListener('actualizarTiempo', this.actualizarTiempo);
  }

  actualizarTiempo(event) {
    const tiempo = this.formatearTiempo(event.detail.contador);

    // Mapeo de los identificadores con sus propiedades correspondientes
    const elementos = [
      { id: 'decenasHoras', valor: Math.floor(tiempo.horas / 10) },
      { id: 'horas', valor: tiempo.horas % 10 },
      { id: 'decenasMinutos', valor: Math.floor(tiempo.minutos / 10) },
      { id: 'minutos', valor: tiempo.minutos % 10 },
      { id: 'decenasSegundos', valor: Math.floor(tiempo.segundos / 10) },
      { id: 'segundos', valor: tiempo.segundos % 10 },
      { id: 'decenasCentesimas', valor: tiempo.decimas },
      { id: 'centesimas', valor: tiempo.centesimas }
    ];

    // Iteración sobre los elementos para actualizar su propiedad `numero`
    elementos.forEach(({ id, valor }) => {
      const elemento = this.querySelector(`#${id}`);
      if (elemento) {
        elemento.numero = valor;
      }
    });
  }

  formatearTiempo(contador) {
    const centesimas = contador % 10;
    const decimas = Math.floor((contador % 100) / 10);
    const segundos = Math.floor((contador / 100) % 60);
    const minutos = Math.floor((contador / (100 * 60)) % 60);
    const horas = Math.floor(contador / (100 * 3600));

    return { horas, minutos, segundos, decimas, centesimas };
  }
}

export default ContenedorDigitos;
