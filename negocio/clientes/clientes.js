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
  // ----- Se crea el metodo Registrar ----------
  const Registrar = async (
    nombreCliente_,
    tipoDocumentoCliente_,
    documentoCliente_,
    telefonoCliente_,
    correoCliente_
  ) => {
    // Se envian los datos en .json ----------
    const datosRg = new FormData();
    datosRg.append("nombreCliente", nombreCliente_);
    datosRg.append("tipoDocumentoCliente", tipoDocumentoCliente_);
    datosRg.append("documentoCliente", documentoCliente_);
    datosRg.append("telefonoCliente", telefonoCliente_);
    datosRg.append("correoCliente", correoCliente_);

    var registrarClientes = await fetch(
      "../../controllers/clientes/registrar.php", {
        method: "POST",
        body: datosRg,
      }
    );

    setTimeout(() => {
      Swal.fire({
        title: "Cliente registrado! ",
        text: "Se ha registrado un cliente",
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
        window.location.href = "../../views/clientes/listar.php";
      });
    }, 1000)
  };
  // ------- Se crea el metodo Validar ----------

  const Validar = async () => {
    //Habilitamos el boton de nuevo 
    registrar.disabled = false;
    // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
    //Se optienen todos los elementos de ingreso
    var nombreCliente = document.getElementById("nombreCliente").value.trim();
    var tipoDocumentoCliente = document.getElementById("tipoDocumentoCliente").value.trim();
    var documentoCliente = document.getElementById("documentoCliente").value.trim();
    var telefonoCliente = document.getElementById("telefonoCliente").value.trim();
    var correoCliente = document.getElementById("correoCliente").value.trim();

    //Validar correo
    var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Validar si estan vacios
    if (
      nombreCliente.trim() === "" ||
      documentoCliente.trim() === "" ||
      telefonoCliente.trim() === "" ||
      correoCliente.trim() === "" ||
      tipoDocumentoCliente == "Seleccione un tipo de documento"
    ) {
      Swal.fire({
        title: "Campos vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (documentoCliente.length < 7) {
      Swal.fire({
        title: "Documento Invalido",
        text: "Por favor ingrese un documento valido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (telefonoCliente.length < 7) {
      Swal.fire({
        title: "Telefono Invalido",
        text: "Por favor ingrese un telefono valido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (!regexCorreo.test(correoCliente)) {
      Swal.fire({
        title: "Correo Electronico invalido",
        text: "El correo no es valido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      //----------- Validar si estan repetidos -------
      registrar.disabled = true;
      // Solo se envian los necesarios ----------
      const datosCl = new FormData();
      datosCl.append("documentoCliente", documentoCliente);
      datosCl.append("telefonoCliente", telefonoCliente);
      datosCl.append("correoCliente", correoCliente);

      var consultaClientes = await fetch(
        "../../controllers/clientes/repetidos.php", {
          method: "POST",
          body: datosCl,
        }
      );

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaClientes.json();

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

        //---- Si ninguno está repetido llamar la funcion registrar
      } else {
        registrar.disabled = true;
        Registrar(nombreCliente, tipoDocumentoCliente, documentoCliente, telefonoCliente, correoCliente);
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

if (valorSubModuloActual == "listar") {

  // ------------ Creamos funcion lista  -------------

  listar = (data) => {

    contenido = document.getElementById("contenido");
    contenido.innerHTML = "";


    for (let i = 0; i < (data).length; i++) {
      if (data[i]['idCliente'] == 1) {
        idFijo = 'r_fijo'
      } else {
        idFijo = ''
      }

      fila = document.createElement("tr");
      fila.innerHTML = `
      <td data-label="ID" class="text-center idCliente">${data[i]['idCliente']}</td>
      <td data-label="Nombre" class="text-center nombreCliente">${data[i]['nombreCliente']}</td>
      <td data-label="Tipo de documento" class="text-center tipoDocumentoCliente">${data[i]['tipoDocumentoCliente']}</td>
      <td data-label="Documento" class="text-center documentoCliente">${data[i]['documentoCliente']}</td>
      <td data-label="Telefono" class="text-center telefonoCliente">${data[i]['telefonoCliente']}</td>
      <td data-label="Correo" class="text-center correoCliente">${data[i]['correoCliente']}</td>
      <td data-label="Estado" class="text-center ${data[i]['estadoCliente']} estadoModulo">${data[i]['estadoCliente']}</td>

      <td data-label="Acciones" class="text-center">
          <button id="${idFijo}" class="Btn  botonActualizarModulo${i+1}">Editar
              <svg class="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
          </button>
      </td>
`
      modal = document.createElement("div");

      if (data[i]['estadoCliente'] == 'Activo') {
        opEs = `<option>Inactivo</option>`
      } else {
        opEs = `<option>Activo</option>`
      }

      if (data[i]['tipoDocumentoCliente'] == 'Cedula') {
        opTp = `
      <option>Tarjeta de identidad</option>
      <option>NIT</option>
      `
      } else if (data[i]['tipoDocumentoCliente'] == 'Tarjeta de identidad') {
        opTp = `
      <option>Cedula</option>
      <option>NIT</option>
      `
      } else if (data[i]['tipoDocumentoCliente'] == 'NIT') {
        opTp = `
        <option>Cedula</option>
        <option>Tarjeta de identidad</option>
      `
      }


      modal.innerHTML = ` 
      <form action="" method="POST">

      <div class="contenedorActualizarModulo">
          <h1 class="tituloVentana">Actualizar Cliente</h1>

          <div class="contenedorActualizar">

              <div class="" id="">
                  <label class="formulario__label">ID </label>
                  <div class=""><input type="text" id="idCliente" class="form-control idCliente_" name="idCliente" value="${data[i]['idCliente']}" disabled>
                  </div>
              </div>


              <div class="" id="">
                  <label class="formulario__label">Nombre<i style="color:red">*</i></label>
                  <div><input type="text" class="form-control nombreClienteActualizado" name="nombreCliente" value="${data[i]['nombreCliente']}" id="input2">
                  </div>

              </div>


              <div class="">

                  <label class="formulario__label">Estado<i style="color:red">*</i></label>
                  <select class="form-select estadoClienteActualizado" name="estadoCliente" id="">
                      <option selected>${data[i]['estadoCliente']}</option>
                      ${opEs}
                  </select>
              </div>

              <div class="" id="">
                  <label for="" class="formulario__label">Tipo de documento<i style="color:red">*</i></label>
                  <select class="form-select tipoDocumentoClienteActualizado" name="tipoDocumentoCliente" id="select1">
                      <option>${data[i]['tipoDocumentoCliente']}</option>
                      ${opTp}
               

                  </select>
              </div>

              <div class="">
                  <label for="password2" class="formulario__label">Documento de identidad<i style="color:red">*</i></label>
                  <div class="formulario__grupo-input">
                      <input type="text" class="form-control documentoClienteActualizado" name="documentoCliente" value="${data[i]['documentoCliente']}" id="input1" oninput="filtroNumero(this)">
                  </div>
              </div>


              <div class="">
                  <label for="password2" class="formulario__label">Telefono<i style="color:red">*</i></label>
                  <div class="formulario__grupo-input">
                      <input type="text" class="form-control telefonoClienteActualizado" value="${data[i]['telefonoCliente']}" name="telefonoCliente" id="input3" oninput="filtroNumero(this)">
                  </div>
              </div>

              <div class="">
                  <label for="password2" class="formulario__label">Correo<i style="color:red">*</i></label>
                  <div class="formulario__grupo-input">
                      <input type="text" class="form-control correoClienteActualizado" value="${data[i]['correoCliente']}" name="correoCliente" id="input3">
                  </div>
              </div>

          </div>


          <div class="contenedorBotones">

              <div class="botonGuardar">
                  <button type="button" class="btn btn-primary guardarClientes${i+1}" name="guardarClientes" id='guardarClientes'> Guardar </button>

              </div>

              <div class="botonEliminar">
                  <button type="button"style="display: none" class="eliminar btn btn-danger">Eliminar </button>
              </div>

              <div class="botonCerrar">
                  <a href="#" class="cerrarVentana btn btn-secondary cerrarVentana${i+1}">Cerrar</a>
              </div>

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

    //--------------------- EDITAR CLIENTES ------------------

    //Se capturan las ventanas modales y se cuentan
    var totalReg = document.querySelectorAll(".ventaActualizarModulo").length;

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
        e.preventDefault();
        document.querySelector('.animate-in-ov').classList.add('body-sin-scroll')
        ventanaActualizarModulos[o].classList.add("ventaActualizarModulos--show");

        // ======================== VALIDAR SI HAY VENTAS CON ESE CLIENTE =========================================
        const validarCamposAsc = async () => {
          // console.log("ENTRRE EN EL BOTON")
          idCliente = document.getElementsByClassName("idCliente_")[o].value;
          // console.log(idRol)

          // Se envian los datos en .json ----------
          const datosVal = new FormData();
          datosVal.append("idCliente", idCliente);

          var consultaEliminarAs = await fetch(
            "../../controllers/clientes/validarAsociados.php", {
              method: "POST",
              body: datosVal,
            }
          );

          //Traer mensaje de respuesta desde PHP -----
          var resultadoAsc = await consultaEliminarAs.json();

          if (resultadoAsc["success"] != false) {
            console.log("No se encontraron registros");
            // Se agrega la clase que ocutla el boton
            btnEliminar = document.getElementsByClassName("eliminar");
            btnEliminar[o].style.display = "block";
          }
        };
        validarCamposAsc();
      });

      cerrarVentanas[o].addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('.animate-in-ov').classList.remove('body-sin-scroll')
        ventanaActualizarModulos[o].classList.remove(
          "ventaActualizarModulos--show"
        );
      });
    }

    // Registro Fijo 
    boton_admi = document.getElementById('r_fijo')
    if (boton_admi != null) {
      boton_admi.classList.remove('Btn')
      boton_admi.classList.add('btn-admin')
      boton_admi_copia = boton_admi.cloneNode(true)
      boton_admi.parentNode.replaceChild(boton_admi_copia, boton_admi)
      boton_admi_copia.addEventListener('click', () => {
        Swal.fire({
          //Contenido de la alerta
          title: "Lo sentimos",
          text: "No puedes editar el cliente de mostrador",
          icon: "warning",
          confirmButtonText: "Cofirmar",
          timer: 4500,
          timerProgressBar: true,
    

          // Estilos de las alertas (Botones)
          showConfirmButton: true,
          confirmButtonColor: "#118dd5",
          confirmButtonAriaLabel: "Aceptar",
        });
      })
    }

    // ----------------  validar ediciones repetidas -----------------

    for (let x = 0; x < totalReg; x++) {

      const Editar = async (
        idClienteActualizado_,
        nombreClienteActuaizado_,
        tipoDocumentoClienteActualizado_,
        documentoClienteActualizado_,
        telefonoClienteActualizado_,
        correoClienteActualizado_,
        estadoClienteActualizado_
      ) => {
        // Se envian los datos en .json ----------
        const datosAc = new FormData();
        datosAc.append("idCliente", idClienteActualizado_);
        datosAc.append("nombreCliente", nombreClienteActuaizado_);
        datosAc.append("tipoDocumentoCliente", tipoDocumentoClienteActualizado_);
        datosAc.append("documentoCliente", documentoClienteActualizado_);
        datosAc.append("telefonoCliente", telefonoClienteActualizado_);
        datosAc.append("correoCliente", correoClienteActualizado_);
        datosAc.append("estadoCliente", estadoClienteActualizado_);

        var registrarRoles = await fetch(
          "../../controllers/clientes/actualizar.php", {
            method: "POST",
            body: datosAc,
          }
        );

        setTimeout(() => {
          Swal.fire({
            title: "Cliente actualizado! ",
            text: "Se ha actualizado un cliente",
            icon: "success",
            confirmButtonText: "Cofirmar",
            timer: 1200,
            timerProgressBar: true,
            position: "center",
            showConfirmButton: false,
            confirmButtonColor: "#118dd5",
            confirmButtonAriaLabel: "Confirmar",
          }).then(() => {
            window.location.href = "../../views/clientes/listar.php";
          });
        }, 1000)
      };

      guardarClientes = document.getElementsByClassName(
        `guardarClientes${x + 1}`
      );

      guardarClientes[0].addEventListener("click", () => {
        const Validar = async () => {
          // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
          //Se optienen todos los elementos de ingreso
          //---------------- CONSULTAR REPETIDOS -----------------

          var idCliente = document
            .getElementsByClassName("idCliente_")[x].value.trim();
          var nombreClienteActualizado = document
            .getElementsByClassName("nombreClienteActualizado")[x].value.trim();
          var tipoDocumentoClienteActualizado = document.getElementsByClassName(
            "tipoDocumentoClienteActualizado"
          )[x].value;
          var documentoClienteActualizado = document
            .getElementsByClassName("documentoClienteActualizado")[x].value.trim();
          var telefonoClienteActualizado = document
            .getElementsByClassName("telefonoClienteActualizado")[x].value.trim();
          var correoClienteActualizado = document
            .getElementsByClassName("correoClienteActualizado")[x].value.trim();
          var estadoClienteActualizado = document
            .getElementsByClassName("estadoClienteActualizado")[x].value.trim();

          //Validar correo
          var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

          // Validar si estan vacios
          if (
            nombreClienteActualizado.trim() === "" ||
            documentoClienteActualizado.trim() === "" ||
            telefonoClienteActualizado.trim() === "" ||
            correoClienteActualizado.trim() === "" ||
            tipoDocumentoClienteActualizado.value ==
            "Seleccione un tipo de documento"
          ) {
            Swal.fire({
              title: "Campos vacios",
              text: "Por favor llene todos los campos",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else if (documentoClienteActualizado.length < 7) {
            Swal.fire({
              title: "Documento Invalido",
              text: "Por favor ingrese un documento valido",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else if (telefonoClienteActualizado.length < 7) {
            Swal.fire({
              title: "Telefono Invalido",
              text: "Por favor ingrese un telefono valido",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else if (!regexCorreo.test(correoClienteActualizado)) {
            Swal.fire({
              title: "Correo Electronico invalido",
              text: "El correo no es valido",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else {
            //----------- Validar si estan repetidos -------

            // Solo se envian los necesarios ----------
            const datosCl = new FormData();
            datosCl.append("idCliente", idCliente);
            datosCl.append("documentoCliente", documentoClienteActualizado);
            datosCl.append("telefonoCliente", telefonoClienteActualizado);
            datosCl.append("correoCliente", correoClienteActualizado);

            var consultaClientes = await fetch(
              "../../controllers/clientes/validarActualizar.php", {
                method: "POST",
                body: datosCl,
              }
            );

            //Traer mensaje de respuesta desde PHP -----
            var resultado = await consultaClientes.json();


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

              //---- Si ninguno está repetido llamar la funcion registrar
            } else {
              //Llamamos la funcion editar
              Editar(
                idCliente,
                nombreClienteActualizado,
                tipoDocumentoClienteActualizado,
                documentoClienteActualizado,
                telefonoClienteActualizado,
                correoClienteActualizado,
                estadoClienteActualizado
              );
            }
          }
        };

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
    eliminar = document.getElementsByClassName("eliminar");
    // console.log(botonesGuardar)

    for (let y = 0; y < totalReg; y++) {
      eliminar[y].addEventListener("click", () => {
        const eliminarReg = async () => {
          idCliente = document.getElementsByClassName("idCliente_")[y].value;
          // Solo se envian los necesarios ----------
          const datosEl = new FormData();
          datosEl.append("idCliente", idCliente);

          var eliminarDato = await fetch(
            "../../controllers/clientes/eliminar.php", {
              method: "POST",
              body: datosEl,
            }
          );

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
            confirmButtonColor: "#118dd5",
            confirmButtonAriaLabel: "Confirmar",
          }).then(() => {
            window.location.href = "../../views/clientes/listar.php";
          });
        };

        Swal.fire({
          title: "Eliminar registro",
          text: "¿Está seguro que desea eliminar este cliente?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Eliminar",
        }).then((result) => {
          if (result.isConfirmed) {
            eliminarReg();
          } else {
            Swal.fire({
              title: "Cancelado",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            });
          }
        });
      });
    }

  }

  ConsultarLista = async (pag) => {
    const datosCons = new FormData();
    datosCons.append("pagina", pag);

    var ConsultarLista = await fetch("../../controllers/clientes/listado.php", {
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
      <td colspan="8" class="text-center" > No tienes ningun cliente registrado </td>`
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

    var ConsultarBusqueda = await fetch("../../controllers/clientes/buscador.php", {
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
      <td data-label="Lo sentimos..." colspan="8" class="text-center" > No se encontraron resultados para tu busqueda</td>`


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

