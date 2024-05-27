const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = nameCity.value.trim();
    const country = nameCountry.value.trim();

    if (!city || !country) {
        showError('Por favor, ingresa una ciudad y un país.');
        return;
    }

    callAPI(city, country);
});

async function callAPI(city, country) {
    const apiKey = 'f6ce5ec9e1bbde1116100095b197dd76';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener el pronóstico del tiempo.');
        }
        const data = await response.json();
        if (data.cod === '404') {
            throw new Error('Ciudad no encontrada.');
        }
        clearHTML();
        showWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function showWeather(data) {
    const { name, main: { temp, temp_min, temp_max }, weather } = data;
    const { icon } = weather[0];

    const degrees = Math.round(temp);
    const min = Math.round(temp_min);
    const max = Math.round(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);
}

function showError(message) {
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.textContent = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function clearHTML() {
    result.innerHTML = '';
}
