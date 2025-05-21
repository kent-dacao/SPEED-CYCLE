document.addEventListener("DOMContentLoaded", () => {
  // === HAMBURGER TOGGLE ===
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");
  const navList = document.querySelector(".navbar ul");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("open");

      if (navbar.classList.contains("open")) {
        navList.classList.remove("hide");
        navList.classList.add("show");
      } else {
        navList.classList.remove("show");
        navList.classList.add("hide");
      }
    });
  }

  // === CART SYSTEM ===

  const cartButtons = document.querySelectorAll(".cart-button");
  const viewCartBtn = document.getElementById("viewCartButton");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartBtn = document.getElementById("viewCartButton");
    if (cartBtn) {
      cartBtn.textContent = `🛒 Cart (${totalCount})`;
    }
  }

  if (cartButtons.length > 0) {
    cartButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productCard = btn.closest(".product-card");
        if (!productCard) return;

        const title = productCard.querySelector("h2").textContent;
        const price = parseFloat(productCard.getAttribute("data-price")) || 0;

        const cart = getCart();
        const existing = cart.find((item) => item.title === title);

        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ title, price, quantity: 1 });
        }

        saveCart(cart);
        updateCartCount();
      });
    });
  }

  if (viewCartBtn) {
    viewCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "cart.html";
    });
  }

  // === CART PAGE LOGIC ===
  if (document.getElementById("cartItems")) {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalPriceEl = document.getElementById("cartTotal");
    const emptyMessageEl = document.getElementById("emptyMessage");

    function updateCartDisplay() {
      const cart = getCart();
      cartItemsDiv.innerHTML = "";
      let total = 0;

      if (cart.length === 0) {
        emptyMessageEl.style.display = "block";
        totalPriceEl.textContent = "Total: $0";
        return;
      }

      emptyMessageEl.style.display = "none";

      cart.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
          <span>${item.title} x${quantity} - $${itemTotal.toFixed(2)}</span>
          <button class="remove-button" onclick="removeItem(${index})">Remove</button>
        `;

        cartItemsDiv.appendChild(div);
        total += itemTotal;
      });

      totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
    }

    window.removeItem = function (index) {
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      updateCartDisplay();
      updateCartCount();
    };

    updateCartDisplay();
  }

  updateCartCount(); // Initial update on load
});
