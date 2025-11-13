const form = document.getElementById("formulario");
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

const barra = document.getElementById("barra");
const descripcion = document.getElementById("descripcion");
const contador = document.getElementById("contador");

const btnEnviar = document.getElementById("btnEnviar");
const btnBorrar = document.getElementById("btnBorrar");

// Actualiza el contador de caracteres
descripcion.addEventListener("input", () => {
  contador.textContent = `${descripcion.value.length}/150 caracteres`;
});

// Botón de borrar
btnBorrar.addEventListener("click", () => {
  form.reset();
  resetearFormulario();
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
  contador.textContent = "0/150 caracteres";
});

// Botón de enviar
btnEnviar.addEventListener("click", validarYDescargar);

function validarYDescargar() {
  let valido = true;
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

  if (document.getElementById("nombre").value.trim() === "") {
    document.getElementById("error-nombre").textContent = "El nombre es obligatorio.";
    valido = false;
  }

  if (document.getElementById("apellido").value.trim() === "") {
    document.getElementById("error-apellido").textContent = "El apellido es obligatorio.";
    valido = false;
  }

  const email = document.getElementById("email").value.trim();
  if (email === "" || !email.includes("@")) {
    document.getElementById("error-email").textContent = "Ingrese un correo válido.";
    valido = false;
  }

  const edad = parseInt(document.getElementById("edad").value);
  if (isNaN(edad) || edad < 1 || edad > 120) {
    document.getElementById("error-edad").textContent = "Ingrese una edad válida.";
    valido = false;
  }

  if (document.getElementById("nacimiento").value === "") {
    document.getElementById("error-nacimiento").textContent = "Ingrese su fecha de nacimiento.";
    valido = false;
  }

  if (document.getElementById("genero").value === "") {
    document.getElementById("error-genero").textContent = "Seleccione su género.";
    valido = false;
  }

  if (document.getElementById("pais").value.trim() === "") {
    document.getElementById("error-pais").textContent = "Ingrese su país.";
    valido = false;
  }

  if (document.getElementById("descripcion").value.trim() === "") {
    document.getElementById("error-descripcion").textContent = "Ingrese una descripción.";
    valido = false;
  }

  if (!document.getElementById("terminos").checked) {
    document.getElementById("error-terminos").textContent = "Debe aceptar los términos y condiciones.";
    valido = false;
  }

  if (valido) {
    const datos = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      email: email,
      edad: edad,
      nacimiento: document.getElementById("nacimiento").value,
      genero: document.getElementById("genero").value,
      pais: document.getElementById("pais").value,
      descripcion: document.getElementById("descripcion").value,
      terminos: document.getElementById("terminos").checked,
    };

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos_formulario.json";
    a.click();
    URL.revokeObjectURL(url);

    alert("Formulario válido. Se ha generado el archivo JSON.");
  }
}

// Actualiza la barra de progreso
function actualizaProgreso() {
  let completados = 0;
  // El total de campos a considerar es la longitud del array 'campos' (8 campos de texto/select)
  const total = campos.length;

  campos.forEach((id) => {
    const campo = document.getElementById(id);
    // Verificamos si el campo de texto/select tiene un valor no vacío
    if (campo.value && campo.value.trim() !== "") {
      completados++;
    }
  });

  // *** SE HA ELIMINADO la línea que incluía el checkbox de términos. ***
  // if (document.getElementById("terminos").checked) completados++; 
  
  // Ahora el cálculo es sobre el total de campos en el array 'campos' (8)
  const porcentaje = Math.round((completados / total) * 100); 
  barra.style.width = porcentaje + "%";
}

// Resetea barra y contador
function resetearFormulario() {
  barra.style.width = "0%";
  contador.textContent = "0/150 caracteres";
}

// Eventos para actualizar progreso
campos.forEach((id) => {
  const campo = document.getElementById(id);
  campo.addEventListener("input", actualizaProgreso);
  campo.addEventListener("change", actualizaProgreso);
});

// El evento 'change' para 'terminos' ya no llama a actualizaProgreso
// document.getElementById("terminos").addEventListener("change", actualizaProgreso);