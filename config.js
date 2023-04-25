// BIENVENIDA AL SISTEMA

//Bienvenida al usuario
document.getElementById("btn-bienvenida").addEventListener("click", function () {
    let nombreUsuario = document.getElementById("nombre").value;
    let mensaje = document.getElementById("mensaje");
    mensaje.innerText = "Bienvenido/a " + nombreUsuario;
});

// Selección de elementos del DOM
const selectorMateria1 = document.getElementById('materia1');
const selectorMateria2 = document.getElementById('materia2');
const selectorMateria3 = document.getElementById('materia3');
const inputNota1 = document.getElementById('nota1');
const inputNota2 = document.getElementById('nota2');
const inputNota3 = document.getElementById('nota3');
const formMaterias = document.getElementById('form-materias');
const formCursada = document.getElementById('form-cursada');
const resultados = document.getElementById('resultados');
const promedio = document.getElementById('promedio');
const mensajePromedio = document.getElementById('mensaje-promedio');
const materiaRecomendada = document.getElementById('materia-recomendada');

// Evento "change" en cada selector de materia
selectorMateria1.addEventListener('change', (event) => {
    if (event.target.value === "si") {
        inputNota1.disabled = false;
    } else {
        inputNota1.disabled = true;
        inputNota1.value = '';
    }
});

selectorMateria2.addEventListener('change', (event) => {
    if (event.target.value === "si") {
        inputNota2.disabled = false;
    } else {
        inputNota2.disabled = true;
        inputNota2.value = '';
    }
});

selectorMateria3.addEventListener('change', (event) => {
    if (event.target.value === "si") {
        inputNota3.disabled = false;
    } else {
        inputNota3.disabled = true;
        inputNota3.value = '';
    }
});

// Evento "submit" en el primer formulario
formMaterias.addEventListener('submit', (event) => {
    event.preventDefault(); 
    formMaterias.style.display = 'none'; 
    formCursada.style.display = 'block';
});

// Evento "submit" en el segundo formulario
formCursada.addEventListener('submit', (event) => {
    event.preventDefault(); 

    // Calcular el promedio
    let cantidadMaterias = 0;
    let sumaNotas = 0;

    // Verificar cuántas materias se han cursado y sumar las notas correspondientes
    if (materia1.value === "si") {
        cantidadMaterias++;
        sumaNotas += parseInt(nota1.value);
    }

    if (materia2.value === "si") {
        cantidadMaterias++;
        sumaNotas += parseInt(nota2.value);
    }

    if (materia3.value === "si") {
        cantidadMaterias++;
        sumaNotas += parseInt(nota3.value);
    }

    // Calcular el promedio
    const promedioGeneral = sumaNotas / cantidadMaterias;

    // Mostrar el mensaje con el promedio
    document.getElementById("mensaje-promedio").textContent = `Tu promedio es ${promedioGeneral.toFixed(2)}`;

    // Obtener los valores de diasElegidos y horarioElegido
    const diasElegidos = document.getElementById("dias-disponibles").value;
    const horarioElegido = document.getElementById("horario-disponible").value;

    // Guardar datos en localStorage
    const materiaRec = recomendarMateria(diasElegidos, horarioElegido);
    guardarDatosLocalStorage(cantidadMaterias, sumaNotas, promedioGeneral, materiaRec, diasElegidos, horarioElegido);

    formCursada.style.display = 'none'; 
    resultados.style.display = 'block'; 
});

// Materias para inscripcion
const materiasDisponibles = [
    { nombre: "Teoria del delito", dias: "Martes y viernes", codigo: 989898, horario: "Mañana" },
    { nombre: "Sociedades", dias: "Martes y viernes", codigo: 878787, horario: "Tarde" },
    { nombre: "Concursos y quiebras", dias: "Martes y viernes", codigo: 656565, horario: "Noche" },
    { nombre: "Criminologia", dias: "sabado", codigo: 434343, horario: "Mañana" },
    { nombre: "Sociologia", dias: "sabado", codigo: 323232, horario: "Tarde" },
    { nombre: "Derecho Penal", dias: "Lunes y jueves", codigo: 172634, horario: "Mañana" },
    { nombre: "Ingles", dias: "Lunes y jueves", codigo: 451289, horario: "Tarde" },
    { nombre: "Derecho Civil", dias: "Lunes y jueves", codigo: 569812, horario: "Noche" }
];

document.getElementById("form-cursada").addEventListener("submit", function (event) {
    event.preventDefault();

    const diasElegidos = document.getElementById("dias-disponibles").value;
    const horarioElegido = document.getElementById("horario-disponible").value;
    const materiaRecomendada = recomendarMateria(diasElegidos, horarioElegido);

    document.getElementById("materia-recomendada").innerText = materiaRecomendada.nombre;
    document.getElementById("resultados").style.display = "block";
});

function recomendarMateria(diasElegidos, horarioElegido) {
    const diasMap = {
        "1": "Lunes y jueves",
        "2": "Martes y viernes",
        "3": "sabado"
    };

    const horarioMap = {
        "1": "Mañana",
        "2": "Tarde",
        "3": "Noche"
    };

    const diasSeleccionados = diasMap[diasElegidos];
    const horarioSeleccionado = horarioMap[horarioElegido];

    const materiaFiltrada = materiasDisponibles.filter(materia =>
        materia.dias === diasSeleccionados && materia.horario === horarioSeleccionado
    );

    return materiaFiltrada[0]; // Devuelve la primera materia que cumple con los criterios de selección
};

function guardarDatosLocalStorage(cantidadMaterias, sumaNotas, promedioGeneral, materiaRec, diasElegidos, horarioElegido) {
    const datos = {
        cantidadMaterias,
        sumaNotas,
        promedioGeneral,
        materiaRec,
        diasElegidos,
        horarioElegido
    };

    localStorage.setItem('datosAlumno', JSON.stringify(datos));
};