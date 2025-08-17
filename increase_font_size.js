const fs = require('fs');
const path = require('path');

// All project files
const filesToUpdate = [
    'galva-process-optimization.html',
    'sentiment-analysis.html',
    'hypothesis.html',
    'industrial-iot-optimization.html',
    'patent-landscaping.html',
    'portfolio-analysis.html',
    'tensile-strength-predictive-model.html',
    'trajectory-tracking.html',
    'web-calculator.html'
];

function increaseFontSize(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update Mermaid configuration font size
        const oldFontSizeRegex = /fontSize: '12px'/g;
        if (oldFontSizeRegex.test(content)) {
            content = content.replace(oldFontSizeRegex, "fontSize: '16px'");
        }
        
        // Update enhanceTextRendering function font size
        const oldTextFontSizeRegex = /text\.style\.fontSize = '12px'/g;
        if (oldTextFontSizeRegex.test(content)) {
            content = content.replace(oldTextFontSizeRegex, "text.style.fontSize = '16px'");
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`? Increased font size: ${path.basename(filePath)}`);
        return true;
    } catch (error) {
        console.error(`? Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Increase font size in all files
console.log('? Increasing font size in workflow charts...\n');

const projectsDir = path.join(__dirname, 'projects');
let successCount = 0;

filesToUpdate.forEach(file => {
    const filePath = path.join(projectsDir, file);
    if (fs.existsSync(filePath)) {
        if (increaseFontSize(filePath)) {
            successCount++;
        }
    } else {
        console.log(`??  File not found: ${file}`);
    }
});

console.log(`\n? Increased font size in ${successCount}/${filesToUpdate.length} files successfully!`);
console.log('? Font size changed from 12px to 16px for better readability.');
