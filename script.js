/* ==========================
   DARK MODE
========================== */

const themeBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = "🌙";
    }

});


/* ==========================
   TYPING EFFECT
========================== */

const roles = [
    "AI & ML Student",
    "Web Developer",
    "Willing Freelancer - Open To Work!",
    "Problem Solver",
    "Hackathon Enthusiast"
];

const typing = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const current = roles[roleIndex];

    if (!deleting) {

        typing.textContent =
            current.substring(0, charIndex);

        charIndex++;

        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typing.textContent =
            current.substring(0, charIndex);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex =
                (roleIndex + 1) % roles.length;
        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

const audio = document.getElementById("introAudio");
const audioBtn = document.getElementById("audioBtn");
const profile = document.getElementById("profileWrapper");

if (audio && audioBtn) {

    const icon = audioBtn.querySelector("i");

    let isPlaying = false;

    function updateUI(state) {
        isPlaying = state;

        if (icon) {
            icon.classList.toggle("fa-play", !state);
            icon.classList.toggle("fa-pause", state);
        }

        audioBtn.classList.toggle("playing", state);

        if (profile) {
            profile.classList.toggle("playing", state);
        }
    }

    async function toggleAudio() {
        try {

            if (!audio) return;

            if (audio.paused) {
                const playPromise = audio.play();

                if (playPromise !== undefined) {
                    await playPromise;
                }

                updateUI(true);

            } else {
                audio.pause();
                updateUI(false);
            }

        } catch (err) {
            console.log("Audio blocked or failed:", err);

            // FORCE UI RESET on mobile failure
            updateUI(false);
        }
    }

    audioBtn.addEventListener("click", toggleAudio);

    // IMPORTANT: sync states properly
    audio.addEventListener("play", () => updateUI(true));
    audio.addEventListener("pause", () => updateUI(false));
    audio.addEventListener("ended", () => updateUI(false));

    // MOBILE SAFETY: unlock audio on first interaction
    document.addEventListener("touchstart", function unlock() {
        if (audio) {
            audio.play().then(() => {
                audio.pause();
            }).catch(() => {});
        }
        document.removeEventListener("touchstart", unlock);
    }, { once: true });
}

/* ==========================
   SCROLL REVEAL
========================== */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    },

    {
        threshold: 0.15
    }

);

document.querySelectorAll(".reveal")
.forEach(el => observer.observe(el));


/* ==========================
   PARTICLES
========================== */

const particleContainer =
    document.getElementById("particles");

if (particleContainer) {

    for (let i = 0; i < 60; i++) {

        const particle =
            document.createElement("span");

        const size =
            Math.random() * 6 + 2;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (Math.random() * 15 + 10) + "s";

        particle.style.animationDelay =
            (Math.random() * 10) + "s";

        particleContainer.appendChild(particle);
    }

}


/* ==========================
   ACTIVE NAVIGATION
========================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        if (window.pageYOffset >= sectionTop - 150) {

            current =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + current
        ) {
            link.classList.add("active");
        }

    });

});


/* ==========================
   PROFILE PARALLAX
========================== */

const heroImage =
    document.querySelector(".profile-img");

if (heroImage) {

    document.addEventListener(
        "mousemove",
        (e) => {

            const x =
                (window.innerWidth / 2 - e.pageX) / 40;

            const y =
                (window.innerHeight / 2 - e.pageY) / 40;

            heroImage.style.translate =
                `${x}px ${y}px`;

        }
    );

}


/* ==========================
   COUNTER ANIMATION
========================== */

const counters =
    document.querySelectorAll(".stat-card h2");

let started = false;

window.addEventListener("scroll", () => {

    const stats =
        document.querySelector(".stats");

    if (!stats || started) return;

    const top =
        stats.getBoundingClientRect().top;

    if (top < window.innerHeight) {

        started = true;

        counters.forEach(counter => {

            const target =
                parseFloat(counter.innerText);

            let count = 0;

            const speed =
                target / 50;

            function update() {

                count += speed;

                if (count < target) {

                    counter.innerText =
                        Number.isInteger(target)
                        ? Math.floor(count)
                        : count.toFixed(1);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target;

                }

            }

            update();

        });

    }

});


/* ==========================
   MOBILE MENU
========================== */

const menuBtn =
    document.querySelector(".menu-btn");

const nav =
    document.querySelector(".nav-links");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("show");

    });

}
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("show");

    });

});

/* ==========================
   SKILL FILTER
========================== */

document.addEventListener("DOMContentLoaded", () => {

    const buttons =
        document.querySelectorAll(".filter-btn");

    const cards =
        document.querySelectorAll(".skill-card");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            cards.forEach(card => {

                if (
                    filter === "all" ||
                    card.classList.contains(filter)
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

});


/* ==========================
   PROJECT CARD FLIP
========================== */

document.querySelectorAll(".project-card")
.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});


/* ==========================
   CERTIFICATE POPUP
========================== */

function openCert(el) {

    const popup =
        document.getElementById("certPopup");

    const img =
        document.getElementById("popupImg");

    img.src =
        el.querySelector("img").src;

    popup.style.display = "flex";

    document.body.style.overflow = "hidden";
}

function closeCert() {

    document.getElementById("certPopup")
    .style.display = "none";

    document.body.style.overflow = "auto";
}


/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ==========================
   CURSOR GLOW
========================== */

const glow =
    document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove", e => {

    glow.style.left =
        e.clientX + "px";

    glow.style.top =
        e.clientY + "px";

});

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const subject =
            document.getElementById("subject").value;

        const message =
            document.getElementById("message").value;

        const whatsappMessage =
`Hello Sreevalli,

Name: ${name}
Email: ${email}

Subject: ${subject}

Message:
${message}`;

        /* WhatsApp */

        window.open(
            `https://wa.me/917093640638?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
        );

        /* Email */

        setTimeout(() => {

            window.location.href =
            `mailto:sreevalligodiganuru08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(whatsappMessage)}`;

        }, 1000);

        contactForm.reset();

    });

}
