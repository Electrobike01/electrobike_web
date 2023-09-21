
<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => false, 'data' => []);


// ------------ CREA EL ARRAY DE LA DATA ------------
$query = $con->query("SELECT * FROM `productos`");
$query->execute();

$data = $query->fetchAll(PDO::FETCH_ASSOC);
$valido['data'] = $data;

echo json_encode($valido);

