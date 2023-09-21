<?php
require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido['success'] = array('success' => true, 'registros' => "", 'data' => [], 'roles' => []);



if ($_POST) {
    $busqueda = $_POST['busqueda'];


    $filtros = ['idUsuario', 'nombreUsuario', 'tipoDocumentoUsuario', 'documentoUsuario', 'correoUsuario', 'estadoUsuario', 'nombreRol'];
    $sentencia = '';

    foreach ($filtros as $key => $value) {
        $sentencia = $sentencia . $value . " like '%" . $busqueda . "%' or ";
    }
    $sentencia = substr($sentencia, 0, -3);

    $consulta = "SELECT usuarios.*, roles.nombreRol 
FROM usuarios JOIN roles ON usuarios.idRol = roles.idRol
WHERE " . $sentencia . " ORDER BY estadoUsuario, idUsuario ASC  LIMIT 0,6";
    $query = $con->query($consulta);
    $query->execute();
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);
    $cantidadRegistros = count($resultados);

    //Traemos los roles para los selects del editar
    $consulta = "SELECT DISTINCT idRol, nombreRol FROM roles;";
    $query = $con->query($consulta);
    $query->execute();
    $roles = $query->fetchAll(PDO::FETCH_ASSOC);

    $valido['roles'] = $roles;

    if (count($resultados) > 0) {
        $valido['data'] = $resultados;
        $valido['registros'] = $cantidadRegistros;
    } else {
        $valido['success'] = false;
        $valido['data'] = '';
    }

    echo json_encode($valido);
}
