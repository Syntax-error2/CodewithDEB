window.addEventListener('load', () => {
    // Yield to the browser's painting thread to guarantee a lightning-fast FCP/LCP
    setTimeout(() => {
        // 1. GSAP Custom Cursor
            const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
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

    // 2. GSAP Register Plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // 3. Hero Looping 10-Second Typewriter Animation
    // Removed GSAP entrance animation; handled purely by CSS for instant FCP/LCP
    const typeTl = gsap.timeline({repeat: -1});
    // The text "John Dave Hermoso" is already in the HTML. Hold it for 8s.
    typeTl.to({}, {duration: 8.5}) // Hold for 8.5s
          .to('#typewriter', {duration: 0.5, text: "", ease: "none"}) // Erase
          .to({}, {duration: 0.5}) // Rest
          .to('#typewriter', {duration: 0.5, text: "John Dave Hermoso", ease: "none"}); // Type back

    // 4. About Text Staggered Word Reveal
    const aboutLead = document.querySelector('.about-lead');
    if(aboutLead) {
        const text = aboutLead.innerText;
        aboutLead.innerHTML = '';
        text.split(' ').forEach(word => {
            if(!word) return;
            const span = document.createElement('span');
            span.innerHTML = word + '&nbsp;'; // Using &nbsp; forces the browser to keep the space
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(15px)';
            span.className = 'about-word';
            aboutLead.appendChild(span);
        });

        ScrollTrigger.create({
            trigger: '.about',
            start: "top 80%",
            onEnter: () => {
                gsap.to('.about-word', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: 'power3.out'
                });
            }
        });
    }

    // 5. Experience & Education Blocks Reveal
    const blocks = document.querySelectorAll('.exp-block, .edu-card, .cert-card');
    blocks.forEach((block) => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 6. Horizontal Drag-to-scroll functionality
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    if(scrollContainer) {
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            scrollContainer.style.scrollSnapType = 'none'; // Disable snap while dragging
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
            const walk = (x - startX) * 2; // Scroll speed
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Email Obfuscation
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Obfuscated string concatenation to hide from bots scraping HTML
            const p1 = "davehermoso01";
            const p2 = "gmail.com";
            window.location.href = "mailto:" + p1 + "@" + p2;
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // 7. Interactive 3D Tilt Effect on Cards (New Premium Effect)
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.2)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = 'none';
        });
    });
    }, 100);
});
