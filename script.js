const apiKey = "95db4a8ef452cdb05560723b89bd2caf";

async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    return showError("Please enter a city name.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchWeather(url);
}

async function getWeatherByCoords() {
  const lat = document.getElementById("latInput").value.trim();
  const lon = document.getElementById("lonInput").value.trim();

  if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
    return showError("Please enter valid latitude and longitude.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetchWeather(url);
}

async function getWeatherByLocation() {
  if (!navigator.geolocation) {
    return showError("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
  }, () => {
    showError("Location access denied.");
  });
}

async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found.");

    const data = await response.json();
    const result = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    `;
    document.getElementById("weatherResult").innerHTML = result;
  } catch (error) {
    showError(error.message);
  }
}

function showError(message) {
  document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${message}</p>`;
}
