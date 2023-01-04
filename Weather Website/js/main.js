var weatherTable = document.getElementById("weather-table");
var locationInput = document.getElementById('locationInput');
const API_KEY = '6e24619aab954daca7f214629221410';
const monthNames = [
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
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
async function getWeather(city) {
  var response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
  );
  var responseData = await response.json();
  // console.log("responseData:", responseData);
  displayData(responseData);
}
function displayData(responseData) {
  // console.log(responseData);
  var currentDate = new Date();
  // console.log("currentDate:", currentDate.getDay());
  // console.log("Day:", days[currentDate.getDay()]); // Day Name
  // console.log("Youm:", currentDate.getDate()); // Day
  // console.log("Month:", monthNames[currentDate.getMonth()]); // Month Name
  var day1Index = currentDate.getDay() + 1;
  var day2Index = currentDate.getDay() + 2;
  if (currentDate.getDay() + 1 > 6) {
    day1Index = 0;
  }
  if (currentDate.getDay() + 2 > 6) {
    day2Index = 0;
  }
  var cartona = `
    <div class="col-md-4">
    <div id="today" class="today forecast">
      <div class="forecast-title d-flex justify-content-between align-content-center color1-title">
        <div class="day">${days[currentDate.getDay()]}</div>
        <div class="date">${currentDate.getDate()} ${monthNames[currentDate.getMonth()]
    }</div >
      </div >
    <div class="forecast-content color1-content">
        <div class="city">${responseData.location.name}</div>
        <div class="temp d-flex justify-content-between">
            <div class="degree">${responseData.current.temp_c}<span>o</span>C</div>
            <div class="degree-icon">
                <img src=http:${responseData.current.condition.icon} alt="">
            </div>
        </div>
        <div class="weather-desc">${responseData.current.condition.text}</div>
        <span class="icons"><img src="./images/icon-umberella.png" alt="">${responseData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
        <span class="icons"><img src="./images/icon-wind.png" alt="">${responseData.current.wind_kph}km/h</span>
        <span class="icons"><img src="./images/icon-compass.png" alt="">${responseData.current.wind_dir}</span>
    </div>
    </div >
  </div >
  <div class="col-md-4">
    <div class="forecast">
      <div class="forecast-title-next color2-title">
        <div class="day">${days[day1Index]}</div>
      </div>
      <div class="forecast-content-next color2-content">
        <div class="temp-icon text-center">
          <img src=${responseData.forecast.forecastday[1].day.condition.icon} alt="">
        </div>
        <div class="temp text-center">
          <div class="degree-next">${responseData.forecast.forecastday[1].day.maxtemp_c}<span>o</span>C</div>
        </div>
        <div class="temp text-center">
          <div class="degree-small">${responseData.forecast.forecastday[1].day.mintemp_c}<span>o</span></div>
        </div>
        <div class="weather-desc text-center">${responseData.forecast.forecastday[1].day.condition.text}</div>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="dayTwo forecast">
      <div class="forecast-title-next color1-title">
        <div class="day">${days[day2Index]}</div>
      </div>
      <div class="forecast-content-next color1-content">
        <div class="temp-icon text-center">
          <img src=${responseData.forecast.forecastday[2].day.condition.icon} alt="">
        </div>
        <div class="temp text-center">
          <div class="degree-next">${responseData.forecast.forecastday[2].day.maxtemp_c}<span>o</span>C</div>
        </div>
        <div class="temp text-center">
          <div class="degree-small">${responseData.forecast.forecastday[2].day.mintemp_c}<span>o</span></div>
        </div>
        <div class="weather-desc text-center">${responseData.forecast.forecastday[2].day.condition.text}</div>
      </div>
    </div>
  </div>

`;
  weatherTable.innerHTML = cartona;
}
locationInput.addEventListener('keyup', function (e) {
  // console.log(e.target.value);
  search(e.target.value);
})
async function search(searchValue) {
  if (searchValue) {
    var response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchValue}`
    );
    var responseData = await response.json();
    console.log("search Output:", responseData);
    if (responseData.length > 0) {
      // console.log('Found');
      let searchResponse = responseData.find(function (city) {
        let city_LowerCased = city.name.toLowerCase()
        // console.log("city_LowerCased:", city_LowerCased);
        // console.log("searchValue:", searchValue.toLowerCase());
        if (city_LowerCased.includes(searchValue.toLowerCase())) {
          return city;
        }
      });
      console.log('searchResponse:', searchResponse);
      if (searchResponse) {
        let foundCity = searchResponse.name;
        getWeather(foundCity);
      }
    }
  }
  else {
    getWeather("Cairo");
  }
}
getWeather("Cairo");
