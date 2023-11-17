
function sensores() {
    var display = document.getElementById("sensores_list").style.display;
    if(display == 'block') {
        document.getElementById("sensores_list").style.display = 'none'
    } else {
        document.getElementById("sensores_list").style.display = 'block'
    }

    sensores_list.innerHTML = `
    <div id="sensores_list">
    <button class="sensorButton"> <a href="./sensor1/sensor1.html" rel="noopener noreferrer">Sensor 1</a></button>  <br> <br>
    <button class="sensorButton"> <a href="./sensor2/sensor2.html" rel="noopener noreferrer">Sensor 2</a> </button>  <br> <br>
    <button class="sensorButton"> <a href="./sensor3/sensor3.html" rel="noopener noreferrer">Sensor 3</a></button> 
    </div>`

}

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
      data: [25, 24, 24, 25, 24, 25, 23],
    },
    {
        label: 'Umidade',
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: [64, 65, 65, 64, 63, 64, 65],
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

