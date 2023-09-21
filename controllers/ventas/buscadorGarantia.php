<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'registros' => "", 'data' => []);



if ($_POST) {
$busqueda = $_POST['busqueda'];


$filtros = ['garantias.idGarantia','ventas.idVenta','garantias.fecha','clientes.nombreCliente','productos.nombreProducto','garantias.cantidad','garantias.observaciones'];
$sentencia = '';

foreach ($filtros as $key => $value) {
    $sentencia = $sentencia. $value . " like '%". $busqueda. "%' or ";
}
$sentencia = substr($sentencia , 0, -3);

$consulta = "SELECT clientes.nombreCliente ,garantias.*, productos.nombreProducto , ventas.idCliente, DATE_FORMAT(garantias.fecha, '%e-%M-%Y') AS fechaGarantia 
FROM garantias 
INNER JOIN productos ON garantias.idProducto = productos.idProducto
INNER JOIN ventas ON garantias.idVenta = ventas.idVenta
INNER JOIN clientes on ventas.idCliente = clientes.idCliente
WHERE " . $sentencia ;


$query = $con->query($consulta);
$query->execute();
$resultados = $query->fetchAll(PDO::FETCH_ASSOC);
$cantidadRegistros = count($resultados);

if(count($resultados) > 0){
    $valido['data'] = $resultados;
    $valido['registros'] = $cantidadRegistros;
}else{
    $valido['success'] = false;
    $valido['data'] = '';
}

echo json_encode($valido);


}