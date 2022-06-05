const weather_degrees = document.getElementById("weather_degrees");
const weather_windspeed = document.getElementById("weather_windspeed");
const weather_windchill = document.getElementById("weather_windchill");

if(weather_degrees && weather_windchill && weather_windchill){
    let temp = parseFloat(weather_degrees.textContent);
    let wind_speed = parseFloat(weather_windspeed.textContent);
    let wind_chill = 'N/A';
    
    if(temp <=50 && wind_speed > 3){
        let chill_value = 35.74 + (0.6215 * temp)- 35.75 * (wind_speed ** 0.16) + 0.4275 * temp * (wind_speed ** 0.16);
        wind_chill = chill_value.toFixed(1) + ' ℉';
    }
    //updating value on screen
    weather_windchill.textContent = wind_chill;
}