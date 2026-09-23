// Capturo el contenedor del HTML donde iran las cartas
let tablero = document.querySelector("#tableroCartas");
let btnComenzar = document.querySelector("#memotestComenzar");

btnComenzar.addEventListener("click", function(){
    tablero.innerHTML = "";

    let nivelDificultad = document.querySelector("#nivel").value;

    switch(nivelDificultad){
        case "facil":
            for(i=1; i<=12; i++){
                tablero.innerHTML += `<img src="/img/cartas/memotest-11.jpg" alt="Imagen de interrogante" width="160" height="160">`
            }
            break;

        case "medio":
            for(i=1; i<=16; i++){
                tablero.innerHTML += `<img src="/img/cartas/memotest-11.jpg" alt="Imagen de interrogante" width="160" height="160">`
            }
            break;

        default:
            for(i=1; i<=20; i++){
                tablero.innerHTML += `<img src="/img/cartas/memotest-11.jpg" alt="Imagen de interrogante" width="160" height="160">`
            }
            break;
    }
})