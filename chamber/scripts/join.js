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

    // Set the hidden timestamp field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = Date.now();
    }

    // Modal functionality
    const modalLinks = document.querySelectorAll('a[data-modal]');
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.showModal();
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.close();
            });
        });
    });
});