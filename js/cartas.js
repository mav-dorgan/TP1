// ===== Genera un mazo de cartas mezcladas con pares =====

function generarMazo(cantPares, mazo) {
    let nuevoMazo = [];

    // Controla cuántas veces puede repetirse cada imagen (máximo 2, para formar un par)
    let par = 2;

    while (nuevoMazo.length < cantPares * 2) {
        // Elegimos una imagen al azar entre las disponibles para este nivel
        let cartaRandom = Math.floor(Math.random() * cantPares + 1);
        let urlImg = `/img/cartas/memotest-${cartaRandom}.jpg`;

        // Contamos cuántas veces ya está esa imagen en el mazo
        for (let i = 0; i < nuevoMazo.length; i++) {
            if (nuevoMazo[i] == urlImg) {
                par--;
            }
        }

        // Solo la agregamos si todavía no completó su par
        if (par != 0) {
            nuevoMazo.push(urlImg);
            let carta = {
                identificadorImg: cartaRandom,
                ruta: urlImg,
                estadoCarta: "oculta",
                estadoPareja: false
            };
            mazo.push(carta);
        }

        // Reseteamos el contador para la próxima vuelta del while
        par = 2;
    }
 
    return nuevoMazo;
}

//Funcion para saber si las dos cartas selecctionadas con iguales
function sonIguales(cartas, carta1, carta2, parejasEncontradas){
    let identificador1 = 0;
    let posicion1 = 0;
    let identificador2 = 0;
    let posicion2 = 0;
    for(let i=0; i<cartas.length; i++){
        if(carta1 == cartas[i].ruta){
            identificador1 = cartas[i].identificadorImg;
            posicion1 = i;
        }

        if(carta2 == cartas[i].ruta){
            identificador2 = cartas[i].identificadorImg;
            posicion2 = i;
        }
    }

    if(identificador1 == identificador2){
        cartas[posicion1].estadoCarta= "visible";
        cartas[posicion1].estadoPareja= true;

        cartas[posicion2].estadoCarta= "visible";
        cartas[posicion2].estadoPareja= true;

        parejasEncontradas++;
    }

    return parejasEncontradas;
}

// ===== CAPTURA DE ELEMENTOS =====

// Contenedor de los campos de configuración (nombre y nivel)
let campoConfiguracion = document.querySelector("#campoConfiguracion");

// Botón para comenzar la partida
let btnComenzar = document.querySelector("#memotestComenzar");

// Contenedor donde se insertan las cartas del tablero
let tablero = document.querySelector("#tableroCartas");

// Texto que muestra la cantidad de intentos
let intentos = document.querySelector("#intentos");

// Texto que muestra la cantidad de parejas encontradas
let parejasEncontradas = document.querySelector("#parejasEncontradas");

// El contador numérico
let cantidadParejasEncontradas = 0;

// Texto que muestra el nivel de dificultad elegido
let nivelElegido = document.querySelector("#nivelElegido");

// Botón para reiniciar la partida
let btnReiniciar = document.querySelector("#reiniciar");

// El botón de reiniciar arranca deshabilitado: no tiene sentido reiniciar una partida que todavía no empezó
btnReiniciar.disabled = true;

// Guarda en qué estado está la partida (a definir cómo se usa más adelante: por ejemplo, 0 = sin empezar, 1 = en curso, 2 = terminada)
let estadoPartida = 0;

//Array donde se guardara un objeto por carta con su información respectiva
let cartas = [];

// ===== Evento: comenzar partida =====

btnComenzar.addEventListener("click", function () {
    // Nombre ingresado por el jugador
    let nombre = document.querySelector("#memotestJugador").value;

    // Nivel de dificultad seleccionado
    let nivelDificultad = document.querySelector("#nivel").value;

    // Validamos que el usuario haya ingresado un nombre
    if (nombre === "") {
        alert("Ingresá el nombre del jugador.");
        return;
    }

    // Validamos que el usuario haya seleccionado un nivel de dificultad
    if (nivelDificultad === "vacio") {
        alert("Seleccioná un nivel de dificultad.");
        return;
    }

    // Limpiamos el tablero por si había una partida anterior
    tablero.innerHTML = "";

    // Armamos el mazo según el nivel y generamos las cartas en el tablero
    let mazo;
    switch (nivelDificultad) {
        case "facil":
            mazo = generarMazo(6, cartas); // 6 pares = 12 cartas
            for (let i = 0; i < 12; i++) {
                tablero.innerHTML += `<img src="${mazo[i]}" alt="Imagen memotest" width="160" height="160">`;
            }
            break;

        case "medio":
            mazo = generarMazo(8, cartas); // 8 pares = 16 cartas
            for (let i = 0; i < 16; i++) {
                tablero.innerHTML += `<img src="${mazo[i]}" alt="Imagen memotest" width="160" height="160">`;
            }
            break;

        default:
            mazo = generarMazo(10, cartas); // 10 pares = 20 cartas
            for (let i = 0; i < 20; i++) {
                tablero.innerHTML += `<img src="${mazo[i]}" alt="Imagen memotest" width="160" height="160">`;
            }
            break;
    }

    // Reiniciamos los contadores en pantalla
    intentos.innerText = "0";
    parejasEncontradas.innerText = "0";
    nivelElegido.innerText = `${nivelDificultad}`;

    // Bloqueamos la configuración y habilitamos el botón de reiniciar
    // (campoConfiguracion debe ser un <fieldset> para que .disabled funcione)
    campoConfiguracion.disabled = true;
    btnReiniciar.disabled = false;
});

// ===== Evento: Reiniciar partida =====

btnReiniciar.addEventListener("click", function () {

});