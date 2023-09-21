// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------- DESENCRIPTAR CONTRASENA -----------------------------------
function encrypt(key, data) {
  const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
  // console.log('Texto encriptado:', encryptedData);
  return encryptedData
}

function decrypt(key, data) {
  const decryptedData = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  // console.log('Texto desencriptado:', decryptedData);
  return decryptedData
}
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

var ModuloActual = document.getElementById("ModuloActual");
var valorModulo_ = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;

var sesion = localStorage.getItem("permisos");
if (sesion != null) {
  sesion = decrypt('electrobike', sesion)
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------- OCULTAR MODULOS NO PERMITIDOS -----------------------------------


function convertirInicialesAMinusculas(lista) {

  // Crea una nueva lista para almacenar los resultados
  var nuevaLista = [];

  // Recorre cada palabra en la lista y convierte su inicial a minúscula
  for (var i = 0; i < lista.length; i++) {
    var palabra = lista[i];
    var inicialMinuscula = palabra.charAt(0).toLowerCase();
    var restoDePalabra = palabra.slice(1);
    var palabraCompleta = inicialMinuscula + restoDePalabra;

    // Agrega la palabra convertida a la nueva lista
    nuevaLista.push(palabraCompleta);
  }
  // Devuelve la nueva lista con las iniciales convertidas a minúsculas
  return nuevaLista;
}
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ------------------------- DENEGAR ACCESO A MODULOS QUE NO TIENE PERMISOS --------------------------

function ocultarModulosNoAutorizados() {
  // Obtenemos el valor de los permisos desde la variable local
  var sesion = localStorage.getItem("permisos");

  sesion = decrypt('electrobike', sesion)

  //Creamos la lista con los modulos
  var listaModulos = [
    "usuarios",
    "roles",
    "proveedores",
    "compras",
    "productos",
    "clientes",
    "ventas",
  ];


  var listaPermisos = sesion.split(" ,   ");
  var listaPermisos_ = convertirInicialesAMinusculas(listaPermisos);

  //Comprobamos a cuales modulos no tiene acceso referente a la lista principal
  for (let n = 0; n < listaPermisos_.length; n++) {
    var posicion = listaModulos.indexOf(listaPermisos_[n]);
    if (posicion !== -1) {
      listaModulos.splice(posicion, 1);
    }
  }


  //En los modulos que no tiene acceso agregamos un display none para ocultar
  // console.log(listaModulos)

  listaModulos.forEach((moduloBorrar) => {
    document.getElementById(moduloBorrar).style.display = "none";
    document.querySelector(`li[moduloM="${moduloBorrar}"]`).style.display = "none";
  });

  //En los modulos que si tiene acceso agregamos un display inline para mostrar
  listaPermisos_.forEach((moduloMostrar) => {
    document.getElementById(moduloMostrar).style.display = "block";
  });



  if (listaModulos.includes(valorModulo) && valorSubModuloActual != 'configuracion') {
    pantalla = document.getElementById("pantalla");
    pantalla.classList.add('compa')

    Swal.fire({
      icon: "error",
      title: "Acceso Denegado",
      text: "Usted no tiene permisos a este modulo",
      confirmButtonText: "Volver al inicio",
      confirmButtonColor: '#3085d6',
    }).then(() => {
      window.location.href = "../../views/dashboard/index.php ";
    });
  }

  //Mostrar nuevamente la pantalla de acceso
  pantalla = document.getElementsByClassName("pantalla")[0];
  pantalla.classList.add("pantalla_oculta");

}


// ----------------- SESIONES -----------------
const chekearSesion = () => {
  if (sesion == null) {
    Swal.fire({
      icon: "error",
      title: "Acceso Denegado",
      text: "Por favor inicie sesion",
      confirmButtonText: "Iniciar Sesion",
      confirmButtonColor: '#3085d6',
    }).then(() => {
      window.location.href = "../../views/login/index.html";
    });
  } else if (sesion != null) {

    // Validar nuevamente en el json si se ha modificado algo
    const validarNuevamente = async () => {
      var id_usuario = localStorage.getItem('id')

      id_usuario = decrypt('electrobike', id_usuario)

      //IR A LA BASE DE DATOS
      const datos = new FormData();
      datos.append("id_usuario", id_usuario)

      var mi_consulta = await fetch("../../controllers/login/validarCambios.php", {
        method: 'POST',
        body: datos
      });

      //TREAER RESPUESTA DE LA BD
      var mi_resultado = await mi_consulta.json();


      //Valida si se modifico el localstorage
      if (mi_resultado.estado == 'destruido') {
        Swal.fire({
          icon: "error",
          title: "Ataque inminente",
          text: "Hemos detectado problemas de seguridad. Por favor inicie sesion nuevamente",
          confirmButtonText: "Iniciar Sesion",
          confirmButtonColor: '#3085d6',
        }).then(() => {
          window.location.href = "../../views/login/index.html";
        });
        localStorage.clear();
      }
      //Valida si el usuario se desactivo o no
      else if (mi_resultado.estado == 'Inactivo') {
        Swal.fire({
          icon: "error",
          title: "Usuario inactivo",
          text: "Su usuario ha sido desactivado",
          confirmButtonText: "Iniciar Sesion",
          confirmButtonColor: '#3085d6',
        }).then(() => {
          window.location.href = "../../views/login/index.html";
        });
        localStorage.clear();

      } else {

        llave = 'electrobike'
        permisos_ = encrypt(llave, mi_resultado.permisos)
        nombre_ = encrypt(llave, mi_resultado.nombre)


        localStorage.setItem('permisos', permisos_)
        localStorage.setItem('nombre', nombre_)

        ocultarModulosNoAutorizados()

      }
    }

    validarNuevamente()

  }
};


const cerrarSesion = () => {
  localStorage.clear();
  window.location.href = "../../views/login/index.html";
};



alertaConexion = () => {
  setTimeout(() => {
    pantalla = document.getElementById('pantalla')
    if (pantalla.classList.length == 1 && sesion != null) {

      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No pudimos conectar con el servidor",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Login',
        confirmButtonText: 'Intentar nuevamente'
      }).then((result) => {
        if (result.isConfirmed) {
          // Recargar la página
          location.reload();


        } else {
          cerrarSesion()

        }
      })


    }
  }, 5000)

}

//Validar informacion
alertaConexion()


function formatearInput(input) {
  let valor = input.value.replace(/\./g, ""); // Remover puntos existentes
  valor = valor.replace(/\D/g, ""); // Remover caracteres no numéricos
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Insertar puntos cada tres dígitos

  input.value = valor;
}

function formatearNumero(numero) {
  let numeroFormateado = numero.toString(); // Convierte el número a formato de texto

  // Verifica si el número tiene más de 3 dígitos
  if (numeroFormateado.length > 3) {
    // Itera desde el final hacia el principio, insertando un punto cada 3 dígitos
    for (let i = numeroFormateado.length - 3; i > 0; i -= 3) {
      numeroFormateado = numeroFormateado.slice(0, i) + '.' + numeroFormateado.slice(i);
    }
  }

  return numeroFormateado;
}

var btnCerrarSesion = document.getElementById('btnCerrarSesion')
btnCerrarSesion.addEventListener('click', () => {
  Swal.fire({
    title: 'Cerrar sesion?',
    text: "Está seguro que desea salir?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Salir'
  }).then((result) => {
    if (result.isConfirmed) {
      cerrarSesion();
    } else {
      Swal.fire({
        title: 'Cancelado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  })
})

var btnCerrarSesion_ = document.getElementById('btnCerrarSesion_')
btnCerrarSesion_.addEventListener('click', () => {
  Swal.fire({
    title: 'Cerrar sesion?',
    text: "Está seguro que desea salir?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Salir'
  }).then((result) => {
    if (result.isConfirmed) {
      cerrarSesion();
    } else {
      Swal.fire({
        title: 'Cancelado',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  })
})
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

// --------------------------- Acordeon ---------------------------
const funcionAcordeon = (p1, p2, p3) => {
  const activador = document.getElementById(p1);
  const modulo = document.getElementById(p2);
  const icon_desplegable = document.getElementById(p3);

  activador.addEventListener("click", function () {
    modulo.classList.toggle("oculto");
    icon_desplegable.classList.toggle("activo");

    var listaModulo = [];
    for (let i = 1; i <= 7; i++) {
      listaModulo.push("modulo" + i);
    }
    listaModulo = listaModulo.filter((modul) => modul != p2);

    listaModulo.forEach((element) => {
      document.getElementById(element).classList.add("oculto");
    });

    var listaFlecha = [];
    for (let i = 1; i <= 7; i++) {
      listaFlecha.push("icon_despliegue" + i);
    }
    listaFlecha = listaFlecha.filter((modul) => modul != p3);

    listaFlecha.forEach((element) => {
      document.getElementById(element).classList.remove("activo");
    });
  });
};

for (let i = 1; i <= 7; i++) {
  valorActivador = "activador" + i.toString();
  valorModulo = "modulo" + i.toString();
  valorDesplegable = "icon_despliegue" + i.toString();
  funcionAcordeon(valorActivador, valorModulo, valorDesplegable);
}



// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ------------------------------ HEADER PANEL CONFIGURACIONES ---------------------------------------


user = document.getElementById('user')
user.addEventListener('click', () => {
  document.getElementById('panel').classList.toggle('panel_oculto')
})


// Remplazar nombre
var nombre = localStorage.getItem("nombre");
nombre = decrypt('electrobike', nombre)
var id = localStorage.getItem("id");

if (nombre != null) {
  nombre = nombre.split(' ')
  if (nombre.length == 1) {
    primerNombre = nombre[0]
    primerApellido = ''
  } else if (nombre.length == 2 || nombre.length == 3) {
    primerNombre = nombre[0]
    primerApellido = nombre[1]
  } else if (nombre.length == 4) {
    primerNombre = nombre[0]
    primerApellido = nombre[2]
  } else {
    primerNombre = nombre[0]
    primerApellido = nombre[2]
  }

  nombre = primerNombre + ' ' + primerApellido

  document.getElementById('user_name').innerHTML = nombre
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

//------------------SideBar------------------------------------------
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// ------------ CUANDO EL SIDEBAR ESTE CERRADO QUE CUAQUIER MODULO LO ABRA ------------------
var clasesDeSidebar = sidebar.className;

if (clasesDeSidebar == "sidebar close") {
  var models = document.querySelectorAll(".model");

  for (var i = 0; i < models.length; i++) {
    models[i].addEventListener("click", function () {
      sidebar.classList.remove("close");
    });
  }
}

nValorModulo = valorSubModuloActual


if (nValorModulo != "configuracion") {
  //------------------------- Color Pagina Actual --------------------------------
  //Atributos
  var ModuloActual = document.getElementById("ModuloActual");
  var valorModulo = ModuloActual.innerHTML;

  Rol = valorModulo;
  fondo = Rol;
  texto = fondo + "_text";
  icon = fondo + "_icon";
  // Fondo
  const Funcionfondo = document.getElementById(fondo);
  Funcionfondo.classList.add("actual");
  //Texto
  const Funciontexto = document.getElementById(texto);
  Funciontexto.classList.add("actual");
  //Icono
  const Funcionicono = document.getElementById(icon);
  Funcionicono.classList.add("actual");

  // SubFuncionActual color -------------------------
  var SubModuloActual = document.getElementById("SubModuloActual");
  var valorSubModuloActual = SubModuloActual.innerHTML;

  let subRol = valorSubModuloActual + "_" + Rol;
  let subfondo = subRol;
  let subtext = subRol + "_text";
  let subicon = subRol + "_icon";

  if (valorSubModuloActual.length != 0) {
    var FuncionSubFondo = document.getElementById(subRol);
    FuncionSubFondo.classList.add("actual");

    //Icono
    const FuncionSubIcono = document.getElementById(subicon);
    FuncionSubIcono.classList.add("actual");

    //Texto
    const FuncionSubTexto = document.getElementById(subtext);
    FuncionSubTexto.classList.add("actual");
  }
}
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------- INVALIDAR TEXTO EN CAMPOS NUMERICOS ------------------------------

function filtroNumero(input) {
  var textoF = input.value.replace(/\D/g, '');
  input.value = textoF
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

// ---------------------- Menu hamburguesa movil ------------------------------
// selector
var menu = document.querySelector(".nav_movil");

// method
function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
}
// event
menu.addEventListener("click", toggleMenu, false);

// ------------------------- Menu hamburguera -------------------------

const funcionAcordeon_ = (p1_, p2_) => {
  const activador_ = document.getElementById(p1_);
  const modulo_ = document.getElementById(p2_);

  activador_.addEventListener("click", () => {
    modulo_.classList.toggle("oculto_");

    var listaModulo = [];
    for (let i = 1; i <= 7; i++) {
      listaModulo.push("modulo" + "_" + i);
    }

    listaModulo = listaModulo.filter((modul) => modul != p2_);

    listaModulo.forEach((element) => {
      document.getElementById(element).classList.add("oculto_");
    });
  });
};

for (let i = 1; i <= 7; i++) {
  valorActivador_ = "activador_" + i.toString();
  valorModulo_ = "modulo_" + i.toString();
  funcionAcordeon_(valorActivador_, valorModulo_);
}



if (nValorModulo != 'configuracion') {
  //------------------------- Color Pagina Actual movil --------------------------------
  const FuncionModuloActualMobile = document.querySelector("." + valorModulo);
  FuncionModuloActualMobile.classList.add("actual_");


  //------------------------- SubFuncionActual movil --------------------------------
  const element = valorSubModuloActual + "_" + valorModulo + "_";

  const SubFuncionModulo = document.getElementById(element);

  if (valorModulo != "inicio") {

    SubFuncionModulo.classList.add("actual_");
  }
}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

// --- Titulo Header -------------------------------
const PrimeraMayus = (palabra) => {
  var primerMayus = palabra.charAt(0).toUpperCase();
  var todoMayus = primerMayus + palabra.slice(1);

  return todoMayus;
};

if (nValorModulo != 'configuracion') {
  var tituloHeader = PrimeraMayus(valorSubModuloActual) + " " + PrimeraMayus(Rol);
  var titulo = (document.getElementById("titulo").innerHTML = tituloHeader);
}



// ---------------- SOPORTE ------------
document.getElementsByClassName('soporte')[0].addEventListener('click', function() {
  // Ruta del archivo PDF
  var rutaPDF = '../manual.pdf';

  // Crear un enlace oculto
  var enlace = document.createElement('a');
  enlace.href = rutaPDF;
  enlace.download = 'manual.pdf'; // Nombre del archivo que se descargará
  enlace.style.display = 'none';

  // Agregar el enlace al documento y hacer clic en él
  document.body.appendChild(enlace);
  enlace.click();

  // Remover el enlace después de la descarga
  document.body.removeChild(enlace);
});




