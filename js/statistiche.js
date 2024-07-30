document.addEventListener('DOMContentLoaded', function() {
  let ctx1 = document.getElementById("myChart").getContext("2d");
  let ctx2 = document.getElementById("myChart2").getContext("2d");

  let sportData = {    // valori distanza percorsa
    running: {
      daily: [2, 5, 8, 4, 10, 3, 6],
      weekly: [45, 30, 60, 15],
      monthly: [100, 160, 180, 220, 280, 260, 300, 200, 140, 240, 120, 80],
    },
    cycling: {
      daily: [10, 20, 15, 30, 25, 35, 40],
      weekly: [200, 150, 300, 100],
      monthly: [500, 600, 700, 800, 900, 850, 950, 750, 650, 550, 450, 350],
    },
    swimming: {
      daily: [1, 1.5, 2, 1.2, 2.5, 1.8, 2.2],
      weekly: [7, 10, 8, 12],
      monthly: [20, 25, 30, 35, 40, 38, 42, 36, 28, 33, 24, 22],
    }
  };

  let sportCalorieData = {    // valori calorie bruciate
    running: {
      daily: [2000, 2500, 1600, 2800, 1800, 3300, 3000],
      weekly: [11000, 13000, 12500, 14000],
      monthly: [60000, 68000, 62000, 75000, 80000, 72000, 77000, 81000, 83000, 86000, 90000, 88000],
    },
    cycling: {
      daily: [3000, 3500, 2600, 3800, 2800, 4300, 4000],
      weekly: [17000, 19000, 18500, 20000],
      monthly: [90000, 98000, 92000, 105000, 110000, 102000, 107000, 111000, 113000, 116000, 120000, 118000],
    },
    swimming: {
      daily: [1500, 1800, 2000, 1700, 2200, 2100, 2300],
      weekly: [10000, 12000, 11500, 13000],
      monthly: [50000, 54000, 52000, 60000, 63000, 61000, 65000, 66000, 67000, 68000, 70000, 69000],
    }
  };

  let chart1 = new Chart(ctx1, {    // 1° Grafico (a linee)
    type: "line",
    data: {
      labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      datasets: [{
        label: "Distanza percorsa (km)",
        data: sportData.running.daily,    // dal contenitore sportData si accede ai dati della corsa (running) su base giornaliera (daily)
        backgroundColor: "rgba(0,191,255,0.4)",
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
            text: 'Giorni della settimana',
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
      labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      datasets: [{
        label: "Calorie bruciate (kcal)",
        data: sportCalorieData.running.daily,
        backgroundColor: ["yellow", "orange", "red", "brown", "lightgreen", "skyblue", "blue"],
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
            text: 'Giorni della settimana',
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

  window.changeChart = function(type) {    // Funzione "changeChart" che cambia il tipo di dati visualizzati nei grafici in base all'input dell'utente.
    
    // Rimuovo la classe active-button da tutti i bottoni
    document.querySelectorAll('.chart-type-button').forEach(button => {
      button.classList.remove('active-button');
    });

    // Aggiungi la classe active-button al bottone cliccato
    document.getElementById(type + '-button').classList.add('active-button');
    
    let sport = document.getElementById("sportSelector").value;    // Scelta dello sport

    if (type === 'daily') {
      chart1.data.labels = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];   // imposto le etichette dell'asse X
      chart1.data.datasets[0].data = sportData[sport].daily;    // recupero dei dati
      chart1.options.scales.x.title.text = 'Giorni della settimana';    // imposto il titolo dell'asse x
      chart1.update();

      chart2.data.labels = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
      chart2.data.datasets[0].data = sportCalorieData[sport].daily;
      chart2.options.scales.x.title.text = 'Giorni della settimana';
      chart2.update();

    } else if (type === 'weekly') {
      chart1.data.labels = ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"];
      chart1.data.datasets[0].data = sportData[sport].weekly;
      chart1.options.scales.x.title.text = 'Settimane';
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
    }
  };
});