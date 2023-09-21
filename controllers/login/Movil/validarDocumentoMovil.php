<?php

require_once '../../../controllers/conexion.php';
$db = new Database();
$con = $db->conectar();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $idUsuario = $_GET['idUsuario'];
    $documentoUsuario = $_GET['documentoUsuario'];
    
    $stmt = $con->prepare("SELECT * FROM usuarios WHERE idUsuario != :id AND documentoUsuario = :doc ");
    $stmt->bindParam(':id', $idUsuario);
    $stmt->bindParam(':doc', $documentoUsuario);
    $stmt->execute();

    $count = $stmt->rowCount();

    if ($count > 0) {
        $isUnique = false;
    }else{
        $isUnique = true;
    }


    // // Convertimos el resultado a booleano (true si es 0, false si es mayor a 0)
    // $isUnique = ($count == 0) ? true : false;

    echo json_encode(['isUnique' => $isUnique]);
}
?>