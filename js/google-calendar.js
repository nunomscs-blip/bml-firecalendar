
/* ======================================================
   BML FIRECALENDAR
   INTEGRAÇÃO COM GOOGLE CALENDAR
====================================================== */

const GOOGLE_CALENDAR_CONFIG = {

    CLIENT_ID:
        "491139030180-7r1o8kt9j2e2494ankahbjnjpsg4pm3t.apps.googleusercontent.com",

    SCOPE:
        "https://www.googleapis.com/auth/calendar.events.owned",

    CALENDARIO:
        "primary",

    TIMEZONE:
        "Europe/Lisbon"

};


// ======================================================
// ESTADO DA AUTENTICAÇÃO
// ======================================================

let tokenGoogleCalendar = null;

let tokenGoogleCalendarExpira = 0;


// ======================================================
// SOLICITAR TOKEN DE ACESSO
// ======================================================

function solicitarTokenGoogleCalendar(prompt = ""){

    return new Promise((resolve, reject) => {

        if(
            !window.google ||
            !google.accounts ||
            !google.accounts.oauth2
        ){

            reject(
                new Error(
                    "A biblioteca Google Identity Services não está carregada."
                )
            );

            return;

        }

        const cliente = google.accounts.oauth2.initTokenClient({

            client_id: GOOGLE_CALENDAR_CONFIG.CLIENT_ID,

            scope: GOOGLE_CALENDAR_CONFIG.SCOPE,

            callback: resposta => {

                if(resposta.error){

                    reject(
                        new Error(resposta.error)
                    );

                    return;

                }

                if(!resposta.access_token){

                    reject(
                        new Error(
                            "A Google não devolveu um token de acesso."
                        )
                    );

                    return;

                }

                tokenGoogleCalendar =
                    resposta.access_token;

                const validade =
                    Number(resposta.expires_in) || 3600;

                tokenGoogleCalendarExpira =
                    Date.now() + (validade - 60) * 1000;

                resolve(tokenGoogleCalendar);

            },

            error_callback: erro => {

                reject(
                    new Error(
                        erro.message || "Erro na autenticação Google."
                    )
                );

            }

        });

        cliente.requestAccessToken({

            prompt: prompt

        });

    });

}


// ======================================================
// OBTER TOKEN VÁLIDO
// ======================================================

async function obterTokenGoogleCalendar(){

    if(
        tokenGoogleCalendar &&
        Date.now() < tokenGoogleCalendarExpira
    ){

        return tokenGoogleCalendar;

    }

    return await solicitarTokenGoogleCalendar("");

}


// ======================================================
// TESTAR ACESSO AO GOOGLE CALENDAR
// ======================================================

async function verificarAcessoGoogleCalendar(token){

    const resposta = await fetch(

        "https://www.googleapis.com/calendar/v3/" +
        "calendars/primary/events?maxResults=1",

        {

            method: "GET",

            headers: {

                "Authorization": `Bearer ${token}`,

                "Content-Type": "application/json"

            }

        }

    );

    const dados = await resposta.json();

    if(!resposta.ok){

        throw new Error(
            dados.error?.message ||
            "Não foi possível aceder ao Google Calendar."
        );

    }

    return dados;

}


/* ======================================================
   CRIAR EVENTOS NA GOOGLE CALENDAR
====================================================== */

function construirEventoGoogleCalendar(evento, teste = false){

    const dias = obterDiasEvento(evento);

    if(dias.length !== 1){
        throw new Error("O evento tem de corresponder a um único dia.");
    }

    const tipo = obterTipoEvento(evento.tipo);

    if(!tipo || !tipo.turnos){
        throw new Error("Tipo de serviço ou turnos não encontrados.");
    }

    const turno = Object.values(tipo.turnos).find(
        t => t.id === evento.turno
    );

    if(!turno){
        throw new Error("Turno não encontrado.");
    }

    const intervalo = obterIntervaloEvento(evento, dias[0]);

    if(!intervalo){
        throw new Error("Não foi possível calcular o horário.");
    }

    const inicio = new Date(intervalo.inicio);
    const fim = new Date(intervalo.fim);

    // Alarme às 10:00 do dia anterior
    const alarme = new Date(
        evento.ano,
        evento.mes - 1,
        dias[0] - 1,
        10, 0, 0, 0
    );

    const minutosAlarme = Math.round(
        (inicio.getTime() - alarme.getTime()) / 60000
    );

    if(minutosAlarme < 0 || minutosAlarme > 40320){
        throw new Error("Antecedência do alarme não permitida.");
    }

    const nomeServico = tipo.nome || evento.tipo;

    return {

        summary: teste
            ? `[TESTE BML] ${nomeServico} - ${turno.nome}`
            : `${nomeServico} - ${turno.nome}`,

        description:
            `Serviço: ${nomeServico}\n` +
            `Turno: ${turno.nome}\n` +
            `Horário: ${turno.inicio} às ${turno.fim}`,

        start: {
            dateTime: inicio.toISOString(),
            timeZone: GOOGLE_CALENDAR_CONFIG.TIMEZONE
        },

        end: {
            dateTime: fim.toISOString(),
            timeZone: GOOGLE_CALENDAR_CONFIG.TIMEZONE
        },

        reminders: {
            useDefault: false,
            overrides: [
                {
                    method: "popup",
                    minutes: minutosAlarme
                }
            ]
        },

        extendedProperties: {
            private: {
                bmlFireCalendar: "true",
                bmlEventId: String(evento.id),
                bmlTest: teste ? "true" : "false"
            }
        }

    };

}


// ======================================================
// INSERIR EVENTO NA GOOGLE CALENDAR
// ======================================================

async function inserirEventoGoogleCalendar(evento, teste = false){

    const token = await obterTokenGoogleCalendar();

    const dadosEvento = construirEventoGoogleCalendar(
        evento,
        teste
    );

    const resposta = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/" +
        encodeURIComponent(GOOGLE_CALENDAR_CONFIG.CALENDARIO) +
        "/events",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEvento)
        }
    );

    const dados = await resposta.json();

    if(!resposta.ok){
        throw new Error(
            dados.error?.message ||
            "Não foi possível criar o evento na Google Calendar."
        );
    }

    return dados;

}


// ======================================================
// CRIAR EVENTO DE TESTE
// Não altera os registos da BML
// ======================================================

async function criarEventoTesteGoogleCalendar(){

    if(window.bmlGoogleCalendarEventoTesteId){
        throw new Error("Já existe um evento de teste criado.");
    }

    const dataTeste = new Date();
    dataTeste.setDate(dataTeste.getDate() + 7);

    const eventoTeste = {
        id: `TESTE-${crypto.randomUUID()}`,
        tipo: "SAUDE",
        turno: "D",
        ano: dataTeste.getFullYear(),
        mes: dataTeste.getMonth() + 1,
        dia: dataTeste.getDate(),
        observacoes: "Teste de integração Google Calendar"
    };

    const resultado = await inserirEventoGoogleCalendar(
        eventoTeste,
        true
    );

    window.bmlGoogleCalendarEventoTesteId = resultado.id;

    console.log("Evento de teste criado:", resultado);
    console.log("Identificador Google:", resultado.id);
    console.log("Ligação ao evento:", resultado.htmlLink);

    console.log(
        "Alarme configurado:",
        new Date(
            eventoTeste.ano,
            eventoTeste.mes - 1,
            eventoTeste.dia - 1,
            10, 0
        )
    );

    return resultado;

}


// ======================================================
// ELIMINAR EVENTO DE TESTE
// ======================================================

async function eliminarEventoTesteGoogleCalendar(){

    const id = window.bmlGoogleCalendarEventoTesteId;

    if(!id){
        throw new Error("Não existe evento de teste para eliminar.");
    }

    const token = await obterTokenGoogleCalendar();

    const resposta = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/" +
        encodeURIComponent(GOOGLE_CALENDAR_CONFIG.CALENDARIO) +
        "/events/" +
        encodeURIComponent(id),
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if(!resposta.ok && resposta.status !== 204){
        const dados = await resposta.json();

        throw new Error(
            dados.error?.message ||
            "Não foi possível eliminar o evento de teste."
        );
    }

    window.bmlGoogleCalendarEventoTesteId = null;

    console.log("Evento de teste eliminado correctamente.");

}


// ======================================================
// LIGAR GOOGLE CALENDAR
// ======================================================

async function ligarGoogleCalendar(){

    const botao = document.getElementById(
        "btnLigarGoogleCalendar"
    );

    try{

        if(botao){

            botao.disabled = true;

            botao.textContent = "A ligar...";

        }

        // Pedir autorização à conta Google
        const token = await solicitarTokenGoogleCalendar(
            "consent"
        );

        // Confirmar acesso ao calendário principal
        const dados = await verificarAcessoGoogleCalendar(
            token
        );

        console.log(
            "Google Calendar ligado correctamente."
        );

        console.log(
            "Calendário principal:",
            dados.summary
        );

        console.log(
            "Eventos consultados:",
            dados.items?.length ?? 0
        );

        window.bmlGoogleCalendarLigado = true;

        if(botao){

            botao.textContent = "Google Calendar ligado";

        }

        mostrarToast(
            "Google Calendar ligado com sucesso."
        );

        return true;

    }catch(erro){

        console.error(
            "Erro na ligação ao Google Calendar:",
            erro
        );

        window.bmlGoogleCalendarLigado = false;

        if(botao){

            botao.textContent = "Ligar Google Calendar";

        }

        alert(
            "Não foi possível ligar ao Google Calendar.\n\n" +
            erro.message
        );

        return false;

    }finally{

        if(botao){

            botao.disabled = false;

        }

    }

}


// ======================================================
// INICIALIZAR BOTÃO DE LIGAÇÃO
// ======================================================

function inicializarBotaoGoogleCalendar(){

    const botao = document.getElementById(
        "btnLigarGoogleCalendar"
    );

    if(!botao){

        return;

    }

    botao.addEventListener(
        "click",
        ligarGoogleCalendar
    );

}


if(document.readyState === "loading"){

    document.addEventListener(
        "DOMContentLoaded",
        inicializarBotaoGoogleCalendar
    );

}else{

    inicializarBotaoGoogleCalendar();

}

