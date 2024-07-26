document.addEventListener('DOMContentLoaded', function() {
  let ctx1 = document.getElementById("myChart").getContext("2d");
  let ctx2 = document.getElementById("myChart2").getContext("2d");

  let dailyData = {
    labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    datasets: [
      {
        label: "Distanza percorsa (km)",
        data: [2, 5, 8, 4, 10, 3, 6],
        backgroundColor: "rgba(0,191,255,0.4)",
        borderColor: "rgba(0, 191, 255, 1)",
        borderWidth: 2,
        fill: true, //l'area sottostante la linea del grafico viene colorata
      },
    ],
  };

  let weeklyData = {
    labels: ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"],
    datasets: [
      {
        label: "Distanza percorsa (km)",
        data: [45, 30, 60, 15],
        backgroundColor: "rgba(60,179,113,0.4)",
        borderColor: "rgba(60,179,113,1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  let monthlyData = {
    labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
    datasets: [
      {
        label: "Distanza percorsa (km)",
        data: [100, 160, 180, 220, 280, 260, 300, 200, 140, 240, 120, 80],
        backgroundColor: "rgba(255,165,0,0.4)",
        borderColor: "rgba(255,165,0,1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };


  let chart1 = new Chart(ctx1, {
    type: "line",
    data: dailyData,
    options: {
      responsive: true,
      maintainAspectRatio: false, //il grafico si adatta alle dimensioni del contenitore
      scales: {
        x: {
          title: {
            display: true,
            text: 'Giorni della settimana',
            font: {
              size: 16 // Imposta la dimensione del font
            },
            padding: {
              top: 20,
              bottom: 20
            }
          },
          ticks: {
            font: {
              size: 14 // Imposta la dimensione del font per i tick (etichette lugngo gli assi)
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Distanza percorsa (km)',
            font: {
              size: 16
            },
            padding: {
              top: 20,
              bottom: 20
            }
          },
          ticks: {
            font: {
              size: 14
            }
          }
        }
      }
    }
  });
  
// Grafico 2
let xValues = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
let yValues = [2000, 2500, 1600, 2800, 1800, 3300, 3000];
let barColors = ["yellow", "orange", "red", "brown", "lightgreen", "skyblue", "blue"];

let chart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }] //associazione valori tra asse X e asse Y
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
            size: 16
          },
          padding: {
            top: 20,
            bottom: 20
          }
        },
        ticks: {
          font: {
            size: 14
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Calorie bruciate',
          font: {
            size: 16
          },
          padding: {
            top: 20,
            bottom: 20
          }
        },
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  }
});
// Fine Grafico 2

window.changeChart = function(type) { //cambia dinamicamente i dati e le opzioni di visualizzazione dei due grafici, in base a ciò che viene selezionato
  if (type === 'daily') {
    chart1.data = dailyData;
    chart1.options.scales.x.title.text = 'Giorni della settimana'; //configura e aggiorna il titolo dell'asse X
    chart1.update();

    chart2.data.labels = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
    chart2.data.datasets[0].data = [2000, 2500, 1600, 2800, 1800, 3300, 3000]; //accede e modifica i dati del primo dataset
    chart2.update();

  } else if (type === 'weekly') {
    chart1.data = weeklyData;
    chart1.options.scales.x.title.text = 'Settimane';
    chart1.update();

    chart2.data.labels = ["Settimana 1", "Settimana 2", "Settimana 3", "Settimana 4"];
    chart2.data.datasets[0].data = [11000, 13000, 12500, 14000];
    chart2.update();
    
  } else if (type === 'monthly') {
    chart1.data = monthlyData;
    chart1.options.scales.x.title.text = 'Mesi';
    chart1.update();

    chart2.data.labels = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
    chart2.data.datasets[0].data = [60000, 68000, 62000, 75000, 80000, 72000, 77000, 81000, 83000, 86000, 90000, 88000];
    chart2.update();
  }
};
});