import style from './estilos.js';

import html from './template.js';

const numeros = new Map([
  [1, ["dere-inferior", "dere-superior"]],
  [
    2,
    [ "central-superior",
      "dere-superior",
      "central",
      "izqui-inferior",
      "central-inferior",
    ],
  ],
  [
    3,
    [
      "central-superior",
      "dere-superior",
      "central",
      "dere-inferior",
      "central-inferior",
    ],
  ],
  [4, ["izqui-superior", "central", "dere-superior", "dere-inferior"]],
  [
    5,
    [
      "central-superior",
      "izqui-superior",
      "central",
      "dere-inferior",
      "central-inferior",
    ],
  ],
  [
    6,
    [
      "central-superior",
      "izqui-superior",
      "izqui-inferior",
      "central",
      "dere-inferior",
      "central-inferior",
    ],
  ],
  [7, ["central-superior", "dere-superior", "dere-inferior"]],
  [
    8,
    [
      "central-superior",
      "izqui-superior",
      "dere-superior",
      "central",
      "izqui-inferior",
      "dere-inferior",
      "central-inferior",
    ],
  ],
  [
    9,
    [
      "central-superior",
      "izqui-superior",
      "dere-superior",
      "central",
      "dere-inferior",
    ],
  ],
  [
    0,
    [
      "central-superior",
      "izqui-superior",
      "dere-superior",
      "izqui-inferior",
      "dere-inferior",
      "central-inferior",
    ],
  ],
]);

class Digito extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `<style>${style}</style>${html}`;
    this._contenedorDigito =
      this.shadowRoot.querySelector("#contenedor-digito");
  }

  connectedCallback() {
    this.numero = 0;
   
  }

  get numero() {
    return parseFloat(this.getAttribute("numero"));
  }

  avanzar(numero) {
    this.numero = numero === 9 ? 0 : numero + 1;
  }

  set numero(numero) {
    this.setAttribute("numero", numero);
  }

  static get observedAttributes() {
    return ["numero"];
  }

  attributeChangedCallback(nombre, viejoValor, nuevoValor) {
    switch (nombre) {
      case "numero":
        if (viejoValor != nuevoValor) {
          this.renderNumero();
        }
    }
  }

  renderNumero() {
    // Reiniciar todos los hijos del contenedor a su estado inicial
    Array.from(this._contenedorDigito.children).forEach((child) => {
      child.classList.add("white");
    });
  
    const segmentos = numeros.get(this.numero);
    if (!segmentos) {
      console.error(`Número inválido: ${this.numero}`);
      return;
    }
  
    segmentos.forEach((identificador) => {
      const segmento = this._contenedorDigito.querySelector("#" + identificador);
      if (segmento) {
        segmento.classList.remove("white");
      } else {
        console.warn(`Segmento no encontrado: ${identificador}`);
      }
    });
  }
  
  
}

export default Digito;