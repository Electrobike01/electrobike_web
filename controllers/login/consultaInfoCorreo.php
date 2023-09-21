<?php

function decrypt($data, $key)
{
    $data = base64_decode($data);
    $ivSize = openssl_cipher_iv_length('aes-256-cbc');
    // Verificar si el tamaño del IV es válido
    if (strlen($data) < $ivSize) {
        return 'error';
    }
    $iv = substr($data, 0, $ivSize);
    $encrypted = substr($data, $ivSize);

    try {
        $res = openssl_decrypt($encrypted, 'aes-256-cbc', $key, 0, $iv);
    } catch (\Throwable $th) {
        $res = 'error';
    }

    return $res;
}


if ($_POST['corr'] == null) {
    $valido['correo'] = 'error';
} else {

    $correo = decrypt($_POST['corr'], 'electrobike');
    if ($correo == '') {
        $correo = 'error';
    }
    $valido['correo'] = $correo;
}
echo json_encode($valido);
