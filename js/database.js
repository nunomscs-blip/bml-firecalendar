
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


function fundirTipoEvento(tipoBase, tipoGuardado){

    const tipoAtualizado = {

        ...tipoBase,

        ...tipoGuardado

    };

    // Recuperar os turnos sem perder propriedades
    tipoAtualizado.turnos = {};

    const turnosBase = tipoBase.turnos || {};
    const turnosGuardados = tipoGuardado.turnos || {};

    for(const chave of Object.keys(turnosBase)){

        tipoAtualizado.turnos[chave] = {

            ...turnosBase[chave],

            ...(turnosGuardados[chave] || {})

        };

    }

    // Recuperar sobreposições
    tipoAtualizado.sobreposicoes =
        Array.isArray(tipoGuardado.sobreposicoes)
        ? tipoGuardado.sobreposicoes
        : (tipoBase.sobreposicoes || []);

    // Recuperar campos adicionais
    tipoAtualizado.campos =
        Array.isArray(tipoGuardado.campos)
        ? tipoGuardado.campos
        : (tipoBase.campos || []);

    return tipoAtualizado;

}



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

            const tipoAtualizado = fundirTipoEvento(
                tipo,
                guardado
            );

            Object.assign(tipo, tipoAtualizado);

        }

    });

    guardarTiposEvento();

}

function guardarTiposEvento(){

    localStorage.setItem(

        CHAVE_TIPOS_EVENTO,

        JSON.stringify(TIPOS_EVENTO)

    );

}

/* ======================================================
   BACKUP / RESTAURO
====================================================== */

const VERSAO_BACKUP = "1.0";


function criarBackup() {

    const backup = {

        aplicacao: "BML FireCalendar",

        versaoBackup: VERSAO_BACKUP,

        dataBackup: new Date().toISOString(),

        eventos: EVENTOS,

        tiposEvento: TIPOS_EVENTO

    };


    const conteudo = JSON.stringify(

        backup,

        null,

        2

    );


    const blob = new Blob(

        [conteudo],

        { type: "application/json" }

    );


    const url = URL.createObjectURL(blob);


    const link = document.createElement("a");

    link.href = url;


    const data = new Date();

    const nomeData =

        data.getFullYear() +

        "-" +

        String(data.getMonth() + 1).padStart(2, "0") +

        "-" +

        String(data.getDate()).padStart(2, "0");


    link.download =

        "BML-FireCalendar-Backup-" +

        nomeData +

        ".json";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


function selecionarBackup() {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = ".json,application/json";


    input.addEventListener(

        "change",

        function () {

            const ficheiro = input.files[0];

            if (!ficheiro) {

                return;

            }

            restaurarBackup(ficheiro);

        }

    );


    input.click();

}


function restaurarBackup(ficheiro) {

    const leitor = new FileReader();


    leitor.onload = function (evento) {

        try {

            const backup = JSON.parse(

                evento.target.result

            );


            /* ------------------------------------------
               VALIDAR BACKUP
            ------------------------------------------ */

            if (!backup) {

                throw new Error(

                    "Ficheiro inválido."

                );

            }


            if (backup.aplicacao !== "BML FireCalendar") {

                throw new Error(

                    "Este ficheiro não pertence ao BML FireCalendar."

                );

            }


            if (!Array.isArray(backup.eventos)) {

                throw new Error(

                    "O backup não contém os eventos correctamente."

                );

            }


            if (!Array.isArray(backup.tiposEvento)) {

                throw new Error(

                    "O backup não contém os tipos de evento correctamente."

                );

            }


            /* ------------------------------------------
               CONFIRMAÇÃO
            ------------------------------------------ */

            const confirmar = confirm(

                "ATENÇÃO\n\n" +

                "O restauro irá substituir os dados actuais " +

                "pelos dados existentes neste backup.\n\n" +

                "Eventos no backup: " +

                backup.eventos.length +

                "\n\n" +

                "Pretendes continuar?"

            );


            if (!confirmar) {

                return;

            }


            /* ------------------------------------------
               RESTAURAR EVENTOS
            ------------------------------------------ */

            EVENTOS = backup.eventos;


            localStorage.setItem(

                DATABASE.EVENTOS,

                JSON.stringify(EVENTOS)

            );


            /* ------------------------------------------
               RESTAURAR TIPOS DE EVENTO
            ------------------------------------------ */

            

            TIPOS_EVENTO.forEach(tipo => {

                const tipoBackup = backup.tiposEvento.find(
                    t => t.id === tipo.id
                );

                if(tipoBackup){

                    const tipoAtualizado = fundirTipoEvento(
                        tipo,
                        tipoBackup
                    );

                    Object.assign(tipo, tipoAtualizado);

                }

            });




            guardarTiposEvento();


            /* ------------------------------------------
               ACTUALIZAR INTERFACE
            ------------------------------------------ */

            atualizarInterface();

            mostrarCalendario();


            alert(

                "Backup restaurado com sucesso.\n\n" +

                "Eventos restaurados: " +

                EVENTOS.length

            );


        }

        catch (erro) {

            console.error(

                "Erro ao restaurar backup:",

                erro

            );


            alert(

                "Não foi possível restaurar o backup.\n\n" +

                erro.message

            );

        }

    };


    leitor.readAsText(ficheiro);

}