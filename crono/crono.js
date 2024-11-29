import style from "./style.js";

class Crono extends HTMLElement {
    constructor() {
        super();

        // Creación Shadow DOM
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>${style}</style>`;

        // Creación el slot
        let slot = document.createElement('slot');

        // Creación los botones
        this.botonIniciarPausar = document.createElement('wc-boton');
        this.botonReiniciar = document.createElement('wc-boton');

        // Creación el contenedor de los botones
        let contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('content-botones');

        // Agregar los botones al contenedor
        contenedorBotones.appendChild(this.botonIniciarPausar);
        contenedorBotones.appendChild(this.botonReiniciar);

        // Agregar elementos al Shadow DOM
        shadowRoot.appendChild(slot);
        shadowRoot.appendChild(contenedorBotones); // Añadir el contenedor completo

        this.contador = 0;

        this.iniciarPausarClick = this.iniciarPausarClick.bind(this);
        this.reiniciarClick = this.reiniciarClick.bind(this);
    }

    connectedCallback() {

        this.botonIniciarPausar.titulo = 'Iniciar';
        this.botonReiniciar.titulo = 'Reiniciar';
        
        this.botonIniciarPausar.addEventListener('customClick', this.iniciarPausarClick);
        this.botonReiniciar.addEventListener('customClick', this.reiniciarClick);
    }

    iniciarPausarClick(event){
        if(event.detail.titulo === 'Iniciar'){
            this.intervalo = setInterval(() => {
                this.contador++;
                this.dispatchEvent(new CustomEvent('actualizarTiempo', {
                    bubbles: true,
                    detail: {
                        contador: this.contador
                    }
                }

                ));
            }, 10);
            this.botonIniciarPausar.titulo = 'Pausar';
        } else {
            clearInterval(this.intervalo);
            this.botonIniciarPausar.titulo = 'Iniciar';
        }
        event.stopPropagation();
    }
    
    reiniciarClick(event){
        this.contador = 0;
        this.dispatchEvent(new CustomEvent('actualizarTiempo', {
            bubbles: true,
            detail: {
                contador: this.contador
            }
        }
        ));

        event.stopPropagation();
    }
}

export default Crono;
