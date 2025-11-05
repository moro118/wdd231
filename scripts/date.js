document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentyear');
    const lastModifiedP = document.getElementById('lastModified');
    if (yearSpan) yearSpan.textContent = '©'+new Date().getFullYear() + ' ';
    if (lastModifiedP) lastModifiedP.textContent = 'Last Modified: ' + document.lastModified;
  });