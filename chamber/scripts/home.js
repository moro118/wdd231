document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    // Last modification date
    const lastModified = document.getElementById('lastmodified');
    if (lastModified) {
        lastModified.textContent = `Last Modification: ${document.lastModified}`;
    }

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        // Handle case where link is to root and current page is index.html
        if (linkPage === currentPage || (linkPage === '' && currentPage === 'index.html')) {
            link.classList.add('current');
        }
    });

    // Weather and Forecast
    const lat = 21.88; // Latitude for Aguascalientes
    const lon = -102.29; // Longitude for Aguascalientes
    const apiKey = '475326a976e8b812c6e27187138463e8';
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    async function getWeatherData() {
        try {
            const [currentWeatherResponse, forecastResponse] = await Promise.all([
                fetch(currentWeatherURL),
                fetch(forecastURL)
            ]);
            const currentData = await currentWeatherResponse.json();
            const forecastData = await forecastResponse.json();
            displayCurrentWeather(currentData);
            displayForecast(forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function displayCurrentWeather(data) {
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        const temp = data.main.temp.toFixed(0);
        const desc = data.weather[0].description;

        document.querySelector('#current-weather img').src = iconSrc;
        document.querySelector('#current-weather #temperature').textContent = `${temp}°C`;
        document.querySelector('#current-weather #description').textContent = desc;
    }

    function displayForecast(data) {
        const container = document.getElementById('forecast');
        container.innerHTML = '<h3>3-Day Forecast</h3>';
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyForecasts.forEach(day => {
            const dayName = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = day.main.temp.toFixed(0);
            container.innerHTML += `<p>${dayName}: ${temp}°C</p>`;
        });
    }

    // Business Spotlights
    const businessesContainer = document.getElementById('businesses');
    const membersURL = 'data/members.json';

    async function getSpotlightMembers() {
        try {
            const response = await fetch(membersURL);
            const members = await response.json();
            const spotlightMembers = members.filter(member => member.membershipLevel >= 2); // Filter for Gold (3) and Silver (2)
            displaySpotlights(spotlightMembers);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    function displaySpotlights(members) {
        businessesContainer.innerHTML = ''; // Clear existing content
        const shuffled = members.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3); // Get 3 random members

        selected.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="auto">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <hr>
                <a href="${member.websiteURL}" target="_blank">Visit Website</a>
                <p class="membership-level">${getMembershipLevelName(member.membershipLevel)} Member</p>
            `;
            businessesContainer.appendChild(card);
        });
    }

    function getMembershipLevelName(level) {
        if (level === 3) return 'Gold';
        if (level === 2) return 'Silver';
        return 'Member'; // Fallback
    }

    getSpotlightMembers();
    getWeatherData();
});