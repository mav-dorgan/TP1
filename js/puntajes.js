// ===== Récords del memotest (uno por nivel) =====

// Etiquetas legibles para cada valor guardado como "nivel" en recordsCartas
const nivelesCartas = [
    { clave: "facil", etiqueta: "Fácil" },
    { clave: "medio", etiqueta: "Medio" },
    { clave: "dificil", etiqueta: "Difícil" }
];

function mostrarRecordsCartas() {
    // Si nunca se guardó nada, getItem devuelve null, así que usamos un objeto vacío
    let records = JSON.parse(localStorage.getItem("recordsCartas")) || {};
    let cuerpoTabla = document.querySelector("#tablaCartas tbody");

    // Recorremos los tres niveles, haya récord guardado o no, para que la tabla siempre muestre las tres filas
    nivelesCartas.forEach(function (nivel) {
        let fila = document.createElement("tr");
        let recordNivel = records[nivel.clave];

        // Si no hay récord para este nivel, mostramos un guion medio en vez del dato, así las tres columnas quedan siempre parejas
        let jugador = recordNivel ? recordNivel.jugador : "-";
        let puntaje = recordNivel ? recordNivel.mejorIntentos + " intentos" : "-";

        fila.innerHTML =
            "<td>" + nivel.etiqueta + "</td>" + //<td> significa "table data" (dato de tabla)
            "<td>" + jugador + "</td>" +
            "<td>" + puntaje + "</td>";

        cuerpoTabla.appendChild(fila);
        //createElement crea el elemento en memoria (JavaScript lo tiene, pero la página no lo muestra). 
        //appendChild lo inserta dentro de un elemento que ya está en la página, y recién ahí se hace visible.
    });
}

// ===== Récord del juego de dados (uno solo) =====

function mostrarRecordDados() {
    let record = JSON.parse(localStorage.getItem("recordDados"));
    let texto = document.querySelector("#recordDadosTexto");

    // Si no hay récord guardado, dejamos el texto por defecto que ya trae el HTML
    if (record) {
        texto.innerText = record.jugador + " — llegó a 33 en" + record.tiradas + "tiradas";
    }
}

// ===== Récord de la trivia (uno solo) =====

function mostrarRecordTrivia() {
    let record = JSON.parse(localStorage.getItem("triviaResultado"));
    let texto = document.querySelector("#recordTriviaTexto");

    if (record) {
        texto.innerText = record.nombre + " — " + record.puntaje + " puntos";
    }
}

// Mostramos los tres récords ni bien se carga la página
mostrarRecordsCartas();
mostrarRecordDados();
mostrarRecordTrivia();