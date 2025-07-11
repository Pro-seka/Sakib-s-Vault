/**
 * Animation and Interaction Effects
 * 
 * This file contains:
 * - Scroll animations
 * - Hover effects
 * - Cursor effects (optional)
 * - Other visual enhancements
 */

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    initScrollAnimations();
    
    // Add hover effects to buttons
    initButtonHoverEffects();
    
    // Optional: Initialize custom cursor
    // initCustomCursor();
});

// Animate elements when they come into view
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animate');
                
                element.classList.add('animate__animated', `animate__${animationType}`);
                
                // Stop observing after animation
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Add hover effects to buttons
function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn, .filter-btn, .project-link');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

// Optional: Custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        setTimeout(() => {
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
        }, 100);
    });
    
    // Change cursor on hover interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            follower.classList.add('follower-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            follower.classList.remove('follower-active');
        });
    });
}

// Add animation to navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});