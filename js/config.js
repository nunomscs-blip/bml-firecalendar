/* ======================================================
   CONFIGURAÇÃO DA APLICAÇÃO
====================================================== */

const APP = {

    nome: "BML FireCalendar",

    versao: "v0.2.0",

    ambiente: "ns_production"

};

// =======================================================
// TIPOS DE EVENTO
// =======================================================

const TIPOS_EVENTO = [

    {
        id: "SAUDE",
        nome: "Saúde",
        icone: "🚑",
        cor: "#1976D2",
        turnos: true
    },

    {
        id: "ECIN",
        nome: "ECIN",
        icone: "🚒",
        cor: "#D32F2F",
        turnos: true
    },

    {
        id: "SBA",
        nome: "SBA",
        icone: "🚑",
        cor: "#FBC02D",
        turnos: true
    },

    {
        id: "SERVICO",
        nome: "Serviço",
        icone: "🏢",
        cor: "#757575",
        turnos: true
    },

    {
        id: "FORMACAO",
        nome: "Formação",
        icone: "🎓",
        cor: "#795548",
        turnos: true
    },

    {
        id: "EXTRA1",
        nome: "Extra 1",
        icone: "📌",
        cor: "#8E24AA",
        turnos: true
    },

    {
        id: "EXTRA2",
        nome: "Extra 2",
        icone: "📌",
        cor: "#009688",
        turnos: true
    }

];

/* ======================================================
   OBTÉM UM TIPO DE EVENTO
====================================================== */

function obterTipoEvento(id){

    return TIPOS_EVENTO.find(tipo => tipo.id === id);

}

// =======================================================
// BASE DE DADOS (TEMPORÁRIA)
// =======================================================

let EVENTOS = [];

// =======================================================
// TÍTULOS DA APLICAÇÃO
// =======================================================

const TITULOS = {

    visualizacao : APP.nome,

    selecaoDias : "Escolher dias",

    novoEvento : "Novo Evento",

    editarEvento : "Editar Evento",

    configuracao : "Configuração"

};

// =======================================================
// MODOS DA APLICAÇÃO
// =======================================================

const MODOS = {

    VISUALIZACAO : "visualizacao",

    SELECAO_DIAS : "selecaoDias",

    NOVO_EVENTO : "novoEvento",

    EDITAR_EVENTO : "editarEvento",

    CONFIGURACAO : "configuracao"

};

// =======================================================
// TURNOS
// =======================================================

const TURNOS = {

    DIA: {

        id: "D",

        nome: "Dia",

        inicio: "07:00",

        fim: "19:00"

    },

    NOITE: {

        id: "N",

        nome: "Noite",

        inicio: "19:00",

        fim: "07:00"

    }

};

/* ======================================================
   ÍCONES DOS EVENTOS
====================================================== */

