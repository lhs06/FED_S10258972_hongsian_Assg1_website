//dropdown menu//
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


//linking pages 1//
document.addEventListener('DOMContentLoaded', function() {
    const images = [
        {
            src: "http://barcauniversal.com/wp-content/uploads/2023/07/Barcelona-away-scaled.jpg",
            link: "/Men.html"
        },
        {
            src: "https://store.fcbarcelona.com/cdn/shop/collections/Cabecera-Banner_750x480_1_-kit_d.jpg?v=1726572697&width=1920",
            link: "/Men.html"
        },
        {
            src: "https://store.fcbarcelona.com/cdn/shop/collections/OK_DESKTOP.jpg?v=1725432998&width=1920",
            link: "/Women.html"
        },
        {
            src: "https://store.fcbarcelona.com/cdn/shop/collections/Cabecera-Landing-Away-Kit-2500x880px-d.jpg?v=1725432957&width=1920",
            link: "/Kid.html"
        }
    ];
    let currentIndex = 0;
    const slideContainer = document.querySelector('.Himg');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    function showImage(index) {
        slideContainer.innerHTML = `<a href="${images[index].link}"><img src="${images[index].src}" class="slide-img"></a>`;
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

//card slider//
document.addEventListener('DOMContentLoaded', function() {
    // Existing Slideshow Logic
    
    // Card Slider Logic
    const sliderContainerCard = document.querySelector('.slider-container');
    const prevButtonCard = document.querySelector('.prev');
    const nextButtonCard = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot'); // Select dots
    const totalItems = document.querySelectorAll('.flex-item').length;
    const visibleItems = 3; // Number of items visible at once
    const totalSlides = Math.ceil(totalItems / visibleItems);
    let currentIndexCard = 0;

    function updateSliderCard() {
        const translateX = -(currentIndexCard * (100));
        sliderContainerCard.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndexCard);
        });
    }

    function nextSlideCard() {
        if (currentIndexCard < totalSlides - 1) {
            currentIndexCard++;
        } else {
            currentIndexCard = 0; // Loop back to the start
        }
        updateSliderCard();
    }

    function prevSlideCard() {
        if (currentIndexCard > 0) {
            currentIndexCard--;
        } else {
            currentIndexCard = totalSlides - 1; // Loop to the end
        }
        updateSliderCard();
    }

    // Function to handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndexCard = index;
            updateSliderCard();
        });
    });

    // Event listeners for card slider
    nextButtonCard.addEventListener('click', nextSlideCard);
    prevButtonCard.addEventListener('click', prevSlideCard);

    // Initial position
    updateSliderCard();
});

