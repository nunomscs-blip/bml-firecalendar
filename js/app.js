mostrarCalendario();

const btnNovo = document.getElementById("btnNovo");

btnNovo.addEventListener("click", novoEvento);

function novoEvento(){

    alert("Novo Evento");

}

for(let i = 1; i <= 31; i++){

    diasMes.innerHTML += `
        <div class="dia">${i}</div>
    `;

}

console.log(obterNomeMes(8));