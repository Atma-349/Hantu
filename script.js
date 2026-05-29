// Tutup kotak disclaimer di awal masuk web
function tutupDisclaimer() {
  const el = document.getElementById("disclaimer");
  el.classList.add("disclaimer-hide");
  el.addEventListener("animationend", () => el.remove(), { once: true });
}

//Fitur Scroll Spy 
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("#home, #section-profil, #gallery, #contact");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

// Ambil elemen audio
const audio = document.getElementById("scare-audio");

// Fungsi buka gambar fullscreen + putar audio
function showFullscreen(card) {
  const img     = card.querySelector("img");
  const overlay = document.getElementById("fs-overlay");
  const fsImg   = document.getElementById("fs-img");

  fsImg.src = img.src;
  overlay.classList.remove("hide");
  overlay.classList.add("show");

  audio.currentTime = 0;
  audio.play().catch(err => console.log("Audio diblokir browser"));
}

// Fungsi tutup fullscreen gambar
function closeFullscreen() {
  const overlay = document.getElementById("fs-overlay");
  overlay.classList.add("hide");
  overlay.addEventListener("animationend", () => {
    overlay.classList.remove("show", "hide");
  }, { once: true });

  audio.pause();
  audio.currentTime = 0;
}

// Tombol Escape untuk tutup galeri
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeFullscreen();
});

//Reset input form setelah kirim pesanan
function kirimPesan() {
  ["f-nama","f-email","f-hp","f-korban","f-alamat","f-hantu","f-level","f-pesan"]
    .forEach(id => document.getElementById(id).value = "");
  alert("Pesanan Bala Berhasil Dikirim!");
}

