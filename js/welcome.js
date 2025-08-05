// Welcome Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize welcome section
    initWelcomeSection();
});

function initWelcomeSection() {
    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToSection('skills');
        });
    }

    // Add fade-in animation for welcome content
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeContent) {
        welcomeContent.style.opacity = '0';
        welcomeContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            welcomeContent.style.transition = 'all 0.8s ease';
            welcomeContent.style.opacity = '1';
            welcomeContent.style.transform = 'translateY(0)';
        }, 300);
    }
}

function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
} 