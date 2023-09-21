<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'nombreProductos' => [], 'cantidadProductos' => []);

$anio = $_POST['anio'];
$mes = $_POST['mes'];


// Consultamos datos de compras
$consulta = "SELECT pr.idProducto, pr.nombreProducto, SUM(dc.cantidad) AS total_vendido
FROM ventas c
JOIN detalleventa dc ON c.idVenta = dc.idVenta
JOIN clientes p ON c.idCliente = p.idCliente
JOIN productos pr ON dc.idProducto = pr.idProducto
WHERE YEAR(fechaVenta) = $anio and MONTH(fechaVenta) = $mes
GROUP BY pr.idProducto, pr.nombreProducto
ORDER BY total_vendido ASC
LIMIT 5";

$query = $con->query($consulta);
$query->execute();
$datosProductos = $query->fetchAll(PDO::FETCH_ASSOC);

$nombreProductos = [];
$cantidadProductos= [];

for ($i=0; $i <count($datosProductos) ; $i++) { 
$nombreProductos[] = $datosProductos[$i]['nombreProducto'];     
$cantidadProductos[] = $datosProductos[$i]['total_vendido'];     
}



$valido['nombreProductos'] = $nombreProductos;
$valido['cantidadProductos'] = $cantidadProductos;


echo json_encode($valido);


