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
        id: 1,
        nome: "SAÚDE",
        cor: "#1976d2",
        turnos: true
    }

    
];

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
