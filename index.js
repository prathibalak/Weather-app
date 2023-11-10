const apikey = "03419f8561c2ee25a27f371fed729a37";
const weatherDataEl = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city-input")


const formEl = document.querySelector("form")
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);

});
async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details =[
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,

        ]
        weatherDataEl.querySelector(".icon").innerHTML = `img src="sun img.png" alt="weather icon"`;
        weatherDataEl.querySelector(
            ".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(
            ".description").textContent = description;
        weatherDataEl.querySelector(
            ".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`)
            .join("");
        } catch(error){
            weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(
            ".temperature").textContent = "";
        weatherDataEl.querySelector(
            ".description").textContent = "An error happened! Please Try Again Later";
        weatherDataEl.querySelector(
            ".details").innerHTML = "";
        

    }
}
