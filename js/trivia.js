// ==================================
// SELECCION DE LOS ELEMENTOS DEL DOM
//===================================

//elementos del html para modificar su contenido y visibilidad

const inicio = document.querySelector ('#triviaInicio');
const nombreJugador = document.querySelector('#triviaNombre');
const botonComenzar = document.querySelector ('#triviaComenzar');

const juego = document.querySelector ('#triviaJuego');
const progreso = document.querySelector ('#triviaProgreso');
const vidas = document.querySelector ('#triviaVidas');
const contadorCorrectas = document.querySelector ('#triviaCorrectas');
const estado = document.querySelector ('#triviaEstado');
juego.hidden = true;

const preguntas = document.querySelector ('#triviaPreguntas');
const bandera = document.querySelector ('#imgBandera');
const opciones = document.querySelector ('#triviaOpciones');
const botonSiguiente = document.querySelector ('#triviaSiguiente');

const final = document.querySelector ('#triviaFinal');
const resultado = document.querySelector ('#triviaResultado');
const puntaje = document.querySelector ('#triviaPuntaje');
const botonReiniciar = document.querySelector ('#triviaReiniciar');
final.hidden = true;

/*=====================
 CREACION DE VARIABLES
======================= */

let paises = [];
let paisesConBandera = [];
let paisesUsados = []; //almacena los paises cuyas banderas se usaron para evitar repetir preguntas

let vidasJugador = 3;
let puntos = 0;
let numeroPregunta = 0;
let nombre = '';

/*======================
COMIENZO DEL JUEGO
======================= */

//Alamceno el nombre del jugador para comenzar
botonComenzar.addEventListener ('click', function() { 
    
    //compruebo que el nombre no este vacio
    if (nombreJugador.value.trim() == '') { //el .trim() permite eliminar espacios para evitar campos vacios
        alert('Ingresá tu nombre para comenzar.');
        return;
    }

    nombre = nombreJugador.value.trim();

    inicio.hidden = true;
    juego.hidden = false;

    //si es la primera vez que se carga el juego, todavia no se realizo el pedido a la API por lo que no hay paises con bandera.
    //En ese caso se llama a la funcion que realiza el pedido.
    //Si no es la primera partida, los paises ya fueron cargados y no es necesario hacer un nuevo pedido por lo que directamente se genera una pregunta
    if (paisesConBandera.length == 0) {
        cargarPaises();
    } else {
        generarPregunta();
    }
});


/*===================
PEDIDO A LA API
=====================*/


let offset = 0; // La API solo me permite pedir de hasta 25 paises asi que debo hacer varios pedidos agregando un offset que corre a los siguiente 25 paises
const key = 'rc_live_6bf916e7431641fab87668e2079ebe00'; // esta api key esta restringida a ser usada solo con ciertas paginas como la pagina de github pages de este repositorio, por lo que no es un problema publicarla

async function cargarPaises() {
    estado.innerHTML = 'Cargando preguntas...';

    try {
        const url = 'https://api.restcountries.com/countries/v5?offset=' + offset;
        //pide a la Api 25 paises
        const respuesta = await fetch(url, {
            headers: {
                "Authorization": "Bearer " + key
            }
        });

        //Verifica que no haya errores
        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los países');
            estado.innerHTML = 'No se pudieron cargar las preguntas.';
        }

        //los convierte a formato json
        const datos = await respuesta.json();

        //si no hay errores continua con la carga de todos los paises Y los alamcena en el array de paises
        datos.data.objects.forEach(pais => {
            paises.push(pais);
        });

        console.log('Países cargados:', paises.length);

        //pregunta si quedan mas paises por pedir, si la respuesta es si, se agrega un +25 al offset y se hace un nuevo pedido. Esta suma al offset permita que se pida a partir del pais 26 y no se repitan los mismos de antes.
        if (datos.data.meta.more == true && paises.length < 250) {

            offset = offset + 25;
            await cargarPaises();

        } else {

            console.log('Todos los países fueron cargados');
            console.log(paises.length);

            //Como no todos los paises tienen cargada una bandera hago un if que recorra el array y se quede solo con aquellos que tienen una foto de la bandera.
            paises.forEach(pais => {
                if (pais.flag.url_png != "") {
                    paisesConBandera.push(pais);
                }
            });

            console.log(paisesConBandera.length);

            estado.innerHTML = '';
            generarPregunta();
        }
    } catch (error) {
        console.log('Ocurrió un error:', error);
    }
}

//=======================================
//JUEGO PRINCIPAL: CREACION DE PREGUNTAS
//=======================================

//Creo una funcion para generar los 4 paises utilizados en la opcion multiple, incluyendo el pais con la bandera correcta
function generarPregunta () {

    botonSiguiente.hidden = true;

    numeroPregunta ++;

    progreso.innerHTML = 'Pregunta ' + numeroPregunta;
    vidas.innerHTML = 'Vidas: ' + vidasJugador;
    contadorCorrectas.innerHTML = 'Puntos: ' + puntos;
 
    let opcionesPregunta = [];

    let paisesDisponibles = buscarDisponibles (paisesConBandera);

    let paisCorrecto = elegirCorrecto(paisesDisponibles); //Almaceno la respuesta correcta en su propia variable

    opcionesPregunta.push(paisCorrecto);
    paisesUsados.push(paisCorrecto);

    let opcionesIncorrectas = buscarIncorrectos(paisesConBandera, paisCorrecto);

    opcionesIncorrectas.forEach(pais => {
        opcionesPregunta.push(pais);
    });

    let opcionesMezcladas = mezclar(opcionesPregunta);

    let pregunta = {
    opciones: opcionesMezcladas,
    correcto: paisCorrecto
    };

    //muestro en el HTML la bandera a adivinar
    bandera.innerHTML = '<img src="' + pregunta.correcto.flag.url_png + '">';
    mostrarOpciones(pregunta);

    return pregunta;
}


//Busco los paises que todavia no fueron usados como respuesta correcta
function buscarDisponibles(arreglo) {

    let paisesDisponibles = []; //almacena los paises cuyas banderas no se usaron aun

    arreglo.forEach(pais => {
        if (!paisesUsados.includes(pais)) {
            paisesDisponibles.push(pais);
        }
    });
    return paisesDisponibles;
}


//Se determina aleatoriamente el pais correcto y se guarda en la primera posicion del array
function elegirCorrecto (arreglo) { 
    let numeroCorrecto = Math.floor(Math.random()*arreglo.length);
    let paisCorrecto = arreglo[numeroCorrecto];

    return paisCorrecto;
}

//Se determinan los otros paises para las opciones incorrectas,luego se guardan tambien en el array.
function buscarIncorrectos(arreglo, correcto) {
    let opcionesIncorrectas = [];

    while (opcionesIncorrectas.length < 3) {

        let numero = Math.floor(Math.random() * arreglo.length);
        let paisIncorrecto = arreglo[numero];

        let repetido = false;

        opcionesIncorrectas.forEach(pais => {
            if (pais == paisIncorrecto || pais == correcto) {
                repetido = true;
            }
        });

        if (repetido == false) {
            opcionesIncorrectas.push(paisIncorrecto);
        }
    }

    return opcionesIncorrectas;
}

//Mezclo las opciones para que la primera no sea siempre la correcta
function mezclar(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}

//Creo 4 botones en el HTML con las opciones. Al hacer click en alguno se deshabilitan todos. Finalmente corroboro la respuesta correcta y dependiendo el resultado se suman puntos o se resta una vida.
function mostrarOpciones(pregunta) { 

    opciones.innerHTML = "";

    //Creo los 4 botones correspondientes a cada pais
    pregunta.opciones.forEach(pais => {
        opciones.innerHTML += '<button type="button" name="' + pais.names.translations.spa.common + '">' + pais.names.translations.spa.common + '</button>';
    });

    let botones = opciones.querySelectorAll('button');

    //Corroboro la respuesta
    botones.forEach(boton => {
        boton.addEventListener('click', function () {

            //se muestra al jugador si su respuesta fue correcta o incorrecta agregando una clase al boton que luego le pondra un color diferente.
            //Dependiendo el resultado sumo puntos o resto vidas
            if (boton.name == pregunta.correcto.names.translations.spa.common) {
                puntos += 100;
                boton.classList.add ('triviaCorrecto')
            } else {

                vidasJugador -= 1;
                boton.classList.add ('triviaIncorrecto')
            }
            
            //Actualizo el contador de vidas y puntaje
            vidas.innerHTML = 'Vidas: ' + vidasJugador;
            contadorCorrectas.innerHTML = 'Puntos: ' + puntos;
            
            //Corroboro que queden vidas y sino voy al final
            if (vidasJugador == 0) {
                console.log('Fin del juego');
                terminarJuego('No hay más vidas disponibles!');
            }

            //corroboro que queden preguntas y sino voy al final
            if (paisesUsados.length == paisesConBandera.length) {
                console.log('Se adivinaron todos los países');
                terminarJuego('Adivinaste todos los países!');
            }

            //Deshabilito los botones
            botones.forEach(boton => {
                if (boton.name == pregunta.correcto.names.translations.spa.common) {
                    boton.classList.add('triviaCorrecto');
                }
                boton.disabled = true;
            });
            
            //habilito el boton para la siguiente pregunta
            botonSiguiente.hidden = false;

        });
    });
};

//Habilito la funcionalidad del boton para la siguiente pregunta
botonSiguiente.addEventListener('click', function () {
    
    if (vidasJugador > 0) {
    generarPregunta();
    botonSiguiente.hidden = true;
    };
});

/*=======================
    FIN DEL JUEGO
=========================*/

//Habilito el fin del juego al llegar a 0 vidas o terminar las preguntas.
function terminarJuego(mensaje) {

    juego.hidden = true;
    final.hidden = false;

    resultado.innerHTML = 'Juego terminado: '+ mensaje;
    puntaje.innerHTML = 'Puntaje final: ' + puntos;
    
    guardarResultado();
}

//LOCAL STORAGE PARA TABLA DE RECORDS
function guardarResultado() {

    //busco en el localStorage si hay un resultado ya almacenado
    let resultadoAnterior = localStorage.getItem('triviaResultado');

    if (resultadoAnterior) {
        resultadoAnterior = JSON.parse(resultadoAnterior);
    }

    //si no hay ningun resultado se guarda el actual como record. Si ya hay un resultado se almacena el de mayor puntos.
    if (resultadoAnterior == null || puntos > resultadoAnterior.puntaje) {

        let resultadoJugador = {
            nombre: nombre,
            puntaje: puntos
        };

        localStorage.setItem('triviaResultado', JSON.stringify(resultadoJugador));
    }
}

//Boton para reiniciar el juego, resetea todos los puntajes y vida y vuelve a mostrar la pantalla de inicio para que se cargue un nuevo nombre.

botonReiniciar.addEventListener('click', function () {

    vidasJugador = 3;
    puntos = 0;
    numeroPregunta = 0;
    paisesUsados = [];
    nombreJugador.value = '';

    final.hidden = true;
    inicio.hidden = true;

});