document.addEventListener('DOMContentLoaded', () => {
    // Animazioni per il testo
    const mainText = new SplitType('#mainText')
    const pText = new SplitType('#pText')
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
    const cards = document.querySelectorAll('#card');
    cards.forEach((card, index) => {
        gsap.from(card, { opacity: 0, y: 50, duration: 0.5, delay: 2.7 + (index * 0.1) });
    });
});

// Animazioni per sidebar e contenuto in open
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    content.classList.toggle('sidebar-open');

    if (sidebar.classList.contains('open')) {
        gsap.to(sidebar, { duration: 0.3, left: 0 });
        if (window.innerWidth > 768) {
            gsap.to(content, { duration: 0.3, marginLeft: '250px' });
        }
    } else {
        gsap.to(sidebar, { duration: 0.3, left: '-250px' });
        if (window.innerWidth > 768) {
            gsap.to(content, { duration: 0.3, marginLeft: '0' });
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
        gsap.set(content, { marginLeft: 0 });
    }
});

gsap.registerPlugin(ScrollTrigger);
gsap.from("#desc1", {
    opacity: 0,
    x: -100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#desc1",
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});

gsap.from("#desc2", {
    opacity: 0,
    x: 100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#desc2",
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

gsap.from("#info4", {
    opacity: 0,
    x: 100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#info4",
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});

gsap.from("#info5", {
    opacity: 0,
    x: 100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#info5",
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});

gsap.from("#info6", {
    opacity: 0,
    x: 100,
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#info6",
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false
    }
});