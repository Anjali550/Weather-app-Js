let apiKey = "62a113c0eda80f2a6791271a91b16a3e";
const inputElement = document.getElementById("myInput");

const cityName = inputElement.value;
function onSearch() {
  let loader = document.querySelector(".loader");
  loader.classList.add("visible");
  let btnn = document.querySelector("#btn1");
  btnn.style.opacity= 0.1;
  let btnn2 = document.querySelector("#btn2");
  btnn2.style.opacity= 0.1;
  let right1 = document.querySelector("#rightt");
  right1.style.opacity= 0.1;
const cityName = inputElement.value;
  getWeather(cityName);
  getDaily(cityName);
  setTimeout(() => {
    loader.classList.remove("visible");
    btnn.style.opacity=1;
    // btnn.style.display=none;
    btnn2.style.opacity=1;
    right1.style.opacity=1;
  }, 2000);
}

// Rest of your code...

// function spin1(){

let getWeather = (cityName) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  )
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      // console.log(result);
      let tempH = document.getElementById("temP");
      tempH.innerText = Math.floor(result.main.temp / 10) + "°C";
      let cloudH = document.getElementById("cloud");
      cloudH.innerText = result.weather[0].main;
      let cityH = document.getElementById("city");
      cityH.innerText = result.name;

      let card2Div = document.querySelector(".card2");
      card2Div.innerHTML = `
          <div class="card-first">
            <div class="cards2">
              <h3>Wind status</h3>
              <p><span id="status">${Math.floor(
                result.wind.speed
              )}</span>mph</p>
              <div class="wind-logo">
                <i class="fa-solid fa-play" style="color: #293751;"> </i>
                <p id="wind-t">wsw</p>
              </div>
             
            </div>
            <div class="cards2">
              <h3>Humidity</h3>
              <p><span id="status">${result.main.humidity}</span>%</p>
              <div class="upper">
                <p id="rge-text">0</p>
                <p id="rge-text">50</p>
                <p id="rge-text">100</p>
              </div>
              <div class="progress-bar">

              </div>
            </div>
          </div>
            <div class="card-second">
              <div class="cards2">
                <h3>visibility</h3>
                <p><span id="status">${Math.round(
                  result.visibility / 1609
                )} </span>miles</p>
                 
              </div>
              <div class="cards2">
                <h3>Air Pressure</h3>
                <p><span id="status">${result.main.pressure} </span>mb</p>
              </div>
            </div>
            
          `;
    })
    .catch((error) => {
      console.log(error);
    });
};
// getWeather("Delhi");

// for date
const currentDate = new Date();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
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
const formattedDate = `Today ${dayNames[currentDate.getDay()]} ${
  monthNames[currentDate.getMonth()]
} ${currentDate.getDate()}`;

const dateDisplayElement = document.getElementById("dateDisplay");
dateDisplayElement.innerText = formattedDate;

// for next 5 days forecast
let getDaily = (cityName) => {
  let cardsDiv = document.querySelector(".card");
  cardsDiv.innerHTML = "";
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=6&unit=metric&appid=${apiKey}`
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      // console.log(result.list[1]);
      for (let i = 1; i < result.list.length; i++) {
        cardsDiv.innerHTML += `
          <div class="cards">
          <p>${Date.now()}</p>
          <img  src="http://openweathermap.org/img/w/${
            result.list[i].weather[0].icon
          }.png" width="80%"/>
         <div class="temp">
          <p class="p1"><span class="Rtext">${Math.floor(
            result.list[i].main.temp_max / 10
          )}</span><span> &deg;C</span></p>
          <p class="p2">${Math.floor(
            result.list[i].main.temp_max / 10
          )}</span><span> &deg;C</span></p>
         </div>
        </div>`;
        console.log(result.list[1]);
      }
    })
    .catch((error) => console.log(error));
};

// getDaily();
let element = document.getElementById("btn1");
let element2 = document.getElementById("btn2");
function searchSection2() {
  element.style.display = "block";
  element2.style.display = "none";
}
function searchSection() {
  element2.style.display = "block";
  element.style.display = "none";
}

// -------to-change-temp---------
function getCelcious() {
  let currentTemp = document.querySelector("#temP");
  let curr = parseInt(currentTemp.innerText);
  currentTemp.innerText = ((curr - 32)/10) / 1.8 + "°C";
  let p1 = document.querySelectorAll(".p1");
  let p2 = document.querySelectorAll(".p2");

  for (let i = 0; i < p1.length; i++) {
    let cardP1 = parseInt(p1[i].innerText);
    p1[i].innerText = ((cardP1 - 32)/10) / 1.8 + "°C";
  }
  for (let j = 0; j < p2.length; j++) {
    let cardP2 = parseInt(p2[j].innerText);
    p2[j].innerText = ((cardP2 - 32)/10) / 1.8 + "°C";
  }
}
function getFarh() {
  let currentTemp = document.querySelector("#temP");
  let curr = parseInt(currentTemp.innerText);
  currentTemp.innerText = curr * 1.8 + 32 + "°F";

  let p1 = document.querySelectorAll(".p1");
  let p2 = document.querySelectorAll(".p2");

  for (let i = 0; i < p1.length; i++) {
    let cardP1 = parseInt(p1[i].innerText);
    p1[i].innerText = (cardP1 * 1.8)/10 + 32 + "°F";
  }
  for (let j = 0; j < p2.length; j++) {
    let cardP2 = parseInt(p2[j].innerText);
    p2[j].innerText = (cardP2 * 1.8)/10 + 32 + "°F";
  }
}
