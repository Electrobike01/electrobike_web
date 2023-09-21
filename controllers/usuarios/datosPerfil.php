<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();


$datos_ = array('nombre' => '','tipoDocumento'=>'','documento' =>'', 'correo' => "",'rol'=>'', 'contrasena' => "","estado"=>'');

if($_POST){
    $id = $_POST['id'];
    

    // --------------- OBTENER DATOS -------------
    $datos = $con->query("SELECT usuarios.*,roles.nombreRol FROM `usuarios` JOIN roles ON usuarios.idRol = roles.idRol WHERE usuarios.idUsuario = $id");
    $datos->execute();

    $consultas = $datos->fetchAll(PDO::FETCH_ASSOC);
 
   
    // -------------- ENVIAR LOS DATOS ----------
   
    $datos_['nombre'] = $consultas[0]['nombreUsuario'];
    $datos_['tipoDocumento'] = $consultas[0]['tipoDocumentoUsuario'];
    $datos_['documento'] = $consultas[0]['documentoUsuario'];
    $datos_['correo'] = $consultas[0]['correoUsuario'];
    $datos_['contrasena'] = $consultas[0]['contrasenaUsuario'];
    $datos_['rol'] = $consultas[0]['nombreRol'];
    $datos_['estado'] = $consultas[0]['estadoUsuario'];


}

echo json_encode($datos_);

?>