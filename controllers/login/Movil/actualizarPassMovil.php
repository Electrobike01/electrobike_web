<?php
// actualizar_perfil.php

require_once '../../../controllers/conexion.php';
header("Content-Type: application/json");


$db = new Database();
$con = $db->conectar();

try {
    $idUsuario = intval($_POST['idUsuario']);
    $contrasenaUsuario_ = $_POST['contrasenaUsuario'];
    $contrasenaUsuario = base64_encode($contrasenaUsuario_);

    $actualizarContrasena = $con->prepare("UPDATE `usuarios` 
    SET `contrasenaUsuario`= :contrasenaUsuario
    WHERE  idUsuario = :idUsuario
    ");

    if ($actualizarContrasena->execute(array(
        'contrasenaUsuario'=>$contrasenaUsuario,
        'idUsuario'=> $idUsuario
    ))) {
        echo json_encode("Success");
    }else {
        echo json_encode("Error");
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la consulta a la base de datos'+$e]);
}
