const dataURL = "data/members.json";
const main = document.querySelector('main');
const mainContainerlist = document.querySelector('.cards-list');
const mainContainergrid = document.querySelector('.cards-grid');
const gridbutton = document.querySelector("#directory-grid");
const listbutton = document.querySelector("#directory-list");
const hamburguer = document.querySelector("#hamburger-btn");
const nav = document.querySelector(".nav-menu");
let membersData = [];

hamburguer.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburguer.classList.toggle("open");
});
document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedDate = document.querySelector("#lastmodified");
    if (lastModifiedDate) {
        lastModifiedDate.textContent = 'Last Modified: ' + document.lastModified;
    }

    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Member Directory';
    main.prepend(pageTitle);

    
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('current-page');
        }
    });

    getMembers();
});
async function getMembers() {
    try {
        const response = await fetch(dataURL);
        if (response.ok) {
            membersData = await response.json();
            displayMembers(membersData);
            main.classList.add('list-view'); // Set list view as default
            listbutton.classList.add('active-view'); // Set list button as active by default
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching member data:', error);
        const errorMessage = `<p>Sorry, there was an error loading the member data. Please try again later.</p>`;
        mainContainerlist.innerHTML = errorMessage;
        mainContainergrid.innerHTML = errorMessage;
    }
}

const displayMembers = (members) => {
    displayMembersList(members);
    displayMembersGrid(members);
}

const displayMembersList = (members) => {
    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card-list');

        const name = document.createElement('h2');
        name.textContent = member.name;

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone;

        const website = document.createElement('a');
        website.href = member.websiteURL;
        website.textContent = 'Visit Website';
        website.target = '_blank'; // Open in a new tab

        card.append(name, address, phone, website);
        mainContainerlist.appendChild(card);
    });
}

const displayMembersGrid = (members) => {
    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card-grid');
        const image = document.createElement('img');
        image.src = member.image;
        image.alt = member.name;

        const name = document.createElement('h2');
        name.textContent = member.name;

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone;

        const website = document.createElement('a');
        website.href = member.websiteURL;
        website.textContent = 'Visit Website';
        website.target = '_blank'; // Open in a new tab

        card.append(name,image, address,phone,website);
        mainContainergrid.appendChild(card);
    });
}

gridbutton.addEventListener("click", () => {
    main.classList.add('grid-view');
    main.classList.remove('list-view');

    gridbutton.classList.add('active-view');
    listbutton.classList.remove('active-view');
});

listbutton.addEventListener("click", () => {
    main.classList.add('list-view');
    main.classList.remove('grid-view');

    listbutton.classList.add('active-view');
    gridbutton.classList.remove('active-view');
});
