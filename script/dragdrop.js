const origen = document.getElementById("origen");
const destino = document.getElementById("destino");

document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("participante")) {
        e.dataTransfer.setData("text", e.target.id);
    }
});

origen.addEventListener("dragover", (e) => {
    e.preventDefault();
});

destino.addEventListener("dragover", (e) => {
    e.preventDefault();
});

destino.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const elemento = document.getElementById(id);

    destino.appendChild(elemento);
    actualizarExclusiones();
});

origen.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const elemento = document.getElementById(id);

    origen.appendChild(elemento);
    actualizarExclusiones();
});

function actualizarExclusiones() {

    exclusiones = [];
    participantes = [];

    const itemsDestino = destino.querySelectorAll(".participante");
    itemsDestino.forEach(item => {
        exclusiones.push(item.textContent);
    });

    const itemsOrigen = origen.querySelectorAll(".participante");
    itemsOrigen.forEach(item => {
        participantes.push(item.textContent);
    });

    verificarCampos();
}