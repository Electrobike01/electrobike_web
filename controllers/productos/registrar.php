<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $nombreProducto = ucwords($_POST['nombreProducto']);
    $categoriaProducto = $_POST['categoriaProducto'];
    $cantidadProducto = 0;
    $estadoProducto = 'Activo';

    $registrarProductos = $con->prepare("INSERT INTO `productos`(`nombreProducto`, `cantidadProducto`, `categoriaProducto`, `estadoProducto`) 
        VALUES (:nom,:cant,:cat,:est)");
    $registrarProductos->execute(array(
        'nom' => $nombreProducto, 'cant' => $cantidadProducto, 'cat' => $categoriaProducto, 'est' => $estadoProducto
    ));
}
echo json_encode($valido);
