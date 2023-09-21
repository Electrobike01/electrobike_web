// REINICIAR PAGINA CADA VEZ QUE ORENTE 

function recargarGirar() {
  // Detecta el evento de cambio de orientación
  window.addEventListener("orientationchange", function () {
    location.reload();
  });
}

// Llama a la función para habilitar el reinicio en cambio de orientación
recargarGirar();



colores = [
  color1 = '#118dd5',
  color2 = '#81d3eb',
  color3 = '#5cc3e2',
  color4 = '#3aa4c4',
  color5 = '#1a7996'
]

// ------------- Consultar datos de las graficas -------------

let anioActual;
let mesActual;

//Creamos funcion que trae los anios del select
TraerAniosAlSelect = async () => {
  var consultaAnios = await fetch(
    "../../controllers/dashboard/consultarAniosSelect.php", {
      method: "POST",
    }
  );

  //Traer mensaje de respuesta desde PHP -----
  var mis_anios = await consultaAnios.json();

  //SELECT GRAFICA 1
  selectAnios = document.getElementById("anios_grafica");
  options = "";
  anios_ = mis_anios.anios;

  for (let i = 0; i < anios_.length; i++) {
    options =
      options +
      `<option value="${anios_[i]["anio"]}" >${anios_[i]["anio"]}</option> \n`;
  }

  selectAnios.innerHTML = options;

  selectAnios = document.getElementById("anios_grafica");

  anioActual = selectAnios.value
  mesActual = mis_anios.mesActu
  console.log(mesActual)

  //SELECT GRAFICA 2
  //Select top productos
  selectTopProd = document.getElementById('select_top')
  if ((mesActual.toString()).length == 1) {
    mesActual = '0' + mesActual
  }
  selectTopProd.value = `${anioActual}-${mesActual}`

  //SELECT GRAFICA 3
  //Select top clientes
  selectTopCli = document.getElementById('select_top_cl')
  if ((mesActual.toString()).length == 1) {
    mesActual = '0' + mesActual
  }
  selectTopCli.value = `${anioActual}-${mesActual}`



};

//Creamos funcion tarjetas
ConsultarTarjetas = async () => {
  // Enviamos la peticion
  var InformacionCards = await fetch(
    "../../controllers/dashboard/consultaTarjetas.php", {
      method: "POST",
    }
  );

  //Traer mensaje de respuesta desde PHP -----
  var resultado = await InformacionCards.json();

  valorCompra = resultado.compras;
  valorVenta = resultado.ventas;
  ganancia = valorVenta - valorCompra;

  if (ganancia < 0) {
    tarjetaGanancia = document.getElementsByClassName('tar3')[0]
    tarjetaGanancia.classList.add('perdida')
    ganancia_ = "-" + formatearNumero(ganancia * -1) + " $";
  } else {
    ganancia_ = "+" + formatearNumero(ganancia) + " $";
  }

  // --------- Reemplazamos los valores de las tarjetas -----------
  document.getElementById("cant_compras").innerHTML =
    formatearNumero(valorCompra) + " $";
  document.getElementById("cant_ventas").innerHTML =
    formatearNumero(valorVenta) + " $";
  document.getElementById("cant_ganancias").innerHTML = ganancia_;



  document.getElementById("mejor_cliente").innerHTML = resultado.cliente;
};

//Creamos funcion grafica compras y ventas
let lineChart1;
ConsultarGraficaComprasVentas = async (anio) => {
  // Se envian los datos en .json ----------
  fechaAnio = new FormData();
  fechaAnio.append("anio", anio);

  var consultaGrafica = await fetch(
    "../../controllers/dashboard/consultarGraficaComprasVentas.php", {
      method: "POST",
      body: fechaAnio,
    }
  );

  //Traer mensaje de respuesta desde PHP -----
  var datosGrafica = await consultaGrafica.json();

  datosCompras = Object.values(datosGrafica.datosCompra);
  datosVentas = Object.values(datosGrafica.datosVenta);


  // Datos del gráfico 1 (ejemplo)
  data1 = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Ocrubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [{
        label: "Compras",
        data: datosCompras,
        borderColor: color1,

        borderWidth: 2,
      },
      {
        label: "Ventas",
        data: datosVentas,
        borderColor: color2,

        borderWidth: 2,
      },
    ],
  };

  // Configuración del gráfico
  config1 = {
    type: "line",
    data: data1,
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Meses",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Pesos",
          },
        },
      },
    },
  };

  // Crear el gráfico
  if (lineChart1) {
    lineChart1.data = data1;
    lineChart1.update();
  } else {
    lineChart1 = new Chart(document.getElementById("line-chart1"), config1);

  }
};


//Creamos funcion grafica productos en stock
ConsultarGraficaProductosStock = async () => {

  var consultaGrafica = await fetch(
    "../../controllers/dashboard/consultarGraficaProductosStock.php", {
      method: "POST",
    }
  );

  //Traer mensaje de respuesta desde PHP -----
  var datosGrafica = await consultaGrafica.json();

  dataCantidades = datosGrafica.cantidades
  dataCategorias = datosGrafica.categorias


  // <!-- Grafico de tortas -->
  // Datos del gráfico
  data = {
    datasets: [{
      data: dataCantidades,
      backgroundColor: colores,
    }, ],
    labels: dataCategorias,
  };

  // Configuración del gráfico
  config = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              label = context.label || "";
              value = context.raw || "";
              return label + ": " + value;
            },
          },
        },
      },
    },
  };

  // Crear el gráfico
  pieChart = new Chart(document.getElementById("pie-chart"), config);

}

//Creamos funcion grafica top 5 productos
let lineChart2;
ConsultarGraficaTop5Productos = async (anio, mes) => {

  // Se envian los datos en .json ----------
  fecha = new FormData();
  fecha.append("anio", anio);
  fecha.append("mes", mes);

  var consultaGrafica = await fetch(
    "../../controllers/dashboard/consultarGraficaTop5Productos.php", {
      method: "POST",
      body: fecha,
    }
  );

  //Traer mensaje de respuesta desde PHP -----
  var datosGrafica = await consultaGrafica.json();

  dataNombreProductos = datosGrafica.nombreProductos
  dataCantidadProductos = datosGrafica.cantidadProductos

  data2 = {
    labels: dataNombreProductos,
    datasets: [{
      label: "Top 5 Productos mas vendidos",
      data: dataCantidadProductos,
      borderColor: colores,
      backgroundColor: colores,
      borderWidth: 2,
    }, ],
  };

  // Configuración del gráfico
  config2 = {
    type: "bar",
    data: data2,
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
        },
      },
    },
  };


  if (lineChart2) {
    lineChart2.data = data2;
    lineChart2.update();
  } else {
    // Crear el gráfico
    lineChart2 = new Chart(document.getElementById("line-chart2"), config2);
  }

}

//Creamos funcion grafica top 5 clientes
let miGrafica;
ConsultarGraficaTop5Clientes = async (anio, mes) => {

  // Se envian los datos en .json ----------
  fecha = new FormData();
  fecha.append("anio", anio);
  fecha.append("mes", mes);

  var consultaGrafica = await fetch(
    "../../controllers/dashboard/consultarGraficaTop5Clientes.php", {
      method: "POST",
      body: fecha,
    }
  );

  //Traer mensaje de respuesta desde PHP -----
  var datosGrafica = await consultaGrafica.json();

  dataNombreClientes = datosGrafica.nombreCliente
  dataCantidadVenta = datosGrafica.cantidadVenta

  // Datos para la gráfica de barras
  var datosBarras = {
    labels: dataNombreClientes,
    datasets: [{
      label: "Top 5 Clientes",
      backgroundColor: colores,
      borderColor: colores,
      borderWidth: 1,
      data: dataCantidadVenta,
    }]
  };

  // Opciones de la gráfica
  var config3 = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Ya existe una grafica
  if (miGrafica) {
    miGrafica.data = datosBarras;
    miGrafica.update();
  } else {


    // Obtener el contexto del lienzo
    var ctx = document.getElementById('miGrafica').getContext('2d');
    // Crear la gráfica de barras
    miGrafica = new Chart(ctx, {
      type: 'bar',
      data: datosBarras,
      options: config3
    });
  }




}


// ----------- Creamos los selects para filtrar las graficas -----------
//Select Compras y ventas
selectAnios = document.getElementById("anios_grafica");
selectAnios.addEventListener("change", () => {
  //Aqui creo el otro grafico
  ConsultarGraficaComprasVentas(selectAnios.value);
});

//Select Top 5 productos
selectTopProd = document.getElementById('select_top')
selectTopProd.addEventListener('change', () => {

  //Obtenemos los valores de la fecha en select pie
  partes = selectTopProd.value.split("-");
  anioPie = partes[0]
  mesPie = partes[1]

  //Aqui creo el otro grafico
  ConsultarGraficaTop5Productos(anioPie, mesPie)

})

//Select Top 5 clientes
selectTopCli = document.getElementById('select_top_cl')
selectTopCli.addEventListener('change', () => {
  //Obtenemos los valores de la fecha en select
  partes = selectTopCli.value.split("-");
  anio_ = partes[0]
  mes_ = partes[1]

  console.log(partes)
  //Aqui creo el otro grafico
  ConsultarGraficaTop5Clientes(anio_, mes_)

})


// ----------- Llamamos todas las funciones al cargar la pagina -----------

//Llamamos funcion tarjetas
ConsultarTarjetas();

//Llamamos funcion grafica productos stock
ConsultarGraficaProductosStock()

//Llamamos las funciones
TraerAniosAlSelect().then(() => {
  ConsultarGraficaComprasVentas(anioActual);
  ConsultarGraficaTop5Productos(anioActual, mesActual)
  ConsultarGraficaTop5Clientes(anioActual, mesActual)
});