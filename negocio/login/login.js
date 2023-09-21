// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------- ENCRIPTAR EL LOCAL STORAGE  -----------------------------------

function encrypt(key, data) {
  const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
  // console.log('Texto encriptado:', encryptedData);
  return encryptedData
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

var sesion = localStorage.getItem('permisos')

const chekearSesion = () => {
  if (sesion != null) {
    window.location.href = '../../views/dashboard/index.php'
  }
}

const validar = async () => {
  var correo = document.getElementById('correo').value
  var contrasena = document.getElementById('contrasena').value

  if (correo.trim() === '' ||
    contrasena.trim() === '') {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacíos',
      text: 'Por favor diligencie todos los campos',
      showConfirmButton: false,

    })
  } else {
    //IR A LA BASE DE DATOS
    const datos = new FormData();
    datos.append("correo", correo)
    datos.append("contrasena", contrasena)

    var consulta = await fetch("../../controllers/login/consultar.php", {
      method: 'POST',
      body: datos
    });

    //TREAER RESPUESTA DE LA BD
    var resultado = await consulta.json();

    if (resultado.success == true) {
      llave = 'electrobike'


      permisos_ = encrypt(llave, resultado.permisos)
      id_ = encrypt(llave, (resultado.id).toString())
      nombre_ = encrypt(llave, resultado.nombre)


      localStorage.setItem('id', id_)
      localStorage.setItem('permisos', permisos_)
      localStorage.setItem('nombre', nombre_)

  

      Swal.fire({
        icon: 'success',
        title: 'ÉXITO',

        text: resultado.mensaje,
      }).then(() => {
       window.location.href = '../../views/dashboard/index.php'
      });


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de credenciales',
        text: resultado.mensaje,
        showConfirmButton: false,
        timerProgressBar: true

      })
    }
  }


}

alertaDeCargaLog = async () => {

  Swal.fire({
    title: 'Cargando...',
    text: 'Estamos validando su información',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 1800,
    showConfirmButton: false,
    allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
    allowEscapeKey: false, // Evita que la alerta se cierre al presionar la tecla "Esc"
    onOpen: () => {
      swal.showLoading();
    },
    onClose: async () => {

      try {
        // Llamada a tu función asíncrona
        correo = document.getElementById('correoR').value
        await validar(); // 
        // La función asíncrona ha terminado, cierra la alerta

      } catch (error) {
        // Ocurrió un error en la función asíncrona
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'No hemos podido conectar con el servidor. Por favor intente nuevamente',
          type: 'error',
          showConfirmButton: false
        });
      }
    }
  });
};


if (document.getElementById('module').innerHTML == 'login') {

  document.getElementById('iniciar').addEventListener('submit', (event) => {
    event.preventDefault()
    alertaDeCargaLog()
  })


  // ------------------ RECUPERAR CONTRASENA --------------

  olvioC = document.getElementById('olvidoC')
  iniciar_ = document.getElementById('iniciar_')

  olvioC.addEventListener('click', () => {
    document.getElementById('formContent').style.display = 'none'
    document.getElementById('passContent').style.display = 'inline'

    document.getElementById('correoR').value = document.getElementById('correo').value
  })

  iniciar_.addEventListener('click', () => {
    document.getElementById('formContent').style.display = 'inline'
    document.getElementById('passContent').style.display = 'none'
  })



  correoExistente = async () => {
    correo = document.getElementById('correoR').value

    if (correo.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Correo vacío',
        text: 'Por favor diligencie todos los campos',
        showConfirmButton: false,
      })
    } else {
      //IR A LA BASE DE DATOS
      const datos = new FormData();
      datos.append("correo", correo)

      var consulta = await fetch("../../controllers/login/validarExistente.php", {
        method: 'POST',
        body: datos
      });

      //TREAER RESPUESTA DE LA BD
      var resultado = await consulta.json();

      if (resultado.success == false) {
        Swal.fire({
          icon: 'error',
          title: resultado.titulo,
          text: resultado.mensaje,
          showConfirmButton: false,
          timerProgressBar: true
        })

      } else {
        alertaDeCarga();
      }
    }


  }

  alertaDeCarga = async () => {

    Swal.fire({
      title: 'Cargando...',
      text: 'Estamos validando su información',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: async () => {
        swal.showLoading();

        try {
          // Llamada a tu función asíncrona
          correo = document.getElementById('correoR').value
          await enviarMensaje(correo); // 
          // La función asíncrona ha terminado, cierra la alerta
          swal.close();
          // Mostrar una alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Completado',
            text: 'Hemos enviado un link a tu correo electrónico para restablecer tu contraseña',
          }).then(() => {
            location.reload();
          });
        } catch (error) {
          // Ocurrió un error en la función asíncrona
          Swal.fire({
            title: 'Error',
            text: 'Por favor intenta de nuevo',
            type: 'error',
            timer: 2000,
            showConfirmButton: false
          });
        }
      }
    });
  };

  enviarMensaje = async (correo) => {

    const datos = new FormData();
    datos.append("correo", correo)

    var consulta = await fetch("../../controllers/login/enviarMensaje.php", {
      method: 'POST',
      body: datos
    });

    //TREAER RESPUESTA DE LA BD
    var resultado = await consulta.json();

    console.log(resultado)

  }

  recuperar = document.getElementById('btn_recuperar')
  recuperar.addEventListener('click', (event) => {
    event.preventDefault()
    correoExistente()
  })
}