<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'data' => [], '' => []);

$idVenta = $_POST['idVenta'];

$consultarGarantias = 
"SELECT clientes.nombreCliente ,garantias.*, productos.nombreProducto , ventas.idCliente, DATE_FORMAT(garantias.fecha, '%e-%M-%Y') AS fechaGarantia 
FROM garantias 
INNER JOIN productos ON garantias.idProducto = productos.idProducto
INNER JOIN ventas ON garantias.idVenta = ventas.idVenta
INNER JOIN clientes on ventas.idCliente = clientes.idCliente
WHERE ventas.idVenta = $idVenta; ";

$query = $con->query($consultarGarantias);
$query->execute();
// ------------ CREA EL ARRAY ------------
$resultados = $query->fetchAll(PDO::FETCH_ASSOC);

$valido['data'] = $resultados;

echo json_encode($valido);

