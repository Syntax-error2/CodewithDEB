document.addEventListener("DOMContentLoaded", () => {
    const loadCSS = (src) => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = src; document.head.appendChild(l); };
    loadCSS('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css');

    // 1. GSAP Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (typeof gsap !== 'undefined') {
        gsap.set(cursor, {xPercent: -50, yPercent: -50});
        gsap.set(follower, {xPercent: -50, yPercent: -50});
        
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {duration: 0, x: e.clientX, y: e.clientY});
            gsap.to(follower, {duration: 0.3, x: e.clientX, y: e.clientY});
        });

        const hoverElements = document.querySelectorAll('a, .stack-item, .horizontal-scroll-container');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(follower, {duration: 0.3, scale: 2, backgroundColor: 'rgba(255,255,255,0.1)'});
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(follower, {duration: 0.3, scale: 1, backgroundColor: 'transparent'});
            });
        });

        gsap.registerPlugin(ScrollTrigger);

        const blocks = document.querySelectorAll('.exp-block, .edu-card, .cert-card');
        blocks.forEach((block) => {
            gsap.to(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    if(scrollContainer) {
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            scrollContainer.style.scrollSnapType = 'none';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
            scrollContainer.style.scrollSnapType = 'x mandatory';
        });
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
            scrollContainer.style.scrollSnapType = 'x mandatory';
        });
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }

    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const p1 = "davehermoso01";
            const p2 = "gmail.com";
            window.location.href = "mailto:" + p1 + "@" + p2;
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('dragstart', (e) => e.preventDefault());
    });

    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.2)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.boxShadow = 'none';
        });
    });
});
