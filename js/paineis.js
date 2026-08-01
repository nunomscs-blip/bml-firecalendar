/* ======================================================
   PAINÉIS
====================================================== */

const Paineis = {

arrastar:false,

painel:null,

inicioY:0,

alturaInicial:0,

    abrir(id){

        const painel = document.getElementById(id);

        if(!painel) return;

        painel.classList.remove("oculto");

    },

    fechar(id){

        const painel = document.getElementById(id);

        if(!painel) return;

        painel.classList.add("oculto");

    },

    fecharTodos(){

        document
            .querySelectorAll(".painel")
            .forEach(p => p.classList.add("oculto"));

    },

    inicializar(){

    document
        .querySelectorAll(".btnFecharPainel")
        .forEach(botao=>{

            botao.addEventListener("click",()=>{

                const painel =
                    botao.closest(".painel");

                if(painel){

                    this.fechar(painel.id);

                }

            });

        });

        this.inicializarArrasto();

},

inicializarArrasto(){

    document
        .querySelectorAll(".painel")
        .forEach(painel=>{

            const cabecalho =
                painel.querySelector(".painelCabecalho");

            if(!cabecalho) return;

            cabecalho.addEventListener(
                "pointerdown",
                this.iniciarArrasto.bind(this)
            );

        });

},

};

iniciarArrasto(event){

    this.arrastar = true;

    this.painel =
        event.target.closest(".painel");

    this.inicioY = event.clientY;

    this.alturaInicial =
        this.painel
            .querySelector(".painelConteudo")
            .offsetHeight;

    document.addEventListener(
        "pointermove",
        this.arrastarPainel.bind(this)
    );

    document.addEventListener(
        "pointerup",
        this.terminarArrasto.bind(this)
    );

},

arrastarPainel(event){

    if(!this.arrastar) return;

    console.log("Mover:", event.clientY);

},

terminarArrasto(){

    this.arrastar = false;

    console.log("Fim");

},

