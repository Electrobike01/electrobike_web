<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");


if ($_POST) {
    $nombreProducto = $_POST['nombreProducto'];
    $categoriaProducto = $_POST['categoriaProducto']; 

    // ----------------------- VALIDA SI EL DOCUMENTO EXISTE -c------------------------------------
    $nombreRepetidos = $con->prepare("SELECT * FROM `productos` WHERE nombreProducto = :nom AND categoriaProducto = :cat");
    $nombreRepetidos->execute(array('nom' => $nombreProducto, 'cat' => $categoriaProducto));
    $respuestaNombreR = $nombreRepetidos->rowCount();


    if($respuestaNombreR){
        $valido['success'] = false;
        $valido['title'] = "Producto Invalido";
        $valido['mensaje'] = 'Este producto ya fue registrado';
    }else{
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = '';

    };
}
echo json_encode($valido);


?>