import { crearTarjetaProducto } from "../main.js";
import { PRODUCTOS, arrayFiltrado } from "./arrays.js";

export const filtroProductoMostrar = () => {
  const lista = document.querySelectorAll(".elementoLi1 a");
  for (const item of lista) {
    item.addEventListener("click", (evt) => {
      const categoriaId = evt.currentTarget.getAttribute("value");
      PRODUCTOS.filter((obj) => obj.categoria === categoriaId).forEach((item) =>
        arrayFiltrado.push(item)
      );
      mostrarArregloProductos(categoriaId);
      arrayFiltrado.forEach(() => arrayFiltrado.shift());
    });
  }
};
export const mostrarArregloProductos = (categoriaId) => {
  categoriaId === undefined || categoriaId === "0"
    ? ((document.getElementById(`listaProductos`).innerHTML = ""),
      PRODUCTOS.forEach((objProd) => crearTarjetaProducto(objProd)))
    : arrayFiltrado.length !== 0
    ? ((document.getElementById(`listaProductos`).innerHTML = ""),
      arrayFiltrado.forEach((objFilt) => crearTarjetaProducto(objFilt)))
    : (document.getElementById(`listaProductos`).innerHTML =
        "No hay Productos disponibles");
};
