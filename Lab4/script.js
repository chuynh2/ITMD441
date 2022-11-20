//GeoLocation API
let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      function fetchCurrentCoords(a, b){
        let latitude = a;
        let longitude = b;
        loadingGif()
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
    });
};


