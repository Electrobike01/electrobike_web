<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../_public/style/login/login.css">
    <title>Document</title>

    <!----===== EncriptarContraena ===== -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>

    <!----===== SweetAlert ===== -->
    <script src="../../dependencias/sweetAlert/js/sweetAlert-main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.min.css">

</head>

<body>
<h6 id="module" style="display: none;">Recuperar</h6>

    <div class="wrapper">

        <div id="formContent">
            <!-- Tabs Titles -->
            <h2 class="active">Cambiar contraseña</h2>

            <!-- Icon -->
                <div class="fadeIn first">
                    <img src="../_public/img/Logo_electrobike.svg" id="icon" />
                </div>

            <!-- Login -->
            <form id="">
                <p id="infoCorr" ></p>
                <input type="text" id="contrasena1" class="fadeIn second" name="" placeholder="Ingrese su nueva contraseña">
                <input type="text" id="contrasena2" class="fadeIn third" name="" placeholder="Ingrese nuevamente su nueva contraseña">

                <input type="submit" id="cambiar" class="fadeIn fourth" name="" value="Cambiar">
            </form>

        </div>



    </div>





    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.min.css">
    <script src="../../negocio/login/login.js"></script>
    <script src="../../negocio/login/recuperarPass.js"></script>


</body>

</html>


