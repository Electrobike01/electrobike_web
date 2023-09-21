<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {
    $nombreRol = $_POST['nombreRol'];

    // ----------------------- VALIDA SI EL NOMBRE ROL EXISTE -------------------------------------
    $nombreRepetido = $con->prepare("SELECT * FROM `roles` WHERE nombreRol=:nom");
    $nombreRepetido->execute(['nom' => $nombreRol]);
    $respuestaNombreR = $nombreRepetido->rowCount();

    if ($respuestaNombreR > 0) {
        $valido['success'] = false;
        $valido['title'] = "Nombre Invalido";
        $valido['mensaje'] = 'Este nombre ya fue registrado';
    } else {
        $valido['success'] = true;
        $valido['title'] = '';
        $valido['mensaje'] = '';
    }
}
echo json_encode($valido);