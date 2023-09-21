<!-- Coding by CodingLab | www.codinglabweb.com -->
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../_public/style/dashboard/dashboard.css">
    <link rel="stylesheet" href="../_public/style/_general/style.css">
    <link rel="stylesheet" href="../_public/style/_general/sidebar.css">
    <link rel="stylesheet" href="../_public/style/_general/responsive.css">
    <!----=====  Chart.js ===== -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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

        <!-- ----------------------- CATEGORIAS --------------------------------------------- -->


        <div class="dashboard">

            <!-- -------- Tarjetas ------- -->
            <div class="tarjetas">
                <div class="tarjeta tar1">
                    <span class="text">Compras</span>
                    <span id="cant_compras" class="cant">0 $</span>
                </div>
                <div class="tarjeta tar2">
                    <span class="text">Ventas</span>
                    <span id="cant_ventas" class="cant">0 $</span>
                </div>

                <div class="tarjeta tar3">
                    <span class="text">Ganancias</span>
                    <span id="cant_ganancias" class="cant">0 $</span>
                </div>

                <div class="tarjeta tar4">
                    <span class="text">Mejor cliente</span>
                    <span id="mejor_cliente" class="cant">------</span>
                </div>
            </div>

            <!-- -------- Graficas --------- -->
            <div class="graficas">

                <!-- grafica 1 compras y ventas  -->
                <div class="contenidoGr">

                    <div id="graf1" class="graf1">
                        <div class="filtroAno">
                            <label for="">Compras y ventas</label>
                            <select name="" id="anios_grafica">

                            </select>
                        </div>


                        <canvas class="grafi1" id="line-chart1"></canvas>


                    </div>
                </div>


                <!-- grafica 2 prodcutos  -->
                <div class="contenidoGr">
                    <div class="graf2">
                        <div class="filtroAno">
                            <label for="">Productos en stock </label>
                        </div>
                        <canvas id="pie-chart"></canvas>

                    </div>
                </div>


                <!-- grafica 3 top 5 productos  -->
                <div class="contenidoGr">
                    <div class="graf3">
                        <div class="filtroAno">
                            <label for="">Top 5 productos mas vendidos</label>
                            <input class="" type="month" name="" id="select_top">
                        </div>
                        <canvas id="line-chart2"></canvas>
                    </div>
                </div>


                <div class="graf4">
                    <div class="filtroAno">
                        <label for="">Top 5 mejores clientes </label>
                        <input class="" type="month" name="" id="select_top_cl">
                    </div>
                    <div class="bar-horiz">
                        <canvas id="miGrafica"></canvas>
                    </div>
                </div>


            </div>
        </div>




        <!-- ------------------------------------------------------------------------------- -->




        <h1 class="page" id="ModuloActual">inicio</h1>
        <h1 class="page" id="SubModuloActual"></h1>
    </section>


    <script src="../../negocio/_general/script.js"></script>
    <script src="../../negocio/dashboard/dashboard.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>


<style>
    
    @media(max-width: 900px) {
        .dashboard {
            grid-template-columns: 1fr;
            place-items: center;
            width: 100% !important;
        }

        .tarjetas {
            right: 0;
            margin: 0px;
            width: 100%;
            background-color: white;
            
            grid-template-columns: 1fr 1fr;
            gap: 5px !important;
        }

        .tarjeta{
            width: 165px;
        }

        .text {
 
            font-size: 25px !important;
        }
        
        .cant {
            
          
            font-size: 20px !important;
        }
        .graficas {
            margin: 0px;
            margin-top: 10px;
            width: 94%;
            grid-template-columns: 1fr;
        }

    }
</style>