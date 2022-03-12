import { toastCompra, promoMes,cargarCategorias} from "./javascript/app.js";
import { descargarCarritoStorage } from "./javascript/localStorage.js";
import {
  filtroProductoMostrar,
} from "./javascript/filtroProducto.js";
import { botonCompra, mostrarCompra } from "./javascript/carrito.js";
import { crearNuevoProducto, selectOpc, cargarJSON } from "./javascript/producto.js";
import { arrayCarrito, CATEGORIAS, PRODUCTOS } from "./javascript/arrays.js";



const mostrarModalCarrito = () => {
  const seccion = document.createElement("section");
  seccion.setAttribute("id", "vantana__modal");
  seccion.setAttribute("class", "modal__inicio");
  document.querySelector("main").appendChild(seccion);

  document.querySelector(
    "#vantana__modal"
  ).innerHTML = `<div class="modal__contenedor">
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
            </div>`;
};

function modal() {
  localStorage.getItem("carritoCompra") &&
    (changoNav(), descargarCarritoStorage());
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
    arrayCarrito.forEach(() => arrayCarrito.shift()); 
    const chango = document.querySelector(".ocultar__chango");
    chango.classList.remove("mostrar--chango");
    abrirModal.classList.remove("habilitar__modal");
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
  document.querySelector(".ocultar__chango").classList.add("mostrar--chango");
  document.querySelector(".lanzar__modal").classList.add("habilitar__modal");
}

modal();

const arrayPath = window.location.pathname.split("/");
arrayPath[arrayPath.length - 1] === "index.html" && (promoMes(), toastCompra());
arrayPath[arrayPath.length - 1] === "products.html" &&
  (cargarJSON(PRODUCTOS),
  selectOpc(CATEGORIAS),
  cargarCategorias(CATEGORIAS),
  filtroProductoMostrar(),
  crearNuevoProducto(),
  botonCompra(),
  ScrollReveal().reveal(".elementoLi", { delay: 500, reset: true })
  );

 