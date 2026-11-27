// =======================================================
// CALENDÁRIO ATUAL
// Abre automaticamente no mês e ano actuais.
// =======================================================

const hojeInicial = new Date();

const calendarioAtual = {
    mes: hojeInicial.getMonth() + 1,
    ano: hojeInicial.getFullYear()
};


// =======================================================
// ESTADO DA APLICAÇÃO
// =======================================================

const estado = {

    modo: MODOS.VISUALIZACAO,

    diasSelecionados: [],

    modal: {

        modo: "novo",

        evento: null

    },

    modalEliminar: {

        evento: null

    }

};

let temporizadorLongPress = null;

const TEMPO_LONG_PRESS = 600;

// =======================================================
// OBTÉM O NOME DO MÊS
// Recebe um número (1-12) e devolve o nome do mês.
// =======================================================

function obterNomeMes(mes){

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    return meses[mes - 1];

}


/* ======================================================
   VERIFICA SE UM EVENTO OCORRE NUM DETERMINADO DIA
   Compatível com eventos individuais e eventos antigos
   com vários dias.
====================================================== */

function eventoOcorreNoDia(evento, ano, mes, dia){

    if(
        evento.ano !== ano ||
        evento.mes !== mes
    ){
        return false;
    }

    // Formato individual
    if(Number.isInteger(evento.dia)){
        return evento.dia === dia;
    }

    // Formato antigo com vários dias
    if(Array.isArray(evento.dias)){
        return evento.dias.includes(dia);
    }

    return false;
}


// =======================================================
// DESENHA O CALENDÁRIO
// =======================================================

function mostrarCalendario(){

    const calendario = document.getElementById("calendario");

    calendario.innerHTML = `

        <section id="tituloCalendario">

            <button id="btnAnterior">◀</button>

            <h2>${obterNomeMes(calendarioAtual.mes)} ${calendarioAtual.ano}</h2>

            <button id="btnSeguinte">▶</button>

        </section>

        <section id="diasSemana">

            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
            <div>Dom</div>

        </section>

        <section id="diasMes"></section>

    `;

    const diasMes = document.getElementById("diasMes");

    const data = new Date(

        calendarioAtual.ano,
        calendarioAtual.mes - 1,
        1

    );

    const diasNoMes = new Date(

        calendarioAtual.ano,
        calendarioAtual.mes,
        0

    ).getDate();

    let posicao = data.getDay() - 1;

    if(posicao < 0){

        posicao = 6;

    }

    // Espaços vazios antes do dia 1

    for(let i = 0; i < posicao; i++){

        diasMes.innerHTML += `
            <div class="dia vazio"></div>
        `;

    }


    // Dias do mês

    for(let i = 1; i <= diasNoMes; i++){

    const classe = obterClasseDia(i);

   const eventos = EVENTOS.filter(evento =>
    eventoOcorreNoDia(
        evento,
        calendarioAtual.ano,
        calendarioAtual.mes,
        i
    )
    );


    
    let corDia = "";
    let corNoite = "";

    let tiraInicio = false;
    let tiraFim = false;

    eventos.forEach(evento => {
    const tipo = obterTipoEvento(evento.tipo);
    if(!tipo) return;

    if(evento.turno === "D"){
        corDia = tipo.cor;
    }

    if(evento.turno === "N"){
        corNoite = tipo.cor;
    }

    const sobreposicao = evento.sobreposicaoOPTEL;

    if(
        sobreposicao &&
        sobreposicao.optelId &&
        EVENTOS.some(optel =>
            optel.id === sobreposicao.optelId &&
            optel.tipo === "OPTEL"
        )
    ){
        // A tira acompanha o turno do serviço afectado
        if(evento.turno === "D"){
            tiraInicio = true;
        }

        if(evento.turno === "N"){
            tiraFim = true;
        }
    }
    });


    const marcadorInicio = tiraInicio
        ? '<span class="marcadorOPTEL marcadorOPTELInicio"></span>'
        : '';

    const marcadorFim = tiraFim
        ? '<span class="marcadorOPTEL marcadorOPTELFim"></span>'
        : '';

    diasMes.innerHTML += `
        <div
            class="${classe}"
            data-dia="${i}"
            style="
                --cor-dia:${corDia || "#ffffff"};
                --cor-noite:${corNoite || "#ffffff"};
            "
        >
            ${marcadorInicio}
            ${marcadorFim}
            <span class="numeroDia">${i}</span>
        </div>
    `;

    }



inicializarCalendario();

atualizarBotaoHoje();

}


/* ======================================================
   OBTÉM A CLASSE DO DIA
====================================================== */

function obterClasseDia(dia){

    let classe = "dia";

    const hoje = new Date();

    if(
        dia === hoje.getDate() &&
        calendarioAtual.mes === (hoje.getMonth() + 1) &&
        calendarioAtual.ano === hoje.getFullYear()
    ){

        classe += " hoje";

    }

    if(estado.diasSelecionados.includes(dia)){

        classe += " selecionado";

    }

    return classe;

}

// =======================================================
// INICIALIZA O CALENDÁRIO
// =======================================================

function inicializarCalendario(){

    // Botão anterior

    const btnAnterior = document.getElementById("btnAnterior");

    if(btnAnterior){

        btnAnterior.addEventListener("click", mesAnterior);

    }

    // Botão seguinte

    const btnSeguinte = document.getElementById("btnSeguinte");

    if(btnSeguinte){

        btnSeguinte.addEventListener("click", mesSeguinte);

    }

    // Clique nos dias

    const dias = document.querySelectorAll(".dia");

    dias.forEach(function(dia){

        if(!dia.classList.contains("vazio")){

            dia.addEventListener("click", selecionarDia);

            dia.addEventListener("mousedown", iniciarLongPress);
            dia.addEventListener("mouseup", cancelarLongPress);
            dia.addEventListener("mouseleave", cancelarLongPress);

            dia.addEventListener("touchstart", iniciarLongPress);
            dia.addEventListener("touchend", cancelarLongPress);
            dia.addEventListener("touchcancel", cancelarLongPress);


        }

    });

}


// =======================================================
// SELECIONA UM DIA
// =======================================================
function selecionarDia(event){

    const dia = Number(event.currentTarget.dataset.dia);

    if (estado.modo === MODOS.SELECAO_DIAS){

        const indice = estado.diasSelecionados.indexOf(dia);

        if(indice === -1){

            estado.diasSelecionados.push(dia);

        }else{

            estado.diasSelecionados.splice(indice,1);

        }

        atualizarDiasSelecionados();

        atualizarBotaoFlutuante();

        mostrarCalendario();

        return;

    }

    // ==================================================
    // MODO VISUALIZAÇÃO
    // ==================================================

   const eventos = EVENTOS.filter(evento =>
    eventoOcorreNoDia(
        evento,
        calendarioAtual.ano,
        calendarioAtual.mes,
        dia
    )

    );

    if(eventos.length){

        abrirEventosDia(dia);

    }

}

/* ======================================================
   ABRIR EVENTOS DO DIA
====================================================== */

function abrirEventosDia(dia){

    console.log("1 - abrirEventosDia");

    const eventosDia = EVENTOS.filter(evento =>
    eventoOcorreNoDia(
        evento,
        calendarioAtual.ano,
        calendarioAtual.mes,
        dia
    )

    );

    console.log("2 - eventos:", eventosDia.length);

    atualizarListaEventos(eventosDia);

    console.log("3 - lista atualizada");

    Paineis.abrir("modalEventos");

    console.log("4 - painel aberto");

}

function abrirModalEliminar(evento){

    estado.modalEliminar.evento = evento;

    document.getElementById("chkConfirmarEliminar").checked = false;

    document.getElementById("btnConfirmarEliminar").disabled = true;

    document.getElementById("modalEliminar")
        .classList.remove("oculto");

}

function fecharModalEliminar(){

    document.getElementById("modalEliminar")
        .classList.add("oculto");

    estado.modalEliminar.evento = null;

}


/* ======================================================
   EVENTOS DO MODAL ELIMINAR
====================================================== */

document
    .getElementById("chkConfirmarEliminar")
    .addEventListener("change", function () {

        document
            .getElementById("btnConfirmarEliminar")
            .disabled = !this.checked;

    });

document
    .getElementById("btnCancelarEliminar")
    .addEventListener("click", fecharModalEliminar);

// =======================================================
// LONG PRESS
// =======================================================

function iniciarLongPress(event){

    if(estado.modo !== MODOS.VISUALIZACAO){

        return;

    }

    const elemento = event.currentTarget;

    temporizadorLongPress = setTimeout(() => {

        executarLongPress(elemento);

    }, TEMPO_LONG_PRESS);

}

function cancelarLongPress(){

    clearTimeout(temporizadorLongPress);

    temporizadorLongPress = null;

}

function executarLongPress(elemento){

    const dia = Number(elemento.dataset.dia);

   const eventosDia = EVENTOS.filter(evento =>
    eventoOcorreNoDia(
        evento,
        calendarioAtual.ano,
        calendarioAtual.mes,
        dia
    )

    );

    if(eventosDia.length === 0){

        return;

    }

    abrirEventosDia(dia);

    }


