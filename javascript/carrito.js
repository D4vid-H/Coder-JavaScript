import { PRODUCTOS, arrayCarrito } from "../main.js";
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
  borrarStorageCompra();
  arrayCarrito.splice(
    arrayCarrito.findIndex((item) => item.id === codigo),
    1
  );
  document.querySelector("#cantComp").innerHTML = arrayCarrito.length;
  cargaCarritoStorege(arrayCarrito);
  mostrarCompra();
  arrayCarrito.length === 0 &&
    (borrarStorageCompra(),
    document
      .querySelector(".ocultar__chango")
      .classList.remove("mostrar--chango"),
    document.querySelector("#vantana__modal").classList.remove("modal--show"));
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
