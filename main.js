//hamburguer menú consigna 1
const iconoMenu = document.querySelector("#iconoMenu");
const menu = document.querySelector(".content-nav");

iconoMenu.addEventListener("click", (e) =>{
    menu.classList.toggle("active");
    document.body.classList.toggle("opacity");
})


//ToDo Consigna 3
const inputToDo = document.querySelector(".input-toDo");
const btnSend = document.querySelector(".btn-send");
const tasksContainer = document.querySelector(".content-toDo");

//TO DO

//traigo las tareas del local

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// almaceno TAREAS

const saveTareas = (tareasList) => {
    localStorage.setItem("tareas", JSON.stringify(tareasList));
}

//crear elemento a renderizar

const createTareas = (tarea) =>
    `
    <li>
        <p> ${tarea.name}</p>
        <img class="delete-btn" src="./imgs/trash.svg" alt="borrar" data-id=${tarea.tareaId}>
    </li>
    `;

const renderTareaList = list => {
    tasksContainer.innerHTML = list.map( tarea => createTareas(tarea) ).join("");
}

//añadir tarea

const addTarea = e => {
    e.preventDefault();
    const tareaName = inputToDo.value.trim();
    if(!tareaName.length){
        alert("ingrese tarea")
        return;
    }

    tareas = [...tareas, { name: tareaName, tareaId: tareas.length + 1}]
    inputToDo.value = "";


    renderTareaList(tareas);
    saveTareas(tarea);
}

//eliminar pedido

const removeTarea = e => {
    if(!e.target.classList.contains("delete-btn")) return;
    const filterId = Number(e.target.dataset.id);
    tareas = tareas.filter(tarea => tarea.tareaId !== filterId);

    renderTareaList(tareas);
    saveTareas(tareas); 
}

// funcion que inicia

const start = () => {
    renderTareaList(tareas);
    btnSend.addEventListener("click",addTarea);
    tasksContainer.addEventListener("click",removeTarea);
}

start();
