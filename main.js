//hamburguer menú consigna 1
const iconoMenu = document.querySelector("#iconoMenu");
const menu = document.querySelector(".content-nav");
//ToDo Consigna 3
const inputToDo = document.querySelector(".input-toDo");
const btnSend = document.querySelector(".btn-send");
const tasksContainer = document.querySelector(".content-toDo");

iconoMenu.addEventListener("click", (e) =>{
    menu.classList.toggle("active");
    document.body.classList.toggle("opacity");
})