<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    $year = isset($_GET['year']) ? $_GET['year'] : date('Y');
    $month = isset($_GET['month']) ? $_GET['month'] : date('m');

    $clientesResult = $con->query("SELECT c.nombreCliente, SUM(v.valorT) AS totalCompras
    FROM clientes c
    JOIN ventas v ON c.idCliente = v.idCliente
    WHERE c.idCliente <> 1 AND YEAR(v.fechaVenta) = $year AND MONTH(v.fechaVenta) = $month
    GROUP BY c.idCliente, c.nombreCliente
    ORDER BY totalCompras DESC
    LIMIT 5");

    $clientesData = array();
    while ($row = $clientesResult->fetch(PDO::FETCH_ASSOC)) {
        $clientesData[] = $row;
    }

    $response = array(
        'clientes' => $clientesData,
    );

    echo json_encode($response);  // Devolver los datos en formato JSON
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
