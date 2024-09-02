async function getId() {
  // Prendo il token dal browser
  const token = localStorage.getItem("authToken");

  // Provo a ottenere l'id dell'utente dal token
  try {
    const response = await fetch(`http://localhost:8080/utenti/me`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recuperare l'ID utente");
    }

    const data = await response.json();
    const idUtente = data.id;

    // Trovo le attività dell'utente
    await trovaAttivita(idUtente);
  } catch (error) {
    console.log("Errore!", error);
  }
}
async function fetchAttivita(Periodo, id) {
  let attivita = [];
  if (Periodo == "Settimana") {
    try {
      const response = await fetch(`http://localhost:8080/act/week`);
      attivita = await response.json();
    } catch (error) {}
  } else {
    try {
      const response = await fetch(`http://localhost:8080/act/utente/${id}`);
      attivita = await response.json();
    } catch (error) {}
  }
  return attivita;
}

async function trovaAttivita(idUtente) {
  // Cerco tutte le attività per tipologia
  const act = await fetchAttivita("Settimana", idUtente);
  const act2 = await fetchAttivita("Anno", idUtente);

  // Ora seleziono solo le attività del singolo utente
  let attivitaUtente = [];

  for (let attivita of act) {
    if (attivita.utente.id === idUtente) {
      attivitaUtente.push(attivita);
    }
  }

  console.log(attivitaUtente);

  // Aggiorna le barre di progresso settimanali
  aggiornaProgressBar(attivitaUtente);
  creaGrafico(act2);
}
getId();

function creaGrafico(attivita) {
  let caloriepermese = [];
  for (i = 0; i < 12; i++) {
    caloriepermese[i] = 0;
    for (let grafico of attivita) {
      const date = new Date(grafico.sportDate);
      if (date.getMonth() == i) {
        caloriepermese[i] += grafico.calorie;
      }
    }
  }

  const ctx = document.getElementById("repmensile").getContext("2d");

var myDoughnutChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],
    datasets: [
      {
        data: caloriepermese,
        backgroundColor: [
          "red",
          "green",
          "black",
          "blue",
          "yellow",
          "orange",
          "aliceblue",
          "purple",
          "pink",
          "brown",
          "grey",
          "lightgray",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  },
});
}
function aggiornaProgressBar(ciclismoUtente) {
  // Esempio di come calcolare la percentuale di completamento per ciascun giorno
  const giorni = [
    "Lunedi",
    "Martedì",
    "Mercoledi",
    "Giovedi",
    "Venerdì",
    "Sabato",
    "Domenica",
  ];
  const giorniElementIds = [
    "settlunCardio",
    "setmarCardio",
    "setmerCardio",
    "setgioCardio",
    "setvenCardio",
    "setsabCardio",
    "setdomCardio",
  ];

  let caloriepergiorno = [];

  for (i = 0; i < 7; i++) {
    let caloriegiorno = parseInt(0);

    ciclismoUtente.forEach((attivita) => {
      const date = new Date(attivita.sportDate);

      if (date.getDay() == i + 1) {
        caloriegiorno += attivita.calorie;
      }
    });

    caloriepergiorno[i] = caloriegiorno;
  }
  const sogliaCardioMassima = 1000;
  const sogliaCardioTop = 100;
  const sogliaCardioQuasiTop = 85;
  const sogliaCardioPerdita = 40;
  const sogliaCardioStabile1 = 70;
  const sogliaCardioStabile2 = 50;
  console.log(caloriepergiorno);

  // Calcolo delle attività totali per giorno (semplificato)
  const attivitaPerGiorno = {
    Lunedi: caloriepergiorno[0],
    Martedì: caloriepergiorno[1],
    Mercoledi: caloriepergiorno[2],
    Giovedi: caloriepergiorno[3],
    Venerdì: caloriepergiorno[4],
    Sabato: caloriepergiorno[5],
    Domenica: caloriepergiorno[6],
  };

  let punteggio = parseInt(0);

  // Itera su ogni giorno per aggiornare le barre di progresso
  giorni.forEach((giorno, index) => {
    const totaleAttivita = attivitaPerGiorno[giorno] || 0;
    const percentualeCompletamento = Math.min(
      (totaleAttivita / sogliaCardioMassima) * 100,
      100
    ); // Normalizza a 100%

    if (percentualeCompletamento == sogliaCardioTop) {
      punteggio += 3;
    } else if (percentualeCompletamento >= sogliaCardioQuasiTop) {
      punteggio += 2;
    } else if (percentualeCompletamento >= sogliaCardioStabile1) {
      punteggio += 1;
    }

    // Aggiorna la barra di progresso corrispondente
    const progressBar = document
      .getElementById(giorniElementIds[index])
      .querySelector(".progress-bar");
    progressBar.style.width = `${percentualeCompletamento}%`;
    progressBar.textContent = `${giorno} - ${percentualeCompletamento.toFixed(
      0
    )}%`;
  });
  const giornata = new Date();
  const oggi = giornata.getDay();
  const mediaPunteggio = (punteggio / oggi).toFixed(1);

  updateNotifications(mediaPunteggio);
}
function updateNotifications(cardioAtt) {
  if (cardioAtt >= 3) {
    document.getElementById("cardiotop").style.display = "block";
    document.getElementById("cardioquasitop").style.display = "none";
    document.getElementById("cardioperdita").style.display = "none";
    document.getElementById("cardiostabile1").style.display = "none";
    document.getElementById("cardiostabile2").style.display = "none";
  } else if (cardioAtt >= 2.5) {
    document.getElementById("cardiotop").style.display = "none";
    document.getElementById("cardioquasitop").style.display = "block";
    document.getElementById("cardioperdita").style.display = "none";
    document.getElementById("cardiostabile1").style.display = "none";
    document.getElementById("cardiostabile2").style.display = "none";
  } else if (cardioAtt >= 2) {
    document.getElementById("cardiotop").style.display = "none";
    document.getElementById("cardioquasitop").style.display = "none";
    document.getElementById("cardioperdita").style.display = "none";
    document.getElementById("cardiostabile1").style.display = "block";
    document.getElementById("cardiostabile2").style.display = "none";
  } else if (cardioAtt >= 1) {
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


async function controlloAccesso() {
  const token = localStorage.getItem("authToken");
  //controllo se il token è associato a un utente
  try {
    const response = await fetch(`http://localhost:8080/utenti/me`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.status == 200) {
      alert("Benvenuto utente");
    } else {
      alert("Accesso non concesso. Fai prima il log-in!");
      window.location.href = "./login.html";
    }
  } catch (errore) {
    alert("Problema di connessione. Riprova più tardi");
  }
}
document.addEventListener("DOMContentLoaded", controlloAccesso());