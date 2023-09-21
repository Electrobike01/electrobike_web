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

  const Registrar = async (nombreProveedor_, tipoDocumentoProveedor_,
    documentoProveedor_, correoProveedor_, telefonoProveedor_) => {

    // Se envian los datos en .json ----------
    const datosRg = new FormData();
    datosRg.append("nombreProveedor", nombreProveedor_);
    datosRg.append("tipoDocumentoProveedor", tipoDocumentoProveedor_);
    datosRg.append("documentoProveedor", documentoProveedor_);
    datosRg.append("correoProveedor", correoProveedor_);
    datosRg.append("telefonoProveedor", telefonoProveedor_);

    var registrarProveedores = await fetch("../../controllers/proveedores/registrar.php", {
      method: 'POST',
      body: datosRg
    });

    setTimeout(() => {
      Swal.fire({
        title: 'Proveedor registrado! ',
        text: 'Se ha registrado un proveedor',
        icon: "success",
        confirmButtonText: "Cofirmar",
        timer: 1200,
        timerProgressBar: true,
        position: "bottom-end",
        showConfirmButton: false,
        confirmButtonColor: '#118dd5',

        allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
        allowEscapeKey: false, // Evita que la alerta se cierre al presionar la tecla "Esc"
      }).then(() => {
        window.location.href = '../../views/proveedores/listar.php'
      });
    }, 1000)

  }



  const Validar = async () => {
    //Habilitamos el boton de nuevo 
    registrar.disabled = false;
    //Se optienen los elemenstos de ingreso
    var nombreProveedor = document.getElementById('nombreProveedor').value.trim();
    var tipoDocumentoProveedor = document.getElementById('tipoDocumentoProveedor').value.trim();
    var documentoProveedor = document.getElementById('documentoProveedor').value.trim();
    var correoProveedor = document.getElementById('correoProveedor').value.trim();
    var telefonoProveedor = document.getElementById('telefonoProveedor').value.trim();

    //Validar correo 
    var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      nombreProveedor.trim() === "" ||
      documentoProveedor.trim() === "" ||
      correoProveedor.trim() === "" ||
      telefonoProveedor.trim() === "" ||
      tipoDocumentoProveedor == "Seleccione un tipo de documento"
    ) {
      Swal.fire({
        title: "Campos vacios",
        text: "Por favor llene todos los campos",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (documentoProveedor.length < 7) {
      Swal.fire({
        title: "Documento Invalido",
        text: "Por favor ingrese un documento válido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (!regexCorreo.test(correoProveedor)) {
      Swal.fire({
        title: "Correo Electronico invalido",
        text: "El correo no es valido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });

    } else if (telefonoProveedor.length < 7) {
      Swal.fire({
        title: "Telefono Invalido",
        text: "Por favor ingrese un telefono válido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      //----------- Validar si estan repetidos -------
      registrar.disabled = true;
      // Solo se envian los necesarios ----------
      const datosCl = new FormData();
      datosCl.append("documentoProveedor", documentoProveedor);
      datosCl.append("telefonoProveedor", telefonoProveedor);
      datosCl.append("correoProveedor", correoProveedor);

      var consultaProveedores = await fetch("../../controllers/proveedores/repetidos.php", {
        method: 'POST',
        body: datosCl
      });

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaProveedores.json();

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
        Registrar(nombreProveedor, tipoDocumentoProveedor,
          documentoProveedor, correoProveedor, telefonoProveedor);
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

      if (data[i]['idProveedor'] == 1) {
        idFijo = 'r_fijo'
      } else {
        idFijo = ''
      }

      fila = document.createElement("tr");
      fila.innerHTML = `

        <td data-label="ID" class="text-center idProveedor_">${data[i]['idProveedor']}</td>
        <td data-label="Nombre" class="text-center nombreProveedor">${data[i]['nombreProveedor']}</td>
        <td data-label="Tipo Documento" class="text-center tipoDocumentoProveedor">${data[i]['tipoDocumentoProveedor']}</td>
        <td data-label="Documento" class="text-center documentoProveedor">${data[i]['documentoProveedor']}</td>
        <td data-label="Correo" class="text-center correoProveedor">${data[i]['correoProveedor']}</td>
        <td data-label="Telefono" class="text-center telefonoProveedor">${data[i]['telefonoProveedor']}</td>
        <td data-label="Estado" class="text-center ${data[i]['estadoProveedor']} estadoModulo">${data[i]['estadoProveedor']}</td>

        <td data-label="Acciones" class="text-center">
            <button id="${idFijo}" class="Btn  botonActualizarModulo${i+1}">Editar
                <svg class="svg" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
            </button>
        </td>
  `
      modal = document.createElement("div");

      if (data[i]['estadoProveedor'] == 'Activo') {
        opEs = `<option>Inactivo</option>`
      } else {
        opEs = `<option>Activo</option>`
      }

      if (data[i]['tipoDocumentoProveedor'] == 'Cedula') {
        opTp = `
        <option>Tarjeta de identidad</option>
        <option>NIT</option>
        `
      } else if (data[i]['tipoDocumentoProveedor'] == 'Tarjeta de identidad') {
        opTp = `
        <option>Cedula</option>
        <option>NIT</option>
        `
      } else if (data[i]['tipoDocumentoProveedor'] == 'NIT') {
        opTp = `
          <option>Cedula</option>
          <option>Tarjeta de identidad</option>
        `
      }


      modal.innerHTML = ` 
        <form action="../../controllers/proveedores/actualizar.php" method="POST">

        <div class="contenedorActualizarModulo">
            <h1 class="tituloVentana">Actualizar Proveedor</h1>

            <div class="contenedorActualizar">

                <div class="" id="">
                    <label class="formulario__label">ID </label>
                    <div class=""><input type="text" class="form-control idProveedor" name="idProveedor" value="${data[i]['idProveedor']}" disabled>
                    </div>
                </div>


                <div class="" id="">
                    <label class="formulario__label">Nombre<i style="color:red">*</i></label>
                    <div><input type="text" class="form-control nombreProveedorActualizado" name="nombreProveedor" value="${data[i]['nombreProveedor']}" id="input2">
                    </div>

                </div>

                <div class="">

                    <label class="formulario__label">Estado<i style="color:red">*</i></label>
                    <select class="form-select estadoProveedorActualizado" name="estadoProveedor" id="">
                        <option selected>${data[i]['estadoProveedor']}</option>
                        ${opEs}
                    </select>
                </div>

                <div class="" id="">
                    <label for="" class="formulario__label">Tipo de documento<i style="color:red">*</i></label>
                    <select class="form-select tipoDocumentoProveedorActualizado" name="tipoDocumentoProveedor" id="select1">
                        <option>${data[i]['tipoDocumentoProveedor']}</option>
                        ${opTp}
                    </select>
                </div>

                <div class="">
                    <label for="password2" class="formulario__label">Documento de identidad<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="form-control documentoProveedorActualizado" name="documentoProveedor" value="${data[i]['documentoProveedor']}" id="input1" oninput="filtroNumero(this)">
                    </div>
                </div>


                <div class="">
                    <label for="password2" class="formulario__label">Correo<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="form-control correoProveedorActualizado" value="${data[i]['correoProveedor']}" name="correoProveedor" id="input3">
                    </div>
                </div>
                <div class="">
                    <label for="password2" class="formulario__label">Telefono<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="form-control telefonoProveedorActualizado" value="${data[i]['telefonoProveedor']}" name="telefonoProveedor" id="input3" oninput="filtroNumero(this)">
                    </div>
                </div>

            </div>


            <div class="contenedorBotones">

                <div class="botonGuardar">
                    <button type="button" class="btn btn-primary guardarProveedores${i+1}" name="guardarProveedores" id='guardarRoles'> Guardar </button>
                </div>

                <div class="botonEliminar">
                    <button type="button" style="display:none" class="eliminar btn btn-danger">Eliminar </button>
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


    //--------------------- EDITAR PROVEEDORES ------------------

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

        // ======================== VALIDAR SI HAY COMPRAS CON ESE PROVEEDOR =========================================
        const validarCamposAsc = async () => {
          // console.log("ENTRRE EN EL BOTON")
          idProveedor = document.getElementsByClassName('idProveedor')[o].value
          // console.log(idRol)

          // Se envian los datos en .json ----------
          const datosVal = new FormData();
          datosVal.append("idProveedor", idProveedor);


          var consultaEliminarAs = await fetch("../../controllers/proveedores/validarAsociados.php", {
            method: 'POST',
            body: datosVal
          });

          //Traer mensaje de respuesta desde PHP -----
          var resultadoAsc = await consultaEliminarAs.json();

          if (resultadoAsc['success'] != false) {
            // console.log('No se encontraron registros')
            // Se agrega la clase que ocutla el boton
            btnEliminar = document.getElementsByClassName('eliminar');
            btnEliminar[o].style.display = 'block'

          }
        }
        validarCamposAsc()
      });

      cerrarVentanas[o].addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector('.animate-in-ov').classList.remove('body-sin-scroll')
        ventanaActualizarModulos[o].classList.remove("ventaActualizarModulos--show");
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
          text: "No puedes editar el proveedor de mostrador",
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




    for (let x = 0; x < totalReg; x++) {

      const Editar = async (idProveedor_, nombreProveedorActualizado_,
        tipoDocumentoProveedorActualizado_, documentoProveedorActualizado_, correoProveedorActualizado_,
        telefonoProveedorActualizado_, estadoProveedorActualizado_) => {

        const datosAc = new FormData();
        datosAc.append("idProveedor", idProveedor_);
        datosAc.append("nombreProveedor", nombreProveedorActualizado_);
        datosAc.append("tipoDocumentoProveedor", tipoDocumentoProveedorActualizado_);
        datosAc.append("documentoProveedor", documentoProveedorActualizado_);
        datosAc.append("correoProveedor", correoProveedorActualizado_);
        datosAc.append("telefonoProveedor", telefonoProveedorActualizado_);
        datosAc.append("estadoProveedor", estadoProveedorActualizado_);


        var registrarProveedores = await fetch("../../controllers/proveedores/actualizar.php", {
          method: 'POST',
          body: datosAc
        });

        setTimeout(() => {
          Swal.fire({
            title: 'Proveedor actualizado! ',
            text: 'Se ha actualizado un proveedor',
            icon: "success",
            confirmButtonText: "Cofirmar",
            timer: 1200,
            timerProgressBar: true,
            position: "center",
            showConfirmButton: false,
            confirmButtonColor: '#118dd5',
            confirmButtonAriaLabel: 'Confirmar',
          }).then(() => {
            window.location.href = '../../views/proveedores/listar.php'
          });
        }, 1000)




      }


      guardarClientes = document.getElementsByClassName(`guardarProveedores${x + 1}`);
      guardarClientes[0].addEventListener('click', () => {
        const Validar = async () => {


          // ----------------  validar ediciones repetidas -----------------


          var idProveedor = document.getElementsByClassName('idProveedor')[x].value.trim();
          var nombreProveedorActualizado = document.getElementsByClassName('nombreProveedorActualizado')[x].value.trim();
          var estadoProveedorActualizado = document.getElementsByClassName('estadoProveedorActualizado')[x].value.trim();
          var tipoDocumentoProveedorActualizado = document.getElementsByClassName('tipoDocumentoProveedorActualizado')[x].value.trim();
          var documentoProveedorActualizado = document.getElementsByClassName('documentoProveedorActualizado')[x].value.trim();
          var correoProveedorActualizado = document.getElementsByClassName('correoProveedorActualizado')[x].value.trim();
          var telefonoProveedorActualizado = document.getElementsByClassName('telefonoProveedorActualizado')[x].value.trim();


          //Validar correo 
          var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

          if (
            nombreProveedorActualizado.trim() === "" ||
            documentoProveedorActualizado.trim() === "" ||
            correoProveedorActualizado.trim() === "" ||
            telefonoProveedorActualizado.trim() === "" ||
            tipoDocumentoProveedorActualizado == "Seleccione un tipo de documento"
          ) {
            Swal.fire({
              title: "Campos vacios",
              text: "Por favor llene todos los campos",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else if (documentoProveedorActualizado.length < 7) {
            Swal.fire({
              title: "Documento Invalido",
              text: "Por favor ingrese un documento válido",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else if (telefonoProveedorActualizado.length < 7) {
            Swal.fire({
              title: "Telefono Invalido",
              text: "Por favor ingrese un telefono válido",
              icon: "warning",
              confirmButtonColor: "#118dd5",
            });
          } else if (!regexCorreo.test(correoProveedorActualizado)) {
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
            datosCl.append("idProveedor", idProveedor);
            datosCl.append("documentoProveedor", documentoProveedorActualizado);
            datosCl.append("telefonoProveedor", telefonoProveedorActualizado);
            datosCl.append("correoProveedor", correoProveedorActualizado);


            var consultaProveedores = await fetch("../../controllers/proveedores/validarActualizar.php", {
              method: 'POST',
              body: datosCl
            });

            //Traer mensaje de respuesta desde PHP -----
            var resultado = await consultaProveedores.json();

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
              Editar(idProveedor, nombreProveedorActualizado,
                tipoDocumentoProveedorActualizado, documentoProveedorActualizado, correoProveedorActualizado,
                telefonoProveedorActualizado, estadoProveedorActualizado)
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
      })
    }

    // Se llama el boton eliminar 
    eliminar = document.getElementsByClassName('eliminar')
    // console.log(botonesGuardar)

    for (let y = 0; y < totalReg; y++) {
      eliminar[y].addEventListener('click', () => {

        const eliminarReg = async () => {
          idProveedor = document.getElementsByClassName('idProveedor')[y].value
          // Solo se envian los necesarios ----------
          const datosEl = new FormData();
          datosEl.append("idProveedor", idProveedor);

          var eliminarDato = await fetch("../../controllers/proveedores/eliminar.php", {
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
            window.location.href = '../../views/proveedores/listar.php'
          });

        }

        Swal.fire({
          title: 'Eliminar registro',
          text: "¿Está seguro que desea eliminar este proveedor?",
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

    var ConsultarLista = await fetch("../../controllers/proveedores/listado.php", {
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
        <td colspan="8" class="text-center" > No tienes ningun proveedor registrado </td>`
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

    var ConsultarBusqueda = await fetch("../../controllers/proveedores/buscador.php", {
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