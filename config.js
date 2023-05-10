    // BIENVENIDA AL SISTEMA

    document.getElementById("btn-bienvenida").addEventListener("click", function () {
        let nombreUsuario = document.getElementById("nombre").value;
      
        swal.fire({
          title: `¡Bienvenido/a ${nombreUsuario}!`,
          text: "¡Comencemos con tu inscripción!",
          icon: "success",
          button: "Aceptar",
        });
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


    //-------------------------------------------------------------------------


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

    // Evento "submit" en el formulario de ingreso de materias
    formMaterias.addEventListener('submit', (event) => {
        event.preventDefault();
        formMaterias.style.display = 'none';
        formCursada.style.display = 'block';
    });


    // Evento "submit" en el formulario de materias disponibles
    formCursada.addEventListener('submit', (event) => {
        event.preventDefault();

        // Calcular el promedio
        let cantidadMaterias = 0;
        let sumaNotas = 0;

        // Verificar cuántas materias se han cursado y sumar las notas correspondientes
        if (selectorMateria1.value === "si") {
            cantidadMaterias++;
            sumaNotas += parseInt(inputNota1.value);
        }

        if (selectorMateria2.value === "si") {
            cantidadMaterias++;
            sumaNotas += parseInt(inputNota2.value);
        }

        if (selectorMateria3.value === "si") {
            cantidadMaterias++;
            sumaNotas += parseInt(inputNota3.value);
        }

        // Calcular el promedio
        const promedioGeneral = sumaNotas / cantidadMaterias;

        // Mostrar el mensaje con el promedio
        document.getElementById("mensaje-promedio").textContent = `Tu promedio es ${promedioGeneral.toFixed(2)}`;

        // Obtener los valores de diasElegidos y horarioElegido
        const diasElegidos = document.getElementById("dias-disponibles").value;
        const horarioElegido = document.getElementById("horario-disponible").value;
        document.getElementById("dias-disponibles").addEventListener("change", () => {
            actualizarTablaMaterias();
        });
        
        document.getElementById("horario-disponible").addEventListener("change", () => {
            actualizarTablaMaterias();
        });

    });


    // CALCULO DEL PROMEDIO
    let cantidadMaterias = 0;
    let sumaNotas = 0;

    if (selectorMateria1.value === "si") {
        cantidadMaterias++;
        sumaNotas += parseInt(inputNota1.value);
    }

    if (selectorMateria2.value === "si") {
        cantidadMaterias++;
        sumaNotas += parseInt(inputNota2.value);
    }

    if (selectorMateria3.value === "si") {
        cantidadMaterias++;
        sumaNotas += parseInt(inputNota3.value);
    }

    const promedioGeneral = sumaNotas / cantidadMaterias;
    document.getElementById("mensaje-promedio").textContent = `Tu promedio es ${promedioGeneral.toFixed(2)}`;

    // -----------------------------------------------------

//AGREGADO DE DEFINICION DE VARIABLE LISTADOMATERIAS
    let listadoMaterias = [];
    


    //OBTENER JSON

    function obtenerJSON() {
        const URLJSON = "materias.json";
        fetch(URLJSON)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log(datos);
                listadoMaterias = datos.materiasDisponibles;
                actualizarTablaMaterias();

                listadoMaterias.forEach((materia) => {
                    let botonSeleccionar = document.createElement("button");
                    botonSeleccionar.setAttribute("id", `boton-${materia.codigo}`);
                    botonSeleccionar.setAttribute("data-seleccionada", "false");
                    botonSeleccionar.textContent = "Seleccionar";
                    botonSeleccionar.addEventListener("click", () => {
                        let materiaSeleccionada = {
                            nombre: materia.nombre,
                            codigo: materia.codigo,
                            dias: materia.dias,
                            horario: materia.horario
                        };
                        agregarMateriaSeleccionada(materiaSeleccionada);
                    });



                    let fila = document.createElement("tr");
                    fila.innerHTML = `
                <td>${materia.nombre}</td>
                <td>${materia.codigo}</td>
                <td>${materia.dias}</td>
                <td>${materia.horario}</td>
                <td></td>
            `;
                    let celdaBoton = fila.querySelector("td:last-child");
                    celdaBoton.appendChild(botonSeleccionar);

                    document.getElementById("tabla-materias").appendChild(fila);
                });
            });
    }


    obtenerJSON();

    // -----------------------------------------------------
// NUEVO AGREGADO

function actualizarTablaMaterias() {
    // Obtener los valores seleccionados
    const diasSeleccionados = document.getElementById("dias-disponibles").value;
    const horariosSeleccionados = document.getElementById("horario-disponible").value;
  
    // Filtrar la lista de materias disponibles para mostrar únicamente aquellas que coinciden con los valores seleccionados
    const materiasFiltradas = listadoMaterias.filter(materia => materia.dias.includes(diasSeleccionados) && materia.horario === horariosSeleccionados);
  
    // Vaciar la tabla
    const tablaMateriasDisponibles = document.getElementById("tabla-materias");
    tablaMateriasDisponibles.innerHTML = "";
  
    // Mostrar las materias filtradas en la tabla
    materiasFiltradas.forEach((materia) => {
      // Crear el botón de selección de la materia
      let botonSeleccionar = document.createElement("button");
      botonSeleccionar.setAttribute("id", `boton-${materia.codigo}`);
      botonSeleccionar.setAttribute("data-seleccionada", "false");
      botonSeleccionar.textContent = "Seleccionar";
      botonSeleccionar.addEventListener("click", () => {
        let materiaSeleccionada = {
          nombre: materia.nombre,
          codigo: materia.codigo,
          dias: materia.dias,
          horario: materia.horario
        };
        agregarMateriaSeleccionada(materiaSeleccionada);
      });
  
      // Crear la fila de la tabla
      let fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${materia.nombre}</td>
        <td>${materia.codigo}</td>
        <td>${materia.dias}</td>
        <td>${materia.horario}</td>
        <td></td>
      `;
      let celdaBoton = fila.querySelector("td:last-child");
      celdaBoton.appendChild(botonSeleccionar);
  
      tablaMateriasDisponibles.appendChild(fila);
    });
  }

  // Evento "submit" en el formulario de seleccion de horarios y dias
formCursada.addEventListener('submit', (event) => {
    event.preventDefault();
    formMaterias.style.display = 'none';
    formCursada.style.display = 'block';
    // actualizarTablaMaterias();
});
// ---------------------------------  


    // Lista de materias seleccionadas
    let materiasSeleccionadas = [];

    // Limpiar selección
    document.getElementById("limpiar-seleccion").addEventListener("click", function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Estás por cancelar tu inscripción. ¿Deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                materiasSeleccionadas.length = 0;
                actualizarMateriasSeleccionadas();
            }
        });
    });


    // Actualizar la tabla de materias seleccionadas
    function actualizarMateriasSeleccionadas() {
        // Obtener la tabla
        const tablaMateriasSeleccionadas = document.getElementById("tabla-materias-seleccionadas");
        // Vaciar la tabla
        tablaMateriasSeleccionadas.innerHTML = "";
    }


    // Agregar materia seleccionada a la lista
    function agregarMateriaSeleccionada(materia) {
        materiasSeleccionadas.push(materia);

        // Crear fila para mostrar la materia seleccionada
        let fila = document.createElement("tr");

        // Crear celda para el nombre de la materia
        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = materia.nombre;
        fila.appendChild(celdaNombre);

        // Crear celda para el botón "eliminar"
        let celdaEliminar = document.createElement("td");
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            eliminarMateriaSeleccionada(materia);
            fila.remove();
        });
        celdaEliminar.appendChild(botonEliminar);
        fila.appendChild(celdaEliminar);

        // Agregar fila a la tabla de materias seleccionadas
        let tabla = document.getElementById("tabla-materias-seleccionadas");
        tabla.appendChild(fila);
    }

    // Eliminar materia seleccionada de la lista
    function eliminarMateriaSeleccionada(materia) {
        let indice = materiasSeleccionadas.indexOf(materia);
        if (indice !== -1) {
            materiasSeleccionadas.splice(indice, 1);
        }
    }

    //CONFIRMAR SELECCION
    const confirmarSeleccionBtn = document.getElementById('confirmar-seleccion');
    confirmarSeleccionBtn.addEventListener('click', () => {
        Swal.fire({
            title: '¡Inscripción enviada!',
            text: 'Tu inscripción ha sido enviada correctamente.',
            icon: 'success'
        }).then(() => {
            // Limpiar la tabla de materias seleccionadas
            actualizarMateriasSeleccionadas();
        });
    });