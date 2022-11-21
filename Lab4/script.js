console.log("Test");
//GeoLocation API
let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      function fetchCurrentCoords(a, b){
        let latitude = a;
        let longitude = b;
        alert("Weather for your location will be loaded.");
        console.log("1");
        fetch("https://weatherdbi.herokuapp.com/data/weather/"+ latitude + "," + longitude)
        .then((res) => {
            console.log("2");
          if (res){
           return res.json(); 
          } else {
            console.log("6");
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
    let forecast = document.getElementById("forecast-flexbox");
    let inputLocation = document.getElementById("search-input").value;
    let todayForecast = document.getElementById("container-today-forecast");

    forecast.innerHTML="";
    console.log("15");
    if (inputLocation==""){
        alert("Please enter a valid location.");
        console.log("3");
    } else{
        console.log("7");
        let updatedInputLocation = inputLocation.replace(/\s/g,"");
        console.log(updatedInputLocation);
        fetch("https://weatherdbi.herokuapp.com/data/weather/" + updatedInputLocation)
        .then((res) => {
            console.log("4");
            if (res){
                return res.json();
            } else {
                console.log("5");
                throw new Error ("Network Response Error");
            }
        })
        .then (json => {
            if(json.status){
                console.log("9");
                alert(json+json.message);
                todayForecast.innerHTML="";
                forecast.innerHTML="";
                todayForecast.innerHTML=("Error: " + json.status + " " + json.message + " enter valid input.")
            } else {
                console.log("10");
                displayTodayWeather(json);
                displayDaysForecast(json);
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
    let precip = document.getElementById("precip");
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
    icon.innerHTML = `<img src="${arg.currentConditions.iconURL}"/>`;
    console.log("13");
}

//Display 7 Days forecast
function displayDaysForecast(arg){
    console.log("12");
    let forecastFlexbox = document.getElementById("forecast-flexbox");
    console.log(arg.next_days.length);
    for(i = 1, x = (arg.next_days.length - 1); i < x; i++){
        console.log("11");
        var day = arg.next_days[i];

        forecastFlexbox.innerHTML +=`
        <div id ="day">
            <strong>${day.day}</>
            <p>${day.comment}</p>
            <p>${day.max_temp.f + "°F"} </p>
            <p>${day.min_temp.f + "°F"} </p>
            <img src="${day.iconURL}">
        </div>`;
    }
}

//Search when enter button is pressed
document.getElementById("search-form").addEventListener("submit", function(event){
    event.preventDefault();
})