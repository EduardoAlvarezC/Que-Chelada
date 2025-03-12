// Este código permite que, al hacer clic en una imagen, el valor del input asociado se incremente de 1 en 1,
// y al superar el valor 5, regrese a 0.

// Creamos arreglos para guardar las referencias de las imágenes (botones) e inputs
const incrementos = [];
const valorInput = [];

for (let i = 1; i <= 34; i++) {
    const incrementoElement = document.getElementById(`incremento${i}`);
    const inputElement = document.getElementById(`cantidad${i}`);
    if (incrementoElement) incrementos.push(incrementoElement);
    if (inputElement) valorInput.push(inputElement);
}

// Asignamos el evento a cada imagen
incrementos.forEach((cantidad, index) => {
    let valor = 0; // Cada input tiene su propio valor independiente
    cantidad.addEventListener("click", () => {
        valor++; // Incrementamos el contador
        if (valor > 5) {
            valor = 0; // Reiniciamos si supera 5
        }
        valorInput[index].value = valor; // Asignamos el valor al input correspondiente
    });
});

// Función del botón para hacer el cálculo de cantidades y precios
document.getElementById("ordenaAqui").addEventListener("click", function () {
    const orderData = [];
    let total = 0;
    let hasSelection = false;
    const comentElement = document.getElementById(`comentarios`);
    const coment = comentElement ? comentElement.value : "Sin comentarios";
    const topingElement = document.getElementById(`toping`);
    const toping = topingElement ? topingElement.value : "";

    let extra = [21, 23, 24, 25].map(i => {
        const extraElement = document.getElementById(`extra${i}`);
        return {
            id: `articulo${i}`,
            extra: extraElement ? extraElement.value : ""
        };
    }).filter(item => item.extra !== "");

    // Bucle para micheladas (i = 1 a 9)
    for (let i = 1; i < 10; i++) {
        const cantidadElement = document.getElementById(`cantidad${i}`);
        const precioElement = document.getElementById(`precio${i}`);
        const articuloElement = document.getElementById(`articulo${i}`);
        const tipoCervezaElement = document.getElementById(`tipoCerveza${i}`);
        const tipoEscarchadoElement = document.getElementById(`tipoEscarchado${i}`);

        if (!cantidadElement || !precioElement || !articuloElement || !tipoCervezaElement || !tipoEscarchadoElement) continue;

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

    // Bucle para litros (i = 10 a 15)
    for (let i = 10; i < 16; i++) {
        const cantidadElement = document.getElementById(`cantidad${i}`);
        const articuloElement = document.getElementById(`articulo${i}`);
        const tamanoElement = document.getElementById(`tamano${i}`);

        if (!cantidadElement || !articuloElement || !tamanoElement) continue;

        const cantidadInt = parseInt(cantidadElement.value, 10) || 0;
        const precio = parseFloat(tamanoElement.value.replace("$", "").trim()) || 0;

        if (cantidadInt > 0) {
            hasSelection = true;
            orderData.push({
                cantidad: cantidadInt,
                articulo: articuloElement.textContent,
                tamano: precio, // Renombrado para claridad, asumiendo que tamanoElement.value es el precio
                precio: precio,
            });
            total += cantidadInt * precio;
        }
    }

    // Bucle para comida (i = 16 a 25)
    for (let i = 16; i < 26; i++) {
        const cantidadElement = document.getElementById(`cantidad${i}`);
        const articuloElement = document.getElementById(`articulo${i}`);
        const precioElement = document.getElementById(`precio${i}`);

        if (!cantidadElement || !articuloElement || !precioElement) continue;

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

    // Objeto promos para las promociones
    const promos = {
        26: { nombre: "Promo JUEVEBES", precio: 140, articulo2: "Azulitos", cantidadArtic: 2 },
        27: { nombre: "Promo BEVIERNES", precio: 70, articulo2: "Litro", cantidadArtic: 1 },
        28: { nombre: "Promo SABADRINK", precio: 180, articulo2: "Micheladas", cantidadArtic: 3 },
        29: { nombre: "Promo CRUDOMINGO", precio: 230, articulo2: "Aguachile / Cevichelada", cantidadArtic: 2 },
        30: {
            "Promo1": { nombre: "Promo $150", precio: 150, articulo2: "AguaChile / Cevichelada", cantidadArtic: 2 },
            "Promo2": { nombre: "Promo $160", precio: 160, articulo2: "Azulito + orden de alitas", cantidadArtic: 1 },
            "Promo3": { nombre: "Promo $260", precio: 260, articulo2: "micheladas + orden de alitas + orden de papas", cantidadArtic: 2 }
        },
        31: {
          "Tamaño1": { nombre: "CLAMATO PREPARADO 1 Litro", precio: 50 },
          "Tamaño2": { nombre: "CLAMATO PREPARADO 1/2 Litro", precio: 30 }
        },
        32: {
          "Tamaño1": { nombre: "RUSA 1 Litro", precio: 45 },
          "Tamaño2": { nombre: "RUSA 1/2 Litro", precio: 25 }
        },
        33: {
          "Tamaño1": { nombre: "RUSA PREPARADA 1 Litro", precio: 55 },
          "Tamaño2": { nombre: "RUSA 1/2 Litro", precio: 35 }
        },
        34: { nombre: "BOING", precio: 20 }
      };

    // Bucle para promociones (i = 26 a 34)
    for (let i = 26; i <= 31; i++) {
        const cantidadElement = document.getElementById(`cantidad${i}`);
        const articuloElement = document.getElementById(`articulo${i}`);
        if (!cantidadElement || !articuloElement) continue;

        const cantidadInt = parseInt(cantidadElement.value, 10) || 0;

        let promoData;
        if (i === 30) {
            const promoElement = document.getElementById(`promos`);
            if (promoElement) {
                const select = promoElement.value;
                promoData = promos[30][select];
            }
        }else {
            promoData = promos[i];
        }

        if (promoData) {
            articuloElement.value = promoData.nombre;
            const precio = promoData.precio;
            const articulo2 = promoData.articulo2 || "";
            const cantidadArtic = promoData.cantidadArtic || 1;

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
    }

    for(let i = 31; i <=34; i++){
      const cantidadInt = parseInt(document.getElementById(`cantidad${i}`).value);
      if(!cantidadInt)continue;

      if(i === 31 || i === 32 || i === 33){
        select = document.getElementById(`tamaño${i}`).value;
        promoData = promos[i][select];
      }
      else{
        promoData = promos[34];
      }

      if(cantidadInt > 0){
        hasSelection = true;
        orderData.push({
          cantidad: cantidadInt,
          articulo: promoData.nombre,
          precio: promoData.precio,
        });
        total += cantidadInt * promoData.precio;
        
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