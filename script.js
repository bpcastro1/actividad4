document.addEventListener("DOMContentLoaded", function () {
  class MiDomino extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `<style>
                :host {
                    position: relative;
                    width: 60px;
                    height: 120px;
                    background-color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
                    margin: 5px;
                    padding: 10px;
                    border: 1px solid #000;
                    transition: transform 1s ease-in-out;
                }

                :host::before,
                :host::after {
                    content: '';
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background-color: #000;
                    border-radius: 50%;
                }

                :host::before {
                    top: 10px;
                    left: 10px;
                }

                :host::after {
                    bottom: 10px;
                    right: 10px;
                }
            </style>
            <slot></slot>`;
    }
  }

  class DominoBoton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `<style>
                :host {
                    cursor: pointer;
                    margin-top: 5px;
                    width: 60px;
                    text-align: center;
                    padding: 10px;
                    border: 1px solid #000;
                    background-color: #eee;
                    display: block;
                }
            </style>
            <slot></slot>`;
    }
  }

  customElements.define("mi-domino", MiDomino);
  customElements.define("domino-boton", DominoBoton);

  let animacionEnProgreso = false;

  document.querySelectorAll("domino-boton").forEach((boton, index) => {
    boton.addEventListener("click", () => {
      if (!animacionEnProgreso) {
        animacionEnProgreso = true;
        derribarDerecha(index);
      }
    });
  });

  function derribarDerecha(index) {
    const angulo = 90;
    const duracionAnimacion = 400;

    const dominos = document.querySelectorAll("mi-domino");

    function derribarUnoPorUno(i) {
      if (i < dominos.length) {
        const domino = dominos[i];

        domino.style.transform = `rotate(${angulo}deg) translateY(${60}px)`;
        domino.classList.add("giro-derecha");

        setTimeout(() => {
          domino.classList.remove("giro-derecha");

          derribarUnoPorUno(i + 1);
        }, duracionAnimacion);
      } else {
        setTimeout(() => {
          dominos.forEach((domino) => {
            domino.style.transform = "rotate(0deg) translateY(0px)";
            domino.classList.remove("giro-derecha");
          });

          animacionEnProgreso = false;
        }, duracionAnimacion);
      }
    }

    derribarUnoPorUno(index);
  }
});
