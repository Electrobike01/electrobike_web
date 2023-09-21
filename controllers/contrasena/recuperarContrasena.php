<?php
require_once '../../controllers/conexion.php';
$db = new Database();
$conn = $db->conectar();

if (isset($_POST['email'])) {
    function encrypt($data, $key)
    {
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, 0, $iv);
        return base64_encode($iv . $encrypted);
    }
    $email = $_POST['email'];

    // Consulta SQL para verificar si el correo existe en la base de datos
    $sql = "SELECT * FROM usuarios WHERE correoUsuario = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // El correo existe en la base de datos, ahora puedes enviar el correo
        $ruta = "https://electrobike-adso.000webhostapp.com/PROTOTIPO_65/login/restablecerPass.php?";
        $urlEncript = encrypt($email, 'electrobike');

        $url = $ruta . $urlEncript;

        $header = "From: electrobike.adso@gmail.com" . "\r\n";
        $header .= "Reply-To: electrobike.adso@gmail.com" . "\r\n";
        $header .= "X-Mailer: PHP/" . phpversion();
        $message = "Haga clic en el siguiente enlace para restablecer su contraseña: $url";

        $mail = mail($email, "Recuperación de contraseña", $message, $header);

        if ($mail) {
            $response = array('success' => true, 'message' => 'Correo electrónico enviado exitosamente');
        } else {
            $response = array('success' => false, 'message' => 'Error al enviar el correo electrónico');
        }
    } else {
        // El correo no existe en la base de datos
        $response = array('success' => false, 'message' => 'El correo electrónico no existe');
    }

    // Enviar la respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
