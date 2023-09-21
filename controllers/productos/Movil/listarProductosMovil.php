<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {

    $sqlProductos = "SELECT * FROM `productos` ORDER BY `estadoProducto` ASC";
    $query = $con->prepare($sqlProductos);
    $query->execute();
    $records = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($records);
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>



