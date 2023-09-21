<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    $idUsuario = intval($_POST['idUsuario']);
    $idUsuarioBusqueda = intval($_POST['idUsuario']);
    // $idUsuario = $_POST['idUsuario'];
    // $idUsuarioBusqueda = $_POST['idUsuario'];
    $nombreUsuario = $_POST['nombreUsuario'];
    $tipoDocumentoUsuario = $_POST['tipoDocumentoUsuario'];
    $documentoUsuario = $_POST['documentoUsuario'];
    $correoUsuario = $_POST['correoUsuario'];
    $estadoUsuario = $_POST['estadoUsuario'];
    $idRol = intval($_POST['idRol']);
    // $idRol = $_POST['idRol'];


    $actualizarUsuario = $con->prepare("UPDATE `usuarios` SET `idUsuario`= :idUsuario, 
    `nombreUsuario`= :nombreUsuario,
    `tipoDocumentoUsuario`= :tipoDocumentoUsuario,
    `documentoUsuario`= :documentoUsuario,
    `correoUsuario`= :correoUsuario,
    `estadoUsuario`= :estadoUsuario,
    `idRol`= :idRol 
    WHERE idUsuario = :idUsuarioBusqueda");

    if ($actualizarUsuario->execute(array(
        'idUsuario' => $idUsuario, 'nombreUsuario' => $nombreUsuario,
        'tipoDocumentoUsuario' => $tipoDocumentoUsuario,
        'documentoUsuario' => $documentoUsuario, 'correoUsuario' => $correoUsuario,
        'estadoUsuario' => $estadoUsuario, 'idRol' => $idRol,
        'idUsuarioBusqueda' => $idUsuarioBusqueda
    ))) {
        echo json_encode("Success");
    } else {
        echo json_encode("Error");
    }
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
