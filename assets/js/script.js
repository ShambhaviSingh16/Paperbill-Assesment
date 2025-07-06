// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('nav-open');
        });
    }

    // Rating functionality
    const stars = document.querySelectorAll('#rating-stars i');
    const averageRatingEl = document.getElementById('average-rating');
    const voteCountEl = document.getElementById('vote-count');
    const thankYou = document.querySelector('.thank-you');

    if (stars.length > 0) {
        // Initial data (would normally come from your backend)
        let ratingsData = {
            totalRatings: 3052 * 4.8, // Total sum of all ratings
            voteCount: 3052            // Total number of votes
        };

        // Check if user has already rated (using localStorage)
        let userRating = localStorage.getItem('paperbill-rating') || 0;

        // Initialize stars display
        updateStarsDisplay();

        // Star hover and click events
        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                if (userRating) return; // Skip if already rated
                const rating = parseInt(this.getAttribute('data-rating'));
                highlightStars(rating);
            });

            star.addEventListener('mouseout', function() {
                if (userRating) return; // Skip if already rated
                updateStarsDisplay();
            });

            star.addEventListener('click', function() {
                const newRating = parseInt(this.getAttribute('data-rating'));

                // If user is changing their rating
                if (userRating > 0) {
                    // Subtract previous rating from total
                    ratingsData.totalRatings = ratingsData.totalRatings - userRating + newRating;
                }
                // If this is a new rating
                else {
                    ratingsData.totalRatings += newRating;
                    ratingsData.voteCount++;
                }

                // Update user's rating
                userRating = newRating;
                localStorage.setItem('paperbill-rating', userRating);

                // Update display
                updateDisplay();

                // Here you would normally send the data to your backend
                // sendRatingToBackend(newRating, userRating > 0);
            });
        });

        function highlightStars(rating) {
            stars.forEach(star => {
                const starValue = parseInt(star.getAttribute('data-rating'));
                if (starValue <= rating) {
                    star.classList.add('hovered');
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('hovered');
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            });
        }

        function updateStarsDisplay() {
            stars.forEach(star => {
                const starValue = parseInt(star.getAttribute('data-rating'));
                if (userRating && starValue <= userRating) {
                    star.classList.add('selected');
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('selected');
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            });
        }

        function updateDisplay() {
            // Calculate new average
            const newAverage = (ratingsData.totalRatings / ratingsData.voteCount).toFixed(1);

            // Update UI
            averageRatingEl.textContent = newAverage;
            voteCountEl.textContent = ratingsData.voteCount;
            thankYou.classList.add('show');

            // Update stars display
            updateStarsDisplay();
        }
    }

    // Chat functionality
    const chatButton = document.querySelector('.live-chat-button');
    const chatModal = document.querySelector('.chat-modal');
    const closeChat = document.querySelector('.close-chat');
    const chatForm = document.querySelector('.chat-form');
    const chatMessages = document.querySelector('.chat-messages');

    if (chatButton) {
        // Toggle chat modal
        chatButton.addEventListener('click', () => {
            chatModal.classList.toggle('active');
        });

        // Close chat modal
        closeChat.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!chatModal.contains(e.target) && e.target !== chatButton && !chatButton.contains(e.target)) {
                chatModal.classList.remove('active');
            }
        });

        // Handle form submission
        if (chatForm) {
            chatForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form values
                const name = this.querySelector('input[type="text"]').value;
                const phone = this.querySelector('input[type="tel"]').value;

                // Validate inputs
                if (!name || !phone) {
                    alert('Please fill in all fields');
                    return;
                }

                // Create user message
                const userMessage = document.createElement('div');
                userMessage.className = 'user-message';
                userMessage.innerHTML = `
                    <strong>You:</strong><br>
                    Name: ${name}<br>
                    Phone: ${phone}
                `;

                // Add to chat
                chatMessages.appendChild(userMessage);

                // Create bot response (simulated)
                setTimeout(() => {
                    const botResponse = document.createElement('div');
                    botResponse.className = 'bot-message';
                    botResponse.textContent = 'Thank you! Our support team will contact you shortly.';
                    chatMessages.appendChild(botResponse);

                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    // Clear form
                    this.reset();
                }, 1000);

                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        }
    }

    // Login form functionality
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const togglePassword = document.getElementById('togglePassword');
        const submitButton = document.getElementById('submitButton');
        const buttonText = document.getElementById('buttonText');
        const spinner = document.getElementById('spinner');
        const successMessage = document.getElementById('successMessage');

        // Toggle Password Visibility
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
        }

        // Form Validation
        function validateForm() {
            let isValid = true;
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('error');
            }
            
            // Validate Password
            if (passwordInput.value.length === 0) {
                passwordInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                passwordInput.parentElement.classList.remove('error');
            }
            
            return isValid;
        }
        
        // Form Submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                submitButton.disabled = true;
                buttonText.textContent = 'Logging in...';
                spinner.style.display = 'inline-block';
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    successMessage.style.display = 'block';
                    
                    // Scroll to the success message
                    successMessage.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });

                    // Redirect to dashboard after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                }, 1500);
            }
        });
        
        // Real-time Validation
        [emailInput, passwordInput].forEach(input => {
            input.addEventListener('input', function() {
                validateForm();
            });
        });
    }

    // Registration form functionality
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsCheckbox = document.getElementById('terms');
        const togglePassword = document.getElementById('togglePassword');
        const strengthMeter = document.getElementById('strengthMeter');
        const strengthText = document.getElementById('strengthText');
        const passwordHints = document.getElementById('passwordHints').children;
        const submitButton = document.getElementById('submitButton');
        const buttonText = document.getElementById('buttonText');
        const spinner = document.getElementById('spinner');
        const successMessage = document.getElementById('successMessage');
        
        // Toggle Password Visibility
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
        }
        
        // Password Strength Checker
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                const hints = [
                    password.length >= 8,
                    /[A-Z]/.test(password),
                    /\d/.test(password),
                    /[^A-Za-z0-9]/.test(password)
                ];
                
                // Update hints
                hints.forEach((hint, index) => {
                    if (hint) {
                        passwordHints[index].classList.add('valid');
                        passwordHints[index].querySelector('i').className = 'fas fa-check';
                        strength += 25;
                    } else {
                        passwordHints[index].classList.remove('valid');
                        passwordHints[index].querySelector('i').className = 'fas fa-circle';
                    }
                });
                
                // Update strength meter
                strengthMeter.style.width = strength + '%';
                
                // Update strength color and text
                if (strength < 50) {
                    strengthMeter.style.backgroundColor = 'var(--error)';
                    strengthText.textContent = 'Weak';
                    strengthText.style.color = 'var(--error)';
                } else if (strength < 75) {
                    strengthMeter.style.backgroundColor = 'var(--warning)';
                    strengthText.textContent = 'Medium';
                    strengthText.style.color = 'var(--warning)';
                } else {
                    strengthMeter.style.backgroundColor = 'var(--success)';
                    strengthText.textContent = 'Strong';
                    strengthText.style.color = 'var(--success)';
                }
            });
        }
        
        // Form Validation
        function validateForm() {
            let isValid = true;
            
            // Validate Name
            if (nameInput.value.trim().length < 3) {
                nameInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('error');
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('error');
            }
            
            // Validate Password
            const password = passwordInput.value;
            if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
                passwordInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                passwordInput.parentElement.classList.remove('error');
            }
            
            // Validate Confirm Password
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                confirmPasswordInput.parentElement.classList.remove('error');
            }
            
            // Validate Terms
            if (!termsCheckbox.checked) {
                document.getElementById('termsGroup').classList.add('error');
                isValid = false;
            } else {
                document.getElementById('termsGroup').classList.remove('error');
            }
            
            return isValid;
        }
        
        // Form Submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                submitButton.disabled = true;
                buttonText.textContent = 'Creating Account...';
                spinner.style.display = 'inline-block';
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    successMessage.style.display = 'block';
                    registerForm.style.display = 'none';
                    
                    // Scroll to the success message
                    successMessage.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });

                    // Redirect to login after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }, 1500);
            }
        });
        
        // Real-time Validation
        [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.addEventListener('input', function() {
                validateForm();
            });
        });
        
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', function() {
                validateForm();
            });
        }
    }

    // Email copy functionality
    const emailElement = document.querySelector('.contact-item[data-tooltip="Click to copy"]');
    if (emailElement) {
        emailElement.addEventListener('click', function() {
            const email = this.querySelector('.contact-text').textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalTooltip = this.getAttribute('data-tooltip');
                this.setAttribute('data-tooltip', 'Copied!');
                setTimeout(() => {
                    this.setAttribute('data-tooltip', originalTooltip);
                }, 2000);
            });
        });
    }

    // Phone click functionality
    const phoneElement = document.querySelector('.contact-item[data-tooltip="Click to call"]');
    if (phoneElement) {
        phoneElement.addEventListener('click', function() {
            const phone = this.querySelector('.contact-text').textContent;
            window.location.href = `tel:${phone.replace(/\D/g, '')}`;
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            // Here you would typically send the email to your server
            alert(`Thanks for subscribing! We'll send updates to ${emailInput.value}`);
            emailInput.value = '';
        });
    }
});