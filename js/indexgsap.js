document.addEventListener('DOMContentLoaded', () => {
    // Animazioni per il testo
    const mainText = new SplitType('#mainText')
    const bodyText = new SplitType('#bodyText')
    const secText = new SplitType('#details')
    gsap.to('.char', {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.3
    })

    gsap.to('#details', {
        y: 0,
        stagger: 0.05,
        delay: 0.6,
        duration: 0.3
    })

    // Animazione per l'immagine principale
    gsap.from("#mainImage", { opacity: 0, y: 50, duration: 0.2, delay: 0.5 });

    // Animazioni per le card
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        gsap.from(card, { opacity: 0, y: 50, duration: 0.3, delay: 2.7 + (index * 0.5) });
    });
});
