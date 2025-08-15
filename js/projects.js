// Projects Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize projects section
    initProjectsSection();
});

function initProjectsSection() {
    // Add hover effects to project cards (click handlers are now inline)
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add role section animations
    const roleSections = document.querySelectorAll('.role-section');
    
    roleSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });
}

// Note: Project navigation is now handled by navigateToProjectWithLoading() 
// function in main.js with inline onclick handlers in sections/projects.html

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
} 