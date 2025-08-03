// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initPortfolio();
});

function initPortfolio() {
    // Add fade-in animation to project cards
    addFadeInAnimation();
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Load project data if available
    loadProjectData();
    
    // Add interactive elements
    addInteractiveElements();
}

function addFadeInAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function loadProjectData() {
    // Load project metadata from JSON file
    fetch('assets/data/projects.json')
        .then(response => response.json())
        .then(data => {
            updateProjectCards(data.projects);
        })
        .catch(error => {
            console.log('Project data not available:', error);
        });
}

function updateProjectCards(projects) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        if (projects[index]) {
            const project = projects[index];
            
            // Update card content with project data
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            if (title) title.textContent = project.title;
            if (description) description.textContent = project.description;
        }
    });
}

function addInteractiveElements() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click tracking for analytics
    addClickTracking();
}

function addClickTracking() {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Track link clicks (can be extended for analytics)
            console.log('Link clicked:', this.href);
        });
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate layout if needed
    console.log('Window resized');
}, 250));

// Export functions for use in other scripts
window.PortfolioApp = {
    initPortfolio,
    addFadeInAnimation,
    loadProjectData
}; 