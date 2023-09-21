<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    $idProducto = $_GET['idProducto'];

    $registrarProductos = $con->prepare("DELETE FROM `productos` WHERE idProducto = :id");

    if ($registrarProductos->execute(array(':id'=>$idProducto))) {
        echo json_encode("Success");
    } else {
        echo json_encode("Error");
    }
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
