<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false,'title' => "", 'mensaje' => "");


if ($_POST) {
    $documentoCliente = $_POST['documentoCliente'];
    $telefonoCliente = $_POST['telefonoCliente'];
    $correoCliente = $_POST['correoCliente'];

    
    // ----------------------- VALIDA SI EL DOCUMENTO EXISTE -c------------------------------------
    $documentosRepetidos = $con->prepare("SELECT * FROM `clientes` WHERE documentoCliente = :doc");
    $documentosRepetidos->execute(['doc'=>$documentoCliente]);
    $respuestaDocumentoR = $documentosRepetidos->rowCount();

    // ----------------------- VALIDA SI EL TELEFONO EXISTE -------------------------------------
    $telefonosRepetidos = $con->prepare("SELECT * FROM `clientes` WHERE telefonoCliente = :tel");
    $telefonosRepetidos->execute(['tel'=>$telefonoCliente]);
    $respuestaTelefonoR = $telefonosRepetidos->rowCount();
    
    // ----------------------- VALIDA SI EL CORREO EXISTE -------------------------------------
    $correosRepetidos = $con->prepare("SELECT * FROM `clientes` WHERE correoCliente = :corr");
    $correosRepetidos->execute(['corr'=>$correoCliente]);
    $respuestaCorreosR = $correosRepetidos->rowCount();
    
    
    if ($respuestaDocumentoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Documento Invalido";
        $valido['mensaje'] = 'Este documento ya fue registrado';
    }else if($respuestaTelefonoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Telefono Invalido";
        $valido['mensaje'] = 'Este telefono ya fue registrado';
    }elseif ($respuestaCorreosR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Correo Invalido";
        $valido['mensaje'] = 'Este correo ya fue registrado';
    }else{
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = '';
    }

   

}

echo json_encode($valido);
