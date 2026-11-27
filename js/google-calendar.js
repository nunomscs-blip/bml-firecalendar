
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

