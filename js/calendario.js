const calendarioAtual = {

    mes: 8,
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

    console.log(data.getDay());

    for(let i = 1; i <= 31; i++){

        diasMes.innerHTML += `
            <div class="dia">${i}</div>
        `;

    }

}

