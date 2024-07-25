document.addEventListener('DOMContentLoaded', () => {
    // Animazioni per il testo
    const mainText = new SplitType('#mainText')
    const bodyText = new SplitType('#bodyText')
    gsap.to('.char', {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.3
    })

    // Animazione per l'immagine principale
    gsap.from("#mainImage", { opacity: 0, y: 50, duration: 0.2, delay: 0.5 });

    // Animazioni per le card
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        gsap.from(card, { opacity: 0, y: 50, duration: 0.5, delay: 2.7 + (index * 0.1) });
    });
});

document.getElementById('menuToggle').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.overlay');
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
});

document.querySelector('.overlay').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.overlay');
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
});

gsap.registerPlugin(ScrollTrigger);
gsap.from("#details", {
    opacity: 0,
    x: -100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#details",
        start: "top 90%", 
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});

gsap.from("#info1", {
    opacity: 0,
    x: -100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#info1",
        start: "top 95%", 
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});

gsap.from("#info2", {
    opacity: 0,
    x: -100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#info2",
        start: "top 95%", 
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});

gsap.from("#info3", {
    opacity: 0,
    x: -100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#info3",
        start: "top 95%", 
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});