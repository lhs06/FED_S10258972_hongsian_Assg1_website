// Wait for the DOM to fully load before running the scripts
document.addEventListener('DOMContentLoaded', () => {
    initializeDropdown(); // Initialize dropdown menu functionality
    initializeImageSlider(); // Initialize image slider functionality
    initializeCardSlider(); // Initialize card slider functionality
    initializePayment(); // Initialize payment functionality
    initializeCart(); // Initialize cart functionality
    initializeSizeSelection(); // Initialize size selection functionality
    initializeAddToCart(); // Initialize add to cart functionality
});

/* Initialize Dropdown Menu */
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown'); // Select the dropdown element
    const dropdownContent = document.getElementById('dropdownContent'); // Select the dropdown content element

    // Check if both dropdown and dropdownContent exist
    if (dropdown && dropdownContent) {
        // Show dropdown content on mouse enter
        dropdown.addEventListener('mouseenter', () => dropdownContent.classList.add('show'));
        // Hide dropdown content on mouse leave
        dropdown.addEventListener('mouseleave', () => dropdownContent.classList.remove('show'));
    }
}

/** Initialize Image Slider */
function initializeImageSlider() {
    const images = [
        { src: "img/home/Barca 2324 away.jpg", link: "/men.html" },
        { src: "img/home/men kits.webp", link: "/men.html" },
        { src: "img/home/womenskits.webp", link: "/women.html" },
        { src: "img/home/kidskits.webp", link: "/kid.html" }
    ]; // Array of images and their links

    let currentIndex = 0; // Current index of the image slider
    const slideContainer = document.querySelector('.Himg'); // Select the slide container
    const leftBtn = document.querySelector('.left-btn'); // Select the left button
    const rightBtn = document.querySelector('.right-btn'); // Select the right button

    // Check if slideContainer exists
    if (!slideContainer) return;

    // Function to show an image based on the index
    const showImage = (index) => {
        slideContainer.innerHTML = `<a href="${images[index].link}"><img src="${images[index].src}" class="slide-img" alt="Slide Image"></a>`;
    };

    // Function to cycle through images automatically
    const cycleImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    // Event listener for left button click
    leftBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    // Event listener for right button click
    rightBtn?.addEventListener('click', cycleImage);

    // Automatically cycle images every 5 seconds
    setInterval(cycleImage, 5000);

    // Show the first image initially
    showImage(currentIndex);
}

/* Initialize Card Slider */
function initializeCardSlider() {
    const sliderContainer = document.querySelector('.slider-container'); // Select the slider container
    const dots = document.querySelectorAll('.dot'); // Select all dots
    const nextBtn = document.querySelector('.next'); // Select the next button
    const prevBtn = document.querySelector('.prev'); // Select the previous button
    const totalSlides = Math.ceil(document.querySelectorAll('.flex-item').length / 3); // Calculate total slides
    let currentCardIndex = 0; // Current index of the card slider

    // Check if sliderContainer exists
    if (!sliderContainer) return;

    // Function to update the slider position and active dot
    const updateSlider = () => {
        sliderContainer.style.transform = `translateX(${-currentCardIndex * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentCardIndex));
    };

    // Event listener for next button click
    nextBtn?.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % totalSlides;
        updateSlider();
    });

    // Event listener for previous button click
    prevBtn?.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Event listeners for dot clicks
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentCardIndex = i;
            updateSlider();
        });
    });

    // Initial update of the slider
    updateSlider();
}

/* Initialize Payment Functionality */
function initializePayment() {
    const paymentForm = document.getElementById('paymentForm'); // Select the payment form
    const totalAmountSpan = document.getElementById('totalAmount'); // Select the total amount span
    const paymentItems = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from local storage

    // Check if totalAmountSpan exists
    if (totalAmountSpan) {
        // Calculate and display the total amount
        const total = paymentItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        totalAmountSpan.textContent = total;
    }

    // Event listener for payment form submission
    paymentForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment successful!');
        localStorage.removeItem('cart'); // Clear the cart items from local storage
    });
}

/* Initialize Cart Functionality */
function initializeCart() {
    const cartDiv = document.getElementById('cartItems'); // Select the cart items container
    const subtotalSpan = document.getElementById('subtotal'); // Select the subtotal span
    const totalSpan = document.getElementById('total'); // Select the total span
    const checkoutButton = document.getElementById('checkoutButton'); // Select the checkout button
    const deliveryFee = 5.00; // Set the delivery fee
    let cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from local storage

    // Check if cartDiv, subtotalSpan, and totalSpan exist
    if (!cartDiv || !subtotalSpan || !totalSpan) return;

    // Function to render cart items and update totals
    const renderCart = () => {
        cartDiv.innerHTML = cartItems.length === 0
            ? '<p>Your cart is empty.</p>'
            : cartItems.map((item, i) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>Size: ${item.size}</p>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" data-index="${i}">&#128465;</button>
                </div>`).join('');

        const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
        subtotalSpan.textContent = subtotal.toFixed(2);
        totalSpan.textContent = (subtotal + deliveryFee).toFixed(2);
    };

    // Initial render of the cart
    renderCart();

    // Event listener for removing items from the cart
    cartDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = Number(e.target.dataset.index);
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart();
        }
    });

    // Event listener for checkout button click
    checkoutButton?.addEventListener('click', () => {
        if (cartItems.length > 0) {
            window.location.href = '/payment.html';
        } else {
            alert('Your cart is empty.');
        }
    });
}

/* Initialize Size Selection */
function initializeSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-btn'); // Select all size buttons
    sizeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const selectedSize = btn.getAttribute('data-size');
            sizeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            btn.dataset.selectedSize = selectedSize;
        });
    });
}

/* Initialize Add to Cart */
function initializeAddToCart() {
    const addToCartButtons = document.querySelectorAll('.addToCart'); // Select all add to cart buttons
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const productElement = button.closest('.Mproduct'); // Select the closest product element
            const productName = productElement.getAttribute('data-name'); // Get the product name
            const productDescription = productElement.getAttribute('data-description'); // Get the product description
            const productPrice = parseFloat(productElement.getAttribute('data-price')); // Get the product price
            const productImage = productElement.getAttribute('data-image'); // Get the product image
            const selectedSize = productElement.querySelector('.size-btn.selected')?.dataset.selectedSize; // Get the selected size

            // Check if a size is selected
            if (selectedSize) {
                const newItem = {
                    name: productName,
                    description: productDescription,
                    size: selectedSize,
                    price: productPrice,
                    image: productImage
                };
                let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                cartItems.push(newItem);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                alert('Item added to cart!');
                initializeCart(); // Update the cart items after adding a new item
            } else {
                alert('Please select a size.');
            }
        });
    });
}