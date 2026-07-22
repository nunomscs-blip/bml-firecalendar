// =======================================================
// CALENDÁRIO ATUAL
// Define o mês e o ano apresentados no calendário.
// =======================================================

const calendarioAtual = {

    mes: 8,
    ano: 2026

};


// =======================================================
// OBTÉM O NOME DO MÊS
// Recebe um número (1-12) e devolve o nome do mês.
// =======================================================

function obterNomeMes(mes){

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    return meses[mes - 1];

}


// =======================================================
// DESENHA O CALENDÁRIO
// Constrói todo o calendário do mês selecionado.
// =======================================================

function mostrarCalendario() {

    // ---------------------------------------------------
    // Obtém o contentor principal do calendário.
    // ---------------------------------------------------

    const calendario = document.getElementById("calendario");


    // ---------------------------------------------------
    // Cria o HTML base do calendário.
    // ---------------------------------------------------

    calendario.innerHTML = `

    <!-- =======================================================
         CABEÇALHO DO CALENDÁRIO
    ======================================================== -->

    <section id="tituloCalendario">

        <button id="btnAnterior">◀</button>

        <h2>${obterNomeMes(calendarioAtual.mes)} ${calendarioAtual.ano}</h2>

        <button id="btnSeguinte">▶</button>

    </section>

    <!-- =======================================================
         DIAS DA SEMANA
    ======================================================== -->

    <section id="diasSemana">

            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
            <div>Dom</div>

        </section>

    <!-- =======================================================
     GRELHA DOS DIAS
    ======================================================= -->

    <section id="diasMes"></section>

    `;


    // ---------------------------------------------------
    // Obtém a zona onde serão desenhados os dias.
    // ---------------------------------------------------

    const diasMes = document.getElementById("diasMes");


    // ---------------------------------------------------
    // Primeiro dia do mês.
    // Exemplo: 01/02/2026.
    // ---------------------------------------------------

    const data = new Date(

        calendarioAtual.ano,
        calendarioAtual.mes - 1,
        1

    );


    // ---------------------------------------------------
    // Número de dias do mês.
    // O JavaScript calcula automaticamente 28,29,30 ou 31.
    // ---------------------------------------------------

    const diasNoMes = new Date(

        calendarioAtual.ano,
        calendarioAtual.mes,
        0

    ).getDate();


    // ---------------------------------------------------
    // Descobre em que dia da semana começa o mês.
    // Domingo = 0
    // Segunda = 1
    // ...
    // Sábado = 6
    // ---------------------------------------------------

    let posicao = data.getDay() - 1;

    if (posicao < 0) {

        posicao = 6;

    }


    // ---------------------------------------------------
    // Desenha os espaços vazios antes do dia 1.
    // ---------------------------------------------------

    for (let i = 0; i < posicao; i++) {

        diasMes.innerHTML += `
            <div class="dia vazio"></div>
        `;

    }


    // ---------------------------------------------------
    // Desenha todos os dias do mês.
    // ---------------------------------------------------

    for (let i = 1; i <= diasNoMes; i++) {

        diasMes.innerHTML += `
            <div class="dia">${i}</div>
        `;

    }

    // ---------------------------------------------------
    // Liga os eventos do calendário.
    // ---------------------------------------------------

    inicializarCalendario();

}

// =======================================================
// INICIALIZA O CALENDÁRIO
// Liga todos os eventos do calendário.
// =======================================================

function inicializarCalendario(){

    // ---------------------------------------------------
    // Botão mês anterior.
    // ---------------------------------------------------

    const btnAnterior = document.getElementById("btnAnterior");

    if(btnAnterior){

        btnAnterior.addEventListener("click", mesAnterior);

    }

    // ---------------------------------------------------
    // Botão mês seguinte.
    // ---------------------------------------------------

    const btnSeguinte = document.getElementById("btnSeguinte");

    if(btnSeguinte){

        btnSeguinte.addEventListener("click", mesSeguinte);

    }

}

