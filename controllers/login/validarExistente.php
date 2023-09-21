<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'titulo'=>'','mensaje' => '', 'id' => '', 'permisos' => '', 'nombre' => '');


if ($_POST) {
    $correo = $_POST['correo'];

    //VALIDOR SI EL CORREO EXISTE
    $correoExistente = $con->prepare("SELECT * FROM `usuarios` WHERE correoUsuario = :corr ");
    $correoExistente->execute(['corr' => $correo]);
    $respuestaCorreoEx = $correoExistente->rowCount();

    //VALIDOR SI EL CORREO ESTA ACTIVO
    $correoActivo = $con->prepare("SELECT * FROM `usuarios` WHERE correoUsuario = :corr  AND estadoUsuario = 'Activo'");
    $correoActivo->execute(['corr' => $correo]);
    $respuestaCorreoAct = $correoActivo->rowCount();

    //Si el correo no existe...
    if ($respuestaCorreoEx == 0) {
        $valido['success'] = false;
        $valido['titulo'] = 'Correo no registrado';
        $valido['mensaje'] = 'El correo no fue encontrado';
    } else if ($respuestaCorreoAct == 0){
        $valido['success'] = false;
        $valido['titulo'] = 'Usuario inactivo';
        $valido['mensaje'] = 'Su usuario se encuentra inactivo';    
    }else{
        $valido['success'] = true;
    }
}

echo json_encode($valido);
