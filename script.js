
let apiKey = "62a113c0eda80f2a6791271a91b16a3e";
const inputElement = document.getElementById("myInput");

inputElement.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const cityName = event.target.value;
    getWeather(cityName);
  }
});

    let getWeather = (cityName) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(data => {return data.json()})
        .then(result => {
          console.log(result);
          let tempH = document.getElementById("temP");
          tempH.innerText=Math.floor(result.main.temp/10)+"°C";
          let cloudH = document.getElementById("cloud");
          cloudH.innerText=result.weather[0].main;
          let cityH = document.getElementById("city");
          cityH.innerText=result.name;


          let card2Div= document.querySelector(".card2") ;
          card2Div.innerHTML=`
          <div class="card-first">
            <div class="cards2">
              <h3>Wind status</h3>
              <p><span id="status">${Math.floor(result.wind.speed)}</span>mph</p>
            </div>
            <div class="cards2">
              <h3>Humidity</h3>
              <p><span id="status">${result.main.humidity}</span>%</p>
              <input type="range" id="rangeValue" name="rangeValue" min="0" max="100" step="1" value="50">
            </div>
           </div>
            <div class="card-second">
              <div class="cards2">
                <h3>visibility</h3>
                <p><span id="status">${Math.round(result.visibility / 1609)}</span>miles</p>
              </div>
              <div class="cards2">
                <h3>Air Pressure</h3>
                <p><span id="status">${result.main.pressure}</span>mb</p>
              </div>
            </div>
          `
          
        })
        .catch(error => {
          console.log(error);
        });
    }

   

    // for date
    const currentDate = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedDate = `Today ${dayNames[currentDate.getDay()]} ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}`;

  const dateDisplayElement = document.getElementById('dateDisplay');
dateDisplayElement.innerText = formattedDate;


// for next 5 days forecast
let getDaily = (cityName) => {
  // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&units=metric&appid=${apiId}`)
  // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},{state code},{country code}&limit={limit}&appid={apiKey}`)
      .then(res => { return res.json() })
      .then(result => {
        for(let i=1; i<result.list.length; i++){
          let cardsDiv = document.querySelector(".card");
          cardsDiv.innerHTML +=`
          <div class="cards">
          <p>${Date.now()}</p>
          <img src="LightCloud.png" width="80%"/>
         <div class="temp">
          <p><span class="Rtext">${Math.floor(result.list[i].main.temp_max)}</span><span> &deg;C</span></p>
          <p>${Math.floor(result.list[i].main.temp_max)}</span><span> &deg;C</span></p>
         </div>
        </div>`
        console.log(result.list[1]);
        }
      })
      .catch(error=> console.log(error));
}

getDaily();
