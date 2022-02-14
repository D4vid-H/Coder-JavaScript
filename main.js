const PRODUCTOS = [];
const CARITTO = [];

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
  hacer();
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

function crearTarjetaProducto(prod) {

      let etiqueta = document.createElement("li");
      etiqueta.setAttribute("class", "elementoLi");
      etiqueta.setAttribute("id", `${prod.codigo}`);
      document.getElementById(`listaProuctos`).appendChild(etiqueta);
      document.getElementById(`${prod.codigo}`).innerHTML =
              `<div class="contenedorImgText">
                  <div class="contenedorImagen">
                    <img
                      src="../img/${prod.codigo}.webp"
                      alt="Legumbres"
                      class="rounded-circle rounded-circle rounded-circle imagenStandar"
                    />
                  </div>
                  <div class="contenedorTexto">
                    <h4>legumbres</h4>
                    <p>Encontra lo que estas buscando.</p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-success" 
                    data-bs-toggle="modal" 
                    data-bs-target="#${prod.nombre}"                   
                  >
                    Ver
                  </button>
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
                                    <span class="col-sm-4 input-group-text">Codigo:<span id="codigo">${prod.codigo}</span></span>
                                  </div>
                                  <div class="row gap-2 input-group mb-1">
                                    <input type="number" id="cantidad" class="col-sm-2 form-control" placeholder="0" aria-label="Zip">
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
                          <button type="button" class="btn btn-primary" onclick="nuevaCompra()">Comprar</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </li>`;     
}

function nuevaCompra(){

  let codigo = document.getElementById("codigo").innerHTML;
  let cantidad = parseInt(document.getElementById("cantidad").value);
//  let precio = parseFloat(document.getElementById("precio").innerHTML);
  const compraNueva = new Compra(codigo, cantidad, precio);
    CARITTO.push(compraNueva);
}

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
    calcularTotal(cant) {return cant.reduce(total, this.precio), 0};
  }
    aplicarDescuento() {};
}

function hacer(){

const buscar = (prod) => prod.nombre;

const nuevoVector = PRODUCTOS.map(buscar);

console.log(nuevoVector);
}

const carritoLleno = () => { 

CARITTO.forEach(() => {})

  for (const objCarro of CARITTO){
  let codigo;
    codigo = objCarro.codigo;
    for (const objProd of PRODUCTOS){
      if(codigo === objProd.codigo){
        return objProd.precio;
        }  
      }
  }

}
