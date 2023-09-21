<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $idProducto = $_GET['idProducto'];


    $productoEnCompra = $con->prepare("SELECT * FROM detallecompra WHERE idProducto = :idp");
    $productoEnCompra->execute(['idp' => $idProducto]);
    $respuestaProdC = $productoEnCompra->rowCount();

    $productoEnVenta = $con->prepare("SELECT * FROM detalleventa WHERE idProducto = :idp");
    $productoEnVenta->execute(['idp' => $idProducto]);
    $respuestaProdV = $productoEnVenta->rowCount();

    if($respuestaProdC > 0 || $respuestaProdV > 0){
        $isUnique = false;
    }else{
        $isUnique = true;
    }
    echo json_encode(['isUnique' => $isUnique]);
    
}
