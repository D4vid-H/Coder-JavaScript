export function toastCompra() {
    const clickCompra = document.querySelectorAll('#liveToastBtn')
    
    for(const item of clickCompra){ 
    item.addEventListener('click', (evt) => {
  
    let toastLiveExample = document.getElementById("liveToast");
    let toast = new bootstrap.Toast(toastLiveExample);
  
    const hora = new Date();
    const mes = hora.getMonth() + 1;
  
    document.querySelector(".toast-header small").innerHTML = `${hora.getDate()}/${mes}/${hora.getFullYear()} - ${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;
    toast.show();
    });
  }
  }
  
export const promoMes = () =>{
    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    let date = new Date();
    const mes = meses[date.getMonth()];
    document.querySelector(".textMarca").innerHTML = `${mes}`;
  }