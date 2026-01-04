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
    const subject = document.getElementById("subject").value.trim(); // Tambahkan subject
    const message = document.getElementById("message").value.trim();

    // Validasi semua field
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Kirim data ke Google Sheets via Apps Script
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzAvWHC5UmO6wTjuUp7pz-LZhffbC5ScyfEgruJ_GEcfHg-FrlhBC5J_QQ0_9NPo8afUA/exec"; // Ganti dengan URL Apps Script Anda
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // Mengatasi CORS issues
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then(() => {
        alert("Thank you for your message! It has been saved.");
        this.reset(); // Reset form setelah sukses
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error sending your message. Please try again.");
      });
  });

// Back to top button
window.addEventListener("scroll", () => {
  const backToTop = document.getElementById("back-to-top");
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger menu toggle
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("show");
});
