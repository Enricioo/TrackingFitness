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


// Funzione per calcolare la percentuale
function calcolaPercentuale(valore, massimo) {
    return (valore / massimo) * 100;
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Funzione per ottenere i dati tramite fetch e aggiornare le barre di progresso
function aggiornaDati() {
    fetch("http://localhost:8080/utenti/act") // Sostituisci con l'URL del tuo endpoint
        .then((response) => {
            if (!response.ok) {
                throw new Error('Errore nella risposta del server: ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            // Supponiamo che `data` contenga un oggetto con i valori per i giorni
            updateProgress(data);
        })
        .catch((error) => console.error("Errore nel fetch:", error));
}

// Chiama la funzione per ottenere i dati e aggiornare le barre di progresso
document.addEventListener('DOMContentLoaded', aggiornaDati);
//FINE MASSA SETTIMANA


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
    const response = await fetch("http://localhost:8080/act");
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
document.addEventListener("DOMContentLoaded", fetchActivities);
//end 1

// Funzione per recuperare il token dal localStorage
function getToken() {
    return localStorage.getItem('authToken'); // Assumi che il token sia salvato con la chiave 'authToken'
}

// Funzione per fare il fetch all'endpoint /utenti/me e ottenere l'ID dell'utente
async function fetchUserId() {
    const token = getToken();

    if (!token) {
        console.error('Token non trovato nel localStorage');
        return;
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
        const userId = data.id; // Assumi che la risposta JSON contenga un campo 'id'
        console.log('User ID:', userId);
        return userId;
    } catch (error) {
        console.error('Errore nel fetch:', error);
    }
}

// Chiama la funzione per ottenere l'ID dell'utente al caricamento della pagina
document.addEventListener('DOMContentLoaded', fetchUserId);


//fine tester

//inizio collegamento

// Funzione per recuperare il token dal localStorage
function getToken() {
    return localStorage.getItem('authToken'); // Assumi che il token sia salvato con la chiave 'authToken'
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

// Funzione di aggiornamento per massa muscolare
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
            const percentage = calcolaPercentuale(calorieIntake, calorieThreshold);
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
            progressBar.textContent = `${capitalizeFirstLetter(day)}: ${Math.round(percentage)}%`;
        }
    }
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function calcolaPercentuale(valore, massimo) {
    return (valore / massimo) * 100;
}

// Chiama la funzione per aggiornare le attività dell'utente al caricamento della pagina
document.addEventListener('DOMContentLoaded', updateUserActivities);


//TOKEN ACCESSO LOGIN - da inserire

