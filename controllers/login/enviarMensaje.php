
<?php
// Función para encriptar datos
function encrypt($data, $key)
{
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
    $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, 0, $iv);
    return base64_encode($iv . $encrypted);
}

// Función para desencriptar datos
function decrypt($data, $key)
{
    $data = base64_decode($data);
    $ivSize = openssl_cipher_iv_length('aes-256-cbc');
    $iv = substr($data, 0, $ivSize);
    $encrypted = substr($data, $ivSize);
    return openssl_decrypt($encrypted, 'aes-256-cbc', $key, 0, $iv);
}

$valido['success'] = array('success' => false);

// Capturamos el correo
$correo = $_POST['correo'];

// Definimos la URL base para el restablecimiento de contraseña
$route = "https://electrobike-adso-wild.000webhostapp.com/views/login/restablecerPass.php?";

// Encriptamos el correo para incluirlo en la URL
$urlEncript = encrypt($correo, 'electrobike');

// Creamos la URL completa con el correo encriptado
$url = $route . $urlEncript;

// Dirección de correo destino y asunto del correo
$destino = $correo;
$asunto = "Restablecer contraseña";

// HTML del correo 
$cuerpo = "
<!DOCTYPE html>
<html>
<head>

    <link rel='stylesheet' href='https://electrobike-adso-wild.000webhostapp.com/views/_public/style/login/mail.css'>


</head>
<body>
  <div class='container'>
    <img class='logo' src='../img/Logo_electrobike.svg' alt='Logo de la empresa'>
    <p class='main-text'>Hemos enviado este correo electrónico en respuesta a su solicitud de restablecer su contraseña en nombre de la empresa.</p>
    <p class='main-text'>Para restablecer su contraseña, por favor presione el siguiente botón:</p>
    <button class='button'>Restablecer Contraseña</button>
    <a href='$url'>Restablecer Contraseña</a>
    <p class='secondary-text'>Ignore este correo electrónico si no solicitó un cambio de contraseña.</p>
  </div>
</body>
</html>
";



// Configuración de los headers para el correo
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: Electrobike\r\n";
$headers .= "Return-path: $destino\r\n";

// Envío del correo
// $mail = mail($destino, $asunto, $cuerpo, $headers);
$mail = mail($destino, $asunto, $cuerpo);

if ($mail) {
    $valido['success'] = true;
    echo json_encode($valido);
}
?>
