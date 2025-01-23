// Este constcódigo permite que, al hacer clic en una imagen, el valor del input asociado se incremente de 1 en 1, 
// y al superar el valor 5, regrese a 0.

// Creamos arreglos para guardar las referencias de las imágenes (botones) e inputs
const incrementos = [];
const valorInput = [];

for (let i = 1; i <= 34; i++) {
  
  incrementos.push(document.getElementById(`incremento${i}`));
  valorInput.push(document.getElementById(`cantidad${i}`));

}

// Asignamos el evento a cada imagen
incrementos.forEach((cantidad, index) => {
  let valor = 0; // Cada input tiene su propio valor independiente
  cantidad.addEventListener("click", () => {
    valor++; // Incrementamos el contador
    if (valor > 5) {
      valor = 0; // Reiniciamos si supera 10
    }
    valorInput[index].value = valor; // Asignamos el valor al input correspondiente
  });
});

//Funcion de boton para hacer el calculo de cantidades y precios
document.getElementById("ordenaAqui").addEventListener("click", function () {
  const orderData = [];
  let total = 0;
  let hasSelection = false;
  const coment = document.getElementById(`comentarios`).value || "Sin comentarios";
  const toping = document.getElementById(`toping`).value;

  for (let i = 1; i < 10; i++) {
    const cantidadElement = document.getElementById(`cantidad${i}`);
    const precioElement = document.getElementById(`precio${i}`);
    const articuloElement = document.getElementById(`articulo${i}`);
    const tipoCervezaElement = document.getElementById(`tipoCerveza${i}`);
    const tipoEscarchadoElement = document.getElementById(`tipoEscarchado${i}`);
    
    const cantidadInt = parseInt(cantidadElement.value, 10) || 0;
    const precioInt = parseFloat(precioElement.innerText.replace("$", "").trim()) || 0;
    
    if (cantidadInt > 0) {
      
      hasSelection = true;
      orderData.push({
        cantidad: cantidadInt,
        articulo: articuloElement.textContent,
        tipoCerveza: tipoCervezaElement.value,
        tipoEscarchado: tipoEscarchadoElement.value,
        precio: precioInt,
      });
      total += cantidadInt * precioInt;
    }
  }

  if (!hasSelection) {
    alert("Selecciona un producto");
    return;
  }

  const formData = {
    orderData,
    coment,
    total,
    toping,
  };

  if (JSON.stringify(formData).length < 5000) {
    sessionStorage.setItem("formData", JSON.stringify(formData));
    window.location.href = "InformeOrden.html";
  } else {
    alert("Demasiados datos para almacenar en sessionStorage");
  }
});
 


