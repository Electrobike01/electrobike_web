<?php
require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$proveedores = $con->query("SELECT * FROM proveedores WHERE estadoProveedor = 'Activo'");
$proveedores->execute();
$consultaProveedores = $proveedores->fetchAll(PDO::FETCH_ASSOC);


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
    <link rel="stylesheet" href="../_public/style/compras/formulario.css">
    <link rel="stylesheet" href="../_public/style/compras/listar.css">
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

        <form action="" method="post">

            <br>

            <main>
           

                <!-- ------ Proveedor ------ -->
                <div class="formulario">
                    <div class="formulario__grupo" id="grupo__usuario">
                        <label for="" class="formulario__label">Seleccione un proveedor<i style="color:red">*</i></label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="" id="proveedor">
                                <option>Seleccione un proveedor</option>

                                <?php $x = 0;
                                foreach ($consultaProveedores as $row) {
                                    $x += 1
                                ?>
                                    <option value="<?php echo $row['idProveedor'] ?>"> <?php echo $row['nombreProveedor'] ?> </option>
                                <?php }
                                if ($x == 0) { ?><option>No se encontro ningún proveedor activo </option><?php } ?>
                            </select>

                            

                        </div>
                    </div>


                    <!-- ------ Valor Total ------ -->

                    <div class="formulario__grupo" id="grupo__nombre">
                        <label for="nombre" class="formulario__label">Valor total</label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input" name="" id="campoValorT" disabled value="0">

                        </div>
                    </div>

                </div>
                <br>
                <a class="btn btn-primary" href="../../views/proveedores/registrar.php">Registrar Proveedor</a>


                <hr>


                <div class="formulario">

                    <!-- ------ Datos de compra ------ -->

                    <!-- ------ Categoria ------ -->

                    <div class="formulario__grupo" id="grupo__password">
                        <label for="password" class="formulario__label categorias_producto">Seleccione una categoría<i style="color:red">*</i></label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="" id="categoriaProducto">
                                <option value="Seleccione una categoria">Seleccione una categoría</option>
                                <option value="Bicicletas alta gama">Bicicletas alta gama</option>
                                <option value="Bicicletas baja gama">Bicicletas baja gama</option>
                                <option value="Repuestos alta gama">Repuestos alta gama</option>
                                <option value="Repuestos baja gama">Repuestos baja gama</option>
                            </select>

                        </div>
                    </div>


                    <!-- ------ Producto ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label productos_compra">Seleccione un producto<i style="color:red">*</i></label>
                        <div class="formulario__grupo-input">
                            <select class="formulario__input" name="place" id="producto" disabled>
                                <option value="">Primero seleccione una categoría</option>



                            </select>
                        </div>
                    </div>



                    <!-- ------ Cantidad ------ -->

                    <div class="formulario__grupo" id="grupo__password2">
                        <label for="password2" class="formulario__label">Cantidad de producto<i style="color:red">*</i></label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input cantidades_producto" name="" id="cantidadProducto" oninput="filtroNumero(this)">
                        </div>

                    </div>


                    <!-- ------ Precio ------ -->

                    <div class="formulario__grupo" id="grupo__correo">
                        <label for="correo" class="formulario__label">Precio del producto unitario<i style="color:red">*</i></label>
                        <div class="formulario__grupo-input">
                            <input type="text" class="formulario__input preciosU_producto" name="correo" id="preciosUProducto" oninput="formatearInput(this)">
                        </div>

                    </div>
                </div>


                <br>
                <div class="botones">
                    <button name="" id="botonR" class="btn btn-primary" style="margin-right: 10px;" type="button">Agregar</button>
                    <button name="" id="botonB" style="display: none;" class="btn btn-danger" type="button">Borrar
                        todo</button>


                </div>

            </main>



            <br>

        </form>

        <div class="lista table-responsive">
            <table class="table table-responsive table-bordered">
                <thead class="" style="background-color: #d8d8d8;">
                    <tr>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio U</th>
                        <th scope="col">Cantidad</th>
                        <th class="btns-cont-T" scope="col">Total</th>
                        <th class="btns-cont-a" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="contenido">
                    <!-- Aqui van lo registros -->
                </tbody>
                <tbody>
                    <thead scope="col" style="background-color: #bfbfbf;">
                        <th colspan="6">TOTAL</th>
                        <th id="total2" value="0">0$</th>
                    </thead>
                </tbody>

            </table>
        </div>



        <br><br>

        <!-- ------ Boton registrar------ -->
        <div class="formulario__grupo formulario__grupo-btn-enviar">
            <button type="button" id="finalizarCompra" class="registrar">Registrar </button>
        </div><br>

     



        <!-- ------------------------------------------------------------------------------- -->


        <h1 class="page" id="ModuloActual">compras</h1>
        <h1 class="page" id="SubModuloActual">registrar</h1>
    </section>


    <script src="../../negocio/_general/script.js"></script>
    <script src="../../negocio/compras/compras.js"></script>
  



    </div>
</body>

</html>

