// date fields
let dateField = document. querySelector("#last-updated");
let yearField = document. querySelector("#current-year");
// current date
let currentDate = new Date();
// setting date values
dateField.innerHTML = document.lastModified;
yearField.innerHTML = currentDate.getFullYear();