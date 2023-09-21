<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    $valido['success'] = array('success' => true, 'ganancia' => "", 'cliente' => "", 'mesActu' => '');

    // Obtener el mes y año actual
    $consultaMes_Ano_Actual = $con->prepare("SELECT MONTH(CURRENT_DATE()) AS mes_actual, YEAR(CURRENT_DATE()) AS ano_actual;");
    $consultaMes_Ano_Actual->execute();
    $resultado = $consultaMes_Ano_Actual->fetchAll(PDO::FETCH_ASSOC);
    $mesActual = $resultado[0]['mes_actual'];
    $anoActual = $resultado[0]['ano_actual'];

    $valido['mesActu'] = $mesActual;

    // Obtener el total de compras en el mes actual
    $consultaComprasMes = $con->prepare("SELECT COALESCE(SUM(valorT), 0) AS total_compras FROM compras WHERE MONTH(fechaCompra) = $mesActual AND YEAR(fechaCompra) = $anoActual;");
    $consultaComprasMes->execute();
    $resultadoCompra = $consultaComprasMes->fetchAll(PDO::FETCH_ASSOC);
    $totalCompras = $resultadoCompra[0]['total_compras'];
    $valido['compras'] = $totalCompras;

    // Obtener el total de ventas en el mes actual
    $consultaVentasMes = $con->prepare("SELECT COALESCE(SUM(valorT), 0) AS total_ventas FROM ventas WHERE MONTH(fechaVenta) = $mesActual AND YEAR(fechaVenta) = $anoActual;");
    $consultaVentasMes->execute();
    $resultadoVenta = $consultaVentasMes->fetchAll(PDO::FETCH_ASSOC);
    $totalVentas = $resultadoVenta[0]['total_ventas'];
    $valido['ventas'] = $totalVentas;

    // Calcular la ganancia (total de ventas - total de compras)
    $ganancia = $totalVentas - $totalCompras;
    $valido['ganancia'] = $ganancia;

    // Obtener el cliente con la mayor compra en el mes actual
    $consultaClienteMes = $con->prepare("SELECT c.idCliente, c.nombreCliente, SUM(co.valorT) AS total_valorT 
    FROM clientes c 
    JOIN ventas co ON c.idCliente = co.idCliente 
    WHERE c.idCliente <> 1
    AND MONTH(fechaVenta) = $mesActual AND YEAR(fechaVenta) = $anoActual 
    GROUP BY c.idCliente, c.nombreCliente 
    ORDER BY total_valorT 
    DESC LIMIT 1;");
    $consultaClienteMes->execute();
    $resultadoCliente = $consultaClienteMes->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($resultadoCliente)) {
        $valido['cliente'] = $resultadoCliente[0]['nombreCliente'];
    } else {
        $valido['cliente'] = "-";
    }

    echo json_encode($valido); // Devolver los datos en formato JSON
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
