// Obtener los datos guardados en sessionStorage
const formData = JSON.parse(sessionStorage.getItem("formData"));

if (formData) {
  let resumenHTML = "";

  // Mostrar los datos de los artículos de orderData
  formData.orderData.forEach((item, index) => {
    resumenHTML += `
      <h4>Artículo ${index + 1}</h4>
      <p><strong>Producto:</strong> ${item.articulo}</p>
      <p><strong>Cantidad:</strong> ${item.cantidad}</p>`;

      if(item.tipoCerveza){
        
        resumenHTML += ` <p><strong>Cerveza:</strong> ${item.tipoCerveza}</p>
        `;
      }      

      if(item.tamano){

        if(item.tamano<50){
          resumenHTML += `<p><strong>Tamaño :</strong> 1/2 L</p>
        `;
        }else{
          resumenHTML += `<p><strong>Tamaño :</strong> 1 L</p>
        `;
        }
        
        
      }

    if(item.tipoEscarchado){
      resumenHTML += `<p><strong>Escarchado:</strong> ${item.tipoEscarchado}</p>
      `;
    }

    if(item.articulo && item.articulo.includes("AGUACHILE")){
      resumenHTML += `<p><strong>Toping: </strong>${formData.toping} </p>`;
    }

    resumenHTML  +=`
      <p><strong>Monto:</strong> $${item.cantidad * item.precio}</p>
      
      <hr>
    `;
  });
  

  // Mostrar el resumen completo
  document.getElementById("ordenResumen").innerHTML = resumenHTML;

  // Mostrar el total
  document.getElementById("comentarios").innerHTML= `<h5>Comentarios: ${formData.coment}</h5>`;

  document.getElementById("totalOrden").innerHTML = `<h3>Total: $${formData.total}</h3>`;
} else {
  // Si no hay datos en sessionStorage
  document.getElementById("ordenResumen").innerHTML = "<p>No se encontró información de la orden.</p>";
}
