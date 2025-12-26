// Toggle forms
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginBtn.addEventListener("click", () => {
  loginForm.style.display = "block";
  signupForm.style.display = "none";
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");
});

signupBtn.addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
  loginBtn.classList.remove("active");
  signupBtn.classList.add("active");
});

// ----------------------
// LOGIN FORM
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const roleLower = role.toLowerCase();

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: roleLower }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("username", username);
      localStorage.setItem("role", role.toLowerCase());
      loginMessage.textContent = "";
      window.location.href = role === "user" ? "user.html" : "admin.html";
    } else {
      loginMessage.textContent = data.message;
      loginMessage.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    loginMessage.textContent = "⚠️ Server error, try again later";
    loginMessage.style.color = "red";
  }
});

// ----------------------
// SIGNUP FORM
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  const role = document.getElementById("newRole").value;

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: role.toLowerCase() })
    });

    const data = await res.json();

    if (res.ok) {
      signupMessage.textContent = "✅ " + data.message;
      signupMessage.style.color = "green";
      signupForm.reset();
      // Switch back to login
      loginBtn.click();
    } else {
      signupMessage.textContent = "❌ " + data.message;
      signupMessage.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    signupMessage.textContent = "⚠️ Server error, try again later";
    signupMessage.style.color = "red";
  }
});