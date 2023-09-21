<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido = array('success' => false, 'title' => "", 'mensaje' => "");

if ($_POST) {

    $idUsuario = $_POST['id'];
    $contraActual = $_POST['contraActual'];
    $contraActual = base64_encode($contraActual);
    $contraNueva = $_POST['contraNueva'];
    $contraNueva = base64_encode($contraNueva);



    //Validamos que sea correcta la contrsena
    $contador = "SELECT * FROM usuarios where contrasenaUsuario = '$contraActual' and idUsuario = $idUsuario";
    $queryContador = $con->query($contador);
    $queryContador->execute();
    $resultadosContador = $queryContador->fetchAll(PDO::FETCH_ASSOC);
    if(count($resultadosContador) >= 1){
        $valido['success'] = true;
        $actualizarCliente = $con->prepare("UPDATE `usuarios` SET contrasenaUsuario = '$contraNueva' WHERE idUsuario = :idb");
        $actualizarCliente->execute(array('idb'=>$idUsuario));
    }else{
        $valido['success'] = false;
    }


   
}
echo json_encode($valido);
