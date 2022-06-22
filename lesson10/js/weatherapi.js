// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const minTemp = document.querySelector('#min_temp');
const maxTemp = document.querySelector('#max_temp');
const windSpeed = document.querySelector('#wind_speed');
const humidity = document.querySelector('#humidity');
const url = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=";

console.log(url);

async function apiFetch() {
    try {
      const ak = "e3cf141a197ad7d8f55f34115bd5bcd5";
      const response = await fetch(url + ak);
      if (response.ok) {
        const data = await response.json();
        //console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;

    minTemp.textContent = weatherData.main.temp_min.toFixed(0);
    maxTemp.textContent = weatherData.main.temp_max.toFixed(0);
    humidity.textContent = weatherData.main.humidity.toFixed(0);
    windSpeed.textContent = weatherData.wind.speed.toFixed(1);
}
  
  apiFetch();