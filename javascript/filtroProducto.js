import { crearTarjetaProducto } from "../main.js";
import { PRODUCTOS, FILTRADO } from "./arrays.js";
import { botonCompra } from "./carrito.js";

export const filtroProductoMostrar = () => {
  const lista = document.querySelectorAll(".elementoLi1 a");
  for (const item of lista) {
    item.addEventListener("click", (evt) => {
      const categoriaId = evt.currentTarget.getAttribute("value");
      PRODUCTOS.filter((obj) => obj.categoria === categoriaId).map((item) =>
        FILTRADO.push(item)
      );
      mostrarArregloProductos(categoriaId);
      botonCompra();
      FILTRADO.length = 0;
    });
  }
};

export const paginarProductos = async (arrayProductos) => {
  const cantPaginas = Math.ceil(arrayProductos.length / 20);

  for (let i = 1; i <= cantPaginas; i += 1) {
    document.querySelector(".pagination").innerHTML += `
      <li class="page-item"><a data-pagina="${i}" class="page-link">${i}</a></li>
      `;
  }

  const paginas = document.querySelectorAll(".pagination a");
  for (const page of paginas)
    page.addEventListener("click", (evt) => {
      evt.preventDefault;
      const page = evt.target.dataset.pagina;
      debugger;
      mostrarElementos(page, PRODUCTOS);
    });

  function mostrarElementos(page, arrayProductosDos) {
    switch (page) {
      case "1":
        document.getElementById(`listaProductos`).innerHTML = "";
        dibujopage(0, 19, arrayProductosDos);
        break;
      case "2":
        document.getElementById(`listaProductos`).innerHTML = "";
        dibujopage(20, 39, arrayProductosDos);
        break;
      case "3":
        document.getElementById(`listaProductos`).innerHTML = "";
        dibujopage(40, 59, arrayProductosDos);
        break;
      case "4":
        document.getElementById(`listaProductos`).innerHTML = "";
        dibujopage(60, 79, arrayProductosDos);
        break;
      case "5":
        document.getElementById(`listaProductos`).innerHTML = "";
        dibujopage(80, 99, arrayProductosDos);
        break;
      default:
        break;
    }
  }

  function dibujopage(inicio, fin, arregloProdDos) {
    for (let i = inicio; i <= fin; i += 1) {
      crearTarjetaProducto(arregloProdDos[i]);
    }
  }
};

export const mostrarArregloProductos = (categoriaId) => {
  categoriaId === undefined || categoriaId === "0"
    ? ((document.getElementById(`listaProductos`).innerHTML = ""),
      PRODUCTOS.forEach((objProd) => crearTarjetaProducto(objProd)))
    : FILTRADO.length !== 0
    ? ((document.getElementById(`listaProductos`).innerHTML = ""),
      FILTRADO.forEach((objFilt) => crearTarjetaProducto(objFilt)))
    : (document.getElementById(`listaProductos`).innerHTML =
        "No hay Productos disponibles");
};
