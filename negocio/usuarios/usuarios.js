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



    const Registrar = async (nombreUsuario_, tipoDocumentoUsuario_,
        documentoUsuario_, correoUsuario_, rolUsuario_, contrasenaUsuario_) => {
        // Se envian los datos en .json ----------
        const datosRg = new FormData();
        datosRg.append("nombreUsuario", nombreUsuario_);
        datosRg.append("tipoDocumentoUsuario", tipoDocumentoUsuario_);
        datosRg.append("documentoUsuario", documentoUsuario_);
        datosRg.append("correoUsuario", correoUsuario_);
        datosRg.append("rolUsuario", rolUsuario_);
        datosRg.append("contrasenaUsuario", contrasenaUsuario_);

        var registrarUsuarios = await fetch("../../controllers/usuarios/registrar.php", {
            method: 'POST',
            body: datosRg
        });


        setTimeout(() => {

            Swal.fire({
                title: 'Usuario registrado! ',
                text: 'Se ha registrado un usuario',
                icon: "success",
                confirmButtonText: "Confirmar",
                timer: 1200,
                timerProgressBar: true,
                position: "bottom-end",
                showConfirmButton: false,
                confirmButtonColor: '#118dd5',
                confirmButtonAriaLabel: 'Confirmar',
                allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
                allowEscapeKey: false, // Evita que la alerta se cierre al presionar la tecla "Esc"
            }).then(() => {
                window.location.href = '../../views/usuarios/listar.php'
            });
        }, 1000)

    }


    // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
    const Validar = async () => {
        registrar.disabled = false;
        //Se optienen los elemenstos de ingreso
        var nombreUsuario = document.getElementById('nombreUsuario').value.trim();
        var tipoDocumentoUsuario = document.getElementById('tipoDocumentoUsuario').value.trim();
        var documentoUsuario = document.getElementById('documentoUsuario').value.trim();
        var correoUsuario = document.getElementById('correoUsuario').value.trim();
        var rolUsuario = document.getElementById('rolUsuario').value.trim();
        var contrasenaUsuario = document.getElementById('contrasenaUsuario').value.trim();
        var contrasenaUsuario2 = document.getElementById('contrasenaUsuario2').value.trim();


        // Dividir el texto en palabras utilizando los espacios en blanco como separadores
        var ListanombreUsuario = nombreUsuario.split(" ").length;

        //Validar correo 
        var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;



        console.log
        if (
            nombreUsuario.trim() === "" ||
            documentoUsuario.trim() === "" ||
            correoUsuario.trim() === "" ||
            contrasenaUsuario.trim() === "" ||
            contrasenaUsuario2.trim() === "" ||
            tipoDocumentoUsuario == "Seleccione un tipo de documento" ||
            rolUsuario == "Seleccione un rol"
        ) {
            Swal.fire({
                title: "Campos vacíos",
                text: "Por favor llene todos los campos",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else if (ListanombreUsuario < 3 || ListanombreUsuario > 4) {
            Swal.fire({
                title: "Nombre invalido",
                text: "Por favor ingrese su nombre completo",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else if (!nombreRegex.test(nombreUsuario.trim())) {
            Swal.fire({
                title: "Nombre invalido",
                icon: "warning",
                confirmButtonColor: "#118dd5",
                text: "Por favor ingrese un nombre válido",
            });
        } else if (documentoUsuario.length < 7) {
            Swal.fire({
                title: "Documento Invalido",
                text: "Por favor ingrese un documento válido",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else if (!regexCorreo.test(correoUsuario)) {
            Swal.fire({
                title: "Correo electrónico invalido",
                text: "El correo no es válido",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });

        } else if (contrasenaUsuario.trim() != contrasenaUsuario2.trim()) {
            Swal.fire({
                title: "Error de contraseña",
                text: "Las contraseñas no coinciden",
                icon: "warning",
                confirmButtonColor: "#118dd5",
            });
        } else if ((contrasenaUsuario.trim()).length <= 7 || (contrasenaUsuario2.trim()).length <= 7) {
            Swal.fire({
                icon: 'error',
                title: 'Error de contraseña',
                text: 'La contraseña debe contener almenos 8 caracteres',
                confirmButtonColor: "#118dd5",
            });
        } else {
            //----------- Validar si estan repetidos -------
            registrar.disabled = true;
            // Solo se envian los necesarios ----------
            const datosCl = new FormData();
            datosCl.append("documentoUsuario", documentoUsuario);
            datosCl.append("correoUsuario", correoUsuario);

            var consultaUsuarios = await fetch("../../controllers/usuarios/repetidos.php", {
                method: 'POST',
                body: datosCl
            });

            //Traer mensaje de respuesta desde PHP -----
            var resultado = await consultaUsuarios.json();

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

                Registrar(nombreUsuario, tipoDocumentoUsuario,
                    documentoUsuario, correoUsuario, rolUsuario, contrasenaUsuario);

            }


        }
    }

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
        CargarRegistro()
    });


}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- LISTAR ----------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------


if (valorSubModuloActual == "listar") {


    listar = (data, roles) => {

        elimnar = (rolBusqueda) => {
            nuevoDic = {}
            roles.forEach(rol => {
                if (rol['nombreRol'] != rolBusqueda) {
                    nuevoDic[rol['idRol']] = rol['nombreRol']
                }
            });
            options = ''
            llaves = Object.keys(nuevoDic)

            llaves.forEach(llave => {
                options = options + `<option value="${llave}" >${nuevoDic[llave]} </option>\n`
            });

            // nuevoDic.forEach(dates => {
            //     options = options + `<option value="${dates[0]}" > ${dates[1]} </option>`
            // });


            return options;
        }

        contenido = document.getElementById("contenido");
        contenido.innerHTML = "";

        for (let i = 0; i < (data).length; i++) {

            if (data[i]['idUsuario'] == 1) {
                idFijo = 'r_fijo'
            } else {
                idFijo = ''
            }

            fila = document.createElement("tr");
            fila.innerHTML = `
  
      <td data-label="ID" class="text-center idUsuario">${data[i]['idUsuario']}</td>
      <td data-label="Nombre Completo" class="text-center nombreUsuario">${data[i]['nombreUsuario']}</td>
      <td data-label="Tipo documento" class="text-center tipoDocumentoUsuario">${data[i]['tipoDocumentoUsuario']}</td>
      <td data-label="Numero documento" class="text-center documentoUsuario">${data[i]['documentoUsuario']}</td>
      <td data-label="Correo Electronico" class="text-center correoUsuario">${data[i]['correoUsuario']}</td>
      <td data-label="Rol" class="text-center">${data[i]['nombreRol']}</td>
      <td data-label="Estado" class="text-center ${data[i]['estadoUsuario']} estadoModulo">${data[i]['estadoUsuario']}</td>

      <td data-label="Acciones" class="text-center">
          <button id="${idFijo}" class="Btn botonActualizarModulo${i+1}">Editar
              <svg class="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
          </button>
      </td> `

            modal = document.createElement("div");

            //Opciones estado
            if (data[i]['estadoUsuario'] == 'Activo') {
                opEs = `<option>Inactivo</option>`
            } else {
                opEs = `<option>Activo</option>`
            }

            //Opcciones tipo documento
            if (data[i]['tipoDocumentoUsuario'] == 'Cedula') {
                opTp = `
                <option value="Cedula Extranjera">Cedula Extranjera</option>
                <option value="Pasaporte">Pasaporte</option>
      `
            } else if (data[i]['tipoDocumentoUsuario'] == 'Cedula Extranjera') {
                opTp = `
                <option value="Cedula">Cédula</option>
                <option value="Pasaporte">Pasaporte</option>
      `
            } else if (data[i]['tipoDocumentoUsuario'] == 'Pasaporte') {
                opTp = `
                <option value="Cedula">Cédula</option>
                <option value="Cedula Extranjera">Cédula Extranjera</option>
        
      `
            }

            //Opciones Rol
            OtrosRoles = elimnar(data[i]['nombreRol'])

            modal.innerHTML = ` 

      <form action="../../controllers/usuarios/actualizar.php" method="POST">

        <div class="contenedorActualizarModulo">
            <h1 class="tituloVentana">Actualizar Usuarios</h1>

            <div class="contenedorActualizar">

                <div class="" id="">
                    <label class="formulario__label">ID </label>
                    <div class=""><input type="text" class="form-control idUsuario_" name="idUsuario" value="${data[i]['idUsuario']}" disabled>
                    </div>
                </div>


                <div class="" id="">
                    <label class="formulario__label">Nombre<i style="color:red">*</i> </label>
                    <div><input type="text" class="form-control nombreUsuarioActualizado" name="nombreUsuario" value="${data[i]['nombreUsuario']}" id="input2">
                    </div>

                </div>


                <div class="" id="">
                    <label for="" class="formulario__label">Tipo de documento<i style="color:red">*</i></label>
                    <select class="form-select tipoDocumentoUsuarioActualizado" name="tipoDocumentoUsuario" id="select1">
                        <option>${data[i]['tipoDocumentoUsuario']}</option>
                        ${opTp}

                    </select>
                </div>

                <div class="">
                    <label for="password2" class="formulario__label">Documento de identidad<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="form-control documentoUsuarioActualizado" name="documentoUsuario" value="${data[i]['documentoUsuario']}" id="input1" oninput="filtroNumero(this)">
                    </div>
                </div>

                <div class="">
                    <label for="password2" class="formulario__label">Correo<i style="color:red">*</i> </label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="form-control correoUsuarioActualizado" value="${data[i]['correoUsuario']}" name="correoUsuario" id="input3">
                    </div>
                </div>




                <div class="formulario__grupo" id="grupo__usuario"> 
                    <label for="" class="formulario__label">Rol<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <select class="form-select rolUsuarioActualizado" name="rolUsuario" id="rolUsuario">
                            <option value="${data[i]['idRol']}" selected>${data[i]['nombreRol']}</option>
                            ${OtrosRoles}
                        </select>
                    </div>
                </div>

                <div class="">
                    <label class="formulario__label">Estado<i style="color:red">*</i></label>
                    <select class="form-select estadoUsuarioActualizado" name="estadoUsuario" id="">
                        <option selected>${data[i]['estadoUsuario']}</option>
                        ${opEs}
                    </select>
                </div>

            </div>


            <div class="contenedorBotones">
                <div class="botonGuardar">
                    <button type="button" class="btn btn-primary guardarUsuarios" name="" id=''> Guardar </button>
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

        //--------------------- EDITAR USUARIOS ------------------
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
                    text: "No puedes editar el usuario administrador",
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


        // ----------------  validar ediciones repetidas -----------------}

        for (let x = 0; x < totalReg; x++) {

            const Editar = async (idUsuario_, nombreUsuarioActualizado_,
                tipoDocumentoUsuarioActualizado_, documentoUsuarioActualizado_,
                correoUsuarioActualizado_, rolUsuarioActualizado_, estadoUsuarioActualizado_) => {

                const datosAc = new FormData();
                datosAc.append("idUsuario", idUsuario_);
                datosAc.append("nombreUsuario", nombreUsuarioActualizado_);
                datosAc.append("tipoDocumentoUsuario", tipoDocumentoUsuarioActualizado_);
                datosAc.append("documentoUsuario", documentoUsuarioActualizado_);
                datosAc.append("correoUsuario", correoUsuarioActualizado_);

                datosAc.append("rolUsuario", rolUsuarioActualizado_);
                datosAc.append("estadoUsuario", estadoUsuarioActualizado_);

                var actualizarUsuario = await fetch("../../controllers/usuarios/actualizar.php", {
                    method: 'POST',
                    body: datosAc
                });

                setTimeout(() => {

                    Swal.fire({
                        title: 'Usuario actualizado! ',
                        text: 'Se ha actualizado un usuario',
                        icon: "success",
                        confirmButtonText: "Confirmar",
                        timer: 1200,
                        timerProgressBar: true,
                        position: "center",
                        showConfirmButton: false,
                        confirmButtonColor: '#118dd5',
                        confirmButtonAriaLabel: 'Confirmar',
                    }).then(() => {
                        window.location.href = '../../views/usuarios/listar.php'
                    });
                }, 1000)



            }
            guardarClientes = document.getElementsByClassName(`guardarUsuarios`);

            guardarClientes[x].addEventListener('click', () => {
                const Validar = async () => {
                    // ------------------------- VALIDAR CAMPOS VACIOS -----------------------------
                    //Se optienen todos los elementos de ingreso
                    //---------------- CONSULTAR REPETIDOS -----------------

                    var idUsuario = document.getElementsByClassName('idUsuario_')[x].value.trim();
                    var nombreUsuarioActualizado = document.getElementsByClassName('nombreUsuarioActualizado')[x].value.trim();
                    var tipoDocumentoUsuarioActualizado = document.getElementsByClassName('tipoDocumentoUsuarioActualizado')[x].value.trim();
                    var documentoUsuarioActualizado = document.getElementsByClassName('documentoUsuarioActualizado')[x].value.trim();
                    var correoUsuarioActualizado = document.getElementsByClassName('correoUsuarioActualizado')[x].value.trim();
                    var rolUsuarioActualizado = document.getElementsByClassName('rolUsuarioActualizado')[x].value.trim();
                    var estadoUsuarioActualizado = document.getElementsByClassName('estadoUsuarioActualizado')[x].value.trim();


                    // Dividir el texto en palabras utilizando los espacios en blanco como separadores
                    var ListanombreUsuario_ = nombreUsuarioActualizado.split(" ").length;

                    //Validar correo 
                    var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/;


                    if (
                        nombreUsuarioActualizado.trim() === "" ||
                        documentoUsuarioActualizado.trim() === "" ||
                        correoUsuarioActualizado.trim() === "" ||
                        tipoDocumentoUsuarioActualizado.value == "Seleccione un tipo de documento"
                    ) {
                        Swal.fire({
                            title: "Campos vacíos",
                            text: "Por favor llene todos los campos",
                            icon: "warning",
                            confirmButtonColor: "#118dd5",
                        });
                    } else if (ListanombreUsuario_ < 3 || ListanombreUsuario_ > 4) {
                        Swal.fire({
                            title: "Nombre invalido",
                            text: "Por favor ingrese su nombre completo",
                            icon: "warning",
                            confirmButtonColor: "#118dd5",
                        });
                    } else if (!nombreRegex.test(nombreUsuarioActualizado)) {
                        Swal.fire({
                            title: "Nombe invalido",
                            icon: "warning",
                            confirmButtonColor: "#118dd5",
                            text: "Por favor ingrese un nombre de rol válido",
                        });
                    } else if (documentoUsuarioActualizado.length < 7) {
                        Swal.fire({
                            title: "Documento Invalido",
                            text: "Por favor ingrese un documento válido",
                            icon: "warning",
                            confirmButtonColor: "#118dd5",
                        });
                    } else if (!regexCorreo.test(correoUsuarioActualizado)) {
                        Swal.fire({
                            title: "Correo Electronico invalido",
                            text: "El correo no es válido",
                            icon: "warning",
                            confirmButtonColor: "#118dd5",
                        });

                    } else {

                        //----------- Validar si estan repetidos -------

                        // Solo se envian los necesarios ----------
                        const datosCl = new FormData();
                        datosCl.append("idUsuario", idUsuario);
                        datosCl.append("documentoUsuario", documentoUsuarioActualizado);
                        datosCl.append("correoUsuario", correoUsuarioActualizado);

                        var consultaUsuarios = await fetch("../../controllers/usuarios/validarActualizar.php", {
                            method: 'POST',
                            body: datosCl
                        });


                        //Traer mensaje de respuesta desde PHP -----
                        var resultado = await consultaUsuarios.json();
                        // console.log(resultado)

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
                            Editar(idUsuario, nombreUsuarioActualizado,
                                tipoDocumentoUsuarioActualizado, documentoUsuarioActualizado,
                                correoUsuarioActualizado, rolUsuarioActualizado, estadoUsuarioActualizado)
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


    }


    ConsultarLista = async (pag) => {

        const datosCons = new FormData();
        datosCons.append("pagina", pag);

        var ConsultarLista = await fetch("../../controllers/usuarios/listado.php", {
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
          <td colspan="8" class="text-center" > No tienes ningún usuario registrado </td>`
            contenido.appendChild(fila)

            //Ocultar el paginador 
            cont_pag = document.getElementById('cont-pag')
            cont_pag.style.visibility = 'hidden'

        } else {
            cont_pag = document.getElementById('cont-pag')
            cont_pag.style.visibility = 'visible'

            listar(resultado.data, resultado.roles)
        }
        return resultado.registros
    }


    BuscarRegistros = async (busqueda) => {
        cont_pag = document.getElementById('cont-pag')
        cont_pag.style.visibility = 'hidden'

        const datosBusq = new FormData();
        datosBusq.append("busqueda", busqueda);

        var ConsultarBusqueda = await fetch("../../controllers/usuarios/buscador.php", {
            method: "POST",
            body: datosBusq,
        });

        var resultado = await ConsultarBusqueda.json();

        if (resultado.success['success']) {
            listar(resultado.data, resultado.roles)
            // console.log(resultado.data)


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
                        confirmButtonText: "Confirmar",
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

if (valorSubModuloActual == "configuracion") {

    id = localStorage.getItem("id");
    id = CryptoJS.AES.decrypt(id, 'electrobike').toString(CryptoJS.enc.Utf8);

    const ObtenerDatos = async (id_) => {

        // Solo se envian los necesarios ----------
        const datosCl = new FormData();
        datosCl.append("id", id_);

        var consultaDatos = await fetch("../../controllers/usuarios/datosPerfil.php", {
            method: 'POST',
            body: datosCl
        });

        //Traer mensaje de respuesta desde PHP -----
        var resultado = await consultaDatos.json();

        nombre = resultado['nombre']
        tipoDocumento = resultado['tipoDocumento']
        documento = resultado['documento']
        correo = resultado['correo']
        contrasena = resultado['contrasena']
        rol = resultado['rol']
        estado = resultado['estado']

        // ---------- OBTENER INPUTS PARA REMPLAZAR ------------
        input_id = document.getElementById('idUsuario_').value = CryptoJS.AES.decrypt(id, 'electrobike').toString(CryptoJS.enc.Utf8);
        input_nombre = document.getElementById('nombreUsuario_').value = nombre
        input_tipo_documento = document.getElementById('tipoDocumento_').innerHTML = tipoDocumento
        if (input_tipo_documento == "Cedula") {
            op2 = "Cedula Extranjera"
            op3 = "Pasaporte"
        }
        if (input_tipo_documento == "Cedula Extranjera") {
            op2 = "Cedula"
            op3 = "Pasaporte"
        }
        if (input_tipo_documento == "Pasaporte") {
            op2 = "Cedula"
            op3 = "Cédula Extranjera"
        }

        document.getElementById('tipoDocumento_opc2').innerHTML = op2
        document.getElementById('tipoDocumento_opc3').innerHTML = op3

        input_documento = document.getElementById('documentoUsuario_').value = documento
        input_correo = document.getElementById('correoUsuario_').value = correo
        input_estado = document.getElementById('estadoUsuario_').value = estado
        input_rol = document.getElementById('rolUsuario_').value = rol

    }

    ObtenerDatos(id)


    const Editar = async (idUsuario_, nombreUsuario_,
        tipoDocumentoUsuario_, documentoUsuario_,
        correoUsuario_, idRolUsuario_, estadoUsuario_) => {

        const datosAc = new FormData();
        datosAc.append("idUsuario", idUsuario_);
        datosAc.append("nombreUsuario", nombreUsuario_);
        datosAc.append("tipoDocumentoUsuario", tipoDocumentoUsuario_);
        datosAc.append("documentoUsuario", documentoUsuario_);
        datosAc.append("correoUsuario", correoUsuario_);
        datosAc.append("rolUsuario", idRolUsuario_);
        datosAc.append("estadoUsuario", estadoUsuario_);

        var actualizarUsuario = await fetch("../../controllers/usuarios/editarPerfil.php", {
            method: 'POST',
            body: datosAc
        });

        Swal.fire({
            title: 'Usuario actualizado! ',
            text: 'Se ha actualizado un usuario',
            icon: "success",
            confirmButtonText: "Confirmar",
            timerProgressBar: true,
            timer: 1200,
            position: "center",
            showConfirmButton: false,
            confirmButtonColor: '#118dd5',
            confirmButtonAriaLabel: 'Confirmar',
        }).then(() => {
            location.reload();
        })


    }

    btnActualizarUsuario = document.getElementById('actualizarUsuario');
    btnActualizarUsuario.addEventListener('click', () => {
        const ValidarConfig = async () => {

            var idUsuario_ = document.getElementById('idUsuario_').value.trim();
            var nombreUsuario_ = document.getElementById('nombreUsuario_').value.trim();
            var tipoDocumentoUsuario_ = document.getElementById('tipoDocumentoUsuario_').value.trim();
            var documentoUsuario_ = document.getElementById('documentoUsuario_').value.trim();
            var correoUsuario_ = document.getElementById('correoUsuario_').value.trim();

            var idRolUsuario_ = document.getElementById('rolUsuario_').value.trim();
            var estadoUsuario_ = document.getElementById('estadoUsuario_').value.trim();

            // Dividir el texto en palabras utilizando los espacios en blanco como separadores
            var ListanombreUsuario = nombreUsuario_.split(" ").length;

            if (
                nombreUsuario_.trim() === "" ||
                documentoUsuario_.trim() === ""
            ) {
                Swal.fire({
                    title: "Campos vacios",
                    text: "Por favor llene todos los campos",
                    icon: "warning",
                    confirmButtonColor: "#118dd5",
                });
            } else if (ListanombreUsuario < 3 || ListanombreUsuario > 4) {
                Swal.fire({
                    title: "Nombre invalido",
                    text: "Por favor ingrese su nombre completo",
                    icon: "warning",
                    confirmButtonColor: "#118dd5",
                });
            } else if (documentoUsuario_.length < 7) {
                Swal.fire({
                    title: "Documento Invalido",
                    text: "Por favor ingrese un documento válido",
                    icon: "warning",
                    confirmButtonColor: "#118dd5",
                });
            } else {

                //----------- Validar si estan repetidos -------

                // Solo se envian los necesarios ----------
                const datosCl = new FormData();
                datosCl.append("idUsuario", idUsuario_);
                datosCl.append("documentoUsuario", documentoUsuario_);


                var consultaUsuarios = await fetch("../../controllers/usuarios/validarConfig.php", {
                    method: 'POST',
                    body: datosCl
                });

                //Traer mensaje de respuesta desde PHP -----
                var resultado = await consultaUsuarios.json();

                //---- Si alguno esta repetido ERROR
                if (resultado.success == false) {
                    Swal.fire({
                        title: resultado.title,
                        text: resultado.mensaje,
                        icon: "warning",
                        confirmButtonColor: "#118dd5",
                    });

                    //---- Si ninguno está repetido llamar la funcion registrar
                } else {
                    Editar(idUsuario_, nombreUsuario_,
                        tipoDocumentoUsuario_, documentoUsuario_,
                        correoUsuario_, idRolUsuario_, estadoUsuario_)
                }
            }


        }

        ValidarConfig();

    })


    // BOTON EDITAR DATOS
    permisoEditar = document.getElementById('permitirEditar')
    btnActualizarUsuario.style.display = 'none'

    permisoEditar.addEventListener('click', () => {
        btnActualizarUsuario.style.display = 'block'
        permisoEditar.style.display = 'none'

        nombreUsuario_.disabled = false
        tipoDocumentoUsuario_.disabled = false
        documentoUsuario_.disabled = false

    })

    //Cambiar contrasena
    botonCambiar = document.getElementById('cambiarContrasena')

    botonCambiar.addEventListener('click', () => {

        const CambiarContra = async (id_, contraActual, contraNueva) => {

            // Solo se envian los necesarios ----------
            const datosCl = new FormData();
            datosCl.append("id", id_);
            datosCl.append("contraActual", contraActual);
            datosCl.append("contraNueva", contraNueva);


            var consultaDatos = await fetch("../../controllers/usuarios/cambiarContra.php", {
                method: 'POST',
                body: datosCl
            });

            //Traer mensaje de respuesta desde PHP -----
            var resultado = await consultaDatos.json();

            setTimeout(() => {
                if (resultado.success == false) {
                    Swal.fire({
                        title: "Contrasena incorrecta",
                        text: "Su contrasena no coincide",
                        icon: "warning",
                        confirmButtonColor: "#118dd5",
                      });
                } else {
                    Swal.fire({
                        title: "Contrasena modificada! ",
                        text: "Se ha cambiado su contrasena",
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
                        window.location.href = "../../views/usuarios/configuracion.php";
                    });
                }
            }, 1000)
        }
        id_ = CryptoJS.AES.decrypt(id, 'electrobike').toString(CryptoJS.enc.Utf8);
        contraActual = document.getElementById('contraActual').value.trim()
        nuevaContra1 = document.getElementById('nuevaContra1').value.trim()
        nuevaContra2 = document.getElementById('nuevaContra2').value.trim()

        if (contraActual == '' || nuevaContra1 == '' || nuevaContra2 == '') {
            Swal.fire({
                title: "Campos vacios",
                text: "Por favor llene todos los campos",
                icon: "warning",
                confirmButtonColor: "#118dd5",
              });
        } else if (nuevaContra1 != nuevaContra2) {
            Swal.fire({
                title: "Error de contrasenas",
                text: "Las contrasenas no coinciden",
                icon: "warning",
                confirmButtonColor: "#118dd5",
              });
        } else if (nuevaContra1.length < 8) {
            Swal.fire({
                title: "Error de contrasenas",
                text: "Por favor ingrese al menos 8 caracteres",
                icon: "warning",
                confirmButtonColor: "#118dd5",
              });
        } else {
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
                            await CambiarContra(id_, contraActual, nuevaContra1)
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

            CargarRegistro()


        }






    })

    //Titulo 
    document.getElementById('titulo').innerHTML = 'Configuracion Usuario'


}