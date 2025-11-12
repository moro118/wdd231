const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
const response= await fetch(url);
const data = await response.json();
//console.table(data.prophets);
displayProphets(data.prophets);
}
getProphetData();
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        const Fullname = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        Fullname.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        card.appendChild(Fullname);
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        card.appendChild(birthDate);
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        card.appendChild(birthPlace);
        card.appendChild(portrait);
        cards.appendChild(card);

    });
}