<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");


if ($_POST) {
    $idCliente = $_POST['idCliente'];
    $documentoCliente = $_POST['documentoCliente'];
    $telefonoCliente = $_POST['telefonoCliente'];
    $correoCliente = $_POST['correoCliente'];


    // ----------------------- VALIDA SI EL DOCUMENTO EXISTE -c------------------------------------

    $documentosRepetidos = $con->prepare("SELECT * FROM `clientes` WHERE idCliente != :id AND documentoCliente = :doc ");
    $documentosRepetidos->execute(array('id' => $idCliente, 'doc' => $documentoCliente));
    $respuestaDocumentoR = $documentosRepetidos->rowCount();

    // // ----------------------- VALIDA SI EL TELEFONO EXISTE -------------------------------------
    $telefonosRepetidos = $con->prepare("SELECT * FROM `clientes` WHERE idCliente != :id AND telefonoCliente = :tel");
    $telefonosRepetidos->execute(['id' => $idCliente, 'tel' => $telefonoCliente]);
    $respuestaTelefonoR = $telefonosRepetidos->rowCount();

    // // ----------------------- VALIDA SI EL CORREO EXISTE -------------------------------------
    $correosRepetidos = $con->prepare("SELECT * FROM `clientes` WHERE idCliente != :id AND correoCliente = :corr");
    $correosRepetidos->execute(['id' => $idCliente,'corr' => $correoCliente]);
    $respuestaCorreosR = $correosRepetidos->rowCount();


    if ($respuestaDocumentoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Documento Invalido";
        $valido['mensaje'] = 'Este documento ya fue registrado';
    } else if ($respuestaTelefonoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Telefono Invalido";
        $valido['mensaje'] = 'Este telefono ya fue registrado';
    } else if ($respuestaCorreosR > 0) {
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
