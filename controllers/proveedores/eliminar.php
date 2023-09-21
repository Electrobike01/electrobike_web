<?php

require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $idProveedor = $_POST['idProveedor'];


    $eliminar = $con->prepare("DELETE FROM `proveedores` WHERE idProveedor = :idp");
    $eliminar->execute(['idp' => $idProveedor]);

    $valido['success'] = true;
    $valido['title'] = 'Registro eliminado';
    $valido['mensaje'] = 'Se ha eliminado este registro';



}

echo json_encode($valido);