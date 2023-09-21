<?php

require_once '../../controllers/conexion.php';

$valido;
$db = new Database();
$con = $db->conectar();

if ($_POST) {
    $nombreRol = ucwords($_POST['nombreRol']);
    $permisoUsuarios = $_POST['permiso_usuarios'];
    $permisoRoles = $_POST['permiso_roles'];
    $permisoProveedores = $_POST['permiso_proveedores'];
    $permisoCompras = $_POST['permiso_compras'];
    $permisoProductos = $_POST['permiso_productos'];
    $permisoClientes = $_POST['permiso_clientes'];
    $permisoVentas = $_POST['permiso_ventas'];
    $estadoRol = 'Activo';

    $permisos = [$permisoUsuarios, $permisoRoles, $permisoProveedores, $permisoCompras, $permisoProductos, $permisoClientes, $permisoVentas];
    $listaPermisos = "";
    foreach ($permisos as $key => $permiso) {
        if ($permiso != "") {
            $permiso = ucwords(strtolower($permiso));
            $listaPermisos = " $listaPermisos  $permiso , ";
        }
    };

    $listaPermisos = substr($listaPermisos, 0, strlen($listaPermisos) - 1);
    $listaPermisos = substr($listaPermisos, 0, strlen($listaPermisos) - 1);
    $listaPermisos_ = trim($listaPermisos);


    $registrarRoles = $con->prepare("INSERT INTO `roles`(`nombreRol`, `permisosRol`, `estadoRol`) 
        VALUES (:nom , :list, :est)");
    $registrarRoles->execute(array('nom' => $nombreRol, 'list' => $listaPermisos_, 'est' => $estadoRol));
}
echo json_encode($valido);


?>

