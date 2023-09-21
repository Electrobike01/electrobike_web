<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido = array('success' => false, 'data' => [] );


if ($_POST) {
    $idVenta = $_POST['idVenta'];
    $consultaRegistros = "SELECT pr.cantidadProducto, c.idVenta, c.idCliente, p.nombreCliente, c.valorT, DATE_FORMAT(c.fechaVenta, '%e-%M-%Y','es_ES') AS fechaVenta, dc.idDetalleVenta, dc.idProducto, pr.nombreProducto, dc.cantidad, dc.valor, pr.categoriaProducto
    FROM ventas c
    JOIN detalleventa dc ON c.idVenta = dc.idVenta
    JOIN clientes p ON c.idCliente = p.idCliente
    JOIN productos pr ON dc.idProducto = pr.idProducto where c.idVenta = '$idVenta' ORDER BY c.idVenta ASC";
    $query = $con->query($consultaRegistros);
    $query->execute();
    // ------------ CREA EL ARRAY ------------
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);
    $valido['data'] = $resultados;

}

echo json_encode($valido);
