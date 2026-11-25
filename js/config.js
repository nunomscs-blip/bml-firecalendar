
/* ======================================================
   CONFIGURAÇÃO DA APLICAÇÃO
====================================================== */

const APP = {

    nome: "BML FireCalendar",

    versao: "v0.3.0",

    ambiente: "ns_production"

};


// =======================================================
// CONFIGURAÇÃO DOS TURNOS PADRÃO
// =======================================================

function criarTurnosPadrao(){

    return {

        turno1: {
            id: "D",
            nome: "Dia",
            inicio: "07:00",
            fim: "19:00"
        },

        turno2: {
            id: "N",
            nome: "Noite",
            inicio: "19:00",
            fim: "07:00"
        }

    };

}


// =======================================================
// TIPOS DE EVENTO
// =======================================================

const TIPOS_EVENTO = [

    // ---------------------------------------------------
    // SAÚDE
    // ---------------------------------------------------

    {
        id: "SAUDE",

        nome: "Saúde",

        icone: "🚑",

        cor: "#1976D2",

        ativo: true,

        usaTurnos: true,

        turnos: criarTurnosPadrao(),

        sobreposicoes: [],

        campos: [

            {
                id: "campo1",
                ativo: false,
                nome: "Campo 1"
            },

            {
                id: "campo2",
                ativo: false,
                nome: "Campo 2"
            }

        ]

    },


    // ---------------------------------------------------
    // ECINS
    // ---------------------------------------------------

    {
        id: "ECIN",

        nome: "ECINS",

        icone: "🚒",

        cor: "#D32F2F",

        ativo: true,

        usaTurnos: true,

        permiteEditarTurnos: false,

        turnos: criarTurnosPadrao(),

        sobreposicoes: [],

        campos: [

            {
                id: "campo1",
                ativo: false,
                nome: "Campo 1"
            },

            {
                id: "campo2",
                ativo: false,
                nome: "Campo 2"
            }

        ]

    },


    // ---------------------------------------------------
    // OPTEL
    // ---------------------------------------------------

    {
        id: "OPTEL",

        nome: "OPTEL",

        icone: "🏢",

        cor: "#F57C00",

        ativo: true,

        usaTurnos: true,

        permiteEditarTurnos: false,

        turnos: {

            turno1: {
                id: "D",
                nome: "Dia",
                inicio: "08:00",
                fim: "20:00"
            },

            turno2: {
                id: "N",
                nome: "Noite",
                inicio: "20:00",
                fim: "08:00"
            }

        },

        sobreposicoes: [

            {
                tipo: "ECIN",
                maxMinutos: 60,
                quando: ["inicio", "fim"]
            },

            {
                tipo: "SBA",
                maxMinutos: 60,
                quando: ["inicio", "fim"]
            },

            {
                tipo: "ELAC",
                maxMinutos: 60,
                quando: ["inicio", "fim"]
            },

            {
                tipo: "SAUDE",
                maxMinutos: 60,
                quando: ["inicio", "fim"]
            }

        ]

    },


    // ---------------------------------------------------
    // SBA
    // ---------------------------------------------------

    {
        id: "SBA",

        nome: "SBA",

        icone: "🚑",

        cor: "#FBC02D",

        ativo: true,

        usaTurnos: true,

        turnos: criarTurnosPadrao(),

        sobreposicoes: []

    },


    // ---------------------------------------------------
    // ELAC
    // ---------------------------------------------------

    {
        id: "ELAC",

        nome: "ELAC",

        icone: "🚒",

        cor: "#388E3C",

        ativo: true,

        usaTurnos: true,

        turnos: criarTurnosPadrao(),

        sobreposicoes: []

    },


    // ---------------------------------------------------
    // SERVIÇO
    // ---------------------------------------------------

    {
        id: "SERVICO",

        nome: "Serviço",

        icone: "🏢",

        cor: "#757575",

        ativo: true,

        usaTurnos: true,

        turnos: criarTurnosPadrao(),

        sobreposicoes: []

    },


    // ---------------------------------------------------
    // FORMAÇÃO
    // ---------------------------------------------------

    {
        id: "FORMACAO",

        nome: "Formação",

        icone: "🎓",

        cor: "#795548",

        ativo: true,

        usaTurnos: true,

        turnos: criarTurnosPadrao(),

        sobreposicoes: []

    },


    // ---------------------------------------------------
    // EXTRA 1
    // ---------------------------------------------------

    {
        id: "EXTRA1",

        nome: "Extra 1",

        icone: "📌",

        cor: "#8E24AA",

        ativo: false,

        usaTurnos: true,

        turnos: criarTurnosPadrao(),

        sobreposicoes: []

    },


    // ---------------------------------------------------
    // EXTRA 2
    // ---------------------------------------------------

    {
        id: "EXTRA2",

        nome: "Extra 2",

        icone: "📌",

        cor: "#009688",

        ativo: false,

        usaTurnos: true,

        turnos: criarTurnosPadrao(),

        sobreposicoes: []

    }

];


// =======================================================
// OBTÉM UM TIPO DE EVENTO
// =======================================================

function obterTipoEvento(id){

    return TIPOS_EVENTO.find(
        tipo => tipo.id === id
    );

}


// =======================================================
// BASE DE DADOS (TEMPORÁRIA)
// =======================================================

let EVENTOS = [];


// =======================================================
// TÍTULOS DA APLICAÇÃO
// =======================================================

const TITULOS = {

    visualizacao: APP.nome,

    selecaoDias: "Escolher dias",

    novoEvento: "Novo Evento",

    editarEvento: "Editar Evento",

    configuracao: "Configuração"

};


// =======================================================
// MODOS DA APLICAÇÃO
// =======================================================

const MODOS = {

    VISUALIZACAO: "visualizacao",

    SELECAO_DIAS: "selecaoDias",

    NOVO_EVENTO: "novoEvento",

    EDITAR_EVENTO: "editarEvento",

    CONFIGURACAO: "configuracao"

};


// =======================================================
// TURNOS GLOBAIS
// Mantidos para compatibilidade com o código actual.
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
