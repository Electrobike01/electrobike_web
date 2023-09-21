<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();
$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if (isset($_POST)) {
    $idUsuario = $_POST['idUsuario'];
    $documentoUsuario = $_POST['documentoUsuario'];


    // ----------------------- VALIDA SI EL DOCUMENTO EXISTE -------------------------------------
    $documentosRepetidos = $con->prepare("SELECT * FROM `usuarios` WHERE idUsuario != :id AND documentoUsuario = :doc ");
    $documentosRepetidos->execute(array('id' => $idUsuario, 'doc' => $documentoUsuario));
    $respuestaDocumentoR = $documentosRepetidos->rowCount();



    if ($respuestaDocumentoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Documento Invalido";
        $valido['mensaje'] = 'Este documento ya fue registrado';
    } else {
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = '';
    }
}
echo json_encode($valido);
