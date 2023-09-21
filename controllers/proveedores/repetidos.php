<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();
$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $documentoProveedor = $_POST['documentoProveedor'];
    $telefonoProveedor = $_POST['telefonoProveedor'];
    $correoProveedor = $_POST['correoProveedor'];

    // ----------------------- VALIDA SI EL DOCUMENTO EXISTE -------------------------------------
    $documentosRepetidos = $con->prepare("SELECT * FROM `proveedores` WHERE documentoProveedor = :doc");
    $documentosRepetidos->execute(['doc' => $documentoProveedor]);
    $respuestaDocumentoR = $documentosRepetidos->rowCount();
    // ----------------------- VALIDA SI EL TELEFONO EXISTE -------------------------------------
    $telefonosRepetidos = $con->prepare("SELECT * FROM `proveedores` WHERE telefonoProveedor = :tel");
    $telefonosRepetidos->execute(['tel' => $telefonoProveedor]);
    $respuestaTelefonoR = $telefonosRepetidos->rowCount();
    // ----------------------- VALIDA SI EL CORREO EXISTE -------------------------------------
    $correosRepetidos = $con->prepare("SELECT * FROM `proveedores` WHERE correoProveedor = :corr");
    $correosRepetidos->execute(['corr' => $correoProveedor]);
    $respuestaCorreoR = $correosRepetidos->rowCount();

    if ($respuestaDocumentoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Documento Invalido";
        $valido['mensaje'] = 'Este documento ya fue registrado';
    } else if ($respuestaTelefonoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Telefono Invalido";
        $valido['mensaje'] = 'Este telefono ya fue registrado';
    } else if ($respuestaCorreoR > 0) {
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
