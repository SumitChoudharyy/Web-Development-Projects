const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer= document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector("[data-grantAccess]");

let currentTab = userTab;
const API_KEY = "587d9487bc6b56911f2d80041cbe9ddb";
currentTab.classList.add("current-tab");
getfromSessionStorage();

// Ek Kam Or Pending hai

function switchTab(clickedTab){

    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // Get the data Storage in session
            getfromSessionStorage();
        }

    }
}


userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})

// Check if co ordinates are already present in session storage 
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // If  Coordinates are not stored in session storage
        grantAccessContainer.classList.add("active");
    }else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherDetails(coordinates);
    }
}


async function fetchUserWeatherDetails(coordinates){
    const {lat,lon} = coordinates;
    // make grandcontainer invisble 
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // calling API to fetch data
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

        const data = await response.json();

        // Removing Loading Screen
        loadingScreen.classList.remove("active");
        // Making user informaiton screen Visible 
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }catch(err){
        loadingScreen.classList.remove("active");
        console.log("Error Occurs ", err);
    }
}

function renderWeatherInfo(data){

    // first , we have to fetch the element
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon= document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");
    

    // fetch value from weatherInfo object and put it in UI
    cityName.innerText = data?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`; 
    desc.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0].icon}.png`;
    let temps = data?.main?.temp;  // We are doing this because our api is giving 
    temp.innerText = `${((temps)/10).toFixed(2)} °C`;  //  may be temp*10 data {which is wrong, and this is our assumption }
    windspeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity} %`;
    cloudiness.innerText = `${data?.clouds.all} %`;

    // let newPara = document.createElement('p');
    // newPara.textContent = `${data?.main?.temp.toFixed(2)} C`;

    // document.body.appendChild(newPara);

}


// This Function Gives us the Users location
function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("No geoLocation Support");
        alert("No Geolocation support available");
    }
}


// This function shows the users location
function showPosition(position){

    const userCoordinates = {
        lat : position.coords.latitude,
        lon: position.coords.longitude, 
    }
    
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherDetails(userCoordinates); 
}


grantAccessButton.addEventListener("click",getLocation);

const searchInput = document.querySelector("[data-searchInput]"); 

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName ==="") 
        return;
    else
       fetchSearchWeatherInfo(cityName); 
});


async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(err){

    }
}

