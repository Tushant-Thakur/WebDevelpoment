async function getWeather(city = "London") {
  const apiKey = "0e902b433ac34d4a86a175634252108"; 
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  const loader = document.getElementById("loader");
  const weatherInfo = document.getElementById("weatherInfo");

  try {
    loader.style.display = "block";
    weatherInfo.innerHTML = "";

    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const condition = data.current.condition.text.toLowerCase();

    weatherInfo.innerHTML = `
      <div class="temp">${data.current.temp_c}°C</div>
      <div><img src="https:${data.current.condition.icon}" alt="icon"></div>
      <div>${data.current.condition.text}</div>
      <div>Humidity: ${data.current.humidity}%</div>
      <div>Wind: ${data.current.wind_kph} kph</div>
    `;

  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  } finally {
    loader.style.display = "none";
  }
}

// Default load
window.onload = function() {
  getWeather("London");
};

// Button click
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("city").value;
  if (city) getWeather(city);
});

/* Techy Particle Background */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 2,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00eaff";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
