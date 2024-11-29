import style from "./style.js";

class Boton extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    this.elementHtml = document.createElement("button");

    shadowRoot.innerHTML = `<style>${style}</style>`;
    shadowRoot.appendChild(this.elementHtml);
  }
  connectedCallback(){
    this.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.dispatchEvent(new CustomEvent('customClick', {
            detail: {
                titulo: this.titulo
            },
            bubbles: true,
            composed: true
        }));
    });
  }
  get titulo() {
    return this.getAttribute("titulo");
  }

  set titulo(titulo) {
    this.setAttribute("titulo", titulo);
  }

  static get observedAttributes() {
    return ["titulo"];
  }

  attributeChangedCallback(nombre, viejoValor, nuevoValor) {
    switch (nombre) {
      case "titulo":
        this.actualizarElementoHtml(viejoValor, nuevoValor);
    }
  }

  actualizarElementoHtml(viejoValor, nuevoValor) {
    if (viejoValor != nuevoValor) {
      this.elementHtml.innerHTML = nuevoValor;
    }
  }
}

export default Boton;
