const fs = require('fs');
const path = require('path');

// Fixed Mermaid configuration
const fixedMermaidConfig = `    <script>
        // Enhanced Mermaid configuration for cross-device compatibility
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                nodeSpacing: 80,
                rankSpacing: 100,
                curve: 'linear',
                padding: 30,
                wrap: true
            },
            themeVariables: {
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '12px',
                primaryColor: '#89CFF0',
                primaryTextColor: '#333',
                primaryBorderColor: '#1E90FF',
                lineColor: '#7E8AA2',
                tertiaryColor: '#f9f9f9',
                edgeLabelBackground: '#ffffff',
                edgeLabelBackgroundOpacity: 0.8
            },
            securityLevel: 'loose'
        });

        // Function to enhance text rendering after Mermaid loads
        function enhanceTextRendering() {
            const diagramElement = document.querySelector('.mermaid');
            if (!diagramElement) {
                console.error('Mermaid diagram element not found');
                return;
            }

            // Apply additional styling for better text positioning
            const textElements = diagramElement.querySelectorAll('text');
            textElements.forEach(text => {
                text.style.fontFamily = 'Arial, Helvetica, sans-serif';
                text.style.fontSize = '12px';
                text.style.fontWeight = 'normal';
                text.style.textAnchor = 'middle';
            });

            // Initialize controls after rendering
            setTimeout(initializeDiagramControls, 100);
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Wait for Mermaid to render, then enhance
            setTimeout(enhanceTextRendering, 500);
        });

        // Also try to enhance on window load as fallback
        window.addEventListener('load', function() {
            setTimeout(enhanceTextRendering, 200);
        });
    </script>`;

// Updated initialization function
const updatedInitFunction = `        function initializeDiagramControls() {
            diagramControls.container = document.getElementById('diagram-container');
            if (!diagramControls.container) {
                console.error('Diagram container not found');
                return;
            }

            // Get the SVG element
            diagramControls.svg = diagramControls.container.querySelector('svg');
            if (!diagramControls.svg) {
                console.error('SVG not found in container, retrying...');
                // Retry after a short delay
                setTimeout(initializeDiagramControls, 200);
                return;
            }

            console.log('SVG found, initializing controls');
            setupEventListeners();
            resetView();
        }`;

// Comment to replace window.addEventListener
const initComment = `        // Note: Diagram initialization is now handled by enhanceTextRendering() function`;

// All project files
const filesToUpdate = [
    'sentiment-analysis.html',
    'hypothesis.html',
    'industrial-iot-optimization.html',
    'patent-landscaping.html',
    'portfolio-analysis.html',
    'tensile-strength-predictive-model.html',
    'trajectory-tracking.html',
    'web-calculator.html'
];

function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace the entire Mermaid script section - handle both old and new patterns
        const oldScriptRegex1 = /<script>\s*\/\/ Enhanced Mermaid configuration[\s\S]*?<\/script>/;
        const oldScriptRegex2 = /<script>\s*mermaid\.initialize\(\s*\{[\s\S]*?\}\);\s*<\/script>/;
        
        if (oldScriptRegex1.test(content)) {
            content = content.replace(oldScriptRegex1, fixedMermaidConfig);
        } else if (oldScriptRegex2.test(content)) {
            content = content.replace(oldScriptRegex2, fixedMermaidConfig);
        }
        
        // Replace old initialization function
        const oldInitRegex = /function initializeDiagramControls\(\) \{[\s\S]*?setTimeout\(initializeDiagramControls, 200\);\s*\}/;
        if (oldInitRegex.test(content)) {
            content = content.replace(oldInitRegex, updatedInitFunction);
        }
        
        // Replace window.addEventListener
        const oldEventListenerRegex = /\/\/ Note: Diagram initialization is now handled by renderDiagram\(\) function/;
        if (oldEventListenerRegex.test(content)) {
            content = content.replace(oldEventListenerRegex, initComment);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`? Fixed: ${path.basename(filePath)}`);
        return true;
    } catch (error) {
        console.error(`? Error fixing ${filePath}:`, error.message);
        return false;
    }
}

// Fix all files
console.log('? Fixing Mermaid rendering issues...\n');

const projectsDir = path.join(__dirname, 'projects');
let successCount = 0;

filesToUpdate.forEach(file => {
    const filePath = path.join(projectsDir, file);
    if (fs.existsSync(filePath)) {
        if (updateFile(filePath)) {
            successCount++;
        }
    } else {
        console.log(`??  File not found: ${file}`);
    }
});

console.log(`\n? Fixed ${successCount}/${filesToUpdate.length} files successfully!`);
console.log('? Mermaid diagrams should now render properly on all devices.');
