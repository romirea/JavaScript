// Función para validar la nota
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

// Función para preguntar por una materia y su nota
function preguntarPorMateria(materia) {
    let respuesta = prompt("Cursaste " + materia + "? si/no");
    if (respuesta === "si") {
        let notaMateria = parseInt(prompt("Ingresá tu nota en la materia:"));
        return {
            aprobado: validarNota(notaMateria),
            nota: notaMateria
        };
    } else {
        alert("No cursaste " + materia);
        return {
            aprobado: false,
            nota: 0
        };
    }
}


// Bienvenida al sistema
let nombre = prompt("Por favor, ingresa tu nombre:");
alert("¡Bienvenido/a " + nombre + "! Comencemos a planificar tu inscripción");


//Consulta sobre materias cursadas
let sumNotas = 0;
let cantAprobadas = 0;


let materia1 = preguntarPorMateria("constitucional");
if (materia1.aprobado) {
    sumNotas += materia1.nota;
    cantAprobadas++;
}

let materia2 = preguntarPorMateria("derechos humanos");
if (materia2.aprobado) {
    sumNotas += materia2.nota;
    cantAprobadas++;
}

let materia3 = preguntarPorMateria("contratos");
if (materia3.aprobado) {
    sumNotas += materia3.nota;
    cantAprobadas++;
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
    let horarioDisponible = prompt("\n1: 10 a 13 hrs. \n2: 13 a 17 hrs. \n3: 18 a 21 hrs")

    switch (horarioDisponible) {
        case '1':
            alert("Elegiste cursar de 10 a 13 hrs. Te recomendamos inscribirte en Derecho Penal");
            break;
        case '2':
            alert("Elegiste cursar de 13 a 17 hrs. Te recomendamos inscribirte en Teoria del Delito");
            break;
        case '3':
            alert("Elegiste cursar de 18 a 21 hrs. Te recomendamos inscribirte en Derecho Civil");
            break;
        default:
            alert("Opcion de horario no válida");
    }

} else if (diasDisponibles == 2) {
    alert("Elegiste cursar martes y viernes");
    alert("¿En que horarios podes cursar?");
    let horarioDisponible = prompt("\n1: 10 a 13 hrs. \n2: 13 a 17 hrs. \n3: 18 a 21 hrs")

    switch (horarioDisponible) {
        case '1':
            alert("Elegiste cursar de 10 a 13 hrs. Te recomendamos inscribirte en Teoria del Delito");
            break;
        case '2':
            alert("Elegiste cursar de 13 a 17 hrs. Te recomendamos inscribirte en Sociedades");
            break;
        case '3':
            alert("Elegiste cursar de 18 a 21 hrs. Te recomendamos inscribirte en Concursos y Quiebras");
            break;
        default:
            alert("Opcion de horario no válida");
    }

} else if (diasDisponibles == 3) {
    alert("Elegiste cursar los sabados");
    alert("¿En que horarios podes cursar?");
    let horarioDisponible = prompt("\n1: 7 a 10 hrs. \n2: 10 a 13 hrs.")

    switch (horarioDisponible) {
        case '1':
            alert("Elegiste cursar de 10 a 13 hrs. Te recomendamos inscribirte en Teoria del Delito");
            break;
        case '2':
            alert("Elegiste cursar de 13 a 17 hrs. Te recomendamos inscribirte en Sociologia");
            break;
        default:
            alert("Opcion de horario no válida");
    }

} else {
    alert("Opcion de dias no válida");
}