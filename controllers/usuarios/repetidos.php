<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $documentoUsuario = $_POST['documentoUsuario'];
    $correoUsuario = $_POST['correoUsuario'];


    // ----------------------- VALIDA SI EL DOCUMENTO EXISTE -c------------------------------------
    $documentosRepetidos = $con->prepare("SELECT * FROM `usuarios` WHERE documentoUsuario = :doc");
    $documentosRepetidos->execute(['doc' => $documentoUsuario]);
    $respuestaDocumentoR = $documentosRepetidos->rowCount();

    // ----------------------- VALIDA SI EL CORREO EXISTE -------------------------------------
    $correosRepetidos = $con->prepare("SELECT * FROM `usuarios` WHERE 	correoUsuario = :corr");
    $correosRepetidos->execute(['corr' => $correoUsuario]);
    $respuestaCorreosR = $correosRepetidos->rowCount();


    if ($respuestaDocumentoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Documento Invalido";
        $valido['mensaje'] = 'Este documento ya fue registrado';
    } elseif ($respuestaCorreosR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Correo Invalido";
        $valido['mensaje'] = 'Este correo ya fue registrado';
    } else {
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = '';
    }
}
echo json_encode($valido);
