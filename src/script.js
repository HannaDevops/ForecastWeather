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

function showForecast(){
    let forecastElem = document.querySelector("#forecast");
    console.log(forecastElem);
    let days = ["Mon", "Tue", "Wed"];
    let forecastRow =`<div class="row">`;
    days.forEach(function (days){
        forecastRow = forecastRow + `
        <div class="col-2">
            <h6 class="forecast-date">${days}</h6>
            <img src="" class="forecast-img" width="30" alt=""/>🌤
            <h6  class="forecast-temper"> 
                <span class="forecast-temper-max">21°</span>
                <span class="forecast-temper-min">19°</span>
            </h6>
        </div>
    `;
    });
    forecastRow = forecastRow + `</div>`;
    forecastElem.innerHTML = forecastRow;
}

function displayTemper(response){
    //console.log(response.data);
    let cityElem = document.querySelector("#city");
    let temperElem = document.querySelector("#temper");
    let descriptionElem =document.querySelector("#description");
    let humidElem = document.querySelector("#humid");
    let windElem =document.querySelector("#wind");
    let nowtimeElem = document.querySelector("#nowtime");
    let iconElem = document.querySelector("#w-icon");
    showForecast();
    celsTemp = response.data.main.temp;
    temperElem.innerHTML =Math.round(celsTemp);
    cityElem.innerHTML =response.data.name;
    descriptionElem.innerHTML =response.data.weather[0].description;
    humidElem.innerHTML =response.data.main.humidity;
    windElem.innerHTML =Math.round(response.data.wind.speed);
    nowtimeElem.innerHTML = formatDate(response.data.dt * 1000);
    iconElem.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
function showWeather(cityName){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
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