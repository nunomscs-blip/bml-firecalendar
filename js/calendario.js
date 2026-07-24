// =======================================================
// CALENDÁRIO ATUAL
// Define o mês e o ano apresentados no calendário.
// =======================================================

const calendarioAtual = {
    mes: 8,
    ano: 2026
};

const estado = {

    modo: MODOS.VISUALIZACAO,

    diasSelecionados: []

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
// =======================================================

function mostrarCalendario(){

    const calendario = document.getElementById("calendario");

    calendario.innerHTML = `

        <section id="tituloCalendario">

            <button id="btnAnterior">◀</button>

            <h2>${obterNomeMes(calendarioAtual.mes)} ${calendarioAtual.ano}</h2>

            <button id="btnSeguinte">▶</button>

        </section>

        <section id="diasSemana">

            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
            <div>Dom</div>

        </section>

        <section id="diasMes"></section>

    `;

    const diasMes = document.getElementById("diasMes");

    const data = new Date(

        calendarioAtual.ano,
        calendarioAtual.mes - 1,
        1

    );

    const diasNoMes = new Date(

        calendarioAtual.ano,
        calendarioAtual.mes,
        0

    ).getDate();

    let posicao = data.getDay() - 1;

    if(posicao < 0){

        posicao = 6;

    }

    // Espaços vazios antes do dia 1

    for(let i = 0; i < posicao; i++){

        diasMes.innerHTML += `
            <div class="dia vazio"></div>
        `;

    }

    // Dias do mês

    for(let i = 1; i <= diasNoMes; i++){

    let classe = "dia";

    const hoje = new Date();

    if(
    i === hoje.getDate() &&
    calendarioAtual.mes === (hoje.getMonth() + 1) &&
    calendarioAtual.ano === hoje.getFullYear()
    ){

    classe += " hoje";

    }

    if(estado.diasSelecionados.includes(i)){

    classe += " selecionado";

    }

    diasMes.innerHTML += `
        <div class="${classe}" data-dia="${i}">
            ${i}
        </div>
    `;

    }

        inicializarCalendario();

}


// =======================================================
// INICIALIZA O CALENDÁRIO
// =======================================================

function inicializarCalendario(){

    // Botão anterior

    const btnAnterior = document.getElementById("btnAnterior");

    if(btnAnterior){

        btnAnterior.addEventListener("click", mesAnterior);

    }

    // Botão seguinte

    const btnSeguinte = document.getElementById("btnSeguinte");

    if(btnSeguinte){

        btnSeguinte.addEventListener("click", mesSeguinte);

    }

    // Clique nos dias

    const dias = document.querySelectorAll(".dia");

    dias.forEach(function(dia){

        if(!dia.classList.contains("vazio")){

            dia.addEventListener("click", selecionarDia);

        }

    });

}


// =======================================================
// SELECIONA UM DIA
// =======================================================
function selecionarDia(event){

    if (estado.modo !== MODOS.SELECAO_DIAS){
    return;
    }

    const dia = Number(event.currentTarget.dataset.dia);

    const indice = estado.diasSelecionados.indexOf(dia);

    if (indice === -1){

        estado.diasSelecionados.push(dia);

    }else{

        estado.diasSelecionados.splice(indice, 1);

    }

    atualizarDiasSelecionados();

    atualizarBotaoFlutuante();

    mostrarCalendario();
    }



