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

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    setInterval(showNextImage, 5000); // Change image every 5 seconds

    leftBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    rightBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex); // Show the first image initially
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

//payment//
document.addEventListener('DOMContentLoaded', function() {
    const paymentItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmountSpan = document.getElementById('totalAmount');

    function calculateTotalAmount() {
        let totalAmount = 0;
        paymentItems.forEach(item => {
            totalAmount += item.price;
        });
        totalAmountSpan.textContent = totalAmount.toFixed(2);
    }

    calculateTotalAmount();

    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Payment successful!');
        // Clear the cart items from local storage
        localStorage.removeItem('cart');
    });
});


//bin//
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById('cartItems');
    const subtotalSpan = document.getElementById('subtotal');
    const deliveryFeeSpan = document.getElementById('deliveryFee');
    const totalSpan = document.getElementById('total');
    const deliveryFee = 5.00;

    function renderCartItems() {
        cartDiv.innerHTML = '';
        let subtotal = 0;
        if (cartItems.length === 0) {
            cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>Size: ${item.size}</p>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">&#128465;</button>
                `;
                cartDiv.appendChild(itemDiv);
                subtotal += item.price;
            });
        }
        subtotalSpan.textContent = subtotal.toFixed(2);
        const total = subtotal + deliveryFee;
        totalSpan.textContent = total.toFixed(2);
    }

    renderCartItems();

    cartDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
        }
    });

    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', function() {
        if (cartItems.length > 0) {
            window.location.href = '/payment.html';
        } else {
            alert('Your cart is empty.');
        }
    });
});

//cart//
document.addEventListener('DOMContentLoaded', function() {
    // Variables to store the selected size, cart, and favorite items
    let selectedSize = null;
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Handle size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            selectedSize = btn.getAttribute('data-size');
            // Highlight selected size
            sizeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Handle adding to cart
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const productElement = button.closest('.Mproduct');
            const productName = productElement.getAttribute('data-name');
            const productDescription = productElement.getAttribute('data-description');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));
            const productImage = productElement.getAttribute('data-image');

            if (selectedSize) {
                const newItem = {
                    name: productName,
                    description: productDescription,
                    size: selectedSize,
                    price: productPrice,
                    image: productImage
                };
                cartItems.push(newItem);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                alert('Item added to cart!');
                renderCartItems(); // Update the cart items after adding a new item
            } else {
                alert('Please select a size.');
            }
        });
    });

    // Render cart items and update summary
    const cartDiv = document.getElementById('cartItems');
    const subtotalSpan = document.getElementById('subtotal');
    const deliveryFeeSpan = document.getElementById('deliveryFee');
    const totalSpan = document.getElementById('total');
    const deliveryFee = 5.00;

    function renderCartItems() {
        cartDiv.innerHTML = '';
        let subtotal = 0;
        if (cartItems.length === 0) {
            cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>Size: ${item.size}</p>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">&#128465;</button>
                `;
                cartDiv.appendChild(itemDiv);
                subtotal += item.price;
            });
        }
        subtotalSpan.textContent = subtotal.toFixed(2);
        const total = subtotal + deliveryFee;
        totalSpan.textContent = total.toFixed(2);
    }

    renderCartItems();

    cartDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
        }
    });

    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', function() {
        if (cartItems.length > 0) {
            window.location.href = '/payment.html';
        } else {
            alert('Your cart is empty.');
        }
    });
});