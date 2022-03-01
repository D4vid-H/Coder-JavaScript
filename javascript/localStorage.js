import { arrayCarrito } from '../main.js'


export function cargaCarritoStorege(carrito) {
    localStorage.setItem("carritoCompra", JSON.stringify(carrito));
  }
  
export function borrarStorageCompra() {
    localStorage.removeItem("carritoCompra");
  }
  
export function descargarCarritoStorage() {
    JSON.parse(localStorage.getItem("carritoCompra")).forEach(item => arrayCarrito.push(item));
    document.querySelector("#cantComp").innerHTML = arrayCarrito.length;
  }