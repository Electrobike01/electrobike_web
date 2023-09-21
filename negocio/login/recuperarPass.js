boton = document.getElementById('cambiar')
contra1 = document.getElementById('contrasena1')
contra2 = document.getElementById('contrasena2')

cosultaInfoCorreo = async () => {
    // Obtener la URL completa
    urlCompleta = window.location.href;
    partes = urlCompleta.split('/restablecerPass.php?')
    const datos = new FormData();

    datos.append("corr", partes[1])

    var consulta = await fetch("../../controllers/login/consultaInfoCorreo.php", {
        method: 'POST',
        body: datos
    });

     //TREAER RESPUESTA DE LA BD
     var resultado = await consulta.json();

     console.log(resultado)

    if(resultado.correo == 'error'){
        Swal.fire({
            icon: 'error',
            title: 'Página defectuosa',
            text: 'No pudimos validar la información de su correo, intente nuevamente',
            showConfirmButton: false,
          }).then(() => {
            window.location.href = '../../views/login/index.html'
        });
    }else{
        document.getElementById('infoCorr').innerHTML = resultado.correo
    }
}


cosultaInfoCorreo()

cambiarContrasena = async (newPass, url) => {
    const datos = new FormData();
    datos.append("contra", newPass)
    datos.append("corr", url)

    var consulta = await fetch("../../controllers/login/cambiarPass.php", {
        method: 'POST',
        body: datos
    });

    //TREAER RESPUESTA DE LA BD
    var resultado = await consulta.json();
    
    if (resultado.success) {
        Swal.fire({
            icon: 'success',
            title: "Contraseña Actualizada",
            text: "Su contraseña ha sido modificada con éxito",
            showConfirmButton: false,
            timerProgressBar: true
        }).then(() => {
    
            window.location.href = '../../views/login/index.html'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: "Hemos detectado problemas en el proceso",
            text: "Por favor intente nuevamente validando su información",
            showConfirmButton: false,
            timerProgressBar: true
        }).then(() => {
            window.location.href = '../../views/login/index.html'
          
        });
    }
}

boton.addEventListener('click', (e) => {
    e.preventDefault()
    if (contra1.value == "" || contra2.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos vacíos',
            text: 'Por favor diligencie todos los campos',
            showConfirmButton: false,
        })
    } else if (contra1.value != contra2.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error de contraseña',
            text: 'Las contraseñas no coinciden',
            showConfirmButton: false,
        })
    } else if ((contra1.value).length <= 7 || (contra2.value).length <= 7) {
        Swal.fire({
            icon: 'error',
            title: 'Error de contraseña',
            text: 'La contraseña debe contener almenos 8 caracteres',
            showConfirmButton: false,
        })
    } else {
        // Obtener la URL completa
        urlCompleta = window.location.href;
        partes = urlCompleta.split('/restablecerPass.php?')
        cambiarContrasena(contra1.value, partes[1])
    }

})