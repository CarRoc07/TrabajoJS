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

/* Validacion Form */ 
window.addEventListener("load", ()=> {
    const form = document.getElementById("form")
    const email = document.getElementById("email")
    const pass = document.getElementById("pass")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        validaCampos()
    })

    
    const validaCampos = ()=> {
        const emailValor = email.value.trim()
        const passValor = pass.value.trim();
        

        if(!emailValor) {
            validaFalla(email, "Campo vacío")
        } else if(!validaEmail(emailValor)) {
            validaFalla(email, "El e-mail no es válido")
        } else {
            validaOk(email)
        }
        
        const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        if(!passValor) {
            validaFalla(pass, "Campo vacío")
        } else if(passValor.length < 8) {
            validaFalla(pass, "Debe tener 8 caracteres como minimo")
        } else if(!passValor.match(er)) {
            validaFalla(pass, "Debe tener al menos una mayuscula, una minuscula y un numero")
        } else {
            validaOk(pass)
        }

    }

    const validaFalla = (input, msje)  => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector("p")
        aviso.innerText = msje
        
        formControl.className = "form-control falla"
    }
    const validaOk = (input, msje)  => {
        const formControl = input.parentElement
        formControl.className = "form-control ok"
    }

    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
})