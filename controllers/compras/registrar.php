<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();
$valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");


//Obtenemos los daots enviados del json
$registros = json_decode(file_get_contents('php://input'), true);

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ----------------------------- COMPRAS ---------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

//Iniciamos las variables de la tabla COMPRA
$idProveedor = $registros[0]['Proveedor'];
$valorT = $registros[count($registros)-1]['ValorTotal'];
$valorT = intval(str_replace('.','',$valorT));


// //Insertamos las variables en compras
$registrarCompra = $con->prepare(" INSERT INTO `compras`(`idProveedor`, `valorT`, `fechaCompra`) 
VALUES (:idp, :vlt, CURRENT_TIMESTAMP )");
$registrarCompra->execute(array('idp' => $idProveedor, 'vlt' => $valorT));

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ------------------------ DETALLE DE COMPRAS ---------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// Consulta el ultimo id registrado para agregarlo en DETALLE COMPRA
$sql = $con->query("SELECT MAX(idCompra) as id_ FROM `compras`");
$sql->execute();

$campo = $sql->fetchAll(PDO::FETCH_ASSOC);
// Almacenamos el id 
$idCompra = $campo[0]['id_'];
$cant = count($registros) - 1;

// Iterar sobre los registros y hacer lo que necesites
for ($r = 0; $r < $cant; $r++) {
    $categoria = $registros[$r]['Categoria'];
    $idProducto = $registros[$r]['Producto'];
    $valorUn = $registros[$r]['ValorUn'];
    $valorUn = intval(str_replace('.','',$valorUn));
    $cantidad = $registros[$r]['Cantidad'];

//  INSERTAMOS LOS VALORES EN DETALLE COMPRA ------------
    $registrarDetalle = $con->prepare("INSERT INTO `detallecompra`(`idProducto`, `idCompra`, `cantidad`, `valor`) 
    VALUES (:idp,:idc, :cant, :val)");
    $registrarDetalle->execute(array('idp' => $idProducto, 'idc' => $idCompra, 'cant' => $cantidad, 'val' => $valorUn));

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
$cantFinal = $cantidadInicial + $cantidad;

// Actualizamos la cantidad 
$sumarProducto = $con->query("UPDATE `productos` SET `cantidadProducto`= $cantFinal WHERE `idProducto` = $idProducto");
$sumarProducto->execute();
}

echo json_encode($valido);
