<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, "datosCompra" => '', 'datosVenta' => '');

$anio = $_POST['anio'];


// Consultamos datos de compras
$consulta = "SELECT MONTH(fechaCompra) AS mes, SUM(valorT) AS total  FROM compras WHERE YEAR(fechaCompra) = $anio GROUP BY mes;";
$query = $con->query($consulta);
$query->execute();
$datosCompra = $query->fetchAll(PDO::FETCH_ASSOC);

// Consultamos datos de ventas
$consulta = "SELECT MONTH(fechaVenta) AS mes, SUM(valorT) AS total  FROM ventas WHERE YEAR(fechaVenta) = $anio GROUP BY mes;";
$query = $con->query($consulta);
$query->execute();
$datosVenta = $query->fetchAll(PDO::FETCH_ASSOC);

function asiganarMeses($datos)
{
    // Inicializar el nuevo array con 0 en todos los meses del 0 al 12
    $nuevo_array = array_fill(1, 12, 0);

    // Recorrer el array dado y asignar los valores al nuevo array
    foreach ($datos as $registro) {
        $mes = $registro["mes"];
        $total = $registro["total"];
        $nuevo_array[$mes] = $total;
    }
    return $nuevo_array;
}

$valido['datosCompra'] = asiganarMeses($datosCompra);
$valido['datosVenta'] = asiganarMeses($datosVenta);


echo json_encode($valido);
