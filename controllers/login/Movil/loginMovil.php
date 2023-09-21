<?php
require_once '../../../controllers/conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $correoUsuario = $data['correoUsuario'];
    $contrasenaUsuario = $data['contrasenaUsuario'];
    $contrasenaUsuario = base64_encode($contrasenaUsuario);

    $db = new Database();
    $pdo = $db->conectar();

    $stmt = $pdo->prepare("SELECT usuarios.*, roles.nombreRol, permisosRol
    FROM usuarios
    JOIN roles ON usuarios.idRol = roles.idRol
    WHERE usuarios.correoUsuario = ? AND usuarios.contrasenaUsuario = ?");
    $stmt->execute([$correoUsuario, $contrasenaUsuario]);

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {

        $_isProductExist = false;
        $permisosBd = $result['permisosRol'];
        $permisosArray = explode(', ', $permisosBd);
        $listaPermisos = str_replace(' ', '', $permisosArray);

        for ($i = 0; $i < count($permisosArray); $i++) {
            if ($listaPermisos[$i] == "Productos") {
                $_isProductExist = true;
                break;
            } else {
                $_isProductExist = false;
            }
        }


        if ($result && $_isProductExist == true) {
            $response = ['success' => true, 'idUsuario' => $result['idUsuario']];
        } else if ($result && $_isProductExist == false) {
            $response = ['success' => false, 'message' => 'Acceso denegado'];
        }
    } else {
        $response = ['success' => false, 'message' => 'Credenciales incorrectas'];
    }

    echo json_encode($response);
}
