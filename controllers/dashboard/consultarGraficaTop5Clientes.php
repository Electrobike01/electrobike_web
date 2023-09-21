<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'nombreCliente' => [], 'cantidadVenta' => []);

$anio = $_POST['anio'];
$mes = $_POST['mes'];

// Consultamos datos de clientes
$consulta = "SELECT c.nombreCliente, v.idCliente, SUM(v.valorT) as ventaMes
FROM ventas v
JOIN clientes c ON v.idCliente = c.idCliente
WHERE MONTH(v.fechaVenta) = $mes AND YEAR(v.fechaVenta) = $anio AND v.idCliente != 1
GROUP BY v.idCliente
DESC
LIMIT 10";

$query = $con->query($consulta);
$query->execute();
$datosClientes = $query->fetchAll(PDO::FETCH_ASSOC);

$nombreClientes = [];
$cantidadCliente = [];

//Agregar al array los nombres y cantidad vendido
for ($i = 0; $i < count($datosClientes); $i++) {
    $nombreClientes[] = $datosClientes[$i]['nombreCliente'];
    $cantidadCliente[] = $datosClientes[$i]['ventaMes'];
}

function recortarNombres($nombresArray)
{
    $resultados = array();

    foreach ($nombresArray as $nombreCompleto) {
        if (str_word_count($nombreCompleto) == 4) {
            $cantidadPalabras = 3;
        }
        else if(str_word_count($nombreCompleto) == 3){
            $cantidadPalabras = 2;
        }else{
            $cantidadPalabras = 3;
            
        }

        $palabras = explode(' ', $nombreCompleto);
        $nombreRecortado = implode(' ', array_slice($palabras, 0, $cantidadPalabras));
        $resultados[] = $nombreRecortado;
    }

    return $resultados;
}


$nombreClientes = recortarNombres($nombreClientes);

$valido['nombreCliente'] = $nombreClientes;
$valido['cantidadVenta'] = $cantidadCliente;

echo json_encode($valido);
