//mobile toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


d

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("69irakWr88PqvjNWm"); // Replace with your EmailJS Public Key

  document.querySelector(".contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Send email
    emailjs.send("service_l325zki", "template_hfaxrwn", {
      from_name: name,
      from_email: email,
      message: message
    })
    .then(response => {
      alert("✅ Message Sent Successfully!");
      document.querySelector(".contact-form").reset(); // Reset form fields
    })
    .catch(error => {
      alert("❌ Failed to Send Message. Try Again.");
      console.error("EmailJS Error:", error);
    });
  });
});
