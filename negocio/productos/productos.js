var ModuloActual = document.getElementById("ModuloActual");
var valorModulo = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;

// ----------------------- DIVIDIR MODULOS EN REGISTRAR Y LISTAR -------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- REGISTRAR -------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
if (valorSubModuloActual == "registrar") {
  const Registrar = async (nombreProducto_, categoriaProducto_) => {
    // Se envian los datos en .json ----------
    const datosRg = new FormData();
    datosRg.append("nombreProducto", nombreProducto_);
    datosRg.append("categoriaProducto", categoriaProducto_);

    var registrarProductos = await fetch(
      "../../controllers/productos/registrar.php", {
        method: "POST",
        body: datosRg,
      }
    );

    setTimeout(() => {
      Swal.fire({
        title: "Producto registrado! ",
        text: "Se ha registrado un producto",
        icon: "success",
        confirmButtonText: "Cofirmar",
        timer: 1200,
        timerProgressBar: true,
        position: "bottom-end",
        showConfirmButton: false,
        confirmButtonColor: "#118dd5",
        confirmButtonAriaLabel: "Confirmar",
        allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
        allowEscapeKey: false, // Evita que la alerta se cierre al presionar la tecla "Esc"
      }).then(() => {
        window.location.href = "../../views/productos/listar.php";
      });
    }, 1000)
  };

  const Validar = async () => {

    var nombreProducto = document.getElementById("nombreProducto").value.trim();
    var categoriaProducto = document
      .getElementById("categoriaProducto")
      .value.trim();

    if (
      nombreProducto.trim() == "" ||
      categoriaProducto.trim() == "Seleccione una categoria"
    ) {
      Swal.fire({
        title: "Campos vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
      registrar.disabled = false;
    } else {
      //----------- Validar si estan repetidos -------
      registrar.disabled = true;

      // Solo se envian los necesarios ----------
      const datosCl = new FormData();
      datosCl.append("nombreProducto", nombreProducto);
      datosCl.append("categoriaProducto", categoriaProducto);

      var consultaProductos = await fetch(
        "../../controllers/productos/repetidos.php", {
          method: "POST",
          body: datosCl,
        }
      );

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaProductos.json();

      //---- Si alguno esta repetido ERROR
      if (resultado.success == false) {
        setTimeout(() => {
          Swal.fire({
            title: resultado.title,
            text: resultado.mensaje,
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        }, 1000)

        registrar.disabled = false;

      } else {
        registrar.disabled = true;
        Registrar(nombreProducto, categoriaProducto);
      }
    }
  };

  const CargarRegistro = () => {

    Swal.fire({
      icon: 'info',
      title: 'Registrando...',
      html: 'Por favor espere',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading()

        try {
          // Llamada a la función asíncrona     
          await Validar(); // 
          // La función asíncrona ha terminado, cierra la alerta

        } catch (error) {
          registrar.disabled = false;
          // Ocurrió un error en la función asíncrona
          setTimeout(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error de red',
              text: 'No hemos podido conectar con el servidor. Por favor intente nuevamente',
              type: 'error',
              showConfirmButton: false,
              confirmButtonText: "Cofirmar",
              timerProgressBar: true,
              position: "bottom-end",
              confirmButtonColor: "#118dd5",
              confirmButtonAriaLabel: "Confirmar",
            });

          }, 1500)

        }
      }
    })


  }

  //Llamamos el boton registrar -------------
  var registrar = document.getElementById("registrar");

  registrar.addEventListener("click", () => {
    registrar.disabled = true;
    CargarRegistro()
  });
}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- LISTAR ----------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
if (valorSubModuloActual == "listar" || valorSubModuloActual == "categorias") {
  // ------------ Creamos funcion lista  -------------

  categoria_lista = document.getElementById('categoria_lista')

  if (categoria_lista) {
    categoria_lista = categoria_lista.innerHTML
  } else {
    categoria_lista = ''
  }

  // ======================== VALIDAR SI HAY COMPRAS O VENTAS CON ESE PRODUCTO =========================================
  const validarCamposAsc = async (idProducto, pos) => {
    // Se envian los datos en .json ----------
    const datosVal = new FormData();
    datosVal.append("idProducto", idProducto);


    var consultaEliminarAs = await fetch("../../controllers/productos/validarAsociados.php", {
      method: 'POST',
      body: datosVal
    });

    //Traer mensaje de respuesta desde PHP -----
    var resultadoAsc = await consultaEliminarAs.json();

    if (resultadoAsc['success'] != false) {
      // Se agrega la clase que ocutla el boton
      btnEliminar = document.getElementsByClassName('eliminar');
      btnEliminar[pos].style.display = 'inline'


    }
  }


  listar = (data) => {

    contenido = document.getElementById("contenido");
    contenido.innerHTML = "";

    for (let i = 0; i < (data).length; i++) {

      fila = document.createElement("tr");
      fila.innerHTML = `
    <td data-label="ID" class="text-center idProducto">${data[i]['idProducto']}</td>
    <td data-label="Producto" class="text-center nombreProducto">${data[i]['nombreProducto']}</td>
    <td data-label="Cantidad" class="text-center cantidadProducto">${data[i]['cantidadProducto']}</td>
    <td data-label="Categoría" class="text-center categoriaProducto">${data[i]['categoriaProducto']}</td>
    <td data-label="Estado" class="text-center ${data[i]['estadoProducto']} estadoModulo">${data[i]['estadoProducto']}</td>

    <td data-label="Acciones" class="text-center">
        <button class="Btn botonActualizarModulo${i+1}">
        Editar
            <svg class="svg" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
        </button>
    </td>

`
      modal = document.createElement("div");

      if (data[i]['estadoProducto'] == 'Activo') {
        opEs = `<option>Inactivo</option>`
      } else {
        opEs = `<option>Activo</option>`
      }

      if (data[i]['categoriaProducto'] == 'Bicicletas alta gama') {
        opCat = `
      <option>Bicicletas baja gama</option>
      <option>Repuestos alta gama</option>
      <option>Repuestos baja gama</option>
      `
      } else if (data[i]['categoriaProducto'] == 'Bicicletas baja gama') {
        opCat = `
      <option>Bicicletas alta gama</option>
      <option>Repuestos alta gama</option>
      <option>Repuestos baja gama</option>
      `
      } else if (data[i]['categoriaProducto'] == 'Repuestos alta gama') {
        opCat = `
      <option>Bicicletas alta gama</option>
      <option>Bicicletas baja gama</option>
      <option>Repuestos baja gama</option>
      `
      } else if (data[i]['categoriaProducto'] == 'Repuestos baja gama') {
        opCat = `
      <option>Bicicletas alta gama</option>
      <option>Bicicletas baja gama</option>
      <option>Repuestos alta gama</option>
      `
      }


      modal.innerHTML = `

<form action="../../controllers/clientes/actualizar.php" method="POST">

  <div class="contenedorActualizarModulo">
      <h1 class="tituloVentana">Actualizar Producto</h1>

      <div class="contenedorActualizar">
          <div class="" id="">
              <label class="formulario__label">ID </label>
              <div class=""><input type="text" class="form-control idProducto_" value="${data[i]['idProducto']}" disabled>
              </div>
          </div>

          <div class="" id="">
              <label class="formulario__label">Nombre<i style="color:red">*</i> </label>
              <div><input type="text" class="form-control nombreProductoActualizado " value="${data[i]['nombreProducto']}" >
              </div>

          </div>

          <div class="">

              <label class="formulario__label">Estado<i style="color:red">*</i></label>
              <select class="form-select estadoProductoActualizado" name="estadoProducto" id="">
                  <option selected>${data[i]['estadoProducto']}</option>
                  ${opEs}
                  
              </select>
              <div id='mensaje' class='mensaje'></div>
          </div>


          <div class="">
              <label class="formulario__label">Categoria<i style="color:red">*</i></label>
              <select class="form-select categoriaProductoActualizado" name="categoriaProducto" id="">
                  <option selected>${data[i]['categoriaProducto']}</option>
                  ${opCat}
                  
              </select>
          </div>

          <div class="">
              <label for="password2" class="formulario__label">Cantidad </label>
              <div class="formulario__grupo-input">
                  <input type="text" class="form-control cantidadProductoActualizado"  value="${data[i]['cantidadProducto']}" disabled>
              </div>
          </div>

      </div>


      <div class="contenedorBotones">

          <div class="botonGuardar">
              <button type="button" class="btn btn-primary guardarProductos${i+1}" name="guardarProductos" id='guardarProductos'> Guardar </button>
          </div>

          <div class="botonEliminar">
              <button type="button" style="display:none" class="eliminar btn btn-danger">Eliminar </button>
          </div>

          <div class="botonCerrar">
              <a href="#" class="cerrarVentana btn btn-secondary cerrarVentana${i+1}">Cerrar</a>
          </div>

      </div>
</form>
                  
`
      modal.classList.add(`ventaActualizarModulos${i+1}`)
      modal.classList.add("ventaActualizarModulo")

      // Agregamos a la clase contenido los td
      contenido.appendChild(fila)
      contenido.appendChild(modal)

    }

    //--------------------- EDITAR PRODUCTOS ------------------
    //Se capturan las ventanas modales y se cuentan
    var totalReg = document.querySelectorAll(".ventaActualizarModulo").length;
    console.log(totalReg)

    // Se guardan las listas con los elemntos ventana y boton cerrar
    actualizarModulos = [];
    cerrarVentanas = [];
    ventanaActualizarModulos = [];

    for (let o = 0; o < totalReg; o++) {
      actualizarModulos.push(
        document.querySelector(".botonActualizarModulo" + (o + 1))
      );
      cerrarVentanas.push(document.querySelector(".cerrarVentana" + (o + 1)));
      ventanaActualizarModulos.push(
        document.querySelector(".ventaActualizarModulos" + (o + 1))
      );

      actualizarModulos[o].addEventListener("click", (e) => {
        idProducto = document.getElementsByClassName('idProducto_')[o].value

        validarCamposAsc(idProducto, o)

        e.preventDefault();
        document.querySelector('.animate-in-ov').classList.add('body-sin-scroll');
        ventanaActualizarModulos[o].classList.add("ventaActualizarModulos--show");

        cantProducto = document.getElementsByClassName('cantidadProductoActualizado')[o + 1].value
        estadoProducto_ = document.getElementsByClassName('estadoProductoActualizado')[o + 1]
        // mensaje_ = document.getElementsByClassName('mensaje')[o]
        mensaje_ = document.getElementById('mensaje')

        console.log(estadoProducto_)
        if (cantProducto != 0) {
          estadoProducto_.disabled = true

        }



      });


      cerrarVentanas[o].addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('.animate-in-ov').classList.remove('body-sin-scroll');
        ventanaActualizarModulos[o].classList.remove(
          "ventaActualizarModulos--show"
        );
      });
    }


    for (let x = 0; x < totalReg; x++) {

      //--------------------------------- METODO EDITAR ---------------------------------------
      const Editar = async (idProducto_, nombreProductoActualizado_,
        cantidadProductoActualizado_, categoriaProductoActualizado_, estadoProductoActualizado_) => {

        // Se envian los datos en .json ----------
        const datosAc = new FormData();
        datosAc.append("idProducto", idProducto_);
        datosAc.append("nombreProducto", nombreProductoActualizado_);
        datosAc.append("cantidadProducto", cantidadProductoActualizado_);
        datosAc.append("categoriaProducto", categoriaProductoActualizado_);
        datosAc.append("estadoProducto", estadoProductoActualizado_);



        var actualizarProductos = await fetch("../../controllers/productos/actualizar.php", {
          method: 'POST',
          body: datosAc
        });

        setTimeout(() => {
          Swal.fire({
            title: 'Producto actualizado! ',
            text: 'Se ha actualizado un productos',
            icon: "success",
            confirmButtonText: "Cofirmar",
            timer: 1200,
            timerProgressBar: true,
            position: "center",
            showConfirmButton: false,
            confirmButtonColor: '#118dd5',
            confirmButtonAriaLabel: 'Confirmar',
          }).then(() => {
            window.location.href = '../../views/productos/listar.php'
          });
        }, 1000)




      }

      guardarProductos = document.getElementsByClassName(`guardarProductos${x + 1}`);

      guardarProductos[0].addEventListener("click", () => {

        const Validar = async () => {

          var idProducto = document.getElementsByClassName("idProducto_")[x].value.trim();
          var nombreProductoActualizado = document.getElementsByClassName("nombreProductoActualizado")[x].value.trim();
          var estadoProductoActualizado = document.getElementsByClassName("estadoProductoActualizado")[x].value.trim();
          var categoriaProductoActualizado = document.getElementsByClassName("categoriaProductoActualizado")[x].value.trim();
          var cantidadProductoActualizado = document.getElementsByClassName("cantidadProductoActualizado")[x].value.trim();

          if (nombreProductoActualizado.trim() === "") {
            Swal.fire({
              title: "Campos vacios",
              text: "Por favor llene todos los campos",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else {
            // Validar si está repeitdo dentro de la categoria
            const datosCl = new FormData();
            datosCl.append("idProducto", idProducto);
            datosCl.append("nombreProducto", nombreProductoActualizado);
            datosCl.append("categoriaProducto", categoriaProductoActualizado);

            var consulta1Productos = await fetch("../../controllers/productos/validarActualizar.php", {
              method: "POST",
              body: datosCl,
            });
            //Traer mensaje de respuesta desde PHP -----
            var resultado = await consulta1Productos.json()
            if (resultado.success == false) {
              setTimeout(() => {
                Swal.fire({
                  title: resultado.title,
                  text: resultado.mensaje,
                  icon: "warning",
                  confirmButtonColor: "#118dd5",
                });
              }, 1000)

            } else {
              Editar(idProducto, nombreProductoActualizado,
                cantidadProductoActualizado, categoriaProductoActualizado, estadoProductoActualizado)
            }
          }
        }

        const CargarActualizar = () => {

          Swal.fire({
            icon: 'info',
            title: 'Actualizando...',
            html: 'Por favor espere',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: async () => {
              Swal.showLoading()

              try {
                // Llamada a la función asíncrona     
                await Validar();
                // La función asíncrona ha terminado, cierra la alerta

              } catch (error) {

                // Ocurrió un error en la función asíncrona
                setTimeout(() => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error de red',
                    text: 'No hemos podido conectar con el servidor. Por favor intente nuevamente',
                    type: 'error',
                    showConfirmButton: false,
                    confirmButtonText: "Cofirmar",
                    timerProgressBar: true,
                    position: "bottom-end",
                    confirmButtonColor: "#118dd5",
                    confirmButtonAriaLabel: "Confirmar",
                  });

                }, 1500)

              }
            }
          })

        }

        // LLAMAR LA VALIDACION
        CargarActualizar()

      });
    }


    // Se llama el boton eliminar 
    eliminar = document.getElementsByClassName('eliminar')
    // console.log(botonesGuardar)

    for (let y = 0; y < totalReg; y++) {
      eliminar[y].addEventListener('click', () => {

        const eliminarReg = async () => {
          idProducto = document.getElementsByClassName('idProducto_')[y].value
          // Solo se envian los necesarios ----------
          const datosEl = new FormData();
          datosEl.append("idProducto", idProducto);

          var eliminarDato = await fetch("../../controllers/productos/eliminar.php", {
            method: 'POST',
            body: datosEl
          });

          //Traer mensaje de respuesta desde PHP -----
          var resultado = await eliminarDato.json();

          Swal.fire({
            title: resultado.title,
            text: resultado.mensaje,
            icon: "success",
            confirmButtonText: "Cofirmar",
            timer: 1200,
            timerProgressBar: true,
            position: "center",
            showConfirmButton: false,
            confirmButtonColor: '#118dd5',
            confirmButtonAriaLabel: 'Confirmar',
          }).then(() => {
            window.location.href = '../../views/productos/listar.php'
          });

        }

        Swal.fire({
          title: 'Eliminar registro',
          text: "¿Está seguro que desea eliminar este producto?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            eliminarReg()
          } else {
            Swal.fire({
              title: 'Cancelado',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        })

      })
    }

  }


  ConsultarLista = async (pag) => {
    const datosCons = new FormData();
    datosCons.append("pagina", pag);
    console.log(categoria_lista)
    datosCons.append("categoria_lista", categoria_lista);

    var ConsultarLista = await fetch("../../controllers/productos/listado.php", {
      method: "POST",
      body: datosCons,
    });

    //Inicializamos las variables
    var resultado = await ConsultarLista.json();

    if (resultado.registros == 0) {
      contenido = document.getElementById("contenido");
      contenido.innerHTML = "";
      fila = document.createElement("tr");
      fila.innerHTML = `
      <td colspan="6" class="text-center" > No tienes ningun producto registrado </td>`
      contenido.appendChild(fila)

      //Ocultar el paginador 
      cont_pag = document.getElementById('cont-pag')
      cont_pag.style.visibility = 'hidden'

    } else {
      cont_pag = document.getElementById('cont-pag')
      cont_pag.style.visibility = 'visible'

      listar(resultado.data)
    }
    return resultado.registros
  }

  BuscarRegistros = async (busqueda) => {
    cont_pag = document.getElementById('cont-pag')
    cont_pag.style.visibility = 'hidden'


    const datosBusq = new FormData();
    datosBusq.append("busqueda", busqueda);

    var ConsultarBusqueda = await fetch("../../controllers/productos/buscador.php", {
      method: "POST",
      body: datosBusq,
    });

    var resultado = await ConsultarBusqueda.json();

    if (resultado.success['success']) {
      listar(resultado.data)


    } else {
      contenido = document.getElementById("contenido");
      contenido.innerHTML = "";
      fila = document.createElement("tr");
      fila.innerHTML = `
      <td data-label="Lo sentimos..." colspan="6" class="text-center" > No se encontraron resultados para tu busqueda</td>`


      contenido.appendChild(fila)

    }

    return resultado.registros
  }


  buscador = document.getElementById('buscador')

  ValidarPaginaActual = (pgActual) => {
    uno = document.getElementById('uno')
    dos = document.getElementById('dos')
    tres = document.getElementById('tres')

    if (uno.innerHTML == pgActual) {
      uno.classList.add('press')
    } else {
      uno.classList.remove('press')
    }
    if (dos.innerHTML == pgActual) {
      dos.classList.add('press')
    } else {
      dos.classList.remove('press')
    }
    if (tres.innerHTML == pgActual) {
      tres.classList.add('press')
    } else {
      tres.classList.remove('press')
    }

  }


  buscador.addEventListener('keyup', function (event) {
    back.style.display = 'none'
    uno = document.getElementById('uno').innerHTML = 1
    dos = document.getElementById('dos').innerHTML = 2
    tres = document.getElementById('tres').innerHTML = 3
    ValidarPaginaActual(1)

    console.log(buscador.value.length)
    // ista de códigos de teclas especiales que queremos ignorar
    ignoredKeys = [16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

    // Comprobamos si el código de la tecla está en la lista de teclas ignoradas
    if (ignoredKeys.includes(event.keyCode)) {
      event.preventDefault();
      return;
    }

    if (buscador.value.length == 0) {
      console.log(buscador.value)
      ConsultarLista(1)
    } else {
      busquedaErrorRed = async () => {
        try {
          // Llamada a la función asíncrona     
          await BuscarRegistros(buscador.value);
          // La función asíncrona ha terminado, cierra la alerta

        } catch (error) {

          // Ocurrió un error en la función asíncrona

          Swal.fire({
            icon: 'error',
            title: 'Error de red',
            text: 'No hemos podido conectar con el servidor. Por favor intente nuevamente',
            type: 'error',
            showConfirmButton: false,
            confirmButtonText: "Cofirmar",
            timerProgressBar: true,
            position: "bottom-end",
            confirmButtonColor: "#118dd5",
            confirmButtonAriaLabel: "Confirmar",
          });
        }
      }

      busquedaErrorRed()
    }
  })


  paginarRegistros = () => {

    // ------------ PAGINADOR DE LISTA --------------
    //Elementos funcionales
    back = document.getElementById('back')
    next = document.getElementById('next')

    //Elementos paginas
    uno = document.getElementById('uno')
    dos = document.getElementById('dos')
    tres = document.getElementById('tres')

    pg_final = 0
    pag_actual = 1
    // ----- LLamamos funcion ------

    ConsultarLista(1)
      .then((valor) => {
        pg_final = Math.ceil(valor / 5)

        //Ocultar primer boton
        uno.classList.add('press')
        back.style.display = 'none'

        //Si hay menos de 3 paginas
        if (pg_final == 3) {
          next.style.display = 'none'
        }

        //Si solo hay 2 paginas
        else if (pg_final == 2) {
          next.style.display = 'none'
          tres.style.display = 'none'
        }

        //Si solo hay 1 pagina
        else if (pg_final == 1) {
          next.style.display = 'none'
          tres.style.display = 'none'
          dos.style.display = 'none'
        }



        //Funcion pasar pagina
        next.addEventListener('click', () => {
          uno.innerHTML == 0 ? back.style.display = 'none' : back.style.display = 'inline'
          tres.innerHTML == (pg_final - 1) ? next.style.display = 'none' : next.style.display = 'inline'

          uno.innerHTML = parseInt(uno.innerHTML) + 1
          dos.innerHTML = parseInt(dos.innerHTML) + 1
          tres.innerHTML = parseInt(tres.innerHTML) + 1

          ValidarPaginaActual(pag_actual)

        })

        //Funcion regresar pagina
        back.addEventListener('click', () => {
          uno.innerHTML == 2 ? back.style.display = 'none' : back.style.display = 'inline'
          tres.innerHTML == (pg_final + 1) ? next.style.display = 'none' : next.style.display = 'inline'

          uno.innerHTML = parseInt(uno.innerHTML) - 1
          dos.innerHTML = parseInt(dos.innerHTML) - 1
          tres.innerHTML = parseInt(tres.innerHTML) - 1

          ValidarPaginaActual(pag_actual)
        })

        uno.addEventListener('click', () => {
          pag_actual = uno.innerHTML
          ConsultarLista(uno.innerHTML)
          ValidarPaginaActual(pag_actual)
        })
        dos.addEventListener('click', () => {
          pag_actual = dos.innerHTML
          ConsultarLista(dos.innerHTML)
          ValidarPaginaActual(pag_actual)
        })
        tres.addEventListener('click', () => {
          pag_actual = tres.innerHTML
          ConsultarLista(tres.innerHTML)
          ValidarPaginaActual(pag_actual)
        })


      })

  }

  paginarRegistros()


}



// ----------- BICICLETAS ALTA GAMA ----------
numeroBA = Math.floor(Math.random() * 9) + 1;
ba = document.getElementById('BA')
img = document.createElement('img')
img.src = `../_public/img/Bicicletas/BA${numeroBA}.jpg`
img.classList.add('imagen')
ba.insertBefore(img, ba.children[1])


// ----------- BICICLETAS BAJA GAMA ----------
numeroBB = Math.floor(Math.random() * 9) + 1;

while (numeroBB == numeroBA) {
  numeroBB = Math.floor(Math.random() * 9) + 1;
}

bb = document.getElementById('BB')
img = document.createElement('img')
img.classList.add('imagen')
img.src = `../_public/img/Bicicletas/BA${numeroBB}.jpg`
bb.insertBefore(img, bb.children[1])



// ----------- REPUESTOS ALTA GAMA ----------
numeroRA = Math.floor(Math.random() * 9) + 1;
ra = document.getElementById('RA')
img = document.createElement('img')
img.classList.add('imagen')
img.src = `../_public/img/Repuestos/RA${numeroRA}.jpg`
ra.insertBefore(img, ra.children[1])

// ----------- REPUESTOS BAJA GAMA ----------
numeroRB = Math.floor(Math.random() * 9) + 1;
while (numeroRA == numeroRB) {
  numeroRB = Math.floor(Math.random() * 9) + 1;
}

rb = document.getElementById('RB')
img = document.createElement('img')
img.classList.add('imagen')
img.src = `../_public/img/Repuestos/RA${numeroRB}.jpg`
rb.insertBefore(img, rb.children[1])