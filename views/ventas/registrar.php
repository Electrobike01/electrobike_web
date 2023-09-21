<?php
require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$clientes = $con->query("SELECT * FROM clientes WHERE estadoCliente = 'Activo'");
$clientes->execute();
$consultaClientes = $clientes->fetchAll(PDO::FETCH_ASSOC);


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>

     <!----============= SELECT2 ================ -->
     <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href= "../_public/style/ventas/formulario.css">
    <link rel="stylesheet" href= "../_public/style/ventas/listar.css">
    <link rel="stylesheet" href= "../_public/style/_general/style.css">
    <link rel="stylesheet" href= "../_public/style/_general/sidebar.css">
    <link rel="stylesheet" href= "../_public/style/_general/responsive.css">
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


        <br>
        <main>
            <div class="formulario">



                <div class="formulario__grupo" id="grupo__usuario">
                    <label for="usuario" class="formulario__label">Seleccionar cliente<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <select class="formulario__input" name="" id="cliente">
                            <option>Seleccione un cliente</option>

                            <?php $x = 0;
                            foreach ($consultaClientes as $row) {
                                $x += 1
                            ?>
                                <option value="<?php echo $row['idCliente'] ?>"> <?php echo $row['nombreCliente'] ?> </option>
                            <?php }
                            if ($x == 0) { ?><option> No se encontro ningún cliente activo </option><?php } ?>


                        </select>



                    </div>
                </div>



                <div class="formulario__grupo" id="grupo__password2">
                    <label for="nombre" class="formulario__label">Valor Total</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" name="" id="campoValorT" disabled value="0">

                    </div>
                </div>
            </div>
            <br>
            <a class="btn btn-primary" href="../../views/clientes/registrar.php">Registrar cliente</a>



            <hr>
            <div class="formulario">



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


                <!-- Cantidad en stock -->
                <div class="formulario__grupo" id="grupo__password">
                    <label class="formulario__label">Cantidad en stock</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" value="0" name="" id="cantidadStock" disabled>
                    </div>

                </div>


                <!-- Promedio de venta -->
                <div class="formulario__grupo" id="grupo__password">
                    <label class="formulario__label">Promedio de venta</label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" value="0" name="" id="promedioVenta" disabled>
                    </div>

                </div>

                <!-- Cantidad de producto -->
                <div class="formulario__grupo" id="grupo__password">
                    <label for="password2" class="formulario__label">Cantidad de producto<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" name="" id="cantidadProducto" oninput="filtroNumero(this)">
                    </div>

                </div>

                <!-- Grupo: Correo Electronico -->
                <div class="formulario__grupo" id="grupo__password2">
                    <label for="correo" class="formulario__label">Precio del producto unitario<i style="color:red">*</i></label>
                    <div class="formulario__grupo-input">
                        <input type="text" class="formulario__input" name="correo" id="preciosUProducto" oninput="formatearInput(this)">
                    </div>

                </div>
            </div>

            <br>
            <div class="botones">
                <button name="" id="botonR" class="btn btn-primary" style="margin-right: 10px;" type="button">Agregar</button>
                <button name="" id="botonB" style="display: none;" class="btn btn-danger" type="button">Borrar todo</button>


            </div>

        </main>

        <br>

        <div class="lista table-responsive">
            <table class="table table-responsive table-bordered">
                <thead class="" style="background-color: #d8d8d8;">
                    <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio U</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Ganancía</th>
                        <th scope="col">Total</th>

                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="contenido">
                    <!-- Aqui van lo registros -->
                </tbody>
                <tbody>
                    <thead scope="col" style="background-color: #bfbfbf;">
                        <th colspan="7">TOTAL</th>
                        <th id="total2" value="0">0$</th>
                    </thead>
                </tbody>
            </table>


            <br><br>

            <!-- ------ Boton registrar------ -->
            <div class="formulario__grupo formulario__grupo-btn-enviar">
                <button type="button" id="finalizarVenta" class="registrar">Registrar </button>

            </div><br>


            <!-- ------------------------------------------------------------------------------- -->




            <h1 class="page" id="ModuloActual">ventas</h1>
            <h1 class="page" id="SubModuloActual">registrar</h1>
    </section>






    <script src="../../negocio/ventas/ventas.js"></script>
    <script src="../../negocio/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>



