document.addEventListener('DOMContentLoaded', function () {
  let ctx1 = document.getElementById("myChart").getContext("2d");
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