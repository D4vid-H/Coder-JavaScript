import { changoNav, crearTarjetaProducto } from "../main.js";
import { PRODUCTOS, arrayCarrito, PRODUCTOSBORRADOS } from "./arrays.js";

export class Producto {
  constructor(nombre, codigo, descripcion, precio, categoria) {
    this.nombre = nombre;
    this.id = codigo;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.precio = precio;
  }
  cargarProductoNuevo(productoNuevo) {
    PRODUCTOS.length === 0 && PRODUCTOS.push(productoNuevo),
      crearTarjetaProducto(productoNuevo);
    PRODUCTOS.some((item) => item.id === productoNuevo.id)
      ? alert("Codigo Repetido")
      : PRODUCTOS.push(productoNuevo),
      crearTarjetaProducto(productoNuevo);
  }
  borrarProducto(producto) {
    const arrayAux = PRODUCTOS.splice(
      PRODUCTOS.findIndex((item) => item.id === producto.id),
      1
    );
    arrayAux.forEach((item) => PRODUCTOSBORRADOS.push(item));
  }
}

export class Compra {
  constructor(codigo, cantidad) {
    this.nombre;
    this.id = codigo;
    this.cantidad = cantidad;
    this.total;
    this.precio;
  }
  cargarCompra(compraNueva) {
    arrayCarrito.some(
      (element) =>
        element.id === compraNueva.id &&
        (element.cantidad += compraNueva.cantidad)
    ) ||
      (arrayCarrito.push(compraNueva),
      (document.querySelector("#cantComp").innerHTML = arrayCarrito.length),
      changoNav());
  }
}
