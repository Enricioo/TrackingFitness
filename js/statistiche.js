document.addEventListener('DOMContentLoaded', function () {
  /*let ctx1 = document.getElementById("myChart").getContext("2d");
  let ctx2 = document.getElementById("myChart2").getContext("2d");

  let sportData = {    // valori distanza percorsa
    running: {
      weekly: [45, 30, 60, 15],
      monthly: [100, 160, 180, 220, 280, 260, 300, 200, 140, 240, 120, 80],
      annual: [1200, 1300, 1500, 1400],
    },
    cycling: {
      weekly: [200, 150, 300, 100],
      monthly: [500, 600, 700, 800, 900, 850, 950, 750, 650, 550, 450, 350],
      annual: [7000, 7200, 7500, 7800],
    },
    swimming: {
      weekly: [7, 10, 8, 12],
      monthly: [20, 25, 30, 35, 40, 38, 42, 36, 28, 33, 24, 22],
      annual: [400, 420, 450, 430],
    }
  };

  let sportCalorieData = {    // valori calorie bruciate
    running: {
      weekly: [11000, 13000, 12500, 14000],
      monthly: [60000, 68000, 62000, 75000, 80000, 72000, 77000, 81000, 83000, 86000, 90000, 88000],
      annual: [720000, 750000, 770000, 790000],
    },
    cycling: {
      weekly: [17000, 19000, 18500, 20000],
      monthly: [90000, 98000, 92000, 105000, 110000, 102000, 107000, 111000, 113000, 116000, 120000, 118000],
      annual: [1040000, 1080000, 1120000, 1150000],
    },
    swimming: {
      weekly: [10000, 12000, 11500, 13000],
      monthly: [50000, 54000, 52000, 60000, 63000, 61000, 65000, 66000, 67000, 68000, 70000, 69000],
      annual: [650000, 670000, 680000, 710000],
    }
  };

  let chart1 = new Chart(ctx1, {    // 1° Grafico (a linee)
    type: "line",
    data: {
      labels: ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"],
      datasets: [{
        label: "Distanza percorsa (km)",
        data: sportData.running.weekly,    // dal contenitore sportData si accede ai dati della corsa (running) su base settimanale (weekly)
        backgroundColor: "rgba(0,191,255,0.6)",
        borderColor: "rgba(0, 191, 255, 1)",
        borderWidth: 2,
        fill: true,   // l'area sottostante la linea del grafico viene colorata
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,   // il grafico si adatta alle dimensioni del contenitore
      scales: {
        x: {
          title: {
            display: true,
            text: 'Settimane',
            font: {
              size: 16,   // Dimensione del font
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,   // Dimensione del font per i ticks (etichette lugngo gli assi)
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Distanza percorsa (km)',
            font: {
              size: 16,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
      },
    },
  });

  let chart2 = new Chart(ctx2, {    // 2° Grafico (a barre)
    type: "bar",
    data: {
      labels: ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"],
      datasets: [{
        label: "Calorie bruciate (kcal)",
        data: sportCalorieData.running.weekly,
        backgroundColor: ["yellow", "orange", "red", "brown", "lightgreen", "skyblue", "blue", "lime", "purple", "yellow", "gray", "green"],
        borderWidth: 2,
        borderColor: "black",
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Settimane',
            font: {
              size: 16,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Calorie bruciate (kcal)',
            font: {
              size: 16,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
      },
    },
  });*/

  window.changeChart = function (type) {    // Funzione "changeChart" che cambia il tipo di dati visualizzati nei grafici in base all'input dell'utente.

    // Rimuovo la classe active-button da tutti i bottoni
    document.querySelectorAll('.chart-type-button').forEach(button => {
      button.classList.remove('active-button');
    });

    // Aggiungi la classe active-button al bottone cliccato
    document.getElementById(type + '-button').classList.add('active-button');

    let sport = document.getElementById("sportSelector").value;    // Scelta dello sport

    if (type === 'weekly') {
      chart1.data.labels = ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"];   // imposto le etichette dell'asse X
      chart1.data.datasets[0].data = sportData[sport].weekly;    // recupero dei dati
      chart1.options.scales.x.title.text = 'Settimane';    // imposto il titolo dell'asse x
      chart1.update();

      chart2.data.labels = ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"];
      chart2.data.datasets[0].data = sportCalorieData[sport].weekly;
      chart2.options.scales.x.title.text = 'Settimane';
      chart2.update();

    } else if (type === 'monthly') {
      chart1.data.labels = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
      chart1.data.datasets[0].data = sportData[sport].monthly;
      chart1.options.scales.x.title.text = 'Mesi';
      chart1.update();

      chart2.data.labels = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
      chart2.data.datasets[0].data = sportCalorieData[sport].monthly;
      chart2.options.scales.x.title.text = 'Mesi';
      chart2.update();

    } else if (type === 'annual') {
      chart1.data.labels = ["2020", "2021", "2022", "2023"];
      chart1.data.datasets[0].data = sportData[sport].annual;
      chart1.options.scales.x.title.text = 'Anni';
      chart1.update();

      chart2.data.labels = ["2020", "2021", "2022", "2023"];
      chart2.data.datasets[0].data = sportCalorieData[sport].annual;
      chart2.options.scales.x.title.text = 'Anni';
      chart2.update();
    }
  };
});

// Animazioni per sidebar e contenuto in open
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  content.classList.toggle('sidebar-open');

  if (sidebar.classList.contains('open')) {
    gsap.to(sidebar, { duration: 0.3, left: 0 });
    gsap.to(toggleButton, { duration: 0.3, left: '260px' }); 
    if (window.innerWidth > 768) {
      gsap.to(content, { duration: 0.3, marginLeft: '250px' });
    }
  } else {
    gsap.to(sidebar, { duration: 0.3, left: '-250px' });
    gsap.to(toggleButton, { duration: 0.3, left: '10px' });
    if (window.innerWidth > 768) {
      gsap.to(content, { duration: 0.3, marginLeft: 0 });
    }
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
    gsap.set(content, { marginLeft: 0 });
  }
});

document.addEventListener('DOMContentLoaded', async function() {
  async function fetchAttivita(periodo, id) {
    try {
        const response = await fetch(`http://localhost:8080/act/utente/${id}`);
        const data = await response.json();
        let arrayAct = [];
        const oggi = new Date();
        data.forEach((act) => {
            const date = new Date(act.sportDate);
            if (periodo == 'annual') {
                //aggiungo tutte le attività del tipo selezionato
                arrayAct.push(act)
            } else if (periodo == 'monthly') {
                //le attività dell'anno attuale
                if ((date.getFullYear() == oggi.getFullYear())) {
                    //aggiungo solo le attività fatte entro un anno
                    arrayAct.push(act);
                }
            } else if (periodo == 'weekly') {
                //il mese attuale
                if ((date.getFullYear() == oggi.getFullYear()) && (date.getMonth() == oggi.getMonth())) {
                    //aggiungo solo le attività fatte entro un mese
                    arrayAct.push(act);
                }
            }
        });
        return arrayAct;
    } catch (error) {
        alert('Problemi di comunicazione con il server. Riprova più tardi.');
    }
  }
  // --- TEST TOKEN-ID ---
  async function getId() {
    //prendo il token dal browser
    const token=localStorage.getItem('authToken');
    //provo a ottenere l'id dell'utente dal token
    try {
        fetch(`http://localhost:8080/utenti/me`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            //ho ottenuto l'id utente dal token
            const idUtente = data.id;
            trovaAttivita(idUtente);
        })
    } catch (error) {
        console.err("Errore!")
    }
}
async function trovaAttivita(idUtente) {
    //ora seleziono solo le attività del singolo utente
    let attivitaSettimane = await fetchAttivita('weekly', idUtente);
    let attivitaMesi = await fetchAttivita('monthly', idUtente);
    let attivitaAnni = await fetchAttivita('annual', idUtente);
    //poi si fanno i grafici
    creaGrafico(attivitaSettimane, attivitaMesi, attivitaAnni)
}

async function creaGrafico(arraySettimane, arrayMesi, arrayAnni) {
  let ctx1 = document.getElementById("myChart").getContext("2d");
  let ctx2 = document.getElementById("myChart2").getContext("2d");

  let sportData = {    // valori distanza percorsa
    running: {
      weekly: organiseData('weekly', arraySettimane, 'distanza', 'running'),
      monthly: organiseData('monthly', arrayMesi, 'distanza', 'running'),
      annual: organiseData('annual', arrayAnni, 'distanza', 'running'),
    },
    cycling: {
      weekly: organiseData('weekly', arraySettimane, 'distanza', 'cycling'),
      monthly: organiseData('monthly', arrayMesi, 'distanza', 'cycling'),
      annual: organiseData('annual', arrayAnni, 'distanza', 'cycling'),
    },
    swimming: {
      weekly: organiseData('weekly', arraySettimane, 'distanza', 'swimming'),
      monthly: organiseData('monthly', arrayMesi, 'distanza', 'swimming'),
      annual: organiseData('annual', arrayAnni, 'distanza', 'swimming'),
    }
  };

  let sportCalorieData = {    // valori calorie bruciate
    running: {
      weekly: organiseData('weekly', arraySettimane, 'calorie', 'running'),
      monthly: organiseData('monthly', arrayMesi, 'calorie', 'running'),
      annual: organiseData('annual', arrayAnni, 'calorie', 'running'),
    },
    cycling: {
      weekly: organiseData('weekly', arraySettimane, 'calorie', 'cycling'),
      monthly: organiseData('monthly', arrayMesi, 'calorie', 'cycling'),
      annual: organiseData('annual', arrayAnni, 'calorie', 'cycling'),
    },
    swimming: {
      weekly: organiseData('weekly', arraySettimane, 'calorie', 'swimming'),
      monthly: organiseData('monthly', arrayMesi, 'calorie', 'swimming'),
      annual: organiseData('annual', arrayAnni, 'calorie', 'swimming'),
    }
  };

  let chart1 = new Chart(ctx1, {    // 1° Grafico (a linee)
    type: "line",
    data: {
      labels: ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"],
      datasets: [{
        label: "Distanza percorsa (km)",
        data: sportData.running.weekly,    // dal contenitore sportData si accede ai dati della corsa (running) su base settimanale (weekly)
        backgroundColor: "rgba(0,191,255,0.6)",
        borderColor: "rgba(0, 191, 255, 1)",
        borderWidth: 2,
        fill: true,   // l'area sottostante la linea del grafico viene colorata
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,   // il grafico si adatta alle dimensioni del contenitore
      scales: {
        x: {
          title: {
            display: true,
            text: 'Settimane',
            font: {
              size: 16,   // Dimensione del font
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,   // Dimensione del font per i ticks (etichette lugngo gli assi)
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Distanza percorsa (km)',
            font: {
              size: 16,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
      },
    },
  });

  let chart2 = new Chart(ctx2, {    // 2° Grafico (a barre)
    type: "bar",
    data: {
      labels: ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"],
      datasets: [{
        label: "Calorie bruciate (kcal)",
        data: sportCalorieData.running.weekly,
        backgroundColor: ["yellow", "orange", "red", "brown", "lightgreen", "skyblue", "blue", "lime", "purple", "yellow", "gray", "green"],
        borderWidth: 2,
        borderColor: "black",
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Settimane',
            font: {
              size: 16,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Calorie bruciate (kcal)',
            font: {
              size: 16,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
      },
    },
  });
  window.changeChart = function (type) {    // Funzione "changeChart" che cambia il tipo di dati visualizzati nei grafici in base all'input dell'utente.

    // Rimuovo la classe active-button da tutti i bottoni
    document.querySelectorAll('.chart-type-button').forEach(button => {
      button.classList.remove('active-button');
    });
  
    // Aggiungi la classe active-button al bottone cliccato
    document.getElementById(type + '-button').classList.add('active-button');
  
    let sport = document.getElementById("sportSelector").value;    // Scelta dello sport
  
    if (type === 'weekly') {
      chart1.data.labels = ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"];   // imposto le etichette dell'asse X
      chart1.data.datasets[0].data = sportData[sport].weekly;    // recupero dei dati
      chart1.options.scales.x.title.text = 'Settimane';    // imposto il titolo dell'asse x
      chart1.update();
  
      chart2.data.labels = ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"];
      chart2.data.datasets[0].data = sportCalorieData[sport].weekly;
      chart2.options.scales.x.title.text = 'Settimane';
      chart2.update();
  
    } else if (type === 'monthly') {
      chart1.data.labels = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
      chart1.data.datasets[0].data = sportData[sport].monthly;
      chart1.options.scales.x.title.text = 'Mesi';
      chart1.update();
  
      chart2.data.labels = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
      chart2.data.datasets[0].data = sportCalorieData[sport].monthly;
      chart2.options.scales.x.title.text = 'Mesi';
      chart2.update();
  
    } else if (type === 'annual') {
      chart1.data.labels = ["2020", "2021", "2022", "2023", "2024"];
      chart1.data.datasets[0].data = sportData[sport].annual;
      chart1.options.scales.x.title.text = 'Anni';
      chart1.update();
  
      chart2.data.labels = ["2020", "2021", "2022", "2023", "2024"];
      chart2.data.datasets[0].data = sportCalorieData[sport].annual;
      chart2.options.scales.x.title.text = 'Anni';
      chart2.update();
    }
  };
}

function organiseData(periodo, array, dato, tipo) {
  let data = [];
  if (periodo == 'weekly') {
    data = [0, 0, 0, 0];
    for (let attivita of array) {
      const date = new Date(attivita.sportDate);
      if ((date.getDate() < 8)&&(attivita.tipo == tipo)) {
        if (dato == 'calorie') {
          data[0] += attivita.calorie;
          } else {
            data[0] += attivita.distanza;
        }  
      } else if ((date.getDate() < 16)&&(attivita.tipo == tipo)) {
          if (dato == 'calorie') {
            data[1] += attivita.calorie;
            } else {
              data[1] += attivita.distanza;
          } 
      } else if ((date.getDate() < 24)&&(attivita.tipo == tipo)) {
        if (dato == 'calorie') {
          data[2] += attivita.calorie;
          } else {
            data[2] += attivita.distanza;
        }
      } else if (attivita.tipo == tipo) {
        if (dato == 'calorie') {
          data[3] += attivita.calorie;
          } else {
            data[3] += attivita.distanza;
        }
      }
    }
  } else if (periodo == 'monthly') {
    data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let attivita of array) {
      const date = new Date(attivita.sportDate);
      for (let i=0; i<12; i++) {
        if ((date.getMonth() == i)&&(attivita.tipo == tipo)) {
          if (dato == 'calorie') {
            data [i] += attivita.calorie;
            } else {
              data [i] += attivita.distanza;
          }
        }
      }
  }
} else {
  const oggi = new Date();
  const anno = oggi.getFullYear();
  for (i=0; i<=(anno-2020); i++) {
    data[i] = parseInt(0);
    for (let attivita of array) {
      const date = new Date(attivita.sportDate);
      if ((date.getFullYear() == (i+2020))&&(attivita.tipo == tipo)) {
        if (dato == 'calorie') {
          data [i] += attivita.calorie
          } else {
            data [i] += attivita.distanza
        }
      }
    }
  }
} 
  return data;
}

getId();
// --- FINE TEST ---
});
