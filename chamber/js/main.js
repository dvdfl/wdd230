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


// days since last visit
const lastVisit =  localStorage.getItem("lastVisit");
let daysSinceLastVisit = 0;
if(lastVisit){
    const lastVisitDate = new Date(lastVisit);
    //calculate time difference  
    const timeDifference = currentDate.getTime() - lastVisitDate.getTime();  
    //console.log(`time difference: ${timeDifference}`)
    daysSinceLastVisit = Math.round(timeDifference / (1000 * 60 * 60 * 24)); 
}
else {
    localStorage.setItem("lastVisit",currentDate);
}
currentDateDiv.innerHTML +=` <br><span class="last-visit"> ${daysSinceLastVisit} days since your last visit</span>`;

// date on form
const dateFormField = document.getElementById("date_time");
if (dateFormField) {
    dateFormField.value = currentDate;
}


// spotlights
(function(){
    const container = document.getElementById("spotlights");
    if(container) {
        fetch("js/companies.txt").then(function (response) {
            return response.json();
          }).then(function(data) {
            const companies = [];
            //filtering silver and gold
            silverGoldCompanies = data.companies.filter(c => c.membership == "silver" || c.membership == "gold");
            // ramdomlyselecting companies using Math.random(); 
            console.log(silverGoldCompanies.length)
            companies.push(silverGoldCompanies[Math.floor(Math.random() * silverGoldCompanies.length)]);
            companies.push(silverGoldCompanies[Math.floor(Math.random() * silverGoldCompanies.length)]);
            companies.push(silverGoldCompanies[Math.floor(Math.random() * silverGoldCompanies.length)]);
            
            companies.forEach(company => {
                const section = document.createElement("section");
                section.innerHTML = `<h5>${company.name} <span class="membership_${company.membership}" title="${company.membership} member">★</span></h5>`;
                section.innerHTML += `<img src="${company.logo}" alt="${company.name} Logo">`;
                section.innerHTML += `<p>${company.description}</p>`;
                section.innerHTML += `<div class="spotlight-footer"><tel>${company.phone}</tel></div>`;
                container.appendChild(section);
            });
            
          });
    }

})();