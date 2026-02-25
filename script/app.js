let participantes = [];
let exclusiones = [];
let presupuestoSeleccionado = 0;

// ==========================
// AGREGAR PARTICIPANTE
// ==========================
function agregarParticipante() {
    let nombre = document.getElementById("nuevoParticipante").value;
    if (nombre.trim() === "") return;

    participantes.push(nombre);
    document.getElementById("nuevoParticipante").value = "";
    renderParticipantes();
    verificarCampos();
}

// ==========================
// RENDER PARTICIPANTES
// ==========================
function renderParticipantes() {

    const origen = document.getElementById("origen");
    origen.innerHTML = "";

    participantes.forEach((nombre, index) => {

        const div = document.createElement("div");
        div.className = "participante";
        div.id = "persona_" + index;
        div.draggable = true;
        div.textContent = nombre;

        origen.appendChild(div);
    });
}

// ==========================
// VALIDAR CAMPOS
// ==========================
function verificarCampos() {

    const organizador = document.getElementById("organizador").value.trim();
    const fecha = document.getElementById("fecha").value;
    const presupuesto = document.getElementById("presupuestoPersonalizado").value;

    const participantesHTML = document.querySelectorAll("#origen .participante");

    const boton = document.getElementById("btnSorteo");

    if (organizador !== "" &&
        fecha !== "" &&
        presupuesto !== "" &&
        participantesHTML.length >= 2) {

        boton.disabled = false;

    } else {
        boton.disabled = true;
    }
}

// ==========================
// PRESUPUESTO
// ==========================
function seleccionarPresupuesto(boton, cantidad) {

    document.querySelectorAll(".presupuesto-btn").forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline-primary");
    });

    boton.classList.remove("btn-outline-primary");
    boton.classList.add("btn-primary");

    document.getElementById("presupuestoPersonalizado").value = cantidad;

    verificarCampos();
}

// PARA SELECCION DE EVENTO PERSONALIZADO
function mostrarEventoPersonalizado() {
    const select = document.getElementById("evento");
    const input = document.getElementById("eventoPersonalizado");

    if (select.value === "otro") {
        input.classList.remove("d-none");
    } else {
        input.classList.add("d-none");
        input.value = "";
    }
}


// ==========================
// GUARDAR DATOS Y REDIRIGIR
// ==========================
function guardarDatos() {

    const organizador = document.getElementById("organizador").value.trim();
    const fecha = document.getElementById("fecha").value;
    const presupuesto = document.getElementById("presupuestoPersonalizado").value;
    const eventoSelect = document.getElementById("evento").value;
    const eventoPersonalizado = document.getElementById("eventoPersonalizado").value;
    const incluir = document.getElementById("incluir").checked;

   const participantesHTML = document.querySelectorAll(".participante");
    let listaParticipantes = [];

    participantesHTML.forEach(p => {
        listaParticipantes.push(p.textContent);
    });

    const eventoFinal = eventoSelect === "otro" ? eventoPersonalizado : eventoSelect;

    const datos = {
        organizador,
        fecha,
        presupuesto,
        evento: eventoFinal,
        participantes: listaParticipantes,
        exclusiones,
        incluir
    };

    localStorage.setItem("intercambio", JSON.stringify(datos));

    window.location.href = "sorteo.html";
}

// ==========================
// ESCUCHAR CAMBIOS
// ==========================
document.getElementById("organizador").addEventListener("input", verificarCampos);
document.getElementById("fecha").addEventListener("change", verificarCampos);
document.getElementById("presupuestoPersonalizado").addEventListener("input", verificarCampos);