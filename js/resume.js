// Resume System JavaScript

// Store collected emails (in a real implementation, this would be sent to a server)
let collectedEmails = JSON.parse(localStorage.getItem('resumeEmails') || '[]');

// Open resume preview modal
function openResumePreview() {
    const modal = document.getElementById('resumePreviewModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close resume preview modal
function closeResumePreview() {
    const modal = document.getElementById('resumePreviewModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close email modal
function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle download button click - opens email collection
function downloadResume() {
    closeResumePreview();
    openEmailModal();
}

// Open email collection modal
function openEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on email input
    setTimeout(() => {
        document.getElementById('visitorEmail').focus();
    }, 300);
}

// Email validation function
function validateEmail(email) {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Please enter a valid email address format (e.g., user@example.com)' };
    }
    
    // Check for common disposable email domains
    const disposableDomains = [
        'tempmail.org', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
        'throwaway.email', 'temp-mail.org', 'sharklasers.com', 'getairmail.com'
    ];
    
    const domain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
        return { valid: false, error: 'Please use a valid email address' };
    }
    
    return { valid: true };
}

// Show error message
function showErrorMessage(message) {
    const emailContent = document.querySelector('.email-form-content');
    const currentForm = emailContent.querySelector('form');
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
        <button onclick="resetEmailForm()" class="btn-retry">
            <i class="fas fa-redo"></i> Try Again
        </button>
    `;
    
    // Replace form with error message
    emailContent.innerHTML = '';
    emailContent.appendChild(errorDiv);
}

// Reset email form
function resetEmailForm() {
    // Reload the original email form by refreshing the modal
    closeEmailModal();
    setTimeout(() => {
        openEmailModal();
    }, 100);
}

// Handle email form submission
function submitEmail(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    const email = document.getElementById('visitorEmail').value.trim();
    
    // Validate email format
    const validation = validateEmail(email);
    if (!validation.valid) {
        showErrorMessage(validation.error);
        return;
    }
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validating...';
    
    // Simulate email validation check (in production, this would be a real API call)
    setTimeout(() => {
        // Simulate random validation failure (remove this in production)
        const randomFailure = Math.random() < 0.1; // 10% chance of failure for testing
        
        if (randomFailure) {
            // Simulate email not found or invalid
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Email Not Found';
            setTimeout(() => {
                showErrorMessage('This email address could not be verified. Please check your email and try again, or use a different email address.');
            }, 1000);
            return;
        }
        
        // Email is valid, proceed with collection
        const name = document.getElementById('visitorName').value || 'Anonymous';
        const company = document.getElementById('companyName').value || 'Not specified';
        
        // Store email data (in production, this would be sent to your server)
        const emailData = {
            email: email,
            name: name,
            company: company,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        collectedEmails.push(emailData);
        
        // Store in localStorage for admin panel access
        localStorage.setItem('resumeEmails', JSON.stringify(collectedEmails));
        
        // Log to console for development (remove in production)
        console.log('Email collected:', emailData);
        console.log('Total emails collected:', collectedEmails.length);
        
        // Collect email for manual resume sending
        collectEmailForResume();
        
        // Reset form
        form.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Close modal after a delay
        setTimeout(() => {
            closeEmailModal();
        }, 5000);
        
    }, 2000); // Increased delay to simulate validation
}

// Show success message
function showSuccessMessage() {
    const emailContent = document.querySelector('.email-form-content');
    emailContent.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>I've received your request for my resume. I'll send it to your email address soon.</p>
            <p><strong>Email:</strong> ${document.getElementById('visitorEmail').value}</p>
        </div>
    `;
}

// Collect email for manual resume sending
function collectEmailForResume() {
    const email = document.getElementById('visitorEmail').value;
    const name = document.getElementById('visitorName').value;
    const company = document.getElementById('visitorCompany').value;
    
    // Store the email request
    const requestData = {
        email: email,
        name: name,
        company: company,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        page: window.location.href
    };
    
    // Add to collected emails for admin review
    collectedEmails.push(requestData);
    localStorage.setItem('collectedEmails', JSON.stringify(collectedEmails));
    
    // Track the request
    trackResumeDownload(email, name, company);
    
    // Show success message
    showSuccessMessage();
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const resumeModal = document.getElementById('resumePreviewModal');
    const emailModal = document.getElementById('emailModal');
    
    if (event.target === resumeModal) {
        closeResumePreview();
    }
    
    if (event.target === emailModal) {
        closeEmailModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeResumePreview();
        closeEmailModal();
    }
});

// Analytics function
function trackResumeDownload(email, name, company) {
    const analyticsData = {
        action: 'resume_download',
        email: email,
        name: name,
        company: company,
        timestamp: new Date().toISOString(),
        page: window.location.href,
        userAgent: navigator.userAgent
    };
    
    console.log('Analytics:', analyticsData);
}

// Export collected emails (for admin use)
function exportCollectedEmails() {
    if (collectedEmails.length === 0) {
        console.log('No emails collected yet');
        return;
    }
    
    const csvContent = [
        ['Email', 'Name', 'Company', 'Timestamp', 'User Agent'],
        ...collectedEmails.map(data => [
            data.email,
            data.name,
            data.company,
            data.timestamp,
            data.userAgent
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume_downloads_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Make functions globally available
window.openResumePreview = openResumePreview;
window.closeResumePreview = closeResumePreview;
window.closeEmailModal = closeEmailModal;
window.downloadResume = downloadResume;
window.submitEmail = submitEmail;
window.showErrorMessage = showErrorMessage;
window.resetEmailForm = resetEmailForm;
window.exportCollectedEmails = exportCollectedEmails;
