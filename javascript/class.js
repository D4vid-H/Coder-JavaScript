import {
  changoNav,
  crearTarjetaProducto,
  PRODUCTOS,
  arrayCarrito,
} from "../main.js";

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
    revisarCodigoProductoNuevo(PRODUCTOS, productoNuevo)
      ? alert("Codigo Repetido")
      : PRODUCTOS.push(productoNuevo),
      crearTarjetaProducto(productoNuevo);

    function revisarCodigoProductoNuevo(arregloProductos, productoNuevo) {
      for (const obj of arregloProductos) {
        if (obj.id === productoNuevo.id) {
          return true;
        }
      }
    }
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
    arrayCarrito.some((element) => element.id === compraNueva.id)
      ? sumarCompra(compraNueva)
      : (arrayCarrito.push(compraNueva),
        (document.querySelector("#cantComp").innerHTML = arrayCarrito.length),
        changoNav());

    function sumarCompra(compraNueva) {
      for (const item of arrayCarrito) {
        item.id == compraNueva.id && (item.cantidad += compraNueva.cantidad);
      }
    }
  }
}
