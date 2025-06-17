const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

// DOM elements
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const countrySelect = document.querySelector('.country-select');
const weatherBox = document.querySelector('.weather-box');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const updateTime = document.getElementById('update-time');

document.addEventListener("DOMContentLoaded", () => {
  // Search button click event
  searchBtn.addEventListener('click', () => {
    getResults();
  });

  // Enter key press event
  searchBox.addEventListener('keypress', (evt) => {
    if (evt.key === "Enter") {
      getResults();
    }
  });

  // Country select change event
  countrySelect.addEventListener('change', () => {
    if (searchBox.value.trim()) {
      getResults();
    }
  });

  // Load default weather for a popular city
  setTimeout(() => {
    if (!weatherBox.querySelector('.city').textContent.includes('New York')) {
      searchBox.value = 'London';
      getResults();
    }
  }, 1000);
});

async function getResults() {
  const city = searchBox.value.trim();
  const country = countrySelect.value;
  
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  showLoading();
  hideError();

  let query = `${city}`;
  if (country) {
    query += `,${country}`;
  }

  try {
    const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
    const weather = await response.json();

    if (weather.cod === "404") {
      showError("City not found. Please check the spelling and try again.");
      return;
    }

    if (weather.cod === "400") {
      showError("Invalid city name. Please try again.");
      return;
    }

    displayResults(weather);
    hideLoading();
    updateTimestamp();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    showError("Network error. Please check your internet connection and try again.");
    hideLoading();
  }
}

function displayResults(weather) {
  // Update location
  const city = document.querySelector('.location .city');
  city.innerHTML = `<i class="fas fa-map-pin"></i> ${weather.name}, ${weather.sys.country}`;

  // Update date
  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  // Update timezone
  const timezone = document.querySelector('.time-zone');
  const timezoneOffset = weather.timezone / 3600;
  timezone.textContent = `UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;

  // Update temperature
  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `<i class="fas fa-thermometer-half"></i> ${Math.round(weather.main.temp)}<span>°C</span>`;

  // Update feels like temperature
  const feelsLike = document.querySelector('.feels-like');
  feelsLike.textContent = `Feels like ${Math.round(weather.main.feels_like)}°C`;

  // Update weather description with dynamic icon
  const weatherEl = document.querySelector('.weather');
  const weatherIcon = getWeatherIcon(weather.weather[0].main);
  const weatherCode = getWeatherCode(weather.weather[0].main);
  
  weatherEl.innerHTML = `
    <i class="fas ${weatherIcon}"></i> 
    <span class="weather-text">${weather.weather[0].main}</span>
    <div class="weather-code">${weatherCode}</div>
  `;

  // Update high/low temperature
  const hilow = document.querySelector('.temp-range');
  hilow.innerHTML = `
    <span class="min"><i class="fas fa-arrow-down"></i> ${Math.round(weather.main.temp_min)}°C</span>
    <span class="separator">|</span>
    <span class="max"><i class="fas fa-arrow-up"></i> ${Math.round(weather.main.temp_max)}°C</span>
  `;

  // Update additional weather details
  updateWeatherDetails(weather);

  // Show weather box with animation
  weatherBox.style.display = 'block';
  weatherBox.style.animation = 'fadeIn 0.5s ease-in-out';
}

function updateWeatherDetails(weather) {
  // Humidity
  const humidity = document.getElementById('humidity');
  humidity.textContent = `${weather.main.humidity}%`;

  // Wind speed
  const wind = document.getElementById('wind');
  wind.textContent = `${Math.round(weather.wind.speed * 3.6)} km/h`; // Convert m/s to km/h

  // Visibility
  const visibility = document.getElementById('visibility');
  const visibilityKm = weather.visibility / 1000; // Convert meters to kilometers
  visibility.textContent = `${visibilityKm.toFixed(1)} km`;

  // Pressure
  const pressure = document.getElementById('pressure');
  pressure.textContent = `${weather.main.pressure} hPa`;
}

function getWeatherIcon(weatherMain) {
  const weatherIcons = {
    'Clear': 'fa-sun',
    'Clouds': 'fa-cloud',
    'Rain': 'fa-cloud-rain',
    'Drizzle': 'fa-cloud-drizzle',
    'Thunderstorm': 'fa-bolt',
    'Snow': 'fa-snowflake',
    'Mist': 'fa-smog',
    'Smoke': 'fa-smog',
    'Haze': 'fa-smog',
    'Dust': 'fa-smog',
    'Fog': 'fa-smog',
    'Sand': 'fa-smog',
    'Ash': 'fa-smog',
    'Squall': 'fa-wind',
    'Tornado': 'fa-wind'
  };
  
  return weatherIcons[weatherMain] || 'fa-cloud-sun';
}

function getWeatherCode(weatherMain) {
  const weatherCodes = {
    'Clear': 'SKY-001',
    'Clouds': 'SKY-002',
    'Rain': 'SKY-003',
    'Drizzle': 'SKY-004',
    'Thunderstorm': 'SKY-005',
    'Snow': 'SKY-006',
    'Mist': 'SKY-007',
    'Smoke': 'SKY-008',
    'Haze': 'SKY-009',
    'Dust': 'SKY-010',
    'Fog': 'SKY-011',
    'Sand': 'SKY-012',
    'Ash': 'SKY-013',
    'Squall': 'SKY-014',
    'Tornado': 'SKY-015'
  };
  
  return weatherCodes[weatherMain] || 'SKY-000';
}

function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function updateTimestamp() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  updateTime.textContent = `${hours}:${minutes}`;
}

function showLoading() {
  loading.style.display = 'block';
  weatherBox.style.display = 'none';
  error.style.display = 'none';
}

function hideLoading() {
  loading.style.display = 'none';
}

function showError(message) {
  errorMessage.textContent = message;
  error.style.display = 'block';
  weatherBox.style.display = 'none';
  loading.style.display = 'none';
}

function hideError() {
  error.style.display = 'none';
}

// Add some interactive features
searchBox.addEventListener('input', () => {
  if (searchBox.value.trim()) {
    searchBtn.style.opacity = '1';
  } else {
    searchBtn.style.opacity = '0.7';
  }
});

// Add keyboard navigation
searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    countrySelect.focus();
  }
});

countrySelect.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getResults();
  }
});

// Add status indicator animation
function updateStatusIndicator() {
  const statusDot = document.querySelector('.status-dot');
  if (statusDot) {
    statusDot.style.animation = 'blink 2s infinite';
  }
}

// Initialize status indicator
updateStatusIndicator();