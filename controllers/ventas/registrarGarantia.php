<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'cantidadProd' => [], 'promedioProd' => []);


if ($_POST) {
    $idProducto = $_POST['idProducto'];
    $cantidad = $_POST['cantidad'];
    $idVenta = $_POST['idVenta'];
    $observaciones = $_POST['observaciones'];
    if($observaciones == ''){
        $observaciones = 'Ninguna';
    }

    // ---------Cambiamos el estado de la garantia en ventas ---------
    $cambiarEstado = $con->prepare("UPDATE `ventas` SET  garantia = 1  WHERE idVenta = :idV");
    $cambiarEstado->execute(array('idV' => $idVenta));

    // --------- Realizamos la resta de la base de datos ---------
    $restarProducto = $con->prepare("UPDATE `productos` SET  cantidadProducto = cantidadProducto - :cant  WHERE idProducto = :idp");
    $restarProducto->execute(array('idp' => $idProducto, 'cant' => $cantidad));

    
    // ------- Registramos la garantia -----------------
    $registrarGarantia = $con->prepare(
        "INSERT INTO `garantias`(`idVenta`, `idProducto`, `fecha`, `cantidad`, `observaciones`)
        VALUES (:idv,:idp,NOW(),:cant,:obs)");
    $registrarGarantia->execute(array('idv' => $idVenta, 'idp' => $idProducto, 'cant' => $cantidad,'obs'=>$observaciones));
}

echo json_encode($valido);
