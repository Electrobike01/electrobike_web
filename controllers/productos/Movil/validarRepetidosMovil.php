<?php

require_once '../../../controllers/conexion.php';
$db = new Database();
$con = $db->conectar();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $nombreProducto = $_GET['nombreProducto'];
    $categoriaProducto = $_GET['categoriaProducto'];

    $stmt = $con->prepare("SELECT COUNT(*) AS count FROM productos WHERE nombreProducto = :nom AND categoriaProducto = :cat");
    $stmt->bindParam(':nom', $nombreProducto);
    $stmt->bindParam(':cat', $categoriaProducto);
    $stmt->execute();

    $count = $stmt->fetchColumn();
    $isUnique = ($count == 0);

    echo json_encode(['isUnique' => $isUnique]);
}
?>

