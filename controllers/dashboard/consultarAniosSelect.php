<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, "anios" =>'',"mesActu" =>'');

//----------- Obtenemos el mes y ano actual ---------
$consultaMes_Ano_Actual = $con->prepare("SELECT MONTH(CURRENT_DATE()) AS mes_actual");
$consultaMes_Ano_Actual->execute();
$resultado = $consultaMes_Ano_Actual->fetchAll(PDO::FETCH_ASSOC);
$mesActual = $resultado[0]['mes_actual'];
$valido['mesActu'] = $mesActual;

//Consultamos lo anios de registros
$consulta = "SELECT DISTINCT EXTRACT(YEAR FROM fechaCompra) as anio FROM compras ORDER by anio deSC;";
$query = $con->query($consulta);
$query->execute();

$anios = $query->fetchAll(PDO::FETCH_ASSOC);

if(count($anios) == 0){
$anios = "No se econtraron registros";
}

$valido['anios'] = $anios;

echo json_encode($valido);
