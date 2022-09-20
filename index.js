//time and date------------------------------------------------------------------------------
let now = new Date();
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let newDate = document.querySelector("#dateToday");
newDate.innerHTML = `Last Updated on <strong>${day}</strong> ${month} ${date}, ${year} ${hour}:${minutes}`;
//end time and date-----------------------------------------------------------------------------------

//forecast Day----------------------------------------------------------------------------------------
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

//forecast Week-----------------------------------------------------------------------------------------
function displayWeekForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">  ${formatDay(forecastDay.dt)}</div>
          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          />
          <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//forecast Coordinates-------------------------------------------------------------------------
function getForecast(coordinates) {
  let apiKeyForecast = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyForecast}&units=imperial`;
  axios.get(apiUrlForecast).then(displayWeekForecast);
}

//weather display------------------------------------------------------------------------------
function displayWeather(response) {
  let locationCity = document.querySelector("#locationCity");
  let locationTemp = document.querySelector("#locationTemp");
  let temperature = Math.round(celsiusTemperature);
  let city1 = response.data.name;
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#windSpeed");
  let humidityElement = document.querySelector("#humidity");

  celsiusTemperature = response.data.main.temp;

  description.innerHTML =
    `Description: ` + response.data.weather[0].description;
  locationCity.innerHTML = `${city1} `;
  locationTemp.innerHTML = `${temperature}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  windElement.innerHTML =
    `Wind: ` + Math.round(response.data.wind.speed) + ` km/h`;
  humidityElement.innerHTML = `Humidity: ` + response.data.main.humidity + `%`;

  getForecast(response.data.coord);
}

// search city------------------------------------------------------------------------------------
function search(city) {
  let apiKey = "dc0706dfd0afd6a4fbfc21adb5196f26";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl1).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let city = "Nashville";
let key = "dc0706dfd0afd6a4fbfc21adb5196f26";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

axios.get(url).then(displayWeather);

//location------------------------------------------------------------------------------------------
function currentPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

navigator.geolocation.getCurrentPosition(currentPosition);

//current location button-----------------------------------------------------------------------------
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Nashville");