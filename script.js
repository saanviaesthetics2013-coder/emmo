function showMessage() {
  alert("⚡ Tool Activated! Welcome to Saanvi's Cyber Hub ⚡");
}function checkPassword() {
  let password = document.getElementById("passwordInput").value;
  let result = document.getElementById("result");

  if (password.length === 0) {
    result.innerHTML = "⚠️ Please enter a password!";
    result.style.color = "orange";
    return;
  }

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  if (strength <= 1) {
    result.innerHTML = "❌ Weak Password";
    result.style.color = "red";
  } 
  else if (strength === 2 || strength === 3) {
    result.innerHTML = "⚠️ Medium Password";
    result.style.color = "yellow";
  } 
  else {
    result.innerHTML = "✅ Strong Password";
    result.style.color = "#00ff99";
  }
}
