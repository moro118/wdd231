// --- HELPER FUNCTIONS ---

// 1. Get Favorites from LocalStorage
function getFavorites() {
    const storedFavorites = localStorage.getItem('trail_favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

// 2. Create HTML for one park card
function parkTemplate(park) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(park.id);
    const heartIcon = isFavorite ? '❤️' : '🤍';
    const activeClass = isFavorite ? 'fav-active' : '';

    return `
        <div class="park-card">
            <div class="card-image-container">
                <img src="images/${park.image}" alt="${park.name}" loading="lazy" width="300" height="200">
                <h3>${park.name}</h3>
            </div>
            <div class="card-content">
                <p><strong>Location:</strong> ${park.location}</p>
                <p><strong>Rating:</strong> ${park.rating} ⭐</p>
                <span class="park-tag">${park.difficulty}</span>
                <div class="card-actions">
                    <button class="details-btn" data-id="${park.id}">More Details</button>
                    <button class="fav-btn ${activeClass}" data-id="${park.id}">${heartIcon}</button>
                </div>
            </div>
        </div>
    `;
}

/**
 
  @returns {Promise<Array|null>} 
 */
async function fetchParks() {

    const url = '../final/data/parks.json'; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch park data:', error);
        return null; 
    }
}


const menuButton = document.getElementById('final-menu-btn'); 
const menu = document.getElementById('final-menu'); 
if (menuButton) {
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('open');
        menu.classList.toggle('open');
    });
}


async function initializeApp() {
    const parkList = await fetchParks();

  
    if (!parkList) {
       
        return;
    }


    const grid = document.getElementById('park-grid');
    if (grid) {
      
        grid.innerHTML = parkList.map(parkTemplate).join('');


        const filterElement = document.getElementById('filter-difficulty');
        if (filterElement) {
            filterElement.addEventListener('change', (e) => {
                const selectedValue = e.target.value;
                const filteredList = selectedValue === 'all'
                    ? parkList
                    : parkList.filter(park => park.difficulty === selectedValue);
                grid.innerHTML = filteredList.map(parkTemplate).join('');
            });
        }

       
        grid.addEventListener('click', (e) => {
            const target = e.target;
            
           
            if (target.classList.contains('details-btn')) {
                const parkId = parseInt(target.dataset.id);
                const park = parkList.find(p => p.id === parkId);
                const dialog = document.getElementById('park-dialog');
                if (park && dialog) {
                    document.getElementById('dialog-title').textContent = park.name;
                    document.getElementById('dialog-details').textContent = `Located in ${park.location}. Rating: ${park.rating}/5.`;
                    dialog.showModal();
                }
            }
            
          
            else if (target.classList.contains('fav-btn')) {
                const parkId = parseInt(target.dataset.id);
                let favorites = getFavorites();
                if (favorites.includes(parkId)) {
                    favorites = favorites.filter(id => id !== parkId);
                } else {
                    favorites.push(parkId);
                }
                localStorage.setItem('trail_favorites', JSON.stringify(favorites));
                
               
                target.textContent = favorites.includes(parkId) ? '❤️' : '🤍';
                target.classList.toggle('fav-active');
            }
        });

   
        const closeButton = document.getElementById('close-dialog');
        const dialog = document.getElementById('park-dialog');
        if (closeButton && dialog) {
            closeButton.addEventListener('click', () => dialog.close());
        }
    }

  
    const featuredContainer = document.getElementById('featured-container');
    if (featuredContainer) {
        const shuffled = [...parkList].sort(() => 0.5 - Math.random());
        const featuredParks = shuffled.slice(0, 3);
        featuredContainer.innerHTML = featuredParks.map(parkTemplate).join('');
    }

  
    const favoritesGrid = document.getElementById('favorites-grid');
    if (favoritesGrid) {
        const favoriteIds = getFavorites();
        if (favoriteIds.length === 0) {
            favoritesGrid.innerHTML = '<p>You have not selected any favorite parks yet. Go to the directory to add some!</p>';
        } else {
            const favoriteParks = parkList.filter(park => favoriteIds.includes(park.id));
            favoritesGrid.innerHTML = favoriteParks.map(parkTemplate).join('');
        }
    }
}

// Start the application
initializeApp();