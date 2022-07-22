const getById = (elId) => { return document.getElementById(elId); }
const menuBtn = document.getElementById("smenu_button");
const navEl = document.getElementById("mainnav");
menuBtn.addEventListener("click", () => {
    console.log("setting responsive")
    navEl.classList.toggle("responsive");
    menuBtn.classList.toggle("responsive");
});

window.onresize = () => {
    if (window.innerWidth > 760) {
        console.log("window resize")
        navEl.classList.remove('responsive')
        menuBtn.classList.remove('responsive')        
    }
};
//temperature

const weatherDegrees = document.getElementById("weather_degrees");
const weatherWindSpeed = document.getElementById("weather_windspeed");
const weatherWindChill = document.getElementById("weather_windchill");
const apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=Bethesda,MD,US&units=imperial&appid=";
const apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Bethesda,MD,US&units=imperial&appid=";

// if Weather elements are on the page then gets temperature
if (weatherDegrees && weatherWindSpeed && weatherWindChill) {
    //apiFetch();
    const ak = "e3cf141a197ad7d8f55f34115bd5bcd5";
    fetchData(apiCurrentUrl + ak, displayResults)
    fetchData(apiForecastUrl + ak, displayForecast)
}

function displayResults(weatherData) {
    const tempDesc = document.getElementById("temp_desc");
    const weatherIcon = document.getElementById("weather_icon");
    const humidity = document.getElementById("weather_humidity");
    // icon properties
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    // setting icon
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('srcset', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    // temperature description
    tempDesc.textContent = desc;
    // temperature
    weatherDegrees.textContent = weatherData.main.temp.toFixed(0);
    // wind speed
    weatherWindSpeed.textContent = weatherData.wind.speed.toFixed(1);
    humidity.textContent = weatherData.main.humidity.toFixed(0);

    // windchill calculation
    let temp = weatherData.main.temp; //parseFloat(weather_degrees.textContent);
    let wind_speed = weatherData.wind.speed; //parseFloat(weatherWindSpeed.textContent);
    let wind_chill = 'N/A';

    if (temp <= 50 && wind_speed > 3) {
        let chill_value = 35.74 + (0.6215 * temp) - 35.75 * (wind_speed ** 0.16) + 0.4275 * temp * (wind_speed ** 0.16);
        wind_chill = chill_value.toFixed(1) + ' ℉';
    }
    //updating value on screen
    weatherWindChill.textContent = wind_chill;
}
function displayForecast(data) {
    const container = getById("forecast");
    container.innerHTML += `<div class="weather-detail align-left">
                            Wind Chill:
                            <span id="weather_windchill">-</span> ℉
                        </div>`;
}
async function apiFetch() {
    try {
        const ak = "e3cf141a197ad7d8f55f34115bd5bcd5";
        const response = await fetch(apiCurrentUrl + ak);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // this is for testing the call
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const templeSelect = getById("temple_selection");
const populateDropdown = (data) => {
        data.temples.forEach(temple => {
            templeSelect.innerHTML += `<option value="{temple.name}">${temple.name}</option>`
            //console.log(temple);
        });

} 
if (templeSelect) {
    fetchData("js/temples.txt",populateDropdown)
}
async function fetchData(apiCurrentUrl,callback) {
    const response = await fetch(apiCurrentUrl);
    if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        callback(data);
    } else {
        throw Error(await response.text());
    }
}
