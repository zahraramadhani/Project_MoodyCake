// Main application logic
document.addEventListener("DOMContentLoaded", function () {
  // Load home page by default
  showHome();

  // Initialize products
  renderProducts(products);

  // Update cart badges
  updateCartBadges();
});

function showHome() {
  const mainContent = document.getElementById("mainContent");
  const cartPage = document.getElementById("cartPage");

  cartPage.classList.remove("active");
  mainContent.style.display = "block";

  mainContent.innerHTML = `
        <section class="hero">
            <div class="hero-left">
                <h1>Mood Booster dengan Setiap Gigitan 🎂</h1>
                <p class="lead">Kue homemade spesial untuk hari bahagiamu. Pesan sekarang, antar besok!</p>
                <div class="btns">
                    <button class="btn btn-pink" onclick="scrollToSection('menu')">Lihat Menu</button>
                    <button class="btn btn-outline" onclick="showNotification('Info', 'Hubungi kami di Instagram: @moodycake.id', '📱')">Kontak</button>
                </div>
            </div>
            <div class="hero-right">
    <div class="featured-cake">
        <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" alt="Cake Spesial MoodyCake" />
        <div class="cake-caption">
            <h3>Kue Spesial Hari Ini ✨</h3>
            <p>Fresh dari oven setiap pagi dengan bahan premium pilihan</p>
        </div>
    </div>
</div>
        </section>

        <section id="menu" class="section-transition">
            <div style="max-width: 1100px; margin: 60px auto; padding: 0 24px">
                <h2 style="font-family: 'Playfair Display'; font-size: 36px; text-align: center; margin-bottom: 10px">🍰 Our Menu</h2>
                <p style="text-align: center; color: var(--muted); max-width: 600px; margin: 0 auto 30px">Pilih dari berbagai kue lezat yang dibuat dengan bahan premium dan penuh cinta</p>
                
                <div class="menu-tabs">
                    <button class="tab-btn active" onclick="filterProducts('all')">Semua</button>
                    <button class="tab-btn" onclick="filterProducts('cake')">Kue</button>
                    <button class="tab-btn" onclick="filterProducts('cupcake')">Cupcake</button>
                </div>
                
                <div class="gallery"></div>
            </div>
        </section>

        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Pelanggan Bahagia</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">50+</div>
                    <div class="stat-label">Varian Rasa</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">1000+</div>
                    <div class="stat-label">Kue Terjual</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">4.9</div>
                    <div class="stat-label">Rating</div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="section-transition">
            <div style="max-width: 1100px; margin: 60px auto; padding: 0 24px">
                <div style="background: var(--glass); border-radius: 18px; padding: 40px; box-shadow: var(--card-shadow);">
                    <h2 style="font-family: 'Playfair Display'; font-size: 36px; text-align: center; margin-bottom: 20px; color: var(--accent)">About Moody Cake</h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                        <div>
                            <p style="color: var(--muted); line-height: 1.8; font-size: 16px; margin-bottom: 20px">
                                MoodyCake adalah Cake shop buatan Kami Bersama Yaitu <strong>Nur Annisa Chania, Zahra Ramadhani Sanjaya, Zamziatul Latifah</strong>
                            </p>
                            <p style="color: var(--muted); line-height: 1.8; font-size: 16px; margin-bottom: 20px">
                                Kami melayani custom design untuk berbagai acara spesial Anda. Mari wujudkan kue impian Anda bersama MoodyCake! 🎂💕
                            </p>
                            
                            <div style="display: flex; gap: 15px; margin-top: 30px; flex-wrap: wrap;">
                                <div style="text-align: center;">
                                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--pink-2), var(--pink-3)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; color: white; font-size: 24px;">NC</div>
                                    <div style="font-weight: 700; color: var(--accent);">Nur Annisa Chania</div>
                                    <div style="font-size: 12px; color: var(--muted);">Founder</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--pink-2), var(--pink-3)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; color: white; font-size: 24px;">ZR</div>
                                    <div style="font-weight: 700; color: var(--accent);">Zahra Ramadhani</div>
                                    <div style="font-size: 12px; color: var(--muted);">Co-Founder</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--pink-2), var(--pink-3)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; color: white; font-size: 24px;">ZL</div>
                                    <div style="font-weight: 700; color: var(--accent);">Zamziatul Latifah</div>
                                    <div style="font-size: 12px; color: var(--muted);">Co-Founder</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="text-align: center;">
                            <img src="we.jpg" alt="MoodyCake Team" style="width: 100%; max-width: 300px; border-radius: 15px; box-shadow: var(--card-shadow);">
                            <div style="margin-top: 15px; font-style: italic; color: var(--muted); font-size: 14px;">Tim MoodyCake yang berdedikasi 💖</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 12px; text-align: center;">
                        <h3 style="color: var(--accent); margin-bottom: 15px;">✨ Visi & Misi Kami</h3>
                        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 10px;">
                            <strong>Visi:</strong> Menjadi cake shop terdepan yang menghadirkan kebahagiaan melalui setiap kue yang kami buat
                        </p>
                        <p style="color: var(--muted); line-height: 1.6;">
                            <strong>Misi:</strong> Menyediakan kue berkualitas tinggi dengan desain kreatif dan rasa yang memukau untuk setiap momen spesial Anda
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="testimonials" class="testimonial-section section-transition">
            <h2 style="font-family: 'Playfair Display'; font-size: 36px; text-align: center; margin-bottom: 10px">💬 Testimoni Pelanggan</h2>
            <p style="text-align: center; color: var(--muted); max-width: 600px; margin: 0 auto 30px">Apa kata mereka yang sudah mencoba kue MoodyCake</p>
            
            <div class="testimonial-grid">
                <div class="testimonial-card">
                    <p>"Kuenya enak banget! Lembut dan tidak terlalu manis. Anak-anak suka sekali!"</p>
                    <div style="margin-top: 16px; font-weight: 700">- Sarah, Bandung</div>
                </div>
                <div class="testimonial-card">
                    <p>"Pelayanannya cepat dan kuenya fresh. Packagingnya juga rapi banget. Recommended!"</p>
                    <div style="margin-top: 16px; font-weight: 700">- Rina, Jakarta</div>
                </div>
                <div class="testimonial-card">
                    <p>"Red Velvet cupcakenya juara! Cream cheesenya pas, tidak eneg. Sudah pesen berkali-kali."</p>
                    <div style="margin-top: 16px; font-weight: 700">- Dito, Bekasi</div>
                </div>
            </div>
        </section>

        <section id="location" class="section-transition">
            <div class="map-section">
                <h2 style="font-family: 'Playfair Display'; font-size: 36px; text-align: center; margin-bottom: 10px">📍 Temukan Kami</h2>
                <p style="text-align: center; color: var(--muted); margin-bottom: 30px">Kunjungi toko kami atau pesan online untuk pengalaman terbaik</p>
                
                <div class="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.888478923924!2d107.610157474832!3d-6.902392067445671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64a8a3b31b7%3A0x1fdf2d99ec7f3b8b!2sBandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v169876543210!5m2!1sen!2sid" 
                            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                
                <div class="contact-info">
                    <div class="contact-card">
                        <div class="contact-icon">🏪</div>
                        <div class="contact-details">
                            <h4>Alamat Toko</h4>
                            <p>Jl. Merdeka No. 123, Bandung</p>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon">🕒</div>
                        <div class="contact-details">
                            <h4>Jam Operasional</h4>
                            <p>Setiap Hari, 08:00 - 20:00 WIB</p>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon">📞</div>
                        <div class="contact-details">
                            <h4>Telepon</h4>
                            <p>(022) 1234-5678</p>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon">📱</div>
                        <div class="contact-details">
                            <h4>Instagram</h4>
                            <p>@moodycake.id</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

  // Initialize products in home page
  renderProducts(products);

  // Add animation to sections
  setTimeout(() => {
    document.querySelectorAll(".section-transition").forEach((section) => {
      section.classList.add("active");
    });
  }, 100);
}

function showCart() {
  const mainContent = document.getElementById("mainContent");
  const cartPage = document.getElementById("cartPage");

  mainContent.style.display = "none";
  cartPage.classList.add("active");

  renderCartItems();
}

// Initialize the application
showHome();

// Main application logic
document.addEventListener("DOMContentLoaded", function () {
  // Load home page by default
  showHome();

  // Initialize products
  renderProducts(products);

  // Update cart badges
  updateCartBadges();

  // Initialize auth
  updateAuthUI();
});
