<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $idProducto = $_POST['idProducto'];
    $nombreProducto = $_POST['nombreProducto'];
    $categoriaProducto = $_POST['categoriaProducto'];

    // // ----------------------- VALIDA SI EL PRODUCTO EXISTE -------------------------------------
    $ProductosRepetidos = $con->prepare("SELECT * FROM `productos` WHERE idProducto != :id AND nombreProducto = :nom AND categoriaProducto = :cat");
    $ProductosRepetidos->execute(array('id' => $idProducto, 'nom' => $nombreProducto, 'cat'=>$categoriaProducto ));
    $respuestaProductoR = $ProductosRepetidos->rowCount();


    // SELECT * FROM `productos` WHERE idProducto != 4 and nombreProducto = 'Bicicleta' AND categoriaProducto = 'Bicicletas alta gama'

    if ($respuestaProductoR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Producto Invalido";
        $valido['mensaje'] = 'Este producto ya fue registrado';
    }else{
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = '';
    }
}
echo json_encode($valido);

?>
