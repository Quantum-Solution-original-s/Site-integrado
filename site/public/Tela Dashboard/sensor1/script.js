let myChart;


// function obterDadosGrafico(idRegistro) {

//     alterarTitulo(idRegistro)
    
//     if (proximaAtualizacao != undefined) {
//         clearTimeout(proximaAtualizacao);
//     }
    
//     fetch(`/medidas/ultimas/${idRegistro}`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (resposta) {
//                 console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
//                 resposta.reverse();
    
//                 plotarGrafico(resposta, idRegistro);
    
//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });
// }


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


        proximaAtualizacao = setTimeout(() => atualizarGrafico(myChart), 2000);   
        // setInterval(() => {
        //     plotarGrafico()
        // }, 2000);
            // obterDados(lm35Temperatura, 'lm35/temperatura');
            // obterDados(chave, 'chave');

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

for (i = 0; i <  resposta.length; i++) {
    var registro = resposta[i];
    
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
  myChart = new Chart(
      document.getElementById(`myChart`),
      config
  );

     setTimeout(() => atualizarGrafico(dados, myChart), 2000);
  
  }

function atualizarGrafico(dados, myChart) {
    fetch(`/medidas/tempo-real`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {
                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico:`);
                    console.log(dados);

                    const ultimoMomento = dados.labels[dados.labels.length - 1];

                    if (novoRegistro[0].hora_e_minutos !== ultimoMomento) {
                        // Atualizar apenas se houver um novo momento
                        dados.labels.shift();
                        dados.labels.push(novoRegistro[0].hora_e_minutos);

                        dados.datasets[0].data.shift();
                        dados.datasets[0].data.push(novoRegistro[0].umidade);

                        myChart.update();
                    } else {
                        console.log("Não há novos dados para atualizar o gráfico.");
                    }

                    // Atualize aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                // Atualize aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            // Atualize aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, myChart), 2000);
        });
    }
}