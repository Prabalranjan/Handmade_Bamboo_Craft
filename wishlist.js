// Shared wishlist logic — used by both index.html and product.html.
// Mirrors cart.js: localStorage-backed, no account needed. Depends on
// `products` and `formatPrice`/`addToCart` from products.js/cart.js, and
// expects the standard wishlist drawer markup/ids (wishlistItems,
// wishlistCount, wishlistDrawer, wishlistOverlay, wishlistToggle,
// wishlistClose) plus `.wishlist-btn[data-id]` toggle buttons on the page.

const WISHLIST_KEY = "bambooCraftWishlist";

function loadWishlist(){
  try {
    const list = JSON.parse(localStorage.getItem(WISHLIST_KEY));
    return Array.isArray(list) ? list : [];
  } catch(e){ return []; }
}
function saveWishlist(list){ localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); }

let wishlist = loadWishlist();

function isWishlisted(id){ return wishlist.includes(id); }

function syncWishlistButtons(){
  document.querySelectorAll(".wishlist-btn[data-id]").forEach(btn => {
    btn.classList.toggle("active", isWishlisted(btn.dataset.id));
  });
}

function toggleWishlist(id){
  wishlist = isWishlisted(id) ? wishlist.filter(x => x !== id) : [...wishlist, id];
  saveWishlist(wishlist);
  renderWishlist();
  syncWishlistButtons();
}

function renderWishlist(){
  const itemsEl = document.getElementById("wishlistItems");
  if(!itemsEl) return;

  if(wishlist.length === 0){
    itemsEl.innerHTML = `<div class="cart-empty">Your wishlist is empty. Tap the heart on any product to save it here.</div>`;
  } else {
    itemsEl.innerHTML = wishlist.map(id => {
      const p = products.find(p => p.id === id);
      if(!p) return "";
      return `
        <div class="cart-line" data-id="${id}">
          <img src="${p.image}" alt="${p.name}">
          <div class="cart-line-info">
            <h4>${p.name}</h4>
            <div class="cart-line-price">${formatPrice(p.price)}</div>
            <div class="wishlist-line-actions">
              <button class="add-btn wishlist-add-to-cart" data-id="${id}">Add to Cart</button>
              <button class="remove-line wishlist-remove" data-id="${id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  document.getElementById("wishlistCount").textContent = wishlist.length;
}

function openWishlist(){
  if(typeof closeCart === "function") closeCart();
  document.getElementById("wishlistDrawer").classList.add("open");
  document.getElementById("wishlistOverlay").classList.add("open");
}
function closeWishlist(){
  document.getElementById("wishlistDrawer").classList.remove("open");
  document.getElementById("wishlistOverlay").classList.remove("open");
}

function initWishlistWidget(){
  document.getElementById("wishlistToggle").addEventListener("click", openWishlist);
  document.getElementById("wishlistClose").addEventListener("click", closeWishlist);
  document.getElementById("wishlistOverlay").addEventListener("click", closeWishlist);
  document.getElementById("wishlistItems").addEventListener("click", e => {
    const addBtn = e.target.closest(".wishlist-add-to-cart");
    if(addBtn){ addToCart(addBtn.dataset.id, addBtn); return; }
    const removeBtn = e.target.closest(".wishlist-remove");
    if(removeBtn){ toggleWishlist(removeBtn.dataset.id); }
  });

  renderWishlist();
  syncWishlistButtons();

  // Same bfcache-blink lesson learned for the cart: re-sync on pageshow and
  // cross-tab storage changes.
  window.addEventListener("pageshow", () => {
    wishlist = loadWishlist();
    renderWishlist();
    syncWishlistButtons();
  });
  window.addEventListener("storage", e => {
    if(e.key === WISHLIST_KEY){
      wishlist = loadWishlist();
      renderWishlist();
      syncWishlistButtons();
    }
  });
}
