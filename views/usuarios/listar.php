<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../_public/style/usuarios/listar.css">
    <link rel="stylesheet" href="../_public/style/usuarios/formulario.css">
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

        <!-- ----------------------- LISTA --------------------------------------------- -->
        <br>

        <div class="container">

          
        <div class="elementos">
                <a href="../usuarios/registrar.php"><button class="Btn btn btn-primary">Registrar</button></a>

                <div class="buscador">
                    <div class="group_">
                        <svg class="icon_" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                        <input id="buscador" placeholder="Buscador" class="input">
                    </div>

                </div>
            </div>
            <br>
            <div class="table-responsive">
                <table class="table table-striped table-bordered" >
                    <thead>

                        <tr>
                            <th class="recuadro">ID</th>
                            <th class="text-center">Nombre Completo</th>
                            <th class="text-center">Tipo documento</th>
                            <th class="text-center">Número documento</th>
                            <th class="text-center">Correo electrónico</th>
                            <th class="text-center">Rol</th>
                            <th class="text-center">Estado</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody id="contenido">
                    </tbody>

                </table>
                
                <div id="cont-pag" class="cont">
                    <button class="btn-pag" id="back">⬅</button>
                    <button class="btn-pag " id="uno">1</button>
                    <button class="btn-pag" id="dos">2</button>
                    <button class="btn-pag" id="tres">3</button>
                    <button class="btn-pag" id="next">➡</button>
                </div>
                <br><br>
                <h5 id="sinResult"></h5>
            </div>
        </div>

        <!-- ------------------------------------------------------------------------------- -->

        <h1 class="page" id="ModuloActual">usuarios</h1>
        <h1 class="page" id="SubModuloActual">listar</h1>
    </section>








    <script src="../../negocio/usuarios/usuarios.js"></script>
    <script src="../../negocio/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>