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
  const massaAtt = 1000;
  const massaObb = 20000;

  const cardioAtt = 1400; //
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

// Funzione per ottenere i dati tramite fetch e aggiornare le barre di progresso
function aggiornaDati() {
    fetch("http://localhost:8080/utenti/act")
      .then((response) => {
          if (!response.ok) {
              throw new Error('Errore nella risposta del server: ' + response.statusText);
          }
          return response.json();
      })
      .then((data) => {
        updateCardioProgress(data);
      })
      .catch((error) => console.error("Errore nel fetch:", error));
}

// Chiama la funzione per ottenere i dati e aggiornare le barre di progresso
document.addEventListener('DOMContentLoaded', aggiornaDati);//-------------------------------------------------------------------------
//FINE

//inizio Sidebar 
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  content.classList.toggle("sidebar-open");

  if (sidebar.classList.contains("open")) {
    gsap.to(sidebar, { duration: 0.3, left: 0 });
    gsap.to(toggleButton, { duration: 0.3, left: "260px" });
    if (window.innerWidth > 768) {
      gsap.to(content, { duration: 0.3, marginLeft: "250px" });
    }
  } else {
    gsap.to(sidebar, { duration: 0.3, left: "-250px" });
    gsap.to(toggleButton, { duration: 0.3, left: "10px" });
    if (window.innerWidth > 768) {
      gsap.to(content, { duration: 0.3, marginLeft: 0 });
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
    gsap.set(content, { marginLeft: 0 });
  }
});
//fine sidebar 


Document.addEventListener("DOMContentLoaded",async function () {
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
      actCiclismo = await fetchAttivita("Anno", "ciclismo");
      actCorsa = await fetchAttivita("Anno", "corsa");
      actNuoto = await fetchAttivita("Anno", "nuoto");
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
      console.log(ciclismoUtente);
      console.log(corsaUtente);
      console.log(nuotoUtente);
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

// Funzione per ottenere i dati tramite fetch e aggiornare le barre di progresso
function aggiornaDati() {
    fetch("http://localhost:8080/utenti/act")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Errore nella risposta del server: ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            updateProgress(data);
        })
        .catch((error) => console.error("Errore nel fetch:", error));
}

// Chiama la funzione per ottenere i dati e aggiornare le barre di progresso
document.addEventListener('DOMContentLoaded', aggiornaDati);

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

// Funzione per fare il fetch all'endpoint /utenti/me e ottenere l'ID dell'utente
async function fetchUserId() {
    const token = getToken();

    if (!token) {
        console.error('Token non trovato nel localStorage');
        return null;
    }

    try {
        const response = await fetch('http://localhost:8080/utenti/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Errore nella risposta del server: ' + response.statusText);
        }

        const data = await response.json();
        return data.id; // Assumi che la risposta JSON contenga un campo 'id'
    } catch (error) {
        console.error('Errore nel fetch:', error);
        return null;
    }
}

// Funzione per fare il fetch di tutte le attività
async function fetchAllActivities() {
    try {
        const response = await fetch('http://localhost:8080/attivita', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Errore nella risposta del server: ' + response.statusText);
        }

        return await response.json(); // Ritorna tutte le attività
    } catch (error) {
        console.error('Errore nel fetch delle attività:', error);
        return [];
    }
}

// Funzione per aggiornare le barre di progresso con le attività dell'utente
async function updateUserActivities() {
    const userId = await fetchUserId();

    if (!userId) {
        console.error('ID utente non disponibile');
        return;
    }

    const allActivities = await fetchAllActivities();

    // Filtra le attività per ID dell'utente
    const userActivities = allActivities.filter(activity => activity.userId === userId);

    // Supponiamo che le attività siano divise tra `massa` e `cardio`
    const massaActivities = userActivities.filter(activity => activity.type === 'massa');
    const cardioActivities = userActivities.filter(activity => activity.type === 'cardio');

    // Chiama le funzioni di aggiornamento con le attività filtrate
    updateProgress(massaActivities);
    updateCardioProgress(cardioActivities);
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

// Chiama la funzione per aggiornare le attività dell'utente al caricamento della pagina
document.addEventListener('DOMContentLoaded', updateUserActivities);

//TOKEN ACCESSO LOGIN - da inserire

