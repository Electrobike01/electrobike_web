<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'productos' => [], 'ids' => []);


if ($_POST) {
    $categoria = $_POST['categoria'];

    $query = $con->query("SELECT * FROM `productos` where categoriaProducto = '$categoria' and estadoProducto = 'Activo' ");
    $query->execute();

    // ------------ CREA EL ARRAY ------------
    $consultas = $query->fetchAll(PDO::FETCH_ASSOC);
    $nombres_productos = [];
    $ids_productos = [];
    if (count($consultas) > 0) {
        foreach ($consultas as $key => $producto) {
            array_push($ids_productos, $producto['idProducto']);
            array_push($nombres_productos, $producto['nombreProducto']);
        }
        $valido['success'] = true;
        $valido['productos'] = $nombres_productos;
        $valido['ids'] = $ids_productos;
    } else {
        $valido['success'] = false;
    }



}

echo json_encode($valido);
