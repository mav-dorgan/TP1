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

// Texto que muestra el nivel de dificultad elegido
let nivelElegido = document.querySelector("#nivelElegido");

// Botón para reiniciar la partida
let btnReiniciar = document.querySelector("#reiniciar");

// El botón de reiniciar arranca deshabilitado: no tiene sentido reiniciar una partida que todavía no empezó
btnReiniciar.disabled = true;

// Guarda en qué estado está la partida (a definir cómo se usa más adelante: por ejemplo, 0 = sin empezar, 1 = en curso, 2 = terminada)
let estadoPartida = 0;

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
            mazo = generarMazo(6); // 6 pares = 12 cartas
            for (let i = 0; i < 12; i++) {
                tablero.innerHTML += `<img src="${mazo[i]}" alt="Imagen memotest" width="160" height="160">`;
            }
            break;

        case "medio":
            mazo = generarMazo(8); // 8 pares = 16 cartas
            for (let i = 0; i < 16; i++) {
                tablero.innerHTML += `<img src="${mazo[i]}" alt="Imagen memotest" width="160" height="160">`;
            }
            break;

        default:
            mazo = generarMazo(10); // 10 pares = 20 cartas
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

// ===== Genera un mazo de cartas mezcladas con pares =====

function generarMazo(cantPares) {
    let nuevoMazo = [];

    // Controla cuántas veces puede repetirse cada imagen (máximo 2, para formar un par)
    let par = 2;

    while (nuevoMazo.length < cantPares * 2) {
        // Elegimos una imagen al azar entre las disponibles para este nivel
        let urlImg = `/img/cartas/memotest-${Math.floor(Math.random() * cantPares + 1)}.jpg`;

        // Contamos cuántas veces ya está esa imagen en el mazo
        for (let i = 0; i < nuevoMazo.length; i++) {
            if (nuevoMazo[i] == urlImg) {
                par--;
            }
        }

        // Solo la agregamos si todavía no completó su par
        if (par != 0) {
            nuevoMazo.push(urlImg);
        }

        // Reseteamos el contador para la próxima vuelta del while
        par = 2;
    }
 
    return nuevoMazo;
}