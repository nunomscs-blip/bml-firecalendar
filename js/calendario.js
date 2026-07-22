const calendarioAtual = {

    mes: 2,
    ano: 2026

};

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

function mostrarCalendario() {

    const calendario = document.getElementById("calendario");

    calendario.innerHTML = `
    
       <h2>${obterNomeMes(calendarioAtual.mes)} ${calendarioAtual.ano}</h2>
        <div id="diasSemana">

            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
            <div>Dom</div>

        </div>

        <div id="diasMes"></div>

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

    console.log(diasNoMes);

    console.log(data.getDay());

    let posicao = data.getDay() - 1;

    if (posicao < 0) {
    posicao = 6;
    }

    for (let i = 1; i <= 31; i++) {

    diasMes.innerHTML += `
        <div class="dia vazio"></div>
    `;

    }
   
    for(let i = 1; i <= 31; i++){

        diasMes.innerHTML += `
            <div class="dia">${i}</div>
        `;

    }

}

