function fecharGrafico() {

    Graficos.innerHTML = ""
    
    var display = document.getElementById("grafico1").style.display;
    if(display == 'flex') {
        document.getElementById("grafico1").style.display = 'block'
    } else {
        document.getElementById("grafico1").style.display = 'flex'
    }

    var display = document.getElementById("grafico2").style.display;
    if(display == 'flex') {
        document.getElementById("grafico2").style.display = 'block'
    } else {
        document.getElementById("grafico2").style.display = 'flex'
    }

    var display = document.getElementById("grafico3").style.display;
    if(display == 'flex') {
        document.getElementById("grafico3").style.display = 'block'
    } else {
        document.getElementById("grafico3").style.display = 'flex'
    }
    
    var display = document.getElementById("grafico4").style.display;
    if(display == 'flex') {
        document.getElementById("grafico4").style.display = 'block'
    } else {
        document.getElementById("grafico4").style.display = 'flex'
    }

}

// grafico 1
function grafico1() {

    var display = document.getElementById("grafico1").style.display;
    if(display == 'none') {
        document.getElementById("grafico1").style.display = 'block'
    } else {
        document.getElementById("grafico1").style.display = 'none'
    }

    var display = document.getElementById("grafico2").style.display;
    if(display == 'none') {
        document.getElementById("grafico2").style.display = 'block'
    } else {
        document.getElementById("grafico2").style.display = 'none'
    }

    var display = document.getElementById("grafico3").style.display;
    if(display == 'none') {
        document.getElementById("grafico3").style.display = 'block'
    } else {
        document.getElementById("grafico3").style.display = 'none'
    }
    
    var display = document.getElementById("grafico4").style.display;
    if(display == 'none') {
        document.getElementById("grafico4").style.display = 'block'
    } else {
        document.getElementById("grafico4").style.display = 'none'
    }

    Graficos.innerHTML = `
    <div>
      <button class="buttonGraficoTemp" onclick="fecharGrafico()">X</button> <br>
      <canvas style="position: relative; height:62vh; width:62vw" class="graficoTemp" id="myChart"></canvas>
    </div>`

    const labels = [
        '00:00',
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'Temperatura',
          backgroundColor: 'red',
          borderColor: 'rgb(255, 99, 132)',
          data: [20, 21, 24, 24, 25, 27, 28, 28, 27, 25, 24, 22],
        }]
    };

      const config = {
        type: 'line',
        data: data,
      };

      const myChart = new Chart(
        document.getElementById('myChart'),
        config
        );
}

// grafico2
function grafico2() {

    var display = document.getElementById("grafico1").style.display;
    if(display == 'none') {
        document.getElementById("grafico1").style.display = 'block'
    } else {
        document.getElementById("grafico1").style.display = 'none'
    }

    var display = document.getElementById("grafico2").style.display;
    if(display == 'none') {
        document.getElementById("grafico2").style.display = 'block'
    } else {
        document.getElementById("grafico2").style.display = 'none'
    }
    
    var display = document.getElementById("grafico3").style.display;
    if(display == 'none') {
        document.getElementById("grafico3").style.display = 'block'
    } else {
        document.getElementById("grafico3").style.display = 'none'
    }

    var display = document.getElementById("grafico4").style.display;
    if(display == 'none') {
        document.getElementById("grafico4").style.display = 'block'
    } else {
        document.getElementById("grafico4").style.display = 'none'
    }

    Graficos.innerHTML = `
    <div>
      <button class="buttonGraficoTemp" onclick="fecharGrafico()">X</button> <br>
      <canvas style="position: relative; height:62vh; width:62vw" class="graficoTemp" id="myChart"></canvas>
    </div>`

    const labels = [
        '00:00',
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'Umidade',
          backgroundColor: 'blue',
          borderColor: 'blue)',
          data: [60, 61, 62, 62, 63, 64, 64, 64, 65, 65, 64, 65],
        }]
    };

      const config = {
        type: 'line',
        data: data,
      };

      const myChart = new Chart(
        document.getElementById('myChart'),
        config
        );
}

// grafico 3
function grafico3() {
    var display = document.getElementById("grafico1").style.display;
    if(display == 'none') {
        document.getElementById("grafico1").style.display = 'block'
    } else {
        document.getElementById("grafico1").style.display = 'none'
    }

    var display = document.getElementById("grafico2").style.display;
    if(display == 'none') {
        document.getElementById("grafico2").style.display = 'block'
    } else {
        document.getElementById("grafico2").style.display = 'none'
    }
    
    var display = document.getElementById("grafico3").style.display;
    if(display == 'none') {
        document.getElementById("grafico3").style.display = 'block'
    } else {
        document.getElementById("grafico3").style.display = 'none'
    }

    var display = document.getElementById("grafico4").style.display;
    if(display == 'none') {
        document.getElementById("grafico4").style.display = 'block'
    } else {
        document.getElementById("grafico4").style.display = 'none'
    }

    Graficos.innerHTML = `
    <div>
      <button class="buttonGraficoTemp" onclick="fecharGrafico()">X</button> <br>
      <canvas style="position: relative; height:62vh; width:62vw" class="graficoTemp" id="myChart"></canvas>
    </div>>`

    const labels = [
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'Temperatura',
          backgroundColor: 'red',
          borderColor: 'red',
          data: [24, 24, 25, 24, 24, 23, 23],
        },
        {
            label: 'Umidade',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [65, 65, 64, 64, 63, 63, 63],
          }]
    };

      const config = {
        type: 'bar',
        data: data,
      };
      

      const myChart = new Chart(
        document.getElementById('myChart'),
        config
        );

}

// function sensores() {
//     var display = document.getElementById("sensores_list").style.display;
//     if(display == 'block') {
//         document.getElementById("sensores_list").style.display = 'none'
//     } else {
//         document.getElementById("sensores_list").style.display = 'block'
//     }

//     sensores_list.innerHTML = `
//     <div id="sensores_list">
//     <button class="sensorButton"> <a href="sensor1.html" rel="noopener noreferrer">Sensor 1</a></button>  <br>
//     <button class="sensorButton"> <a href="sensor2.html" rel="noopener noreferrer">Sensor 2</a> </button>  <br>
//     <button class="sensorButton"> <a href="sensor3.html" rel="noopener noreferrer">Sensor 3</a></button> 
//     </div>`

// }

// grafico 4
// grafico2
function grafico4() {

    var display = document.getElementById("grafico1").style.display;
    if(display == 'none') {
        document.getElementById("grafico1").style.display = 'block'
    } else {
        document.getElementById("grafico1").style.display = 'none'
    }

    var display = document.getElementById("grafico2").style.display;
    if(display == 'none') {
        document.getElementById("grafico2").style.display = 'block'
    } else {
        document.getElementById("grafico2").style.display = 'none'
    }
    
    var display = document.getElementById("grafico3").style.display;
    if(display == 'none') {
        document.getElementById("grafico3").style.display = 'block'
    } else {
        document.getElementById("grafico3").style.display = 'none'
    }

    var display = document.getElementById("grafico4").style.display;
    if(display == 'none') {
        document.getElementById("grafico4").style.display = 'block'
    } else {
        document.getElementById("grafico4").style.display = 'none'
    }

    Graficos.innerHTML += `
    <div>
      <button class="buttonGraficoTemp" onclick="fecharGrafico()">X</button> <br>
      <canvas style="position: relative; height:62vh; width:62vw" class="graficoTemp" id="myChart"></canvas>
    </div>`

    const labels = [
        '00:00',
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'Temperatura',
          backgroundColor: 'blue',
          borderColor: 'blue)',
          data: [20, 21, 24, 24, 25, 27, 28, 28, 27, 25, 24, 22],
        },
        {
            label: 'Umidade',
            backgroundColor: 'red',
            borderColor: 'red',
            data: [60, 61, 62, 62, 63, 64, 64, 64, 65, 65, 64, 65],
          }
        ]
    };

      const config = {
        type: 'line',
        data: data,
      };

      const myChart = new Chart(
        document.getElementById('myChart'),
        config
        );
}