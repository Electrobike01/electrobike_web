<?php

require_once '../../controllers/conexion.php';
$db = new Database();
$con = $db->conectar();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $correoUsuario = $_GET['correoUsuario'];

    $stmt = $con->prepare("SELECT * FROM `usuarios` WHERE `correoUsuario` = :corr ");
    $stmt->bindParam(':corr', $correoUsuario);

    $stmt->execute();

    $count = $stmt->rowCount();

    if ($count == 0) {
        $isUnique = false;
        // echo 'El correo no existe';
    }else{
        $isUnique = true;
        // echo 'El correo si existe';
    }


    // // Convertimos el resultado a booleano (true si es 0, false si es mayor a 0)
    // $isUnique = ($count == 0) ? true : false;

    echo json_encode(['isUnique' => $isUnique]);
}
?>