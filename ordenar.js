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

  let extra = [21,23,24,25].map(i=>({
    id: `articulo${i}`,
    extra: document.getElementById(`extra${i}`)?.value || ""
  }));


  //Este bucle guarda la informacion de las miches que está seleccionando el cliente para ordenar
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

    //Este bucle guarda la informacion de los litros que está seleccionando el cliente para ordenar
  for (let i = 10; i < 16; i++) {
    const cantidadElement = document.getElementById(`cantidad${i}`);
    const articuloElement = document.getElementById(`articulo${i}`);
    const tamano = parseFloat(document.getElementById(`tamano${i}`).value.replace("$","").trim() ||0);
    
    const cantidadInt = parseInt(cantidadElement.value, 10) || 0;
    
    
    if (cantidadInt > 0) {
      
      hasSelection = true;
      orderData.push({
        cantidad: cantidadInt,
        articulo: articuloElement.textContent,
        tamano: tamano,
        precio: tamano,
      });
      total += cantidadInt * tamano;
    }
  }

  //Este for recopila la información de la comida y la guarda en el array orderData
  for (let i = 16; i < 26; i++) {
    const cantidadElement = document.getElementById(`cantidad${i}`);
    const articuloElement = document.getElementById(`articulo${i}`);
    const precioElement = document.getElementById(`precio${i}`);
    
    const cantidadInt = parseInt(cantidadElement.value, 10) || 0;
    const precio = parseFloat(precioElement.innerText.replace("$", "").trim()) || 0;
    
    
    if (cantidadInt > 0) {
      
      hasSelection = true;
      orderData.push({
        cantidad: cantidadInt,
        articulo: articuloElement.textContent,
        precio: precio,
        id: `articulo${i}`
      });
      total += cantidadInt * precio;
    }
  }

  //Este for es para guardar las promociones seleccionadas y sacar el detalle completo
  for (let i = 26; i < 30; i++) {
    const cantidadElement = document.getElementById(`cantidad${i}`);
    const articuloElement = document.getElementById(`articulo${i}`);
    let precio = 0;
    let articulo2 = "";
    let cantidadArtic = 0;
    
    
    const cantidadInt = parseInt(cantidadElement.value, 10) || 0;
    
    if(document.getElementById(`articulo${i}`)=== document.getElementById("articulo26")){
      articuloElement.value = "Promo JUEVEBES";
      precio = 140;
      articulo2 = "Azulitos"
      cantidadArtic = 2;
      }
      if(document.getElementById(`articulo${i}`)=== document.getElementById("articulo27")){
        articuloElement.value = "Promo BEVIERNES";
        precio = 70;
        articulo2 = "Litro"
        cantidadArtic = 1;
        }
      if(document.getElementById(`articulo${i}`)=== document.getElementById("articulo28")){
          articuloElement.value = "Promo SABADRINK";
          precio = 180;
          articulo2 = "Micheladas"
          cantidadArtic = 3;
          }
        if(document.getElementById(`articulo${i}`)=== document.getElementById("articulo29")){
          articuloElement.value = "Promo CRUDOMINGO";
          precio = 230;
          articulo2 = "AguaChile / Cevichelada"
          cantidadArtic = 2;
          }
          if(document.getElementById(`articulo${i}`)=== document.getElementById("articulo30")){
            if(document.getElementById(articulo30).value === promo1){
              articuloElement.value = "Promo $150";
              precio = 150;
              articulo2 = "AguaChile / Cevichelada"
              cantidadArtic = 2;
            }
            
            }
    
    
    if (cantidadInt > 0) {
      
      hasSelection = true;
      orderData.push({
        cantidad: cantidadInt,
        articulo: articuloElement.value,
        precio: precio,
        id: `articulo${i}`,
        articulo2: articulo2,
        cantidadArtic: cantidadArtic,
      });
      total += cantidadInt * precio;
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
    extra,
  };

  if (JSON.stringify(formData).length < 5000) {
    sessionStorage.setItem("formData", JSON.stringify(formData));
    window.location.href = "InformeOrden.html";
  } else {
    alert("Demasiados datos para almacenar en sessionStorage");
  }
});
 


