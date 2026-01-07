// ========================================
// LUXURY SHUTTLE SERVICES - JAVASCRIPT
// ========================================

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initBackToTop();
    initBookingForm();
    initNewsletterForm();
    initAnimations();
});

// === MOBILE MENU FUNCTIONALITY ===
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger icon
        const bars = this.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (nav.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = '';
                bar.style.opacity = '';
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset hamburger icon
            const bars = mobileToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !mobileToggle.contains(event.target)) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            const bars = mobileToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    });
}

// === SMOOTH SCROLL FUNCTIONALITY ===
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset (height of fixed header)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for header styling
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
}

// === UPDATE ACTIVE NAVIGATION LINK ===
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// === BACK TO TOP BUTTON ===
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === BOOKING FORM FUNCTIONALITY ===
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Handle form submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateBookingForm()) {
                // Get form data
                const formData = new FormData(bookingForm);
                const data = Object.fromEntries(formData);
                
                // Show success message
                showNotification('Thank you for your booking request! We will contact you shortly to confirm your reservation.', 'success');
                
                // Log form data (in production, this would be sent to a server)
                console.log('Booking Request:', data);
                
                // Reset form
                bookingForm.reset();
            }
        });
    }
}

// === VALIDATE BOOKING FORM ===
function validateBookingForm() {
    const requiredFields = document.querySelectorAll('#bookingForm [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
            
            setTimeout(() => {
                field.style.borderColor = '';
            }, 3000);
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
    }
    
    return isValid;
}

// === NEWSLETTER FORM ===
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// === EMAIL VALIDATION ===
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// === NOTIFICATION SYSTEM ===
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 4px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.95rem;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// === ANIMATIONS ===
function initAnimations() {
    // Add CSS for notification animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .fleet-card, .feature-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// === LAZY LOADING IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events
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

// Optimize scroll events with debouncing
window.addEventListener('scroll', debounce(function() {
    // Additional scroll-based animations can be added here
}, 100));

// === CONSOLE MESSAGE ===
console.log('%cModjadji\'s Shuttle Services', 'color: #c9a961; font-size: 24px; font-weight: bold;');
console.log('%cPremium Executive Transportation', 'color: #1a1a1a; font-size: 14px;');




























document.addEventListener('DOMContentLoaded', function() {
    const imageUrls = [
        './Images/529937930_122098660280973769_1105726797082522831_n.jpg',
        './Images/531721627_122096801210978526_4997815181269426571_n.jpg',
        //'./Images/532270598_122100346346973769_973121771030382272_n.jpg',
        //'./Images/image4.jpg', // Add more as needed

    ];
    
    const carousel = document.querySelector('.image-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // Create image elements
    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Luxury Vehicle ${index + 1}`;
        img.style.display = index === 0 ? 'block' : 'none';
        carousel.appendChild(img);
    });
    
    const images = carousel.querySelectorAll('img');
    
    function showImage(index) {
        images.forEach(img => img.style.display = 'none');
        images[index].style.display = 'block';
        currentIndex = index;
    }
    
    function nextImage() {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) newIndex = 0;
        showImage(newIndex);
    }
    
    function prevImage() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = images.length - 1;
        showImage(newIndex);
    }
    
    // Add event listeners
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    // Auto-rotate every 5 seconds (optional)
    setInterval(nextImage, 5000);
});


























function submitBookingRequest() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const passengers = document.getElementById('passengers').value;
    
    // Build URL with parameters
    const paymentURL = 'https://shuttle-payment-system.vercel.app/';
    const params = new URLSearchParams({
        from: 'booking',
        name: name,
        email: email,
        phone: phone,
        pickup: pickup,
        dropoff: dropoff,
        date: date,
        time: time,
        passengers: passengers
    });
    
    // Redirect to payment system
    window.location.href = `${paymentURL}?${params.toString()}`;
}

// For Fleet section - Reserve button
function reserveVehicle(vehicleType) {
    const paymentURL = 'https://shuttle-payment-system.vercel.app/';
    const params = new URLSearchParams({
        from: 'fleet',
        vehicle: vehicleType
    });
    
    window.location.href = `${paymentURL}?${params.toString()}`;
}
