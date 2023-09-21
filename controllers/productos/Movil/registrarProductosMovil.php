<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    $nombreProducto = $_POST['nombreProducto'];
    $categoriaProducto = $_POST['categoriaProducto'];
    $cantidadProducto = 0;
    $estadoProducto = 'Activo';

    $registrarProductos = $con->prepare("INSERT INTO `productos`(`nombreProducto`, `cantidadProducto`, `categoriaProducto`, `estadoProducto`) 
    VALUES (:nom,:cant,:cat,:est)");

    if ($registrarProductos->execute(array('nom' => $nombreProducto, 'cant' => $cantidadProducto, 'cat' => $categoriaProducto, 'est' => $estadoProducto))) {
        echo json_encode("Success");
    } else {
        echo json_encode("Error");
    }
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
