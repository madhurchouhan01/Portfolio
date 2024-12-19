let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a')
let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

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
    reset: true,
    distance: '15px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.left', {origin: 'left'})
ScrollReveal().reveal('.right', {origin: 'right'})
ScrollReveal().reveal('.top', {origin: 'top'})
ScrollReveal().reveal('.bottom', {origin: 'bottom'})
ScrollReveal().reveal('.skills', {origin: 'top'})

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

