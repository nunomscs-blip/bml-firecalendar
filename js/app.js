// =======================================================
// BOTÃO NOVO EVENTO
// =======================================================

const btnNovo = document.getElementById("btnNovo");
btnNovo.addEventListener("click", acaoBotaoFlutuante);

/* ======================================================
   BOTÃO FLUTUANTE
====================================================== */

function acaoBotaoFlutuante(){

    switch(estado.modo){

        case MODOS.VISUALIZACAO:

            novoEvento();
            break;

        case MODOS.SELECAO_DIAS:

            confirmarDias();
            break;

    }

}

document
    .getElementById("btnCancelar")
    .addEventListener("click", cancelarSelecaoDias);


/* ======================================================
   CONFIRMAR DIAS
====================================================== */

function confirmarDias(){

    if(estado.diasSelecionados.length === 0){

        alert("Seleciona pelo menos um dia.");
        return;

    }

    estado.modo = MODOS.NOVO_EVENTO;

    atualizarInterface();

    document
        .getElementById("modalEvento")
        .classList.remove("oculto");

}


// =======================================================
// FUNÇÃO: novoEvento()
// Executada quando o utilizador clica no botão "+".
// =======================================================

function novoEvento(){

    estado.modo = MODOS.SELECAO_DIAS;

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

    const btnCancelar = document.getElementById("btnCancelar");
    const btnHoje = document.getElementById("btnHoje");
    const btnConfiguracao = document.getElementById("btnConfiguracao");

    switch(estado.modo){

        case MODOS.VISUALIZACAO:

            titulo.textContent = TITULOS.visualizacao;

            btnCancelar.classList.add("oculto");
            btnHoje.classList.remove("oculto");
            btnConfiguracao.classList.remove("oculto");

            break;


        case MODOS.SELECAO_DIAS:

            titulo.textContent =
                estado.diasSelecionados.length > 0
                ? `${TITULOS.selecaoDias} (${estado.diasSelecionados.length})`
                : TITULOS.selecaoDias;

            btnCancelar.classList.remove("oculto");
            btnHoje.classList.add("oculto");
            btnConfiguracao.classList.add("oculto");

            break;

        case MODOS.NOVO_EVENTO:

            titulo.textContent = TITULOS.novoEvento;

            btnCancelar.classList.add("oculto");
            btnHoje.classList.add("oculto");
            btnConfiguracao.classList.add("oculto");

            break;

    }

}


/* ======================================================
   CANCELAR SELEÇÃO DE DIAS
====================================================== */

function cancelarSelecaoDias(){

    estado.modo = MODOS.VISUALIZACAO;

    estado.diasSelecionados = [];

    atualizarInterface();

    mostrarCalendario();

}


/* ======================================================
   BOTÃO FLUTUANTE
====================================================== */

function atualizarBotaoFlutuante(){

    const btn = document.getElementById("btnNovo");

    if (estado.modo === MODOS.NOVO_EVENTO){

    btn.classList.add("oculto");

    return;

    }
    
    if(estado.modo === MODOS.VISUALIZACAO){

        btn.textContent = "+";
        btn.disabled = false;
        btn.classList.remove("oculto");

        return;
    }

    


    btn.textContent = "✓";

    const ativo = estado.diasSelecionados.length > 0;

    btn.disabled = !ativo;

    btn.classList.toggle("desativado", !ativo);

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

    estado.modo = MODOS.VISUALIZACAO;

    estado.diasSelecionados = [];

    document
    .getElementById("modalEvento")
    .classList.add("oculto");

    atualizarInterface();

    mostrarCalendario();


}

/* ======================================================
   GUARDAR EVENTO
====================================================== */

const btnGuardarEvento =
    document.getElementById("btnGuardarEvento");

btnGuardarEvento.addEventListener(
    "click",
    guardarEvento
);

function guardarEvento(){

    console.log("Guardar evento");

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
   INICIALIZAÇÃO DA APLICAÇÃO
====================================================== */

function atualizarRodape(){

    document.getElementById("rodape").textContent =
        `${APP.nome} • ${APP.ambiente} • ${APP.versao}`;

}


function atualizarInterface(){

    atualizarCabecalho();

    atualizarBotaoFlutuante();

    atualizarRodape();

    atualizarBotaoHoje();

}

function iniciarAplicacao() {

    carregarEventos();

    atualizarInterface();

    mostrarCalendario();

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