// Resume System JavaScript

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
        'throwaway.email', 'temp-mail.org', 'sharklasers.com', 'getairmail.com',
        'temp-mail.io', 'guerrillamailblock.com', 'pokemail.net', 'spam4.me',
        'bccto.me', 'chacuo.net', 'dispostable.com', 'mailnesia.com'
    ];
    
    const domain = email.split('@')[1].toLowerCase();
    if (disposableDomains.includes(domain)) {
        return { valid: false, error: 'Please use a valid email address from a legitimate provider' };
    }
    
    // Additional validation: check for minimum length and common patterns
    if (email.length < 5) {
        return { valid: false, error: 'Email address is too short' };
    }
    
    if (email.length > 254) {
        return { valid: false, error: 'Email address is too long' };
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
    // Let the form submit to Formspree naturally
    // Just show success message
    showSuccessMessage();
    
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
    
    // Quick validation check (removed random failure for production)
    setTimeout(() => {
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
        
        // Form will be submitted to Formspree automatically
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Close modal after a delay
        setTimeout(() => {
            closeEmailModal();
        }, 5000);
        
    }, 1000); // Reduced delay for better UX
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
