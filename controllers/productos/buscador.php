<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'registros' => "", 'data' => []);



if ($_POST) {
$busqueda = $_POST['busqueda'];




$filtros = ['idProducto','nombreProducto','cantidadProducto','categoriaProducto','estadoProducto'];
$sentencia = '';

foreach ($filtros as $key => $value) {
    $sentencia = $sentencia. $value . " like '%". $busqueda. "%' or ";
}
$sentencia = substr($sentencia , 0, -3);

$consulta = "SELECT * FROM `productos` WHERE " . $sentencia. " ORDER BY estadoProducto,idProducto ASC  LIMIT 0,6";
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