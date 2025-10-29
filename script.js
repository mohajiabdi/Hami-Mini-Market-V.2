// to top
const toTop = document.getElementById("toTop");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("themeToggle");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const cartBtn = document.getElementById("cartBtn");
const showCount = document.getElementById("showCount");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

// === Product Catalog Data ===
const products = [
  {
    name: "Apple",
    category: "fruits",
    price: 3,
    image: "asset/images/apple.jpg",
  },
  {
    name: "Banana",
    category: "fruits",
    price: 2,
    image: "asset/images/banana.jpg",
  },
  {
    name: "Orange",
    category: "fruits",
    price: 4,
    image: "asset/images/orange.jpg",
  },
  {
    name: "Mango",
    category: "fruits",
    price: 5,
    image: "asset/images/mango.jpg",
  },
  {
    name: "Grapes",
    category: "fruits",
    price: 6,
    image: "asset/images/grapes.jpg",
  },
  {
    name: "Pineapple",
    category: "fruits",
    price: 7,
    image: "asset/images/bineApple.jpg",
  },
  {
    name: "Watermelon",
    category: "fruits",
    price: 8,
    image: "asset/images/watermelon.jpg",
  },
  {
    name: "Strawberry",
    category: "fruits",
    price: 9,
    image: "asset/images/strawberry.jpg",
  },
  {
    name: "Carrot",
    category: "vegetables",
    price: 2,
    image: "asset/images/carrots.avif",
  },
  {
    name: "Tomato",
    category: "vegetables",
    price: 3,
    image: "asset/images/tomato.jpg",
  },
  {
    name: "Potato",
    category: "vegetables",
    price: 1.5,
    image: "asset/images/potato.jpg",
  },
  {
    name: "Onion",
    category: "vegetables",
    price: 2.5,
    image: "asset/images/onion.jpg",
  },
  {
    name: "Broccoli",
    category: "vegetables",
    price: 4,
    image: "asset/images/broccoli.avif",
  },
  {
    name: "Cabbage",
    category: "vegetables",
    price: 3.5,
    image: "asset/images/cabbage.avif",
  },
  {
    name: "Spinach",
    category: "vegetables",
    price: 2.8,
    image: "asset/images/spinach.avif",
  },
  {
    name: "Cucumber",
    category: "vegetables",
    price: 3.2,
    image: "asset/images/cucumber.avif",
  },
];

let cartQuantities = {}; // 🛒 Tracks quantities per product
let cartCount = 0; // 🧮 Total items in cart

function displayProducts(items) {
  productGrid.innerHTML = "";
  if (items.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Default quantity for each product
    if (!cartQuantities[p.name]) {
      cartQuantities[p.name] = 1;
    }

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>

      <div class="quantity-controls">
        <button class="minus">−</button>
        <span class="quantity">${cartQuantities[p.name]}</span>
        <button class="plus">+</button>
      </div>

      <button class="add-to-cart">ADD TO CART</button>
    `;

    const minusBtn = card.querySelector(".minus");
    const plusBtn = card.querySelector(".plus");
    const qtySpan = card.querySelector(".quantity");
    const addBtn = card.querySelector(".add-to-cart");

    // ➖ Decrease quantity (min 1)
    minusBtn.addEventListener("click", () => {
      if (cartQuantities[p.name] > 1) {
        cartQuantities[p.name]--;
        qtySpan.textContent = cartQuantities[p.name];
      }
    });

    // ➕ Increase quantity
    plusBtn.addEventListener("click", () => {
      cartQuantities[p.name]++;
      qtySpan.textContent = cartQuantities[p.name];
    });

    // 🛒 Add to Cart
    addBtn.addEventListener("click", () => {
      // Add the quantity to the total cart count
      cartCount += cartQuantities[p.name];

      // Update the navbar count
      showCount.textContent = cartCount;

      console.log(`${cartQuantities[p.name]} added to cart.`);
      console.log("🧮 Cart count:", cartCount);
      // Reset that product's quantity display to 1 (optional)
      cartQuantities[p.name] = 1;
      qtySpan.textContent = 1;
    });

    productGrid.appendChild(card);
  });
}

// === Filter Logic ===
function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const maxPrice = parseFloat(priceFilter.value);

  const filtered = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(search);
    const matchesCategory = category === "all" || p.category === category;
    const matchesPrice = p.price <= maxPrice;
    return matchesName && matchesCategory && matchesPrice;
  });

  displayProducts(filtered);
}

// === Event Listeners ===
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("input", () => {
  priceValue.textContent = `Max: $${priceFilter.value}`;
  filterProducts();
});

// Initial Load
displayProducts(products);

// console.log(cartQuantities);
// { Apple: 2, Carrot: 3, Mango: 1, ... }


