document.addEventListener('DOMContentLoaded', function() {
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
      type: "line",
      data: {
          labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
          datasets: [
              {
                  label: "Distanza percorsa (km)",
                  data: [2, 5, 8, 4, 10, 3, 6], // valori asse y
                  backgroundColor: "rgba(0,191,255,0.4)",
                  borderColor: "rgba(0, 191, 255, 1)",
                  borderWidth: 2, // spessore bordo
                  fill: true, // per colorare l'area sotto la linea
              },
          ],
      },
      options: {
          responsive: true, // grafico responsive
          maintainAspectRatio: false, // permette al grafico di adattarsi al contenitore
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Giorni della settimana',
                      padding: {
                          top: 20, // margine sopra il titolo dell'asse x
                          bottom: 20 // margine sotto il titolo dell'asse x
                      }
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Distanza percorsa (km)',
                      padding: {
                          top: 20, // margine sopra il titolo dell'asse y
                          bottom: 20 // margine sotto il titolo dell'asse y
                      }
                  }
              }
          }
      }
  });
});



// Grafico 2
let xValues = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
let yValues = [1600, 1800, 2000, 2500, 2800, 3000, 3300, 3500];
let barColors = ["yellow", "orange", "red", "brown", "green", "heavenly","blue"];

new Chart("myChart2", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Calorie bruciate"
    }
  }
});