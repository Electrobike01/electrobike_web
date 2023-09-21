<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");

if ($_POST) {

    $idUsuario = $_POST['idUsuario'];
    $idUsuarioBusqueda = $_POST['idUsuario'];
    $nombreUsuario = ucwords($_POST['nombreUsuario']);
    $tipoDocumentoUsuario = $_POST['tipoDocumentoUsuario'];
    $documentoUsuario = $_POST['documentoUsuario'];
    $correoUsuario = $_POST['correoUsuario'];
    $rolUsuario = $_POST['rolUsuario'];
    $estadoUsuario = $_POST['estadoUsuario'];



    $actualizarCliente = $con->prepare("UPDATE `usuarios` SET 
    `idUsuario`= :id,
    `nombreUsuario`= :nom ,
    `tipoDocumentoUsuario`= :tpd,
    `documentoUsuario`= :doc,
    `correoUsuario`= :corr,
    `estadoUsuario`= :est,
    `idRol`=  (SELECT idRol FROM `roles` WHERE nombreRol = :nomR )  

    WHERE idUsuario = :idb");
    $actualizarCliente->execute(array('id' => $idUsuario, 'nom'=>$nombreUsuario, 'tpd'=>$tipoDocumentoUsuario, 'doc'=>$documentoUsuario, 'corr'=>$correoUsuario, 'est'=>$estadoUsuario, 'nomR'=>$rolUsuario, 'idb'=>$idUsuarioBusqueda));

}
echo json_encode($valido);
