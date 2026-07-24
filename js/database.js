
// =======================================================
// DATABASE
// =======================================================

const DATABASE = {

    EVENTOS: "bml_eventos"

};

// =======================================================
// BASE DE DADOS LOCAL
// =======================================================

function carregarEventos() {

    const dados = localStorage.getItem(DATABASE.EVENTOS);

    if (!dados) {

        EVENTOS = [];

        return;

    }

    EVENTOS = JSON.parse(dados);

}

function guardarEventos() {

    localStorage.setItem(

        DATABASE.EVENTOS,

        JSON.stringify(EVENTOS)

    );

}

function adicionarEvento(evento) {

    EVENTOS.push(evento);

    guardarEventos();

}

function testarBaseDados() {

    EVENTOS = [];

    EVENTOS.push({

        id: 1,

        tipo: "SAÚDE",

        data: "2026-08-01"

    });

    guardarEventos();

    carregarEventos();

    console.log(EVENTOS);

}

function editarEvento(id, evento) {

}

function eliminarEvento(id) {

}

