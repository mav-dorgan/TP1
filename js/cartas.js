// Capturo el contenedor del HTML donde iran las cartas
let tablero = document.querySelector("#tableroCartas");

for(i=0; i<12; i++){
    tablero.innerHTML += `<button class="carta">?</button>`
}
