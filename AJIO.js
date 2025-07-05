
 // Dropdown Menus
const menus = [
  { menuId: 'men-menu', dropdownId: 'men-dropdown' },
  { menuId: 'women-menu', dropdownId: 'women-dropdown' },
  { menuId: 'kids-menu', dropdownId: 'kids-dropdown' },
  { menuId: 'brands-menu', dropdownId: 'brands-dropdown' },
  { menuId: 'sale-menu', dropdownId: 'sale-dropdown' }
];

menus.forEach(({ menuId, dropdownId }) => {
  const menu = document.getElementById(menuId);
  const dropdown = document.getElementById(dropdownId);

  menu.addEventListener('mouseenter', () => {
    dropdown.style.display = 'block';
  });

  menu.addEventListener('mouseleave', () => {
    dropdown.style.display = 'none';
  });
});

// LocalStorage Keys
const cartKey = "ajioCart";
const wishlistKey = "ajioWishlist";

// Initial Cart & Wishlist Load
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const img = button.dataset.img;

    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`${name} added to cart`);
  });
});

// Add to Wishlist
const wishlistButton = document.getElementById('wishlistButton');
if (wishlistButton) {
  wishlistButton.addEventListener('click', () => {
    const firstProduct = document.querySelector('.product-card');
    if (!firstProduct) return alert("No products found!");

    const name = firstProduct.querySelector('h3').innerText;
    const priceText = firstProduct.querySelector('p').innerText;
    const price = parseFloat(priceText.replace(/[₹,]/g, ''));
    const img = firstProduct.querySelector('img').src;

    const exists = wishlist.find(item => item.name === name);
    if (exists) {
      alert(`${name} already in wishlist`);
      return;
    }

    wishlist.push({ name, price, img });
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    alert(`${name} added to wishlist`);
  });
}

// Cart Sidebar UI Toggle & Display
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartBtn = document.getElementById('addToCartBtn');

  function updateCartUI() {
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: ₹${total}`;
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      updateCartUI();
      cartContainer.classList.toggle('active');
    });
  }
});
