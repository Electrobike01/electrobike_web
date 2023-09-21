

<?php

if ($_POST) {

    require_once '../../controllers/conexion.php';

    function decrypt($data, $key)
    {
        $data = base64_decode($data);
        $ivSize = openssl_cipher_iv_length('aes-256-cbc');
        $iv = substr($data, 0, $ivSize);
        $encrypted = substr($data, $ivSize);
        return openssl_decrypt($encrypted, 'aes-256-cbc', $key, 0, $iv);
    }

    $db = new Database();
    $con = $db->conectar();

    $valido['success'] = array('success' => false);


    $contra = $_POST['contra'];
    $contra = base64_encode($contra);

    $correo = $_POST['corr'];
    $correo = decrypt($correo, 'electrobike');

    if ($correo == null) {
        $valido['success'] = false;
    } else {

        $actualizarUser = $con->query("UPDATE `usuarios` SET `contrasenaUsuario`= '$contra' WHERE `correoUsuario` = '$correo' ");
        $actualizarUser->execute();
        $valido['success'] = true;
    }
    echo json_encode($valido);

}
