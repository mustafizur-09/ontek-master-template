"use strict";

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");

function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle("show");

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

function closeMobileMenu() {
    navMenu.classList.remove("show");
    document.body.classList.remove("menu-open");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function handleHeaderScroll() {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll("main section[id]");
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinks.forEach((link) => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

menuToggle.addEventListener("click", toggleMobileMenu);

navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("scroll", () => {
    handleHeaderScroll();
    updateActiveNavigation();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    if (!name || !email || !message) {
        formMessage.textContent =
            "Please complete all required fields.";

        formMessage.style.color = "#f04438";
        return;
    }

    formMessage.textContent =
        "Thank you! Your message has been submitted successfully.";

    formMessage.style.color = "#12b76a";

    contactForm.reset();

    setTimeout(() => {
        formMessage.textContent = "";
    }, 5000);
});

currentYear.textContent = new Date().getFullYear();

handleHeaderScroll();
updateActiveNavigation();