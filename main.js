const PRODUCTOS = [{nombre: 'Semillas', codigo: '1', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?', cantidad: 100, precio: 23}, 
                  {nombre: 'Especias', codigo: '2', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?', cantidad: 33, precio: 55},
                  {nombre: 'Legumbres', codigo: '3', descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, exercitationem?', cantidad: 200, precio: 74}];

const CARRITO = [];

class Producto{
  constructor(nombre, codigo, descripcion, cantidad, precio){
    this.nombre = nombre;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
    this.descuento;
  }
  actualizarCantidad(stock) {this.cantidad - stock};
  eliminarObjeto(stock) {};

}

class Compra{
  constructor(codigo, cantidad){
    this.nombre;
    this.codigo = codigo;
    this.cantidad = cantidad;
    this.total;
    this.precio;
    //calcularTotal(cant) {return cant.reduce(total, this.precio), 0};
  }
    
}

ScrollReveal().reveal('.elementoLi' , {delay: 500, reset: true});

function clikCompra(){

  let toastLiveExample = document.getElementById('liveToast')
  let toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

const limpiar = () => {
document.getElementById("nombre").value = "";
document.getElementById("cod").value = "";
document.getElementById("stock").value = "";
document.getElementById("floatingTextarea").value = "";
document.getElementById("pre").value ="";
}

const cargarArrayProducto = () => {
  for (const cargado of PRODUCTOS){
  crearTarjetaProducto(cargado);
}};

function nuevoProducto() {

      let nombre = document.getElementById("nombre").value;
      let codigo = document.getElementById("cod").value;
      let cantidad = parseInt(document.getElementById("stock").value);
      let descripcion = document.getElementById("floatingTextarea").value;
      let precio = parseFloat(document.getElementById("pre").value);

  if(!isNaN(cantidad) && !isNaN(precio)){
    if((nombre != "") && (codigo != "") && (cantidad != "") && (descripcion != "") && (precio != "")){
        const productoNuevo = new Producto(nombre, codigo, descripcion, cantidad, precio);
        cargarProducto(productoNuevo);
    }else {alert("No dejar ningun campo vacio");}      
    
  }else {alert("Escribir un precio con este formato: 0.00");}
  limpiar();
}

function cargarProducto(nuevoProd){
  
  if(PRODUCTOS.length == 0){
    PRODUCTOS.push(nuevoProd); 
    crearTarjetaProducto(nuevoProd);
    }else if(revisarCodigoProd(PRODUCTOS, nuevoProd)){ 
      alert("Codigo Repetido");
    }else{
      PRODUCTOS.push(nuevoProd);
      crearTarjetaProducto(nuevoProd);
    }
}

const revisarCodigoProd = (arreglo, nuevoProd) => {

  for(const obj of arreglo){

    if(obj.codigo === nuevoProd.codigo){
      return true;
    } 
  }
}

function nuevaCompra(codigo){

  let cantidad = parseInt(document.getElementById(`cant${codigo}`).value);

  const compraNueva = new Compra(codigo, cantidad);
    CARRITO.push(compraNueva);
}

const mostrarCompra = () => {

    const compraTotal = carritoLleno();
    const tablaCuerpo = document.querySelector('tbody');
    tablaCuerpo.innerHTML = "";
    
    const total = CARRITO.reduce((total, next) => total += next.total, 0);
    
    for (const item of CARRITO){
      const tr = document.createElement('tr');
      const uno = tablaCuerpo.appendChild(tr);
      uno.innerHTML += `<td>${item.nombre} - $${item.precio}</td>
                        <td>${item.cantidad}</td>
                        <td>$${item.precio * item.cantidad}</td>`;                     
    }  
    const tfoot = document.querySelector('tfoot tr');
    tfoot.innerHTML = ` <td></td>
                        <td></td>
                        <td>TOTAL: ${total}</td> `;
}

function modal(){

 /* mostrarCompra(); */

  const abrirModal = document.querySelector('.lanzar__modal');
  const cerrarModal = document.querySelector('.cerrar__modal');
  const modal = document.querySelector('#vantana__modal');
  
  
  abrirModal.addEventListener('click', (e)=>{
    e.preventDefault(); 
    mostrarCompra();
    modal.classList.add('modal--show');
  });
  
  cerrarModal.addEventListener('click', (e)=>{
    e.preventDefault(); 
    modal.classList.remove('modal--show');
  });

}

const carritoLleno = () => {  
 
    const nuevoArreglo = PRODUCTOS.filter(arregloCompra);
  
    return nuevoArreglo;
}

function arregloCompra(objeto){   
    for(const item of CARRITO){
      if(item.codigo == objeto.codigo){
          item.total = item.cantidad * objeto.precio;
          item.nombre = objeto.nombre;
          item.precio = objeto.precio;
        return true;
      }
    }
}

cargarArrayProducto();
modal();

function crearTarjetaProducto(prod) {

  let etiqueta = document.createElement("li");
  etiqueta.setAttribute("class", "elementoLi");
  etiqueta.setAttribute("id", `${prod.codigo}`);
  document.getElementById(`listaProductos`).appendChild(etiqueta);
  document.getElementById(`${prod.codigo}`).innerHTML =
          `<div class="contenedorImgText">
              <div class="contenedorImagen">
                <img src="../img/${prod.codigo}.webp" alt="Legumbres" class="rounded-circle rounded-circle rounded-circle imagenStandar"/>
              </div>
              <div class="contenedorTexto">
                <h4>${prod.nombre}</h4>
                <p>${prod.descripcion}.</p>
              </div> 
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#cod${prod.codigo}">Ver</button>
              </div>
            <!-- Modal -->
              <div class="modal fade" id="cod${prod.codigo}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <img src="../img/${prod.codigo}.webp" class="img-fluid rounded-start" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">${prod.nombre}</h5>
                              <p class="card-text">${prod.descripcion}.</p>
                              <p class="card-text"><small class="text-muted">Masala - Tienda ONLINE</small></p>
                              <div class="row gap-2 input-group mb-1">
                                <span class="col-sm-1 input-group-text">$</span>
                                <span class="col-sm-4 input-group-text" id="precio">${prod.precio}</span>
                                <span class="col-sm-4 input-group-text">Codigo:<span id="${prod.codigo}">${prod.codigo}</span></span>
                              </div>
                              <div class="row gap-2 input-group mb-1">
                                <input type="number" id="cant${prod.codigo}" class="col-sm-2 form-control" value="1" aria-label="Zip">
                                <span class="col-sm-5 input-group-text">Stock: ${prod.cantidad}</span>                                    
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  
                    <!-- Footer -->                      
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary" onclick="nuevaCompra(${prod.codigo})" data-bs-dismiss="modal">Comprar</button>
                    </div>
                  </div>
                </div>
              </div>
          </li>`;     
}

