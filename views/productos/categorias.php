<?php
require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$categorias = ['Bicicletas alta gama', 'Bicicletas baja gama', 'Repuestos alta gama', 'Repuestos baja gama'];
$listaCantidades = [];
foreach ($categorias as $key => $categoria) {
    $cat = $con->query("SELECT SUM(cantidadProducto) AS total FROM productos WHERE categoriaProducto = '$categoria'");
    $cat->execute();
    $consultaCat = $cat->fetchAll(PDO::FETCH_ASSOC);
    $total = $consultaCat[0]['total'];
    array_push($listaCantidades, $total);
}

?>


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
    <link rel="stylesheet" href="../_public/style/productos/categorias.css">
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

        <!-- - ----------------------- CATEGORIAS --------------------------------------------- -->




        <form class="container cajas" action="listarCategorias.php" method="get">
            <button type="submit" name='categoria' value="bicicletasAltaGama" class="text-decoration-none text-dark" id='bicicletasAltaGama'>
                <div id="BA" class="box1">
                    <h2 class="title">Bicicletas alta gama</h2>
                    <p class="description"><?php echo $listaCantidades[0] ?></p>
                </div>
            </button>

            <button type="submit" name='categoria' value='bicicletasBajaGama' class="text-decoration-none text-dark" id='bicicletasBajaGama'>
                <div id="BB" class="box2">
                    <h2 class="title">Bicicletas baja gama</h2>
                    <p class="description"><?php echo $listaCantidades[1] ?></p>

                </div>
            </button>

            <button type="submit" name='categoria' value='repuestosAltaGama' class="text-decoration-none text-dark" id='repuestosAltaGama'>
                <div id="RA" class="box3">
                    <h2 class="title">Repuestos alta Gama</h2>
                    <p class="description"><?php echo $listaCantidades[2] ?></p>

                </div>
            </button>

            <button type="submit" name='categoria' value='repuestosBajaGama' class="text-decoration-none text-dark" id='repuestosBajaGama'>
                <div id="RB" class="box4">
                    <h2 class="title">Repuestos baja Gama</h2>
                    <p class="description"><?php echo $listaCantidades[3] ?></p>
                </div>
            </button>

        </form>


        <!-- ------------------------------------------------------------------------------- -->



        <h1 class="page" id="ModuloActual">productos</h1>
        <h1 class="page" id="SubModuloActual">categorias</h1>
    </section>

    <script src="../../negocio/productos/productos.js"></script>
    <script src="../../negocio/_general/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>

    </div>
</body>

</html>

