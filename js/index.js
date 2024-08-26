// Prendo l'elemento bottone dal suo id
let mybutton = document.getElementById("btn-back-to-top");

// Quando l'utente scorre oltre i 900 px della pagina appare il bottone
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 900 ||
    document.documentElement.scrollTop > 900
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// Quando l'utente clicca il bottone lo porta in cima alla pagina
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Seleziono l'elemento a dal suo id
const actCorsa = document.getElementById("corsa");

// Aggiungo un event listener al click ed eseguo la funzione
actCorsa.addEventListener('click', function(event) {

  activity = 1;
  const url = `calcolatori.html?activity=${activity}`;

  actCorsa.href = url;

});

// Seleziono l'elemento a dal suo id
const actNuoto = document.getElementById("nuoto");

// Aggiungo un event listener al click ed eseguo la funzione
actNuoto.addEventListener('click', function(event) {

  activity = 2;
  const url = `calcolatori.html?activity=${activity}`;

  actNuoto.href = url;

});

// Seleziono l'elemento a dal suo id
const actCiclismo = document.getElementById("ciclismo");

// Aggiungo un event listener al click ed eseguo la funzione
actCiclismo.addEventListener('click', function(event) {

  activity = 3;
  const url = `calcolatori.html?activity=${activity}`;

  actCiclismo.href = url;

});

