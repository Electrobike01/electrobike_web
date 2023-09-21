<?php

require_once '../../controllers/conexion.php';


$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $idRol = $_POST['idRol'];


    $eliminar = $con->prepare("DELETE FROM `roles` WHERE idRol = :idr");
    $eliminar->execute(['idr' => $idRol]);

    $valido['success'] = true;
    $valido['title'] = 'Registro eliminado';
    $valido['mensaje'] = 'Se ha eliminado este registro';









}

echo json_encode($valido);