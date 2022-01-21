// TASK 1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

let currentTime = new Date();
let dateTime = document.querySelector(".date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let date = currentTime.getDate();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentTime.getMonth()];

let hour = currentTime.getHours();
hour = ("0" + hour).slice(-2); //will return 2 digit numbers
let minute = currentTime.getMinutes();
minute = ("0" + minute).slice(-2); //will return 2 digit numbers

dateTime.innerHTML = `${day}, ${date} ${month} | ${hour}:${minute}`;

/* REMARKS

Convert 24h -> 12h
console.log(
  currentTime.toLocaleTimeString("en-US", {
      -> (had to change from UTC into CET (would be good to find a better/cleaner solution))
    timeZone: "CET",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  })
); */

// TASK 2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

//Checks if input is empty, has spaces or is a digit. IMPORTANT -> Find solution for special chars!!
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null || /^\d+$/.test(str);
}

//show temperature for location user has searched
function showTemp(response) {
  console.log(response.data);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  weatherDescr.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windPower.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

let weatherDescr = document.querySelector(".weather-descr");

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  if (isEmptyOrSpaces(searchInput.value)) {
    alert(`Invalid input!`);
  } else {
    console.log(searchInput.value);
    locationName.innerHTML = searchInput.value.replace(
      //returns every string's first char capitalized / title case
      /(^|[\s-])\S/g,
      function (match) {
        return match.toUpperCase();
      }
    );
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

//show current location and temperature
let apiKey = "84617a2d9f6cdc8070faab840a39470e";
let apiGeoUrl = "https://api.openweathermap.org/data/2.5/weather?";
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//show temp and city
function showTempLoc(response) {
  console.log(response);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  locationName.innerHTML = response.data.name;
  weatherDescr.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windPower.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(`${apiGeoUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showTempLoc);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let locationName = document.querySelector(".location-name");

let humidity = document.querySelector(".humidity");
let windPower = document.querySelector(".wind-pwr");

// TASK 3
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

//°F = °C * 1,8 + 32
function toFahrenheit(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round(currentTemp.innerHTML * 1.8 + 32);
  //after clicking °F, the °F "button" turns grey and it becomes disabeled to prevent further calculating °F into °F.
  //the °C "button" turns back to its default color and becomes enabled again so the user can calculate °F back into °C again.
  fahrTemp.style.color = "#70757a";
  celsTemp.style.color = "#212529";
  fahrTemp.style.pointerEvents = "none";
  celsTemp.style.pointerEvents = "auto";
}

//C = 5/9 x (F - 32)
function toCelsius(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round((5 / 9) * (currentTemp.innerHTML - 32));
  celsTemp.style.color = "#70757a";
  fahrTemp.style.color = "#212529";
  fahrTemp.style.pointerEvents = "auto";
  celsTemp.style.pointerEvents = "none";
}

let currentTemp = document.querySelector(".temp-number");

let celsTemp = document.querySelector("#cels-temp");
celsTemp.addEventListener("click", toCelsius);

let fahrTemp = document.querySelector("#fahr-temp");
fahrTemp.addEventListener("click", toFahrenheit);
