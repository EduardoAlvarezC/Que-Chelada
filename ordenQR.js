// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const orderData = JSON.parse(decodeURIComponent(urlParams.get('orderData')));
const coment = decodeURIComponent(urlParams.get('coment'));
const total = decodeURIComponent(urlParams.get('total'));
const toping = decodeURIComponent(urlParams.get('toping'));
const extra = JSON.parse(decodeURIComponent(urlParams.get('extra')));

if (orderData) {
    let resumenHTML = "";

    // Mostrar los datos de los artículos
    orderData.forEach((item, index) => {
        resumenHTML += `
            <p><strong>Producto:</strong> ${item.articulo}</p>
            <p><strong>Cantidad:</strong> ${item.cantidad}</p>
        `;

        if (item.tipoCerveza) {
            resumenHTML += `<p><strong>Cerveza:</strong> ${item.tipoCerveza}</p>`;
        }

        const extraItem = extra.find(extra => extra.id === item.id);
        if (extraItem && extraItem.extra) {
            resumenHTML += `<p>${extraItem.extra}</p>`;
            if (extraItem.extra.includes("Con Queso")) {
                resumenHTML += `<p><strong>Extra:</strong> $10</p>`;
                item.precio += 10;
            }
        }

        if (item.tamano) {
            resumenHTML += `<p><strong>Tamaño:</strong> ${item.tamano < 50 ? "1/2 L" : "1 L"}</p>`;
        }

        if (item.articulo2 && item.cantidadArtic) {
            resumenHTML += `<p>${item.cantidadArtic} ${item.articulo2}</p>`;
        }

        if (item.tipoEscarchado) {
            resumenHTML += `<p><strong>Escarchado:</strong> ${item.tipoEscarchado}</p>`;
        }

        if (item.articulo && item.articulo.includes("AGUACHILE")) {
            resumenHTML += `<p><strong>Toping:</strong> ${toping}</p>`;
        }

        resumenHTML += `
            <p><strong>Monto:</strong> $${item.cantidad * item.precio}</p>
            <hr>
        `;
    });

    // Mostrar el resumen, comentarios y total
    document.getElementById("ordenResumen").innerHTML = resumenHTML;
    document.getElementById("comentarios").innerHTML = `<h5>Comentarios: ${coment}</h5>`;
    document.getElementById("totalOrden").innerHTML = `<h3>Total: $${total}</h3>`;
} else {
    document.getElementById("ordenResumen").innerHTML = `<p>No se encontró información de la orden.</p>`;
}