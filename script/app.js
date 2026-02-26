let participantes = [];
let exclusiones = [];
let presupuestoSeleccionado = 0;

// ==========================
// AGREGAR PARTICIPANTE
// ==========================
function agregarParticipante() {

    let nombre = document.getElementById("nuevoParticipante").value.trim();
    if (nombre === "") return;

    // Evitar duplicados reales
    if (participantes.includes(nombre) || exclusiones.includes(nombre)) {
        alert("Ese participante ya existe.");
        return;
    }

    participantes.push(nombre);

    const origen = document.getElementById("origen");

    const div = document.createElement("div");
    div.className = "participante";
    div.id = "persona_" + Date.now(); // ID único real
    div.draggable = true;
    div.textContent = nombre;

    origen.appendChild(div);

    document.getElementById("nuevoParticipante").value = "";

    verificarCampos();
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

    //  Obtener TODOS los participantes (origen + destino)
    const todosHTML = document.querySelectorAll(".participante");
    let listaParticipantes = [];

    todosHTML.forEach(p => {
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