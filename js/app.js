// =======================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =======================================================

mostrarCalendario();


// =======================================================
// BOTÃO NOVO EVENTO
// =======================================================

const btnNovo = document.getElementById("btnNovo");
btnNovo.addEventListener("click", novoEvento);

// -------------------------------------------------------
// Botão mês seguinte
// -------------------------------------------------------




// =======================================================
// FUNÇÃO: novoEvento()
// Executada quando o utilizador clica no botão "+".
// =======================================================

function novoEvento(){

    estado.modo = "edicao";

    estado.diasSelecionados = [];

    document
        .getElementById("modalEvento")
        .classList.remove("oculto");

    mostrarCalendario();

}


// =======================================================
// AVANÇA PARA O MÊS SEGUINTE
// =======================================================

function mesSeguinte(){

    // ---------------------------------------------------
    // Avança um mês.
    // ---------------------------------------------------

    calendarioAtual.mes++;

    // ---------------------------------------------------
    // Se passou de dezembro,
    // volta para janeiro e avança o ano.
    // ---------------------------------------------------

    if (calendarioAtual.mes > 12){

        calendarioAtual.mes = 1;
        calendarioAtual.ano++;

    }

    // ---------------------------------------------------
    // Atualiza o calendário.
    // ---------------------------------------------------

    mostrarCalendario();

}

// =======================================================
// RECUA PARA O MÊS ANTERIOR
// =======================================================

function mesAnterior(){

    // ---------------------------------------------------
    // Recua um mês.
    // ---------------------------------------------------

    calendarioAtual.mes--;

    // ---------------------------------------------------
    // Se passou antes de janeiro,
    // volta para dezembro e recua o ano.
    // ---------------------------------------------------

    if (calendarioAtual.mes < 1){

        calendarioAtual.mes = 12;
        calendarioAtual.ano--;

    }

    // ---------------------------------------------------
    // Atualiza o calendário.
    // ---------------------------------------------------

    mostrarCalendario();

}

// =======================================================
// TESTES
// Utilizado apenas durante o desenvolvimento.
// =======================================================

console.log(obterNomeMes(8));

const btnCancelarEvento =
    document.getElementById("btnCancelarEvento");

    btnCancelarEvento.addEventListener(
    "click",
    cancelarEvento
);

function cancelarEvento(){

    estado.modo = "visualizacao";

    estado.diasSelecionados = [];

    document
        .getElementById("modalEvento")
        .classList.add("oculto");

    mostrarCalendario();

}

/* ======================================================
   CONFIGURAÇÃO
====================================================== */

const btnConfiguracao =
    document.getElementById("btnConfiguracao");

btnConfiguracao.addEventListener(
    "click",
    abrirConfiguracao
);

function abrirConfiguracao(){

    alert("Configuração");

}

