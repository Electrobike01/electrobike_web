<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {

    $year = isset($_GET['year']) ? $_GET['year'] : date('Y');
    $month = isset($_GET['month']) ? $_GET['month'] : date('m');

    $productosResult = $con->query("SELECT p.nombreProducto, SUM(dv.cantidad) as totalVentas
    FROM productos p
    JOIN detalleventa dv ON p.idProducto = dv.idProducto
    JOIN ventas v ON dv.idVenta = v.idVenta
    WHERE YEAR(v.fechaVenta) = $year AND MONTH(v.fechaVenta) = $month
    GROUP BY p.idProducto, p.nombreProducto
    ORDER BY totalVentas DESC
    LIMIT 5");

    $productosData = array();
    while ($row = $productosResult->fetch(PDO::FETCH_ASSOC)) {
        $productosData[] = $row;
    }

    $response = array(
        'productos' => $productosData,
    );

    echo json_encode($response);  // Devolver los datos en formato JSON
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
