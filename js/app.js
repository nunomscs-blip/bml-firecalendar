// =======================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =======================================================




// =======================================================
// BOTÃO NOVO EVENTO
// =======================================================

const btnNovo = document.getElementById("btnNovo");
btnNovo.addEventListener("click", acaoBotaoFlutuante);

// -------------------------------------------------------
// Botão mês seguinte
// -------------------------------------------------------



/* ======================================================
   BOTÃO FLUTUANTE
====================================================== */

function acaoBotaoFlutuante(){

    switch(estado.modo){

        case "visualizacao":

            novoEvento();
            break;

        case "selecaoDias":

            confirmarDias();
            break;

    }

}


/* ======================================================
   CONFIRMAR DIAS
====================================================== */

function confirmarDias(){

    if(estado.diasSelecionados.length === 0){

        alert("Seleciona pelo menos um dia.");

        return;

    }

    estado.modo = "edicao";

    atualizarCabecalho();

    atualizarBotaoFlutuante();

    atualizarDiasSelecionados();

    document
        .getElementById("modalEvento")
        .classList.remove("oculto");

}


// =======================================================
// FUNÇÃO: novoEvento()
// Executada quando o utilizador clica no botão "+".
// =======================================================

function novoEvento(){

    estado.modo = "selecaoDias";

    estado.diasSelecionados = [];

    atualizarCabecalho();

    atualizarBotaoFlutuante();

    mostrarCalendario();

}


/* ======================================================
   ATUALIZA CABEÇALHO
====================================================== */

function atualizarCabecalho(){

    const titulo = document.getElementById("tituloApp");

    if(estado.modo === "selecaoDias"){

        titulo.textContent = "Escolher dias";

    }else{

        titulo.textContent = APP.nome;

    }

}


/* ======================================================
   BOTÃO FLUTUANTE
====================================================== */

function atualizarBotaoFlutuante(){

    const btn = document.getElementById("btnNovo");

    if(estado.modo === "selecaoDias"){

        btn.textContent = "✓";

    }else{

        btn.textContent = "+";

    }

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

    document
        .getElementById("modalConfiguracao")
        .classList.remove("oculto");

}

const btnFecharConfiguracao =
    document.getElementById("btnFecharConfiguracao");

btnFecharConfiguracao.addEventListener(
    "click",
    fecharConfiguracao
);

function fecharConfiguracao(){

    document
        .getElementById("modalConfiguracao")
        .classList.add("oculto");

}



/* ======================================================
   DADOS DA APLICAÇÃO
====================================================== */

document.getElementById("tituloApp").textContent = APP.nome;

document.getElementById("rodape").textContent =
`${APP.nome} • ${APP.ambiente} • ${APP.versao}`;


/* ======================================================
   BOTÃO HOJE
====================================================== */

const btnHoje = document.getElementById("btnHoje");

btnHoje.addEventListener("click", irParaHoje);

function atualizarBotaoHoje(){

    const hoje = new Date();

    if(
        calendarioAtual.mes === hoje.getMonth()+1 &&
        calendarioAtual.ano === hoje.getFullYear()
    ){

        btnHoje.classList.add("oculto");

    }else{

        btnHoje.classList.remove("oculto");

    }

}


function irParaHoje(){

    const hoje = new Date();

    calendarioAtual.mes = hoje.getMonth()+1;

    calendarioAtual.ano = hoje.getFullYear();

    mostrarCalendario();

}

/* ======================================================
   ARRANQUE DA APLICAÇÃO
====================================================== */

mostrarCalendario();

/* ======================================================
   INICIALIZAÇÃO DA APLICAÇÃO
====================================================== */

function atualizarTitulo(){

    document.getElementById("tituloApp").textContent = APP.nome;

}


function atualizarRodape(){

    document.getElementById("rodape").textContent =
        `${APP.nome} • ${APP.ambiente} • ${APP.versao}`;

}


function atualizarInterface(){

    atualizarCabecalho();

    atualizarRodape();

    mostrarCalendario();

    atualizarBotaoHoje();

}


function iniciarAplicacao(){

    atualizarInterface();

}


iniciarAplicacao();

/* ======================================================
   ATUALIZA TEXTO DOS DIAS SELECIONADOS
====================================================== */

function atualizarDiasSelecionados(){

    const caixa =
        document.getElementById("diasSelecionadosTexto");

    if(estado.diasSelecionados.length === 0){

        caixa.textContent =
            "Clique nos dias do calendário.";

        return;

    }

    caixa.textContent =
        estado.diasSelecionados
            .sort((a,b)=>a-b)
            .join(", ");

}