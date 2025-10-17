// Products data
const products = [
  {
    id: 1,
    name: "Red Velvet Cupcake",
    price: 15000,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400",
    description: "Cupcake lembut dengan cream cheese frosting yang manis.",
    category: "cupcake",
    badge: { text: "Terlaris", type: "badge-popular" },
  },
  {
    id: 2,
    name: "Chocolate Lava",
    price: 35000,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
    description: "Kue coklat dengan lelehan coklat di dalamnya.",
    category: "cake",
    badge: { text: "Hot", type: "badge-featured" },
  },
  {
    id: 3,
    name: "Tiramisu Classic",
    price: 45000,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    description: "Tiramisu autentik dengan kopi dan mascarpone.",
    category: "cake",
  },
  {
    id: 4,
    name: "Matcha Roll Cake",
    price: 38000,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400",
    description: "Roll cake matcha dengan filling creamy.",
    category: "cake",
    badge: { text: "Baru", type: "badge-new" },
  },
  {
    id: 5,
    name: "Strawberry Shortcake",
    price: 42000,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    description: "Kue spons lembut dengan strawberry segar.",
    category: "cake",
  },
  {
    id: 6,
    name: "Vanilla Cupcake Pack",
    price: 48000,
    image: "https://images.unsplash.com/photo-1557925923-33b27f67e641?w=400",
    description: "Pack isi 4 cupcake vanilla dengan topping beragam.",
    category: "cupcake",
  },
  {
    id: 7,
    name: "Cheesecake Berry",
    price: 52000,
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400",
    description: "Cheesecake creamy dengan saus berry.",
    category: "cake",
    badge: { text: "Favorit", type: "badge-popular" },
  },
  {
    id: 8,
    name: "Carrot Cake",
    price: 38000,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    description: "Kue wortel dengan cream cheese frosting.",
    category: "cake",
  },
  {
    id: 9,
    name: "Choco Cupcake",
    price: 16000,
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400",
    description: "Cupcake coklat dengan buttercream coklat.",
    category: "cupcake",
  },
  {
    id: 10,
    name: "Rainbow Cupcake",
    price: 18000,
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400",
    description: "Cupcake warna-warni dengan buttercream.",
    category: "cupcake",
    badge: { text: "Warna-warni", type: "badge-new" },
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
