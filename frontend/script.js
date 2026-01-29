const API = "http://localhost:5000/api"; // change to live URL after deployment

async function register() {
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("r-name").value,
        email: document.getElementById("r-email").value,
        password: document.getElementById("r-password").value,
        role: document.getElementById("r-role").value
      })
    });
    const data = await res.json();
    showMessage(data.message || data.error);
  } catch (err) {
    showMessage("Registration failed");
  }
}

async function login() {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("l-email").value,
        password: document.getElementById("l-password").value
      })
    });
    const data = await res.json();
    showMessage(data.message || data.error);
  } catch (err) {
    showMessage("Login failed");
  }
}

async function submitAssignment() {
  try {
    const res = await fetch(`${API}/assignments/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: document.getElementById("studentId").value,
        fileUrl: document.getElementById("fileUrl").value
      })
    });
    const data = await res.json();
    showMessage(data.message || data.error);
  } catch (err) {
    showMessage("Submission failed");
  }
}

function showMessage(text) {
  const msg = document.getElementById("msg");
  msg.innerText = text;
  msg.style.color = text.includes("failed") ? "#ff3c3c" : "#00fff7";
}
