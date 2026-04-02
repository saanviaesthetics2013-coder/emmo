// ===================== PRELOADER =====================
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// ===================== MOBILE MENU =====================
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.style.display = (navMenu.style.display === "flex") ? "none" : "flex";
});

// ===================== BACK TO TOP =====================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== MODALS =====================
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// ===================== COPY TEXT =====================
function copyText(id) {
  const box = document.getElementById(id);
  box.select();
  box.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("✅ Copied to Clipboard!");
}

// ===================== PASSWORD STRENGTH =====================
function checkPassword() {
  const pass = document.getElementById("passwordInput").value;
  const result = document.getElementById("passResult");

  let strength = 0;
  if (pass.length >= 8) strength++;
  if (/[A-Z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[^A-Za-z0-9]/.test(pass)) strength++;

  if (pass.length === 0) {
    result.innerHTML = "⚠ Please enter a password!";
    result.style.color = "orange";
    return;
  }

  if (strength <= 1) {
    result.innerHTML = "❌ Weak Password";
    result.style.color = "red";
  } else if (strength === 2) {
    result.innerHTML = "⚠ Medium Password";
    result.style.color = "orange";
  } else if (strength === 3) {
    result.innerHTML = "✅ Strong Password";
    result.style.color = "lightgreen";
  } else {
    result.innerHTML = "🔥 Ultra Strong Password";
    result.style.color = "cyan";
  }
}

// ===================== PASSWORD GENERATOR =====================
function generatePassword() {
  const len = parseInt(document.getElementById("passLen").value);
  const output = document.getElementById("genPassOut");

  if (!len || len < 6 || len > 50) {
    output.value = "⚠ Enter length between 6 and 50!";
    return;
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let pass = "";

  for (let i = 0; i < len; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  output.value = pass;
}

// ===================== IP LOOKUP (REAL API) =====================
async function lookupIP() {
  const ip = document.getElementById("ipInput").value;
  const output = document.getElementById("ipResult");

  if (!ip) {
    output.textContent = "⚠ Please enter an IP address.";
    return;
  }

  output.textContent = "Searching...";

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (data.error) {
      output.textContent = "❌ Invalid IP address!";
      return;
    }

    output.textContent =
      `🌍 IP: ${data.ip}\n` +
      `🏳 Country: ${data.country_name}\n` +
      `📍 City: ${data.city}\n` +
      `📌 Region: ${data.region}\n` +
      `🏢 ISP: ${data.org}\n` +
      `🛰 Latitude: ${data.latitude}\n` +
      `🛰 Longitude: ${data.longitude}\n`;

  } catch (err) {
    output.textContent = "❌ API Error. Try later.";
  }
}

// ===================== HTTPS SCANNER =====================
function scanWebsite() {
  const url = document.getElementById("scanInput").value;
  const result = document.getElementById("scanResult");

  if (!url) {
    result.innerHTML = "⚠ Please enter a URL.";
    result.style.color = "orange";
    return;
  }

  if (url.startsWith("https://")) {
    result.innerHTML = "✅ Secure Website (HTTPS Enabled)";
    result.style.color = "cyan";
  } else if (url.startsWith("http://")) {
    result.innerHTML = "⚠ Not Secure (HTTP Only)";
    result.style.color = "orange";
  } else {
    result.innerHTML = "❌ Invalid URL. Start with http:// or https://";
    result.style.color = "red";
  }
}

// ===================== ENCRYPT / DECRYPT =====================
function encryptText() {
  const text = document.getElementById("encText").value;
  const key = document.getElementById("encKey").value;
  const output = document.getElementById("encOutput");

  if (!text || !key) {
    output.value = "⚠ Enter both message and key.";
    return;
  }

  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    encrypted += String.fromCharCode(text.charCodeAt(i) + key.length);
  }

  output.value = encrypted;
}

function decryptText() {
  const text = document.getElementById("encText").value;
  const key = document.getElementById("encKey").value;
  const output = document.getElementById("encOutput");

  if (!text || !key) {
    output.value = "⚠ Enter both message and key.";
    return;
  }

  let decrypted = "";
  for (let i = 0; i < text.length; i++) {
    decrypted += String.fromCharCode(text.charCodeAt(i) - key.length);
  }

  output.value = decrypted;
}

// ===================== BASE64 =====================
function encodeBase64() {
  const text = document.getElementById("baseInput").value;
  const out = document.getElementById("baseOutput");

  if (!text) {
    out.value = "⚠ Enter text first!";
    return;
  }

  out.value = btoa(text);
}

function decodeBase64() {
  const text = document.getElementById("baseInput").value;
  const out = document.getElementById("baseOutput");

  if (!text) {
    out.value = "⚠ Enter Base64 text first!";
    return;
  }

  try {
    out.value = atob(text);
  } catch {
    out.value = "❌ Invalid Base64!";
  }
}

// ===================== SHA-256 HASH =====================
async function generateHash() {
  const input = document.getElementById("hashInput").value;
  const out = document.getElementById("hashOutput");

  if (!input) {
    out.value = "⚠ Enter text first!";
    return;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  out.value = hashHex;
}

// ===================== QR GENERATOR =====================
function generateQR() {
  const text = document.getElementById("qrInput").value;
  const img = document.getElementById("qrImage");

  if (!text) {
    alert("⚠ Enter something to generate QR!");
    return;
  }

  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
}

// ===================== STOPWATCH =====================
let stopwatchInterval;
let stopwatchSeconds = 0;

function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

function startStopwatch() {
  if (stopwatchInterval) return;

  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    document.getElementById("stopwatchDisplay").innerText = formatTime(stopwatchSeconds);
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchSeconds = 0;
  document.getElementById("stopwatchDisplay").innerText = "00:00:00";
}

// ===================== TIMER =====================
let timerInterval;

function startTimer() {
  let seconds = parseInt(document.getElementById("timerSeconds").value);
  const display = document.getElementById("timerDisplay");

  if (!seconds || seconds <= 0) {
    display.innerText = "⚠ Invalid!";
    return;
  }

  clearInterval(timerInterval);
  display.innerText = seconds;

  timerInterval = setInterval(() => {
    seconds--;
    display.innerText = seconds;

    if (seconds <= 0) {
      clearInterval(timerInterval);
      display.innerText = "⏰ DONE!";
      alert("⏰ Timer Finished!");
    }
  }, 1000);
}

// ===================== AI PREDICTOR =====================
function aiPredict() {
  const result = document.getElementById("aiResult");

  const predictions = [
    "🤖 AI will replace repetitive jobs but create smarter careers.",
    "🛡 AI will automatically stop cyber attacks.",
    "🚀 Robots will build space colonies.",
    "🏥 AI doctors will detect diseases instantly.",
    "🌍 AI will control smart cities.",
    "⚡ AI will create new AI without humans."
  ];

  result.innerHTML = predictions[Math.floor(Math.random() * predictions.length)];
  result.style.color = "cyan";
}

// ===================== CYBER TIP =====================
function showTip() {
  const tips = [
    "🔐 Always use 2FA.",
    "🛡 Never click unknown links.",
    "📡 Use VPN on public WiFi.",
    "🔑 Use password managers.",
    "⚠ Update your software regularly.",
    "🧠 Never share OTP.",
    "💻 Avoid cracked software."
  ];

  alert(tips[Math.floor(Math.random() * tips.length)]);
}

// ===================== FUTURE PREDICTION =====================
function generatePrediction() {
  const predictionText = document.getElementById("predictionText");

  const list = [
    "🚀 Robots will become personal assistants.",
    "🛡 AI will become strongest cybersecurity shield.",
    "🤖 AI will create smart cities.",
    "🧠 Humans and AI will work together.",
    "🌌 Robots will explore deep space.",
    "⚡ AI will learn emotions."
  ];

  predictionText.innerHTML = list[Math.floor(Math.random() * list.length)];
}

// ===================== MESSAGE SYSTEM =====================
function fakeSend() {
  const name = document.getElementById("nameMsg").value;
  const email = document.getElementById("emailMsg").value;
  const msg = document.getElementById("textMsg").value;
  const result = document.getElementById("msgResult");

  if (!name || !email || !msg) {
    result.innerHTML = "⚠ Fill all fields!";
    result.style.color = "orange";
    return;
  }

  result.innerHTML = "✅ Message Sent (Demo Mode)";
  result.style.color = "cyan";
}

// ===================== TERMINAL COMMANDS =====================
function runCommand() {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalOutput");

  const cmd = input.value.trim().toLowerCase();
  if (!cmd) return;

  output.innerHTML += `<p style="color:lightgreen;">EMMO@Cyber:~$ ${cmd}</p>`;

  if (cmd === "help") {
    output.innerHTML += `<p>Commands: help, about, tools, hack, ai, clear</p>`;
  } else if (cmd === "about") {
    output.innerHTML += `<p>⚡ EMMO is a Cyber + AI futuristic portfolio with tools.</p>`;
  } else if (cmd === "tools") {
    output.innerHTML += `<p>Tools Available: Password Checker, Generator, IP Lookup, Hash, QR, Base64, Timer, Stopwatch...</p>`;
  } else if (cmd === "hack") {
    output.innerHTML += `<p style="color:red;">❌ Access Denied! Unauthorized hacking detected.</p>`;
  } else if (cmd === "ai") {
    output.innerHTML += `<p>🤖 AI Status: ONLINE | Neural mode active.</p>`;
  } else if (cmd === "clear") {
    output.innerHTML = `<p>⚡ Terminal cleared.</p>`;
  } else {
    output.innerHTML += `<p style="color:orange;">Unknown command. Type 'help'</p>`;
  }

  output.scrollTop = output.scrollHeight;
  input.value = "";
}

// ===================== MATRIX EFFECT =====================
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "cyan";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 40);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
