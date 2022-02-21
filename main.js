ScrollReveal().reveal(".elementoLi", { delay: 500, reset: true });
function clikCompra() {
  let toastLiveExample = document.getElementById("liveToast");
  let toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

let FILTRADO = [];

const PRODUCTOS = [
  {
    nombre: "Semillas",
    codigo: "1",
    categoria: "5",
    descripcion:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?",
    precio: 23,
  },
  {
    nombre: "Especias",
    codigo: "2",
    categoria: "10",
    descripcion:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?",
    precio: 55,
  },
  {
    nombre: "Legumbres",
    codigo: "3",
    categoria: "7",
    descripcion:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?",
    precio: 74,
  },
];

let CARRITO = [];

class Producto {
  constructor(nombre, codigo, descripcion, precio, categoria) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

class Compra {
  constructor(codigo, cantidad) {
    this.nombre;
    this.codigo = codigo;
    this.cantidad = cantidad;
    this.total;
    this.precio;
  }
}

const filtroProductoMostrar = () => {
  const lista = document.querySelectorAll(".elementoLi1 a");
  for (const item of lista) {
    item.addEventListener("click", (evt) => {
      const categoriaId = evt.currentTarget.getAttribute("value");
      FILTRADO = PRODUCTOS.filter((obj) => obj.categoria == categoriaId);
      cargarArregloProductos();
    });
  }
};

const limpiarCargaProducto = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("cod").value = "";
  document.querySelector("select").value = "0";
  document.getElementById("stock").value = "00";
  document.getElementById("floatingTextarea").value = "";
  document.getElementById("pre").value = "";
};

const cargarArregloProductos = () => {
  if (FILTRADO.length != 0) {
    document.getElementById(`listaProductos`).innerHTML = "";
    for (const objFilt of FILTRADO) {
      crearTarjetaProducto(objFilt);
    }
  } else {
    document.getElementById(`listaProductos`).innerHTML = "";
    for (const objProd of PRODUCTOS) {
      crearTarjetaProducto(objProd);
    }
  }
};

function crearNuevoProducto() {
  let nombre = document.getElementById("nombre").value;
  let codigo = document.getElementById("cod").value;
  let categoria = document.querySelector("select").value;
  /* let cantidad = parseInt(document.getElementById("stock").value); */
  let descripcion = document.getElementById("floatingTextarea").value;
  let precio = parseFloat(document.getElementById("pre").value);

  if (!isNaN(cantidad) && !isNaN(precio)) {
    if (
      nombre != "" &&
      codigo != "" &&
      /* (cantidad != "") && */ 
      descripcion != "" &&
      precio != "" &&
      categoria != "0"
    ) {
      const productoNuevo = new Producto(
        nombre,
        codigo,
        descripcion,
        precio,
        categoria
      );
      cargarProductoNuevo(productoNuevo);
    } else {
      alert("No dejar ningun campo vacio");
    }
  } else {
    alert("Escribir un precio con este formato: 0.00");
  }
  limpiarCargaProducto();
}

function cargarProductoNuevo(productoNuevo) {
  if (PRODUCTOS.length == 0) {
    PRODUCTOS.push(productoNuevo);
    crearTarjetaProducto(productoNuevo);
  } else if (revisarCodigoProductoNuevo(PRODUCTOS, productoNuevo)) {
    alert("Codigo Repetido");
  } else {
    PRODUCTOS.push(productoNuevo);
    crearTarjetaProducto(productoNuevo);
  }
}

const revisarCodigoProductoNuevo = (arregloProductos, productoNuevo) => {
  for (const obj of arregloProductos) {
    if (obj.codigo === productoNuevo.codigo) {
      return true;
    }
  }
};

function cargarNuevaCompra(codigo) {
  let cantidad = parseInt(document.getElementById(`cant${codigo}`).value);

  const compraNueva = new Compra(codigo, cantidad);
  CARRITO.push(compraNueva);
  document.querySelector("#cantComp").innerHTML = CARRITO.length;

  changoNav();
}

const mostrarCompra = () => {
  carritoLleno();
  const tablaCuerpo = document.querySelector("tbody");
  tablaCuerpo.innerHTML = "";

  const total = CARRITO.reduce((total, next) => (total += next.total), 0);

  for (const item of CARRITO) {
    const tr = document.createElement("tr");
    const cuerpo = tablaCuerpo.appendChild(tr);
    cuerpo.innerHTML += `<td>${item.nombre} - $${item.precio}</td>
                        <td>${item.cantidad}</td>
                        <td>$${item.precio * item.cantidad}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="eliminarCompra(${
                          item.codigo
                        })">X</button></td>`;
  }
  const tfoot = document.querySelector("tfoot tr");
  tfoot.innerHTML = ` <td></td>
                        <td></td>
                        <td>TOTAL: ${total}</td> `;
};

function modal() {
  const abrirModal = document.querySelector(".lanzar__modal");
  const cerrarModal = document.querySelector(".cerrar__modal");
  const cerrModal = document.querySelector(".modal__comprar");
  const modal = document.querySelector("#vantana__modal");

  abrirModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    mostrarCompra();
    modal.classList.add("modal--show");
  });

  cerrarModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.classList.remove("modal--show");
  });

  cerrModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    CARRITO = [];
    const chango = document.querySelector(".ocultar__chango");
    chango.classList.remove("mostrar--chango");
    modal.classList.remove("modal--show");
  });
}

const carritoLleno = () => {
  const nuevoArreglo = PRODUCTOS.filter(arregloCompra);

  return nuevoArreglo;
};

function arregloCompra(producto) {
  for (const item of CARRITO) {
    if (item.codigo == producto.codigo) {
      item.total = item.cantidad * producto.precio;
      item.nombre = producto.nombre;
      item.precio = producto.precio;
      return true;
    }
  }
}

filtroProductoMostrar();
cargarArregloProductos();
modal();

function crearTarjetaProducto(productoNuevo) {
  let etiqueta = document.createElement("li");
  etiqueta.setAttribute("class", "elementoLi");
  etiqueta.setAttribute("id", `${productoNuevo.codigo}`);
  document.getElementById(`listaProductos`).appendChild(etiqueta);
  document.getElementById(
    `${productoNuevo.codigo}`
  ).innerHTML = `<div class="contenedorImgText">
              <div class="contenedorImagen">
                <img src="../img/${productoNuevo.codigo}.webp" alt="Legumbres" class="rounded-circle rounded-circle rounded-circle imagenStandar"/>
              </div>
              <div class="contenedorTexto">
                <h4>${productoNuevo.nombre}</h4>
                <p class="truncate">${productoNuevo.descripcion}.</p>
              </div> 
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#cod${productoNuevo.codigo}">Ver</button>
              </div>
            <!-- Modal -->
              <div class="modal fade" id="cod${productoNuevo.codigo}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel"><img src="../img/marca.webp" class="imagen__marca__modal" alt="logotipo"/></h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- Card -->
                    <div class="modal-body" id="Contenido">
                      <div class="card mb-1" style="max-width: 540px;">
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img src="../img/${productoNuevo.codigo}.webp" class="img-fluid rounded-start" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">${productoNuevo.nombre}</h5>
                              <p class="card-text">${productoNuevo.descripcion}.</p>
                              <p class="card-text"><small class="text-muted">Masala - Tienda ONLINE</small></p>
                              <div class="row gap-2 input-group mb-1">
                                <span class="col-sm-1 input-group-text">$</span>
                                <span class="col-sm-4 input-group-text" id="precio">${productoNuevo.precio}</span>
                                <span class="col-sm-4 input-group-text">Codigo:<span id="${productoNuevo.codigo}">${productoNuevo.codigo}</span></span>
                              </div>
                              <div class="row gap-2 input-group mb-1">
                                <input type="number" id="cant${productoNuevo.codigo}" class="col-sm-2 form-control" value="1" aria-label="Zip">
                                <span class="col-sm-5 input-group-text">Stock: 00</span>                                    
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  
                    <!-- Footer -->                      
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary" id="chango" onclick="cargarNuevaCompra(${productoNuevo.codigo})" data-bs-dismiss="modal">Comprar</button>
                    </div>
                  </div>
                </div>
              </div>
          </li>`;
}

function changoNav() {
  const chango = document.querySelector(".ocultar__chango");
  chango.classList.add("mostrar--chango");
}
function eliminarCompra(codigo) {
  CARRITO = CARRITO.filter((item) => item.codigo != codigo);
  document.querySelector("#cantComp").innerHTML = CARRITO.length;
  mostrarCompra();
  if (CARRITO.length === 0) {
    const chango = document.querySelector(".ocultar__chango");
    chango.classList.remove("mostrar--chango");
    const modal = document.querySelector("#vantana__modal");
    modal.classList.remove("modal--show");
  }
}
