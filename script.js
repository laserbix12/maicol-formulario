// ===== Elementos =====
const form = document.getElementById("formulario");
const descripcionInput = document.getElementById("descripcion");
const contadorSpan = document.getElementById("contador");
const barra = document.getElementById("barra");
const porcentajeTexto = document.getElementById("porcentaje");
const checkboxTerminos = document.getElementById("terminos");

// Campos que SÍ cuentan para la barra (el checkbox NO está incluido)
const campos = [
  "nombre",
  "apellido",
  "email",
  "edad",
  "nacimiento",
  "genero",
  "pais",
  "descripcion",
];

// ===== Contador de caracteres =====
descripcionInput.addEventListener("input", () => {
  contadorSpan.textContent = descripcionInput.value.length;
  actualizarProgreso();
});

// ===== Función para actualizar progreso =====
function actualizarProgreso() {
  let completados = 0;

  campos.forEach((campo) => {
    const elemento = document.getElementById(campo);
    if (elemento && elemento.value.trim() !== "") completados++;
  });

  const progreso = Math.round((completados / campos.length) * 100);
  barra.style.width = `${progreso}%`;

  // Colores de la barra
  if (progreso === 0) {
    barra.style.backgroundColor = "#e74c3c"; // Rojo inicial
  } else if (progreso < 33) {
    barra.style.backgroundColor = "#e74c3c"; // Rojo
  } else if (progreso < 66) {
    barra.style.backgroundColor = "#f1c40f"; // Amarillo
  } else {
    barra.style.backgroundColor = "#2e46ccff"; // Verde
  }

  porcentajeTexto.textContent = `${progreso}% completado`;
}

// ===== Validación =====
function validarYDescargar() {
  let valido = true;
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const edad = parseInt(document.getElementById("edad").value, 10);
  const nacimiento = document.getElementById("nacimiento").value;
  const genero = document.getElementById("genero").value;
  const pais = document.getElementById("pais").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const terminos = checkboxTerminos.checked;

  if (nombre === "") {
    document.getElementById("error-nombre").textContent = "El nombre es obligatorio.";
    valido = false;
  }
  if (apellido === "") {
    document.getElementById("error-apellido").textContent = "El apellido es obligatorio.";
    valido = false;
  }
  if (email === "" || !email.includes("@")) {
    document.getElementById("error-email").textContent = "Ingrese un correo válido.";
    valido = false;
  }
  if (isNaN(edad) || edad < 1 || edad > 120) {
    document.getElementById("error-edad").textContent = "Ingrese una edad válida.";
    valido = false;
  }
  if (nacimiento === "") {
    document.getElementById("error-nacimiento").textContent = "Seleccione una fecha.";
    valido = false;
  }
  if (genero === "") {
    document.getElementById("error-genero").textContent = "Seleccione su género.";
    valido = false;
  }
  if (pais === "") {
    document.getElementById("error-pais").textContent = "Ingrese su país.";
    valido = false;
  }
  if (descripcion.length > 255) {
    document.getElementById("error-descripcion").textContent = "Máximo 255 caracteres.";
    valido = false;
  }
  if (!terminos) {
    document.getElementById("error-terminos").textContent = "Debe aceptar los términos.";
    valido = false;
  }

  if (valido) {
    const datos = { nombre, apellido, email, edad, nacimiento, genero, pais, descripcion };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "datos_formulario.json";
    a.click();

    alert("✅ Formulario enviado correctamente.");
    form.reset();
    contadorSpan.textContent = "0";
    actualizarProgreso();
  }
}

// ===== Eventos =====

// Actualiza la barra solo con los campos válidos
campos.forEach((id) => {
  const campo = document.getElementById(id);
  if (campo) campo.addEventListener("input", actualizarProgreso);
});

// 🚫 Evita que el checkbox afecte el progreso
checkboxTerminos.addEventListener("change", () => {
  // No actualizamos la barra ni el color aquí
  porcentajeTexto.textContent = porcentajeTexto.textContent; // mantiene el valor actual
});

// ===== Botones =====
document.getElementById("btnEnviar").addEventListener("click", (e) => {
  e.preventDefault();
  validarYDescargar();
});

document.getElementById("btnBorrar").addEventListener("click", () => {
  form.reset();
  contadorSpan.textContent = "0";
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
  actualizarProgreso();
});
