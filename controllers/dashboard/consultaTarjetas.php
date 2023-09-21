<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'compras' => "", 'ventas' => "",'cliente'=>'','mesActu' =>'');


//----------- Obtenemos el mes y ano actual ---------
$consultaMes_Ano_Actual = $con->prepare("SELECT MONTH(CURRENT_DATE()) AS mes_actual, YEAR(CURRENT_DATE()) AS ano_actual;");
$consultaMes_Ano_Actual->execute();
$resultado = $consultaMes_Ano_Actual->fetchAll(PDO::FETCH_ASSOC);
$mesActual = $resultado[0]['mes_actual'];
$anoActual = $resultado[0]['ano_actual'];


$valido['mesActu'] = $mesActual;


//------- Obtenemos la suma de las compras en el mes actual ---------
$consultaComprasMes = $con->prepare("SELECT sum(valorT) FROM compras WHERE MONTH(fechaCompra) = $mesActual AND YEAR(fechaCompra) = $anoActual ;");
$consultaComprasMes->execute();
$resultadoCompra = $consultaComprasMes->fetchAll(PDO::FETCH_ASSOC);


if ($resultadoCompra[0]['sum(valorT)'] == null) {
    $valido['compras'] = 0;
} else {
    $valido['compras'] = $resultadoCompra[0]['sum(valorT)'];
}

//------- Obtenemos la suma de las ventas en el mes actual ---------
$consultaVentasMes = $con->prepare("SELECT sum(valorT) FROM ventas WHERE MONTH(fechaVenta) = $mesActual AND YEAR(fechaVenta) = $anoActual ;");
$consultaVentasMes->execute();
$resultadoVenta = $consultaVentasMes->fetchAll(PDO::FETCH_ASSOC);

//------- Obtenemos el cliente del mes actual ---------

$consultaClienteMes = $con->prepare("SELECT c.idCliente, c.nombreCliente, SUM(co.valorT) AS total_valorT FROM clientes c JOIN ventas co ON c.idCliente = co.idCliente Where  MONTH(fechaVenta) = $mesActual AND YEAR(fechaVenta) = $anoActual and c.idCliente != 1
GROUP BY c.idCliente, c.nombreCliente ORDER BY total_valorT DESC LIMIT 1;");
$consultaClienteMes->execute();
$resultadoCliente = $consultaClienteMes->fetchAll(PDO::FETCH_ASSOC);




if ($resultadoVenta[0]['sum(valorT)'] == null) {
    $valido['ventas'] = 0;
    $valido['cliente'] = "-";
} else {
    $valido['ventas'] = $resultadoVenta[0]['sum(valorT)'];
    if(count($resultadoCliente) == 0 ){
        $valido['cliente'] = "-";
    }else{
        $valido['cliente'] = $resultadoCliente[0]['nombreCliente'];
    }
}


echo json_encode($valido);
