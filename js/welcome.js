// Welcome Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize welcome section
    initWelcomeSection();
});

function initWelcomeSection() {
    // Add scroll indicator functionality for all scroll indicators
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    scrollIndicators.forEach((indicator, index) => {
        // Determine target section based on context
        let targetSection;
        if (indicator.closest('#welcome')) {
            targetSection = 'projects'; // Welcome section scrolls to projects
        } else if (indicator.closest('#projects')) {
            targetSection = 'skills'; // Projects section scrolls to skills
        }
        
        if (targetSection) {
            indicator.addEventListener('click', function() {
                scrollToSection(targetSection);
            });
        }
    });

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