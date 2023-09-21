<!-- Coding by CodingLab | www.codinglabweb.com -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!----------------------- DEPENDENCIAS --------------------------- -->
    <!----============= CSS ================ -->
    <link rel="stylesheet" href="../_errores/style.css">
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

            <h1 class="titulo">Pagina no encontrada</h1>

            <!-------- Llamar al nav_movil ----->

            <?php include('../../nav/nav_movil.html'); ?>
        </div>

        <section class="error-container">
            <span class="four"><span class="screen-reader-text">4</span></span>
            <span class="zero"><span class="screen-reader-text">0</span></span>
            <span class="four"><span class="screen-reader-text">4</span></span>
        </section>








    </section>

    <script src="../_errores/404.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>



    </div>
</body>

</html>




<script>


</script>


<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700');
@import url('https://fonts.googleapis.com/css?family=Catamaran:400,800');

.error-container {
    text-align: center;
    font-size: 106px;
    font-family: 'Catamaran', sans-serif;
    font-weight: 800;
    margin: 70px 15px;
}

.error-container>span {
    display: inline-block;
    position: relative;
}

.error-container>span.four {
    width: 136px;
    height: 43px;
    border-radius: 999px;
    background:
        linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%),
        linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%),
        linear-gradient(to right, #9ccbd8, #7b9fe2);
}

.error-container>span.four:before,
.error-container>span.four:after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 999px;
}

.error-container>span.four:before {
    width: 43px;
    height: 156px;
    left: 60px;
    bottom: -43px;
    background:
        linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%),
        linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%),
        linear-gradient(to top, #4161a0, #7c85ee, #527ec4, #446baa, #6336a6);
}

.error-container>span.four:after {
    width: 137px;
    height: 43px;
    transform: rotate(-49.5deg);
    left: -18px;
    bottom: 36px;
    background: linear-gradient(to right, #183aaa, #2046ae, #3257a6, #2a8cba, #74d6f6);
}

.error-container>span.zero {
    vertical-align: text-top;
    width: 156px;
    height: 156px;
    border-radius: 999px;
    background: linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%, transparent 51%, transparent 100%),
        linear-gradient(to top right, #465a96, #5b5c99, #9895b8, #9a9acc, #96b9d7, #86a1ed, #8690ed);
    overflow: hidden;
    animation: bgshadow 5s infinite;
}

.error-container>span.zero:before {
    content: '';
    display: block;
    position: absolute;
    transform: rotate(45deg);
    width: 90px;
    height: 90px;
    background-color: transparent;
    left: 0px;
    bottom: 0px;
    background:
        linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%),
        linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%);
}

.error-container>span.zero:after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 999px;
    width: 70px;
    height: 70px;
    left: 43px;
    bottom: 43px;
    background: white;
    box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.screen-reader-text {
    position: absolute;
    top: -9999em;
    left: -9999em;
}

@keyframes bgshadow {
    0% {
        box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
    }

    45% {
        box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }

    55% {
        box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }

    100% {
        box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
    }
}

/* demo stuff */
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

html,
button,
input,
select,
textarea {
    font-family: 'Montserrat', Helvetica, sans-serif;
    color: #bbb;
}

.mensj{
    text-align: center;
    margin: 30px 15px;
}

.zoom-area {
    max-width: 490px;
    margin: 30px auto 30px;
    font-size: 19px;
    text-align: center;
}

.link-container {
    text-align: center;
}

a.more-link {
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 13px;
    background-color: #118dd5;
    padding: 10px 15px;
    border-radius: 0;
    color: #fff;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 1.5;
    text-decoration: none;
    margin-top: 50px;
    letter-spacing: 1px;
}


</style>