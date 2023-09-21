<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido = array('success' => false, 'data' => [], 'posiciones' => [], 'ids' => [],'cantidadR' => 0);


if ($_POST) {

    $filtro_cliente = $_POST['cliente'];
    $filtro_fecha_ = $_POST['fecha'];
    $pagina = $_POST['pagina'];

    if (strpos($pagina, '-') !== false) {
        $limitePg = 0;
    } else {
        $limitePg = 10 * ($pagina - 1);
    }


  
    if ($filtro_fecha_ == 'Todas las fechas' && $filtro_cliente == 'Todos los clientes') {
        $where = "";
        // echo 'Opcion ambos vacios';
        $cant = 10;
    } else if ($filtro_cliente == 'Todos los clientes' && $filtro_fecha_ != 'Todas las fechas') {
        $where = 'WHERE fechaVenta = ' . "'$filtro_fecha_'";
        // echo 'Opcion cliente vacios';
        $cant = 20; 


    } else if ($filtro_fecha_ == 'Todas las fechas' && $filtro_cliente != 'Todos los clientes') {
        $where = 'WHERE p.idCliente = ' . $filtro_cliente;
        // echo 'Opcion fecha vacios';
        $cant = 20;
    } else {
        $where = 'WHERE p.idCliente = ' . $filtro_cliente . ' AND fechaVenta = ' . " '$filtro_fecha_'";
        $cant = 20;
    }

    $consultaRegistros = "SELECT c.idVenta, c.idCliente, p.nombreCliente, c.valorT, DATE_FORMAT(c.fechaVenta, '%e-%M-%Y','es_ES') AS fechaVenta, dc.idDetalleVenta, dc.idProducto, pr.nombreProducto, dc.cantidad, dc.valor
    FROM ventas c
    JOIN detalleventa dc ON c.idVenta = dc.idVenta
    JOIN clientes p ON c.idCliente = p.idCliente
    JOIN productos pr ON dc.idProducto = pr.idProducto " . $where . " ORDER BY c.idVenta DESC";
    $query = $con->query($consultaRegistros);
    $query->execute();
    // ------------ CREA EL ARRAY ------------
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);
    $cantidadReg = count($resultados);
    $valido['cantidadR'] = $cantidadReg;


    // -------------------------------------------------------------------

    $consultaFinal = "SELECT c.garantia, c.idVenta, c.idCliente, p.nombreCliente, c.valorT, DATE_FORMAT(c.fechaVenta, '%e-%M-%Y','es_ES') AS fechaVenta, dc.idDetalleVenta, dc.idProducto, pr.nombreProducto, dc.cantidad, dc.valor
    FROM ventas c
    JOIN detalleventa dc ON c.idVenta = dc.idVenta
    JOIN clientes p ON c.idCliente = p.idCliente
    JOIN productos pr ON dc.idProducto = pr.idProducto " . $where . " ORDER BY c.idVenta DESC limit $limitePg ,$cant;";



    $query = $con->query($consultaFinal);
    $query->execute();

    // ------------ CREA EL ARRAY ------------
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);


    //FORMATO PARA LISTAR
    function obtenerIdVentaRepetidos($registros)
    {
        $idVentaCount = array();

        foreach ($registros as $registro) {

            $idVenta = $registro['idVenta'];
            if (isset($idVentaCount[$idVenta])) {
                $idVentaCount[$idVenta]++;
            } else {
                $idVentaCount[$idVenta] = 1;
            }
        }

        $idsEncontrados = array_keys($idVentaCount);
        $repeticiones = array_values($idVentaCount);

        return array(
            'idsEncontrados' => $idsEncontrados,
            'repeticiones' => $repeticiones
        );
    }

    //Funcion crea los ids y repeticiones
    $arrayElementos = obtenerIdVentaRepetidos($resultados);
    $ids = $arrayElementos['repeticiones'];


    //Creamo un segundo array que genere las posiciones de la primera insercion
    $array2 = array();
    $sum = 0;
    $array2[] = 0; // Agregamos el primer elemento como 0
    for ($i = 1; $i < count($ids); $i++) {
        $sum += $ids[$i - 1];
        $array2[] = $sum;
    }


    // ---------- Enviamos los datos de los resultados ---------
    if (count($resultados) > 0) {
        $valido['success'] = true;
        $valido['data'] = $resultados;
        $valido['posiciones'] = $array2;
        $valido['ids'] = $ids;
    } else {
        $valido['success'] = false;
    }
}

echo json_encode($valido);
