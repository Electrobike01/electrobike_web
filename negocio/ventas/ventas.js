var ModuloActual = document.getElementById("ModuloActual");
var valorModulo = ModuloActual.innerHTML;

var SubModuloActual = document.getElementById("SubModuloActual");
var valorSubModuloActual = SubModuloActual.innerHTML;

// ----------------------- DIVIDIR MODULOS EN REGISTRAR Y LISTAR -------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// --------------------------------------- REGISTRAR -------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

if (valorSubModuloActual == "registrar") {
  // input tipo buscador
  $(function () {
    $("#cliente").select2();
  });

  botonFinalizarVenta = document.getElementById("finalizarVenta");
  botonR = document.getElementById("botonR");
  botonB = document.getElementById("botonB");
  registrosBorrados = 1;
  sinGuardar = 0;
  contador = 0;
  venta = [];
  suma = 0;

  promedioVentaTemp = 0;

  data = [];

  const ConsData = async () => {
    prod = document.getElementById("producto").value;

    // Solo se envian los necesarios ----------
    const datosDt = new FormData();
    datosDt.append("idProd", prod);

    var consultaData = await fetch("../../controllers/ventas/data.php", {
      method: "POST",
      body: datosDt,
    });

    //Traer mensaje de respuesta desde PHP -----
    var resultadoInfo_ = await consultaData.json();

    data = resultadoInfo_.data;
  };

  ConsData();

  const actualizarCanti = (busqueda_) => {
    console.log(busqueda_.value);

    for (var i = 0; i < data.length; i++) {
      if (data[i].idProducto == busqueda_.value) {
        document.getElementById("cantidadStock").value =
          data[i].cantidadProducto;
        break; // Salir del bucle una vez que se encuentre el producto
      }
    }
  };

  const ConsultarInfo = async () => {
    prod = document.getElementById("producto").value;

    // Solo se envian los necesarios ----------
    const datosCI = new FormData();
    datosCI.append("idProd", prod);

    var consultaInformacionProducto = await fetch(
      "../../controllers/ventas/consInfoProdu.php", {
        method: "POST",
        body: datosCI,
      }
    );

    //Traer mensaje de respuesta desde PHP -----
    var resultadoInfo = await consultaInformacionProducto.json();

    if (resultadoInfo.success) {
      document.getElementById("promedioVenta").value = formatearNumero(
        Math.round(resultadoInfo.promedioProd)
      );
    } else {
      document.getElementById("promedioVenta").value = formatearNumero(
        Math.round(resultadoInfo.promedioProd)
      );
    }
  };

  //Consulta y Remplzar los valores de producto dependiendo la consulta
  categoria_ = document.getElementById("categoriaProducto");

  categoria_.addEventListener("change", () => {
    consultaCategoria = categoria_.value;
    const ConsultarProductos = async (consultaCategoria_) => {
      // Solo se envian los necesarios ----------
      const datosCp = new FormData();
      datosCp.append("categoria", consultaCategoria_);

      var consultaCategoriaProducto = await fetch(
        "../../controllers/ventas/consProductos.php", {
          method: "POST",
          body: datosCp,
        }
      );

      //Traer mensaje de respuesta desde PHP -----
      var resultado = await consultaCategoriaProducto.json();
      contenido = document.getElementById("producto");

      //---- Si alguno esta repetido ERROR
      if (resultado.success == false) {
        contenido.disabled = true;
        option = document.createElement("option");
        contenido.innerHTML = "";
        option.value = "No se encontro ningún producto";
        option.text = "No se encontro ningún producto";
        contenido.appendChild(option);
      } else {
        contenido.disabled = false;

        contenido.innerHTML = "";

        for (let n = 0; n < resultado.productos.length; n++) {
          option = document.createElement("option");
          option.value = resultado.ids[n];
          option.text = resultado.productos[n];
          contenido.appendChild(option);
        }
      }
      actualizarCanti(document.getElementById("producto"));

      ConsultarInfo();
    };

    if (consultaCategoria != "Seleccione una categoria") {
      ConsultarProductos(consultaCategoria);
    } else {
      contenido = document.getElementById("producto");
      contenido.innerHTML = "";
      option = document.createElement("option");
      option.value = "Primero seleccione una categoría";
      option.text = "Primero seleccione una categoría";
      contenido.appendChild(option);
      contenido.disabled = true;
    }
  });

  productoConsulta = document.getElementById("producto");
  productoConsulta.addEventListener("change", () => {
    ConsultarInfo();
    actualizarCanti(document.getElementById("producto"));
  });

  // AGREGA LA COMPRA AL CARRITO DE COMPRAS
  botonR.addEventListener("click", () => {
    cliente_ = document.getElementById("cliente");
    cliente = document.getElementById("cliente").value.trim();
    categoria = document.getElementById("categoriaProducto").value;
    producto = document.getElementById("producto").value.trim();
    producto_ = document.getElementById("producto");
    valor_uni_ = document.getElementById("preciosUProducto").value.trim();
    valor_uni = valor_uni_.replace(/\./g, "");
    valorT_venta = document.getElementById("campoValorT").value.trim();
    cantidad = document.getElementById("cantidadProducto").value.trim();

    promedio_ = document
      .getElementById("promedioVenta")
      .value.replace(/\./g, "");
    ganancia = (valor_uni * 100) / promedio_ - 100;
    ganancia = parseFloat(ganancia.toFixed(2));

    cant_stock = parseInt(document.getElementById("cantidadStock").value);
    cant_prod = parseInt(document.getElementById("cantidadProducto").value);

    if (
      cliente == "Seleccione un cliente" ||
      categoria == "Seleccione una categoría" ||
      producto == "Seleccione un producto" ||
      producto == "No se encontro ningún producto" ||
      valor_uni == "" ||
      cantidad == ""
    ) {
      Swal.fire({
        title: "Campos vacíos",
        text: "Por favor llene todos los campos",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (cant_prod > cant_stock) {
      if (
        parseInt(document.getElementById("cantidadProducto").value) <
        parseInt(document.getElementById("cantidadStock").value)
      ) {
        console.log("El mayor es: " + cant_prod);
      } else {
        console.log("El mayor es: " + cant_stock);
      }

      Swal.fire({
        title: "Error de cantidad",
        text: "No tiene tantos productos en stock",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (cliente == "No se encontro ningún cliente activo") {
      Swal.fire({
        title: "Alerta de cliente",
        text: "Por favor registre o active un cliente",
        icon: "warning",
        html: '<a href="../../views/clientes/registrar.php">Presione aqui para registrar un cliente</a> ',
        confirmButtonColor: "#118dd5",
      });
    } else if (sinGuardar > 0) {
      Swal.fire({
        title: "Alerta de registro",
        text: "Por favor termine de editar su producto",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      const agregarAlCarrito = () => {
        var contenido = document.getElementById("contenido");
        var p = document.createElement("tr");
        p.classList.add("registro");

        // Agregar el nombre en vez del value
        clienteName = cliente_.options[cliente_.selectedIndex].innerText;
        productoName = producto_.options[producto_.selectedIndex].innerText;

        contador += 1;
        multi = valor_uni * cantidad;
        multi = formatearNumero(multi);

        console.log("Final " + multi);
        ganancia__ = formatearNumero(Math.ceil(ganancia));
        console.log(ganancia__);

        if (ganancia__ == "-.100") {
          ganancia__ = "-100";
        }

        p.innerHTML = `
                    <tr >
                        <td data-label="Cliente" class='proveedor' data-valor="${cliente}" id="cliente_${contador}">${clienteName}</td>
                        <td data-label="Categoria" class='categoria' id="categoria_${contador}">${categoria}</td>
                        <td data-label="Producto" class='producto' data-valor="${producto}" id="producto_${contador}">${productoName}</td>
                        <td data-label="Valor Total" class='valorU'"><input id="valorU_${contador}" class="edit" type="text" value="${valor_uni_}" oninput="formatearInput(this)" disabled></td>
                        <td data-label="Cantidad" ><input id="cantidad_${contador}" class="edit" type="text" value="${cantidad}" oninput="filtroNumero(this)"disabled></td>
                        <td data-label="Ganancia" class=''  id="porcentajeG_${contador}">${ganancia__} </td>
                        <td data-label="Total" class="precioT"  id="valorTotal_${contador}">${multi}</td>
                        <td data-label="Acciones" class="btns-cont">
                            <button class="botonesBorrar btn btn-danger" style="margin-right: 8px; type="button">Borrar</button>
                            <button class="botonesEditar btn btn-primary btn-editar_${contador}" type="button">Editar</button>
                            <button class="botonesGuardar btn btn-primary btn-guardar_${contador}" style="display:none;" type="button">Guardar</button>
                        </td>
                    </tr>
                    `;
        cliente_.disabled = true;
        p.setAttribute("id", `registro_${contador}`);
        p.classList.add("registro");
        contenido.appendChild(p);

        botonB.style.display = "inline";

        //Creamos los botones que eliminan los registros
        botonesEliminar = document.getElementsByClassName("botonesBorrar");
        botonEl = botonesEliminar[botonesEliminar.length - 1];
        botonEl.id = contador - 1;

        //Creamos los botones que editan los registros
        botonesEditar = document.getElementsByClassName("botonesEditar");
        botonEd = botonesEditar[botonesEditar.length - 1];
        botonEd.id = contador - 1;

        //Creamos los botones que editan los registros
        botonesGuardar = document.getElementsByClassName("botonesGuardar");
        botonGr = botonesGuardar[botonesGuardar.length - 1];
        botonGr.id = contador - 1;

        //Creamos variable que almacena los registros
        registros = document.getElementsByClassName("registro");

        // Restamos la cantidad al data general para las cantidades

        for (var i = 0; i < data.length; i++) {
          if (data[i].idProducto == producto) {
            data[i].cantidadProducto -= cantidad;

            console.log(
              "R: La cantidad de " +
              producto +
              " ha sido actualizada a: " +
              data[i].cantidadProducto
            );
            break; // Salir del bucle una vez que se encuentre el producto
          }
        }

        //Agregamos a cada elemento su evento de eliminar
        botonEl.addEventListener("click", function () {
          //Inicializamos la variable iteradora
          idBotonPresionado = this.id;

          idProduct_ = document.getElementById(
            `producto_${parseInt(idBotonPresionado) + 1}`
          );
          idProduct_p = idProduct_.dataset.valor;

          cantidad__ = document.getElementById(
            `cantidad_${parseInt(idBotonPresionado) + 1}`
          );
          cantidad_p = cantidad__.value;

          for (var i = 0; i < data.length; i++) {
            if (data[i].idProducto == idProduct_p) {
              data[i].cantidadProducto += parseInt(cantidad_p);

              break; // Salir del bucle una vez que se encuentre el producto
            }
          }

          // ------ Agregmos nuevamente los productos al stock ----

          registrosBorrados += 1;

          //----------- Eliminamos en el json la compra agregada -----------
          //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
          clienIterado = document.getElementById(
            `cliente_${parseInt(idBotonPresionado) + 1}`
          );
          clienteBorrado = clienIterado.dataset.valor;

          prodIterado = document.getElementById(
            `producto_${parseInt(idBotonPresionado) + 1}`
          );
          poroductoBorrado = prodIterado.dataset.valor;

          cantdIterado = document.getElementById(
            `cantidad_${parseInt(idBotonPresionado) + 1}`
          );
          cantidadBorrado = cantdIterado.value;

          categoIterado = document.getElementById(
            `categoria_${parseInt(idBotonPresionado) + 1}`
          );
          categoriaBorrado = categoIterado.innerHTML;

          valorUIterado = document.getElementById(
            `valorU_${parseInt(idBotonPresionado) + 1}`
          );
          valorUnitarioBorrado = valorUIterado.value;

          //Obtenemos el valor incial de la cantidad de compras
          cantInicial = venta.length;
          //Eliminamos del array json el registro actual
          const newData = venta.filter(
            (item) =>
            !(
              item.Cantidad === cantidadBorrado &&
              item.Categoria === categoriaBorrado &&
              item.Producto === poroductoBorrado &&
              item.Cliente === clienteBorrado &&
              item.ValorUn === valorUnitarioBorrado
            )
          );
          venta = newData;

          cantFinal = venta.length;

          resta = cantInicial - cantFinal;

          if (resta > 1) {
            // resta // cantidad de registros que re borraon
            for (let r = 0; r < resta - 1; r++) {
              //Vamos agregando al array principal
              registro = {
                Cliente: clienteBorrado,
                Categoria: categoriaBorrado,
                Producto: poroductoBorrado,
                ValorUn: valorUnitarioBorrado,
                Cantidad: cantidadBorrado,
              };
              venta.push(registro);
            }
          }

          //Borramos el boton seleccionado
          registros[idBotonPresionado].innerHTML = "";

          //Formateamos los campos
          document.getElementById("cantidadProducto").value = "";
          document.getElementById("preciosUProducto").value = "";
          document.getElementById("categoriaProducto").value =
            "Seleccione una categoria";
          contenido = document.getElementById("producto");
          contenido.innerHTML = "";
          option = document.createElement("option");
          option.value = "Primero seleccione una categoría";
          option.text = "Primero seleccione una categoría";
          contenido.appendChild(option);
          contenido.disabled = true;
          document.getElementById("cantidadStock").value = 0;
          document.getElementById("promedioVenta").value = 0;

          //Volvemos a calcular la compra total
          for (
            let s = 0; s < document.getElementsByClassName("precioT").length; s++
          ) {
            suma += parseFloat(
              document
              .getElementsByClassName("precioT")[s].innerHTML.replace(/\./g, "")
            );
          }
          camporValorT = document.getElementById("campoValorT");
          valorT2 = document.getElementById("total2");

          suma = formatearNumero(suma);

          camporValorT.value = suma;
          valorT2.innerHTML = suma + "$";
          suma = 0;

          if (venta.length == 0) {
            cliente_.disabled = false;
          } else {
            cliente_.disabled = true;
          }
        });

        //Agregamos a cada elemento su evento de editar
        botonEd.addEventListener("click", function () {
          //Inicializamos la varibale iteradora
          campoRegistro = parseInt(this.id) + 1;

          idProduct_ = document.getElementById(
            `producto_${parseInt(campoRegistro)}`
          );
          idProduct_p = idProduct_.dataset.valor;

          cantidad__ = document.getElementById(
            `cantidad_${parseInt(campoRegistro)}`
          );
          cantidad_p = cantidad__.value;

          for (var i = 0; i < data.length; i++) {
            if (data[i].idProducto == idProduct_p) {
              data[i].cantidadProducto += parseInt(cantidad_p);

              break; // Salir del bucle una vez que se encuentre el producto
            }
          }

          console.log(campoRegistro);

          //Cerramos los otros inputs
          inputsDisable = document.getElementsByClassName("edit");
          for (let r = 0; r < inputsDisable.length; r++) {
            inputsDisable[r].disabled = true;
          }

          botonesEditar = document.getElementsByClassName("botonesEditar");
          // Cerramos los otros botones guardar
          for (let g = 0; g < botonesEditar.length; g++) {
            botonesEditar[g].style.display = "none";
          }

          botonesEliminar = document.getElementsByClassName("botonesBorrar");
          // Cerramos los otros botones eliminar
          for (let g = 0; g < botonesEliminar.length; g++) {
            botonesEliminar[g].style.display = "none";
          }

          //Remplazamos el boton editar por el guardar
          document.getElementsByClassName(
            "btn-guardar_" + campoRegistro
          )[0].style.display = "inline";

          //----------- Eliminamos en el json la compra agregada para guardar la nueva -----------

          //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
          clienIterado = document.getElementById(`cliente_${campoRegistro}`);
          clienteBorrado = clienIterado.dataset.valor;

          prodIterado = document.getElementById(`producto_${campoRegistro}`);
          poroductoBorrado = prodIterado.dataset.valor;

          cantdIterado = document.getElementById(`cantidad_${campoRegistro}`);
          cantidadBorrado = cantdIterado.value;

          categoIterado = document.getElementById(`categoria_${campoRegistro}`);
          categoriaBorrado = categoIterado.innerHTML;

          valorUIterado = document.getElementById(`valorU_${campoRegistro}`);
          valorUnitarioBorrado = valorUIterado.value;

          //Obtenemos el valor incial de la cantidad de compras
          cantInicial = venta.length;

          //Eliminamos del array json el registro actual
          const newData = venta.filter(
            (item) =>
            !(
              item.Cantidad === cantidadBorrado &&
              item.Categoria === categoriaBorrado &&
              item.Producto === poroductoBorrado &&
              item.Cliente === clienteBorrado &&
              item.ValorUn === valorUnitarioBorrado
            )
          );
          venta = newData;

          cantFinal = venta.length;

          resta = cantInicial - cantFinal;

          if (resta > 1) {
            // resta // cantidad de registros que re borraon
            for (let r = 0; r < resta - 1; r++) {
              //Vamos agregando al array principal
              registro = {
                Cliente: clienteBorrado,
                Categoria: categoriaBorrado,
                Producto: poroductoBorrado,
                ValorUn: valorUnitarioBorrado,
                Cantidad: cantidadBorrado,
              };
              venta.push(registro);
            }
          }

          //Activamos los inputs  editables
          cantdIterado.disabled = false;
          valorUIterado.disabled = false;

          //Contamos la variable sin guardar
          sinGuardar += 1;

          porcent = document.getElementById(`porcentajeG_${campoRegistro}`);
          porcentV = porcent.innerHTML;
          porcentV = porcentV.replace(/\./g, "");

          promedioVentaTemp =
            (100 * parseFloat(valorUnitarioBorrado.replace(/\./g, ""))) /
            (parseFloat(porcentV) + 100);
        });

        botonGr.addEventListener("click", function () {
          //Inicializamos la varibale iteradora
          iter = parseInt(this.id) + 1;

          //Input cantidad

          //Agregamos los nuevos valores al json
          //Obtenemos las variables del elementoque eliminamos para elimar del json tambien
          clienIterado = document.getElementById(`cliente_${iter}`);
          clienteEditado = clienIterado.dataset.valor;

          prodIterado = document.getElementById(`producto_${iter}`);
          productoEditado = prodIterado.dataset.valor;

          cantdIterado = document.getElementById(`cantidad_${iter}`);
          cantidadEditado = cantdIterado.value;

          categoIterado = document.getElementById(`categoria_${iter}`);
          categoriaEditado = categoIterado.innerHTML;

          valorUIterado = document.getElementById(`valorU_${iter}`);
          valorUnitarioEditado = valorUIterado.value;

          porcenti = document.getElementById(`porcentajeG_${iter}`);

          valorUnitarioEditado_ = valorUnitarioEditado.replace(/\./g, "");

          //GANANCIA ----
          resul = (valorUnitarioEditado_ * 100) / promedioVentaTemp - 100;
          resul = Math.ceil(resul);

          if (resul < 0) {
            Swal.fire({
              title: "Alerta de ganancia",
              text: `Estás perdiendo un total de ${resul}% con esta venta.\n ¿Desea continuar?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              cancelButtonText: "Cancelar",
              confirmButtonText: "Continuar",
            }).then((result) => {
              if (result.isConfirmed) {
                //Agregamos nuevamente a los producto general data
                idProduct_ = document.getElementById(
                  `producto_${parseInt(campoRegistro)}`
                );
                idProduct_p = idProduct_.dataset.valor;

                cantidad__ = document.getElementById(
                  `cantidad_${parseInt(campoRegistro)}`
                );
                cantidad_p = cantidad__.value;

                for (var i = 0; i < data.length; i++) {
                  if (data[i].idProducto == idProduct_p) {
                    cantidadActual = data[i].cantidadProducto;
                    break; // Salir del bucle una vez que se encuentre el producto
                  }
                }

                if (cantidad_p > cantidadActual) {
                  console.log(cantidadActual);
                  console.log(cantidad_p);
                  Swal.fire({
                    title: "Error de cantidad",
                    text: "No tiene tantos productos en stock",
                    icon: "warning",
                    confirmButtonColor: "#118dd5",
                  });
                } else {
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].idProducto == idProduct_p) {
                      data[i].cantidadProducto -= cantidad_p;
                      console.log(
                        "G: La cantidad de " +
                        idProduct_p +
                        " ha sido actualizada a: " +
                        data[i].cantidadProducto
                      );
                      break; // Salir del bucle una vez que se encuentre el producto
                    }
                  }
                  botonesGuardar =
                    document.getElementsByClassName("botonesGuardar");
                  document.getElementsByClassName(
                    "btn-guardar_" + iter
                  )[0].style.display = "none";

                  //Mostramos todos los botones editar
                  for (let g = 0; g < botonesEditar.length; g++) {
                    botonesEditar[g].style.display = "inline";
                  }

                  //Mostramos todos los botones eliminar
                  botonesEliminar =
                    document.getElementsByClassName("botonesBorrar");
                  for (let g = 0; g < botonesEliminar.length; g++) {
                    botonesEliminar[g].style.display = "inline";
                  }

                  //Activamos los inputs  editables
                  inputCantidad = document.getElementById("cantidad_" + iter);
                  inputCantidad.disabled = true;

                  inputCantidad = document.getElementById("valorU_" + iter);
                  inputCantidad.disabled = true;

                  resul_ = formatearNumero(resul);

                  console.log("p1" + resul_);
                  if (resul_ == "-.100") {
                    resul_ = "-100";
                  }

                  porcenti.innerHTML = resul_;

                  console.log(promedioVentaTemp);

                  //Agregamos los nuevos datos al json
                  registro = {
                    Cliente: clienteEditado,
                    Categoria: categoriaEditado,
                    Producto: productoEditado,
                    ValorUn: valorUnitarioEditado,
                    Cantidad: cantidadEditado,
                  };
                  venta.push(registro);

                  //Recargamos el campo Total
                  total = document.getElementById(`valorTotal_${iter}`);
                  total.innerHTML = formatearNumero(
                    cantidadEditado * valorUnitarioEditado.replace(/\./g, "")
                  );

                  //Volvemos a calcular la venta total
                  for (
                    let s = 0; s < document.getElementsByClassName("precioT").length; s++
                  ) {
                    suma += parseFloat(
                      document
                      .getElementsByClassName("precioT")[s].innerHTML.replace(/\./g, "")
                    );
                  }
                  camporValorT = document.getElementById("campoValorT");
                  valorT2 = document.getElementById("total2");

                  suma = formatearNumero(suma);

                  camporValorT.value = suma;
                  valorT2.innerHTML = suma + "$";
                  suma = 0;

                  //Desontamos la variable sin guardar
                  sinGuardar -= 1;
                }
              } else {
                Swal.fire({
                  title: "Cancelado",
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ok",
                });
              }
            });
          } else {
            //Agregamos nuevamente a los producto general data
            idProduct_ = document.getElementById(
              `producto_${parseInt(campoRegistro)}`
            );
            idProduct_p = idProduct_.dataset.valor;

            cantidad__ = document.getElementById(
              `cantidad_${parseInt(campoRegistro)}`
            );
            cantidad_p = cantidad__.value;

            for (var i = 0; i < data.length; i++) {
              if (data[i].idProducto == idProduct_p) {
                cantidadActual = data[i].cantidadProducto;
                break; // Salir del bucle una vez que se encuentre el producto
              }
            }

            if (cantidad_p > cantidadActual) {
              Swal.fire({
                title: "Error de cantidad",
                text: "No tiene tantos productos en stock",
                icon: "warning",
                confirmButtonColor: "#118dd5",
              });
            } else {
              for (var i = 0; i < data.length; i++) {
                if (data[i].idProducto == idProduct_p) {
                  data[i].cantidadProducto -= cantidad_p;
                  console.log(
                    "G2: La cantidad de " +
                    idProduct_p +
                    " ha sido actualizada a: " +
                    data[i].cantidadProducto
                  );
                  break; // Salir del bucle una vez que se encuentre el producto
                }
              }
              botonesGuardar =
                document.getElementsByClassName("botonesGuardar");
              document.getElementsByClassName(
                "btn-guardar_" + iter
              )[0].style.display = "none";

              //Mostramos todos los botones editar
              for (let g = 0; g < botonesEditar.length; g++) {
                botonesEditar[g].style.display = "inline";
              }

              //Mostramos todos los botones eliminar
              botonesEliminar =
                document.getElementsByClassName("botonesBorrar");
              for (let g = 0; g < botonesEliminar.length; g++) {
                botonesEliminar[g].style.display = "inline";
              }

              //Activamos los inputs  editables
              inputCantidad = document.getElementById("cantidad_" + iter);
              inputCantidad.disabled = true;

              inputCantidad = document.getElementById("valorU_" + iter);
              inputCantidad.disabled = true;

              resul_ = formatearNumero(resul);
              console.log("p2" + resul);
              porcenti.innerHTML = resul_;

              //Agregamos los nuevos datos al json
              registro = {
                Cliente: clienteEditado,
                Categoria: categoriaEditado,
                Producto: productoEditado,
                ValorUn: valorUnitarioEditado,
                Cantidad: cantidadEditado,
              };
              venta.push(registro);

              //Recargamos el campo Total
              total = document.getElementById(`valorTotal_${iter}`);
              total.innerHTML = formatearNumero(
                cantidadEditado * valorUnitarioEditado.replace(/\./g, "")
              );

              //Volvemos a calcular la venta total
              for (
                let s = 0; s < document.getElementsByClassName("precioT").length; s++
              ) {
                suma += parseFloat(
                  document
                  .getElementsByClassName("precioT")[s].innerHTML.replace(/\./g, "")
                );
              }
              camporValorT = document.getElementById("campoValorT");
              valorT2 = document.getElementById("total2");

              suma = formatearNumero(suma);

              camporValorT.value = suma;
              valorT2.innerHTML = suma + "$";
              suma = 0;

              //Desontamos la variable sin guardar
              sinGuardar -= 1;
            }
          }

          //Formateamos los campos
          document.getElementById("cantidadProducto").value = "";
          document.getElementById("preciosUProducto").value = "";
          document.getElementById("categoriaProducto").value =
            "Seleccione una categoria";
          contenido = document.getElementById("producto");
          contenido.innerHTML = "";
          option = document.createElement("option");
          option.value = "Primero seleccione una categoría";
          option.text = "Primero seleccione una categoría";
          contenido.appendChild(option);
          contenido.disabled = true;
          document.getElementById("cantidadStock").value = 0;
          document.getElementById("promedioVenta").value = 0;
        });

        for (
          let s = 0; s < document.getElementsByClassName("precioT").length; s++
        ) {
          suma += parseFloat(
            document
            .getElementsByClassName("precioT")[s].innerHTML.replace(/\./g, "")
          );
        }

        camporValorT = document.getElementById("campoValorT");
        valorT2 = document.getElementById("total2");

        // ----- FORMATEAMOS TOODOS LOS INPUTS -----
        suma = formatearNumero(suma);

        camporValorT.value = suma;
        valorT2.innerHTML = suma + "$";
        suma = 0;
        document.getElementById("cantidadProducto").value = "";
        document.getElementById("preciosUProducto").value = "";
        document.getElementById("categoriaProducto").value =
          "Seleccione una categoria";
        contenido = document.getElementById("producto");
        contenido.innerHTML = "";
        option = document.createElement("option");
        option.value = "Primero seleccione una categoría";
        option.text = "Primero seleccione una categoría";
        contenido.appendChild(option);
        contenido.disabled = true;
        document.getElementById("cantidadStock").value = 0;
        document.getElementById("promedioVenta").value = 0;

        //Vamos agregando al array principal
        registro = {
          Cliente: cliente,
          Categoria: categoria,
          Producto: producto,
          ValorUn: valor_uni_,
          Cantidad: cantidad,
        };
        venta.push(registro);

        // Lleva hasta el final de la pagina
        window.scrollTo(0, document.body.scrollHeight);
      };

      if (ganancia < 0) {
        Swal.fire({
          title: "Alerta de ganancia",
          text: `Estás perdiendo un total de ${ganancia}% con esta venta.\n ¿Desea continuar?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed) {
            agregarAlCarrito();
          } else {
            Swal.fire({
              title: "Cancelado",
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
            });
          }
        });
      } else {
        agregarAlCarrito();
      }
    }
  });

  //VACIAR TODA LA COMPRA
  botonB.addEventListener("click", () => {
    ConsData();
    venta = [];
    contador = 0;
    cliente_.disabled = false;
    var contenido = document.getElementById("contenido");
    contenido.innerHTML = "";
    suma = 0;
    camporValorT.value = 0;
    valorT2.value = suma;
    sinGuardar = 0;
  });

  // FINALIZAMOS LA COMPRA Y ENVIAMOS LOS JSON
  botonFinalizarVenta.addEventListener("click", () => {
    if (venta.length == 0) {
      Swal.fire({
        title: "Error de venta",
        text: "Por favor agregue al menos una venta o termine de editar",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else if (sinGuardar > 0) {
      Swal.fire({
        title: "Alerta de venta",
        text: "Por favor termine de editar el producto",
        icon: "warning",
        confirmButtonColor: "#118dd5",
      });
    } else {
      const Registrar = async () => {
        valorT_venta = document.getElementById("campoValorT").value;
        valorVenta = {
          ValorTotal: valorT_venta,
        };
        venta.push(valorVenta);

        // Se envian los datos en .json ----------
        const datosRg = JSON.stringify(venta);
        var registrarVenta = await fetch(
          "../../controllers/ventas/registrar.php", {
            method: "POST",
            body: datosRg,
          }
        );

        //Traer mensaje de respuesta desde PHP -----
        var resultado = await registrarVenta.json();

        setTimeout(() => {
          Swal.fire({
            title: "Venta registrada!",
            text: "Se ha registrado una venta",
            icon: "success",
            confirmButtonText: "Confirmar",
            timer: 1200,
            timerProgressBar: true,
            position: "bottom-end",
            showConfirmButton: false,
            confirmButtonColor: "#118dd5",
            confirmButtonAriaLabel: "Confirmar",
          }).then(() => {
            window.location.href = "../../views/ventas/listar.php";
          });
        }, 1000);
      };

      const CargarRegistro = () => {
        Swal.fire({
          icon: "info",
          title: "Registrando...",
          html: "Por favor espere",
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: async () => {
            Swal.showLoading();

            try {
              // Llamada a la función asíncrona
              await Registrar();
              // La función asíncrona ha terminado, cierra la alerta
            } catch (error) {
              // Ocurrió un error en la función asíncrona
              setTimeout(() => {
                Swal.fire({
                  icon: "error",
                  title: "Error de red",
                  text: "No hemos podido conectar con el servidor. Por favor intente nuevamente",
                  type: "error",
                  showConfirmButton: false,
                  confirmButtonText: "Confirmar",
                  timerProgressBar: true,
                  position: "bottom-end",
                  confirmButtonColor: "#118dd5",
                  confirmButtonAriaLabel: "Confirmar",
                });
              }, 1500);
            }
          },
        });
      };
      CargarRegistro();
    }
  });
}

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ------------------------------------------ LISTAR -------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

if (valorSubModuloActual == "listar") {
  // ----- Se crea el metodo Consulta ----------

  const Consultar = async (pag) => {
    verTodas = document.getElementById("FechasTodas");
    filtro_fecha = document.getElementById("select_fechas");

    if (filtro_fecha.value == "Todas las fechas") {
      verTodas.style.display = "none";
    } else {
      verTodas.style.display = "inline";
      filtro_fecha.style.display = "none";
    }

    //Ocultar paginador al filtrar
    if (
      document.getElementById("select_cliente").value != "Todos los clientes" ||
      document.getElementById("select_fechas").value != "Todas las fechas"
    ) {
      document.getElementById("cont-pag").hidden = true;
    } else {
      document.getElementById("cont-pag").hidden = false;
    }

    // Enviamos los filtros de busqueda
    filtro_fecha = document.getElementById("select_fechas");
    filtro_prove = document.getElementById("select_cliente");
    filtro_fecha.value;
    filtro_prove.value;
    // Se envian los datos en .json ----------
    const datosCons = new FormData();
    datosCons.append("cliente", filtro_prove.value);
    datosCons.append("fecha", filtro_fecha.value);
    datosCons.append("pagina", pag);

    var consultarBuscador = await fetch(
      "../../controllers/ventas/listado.php", {
        method: "POST",
        body: datosCons,
      }
    );

    //Inicializamos las variables
    var resultado = await consultarBuscador.json();
    if (resultado.success == false) {
      contenido = document.getElementById("contenido");
      contenido.innerHTML = "";

      fila = document.createElement("tr");
      fila.innerHTML = `
        <td data-label="Lo sentimos..." class="impar" colspan="7" class="text-center idCliente">Lo sentimos no encontramos ningun resultado para tu busqueda</td>
        `;
      contenido.appendChild(fila);
    } else {
      contis = 0;
      p = 0;
      c = 0;
      array_resultados = resultado.data;
      contenido = document.getElementById("contenido").innerHTML = "";
      posiciones = resultado.posiciones;
      ids = resultado.ids;

      // Ciclamos las filas de busqueda
      for (let x = 0; x < array_resultados.length; x++) {
        fila = document.createElement("tr");

        // Agregamos la clase para el color
        if (posiciones.includes(contis)) {
          c += 1;
          if (c % 2 == 0) {
            clase = "par";
          } else {
            clase = "impar";
          }
        }

        if (posiciones.includes(contis)) {
          // Creamos cada td con los datos

          if (array_resultados[x]["garantia"] == 1) {
            btnDetalle = `<td data-label="Detalles" class="${clase}" rowspan="${ids[p]}" class="text-center "><button id="ver_${array_resultados[x]["idVenta"]}" type="button" class="btn btn-primary verGarantia" data-toggle="modal" data-target="#VerGarantia" >Ver garantia</button></td>`
          } else {
            btnDetalle = `<td data-label="Detalles" class="${clase}" rowspan="${ids[p]}" class="text-center ">Sin garantia</td>`
          }

          fila.innerHTML = `

          <td data-label="ID" id="${array_resultados[x]["idVenta"]}" class="${clase} resalto ids" rowspan="${ids[p]}" class="text-center ">${array_resultados[x]["idVenta"]}</td>
          <td data-label="Valor Total" class="${clase} resalto text-center" rowspan="${ids[p]}" class=" documentoCliente">${formatearNumero(parseInt(array_resultados[x]["valorT"]))}</td><td data-label="Cliente" class="${clase}" rowspan="${ids[p]}" class="text-center nombreCliente">${array_resultados[x]["nombreCliente"]}</td>
          <td data-label="Fecha Venta" class="${clase}" rowspan="${ids[p]}" class="text-center telefonoCliente">${array_resultados[x]["fechaVenta"]}</td>
          <td data-label="Producto" class="${clase}" class="text-center correoCliente">${array_resultados[x]["nombreProducto"]}</td>
          <td data-label="Cantidad" class="${clase}" class="text-center estadoModulo">${array_resultados[x]["cantidad"]}</td>
          <td data-label="Valor" class="${clase}" class="text-center estadoModulo">${formatearNumero(parseInt(array_resultados[x]["valor"]))}</td>
          <td data-label="Acciones" class="${clase}" rowspan="${ids[p]}" class="text-center "><button type="button" id="modal_${array_resultados[x]["idVenta"]}" class="btn btn-secondary btn-garantia" data-toggle="modal" data-target="#ModalGarantia">Garantia</button></td>
          ${btnDetalle}
                `;
          p += 1;
        } else {
          fila.innerHTML = `
               
          <td  data-label="Producto" class="${clase}" class="text-center correoCliente">${array_resultados[x]["nombreProducto"]}</td>
          <td  data-label="Cantidad" class="${clase}" class="text-center estadoModulo">${array_resultados[x]["cantidad"]}</td>
          <td  data-label="Valor" class="${clase}" class="text-center estadoModulo">${formatearNumero(parseInt(array_resultados[x]["valor"]))}</td>
                `;
        }

        contenido = document.getElementById("contenido");

        // Agregamos a la clase contenido los td
        contenido.appendChild(fila);

        contis += 1;
      }
    }

    // --------------------------------------------------
    // ----------------------- GARANTIAS ----------------
    // --------------------------------------------------


    // ------------- Realizar garantia ---------------
    modalesGarantia = document.getElementsByClassName("btn-garantia");
    id_modal_garantia = document.getElementById("id_modal_garantia");
    for (let k = 0; k < modalesGarantia.length; k++) {

      modalesGarantia[k].addEventListener("click", () => {

        InformacionGarantia = async (idVenta) => {
          // Se envian los datos en .json ----------
          const datosCons = new FormData();
          datosCons.append("idVenta", idVenta);

          var infoGarantia = await fetch(
            "../../controllers/ventas/infoGarantia.php", {
              method: "POST",
              body: datosCons,
            }
          );

          var resultadoG = await infoGarantia.json();

          //Obtenemos los datos de la venta
          cliente = resultadoG.data[0]["nombreCliente"];
          document.getElementById("cliente_modal_garantia").value = cliente;

          fechaVenta = resultadoG.data[0]["fechaVenta"];
          document.getElementById("fechaVenta_modal_garantia").value =
            fechaVenta;

          valorT = resultadoG.data[0]["valorT"];
          document.getElementById("valorT_modal_garantia").value =
            formatearNumero(valorT);

          //Obtenemos el ciclo de los productos
          productos_container = document.getElementById("clicado");
          productos_container.innerHTML = "";

          ci = 0;
          //Listar todos los productos
          for (let cP = 0; cP < resultadoG.data.length; cP++) {
      
            ci += 1;
            form = document.createElement("div");
            form.classList.add("carousel-item");

            if (cP == 0) {
              form.classList.add("active");
            }

            // --------- Resta de las fechas -----------
            // Obtén la fecha actual
            var fechaActual = new Date();

            // Convierte la fechaResta en un objeto Date
            var fechaResta = document.getElementById(
              "fechaVenta_modal_garantia"
            ).value;
            var partesFecha = fechaResta.split("-");
            var dia = parseInt(partesFecha[0]);
            var mes = partesFecha[1];
            var año = parseInt(partesFecha[2]);

            // Mapea el nombre del mes a su número correspondiente
            var meses = {
              enero: 0,
              febrero: 1,
              marzo: 2,
              abril: 3,
              mayo: 4,
              junio: 5,
              julio: 6,
              agosto: 7,
              septiembre: 8,
              octubre: 9,
              noviembre: 10,
              diciembre: 11,
            };

            // Crea un objeto Date con la fechaResta
            var fechaRestaObj = new Date(año, meses[mes], dia);

            // Calcula la diferencia en milisegundos
            var diferenciaEnMilisegundos = fechaActual - fechaRestaObj;

            // Convierte la diferencia a días
            var diferenciaEnDias =
              diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

            if (diferenciaEnDias < 60) {
              if (
                resultadoG.data[cP]["categoriaProducto"].split(" ")[0] == "Bicicletas"
              ) {
                botonGarantia = `<button data-botonN="${cP}" id="prod_${resultadoG.data[cP]["idProducto"]}" type="button" class="btn btn-primary garantiaProducto">Aplicar garantia </button> `;
              } else {
                botonGarantia = `<button data-botonN="${cP}" id="prod_${resultadoG.data[cP]["idProducto"]}" type="button" class="btn btn-primary garantiaProducto">Aplicar garantia </button> `;
              }
            } else {
              botonGarantia = `<button type="button" class="btn btn-danger">No disponible</button> `
            }


            form.innerHTML = `
       
            <h6 style="font-weight:1000;" >Producto ${cP + 1} de ${
              resultadoG.data.length
            }</h6>
            <div class="row">
                <div class="col">
                  <input style="display:none" value="${
                    resultadoG.data[cP]["idProducto"]
                  }" type="text" class="form-control" id="id_producto_g" disabled>

                    <label>Nombre producto</label>
                    <input value="${
                      resultadoG.data[cP]["nombreProducto"]
                    }" type="text" class="form-control" id="id_modal_garantia" disabled>
                </div>
                <div class="col">
                    <label>Cantidad </label>
                    <input value="${
                      resultadoG.data[cP]["cantidad"]
                    }" type="text" class="form-control cant" id="cliente_modal_garantia" disabled>
                </div>
            </div>
              <br>
            <div class="row">
                <div class="col">
                    <label>Valor ud</label>
                    <input value="${formatearNumero(
                      resultadoG.data[cP]["valor"]
                    )}" type="text" class="form-control" id="id_modal_garantia" disabled>
                </div>

                <input style="display:none" value="${resultadoG.data[cP]["cantidadProducto"]}" type="text" class="form-control prodSel" id="id_modal_garantia" disabled>


                <div id="btn-garantia_" class="col" style="display:grid; ">
                <br>
                ${botonGarantia}
                <br>
                </div>
            </div>
         
            
            `;

            productos_container.appendChild(form);
          }

          //Botones productos

          botnesProductosG = document.getElementsByClassName("garantiaProducto");

          for (let n = 0; n < botnesProductosG.length; n++) {

            botnesProductosG[n].addEventListener("click", () => {
              Swal.fire({
                title: "Garantia en proceso...",
                icon: "warning",
                text: `¿Realmente desea aplicar esta garantía al producto?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonColor: "#118dd5",
                confirmButtonText: "Continuar",
                denyButtonText: `Cancelar`,
              }).then((result) => {
                if (result.isConfirmed) {
                  //Obtenemos la cantidad  vendidad
                  vendido = document.getElementsByClassName("cant")[botnesProductosG[n].getAttribute("data-botonN")].value;
                  idProductoSelect = document.getElementsByClassName("prodSel")[botnesProductosG[n].getAttribute("data-botonN")].value;

                  $(document).off('focusin.modal');

                  Swal.fire({
                    title: "¿Qué cantidad desea cambiar?",
                    html: `
                    <form style="z-index:999" id="myForm">
                        <label class="swal2-label"> Cantidad en stock</label>
                        <input value="${idProductoSelect}" type="text" id="stock" class="swal2-input" placeholder="Stock" disabled>
            
                        <input type="text" id="cantidadDev" class="swal2-input" placeholder="Cantidad">
                        <input type="text" id="observacion" class="swal2-input" placeholder="Observaciones">
                    </form>
                `,
  
                    showCancelButton: true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#118dd5",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
                    allowEscapeKey: false, // Evita que la alerta se cierre al presionar la tecla "Esc"
                    preConfirm: () => {
                      cantidadDev = document.getElementById('cantidadDev').value;
                      observacion = document.getElementById('observacion').value;
                      cantidadStock = document.getElementById('stock').value;

                      if (!cantidadDev || !observacion) {
                        Swal.showValidationMessage('Todos los campos son obligatorios');
                      } else if (parseInt(cantidadDev) > parseInt(cantidadStock)){
                        Swal.showValidationMessage('No tienes suficientes productos en stock');
                      }  
                      else if (parseInt(cantidadDev) > parseInt(vendido)) {
                        Swal.showValidationMessage("Cantidad inválida. La venta solo fue de " + vendido + " elementos")

                      }
                    }

                  }).then((result) => {

                    if (result.isConfirmed) {
                    // Aquí puedes hacer algo con la cantidad ingresada
                    cantidad = cantidadDev;
                    observacion_ = observacion

                    //Logica garantia json
                    const RealizarGarantia = async (idProductoG, idVentaG, cantidadG, observacionG) => {
                      // Se envian los datos en .json ----------
                      const datosRg = new FormData();
                      datosRg.append("idProducto", idProductoG);
                      datosRg.append("idVenta", idVentaG);
                      datosRg.append("cantidad", cantidadG);
                      datosRg.append("observaciones", observacionG);

                      var aplicarGarantia = await fetch(
                        "../../controllers/ventas/registrarGarantia.php", {
                          method: "POST",
                          body: datosRg,
                        }
                      );

                      //Traer mensaje de respuesta desde PHP -----
                      var resultado = await aplicarGarantia.json();

                      console.log(resultado);

                      if (resultado) {
                        setTimeout(() => {
                          Swal.fire({
                            title: "Garantia realizada",
                            text: "Se ha registrado la garantia",
                            icon: "success",
                            confirmButtonText: "Cofirmar",
                            timer: 1200,
                            timerProgressBar: true,
                            position: "bottom-end",
                            showConfirmButton: false,
                            confirmButtonColor: "#118dd5",
                            confirmButtonAriaLabel: "Confirmar",
                            allowOutsideClick: false, // Evita que la alerta se cierre al hacer clic fuera de ella
                            allowEscapeKey: false, // Evita que la alerta se cierre al presionar la tecla "Esc"
                          }).then(() => {
                            window.location.href =
                              "../../views/ventas/garantias.php";
                          });
                        }, 1000);
                      }
                    };

                    const CargarRegistro = () => {
                      Swal.fire({
                        icon: "info",
                        title: "Registrando...",
                        html: "Por favor espere",
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        didOpen: async () => {
                          Swal.showLoading();

                          try {
                            // Llamada a la función asíncrona
                            idProd = botnesProductosG[n].id.split("_")[1];
                            idVenta =
                              document.getElementById(
                                "id_modal_garantia"
                              ).value;

                            await RealizarGarantia(idProd, idVenta, cantidad, observacion_);
                            // La función asíncrona ha terminado, cierra la alerta
                          } catch (error) {
                            // Ocurrió un error en la función asíncrona
                            setTimeout(() => {
                              Swal.fire({
                                icon: "error",
                                title: "Error de red",
                                text: "No hemos podido conectar con el servidor. Por favor intente nuevamente",
                                type: "error",
                                showConfirmButton: false,
                                confirmButtonText: "Cofirmar",
                                timerProgressBar: true,
                                position: "bottom-end",
                                confirmButtonColor: "#118dd5",
                                confirmButtonAriaLabel: "Confirmar",
                              });
                            }, 1500);
                          }
                        },
                      });
                    };

                    CargarRegistro();
                  }
                  });
                } else if (result.isDenied) {
                  Swal.fire({
                    title: "Cancelado",
                    text: "Garantia cancelada",
                    icon: "error",
                    confirmButtonColor: "#118dd5",
                    confirmButtonAriaLabel: "Ok",
                  });
                }
              });
            });
          }

          //Botones bicicletas
          if (ci == 1) {
            document.getElementById("next1").style.display = "none";
            document.getElementById("prev1").style.display = "none";
          } else {
            document.getElementById("next1").style.display = "inline";
            document.getElementById("prev1").style.display = "inline";
          }
        };

        idVentaModal = modalesGarantia[k].id.split("_")[1];
        id_modal_garantia.value = idVentaModal;

        InformacionGarantia(idVentaModal);
      });
    }


    // ------------- Ver garantia ---------------
    verGarantias = document.getElementsByClassName("verGarantia");
    for (let m = 0; m < verGarantias.length; m++) {

      console.log(verGarantias[m])

      verGarantias[m].addEventListener("click", () => {

        idVerGarantia = verGarantias[m].id.split('_')[1]

        InformacionVerGarantia = async (idVerGarantia_) => {

          productos_container = document.getElementById('listaGarantia')
          productos_container.innerHTML = ''
          // Se envian los datos en .json ----------
          const datosCons = new FormData();
          datosCons.append("idVenta", idVerGarantia_);

          var infoGarantia = await fetch(
            "../../controllers/ventas/verGarantias.php", {
              method: "POST",
              body: datosCons,
            }
          );

          var resultadoG = await infoGarantia.json();

          console.log(resultadoG)
          ci = 0
          //Listar todos los productos
          for (let cP = 0; cP < resultadoG.data.length; cP++) {
            ci += 1;

            form = document.createElement("div");
            form.classList.add("carousel-item");

            if (cP == 0) {
              form.classList.add("active");
            }




            form.innerHTML = `
       
            <h6 style="font-weight:1000;" >Producto ${cP + 1} de ${resultadoG.data.length}</h6>


            <div class="row">
            <div class="col">
                <label>Id Garantia</label>
                <input value="${resultadoG.data[cP]["idGarantia"] }" type="text" class="form-control" id="id_modal_garantia" disabled>
            </div>
            <div class="col">
                <label>Id Venta </label>
                <input value="${resultadoG.data[cP]["idVenta"] }" type="text" class="form-control cant" id="cliente_modal_garantia" disabled>
            </div>
        </div>
        
        <br>
        
        <div class="row">
            <div class="col">
                <label>Fecha Garantia </label>
                <input value="${(resultadoG.data[cP]["fechaGarantia"] )}" type="text" class="form-control" id="id_modal_garantia" disabled>
            </div>
        
            <div class="col">
                <label>Cliente </label>
                <input value="${(resultadoG.data[cP]["nombreCliente"] )}" type="text" class="form-control" id="id_modal_garantia" disabled>
            </div>
        
        </div>
        
        <br>
        
        <div class="row">
            <div class="col">
                <label>Nombre producto</label>
                <input value="${resultadoG.data[cP]["nombreProducto"] }" type="text" class="form-control" id="id_modal_garantia" disabled>
            </div>
            <div class="col">
                <label>Cantidad </label>
                <input value="${resultadoG.data[cP]["cantidad"] }" type="text" class="form-control cant" id="cliente_modal_garantia" disabled>
            </div>
        </div>

        <br>

        <div class="col">
          <label>Observaciones</label>
          <textarea style="max-height: 85px;" disabled class="form-control" id="exampleFormControlTextarea1" rows="3">${resultadoG.data[cP]["observaciones"] }</textarea>
          </div>
        <div>


        </div>

            `;
            productos_container = document.getElementById('listaGarantia')

            productos_container.appendChild(form);
          }

        }

        InformacionVerGarantia(idVerGarantia)


      })

    }


    // --------------------------------------------------
    return resultado.cantidadR;
  };

  //Agregamos a una lista las fechas encontradas en la BD
  var fechasEncontradas = document.getElementById("fechas").innerHTML;
  fechasEncontradas = fechasEncontradas.split(",");
  fechasEncontradas.pop();

  if (fechasEncontradas.length != 0) {
    //Creamos los selects filtros
    filtro_prove = document.getElementById("select_cliente");
    filtro_fecha = document.getElementById("select_fechas");
    verTodas = document.getElementById("FechasTodas");

    verTodas.addEventListener("click", function (event) {
      event.preventDefault();

      filtro_fecha.style.display = "inline";
      filtro_fecha.value = "Todas las fechas";

      Consultar(1);
      ValidarPaginaActual(1);
    });

    filtro_prove.addEventListener("change", () => {
      Consultar(1);
      ValidarPaginaActual(1);
    });
  } else {
    fila = document.createElement("tr");
    fila.innerHTML = `<td class="impar" colspan="7" class="text-center idCliente">Lo sentimos no encontramos ningún resultado registrado</td>`;
    contenido.appendChild(fila);
  }

  //Creamo el calendario y le pasamos las fechas encontradas para que deshabilite el resto de fechas
  $(document).ready(function () {
    $("#select_fechas").datepicker({
      dateFormat: "yy-mm-dd",
      beforeShowDay: function (date) {
        const dateString = $.datepicker.formatDate("yy-mm-dd", date);
        return [fechasEncontradas.includes(dateString) ? "prueba" : "", ""];
      },
      dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      monthNamesShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      onSelect: Consultar,
    });
  });

  ValidarPaginaActual = (pgActual) => {
    uno = document.getElementById("uno");
    dos = document.getElementById("dos");
    tres = document.getElementById("tres");

    if (uno.innerHTML == pgActual) {
      uno.classList.add("press");
    } else {
      uno.classList.remove("press");
    }
    if (dos.innerHTML == pgActual) {
      dos.classList.add("press");
    } else {
      dos.classList.remove("press");
    }
    if (tres.innerHTML == pgActual) {
      tres.classList.add("press");
    } else {
      tres.classList.remove("press");
    }
  };

  paginarRegistros = () => {
    // ------------ PAGINADOR DE LISTA --------------
    //Elementos funcionales
    back = document.getElementById("back");
    next = document.getElementById("next");

    //Elementos paginas
    uno = document.getElementById("uno");
    dos = document.getElementById("dos");
    tres = document.getElementById("tres");

    uno.style.display = "inline";
    dos.style.display = "inline";
    tres.style.display = "inline";
    next.style.display = "inline";

    pg_final = 0;
    pag_actual = 1;
    // ----- LLamamos funcion ------

    Consultar(1).then((valor) => {
      pg_final = Math.ceil(valor / 10);

      //Ocultar primer boton
      uno.classList.add("press");
      back.style.display = "none";

      //Si hay menos de 3 paginas
      if (pg_final == 3) {
        next.style.display = "none";
      }

      //Si solo hay 2 paginas
      else if (pg_final == 2) {
        next.style.display = "none";
        tres.style.display = "none";
      }

      //Si solo hay 1 pagina
      else if (pg_final == 1) {
        next.style.display = "none";
        tres.style.display = "none";
        dos.style.display = "none";
      }

      //Funcion pasar pagina
      next.addEventListener("click", () => {
        uno.innerHTML == 0 ?
          (back.style.display = "none") :
          (back.style.display = "inline");
        tres.innerHTML == pg_final - 1 ?
          (next.style.display = "none") :
          (next.style.display = "inline");

        uno.innerHTML = parseInt(uno.innerHTML) + 1;
        dos.innerHTML = parseInt(dos.innerHTML) + 1;
        tres.innerHTML = parseInt(tres.innerHTML) + 1;

        ValidarPaginaActual(pag_actual);
      });

      //Funcion regresar pagina
      back.addEventListener("click", () => {
        uno.innerHTML == 2 ?
          (back.style.display = "none") :
          (back.style.display = "inline");
        tres.innerHTML == pg_final + 1 ?
          (next.style.display = "none") :
          (next.style.display = "inline");

        uno.innerHTML = parseInt(uno.innerHTML) - 1;
        dos.innerHTML = parseInt(dos.innerHTML) - 1;
        tres.innerHTML = parseInt(tres.innerHTML) - 1;

        ValidarPaginaActual(pag_actual);
      });

      uno.addEventListener("click", () => {
        pag_actual = uno.innerHTML;
        Consultar(uno.innerHTML);
        ValidarPaginaActual(pag_actual);
      });
      dos.addEventListener("click", () => {
        pag_actual = dos.innerHTML;
        Consultar(dos.innerHTML);
        ValidarPaginaActual(pag_actual);
      });
      tres.addEventListener("click", () => {
        pag_actual = tres.innerHTML;
        Consultar(tres.innerHTML);
        ValidarPaginaActual(pag_actual);
      });
    });
  };

  paginarRegistros();
}


// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ------------------------------------------ GARANTIAS -------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

if (valorSubModuloActual == "garantias") {

  // ------------ Creamos funcion lista  -------------

  listar = (data) => {

    contenido = document.getElementById("contenido");
    contenido.innerHTML = "";

    for (let i = 0; i < (data).length; i++) {
      if (data[i]['idCliente'] == 1) {
        idFijo = 'r_fijo'
      } else {
        idFijo = ''
      }

      fila = document.createElement("tr");
      fila.innerHTML = `
      <td data-label="ID Garantia" class="text-center ">${data[i]['idGarantia']}</td>
      <td data-label="ID Venta" class="text-center">${data[i]['idVenta']}</td>
      <td data-label="Fecha Garantia" class="text-center ">${data[i]['fechaGarantia']}</td>
      <td data-label="Cliente" class="text-center">${data[i]['nombreCliente']}</td>
      <td data-label="Producto" class="text-center">${data[i]['nombreProducto']}</td>
      <td data-label="Cantidad" class="text-center ">${data[i]['cantidad']}</td>
      <td data-label="Observaciones" class="text-center correoCliente">${data[i]['observaciones']}</td>  
`
      modal = document.createElement("div");


      // Agregamos a la clase contenido los td
      contenido.appendChild(fila)
      contenido.appendChild(modal)

    }

    //--------------------- EDITAR CLIENTES ------------------

    //Se capturan las ventanas modales y se cuentan
    var totalReg = document.querySelectorAll(".ventaActualizarModulo").length;

    // Se guardan las listas con los elemntos ventana y boton cerrar
    actualizarModulos = [];
    cerrarVentanas = [];
    ventanaActualizarModulos = [];

    for (let o = 0; o < totalReg; o++) {
      actualizarModulos.push(
        document.querySelector(".botonActualizarModulo" + (o + 1))
      );
      cerrarVentanas.push(document.querySelector(".cerrarVentana" + (o + 1)));
      ventanaActualizarModulos.push(
        document.querySelector(".ventaActualizarModulos" + (o + 1))
      );

    }


  }

  ConsultarLista = async (pag) => {
    const datosCons = new FormData();
    datosCons.append("pagina", pag);

    var ConsultarLista = await fetch("../../controllers/ventas/listadoGarantia.php", {
      method: "POST",
      body: datosCons,
    });

    //Inicializamos las variables
    var resultado = await ConsultarLista.json();

    if (resultado.registros == 0) {
      contenido = document.getElementById("contenido");
      contenido.innerHTML = "";
      fila = document.createElement("tr");
      fila.innerHTML = `
      <td colspan="8" class="text-center" > No tienes ningun cliente registrado </td>`
      contenido.appendChild(fila)

      //Ocultar el paginador 
      cont_pag = document.getElementById('cont-pag')
      cont_pag.style.visibility = 'hidden'

    } else {
      cont_pag = document.getElementById('cont-pag')
      cont_pag.style.visibility = 'visible'

      listar(resultado.data)
    }
    return resultado.registros
  }

  BuscarRegistros = async (busqueda) => {
    cont_pag = document.getElementById('cont-pag')
    cont_pag.style.visibility = 'hidden'

    const datosBusq = new FormData();
    datosBusq.append("busqueda", busqueda);

    var ConsultarBusqueda = await fetch("../../controllers/ventas/buscadorGarantia.php", {
      method: "POST",
      body: datosBusq,
    });

    var resultado = await ConsultarBusqueda.json();

    if (resultado.success['success']) {
      listar(resultado.data)


    } else {
      contenido = document.getElementById("contenido");
      contenido.innerHTML = "";
      fila = document.createElement("tr");
      fila.innerHTML = `
      <td data-label="Lo sentimos..." colspan="8" class="text-center" > No se encontraron resultados para tu busqueda</td>`


      contenido.appendChild(fila)

    }

    return resultado.registros
  }

  buscador = document.getElementById('buscador')

  ValidarPaginaActual = (pgActual) => {
    uno = document.getElementById('uno')
    dos = document.getElementById('dos')
    tres = document.getElementById('tres')

    if (uno.innerHTML == pgActual) {
      uno.classList.add('press')
    } else {
      uno.classList.remove('press')
    }
    if (dos.innerHTML == pgActual) {
      dos.classList.add('press')
    } else {
      dos.classList.remove('press')
    }
    if (tres.innerHTML == pgActual) {
      tres.classList.add('press')
    } else {
      tres.classList.remove('press')
    }

  }

  buscador.addEventListener('keyup', function (event) {
    back.style.display = 'none'
    uno = document.getElementById('uno').innerHTML = 1
    dos = document.getElementById('dos').innerHTML = 2
    tres = document.getElementById('tres').innerHTML = 3
    ValidarPaginaActual(1)

    console.log(buscador.value.length)
    // ista de códigos de teclas especiales que queremos ignorar
    ignoredKeys = [16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

    // Comprobamos si el código de la tecla está en la lista de teclas ignoradas
    if (ignoredKeys.includes(event.keyCode)) {
      event.preventDefault();
      return;
    }

    if (buscador.value.length == 0) {
      console.log(buscador.value)
      ConsultarLista(1)
    } else {
      busquedaErrorRed = async () => {
        try {
          // Llamada a la función asíncrona     
          await BuscarRegistros(buscador.value);
          // La función asíncrona ha terminado, cierra la alerta

        } catch (error) {

          // Ocurrió un error en la función asíncrona

          Swal.fire({
            icon: 'error',
            title: 'Error de red',
            text: 'No hemos podido conectar con el servidor. Por favor intente nuevamente',
            type: 'error',
            showConfirmButton: false,
            confirmButtonText: "Cofirmar",
            timerProgressBar: true,
            position: "bottom-end",
            confirmButtonColor: "#118dd5",
            confirmButtonAriaLabel: "Confirmar",
          });
        }
      }

      busquedaErrorRed()
    }
  })

  paginarRegistros = () => {

    // ------------ PAGINADOR DE LISTA --------------
    //Elementos funcionales
    back = document.getElementById('back')
    next = document.getElementById('next')

    //Elementos paginas
    uno = document.getElementById('uno')
    dos = document.getElementById('dos')
    tres = document.getElementById('tres')

    pg_final = 0
    pag_actual = 1
    // ----- LLamamos funcion ------

    ConsultarLista(1)
      .then((valor) => {
        pg_final = Math.ceil(valor / 5)

        //Ocultar primer boton
        uno.classList.add('press')
        back.style.display = 'none'

        //Si hay menos de 3 paginas
        if (pg_final == 3) {
          next.style.display = 'none'
        }

        //Si solo hay 2 paginas
        else if (pg_final == 2) {
          next.style.display = 'none'
          tres.style.display = 'none'
        }

        //Si solo hay 1 pagina
        else if (pg_final == 1) {
          next.style.display = 'none'
          tres.style.display = 'none'
          dos.style.display = 'none'
        }



        //Funcion pasar pagina
        next.addEventListener('click', () => {
          uno.innerHTML == 0 ? back.style.display = 'none' : back.style.display = 'inline'
          tres.innerHTML == (pg_final - 1) ? next.style.display = 'none' : next.style.display = 'inline'

          uno.innerHTML = parseInt(uno.innerHTML) + 1
          dos.innerHTML = parseInt(dos.innerHTML) + 1
          tres.innerHTML = parseInt(tres.innerHTML) + 1

          ValidarPaginaActual(pag_actual)

        })

        //Funcion regresar pagina
        back.addEventListener('click', () => {
          uno.innerHTML == 2 ? back.style.display = 'none' : back.style.display = 'inline'
          tres.innerHTML == (pg_final + 1) ? next.style.display = 'none' : next.style.display = 'inline'

          uno.innerHTML = parseInt(uno.innerHTML) - 1
          dos.innerHTML = parseInt(dos.innerHTML) - 1
          tres.innerHTML = parseInt(tres.innerHTML) - 1

          ValidarPaginaActual(pag_actual)
        })

        uno.addEventListener('click', () => {
          pag_actual = uno.innerHTML
          ConsultarLista(uno.innerHTML)
          ValidarPaginaActual(pag_actual)
        })
        dos.addEventListener('click', () => {
          pag_actual = dos.innerHTML
          ConsultarLista(dos.innerHTML)
          ValidarPaginaActual(pag_actual)
        })
        tres.addEventListener('click', () => {
          pag_actual = tres.innerHTML
          ConsultarLista(tres.innerHTML)
          ValidarPaginaActual(pag_actual)
        })


      })

  }

  paginarRegistros()



}