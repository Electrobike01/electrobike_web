// ----------------------------- TOGGLES DE REGISTRAR ------------------------------------

var ModuloActual = document.getElementById("ModuloActual");
var valorModulo = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;

if (valorSubModuloActual == "registrar") {
  modulos = [
    "usuarios",
    "roles",
    "proveedores",
    "compras",
    "productos",
    "clientes",
    "ventas",
  ];

  const Registrar = async (
    nombreRol_,
    inputUsuarios_,
    inputRoles_,
    inputProveedores_,
    inputCompras_,
    inputProductos_,
    inputClientes_,
    inputVentas_
  ) => {
    // Se envian los datos en .json ----------
    const datosRg = new FormData();
    datosRg.append("nombreRol", nombreRol_);
    datosRg.append("permiso_usuarios", inputUsuarios_);
    datosRg.append("permiso_roles", inputRoles_);
    datosRg.append("permiso_proveedores", inputProveedores_);
    datosRg.append("permiso_compras", inputCompras_);
    datosRg.append("permiso_productos", inputProductos_);
    datosRg.append("permiso_clientes", inputClientes_);
    datosRg.append("permiso_ventas", inputVentas_);

    var registrarRoles = await fetch("../../controllers/roles/registrar.php", {
      method: "POST",
      body: datosRg,
    });

    setTimeout(() => {
      Swal.fire({
        title: "Rol registrado! ",
        text: "Se ha registrado un rol",
        icon: "success",
        confirmButtonText: "Cofirmar",
        timer: 1200,
        timerProgressBar: true,
        position: "bottom-end",
        showConfirmButton: false,
        confirmButtonColor: "#118dd5",
        confirmButtonAriaLabel: "Confirmar",
      }).then(() => {
        window.location.href = "../../views/roles/listar.php";
      });
    }, 1000)

  };

  const Validar = async () => {
    //Habilitamos el boton de nuevo
    registrar.disabled = false;
    var nombreRol = document.getElementById("nombreRol").value.trim();

    document.getElementById("toggle_Us").checked ?
      (inputUsuarios = "usuarios") :
      (inputUsuarios = "");
    document.getElementById("toggle_Rl").checked ?
      (inputRoles = "roles") :
      (inputRoles = "");
    document.getElementById("toggle_Prv").checked ?
      (inputProveedores = "proveedores") :
      (inputProveedores = "");
    document.getElementById("toggle_Cr").checked ?
      (inputCompras = "compras") :
      (inputCompras = "");
    document.getElementById("toggle_Prd").checked ?
      (inputProductos = "productos") :
      (inputProductos = "");
    document.getElementById("toggle_Cl").checked ?
      (inputClientes = "clientes") :
      (inputClientes = "");
    document.getElementById("toggle_Ve").checked ?
      (inputVentas = "ventas") :
      (inputVentas = "");

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;


    if (nombreRol.trim() === "") {
      Swal.fire({
        title: "Nombre vacío",
        icon: "warning",
        confirmButtonColor: "#118dd5",
        text: "Por favor ingrese un nombre de rol",
      });
    } else if ((nombreRol.trim()).length <= 3) {
      Swal.fire({
        title: "Nombe invalido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
        text: "Por favor ingrese un nombre de rol mayor a 3 caracteres",
      });
    } else if (!nombreRegex.test(nombreRol.trim())) {
      Swal.fire({
        title: "Nombre invalido",
        icon: "warning",
        confirmButtonColor: "#118dd5",
        text: "Por favor ingrese un nombre de rol válido",
      });
    } else if (
      inputUsuarios.trim() === "" &&
      inputRoles.trim() === "" &&
      inputProveedores.trim() === "" &&
      inputCompras.trim() === "" &&
      inputProductos.trim() === "" &&
      inputClientes.trim() === "" &&
      inputVentas.trim() === ""
    ) {
      Swal.fire({
        title: "Roles inactivos",
        text: "Por favor active al menos un rol",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      //----------- Validar si estan repetidos -------
      registrar.disabled = true;
      // Solo se envian los necesarios ----------
      const datosCl = new FormData();
      datosCl.append("nombreRol", nombreRol);

      var consultaRoles = await fetch("../../controllers/roles/repetidos.php", {
        method: "POST",
        body: datosCl,
      });

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaRoles.json();

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

        Registrar(
          nombreRol,
          inputUsuarios,
          inputRoles,
          inputProveedores,
          inputCompras,
          inputProductos,
          inputClientes,
          inputVentas
        );
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
              confirmButtonText: "Confirmar",
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
    CargarRegistro();
  });

  // Agrega un event listener al documento para escuchar eventos de teclado
  document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      registrar.disabled = true;
      CargarRegistro();
    }
  });



}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- LISTAR ----------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

if (valorSubModuloActual == "listar") {

  listar = (data) => {
    contenido = document.getElementById("contenido");
    contenido.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      fila = document.createElement("tr");

      if (data[i]['idRol'] == 1) {
        idFijo = 'r_fijo'
      } else {
        idFijo = ''
      }

      fila.innerHTML = `

      <td  data-label="ID" class="text-center idRol">${data[i]["idRol"]}</td>
      <td  data-label="Nombre Rol" class="text-center nombreRol">${data[i]["nombreRol"]}</td>
      <td  data-label="Permisos" class="text-center permisos">${data[i]["permisosRol"]}</td>
      <td  data-label="Estado" class="text-center ${data[i]["estadoRol"]} estadoRol">${data[i]["estadoRol"]}</td>
      <td data-label="Acciones" class="text-center">
        <button id="${idFijo}" class="Btn botonActualizarRol${i + 1}">Editar
        <svg class="svg" viewBox="0 0 512 512">
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
        </svg>
        </button>
      </td>
`;
      modal = document.createElement("div");

      if (data[i]["estadoRol"] == "Activo") {
        opEs = `<option>Inactivo</option>`;
      } else {
        opEs = `<option>Activo</option>`;
      }

      modal.innerHTML = ` 
      <form action="../../controllers/clientes/actualizar.php" method="POST">

      <div class="contenedorActualizarRol">
          <h1 class="tituloVentana">Actualizar Rol</h1>

          <div class="contenedorActualizar">

              <div class="" id="">
                  <label class="formulario__label">ID </label>
                  <div class=""><input type="text" id="idRol" class="form-control idRol_" name="idCliente" value="${
                    data[i]["idRol"]
                  }" disabled>
                  </div>
              </div>

              <div class="" id="">
                  <label class="formulario__label">Nombre<i style="color:red">*</i> </label>
                  <div><input type="text" class="form-control nombreRolActualizado" name="" value="${
                    data[i]["nombreRol"]
                  }" id="input2">
                  </div>
              </div>

              <input type="text" class="permisos_rol" name="nombreCliente" value="${data[i]["permisosRol"]}" style="display:none"   >

              <div class="">

                  <label class="formulario__label">Estado</label>
                  <select class="form-select estadoRolActualizado" name="estadoCliente" id="">
                      <option selected>${data[i]["estadoRol"]}</option>
                      ${opEs}
                  </select>
              </div>

          </div>
          <div class="container switchs">


              <div class="switch">
                  <span class="textin">Usuarios</span>
                  <label class="switchos element">
                      <input id='toggle_Us_${
                        i + 1
                      }' type="checkbox" class="checkbox">
                      <div class="slider"> </div>
                  </label>
              </div>

              <div class="switch">
                  <span class="textin">Roles</span>
                  <label class="switchos element">
                      <input id='toggle_Rl_${
                        i + 1
                      }' type="checkbox" class="checkbox ">
                      <div class="slider"> </div>
                  </label>

              </div>

              <div class="switch">
                  <span class="textin">Proveedores</span>
                  <label class="switchos element">
                      <input id='toggle_Prv_${
                        i + 1
                      }' type="checkbox" class="checkbox">
                      <div class="slider"> </div>
                  </label>
              </div>

              <div class="switch">
                  <span class="textin">Compras</span>
                  <label class="switchos element">
                      <input id='toggle_Cr_${
                        i + 1
                      }' type="checkbox" class="checkbox">
                      <div class="slider"> </div>
                  </label>

              </div>

              <div class="switch">
                  <span class="textin">Productos</span>
                  <label class="switchos element">
                      <input id='toggle_Prd_${
                        i + 1
                      }' type="checkbox" class="checkbox">
                      <div class="slider"> </div>
                  </label>

              </div>

              <div class="switch">
                  <span class="textin">Clientes</span>
                  <label class="switchos element">
                      <input id='toggle_Cl_${
                        i + 1
                      }' type="checkbox" class="checkbox">
                      <div class="slider"> </div>
                  </label>

              </div>

              <div class="switch">
                  <span class="textin">Ventas</span>
                  <label class="switchos element">
                      <input id='toggle_Ve_${
                        i + 1
                      }' type="checkbox" class="checkbox">
                      <div class="slider"> </div>
                  </label>

              </div>

          </div>


          <div class="contenedorBotones">

              <div class="botonGuardar">
                  <button type="button" style="margin-right: 10px;" class="btn btn-primary guardarCambios guardarRoles${i + 1}" name="guardarClientes" id='guardarClientes'> Guardar </button>
              </div>

              <div class="botonEliminar">
                  <button type="button" style="margin-right: 10px;" class="eliminar btn btn-danger">Eliminar </button>
              </div>

              <div class="botonCerrar">
                  <a href="#" class="cerrarVentana btn btn-secondary cerrarVentana${
                    i + 1
                  }">Cerrar</a>
              </div>

          </div>

  </form>


`;
      modal.classList.add(`ventaActualizarModulos${i + 1}`);
      modal.classList.add("ventaActualizarModulo");

      // Agregamos a la clase contenido los td
      contenido.appendChild(fila);
      contenido.appendChild(modal);
    }


    botonesEditar = [];
    // ---------------------- Listas nombres ----------------
    inputs_roles = [];
    listaInputsNombres = [];

    // --------------------- Swichts Usuarios -------------------
    swichts_usuarios = [];
    listaSwichtUsuarios = [];
    // --------------------- Swichts Roles -------------------
    swichts_roles = [];
    listaSwichtRoles = [];
    // --------------------- Swichts Proveedores -------------------
    swichts_proveedores = [];
    listaSwichtProveedores = [];
    // --------------------- Swichts Compras -------------------
    swichts_compras = [];
    listaSwichtCompras = [];
    // --------------------- Swichts Productos -------------------
    swichts_productos = [];
    listaSwichtProductos = [];
    // --------------------- Swichts Clientes -------------------
    swichts_clientes = [];
    listaSwichtClientes = [];
    // --------------------- Swichts Ventas -------------------
    swichts_ventas = [];
    listaSwichtVentas = [];

    totalReg = document.querySelectorAll(".ventaActualizarModulo").length;

    for (let x = 0; x < totalReg; x++) {

      // ------------------------ BOTON ----------------------------------------
      botonEditar = document.getElementsByClassName(`guardarRoles${x + 1}`)[0];

      botonesEditar.push(botonEditar);
      console.log(botonesEditar[x])
      contClick = 0;
    }


    // -------------------------------- Ventana actualizar roles -----------------------------------
    totalReg = document.querySelectorAll(".ventaActualizarModulo").length;

    actualizarRoles = [];
    cerrarVentanas = [];
    ventaActualizarRoless = [];

    for (let o = 0; o < totalReg; o++) {
      actualizarRoles.push(
        document.querySelector(".botonActualizarRol" + (o + 1))
      );
      cerrarVentanas.push(document.querySelector(".cerrarVentana" + (o + 1)));
      ventaActualizarRoless.push(document.querySelector(".ventaActualizarModulos" + (o + 1)));

      actualizarRoles[o].addEventListener("click", (e) => {

        e.preventDefault();

        document.querySelector('.animate-in-ov').classList.add('body-sin-scroll')

        ventaActualizarRoless[o].classList.add("ventaActualizarModulos--show");

        // ======================== VALIDAR SI HAY USUARIOS CON ESE ROL =========================================
        const validarCamposAsc = async () => {
          idRol = document.getElementsByClassName("idRol_")[o].value;
          estadoRol_ = document.getElementsByClassName("estadoRolActualizado")[o];


          // Se envian los datos en .json ----------
          const datosVal = new FormData();
          datosVal.append("idRol", idRol);

          var consultaEliminarAs = await fetch(
            "../../controllers/roles/validarAsociados.php", {
              method: "POST",
              body: datosVal,
            }
          );

          //Traer mensaje de respuesta desde PHP -----
          var resultadoAsc = await consultaEliminarAs.json();
          console.log(resultadoAsc)
          if (resultadoAsc["success"] != true) {

            // Se agrega la clase que ocutla el boton
            btnEliminar = document.getElementsByClassName("eliminar");
            btnEliminar[o].style.display = "none";
            estadoRol_.disabled = true;
          }
        };

        validarCamposAsc();
      });

      cerrarVentanas[o].addEventListener("click", (e) => {
        console.log('cerrando')
        e.preventDefault();
        document.querySelector('.animate-in-ov').classList.remove('body-sin-scroll')

        ventaActualizarRoless[o].classList.remove("ventaActualizarModulos--show");
      });
    }



    // --------------------------------  Activar roles en ventana modal -----------------------------------
    Validar = async (id, nombreRol) => {
      //----------- Validar si estan repetidos -------
      // Solo se envian los necesarios ----------
      const datosRl = new FormData();
      datosRl.append("idRol", id);
      datosRl.append("nombreRol", nombreRol);

      var consultaRoles = await fetch(
        "../../controllers/roles/validarActualizar.php", {
          method: "POST",
          body: datosRl,
        }
      );

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaRoles.json();

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
      }

      return resultado.success;
    };

    const editar = async (
      _id,
      _nombreRol,
      _estadoRol,
      _inputUs,
      _inputRol,
      _inputPro,
      _inputCom,
      _inputProd,
      _inputCl,
      _inputven
    ) => {
      // Se envian los datos en .json ----------
      const datosAr = new FormData();
      datosAr.append("idRol", _id);
      datosAr.append("nombreRol", _nombreRol);
      datosAr.append("estadoRol", _estadoRol);
      datosAr.append("permiso_usuarios", _inputUs);
      datosAr.append("permiso_roles", _inputRol);
      datosAr.append("permiso_proveedores", _inputPro);
      datosAr.append("permiso_compras", _inputCom);
      datosAr.append("permiso_productos", _inputProd);
      datosAr.append("permiso_clientes", _inputCl);
      datosAr.append("permiso_ventas", _inputven);

      var consultaRoles = await fetch(
        "../../controllers/roles/actualizar.php", {
          method: "POST",
          body: datosAr,
        }
      );

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaRoles.json();

      setTimeout(() => {
        Swal.fire({
          title: "Rol actualizado! ",
          text: "Se ha actualizado un Rol",
          icon: "success",
          confirmButtonText: "Cofirmar",
          timer: 1200,
          timerProgressBar: true,
          position: "center",
          showConfirmButton: false,
          confirmButtonColor: "#118dd5",
          confirmButtonAriaLabel: "Confirmar",
        }).then(() => {
          window.location.href = "../../views/roles/listar.php";
        });
      }, 1000)

    };

    permisos_roles = document.getElementsByClassName("permisos_rol");

    for (let n = 1; n <= totalReg; n++) {
      permiso = permisos_roles[n - 1].value;
      console.log(permiso);

      const arrayPermisos = permiso.split(",").map((item) => item.trim());


      Toggle_usuarios = document.getElementById("toggle_Us_" + n);
      Toggle_roles = document.getElementById("toggle_Rl_" + n);
      Toggle_proveedores = document.getElementById("toggle_Prv_" + n);
      Toggle_compras = document.getElementById("toggle_Cr_" + n);
      Toggle_productos = document.getElementById("toggle_Prd_" + n);
      Toggle_clientes = document.getElementById("toggle_Cl_" + n);
      Toggle_ventas = document.getElementById("toggle_Ve_" + n);

      if (arrayPermisos.includes("Usuarios")) {
        Toggle_usuarios.checked = true;
      }
      if (arrayPermisos.includes("Roles")) {
        Toggle_roles.checked = true;
      }
      if (arrayPermisos.includes("Proveedores")) {
        Toggle_proveedores.checked = true;
      }
      if (arrayPermisos.includes("Compras")) {
        Toggle_compras.checked = true;
      }
      if (arrayPermisos.includes("Productos")) {
        Toggle_productos.checked = true;
      }
      if (arrayPermisos.includes("Clientes")) {
        Toggle_clientes.checked = true;
      }
      if (arrayPermisos.includes("Ventas")) {
        Toggle_ventas.checked = true;
      }
    }

    botonesGuardar = document.getElementsByClassName("guardarCambios");
    console.log("hola");
    for (let m = 0; m < totalReg; m++) {

      botonesGuardar[m].addEventListener("click", () => {
        // -----------------------------
        console.log("Click en boton: " + (m + 1));

        nombre = document.getElementsByClassName("nombreRolActualizado")[m]
          .value;
        id = document.getElementsByClassName("idRol_")[m].value;

        estado = document.getElementsByClassName("estadoRolActualizado")[m]
          .value;

        console.log(estado);
        if (document.getElementById("toggle_Us_" + (m + 1)).checked) {
          inputUsuarios = "usuarios";
        } else {
          inputUsuarios = "";
        }
        if (document.getElementById("toggle_Rl_" + (m + 1)).checked) {
          inputRoles = "roles";
        } else {
          inputRoles = "";
        }
        if (document.getElementById("toggle_Prv_" + (m + 1)).checked) {
          inputProveedores = "proveedores";
        } else {
          inputProveedores = "";
        }
        if (document.getElementById("toggle_Cr_" + (m + 1)).checked) {
          inputCompras = "compras";
        } else {
          inputCompras = "";
        }
        if (document.getElementById("toggle_Prd_" + (m + 1)).checked) {
          inputProductos = "productos";
        } else {
          inputProductos = "";
        }
        if (document.getElementById("toggle_Cl_" + (m + 1)).checked) {
          inputClientes = "clientes";
        } else {
          inputClientes = "";
        }
        if (document.getElementById("toggle_Ve_" + (m + 1)).checked) {
          inputVentas = "ventas";
        } else {
          inputVentas = "";
        }

        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;


        if (nombre.trim() === "") {
          Swal.fire({
            title: "Nombre vacío",
            icon: "warning",
            confirmButtonColor: "#118dd5",
            text: "Por favor ingrese un nombre de rol",
          });
        } else if ((nombre.trim()).length <= 3) {
          Swal.fire({
            title: "Nombe invalido",
            icon: "warning",
            confirmButtonColor: "#118dd5",
            text: "Por favor ingrese un nombre de rol mayor a 3 caracteres",
          });
        } else if (!nombreRegex.test(nombre.trim())) {
          Swal.fire({
            title: "Nombe invalido",
            icon: "warning",
            confirmButtonColor: "#118dd5",
            text: "Por favor ingrese un nombre de rol válido",
          });
        } else if (
          inputUsuarios.trim() === "" &&
          inputRoles.trim() === "" &&
          inputProveedores.trim() === "" &&
          inputCompras.trim() === "" &&
          inputProductos.trim() === "" &&
          inputClientes.trim() === "" &&
          inputVentas.trim() === ""
        ) {
          Swal.fire({
            title: "Roles inactivos",
            text: "Por favor active al menos un rol",
            icon: "warning",
            confirmButtonColor: "#118dd5",
          });
        } else {
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
                  await Validar(id, nombre).then((resultado) => {
                    const miVariable = resultado;
                    if (miVariable) {
                      editar(
                        id,
                        nombre,
                        estado,
                        inputUsuarios,
                        inputRoles,
                        inputProveedores,
                        inputCompras,
                        inputProductos,
                        inputClientes,
                        inputVentas
                      );
                    }
                  }); // 
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
                      confirmButtonText: "Confirmar",
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
          CargarActualizar()
        }
      });
    }

    // Se llama el boton eliminar
    eliminar = document.getElementsByClassName("eliminar");
    // console.log(botonesGuardar)

    for (let y = 0; y < totalReg; y++) {
      eliminar[y].addEventListener("click", () => {
        const eliminarReg = async () => {
          idRol = document.getElementsByClassName("idRol_")[y].value;
          // Solo se envian los necesarios ----------
          const datosEl = new FormData();
          datosEl.append("idRol", idRol);

          var eliminarDato = await fetch(
            "../../controllers/roles/eliminar.php", {
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
            confirmButtonText: "Confirmar",
            timer: 1200,
            timerProgressBar: true,
            position: "center",
            showConfirmButton: false,
            confirmButtonColor: "#118dd5",
            confirmButtonAriaLabel: "Confirmar",
          }).then(() => {
            window.location.href = "../../views/roles/listar.php";
          });
        };

        Swal.fire({
          title: "Eliminar registro",
          text: "¿Está seguro que desea eliminar este registro?",
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

    // Registro Fijo 
    boton_admi = document.getElementById('r_fijo')
    console.log(boton_admi)
    if (boton_admi != null) {
      boton_admi.classList.remove('Btn')
      boton_admi.classList.add('btn-admin')
      boton_admi_copia = boton_admi.cloneNode(true)
      boton_admi.parentNode.replaceChild(boton_admi_copia, boton_admi)
      boton_admi_copia.addEventListener('click', () => {
        Swal.fire({
          //Contenido de la alerta
          title: "Lo sentimos",
          text: "No puedes editar el rol administrador",
          icon: "warning",
          confirmButtonText: "Confirmar",
          timer: 4500,
          timerProgressBar: true,


          // Estilos de las alertas (Botones)
          showConfirmButton: true,
          confirmButtonColor: "#118dd5",
          confirmButtonAriaLabel: "Aceptar",
        });
      })

    }


  }


  ConsultarLista = async (pag) => {
    const datosCons = new FormData();
    datosCons.append("pagina", pag);

    var ConsultarLista = await fetch("../../controllers/roles/listado.php", {
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
      <td colspan="5" class="text-center" > No tienes ningún rol registrado </td>`;
      contenido.appendChild(fila);

      //Ocultar el paginador
      cont_pag = document.getElementById("cont-pag");
      cont_pag.style.visibility = "hidden";
    } else {
      cont_pag = document.getElementById("cont-pag");
      cont_pag.style.visibility = "visible";

      listar(resultado.data);
    }
    return resultado.registros;
  };

  BuscarRegistros = async (busqueda) => {
    cont_pag = document.getElementById("cont-pag");
    cont_pag.style.visibility = "hidden";

    const datosBusq = new FormData();
    datosBusq.append("busqueda", busqueda);

    var ConsultarBusqueda = await fetch(
      "../../controllers/roles/buscador.php", {
        method: "POST",
        body: datosBusq,
      }
    );

    var resultado = await ConsultarBusqueda.json();

    if (resultado.success["success"]) {
      listar(resultado.data);
    } else {
      contenido = document.getElementById("contenido");
      contenido.innerHTML = "";
      fila = document.createElement("tr");
      fila.innerHTML = `
      <td data-label="Lo sentimos..." data-label="Lo sentimos..." colspan="5" class="text-center" > No se encontraron resultados para tu búsqueda</td>`;

      contenido.appendChild(fila);
    }

    return resultado.registros;
  };

  buscador = document.getElementById("buscador");

  ValidarPaginaActual = (pgActual) => {
    uno = document.getElementById("uno");
    dos = document.getElementById("dos");
    tres = document.getElementById("tres");

    if (uno.innerHTML == pgActual) {
      uno.classList.add("press");
    } else {
      uno.classList.remove("press");
    }
    if (dos.innerHTML == pgActual) {
      dos.classList.add("press");
    } else {
      dos.classList.remove("press");
    }
    if (tres.innerHTML == pgActual) {
      tres.classList.add("press");
    } else {
      tres.classList.remove("press");
    }
  };

  buscador.addEventListener("keyup", function (event) {
    back.style.display = "none";

    uno = document.getElementById("uno").innerHTML = 1;
    dos = document.getElementById("dos").innerHTML = 2;
    tres = document.getElementById("tres").innerHTML = 3;
    ValidarPaginaActual(1);

    console.log(buscador.value.length);
    // ista de códigos de teclas especiales que queremos ignorar
    ignoredKeys = [16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

    // Comprobamos si el código de la tecla está en la lista de teclas ignoradas
    if (ignoredKeys.includes(event.keyCode)) {
      event.preventDefault();
      return;
    }

    if (buscador.value.length == 0) {
      ConsultarLista(1);
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
  });

  paginarRegistros = () => {
    // ------------ PAGINADOR DE LISTA --------------
    //Elementos funcionales
    back = document.getElementById("back");
    next = document.getElementById("next");

    //Elementos paginas
    uno = document.getElementById("uno");
    dos = document.getElementById("dos");
    tres = document.getElementById("tres");

    pg_final = 0;
    pag_actual = 1;
    // ----- LLamamos funcion ------

    ConsultarLista(1).then((valor) => {
      pg_final = Math.ceil(valor / 5);

      //Ocultar primer boton
      uno.classList.add("press");
      back.style.display = "none";

      //Si hay menos de 3 paginas
      if (pg_final == 3) {
        next.style.display = "none";
      }

      //Si solo hay 2 paginas
      else if (pg_final == 2) {
        next.style.display = "none";
        tres.style.display = "none";
      }

      //Si solo hay 1 pagina
      else if (pg_final == 1) {
        next.style.display = "none";
        tres.style.display = "none";
        dos.style.display = "none";
      }

      //Funcion pasar pagina
      next.addEventListener("click", () => {
        uno.innerHTML == 0 ?
          (back.style.display = "none") :
          (back.style.display = "inline");
        tres.innerHTML == pg_final - 1 ?
          (next.style.display = "none") :
          (next.style.display = "inline");

        uno.innerHTML = parseInt(uno.innerHTML) + 1;
        dos.innerHTML = parseInt(dos.innerHTML) + 1;
        tres.innerHTML = parseInt(tres.innerHTML) + 1;

        ValidarPaginaActual(pag_actual);
      });

      //Funcion regresar pagina
      back.addEventListener("click", () => {
        uno.innerHTML == 2 ?
          (back.style.display = "none") :
          (back.style.display = "inline");
        tres.innerHTML == pg_final + 1 ?
          (next.style.display = "none") :
          (next.style.display = "inline");

        uno.innerHTML = parseInt(uno.innerHTML) - 1;
        dos.innerHTML = parseInt(dos.innerHTML) - 1;
        tres.innerHTML = parseInt(tres.innerHTML) - 1;

        ValidarPaginaActual(pag_actual);
      });

      uno.addEventListener("click", () => {
        pag_actual = uno.innerHTML;
        ConsultarLista(uno.innerHTML);
        ValidarPaginaActual(pag_actual);
      });
      dos.addEventListener("click", () => {
        pag_actual = dos.innerHTML;
        ConsultarLista(dos.innerHTML);
        ValidarPaginaActual(pag_actual);
      });
      tres.addEventListener("click", () => {
        pag_actual = tres.innerHTML;
        ConsultarLista(tres.innerHTML);
        ValidarPaginaActual(pag_actual);
      });
    });
  };

  paginarRegistros();


}