<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();


if ($_POST) {

    // -------------------- CONTROLADOR ---------------
    $nombreUsuario = ucwords($_POST['nombreUsuario']);
    $tipoDocumentoUsuario = $_POST['tipoDocumentoUsuario'];
    $documentoUsuario = $_POST['documentoUsuario'];
    $correoUsuario = $_POST['correoUsuario'];
    $rolUsuario = $_POST['rolUsuario'];
    $contrasenaUsuario = $_POST['contrasenaUsuario'];
    // Encriptar la contraseña
    $contrasenaUsuario = base64_encode($contrasenaUsuario);
    $estadoUsuario = 'Activo';


    // -------------------- MODELO ---------------
    $registrarUsuarios = $con->prepare("INSERT INTO `usuarios`(`nombreUsuario`, `tipoDocumentoUsuario`, `documentoUsuario`, `correoUsuario`, `contrasenaUsuario`, `estadoUsuario`, `idRol`) 
    VALUES (:nom, :tpd, :doc, :corr, :con, :est, :idr)");
    $registrarUsuarios->execute(array(
        'nom' => $nombreUsuario, 'tpd' => $tipoDocumentoUsuario,
        'doc' => $documentoUsuario, 'corr' => $correoUsuario, 'con' => $contrasenaUsuario, 'est' => $estadoUsuario, 'idr' => $rolUsuario
    ));




}
echo json_encode($valido);
