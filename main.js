const PRODUCTOS = [{nombre: 'tomate', codigo: '1', descripcion: 'Verdura con pulpa y semillas.', cantidad: 100, precio: 23}, 
                  {nombre: 'lechuga', codigo: '2', descripcion: 'verdura de hoja.', cantidad: 33, precio: 55},
                  {nombre: 'zapallo', codigo: '3', descripcion: 'Verdura para locro.', cantidad: 200, precio: 74}];
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
    this.codigo = codigo;
    this.cantidad = cantidad;
    this.total;
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
document.getElementById("precio").value ="";
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
/*   hacer(); */
  limpiar();
}

function cargarProducto(Nuevoprod){
  
  if(PRODUCTOS.length == 0){
    PRODUCTOS.push(Nuevoprod); 
    crearTarjetaProducto(Nuevoprod);
    }else if(revisarCodigoProd(PRODUCTOS, Nuevoprod)){ 
      alert("Codigo Repetido");
    }else{
      PRODUCTOS.push(Nuevoprod);
      crearTarjetaProducto(Nuevoprod);
    }
}

const revisarCodigoProd = (arreglo, nuevoProd) => {

  for(const obj of arreglo){

    if(obj.codigo === nuevoProd.codigo){
      return true;
    } 
  }
}

function nuevaCompra(prod){

  let codigo = prod;
  let cantidad = parseInt(document.getElementById(`cant${prod}`).value);

  const compraNueva = new Compra(codigo, cantidad);
    CARITTO.push(compraNueva);
}

/* function hacer(){

const buscar = (prod) => prod.nombre;

const nuevoVector = PRODUCTOS.map(buscar);

console.log(nuevoVector);
}
 */

const carritoLleno = () => {  
 
    const nuevoArreglo = PRODUCTOS.filter(arregloCompra);
    
    return nuevoArreglo;
}

function arregloCompra(objeto){   
    for(const item of CARITTO){
      if(item.codigo == objeto.codigo){
          item.total = item.cantidad * objeto.precio;
        return true;
      }
    }
}

cargarArrayProducto();

const abrirModal = document.querySelector('.lanzar__modal');
const cerrarModal = document.querySelector('.cerrar__modal');
const modal = document.querySelector('#vantana__modal');


abrirModal.addEventListener('click', (e)=>{
  e.preventDefault(); 
  modal.classList.add('modal--show');
});

cerrarModal.addEventListener('click', (e)=>{
  e.preventDefault(); 
  modal.classList.remove('modal--show');
});

function crearTarjetaProducto(prod) {

  let etiqueta = document.createElement("li");
  etiqueta.setAttribute("class", "elementoLi");
  etiqueta.setAttribute("id", `${prod.codigo}`);
  document.getElementById(`listaProuctos`).appendChild(etiqueta);
  document.getElementById(`${prod.codigo}`).innerHTML =
          `<div class="contenedorImgText">
              <div class="contenedorImagen">
                <img src="../img/${prod.codigo}.webp" alt="Legumbres" class="rounded-circle rounded-circle rounded-circle imagenStandar"/>
              </div>
              <div class="contenedorTexto">
                <h4>legumbres</h4>
                <p>Encontra lo que estas buscando.</p>
              </div> 
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#${prod.nombre}">Ver</button>
              </div>
            <!-- Modal -->
              <div class="modal fade" id="${prod.nombre}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">${prod.nombre}</h5>
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
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">${prod.descripcion}.</p>
                              <p class="card-text"><small class="text-muted">Masala - Tienda ONLINE</small></p>
                              <div class="row gap-2 input-group mb-1">
                                <span class="col-sm-1 input-group-text">$</span>
                                <span class="col-sm-4 input-group-text" id="precio">${prod.precio}</span>
                                <span class="col-sm-4 input-group-text">Codigo:<span id="${prod.codigo}">${prod.codigo}</span></span>
                              </div>
                              <div class="row gap-2 input-group mb-1">
                                <input type="number" id="cant${prod.codigo}" class="col-sm-2 form-control" placeholder="0" aria-label="Zip">
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
                      <button type="button" class="btn btn-primary" onclick="nuevaCompra(${prod.codigo})">Comprar</button>
                    </div>
                  </div>
                </div>
              </div>
          </li>`;     
}

