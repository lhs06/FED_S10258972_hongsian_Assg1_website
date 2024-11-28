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
const sliderContainer = document.querySelector('.slider-container');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        const itemWidth = 33.333; // percentage width of each item

        function updateSlider() {
            sliderContainer.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = currentIndex >= 1 ? 0 : currentIndex + 1;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = currentIndex === 0 ? 1 : currentIndex - 1;
            updateSlider();
        }

        // Event listeners
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Optional: Auto-slide
        setInterval(nextSlide, 5000);

