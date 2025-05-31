// script.js

// Global variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

// Add to cart
function addToCart(productId, name, price) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const quantity = parseInt(quantityInput.value);
  if (quantity > 3) {
    alert("Maximum quantity per product is 3.");
    return;
  }

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity + quantity > 3) {
      alert("Maximum quantity per product is 3.");
      return;
    }
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

// Display cart items
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalAmountElem = document.getElementById("total-amount");

  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p><strong>${item.name}</strong> (x${item.quantity}) - Rs. ${subtotal}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  // Add Rs. 50 for COD
  const paymentMethod = document.getElementById("payment-method");
  if (paymentMethod && paymentMethod.value === "cod") {
    total += 50;
  }

  if (totalAmountElem) totalAmountElem.textContent = `Total: Rs. ${total}`;
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

// Clear cart after order
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
}
