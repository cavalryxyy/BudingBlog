// Skills Section JavaScript
// Make the arrangement function global so it can be called from index.html
window.arrangeBubbles = function(containerSelector, bubbleSelector, radius, startAngle = -90) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
        const bubbles = container.querySelectorAll(bubbleSelector);
        const count = bubbles.length;
        const angleStep = 360 / count;

        bubbles.forEach((bubble, i) => {
            const angle = startAngle + i * angleStep;
            const x = radius * Math.cos(angle * Math.PI / 180);
            const y = radius * Math.sin(angle * Math.PI / 180);

            // Center the bubble relative to the container
            const bubbleSize = bubble.offsetWidth;
            const parentSize = bubble.parentElement.offsetWidth;
            const centeredX = x + (parentSize / 2) - (bubbleSize / 2);
            const centeredY = y + (parentSize / 2) - (bubbleSize / 2);

            bubble.style.position = 'absolute';
            bubble.style.left = `${centeredX}px`;
            bubble.style.top = `${centeredY}px`;

            // Add transition delay for staggered animation
            bubble.style.transitionDelay = `${i * 0.1}s`;
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to arrange bubbles in a circle
    function arrangeBubbles(containerSelector, bubbleSelector, radius, startAngle = -90) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const bubbles = container.querySelectorAll(bubbleSelector);
            const count = bubbles.length;
            if (count === 0) return;
            const angleStep = 360 / count;

            bubbles.forEach((bubble, i) => {
                const angle = startAngle + i * angleStep;
                const x = radius * Math.cos(angle * Math.PI / 180);
                const y = radius * Math.sin(angle * Math.PI / 180);

                const bubbleSize = bubble.offsetWidth;
                const parentSize = bubble.parentElement.offsetWidth;
                const centeredX = x + (parentSize / 2) - (bubbleSize / 2);
                const centeredY = y + (parentSize / 2) - (bubbleSize / 2);

                bubble.style.position = 'absolute';
                bubble.style.left = `${centeredX}px`;
                bubble.style.top = `${centeredY}px`;
                
                bubble.style.transitionDelay = `${i * 0.1}s`;
            });
        });
    }

    // Arrange child and grandchild bubbles on page load
    arrangeBubbles('.enhanced-children-container', '.enhanced-child-bubble', 220);
    arrangeBubbles('.enhanced-child-bubble', '.enhanced-grandchild-bubble', 100);

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