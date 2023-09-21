<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'cantidadProd' => [], 'promedioProd' => []);


if ($_POST) {
    $idProd = $_POST['idProd'];

    // ------------------ Obtenemos la cantidad de ese producto ----------
    $query = $con->query("SELECT cantidadProducto FROM `productos` where idProducto = '$idProd' ");
    $query->execute();
    // ------------ CREA EL ARRAY ------------
    $cantidad = $query->fetchAll(PDO::FETCH_ASSOC);
    $cantidadStock = $cantidad[0]['cantidadProducto'];


    // ------------------ Obtenemos el promedio de compra de ese producto ----------
    $query = $con->query("SELECT SUM(cantidad) as cantidadT, sum(valor * cantidad) AS resultado FROM `detallecompra` WHERE `idProducto` = '$idProd' ;");
    $query->execute();
    // ------------ CREA EL ARRAY ------------
    $precios = $query->fetchAll(PDO::FETCH_ASSOC);

    $precios = $precios[0];
    $cantidadG = $precios['cantidadT'];
    $sumaPrecios = $precios['resultado'];
    if($cantidadG != 0){
    $promedio =  $sumaPrecios / $cantidadG ;}
    else{ $promedio = 0; }
    $promedio = round($promedio);



    if ($cantidadStock <= 0) {
        $valido['promedioProd'] = $promedio;
        $valido['success'] = false;
    } else {
        $valido['success'] = true;
        $valido['cantidadProd'] = $cantidadStock;
        $valido['promedioProd'] = $promedio;
    }
}


echo json_encode($valido);
