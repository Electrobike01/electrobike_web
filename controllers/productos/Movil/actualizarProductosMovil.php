<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    $idProducto = intval($_POST['idProducto']);
    $idProductoBusqueda = intval($_POST['idProducto']);
    $nombreProducto = $_POST['nombreProducto'];
    $cantidadProducto = intval($_POST['cantidadProducto']);
    $categoriaProducto = $_POST['categoriaProducto'];
    $estadoProducto = $_POST['estadoProducto'];

    $actualizarProducto = $con->prepare("UPDATE `productos` SET `idProducto`= :id ,`nombreProducto`= :nom ,
    `cantidadProducto`= :cant ,`categoriaProducto`= :cat ,`estadoProducto`= :est WHERE idProducto = :idb");

    if ($actualizarProducto->execute(array('id' => $idProducto, 'nom' => $nombreProducto,
        'cant' => $cantidadProducto, 'cat' => $categoriaProducto, 'est' => $estadoProducto, 'idb' => $idProductoBusqueda))) {
        echo json_encode("Success");
    } else {
        echo json_encode("Error");
    }
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}