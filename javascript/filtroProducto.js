import { crearTarjetaProducto } from "../main.js";
import { PRODUCTOS, FILTRADO, PAGINADO} from "./arrays.js";
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

/* export const Paginacion = () =>{
  document.querySelectorAll('.page-item .page-link').forEach(element => element.addEventListener('click', (evt) => {
  
    const pagina = parseInt(evt.target.attributes.value.value);
    const nPag = evt.target.innerHTML;

    switch (nPag){

      case '1':
        PRODUCTOS.filter((element, index) => index < pagina).map(item => PAGINADO.push(item));
        break;
      case '2':
        PRODUCTOS.filter((element, index) => (index+=20) < pagina).map(item => PAGINADO.push(item));
        break;
      case '3':
        PRODUCTOS.filter((element, index) => index < pagina).map(item => PAGINADO.push(item));
        break;
      default:
        break;
    }

  }));
  


}; */