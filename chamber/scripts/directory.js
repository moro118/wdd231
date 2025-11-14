const dataURL = "data/members.json";
const mainContainerlist = document.querySelector('.cards-list');
const mainContainergrid = document.querySelector('.cards-grid');
const gridbutton = document.querySelector("#directory-grid");
const listbutton = document.querySelector("#directory-list");

let membersData = [];

document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedDate = document.querySelector("#lastmodified");
    if (lastModifiedDate) {
        lastModifiedDate.textContent = 'Last Modified: ' + document.lastModified;
    }
    getMembers();
});
async function getMembers() {
    try {
        const response = await fetch(dataURL);
        if (response.ok) {
            membersData = await response.json();
            displayMembersList(membersData);
            mainContainergrid.style.display = "none";
            mainContainerlist.style.display = "grid"; // or "block" depending on your CSS
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
    mainContainergrid.innerHTML = ""; 
    displayMembersGrid(membersData);
    mainContainergrid.style.display = "grid";
    mainContainerlist.style.display = "none";
});

listbutton.addEventListener("click", () => {
    mainContainerlist.innerHTML = "";
    displayMembersList(membersData);
    mainContainerlist.style.display = "grid";
    mainContainergrid.style.display = "none";
});
