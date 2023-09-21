<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");


if ($_POST) {


    $idProveedor = $_POST['idProveedor'];
    $idProveedorBusqueda = $_POST['idProveedor'];

    $nombreProveedor = ucwords($_POST['nombreProveedor']);
    $estadoProveedor = $_POST['estadoProveedor'];
    $tipoDocumentoProveedor = $_POST['tipoDocumentoProveedor'];
    $documentoProveedor = $_POST['documentoProveedor'];
    $telefonoProveedor = $_POST['telefonoProveedor'];
    $correoProveedor = $_POST['correoProveedor'];

    $actualizarProveedor = $con->prepare("UPDATE `proveedores` 
    SET `idProveedor`= :id,`tipoDocumentoProveedor`= :tpd,`documentoProveedor`= :doc,`nombreProveedor`= :nom, `correoProveedor`= :corr ,`telefonoProveedor`= :tel,`estadoProveedor`= :est  WHERE idProveedor = :idb");
    $actualizarProveedor->execute(array('id' => $idProveedor, 'nom'=>$nombreProveedor, 'tpd'=>$tipoDocumentoProveedor, 'doc'=>$documentoProveedor, 'corr'=>$correoProveedor, 'tel'=>$telefonoProveedor,'est'=>$estadoProveedor, 'idb'=>$idProveedorBusqueda));


}
echo json_encode($valido);

?>