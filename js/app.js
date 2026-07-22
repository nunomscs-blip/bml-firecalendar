// =======================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =======================================================

mostrarCalendario();


// =======================================================
// BOTÃO NOVO EVENTO
// =======================================================

const btnNovo = document.getElementById("btnNovo");

btnNovo.addEventListener("click", novoEvento);


// =======================================================
// FUNÇÃO: novoEvento()
// Executada quando o utilizador clica no botão "+".
// =======================================================

function novoEvento(){

    alert("Novo Evento");

}


// =======================================================
// TESTES
// Utilizado apenas durante o desenvolvimento.
// =======================================================

console.log(obterNomeMes(8));