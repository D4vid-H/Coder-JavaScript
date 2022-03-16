export function toastCompra() {
  dibujarToast();
  const clickCompra = document.querySelectorAll("#liveToastBtn");

  for (const item of clickCompra) {
    item.addEventListener("click", (evt) => {
      const toastLiveExample = document.getElementById("liveToast");
      const toast = new bootstrap.Toast(toastLiveExample);

      const fecha = new Date();
      const mes = fecha.getMonth() + 1;

      document.querySelector(
        ".toast-header small"
      ).innerHTML = `${fecha.getDate()}/${mes}/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
      toast.show();
    });
  }
}

export const promoMes = () => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const mes = meses[new Date().getMonth()];
  document.querySelector(".textMarca").innerHTML = `${mes}`;
};

function dibujarToast() {
  document.querySelector("#contenToast").innerHTML = `
                  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                      <div class="toast-header">
                        <img src="img/marca2.webp" class="rounded me-2" alt="logotipo" width="50"/>
                        <strong class="me-auto">Ecotienda.</strong>
                        <small>11 mins ago</small>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="toast"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="toast-body text-dark">
                        ¡Gracias por tu compra!.
                      </div>
                    </div>
                  </div>`;
}

export const cargarCategorias = (categorias) => {
  const listaUl = document.querySelector("#listaUl");

  categorias.forEach(({ id, nombre }) => {
    listaUl.innerHTML += `
    <li class="elementoLi1">
    <a value="${id}">${nombre}</a>
    </li>`;
  });
};

