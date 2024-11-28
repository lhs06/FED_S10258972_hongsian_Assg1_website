// Variables to store the selected size, cart, and favorite items
let selectedSize = null;
const cartItems = [];


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


// cart
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('addToCart');
    const sizeSelect = document.querySelector('.size-btn.selected');
    const productName = "FC Barcelona Christmas Collection";
    const productDescription = "Christmas Jumper";
    const productPrice = 99.99;
    const productImage = "https://store.fcbarcelona.com/cdn/shop/files/Ficha-Producto-COREII4330.jpg?v=1730818665&width=823";

    addToCartButton.addEventListener('click', function() {
        const selectedSize = sizeSelect ? sizeSelect.dataset.size : null;
        if (selectedSize) {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
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
        } else {
            alert('Please select a size.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('addToCart');
    const sizeButtons = document.querySelectorAll('.size-btn');
    let selectedSize = null;

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedSize = this.dataset.size;
        });
    });

    const productName = "FC Barcelona Christmas Collection";
    const productDescription = "Christmas Jumper";
    const productPrice = 99.99;
    const productImage = "https://store.fcbarcelona.com/cdn/shop/files/Ficha-Producto-COREII4330.jpg?v=1730818665&width=823";

    addToCartButton.addEventListener('click', function() {
        if (selectedSize) {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
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
        } else {
            alert('Please select a size.');
        }
    });
});
