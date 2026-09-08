document.addEventListener('DOMContentLoaded', () => {

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburger && navLinks && navOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== FLOATING TOP BUTTON =====
    const floatingTop = document.getElementById('floatingTop');
    if (floatingTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                floatingTop.classList.add('visible');
            } else {
                floatingTop.classList.remove('visible');
            }
        });

        floatingTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                
                // Some pages might use nextElementSibling for answer instead of parentElement containing answer
                const answer = question.nextElementSibling;
                const isActiveByParent = faqItem.classList.contains('active');
                const isActiveByQuestion = question.classList.contains('active');
                const isActive = isActiveByParent || isActiveByQuestion;

                // Close all
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
                document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));

                if (!isActive) {
                    if (faqItem.classList.contains('faq-item')) {
                        faqItem.classList.add('active');
                    }
                    question.classList.add('active');
                    if (answer && answer.classList.contains('faq-answer')) {
                        answer.classList.add('active');
                    }
                }
            });
        });
    }

    // ===== TESTIMONI CAROUSEL =====
    const track = document.getElementById('testimoniTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        let autoPlayInterval;

        const getSlidesCount = () => {
            return document.querySelectorAll('.testimoni-slide').length;
        };

        const getVisibleSlides = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };

        const updateCarousel = () => {
            const slideWidth = track.querySelector('.testimoni-slide').offsetWidth + 25; // width + gap
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const slideNext = () => {
            const maxIndex = getSlidesCount() - getVisibleSlides();
            currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            updateCarousel();
        };

        const slidePrev = () => {
            const maxIndex = getSlidesCount() - getVisibleSlides();
            currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            updateCarousel();
        };

        nextBtn.addEventListener('click', () => {
            slideNext();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            slidePrev();
            resetAutoPlay();
        });

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(slideNext, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        // Initial setup
        updateCarousel();
        startAutoPlay();

        window.addEventListener('resize', () => {
            updateCarousel();
        });
    }

    // ===== AUTO TOC GENERATION =====
    const articleBody = document.querySelector('.article-body');
    const tocList = document.getElementById('tocList');
    
    if (articleBody && tocList) {
        const headings = articleBody.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            headings.forEach((heading, index) => {
                const anchorId = 'heading-' + index;
                heading.id = anchorId;
                
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#' + anchorId;
                a.textContent = heading.textContent;
                
                if (heading.tagName.toLowerCase() === 'h3') {
                    a.classList.add('toc-h3');
                }
                
                li.appendChild(a);
                tocList.appendChild(li);
            });
        } else {
            const tocContainer = document.querySelector('.toc-container');
            if (tocContainer) tocContainer.style.display = 'none';
        }
    }

    // ===== TOC TOGGLE =====
    const tocToggleBtn = document.getElementById('tocToggleBtn');
    const tocContent = document.getElementById('tocContent');
    
    if (tocToggleBtn && tocContent) {
        const tocIcon = tocToggleBtn.querySelector('.toc-toggle');
        tocToggleBtn.addEventListener('click', () => {
            tocContent.classList.toggle('collapsed');
            if (tocIcon) tocIcon.classList.toggle('collapsed');
        });
    }

});
