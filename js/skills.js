// Skills Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
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

    function layoutBubbles() {
        const isMobile = window.innerWidth <= 768;
        const childRadius = isMobile ? 140 : 220;
        const grandchildRadius = isMobile ? 90 : 105;

        arrangeBubbles('.enhanced-children-container', '.enhanced-child-bubble', childRadius);
        arrangeBubbles('.enhanced-child-bubble', '.enhanced-grandchild-bubble', grandchildRadius);
    }

    // Initial layout
    layoutBubbles();

    // Re-layout on resize (with debounce for performance)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(layoutBubbles, 100);
    });

    const skillsSection = document.getElementById('skills');
    const enhancedSkillModules = document.querySelectorAll('.enhanced-skill-module');

    enhancedSkillModules.forEach(module => {
        const mainBubble = module.querySelector('.enhanced-main-bubble');

        mainBubble.addEventListener('mouseenter', () => {
            if (!module.classList.contains('is-expanded')) {
                enhancedSkillModules.forEach(otherModule => {
                    if (otherModule !== module) {
                        otherModule.classList.add('faded');
                    }
                });
            }
        });

        mainBubble.addEventListener('mouseleave', () => {
            enhancedSkillModules.forEach(otherModule => {
                otherModule.classList.remove('faded');
            });
        });

        mainBubble.addEventListener('click', (event) => {
            event.stopPropagation();
            skillsSection.classList.add('user-has-interacted'); // Stop pulse and hide guide
            const wasExpanded = module.classList.contains('is-expanded');

            // Close all other modules first
            enhancedSkillModules.forEach(otherModule => {
                otherModule.classList.remove('is-expanded', 'focused', 'faded');
            });

            // If the clicked module was not already expanded, expand it
            if (!wasExpanded) {
                module.classList.add('is-expanded', 'focused');
                // And fade the others
                enhancedSkillModules.forEach(otherModule => {
                    if (otherModule !== module) {
                        otherModule.classList.add('faded');
                    }
                });
            }
        });
    });

    // Add a global click listener to close modules when clicking outside
    document.addEventListener('click', () => {
        skillsSection.classList.add('user-has-interacted'); // Stop pulse and hide guide
        const guideText = document.querySelector('.skill-guide-text');
        let skillsObserver = document.querySelector('.skill-guide-text').IntersectionObserver;
        if (guideText && skillsObserver) {
            guideText.classList.remove('is-visible');
            skillsObserver.disconnect(); // Permanently stop observing
        }
        enhancedSkillModules.forEach(module => {
            module.classList.remove('is-expanded', 'focused', 'faded');
        });
    });

    // Intersection Observer for the guide text
    const guideText = document.querySelector('.skill-guide-text');
    let skillsObserver; // Declare here to make it accessible in the click listener

    if (guideText && skillsSection) {
        skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the section is intersecting and the user hasn't interacted yet
                if (entry.isIntersecting) {
                    guideText.classList.add('is-visible');
                } else {
                    // Hide it when scrolling away
                    guideText.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }
}); 