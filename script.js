// script.js
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.getElementById('dropdownContent');

    dropdown.addEventListener('mouseenter', function() {
        dropdownContent.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', function() {
        dropdownContent.classList.remove('show');
    });
});