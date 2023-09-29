// Seleccionar los elementos del DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Agregar eventos a los elementos
document.addEventListener("DOMContentLoaded", getLocalTodos); // Cargar las tareas guardadas al iniciar la página
todoButton.addEventListener("click", addTodo); // Añadir una tarea al hacer clic en el botón
todoList.addEventListener("click", deleteCheck); // Eliminar o completar una tarea al hacer clic en los botones
filterOption.addEventListener("change", filterTodo); // Filtrar las tareas según el estado al cambiar la opción

// Función para añadir una tarea
function addTodo(event) {
    event.preventDefault(); // Evitar que se recargue la página
    const todoDiv = document.createElement("div"); // Crear un div para la tarea
    todoDiv.classList.add("todo"); // Añadir la clase "todo" al div
    const newTodo = document.createElement("li"); // Crear un li para el texto de la tarea
    newTodo.innerText = todoInput.value; // Asignar el valor del input al li
    newTodo.classList.add("todo-item"); // Añadir la clase "todo-item" al li
    todoDiv.appendChild(newTodo); // Añadir el li como hijo del div
    // Guardar la tarea en el almacenamiento local 
    saveLocalTodos(todoInput.value);
    
    const completedButton = document.createElement("button"); // Crear un botón para marcar la tarea como completada
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>'; // Añadir un icono de check al botón
    completedButton.classList.add("complete-btn"); // Añadir la clase "complete-btn" al botón
    todoDiv.appendChild(completedButton); // Añadir el botón como hijo del div

    const trashButton = document.createElement("button"); // Crear un botón para eliminar la tarea
    trashButton.innerHTML = '<i class="fas fa-trash"></li>'; // Añadir un icono de basura al botón
    trashButton.classList.add("trash-btn"); // Añadir la clase "trash-btn" al botón
    todoDiv.appendChild(trashButton); // Añadir el botón como hijo del div
    
    todoList.appendChild(todoDiv); // Añadir el div como hijo de la lista de tareas
    todoInput.value = ""; // Limpiar el valor del input
}

// Función para eliminar o completar una tarea
function deleteCheck(e) {
    const item = e.target; // Obtener el elemento que disparó el evento

    if(item.classList[0] === "trash-btn") { // Si el elemento es el botón de eliminar
        const todo = item.parentElement; // Obtener el div de la tarea
        todo.classList.add("slide"); // Añadir la clase "slide" para animar la salida

        removeLocalTodos(todo); // Eliminar la tarea del almacenamiento local
        todo.addEventListener("transitionend", function() { // Esperar a que termine la transición
            todo.remove(); // Eliminar el div de la tarea del DOM
        });
    }

    if(item.classList[0] === "complete-btn") { // Si el elemento es el botón de completar
        const todo = item.parentElement; // Obtener el div de la tarea
        todo.classList.toggle("completed"); // Alternar la clase "completed" para cambiar el estilo
    }
}

// Función para filtrar las tareas según el estado
function filterTodo(e) {
    const todos = todoList.childNodes; // Obtener los nodos hijos de la lista de tareas
    todos.forEach(function(todo) { // Recorrer cada nodo hijo
        switch(e.target.value) { // Según el valor de la opción seleccionada
            case "all":  // Si es "all"
                todo.style.display = "flex"; // Mostrar todas las tareas con display flex
                break;
            case "completed":  // Si es "completed"
                if(todo.classList.contains("completed")) { // Si la tarea tiene la clase "completed"
                    todo.style.display = "flex"; // Mostrar la tarea con display flex
                } else { // Si no tiene la clase "completed"
                    todo.style.display = "none";  // Ocultar la tarea con display none
                }
                break;
            case "incomplete":  // Si es "incomplete"
                if(!todo.classList.contains("completed")) {  // Si la tarea no tiene la clase "completed"
                    todo.style.display = "flex"; // Mostrar la tarea con display flex
                } else { // Si tiene la clase "completed"
                    todo.style.display = "none"; // Ocultar la tarea con display none
                }
                break;
        }
    });
}

// Función para guardar una tarea en el almacenamiento local
function saveLocalTodos(todo) {
    let todos; // Declarar una variable para almacenar un array de tareas
    if(localStorage.getItem("todos") === null) { // Si no hay ninguna clave "todos" en el almacenamiento local
        todos = []; // Inicializar el array vacío
    } else { // Si hay una clave "todos" en el almacenamiento local
        todos = JSON.parse(localStorage.getItem("todos")); // Obtener el array de tareas guardado y parsearlo a JSON
    }
    todos.push(todo); // Añadir la nueva tarea al final del array
    localStorage.setItem("todos", JSON.stringify(todos)); // Guardar el array de tareas en el almacenamiento local como un string
}

// Función para obtener las tareas del almacenamiento local al cargar la página
function getLocalTodos() {
    let todos; // Declarar una variable para almacenar un array de tareas
    if(localStorage.getItem("todos") === null) { // Si no hay ninguna clave "todos" en el almacenamiento local
        todos = []; // Inicializar el array vacío
    } else { // Si hay una clave "todos" en el almacenamiento local
        todos = JSON.parse(localStorage.getItem("todos")); // Obtener el array de tareas guardado y parsearlo a JSON
    }
    todos.forEach(function(todo) { // Recorrer cada tarea del array
        const todoDiv = document.createElement("div"); // Crear un div para la tarea
        todoDiv.classList.add("todo"); // Añadir la clase "todo" al div
        const newTodo = document.createElement("li"); // Crear un li para el texto de la tarea
        newTodo.innerText = todo; // Asignar el texto de la tarea al li
        newTodo.classList.add("todo-item"); // Añadir la clase "todo-item" al li
        todoDiv.appendChild(newTodo); // Añadir el li como hijo del div

        const completedButton = document.createElement("button"); // Crear un botón para marcar la tarea como completada
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>'; // Añadir un icono de check al botón
        completedButton.classList.add("complete-btn"); // Añadir la clase "complete-btn" al botón
        todoDiv.appendChild(completedButton); // Añadir el botón como hijo del div

        const trashButton = document.createElement("button"); // Crear un botón para eliminar la tarea
        trashButton.innerHTML = '<i class="fas fa-trash"></li>'; // Añadir un icono de basura al botón
        trashButton.classList.add("trash-btn"); // Añadir la clase "trash-btn" al botón
        todoDiv.appendChild(trashButton); // Añadir el botón como hijo del div

        todoList.appendChild(todoDiv); // Añadir el div como hijo de la lista de tareas
    });
}

// Función para eliminar una tarea del almacenamiento local 
function removeLocalTodos(todo) {
    let todos;  // Declarar una variable para almacenar un array de tareas
    if(localStorage.getItem("todos") === null) {  // Si no hay ninguna clave "todos" en el almacenamiento local 
        todos = [];  // Inicializar el array vacío 
    } else {  // Si hay una clave "todos" en el almacenamiento local 
        todos = JSON.parse(localStorage.getItem("todos"));  // Obtener el array de tareas guardado y parsearlo a JSON 
    }
    const todoIndex = todo.children[0].innerText;  // Obtener el texto de la tarea a eliminar 
    todos.splice(todos.indexOf(todoIndex), 1);  // Eliminar la tarea del array según su índice 
    localStorage.setItem("todos", JSON.stringify(todos));  // Guardar el array de tareas actualizado en el almacenamiento local como un string 
}
