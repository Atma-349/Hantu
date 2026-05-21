const audio = document.getElementById("scare-audio");

function showFullscreen(card) {
  const img     = card.querySelector("img");
  const overlay = document.getElementById("fs-overlay");
  const fsImg   = document.getElementById("fs-img");

  fsImg.src = img.src;
  overlay.classList.remove("hide");
  overlay.classList.add("show");

  audio.currentTime = 0;
  audio.play();
}

function closeFullscreen() {
  const overlay = document.getElementById("fs-overlay");
  overlay.classList.add("hide");
  overlay.addEventListener("animationend", () => {
    overlay.classList.remove("show", "hide");
  }, { once: true });

  audio.pause();
  audio.currentTime = 0;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeFullscreen();
});

const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("[id]").forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

function tutupDisclaimer() {
  const el = document.getElementById("disclaimer");
  el.classList.add("disclaimer-hide");
  el.addEventListener("animationend", () => el.remove(), { once: true });
}

function kirimPesan() {
  // Reset semua field
  document.getElementById("f-nama").value   = "";
  document.getElementById("f-email").value  = "";
  document.getElementById("f-hp").value     = "";
  document.getElementById("f-subjek").value = "";
  document.getElementById("f-pesan").value  = "";

  // Tampilkan notif
  showToast("Pesan berhasil terkirim! ✅");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.querySelector("span").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}