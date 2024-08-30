// Soglie per il cardio
const sogliaCardioTop = 1500;
const sogliaCardioQuasiTop = 1200;
const sogliaCardioPerdita = 450;
const sogliaCardioStabile1 = 600;
const sogliaCardioStabile2 = 700;

// Funzione per aggiornare le notifiche in base alle calorie
function updateNotifications(cardioAtt) {
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

// Funzione per calcolare la percentuale
function calcolaPercentuale(valore, massimo) {
  return (valore / massimo) * 100;
}

// Funzione per aggiornare la larghezza delle barre di progresso
function updateCardioProgress(cardioData) {
  const cardioThreshold = 2000;

  const days = {
    lunedi: "settlunCardio",
    martedi: "setmarCardio",
    mercoledi: "setmerCardio",
    giovedi: "setgioCardio",
    venerdi: "setvenCardio",
    sabato: "setsabCardio",
    domenica: "setdomCardio",
  };

  // Aggiornamento per ogni giorno
  for (const [day, progressBarId] of Object.entries(days)) {
    const progressBar = document
      .getElementById(progressBarId)
      ?.querySelector(".progress-bar");
    if (progressBar) {
      const cardioIntake = cardioData[day] || 0; // Gestisce i giorni senza dati
      const percentage = calcolaPercentuale(cardioIntake, cardioThreshold);
      progressBar.style.width = `${Math.min(percentage, 100)}%`;
      progressBar.textContent = `${capitalizeFirstLetter(day)}: ${Math.round(
        percentage
      )}%`;
    }
  }
}

// Funzione per capitalizzare la prima lettera
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Gestione click per Cardio
function UpdateComponent() {
  document
    .getElementById("CardioOptioni")
    .addEventListener("click", function () {
      console.log("Cardio selezionato");

      document.getElementById("cardioOptioni").style.display = "block";
      document.getElementById("cardioSettimana").style.display = "block";
      document.getElementById("cardioAttivita").style.display = "block";

      document.getElementById("massaOptioni").style.display = "none";
      document.getElementById("massaAttivita").style.display = "none";
      document.getElementById("massaSettimana").style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", UpdateComponent);

// Esempio di dati per ciclismoUtente (da sostituire con i dati reali)
let ciclismoUtente = [
  { sportDate: "2024-08-29T00:00:00Z", calorie: 800 },
  { sportDate: "2024-08-30T00:00:00Z", calorie: 600 },
  { sportDate: "2024-08-31T00:00:00Z", calorie: 1300 },
  { sportDate: "2024-09-01T00:00:00Z", calorie: 1400 },
  { sportDate: "2024-09-02T00:00:00Z", calorie: 1500 },
  { sportDate: "2024-09-03T00:00:00Z", calorie: 700 },
  { sportDate: "2024-09-04T00:00:00Z", calorie: 800 },
];

let caloriepergiorno = [];

// Calcolo delle calorie per ogni giorno della settimana
for (let i = 0; i < 7; i++) {
  let caloriegiorno = 0;

  ciclismoUtente.forEach((attivita) => {
    const date = new Date(attivita.sportDate);
    if (date.getDay() === (i + 1) % 7) {
      caloriegiorno += attivita.calorie;
    }
  });

  caloriepergiorno[i] = caloriegiorno;
  updateNotifications(caloriegiorno);
  updateCardioProgress(caloriepergiorno);
}

console.log(caloriepergiorno);
