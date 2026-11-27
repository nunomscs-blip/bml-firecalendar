/* ======================================================
   EDIÇÃO DE TIPOS DE EVENTO
====================================================== */

let tipoEventoEditar = null;
let sobreposicoesTemporarias = [];

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

    abrirModalNovoEvento();

}


// =======================================================
// FUNÇÃO: novoEvento()
// Executada quando o utilizador clica no botão "+".
// =======================================================

function novoEvento(){

    estado.modal.modo = "novo";

    estado.modal.evento = null;

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

function preencherTiposEvento(){

    const select = document.getElementById("tipoEvento");

    select.innerHTML = "";

    TIPOS_EVENTO
    .filter(tipo => tipo.ativo)
    .forEach(tipo => {

        const option = document.createElement("option");

        option.value = tipo.id;

        option.textContent = tipo.nome;

        select.appendChild(option);

    });

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

    const btnCancelarEvento =
    document.getElementById("btnCancelarEvento");

    if(btnCancelarEvento){

    btnCancelarEvento.addEventListener(
        "click",
        cancelarEvento
    );

    }

/* ======================================================
   MODAL EVENTOS DO DIA
====================================================== */

const modalEventos =
    document.getElementById("modalEventos");

const tituloModalEventos =
    document.getElementById("tituloModalEventos");

const listaEventosDia =
    document.getElementById("listaEventosDia");

const btnFecharEventos =
    document.getElementById("btnFecharEventos");

   btnFecharEventos.addEventListener("click", () => {
    Paineis.fechar("modalEventos");
    });

const btnFecharPainelEventos =
    document.getElementById("btnFecharPainelEventos");

    btnFecharPainelEventos.addEventListener("click", () => {
    Paineis.fechar("modalEventos");
});

/* ======================================================
   ATUALIZA TURNOS DISPONÍVEIS
====================================================== */


function atualizarTurnosDisponiveis(){

    const selectTipo = document.getElementById("tipoEvento");
    const selectTurno = document.getElementById("turnoEvento");

    const tipo = obterTipoEvento(selectTipo.value);

    if(!tipo || !tipo.usaTurnos || !tipo.turnos){
        selectTurno.innerHTML = "";
        return false;
    }

    const turnoSelecionado = selectTurno.value;

    const turnos = Object.values(tipo.turnos);

    selectTurno.innerHTML = "";

    for(const turno of turnos){

        const opcao = document.createElement("option");

        opcao.value = turno.id;

        opcao.textContent =
            `${turno.nome} (${turno.inicio} - ${turno.fim})`;

        selectTurno.appendChild(opcao);

    }

    if(
        [...selectTurno.options].some(opcao =>
            opcao.value === turnoSelecionado
        )
    ){

        selectTurno.value = turnoSelecionado;

    }

    return true;

}


document
    .getElementById("tipoEvento")
    .addEventListener("change", atualizarTurnosDisponiveis);


function abrirModalNovoEvento(){


    Paineis.fechar("modalEventos");

    const modal = document.getElementById("modalEvento");
    const btnGuardar = document.getElementById("btnGuardarEvento");


    if(estado.modal.modo === "editar"){

        document.getElementById("tituloModal").textContent =
            "Editar Evento";
        btnGuardar.textContent = "Atualizar";

        document.getElementById("tipoEvento").value =
            estado.modal.evento.tipo;

        document.getElementById("turnoEvento").value =
            estado.modal.evento.turno;

        document.getElementById("observacoesEvento").value =
            estado.modal.evento.observacoes ?? "";

    }else{

        document.getElementById("tituloModal").textContent =
            "Novo Evento";
        btnGuardar.textContent = "Guardar";

        document.getElementById("tipoEvento").selectedIndex = 0;

            if(!atualizarTurnosDisponiveis()){
        return;
        }

        document.getElementById("turnoEvento").selectedIndex = 0;

        document.getElementById("observacoesEvento").value = "";

    }

    atualizarDiasSelecionados();

    modal.classList.remove("oculto");

}

/* ======================================================
   ABRIR MODAL - EDITAR EVENTO
====================================================== */


function abrirModalEditarEvento(){

    Paineis.fechar("modalEventos");

    const modal = document.getElementById("modalEvento");
    const btnGuardar = document.getElementById("btnGuardarEvento");

    document.getElementById("tituloModal").textContent =
        "Editar Evento";

    btnGuardar.textContent = "Atualizar";

    const evento = estado.modal.evento;

    const selectTipo = document.getElementById("tipoEvento");
    const selectTurno = document.getElementById("turnoEvento");

    selectTipo.value = evento.tipo;

    const tipo = obterTipoEvento(evento.tipo);

    selectTurno.innerHTML = "";

    if(tipo && tipo.turnos){

        const turno = Object.values(tipo.turnos).find(
            t => t.id === evento.turno
        );

        if(turno){

            const opcao = document.createElement("option");

            opcao.value = turno.id;

            opcao.textContent =
                `${turno.nome} (${turno.inicio} - ${turno.fim})`;

            selectTurno.appendChild(opcao);

        }

    }

    document.getElementById("observacoesEvento").value =
        evento.observacoes ?? "";

    atualizarDiasSelecionados();

    modal.classList.remove("oculto");

}


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

/* ======================================================
   VALIDAÇÃO DE SOBREPOSIÇÕES ENTRE EVENTOS
====================================================== */

// Converte um horário HH:MM em minutos
function converterHorarioEmMinutos(horario){

    if(!horario || !/^\d{2}:\d{2}$/.test(horario)){
        return null;
    }

    const [horas, minutos] = horario.split(":").map(Number);

    if(horas > 23 || minutos > 59){
        return null;
    }

    return horas * 60 + minutos;

}



/* ======================================================
   OBTÉM OS DIAS DE UM EVENTO
   Compatível com eventos individuais e antigos.
====================================================== */

function obterDiasEvento(evento){

    if(Number.isInteger(evento.dia)){
        return [evento.dia];
    }

    if(Array.isArray(evento.dias)){
        return evento.dias.filter(dia =>
            Number.isInteger(dia)
        );
    }

    return [];
}

/* ======================================================
   VERIFICA SE UM EVENTO ESTÁ BLOQUEADO POR DATA/HORA
   Protege serviços cujo turno já terminou.
====================================================== */

function eventoEstaBloqueado(evento, agora = new Date()){

    const tipo = obterTipoEvento(evento.tipo);

    const dias = obterDiasEvento(evento);

    // Sem informação suficiente, bloquear por segurança
    if(!tipo || dias.length === 0){
        return true;
    }

    // Eventos sem turnos: considerar o fim do dia civil
    if(!tipo.usaTurnos){

        return dias.some(dia => {

            const fimDia = new Date(
                evento.ano,
                evento.mes - 1,
                dia,
                23,
                59,
                59,
                999
            );

            return fimDia <= agora;

        });

    }

    if(!tipo.turnos){
        return true;
    }

    const turno = Object.values(tipo.turnos).find(
        t => t.id === evento.turno
    );

    if(!turno){
        return true;
    }

    const inicioMinutos =
        converterHorarioEmMinutos(turno.inicio);

    const fimMinutos =
        converterHorarioEmMinutos(turno.fim);

    if(inicioMinutos === null || fimMinutos === null){
        return true;
    }

    // Se pelo menos um serviço já terminou,
    // proteger o registo completo.
    return dias.some(dia => {

        const inicio = new Date(
            evento.ano,
            evento.mes - 1,
            dia,
            Math.floor(inicioMinutos / 60),
            inicioMinutos % 60
        );

        const fim = new Date(
            evento.ano,
            evento.mes - 1,
            dia,
            Math.floor(fimMinutos / 60),
            fimMinutos % 60
        );

        // Turnos que passam da meia-noite
        if(fim <= inicio){
            fim.setDate(fim.getDate() + 1);
        }

        return fim <= agora;

    });

}

/* ======================================================
   OBTÉM O INTERVALO REAL DE UM EVENTO
   Considera a passagem da meia-noite.
====================================================== */

function obterIntervaloEvento(evento, diaEvento){

    const tipo = obterTipoEvento(evento.tipo);

    if(!tipo || !tipo.turnos){
        return null;
    }

    const turno = Object.values(tipo.turnos).find(
        t => t.id === evento.turno
    );

    if(!turno){
        return null;
    }

    const inicioMinutos = converterHorarioEmMinutos(turno.inicio);
    const fimMinutos = converterHorarioEmMinutos(turno.fim);

    if(inicioMinutos === null || fimMinutos === null){
        return null;
    }

    const inicio = new Date(
        evento.ano,
        evento.mes - 1,
        diaEvento,
        Math.floor(inicioMinutos / 60),
        inicioMinutos % 60
    );

    const fim = new Date(
        evento.ano,
        evento.mes - 1,
        diaEvento,
        Math.floor(fimMinutos / 60),
        fimMinutos % 60
    );

    if(fim <= inicio){
        fim.setDate(fim.getDate() + 1);
    }

    return {
        inicio: inicio.getTime(),
        fim: fim.getTime(),
        tipo: evento.tipo
    };
}


/* ======================================================
   CALCULA A SOBREPOSIÇÃO REAL ENTRE DOIS EVENTOS
   Analisa todos os dias associados a cada evento.
====================================================== */

function calcularSobreposicao(eventoA, eventoB){

    const diasA = obterDiasEvento(eventoA);
    const diasB = obterDiasEvento(eventoB);

    for(const diaA of diasA){

        const intervaloA = obterIntervaloEvento(eventoA, diaA);

        if(!intervaloA){
            continue;
        }

        for(const diaB of diasB){

            const intervaloB = obterIntervaloEvento(eventoB, diaB);

            if(!intervaloB){
                continue;
            }

            const inicio = Math.max(
                intervaloA.inicio,
                intervaloB.inicio
            );

            const fim = Math.min(
                intervaloA.fim,
                intervaloB.fim
            );

            if(fim > inicio){

                return {
                    inicio,
                    fim,
                    minutos: (fim - inicio) / 60000,
                    intervaloA,
                    intervaloB
                };
            }
        }
    }

    return null;
}



// Identifica se a sobreposição ocorre
// num extremo dos dois turnos
function obterPosicaoSobreposicao(intervalo, sobreposicao){

    if(!intervalo || !sobreposicao){
        return null;
    }

    // Sobreposição no início do serviço
    if(sobreposicao.inicio === intervalo.inicio){
        return "inicio";
    }

    // Sobreposição no fim do serviço
    if(sobreposicao.fim === intervalo.fim){
        return "fim";
    }

    return null;
}


// Procura uma regra de autorização entre dois tipos
function obterRegraSobreposicao(tipoEvento, tipoCompativel){

    const tipo = obterTipoEvento(tipoEvento);

    if(!tipo || !Array.isArray(tipo.sobreposicoes)){
        return null;
    }

    return tipo.sobreposicoes.find(
        regra => regra.tipo === tipoCompativel
    ) || null;

}


// Valida a sobreposição entre dois eventos
function validarSobreposicaoEntreEventos(eventoA, eventoB){

    const sobreposicao = calcularSobreposicao(
        eventoA,
        eventoB
    );

    if(!sobreposicao){
        return {
            existe: false,
            autorizada: false
        };
    }

    // Verificar uma regra configurada no tipo A
    const regraA = obterRegraSobreposicao(
        eventoA.tipo,
        eventoB.tipo
    );

    if(regraA){

        const posicaoA = obterPosicaoSobreposicao(
            sobreposicao.intervaloA,
            sobreposicao
        );

        if(
            posicaoA &&
            regraA.quando.includes(posicaoA) &&
            sobreposicao.minutos <= regraA.maxMinutos
        ){

            return {
                existe: true,
                autorizada: true,
                minutos: sobreposicao.minutos,
                posicao: posicaoA,
                tipoRegra: eventoA.tipo
            };

        }

    }


    // Verificar uma regra configurada no tipo B
    const regraB = obterRegraSobreposicao(
        eventoB.tipo,
        eventoA.tipo
    );

    if(regraB){

        const posicaoB = obterPosicaoSobreposicao(
            sobreposicao.intervaloB,
            sobreposicao
        );

        if(
            posicaoB &&
            regraB.quando.includes(posicaoB) &&
            sobreposicao.minutos <= regraB.maxMinutos
        ){

            return {
                existe: true,
                autorizada: true,
                minutos: sobreposicao.minutos,
                posicao: posicaoB,
                tipoRegra: eventoB.tipo
            };

        }

    }


    // Existe sobreposição, mas não há autorização válida
    return {
        existe: true,
        autorizada: false,
        minutos: sobreposicao.minutos,
        posicao: null
    };

}


/* ======================================================
   VERIFICAÇÃO DE CONSISTÊNCIA DOS EVENTOS
   Analisa sobreposições sem alterar os registos.
====================================================== */

function verificarConsistenciaEventos(){

    const sobreposicoesAutorizadas = [];
    const sobreposicoesBloqueadas = [];

    // Comparar cada evento com os seguintes,
    // evitando analisar o mesmo par duas vezes.
    for(let i = 0; i < EVENTOS.length; i++){

        const eventoA = EVENTOS[i];

        for(let j = i + 1; j < EVENTOS.length; j++){

            const eventoB = EVENTOS[j];

            const resultado = validarSobreposicaoEntreEventos(
                eventoA,
                eventoB
            );

            if(!resultado.existe){
                continue;
            }

            const tipoA = obterTipoEvento(eventoA.tipo);
            const tipoB = obterTipoEvento(eventoB.tipo);

            const detalhe = {
                eventoA: eventoA.id,
                eventoB: eventoB.id,
                tipoA: tipoA ? tipoA.nome : eventoA.tipo,
                tipoB: tipoB ? tipoB.nome : eventoB.tipo,
                minutos: resultado.minutos
            };

            if(resultado.autorizada){

                sobreposicoesAutorizadas.push(detalhe);

            }else{

                sobreposicoesBloqueadas.push(detalhe);

            }

        }

    }

    const resultadoFinal = {
        totalEventos: EVENTOS.length,
        sobreposicoesAutorizadas,
        sobreposicoesBloqueadas
    };

    console.group("Verificação de consistência do calendário");

    console.log("Eventos analisados:", EVENTOS.length);

    console.log(
        "Sobreposições autorizadas:",
        sobreposicoesAutorizadas.length
    );

    console.log(
        "Sobreposições não autorizadas:",
        sobreposicoesBloqueadas.length
    );

    if(sobreposicoesBloqueadas.length > 0){

        console.warn(
            "Foram encontradas sobreposições não autorizadas:",
            sobreposicoesBloqueadas
        );

    }

    console.groupEnd();

    return resultadoFinal;

}


/* ======================================================
   VERIFICAÇÃO DOS METADADOS DE SOBREPOSIÇÃO OPTEL
   Analisa as associações visuais sem alterar os registos.
====================================================== */

function verificarConsistenciaMetadadosOPTEL(){

    const problemas = {
        optelInexistente: [],
        sobreposicaoNaoAutorizada: [],
        semMarcacaoVisual: [],
        multiplosOPTEL: [],
        marcacaoIncorreta: [],
        metadadosNoEventoErrado: []
    };

    // Registar todas as sobreposições OPTEL autorizadas
    const associacoesEsperadas = new Map();

    for(let i = 0; i < EVENTOS.length; i++){

        const eventoA = EVENTOS[i];

        for(let j = i + 1; j < EVENTOS.length; j++){

            const eventoB = EVENTOS[j];

            if(
                eventoA.tipo !== "OPTEL" &&
                eventoB.tipo !== "OPTEL"
            ){
                continue;
            }

            const resultado = validarSobreposicaoEntreEventos(
                eventoA,
                eventoB
            );

            if(!resultado.existe || !resultado.autorizada){
                continue;
            }

            const eventoOPTEL = eventoA.tipo === "OPTEL"
                ? eventoA
                : eventoB;

            const eventoServico = eventoA.tipo === "OPTEL"
                ? eventoB
                : eventoA;

            if(!associacoesEsperadas.has(eventoServico.id)){
                associacoesEsperadas.set(eventoServico.id, []);
            }

            associacoesEsperadas.get(eventoServico.id).push({
                optelId: eventoOPTEL.id,
                minutos: resultado.minutos
            });

        }
    }

    // Verificar as associações esperadas
    for(const [eventoId, associacoes] of associacoesEsperadas){

        const eventoServico = EVENTOS.find(
            evento => evento.id === eventoId
        );

        const metadados = eventoServico.sobreposicaoOPTEL;

        if(!metadados){

            problemas.semMarcacaoVisual.push({
                eventoId,
                tipo: eventoServico.tipo,
                turno: eventoServico.turno,
                optelIds: associacoes.map(item => item.optelId)
            });

            continue;
        }

        if(associacoes.length > 1){

            problemas.multiplosOPTEL.push({
                eventoId,
                tipo: eventoServico.tipo,
                optelIds: associacoes.map(item => item.optelId),
                optelIdRegistado: metadados.optelId
            });

        }

        const associacaoRegistada = associacoes.some(
            item => item.optelId === metadados.optelId
        );

        if(!associacaoRegistada){

            problemas.sobreposicaoNaoAutorizada.push({
                eventoId,
                optelIdRegistado: metadados.optelId,
                optelIdsEsperados: associacoes.map(item => item.optelId)
            });

        }

        const inicioEsperado = eventoServico.turno === "D";
        const fimEsperado = eventoServico.turno === "N";

        if(
            (inicioEsperado && metadados.inicio !== true) ||
            (fimEsperado && metadados.fim !== true) ||
            (inicioEsperado && metadados.fim === true) ||
            (fimEsperado && metadados.inicio === true)
        ){

            problemas.marcacaoIncorreta.push({
                eventoId,
                turno: eventoServico.turno,
                metadados
            });

        }

    }

    // Verificar todos os metadados actualmente guardados
    for(const evento of EVENTOS){

        const metadados = evento.sobreposicaoOPTEL;

        if(!metadados){
            continue;
        }

        if(evento.tipo === "OPTEL"){

            problemas.metadadosNoEventoErrado.push({
                eventoId: evento.id,
                tipo: evento.tipo
            });

            continue;
        }

        const eventoOPTEL = EVENTOS.find(
            item => item.id === metadados.optelId
        );

        if(!eventoOPTEL || eventoOPTEL.tipo !== "OPTEL"){

            problemas.optelInexistente.push({
                eventoId: evento.id,
                optelId: metadados.optelId
            });

            continue;
        }

        const resultado = validarSobreposicaoEntreEventos(
            evento,
            eventoOPTEL
        );

        if(!resultado.existe || !resultado.autorizada){

            problemas.sobreposicaoNaoAutorizada.push({
                eventoId: evento.id,
                optelId: eventoOPTEL.id,
                existeSobreposicao: resultado.existe,
                autorizada: resultado.autorizada
            });

        }

    }

    const totalProblemas = Object.values(problemas)
        .reduce((total, lista) => total + lista.length, 0);

    console.group("Verificação dos metadados OPTEL");

    console.log("Eventos analisados:", EVENTOS.length);

    console.log("Total de problemas:", totalProblemas);

    for(const [categoria, lista] of Object.entries(problemas)){

        console.log(
            `${categoria}: ${lista.length}`,
            lista
        );

    }

    if(totalProblemas === 0){

        console.log("Não foram detectadas inconsistências nos metadados OPTEL.");

    }else{

        console.warn("Foram detectadas inconsistências nos metadados OPTEL.");

    }

    console.groupEnd();

    return problemas;

}


function guardarEvento(){

    if(estado.modal.modo === "editar"){

        guardarEdicao();

        return;

    }

    guardarNovoEvento();

}

function guardarNovoEvento(){

    const tipoId = document.getElementById("tipoEvento").value;
    const turnoId = document.getElementById("turnoEvento").value;

    const observacoes =
        document.getElementById("observacoesEvento").value.trim();

    // Preparar todos os eventos antes de gravar
    const eventosNovos = estado.diasSelecionados.map(dia => ({

        id: crypto.randomUUID(),

        tipo: tipoId,
        turno: turnoId,

        ano: calendarioAtual.ano,
        mes: calendarioAtual.mes,
        dia: dia,

        observacoes: observacoes

    }));


    const sobreposicoesAutorizadas = [];
    const sobreposicoesBloqueadas = [];
    const registosSobreposicao = new Map();


    // Analisar todos os eventos seleccionados
    for(const eventoNovo of eventosNovos){

        // Criar as datas de referência
    const dataEventoNovo = new Date(
    eventoNovo.ano,
    eventoNovo.mes - 1,
    eventoNovo.dia
    );

    // Dia anterior
    const dataAnterior = new Date(dataEventoNovo);
    dataAnterior.setDate(dataAnterior.getDate() - 1);

    // Dia seguinte
    const dataSeguinte = new Date(dataEventoNovo);
    dataSeguinte.setDate(dataSeguinte.getDate() + 1);

    // Datas a considerar na pesquisa
    const datasAComparar = new Set([

        dataAnterior.toDateString(),
        dataEventoNovo.toDateString(),
        dataSeguinte.toDateString()

    ]);

    // Procurar eventos nos três dias
    const eventosExistentes = EVENTOS.filter(evento => {

        const diasExistentes = obterDiasEvento(evento);

            return diasExistentes.some(diaExistente => {

                const dataExistente = new Date(
                    evento.ano,
                    evento.mes - 1,
                    diaExistente
                );

                return datasAComparar.has(
                    dataExistente.toDateString()
                );

            });

        });


        for(const eventoExistente of eventosExistentes){

            const resultado = validarSobreposicaoEntreEventos(
                eventoNovo,
                eventoExistente
            );

            if(!resultado.existe){
                continue;
            }


            const tipoNovo = obterTipoEvento(eventoNovo.tipo);
            const tipoExistente = obterTipoEvento(eventoExistente.tipo);

            const nomeNovo = tipoNovo
                ? tipoNovo.nome
                : eventoNovo.tipo;

            const nomeExistente = tipoExistente
                ? tipoExistente.nome
                : eventoExistente.tipo;


            const detalhe = {

    dia: eventoNovo.dia,
    nomeNovo: nomeNovo,
    nomeExistente: nomeExistente,
    minutos: resultado.minutos,
    posicao: resultado.posicao

};


if(resultado.autorizada){

    sobreposicoesAutorizadas.push(detalhe);

    // Só registar a marcação visual quando existe OPTEL
    if(
        eventoNovo.tipo === "OPTEL" ||
        eventoExistente.tipo === "OPTEL"
    ){

        // Identificar os dois eventos
        const eventoOPTEL = eventoNovo.tipo === "OPTEL"
            ? eventoNovo
            : eventoExistente;

        const eventoServico = eventoNovo.tipo === "OPTEL"
            ? eventoExistente
            : eventoNovo;

        // Calcular a sobreposição real
        const sobreposicao = calcularSobreposicao(
            eventoNovo,
            eventoExistente
        );

        // A posição é sempre calculada relativamente
        // ao serviço que está a ser sobreposto
                
{
    const registo = registosSobreposicao.get(
        eventoServico.id
    ) || {
        inicio: false,
        fim: false,
        optelId: eventoOPTEL.id
    };

    // Serviço de Dia: marcação na zona superior
    if(eventoServico.turno === "D"){
        registo.inicio = true;
    }

    // Serviço de Noite: marcação na zona inferior
    if(eventoServico.turno === "N"){
        registo.fim = true;
    }

    registosSobreposicao.set(
        eventoServico.id,
        registo
    );
}


    }

    }else{

    sobreposicoesBloqueadas.push(detalhe);

    }

        }

    }


    // Bloquear toda a operação se existir
    // pelo menos uma sobreposição não autorizada
    if(sobreposicoesBloqueadas.length > 0){

        const mensagem = sobreposicoesBloqueadas.map(item =>

            `Dia ${item.dia}: ${item.nomeNovo} / ${item.nomeExistente} - ${item.minutos} minutos`

        ).join("\n");

        alert(
            "Não é possível guardar os eventos.\n\n" +
            "Foram detectadas sobreposições não autorizadas:\n\n" +
            mensagem
        );

        return;

    }


    // Pedir confirmação das sobreposições autorizadas
    if(sobreposicoesAutorizadas.length > 0){

        const mensagem = sobreposicoesAutorizadas.map(item =>

            `Dia ${item.dia}: ${item.nomeNovo} / ${item.nomeExistente}\n` +
            `Sobreposição: ${item.minutos} minutos (${item.posicao})`

        ).join("\n\n");

        const confirmar = confirm(

            "Foram detectadas sobreposições autorizadas:\n\n" +
            mensagem +
            "\n\nPretendes confirmar e guardar os eventos?"

        );

        if(!confirmar){
            return;
        }

    }


    
    // Persistir os registos de sobreposição OPTEL
    for(const [eventoId, registo] of registosSobreposicao){

        // Verificar se o evento sobreposto é um dos novos
        const eventoNovo = eventosNovos.find(
            evento => evento.id === eventoId
        );

        if(eventoNovo){

            const anterior = eventoNovo.sobreposicaoOPTEL || {};

            eventoNovo.sobreposicaoOPTEL = {
                inicio: anterior.inicio === true || registo.inicio,
                fim: anterior.fim === true || registo.fim,
                optelId: registo.optelId
            };

            continue;

        }

        // Se não for novo, actualizar o evento já existente
        const eventoExistente = EVENTOS.find(
            evento => evento.id === eventoId
        );

        if(eventoExistente){

            const anterior = eventoExistente.sobreposicaoOPTEL || {};

            const eventoAtualizado = {
                ...eventoExistente,

                sobreposicaoOPTEL: {
                    inicio: anterior.inicio === true || registo.inicio,
                    fim: anterior.fim === true || registo.fim,
                    optelId: registo.optelId
                }
            };

            editarEvento(
                eventoId,
                eventoAtualizado
            );

        }

    }


    // Gravar os novos eventos
    for(const evento of eventosNovos){

        adicionarEvento(evento);

    }



    finalizarEdicao();

}

function guardarEdicao(){

    const eventoOriginal = estado.modal.evento;

    const evento = {

        ...eventoOriginal,

        tipo: document.getElementById("tipoEvento").value,

        turno: document.getElementById("turnoEvento").value,

        observacoes:
            document.getElementById("observacoesEvento").value.trim()

    };

    const sobreposicoesBloqueadas = [];
    const sobreposicoesAutorizadas = [];

    // Analisar todos os eventos, excepto o próprio evento
    for(const existente of EVENTOS){

        if(existente.id === evento.id){
            continue;
        }

        const resultado = validarSobreposicaoEntreEventos(
            evento,
            existente
        );

        if(!resultado.existe){
            continue;
        }

        const tipoNovo = obterTipoEvento(evento.tipo);
        const tipoExistente = obterTipoEvento(existente.tipo);

        const nomeNovo = tipoNovo
            ? tipoNovo.nome
            : evento.tipo;

        const nomeExistente = tipoExistente
            ? tipoExistente.nome
            : existente.tipo;

        const detalhe = {
            nomeNovo,
            nomeExistente,
            minutos: resultado.minutos,
            eventoExistente: existente
        };

        if(resultado.autorizada){

            sobreposicoesAutorizadas.push(detalhe);

        }else{

            sobreposicoesBloqueadas.push(detalhe);

        }

    }

    // Bloquear sobreposições não autorizadas
    if(sobreposicoesBloqueadas.length > 0){

        const mensagem = sobreposicoesBloqueadas.map(item =>
            `${item.nomeNovo} / ${item.nomeExistente} - ${item.minutos} minutos`
        ).join("\n");

        alert(
            "Não é possível atualizar o evento.\n\n" +
            "Foram detectadas sobreposições não autorizadas:\n\n" +
            mensagem
        );

        return;

    }

    // Confirmar sobreposições autorizadas
    if(sobreposicoesAutorizadas.length > 0){

        const mensagem = sobreposicoesAutorizadas.map(item =>
            `${item.nomeNovo} / ${item.nomeExistente}\n` +
            `Sobreposição: ${item.minutos} minutos`
        ).join("\n\n");

        const confirmar = confirm(
            "Foram detectadas sobreposições autorizadas:\n\n" +
            mensagem +
            "\n\nPretendes confirmar a atualização?"
        );

        if(!confirmar){
            return;
        }

    }

    // Gravar alterações
    editarEvento(
        evento.id,
        evento
    );

    finalizarEdicao();

}

function finalizarEdicao(){

    // Fecha o modal
    document
        .getElementById("modalEvento")
        .classList.add("oculto");

    // Volta ao modo normal
    estado.modo = MODOS.VISUALIZACAO;

    // Limpa a seleção
    estado.diasSelecionados = [];

    // Limpa o estado do modal
    estado.modal.modo = "novo";
    estado.modal.evento = null;

    // Limpa observações
    document.getElementById("observacoesEvento").value = "";

    // Atualiza a interface
    atualizarInterface();

    // Atualiza o calendário
    mostrarCalendario();


}

/* ======================================================
   MODAL EVENTOS DO DIA
====================================================== */
function atualizarListaEventos(eventos){

    listaEventosDia.innerHTML = "";

    if(eventos.length === 0){

        listaEventosDia.innerHTML = `
            <p>Não existem eventos neste dia.</p>
        `;

        return;
    }

    for(const evento of eventos){

        const tipoEvento = obterTipoEvento(evento.tipo);

        const turno = tipoEvento && tipoEvento.turnos
            ? Object.values(tipoEvento.turnos).find(
                t => t.id === evento.turno
            )
            : null;

        if(!turno){
            continue;
}

        const tipo = obterTipoEvento(evento.tipo);

        const nomeTipo = tipo ? tipo.nome : evento.tipo;

        const icone = tipo ? tipo.icone : "📌";

        listaEventosDia.innerHTML += `

            <div class="itemEvento">

                <div class="cabecalhoEvento">

                    <strong>${icone} ${nomeTipo}</strong>

                    </div>

                <div class="detalhesEvento">

                    <div>📅 <strong>Turno:</strong> ${turno.nome}</div>

                    <div>🕒 <strong>Horário:</strong> ${turno.inicio} → ${turno.fim}</div>

                    ${
                        evento.observacoes
                        ?
                        `
                        <div class="observacoesEvento">

                           📝 <strong>Observações</strong><br>

                            ${evento.observacoes}

                        </div>
                        `
                        :
                        ""
                    }

                </div>

                <div class="acoesEvento">

                    <button class="btnEditar" data-id="${evento.id}">
                        ✏ Editar
                    </button>

                    <button class="btnEliminar" data-id="${evento.id}">
                        🗑 Eliminar
                    </button>

                </div>

            </div>

        `;

    }

    const botoesEditar = document.querySelectorAll(".btnEditar");

    botoesEditar.forEach(botao => {

    botao.addEventListener("click", editarEventoModal);

    });

    const botoesEliminar = document.querySelectorAll(".btnEliminar");

   botoesEliminar.forEach(botao => {

    botao.addEventListener("click", function(event){

        const id = event.currentTarget.dataset.id;

        const evento = EVENTOS.find(e => e.id === id);

        if(!evento){

            return;

        }

        // Fecha o painel "Eventos do dia"
        Paineis.fechar("modalEventos");

        // Abre a confirmação de eliminação
        abrirModalEliminar(evento);

    });

});

}

function editarEventoModal(event){

    console.log("EDITAR", event.currentTarget.dataset.id);

    const id = event.currentTarget.dataset.id;

    const evento = EVENTOS.find(e => e.id === id);

    if(!evento){
        return;
    }

    // Impede a edição de eventos cujo turno já terminou
    if(eventoEstaBloqueado(evento)){

        alert(
            "Este evento já terminou e encontra-se bloqueado para edição."
        );

        return;
    }

    // Guarda o estado do modal
    estado.modal.modo = "editar";
    estado.modal.evento = evento;

    // Guarda os dias do evento
    estado.diasSelecionados = obterDiasEvento(evento);

    Paineis.fechar("modalEventos");

    // Abre o modal de edição
    abrirModalEditarEvento();

}

function confirmarEliminar(){

    if(!estado.modalEliminar.evento){

        return;

    }

    const idEvento = estado.modalEliminar.evento.id;

    // Elimina o evento
    eliminarEvento(idEvento);

    // Fecha a confirmação
    fecharModalEliminar();

    // Garante que o painel de eventos também fica fechado
    Paineis.fechar("modalEventos");

    // Limpa o estado
    estado.modalEliminar.evento = null;

    // Actualiza o calendário
    atualizarInterface();

    mostrarCalendario();

    mostrarToast("✔ Evento eliminado com sucesso.");

}

document
    .getElementById("btnConfirmarEliminar")
    .addEventListener("click", confirmarEliminar);

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

    Paineis.abrir("modalConfiguracao");

};

const btnFecharConfiguracao =
    document.getElementById("btnFecharConfiguracao");

btnFecharConfiguracao.addEventListener(
    "click",
    fecharConfiguracao
);

const btnFecharConfiguracaoRodape =
    document.getElementById("btnFecharConfiguracaoRodape");

btnFecharConfiguracaoRodape.addEventListener(
    "click",
    fecharConfiguracao
);

function fecharConfiguracao(){

    Paineis.fechar("modalConfiguracao");

}

const btnTiposEvento =
    document.getElementById("btnTiposEvento");

btnTiposEvento.addEventListener(
    "click",
    abrirTiposEvento
);

const btnFecharTiposEvento =
    document.getElementById("btnFecharTiposEvento");

btnFecharTiposEvento.addEventListener(
    "click",
    fecharTiposEvento
);

function abrirTiposEvento(){

    fecharConfiguracao();

    atualizarListaTiposEvento();

    Paineis.abrir("modalTiposEvento");

}

function fecharTiposEvento(){

    Paineis.fechar("modalTiposEvento");

}

/* ======================================================
   BACKUP / RESTAURO
====================================================== */

const btnFazerBackup =

    document.getElementById("btnFazerBackup");


const btnRestaurarBackup =

    document.getElementById("btnRestaurarBackup");


btnFazerBackup.addEventListener(

    "click",

    function () {

        criarBackup();

    }

);


btnRestaurarBackup.addEventListener(

    "click",

    function () {

        selecionarBackup();

    }

);

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

    carregarTiposEvento();

    // Verificar consistência dos eventos carregados
    verificarConsistenciaEventos();

    // Verificar consistência dos metadados OPTEL
    verificarConsistenciaMetadadosOPTEL();

    preencherTiposEvento();

    atualizarInterface();

    mostrarCalendario();

    atualizarLegendaEventos();

    Paineis.inicializar();

}

function mostrarToast(texto){

    const toast = document.getElementById("toast");

    toast.textContent = texto;

    toast.classList.remove("oculto");

    toast.classList.add("mostrar");

    setTimeout(() => {

        toast.classList.remove("mostrar");

        setTimeout(() => {

            toast.classList.add("oculto");

        }, 300);

    }, 2500);

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

/* ======================================================
   LEGENDA DOS EVENTOS
====================================================== */

function atualizarLegendaEventos(){

    const legenda = document.getElementById("legendaEventos");

    if(!legenda) return;

    legenda.innerHTML = "";

    TIPOS_EVENTO
    .filter(tipo => tipo.ativo)
    .forEach(tipo => {

        legenda.innerHTML += `
            <div class="itemLegenda">
                <span class="corLegenda"
                      style="background:${tipo.cor};"></span>
                <span>${tipo.nome}</span>
            </div>
        `;

    });

}


/* ======================================================
   TIPOS DE EVENTO
====================================================== */

function atualizarListaTiposEvento(){

    const lista = document.getElementById("listaTiposEvento");

    lista.innerHTML = "";

    TIPOS_EVENTO.forEach(tipo => {

        lista.innerHTML += `

        <div class="cartaoTipoEvento">

            <div class="cabecalhoTipo">

                <div class="infoTipo">

                    <span
                        class="corTipo"
                        style="background:${tipo.cor};">
                    </span>

                    <span class="nomeTipo">

                        ${tipo.nome}

                    </span>

                </div>

                <label class="switchTipo">

                    <input
                        type="checkbox"
                        data-tipo="${tipo.id}"
                        ${tipo.ativo ? "checked" : ""}>

                    Ativo

                </label>

            </div>

            <div class="detalhesTipo">

                <span>

                    Turnos:
                    ${tipo.usaTurnos ? "Sim" : "Não"}

                </span>

                <button
                    class="btnEditarTipo"
                    data-tipo="${tipo.id}">

                    Editar

                </button>

            </div>

        </div>

        `;

    });

    document
        .querySelectorAll("#listaTiposEvento input")
        .forEach(chk => {

            chk.addEventListener("change", function(){

                const tipo = TIPOS_EVENTO.find(
                    t => t.id === this.dataset.tipo
                );

                tipo.ativo = this.checked;

                guardarTiposEvento();

                preencherTiposEvento();

                atualizarLegendaEventos();

            });

        });

    document
        .querySelectorAll(".btnEditarTipo")
        .forEach(btn => {

            btn.addEventListener("click", function(){

                abrirEditarTipoEvento(
                    this.dataset.tipo
                );

            });

        });

}

/* ======================================================
   EDITAR TIPO DE EVENTO
====================================================== */


function abrirEditarTipoEvento(id){

    tipoEventoEditar = obterTipoEvento(id);

    if(!tipoEventoEditar){
        return;
    }

    document.getElementById("editarNomeTipo").value =
        tipoEventoEditar.nome;

    document.getElementById("editarCorTipo").value =
        tipoEventoEditar.cor;

    document.getElementById("editarTipoAtivo").checked =
        tipoEventoEditar.ativo;

    document.getElementById("editarTipoTurnos").checked =
        tipoEventoEditar.usaTurnos;

    // Obter os horários configurados para o tipo
    const turnoDia = tipoEventoEditar.turnos?.turno1;
    const turnoNoite = tipoEventoEditar.turnos?.turno2;

    // Preencher os campos horários
    document.getElementById("diaInicio").value =
        turnoDia?.inicio || "";

    document.getElementById("diaFim").value =
        turnoDia?.fim || "";

    document.getElementById("noiteInicio").value =
        turnoNoite?.inicio || "";

    document.getElementById("noiteFim").value =
        turnoNoite?.fim || "";

    // Mostrar ou ocultar a zona dos turnos
    document.getElementById("zonaTurnosTipo").classList.toggle(
        "oculto",
        !tipoEventoEditar.usaTurnos
    );

    // Inicializar configuração de sobreposições
    inicializarConfiguracaoSobreposicoes();

    document
        .getElementById("modalEditarTipoEvento")
        .classList.remove("oculto");

}


function guardarEdicaoTipoEvento(){

    if(!tipoEventoEditar){
        return;
    }

    const usaTurnos =
        document.getElementById("editarTipoTurnos").checked;

    // Validar os horários, caso o tipo utilize turnos
    if(usaTurnos){

        const diaInicio = document.getElementById("diaInicio").value;
        const diaFim = document.getElementById("diaFim").value;
        const noiteInicio = document.getElementById("noiteInicio").value;
        const noiteFim = document.getElementById("noiteFim").value;

        if(!diaInicio || !diaFim || !noiteInicio || !noiteFim){

            alert("Preenche todos os horários dos turnos.");
            return;

        }

        // Garantir que a estrutura dos turnos existe
        tipoEventoEditar.turnos =
            tipoEventoEditar.turnos || {};

        tipoEventoEditar.turnos.turno1 = {
            ...tipoEventoEditar.turnos.turno1,
            id: tipoEventoEditar.turnos.turno1?.id || "D",
            nome: tipoEventoEditar.turnos.turno1?.nome || "Dia",
            inicio: diaInicio,
            fim: diaFim
        };

        tipoEventoEditar.turnos.turno2 = {
            ...tipoEventoEditar.turnos.turno2,
            id: tipoEventoEditar.turnos.turno2?.id || "N",
            nome: tipoEventoEditar.turnos.turno2?.nome || "Noite",
            inicio: noiteInicio,
            fim: noiteFim
        };

    }

    // Guardar restantes propriedades
    tipoEventoEditar.nome =
        document.getElementById("editarNomeTipo").value.trim();

    tipoEventoEditar.cor =
        document.getElementById("editarCorTipo").value;

    tipoEventoEditar.ativo =
        document.getElementById("editarTipoAtivo").checked;

    tipoEventoEditar.usaTurnos = usaTurnos;

    
    tipoEventoEditar.usaTurnos = usaTurnos;

    // Guardar regras de sobreposição
    const permiteSobreposicao = document.getElementById(
        "editarPermiteSobreposicao"
    ).checked;

    tipoEventoEditar.sobreposicoes = permiteSobreposicao
        ? JSON.parse(JSON.stringify(sobreposicoesTemporarias))
        : [];

    // Persistir configurações
    guardarTiposEvento();


    // Atualizar interface
    document
        .getElementById("modalEditarTipoEvento")
        .classList.add("oculto");

    atualizarListaTiposEvento();
    preencherTiposEvento();
    atualizarLegendaEventos();

    tipoEventoEditar = null;

    mostrarToast("Tipo de evento atualizado com sucesso.");

}


// Associar botões
document
    .getElementById("btnGuardarEditarTipo")
    .addEventListener("click", guardarEdicaoTipoEvento);


document
    .getElementById("btnCancelarEditarTipo")
    .addEventListener("click", function(){

        document
            .getElementById("modalEditarTipoEvento")
            .classList.add("oculto");

        tipoEventoEditar = null;

    });


// Mostrar ou ocultar horários ao alterar a opção de turnos
document
    .getElementById("editarTipoTurnos")
    .addEventListener("change", function(){

        document
            .getElementById("zonaTurnosTipo")
            .classList.toggle("oculto", !this.checked);

    });


/* ======================================================
   CONFIGURAÇÃO DE SOBREPOSIÇÕES
====================================================== */

// Inicializar a configuração ao abrir o modal

function inicializarConfiguracaoSobreposicoes(){

    const checkbox = document.getElementById(
        "editarPermiteSobreposicao"
    );

    const zona = document.getElementById(
        "zonaSobreposicoes"
    );

    // Criar cópia temporária das regras existentes
    sobreposicoesTemporarias = Array.isArray(
        tipoEventoEditar.sobreposicoes
    )
        ? JSON.parse(JSON.stringify(tipoEventoEditar.sobreposicoes))
        : [];

    // Activar a opção se já existirem regras
    checkbox.checked = sobreposicoesTemporarias.length > 0;

    // Mostrar ou esconder a configuração
    zona.classList.toggle("oculto", !checkbox.checked);

    // Preencher tipos compatíveis
    preencherTiposSobreposicao();

    // Mostrar regras existentes
    atualizarListaSobreposicoes();

}


// Preencher a lista de tipos compatíveis

function preencherTiposSobreposicao(){

    const select = document.getElementById(
        "novoTipoSobreposicao"
    );

    select.innerHTML = `
        <option value="">Seleccionar tipo de evento</option>
    `;

    TIPOS_EVENTO
        .filter(tipo =>
            tipo.ativo &&
            tipo.id !== tipoEventoEditar.id
        )
        .forEach(tipo => {

            const option = document.createElement("option");

            option.value = tipo.id;
            option.textContent = tipo.nome;

            select.appendChild(option);

        });

}


// Mostrar regras de sobreposição

function atualizarListaSobreposicoes(){

    const lista = document.getElementById(
        "listaSobreposicoes"
    );

    lista.innerHTML = "";

    if(sobreposicoesTemporarias.length === 0){

        lista.innerHTML = `
            <p>Ainda não existem regras configuradas.</p>
        `;

        return;

    }

    sobreposicoesTemporarias.forEach((regra, indice) => {

        const tipo = obterTipoEvento(regra.tipo);

        const nomeTipo = tipo
            ? tipo.nome
            : regra.tipo;

        let posicao = "Ambos";

        if(
            regra.quando.length === 1 &&
            regra.quando[0] === "inicio"
        ){
            posicao = "Início";
        }

        if(
            regra.quando.length === 1 &&
            regra.quando[0] === "fim"
        ){
            posicao = "Fim";
        }

        const item = document.createElement("div");

        item.className = "itemSobreposicao";

        item.innerHTML = `
            <div>
                <strong>${nomeTipo}</strong>
                <div>Máximo: ${regra.maxMinutos} minutos</div>
                <div>Posição: ${posicao}</div>
            </div>

            <button
                type="button"
                class="btnRemoverSobreposicao"
                data-indice="${indice}">
                Remover
            </button>
        `;

        lista.appendChild(item);

    });

    // Associar botões de remoção

    lista
        .querySelectorAll(".btnRemoverSobreposicao")
        .forEach(botao => {

            botao.addEventListener("click", function(){

                const indice = Number(this.dataset.indice);

                sobreposicoesTemporarias.splice(indice, 1);

                atualizarListaSobreposicoes();

            });

        });

}


// Adicionar uma nova regra

function adicionarSobreposicao(){

    const tipoId = document.getElementById(
        "novoTipoSobreposicao"
    ).value;

    const maxMinutos = Number(
        document.getElementById("novoMaxMinutos").value
    );

    const quando = document.getElementById(
        "novoQuandoSobreposicao"
    ).value;

    if(!tipoId){

        alert("Selecciona um tipo de evento compatível.");

        return;

    }

    if(
        !Number.isInteger(maxMinutos) ||
        maxMinutos <= 0
    ){

        alert("Indica um tempo máximo válido, em minutos.");

        return;

    }

    // Impedir regras duplicadas

    const duplicada = sobreposicoesTemporarias.some(
        regra => regra.tipo === tipoId
    );

    if(duplicada){

        alert("Já existe uma regra para este tipo de evento.");

        return;

    }

    // Criar regra

    sobreposicoesTemporarias.push({

        tipo: tipoId,

        maxMinutos: maxMinutos,

        quando: quando === "ambos"
            ? ["inicio", "fim"]
            : [quando]

    });

    // Actualizar lista

    atualizarListaSobreposicoes();

    // Limpar campos

    document.getElementById(
        "novoTipoSobreposicao"
    ).value = "";

    document.getElementById(
        "novoMaxMinutos"
    ).value = "";

    document.getElementById(
        "novoQuandoSobreposicao"
    ).value = "inicio";

}


// Mostrar ou esconder a configuração

document
    .getElementById("editarPermiteSobreposicao")
    .addEventListener("change", function(){

        document
            .getElementById("zonaSobreposicoes")
            .classList.toggle("oculto", !this.checked);

    });


// Associar botão Adicionar regra

document
    .getElementById("btnAdicionarSobreposicao")
    .addEventListener("click", adicionarSobreposicao);


