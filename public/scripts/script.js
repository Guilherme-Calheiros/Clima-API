const body = document.querySelector('body');
const div = document.querySelector("#searchDiv i");
const input = document.querySelector("#searchText");

const city = document.querySelector("#city");
const weatherIcon = document.querySelector("#weatherIcon");
const description = document.querySelector("#description");
const degree = document.querySelector("#degree span") ;
const humidity = document.querySelector("#humidity span");
const wind = document.querySelector("#wind span");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const weatherData = document.querySelector("#weatherData");

const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

function data() {
    let value = input.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=a701f5d270589f3e847f26c89771006f&lang=pt_br`).then(response =>{
        response.json().then(json => {
            if(json.error) {
                return errorMessageContainer.classList.remove("hide"), weatherData.classList.add('hide')
            };
        toggleLoader();
        const valueDay = json.weather[0].icon
        if (valueDay.endsWith('n')){
            body.classList.add("night")
        } else {
            body.classList.remove("night")
        }
        errorMessageContainer.classList.add("hide");
        city.innerText = json.name
        weatherIcon.setAttribute('src',`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
        description.innerText = json.weather[0].description
        degree.innerText = parseInt(json.main.temp)
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerText = `${(json.wind.speed*3.6).toFixed(2)}Km/h`
        weatherData.classList.remove('hide')  
        toggleLoader();
    })
  })
}

div.addEventListener("click", () => {
    data()
})
input.addEventListener("keyup", () => {
    if (event.key === "Enter"){
        data();
    }
})