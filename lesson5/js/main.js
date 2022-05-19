const favchapInput =  document.getElementById("favchap");
const addChapterBtn  = document.getElementById("addChapterBtn");
const listEl =  document.querySelector(".list");

addChapterBtn.addEventListener("click", ()=>{
    let enteredValue = favchapInput.value;
    //checking if textbox is empty
    if(enteredValue.trim() != ""){
        // new list item
        const newListItem = document.createElement("li");
        newListItem.textContent = enteredValue;
        // new button
        const newDeleteBtn = document.createElement("button");
        newDeleteBtn.textContent = '❌';
        newDeleteBtn.ariaLabel = "Remove " + enteredValue;
        // button delete event handler
        newDeleteBtn.addEventListener("click", ()=>{
            listEl.removeChild(newListItem);
        });
        // adding button to the list item
        newListItem.appendChild(newDeleteBtn);
        
        // adding list item to the list
        listEl.appendChild(newListItem);

        //clearing textbox
        favchapInput.value = "";
    }

    // sents focus back to textbox
    favchapInput.focus();

});