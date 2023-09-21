<?php

require_once '../../controllers/conexion.php';

if ($_POST) {


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

    $valido['success'] = false;
    $valido['message'] = "";

    print_r($_GET);
    $correoEncriptado = array_keys($_GET)[0];
    $correo = decrypt($correoEncriptado, 'electrobike');
    echo $correo;


    $contra = $_POST['contra'];
    $confirm_contra = isset($_POST['confirmar_contra']) ? $_POST['confirmar_contra'] : '';


    if (empty($contra) || empty($confirm_contra)) {
        $valido['message'] = "Por favor, complete todos los campos.";
    } elseif ($contra !== $confirm_contra) {
        $valido['message'] = "Las contraseñas no coinciden.";
    } else {
        $actualizarUser = $con->prepare("UPDATE `usuarios` SET `contrasenaUsuario` = ? WHERE `correoUsuario` = ?");
    // $contrasenaUsuario = base64_encode($contrasenaUsuario);
    $contrasena = base64_encode($contra);
        if ($actualizarUser->execute([$contrasena, $correo])) {
            $valido['success'] = true;
            $valido['message'] = "Contraseña actualizada con éxito.";
        } else {
            $valido['message'] = "Error al actualizar la contraseña.";
        }
    }
    echo json_encode($valido);
}



?>





<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Cambiar Contraseña</title>

    

    <style>
        /* Tu estilo común para todas las pantallas */
        html {
            background-color: #56baed;
        }

        body::-webkit-scrollbar {
            width: 0px !important;
        }

        body {
            font-family: "Poppins", sans-serif;
            height: 100vh;
            overflow-y: scroll;
            overflow-x: hidden;
            scrollbar-width: thin !important;
            scrollbar-color: transparent transparent !important;
        }


        .underlineHover {
            cursor: pointer;
        }

        .underlineHover:hover {
            font-weight: bold;
            color: #39ace7;
        }

        a {
            color: #92badd;
            display: inline-block;
            text-decoration: none;
            font-weight: 400;
        }



        .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            padding: 20px;
        }



        #formContent,
        #passContent {
            border-radius: 10px;
            background: #fff;
            padding: 3em;
            width: 90%;
            max-width: 450px;
            position: relative;
            box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
            text-align: center;
        }


        h2 {
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
            text-transform: uppercase;
            color: #cccccc;
        }

        h2.inactive {
            color: #cccccc;
        }

        h2.active {
            color: #0d0d0d;
            border-bottom: 2px solid #5fbae9;
        }

        /* Formulario */
        form {
            padding: 1em 0;
        }

        input[type="password"],
        input[type="email"],
        input[type="text"] {
            background-color: #f6f6f6;
            border: none;
            color: #0d0d0d;
            padding: 1em;
            text-align: center;
            text-decoration: none;
            display: block;
            font-size: 1rem;
            margin: 1em auto;
            width: 85%;
            border: 2px solid #f6f6f6;
            border-radius: 5px;
        }

        input[type="submit"] {
            background-color: #56baed;
            border: none;
            color: white;
            padding: 1em 2em;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            font-size: 0.9rem;
            border-radius: 5px;
            cursor: pointer;
        }


        /* Icono */
        #icon {
            width: 50%;
            border-radius: 40px;
        }

        /* Estilos adicionales para pantallas más pequeñas */
        @media screen and (max-width: 768px) {
            /* Ajusta los estilos para pantallas más pequeñas aquí */
        }


    </style>
</head>

<body>
    <h6 id="module" style="display: none;">recuperar</h6>

    <div class="wrapper">

        <div id="formContent">
            <!-- Tabs Titles -->
            <h2 class="active">Cambiar contrasena </h2>

            <!-- Icon -->
            <div class="fadeIn first">
                <img src="../img/Logo_electrobike.svg" id="icon" />
            </div>

            <!-- Login -->
            <form action="" method="post">
                <p id=""></p>
                <input type="password" name="contra" placeholder="Ingrese su nueva contrasena">
                <input type="password" name="confirmar_contra" placeholder="Confirmar su contraseña">

                <input type="submit" value="Guardar Contraseña">

                <input type="hidden" name="correo" value="<?php echo htmlspecialchars($correo); ?>">
            </form>
             <!-- Alertas de éxito y error -->
             <div id="error-message" style="color: red;"></div>
            <div id="success-message" style="color: green;"></div>

        </div>
    </div>

    <script>
        <?php
        if (isset($valido['success']) && isset($valido['message'])) {
            echo "var success = " . ($valido['success'] ? 'true' : 'false') . ";";
            echo "var message = '" . $valido['message'] . "';";
        } else {
            echo "var success = false;";
            echo "var message = '';";
        }
        ?>

        if (success) {
            document.getElementById('success-message').innerText = message;
            setTimeout(function () {
                document.getElementById('success-message').innerText = '';
            }, 5000); 
        } else if (message !== '') {
            document.getElementById('error-message').innerText = message;
        }
    </script>


</body>

</html>