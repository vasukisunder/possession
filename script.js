// ========================================
// VIDEO AUTOPLAY HANDLER
// ========================================

(function() {
    function initVideo() {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) return;
        
        // Ensure video is muted (required for autoplay)
        heroVideo.muted = true;
        heroVideo.volume = 0;
        
        // Try to play when video is ready
        const tryPlay = function() {
            if (heroVideo.readyState === 0) return;
            
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    // Autoplay was prevented, try on user interaction
                    const playOnInteraction = function() {
                        if (heroVideo.readyState < 2) {
                            heroVideo.load();
                            heroVideo.addEventListener('canplay', function() {
                                heroVideo.play().catch(console.error);
                            }, { once: true });
                        } else {
                            heroVideo.play().catch(console.error);
                        }
                        document.removeEventListener('click', playOnInteraction);
                        document.removeEventListener('scroll', playOnInteraction);
                        document.removeEventListener('touchstart', playOnInteraction);
                        document.removeEventListener('keydown', playOnInteraction);
                        document.removeEventListener('mousemove', playOnInteraction);
                    };
                    
                    document.addEventListener('click', playOnInteraction, { once: true });
                    document.addEventListener('scroll', playOnInteraction, { once: true });
                    document.addEventListener('touchstart', playOnInteraction, { once: true });
                    document.addEventListener('keydown', playOnInteraction, { once: true });
                    document.addEventListener('mousemove', playOnInteraction, { once: true });
                });
            }
        };
        
        // Wait for video to load
        if (heroVideo.readyState >= 2) {
            tryPlay();
        } else {
            heroVideo.addEventListener('canplay', tryPlay, { once: true });
            heroVideo.addEventListener('canplaythrough', tryPlay, { once: true });
            heroVideo.load();
        }
        
        window.addEventListener('load', function() {
            setTimeout(tryPlay, 200);
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideo);
    } else {
        initVideo();
    }
})();

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================

const nav = document.getElementById('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolled past hero
    if (scrollTop > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ========================================
// SMOOTH SCROLL ENHANCEMENT
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NEWSLETTER FORM HANDLING
// ========================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Simulate form submission
        const submitButton = newsletterForm.querySelector('button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = 'Subscribed ✓';
            submitButton.style.backgroundColor = '#2a8a4a';
            emailInput.value = '';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
document.querySelectorAll('.release-card, .principle, .about-content, .mission-content').forEach(el => {
    observer.observe(el);
});

// ========================================
// VINYL HOVER EFFECT
// ========================================

const vinylMockups = document.querySelectorAll('.vinyl-mockup');

vinylMockups.forEach(mockup => {
    const disc = mockup.querySelector('.vinyl-disc');
    
    if (disc) {
        // Animation is always running via CSS, no need to control play state
        
        // Add 3D tilt effect
        mockup.addEventListener('mousemove', (e) => {
            const rect = mockup.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            mockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        mockup.addEventListener('mouseleave', () => {
            mockup.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
});

// ========================================
// RELEASE CARD INTERACTIONS
// ========================================

// Release descriptions data
const releaseDescriptions = {
    'Alien': 'A masterclass in tension and atmosphere. Jerry Goldsmith crafts an otherworldly soundscape where every note feels like a breath held too long. The score weaves together orchestral dread and electronic unease, creating something that feels both ancient and alien. This pressing captures every nuance from the original analog masters.',
    'Vertigo': 'Bernard Herrmann\'s "Scene d\'Amour" alone would secure this soundtrack\'s legendary status. But the entire score—from its spiraling main theme to the aching romanticism—remains one of cinema\'s most psychologically complex works. Strings cascade and recede like waves of obsession. Remastered with meticulous care from the original studio tapes.',
    'The Lighthouse': 'Mark Korven channels maritime madness through foghorn drones and distressed strings. The score feels like it\'s been weathered by salt and isolation, creating an atmosphere so thick you can almost taste it. Period-appropriate instrumentation meets modern composition techniques. Pressed on fog-gray translucent vinyl that perfectly matches the film\'s aesthetic.',
    'Annihilation': 'What begins as electronic textures slowly morphs into something unrecognizable. Ben Salisbury and Geoff Barrow create a score that mirrors the film\'s themes of transformation and cosmic horror. Choral arrangements drift over acoustic instruments, building toward moments of sublime beauty and overwhelming dread. This phosphorescent green vinyl edition glows in the dark.',
    'Ex Machina': 'Sparse. Precise. Haunting. The minimalist approach here is deliberate—every note serves the film\'s exploration of consciousness and artificiality. Delicate piano melodies contrast with subtle synth textures, creating space for contemplation. Silver vinyl pressing reflects the film\'s sleek, clinical aesthetic.',
    'Solaris': 'Eduard Artemyev pioneers electronic music in cinema, blending synthesizers with Bach organ pieces. The result is meditative, cosmic, and deeply emotional. This isn\'t background music—it\'s a philosophical statement in sound. Newly remastered from the original Soviet masters, preserving the score\'s otherworldly quality.',
    'The Birds': 'Oscar Frizzell makes history with the first entirely electronic score for a major Hollywood film. The Mixtur-Trautonium creates unsettling bird sounds that feel both natural and unnatural. No traditional melodies—just atmospheric tension that builds relentlessly. Pressed on classic black vinyl.',
    'Rosemary\'s Baby': 'That lullaby. Krzysztof Komeda\'s "La La La" theme is instantly recognizable—deceptively simple, deeply unsettling. The score balances innocence with dread, using haunting vocals and eerie strings to create an atmosphere of mounting paranoia. Remastered from the original analog masters, capturing every whisper and scream.'
};

const releaseCards = document.querySelectorAll('.release-card');

releaseCards.forEach(card => {
    // Click handler - open modal
    card.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(card);
    });
    
    // Add subtle parallax effect on mouse move
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 30;
        const moveY = (y - centerY) / 30;
        
        const image = card.querySelector('.release-image');
        if (image) {
            image.style.transform = `scale(1.08) translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.release-image');
        if (image) {
            image.style.transform = 'scale(1) translate(0, 0)';
        }
    });
});

// ========================================
// MODAL FUNCTIONALITY
// ========================================

const modal = document.getElementById('releaseModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDirector = document.getElementById('modalDirector');
const modalLabel = document.getElementById('modalLabel');
const modalDescription = document.getElementById('modalDescription');
const modalFormat = document.getElementById('modalFormat');
const modalEdition = document.getElementById('modalEdition');
const modalPrice = document.getElementById('modalPrice');
const modalVinylSleeve = document.getElementById('modalVinylSleeve');
const modalButton = document.getElementById('modalButton');

function openModal(card) {
    // Extract data from card
    const title = card.querySelector('.release-title').textContent;
    const meta = card.querySelector('.release-meta').textContent;
    const price = card.querySelector('.release-price').textContent;
    const statusElement = card.querySelector('.release-status');
    const status = statusElement ? statusElement.textContent : 'Available Now';
    const imageElement = card.querySelector('.release-image');
    const imageStyle = imageElement ? window.getComputedStyle(imageElement).backgroundImage : '';
    
    // Extract director and year from meta
    const [director, year] = meta.split(', ');
    
    // Get description
    const description = releaseDescriptions[title] || 'A premium vinyl release from Possession Records. Newly remastered from the original analog masters with carefully crafted artwork and packaging.';
    
    // Determine label based on status
    let labelText = 'Available Now';
    let editionText = 'Limited Edition';
    
    if (status.includes('Sold Out')) {
        labelText = 'Sold Out';
        editionText = 'Limited Edition';
    } else if (status.includes('Pre-Order')) {
        labelText = 'Pre-Order — Limited Edition';
        editionText = 'Limited Edition';
    } else {
        labelText = 'Now Available — Limited Edition of 500';
        editionText = 'Limited to 500';
    }
    
    // Populate modal
    modalTitle.textContent = title;
    modalDirector.textContent = meta;
    modalLabel.textContent = labelText;
    modalDescription.textContent = description;
    modalFormat.textContent = 'Double LP, 180g';
    modalEdition.textContent = editionText;
    modalPrice.textContent = price;
    
    // Set vinyl sleeve background
    if (imageStyle) {
        modalVinylSleeve.style.background = `linear-gradient(135deg, rgba(12, 18, 30, 0.4) 0%, rgba(8, 12, 20, 0.6) 100%), ${imageStyle}`;
        modalVinylSleeve.style.backgroundSize = 'cover';
        modalVinylSleeve.style.backgroundPosition = 'center';
    }
    
    // Update button text based on status
    if (status.includes('Sold Out')) {
        modalButton.textContent = 'Sold Out';
        modalButton.classList.add('disabled');
        modalButton.style.pointerEvents = 'none';
        modalButton.style.opacity = '0.5';
    } else {
        modalButton.textContent = 'Add to Collection';
        modalButton.classList.remove('disabled');
        modalButton.style.pointerEvents = '';
        modalButton.style.opacity = '';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal handlers
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
});

// ========================================
// CUSTOM CURSOR EFFECT (OPTIONAL)
// ========================================

const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .release-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
};

// Uncomment to enable custom cursor (optional, works best on desktop)
// if (window.innerWidth > 1024) {
//     createCursorEffect();
// }

// ========================================
// PRELOAD IMAGES (IF ADDING REAL IMAGES)
// ========================================

const preloadImages = (imageUrls) => {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

// Example usage (add your actual image URLs here):
// preloadImages([
//     '/images/release-1.jpg',
//     '/images/release-2.jpg',
//     // ... more images
// ]);

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Log page load performance
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add keyboard navigation for release cards
releaseCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Focus management for mobile menu
if (navToggle) {
    navToggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

// ========================================
// SCROLL REVEAL FOR STATS
// ========================================

const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isNumeric = /^\d+/.test(finalValue);
                
                if (isNumeric) {
                    const number = parseInt(finalValue.replace(/\D/g, ''));
                    const duration = 2000;
                    const increment = number / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < number) {
                            target.textContent = Math.floor(current) + (finalValue.includes('K') ? 'K+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = finalValue;
                        }
                    };
                    
                    updateCounter();
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
};

animateStats();

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    // Remove loading class after animations
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// ========================================
// CONSOLE BRANDING (EASTER EGG)
// ========================================

console.log('%c🌙 POSSESSION RECORDS', 'font-size: 24px; font-weight: bold; color: #a0b8d4;');
console.log('%cEvery release honors the original vision. Every detail worth your devotion.', 'font-size: 14px; color: #9ba8b8; font-style: italic;');
console.log('%cInterested in working with us? Email: careers@possessionrecords.com', 'font-size: 12px; color: #666;');

