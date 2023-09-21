<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");



if ($_POST) {
    $idProveedor = $_POST['idProveedor'];


    $proveedorAsociado = $con->prepare("SELECT * FROM `compras` WHERE idProveedor = :idp");
    $proveedorAsociado->execute(['idp' => $idProveedor]);
    $respuestaProveedorAsc = $proveedorAsociado->rowCount();

    if($respuestaProveedorAsc > 0){
        $valido['success'] = false;
        $valido['title'] = '';
        $valido['mensaje'] ='';
    }else{
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = '';
    }
    
}
echo json_encode($valido);