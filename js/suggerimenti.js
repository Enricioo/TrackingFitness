function UpdateComponent() {
  // Gestione click per Massa Muscolare
  document
    .getElementById("MassaOptioni")
    .addEventListener("click", function () {
      console.log("Massa Muscolare selezionato"); 
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

      document.getElementById("massaOptioni").style.display = "none";
      document.getElementById("massaAttivita").style.display = "none";
      document.getElementById("massaSettimana").style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", UpdateComponent);
//FINE

//NOTIFICHE

//CALORIE DA BRUCIARE
//Top = 2000;
//QuasiTop = 1800;
//Perdita = 1000;
//Stabile1 = 1600
//Stabile2 = 1700


// Soglie per la massa muscolare
const sogliaMuscoliTop = 2000;
const sogliaMuscoliQuasiTop = 1800;
const sogliaMuscoliPerdita = 1000;
const sogliaMuscoliStabile1 = 1600;
const sogliaMuscoliStabile2 = 1700;

// Soglie per il cardio
const sogliaCardioTop = 2000;
const sogliaCardioQuasiTop = 1800;
const sogliaCardioPerdita = 1000;
const sogliaCardioStabile1 = 1600;
const sogliaCardioStabile2 = 1700;

function updateNotifications() {
  const massaAtt = 1800;
  const massaObb = 20000;

  const cardioAtt = 1900; //
  const cardiObb = 2000; //

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

  // Notifiche per il cardio
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

updateNotifications();
//FINE

//AGGIORNAMENTO DATI SETTIMANA
 function updateProgress(calorieData) {
   const calorieThreshold = 2000; // Soglia massima di calorie nella giornata

   const days = {
     lunedi: "settlunMassa",
     martedi: "setmarMassa",
     mercoledi: "setmerMassa",
     giovedi: "setgioMassa",
     venerdi: "setvenMassa",
     sabato: "setsabMassa",
     domenica: "setdomMassa",
   };

   for (let day in calorieData) {
     const progressBarId = days[day];
     if (progressBarId) {
       const progressBar = document
         .getElementById(progressBarId)
         .querySelector(".progress-bar");
       const calorieIntake = calorieData[day];
       const percentage = (calorieIntake / calorieThreshold) * 100;
       progressBar.style.width = `${Math.min(percentage, 100)}%`; 
       progressBar.textContent = `${capitalizeFirstLetter(day)}: ${Math.round(
         percentage
       )}%`;
     }
   }
 }

 function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
 }

 updateProgress({
   lunedi: 2000,
   martedi: 1400,
   mercoledi: 1600,
   giovedi: 1800,
   venerdi: 2000,
   sabato: 1700,
   domenica: 1500,
 });
//FINE MASSA SETTIMANA

 //CARDIO SETTIMANA
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

      //AGGIORNAMENTO PER OGNI GIORNO
      for (let day in cardioData) {
        const progressBarId = days[day];
        if (progressBarId) {
          const progressBar = document
            .getElementById(progressBarId)
            .querySelector(".progress-bar");
          const cardioIntake = cardioData[day];
          const percentage = (cardioIntake / cardioThreshold) * 100;
          progressBar.style.width = `${Math.min(percentage, 100)}%`; 
          progressBar.textContent = `${capitalizeFirstLetter(
            day
          )}: ${Math.round(percentage)}%`;
        }
      }
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateCardioProgress({
      lunedi: 1230,
      martedi: 1440,
      mercoledi: 1850,
      giovedi: 2000,
      venerdi: 1080,
      sabato: 600,
      domenica: 1990,
    });
//FINE 

//ATTIVITA SETTIMINALE

// Funzione per aggiornare il testo delle barre di progresso
function aggiornaTestoBarre(tipoAttivita, dati) {
    // Seleziona il contenitore delle barre di progresso
    const contenitore = document.querySelector(`#${tipoAttivita} .progress-stacked`);

    contenitore.querySelectorAll('.progress').forEach((barra, index) => {
        const attivita = dati[index];
        const larghezza = `${attivita.percentuale}%`;
        const testoBarra = `${attivita.nome} (${attivita.percentuale}%)`;

        barra.style.width = larghezza;

        const barraInterna = barra.querySelector('.progress-bar');
        barraInterna.textContent = testoBarra;
    });
}

const datiMassa = [
    { nome: 'Corsa', percentuale: 25 },
    { nome: 'Ciclismo', percentuale: 25 },
    { nome: 'Pesi', percentuale: 25 },
    { nome: 'Nuoto', percentuale: 25 }
];

const datiCardio = [
    { nome: 'Corsa', percentuale: 25 },
    { nome: 'Ciclismo', percentuale: 25 },
    { nome: 'Pesi', percentuale: 25 },
    { nome: 'Nuoto', percentuale: 25 }
];

document.addEventListener('DOMContentLoaded', () => {
    aggiornaTestoBarre('massaAttivita', datiMassa);
    aggiornaTestoBarre('cardioAttivita', datiCardio);
});

//gestione collegamento DB TESTARE

 async function fetchActivities() {
   try {
     const response = await fetch("jdbc:mysql://localhost:3306/tracker");
     if (!response.ok) throw new Error("Network response was not ok");
     const activities = await response.json();
     displayActivities(activities);
   } catch (error) {
     console.error("Error fetching activities:", error);
   }
 }

 // Funzione per visualizzare le attività nella pagina
 function displayActivities(activities) {
   const activityList = document.getElementById("activity-list");
   activities.forEach((activity) => {
     const listItem = document.createElement("li");
     listItem.textContent = `${activity.name} (${activity.type}): ${activity.duration} minutes`;
     activityList.appendChild(listItem);
   });
 }

 // Recupera le attività al caricamento della pagina
 fetchActivities();

 