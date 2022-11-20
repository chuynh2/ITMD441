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
          
           displayWeather(json);
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