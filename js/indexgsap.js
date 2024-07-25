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

gsap.registerPlugin(ScrollTrigger);
gsap.from("#details", {
    opacity: 0,
    x: -100, // Imposta la posizione iniziale a sinistra
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#details",
        start: "top 80%", 
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: true
    }
});

gsap.from("#info", {
    opacity: 0,
    x: -100, // Imposta la posizione iniziale a sinistra
    delay: .1,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#info",
        start: "top 80%", 
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: true
    }
});