<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");


    $idCliente = $_POST['idCliente'];
    $idClienteBusqueda = $_POST['idCliente'];
    $nombreCliente = ucwords($_POST['nombreCliente']);
    $tipoDocumentoCliente = $_POST['tipoDocumentoCliente'];
    $documentoCliente = $_POST['documentoCliente'];
    $telefonoCliente = $_POST['telefonoCliente'];
    $correoCliente = $_POST['correoCliente'];
    $estadoCliente = $_POST['estadoCliente'];
    
    $actualizarCliente = $con->prepare("UPDATE `clientes` SET `idCliente`= :id,`nombreCliente`=:nom,`tipoDocumentoCliente`= :tpd,`documentoCliente`= :doc,`telefonoCliente`= :tel,`correoCliente`=:corr,`estadoCliente`= :est WHERE idCliente = :idb");
    $actualizarCliente->execute(array('id' => $idCliente, 'nom'=>$nombreCliente, 'tpd'=>$tipoDocumentoCliente, 'doc'=>$documentoCliente, 'tel'=>$telefonoCliente, 'corr'=>$correoCliente, 'est'=>$estadoCliente, 'idb'=>$idClienteBusqueda));


echo json_encode($valido);

