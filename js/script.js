/**
 * Sakib Hasan's Project Showcase - Main JavaScript File
 * 
 * This file contains all the interactive functionality for the website:
 * - Project filtering
 * - Dynamic project loading
 * - Form handling
 * - Mobile navigation
 * - Helper functions
 */

// DOM Elements
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksList = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const preloader = document.querySelector('.preloader');
const currentYear = document.getElementById('year');

// Project Data - This can be moved to a separate JSON file if preferred
const projects = [
    {
        id: 1,
        title: "Personal portfolio",
        category: "web",
        description: "Personal portfolio with my info, skills, and work",
        image: "images/projects/web/portfolio.jpg",
        link: "https://pro-seka.github.io/My-personal-portfolio-website/",
        tags: ["JavaScript", "API", "CSS"]
    },
    {
        id: 2,
        title: "Sakib's Galaxy",
        category: "games",
        description: "A cosmic shooter game",
        image: "images/projects/games/galaxy.jpg",
        link: "https://pro-seka.github.io/Sakibs-Galaxy/",
        tags: ["JavaScript", "Phaser", "HTML5"]
    },
    {
        id: 3,
        title: "Coming Soon..",
        category: "tools",
        description: "Project launching soon !!",
        image: "images/projects/tools/soon.jpg",
        link: "https://github.com/sakibhasan/task-manager",
        tags: ["React", "Firebase", "Material UI"]
    },
    {
        id: 4,
        title: "Be My Valentine?",
        category: "experiments",
        description: "A fun interactive project",
        image: "images/projects/experiments/Valentine.jpg",
        link: "https://pro-seka.github.io/Be-My-Valentine/",
        tags: ["Python", "TensorFlow", "Flask"]
    },
    {
        id: 5,
        title: "Coming Soon..",
        category: "web",
        description: "Project launching soon !!",
        image: "images/projects/web/soon.jpg",
        link: "https://github.com/sakibhasan/ecommerce-site",
        tags: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 6,
        title: "Coming Soon..",
        category: "games",
        description: "Project launching soon !!",
        image: "images/projects/games/soon.jpg",
        link: "https://github.com/sakibhasan/puzzle-adventure",
        tags: ["Unity", "C#", "2D"]
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Load all projects initially
    loadProjects(projects);
    
    // Add event listeners
    addEventListeners();
    
    // Initialize typewriter effect
    initTypewriter();
    
    // Show projects with animation
    animateProjects();
});

// Load projects into the grid
function loadProjects(projectsToLoad) {
    projectsGrid.innerHTML = '';
    
    projectsToLoad.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category}`;
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <a href="${project.link}" target="_blank" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Get formatted category name
function getCategoryName(category) {
    const names = {
        'web': '🌐 Web Project',
        'games': '🎮 Game',
        'tools': '🛠️ Tool',
        'experiments': '🧪 Experiment'
    };
    return names[category] || category;
}

// Filter projects by category
function filterProjects(category) {
    if (category === 'all') {
        loadProjects(projects);
        return;
    }
    
    const filteredProjects = projects.filter(project => project.category === category);
    loadProjects(filteredProjects);
}

// Add event listeners
function addEventListeners() {
    // Project filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter projects
            filterProjects(button.dataset.filter);
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('This feature is currently unavailable.\nPlease reach out via email or social media. Thanks!\n');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Mobile navigation toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    });
}

// Initialize typewriter effect
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const words = JSON.parse(typewriterElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(type, 1000);
}

// Animate projects on scroll
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

