const role = localStorage.getItem("role");

if (!role || role !== "user") {
  alert("Access denied");
  window.location.href = "index.html";
}

const bookingForm = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");
const message = document.getElementById("bookingMessage");
const navUsername = document.getElementById("navUsername");
const username = localStorage.getItem("username");

if (!username) {
  alert("Session expired. Please login again.");
  window.location.href = "index.html";
}

if (navUsername && username) {
  navUsername.textContent = username;
}

// Submit new booking
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const serviceType = document.getElementById("serviceType").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

    // 🔒 Frontend date & time validation
  if (!date || !time) {
    message.textContent = "❌ Please select date and time";
    message.style.color = "red";
    return;
  }

  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  if (isNaN(selectedDateTime.getTime())) {
    message.textContent = "❌ Invalid date or time format";
    message.style.color = "red";
    return;
  }

  if (selectedDateTime < now) {
    message.textContent = "❌ Cannot book past time";
    message.style.color = "red";
    return;
  }

  const bookingData = {
    username,         // associate booking with logged-in user
    serviceType,
    date,
    time
  };

  if (!bookingData.date || !bookingData.time) {
  message.textContent = "❌ Please fill all fields";
  return;
}

  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    const data = await res.json();

    if (res.ok) {
        message.textContent = "✅ Booking successful!";
        message.style.color = "green";
        bookingForm.reset();
    } else {
        message.textContent = data.message || "❌ Booking failed";
        message.style.color = "red";
    }
  } catch (err) {
    console.error(err);
     message.textContent = "⚠️ Server error. Please try again later.";
     message.style.color = "red";
  }
});

// Load all bookings for this user
async function loadBookings() {
  try {
    const res = await fetch("/api/booking");
    const bookings = await res.json();

    // filter only current user's bookings
    const userBookings = bookings.filter(b => b.username === username);

    bookingList.innerHTML = "";

    if (userBookings.length === 0) {
      bookingList.innerHTML = "<li>No bookings yet.</li>";
      return;
    }

    userBookings.forEach(b => {
      const li = document.createElement("li");
      li.textContent = `${b.serviceType} on ${b.date} at ${b.time}`;
      bookingList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    bookingList.innerHTML = "<li>Failed to load bookings.</li>";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Initial load
loadBookings();