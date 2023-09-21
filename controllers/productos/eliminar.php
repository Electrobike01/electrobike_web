<?php

require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $idProducto = $_POST['idProducto'];


    $eliminar = $con->prepare("DELETE FROM `productos` WHERE idProducto = :idp");
    $eliminar->execute(['idp' => $idProducto]);

    $valido['success'] = true;
    $valido['title'] = 'Registro eliminado';
    $valido['mensaje'] = 'Se ha eliminado este registro';



}

echo json_encode($valido);