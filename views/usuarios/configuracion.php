<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../_public/style/usuarios/formulario.css">
    <link rel="stylesheet" href="../_public/style/usuarios/listar.css">
    <link rel="stylesheet" href="../_public/style/_general/style.css">
    <link rel="stylesheet" href="../_public/style/_general/sidebar.css">
    <link rel="stylesheet" href="../_public/style/_general/responsive.css">
    <!----===== Boxicons CSS ===== -->
    <link rel="stylesheet" href="../../dependencias/boxicons-2.1.4/css/boxicons.min.css">
    <!----===== Bootstrap ===== -->
    <link rel="stylesheet" href="../../dependencias/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css">
    <!----===== SweetAlert ===== -->
    <script src="../../dependencias/sweetAlert/js/sweetAlert-main.js"></script>

    <title>Electrobike</title>
</head>

<!-------- Llamar la sesion ----->
<?php include('../_public/_layout/sesion.html'); ?>

<body class="animate-in-ov">

    <!-------- Llamar al nav ----->
    <?php include('../_public/_layout/nav.html'); ?>

    <section class="home">

        <!-- -------------------- Header --------------- -->
        <div class="header">

            <!---------- Icono menu_movil ---------->
            <div class="nav_movil">
                <div class="_layer -top"></div>
                <div class="_layer -mid"></div>
                <div class="_layer -bottom"></div>
            </div>

            <h1 id="titulo" class="titulo"></h1>

            <!-------- Llamar al nav_movil ----->


            <?php include('../_public/_layout/nav_movil.html'); ?>


            <!-------- Llamar recuadro user ----->
            <?php include('../_public/_layout/user.html'); ?>


        </div>


        <!-- -----------------------FORMULARIO --------------------------------------------- -->

        <form>
            <br>

            <main>
                <div class="formulario">

                    <!-- ------ Nombre Usuario ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Id del usuario</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" value="" name="idUsuario" id="idUsuario_" disabled>
                        </div>
                    </div>


                    <!-- ------ Nombre Usuario ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Nombre del usuario</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" value="" name="nombreUsuario" id="nombreUsuario_" disabled>
                        </div>

                    </div>

                    <!-- ------ Tipo de documento ------ -->

                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Tipo de documento</label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="tipoDocumentoUsuario" id="tipoDocumentoUsuario_" disabled>
                                <option id="tipoDocumento_"> </option>
                                <option id="tipoDocumento_opc2"> </option>
                                <option id="tipoDocumento_opc3"> </option>
                            </select>
                        </div>
                    </div>


                    <!-- ------ Numero de documento ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Número de documento</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" value="" name="documentoUsuario" id="documentoUsuario_" disabled>
                        </div>

                    </div>


                    <!-- ------ Correo Electronico ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Correo electrónico</label>
                        <div class="formulario__grupo-input">
                            <input type="email" class="formulario__input" value="" name="correoUsuario" id="correoUsuario_" disabled>
                        </div>

                    </div>


                    <!-- ------ Rol ------ -->

                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Rol</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" value="" name="rolUusario" id="rolUsuario_" disabled>

                        </div>
                    </div>


                    <!-- ------ Estado ------ -->
                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Estado</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" value="" name="estadoUsuario" id="estadoUsuario_" disabled>

                        </div>
                    </div>


                    <!-- ------ Contreasena ------ -->
                    <div style="margin-top:50px; display:grid ;grid-template-columns: 1fr 1fr;">
                        <button style="grid-column: 2;" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Cambiar contraseña
                        </button>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div style=" margin-top: 110px;" class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Cambiar contraseña</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="exampleInputEmail1" class="form-label">Contraseña actual</label>
                                    <input type="email" class="form-control" id="contraActual" placeholder="Ingrese su contraseña actual">
                                    <hr>
                                    <label for="exampleInputEmail1" class="form-label">Nueva contraseña</label>
                                    <input type="email" class="form-control" id="nuevaContra1" placeholder="Ingrese su contraseña nueva">
                                    <br>
                                    <label for="exampleInputEmail1" class="form-label">Confirmar contraseña</label>
                                    <input type="email" class="form-control" id="nuevaContra2" placeholder="Confirme su contraseña nueva">

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button id="cambiarContrasena" type="button" class="btn btn-primary">Cambiar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            <br>





            <div class="formulario__grupo formulario__grupo-btn-enviar">
                <button type="button" id="permitirEditar" class="registrar">Editar</button>
            </div>

            <div class="formulario__grupo formulario__grupo-btn-enviar">
                <button type="button" id="actualizarUsuario" class="registrar registrarRol">Actualizar</button>
            </div><br>

            <br>

        </form>
        <!-- ------------------------------------------------------------------------------- -->



        <h1 class="page" id="ModuloActual">usuarios</h1>
        <h1 class="page" id="SubModuloActual">configuracion</h1>
    </section>


    <style>
        .modal.fade.show {
            background-color: rgba(0, 0, 0, 0);
            /* Color de fondo con transparencia */
            backdrop-filter: blur(5px);
            /* Aplicar desenfoque */
        }
    </style>


    <script src="../../negocio/usuarios/usuarios.js"></script>
    <script src="../../negocio/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>