<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'permisos' => '', 'nombre' => '', 'estado' => '');

$id_usuario = $_POST['id_usuario'];

if ($id_usuario == null) {
    $valido['estado'] = 'destruido';
} else {
    //Consultamos los datos del usuarios
    $query = $con->query("SELECT * FROM `usuarios` WHERE `idUsuario` = '$id_usuario' ");
    $query->execute();
    $consultas = $query->fetchAll(PDO::FETCH_ASSOC);


    //Consultamos los permisos del rol de usuario
    $idRol = $consultas[0]['idRol'];
    $query_ = $con->query("SELECT * FROM `roles` WHERE `idRol` = '$idRol' ");
    $query_->execute();
    $consultasRoles = $query_->fetchAll(PDO::FETCH_ASSOC);


    //Obtenemos y enviamos la informacion importante 
    $permisosUsuario = $consultasRoles[0]['permisosRol'];
    $nombre = $consultas[0]['nombreUsuario'];
    $estado = $consultas[0]['estadoUsuario'];




    $valido['nombre'] = $nombre;
    $valido['estado'] = $estado;
    $valido['permisos'] = $permisosUsuario;
}



echo json_encode($valido);
