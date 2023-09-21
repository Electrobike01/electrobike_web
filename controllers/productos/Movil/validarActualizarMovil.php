<?php

require_once '../../../controllers/conexion.php';
$db = new Database();
$con = $db->conectar();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $idProducto = $_GET['idProducto'];
    $nombreProducto = $_GET['nombreProducto'];
    $categoriaProducto = $_GET['categoriaProducto'];

    $stmt = $con->prepare("SELECT * FROM productos WHERE idProducto != :id AND nombreProducto = :nom AND categoriaProducto = :cat");
    $stmt->bindParam(':id', $idProducto);
    $stmt->bindParam(':nom', $nombreProducto);
    $stmt->bindParam(':cat', $categoriaProducto);
    $stmt->execute();

    $count = $stmt->rowCount();
    // $isUnique = ($count == 0);

    if ($count > 0) {
        $isUnique = false;
    }else{
        $isUnique = true;
    }


    // // Convertimos el resultado a booleano (true si es 0, false si es mayor a 0)
    // $isUnique = ($count == 0) ? true : false;

    echo json_encode(['isUnique' => $isUnique]);
}
?>
