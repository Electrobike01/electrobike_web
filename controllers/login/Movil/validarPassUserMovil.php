<?php

require_once '../../../controllers/conexion.php';
$db = new Database();
$con = $db->conectar();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $idUsuario = $_GET['idUsuario'];
    $contrasenaUsuario  = $_GET['contrasenaUsuario'];
    $contrasenaUsuario = base64_encode($contrasenaUsuario);

    $stmt = $con->prepare("SELECT * FROM `usuarios` WHERE idUsuario = :id AND contrasenaUsuario = :con ");
    $stmt->bindParam(':id', $idUsuario);
    $stmt->bindParam(':con', $contrasenaUsuario);

    $stmt->execute();

    $count = $stmt->rowCount();

    if ($count == 0) {
        $isUnique = false;
        // echo 'No se puede modificar el usuario';
    }else{
        $isUnique = true;
        // echo 'si se puede';
    }


    // // Convertimos el resultado a booleano (true si es 0, false si es mayor a 0)
    // $isUnique = ($count == 0) ? true : false;

    echo json_encode(['isUnique' => $isUnique]);
}
?>