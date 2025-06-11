// Novutus Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCountdown();
    initStickyBar();
    initTestimonialCarousel();
    initAccordion();
    initExitIntent();
    initLiveCounters();
    initFormHandling();
    initSmoothScrolling();
});

// Countdown Timer Functionality
function initCountdown() {
    const targetDate = new Date('2025-06-14T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // If countdown is over, show "Enrollment Closed"
            const countdownElements = document.querySelectorAll('[id*="countdown"]');
            countdownElements.forEach(el => {
                el.textContent = 'Enrollment Closed';
            });
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update all countdown displays
        const countdownText = `${days} days, ${hours} hours, ${minutes} minutes`;
        const countdownElements = document.querySelectorAll('#countdown-timer, #hero-countdown, #final-countdown');
        countdownElements.forEach(el => {
            el.textContent = countdownText;
        });
        
        // Update detailed countdown in scarcity section
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Sticky CTA Bar
function initStickyBar() {
    const stickyBar = document.getElementById('sticky-cta');
    const hero = document.querySelector('.hero');
    
    function toggleStickyBar() {
        if (!hero || !stickyBar) return;
        
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > heroBottom) {
            stickyBar.classList.add('show');
        } else {
            stickyBar.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleStickyBar);
    toggleStickyBar(); // Initial check
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentSlide = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // Pause autoplay on hover
    const carousel = document.getElementById('testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }
    
    // Start autoplay
    startAutoplay();
}

// Accordion Functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Exit Intent Popup
function initExitIntent() {
    const popup = document.getElementById('exit-popup');
    const closeBtn = document.getElementById('close-popup');
    const popupForm = document.getElementById('popup-form');
    let hasShownPopup = false;
    
    function showPopup() {
        if (!hasShownPopup && popup) {
            popup.classList.add('show');
            hasShownPopup = true;
        }
    }
    
    function hidePopup() {
        if (popup) {
            popup.classList.remove('show');
        }
    }
    
    // Track mouse movement for exit intent
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) {
            showPopup();
        }
    });
    
    // Close popup events
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePopup);
    }
    
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                hidePopup();
            }
        });
    }
    
    // Handle popup form submission
    if (popupForm) {
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('popup-email').value;
            
            if (email) {
                alert('Thank you! Your free guide will be sent to your email shortly.');
                hidePopup();
            }
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hidePopup();
        }
    });
}

// Live Counters Animation
function initLiveCounters() {
    const viewersElement = document.getElementById('current-viewers');
    const spotsElements = document.querySelectorAll('[id*="spots"]');
    
    let currentViewers = 127;
    let spotsRemaining = 47;
    
    // Animate viewer count
    function updateViewers() {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        currentViewers = Math.max(120, Math.min(150, currentViewers + change));
        
        if (viewersElement) {
            viewersElement.textContent = currentViewers;
        }
    }
    
    // Occasionally decrease spots (simulate real enrollment)
    function updateSpots() {
        if (Math.random() < 0.1 && spotsRemaining > 0) { // 10% chance every interval
            spotsRemaining -= 1;
            
            spotsElements.forEach(el => {
                if (el.id.includes('spots')) {
                    el.textContent = spotsRemaining;
                }
            });
        }
    }
    
    // Update counters every 10 seconds
    setInterval(() => {
        updateViewers();
        updateSpots();
    }, 10000);
}

// Form Handling with proper redirect
function initFormHandling() {
    const enrollmentForm = document.getElementById('enrollment-form');
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(enrollmentForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                university: formData.get('university'),
                major: formData.get('major'),
                graduation: formData.get('graduation')
            };
            
            // Validate form
            if (!data.name || !data.email || !data.phone || !data.university || !data.major || !data.graduation) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show processing state
            const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission and redirect to success page
            setTimeout(() => {
                // Redirect to enrollment success page
                window.open('https://novutus.com/enrollment-success', '_blank');
            }, 2000);
        });
    }
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.stat-card, .guarantee-card, .method-phase, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedStickyBar = debounce(function() {
    const stickyBar = document.getElementById('sticky-cta');
    const hero = document.querySelector('.hero');
    
    if (hero && stickyBar) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > heroBottom) {
            stickyBar.classList.add('show');
        } else {
            stickyBar.classList.remove('show');
        }
    }
}, 10);

window.addEventListener('scroll', debouncedStickyBar);

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle form validation in real-time
function initRealTimeValidation() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state when user starts typing
            this.classList.remove('error');
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
        }
    }
    
    // Add visual feedback
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
    }
    
    return isValid;
}

// Initialize real-time validation
document.addEventListener('DOMContentLoaded', () => {
    initRealTimeValidation();
});

// Add CSS for validation states and animations
const additionalStyles = `
.form-control.error {
    border-color: #FFA500;
    box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.2);
}

.form-control.valid {
    border-color: #FFD700;
}

.animate-in {
    animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.loaded {
    overflow-x: hidden;
}

/* Add yellow glow effects for better visual appeal */
.btn--primary:focus {
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.4);
}

.company:hover {
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

/* Add subtle yellow animations */
@keyframes yellowPulse {
    0%, 100% {
        box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
    }
}

.guarantee-card:hover {
    animation: yellowPulse 2s infinite;
}

/* Add loading animation for buttons */
.btn--primary:disabled {
    background: #cccccc;
    cursor: not-allowed;
    animation: none;
}

/* Yellow highlight animations for statistics */
.stat-card:hover .stat-icon {
    color: #FFD700;
    transform: scale(1.1);
    transition: all 0.3s ease;
}

/* Smooth transitions for all interactive elements */
* {
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

/* Yellow accent for form focus states */
.form-control:focus {
    border-color: #FFD700;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
}

/* Special yellow highlighting for testimonial salary figures */
.student-details {
    position: relative;
}

.student-details::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FFD700, #FFA500);
    border-radius: 1px;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Track user engagement
function trackEngagement() {
    let timeOnPage = 0;
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    let engagementEvents = [];
    
    setInterval(() => {
        timeOnPage += 1;
        
        // Calculate scroll depth
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        scrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
        maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
        
        // Log engagement milestones
        if (timeOnPage === 30 && !engagementEvents.includes('30sec')) {
            console.log('User engagement: 30 seconds on page');
            engagementEvents.push('30sec');
        }
        
        if (maxScrollDepth >= 50 && !engagementEvents.includes('scroll50')) {
            console.log('User engagement: Scrolled 50% of page');
            engagementEvents.push('scroll50');
        }
        
        if (maxScrollDepth >= 75 && !engagementEvents.includes('scroll75')) {
            console.log('User engagement: Scrolled 75% of page');
            engagementEvents.push('scroll75');
        }
    }, 1000);
}

// Enhanced click tracking for CTA buttons
function trackCTAClicks() {
    document.querySelectorAll('.btn--primary').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            console.log(`CTA Click: "${buttonText}" in section: ${section}`);
            
            // Add visual feedback for user
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Start enhanced tracking
document.addEventListener('DOMContentLoaded', () => {
    trackEngagement();
    trackCTAClicks();
});