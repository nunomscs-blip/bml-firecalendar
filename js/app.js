/* ======================================================
   EDIÇÃO DE TIPOS DE EVENTO
====================================================== */

let tipoEventoEditar = null;

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

    abrirModalEvento();

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

    btnCancelarEvento.addEventListener(
    "click",
    cancelarEvento
    );

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

btnFecharEventos.addEventListener(
    "click",
    fecharModalEventos
);

/* ======================================================
   ATUALIZA TURNOS DISPONÍVEIS
====================================================== */

function atualizarTurnosDisponiveis(){

    const select = document.getElementById("turnoEvento");

    let existeDia = false;
    let existeNoite = false;

    for(const dia of estado.diasSelecionados){

        const eventos = EVENTOS.filter(e =>
            e.ano === calendarioAtual.ano &&
            e.mes === calendarioAtual.mes &&
            e.dia === dia
        );

        if(eventos.some(e => e.turno === "D")){
            existeDia = true;
        }

        if(eventos.some(e => e.turno === "N")){
            existeNoite = true;
        }

    }

    select.innerHTML = "";

    if(!existeDia){

        select.innerHTML += `
            <option value="D">
                Dia (07:00 - 19:00)
            </option>
        `;

    }

    if(!existeNoite){

        select.innerHTML += `
            <option value="N">
                Noite (19:00 - 07:00)
            </option>
        `;

    }

    if(select.options.length === 0){

        mostrarToast("Os dias selecionados já têm os dois turnos ocupados.");

        cancelarEvento();

        return false;

    }

    return true;

}

function abrirModalEvento(){

    if(!atualizarTurnosDisponiveis()){
    return;
    }

    fecharModalEventos();

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

        document.getElementById("turnoEvento").selectedIndex = 0;

        document.getElementById("observacoesEvento").value = "";

    }

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

function guardarEvento(){

    if(estado.modal.modo === "editar"){

        guardarEdicao();

        return;

    }

    guardarNovoEvento();

}

function guardarNovoEvento(){

    console.log("Calendário atual:", calendarioAtual);

    for (const dia of estado.diasSelecionados){

        const evento = {

            id: crypto.randomUUID(),

            tipo: document.getElementById("tipoEvento").value,

            turno: document.getElementById("turnoEvento").value,

            ano: calendarioAtual.ano,

            mes: calendarioAtual.mes,

            dia: dia,

            observacoes:
                document.getElementById("observacoesEvento").value.trim()

        };

        console.log("Vai gravar:", evento);

        const existe = EVENTOS.some(e =>
            e.ano === evento.ano &&
            e.mes === evento.mes &&
            e.dia === evento.dia &&
            e.turno === evento.turno
        );

if(existe){
    mostrarToast("Já existe um evento para este turno.");
    continue;
    }
        
        adicionarEvento(evento);

    }

    finalizarEdicao();

}

function guardarEdicao(){

    const evento = {

        id: estado.modal.evento.id,

        tipo: document.getElementById("tipoEvento").value,

        turno: document.getElementById("turnoEvento").value,

        ano: estado.modal.evento.ano,

        mes: estado.modal.evento.mes,

        dia: estado.modal.evento.dia,

        observacoes:
            document.getElementById("observacoesEvento").value.trim()

    };

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

function abrirModalEventos(){

    modalEventos.classList.remove("oculto");

}

function fecharModalEventos(){

    modalEventos.classList.add("oculto");

}

function atualizarListaEventos(eventos){

    listaEventosDia.innerHTML = "";

    if(eventos.length === 0){

        listaEventosDia.innerHTML = `
            <p>Não existem eventos neste dia.</p>
        `;

        return;
    }

    for(const evento of eventos){

        const turno = Object.values(TURNOS).find(

        t => t.id === evento.turno

        );

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

        abrirModalEliminar(evento);

        });

    });

}

function editarEventoModal(event){

    const id = event.currentTarget.dataset.id;

    const evento = EVENTOS.find(e => e.id === id);

    if(!evento){

        return;

    }

    // Guarda o estado do modal
    estado.modal.modo = "editar";
    estado.modal.evento = evento;

    // Dia do evento
    estado.diasSelecionados = [evento.dia];

    // Fecha o modal da lista de eventos
    fecharModalEventos();

    // Abre o modal de edição
    abrirModalEvento();

}

function confirmarEliminar(){

    if(!estado.modalEliminar.evento){

        return;

    }

    eliminarEvento(

        estado.modalEliminar.evento.id

    );

    fecharModalEliminar();

    fecharModalEventos();

    estado.modalEliminar.evento = null;

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

    document
        .getElementById("modalTiposEvento")
        .classList.remove("oculto");

}

function fecharTiposEvento(){

    document
        .getElementById("modalTiposEvento")
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

    carregarTiposEvento();

    preencherTiposEvento();

    atualizarInterface();

    mostrarCalendario();

    atualizarLegendaEventos();

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

    document
        .getElementById("modalEditarTipoEvento")
        .classList.remove("oculto");

}



