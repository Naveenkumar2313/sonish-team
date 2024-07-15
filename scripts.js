let cart = [];

// Price list for items
const priceList = {
    Pizza: 150,
    Burger: 80,
    Sushi: 120,
    Popcorn: 100,
    Maggi: 40,
    Milkshake: 75,
    Coldcofee: 60,
    Lassi:35,
    Mojito:50,
    Tomatosoup:25

};

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.name === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: item, quantity: 1 });
    }
    updateCartCount();
    saveCart();
    alert(item + ' added to cart!');
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function displayCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>
                <button onclick="removeFromCart(${index})">Remove</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    saveCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    displayCart();
}

function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

function displayBill() {
    const billTableBody = document.querySelector('#bill-table tbody');
    let grandTotal = 0;

    billTableBody.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.quantity * priceList[item.name];
        grandTotal += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${priceList[item.name]}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        billTableBody.appendChild(row);
    });

    document.getElementById('grand-total').innerText = `$${grandTotal.toFixed(2)}`;
}

function confirmOrder() {
    alert('Your order has been confirmed!');
    cart = [];
    saveCart();
    updateCartCount();
    window.location.href = 'index.html';
}

// Load cart and display appropriate content on page load
window.onload = function() {
    loadCart();
    updateCartCount();
    if (window.location.pathname.endsWith('cart.html')) {
        displayCart();
    } else if (window.location.pathname.endsWith('checkout.html')) {
        displayBill();
    }
};
