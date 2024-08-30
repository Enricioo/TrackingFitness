// Animazioni per sidebar e contenuto in open
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    content.classList.toggle('sidebar-open');

    if (sidebar.classList.contains('open')) {
        gsap.to(sidebar, { duration: 0, left: 0 });
        if (window.innerWidth > 768) {
            gsap.to(content, { duration: 0, marginLeft: '250px' });
        }
    } else {
        gsap.to(sidebar, { duration: 0.1, left: '-250px' });
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