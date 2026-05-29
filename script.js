// ----------------------------------------------------------------
// 🎈 POIN PENTING: FUNGSI TUTUP DISCLAIMER
// Dipanggil saat user klik tombol "Lanjutkan"
// Cara kerjanya:
//   1. Tambahkan class "disclaimer-hide" → memicu animasi fade out (CSS)
//   2. Setelah animasi selesai (animationend), elemen dihapus dari DOM
//      agar tidak menghalangi halaman
// ----------------------------------------------------------------
function tutupDisclaimer() {
  const el = document.getElementById("disclaimer"); // Ambil elemen disclaimer
  el.classList.add("disclaimer-hide");              // Tambahkan class animasi keluar

  // addEventListener "animationend" = tunggu animasi CSS selesai dulu, baru hapus elemen
  // { once: true } = listener ini hanya berjalan sekali, lalu otomatis dihapus
  el.addEventListener("animationend", () => el.remove(), { once: true });
}


// ----------------------------------------------------------------
// 🎈 POIN PENTING: FITUR SCROLL SPY (Navigasi Aktif Otomatis)
// Fungsi ini membuat link navbar berubah warna sesuai section
// yang sedang dilihat user saat mereka scroll halaman.
// Cara kerjanya:
//   - Ambil semua link navbar dan semua section
//   - Setiap kali halaman di-scroll, cek posisi scroll vs posisi section
//   - Link yang sesuai section aktif diberi class "active"
// ----------------------------------------------------------------

// querySelectorAll = ambil SEMUA elemen yang cocok, hasilnya berupa NodeList 
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("#home, #section-profil, #gallery, #contact");

// window.addEventListener("scroll") = jalankan fungsi ini setiap kali halaman di-scroll
window.addEventListener("scroll", () => {
  let current = ""; // Variabel untuk menyimpan id section yang sedang aktif

  sections.forEach((sec) => {
    // Jika posisi scroll sudah melewati bagian atas section (dikurangi 100px buffer):
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute("id"); // Simpan id section ini sebagai yang aktif
    }
  });

  // Update tampilan semua link navbar
  navLinks.forEach((a) => {
    a.classList.remove("active"); // Hapus class active dari semua link dulu
    // Kalau href link cocok dengan section aktif, tambahkan class active
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});


// ----------------------------------------------------------------
// 🎈 POIN PENTING: ELEMEN AUDIO
// Diambil sekali di luar fungsi agar bisa dipakai ulang
// oleh fungsi showFullscreen dan closeFullscreen
// ----------------------------------------------------------------
const audio = document.getElementById("scare-audio");


// ----------------------------------------------------------------
// 🎈 POIN PENTING: FUNGSI BUKA GAMBAR FULLSCREEN + PUTAR AUDIO
// Dipanggil saat user klik salah satu kartu di galeri.
// Parameter "card" = elemen .card yang diklik (dikirim via "this" di HTML)
// Cara kerjanya:
//   1. Ambil src gambar dari dalam kartu yang diklik
//   2. Tampilkan overlay fullscreen dengan animasi
//   3. Putar audio seram dari awal
// ----------------------------------------------------------------
function showFullscreen(card) {
  const img     = card.querySelector("img"); // Cari elemen <img> di dalam kartu
  const overlay = document.getElementById("fs-overlay");
  const fsImg   = document.getElementById("fs-img");

  fsImg.src = img.src;              // Salin src gambar kartu ke img di overlay
  overlay.classList.remove("hide"); // Pastikan class hide tidak ada
  overlay.classList.add("show");    // Tambah class show → memicu display: flex + animasi

  audio.currentTime = 0;  // Reset audio ke detik 0 (mulai dari awal)
  // .play() mengembalikan Promise; .catch() untuk menangani jika browser memblokir autoplay
  audio.play().catch(err => console.log("Audio diblokir browser"));
}


// ----------------------------------------------------------------
// FUNGSI TUTUP FULLSCREEN GAMBAR
// Dipanggil saat user klik overlay, tombol X, atau tekan Escape
// Cara kerjanya:
//   1. Tambahkan class "hide" → animasi menutup (CSS)
//   2. Setelah animasi selesai, hapus class "show" dan "hide"
//   3. Hentikan audio
// ----------------------------------------------------------------
function closeFullscreen() {
  const overlay = document.getElementById("fs-overlay");
  overlay.classList.add("hide"); // Tambahkan animasi keluar

  // Setelah animasi selesai, bersihkan semua class agar overlay kembali hidden
  overlay.addEventListener("animationend", () => {
    overlay.classList.remove("show", "hide"); // Hapus keduanya sekaligus
  }, { once: true }); // Hanya berjalan sekali

  // Hentikan dan reset audio
  audio.pause();
  audio.currentTime = 0;
}


// ----------------------------------------------------------------
// 🎈 POIN PENTING: EVENT LISTENER TOMBOL KEYBOARD (Escape)
// Dengan ini user bisa menutup fullscreen hanya dengan tekan Escape
// document.addEventListener = mendengarkan event di seluruh halaman
// e.key === "Escape" = cek apakah tombol yang ditekan adalah Escape
// ----------------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeFullscreen();
});


// ----------------------------------------------------------------
// 🎈 POIN PENTING: CUSTOM ALERT BOX
// showAlert(msg) = tampilkan kotak peringatan dengan pesan tertentu
// tutupAlert()   = tutup kotak peringatan (dipanggil tombol "Oke")
// ----------------------------------------------------------------
function showAlert(msg) {
  document.getElementById("custom-alert-msg").textContent = msg;
  document.getElementById("custom-alert").classList.add("show");
}

function tutupAlert() {
  document.getElementById("custom-alert").classList.remove("show");
}

// Tutup alert jika user klik area gelap di luar kotak
document.getElementById("custom-alert").addEventListener("click", function(e) {
  if (e.target === this) tutupAlert();
});


// ----------------------------------------------------------------
// 🎈 POIN PENTING: FUNGSI KIRIM PESANAN VIA WHATSAPP
// Dipanggil saat user klik tombol "Kirim Pesanan Bala"
// Cara kerjanya:
//   1. Ambil nilai semua field form
//   2. Validasi — jika ada yang kosong, tampilkan peringatan dan berhenti
//   3. Susun pesan teks yang rapi
//   4. Buka WhatsApp dengan nomor tujuan + pesan yang sudah di-encode
//   5. Reset semua field form
// ----------------------------------------------------------------
function kirimPesan() {
  // Ambil nilai dari setiap field
  const nama   = document.getElementById("f-nama").value.trim();
  const korban = document.getElementById("f-korban").value.trim();
  const tujuan = document.getElementById("f-tujuan").value.trim();
  const hantu  = document.getElementById("f-hantu").value;
  const level  = document.getElementById("f-level").value;
  const pesan  = document.getElementById("f-pesan").value.trim();

  // ----------------------------------------------------------------
  // VALIDASI: Semua field wajib diisi
  // Jika ada yang kosong/belum dipilih, tampilkan alert dan hentikan fungsi
  // ----------------------------------------------------------------
  if (!nama) {
    showAlert("Nama Pemesan tidak boleh kosong!");
    document.getElementById("f-nama").focus();
    return;
  }
  if (!korban) {
    showAlert("Nama Korban tidak boleh kosong!");
    document.getElementById("f-korban").focus();
    return;
  }
  if (!tujuan) {
    showAlert("Tujuan Pengiriman Bala tidak boleh kosong!");
    document.getElementById("f-tujuan").focus();
    return;
  }
  if (!hantu) {
    showAlert("Pilih dulu hantu yang mau dikirim!");
    document.getElementById("f-hantu").focus();
    return;
  }
  if (!level) {
    showAlert("Pilih dulu Tingkat Kegentaran!");
    document.getElementById("f-level").focus();
    return;
  }
  if (!pesan) {
    showAlert("Keterangan Tambahan tidak boleh kosong!");
    document.getElementById("f-pesan").focus();
    return;
  }

  // ----------------------------------------------------------------
  // SUSUN PESAN WA
  // Template pesan yang akan dikirim ke nomor tujuan
  // encodeURIComponent() = mengubah karakter spesial agar aman di URL
  // ----------------------------------------------------------------
  const text = encodeURIComponent(
`PESANAN BALA MASUK 

Data Pemesan:
- Nama   : ${nama}

Data Tujuan:
- Korban : ${korban}
- Tujuan : ${tujuan}

Paket Kiriman:
- Hantu  : ${hantu}
- Level  : ${level}

Keterangan:
${pesan}`
  );

  // ----------------------------------------------------------------
  // NOMOR WA TUJUAN
  // ----------------------------------------------------------------
  const nomorWA = "6281265251062"; // ← ganti nomor WA di sini
  const url = `https://wa.me/${nomorWA}?text=${text}`;

  window.open(url, "_blank"); // Buka WA di tab baru

  // Reset semua field setelah berhasil dikirim
  ["f-nama","f-korban","f-tujuan","f-hantu","f-level","f-pesan"]
    .forEach(id => {
      document.getElementById(id).value = "";
    });

  showAlert("Pesanan Bala berhasil dikirim via WhatsApp! 👻");
}