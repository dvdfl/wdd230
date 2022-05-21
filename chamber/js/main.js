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
const dateField = document. querySelector("#last-updated");
const yearField = document. querySelector("#current-year");
const currentDateDiv = document.getElementById("currentdate");
//current date
let currentDate = new Date();
//setting date values
dateField.innerHTML = document.lastModified;
yearField.innerHTML = currentDate.getFullYear();
currentDateDiv.textContent = currentDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}); // Formatting neeeded
// annoucement (meeting)
const announcement = document.getElementById("announcement");
const dayNumber = currentDate.getDay()
// 1= Mon, 2=Tue
if (dayNumber == 1 || dayNumber == 2) announcement.style.display = 'block';
