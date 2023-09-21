console.log("TODO BIEN")

// --------------------------- Acordeon ---------------------------
const funcionAcordeon = (p1, p2, p3) => {

    const activador = document.getElementById(p1)
    const modulo = document.getElementById(p2)
    const icon_desplegable = document.getElementById(p3)

    activador.addEventListener('click', function () {
        modulo.classList.toggle('oculto')
        icon_desplegable.classList.toggle('activo')


        var listaModulo = []
        for (let i = 1; i <= 7; i++) {
            listaModulo.push("modulo" + i)
        }
        listaModulo = listaModulo.filter(modul => modul != p2);

        listaModulo.forEach(element => {
            document.getElementById(element).classList.add('oculto')
        });

        var listaFlecha = []
        for (let i = 1; i <= 7; i++) {
            listaFlecha.push("icon_despliegue" + i)
        }
        listaFlecha = listaFlecha.filter(modul => modul != p3);

        listaFlecha.forEach(element => {
            document.getElementById(element).classList.remove('activo')
        })


    })
}

for (let i = 1; i <= 7; i++) {
    valorActivador = 'activador' + i.toString()
    valorModulo = 'modulo' + i.toString()
    valorDesplegable = 'icon_despliegue' + i.toString()
    funcionAcordeon(valorActivador, valorModulo, valorDesplegable)
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------


//------------------SideBar------------------------------------------
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");

})

// ------------ CUANDO EL SIDEBAR ESTE CERRADO QUE CUAQUIER MODULO LO ABRA ------------------
var clasesDeSidebar = sidebar.className;

if (clasesDeSidebar == "sidebar close") {

    var models = document.querySelectorAll('.model');

    for (var i = 0; i < models.length; i++) {
        models[i].addEventListener('click', function () {
            console.log("CLICKK")

            sidebar.classList.remove("close");
        });
    }
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------


// ---------------------- Menu hamburguesa movil ------------------------------
// selector
var menu = document.querySelector('.nav_movil');

// method
function toggleMenu(event) {
    this.classList.toggle('is-active');
    document.querySelector(".menuppal").classList.toggle("is_active");
    event.preventDefault();
}
// event
menu.addEventListener('click', toggleMenu, false);


// ------------------------- Menu hamburguera -------------------------

const funcionAcordeon_ = (p1_, p2_) => {

    const activador_ = document.getElementById(p1_)
    const modulo_ = document.getElementById(p2_)



    activador_.addEventListener('click', () => {
        modulo_.classList.toggle('oculto_')

        var listaModulo = []
        for (let i = 1; i <= 7; i++) {
            listaModulo.push("modulo" + "_" + i)
        }

        listaModulo = listaModulo.filter(modul => modul != p2_);


        listaModulo.forEach(element => {
            document.getElementById(element).classList.add('oculto_')
        });
    })
}


for (let i = 1; i <= 7; i++) {
    valorActivador_ = "activador_" + i.toString()
    valorModulo_ = "modulo_" + i.toString()
    funcionAcordeon_(valorActivador_, valorModulo_)
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
