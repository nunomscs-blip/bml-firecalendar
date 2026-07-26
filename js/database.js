
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

    console.log("Evento recebido:", evento);

    EVENTOS.push(evento);

    console.log("EVENTOS:", EVENTOS);

    guardarEventos();

}

function editarEvento(id, eventoAtualizado){

    const indice = EVENTOS.findIndex(

        evento => evento.id === id

    );

    if(indice === -1){

        return;

    }

    EVENTOS[indice] = eventoAtualizado;

    guardarEventos();

}

function eliminarEvento(id){

    EVENTOS = EVENTOS.filter(

        evento => evento.id !== id

    );

    guardarEventos();

}

function limparBaseDados(){

    localStorage.removeItem(DATABASE.EVENTOS);

    EVENTOS = [];

    atualizarInterface();

    mostrarCalendario();

}

