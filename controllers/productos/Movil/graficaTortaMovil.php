<?php
require_once '../../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

try {
    // Obtener los datos de las categorías y sus cantidades
    $result = $con->query("SELECT categoriaProducto, COUNT(*) as cantidad FROM productos GROUP BY categoriaProducto");

    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    echo json_encode($data); // Devolver los datos en formato JSON
} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
