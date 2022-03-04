import { botonCompra } from './carrito.js';
import { Producto } from './class.js';

const limpiarCargaProducto = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("cod").value = "";
    document.querySelector("select").value = "0";
    document.getElementById("floatingTextarea").value = "";
    document.getElementById("pre").value = "";
};

export function crearNuevoProducto() {
    const cargarProducto = document.querySelector("#cargarProducto");
    cargarProducto.addEventListener("click", (evt) => {
      evt.preventDefault;
  
      const nombre = document.getElementById("nombre").value;
      let codigo = document.getElementById("cod").value;
      const categoria = document.querySelector("select").value;
      const descripcion = document.getElementById("floatingTextarea").value;
      const precio = parseFloat(document.getElementById("pre").value);
      codigo = categoria + codigo;
      let productoNuevo;
  
      !isNaN(precio)
        ? nombre != "" &&
          codigo != "" &&
          descripcion != "" &&
          precio != "" &&
          categoria != "0"
          ? ((productoNuevo = new Producto(
              nombre,
              codigo,
              descripcion,
              precio,
              categoria
            )),
            productoNuevo.cargarProductoNuevo(productoNuevo),
            botonCompra(),
            limpiarCargaProducto())
          : Swal.fire("No dejar ningun campo vacio")
        : Swal.fire("Escribir un precio con este formato:$ 0.00");
    });
}