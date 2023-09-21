<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $idRol = $_POST['idRol'];

    #-------------------------------- VALIDAR SI HAY UN USUARIO CON ESE ROL ASOCIADO --------------------------------
    // $nombresRepetidos = $con->prepare("SELECT * FROM `roles` WHERE idRol != :id AND nombreRol = :nom ");
    // $nombresRepetidos->execute(array('id' => $idRol, 'nom' => $nombreRol));
    // $respuestaNombreR = $nombresRepetidos->rowCount();

    $rolAsociado = $con->prepare("SELECT * FROM `usuarios` WHERE `idRol` = :idr");
    $rolAsociado->execute(['idr' => $idRol]);
    $respuestaRolAsc = $rolAsociado->rowCount();

    if($respuestaRolAsc > 0){
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
