// =====================================================
//   JUEGO DE DADOS: llegar a 33 clavado
//   Un solo jugador. Se suma hasta llegar a 33; si se
//   pasa, se resta. Gana con 33 justo. El puntaje es la
//   cantidad de tiradas: cuantas menos, mejor.
// =====================================================


// ---------- PASO 1: variables del juego ----------

// Declaro la constante. const = valor que NO cambia nunca durante el juego.
// Escribirlo en mayúsculas es una convención para las constantes.
const OBJETICO= 33;

// Declaro las variables. let = valores que SÍ van cambiando mientras se juega.
let nombreJugador = "";       //El nombre que escribe la persona antes de jugar
let total = 0;                //El número en el que está el jugador ahora
let tiradas = 0;              //Cuántas veces tiró el jugador sumando y restando


// ---------- PASO 2: traemos los elementos del HTML ----------

// document.querySelector("#id") busca en el HTML el elemento con ese id
// y nos lo "presta" para poder leerlo o modificarlo desde JS.
// Los ids tienen que estar escritos EXACTAMENTE igual que en dados.html.

// Pantalla 1: nombre
const seccionNombre = document.querySelector("#dadosNombre");
const textoRecord = document.querySelector("#dadosRecordTexto");
const inputNombre = document.querySelector("#dadosInputNombre");
const errorNombre = document.querySelector("#dadosErrorNombre");
const btnContinuar = document.querySelector("#dadosBtnContinuar");

// Pantalla 2: Instrucciones
const seccionInstrucciones = document.querySelector("#dadosInstrucciones");
const btnComenzar = document.querySelector("#dadosBtnComenzar");

//Pantalla 3: Juego
const seccionJuego = document.querySelector("#dadosJuego");
const tituloJugador = document.querySelector("#dadosTitulo");
const spanTotal = document.querySelector("#dadosTotal");
const spanTiradas = document.querySelector("#dadosTiradas");
const imagenDado1 = document.querySelector("#dado1");
const imagenDado2 = document.querySelector("dado2");
const btnSumar = document.querySelector("#dadosBtnSumar");
const btnRestar = document.querySelector("#dadosBtnRestar");
const mensaje = document.querySelector("#dadosMensaje");

//Pantalla 4: final
const seccionFinal = document.querySelector("dadosFinal");
const textoResultado = document.querySelector("#dadosResultado");
const textoRecordFinal = document.querySelector("#dadosRecordFinal");
const btnReiniciar = document.querySelector("#dadosBtnReiniciar");


// ---------- PASO 3: funciones auxiliares ----------
// Son funciones chiquitas que hacen UNA sola cosa. Después las usamos
// desde los eventos y desde la función de la tirada.

// "Tira" un dado: devuelve un número entero del 1 al 6.
//   Math.random()  -> número decimal entre 0 y 0.999...
//   * 6            -> entre 0 y 5.999...
//   Math.floor()   -> redondea para abajo: 0, 1, 2, 3, 4 o 5
//   + 1            -> 1, 2, 3, 4, 5 o 6
function tirarDado() {
    return Math.floor(Math.random() *6) + 1;
}

// Cambia las dos imágenes según lo que salió y actualiza el texto alternativo (alt).
// Las imágenes se llaman dado-1.png, dado-2.png... así que armamos el nombre
// pegando textos con "+".
function mostarDados(dado1, dado2) {
    imagenDado1.src = "../img/dados/dado-" + dado1 + ".png";
    imagenDado1.alt = "Primer dado: " + dado1;
    imagenDado2.src = "../img/dados/dado-" + dado2 + ".png";
    imagenDado2.alt = "Segundo dado: " + dado2;
}

// Decide qué botón se puede usar según dónde está el total:
//   - total por debajo de 33 -> solo se puede sumar
//   - total por encima de 33 -> solo se puede restar
// La comparación (total > OBJETIVO) da true o false, y ese valor se guarda
// directamente en la propiedad "disabled" del botón.
function actualizarBotones() {
    btnSumar.disabled = total > OBJETIVO;
    btnRestar.disabled = total < OBJETIVO;
}

// Muestra en pantalla el récord que está guardado (si hay uno).
function mostarRecord() {
    // localStorage guarda TEXTO. Para guardar un objeto lo convertimos a texto
    // con JSON.stringify, y para recuperarlo lo volvemos a convertir con JSON.parse.
    // getItem devuelve null si todavía no se guardó nada con esa clave.
    let record = JSON.parse(localStorage.getItem("recordDados"));

    // Si record es null, el if lo toma como falso y va al else
    if (record) {
        textoRecord.innerText = "Récord actual: " + record.jugador + "llegó a 33 en" + record.tiradas + " tiradas";
    } else { 
        textoRecord.innerText = "Todavía no hay Record. Podés ser el primero!!";
    } 
}

// Guarda la partida si es mejor que el récord anterior (o si no había ninguno).
// Devuelve true si se batió el récord y false si no.
function gurdarRecord() {
    let recordAnterior = JSON.parse(localStorage.getItem("recordDados"));

    // El mejor puntaje es el que tiene MENOS tiradas, por eso usamos "<".
    // Si no había récord (null), esta partida es el primer récord.
    if (recordAnterior == null || tiradas < a recordAnterior.tiradas) {
        // Armamos un objeto con los datos que necesita la página de puntajes
        let nuevoRecord = { jugador: nombreJugador, tiradas: tiradas };
        localStorage.setItem("recordDados" , JSON.stringify(nuevoRecord));
        return true;
        }
    return false;    
}

// Pasa de la pantalla del juego a la pantalla final.
function terminarPartida() {
    // Ocultamos el juego y mostramos el final.
    // Acá aparece por primera vez el botón de reiniciar.
    sectionJuego.hidden = true;
    sectionFinal.hidden = false;

    textoResultado.innerText = "Llegaste a 33 clavado, " + nombreJugador + "! Lo lograste en " + tiradas + " tiradas.";
    // guardarRecord() guarda si corresponde y nos dice si fue récord
    let esRecord = guardaRecord();

    if (esRecord) {
        textoRecordFinal.innerText = "¡Nuevo récord! Quedó guardado en la página de puntajes.";
    } else {
        textoRecordFinal.innerText = "No superaste el récord actual. ¡Probá de nuevo con menos tiradas!";
    }
}