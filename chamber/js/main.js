const menuBtn = document.getElementById("menu_button");
const navEl = document.getElementById("mainnav");
menuBtn.addEventListener("click", ()=>{
    navEl.classList.toggle("responsive");
    menuBtn.classList.toggle("responsive");
});

window.onresize = () => {
    if (window.innerWidth > 760){
        navEl.classList.remove('responsive')
        menuBtn.classList.remove('responsive')        
    }
};

// date fields
let dateField = document. querySelector("#last-updated");
let yearField = document. querySelector("#current-year");
//current date
let currentDate = new Date();
//setting date values
dateField.innerHTML = document.lastModified;
yearField.innerHTML = currentDate.getFullYear();