/**
 * Theme Switcher Functionality
 * 
 * This file handles:
 * - Theme switching between different color schemes
 * - Dark/light mode toggle
 * - Saving user preference to localStorage
 */

// DOM Elements
const themeBtn = document.querySelector('.theme-btn');
const themePanel = document.querySelector('.theme-panel');
const themeOptions = document.querySelectorAll('.theme-option');
const themeStyle = document.getElementById('theme-style');

// Theme file paths
const themes = {
    'default': 'css/themes/default.css',
    'aurora': 'css/themes/aurora.css',
    'darktech': 'css/themes/darktech.css',
    'sunset': 'css/themes/sunset.css',
    'cybermint': 'css/themes/cybermint.css',
    'galaxy': 'css/themes/galaxy.css',
    'minimal': 'css/themes/minimal.css'
};

function initTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'default';
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply saved theme
    setTheme(savedTheme);

    // Apply dark/light mode
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Theme-specific colors
    const themeColors = {
    'default': '#9333ea',    // Vivid purple (Jellyfish Glow)
    'aurora': '#5eead4',     // Teal (Aurora Night)
    'darktech': '#0f766e',   // Dark teal-green (cyber/tech style)
    'sunset': '#f97316',     // Vibrant orange (Sunset Blaze)
    'cybermint': '#10b981',  // Electric mint (Cyber Mint)
    'galaxy': '#1e3a8a',     // Deep dark blue (Galaxy Candy)
    'minimal': '#94a3b8'     // Cool gray (Minimal Light)
};

    // Set base styles (no glow initially)
    themeOptions.forEach(option => {
        const themeName = option.dataset.theme;
        option.style.backgroundColor = themeColors[themeName];
        option.style.border = `2px solid ${themeColors[themeName]}`;
        option.style.transition = 'all 0.3s ease';
        
        // Hover effects
        option.addEventListener('mouseenter', () => {
            option.style.boxShadow = `0 0 15px ${themeColors[themeName]}`;
            option.style.transform = 'scale(1.1)';
        });
        
        option.addEventListener('mouseleave', () => {
            option.style.boxShadow = 'none';
            option.style.transform = 'scale(1)';
        });
    });
}

// Set theme by name
function setTheme(themeName) {
    // Update theme stylesheet
    themeStyle.setAttribute('href', themes[themeName]);
    
    // Save to localStorage
    localStorage.setItem('theme', themeName);
    
    // Update active state of theme options
    themeOptions.forEach(option => {
        if (option.dataset.theme === themeName) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Toggle dark/light mode
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Update icon
    if (isDarkMode) {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
}

// Event Listeners
themeBtn.addEventListener('click', toggleDarkMode);

themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const themeName = option.dataset.theme;
        setTheme(themeName);
    });
});

// Show theme panel on hover
themeBtn.addEventListener('mouseenter', () => {
    themePanel.style.display = 'grid';
});

themePanel.addEventListener('mouseleave', () => {
    themePanel.style.display = 'none';
});

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);