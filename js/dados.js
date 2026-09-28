
//Declaro las variables 

let nombreJugador = "";
let totalJugador = 0;
let totalMaquina = 0;


//Elementos del inicio

const inputNombre = document.querySelector("#nombreJugador");
const btnComenzar = document.querySelector("#btnComenzar");


//Elementos de la zona de juego

const tituloJugador = document.querySelector("#tituloJugador");
const dadoJugador1 = document.querySelector("#dadoJugador1");
const dadoJugador2 = document.querySelector("#dadoJugador2");
const dadoMaquina1 = document.querySelector("#dadoMaquina1");
const dadoMaquina2 = document.querySelector("#dadoMaquina2");
const spanTotalJugador = document.querySelector("#totalJugador");
const spanTotalMaquina = document.querySelector("#totalMaquina");


//Botones de acciones y mensaje

const btnTirar = document.querySelector("#btnTirar");
const btnPlantarse = document.querySelector("#btnPlantarse");
const btnNuevaPartida = document.querySelector("#btnNuevaPartida");
const mensaje = document.querySelector("#mensaje");


//Función que "tira" un dado: devuelve un número entero del 1 al 6

function tirarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

//Función que decide quién ganó: devuelve "jugador", "maquina" o "empate"

function decidirGanador() {

    //Si la máquina se pasó de 21, gana el jugador (el jugador nunca llega acá pasado de 21)
    if (totalMaquina > 21) {
        return "jugador";
    }

    //Si nadie se pasó, gana quien tenga el total más alto
    if (totalJugador > totalMaquina) {
        return "jugador";
    } else if (totalJugador < totalMaquina) {
        return "maquina";
    } else {
        return "empate";
    }
}

//Evento: click en "Comenzar partida"

btnComenzar.addEventListener("click", function () {

    nombreJugador = inputNombre.value;

    //Validación: el nombre no puede estar vacío
    if (nombreJugador === "") {
        mensaje.innerText = "Tenés que ingresar tu nombre para comenzar.";
        return;
    }

    //Mostramos el nombre del jugador como título de su zona
    tituloJugador.innerText = nombreJugador;

    //Deshabilitamos el inicio, ya no se puede cambiar el nombre
    inputNombre.disabled = true;
    btnComenzar.disabled = true;

    //Habilitamos las acciones del turno del jugador
    btnTirar.disabled = false;
    btnPlantarse.disabled = false;

    mensaje.innerText = "Tu turno, " + nombreJugador + ". ¿Tirás los dados?";


});

//------------------------------------------------------------------------------------------------------------------------------

//Evento: click en "Tirar dados"

btnTirar.addEventListener("click", function () {

    //Tiramos los 2 dados
    let dado1 = tirarDado();
    let dado2 = tirarDado();

    //Mostramos las imágenes que corresponden a cada resultado
    dadoJugador1.src = "../img/dados/dado-" + dado1 + ".png";
    dadoJugador1.alt = "Primer dado del jugador: " + dado1;
    dadoJugador2.src = "../img/dados/dado-" + dado2 + ".png";
    dadoJugador2.alt = "Segundo dado del jugador: " + dado2;

    //Acumulador: sumamos la tirada al total del jugador
    totalJugador = totalJugador + dado1 + dado2;
    spanTotalJugador.innerText = totalJugador;

    //Si se pasó de 21, pierde
    if (totalJugador > 21) {
        mensaje.innerText = "Sacaste " + (dado1 + dado2) + " y llegaste a " + totalJugador + ". ¡Te pasaste de 21, perdiste!";
        btnTirar.disabled = true;
        btnPlantarse.disabled = true;
        btnNuevaPartida.disabled = false;
        return;
    }

    //Si llegó justo a 21, no tiene sentido seguir tirando
    if (totalJugador === 21) {
        mensaje.innerText = "¡Llegaste a 21 justo! Apretá \"Plantarme\" para que juegue la máquina.";
        btnTirar.disabled = true;
        return;
    }

    //Si sigue en juego, le informamos cómo va
    mensaje.innerText = "Sacaste " + (dado1 + dado2) + ". Tu total es " + totalJugador + ". ¿Tirás de nuevo o te plantás?";
});

//-------------------------------------------------------------------------------------------------------------------------------

//Evento: click en "Plantarme"

btnPlantarse.addEventListener("click", function () {

    //Validación: no se puede plantar sin haber tirado al menos una vez
    if (totalJugador === 0) {
        mensaje.innerText = "Tenés que tirar los dados al menos una vez antes de plantarte.";
        return;
    }

    //El turno del jugador terminó
    btnTirar.disabled = true;
    btnPlantarse.disabled = true;

    //Turno de la máquina: tira hasta llegar a 17 o más
    let tiradas = 0;
    let dado1;
    let dado2;

    while (totalMaquina < 17) {
        dado1 = tirarDado();
        dado2 = tirarDado();
        totalMaquina = totalMaquina + dado1 + dado2;
        tiradas = tiradas + 1;
    }

    //Mostramos los dados de la última tirada de la máquina
    dadoMaquina1.src = "../img/dados/dado-" + dado1 + ".png";
    dadoMaquina1.alt = "Primer dado de la máquina: " + dado1;
    dadoMaquina2.src = "../img/dados/dado-" + dado2 + ".png";
    dadoMaquina2.alt = "Segundo dado de la máquina: " + dado2;
    spanTotalMaquina.innerText = totalMaquina;

    //Decidimos quién ganó y armamos el mensaje final
    let ganador = decidirGanador();
    let resumen = "La máquina tiró " + tiradas + " vez/veces y se quedó con " + totalMaquina + ". Vos tenés " + totalJugador + ". ";

    if (ganador === "jugador") {
        mensaje.innerText = resumen + "¡Ganaste, " + nombreJugador + "!";
    } else if (ganador === "maquina") {
        mensaje.innerText = resumen + "Ganó la máquina. ¡Suerte la próxima!";
    } else {
        mensaje.innerText = resumen + "¡Empate!";
    }

    btnNuevaPartida.disabled = false;
});

//-------------------------------------------------------------------------------------------------------------------------------------------

//Evento: click en "Nueva partida"

btnNuevaPartida.addEventListener("click", function () {

    //Reiniciamos las variables del juego
    totalJugador = 0;
    totalMaquina = 0;

    //Volvemos los dados a su imagen inicial
    dadoJugador1.src = "../img/dados/dado-0.png";
    dadoJugador1.alt = "Primer dado del jugador, sin tirar";
    dadoJugador2.src = "../img/dados/dado-0.png";
    dadoJugador2.alt = "Segundo dado del jugador, sin tirar";
    dadoMaquina1.src = "../img/dados/dado-0.png";
    dadoMaquina1.alt = "Primer dado de la máquina, sin tirar";
    dadoMaquina2.src = "../img/dados/dado-0.png";
    dadoMaquina2.alt = "Segundo dado de la máquina, sin tirar";

    //Reiniciamos los totales y el título en pantalla
    spanTotalJugador.innerText = 0;
    spanTotalMaquina.innerText = 0;
    tituloJugador.innerText = "Jugador";

    //Habilitamos de nuevo el inicio y deshabilitamos lo demás
    inputNombre.value = "";
    inputNombre.disabled = false;
    btnComenzar.disabled = false;
    btnTirar.disabled = true;
    btnPlantarse.disabled = true;
    btnNuevaPartida.disabled = true;

    mensaje.innerText = "Ingresá tu nombre para comenzar.";
});

//--------------------------------------------------------------------------------------------------------------------------------------------------



