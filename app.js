// Button Click Animation
document.addEventListener("click", (e) => {
  const el = e.target;

  if (
    el.tagName === "BUTTON" ||
    el.classList.contains("card") ||
    el.classList.contains("menu-card")
  ) {
    el.style.transform = "scale(1.08)";

    setTimeout(() => {
      el.style.transform = "";
    }, 150);
  }
});

// Save Token
function saveToken(token) {
  localStorage.setItem("token", token);
}

// Get Token
function getToken() {
  return localStorage.getItem("token");
}

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Check Login
function checkLogin() {
  const token = getToken();

  if (!token) {
    window.location.href = "login.html";
  }
}

// Premium Loading Effect
window.addEventListener("load", () => {
  document.body.style.opacity = "0";

  setTimeout(() => {
    document.body.style.transition = "1s";
    document.body.style.opacity = "1";
  }, 100);
});

// Show Notification
function showMessage(message) {
  const div = document.createElement("div");

  div.innerText = message;

  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.right = "20px";
  div.style.background = "#0072ff";
  div.style.color = "#fff";
  div.style.padding = "15px 20px";
  div.style.borderRadius = "15px";
  div.style.zIndex = "9999";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
    }
