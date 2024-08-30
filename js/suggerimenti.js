function UpdateComponent() {
  // Gestione click per Massa Muscolare
  document
    .getElementById("MassaOptioni")
    .addEventListener("click", function () {
      console.log("Massa Muscolare selezionato"); 
      document.getElementById("massaOptioni").style.display = "none";
      document.getElementById("massaSettimana").style.display = "none";
      document.getElementById("massaAttivita").style.display = "none";

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

//CALORIE DA BRUCIARE - da rifare
//Top = 2000;
//QuasiTop = 1800;
//Perdita = 1000;
//Stabile1 = 1600
//Stabile2 = 1700


// Soglie per la massa muscolare
const sogliaMuscoliTop = 1000;
const sogliaMuscoliQuasiTop = 800;
const sogliaMuscoliPerdita =450;
const sogliaMuscoliStabile1 = 600;
const sogliaMuscoliStabile2 = 700;

// Soglie per il cardio
const sogliaCardioTop = 1000;
const sogliaCardioQuasiTop = 800;
const sogliaCardioPerdita = 450;
const sogliaCardioStabile1 = 600;
const sogliaCardioStabile2 = 700;

function updateNotifications() {
  const massaAtt = 700;
  const massaObb = 1000;

  const cardioAtt = 900; //
  const cardiObb = 1000; //

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

// Funzione per calcolare la percentuale- obiettivi settimanali cardio.
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

    // AGGIORNAMENTO PER OGNI GIORNO
    for (const [day, progressBarId] of Object.entries(days)) {
        const progressBar = document.getElementById(progressBarId)?.querySelector(".progress-bar");
        if (progressBar) {
            const cardioIntake = cardioData[day] || 0; // Gestisci i giorni senza dati
            const percentage = calcolaPercentuale(cardioIntake, cardioThreshold);
            progressBar.style.width = `${Math.min(percentage, 100)}%`; 
            progressBar.textContent = `${capitalizeFirstLetter(day)}: ${Math.round(percentage)}%`;
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//FINE

document.addEventListener("DOMContentLoaded", async function () {
    async function getId() {
      //prendo il token dal browser
      const token = localStorage.getItem("authToken");
      //provo a ottenere l'id dell'utente dal token
      try {
        fetch(`http://localhost:8080/utenti/me`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            //ho ottenuto l'id utente dal token
            const idUtente = data.id;
            trovaAttivita(idUtente);
          });
      } catch (error) {
        console.err("Errore!");
      }
    }

      async function fetchAttivita(periodo, tipo) {
        try {
          const response = await fetch("http://localhost:8080/act");
          const data = await response.json();
          let arrayAct = [];
          const oggi = new Date();
          data.forEach((act) => {
            const date = new Date(act.sportDate);
           if (periodo == "Anno") {
              //le attività dell'anno attuale
              if (
                date.getFullYear() == oggi.getFullYear() &&
                act.tipo == tipo
              ) {
                //aggiungo solo le attività fatte entro un anno
                arrayAct.push(act);
              }
            } else if (periodo == "Settimana") {
              //la settimana attuale
            }
          });
          return arrayAct;
        } catch (error) {
          alert("Problemi di comunicazione con il server. Riprova più tardi.");
        }
      }
    async function trovaAttivita(idUtente) {
      //cerco tutte le attività per tipologia
      actCiclismo = await fetchAttivita("Anno", "cycling");
      actCorsa = await fetchAttivita("Anno", "running");
      actNuoto = await fetchAttivita("Anno", "swimmming");
      //ora seleziono solo le attività del singolo utente
      let ciclismoUtente = [];
      let corsaUtente = [];
      let nuotoUtente = [];
      for (let ciclismo of actCiclismo) {
        let utente = ciclismo.utente;
        if (utente.id == idUtente) {
          ciclismoUtente.push(ciclismo);
        }
      }
      for (let corsa of actCorsa) {
        let utente = corsa.utente;
        if (utente.id == idUtente) {
          corsaUtente.push(corsa);
        }
      }
      for (let nuoto of actNuoto) {
        let utente = nuoto.utente;
        if (utente.id == idUtente) {
          nuotoUtente.push(nuoto);
        }
      }
      //console.log(ciclismoUtente);
     // console.log(corsaUtente);
      //console.log(nuotoUtente);
      //poi si fanno i grafici
    }
    getId();
    
})

// Funzione per calcolare la percentuale obiettivi
function calcolaPercentuale(valore, massimo) {
    return (valore / massimo) * 100;
}

// Funzione per capitalizzare la prima lettera
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Funzione per aggiornare la larghezza delle barre di progresso
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

    for (const day in days) {
        const progressBarId = days[day];
        const progressBar = document.getElementById(progressBarId)?.querySelector(".progress-bar");
        if (progressBar) {
            const calorieIntake = calorieData[day] || 0; // Gestisci giorni senza dati
            const percentage = calcolaPercentuale(calorieIntake, calorieThreshold);
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
            progressBar.textContent = `${capitalizeFirstLetter(day)}: ${Math.round(percentage)}%`;
        }
    }
}

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

// Funzione per recuperare il token dal localStorage
function getToken() {
    return localStorage.getItem('authToken');
}

// Funzione di aggiornamento per cardio
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

    for (let day in cardioData) {
        const progressBarId = days[day];
        if (progressBarId) {
            const progressBar = document
                .getElementById(progressBarId)
                .querySelector(".progress-bar");
            const cardioIntake = cardioData[day];
            const percentage = calcolaPercentuale(cardioIntake, cardioThreshold);
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
            progressBar.textContent = `${capitalizeFirstLetter(day)}: ${Math.round(percentage)}%`;
        }
    }
}

