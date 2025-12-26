const role = localStorage.getItem("role");

if (!role || role !== "admin") {
  alert("Access denied");
  window.location.href = "index.html";
}

const allBookingsList = document.getElementById("allBookings");

// Load all bookings from backend
async function loadAllBookings() {
  try {
    const res = await fetch("http://localhost:3000/booking");
    const bookings = await res.json();

    allBookingsList.innerHTML = "";

    if (bookings.length === 0) {
      allBookingsList.innerHTML = "<li>No bookings yet.</li>";
      return;
    }

    bookings.forEach(b => {
      const li = document.createElement("li");
      li.innerHTML = `
      User: ${b.username},
      Service: ${b.serviceType},
      Date: ${b.date},
      Time: ${b.time}<button onclick="deleteBooking(${b.id})">Delete</button>
  `;
  allBookingsList.appendChild(li);
});

  } catch (err) {
    console.error(err);
    allBookingsList.innerHTML = "<li>Failed to load bookings.</li>";
  }
}

async function deleteBooking(id) {
  const confirmDelete = confirm("Are you sure you want to delete this booking?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:3000/booking/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      loadAllBookings(); // refresh list
    } else {
      alert("Failed to delete booking");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Initial load
loadAllBookings();