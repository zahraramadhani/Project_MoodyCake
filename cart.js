let cart = JSON.parse(localStorage.getItem("moodycake_cart")) || [];

function addToCart(product) {
  if (!checkAuth()) {
    return;
  }

  const existingItem = cart.find(
    (item) => item.id === product.id && item.notes === product.notes
  );

  if (existingItem) {
    existingItem.quantity += product.quantity;
    existingItem.totalPrice =
      (existingItem.price + existingItem.additionalPrice) *
      existingItem.quantity;
  } else {
    cart.push({
      ...product,
      totalPrice: (product.price + product.additionalPrice) * product.quantity,
    });
  }

  saveCart();
  updateCartBadges();

  // Show confirmation notification with options
  showNotification(
    "Berhasil Ditambahkan! 🛒",
    `${product.name} telah ditambahkan ke keranjang belanja Anda.`,
    "✅",
    `
        <button class="btn btn-pink" onclick="showCart(); closeNotify()">Lihat Keranjang</button>
        <button class="btn btn-outline" onclick="closeNotify()">Lanjut Belanja</button>
        `
  );
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartBadges();
  renderCartItems();

  showNotification("Item Dihapus", "Item telah dihapus dari keranjang.", "🗑️");
}

function updateCartItemQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    removeFromCart(index);
    return;
  }

  cart[index].totalPrice =
    (cart[index].price + cart[index].additionalPrice) * cart[index].quantity;
  saveCart();
  updateCartBadges();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem("moodycake_cart", JSON.stringify(cart));
}

function updateCartBadges() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeElements = document.querySelectorAll(".cart-badge");

  badgeElements.forEach((badge) => {
    badge.textContent = totalItems;
  });
}

function renderCartItems() {
  const cartItems = document.getElementById("cartItems");
  const cartSummary = document.getElementById("cartSummary");

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>🛒 Keranjang Kosong</h3>
                <p>Belum ada item di keranjang belanja Anda</p>
                <button class="btn btn-pink" onclick="showHome()">Mulai Belanja</button>
            </div>
        `;
    cartSummary.style.display = "none";
    return;
  }

  cartSummary.style.display = "block";

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-item-info">
                <h3 style="margin: 0 0 4px">${item.name}</h3>
                <p style="margin: 0 0 4px; color: var(--muted); font-size: 14px">${
                  item.description
                }</p>
                ${
                  item.notes
                    ? `<p style="margin: 0 0 4px; color: var(--pink-3); font-size: 12px">${item.notes}</p>`
                    : ""
                }
                <div class="price">${formatCurrency(
                  item.price + item.additionalPrice
                )}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control" style="margin: 0">
                    <button class="qty-btn" onclick="updateCartItemQuantity(${index}, -1)">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                </div>
                <div class="price" style="font-size: 18px; margin: 0 12px">${formatCurrency(
                  item.totalPrice
                )}</div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Hapus</button>
            </div>
        </div>
    `
    )
    .join("");

  updateCartSummary();
}

function updateCartSummary() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalPrice").textContent =
    formatCurrency(totalPrice);
}

function checkout() {
  if (!checkAuth()) {
    return;
  }

  if (cart.length === 0) {
    showNotification(
      "Keranjang Kosong",
      "Tambahkan item terlebih dahulu sebelum checkout.",
      "🛒"
    );
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let message = `Halo MoodyCake! 👋\n\nSaya *${currentUser.name}* ingin memesan:\n\n`;

  cart.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Harga: ${formatCurrency(item.totalPrice)}\n`;
    if (item.notes) {
      message += `   Catatan: ${item.notes}\n`;
    }
    message += `\n`;
  });

  message += `*Total Pesanan:* ${formatCurrency(totalPrice)}\n`;
  message += `*Total Item:* ${totalItems} item\n\n`;
  message += `*Data Diri:*\n`;
  message += `Nama: ${currentUser.name}\n`;
  message += `Email: ${currentUser.email}\n`;
  message += `Telepon: ${currentUser.phone}\n\n`;
  message += `Mohon konfirmasi ketersediaan dan total yang harus dibayar. Terima kasih! 🙏`;

  const phoneNumber = "6289653155023";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Show confirmation before opening WhatsApp
  showNotification(
    "Konfirmasi Checkout",
    `Anda akan diarahkan ke WhatsApp untuk menyelesaikan pemesanan.\n\nTotal: ${formatCurrency(
      totalPrice
    )}\nItem: ${totalItems} produk`,
    "📱",
    `
        <button class="btn btn-pink" onclick="window.open('${whatsappURL}', '_blank'); completeCheckout(); closeNotify();">Lanjutkan ke WhatsApp</button>
        <button class="btn btn-outline" onclick="closeNotify()">Batal</button>
        `
  );
}

function completeCheckout() {
  // Reset cart setelah checkout
  cart = [];
  saveCart();
  updateCartBadges();
  renderCartItems();

  // Kembali ke home
  showHome();

  showNotification(
    "Pesanan Dikirim! ✅",
    "Terima kasih! Pesanan Anda telah dikirim via WhatsApp. Tim kami akan segera menghubungi Anda untuk konfirmasi.",
    "🎉"
  );
}

// Initialize cart functionality
document.addEventListener("DOMContentLoaded", function () {
  updateCartBadges();

  // Setup checkout button
  const checkoutBtn = document.getElementById("btnProceedCheckout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }

  // Setup modal add to cart button
  const modalAddBtn = document.getElementById("modalAddToCartBtn");
  if (modalAddBtn) {
    modalAddBtn.addEventListener("click", addToCartFromModal);
  }
});
