<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido = ['data' => [], 'registros' => '','roles'=>[]];
if ($_POST) {

    $pagina = $_POST['pagina'];
    $limitePg = 5 * ($pagina - 1);

    //Contamos cuantos registros hay en total
    $contador = "SELECT usuarios.*, roles.nombreRol 
    FROM usuarios JOIN roles ON usuarios.idRol = roles.idRol ";
    $queryContador = $con->query($contador);
    $queryContador->execute();
    $resultadosContador = $queryContador->fetchAll(PDO::FETCH_ASSOC);
    $cantidadRegistros = count($resultadosContador);
    $valido['registros'] = $cantidadRegistros;


    //Listamos los reigistros 
    $consulta = "SELECT usuarios.*, roles.nombreRol 
    FROM usuarios JOIN roles ON usuarios.idRol = roles.idRol
     ORDER BY estadoUsuario, idUsuario ASC  limit $limitePg, 5 ";
    $query = $con->query($consulta);
    $query->execute();
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);

    //Traemos los roles para los selects del editar
    $consulta = "SELECT DISTINCT idRol, nombreRol FROM roles;";
    $query = $con->query($consulta);
    $query->execute();
    $roles = $query->fetchAll(PDO::FETCH_ASSOC);

    $valido['roles'] = $roles;
    $valido['data'] = $resultados;

    echo json_encode($valido);
}
