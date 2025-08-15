// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initPortfolio();
});

function initPortfolio() {
    // Initialize all portfolio components
    addFadeInAnimation();
    addInteractiveElements();
    
    // Initialize navigation visibility control
    initNavigationVisibility();
    
    // Optimize image loading
    optimizeImageLoading();
    
    // Load project data if available
    loadProjectData();
    
    // Initialize role toggles
    initRoleToggles();
}

function initNavigationVisibility() {
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    // Always show navigation - remove the hiding logic
    navLinks.classList.remove('hidden');
    
    // Remove any background styling from the navigation container
    function updateNavigationStyle() {
        // Remove any background that might create rectangular effect
        navLinks.style.background = 'transparent';
        navLinks.style.border = 'none';
        navLinks.style.outline = 'none';
    }
    
    // Update on scroll
    window.addEventListener('scroll', debounce(updateNavigationStyle, 10));
    
    // Initial check
    updateNavigationStyle();
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

// Simple toggle function for projects
function toggleProjects(roleSection) {
    const projectsContainer = roleSection.querySelector('.projects-container');
    const toggleIcon = roleSection.querySelector('.role-toggle');
    
    if (projectsContainer.style.display === 'block') {
        projectsContainer.style.display = 'none';
        roleSection.classList.remove('expanded');
    } else {
        projectsContainer.style.display = 'block';
        roleSection.classList.add('expanded');
    }
}

// Make function globally available
window.toggleProjects = toggleProjects;

// Ensure projects are hidden by default on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, hiding projects');
    const projectsContainers = document.querySelectorAll('.projects-container');
    projectsContainers.forEach(container => {
        container.style.display = 'none';
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
        container.style.height = '0';
        container.style.overflow = 'hidden';
    });
    console.log('Hidden', projectsContainers.length, 'project containers');
});

// Also hide projects when window loads
window.addEventListener('load', function() {
    console.log('Window loaded, ensuring projects are hidden');
    const projectsContainers = document.querySelectorAll('.projects-container');
    projectsContainers.forEach(container => {
        container.style.display = 'none';
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
        container.style.height = '0';
        container.style.overflow = 'hidden';
    });
});

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

// Image loading optimization
function optimizeImageLoading() {
    const welcomeSection = document.querySelector('.welcome-section');
    const avatar = document.querySelector('.avatar');
    
    // Preload critical images
    const criticalImages = [
        'assets/backgrounds/welcome_1.jpeg',
        'assets/backgrounds/avatar_1.jpeg'
    ];
    
    let loadedImages = 0;
    const totalImages = criticalImages.length;
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                // All critical images loaded
                if (welcomeSection) {
                    welcomeSection.classList.add('loaded');
                }
            }
        };
        img.src = src;
    });
}

// Loading modal functions
function showLoadingModal() {
    const loadingModal = document.getElementById('loadingModal');
    if (loadingModal) {
        loadingModal.classList.add('show');
    }
}

function hideLoadingModal() {
    const loadingModal = document.getElementById('loadingModal');
    if (loadingModal) {
        loadingModal.classList.remove('show');
    }
}

// Enhanced navigateToProject function with loading message
function navigateToProjectWithLoading(projectName) {
    // Show loading modal
    showLoadingModal();
    
    // Navigate to project files in the projects directory
    const filename = projectName + '.html';
    
    // Add a small delay to show the loading message
    setTimeout(() => {
        window.location.href = `projects/${filename}`;
    }, 100); // Reduced delay to test if that's the issue
} 