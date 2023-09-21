<?php
require_once '../../../controllers/conexion.php';
header("Content-Type: application/json");

$db = new Database();
$pdo = $db->conectar();



$idUsuario = $_GET['idUsuario'];

try {
        $stmt = $pdo->prepare("SELECT usuarios.*, roles.nombreRol 
        FROM usuarios JOIN roles ON usuarios.idRol = roles.idRol WHERE usuarios.idUsuario = ?");
        $stmt->execute([$idUsuario]);
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData) {
            // Devolver los detalles del usuario en formato JSON
            echo json_encode($userData);
        } else {
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en la consulta a la base de datos']);
    }

?>
