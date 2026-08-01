/* ======================================================
   PAINÉIS
====================================================== */

const Paineis = {

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

    }

};

