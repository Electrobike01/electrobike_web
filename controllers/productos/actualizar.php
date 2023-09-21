<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");



if ($_POST) {
    $idProducto = $_POST['idProducto'];
    $idProductoBusqueda = $_POST['idProducto'];
    $nombreProducto = ucwords($_POST['nombreProducto']);
    $cantidadProducto = $_POST['cantidadProducto'];
    $categoriaProducto = $_POST['categoriaProducto'];
    $estadoProducto = $_POST['estadoProducto'];


    $actualizarCliente = $con->prepare(" UPDATE `productos` SET `idProducto`= :id ,`nombreProducto`= :nom ,
    `cantidadProducto`= :cant ,`categoriaProducto`= :cat ,`estadoProducto`= :est WHERE idProducto = :idb
    ");
    $actualizarCliente->execute(array('id' => $idProducto, 'nom' => $nombreProducto,
    'cant' => $cantidadProducto, 'cat' => $categoriaProducto, 'est' => $estadoProducto, 'idb' => $idProductoBusqueda ));
}
echo json_encode($valido);
