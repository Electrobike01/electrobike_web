<?php
require_once '../../controllers/conexion.php';

if ($_POST) {
    $db = new Database();
    $con = $db->conectar();
    
    $valido['success'] = array('success' => true, 'title' => "", 'mensaje' => "");
    


    $idBusqueda = $_POST['idRol'];
    $idRol = $_POST['idRol'];

    $nombreRol = ucwords($_POST['nombreRol']);
    $nombreRol_ = trim($nombreRol);
    $estadoRol = $_POST['estadoRol'];

    $permisoUsuarios = $_POST['permiso_usuarios'];
    $permisoRoles = $_POST['permiso_roles'];
    $permisoProveedores = $_POST['permiso_proveedores'];
    $permisoCompras = $_POST['permiso_compras'];
    $permisoProductos = $_POST['permiso_productos'];
    $permisoClientes = $_POST['permiso_clientes'];
    $permisoVentas = $_POST['permiso_ventas'];

    $permisos = [$permisoUsuarios, $permisoRoles, $permisoProveedores, $permisoCompras, $permisoProductos, $permisoClientes, $permisoVentas];
   

    $listaPermisos = "";
    foreach ($permisos as $key => $permiso) {
        if ($permiso != ""){
            $permiso = ucwords(strtolower($permiso)) ;
            $listaPermisos = " $listaPermisos  $permiso , ";
        }   
    };

    $listaPermisos = substr($listaPermisos, 0, strlen($listaPermisos)-1);
    $listaPermisos = substr($listaPermisos, 0, strlen($listaPermisos)-1);
    $listaPermisos_ = trim($listaPermisos);

     $actualizarRol = $con->prepare("UPDATE `roles` 
     SET `idRol`= :id,`nombreRol`= :nom,`permisosRol`= :per,`estadoRol`= :est  WHERE idRol = :idb");
     $actualizarRol->execute(array('id' => $idRol, 'nom'=>$nombreRol_, 'per'=>$listaPermisos_, 'est'=>$estadoRol,'idb'=>$idBusqueda));
 
 


}
echo json_encode($valido);
