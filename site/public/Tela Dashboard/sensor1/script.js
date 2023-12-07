function obterDadosGrafico(idRegistro) {

    alterarTitulo(idRegistro)
    
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }
    
    fetch(`/medidas/ultimas/${idRegistro}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
    
                plotarGrafico(resposta, idRegistro);
    
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


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
    window.onload = capturaGrafico()

function capturaGrafico() {


    fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

        setInterval(() => {
            capturaGrafico();
            capturaGrafico();
            // obterDados(luminosidade, 'luminosidade');
            // obterDados(lm35Temperatura, 'lm35/temperatura');
            // obterDados(chave, 'chave');
        }, 1000);

}


function plotarGrafico(resposta) {


  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [

  ];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
      labels: labels,
      datasets: [{
          label: 'Temperatura',
          data: [],
          fill: false,
          backgroundColor: 'rgb(255,0,0)',
          borderColor: 'rgb(255,0,0)',
          tension: 0.1
      },
    ]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico

var contador = 0


for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    
    contador++
    // labels.push(registro.Tentativas);
    dados.labels.push(registro.hora_e_minutos)
    dados.datasets[0].data.push(registro.umidade);

    // dados.datasets[1].labels.push(registro.tentativas);
}

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'line',
    data: dados,
};

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
      document.getElementById(`myChart`),
      config
  );

  setTimeout(() => atualizarGrafico(dados, myChart), 2000);
  }

  function atualizarGrafico(dados, myChart) {

    fetch(`/medidas/tempo-real`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
    
                obterdados();
                // alertar(novoRegistro, idRegistro);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);
    
                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
    
                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade
    
                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura
    
                    myChart.update();
                }
    
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    
    }

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
    window.onload = capturaGrafico()

function capturaGrafico() {


    fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

        
}


function plotarGrafico(resposta) {


  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [

  ];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
      labels: labels,
      datasets: [{
          label: 'Umidade',
          data: [],
          fill: false,
          backgroundColor: 'rgb(34,139,34)',
          borderColor: 'rgb(34,139,34)',
          tension: 0.1
      },
    ]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico

var contador = 0


for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    
    contador++
    // labels.push(registro.Tentativas);
    dados.labels.push(registro.hora_e_minutos)
    dados.datasets[0].data.push(registro.temperatura);

    // dados.datasets[1].labels.push(registro.tentativas);
}

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'line',
    data: dados,
};

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
      document.getElementById(`myChart`),
      config
  );

  // setTimeout(() => atualizarGrafic, dados, myChart), 2000);
  }
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
    window.onload = capturaGrafico()

    function capturaGrafico() {
    
    
        fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
    
                    plotarGrafico(resposta);
    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    
            
    }
    
    
    function plotarGrafico(resposta) {
    
    
      console.log('iniciando plotagem do gráfico...');
    
      // Criando estrutura para plotar gráfico - labels
      let labels = [
    
      ];
    
      // Criando estrutura para plotar gráfico - dados
      let dados = {
          labels: labels,
          datasets: [{
              label: 'Temperatura',
              data: [],
              fill: false,
              backgroundColor: 'rgb(255,0,0)',
              borderColor: 'rgb(255,0,0)',
              tension: 0.1
          }
]
      };
    
      console.log('----------------------------------------------')
      console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
      console.log(resposta)
    
      // Inserindo valores recebidos em estrutura para plotar o gráfico
    
    var contador = 0
    
    
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        
        contador++
        // labels.push(registro.Tentativas);
        dados.labels.push(registro.hora_e_minutos)
        dados.datasets[0].data.push(registro.temperatura);
    
        // dados.datasets[1].labels.push(registro.tentativas);
    }
    
      console.log('----------------------------------------------')
      console.log('O gráfico será plotado com os respectivos valores:')
      console.log('Labels:')
      console.log(labels)
      console.log('Dados:')
      console.log(dados.datasets)
      console.log('----------------------------------------------')
    
      // Criando estrutura para plotar gráfico - config
      const config = {
        type: 'line',
        data: dados,
    };
    
      // Adicionando gráfico criado em div na tela
      let myChart = new Chart(
          document.getElementById(`myChart`),
          config
      );
    
      // setTimeout(() => atualizarGrafic, dados, myChart), 2000);
      }
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

    window.onload = capturaGrafico()

    function capturaGrafico() {
    
    
        fetch(`/medidas/ultimas`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
    
                    plotarGrafico(resposta);
    
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    
            
    }
    
    
    function plotarGrafico(resposta) {
    
    
      console.log('iniciando plotagem do gráfico...');
    
      // Criando estrutura para plotar gráfico - labels
      let labels = [
    
      ];
    
      // Criando estrutura para plotar gráfico - dados
      let dados = {
          labels: labels,
          datasets: [{
              label: 'Temperatura',
              data: [],
              fill: false,
              backgroundColor: 'rgb(255,0,0)',
              borderColor: 'rgb(255,0,0)',
              tension: 0.1
          },
          {
            label: 'Umidade',
            data: [],
            fill: false,
            backgroundColor: 'rgb(34,139,34)',
            borderColor: 'rgb(34,139,34)',
            tension: 0.1
        }]
      };
    
      console.log('----------------------------------------------')
      console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
      console.log(resposta)
    
      // Inserindo valores recebidos em estrutura para plotar o gráfico
    
    var contador = 0
    
    
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        
        contador++
        // labels.push(registro.Tentativas);
        dados.labels.push(registro.hora_e_minutos)
        dados.datasets[0].data.push(registro.umidade);
        
        dados.datasets[1].data.push(registro.temperatura);
        

        // dados.datasets[1].labels.push(registro.tentativas);
    }
    
      console.log('----------------------------------------------')
      console.log('O gráfico será plotado com os respectivos valores:')
      console.log('Labels:')
      console.log(labels)
      console.log('Dados:')
      console.log(dados.datasets)
      console.log('----------------------------------------------')
    
      // Criando estrutura para plotar gráfico - config
      const config = {
        type: 'line',
        data: dados,
    };
    
      // Adicionando gráfico criado em div na tela
      let myChart = new Chart(
          document.getElementById(`myChart`),
          config
      );
    
      // setTimeout(() => atualizarGrafic, dados, myChart), 2000);
      }
}

