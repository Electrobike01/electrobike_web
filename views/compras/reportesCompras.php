<?php
// Incluir la biblioteca PhpSpreadsheet
require '../vendor/autoload.php';
require_once '../../controllers/conexion.php';

// Obtener los datos de la tabla 
$db = new Database();
$con = $db->conectar();

$idProveedor = $_POST['proveedor_name'];
$fechaCompra = $_POST['fecha_compra'];
if($fechaCompra == 'Todas las fechas'){
    $fechaCompra = "";
}
if($idProveedor == "Todos los proveedores"){
$idProveedor = "";
}


$consultaReportes = "SELECT c.idCompra, c.idProveedor, p.nombreProveedor, c.valorT,
DATE_FORMAT(c.fechaCompra, '%e-%M-%Y','es_ES') AS fechaCompra, dc.idDetalleCompra, dc.idProducto, pr.nombreProducto, dc.cantidad, dc.valor
FROM compras c JOIN detallecompra dc ON c.idCompra = dc.idCompra JOIN proveedores p ON c.idProveedor = p.idProveedor
JOIN productos pr ON dc.idProducto = pr.idProducto
WHERE p.idProveedor like '%$idProveedor%' and fechaCompra like '%$fechaCompra%'
ORDER BY c.idCompra ASC;";


$queryReportesC = $con->query($consultaReportes);
$resultados = $queryReportesC->fetchAll(PDO::FETCH_ASSOC);

// Crear un nuevo objeto de la clase Spreadsheet
$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

// Establecer el nombre de la hoja como "compras"
$sheet->setTitle('compras');

// Establecer estilos para el encabezado
$styleHeader = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'startColor' => ['rgb' => '118dd5']],
    'alignment' => ['horizontal' => PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER],
];

// Agregar encabezados a la hoja de cálculo y aplicar estilos
$sheet->setCellValue('A1', 'ID Compra');
$sheet->setCellValue('B1', 'Nombre Proveedor');
$sheet->setCellValue('C1', 'Fecha de Compra');
$sheet->setCellValue('D1', 'Nombre Producto');
$sheet->setCellValue('E1', 'Cantidad');
$sheet->setCellValue('F1', 'Valor Uni');
$sheet->setCellValue('G1', 'Valor Total');
$sheet->getStyle('A1:G1')->applyFromArray($styleHeader);

// Llenar la hoja de cálculo con los datos de la tabla
$row = 2;
foreach ($resultados as $dato) {
    $sheet->setCellValue('A' . $row, $dato['idCompra']);
    $sheet->setCellValue('B' . $row, $dato['nombreProveedor']);
    $sheet->setCellValue('C' . $row, $dato['fechaCompra']);
    $sheet->setCellValue('D' . $row, $dato['nombreProducto']);
    $sheet->setCellValue('E' . $row, $dato['cantidad']);
    
    // Formatear los valores con separadores decimales
    $sheet->setCellValue('F' . $row, number_format($dato['valor'], 2, ',', '.'));
    $sheet->setCellValue('G' . $row, number_format($dato['valorT'], 2, ',', '.'));
    $row++;
}

// Configurar el ancho automático de las columnas para ajustarse al contenido
foreach (range('A', 'G') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// Establecer la zona horaria
date_default_timezone_set('America/Bogota');

// Agregar una celda con la fecha de descarga
$fechaActual = date('Y-m-d H:i:s'); // Obtener la fecha y hora actual
$sheet->mergeCells('A' . $row . ':G' . $row); // Combinar celdas para la fecha de descarga
$sheet->setCellValue('A' . $row, 'Fecha de Descarga: ' . $fechaActual);
$sheet->getStyle('A' . $row)->getFont()->setBold(true);

// Configurar bordes para la tabla
$styleBorders = [
    'borders' => [
        'allBorders' => ['borderStyle' => PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN],
    ],
];
$sheet->getStyle('A1:G' . ($row - 1))->applyFromArray($styleBorders);

// Configurar el encabezado y el tipo de contenido para la descarga del archivo
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="reporte_compras.xlsx"');
header('Cache-Control: max-age=0');

// Guardar el archivo en el formato de Excel (xlsx)
$writer = PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
$writer->save('php://output');
