// Portfolio Website JavaScript
// Handles navigation, animations, form validation, and theme toggling

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeThemeToggle();
    initializeSmoothScrolling();
    initializeInteractiveEffects();

    // Show initial fade-in elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in');
        heroElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-primary').trim() === '#ffffff'
                ? 'rgba(255, 255, 255, 0.98)'
                : 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-primary').trim() === '#ffffff'
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(15, 23, 42, 0.95)';
        }
    });

    // Highlight active navigation link
    window.addEventListener('scroll', highlightActiveNavLink);
}

// Highlight the active navigation link based on scroll position
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = 'var(--primary-color)';
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation for skill items
                if (entry.target.classList.contains('skill-item')) {
                    const skillItems = document.querySelectorAll('.skill-item');
                    const index = Array.from(skillItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                // Add staggered animation for contact items
                if (entry.target.classList.contains('contact-item')) {
                    const contactItems = document.querySelectorAll('.contact-item');
                    const index = Array.from(contactItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animationElements.forEach(element => {
        observer.observe(element);
    });

    // Initialize parallax effects
    initializeParallaxEffects();
}

// Parallax scroll effects
function initializeParallaxEffects() {
    const parallaxElements = {
        slow: document.querySelectorAll('.parallax-slow'),
        medium: document.querySelectorAll('.parallax-medium'),
        fast: document.querySelectorAll('.parallax-fast')
    };

    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Slow parallax elements
        parallaxElements.slow.forEach(element => {
            const yPos = -(scrolled * 0.05);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Medium parallax elements
        parallaxElements.medium.forEach(element => {
            const yPos = -(scrolled * 0.1);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Fast parallax elements
        parallaxElements.fast.forEach(element => {
            const yPos = -(scrolled * 0.15);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };

    // Use requestAnimationFrame for smooth parallax
    let ticking = false;
    const updateParallax = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', updateParallax);
}

// Interactive effects and animations
function initializeInteractiveEffects() {
    // Mouse cursor trail effect for hero section
    const hero = document.querySelector('.hero');
    let mouseTrail = [];

    hero.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            left: ${e.clientX}px;
            top: ${e.clientY + window.scrollY}px;
            animation: trailFade 1s ease-out forwards;
        `;

        hero.appendChild(trail);
        mouseTrail.push(trail);

        // Remove old trails
        if (mouseTrail.length > 10) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }

        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    });

    // Add CSS for trail animation
    if (!document.getElementById('trail-styles')) {
        const style = document.createElement('style');
        style.id = 'trail-styles';
        style.textContent = `
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(0.98)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });

    // Typing animation for hero text
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';

        setTimeout(() => {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    heroTitle.innerHTML += originalText.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 80);
        }, 1000);
    }

    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 1002;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Interactive skill items rotation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Project card tilt effect
    // const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}



// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formMessage = document.getElementById('formMessage');

    // Real-time validation
    nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError'));
    emailInput.addEventListener('blur', () => validateField(emailInput, 'emailError'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'messageError'));

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateField(nameInput, 'nameError');
        const isEmailValid = validateField(emailInput, 'emailError');
        const isMessageValid = validateField(messageInput, 'messageError');

        if (isNameValid && isEmailValid && isMessageValid) {
            submitForm();
        } else {
            showFormMessage('Please correct the errors above.', 'error');
        }
    });

    function validateField(field, errorElementId) {
        const errorElement = document.getElementById(errorElementId);
        const fieldGroup = field.closest('.form-group');
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        fieldGroup.classList.remove('error');
        errorElement.textContent = '';

        // Validation rules
        if (field.type === 'text' && field.id === 'name') {
            if (!field.value.trim()) {
                errorMessage = 'Name is required.';
                isValid = false;
            } else if (field.value.trim().length < 2) {
                errorMessage = 'Name must be at least 2 characters long.';
                isValid = false;
            } else if (!/^[a-zA-Z\s'-]+$/.test(field.value.trim())) {
                errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
                isValid = false;
            }
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                errorMessage = 'Email is required.';
                isValid = false;
            } else if (!emailRegex.test(field.value.trim())) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            }
        } else if (field.tagName === 'TEXTAREA') {
            if (!field.value.trim()) {
                errorMessage = 'Message is required.';
                isValid = false;
            } else if (field.value.trim().length < 10) {
                errorMessage = 'Message must be at least 10 characters long.';
                isValid = false;
            } else if (field.value.trim().length > 1000) {
                errorMessage = 'Message must be less than 1000 characters.';
                isValid = false;
            }
        }

        if (!isValid) {
            fieldGroup.classList.add('error');
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    function submitForm() {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);

        const mailtoLink = `mailto:maniselvam2023@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;

        setTimeout(() => {
            document.querySelector("form").style.display = "none";
            document.getElementById("thankyou").style.display = "block";
        }, 1000);
    }


    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Smooth scroll to message
        setTimeout(() => {
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    function hideFormMessage() {
        formMessage.style.display = 'none';
    }
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or default to system preference
    const currentTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle theme
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add smooth transition effect
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Utility functions
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    highlightActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Tab navigation for theme toggle
    if (e.key === 'Tab' && e.target.id === 'themeToggle') {
        e.target.style.outline = '2px solid var(--primary-color)';
    }
});

// Remove focus outline when clicking
document.addEventListener('click', function (e) {
    if (e.target.id === 'themeToggle') {
        e.target.style.outline = 'none';
    }
});

// Preload critical resources
function preloadResources() {
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.onload = function () {
        this.onload = null;
        this.rel = 'stylesheet';
    };
    document.head.appendChild(fontLink);
}

// Initialize preloading
preloadResources();

// Error handling for failed resource loads
window.addEventListener('error', function (e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
});

// Add loading state management
document.addEventListener('DOMContentLoaded', function () {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Ensure smooth transitions
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Only register if there's a service worker file
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            if (registrations.length === 0) {
                console.log('No service worker to register');
            }
        });
    });
}

// Analytics and performance monitoring (placeholder)
function trackEvent(eventName, properties = {}) {
    // Replace with actual analytics implementation
    console.log('Event tracked:', eventName, properties);
}

// Track important user interactions
document.addEventListener('click', function (e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('CTA Button Clicked', {
            buttonText: e.target.textContent.trim(),
            section: e.target.closest('section')?.id || 'unknown'
        });
    }

    if (e.target.matches('.project-link')) {
        trackEvent('Project Link Clicked', {
            linkType: e.target.textContent.includes('Code') ? 'code' : 'demo',
            projectTitle: e.target.closest('.project-card')?.querySelector('h3')?.textContent || 'unknown'
        });
    }
});

// Performance monitoring
window.addEventListener('load', function () {
    // Measure page load performance
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        trackEvent('Page Load Performance', {
            loadTime: pageLoadTime,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart
        });
    }
});
