// Set dark mode as default for that "Aesthetic" look
document.body.setAttribute("data-theme", "dark");

// Message Reveal Implementation
const openBtn = document.getElementById("openBtn");
const secretMessage = document.getElementById("secretMessage");

openBtn.addEventListener("click", () => {
  // Elegant transition
  openBtn.style.opacity = "0";
  openBtn.style.pointerEvents = "none";

  setTimeout(() => {
    openBtn.classList.add("hidden");
    secretMessage.classList.remove("hidden");
    secretMessage.classList.add("show-message");

    // Launch subtle festive confetti
    launchMinimalConfetti();
  }, 300);
});

function launchMinimalConfetti() {
  const end = Date.now() + 2 * 1000;
  const colors = ["#c5a059", "#e9c46a", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      scalar: 0.7,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      scalar: 0.7,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// === FITUR EXIT NOTIFICATION & VIBRATE ===

// Variable buat nandaik kalo lagi refresh doang
let isLagiRefresh = false;

// Trik deteksi kalo user neken F5 atau Ctrl+R (Refresh jalur keyboard)
window.addEventListener("keydown", (e) => {
  if (
    e.key === "F5" ||
    (e.ctrlKey && e.key.toLowerCase() === "r") ||
    (e.metaKey && e.key.toLowerCase() === "r")
  ) {
    isLagiRefresh = true;
  }
});

// Deteksi saat user mau close tab (Prompt Browser)
window.addEventListener("beforeunload", (e) => {
  // Kalo keciduk cuma refresh, bablasin aja tanpa warning
  if (isLagiRefresh) {
    isLagiRefresh = false; // Reset state
    return;
  }

  // Kasih getaran dikit biar berasa
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  // Standard untuk munculin pop-up "Are you sure?"
  e.preventDefault();
  e.returnValue = "";
});

// Trick Deteksi Exit Intent (Munculin Toast pas kursor keluar layar atas)
document.addEventListener("mouseleave", (e) => {
  if (e.clientY <= 0) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Waduh, mau kemana tuh?",
      text: "Jangan lupa maaf-maafan dulu sama temen-temen!",
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      didOpen: () => {
        // Getar HP pas toast muncul
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
      },
    });
  }
});

// === FITUR DYNAMIC WHATSAPP REPLY ===

const nameInput = document.getElementById("nameInput");
const sendWaBtn = document.getElementById("sendWaBtn");
const clearName = document.getElementById("clearName");

function updateWaLink() {
  const name = nameInput.value.trim();
  const phone = "6285725062515";
  const baseMessage =
    "Wa'alaikumsalam warahmatullahi wabarakatuh. Minal aidzin wal faidzin juga ya Fren! ";

  // Togle tombol clear (X)
  if (name) {
    clearName.classList.add("active");
  } else {
    clearName.classList.remove("active");
  }

  // Kalo ada namanya, tambahin "Dari: [Nama]"
  const finalMessage = name ? `${baseMessage}\n\nDari: *${name}*` : baseMessage;

  // Encode URL
  const encodedMessage = encodeURIComponent(finalMessage);
  sendWaBtn.href = `https://wa.me/${phone}?text=${encodedMessage}`;
}

// Update link tiap kali ngetik
nameInput.addEventListener("input", updateWaLink);

// Fungsi hapus nama
clearName.addEventListener("click", () => {
  nameInput.value = "";
  updateWaLink();
  nameInput.focus();
});

// Tambahan: Pas diklik, kalo nama kosong kasih peringatan manis (optional tapi asik)
sendWaBtn.addEventListener("click", (e) => {
  if (!nameInput.value.trim()) {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Eits, Namanya Mana?",
      html: "Isi namamu dulu dong biar Frendian tau ini dari siapa 😊<br>jangan dikasih nama sembarangan. Okay!",
      confirmButtonColor: "#d4af37",
    });
    nameInput.focus();
  }
});
