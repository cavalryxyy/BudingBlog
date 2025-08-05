// Skills Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced skill tree functionality
    const enhancedSkillModules = document.querySelectorAll('.enhanced-skill-module');

    enhancedSkillModules.forEach(module => {
        const mainBubble = module.querySelector('.enhanced-main-bubble');

        mainBubble.addEventListener('mouseenter', function() {
            // Add focus effect to current module
            module.classList.add('focused');

            // Fade all other modules
            enhancedSkillModules.forEach(otherModule => {
                if (otherModule !== module) {
                    otherModule.classList.add('faded');
                    otherModule.classList.remove('is-expanded');
                }
            });

            // Expand current module after a short delay
            setTimeout(() => {
                module.classList.add('is-expanded');
            }, 200);
        });

        module.addEventListener('mouseleave', function() {
            // Remove all classes when leaving
            module.classList.remove('is-expanded', 'focused');

            // Remove fade from all modules
            enhancedSkillModules.forEach(otherModule => {
                otherModule.classList.remove('faded');
            });
        });
    });
}); 