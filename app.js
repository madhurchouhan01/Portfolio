let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a')
let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !navbar.contains(event.target)) {
        navbar.classList.remove('active')
        menuIcon.classList.remove('bx-x')
    }
})

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY
        let offset = sec.offsetTop - 100
        let height = sec.offsetHeight
        let id = sec.getAttribute('id')

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })

    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')
}

ScrollReveal({
    reset: false,
    distance: '15px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.left', {origin: 'left'})
ScrollReveal().reveal('.right', {origin: 'right'})
ScrollReveal().reveal('.top', {origin: 'top'})
ScrollReveal().reveal('.bottom', {origin: 'bottom'})


const typed = new Typed('.multiple-text', {
    strings: ['a Data Scientist','an AI Engineer', 'an ML Engineer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".img-icon li");
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the "visible" class with a delay
                const index = Array.from(icons).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100); // Delay based on the index
            }
        });
    }, observerOptions);

    icons.forEach((icon) => observer.observe(icon));
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check localStorage for user preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = '🌞';
}

// Toggle function
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleButton.textContent = '🌞';
    } else {
        localStorage.setItem('theme', 'light');
        toggleButton.textContent = '🌛';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("qXyoPFNfHn9US_4Kn"); 

    const form = document.forms['submit-to-emailjs'];
    const msg = document.getElementById("msg");

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const templateParams = {
        from_name: formData.get("Name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("Message"),
    };

    console.log("Sending email with data:", templateParams);

    emailjs.send("service_jazapo7", "template_511tmas", templateParams)
        .then(function (response) {
        console.log("Email sent successfully", response);
        msg.style.color = "green";
        msg.innerHTML = "Message sent successfully! 😊";
        form.reset();
        setTimeout(() => (msg.innerHTML = ""), 5000);
        })
        .catch(function (error) {
        console.error("Email failed to send", error);
        msg.style.color = "red";
        msg.innerHTML = "Error sending message. Try again later.";
        });
    });
});

// fun fact 💡

const bulb = document.getElementById("bulb");
const message = document.getElementById("groq-message"); 

const API_ENDPOINT = "https://portfolio-backend-cg49.onrender.com/funfact"; // or Render URL
bulb.addEventListener("click", async () => {
    message.textContent = "💡 Generating a fun fact...";
  message.classList.add("show");

  try {
      const response = await fetch(API_ENDPOINT, { method: "POST" });
      const data = await response.json();
      console.log(data)
      message.textContent = "💡 " + data.choices[0].message.content.trim();
    } catch (err) {
        message.textContent = "❌ Error fetching fact!";
        console.error(err);
    }
});

document.addEventListener("click", function (event) {
  const bulb = document.getElementById("bulb");
  const message = document.getElementById("groq-message");

  // If the click is outside the bulb and message
  if (!bulb.contains(event.target) && !message.contains(event.target)) {
    message.classList.remove("show");
  }
});
