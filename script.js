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

document.addEventListener('DOMContentLoaded', function() {
    const images = [
        "https://store.fcbarcelona.com/cdn/shop/collections/Cabecera-Banner_750x480_1_-kit_d.jpg?v=1726572697&width=1920",
        "https://store.fcbarcelona.com/cdn/shop/files/Main-Banner-Xmas-Jumpers-3200x2000px.jpg?v=1730904804&width=2000",
        "https://store.acmilan.com/cdn/shop/files/3000x1410_2_06db9309-3c68-4ef6-a48d-aa0cd36947c7.jpg?v=1716444251&width=1800",
        "http://barcauniversal.com/wp-content/uploads/2023/07/Barcelona-away-scaled.jpg"
    ];
    let currentIndex = 0;
    const slideImg = document.querySelector('.slide-img');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    function showImage(index) {
        slideImg.src = images[index];
    }

    leftBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    rightBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex);
});