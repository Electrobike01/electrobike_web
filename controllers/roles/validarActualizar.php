<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {

    $idRol = $_POST['idRol'];
    $nombreRol = $_POST['nombreRol'];
    
    // // ----------------------- VALIDA SI EL NOMBRE EXISTE -c------------------------------------

    $nombresRepetidos = $con->prepare("SELECT * FROM `roles` WHERE idRol != :id AND nombreRol = :nom ");
    $nombresRepetidos->execute(array('id' => $idRol, 'nom' => $nombreRol));
    $respuestaNombreR = $nombresRepetidos->rowCount();

    if($respuestaNombreR > 0){
        $valido['success'] = false;
        $valido['title'] = "Nombre Invalido";
        $valido['mensaje'] = 'Este nombre ya fue registrado';
    }else{
        $valido['success'] = true;
        $valido['title'] = 'Exito';
        $valido['mensaje'] = '';
    }
    

}

echo json_encode($valido);
