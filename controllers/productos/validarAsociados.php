<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "" , 'idP'=> '');



if ($_POST) {
    $idProducto = $_POST['idProducto'];
    $valido['idP'] = $idProducto;

    $productoEnCompra = $con->prepare("SELECT * FROM detallecompra WHERE idProducto = :idp");
    $productoEnCompra->execute(['idp' => $idProducto]);
    $respuestaProdC = $productoEnCompra->rowCount();

    $productoEnVenta = $con->prepare("SELECT * FROM detalleventa WHERE idProducto = :idp");
    $productoEnVenta->execute(['idp' => $idProducto]);
    $respuestaProdV = $productoEnVenta->rowCount();

    if($respuestaProdC > 0 || $respuestaProdV > 0){
        $valido['success'] = false;
        $valido['title'] = '';
        $valido['mensaje'] ='No se puede elim';
    }else{
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = 'Si se puede elim';
    }
    
}
echo json_encode($valido);