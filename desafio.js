function reset() {
  location.reload();
}

function repetir(numero) {
  for (let i = 0; i < numero; i += 1) {
    let etiqueta = document.createElement("span");
    etiqueta.setAttribute(
      "class",
      "flex items-center justify-center justify-self-center self-center w-5 bg-[#e81a0d] text-white rounded-full text-center"
    );
    let text = document.createTextNode(" X ");
    etiqueta.appendChild(text);
    document.getElementById("mostrarResult").appendChild(etiqueta);
  }

  for (let a = 0; a < numero - 2; a += 1) {
    let etiqueta = document.createElement("span");
    etiqueta.setAttribute(
      "class",
      "flex items-center justify-center justify-self-center self-center w-5 bg-[#e81a0d] text-white rounded-full text-center"
    );
    let text = document.createTextNode(" X ");
    etiqueta.appendChild(text);
    document.getElementById("mostrarResult").appendChild(etiqueta);
    for (let b = 0; b < numero - 2; b += 1) {
      let etiqueta = document.createElement("span");
      etiqueta.setAttribute(
        "class",
        "flex items-center justify-center justify-self-center self-center w-5 bg-[#e81a0d] text-white rounded-full text-center"
      );
      let text = document.createTextNode(" ");
      etiqueta.appendChild(text);
      document.getElementById("mostrarResult").appendChild(etiqueta);
    }
    let etiquetaFin = document.createElement("span");
    etiquetaFin.setAttribute(
      "class",
      "flex items-center justify-center justify-self-center self-center w-5 bg-[#e81a0d] text-white rounded-full text-center"
    );
    let textFin = document.createTextNode(" X ");
    etiquetaFin.appendChild(textFin);
    document.getElementById("mostrarResult").appendChild(etiquetaFin);
  }

  for (let j = 0; j < numero; j += 1) {
    let etiqueta = document.createElement("span");
    etiqueta.setAttribute(
      "class",
      "flex items-center justify-center justify-self-center self-center w-5 bg-[#e81a0d] text-white rounded-full text-center"
    );
    let text = document.createTextNode(" X ");
    etiqueta.appendChild(text);
    document.getElementById("mostrarResult").appendChild(etiqueta);
  }
}

function ejecutar() {
  let opcion = parseInt(
    prompt(
      "Ingrese una el numero de la opcion: 1_N° Primos ; 2_ Tabla de multiplicar ; 3_ Dibuje un cuadro"
    )
  );

  if (opcion == 1 || opcion == 2 || opcion == 3) {
    switch (opcion) {
      case 1: {
        let cantidad = parseInt(
          prompt("Ingrese hasta que N° quiere saber los N° Primos que hay: ")
        );
        let etiquetaFrame = document.createElement("div");
        etiquetaFrame.setAttribute(
          "class",
          "grid justify-self-start self-center row-start-2 row-span-3 col-start-3 col-span-2 grid-cols-10 justify-self-start gap-1 mb-3 bg-sky-400 auto-rows-auto h-1/1 w-1/1 container shadow-lg shadow-black rounded-2xl border-l-black-300"
        );
        etiquetaFrame.setAttribute("id", "mostrarResult");
        document.getElementById("frame").appendChild(etiquetaFrame);

        let etiqueta = document.createElement("p");
        let text = document.createTextNode("N° Primos hasta: " + cantidad);
        etiqueta.setAttribute(
          "class",
          "text-black text-center underline text-xl font-semibold tracking-wide"
        );
        etiqueta.appendChild(text);
        document.getElementById("mostrar").appendChild(etiqueta);

        if (cantidad != 0 && cantidad != 1) {
          for (let i = 2; i <= cantidad; i += 1) {
            for (let j = 2; j <= cantidad; j += 1)
              if (i % j == 0) {
                if (j == i) {
                  let etiqueta = document.createElement("span");
                  etiqueta.setAttribute(
                    "class",
                    "bg-[#e81a0d] text-white rounded-full text-center"
                  );
                  let text = document.createTextNode("N°: " + i);
                  etiqueta.appendChild(text);
                  document
                    .getElementById("mostrarResult")
                    .appendChild(etiqueta);
                } else {
                  let etiqueta = document.createElement("span");
                  etiqueta.setAttribute(
                    "class",
                    "bg-[#FFFFFF] text-black rounded-full text-center"
                  );
                  let text = document.createTextNode("N°: " + i);
                  etiqueta.appendChild(text);
                  document
                    .getElementById("mostrarResult")
                    .appendChild(etiqueta);
                  break;
                }
                break;
              }
          }
        }

        break;
      }

      case 2: {
        let multiplo = parseInt(prompt("Ingrese el numero a multipliar: "));

        let etiquetaFrame = document.createElement("div");
        etiquetaFrame.setAttribute(
          "class",
          "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 grid-cols-1 auto-rows-auto justify-self-start bg-sky-400 h-1/1 w-1/1 container shadow-lg shadow-black rounded-2xl border-l-black-300"
        );
        etiquetaFrame.setAttribute("id", "mostrarResult");
        document.getElementById("frame").appendChild(etiquetaFrame);

        let etiqueta = document.createElement("p");
        let text = document.createTextNode("Multiplos del N°: " + multiplo);
        etiqueta.setAttribute(
          "class",
          "text-black text-center h-20 underline text-xl font-semibold tracking-wide"
        );
        etiqueta.appendChild(text);
        document.getElementById("mostrar").appendChild(etiqueta);

        for (let i = 0; i <= 10; i += 1) {
          let etiqueta = document.createElement("span");
          etiqueta.setAttribute(
            "class",
            "flex items-center justify-center justify-self-center self-center h-10 w-52 my-2 bg-[#e81a0d] text-white rounded-full text-center"
          );
          let text = document.createTextNode(
            "N°: " + multiplo + " X " + i + " = " + multiplo * i
          );
          etiqueta.appendChild(text);
          document.getElementById("mostrarResult").appendChild(etiqueta);
        }
        break;
      }

      default: {
        const cuadro = parseInt(
          prompt("Ingrese largo para un cuadrado del 1 al 10: ")
        );

        if (cuadro >= 2 && cuadro <= 10) {
          let etiquetatitel = document.createElement("p");
          let texttitel = document.createTextNode(
            "Cuadro de tamaño: " + cuadro
          );
          etiquetatitel.setAttribute(
            "class",
            "text-black text-center h-20 underline text-xl font-semibold tracking-wide"
          );
          etiquetatitel.appendChild(texttitel);
          document.getElementById("mostrar").appendChild(etiquetatitel);

          switch (cuadro) {
            case 2: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-2 grid-rows-2 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }

            case 3: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-3 grid-rows-3 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
            case 4: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-4 grid-rows-4 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
            case 5: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-5 grid-rows-5 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
            case 6: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-6 grid-rows-6 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
            case 7: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-7 grid-rows-7 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
            case 8: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-8 grid-rows-8 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
            case 9: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-9 grid-rows-9 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
            default: {
              let etiquetaFrame = document.createElement("div");
              etiquetaFrame.setAttribute(
                "class",
                "grid justify-self-start self-center row-start-2 row-span-3 col-start-2 col-span-3 grid-cols-10 grid-rows-10 justify-self-start gap-1 mb-3 bg-sky-400 h-1/1 w-1/1 shadow-lg shadow-black rounded-2xl border-l-black-300"
              );
              etiquetaFrame.setAttribute("id", "mostrarResult");
              document.getElementById("frame").appendChild(etiquetaFrame);

              repetir(cuadro);

              break;
            }
          }
        } else {
          alert("No ingreso una opcion valida.");
        }
      }
    }
  } else {
    alert("No ingreso una opcion valida.");
  }
}
