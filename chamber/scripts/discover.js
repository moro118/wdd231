import { attractions } from '../data/attractions.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }

    // Last modification date
    const lastModified = document.getElementById('lastmodified');
    if (lastModified) {
        lastModified.textContent = `Last Modification: ${document.lastModified}`;
    }

    displayVisitMessage();
    displayAttractions();
    setupDialog();
});


function displayVisitMessage() {
    const visitMessageElement = document.getElementById('visit-message');
    if (!visitMessageElement) return;

    const lastVisit = localStorage.getItem('lastVisitDiscoverPage');
    const now = Date.now();
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    if (!lastVisit) {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeSinceLastVisit = now - Number(lastVisit);
        if (timeSinceLastVisit < oneDayInMillis) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            const daysSinceLastVisit = Math.floor(timeSinceLastVisit / oneDayInMillis);
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            visitMessageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }

    // Store the current visit date in milliseconds
    localStorage.setItem('lastVisitDiscoverPage', now);
}

function displayAttractions() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    attractions.forEach((attraction, index) => {
        const card = document.createElement('section');
        card.classList.add('attraction-card');

        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" alt="Photo of ${attraction.name}" loading="lazy" width="300" height="200">
            </figure>
            <div class="card-content">
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button data-index="${index}">Learn More</button>
            </div>
        `;

        gallery.appendChild(card);
    });
}

function setupDialog() {
    const dialog = document.getElementById('attraction-dialog');
    const dialogContent = document.getElementById('dialog-content');
    const gallery = document.querySelector('.gallery');
    const closeButton = dialog.querySelector('.close-modal');

    if (!dialog || !gallery || !closeButton) return;

    // Use event delegation to handle clicks on "Learn More" buttons
    gallery.addEventListener('click', (e) => {
        if (e.target.matches('button[data-index]')) {
            const index = e.target.dataset.index;
            const attraction = attractions[index];

            if (attraction) {
                dialogContent.innerHTML = `
                    <h2>${attraction.name}</h2>
                    <img src="${attraction.image}" alt="Photo of ${attraction.name}" loading="lazy" width="300" height="200" style="width:100%; height:auto; border-radius: 8px;">
                    <address>${attraction.address}</address>
                    <p>${attraction.description}</p>
                `;
                dialog.showModal();
            }
        }
    });

    // Close the dialog when the close button is clicked
    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    // Close the dialog when clicking outside of it
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
}