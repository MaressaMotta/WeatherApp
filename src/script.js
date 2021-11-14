//Date format

let now = new Date();

let currentDay = document.querySelector(".day");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

currentDay.innerHTML = `${day}`;

let currentTime = document.querySelector(".time");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hour}:${minutes}`;

//search for city name, display weather
function displayWeatherCondition(response) {
  document.querySelector("#EnterCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "31fe610defa048ce46128f578b9c1411";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function inputCity(event) {
  event.preventDefault();

  let city = document.querySelector("#EnterCity").value;
  searchCity(city);
}

//current location button

function searchLocation(position) {
  let apiKey = "31fe610defa048ce46128f578b9c1411";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let submit = document.querySelector("#city-form");
submit.addEventListener("submit", inputCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity();
