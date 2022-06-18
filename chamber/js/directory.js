(function(){
    const container = document.getElementById("directory-list");
    fetch("js/companies.txt").then(function (response) {
        return response.json();
      }).then(function(data) {
        data.companies.forEach(company => {
            const section = document.createElement("section");
            section.innerHTML = `<img src="${company.logo}" alt="${company.name} Logo">`;
            section.innerHTML += `<h4>${company.name} <span class="membership_${company.membership}">★</span></h4>`;
            section.innerHTML += `<p>${company.description}</p>`;
            section.innerHTML += `<div class="comp_contact"><address>${company.address}</address><tel>${company.phone}</tel></div>`;
            container.appendChild(section);
        });
      });
      const btnList = document.getElementById("view_list");
      const btnCards = document.getElementById("view_cards");
      btnList.addEventListener("click", (e) => {
        if(!container.classList.contains("list")){
            container.classList.add("list")
        }
      });
      btnCards.addEventListener("click", (e) => {
        container.classList.remove("list")
      });

})();