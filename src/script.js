function formatDate(timestamp){
    let dateNow = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    let hours = dateNow.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
      }
    let minutes = dateNow.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    let day = days[dateNow.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function showDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [ "Sun", "Mon", "Tue", "Wed", "Thu",  "Fri",  "Sat" ];
    return days[day];
}

function showForecast(response){
    let forecastElem = document.querySelector("#forecast");
    let forecastDaily = response.data.daily;
    console.log(forecastDaily);
    let forecastRow =`<div class="row">`;
    
    forecastDaily.forEach(function (forecastArray, countElem){
        if (countElem < 6){
        let dayName = showDay(forecastArray.time);
        let tMax = Math.round(forecastArray.temperature.maximum);
        let tMin = Math.round(forecastArray.temperature.minimum);
        forecastRow = forecastRow + `
        <div class="col-2">
            <h6 class="forecast-date">${dayName}</h6>
            <img src="${forecastArray.condition.icon_url}" class="forecast-img" width="30" alt=""/>
            <h6  class="forecast-temper"> 
                <span class="forecast-temper-max">${tMax}°</span>
                <span class="forecast-temper-min">${tMin}°</span>
            </h6>
        </div>
    `;}
    });
    forecastRow = forecastRow + `</div>`;
    forecastElem.innerHTML = forecastRow;
}

function dispalyForecast(coordinates){
    console.log(coordinates);
    let apiKey = "35af20a51228d76bt18bb4ac458c490o";
    let apiUrl =`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(showForecast);
}

function displayTemper(response){
    //console.log(response.data);
    let cityElem = document.querySelector("#city");
    let temperElem = document.querySelector("#temper");
    let descriptionElem = document.querySelector("#description");
    let humidElem = document.querySelector("#humid");
    let windElem = document.querySelector("#wind");
    let nowtimeElem = document.querySelector("#nowtime");
    let iconElem = document.querySelector("#w-icon");
    cityElem.innerHTML = response.data.city;
    celsTemp = response.data.temperature.current;
    temperElem.innerHTML = Math.round(celsTemp);
    descriptionElem.innerHTML =response.data.condition.description;
    humidElem.innerHTML = response.data.temperature.humidity;
    windElem.innerHTML = Math.round(response.data.wind.speed);
    nowtimeElem.innerHTML = formatDate(response.data.time * 1000);
    iconElem.setAttribute("src", `${response.data.condition.icon_url}`);
    dispalyForecast(response.data.coordinates);
}
function showWeather(cityName){
  let apiKey = "35af20a51228d76bt18bb4ac458c490o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemper);
}


function searchCity(event){
  event.preventDefault();
  let cityInsert = document.querySelector("#city-insert");
  farenTemp.classList.remove("active");
  celsijTemp.classList.add("active");
  showWeather(cityInsert.value.trim());
}

function showFarenheit(event){
  event.preventDefault();
  let farenElem = document.querySelector("#temper");
  celsijTemp.classList.remove("active");
  farenTemp.classList.add("active");
  let farenheiTemp = celsTemp *9/5 + 32;
  farenElem.innerHTML =  Math.round(farenheiTemp);
}
function  showCelsij(event){
  event.preventDefault();
  let celsijElem = document.querySelector("#temper");
  farenTemp.classList.remove("active");
  celsijTemp.classList.add("active");
  celsijElem.innerHTML =  Math.round(celsTemp);
}

showWeather("Tokyo");

let celsTemp = null;

let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", searchCity);

let farenTemp = document.querySelector("#farengeit-temp");
farenTemp.addEventListener("click", showFarenheit);

let celsijTemp = document.querySelector("#celsiy-temp");
celsijTemp.addEventListener("click", showCelsij);