<?php

require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $idCliente = $_POST['idCliente'];


    $eliminar = $con->prepare("DELETE FROM `clientes` WHERE idCliente = :idc");
    $eliminar->execute(['idc' => $idCliente]);

    $valido['success'] = true;
    $valido['title'] = 'Registro eliminado';
    $valido['mensaje'] = 'Se ha eliminado este registro';



}

echo json_encode($valido);