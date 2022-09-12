const iconoMenu = document.querySelector("#iconoMenu");
const menu = document.querySelector(".content-nav");


iconoMenu.addEventListener("click", (e) =>{
    menu.classList.toggle("active");
    document.body.classList.toggle("opacity");
})