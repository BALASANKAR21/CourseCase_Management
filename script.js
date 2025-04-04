// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Password Toggle
    const togglePassword = (fieldId) => {
        const passwordField = document.getElementById(fieldId);
        const toggleIcon = passwordField.nextElementSibling.querySelector('i');
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordField.type = 'password';
            toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }
    
    // Make togglePassword function globally available
    window.togglePassword = togglePassword;

    // Show Additional Fields Based on User Type
    const showAdditionalFields = () => {
        const userType = document.getElementById('userType').value;
        const additionalFields = document.getElementById('additionalFields');
        const allTypeFields = document.querySelectorAll('.user-type-fields');
        
        // Hide all fields first
        allTypeFields.forEach(field => {
            field.style.display = 'none';
        });
        
        if (userType) {
            additionalFields.style.display = 'block';
            document.getElementById(userType + 'Fields').style.display = 'block';
        } else {
            additionalFields.style.display = 'none';
        }
    }
    
    // Make showAdditionalFields function globally available
    window.showAdditionalFields = showAdditionalFields;

    // Case Form Step Navigation
    const caseForm = document.getElementById('caseForm');
    if (caseForm) {
        const steps = document.querySelectorAll('.form-step');
        const stepIndicators = document.querySelectorAll('.step');
        let currentStep = 0;

        // Show current step
        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === stepIndex);
            });
            
            stepIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index <= stepIndex);
            });
            
            currentStep = stepIndex;
        }

        // Next button click
        document.querySelectorAll('.next-step').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentStep < steps.length - 1) {
                    showStep(currentStep + 1);
                    
                    // Update review section
                    if (currentStep === 1) {
                        document.getElementById('reviewCaseTitle').textContent = 
                            document.getElementById('caseTitle').value;
                        document.getElementById('reviewCaseCategory').textContent = 
                            document.getElementById('caseCategory').options[document.getElementById('caseCategory').selectedIndex].text;
                        document.getElementById('reviewCaseDescription').textContent = 
                            document.getElementById('caseDescription').value;
                        document.getElementById('reviewComplainant').textContent = 
                            document.getElementById('complainantName').value + ' (' + document.getElementById('complainantContact').value + ')';
                        document.getElementById('reviewRespondent').textContent = 
                            document.getElementById('respondentName').value + ' (' + (document.getElementById('respondentContact').value || 'N/A') + ')';
                        document.getElementById('reviewIncidentDate').textContent = 
                            document.getElementById('incidentDate').value;
                        document.getElementById('reviewLocation').textContent = 
                            document.getElementById('incidentLocation').value;
                    }
                }
            });
        });

        // Previous button click
        document.querySelectorAll('.prev-step').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentStep > 0) {
                    showStep(currentStep - 1);
                }
            });
        });

        // Show first step initially
        showStep(0);

        // AI Suggestion for Case Category
        const caseDescription = document.getElementById('caseDescription');
        if (caseDescription) {
            caseDescription.addEventListener('input', function() {
                const text = this.value.toLowerCase();
                let suggestion = 'No suggestion yet';
                
                if (text.includes('murder') || text.includes('theft') || text.includes('assault')) {
                    suggestion = 'Criminal';
                } else if (text.includes('divorce') || text.includes('child') || text.includes('marriage')) {
                    suggestion = 'Family';
                } else if (text.includes('property') || text.includes('land') || text.includes('house')) {
                    suggestion = 'Property';
                } else if (text.includes('company') || text.includes('business') || text.includes('contract')) {
                    suggestion = 'Corporate';
                } else if (text.includes('money') || text.includes('damage') || text.includes('compensation')) {
                    suggestion = 'Civil';
                }
                
                document.getElementById('aiSuggestedCategory').textContent = suggestion;
            });
        }
    }

    // Chat Toggle
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    
    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', function() {
            chatContainer.classList.toggle('active');
        });
    }

    // Form Submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userType = document.getElementById('userType').value;
            
            if (userType) {
                window.location.href = userType + '.html';
            } else {
                alert('Please select a user type');
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userType = document.getElementById('userType').value;
            
            if (userType) {
                alert('Registration successful! Redirecting to dashboard...');
                window.location.href = userType + '.html';
            } else {
                alert('Please select a user type');
            }
        });
    }

    if (caseForm) {
        caseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Case submitted successfully!');
            window.location.href = 'client.html';
        });
    }

    // Notification and Profile Dropdowns
    document.addEventListener('click', function(e) {
        // Close dropdowns when clicking outside
        if (!e.target.closest('.notifications') && !e.target.closest('.notification-dropdown')) {
            document.querySelectorAll('.notification-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
        
        if (!e.target.closest('.user-profile') && !e.target.closest('.profile-dropdown')) {
            document.querySelectorAll('.profile-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

    // Toggle dropdowns
    document.querySelectorAll('.notifications').forEach(notification => {
        notification.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.notification-dropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.querySelectorAll('.user-profile').forEach(profile => {
        profile.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.profile-dropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Chat functionality
    document.querySelectorAll('.chat-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would load the conversation here
        });
    });

    // Status select change
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', function() {
            const caseId = this.dataset.case;
            const newStatus = this.value;
            
            // In a real app, you would update the case status via API here
            console.log(`Updating case ${caseId} to status: ${newStatus}`);
        });
    });
});