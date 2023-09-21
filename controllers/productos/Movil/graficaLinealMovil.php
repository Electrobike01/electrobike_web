<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    // Consulta para obtener todas las compras por mes y año
    $comprasResult = $con->query("SELECT MONTH(fechaCompra) as mes, YEAR(fechaCompra) as anio, SUM(valorT) as total FROM compras GROUP BY MONTH(fechaCompra), YEAR(fechaCompra)");

    $comprasData = array();
    while ($row = $comprasResult->fetch(PDO::FETCH_ASSOC)) {
        $comprasData[] = $row;
    }

    // Consulta para obtener todas las ventas por mes y año
    $ventasResult = $con->query("SELECT MONTH(fechaVenta) as mes, YEAR(fechaVenta) as anio, SUM(valorT) as total FROM ventas GROUP BY MONTH(fechaVenta), YEAR(fechaVenta)");

    $ventasData = array();
    while ($row = $ventasResult->fetch(PDO::FETCH_ASSOC)) {
        $ventasData[] = $row;
    }

    $response = array(
        'compras' => $comprasData,
        'ventas' => $ventasData,
    );

    echo json_encode($response); // Devolver los datos en formato JSON
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
