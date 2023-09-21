<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'categorias' => [], 'cantidades' => []);


// Consultamos datos de productos stock
$consulta = "SELECT categoriaProducto, SUM(cantidadProducto) AS total
FROM productos
GROUP BY categoriaProducto;";

$query = $con->query($consulta);
$query->execute();
$datosStock = $query->fetchAll(PDO::FETCH_ASSOC);

$listaCatg = [];
$listaCant = [];

for ($i=0; $i <count($datosStock) ; $i++) { 
$listaCatg[] = $datosStock[$i]['categoriaProducto'];     
$listaCant[] = $datosStock[$i]['total'];     
}


$valido['categorias'] = $listaCatg;
$valido['cantidades'] = $listaCant;

echo json_encode($valido);
