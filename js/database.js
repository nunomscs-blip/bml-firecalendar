
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

/* ======================================================
   TIPOS DE EVENTO
====================================================== */

const CHAVE_TIPOS_EVENTO = "bmlfirecalendar_tipos";

function carregarTiposEvento(){

    const dados = localStorage.getItem(CHAVE_TIPOS_EVENTO);

    if(!dados){

        guardarTiposEvento();

        return;

    }

    const tiposGuardados = JSON.parse(dados);

    TIPOS_EVENTO.forEach(tipo => {

        const guardado = tiposGuardados.find(
            t => t.id === tipo.id
        );

        if(guardado){

            tipo.nome = guardado.nome;
            tipo.cor = guardado.cor;
            tipo.ativo = guardado.ativo;

        }

    });

}

function guardarTiposEvento(){

    localStorage.setItem(

        CHAVE_TIPOS_EVENTO,

        JSON.stringify(TIPOS_EVENTO)

    );

}