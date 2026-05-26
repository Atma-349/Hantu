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

function kirimPesan() {
  ["f-nama","f-email","f-hp","f-korban","f-alamat","f-hantu","f-level","f-pesan"]
    .forEach(id => document.getElementById(id).value = "");
}

function tutupDisclaimer() {
  const el = document.getElementById("disclaimer");
  el.classList.add("disclaimer-hide");
  el.addEventListener("animationend", () => el.remove(), { once: true });
}