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

// Handle email form submission
function submitEmail(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Get form data
    const email = document.getElementById('visitorEmail').value;
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
    
    // Simulate processing delay
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Download the resume
        downloadResumeFile();
        
        // Reset form
        form.reset();
        
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Close modal after a delay
        setTimeout(() => {
            closeEmailModal();
        }, 3000);
        
    }, 1500);
}

// Show success message
function showSuccessMessage() {
    const emailContent = document.querySelector('.email-form-content');
    emailContent.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>Your resume is being downloaded. I'll also send you a copy via email and keep you updated on new opportunities.</p>
            <p><strong>Email:</strong> ${document.getElementById('visitorEmail').value}</p>
        </div>
    `;
}

// Download resume file
function downloadResumeFile() {
    const link = document.createElement('a');
    link.href = 'assets/data/YuanyuanXu_2025-2.pdf';
    link.download = 'YuanyuanXu_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

// Analytics function (for future use)
function trackResumeDownload(email, name, company) {
    // In production, this would send data to your analytics service
    // For now, we'll just log it
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
    
    // You could send this to Google Analytics, your own server, etc.
    // Example: gtag('event', 'resume_download', analyticsData);
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
window.exportCollectedEmails = exportCollectedEmails;
