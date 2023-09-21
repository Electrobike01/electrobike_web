<?php

require_once '../../controllers/conexion.php';

$db = new Database();
$con = $db->conectar();

$valido = array('success' => false,'data' => [], 'posiciones' => [], 'ids' => [],'cantidadR' => 0);

if ($_POST) {

    $filtro_proveedor = $_POST['proveedor'];
    $filtro_fecha_ = $_POST['fecha'];
    $pagina = $_POST['pagina'];
   
    if (strpos($pagina, '-') !== false) {
        $limitePg = 0;
    } else {
        $limitePg = 10 * ($pagina - 1);
    }

    
    if ($filtro_fecha_ == 'Todas las fechas' && $filtro_proveedor == 'Todos los proveedores') {
        $where = "";
        // echo 'Opcion ambos vacios';
        $cant = 10;
    } else if ($filtro_proveedor == 'Todos los proveedores' && $filtro_fecha_ != 'Todas las fechas') {
        $where = 'WHERE fechaCompra = ' . "'$filtro_fecha_'";
        $cant = 20;
        // echo 'Opcion proveedor vacios';

    } else if ($filtro_fecha_ == 'Todas las fechas' && $filtro_proveedor != 'Todos los proveedores') {
        $where = 'WHERE p.idProveedor = ' . $filtro_proveedor;
        $cant = 20;
        // echo 'Opcion fecha vacios';
    } else {
        $where = 'WHERE p.idProveedor = ' . $filtro_proveedor . ' AND fechaCompra = ' . " '$filtro_fecha_'";
        $cant = 20;
    }


    $consultaRegistros = "SELECT c.idCompra, c.idProveedor, p.nombreProveedor, c.valorT, DATE_FORMAT(c.fechaCompra, '%e-%M-%Y','es_ES') AS fechaCompra, dc.idDetalleCompra, dc.idProducto, pr.nombreProducto, dc.cantidad, dc.valor
    FROM compras c
    JOIN detallecompra dc ON c.idCompra = dc.idCompra
    JOIN proveedores p ON c.idProveedor = p.idProveedor
    JOIN productos pr ON dc.idProducto = pr.idProducto " . $where . " ORDER BY c.idCompra DESC";
    $query = $con->query($consultaRegistros);
    $query->execute();
    // ------------ CREA EL ARRAY ------------
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);
    $cantidadReg = count($resultados);
    $valido['cantidadR'] = $cantidadReg;


    // -------------------------------------------------------------------
    $consultaFinal = "SELECT c.idCompra, c.idProveedor, p.nombreProveedor, c.valorT, DATE_FORMAT(c.fechaCompra, '%e-%M-%Y','es_ES') AS fechaCompra, dc.idDetalleCompra, dc.idProducto, pr.nombreProducto, dc.cantidad, dc.valor
    FROM compras c
    JOIN detallecompra dc ON c.idCompra = dc.idCompra
    JOIN proveedores p ON c.idProveedor = p.idProveedor
    JOIN productos pr ON dc.idProducto = pr.idProducto " . $where . " ORDER BY c.idCompra DESC limit $limitePg ,$cant;";

    $query = $con->query($consultaFinal);
    $query->execute();

    // ------------ CREA EL ARRAY ------------
    $resultados = $query->fetchAll(PDO::FETCH_ASSOC);


    //FORMATO PARA LISTAR
    function obtenerIdCompraRepetidos($registros)
    {
        $idCompraCount = array();

        foreach ($registros as $registro) {

            $idCompra = $registro['idCompra'];
            if (isset($idCompraCount[$idCompra])) {
                $idCompraCount[$idCompra]++;
            } else {
                $idCompraCount[$idCompra] = 1;
            }
        }

        $idsEncontrados = array_keys($idCompraCount);
        $repeticiones = array_values($idCompraCount);

        return array(
            'idsEncontrados' => $idsEncontrados,
            'repeticiones' => $repeticiones
        );
    }

    //Funcion crea los ids y repeticiones
    $arrayElementos = obtenerIdCompraRepetidos($resultados);
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
