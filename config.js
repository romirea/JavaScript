// Bienvenida al sistema
let nombre = prompt("Por favor, ingresa tu nombre:");
alert("¡Bienvenido/a " + nombre + "! Comencemos a planificar tu inscripción");

class Materia{
    //Creacion de materias
    constructor(nombre, codigo, horario){
        this.nombre = nombre;
        this.codigo = codigo;
        this.horario = horario;
    }
    // Función para preguntar por una materia y su nota
    preguntarPorMateria() {
        let respuesta = prompt("Cursaste " + this.nombre + "? si/no");
        if (respuesta === "si") {
            let notaMateria = parseInt(prompt("Ingresá tu nota en la materia:"));
            return {
                aprobado: validarNota(notaMateria),
                nota: notaMateria
            };
        } else {
            alert("No cursaste " + this.nombre);
            return {
                aprobado: false,
                nota: 0
            };
        }
    }
}

//Ingreso de materias

const materias = [
    new Materia("Constitucional", 1234, "Mañana"),
    new Materia("Derechos Humanos", 5678, "Tarde"),
    new Materia("Contratos", 9123, "Noche")
];

//Declaracion de variables sumNotas y cantAprobadas
let sumNotas = 0;
let cantAprobadas = 0;


//Consulta de materias cursadas y notas (FOR...OF)
for(let materia of materias){
    let notaMateria = materia.preguntarPorMateria();
    if (notaMateria.aprobado){
        sumNotas += notaMateria.nota;
        cantAprobadas++;
    }
}

// Función para validar la nota y definir si la materia está aprobada
function validarNota(materia) {
    if (materia < 4) {
        alert("No aprobaste la materia. La nota mínima para aprobar una materia es de 4");
        return false;
    } else if (materia >= 4 && materia <= 7) {
        alert("Aprobaste la materia!");
        return true;
    } else if (materia >= 8 && materia <= 10) {
        alert("Felicitaciones!");
        return true;
    } else {
        alert("La nota que ingresaste no es válida");
        return false;
    }
}


//Calculo del promedio general
let promedioFinal = sumNotas / cantAprobadas;
alert("Tu promedio general es: " + promedioFinal);

if (promedioFinal >= 8) {
    alert('Tu promedio es alto, felicitaciones!');
} else if(promedioFinal <8 && promedioFinal>=6){
    alert("Tu promedio es muy bueno!")
} else{
    alert('Tu promedio es algo bajo. Continuemos con la inscripción');
}


//Selección de días y horarios para la cursada

alert("¿Que dias queres cursar?");
let diasDisponibles = prompt("\n1: lunes y jueves. \n2: martes y viernes. \n3: Sabados")


if (diasDisponibles == 1) {
    alert("Elegiste cursar lunes y jueves");
    alert("¿En que horarios podes cursar?");
    let horarioDisponible = prompt("\n1: Mañana \n2: Tarde \n3: Noche")

    switch (horarioDisponible) {
        case '1':
            alert("Elegiste turno mañana. Te recomendamos inscribirte en Derecho Penal");
            break;
        case '2':
            alert("Elegiste turno tarde. Te recomendamos inscribirte en Ingles");
            break;
        case '3':
            alert("Elegiste turno noche. Te recomendamos inscribirte en Derecho Civil");
            break;
        default:
            alert("Opcion de horario no válida");
    }

} else if (diasDisponibles == 2) {
    alert("Elegiste cursar martes y viernes");
    alert("¿En que horarios podes cursar?");
    let horarioDisponible = prompt("\n1: Mañana \n2: Tarde \n3: Noche")

    switch (horarioDisponible) {
        case '1':
            alert("Elegiste turno mañana. Te recomendamos inscribirte en Teoria del Delito");
            break;
        case '2':
            alert("Elegiste turno tarde. Te recomendamos inscribirte en Sociedades");
            break;
        case '3':
            alert("Elegiste turno noche. Te recomendamos inscribirte en Concursos y Quiebras");
            break;
        default:
            alert("Opcion de horario no válida");
    }

} else if (diasDisponibles == 3) {
    alert("Elegiste cursar los sabados");
    alert("¿En que horarios podes cursar?");
    let horarioDisponible = prompt("\n1: Mañana. \n2: Tarde")

    switch (horarioDisponible) {
        case '1':
            alert("Elegiste turno mañana. Te recomendamos inscribirte en Criminologia");
            break;
        case '2':
            alert("Elegiste turno tarde. Te recomendamos inscribirte en Sociologia");
            break;
        default:
            alert("Opcion de horario no válida");
    }

} else {
    alert("Opcion de dias no válida");
}

//Materias para inscripcion
const materiasDisponibles = [
    {nombre: "Teoria del delito", dias: "Martes y viernes", codigo: 989898, horario: "Mañana"},
    {nombre: "Sociedades", dias: "Martes y viernes", codigo: 878787, horario: "Tarde"},
    {nombre: "Concursos y quiebras", dias: "Martes y viernes", codigo: 656565, horario: "Noche"},
    {nombre: "Criminologia", dias: "sabado", codigo: 434343, horario: "Mañana"},
    {nombre: "Sociologia", dias: "sabado", codigo: 323232, horario: "Tarde"},
    {nombre: "Derecho Penal", dias: "Lunes y jueves", codigo: 172634, horario: "Mañana"},
    {nombre: "Ingles", dias: "Lunes y jueves", codigo: 451289, horario: "Tarde"},
    {nombre: "Derecho Civil", dias: "Lunes y jueves", codigo: 569812, horario:"Noche"}
]

//Filtro de materias por la mañana
const materiasPorLaManana = materiasDisponibles.filter(materia => materia.horario === "Mañana");
console.log(materiasPorLaManana);


//Filtro de materias de martes y viernes
const materiasMartesyViernes = materiasDisponibles.filter(materia => materia.dias === "Martes y viernes");
console.log(materiasMartesyViernes);

//Busqueda de materia por el usuario para ver sus propiedades
const terminoDeBusqueda = "Derecho"; // término a ingresar por el usuario
const resultadosDeBusqueda = materiasDisponibles.filter(materia => materia.nombre.toLowerCase().includes(terminoDeBusqueda.toLowerCase()));
console.log(resultadosDeBusqueda);
