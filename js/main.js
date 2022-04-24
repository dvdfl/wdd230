let dateField = document. querySelector("#last-updated");
let yearField = document. querySelector("#current-year");
let currentDate = new Date();
dateField.innerHTML = currentDate;
yearField.innerHTML = currentDate.getFullYear();