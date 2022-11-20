//GeoLocation API
let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      function fetchCurrentCoords(a, b){
        let latitude = a;
        let longitude = b;
        alert("Weather for your location will be loaded.");
        fetch("https://weatherdbi.herokuapp.com/data/weather/"+ latitude + "," + longitude)
        .then((res) => {
          if (res){
           return res.json(); 
          } else {
           throw new Error("Network Response Error");
         }})
         .then( json => {
          
           displayTodayWeather(json);
           displayWeatherForecast(json);
         })
      };
      fetchCurrentCoords(position.coords.latitude, position.coords.longitude);
    })
}

//Get weather API went search button is clicked
function searchWeather(){
    let forecast = document.getElementById("forecast-grid");
    let inputLocation = document.getElementById("search-input");
    let todayForecast = document.getElementById("containter-today-forecast");

    forecast.innerHTML="";

    if (inputLocation==""){
        alert("Please enter a valid location.");
    } else{
        let updatedInputLocation = inputLocation.replace(/\s/g,"");
        fetch("https://weatherdbi.herokuapp.com/data/weather/" + updatedInputLocation)
        .then((res) => {
            if (res){
                return res.json();
            } else {
                throw new Error ("Network Response Error");
            }
        })
        .then (json => {
            if(json.status){
                alert(json+json.message);
                todayForecast.innerHTML="";
                forecast.innerHTML="";
                todayForecast.innerHTML=("Error: " + json.status + " " + json.message + " enter valid input.")
            } else {
                displayWeather(json);
                displayWeatherForecast;
            }
        })
        .catch (error =>{
            alert (error);
            todayForecast.innerHTML = ("Error: " + error);
        })
    }
}

//Display Today Forecast 
function displayTodayWeather(arg){
    let region = document.getElementById("region");
    let day = document.getElementById("day");
    let temp = document.getElementById("temp");
    let precip = document.getElementById("recip");
    let comment = document.getElementById("comment");
    let humidity = document.getElementById("humidity");
    let wind = document.getElementById("wind");
    let icon = document.getElementById("icon");

    region.innerHTML = arg.region;
    day.innerHTML = arg.currentConditions.dayhour;
    temp.innerHTML = (arg.currentConditions.temp.f + "°F");
    precip.innerHTML = ("Percipitation: " + arg.currentConditions.precip);
    comment.innerHTML = arg.currentConditions.comment;
    humidity.innerHTML = ("Humidity: " + arg.currentConditions.humidity);
    wind.innerHTML = ("Wind: " + arg.currentConditions.wind.mile + " mph");
    icon.innerHTML = `<img src="${arg.currentConditions.iconURL}"/>`
}

