<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

//Obtenemos todos los clientes para el filtro
$clientes = $con->query("SELECT * FROM clientes ");
$clientes->execute();
$consultaClientes = $clientes->fetchAll(PDO::FETCH_ASSOC);

//Obtenemos todos las fechas para el filtro
$fechas = $con->query("SELECT DISTINCT  fechaVenta FROM ventas ");
$fechas->execute();
$consultaFechas = $fechas->fetchAll(PDO::FETCH_ASSOC);
$fechasDisponibles = [];


foreach ($consultaFechas as $key => $value) {
    array_push($fechasDisponibles, $value['fechaVenta']);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../_public/style/ventas/formulario.css">
    <link rel="stylesheet" href="../_public/style/ventas/listar.css">
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
                <a href="../ventas/registrar.php"><button class="vinculo btn btn-primary">Registrar</button></a>
            </div>

            <br>

            <form class="formReporte" action="reportesVentas.php" method="post">

                <div class="btn-izquierda selects">

                    <!-- ------ Clientes ------ -->
                    <div class="select_clien filtro" style="margin-right: 20px;">
                        <select class="formulario__input" name="cliente_id" id="select_cliente">
                            <option>Todos los clientes</option>
                            <?php $x = 0;
                            foreach ($consultaClientes as $row) {
                                $x += 1 ?>
                                <option value="<?php echo $row['idCliente'] ?>"> <?php echo $row['nombreCliente'] ?> </option><?php }
                                                                                                                            if ($x == 0) { ?><option> No se encontro ningún cliente </option><?php } ?>
                        </select>
                    </div>

                    <!-- ------ Fechas ------ -->

                    <h1 id="fechas" style="display: none;"><?php foreach ($fechasDisponibles as $key => $value) {
                                                                echo $value . ",";
                                                            } ?></h1>
                    <input id="select_fechas" name="fecha_venta" class="calendario" value="Todas las fechas" type="text" readonly>
                    <button style="display: none;" id="FechasTodas" class="btn btn-primary">Ver todas las fechas</button>

                    <!-- ---------------------- -->



                </div>

                <!-- elemento derecha -->
                <br><button type="submit" class="btn-derecha btn btn-success">Generar reporte excel</button>
            </form>

            <style>
                .formReporte {
                    display: grid;
                    grid-template-columns: 1fr !important;
                }

                .btn-izquierda {
                    justify-self: start;
                    /* Alinea a la izquierda */
                }

                .btn-derecha {
                    justify-self: end;
                    /* Alinea a la izquierda */

                }


                @media(max-width: 550px) {

                    .selects {
                        grid-template-columns: 1fr !important;
                    }
                }
            </style>
            <br>

            <!-- Modal -->
            <div class="modal fade" id="ModalGarantia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Garantía de venta</h5>
                            <i style="cursor: pointer;font-size:24px" data-dismiss="modal" aria-label="Close" class='bx bx-x icon close'></i>
                        </div>

                        <div class="modal-body">

                            <form class="garantiaCont">

                                <div class="row">
                                    <div class="col">
                                        <label>Id de venta</label>
                                        <input type="text" class="form-control" id="id_modal_garantia" disabled>
                                    </div>
                                    <div class="col">
                                        <label>Cliente</label>
                                        <input type="text" class="form-control" id="cliente_modal_garantia" disabled>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <label>Fecha de venta</label>
                                        <input type="text" class="form-control" id="fechaVenta_modal_garantia" disabled>
                                    </div>
                                    <div class="col">
                                        <label>Valor Total</label>
                                        <input type="text" class="form-control" id="valorT_modal_garantia" disabled>
                                    </div>
                                </div>

                                <hr>
                                <div id="productos_container">
                                    <div id="carouselExample" class="carousel slide ">

                                        <div id="clicado" class="carousel-inner">
                                        </div>

                                        <button id="prev1" style="border: 0px;margin-top:28px" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                            <span class="btn btn-primary carousel-control-prev-icon " aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>

                                        <button id="next1" style="border: 0px;margin-top:28px" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                            <span class="btn btn-primary carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>


                            </form>

                        </div>




                        <div class="modal-footer">

                            <button style="z-index: 9000" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->


                        </div>

                    </div>
                </div>
            </div>

            <!-- Modal garantia efectuada -->
            <div class="modal fade" id="VerGarantia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content" style="height: 589px;">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Garantía de venta</h5>
                            <i style="cursor: pointer;font-size:24px" data-dismiss="modal" aria-label="Close" class='bx bx-x icon close'></i>
                        </div>

                        <div class="modal-body">

                            <div id="productos_container">
                                <div id="carrusel" class="carousel slide ">

                                    <div id="listaGarantia" class="carousel-inner">

                                    </div>

                                    <button id="prev1" style="border: 0px;margin-top:55px" type="button" data-bs-target="#carrusel" data-bs-slide="prev">
                                        <span class="btn btn-primary carousel-control-prev-icon " aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>

                                    <button id="next1" style="border: 0px;margin-top:55px" type="button" data-bs-target="#carrusel" data-bs-slide="next">
                                        <span class="btn btn-primary carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>


                        </div>




                        <div class="modal-footer">

                            <button style="z-index: 9000" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>


                        </div>

                    </div>
                </div>
            </div>


            <!-- ------ TABLA ----- -->
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>Valor Total</th>
                            <th>Nombre Cliente</th>
                            <th>Fecha de venta</th>
                            <th>Nombre Producto</th>
                            <th>Cantidad</th>
                            <th>Valor unitario</th>
                            <th>Acciones</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody id="contenido">

                    </tbody>
                </table>

            </div>
            <!-- PAGINADOR -->

            <div id="cont-pag" class="cont">
                <button class="btn-pag" id="back">⬅</button>
                <button class="btn-pag " id="uno">1</button>
                <button class="btn-pag" id="dos">2</button>
                <button class="btn-pag" id="tres">3</button>
                <button class="btn-pag" id="next">➡</button>
            </div>

            <br>

        </div>

        <!-- ------------------------------------------------------------------------------- -->




        <h1 class="page" id="ModuloActual">ventas</h1>
        <h1 class="page" id="SubModuloActual">listar</h1>
    </section>



    <!-- Agrega los enlaces a los archivos JavaScript de Bootstrap -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    <script src="../../negocio/_general/script.js"></script>
    <script src="../../negocio/ventas/ventas.js"></script>



    </div>
</body>

</html>

<style>
    .modal-body {
        max-height: 640px !important;
    

    }

    #productos_container {
        border-radius: 10px;
        padding: 20px;
        height: 200px !important;

    }



    .modal.fade.show {
        background-color: rgba(0, 0, 0, 0);
        /* Color de fondo con transparencia */
        backdrop-filter: blur(5px);
        /* Aplicar desenfoque */
    }
</style>