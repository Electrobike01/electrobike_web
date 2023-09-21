<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido = ['data' => [], 'registros' => ''];
if ($_POST) {

    $pagina = $_POST['pagina'];
    $limitePg = 5 * ($pagina - 1);

    //Contamos cuantos registros hay en total
    $contador = "SELECT * FROM `garantias` ";
    $queryContador = $con->query($contador);
    $queryContador->execute();
    $resultadosContador = $queryContador->fetchAll(PDO::FETCH_ASSOC);
    $cantidadRegistros = count($resultadosContador);
    $valido['registros'] = $cantidadRegistros;


    //Listamos los reigistros 
    $consulta = 
    "SELECT clientes.nombreCliente ,garantias.*, productos.nombreProducto , ventas.idCliente, DATE_FORMAT(garantias.fecha, '%e-%M-%Y') AS fechaGarantia 
    FROM garantias 
    INNER JOIN productos ON garantias.idProducto = productos.idProducto
    INNER JOIN ventas ON garantias.idVenta = ventas.idVenta
    INNER JOIN clientes on ventas.idCliente = clientes.idCliente
    ORDER BY garantias.idGarantia ASC LIMIT $limitePg , 5;";

    
    $query = $con->query($consulta);
    $query->execute();
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);

    $valido['data'] = $resultados;

    echo json_encode($valido);
}
