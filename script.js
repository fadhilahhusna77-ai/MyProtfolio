// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-in").forEach((section) => {
  observer.observe(section);
});

// Modal functions
function openModal(title, description, link) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-description").textContent = description;
  document.getElementById("modal-link").href = link;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Close modal on outside click
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Contact form submission with validation and Google Sheets integration
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validasi semua field
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields.", "error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showNotification("Please enter a valid email.", "error");
      return;
    }

    // Kirim data ke Google Sheets via Apps Script
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzAvWHC5UmO6wTjuUp7pz-LZhffbC5ScyfEgruJ_GEcfHg-FrlhBC5J_QQ0_9NPo8afUA/exec"; // Ganti dengan URL Apps Script Anda
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then(() => {
        showNotification(
          "Thank you for your message! It has been saved.",
          "success"
        );
        this.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        showNotification(
          "There was an error sending your message. Please try again.",
          "error"
        );
      });
  });

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");

  notificationMessage.textContent = message;
  notification.className = `notification ${type}`; // Tambahkan class 'error' jika type error
  notification.style.display = "block";

  // Auto-hide setelah 5 detik
  setTimeout(() => {
    closeNotification();
  }, 5000);
}

// Fungsi untuk menutup notifikasi
function closeNotification() {
  const notification = document.getElementById("notification");
  notification.classList.add("hide");
  setTimeout(() => {
    notification.style.display = "none";
    notification.classList.remove("hide");
  }, 500); // Tunggu animasi fade-out selesai
}

document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger menu toggle
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("show");
});
