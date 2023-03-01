function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thirsday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForcast(response) {
  console.log(response.data.daily);
  let forcastElemnet = document.querySelector("#forcast");
  let forcastHTML = `<div class ="row">`;
  let days = ["Thur", "Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
  <div class="col-2">
          <div class = "forcast-day"> ${day}</div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png";
              alt = "clear sky"
              id="icon"
              width="40"/>
              <div class="forcast-temp"> <span class = "forcast-temp-max"> 20° </span> <span class ="forcast-temp-min"> 10° </span> </div>
        </div> `;
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElemnet.innerHTML = forcastHTML;
}
function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "f5f0a9eb4490812b8cb30o193ft06985";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayTemperature(response) {
  //console.log(response.data);
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#country").innerHTML = response.data.country;
  document.querySelector("#pressure").innerHTML =
    response.data.temperature.pressure;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForcast(response.data.coordinates);
}
function search(city) {
  let apiKey = "f5f0a9eb4490812b8cb30o193ft06985";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Perth");
//displayForcast();
