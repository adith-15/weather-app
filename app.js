const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const search = document.querySelector('.search-box button');
const weatherDetails = document.querySelector('.weather-deets');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '4b5b8245135bd3c5e7c461c13e228403';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`).then(response => response.json()).then
        (json => {

            if (json.cod === '404') {


                container.style.height = '420px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temp = document.querySelector('.weather-box .temp');
            const desc = document.querySelector('.weather-box .desc');
            const humidity = document.querySelector('.weather-deets .humidity span');
            const wind = document.querySelector('.weather-deets .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.jpg';
                    break;

                case 'Rain':
                    image.src = 'rainy.jpg';
                    break;

                case 'Snow':
                    image.src = 'snowy.jpg';
                    break;

                case 'Clouds':
                    image.src = 'cloudy.jpg';
                    break;

                case 'Haze':
                    image.src = 'hazy.jpg';
                    break;

                default:
                    image.src = 'default.jpg';
                    break;
            }

            temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            desc.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '650px';
        })
})