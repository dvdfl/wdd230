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

const close_alerts = getById("close_alerts");
close_alerts.addEventListener("click", () => {
    const alerts_banner = getById("weather_alerts");
    alerts_banner.parentNode.removeChild(alerts_banner);
});

//temperature

const weatherDegrees = document.getElementById("weather_degrees");
const weatherWindSpeed = document.getElementById("weather_windspeed");
const apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=Bethesda,MD,US&units=imperial&appid=";
const ak = "e3cf141a197ad7d8f55f34115bd5bcd5";

// if Weather elements are on the page then gets temperature
if (weatherDegrees && weatherWindSpeed) {
    fetchData(apiCurrentUrl + ak, displayResults)
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

    const apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=imperial&exclude=hourly,minutely&appid=${ak}`

    fetchData(apiForecastUrl, displayForecast)
}
function displayForecast(data) {
    const container = getById("forecast");
    const date2day = new Date(data.daily[2].dt * 1000);
    const date3day = new Date(data.daily[3].dt * 1000);

    container.innerHTML = ` <div class="weather-forecast">
                            Tomorrow <span id="fc_tomorrow">Min: ${data.daily[0].temp.min.toFixed(0)} - Max: ${data.daily[0].temp.max.toFixed(0)}</span> ℉
                        </div>
                        <div class="weather-forecast">
                            ${date2day.toLocaleString('default', { month: 'long' })} ${date2day.getDate()}<span>Min: ${data.daily[1].temp.min.toFixed(0)} - Max: ${data.daily[1].temp.max.toFixed(0)} </span> ℉
                        </div>
                        <div class="weather-forecast">
                            ${date3day.toLocaleString('default', { month: 'long' })} ${date3day.getDate()}<span>Min: ${data.daily[2].temp.min.toFixed(0)} - Max: ${data.daily[2].temp.max.toFixed(0)} </span> ℉
                        </div>`;
    const alertsList = getById("alerts_list")

    if (data.alerts) {
        data.alerts.forEach(temple => {
            alertsList.innerHTML += `<option value="{temple.name}">${temple.name}</option>`
            //console.log(temple);
        });
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
