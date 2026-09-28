// Ruta de la imagen que se usa para el dorso de las cartas (boca abajo)
// La declaramos como constante porque nunca cambia durante la ejecución.
const rutaDorso = "../img/cartas/memotest-11.jpg";
 
// ===== Genera un mazo de cartas mezcladas con pares =====
// cantPares: cuántos pares distintos va a tener la partida (6, 8 o 10 según el nivel)
// mazo: array vacío que se recibe desde afuera y se llena "por referencia";
//       es decir, esta función no devuelve el mazo con objetos, lo va llenando
//       directamente sobre el array que le pasaron (por eso "cartas" queda
//       lleno después de llamar a esta función, sin necesidad de reasignarlo)
 
function generarMazo(cantPares, mazo) {
    // Array auxiliar que solo guarda las rutas de imagen (strings),
    // se usa únicamente para controlar que no se repita más de dos veces cada una
    let nuevoMazo = [];
 
    // Cuenta cuántas veces "falta" agregar la imagen elegida en esta vuelta.
    // Arranca en 2 porque cada imagen debe aparecer exactamente 2 veces (un par)
    let par = 2;
 
    // Se generan cartas hasta completar la cantidad total
    // (cantPares * 2, porque cada par son 2 cartas)
    while (nuevoMazo.length < cantPares * 2) {
        // Elegimos un número de imagen al azar, entre 1 y cantPares
        let cartaRandom = Math.floor(Math.random() * cantPares + 1);
        let urlImg = `../img/cartas/memotest-${cartaRandom}.jpg`;
 
        // Recorremos lo que ya se agregó al mazo para contar
        // cuántas veces ya está esta misma imagen
        for (let i = 0; i < nuevoMazo.length; i++) {
            if (nuevoMazo[i] == urlImg) {
                par--; // cada vez que la encontramos, resta una "vacante" disponible
            }
        }
 
        // Si "par" sigue siendo distinto de 0, todavía hay lugar para esta imagen
        // (si ya apareció 2 veces, "par" llegaría a 0 y no se vuelve a agregar)
        if (par != 0) {
            nuevoMazo.push(urlImg);
 
            // Además de la ruta, armamos un objeto con toda la info que
            // vamos a necesitar más adelante para jugar: identificador para
            // comparar, ruta de la imagen, y si la carta ya fue encontrada
            let carta = {
                identificadorImg: cartaRandom, // número que identifica la imagen (para comparar pares)
                ruta: urlImg,                  // ruta de la imagen, para mostrarla al voltear la carta
                estadoPareja: false            // true cuando ya forma parte de una pareja encontrada
            };
 
            // Guardamos el objeto en el array que recibimos por parámetro (mazo/cartas)
            mazo.push(carta);
        }
 
        // Reseteamos el contador para la próxima vuelta del while
        par = 2;
    }
 
    //generarMazo se llama para llenar el array "cartas", no hace falta que la función regrese algún dato
}
 
// ===== Crea el tablero en el HTML a partir del array de objetos "cartas" =====
// Recibe el array de objetos ya generado por generarMazo y crea una <img>
// por cada carta, en el mismo orden en que están guardadas en "cartas".
// Cada <img> creada se asocia a su posición dentro del array "cartas" (mediante
// la propiedad personalizada "posicion"), así el evento de click sabe exactamente
// a qué objeto del array corresponde, sin tener que buscarla por su src.
function crearTablero(cartasDelMazo) {
    // Reiniciamos el array de referencias a las <img>, para que quede
    // sincronizado con el nuevo tablero que estamos por crear
    imagenesTablero = [];
 
    for (let i = 0; i < cartasDelMazo.length; i++) {
        // Creamos el elemento <img> por código en vez de armarlo con innerHTML,
        // porque necesitamos guardarle un addEventListener de click a cada una
        let img = document.createElement("img");
        img.src = rutaDorso;
        img.alt = "Carta boca abajo";
        img.width = 160;
        img.height = 160;
 
        // Guardamos la posición como una propiedad extra del elemento del DOM.
        // posicion no es un atributo HTML real (no existe <img posicion="..."> en el estándar).
        // Pero como en JavaScript un elemento del DOM es, en el fondo, un objeto común, puedo agregarle cualquier propiedad nueva que quiera
        
        // Esto permite que, cuando el usuario clickee esta <img> puntual,
        // sepamos inmediatamente qué índice del array "cartas" le corresponde
        img.posicion = i;
 
        // Asociamos la función que maneja el click (definida más abajo)
        img.addEventListener("click", manejarClickCarta);
 
        //NOTA: No le paso manejarClickCarta() (con paréntesis), sino manejarClickCarta (sin paréntesis, sin ejecutarla).
        //Esto es porque le estoy pasando la función en sí, para que el navegador la ejecute él mismo en el momento del click.
        //Si pusiera los paréntesis, JavaScript ejecutaría la función inmediatamente al armar el tablero, en vez de esperar al click.
 
        // La insertamos en el tablero y la guardamos también en nuestro
        // array de referencias, para poder modificarla después (ej. al ocultarla)
        tablero.appendChild(img);
        imagenesTablero.push(img);
    }
}
 
// ===== Maneja el click sobre una carta del tablero =====
function manejarClickCarta(evento) {
    // evento.currentTarget es la <img> específica que fue clickeada
    let img = evento.currentTarget;
 
    // Recuperamos la posición que le habíamos asignado en crearTablero,
    // y con eso ubicamos el objeto carta correspondiente en el array "cartas"
    let posicion = img.posicion;
    let carta = cartas[posicion];
 
    // --- Validaciones: casos en los que el click NO debe hacer nada ---
 
    // Mientras se están mostrando dos cartas que no coincidieron (esperando
    // el setTimeout que las vuelve a ocultar), no se puede seleccionar nada más.
    // Este bloqueo también impide seleccionar una tercera carta
    if (bloqueoSeleccion) {
        return;
    }
 
    // Si la carta ya forma parte de una pareja encontrada, no tiene sentido
    // volver a clickearla (ya quedó resuelta)
    if (carta.estadoPareja) {
        return;
    }
 
    // Si esta misma carta ya está entre las seleccionadas (el usuario le hizo
    // doble click), evitamos contarla dos veces
    let yaSeleccionada = false;
 
    for (let i = 0; i < seleccionadas.length; i++) {
        if (seleccionadas[i] === posicion) {
            yaSeleccionada = true;
        }
    }
 
    if (yaSeleccionada) {
        return;
    }
 
    // --- A partir de acá, el click es válido: mostramos la carta ---
 
    // Cambiamos la imagen mostrada en pantalla (del dorso a la imagen real)
    // y el texto alternativo
    img.src = carta.ruta;
    img.alt = "Carta descubierta";
 
    // Agregamos esta posición a la lista de seleccionadas
    seleccionadas.push(posicion);
 
    // Si con esta carta ya completamos las 2 seleccionadas, comparamos
    if (seleccionadas.length === 2) {
        // Cada par de cartas evaluadas cuenta como un intento, se haya
        // acertado o no
        cantidadIntentos++;
        intentos.innerText = cantidadIntentos;
 
        // Guardamos las dos posiciones en variables aparte, para no tener
        // que estar escribiendo "seleccionadas[0]" y "seleccionadas[1]" todo el tiempo
        let posicion1 = seleccionadas[0];
        let posicion2 = seleccionadas[1];
 
        // Comparamos el identificador de imagen (no la posición ni la ruta,
        // porque dos cartas distintas pueden compartir la misma ruta si son pareja)
        if (cartas[posicion1].identificadorImg === cartas[posicion2].identificadorImg) {
            // ----- Coinciden: es una pareja -----
 
            // Marcamos ambas cartas como encontradas, para que las próximas
            // validaciones del click las ignoren
            cartas[posicion1].estadoPareja = true;
            cartas[posicion2].estadoPareja = true;
 
            // Les agregamos la clase "encontrada" para que el CSS las muestre distinto
            imagenesTablero[posicion1].classList.add("encontrada");
            imagenesTablero[posicion2].classList.add("encontrada");
 
            // Actualizamos el contador de parejas en pantalla
            cantidadParejasEncontradas++;
            parejasEncontradas.innerText = cantidadParejasEncontradas;
 
            // Vaciamos la selección: el jugador ya puede elegir las próximas 2 cartas
            seleccionadas = [];
 
            // Revisamos si con esta pareja se completó el juego
            comprobarFinDePartida();
        } else {
            // ----- No coinciden -----
 
            // Bloqueamos la selección para que el jugador no pueda seguir
            // clickeando mientras se muestran estas dos cartas "erradas"
            bloqueoSeleccion = true;
 
            // Esperamos un tiempo (para que el jugador llegue a memorizarlas)
            // y recién después las volvemos a ocultar
            temporizadorOcultar = setTimeout(function () {
                // Volvemos a mostrar el dorso en las dos <img> correspondientes
                imagenesTablero[posicion1].src = rutaDorso;
                imagenesTablero[posicion2].src = rutaDorso;
 
                // El texto alternativo también vuelve a describir una carta boca abajo
                imagenesTablero[posicion1].alt = "Carta boca abajo";
                imagenesTablero[posicion2].alt = "Carta boca abajo";
 
                // Liberamos la selección y el bloqueo para permitir seguir jugando
                seleccionadas = [];
                bloqueoSeleccion = false;
            }, 3000); // 3 segundos 
        }
    }
}
 
// ===== Comprueba si el jugador encontró todas las parejas =====
function comprobarFinDePartida() {
    // El total de parejas es la mitad de la cantidad de cartas en juego
    if (cantidadParejasEncontradas === cartas.length / 2) {
        // Marcamos la partida como ganada: al reiniciar, esto le avisa al
        // botón que tiene que guardar el récord
        partidaGanada = true;
 
        //Mensaje para el usuario
        alert(`¡Felicitaciones! Encontraste todas las parejas en ${cantidadIntentos} intentos. Presioná el botón de reiniciar para guardar la información de la partida e iniciar una nueva.`);
    }
}
 
// ===== Guarda el récord de un nivel si es mejor que el anterior =====
// nivel: "facil", "medio" o "dificil"
// jugador: nombre de quien ganó
// intentosFinales: cantidad de intentos que necesitó
function guardarRecord(nivel, jugador, intentosFinales) {
    // localStorage solo guarda texto, así que lo que hay guardado se convierte
    // a objeto con JSON.parse. Si todavía no hay nada, getItem devuelve null
    // y usamos un objeto vacío
    let records = JSON.parse(localStorage.getItem("recordsCartas")) || {};
 
    // Récord actual de este nivel (undefined si nunca se jugó)
    let recordDelNivel = records[nivel];
 
    // Guardamos si no había récord, o si este resultado tiene menos intentos
    if (!recordDelNivel || intentosFinales < recordDelNivel.mejorIntentos) {
        records[nivel] = {
            jugador: jugador,
            mejorIntentos: intentosFinales
        };
 
        // Convertimos el objeto a texto con JSON.stringify para poder guardarlo
        localStorage.setItem("recordsCartas", JSON.stringify(records));
    }
}
 
// ===== CAPTURA DE ELEMENTOS =====
// Referencias a los elementos del HTML que vamos a leer o modificar durante el juego, capturadas una sola vez al cargar el script
 
let campoConfiguracion = document.querySelector("#campoConfiguracion"); // fieldset con nombre y nivel
let btnComenzar = document.querySelector("#memotestComenzar"); // botón que inicia la partida
let tablero = document.querySelector("#tableroCartas"); // div donde se insertan las cartas
let intentos = document.querySelector("#intentos"); // <span> que muestra el número en pantalla
let parejasEncontradas = document.querySelector("#parejasEncontradas"); // <span> que muestra el número en pantalla
 
// Contador numérico real de parejas encontradas (distinto del <span> de arriba,
// que solo sirve para mostrar texto)
let cantidadParejasEncontradas = 0;
 
let nivelElegido = document.querySelector("#nivelElegido"); // muestra el nivel de la partida en curso
let btnReiniciar = document.querySelector("#reiniciar"); // botón que reinicia la partida
 
// El botón de reiniciar arranca deshabilitado: no tiene sentido reiniciar
// una partida que todavía no empezó
btnReiniciar.disabled = true;
 
// Array donde se guarda un objeto por carta con su información respectiva
// (lo llena generarMazo y lo recorre crearTablero)
let cartas = [];
 
// Referencias a las <img> del tablero actual, en el mismo orden que "cartas".
// Nos permite acceder directamente a una <img> por su posición (por ejemplo,
// para volver a ponerle el dorso cuando no coinciden dos cartas)
let imagenesTablero = [];
 
// Posiciones (índices dentro de "cartas") de las cartas seleccionadas
// en este momento. Nunca tiene más de 2 elementos
let seleccionadas = [];
 
// true mientras se están mostrando dos cartas que no coincidieron,
// esperando el setTimeout que las vuelve a ocultar. Bloquea nuevos clicks
let bloqueoSeleccion = false;
 
// Contador numérico real de intentos (distinto del <span> "intentos")
let cantidadIntentos = 0;
 
// Guarda el id que devuelve setTimeout al programar el ocultado de las cartas
// que no coinciden. Lo necesitamos como variable global para poder cancelarlo
// con clearTimeout si el jugador reinicia antes de que pasen los 3 segundos
// (si no, el timeout viejo se dispararía sobre un tablero que ya no existe)
let temporizadorOcultar = null;
 
// true cuando la partida actual ya se ganó. Se usa al reiniciar para saber
// si hay que guardar el récord
let partidaGanada = false;
 
// ===== Evento: comenzar partida =====
 
btnComenzar.addEventListener("click", function () {
    // trim() elimina los espacios del principio y del final, así un nombre
    // formado solo por espacios cuenta como vacío
    let nombre = document.querySelector("#memotestJugador").value.trim();
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
 
    // Generamos las cartas según el nivel elegido.
    switch (nivelDificultad) {
        case "facil":
            generarMazo(6, cartas); // 6 pares = 12 cartas
            break;
        case "medio":
            generarMazo(8, cartas); // 8 pares = 16 cartas
            break;
        default:
            generarMazo(10, cartas); // 10 pares = 20 cartas
            break;
    }
 
    // Con "cartas" ya lleno, armamos el tablero visual
    crearTablero(cartas);
 
    // Mostramos el nivel elegido en pantalla
    nivelElegido.innerText = nivelDificultad;
 
    // Bloqueamos la configuración y habilitamos el botón de reiniciar
    // (campoConfiguracion debe ser un <fieldset> para que .disabled funcione)
    campoConfiguracion.disabled = true;
    btnReiniciar.disabled = false;
});
 
// ===== Evento: Reiniciar partida =====
 
btnReiniciar.addEventListener("click", function () {
    // Cancelamos el setTimeout pendiente (si lo hay) para que no intente
    // ocultar cartas de una partida que ya se reinició
    clearTimeout(temporizadorOcultar);
 
    // Si la partida se ganó, guardamos el récord ANTES de resetear el estado
    // y de limpiar los campos, porque necesitamos su valor y cantidadIntentos final
    if (partidaGanada) {
        let nombre = document.querySelector("#memotestJugador").value.trim();
        let nivel = document.querySelector("#nivel").value;
 
        guardarRecord(nivel, nombre, cantidadIntentos);
    }
 
    // Reseteamos todo el estado interno del juego
    cartas = [];
    imagenesTablero = [];
    seleccionadas = [];
    bloqueoSeleccion = false;
    cantidadIntentos = 0;
    cantidadParejasEncontradas = 0;
    partidaGanada = false;
 
    // Limpiamos el tablero visual
    tablero.innerHTML = "";
 
    // Reseteamos los contadores en pantalla ("-" es el valor inicial del HTML)
    intentos.innerText = "0";
    parejasEncontradas.innerText = "0";
    nivelElegido.innerText = "-";
 
    // Limpiamos los campos de configuración para que el próximo jugador
    // no vea el nombre/nivel de la partida anterior
    document.querySelector("#memotestJugador").value = "";
    document.querySelector("#nivel").value = "vacio";
 
    // Volvemos a habilitar la configuración para elegir nombre y nivel de nuevo
    campoConfiguracion.disabled = false;
 
    // No tiene sentido reiniciar si todavía no hay partida
    btnReiniciar.disabled = true;
});
 
