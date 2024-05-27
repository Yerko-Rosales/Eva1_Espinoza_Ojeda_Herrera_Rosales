document.addEventListener("DOMContentLoaded", function() {
    getWeatherForecast();
});

document.getElementById('apiButton').addEventListener('click', function() {
    getWeatherForecast();
});

function getWeatherForecast() {
    const apiKey = 'b893298fb63a5ccb0789fe3d14cddda4';
    const city = 'Santiago,cl';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const forecastContainer = document.getElementById('forecastCards');
        forecastContainer.innerHTML = '';

        // Filtrar la data para obtener un pronóstico por día (cada 24 horas)
        const dailyData = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));

        dailyData.forEach(entry => {
            const date = new Date(entry.dt * 1000).toLocaleDateString('es-ES');
            const temp = (entry.main.temp - 273.15).toFixed(2); // Convertir de Kelvin a Celsius
            const description = entry.weather[0].description;
            const icon = entry.weather[0].icon;

            // Crear una tarjeta para cada día de pronóstico
            const card = document.createElement('div');
            card.className = 'col-md-2';

            card.innerHTML = `
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${date}</h5>
                        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                        <p class="card-text">${temp}°C</p>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            `;

            forecastContainer.appendChild(card);
        });

        // Desplazar la ventana hacia arriba para mostrar el pronóstico
        document.getElementById('forecastContainer').scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => console.error('Error:', error));
}
