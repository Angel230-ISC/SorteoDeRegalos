let data = JSON.parse(localStorage.getItem("intercambio"));

// Seguridad extra
if (!data) {
    alert("No hay datos del intercambio.");
    window.location.href = "index.html";
}

// Asegurar que exclusiones siempre sea array
data.exclusiones = data.exclusiones || [];

if (data) {
    document.getElementById("datosEvento").innerHTML = `
        <strong>Organizador:</strong> ${data.organizador}<br>
        <strong>Evento:</strong> ${data.evento}<br>
        <strong>Fecha:</strong> ${data.fecha}<br>
        <strong>Presupuesto:</strong> $${data.presupuesto}<br>
        <strong>Participantes:</strong> ${data.participantes.join(", ")}<br>
        <strong>Grupo excluido:</strong> ${data.exclusiones.length > 0 ? data.exclusiones.join(", ") : "Ninguno"}
    `;
}

function mezclar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function realizarSorteo() {

    let participantes = [...data.participantes];

    if (data.incluir) {
        participantes.push(data.organizador);
    }

    if (participantes.length < 2) {
        alert("Se necesitan al menos 2 participantes.");
        return;
    }

    let valido = false;
    let asignacion = {};
    let intentos = 0;

    while (!valido && intentos < 1000) {

        let mezclado = mezclar([...participantes]);
        valido = true;
        asignacion = {};

        for (let i = 0; i < participantes.length; i++) {

            let quienRegala = participantes[i];
            let quienRecibe = mezclado[i];

            // ❌ Nadie se regala a sí mismo
            if (quienRegala === quienRecibe) {
                valido = false;
                break;
            }

            // ❌ Si ambos están en el grupo excluido, no pueden regalarse entre ellos
            if (
                data.exclusiones.includes(quienRegala) &&
                data.exclusiones.includes(quienRecibe)
            ) {
                valido = false;
                break;
            }

            asignacion[quienRegala] = quienRecibe;
        }

        intentos++;
    }

    if (!valido) {
        alert("No se pudo generar combinación válida. Revisa las exclusiones.");
        return;
    }

    let html = "<h5>Resultados:</h5>";

    for (let persona in asignacion) {
        html += `<p><strong>${persona}</strong> → ${asignacion[persona]}</p>`;
    }

    document.getElementById("resultado").innerHTML = html;
}

function reiniciar() {
    localStorage.clear();
    window.location.href = "index.html";
}