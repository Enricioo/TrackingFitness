function UpdateComponent() {
  // Gestione click per Massa Muscolare
  document
    .getElementById("MassaOptioni")
    .addEventListener("click", function () {
      console.log("Massa Muscolare selezionato"); // Debug
      // Mostra gli elementi relativi alla massa muscolare
      document.getElementById("massaOptioni").style.display = "block";
      document.getElementById("massaSettimana").style.display = "block";
      document.getElementById("massaAttivita").style.display = "block";

      // Nascondi gli elementi relativi al cardio
      document.getElementById("cardioOptioni").style.display = "none";
      document.getElementById("cardioSettimana").style.display = "none";
      document.getElementById("cardioAttivita").style.display = "none";
    });

  // Gestione click per Cardio
  document
    .getElementById("CardioOptioni")
    .addEventListener("click", function () {
      console.log("Cardio selezionato"); 

      document.getElementById("cardioOptioni").style.display = "block";
      document.getElementById("cardioSettimana").style.display = "block";
      document.getElementById("cardioAttivita").style.display = "block";

      // Nascondi gli elementi relativi alla massa muscolare
      document.getElementById("massaOptioni").style.display = "none";
      document.getElementById("massaAttivita").style.display = "none";
      document.getElementById("massaSettimana").style.display = "none"; // non dovrebbe comparire

    });
}

// Chiama UpdateComponent quando il DOM è completamente carico
document.addEventListener("DOMContentLoaded", UpdateComponent);



//NOTIFICHE
const sogliaMuscoliTop = 100;
const sogliaMuscoliQuasiTop = 90;
const sogliaMuscoliPerdita = 50;

// Soglie cardio
const sogliaCardioTop = 100; 
const sogliaCardioQuasiTop = 90; 
const sogliaCardioPerdita = 50; 
const sogliaCardioStabile1 = 70;
const sogliaCardioStabile2 = 60;

function updateNotifications() {
  const massaAtt = 60; 
  const massaObb = 100; 

  const cardioAtt = 70; // 
  const cardiObb = 100; // 

  // Notifiche per la massa muscolare
  if (massaAtt >= sogliaMuscoliTop) {
    document.getElementById("muscolitop").style.display = "block";
    document.getElementById("muscoliquasitop").style.display = "none";
    document.getElementById("muscoliperdita").style.display = "none";
    document.getElementById("muscolistabile1").style.display = "none";
    document.getElementById("muscolistabile2").style.display = "none";
  } else if (massaAtt >= sogliaMuscoliQuasiTop) {
    document.getElementById("muscolitop").style.display = "none";
    document.getElementById("muscoliquasitop").style.display = "block";
    document.getElementById("muscoliperdita").style.display = "none";
    document.getElementById("muscolistabile1").style.display = "none";
    document.getElementById("muscolistabile2").style.display = "none";
  } else if (massaAtt >= sogliaMuscoliPerdita) {
    document.getElementById("muscolitop").style.display = "none";
    document.getElementById("muscoliquasitop").style.display = "none";
    document.getElementById("muscoliperdita").style.display = "none";
    document.getElementById("muscolistabile1").style.display = "block";
    document.getElementById("muscolistabile2").style.display = "none";
  } else {
    document.getElementById("muscolitop").style.display = "none";
    document.getElementById("muscoliquasitop").style.display = "none";
    document.getElementById("muscoliperdita").style.display = "block";
    document.getElementById("muscolistabile1").style.display = "none";
    document.getElementById("muscolistabile2").style.display = "none";
  }

  // Notifiche cardio
  if (cardioAtt >= sogliaCardioTop) {
    document.getElementById("cardiotop").style.display = "block";
    document.getElementById("cardioquasitop").style.display = "none";
    document.getElementById("cardioperdita").style.display = "none";
    document.getElementById("cardiostabile1").style.display = "none";
    document.getElementById("cardiostabile2").style.display = "none";
  } else if (cardioAtt >= sogliaCardioQuasiTop) {
    document.getElementById("cardiotop").style.display = "none";
    document.getElementById("cardioquasitop").style.display = "block";
    document.getElementById("cardioperdita").style.display = "none";
    document.getElementById("cardiostabile1").style.display = "none";
    document.getElementById("cardiostabile2").style.display = "none";
  } else if (cardioAtt >= sogliaCardioStabile1) {
    document.getElementById("cardiotop").style.display = "none";
    document.getElementById("cardioquasitop").style.display = "none";
    document.getElementById("cardioperdita").style.display = "none";
    document.getElementById("cardiostabile1").style.display = "block";
    document.getElementById("cardiostabile2").style.display = "none";
  } else if (cardioAtt >= sogliaCardioStabile2) {
    document.getElementById("cardiotop").style.display = "none";
    document.getElementById("cardioquasitop").style.display = "none";
    document.getElementById("cardioperdita").style.display = "none";
    document.getElementById("cardiostabile1").style.display = "none";
    document.getElementById("cardiostabile2").style.display = "block";
  } else {
    document.getElementById("cardiotop").style.display = "none";
    document.getElementById("cardioquasitop").style.display = "none";
    document.getElementById("cardioperdita").style.display = "block";
    document.getElementById("cardiostabile1").style.display = "none";
    document.getElementById("cardiostabile2").style.display = "none";
  }
}

// Chiama la funzione per aggiornare le notifiche
updateNotifications();
