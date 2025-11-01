// Products data
const products = [
  {
    id: 1,
    name: "Butterfly Korean Cake",
    price: 78000,
    image: "1.jpg",
    description: "Ukuran Cake 16CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeCust",
    badge: { text: "Terlaris", type: "badge-popular" },
  },
  {
    id: 2,
    name: "Mini Bento Cake",
    price: 28000,
    image: "3.jpg",
    description:
      "Free Request Desain Cake, Ukuran Cake 8CM, Free 1 Lilin Kecil, Free 1 Sendok kecil",
    category: "cakeCust",
    badge: { text: "Hot", type: "badge-featured" },
  },
  {
    id: 3,
    name: "Korean Cake",
    price: 48000,
    image: "9.jpg",
    description:
      "Free Request Desain Cake, Ukuran Cake 14CM, Free 2 Lilin Kecil, Free 1 Pisau",
    category: "cakeCust",
  },
  {
    id: 4,
    name: "Medium Korean Cake",
    price: 73000,
    image: "10.jpg",
    description:
      "Free Request Desain Cake, Ukuran Cake 16CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeCust",
    badge: { text: "Baru", type: "badge-new" },
  },
  {
    id: 5,
    name: "Cinnamonroll Cake",
    price: 105000,
    image: "2.jpg",
    description: "Ukuran Cake 18CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeChar",
  },
  {
    id: 6,
    name: "Pororo Cake",
    price: 107000,
    image: "11.jpg",
    description: "Ukuran Cake 18CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeChar",
  },
  {
    id: 7,
    name: "Tayo Cake",
    price: 105000,
    image: "12.jpg",
    description: "Ukuran Cake 18CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeChar",
    badge: { text: "Favorit", type: "badge-popular" },
  },
  {
    id: 8,
    name: "Kuromi Cake",
    price: 107000,
    image: "13.jpg",
    description: "Ukuran Cake 18CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeChar",
  },
  {
    id: 9,
    name: "Butterfly Medium Cake",
    price: 85000,
    image: "5.jpg",
    description: "Ukuran Cake 16CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeCust",
  },
  {
    id: 10,
    name: "Spiderman Cake",
    price: 80000,
    image: "4.jpg",
    description: "Ukuran Cake 16CM, Free 1 Lilin Spiral, Free 1 Pisau",
    category: "cakeChar",
    badge: { text: "New", type: "badge-new" },
  },
];

let currentModalProduct = null;
let currentQty = 1;

function filterProducts(category) {
  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);
  renderProducts(filtered);

  // Update active tab
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}

function renderProducts(productsToRender) {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

  gallery.innerHTML = productsToRender
    .map(
      (product) => `
        <div class="product" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" />
            <div class="meta">
                ${
                  product.badge
                    ? `<span class="badge ${product.badge.type}">${product.badge.text}</span>`
                    : ""
                }
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${formatCurrency(product.price)}</div>
            </div>
        </div>
    `
    )
    .join("");
}

let selectedOptions = {
  box: false,
  card: false,
  candle: false,
  giftBag: false,
};

let additionalOptionsPrice = 0;

function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  currentQty = 1;
  selectedOptions = { box: false, card: false, candle: false, giftBag: false };
  additionalOptionsPrice = 0;

  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalPrice").textContent = formatCurrency(
    product.price
  );
  document.getElementById("qtyDisplay").textContent = currentQty;

  const badgeElement = document.getElementById("modalBadge");
  if (product.badge) {
    badgeElement.innerHTML = `<span class="badge ${product.badge.type}">${product.badge.text}</span>`;
  } else {
    badgeElement.innerHTML = "";
  }

  // Render additional options
  renderAdditionalOptions();

  document.getElementById("productModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";

  // Reset modal state
  currentModalProduct = null;
  currentQty = 1;
  selectedOptions = { box: false, card: false, candle: false, giftBag: false };
  additionalOptionsPrice = 0;
}

function renderAdditionalOptions() {
  const optionsContainer = document.querySelector(".additional-options");
  if (!optionsContainer) return;

  optionsContainer.innerHTML = `
        <h4>Opsi Tambahan</h4>
        <div class="option-group">
            <div class="option-item ${
              selectedOptions.box ? "selected" : ""
            }" onclick="toggleOption('box')">
                <div class="option-content">
                    <div class="option-icon">🎁</div>
                    <div class="option-details">
                        <div class="option-name">Tambah Box Coklat</div>
                        <div class="option-price">+Rp 5.000</div>
                    </div>
                </div>
                <div class="option-checkmark"></div>
                <input type="checkbox" class="option-checkbox" ${
                  selectedOptions.box ? "checked" : ""
                }>
            </div>
            
            <div class="option-item ${
              selectedOptions.card ? "selected" : ""
            }" onclick="toggleOption('card')">
                <div class="option-content">
                    <div class="option-icon">💌</div>
                    <div class="option-details">
                        <div class="option-name">Tambah Kartu Ucapan</div>
                        <div class="option-price">+Rp 3.000</div>
                    </div>
                </div>
                <div class="option-checkmark"></div>
                <input type="checkbox" class="option-checkbox" ${
                  selectedOptions.card ? "checked" : ""
                }>
            </div>
            
            <div class="option-item ${
              selectedOptions.candle ? "selected" : ""
            }" onclick="toggleOption('candle')">
                <div class="option-content">
                    <div class="option-icon">🕯️</div>
                    <div class="option-details">
                        <div class="option-name">Tambah Lilin Hias</div>
                        <div class="option-price">+Rp 2.000</div>
                    </div>
                </div>
                <div class="option-checkmark"></div>
                <input type="checkbox" class="option-checkbox" ${
                  selectedOptions.candle ? "checked" : ""
                }>
            </div>
            
            <div class="option-item ${
              selectedOptions.giftBag ? "selected" : ""
            }" onclick="toggleOption('giftBag')">
                <div class="option-content">
                    <div class="option-icon">🛍️</div>
                    <div class="option-details">
                        <div class="option-name">Tambah Tas Kado</div>
                        <div class="option-price">+Rp 4.000</div>
                    </div>
                </div>
                <div class="option-checkmark"></div>
                <input type="checkbox" class="option-checkbox" ${
                  selectedOptions.giftBag ? "checked" : ""
                }>
            </div>
        </div>
        
        <div class="options-total">
            <span class="options-total-label">Total Tambahan:</span>
            <span class="options-total-price" id="additionalTotalPrice">Rp 0</span>
        </div>
    `;

  updateAdditionalOptionsTotal();
}

function toggleOption(optionType) {
  selectedOptions[optionType] = !selectedOptions[optionType];

  // Update price
  const prices = {
    box: 5000,
    card: 3000,
    candle: 2000,
    giftBag: 4000,
  };

  additionalOptionsPrice = 0;
  Object.keys(selectedOptions).forEach((key) => {
    if (selectedOptions[key]) {
      additionalOptionsPrice += prices[key];
    }
  });

  renderAdditionalOptions();
  updateModalTotalPrice();
}

function updateAdditionalOptionsTotal() {
  const additionalTotalElement = document.getElementById(
    "additionalTotalPrice"
  );
  if (additionalTotalElement) {
    additionalTotalElement.textContent = formatCurrency(additionalOptionsPrice);
  }
}

function updateModalTotalPrice() {
  if (!currentModalProduct) return;

  const basePrice = currentModalProduct.price * currentQty;
  const optionsPrice = additionalOptionsPrice * currentQty;
  const totalPrice = basePrice + optionsPrice;

  const modalPriceElement = document.getElementById("modalPrice");
  if (modalPriceElement) {
    if (additionalOptionsPrice > 0) {
      modalPriceElement.innerHTML = `
                <div style="font-size: 16px; color: var(--muted); text-decoration: line-through;">
                    ${formatCurrency(basePrice)}
                </div>
                <div style="font-size: 24px; color: var(--pink-3);">
                    ${formatCurrency(totalPrice)}
                </div>
            `;
    } else {
      modalPriceElement.textContent = formatCurrency(totalPrice);
    }
  }
}

function increaseQty() {
  currentQty++;
  document.getElementById("qtyDisplay").textContent = currentQty;
  updateModalTotalPrice();
}

function decreaseQty() {
  if (currentQty > 1) {
    currentQty--;
    document.getElementById("qtyDisplay").textContent = currentQty;
    updateModalTotalPrice();
  }
}

function addToCartFromModal() {
  if (!currentModalProduct) return;

  let notes = [];
  const optionNames = {
    box: "Box Coklat",
    card: "Kartu Ucapan",
    candle: "Lilin Hias",
    giftBag: "Tas Kado",
  };

  Object.keys(selectedOptions).forEach((key) => {
    if (selectedOptions[key]) {
      notes.push(optionNames[key]);
    }
  });

  const totalPrice =
    (currentModalProduct.price + additionalOptionsPrice) * currentQty;

  addToCart({
    ...currentModalProduct,
    quantity: currentQty,
    additionalPrice: additionalOptionsPrice,
    notes: notes.join(", "),
    totalPrice: totalPrice,
  });

  closeModal();
}
