<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

https://prod.liveshare.vsengsaas.visualstudio.com/join?7AEA253E03AD78EA0ACD34682D04B4CA44E7

if ($_POST) {
    $idCliente = $_POST['idCliente'];


    $clienteAsociado = $con->prepare("SELECT * FROM `ventas` WHERE idCliente = :idc");
    $clienteAsociado->execute(['idc' => $idCliente]);
    $respuestaClienteAsc = $clienteAsociado->rowCount();

    if($respuestaClienteAsc > 0){
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