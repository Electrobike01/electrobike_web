<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {

    $sqlCantidadCompras = "SELECT COUNT(*) AS total_compras FROM compras";
    $queryCantCompras = $con->prepare($sqlCantidadCompras);
    $queryCantCompras->execute();
    $cantCompras = $queryCantCompras->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cantCompras);
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
