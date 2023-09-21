<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();
$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");

//Obtenemos los daots enviados del json
$registros = json_decode(file_get_contents('php://input'), true);


//Iniciamos las variables de la tabla COMPRA
$idCliente = $registros[0]['Cliente'];
$valorT = $registros[count($registros)-1]['ValorTotal'];
$valorT = intval(str_replace('.','',$valorT));

// //Insertamos las variables en compras
$registrarVenta = $con->prepare(" INSERT INTO `ventas`(`idCliente`, `valorT`, `fechaVenta`) 
VALUES (:idc, :vlt, NOW())");
$registrarVenta->execute(array('idc' => $idCliente, 'vlt' => $valorT));




// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ------------------------ DETALLE DE COMPRAS ---------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// Consulta el ultimo id registrado para agregarlo en DETALLE COMPRA
$sql = $con->query("SELECT MAX(idVenta) as id_ FROM `ventas`");
$sql->execute();

$campo = $sql->fetchAll(PDO::FETCH_ASSOC);
// Almacenamos el id 
$idVenta = $campo[0]['id_'];
$cant = count($registros) - 1;


// ======================================================================

// Iterar sobre los registros y hacer lo que necesites
for ($r = 0; $r < $cant; $r++) {
    $categoria = $registros[$r]['Categoria'];
    $idProducto = $registros[$r]['Producto'];
    $valorUn = $registros[$r]['ValorUn'];
    $valorUn = intval(str_replace('.','',$valorUn));
    $cantidad = $registros[$r]['Cantidad'];

//  INSERTAMOS LOS VALORES EN DETALLE COMPRA ------------
    $registrarDetalle = $con->prepare("INSERT INTO `detalleventa`(`idProducto`, `idVenta`, `cantidad`, `valor`) 
    VALUES (:idp, :idv, :cant, :vl)");
    $registrarDetalle->execute(array('idp' => $idProducto, 'idv' => $idVenta, 'cant' => $cantidad, 'vl' => $valorUn));

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ------------------------------- PRODUCTOS -----------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
$sql = $con->query("SELECT cantidadProducto FROM productos WHERE idProducto = '$idProducto'");
$sql->execute();
$campo = $sql->fetchAll(PDO::FETCH_ASSOC);

//Obtenemos en una variable la cantidad exixtente del producto
$cantidadInicial = $campo[0]['cantidadProducto'];
$cantFinal = $cantidadInicial - $cantidad;

// Actualizamos la cantidad 
$sumarProducto = $con->query("UPDATE `productos` SET `cantidadProducto`= $cantFinal WHERE `idProducto` = $idProducto");
$sumarProducto->execute();
}

echo json_encode($valido);

