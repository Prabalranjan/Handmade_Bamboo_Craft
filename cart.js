// Shared cart logic — used by both index.html and product.html.
// Depends on `products` and `WHATSAPP_NUMBER` from products.js, and expects
// the standard cart drawer markup/ids (cartItems, cartSubtotal, cartCount,
// cartDrawer, cartOverlay, cartToggle, cartClose, checkoutBtn) on the page.

const CART_KEY = "bambooCraftCart";
const formatPrice = n => "₹" + n.toLocaleString("en-IN");

function loadCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

let cart = loadCart();

function renderCart(){
  const itemsEl = document.getElementById("cartItems");
  const ids = Object.keys(cart).filter(id => cart[id] > 0);
  let subtotal = 0;
  let count = 0;

  if(ids.length === 0){
    itemsEl.innerHTML = `<div class="cart-empty">Your cart is empty. Start adding some handmade bamboo pieces!</div>`;
  } else {
    itemsEl.innerHTML = ids.map(id => {
      const p = products.find(p => p.id === id);
      const qty = cart[id];
      subtotal += p.price * qty;
      count += qty;
      return `
        <div class="cart-line" data-id="${id}">
          <img src="${p.image}" alt="${p.name}">
          <div class="cart-line-info">
            <h4>${p.name}</h4>
            <div class="cart-line-price">${formatPrice(p.price)}</div>
            <div class="qty-control">
              <button class="qty-minus" data-id="${id}">&minus;</button>
              <span>${qty}</span>
              <button class="qty-plus" data-id="${id}">+</button>
            </div>
            <button class="remove-line" data-id="${id}">Remove</button>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("cartCount").textContent = count;
}

function addToCart(id, btn){
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  renderCart();
  if(btn){
    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = "Added";
    btn.classList.add("added");
    setTimeout(() => { btn.textContent = original; btn.classList.remove("added"); }, 1200);
  }
}
function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id] += delta;
  if(cart[id] <= 0) delete cart[id];
  saveCart(cart);
  renderCart();
}
function removeItem(id){
  delete cart[id];
  saveCart(cart);
  renderCart();
}

function openCart(){
  if(typeof closeWishlist === "function") closeWishlist();
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function checkoutViaWhatsApp(){
  const ids = Object.keys(cart).filter(id => cart[id] > 0);
  if(ids.length === 0){
    alert("Your cart is empty. Add a product before checking out.");
    return;
  }
  let message = "Hi! I'd like to order the following from Handmade Bamboo Craft:\n\n";
  let subtotal = 0;
  ids.forEach(id => {
    const p = products.find(p => p.id === id);
    const qty = cart[id];
    const lineTotal = p.price * qty;
    subtotal += lineTotal;
    message += `- ${p.name} x${qty} — ${formatPrice(lineTotal)}\n`;
  });
  message += `\nSubtotal: ${formatPrice(subtotal)}\n\nPlease confirm availability and shipping details.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function initCartWidget(){
  document.getElementById("cartItems").addEventListener("click", e => {
    if(e.target.classList.contains("qty-plus")) changeQty(e.target.dataset.id, 1);
    if(e.target.classList.contains("qty-minus")) changeQty(e.target.dataset.id, -1);
    if(e.target.classList.contains("remove-line")) removeItem(e.target.dataset.id);
  });
  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("checkoutBtn").addEventListener("click", checkoutViaWhatsApp);

  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  if(navLinks && menuToggle){
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
  }

  renderCart();

  // Defense in depth: if a bfcache restore ever slips through, re-sync from
  // localStorage as soon as the page is shown (also picks up changes made in
  // another tab).
  window.addEventListener("pageshow", () => {
    cart = loadCart();
    renderCart();
  });
  window.addEventListener("storage", e => {
    if(e.key === CART_KEY){
      cart = loadCart();
      renderCart();
    }
  });
}

// Registering a `beforeunload` listener opts this page out of the browser's
// back/forward cache (bfcache). Without this, going Back restores the exact
// frozen page from before you left — including the OLD cart count — and
// paints it a beat before our pageshow handler above can correct it, which
// is what caused the visible flash of the wrong number. Forcing a real
// reload means the count is computed fresh before anything is painted.
window.addEventListener("beforeunload", () => {});
