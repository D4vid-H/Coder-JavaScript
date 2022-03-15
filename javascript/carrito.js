import { PRODUCTOS, arrayCarrito } from "./arrays.js";
import { borrarStorageCompra, cargaCarritoStorege } from "./localStorage.js";
import { Compra } from "./class.js";

export function cargarNuevaCompra(evt) {
  const codigo = evt.target.attributes.value.value;
  const cantidad = parseInt(document.getElementById(`cant${codigo}`).value);
  const compraNueva = new Compra(codigo, cantidad);
  compraNueva.cargarCompra(compraNueva);
  PRODUCTOS.forEach(arregloCompra);
  cargaCarritoStorege(arrayCarrito);

  function arregloCompra(producto) {
    for (const item of arrayCarrito) {
      item.id == producto.id &&
        ((item.total = item.cantidad * producto.precio),
        (item.nombre = producto.nombre),
        (item.precio = producto.precio));
    }
  }
}

export const mostrarCompra = () => {
  document.querySelector("tbody").innerHTML = "";
  const total = arrayCarrito.reduce((total, next) => (total += next.total), 0);

  for (const item of arrayCarrito) {
    const tr = document.createElement("tr");
    const cuerpo = document.querySelector("tbody").appendChild(tr);
    cuerpo.innerHTML += `<td>${item.nombre} - $${item.precio}</td>
                          <td>${item.cantidad}</td>
                          <td>$${item.precio * item.cantidad}</td>
                          <td><button type="button" class="btn btn-outline-info" value="${
                            item.id
                          }" id="eliminarCompra">X</button></td>`;
  }
  document.querySelector("tfoot tr").innerHTML = ` <td></td>
                          <td></td>
                          <td>TOTAL: ${total}</td> `;

  const quitarCompra = document.querySelectorAll("#eliminarCompra");
  for (const elemento of quitarCompra)
    elemento.addEventListener("click", (evt) => {
      evt.preventDefault;
      eliminarCompra(`${evt.target.attributes.value.value}`);
    });
};

export function eliminarCompra(codigo) {
  const chango = document.querySelector(".ocultar__chango");
  borrarStorageCompra();
  arrayCarrito.splice(
    arrayCarrito.findIndex((item) => item.id === codigo),
    1
  );
  arrayCarrito.length !== 0 &&
    (document.querySelector("#cantComp").innerHTML = arrayCarrito.length);
  cargaCarritoStorege(arrayCarrito);
  mostrarCompra();
  arrayCarrito.length === 0 &&
    (borrarStorageCompra(),
    document
      .querySelector(".lanzar__modal")
      .classList.remove("habilitar__modal"),
    document.querySelector("#vantana__modal").classList.remove("modal--show"),
    chango.classList.remove("mostrar--chango"));
}

export function botonCompra() {
  document
    .querySelectorAll("#chango")
    .forEach((elemento) =>
      elemento.removeEventListener("click", cargarNuevaCompra)
    );
  document
    .querySelectorAll("#chango")
    .forEach((elemento) =>
      elemento.addEventListener("click", cargarNuevaCompra)
    );
}
