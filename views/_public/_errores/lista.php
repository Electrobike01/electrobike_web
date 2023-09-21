<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <div id="pantalla" class="pantalla"></div>
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../../style/usuarios/formulario.css">
    <link rel="stylesheet" href="../../style/usuarios/listar.css">
    <link rel="stylesheet" href="../../style/_general/style.css">
    <link rel="stylesheet" href="../../style/_general/sidebar.css">
    <link rel="stylesheet" href="../../style/_general/responsive.css">
    <!----===== Boxicons CSS ===== -->
    <link rel="stylesheet" href="../../dependencias/boxicons-2.1.4/css/boxicons.min.css">
    <!----===== Bootstrap ===== -->
    <link rel="stylesheet" href="../../dependencias/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css">
    <!----===== SweetAlert ===== -->
    <script src="../../dependencias/sweetAlert/js/sweetAlert-main.js"></script>

    <title>Electrobike</title>
</head>

<!-------- Llamar la sesion ----->
<?php include('../../nav/sesion.html'); ?>

<body class="animate-in-ov">


    <!-------- Llamar al nav ----->
    <?php include('../../nav/nav.html'); ?>

    <section class="home">

        <!---------------------- Header ----------------->
        <div class="header">

            <!---------- Icono menu_movil ---------->
            <div class="nav_movil">
                <div class="_layer -top"></div>
                <div class="_layer -mid"></div>
                <div class="_layer -bottom"></div>
            </div>

            <h1 id="titulo" class="titulo"></h1>

            <!-------- Llamar al nav_movil ----->

            <?php include('../../nav/nav_movil.html'); ?>


            <!-------- Llamar recuadro user ----->
            <?php include('../../nav/user.html'); ?>


        </div>

        <!-- -----------------------FORMULARIO --------------------------------------------- -->
        <div id="checklist">


            <!-- checked -->
            <input value="1" name="r" type="checkbox" id="01" checked><label for="01">En configuración cambiar el rol</label>
            <!-- <input value="2" name="r" type="checkbox" id="02" ><label for="02">Cerrar sesión después de cierto tiempo</label> -->
            <!-- <input value="3" name="r" type="checkbox" id="03" ><label for="03">Proveedores otro campo detalles de que vende </label> -->
            <input value="4" name="r" type="checkbox" id="04" checked><label for="04">Encriptar todas las variables localstorage</label>
            <input value="5" name="r" type="checkbox" id="05" checked><label for="05">Cambiar todas las ñ contraseña</label>
            <input value="6" name="r" type="checkbox" id="06" checked><label for="06">Olvidó contraseña</label>
            <input value="7" name="r" type="checkbox" id="07" checked><label for="07">Display none módulos móviles</label>
            <input value="8" name="r" type="checkbox" id="08" checked><label for="08">Cuando edite el usuario activo actualmente se cierre sesion</label>
            <input value="9" name="r" type="checkbox" id="09" checked><label for="09">Buscador por categoría en productos (si pongo alta que muestre bicicletasBajaGama) </label>
            <input value="10" name="r" type="checkbox" id="10" checked><label for="10">No puedo desactivar un producto con una cantidad mayor a 0</label>
            <input value="11" name="r" type="checkbox" id="11"><label for="11">Categorías productos fotos aleatorias</label>
            <input value="12" name="r" type="checkbox" id="12" checked><label for="12">Cambiar el color de los botones en ventanas modales</label>
            <!-- <input value="13" name="r" type="checkbox" id="13" ><label for="13">Proveedores hacer las estrellas de calificacion</label> -->
            <input value="14" name="r" type="checkbox" id="14" ><label for="14">Poner en los inputs contraseña el ojito de mostrar</label>
            <input value="15" name="r" type="checkbox" id="15" checked><label for="15">Que en todos los modulos busque por TODO (estado,etc)</label>
            <input value="16" name="r" type="checkbox" id="16" checked><label for="16">Estilizar los inputs disable en todos</label>
            <input value="17" name="r" type="checkbox" id="17" checked><label for="17">En compras no puedo agregar dos compras "iguales" misma categ y mismo producto</label>
            <input value="18" name="r" type="checkbox" id="18" checked><label for="18">La tabla del carrito en compras sea responsive</label>
            <input value="19" name="r" type="checkbox" id="19"><label for="19">Estandarizar las tablas en todos</label>
            <input value="20" name="r" type="checkbox" id="20" checked><label for="20">Que en listar productos, se muestre la lista ordenada</label>
            <input value="21" name="r" type="checkbox" id="21" checked><label for="21">Que los inputs de precio se formateen (3000 => 3.000)</label>
            <input value="22" name="r" type="checkbox" id="22"><label for="22">Los titulos de las categorias estilizarlos</label>
            <input value="23" name="r" type="checkbox" id="23" checked><label for="23">En todos los listar, cuando no hayan registros aparezca mensaje y link para registrar</label>
            <input value="24" name="r" type="checkbox" id="24" checked><label for="24">Estilizar el "Sin resultados de busqueda" en los listar</label>
            <input value="25" name="r" type="checkbox" id="25" checked><label for="25">OPCIONAL: paginar las listas largas</label>
            <!-- <input value="26" name="r" type="checkbox" id="26"><label for="26">Que cuando busque en los listar y active los ocultos no se bugee</label> -->
            <input value="27" name="r" type="checkbox" id="27"><label for="27">Cambiar TODOS los botones por el preesed</label>
            <!-- <input value="28" name="r" type="checkbox" id="28"><label for="28">OPCIONAL:en configuraciones poner hover</label> -->
            <input value="29" name="r" type="checkbox" id="29"><label for="29">Que todos los inputs esten type text, hasta los numericos y correos</label>
            <input value="30" name="r" type="checkbox" id="30" ><label for="30">Validar modulo por modulo las validaciones, una por una por favor una por una</label>
            <input value="31" name="r" type="checkbox" id="31" checked><label for="31">Cambiar el login boton pointer</label>
            <input value="32" name="r" type="checkbox" id="32" checked><label for="32">Crear ventana olvido contraseña</label>
            <input value="33" name="r" type="checkbox" id="33" checked><label for="33">Testear reporte de excel </label>
            <!-- <input value="34" name="r" type="checkbox" id="34"><label for="34">Testear recuperar contraseña</label> -->
            <input value="35" name="r" type="checkbox" id="35" checked><label for="35">Arreglar script de la base de datos</label>
            <input value="36" name="r" type="checkbox" id="36" ><label for="36">Rogarle a alvaro por nuestras vidas</label>
            <!-- <input value="37" name="r" type="checkbox" id="37"><label for="37">Opcional: poner animacion al carrito de compras y ventas cuando se eliman una compra</label> -->
            <input value="38" name="r" type="checkbox" id="38" checked><label for="38">Carrito de compras que los inputs numericos no admitan texto</label>
            <input value="39" name="r" type="checkbox" id="39" checked><label for="39">Carrito de compras que los valores de precio sea mayor a 50 pesos y cantidad no pueda ser 0</label>
            <input value="40" name="r" type="checkbox" id="40" checked><label for="40">Carrito estilizar inputs del carrito</label>
            <input value="41" name="r" type="checkbox" id="41" checked><label for="41">Que los botones del carrito editar y eliminar sean como el estandar </label>
            <input value="42" name="r" type="checkbox" id="42"><label for="42">Validar que no se repitan proveedores con el mismo nombre</label>
            <input value="43" name="r" type="checkbox" id="43" checked><label for="43">Cuando se cambie un rol de usuario se actualice la  sesion </label>
            <input value="44" name="r" type="checkbox" id="44" checked><label for="44">Cuando cambie la fecha en el computador que no se guarde asi en la BD</label>
            <input value="45" name="r" type="checkbox" id="45" checked><label for="45">Que en el login la tecla enter incie session</label>
            <input value="46" name="r" type="checkbox" id="46"><label for="46">Cuando entre a configuraciones, si no actualice nada que no cierre sesion</label>
            <input value="47" name="r" type="checkbox" id="47" checked><label for="47">En listar fechas hacer un calendario desde - hasta </label>
            <input value="48" name="r" type="checkbox" id="48" checked><label for="48">Cuando cambia el rol de la persona activa le cierre sesion si no no</label>
            <input value="49" name="r" type="checkbox" id="49" checked><label for="49">El tamaño en editar de los carritos es muy pequeño y no s eve el precio</label>
            <input value="50" name="r" type="checkbox" id="50" checked><label for="50">En el carrito del js poner el porcentaje sin que se dañe TODO</label>
            <input value="51" name="r" type="checkbox" id="51" checked><label for="51">Permitir eliminar un proveedor y un cliente cuando no tenga compras ni ventas</label>
            <input value="52" name="r" type="checkbox" id="52" checked><label for="52">En los carritos cambiar el orden de los campos y en listar poner el total al final</label>
            <!-- <input value="53" name="r" type="checkbox" id="53"><label for="53">En los carritos quitar prpveedor y enumerar las compras</label> -->
            <input value="54" name="r" type="checkbox" id="54"><label for="54">En los carrito ventas si el porcentaje es negativo sea rojo si no verde</label>
            <input value="55" name="r" type="checkbox" id="55"><label for="55">Si yo le cambio cualquier campo a un usuario, automáticamente que se cierre sesión</label>
            <input value="56" name="r" type="checkbox" id="56" checked><label for="56" > Poner mensaje si no hay registros en la tabla que aparezca el mensaje de "no se encontraron resultados" en: Proveedores, clientes, ventas, productos (NO SE SI ESTÁ)</label>
            <input value="57" name="r" type="checkbox" id="57"><label for="57">Quemar en el sistema (de la misma manera que rol admin) Cliente y Proveedor de mostrador</label>
            <input value="58" name="r" type="checkbox" id="58"><label for="58">- En ventas, Arreglar por enecima vez la lista (Orden de la tabla)</label>
            <input value="59" name="r" type="checkbox" id="59"><label for="59">Corregir todos los tipos de input</label>
            <!-- <input value="60" name="r" type="checkbox" id="60"><label for="60"></label> -->
            <input value="61" name="r" type="checkbox" id="61" checked><label for="61" >En ventas no permitir vender algo a menos de 50</label>
            <!-- 
            <input value="62" name="r" type="checkbox" id="62"><label for="62"></label>
            <input value="63" name="r" type="checkbox" id="63"><label for="63"></label>
            <input value="64" name="r" type="checkbox" id="64"><label for="64"></label>
            <input value="65" name="r" type="checkbox" id="65"><label for="65"></label>
            <input value="66" name="r" type="checkbox" id="66"><label for="66"></label>
            <input value="67" name="r" type="checkbox" id="67"><label for="67"></label>
            <input value="68" name="r" type="checkbox" id="68"><label for="68"></label>
            <input value="69" name="r" type="checkbox" id="69"><label for="69"></label>
            <input value="70" name="r" type="checkbox" id="70"><label for="70"></label>
            <input value="71" name="r" type="checkbox" id="71"><label for="71"></label>
            <input value="72" name="r" type="checkbox" id="72"><label for="72"></label>
            <input value="73" name="r" type="checkbox" id="73"><label for="73"></label>
            <input value="74" name="r" type="checkbox" id="74"><label for="74"></label>
            <input value="75" name="r" type="checkbox" id="75"><label for="75"></label>
            <input value="76" name="r" type="checkbox" id="76"><label for="76"></label>
            <input value="77" name="r" type="checkbox" id="77"><label for="77"></label>
            <input value="78" name="r" type="checkbox" id="78"><label for="78"></label>
            <input value="79" name="r" type="checkbox" id="79"><label for="79"></label>
            <input value="80" name="r" type="checkbox" id="80"><label for="80"></label>
            <input value="81" name="r" type="checkbox" id="81"><label for="81"></label>
            <input value="82" name="r" type="checkbox" id="82"><label for="82"></label>
            <input value="83" name="r" type="checkbox" id="83"><label for="83"></label>
            <input value="84" name="r" type="checkbox" id="84"><label for="84"></label>
            <input value="85" name="r" type="checkbox" id="85"><label for="85"></label>
            <input value="86" name="r" type="checkbox" id="86"><label for="86"></label>
            <input value="87" name="r" type="checkbox" id="87"><label for="87"></label>
            <input value="88" name="r" type="checkbox" id="88"><label for="88"></label>
            <input value="89" name="r" type="checkbox" id="89"><label for="89"></label>
            <input value="90" name="r" type="checkbox" id="90"><label for="90"></label>
            <input value="91" name="r" type="checkbox" id="91"><label for="91"></label>
            <input value="92" name="r" type="checkbox" id="92"><label for="92"></label>
            <input value="93" name="r" type="checkbox" id="93"><label for="93"></label>
            <input value="94" name="r" type="checkbox" id="94"><label for="94"></label>
            <input value="95" name="r" type="checkbox" id="95"><label for="95"></label>
            <input value="96" name="r" type="checkbox" id="96"><label for="96"></label>
            <input value="97" name="r" type="checkbox" id="97"><label for="97"></label>
            <input value="98" name="r" type="checkbox" id="98"><label for="98"></label>
            <input value="99" name="r" type="checkbox" id="99"><label for="99"></label> -->

        </div>


        <h1 class="page" id="ModuloActual">inicio</h1>
        <h1 class="page" id="SubModuloActual"></h1>
    </section>





    <script src="../../js/usuarios/usuarios.js"></script>
    <script src="../../js/_general/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>





<style>
    #checklist {
        --background: #fff;
        --text: #414856;
        --check: #4f29f0;
        --disabled: #c3c8de;
        --width: auto;
        --height: auto;
        --border-radius: 10px;
        background: var(--background);
        width: var(--width);
        height: var(--height);
        border-radius: var(--border-radius);
        position: relative;
        box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
        padding: 30px 85px;
        display: grid;
        grid-template-columns: 30px auto;
        align-items: center;
        justify-content: center;
    }

    #checklist label {
        color: var(--text);
        position: relative;
        cursor: pointer;
        display: grid;
        align-items: center;
        width: fit-content;
        transition: color 0.3s ease;
        margin-right: 20px;
    }

    #checklist label::before,
    #checklist label::after {
        content: "";
        position: absolute;
    }

    #checklist label::before {
        height: 2px;
        width: 8px;
        left: -27px;
        background: var(--check);
        border-radius: 2px;
        transition: background 0.3s ease;
    }

    #checklist label:after {
        height: 4px;
        width: 4px;
        top: 8px;
        left: -25px;
        border-radius: 50%;
    }

    #checklist input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;
        height: 15px;
        width: 15px;
        outline: none;
        border: 0;
        margin: 0 15px 0 0;
        cursor: pointer;
        background: var(--background);
        display: grid;
        align-items: center;
        margin-right: 20px;
    }

    #checklist input[type="checkbox"]::before,
    #checklist input[type="checkbox"]::after {
        content: "";
        position: absolute;
        height: 2px;
        top: auto;
        background: var(--check);
        border-radius: 2px;
    }

    #checklist input[type="checkbox"]::before {
        width: 0px;
        right: 60%;
        transform-origin: right bottom;
    }

    #checklist input[type="checkbox"]::after {
        width: 0px;
        left: 40%;
        transform-origin: left bottom;
    }

    #checklist input[type="checkbox"]:checked::before {
        animation: check-01 0.4s ease forwards;
    }

    #checklist input[type="checkbox"]:checked::after {
        animation: check-02 0.4s ease forwards;
    }

    #checklist input[type="checkbox"]:checked+label {
        color: var(--disabled);
        animation: move 0.3s ease 0.1s forwards;
    }

    #checklist input[type="checkbox"]:checked+label::before {
        background: var(--disabled);
        animation: slice 0.4s ease forwards;
    }

    #checklist input[type="checkbox"]:checked+label::after {
        animation: firework 0.5s ease forwards 0.1s;
    }

    @keyframes move {
        50% {
            padding-left: 8px;
            padding-right: 0px;
        }

        100% {
            padding-right: 4px;
        }
    }

    @keyframes slice {
        60% {
            width: 100%;
            left: 4px;
        }

        100% {
            width: 100%;
            left: -2px;
            padding-left: 0;
        }
    }

    @keyframes check-01 {
        0% {
            width: 4px;
            top: auto;
            transform: rotate(0);
        }

        50% {
            width: 0px;
            top: auto;
            transform: rotate(0);
        }

        51% {
            width: 0px;
            top: 8px;
            transform: rotate(45deg);
        }

        100% {
            width: 5px;
            top: 8px;
            transform: rotate(45deg);
        }
    }

    @keyframes check-02 {
        0% {
            width: 4px;
            top: auto;
            transform: rotate(0);
        }

        50% {
            width: 0px;
            top: auto;
            transform: rotate(0);
        }

        51% {
            width: 0px;
            top: 8px;
            transform: rotate(-45deg);
        }

        100% {
            width: 10px;
            top: 8px;
            transform: rotate(-45deg);
        }
    }

    @keyframes firework {
        0% {
            opacity: 1;
            box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0;
        }

        30% {
            opacity: 1;
        }

        100% {
            opacity: 0;
            box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0, 14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0, -14px -8px 0 0px #4f29f0;
        }
    }
</style>