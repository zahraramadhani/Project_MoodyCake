// Authentication state
let currentUser = JSON.parse(localStorage.getItem("moodycake_user")) || null;
let users = JSON.parse(localStorage.getItem("moodycake_users")) || [];

// --- NEW HELPER FUNCTIONS FOR IN-MODAL ERROR ---

function showAuthError(modalId, title, body) {
  const errorDiv = document.getElementById(modalId + "Error");
  if (errorDiv) {
    errorDiv.style.display = "block";
    errorDiv.className = "alert-error"; // Use existing alert-error style from style.css
    errorDiv.innerHTML = `
      <div style="font-weight: 700; display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
        <span style="font-size: 18px;">❌</span> ${title}
      </div>
      <div style="font-size: 13px;">${body}</div>
    `;
  }
}

function clearAuthErrors() {
  const loginError = document.getElementById("loginError");
  const registerError = document.getElementById("registerError");
  if (loginError) {
    loginError.style.display = "none";
    loginError.innerHTML = "";
  }
  if (registerError) {
    registerError.style.display = "none";
    registerError.innerHTML = "";
  }
}

// -----------------------------------------------

function showLoginModal() {
  clearAuthErrors(); // Clear errors on open
  document.getElementById("loginModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function showRegisterModal() {
  clearAuthErrors(); // Clear errors on open
  document.getElementById("registerModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeAuthModals() {
  document.getElementById("loginModal").classList.remove("active");
  document.getElementById("registerModal").classList.remove("active");
  document.body.style.overflow = "auto";

  // Clear errors and form fields
  clearAuthErrors();

  // Clear form fields
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("regName").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPassword").value = "";
  document.getElementById("regPhone").value = "";
}

function handleRegister() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const phone = document.getElementById("regPhone").value.trim();

  clearAuthErrors();

  if (!name || !email || !password || !phone) {
    showAuthError(
      // Menggunakan fungsi baru untuk in-modal error
      "register",
      "Data Tidak Lengkap",
      "Harap isi semua field yang diperlukan."
    );
    return;
  }

  if (users.find((user) => user.email === email)) {
    showAuthError(
      // Menggunakan fungsi baru untuk in-modal error
      "register",
      "Email Sudah Terdaftar",
      "Silakan gunakan email lain atau login."
    );
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password, // Note: Dalam production, gunakan hashing
    phone,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("moodycake_users", JSON.stringify(users));

  currentUser = newUser;
  localStorage.setItem("moodycake_user", JSON.stringify(currentUser));

  closeAuthModals();
  updateAuthUI();

  showNotification(
    "Registrasi Berhasil!",
    `Selamat datang di MoodyCake, ${name}! 🎉`,
    "👋"
  );
}

function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  clearAuthErrors();

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem("moodycake_user", JSON.stringify(currentUser));
    closeAuthModals();
    updateAuthUI();

    showNotification(
      "Login Berhasil!",
      `Selamat datang kembali, ${user.name}! ✨`,
      "👋"
    );
  } else {
    showAuthError(
      // Menggunakan fungsi baru untuk in-modal error
      "login",
      "Login Gagal",
      "Email atau password salah. Silakan coba lagi."
    );
  }
}

function handleLogout() {
  showNotification(
    "Konfirmasi Logout",
    "Apakah Anda yakin ingin logout?",
    "🔐",
    `
        <button class="btn btn-pink" onclick="confirmLogout()">Ya, Logout</button>
        <button class="btn btn-outline" onclick="closeNotify()">Batal</button>
        `
  );
}

function confirmLogout() {
  currentUser = null;
  localStorage.removeItem("moodycake_user");
  updateAuthUI();
  closeNotify();

  showNotification("Logout Berhasil", "Anda telah logout dari sistem.", "👋");
}

function updateAuthUI() {
  const userControl = document.getElementById("userControl");
  const nav = document.querySelector("nav");

  // Remove existing user control if any
  const existingControl = document.querySelector("#userControl");
  if (existingControl) {
    existingControl.remove();
  }

  if (currentUser) {
    const userElement = document.createElement("div");
    userElement.id = "userControl";
    userElement.style.display = "flex";
    userElement.style.alignItems = "center";
    userElement.style.gap = "12px";
    userElement.style.marginLeft = "auto";
    userElement.style.marginRight = "12px";

    userElement.innerHTML = `
            <span style="color: var(--muted); font-size: 14px;">Halo, ${currentUser.name}</span>
            <button class="btn-ghost" onclick="handleLogout()" style="padding: 6px 12px; font-size: 12px;">Logout</button>
        `;

    nav.insertBefore(userElement, nav.querySelector(".cart-btn"));

    // Update mobile menu
    const mobileNav = document.getElementById("mobileNav");
    const existingMobileUser = mobileNav.querySelector("#mobileUserControl");
    if (existingMobileUser) {
      existingMobileUser.remove();
    }

    const mobileUserElement = document.createElement("div");
    mobileUserElement.id = "mobileUserControl";
    mobileUserElement.innerHTML = `
            <div style="padding: 16px; background: var(--pink-1); border-radius: 12px; margin-bottom: 12px;">
                <div style="font-weight: 700; color: var(--accent);">Halo, ${currentUser.name}</div>
                <div style="font-size: 12px; color: var(--muted);">${currentUser.email}</div>
                <button class="btn-ghost" onclick="handleLogout(); toggleMobileMenu()" style="width: 100%; margin-top: 8px; padding: 8px;">Logout</button>
            </div>
        `;

    mobileNav.insertBefore(mobileUserElement, mobileNav.firstChild.nextSibling);
  } else {
    // Add login button to desktop nav
    const userElement = document.createElement("div");
    userElement.id = "userControl";
    userElement.style.display = "flex";
    userElement.style.alignItems = "center";
    userElement.style.gap = "12px";
    userElement.style.marginLeft = "auto";
    userElement.style.marginRight = "12px";

    userElement.innerHTML = `
            <button class="btn-ghost" onclick="showLoginModal()" style="padding: 6px 12px; font-size: 12px;">Login/Daftar</button>
        `;

    nav.insertBefore(userElement, nav.querySelector(".cart-btn"));

    // Update mobile menu
    const mobileNav = document.getElementById("mobileNav");
    const existingMobileUser = mobileNav.querySelector("#mobileUserControl");
    if (existingMobileUser) {
      existingMobileUser.remove();
    }

    const mobileUserElement = document.createElement("div");
    mobileUserElement.id = "mobileUserControl";
    mobileUserElement.innerHTML = `
            <button class="btn-ghost" onclick="showLoginModal(); toggleMobileMenu()" style="width: 100%; margin-bottom: 12px; padding: 12px;">Login/Daftar</button>
        `;

    mobileNav.insertBefore(mobileUserElement, mobileNav.firstChild.nextSibling);
  }
}

function checkAuth() {
  if (!currentUser) {
    showNotification(
      "Login Diperlukan",
      "Silakan login terlebih dahulu untuk melanjutkan.",
      "🔐",
      `
            <button class="btn btn-pink" onclick="showLoginModal(); closeNotify()">Login</button>
            <button class="btn btn-outline" onclick="showRegisterModal(); closeNotify()">Daftar</button>
            `
    );
    return false;
  }
  return true;
}

// Initialize auth on load
document.addEventListener("DOMContentLoaded", function () {
  updateAuthUI();
});
