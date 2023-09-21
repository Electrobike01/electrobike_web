<?php

require_once '../../controllers/conexion.php';
$db = new Database();
$con = $db->conectar();

if ($_POST) {
    $tipoDocumentoProveedor = $_POST['tipoDocumentoProveedor'];
    $documentoProveedor = $_POST['documentoProveedor'];
    $nombreProveedor = ucwords($_POST['nombreProveedor']);
    $telefonoProveedor = $_POST['telefonoProveedor'];
    $correoProveedor = $_POST['correoProveedor'];
    $estadoProveedor = 'Activo';

    $registrarProveedor = $con->prepare("INSERT INTO `proveedores`(`tipoDocumentoProveedor`, `documentoProveedor`, `nombreProveedor`, `correoProveedor`,`telefonoProveedor`, `estadoProveedor`)
    VALUES (:tipoDc,:doc,:nom,:corr,:tel,:est)");
    $registrarProveedor->execute(array(
        'tipoDc' => $tipoDocumentoProveedor, 'doc' => $documentoProveedor,
        'nom' => $nombreProveedor, 'corr' => $correoProveedor, 'tel' => $telefonoProveedor, 'est' => $estadoProveedor
    ));
}
echo json_encode($valido);

?>
