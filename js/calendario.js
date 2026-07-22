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
    
        <h2>Agosto 2026</h2>

        <div id="diasSemana">

            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
            <div>Dom</div>

        </div>

    `;

}

