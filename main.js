import { toastCompra, promoMes } from './javascript/app.js';
import { Producto, Compra } from './javascript/class.js';

ScrollReveal().reveal(".elementoLi", { delay: 500, reset: true });

let arrayFiltrado = [];

export const PRODUCTOS = [
  {
    nombre: "Semillas",
    id: "1",
    categoria: "5",
    descripcion:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?",
    precio: 23,
  },
  {
    nombre: "Especias",
    id: "2",
    categoria: "10",
    descripcion:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?",
    precio: 55,
  },
  {
    nombre: "Legumbres",
    id: "3",
    categoria: "7",
    descripcion:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?",
    precio: 74,
  },
];

export let arrayCarrito = [];

const mostrarModalCarrito = () => {


  const seccion = document.createElement('section');
  seccion.setAttribute('id', 'vantana__modal');
  seccion.setAttribute('class', 'modal__inicio');
  document.querySelector('main').appendChild(seccion);

  document.querySelector('#vantana__modal').innerHTML = 
  `<div class="modal__contenedor">
              <!--head -->
                <h3 class="modal__titulo">¡Resumen de compra!</h3>              
             <!--body-->             
              <div class="modal__cuerpo">
                <table class="">
                  <thead class="tabla__cabecera">
                    <tr>
                      <th class="info__compra">Info Compra</th>
                      <th class="info__compra">cantidad</th>
                      <th class="detalle__compra">Precio</th>
                      <th class="btn__eliminar"></th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                  <tfoot>
                    <tr>
                      
                    </tr>
                  </tfoot>                  
                </table>                
              </div>            
              <!--footer -->
              <div class="modal__cerrar">
                <button class="modal__boton cerrar__modal">Cerrar</button>
                <button class="modal__boton modal__comprar">Pagar</button>              
              </div>
            </div>`
};

const filtroProductoMostrar = () => {

  const lista = document.querySelectorAll(".elementoLi1 a");
  for (const item of lista) {
    item.addEventListener("click", (evt) => {
      const categoriaId = evt.currentTarget.getAttribute("value");
      arrayFiltrado = PRODUCTOS.filter((obj) => obj.categoria == categoriaId);
      mostrarArregloProductos(categoriaId);
    });
  }
};

const limpiarCargaProducto = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("cod").value = "";
  document.querySelector("select").value = "0";
  document.getElementById("floatingTextarea").value = "";
  document.getElementById("pre").value = "";
};

const mostrarArregloProductos = (categoriaId) => {

  if(categoriaId === undefined || categoriaId === '0'){
    document.getElementById(`listaProductos`).innerHTML = "";
          for (const objProd of PRODUCTOS) {
            crearTarjetaProducto(objProd);
          }
  } else {
      if (arrayFiltrado.length !== 0) {
        document.getElementById(`listaProductos`).innerHTML = "";
        for (const objFilt of arrayFiltrado) {
          crearTarjetaProducto(objFilt);
        }
      } else document.getElementById(`listaProductos`).innerHTML = "No hay Productos disponibles";
    }

};

const mostrarCompra = () => {
  const tablaCuerpo = document.querySelector("tbody");
  tablaCuerpo.innerHTML = "";
  const total = arrayCarrito.reduce((total, next) => (total += next.total), 0);

  for (const item of arrayCarrito) {    
    const tr = document.createElement("tr");
    const cuerpo = tablaCuerpo.appendChild(tr);
    cuerpo.innerHTML += `<td>${item.nombre} - $${item.precio}</td>
                        <td>${item.cantidad}</td>
                        <td>$${item.precio * item.cantidad}</td>
                        <td><button type="button" class="btn btn-outline-info" value="${item.id}" id="eliminarCompra">X</button></td>`;
  }
  const tfoot = document.querySelector("tfoot tr");
  tfoot.innerHTML = ` <td></td>
                        <td></td>
                        <td>TOTAL: ${total}</td> `;

  const quitarCompra = document.querySelectorAll('#eliminarCompra');
  for(const elemento of quitarCompra) 
  elemento.addEventListener('click', (evt) => {
    evt.preventDefault;
   eliminarCompra(`${evt.target.attributes.value.value}`);
  }); 
};

function crearNuevoProducto() {

  let cargarProducto = document.querySelector('#cargarProducto');  
  cargarProducto.addEventListener('click', (evt) => {  
    evt.preventDefault;
  
   const nombre = document.getElementById("nombre").value;
   let codigo = document.getElementById("cod").value;
   const categoria = document.querySelector("select").value;
   const descripcion = document.getElementById("floatingTextarea").value;
   const precio = parseFloat(document.getElementById("pre").value);
   codigo = categoria + codigo;
   let productoNuevo;

  (!isNaN(precio)) ? ((nombre != "" && codigo != "" && descripcion != "" && precio != "" && categoria != "0") ? (productoNuevo = new Producto(nombre,codigo,descripcion,precio,categoria),
      productoNuevo.cargarProductoNuevo(productoNuevo),
      botonCompra(),
      limpiarCargaProducto())
    : Swal.fire("No dejar ningun campo vacio"))
  :Swal.fire("Escribir un precio con este formato:$ 0.00");
   
  });
}

function botonCompra(){
  const compraNew = document.querySelectorAll('#chango');
  for(const elemento of compraNew)
  elemento.removeEventListener('click', cargarNuevaCompra);

  for(const elemento of compraNew)
  elemento.addEventListener('click', cargarNuevaCompra);  
}

function cargarNuevaCompra(evt) {
  let codigo = evt.target.attributes.value.value; 
  let cantidad = parseInt(document.getElementById(`cant${codigo}`).value);
  const compraNueva = new Compra(codigo, cantidad);
  compraNueva.cargarCompra(compraNueva);
  PRODUCTOS.filter(arregloCompra);
  cargaCarritoStorege(arrayCarrito);

  function arregloCompra(producto) {
    for (const item of arrayCarrito) {
      (item.id == producto.id) && 
        ((item.total = item.cantidad * producto.precio),
        (item.nombre = producto.nombre),
        (item.precio = producto.precio)
        )
    }
  };


}

function modal() {
  localStorage.getItem("carritoCompra") && (changoNav(), descargarCarritoStorage());
  mostrarModalCarrito();
  
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
    arrayCarrito = [];
    const chango = document.querySelector(".ocultar__chango");
    chango.classList.remove("mostrar--chango");
    modal.classList.remove("modal--show");
    localStorage.removeItem("carritoCompra");
  });
}

export function crearTarjetaProducto(productoNuevo) {
  let etiqueta = document.createElement("li");
  etiqueta.setAttribute("class", "elementoLi");
  etiqueta.setAttribute("id", `${productoNuevo.id}`);
  document.getElementById(`listaProductos`).appendChild(etiqueta);
  document.getElementById(
    `${productoNuevo.id}`
  ).innerHTML = `<div class="contenedorImgText">
              <div class="contenedorImagen">
                <img src="../img/${productoNuevo.id}.webp" alt="Legumbres" class="rounded-circle rounded-circle rounded-circle imagenStandar"/>
              </div>
              <div class="contenedorTexto">
                <h4>${productoNuevo.nombre}</h4>
                <p class="truncate">${productoNuevo.descripcion}.</p>
              </div> 
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#cod${productoNuevo.id}">Ver</button>
              </div>
            <!-- Modal -->
              <div class="modal fade" id="cod${productoNuevo.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <img src="../img/${productoNuevo.id}.webp" class="img-fluid rounded-start" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">${productoNuevo.nombre}</h5>
                              <p class="card-text">${productoNuevo.descripcion}.</p>
                              <p class="card-text"><small class="text-muted">Masala - Tienda ONLINE</small></p>
                              <div class="row gap-2 input-group mb-1">
                                <span class="col-sm-1 input-group-text">$</span>
                                <span class="col-sm-3 input-group-text" id="precio">${productoNuevo.precio}</span>
                                <span class="col-sm-5 input-group-text">Codigo:<span id="${productoNuevo.id}">${productoNuevo.id}</span></span>
                              </div>
                              <div class="row gap-2 input-group mb-1">
                                <input type="number" id="cant${productoNuevo.id}" class="col-sm-2 form-control" value="1" aria-label="Zip">
                                <span class="col-sm-5 input-group-text">Stock: infinit</span>                                    
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  
                    <!-- Footer -->                      
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary" id="chango" value="${productoNuevo.id}" data-bs-dismiss="modal">Comprar</button>
                    </div>
                  </div>
                </div>
              </div>
          </li>`;
}

export function changoNav() {
  const chango = document.querySelector(".ocultar__chango");
  chango.classList.add("mostrar--chango");  
}

function eliminarCompra(codigo) {  
  borrarStorageCompra();
  arrayCarrito = arrayCarrito.filter((item) => item.id != codigo);
  document.querySelector("#cantComp").innerHTML = arrayCarrito.length;
  cargaCarritoStorege(arrayCarrito);
  mostrarCompra();
  if (arrayCarrito.length === 0) {
    borrarStorageCompra();
    const chango = document.querySelector(".ocultar__chango");
    chango.classList.remove("mostrar--chango");
    const modal = document.querySelector("#vantana__modal");
    modal.classList.remove("modal--show");
  }
}

function cargaCarritoStorege(carrito) {
  const esJSON = JSON.stringify(carrito);
  localStorage.setItem("carritoCompra", esJSON);
}

function borrarStorageCompra() {
  localStorage.removeItem("carritoCompra");
}

function descargarCarritoStorage() {
  let descargaCarrito = localStorage.getItem("carritoCompra");
  descargaCarrito = JSON.parse(descargaCarrito);
  document.querySelector("#cantComp").innerHTML = descargaCarrito.length;

  arrayCarrito = descargaCarrito;
} 

modal();


window.location.pathname === "/index.html" && (promoMes(),toastCompra());
window.location.pathname === "/html/products.html" && (mostrarArregloProductos(),
filtroProductoMostrar(), crearNuevoProducto(), botonCompra());

window.location.pathname === "/coder-javascript/index.html" && (promoMes(),toastCompra());
window.location.pathname === "/coder-javascript/html/products.html" && (mostrarArregloProductos(),
filtroProductoMostrar(),crearNuevoProducto(), botonCompra());
 
