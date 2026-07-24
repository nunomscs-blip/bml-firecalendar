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

